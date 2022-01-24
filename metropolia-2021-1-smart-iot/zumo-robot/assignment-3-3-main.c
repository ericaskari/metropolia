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

void assignmentWeekThreeNumberThree(void)
{
    {
        sharedFunctionExample();
        printf("First, defining the ultrasensor as obstcl.\n");
        int obstcl = Ultra_GetDistance;
        printf("Starting the motor, setting it to 0.\n");
        motor_start();
        motor_forward(0, 0);
        printf("Launching the Ultra sensor.\n");
        Ultra_start();
        while(true)
        {
            motor_forward(60, 0);
            if (obstcl < 11)
            {
                printf("Spotted an obstacle closer than 11 cm.\n");
                printf("Stop - motor_forward set to 0\n");
                motor_forward(0, 0);
                printf("Backward a bit, and a sharp turn.\n");
                motor_backward(20,100);
                motor_turn(40,-40, 500);
                printf("I will look what I can do to that break statement when done with this weeks assingments.\n");
                break;
            }
            vTaskDelay(1000);
        }
    }
