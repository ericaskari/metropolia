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

#define BASE_SPEED 255
#define SPEED_A_L BASE_SPEED
#define SPEED_A_R 200
#define SPEED_B_L BASE_SPEED
#define SPEED_B_R 180
#define SPEED_C_L BASE_SPEED
#define SPEED_C_R 170
#define SPEED_D_L BASE_SPEED
#define SPEED_D_R 160
#define SPEED_E_L BASE_SPEED
#define SPEED_E_R 100
#define SPEED_F_L BASE_SPEED
#define SPEED_F_R 80
#define SPEED_G_L BASE_SPEED
#define SPEED_G_R 60
#define SPEED_H_L BASE_SPEED
#define SPEED_H_R 20
#define SPEED_I_L BASE_SPEED
#define SPEED_I_R 15
#define SPEED_J_L BASE_SPEED
#define SPEED_J_R 5
#define SPEED_K_L BASE_SPEED
#define SPEED_K_R 0


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


static void signal() {
    BatteryLed_Write(1);
    vTaskDelay(100);
    BatteryLed_Write(0);
    vTaskDelay(40);
    BatteryLed_Write(1);
    vTaskDelay(100);
    BatteryLed_Write(0);
}

void assignmentWeekFourNumberTwo(void) {

    struct sensors_ ref;
    struct sensorStatus statusValues;
    
    
    send_mqtt(MQTT_TAG, "\n\n\n\nBOOTING\n\n");
    send_mqtt(MQTT_TAG, "assignmentWeekFiveNumberTwo\n");

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

    readSensorData(&ref, &statusValues);

    print_mqtt(MQTT_TAG, "Testing print_mqtt: %d %d %d %d %d %d", ref.L3, ref.L2, ref.L1, ref.R1, ref.R2, ref.R3);

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
    
    
    do {
        readSensorData(&ref, &statusValues);

        #if DEBUG_LOGS
            print_mqtt(
                MQTT_TAG,
                "L3:%3d  L2:%3d  L1:%3d  R1:%3d  R2:%3d  R3:%3d  %3d",
                ref.L3,
                ref.L2,
                ref.L1,
                ref.R1,
                ref.R2,
                ref.R3,
                xTaskGetTickCount()
            );
            vTaskDelay(100);

        #endif
        
        keepOnLine(ref, statusValues);
        
    } while (DEBUG_LOGS ? true : !isIntersection(statusValues, ref));
 
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