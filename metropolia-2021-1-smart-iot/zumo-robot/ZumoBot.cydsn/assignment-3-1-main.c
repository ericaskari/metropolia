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


void assignmentWeekThreeNumberOne(void)
{
    motor_start();              // enable motor controller
    motor_forward(0,0);         // set speed to zero to stop motors
    vTaskDelay(200);

    motor_forward(100,3321); // moving forward
    motor_turn(-45,0,248); // the first turn
    motor_forward(100,2580);
    motor_turn(-45,0,248); //the second turn is the same as the first
    motor_forward(100,2580);
    motor_turn(-59,42,405); // this one was tricky, and to be honest I'm not still all satisfied
    motor_forward(100,440);
    motor_turn(-80,20,80);  // the really tricky part begins, feel free to edit from now on
    motor_forward(100,800);
    motor_turn(-80,20,80);
    motor_forward(100,300);
    motor_turn(-80,19,110);
    motor_forward(100,1060);
    motor_forward(0,0);         // we arrive to the right point, yay.
    motor_stop();

    while(true)
    {
        vTaskDelay(100);
    }
 }