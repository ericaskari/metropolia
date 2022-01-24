#include <project.h>
#include <stdio.h>
#include "FreeRTOS.h"
#include "task.h"
#include "Motor.h"
#include "Ultra.h"
#include "Nunchuk.h"
#include "Reflectance.h"
#include "Gyro.h"
#include "Accel_magnet.h"
#include "LSM303D.h"
#include "IR.h"
#include "Beep.h"
#include "mqtt_sender.h"
#include <time.h>
#include <sys/time.h>
#include "serial1.h"
#include <unistd.h>
#include "assignment-shared.h"
#include <math.h>
#include "zumo_config.h"

#define BASE_SPEED 70
#define SPEED_A_L BASE_SPEED
#define SPEED_A_R 60
#define SPEED_B_L BASE_SPEED
#define SPEED_B_R 50
#define SPEED_C_L BASE_SPEED
#define SPEED_C_R 40
#define SPEED_D_L BASE_SPEED
#define SPEED_D_R 30
#define SPEED_E_L BASE_SPEED
#define SPEED_E_R 20
#define SPEED_F_L BASE_SPEED
#define SPEED_F_R 10
#define SPEED_G_L BASE_SPEED
#define SPEED_G_R 7
#define SPEED_H_L BASE_SPEED
#define SPEED_H_R 6
#define SPEED_I_L BASE_SPEED
#define SPEED_I_R 5
#define SPEED_J_L BASE_SPEED
#define SPEED_J_R 4
#define SPEED_K_L BASE_SPEED
#define SPEED_K_R 3


static bool isThereObstacle(){
    return Ultra_GetDistance() < 16;
}
static void centerInIntersection(){
    motor_forward(BASE_SPEED,300);
   
}

static void turnLeft(bool centerTheRobot){
    if(centerTheRobot) centerInIntersection();
    
    tankTurnLeft(BASE_SPEED, 400);
}

static void turnRight(bool centerTheRobot){
    if(centerTheRobot) centerInIntersection();
    
    tankTurnRight(BASE_SPEED, 400);
    
}

static void keepOnLine(struct sensors_ ref, struct sensorStatus statusValues){
    keepOnLineBase(
        ref, 
        statusValues,
        SPEED_A_R,
        SPEED_A_L,
        SPEED_B_R,
        SPEED_B_L,
        SPEED_C_R,
        SPEED_C_L,
        SPEED_D_R,
        SPEED_D_L,
        SPEED_E_R,
        SPEED_E_L,
        SPEED_F_R,
        SPEED_F_L,
        SPEED_G_R,
        SPEED_G_L,
        SPEED_H_R,
        SPEED_H_L,
        SPEED_I_R,
        SPEED_I_L,
        SPEED_J_R,
        SPEED_J_L,
        SPEED_K_R,
        SPEED_K_L
    );
}

static bool isIntersection(struct sensorStatus statusValues, struct sensors_ ref) {
    return (statusValues.L1 && statusValues.R1) && ((statusValues.R2 && statusValues.R3) || (statusValues.L2 && statusValues.L3));
}

static void signal() {
    BatteryLed_Write(1);
    vTaskDelay(100);
    BatteryLed_Write(0);
    vTaskDelay(40);
    BatteryLed_Write(1);
    vTaskDelay(100);
    BatteryLed_Write(0);
}

