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

/*
Robot control with ultrasonic distance sensor. 
Write a program that runs forward and checks periodically the distance sensor reading. 
If an obstacle is closer than 10 cm robot stops, reverses a bit, and turns ~120 degrees left. 
Then robot continues to run forward and check for obstacles again.

To control motors, you may use only the following motor functions provided 
in the library: motor_start, motor_stop, motor_forward, motor_turn, and motor_backward.
*/


void assignmentWeekThreeNumberTwo(void)
{
    comment("Running assignment week three number two!\n");
    
    comment("Enabling motor controller!\n");
    
    motor_start();
   
    motor_forward(0, 0);
    
    comment("Enabling Ultra Sonic!\n");
    
    Ultra_Start();
    
    comment("Initalization finished.\n");
    
    vTaskDelay(1000);
    
    while(true) {
        motor_forward(50, 0);
        
        int distance = Ultra_GetDistance();
        
        printf("distance = %d\r\n", distance);
        
        if(distance < 10){
            printf("Obstacle.\n");
            
            printf("Moving back.\n");
            
            motor_backward(50, 200);
            
            printf("Rotating 120deg.\n");
            
            motor_turn(0, 100, 550); 
        }
        
        vTaskDelay(200);
    }
 }   