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
// #include "tank-turn-function.h"

void assignmentWeekThreeNumberThree(void)
{
        printf("Motor start\n");
        motor_start();
        printf("Motor 0, 0\n");
        motor_forward(0, 0);
        printf("The ultra sensor starts\n");
        Ultra_Start();
        ultra_isr_Enable();
        while(true)
        {
            printf("Defining the int_distance for distance from an obstacle\n");
            motor_forward(50, 0);
            int d = Ultra_GetDistance();
            printf("Distance: %d\r\n", d);
            if (d < 10)
            {
                motor_forward(0,0);
                motor_backward(60, 150);
                motor_forward(0,0);
                motor_turn(90, -90, 50);
                
                }
              vTaskDelay(1000);
            }
    
}