void assignmentMaze(void) {

    struct sensors_ ref;
    struct sensorStatus statusValues;
    
    
    send_mqtt(MQTT_TAG, "\n\n\n\nBOOTING\n\n");
    send_mqtt(MQTT_TAG, "assignmentMaze\n");

    print_mqtt(MQTT_TAG, "IR     VALUE MIN:                %d", 0);
    print_mqtt(MQTT_TAG, "IR     VALUE MAX:                %d", MAX_VALUE);
    print_mqtt(MQTT_TAG, "IR THRESHOLD VALUE:              %d", THRESHOLD);
    print_mqtt(MQTT_TAG, "\n");


    send_mqtt(MQTT_TAG, "Enabling motors.");

    motor_start();
    
    #if DEBUG_LOGS
        motor_stop();
    #endif
    
    motor_forward(0, 0);

    send_mqtt(MQTT_TAG, "Enabling IR.");

    IR_Start();

    IR_flush();

    send_mqtt(MQTT_TAG, "Enabling reflectance sensors.");

    reflectance_start();
    
    send_mqtt(MQTT_TAG, "Enabling ultrasonic sensor.");
    
    Ultra_Start();
    
    ultra_isr_Enable();
    
    readSensorData(&ref, &statusValues);

    print_mqtt(MQTT_TAG, "ref:          %d %d %d %d %d %d", ref.L3, ref.L2, ref.L1, ref.R1, ref.R2, ref.R3);
    print_mqtt(MQTT_TAG, "statusValues: %d %d %d %d %d %d", statusValues.L3, statusValues.L2, statusValues.L1, statusValues.R1, statusValues.R2, statusValues.R3);

    send_mqtt(MQTT_TAG, "Waiting for button to be pushed.");

    signal();
    
    #if !DEBUG_LOGS
        while (SW1_Read() == 1) vTaskDelay(50);

        send_mqtt(MQTT_TAG, "Waiting for button to be released.");

        while (SW1_Read() == 0) vTaskDelay(50);
        
        signal();
        
        send_mqtt(MQTT_TAG, "Driving to the first intersection.");
        
        readSensorData(&ref, &statusValues);
        
        while(!isIntersection(statusValues, ref)) {
            motor_forward(100, 0);
            readSensorData(&ref, &statusValues);
        }
        
        motor_forward(0, 0);

        signal();
        
        send_mqtt(MQTT_TAG, "Waiting for IR.");

        IR_wait();
        
        signal();
        
        send_mqtt(MQTT_TAG, "Driving past the first intersection.");
        
        readSensorData(&ref, &statusValues);
        
        TickType_t startTime = xTaskGetTickCount();
        
        while(isIntersection(statusValues, ref)) {
            motor_forward(BASE_SPEED, 0);
            readSensorData(&ref, &statusValues);
        }
        
        signal();
        
    #endif
    
    // Maze implementation
    
    bool mazeIntersectionY[13];      
    bool mazeIntersectionX[7];      

    // 0 TOP
    // 1 LEFT
    // 2 RIGHT
    enum ROBOT_DIRECTION {TOP, LEFT, RIGHT};
    
    enum ROBOT_DIRECTION direction = TOP;

    unsigned int OBSTACLE_DISTANCE = 13;
    
    unsigned int currentY = 0;
    
    unsigned int currentX = 3;
    
    bool isLeftSideClosed = false;
    
    send_mqtt(MQTT_TAG, "Path finding started.");
    
    do {
        /*while(true){
            motor_stop();
            vTaskDelay(1000);
            
            readSensorData(&ref, &statusValues);
            print_mqtt(MQTT_TAG, "ref:          %d %d %d %d %d %d", ref.L3, ref.L2, ref.L1, ref.R1, ref.R2, ref.R3);
            print_mqtt(MQTT_TAG, "statusValues: %d %d %d %d %d %d", statusValues.L3, statusValues.L2, statusValues.L1, statusValues.R1, statusValues.R2, statusValues.R3);
        }*/
        keepOnLine(ref, statusValues);

        readSensorData(&ref, &statusValues);
        
        if(isIntersection(statusValues, ref)){
            
            print_mqtt(MQTT_TAG, "Intersection found. current direction: %d  obstacle: %d    %d", direction, Ultra_GetDistance(), isThereObstacle());
            print_mqtt(MQTT_TAG, "ref:          %d %d %d %d %d %d", ref.L3, ref.L2, ref.L1, ref.R1, ref.R2, ref.R3);
            print_mqtt(MQTT_TAG, "statusValues: %d %d %d %d %d %d", statusValues.L3, statusValues.L2, statusValues.L1, statusValues.R1, statusValues.R2, statusValues.R3);
            if(direction == TOP){
                currentY++;
            }
            
            if(direction == LEFT){
                currentX--;
            }
            
            if(direction == RIGHT){
                currentX++;
            }
            print_mqtt(
                MQTT_TAG, 
                "currentX: %d   currentY: %d", 
                currentX,currentY);
            
            
            
            
            //  TOP is a obstacle (IR ON LINE)
            if(direction == TOP && isThereObstacle() ){
                print_mqtt(MQTT_TAG, "Moving forward but obstacle found. turning left");
                
                if(currentX == 0) {
                    print_mqtt(MQTT_TAG, "Ohh. Im on cliff. turning right");
                    turnRight(true);
                    direction = RIGHT;
                    
                } else {
                    turnLeft(true);
                    direction = LEFT;
                }
            }
            
            //  Going left and there is a obstacle => go to right(IR ON LINE)
            else if(direction == LEFT && (isThereObstacle() || currentX == 0 )){
                print_mqtt(MQTT_TAG, "Moving left but obstacle found or border. moving Top");
                
                turnRight(true);
                direction = TOP;
                
                if(isThereObstacle()){
                    turnRight(false);             
                    direction = RIGHT;
                }
            }
            
            //  Going right and there is a obstacle => goto left(IR ON LINE)
            else if(direction == RIGHT && (isThereObstacle() || currentX == 6 )){
                print_mqtt(MQTT_TAG, "Moving right but obstacle found or border. moving top");
                
                turnLeft(true);
                direction = TOP;
                
                if(isThereObstacle()){
                    turnLeft(false);             
                    direction = LEFT;
                }
            }
            
            else if(direction == TOP && !isThereObstacle() ){
                print_mqtt(MQTT_TAG, "Moving forward");
                
                centerInIntersection();
            }
            
            else if(direction == LEFT && !isThereObstacle()){
                turnRight(true);
                direction = TOP;

                if(isThereObstacle()){
                    turnLeft(false);             
                    direction = LEFT;
                }
            }
            
            else if(direction == RIGHT && !isThereObstacle() ){
                turnLeft(true);
                direction = TOP;
                
                if(isThereObstacle()){
                    turnRight(false);             
                    direction = RIGHT;
                }
            }
            

            
            if(currentX == 3 && currentY == 14){
                if(direction == TOP){
                    centerInIntersection();
                    motor_forward(BASE_SPEED, 1000);
                    break;
                }
                
                if(direction == RIGHT){
                    turnLeft(false);
                    motor_forward(BASE_SPEED, 1000);
                    break;
                }
                
                if(direction == LEFT){
                    turnRight(false);
                    motor_forward(BASE_SPEED, 1000);
                    break;
                }
            }
            
            print_mqtt(
                MQTT_TAG, 
                "Continuing Direction: %s", 
                direction == TOP ? "TOP": direction == LEFT ? "LEFT" : "RIGHT");
            
        }
        
        
        //print_mqtt(MQTT_TAG, "keepOnLine. currentX: %d currentY: %d", currentX, currentY);
        
        // goto intersection
        // if no block go forward
        // if block turn left
        // go to first intersection turn right
        // check for block if no then go forward
        // if go forward reset the left right direction
        // if cant go left anymore go right and repeat the same plan
        if(isLost(statusValues)){
            if(direction == TOP && currentX < 3) {
                turnRight(false);
                direction = RIGHT;
            }
            else if(direction == TOP && currentX > 3) {
                turnLeft(false);
                direction = LEFT;
            } else {
                print_mqtt(
                    MQTT_TAG,
                    "Lost");
                break;
            }
        }
        
        
    } while (true);
    //} while (DEBUG_LOGS ? true : currentY == 12 && currentX == 3);
 
    motor_forward(0,0);

    #if !DEBUG_LOGS
            
        TickType_t endTime = xTaskGetTickCount();
        print_mqtt(
            MQTT_LAP_TAG,
            "Time(ms): %d",
            (endTime - startTime)
        );
            
        print_mqtt(
            MQTT_TAG,
            "Time(ms): %d",
            (endTime - startTime)
        );
        
        vTaskDelay(100);

    #endif
    
    send_mqtt(MQTT_TAG, "Finished");

    while (true) {
        vTaskDelay(1000);
    }
}