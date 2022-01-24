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


void assignmentWeekFourNumberThree(void) {
    struct sensors_ ref;
    struct sensorStatus statusValues;

    send_mqtt(MQTT_TAG, "Running assignment week four number three.");

    send_mqtt(MQTT_TAG, "Enabling motors.");

    motor_start();

    motor_forward(0, 0);

    send_mqtt(MQTT_TAG, "Enabling IR.");

    IR_Start();

    IR_flush();

    send_mqtt(MQTT_TAG, "Enabling reflectance sensors.");

    reflectance_start();

    send_mqtt(MQTT_TAG, "Waiting for button to be pushed.");

    while (SW1_Read() == 1) vTaskDelay(50);

    send_mqtt(MQTT_TAG, "Waiting for button to be released.");

    while (SW1_Read() == 0) vTaskDelay(50);

    send_mqtt(MQTT_TAG, "Driving to the line.");

    do {
        motor_forward(20, 50);

        readSensorData(&ref, &statusValues);

        //  printf("%d %d %d %d %d %d\n", ref.L3, ref.L2, ref.L1, ref.R1, ref.R2, ref.R3);

    } while (!isIntersection(statusValues, ref));

    motor_forward(0, 0); // moving forward

    send_mqtt(MQTT_TAG, "Waiting for IR.");

    IR_wait();

    send_mqtt(MQTT_TAG, "Moving past line.");

    do {
        keepOnLine(ref, statusValues);

        readSensorData(&ref, &statusValues);

    } while (!isPastIntersection(statusValues));

    send_mqtt(MQTT_TAG, "Moving forward untill first intersection.");

    do {
        keepOnLine(ref, statusValues);

        readSensorData(&ref, &statusValues);

    } while (!isIntersection(statusValues, ref));

    send_mqtt(MQTT_TAG, "Moving past line for a tank turn.");

    do {
        motor_forward(20, 0);

        readSensorData(&ref, &statusValues);

    } while (!isPastIntersection(statusValues));
        
    motor_forward(20,500);
    
    motor_forward(0,0);
    
    send_mqtt(MQTT_TAG, "Ready for tank turn.");
    send_mqtt(MQTT_TAG, "Skipping current line.");
        
    do {
        tankTurnLeft(10, 0);

        readSensorData(&ref, &statusValues);

    } while (inStrightOnLine(statusValues));
    
    
    send_mqtt(MQTT_TAG, "Stopping on first line.");
    
    do {
        tankTurnLeft(10, 0);

        readSensorData(&ref, &statusValues);

    } while (!inStrightOnLine(statusValues));
    
    send_mqtt(MQTT_TAG, "Tank turn finished.");
    send_mqtt(MQTT_TAG, "Moving forward untill second intersection.");
    
    readSensorData(&ref, &statusValues);
        
    do {
        keepOnLine(ref, statusValues);

        readSensorData(&ref, &statusValues);

    } while (!isIntersection(statusValues, ref));

    send_mqtt(MQTT_TAG, "Moving past line for a tank turn.");

    do {
        motor_forward(20, 0);

        readSensorData(&ref, &statusValues);

    } while (!isPastIntersection(statusValues));
    
    motor_forward(20,500);
    
    motor_forward(0,0);
    
    send_mqtt(MQTT_TAG, "Ready for tank turn.");
    
    send_mqtt(MQTT_TAG, "Skipping current line.");
        
    do {
        tankTurnRight(10, 0);

        readSensorData(&ref, &statusValues);

    } while (inStrightOnLine(statusValues));
    
    
    send_mqtt(MQTT_TAG, "Stopping on first line.");
    
    do {
        tankTurnRight(10, 0);

        readSensorData(&ref, &statusValues);

    } while (!inStrightOnLine(statusValues));
    
    send_mqtt(MQTT_TAG, "Tank turn finished.");
    
    
    send_mqtt(MQTT_TAG, "Moving forward untill third intersection.");
    
    do {
        keepOnLine(ref, statusValues);

        readSensorData(&ref, &statusValues);

    } while (!isIntersection(statusValues, ref));

    send_mqtt(MQTT_TAG, "Moving past line for a tank turn.");

    do {
        motor_forward(20, 0);

        readSensorData(&ref, &statusValues);

    } while (!isPastIntersection(statusValues));
    
    motor_forward(20,500);
    
    motor_forward(0,0);
    
    send_mqtt(MQTT_TAG, "Ready for tank turn.");
    
    send_mqtt(MQTT_TAG, "Skipping current line.");
        
    do {
        tankTurnRight(10, 0);

        readSensorData(&ref, &statusValues);

    } while (inStrightOnLine(statusValues));
    
    
    send_mqtt(MQTT_TAG, "Stopping on first line.");
    
    do {
        tankTurnRight(10, 0);

        readSensorData(&ref, &statusValues);

    } while (!inStrightOnLine(statusValues));
    
    send_mqtt(MQTT_TAG, "Tank turn finished.");
    
    
    
    send_mqtt(MQTT_TAG, "Moving forward untill forth intersection.");
    
    do {
        keepOnLine(ref, statusValues);

        readSensorData(&ref, &statusValues);

    } while (!isIntersection(statusValues, ref));

    send_mqtt(MQTT_TAG, "Moving past line for a tank turn.");

    do {
        motor_forward(20, 0);

        readSensorData(&ref, &statusValues);

    } while (!isPastIntersection(statusValues));
    
    motor_forward(20,500);
    
    motor_forward(0,0);
    
    send_mqtt(MQTT_TAG, "Ready for tank turn.");
    
    send_mqtt(MQTT_TAG, "Skipping current line.");
        
    do {
        tankTurnLeft(10, 0);

        readSensorData(&ref, &statusValues);

    } while (inStrightOnLine(statusValues));
    
    
    send_mqtt(MQTT_TAG, "Stopping on first line.");
    
    do {
        tankTurnLeft(10, 0);

        readSensorData(&ref, &statusValues);

    } while (!inStrightOnLine(statusValues));
    
    send_mqtt(MQTT_TAG, "Tank turn finished.");
    
    do {
        keepOnLine(ref, statusValues);

        readSensorData(&ref, &statusValues);

    } while (!isLost(statusValues));
    
    motor_forward(0,0);
    
    send_mqtt(MQTT_TAG, "Destination is on your right :)");
    
    
//    do {
//        keepOnLine(ref);
//
//        reflectance_read(&ref);
//
//    } while (!isPastIntersection(ref));
//
//    motor_forward(10,200);
//
//
//    send_mqtt(MQTT_TAG, "Rotating left.");
//
//    rotateLeft();
//
//    send_mqtt(MQTT_TAG, "Moving forward until second intersection.");
//
//    do {
//        reflectance_read(&ref);
//
//        keepOnLine(ref);
//
//    } while (!isIntersection(ref));
//
//    send_mqtt(MQTT_TAG, "Rotating right.");
//
//    rotateRight();
//
//    send_mqtt(MQTT_TAG, "Moving forward until third intersection.");
//
//    do {
//        reflectance_read(&ref);
//
//        keepOnLine(ref);
//
//    } while (!isIntersection(ref));
//
//    send_mqtt(MQTT_TAG, "Rotating right.");
//
//    rotateRight();
//
//    send_mqtt(MQTT_TAG, "Moving forward until forth intersection.");
//
//    do {
//        reflectance_read(&ref);
//
//        keepOnLine(ref);
//
//    } while (!isIntersection(ref));
//
//    send_mqtt(MQTT_TAG, "Rotating left.");
//
//    rotateLeft();
//
//    send_mqtt(MQTT_TAG, "Program finished.");
//
//    motor_forward(0,0);
    
    while (true) {
        vTaskDelay(100);
    }
}