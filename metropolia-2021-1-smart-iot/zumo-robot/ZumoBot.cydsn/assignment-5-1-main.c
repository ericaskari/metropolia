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

void assignmentWeekFiveNumberOne(void) {

    send_mqtt(MQTT_TAG, "\n\n\n\nBOOTING\n\n");
    send_mqtt(MQTT_TAG, "assignmentWeekFiveNumberOne\n");

    bool isFirstTime = true;
    
    TickType_t startTime = xTaskGetTickCount();
    
    print_mqtt(MQTT_TAG, "Waiting for button to be pressed");
    
            
    while (true) {
        
        while (SW1_Read() == 1) vTaskDelay(50);

        while (SW1_Read() == 0) vTaskDelay(50);
        
        if(!isFirstTime){
            print_mqtt(MQTT_TAG, "button/%d", xTaskGetTickCount() - startTime);
        }
        
        if(isFirstTime) {
            print_mqtt(MQTT_TAG, "First button");
            isFirstTime = false;
        };
        
        startTime = xTaskGetTickCount();
    }
}