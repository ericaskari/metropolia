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

bool flip( )
{
    int i = rand() % 2;
 
    if (i == 0) {
        return 0;
    }
    
    return 1;
}

void assignmentWeekFiveNumberTwo(void) {

    send_mqtt(MQTT_TAG, "\n\n\n\nBOOTING\n\n");
    send_mqtt(MQTT_TAG, "assignmentWeekFiveNumberTwo\n");

    send_mqtt(MQTT_TAG, "Enabling motors.");
    
    motor_start();
    
    motor_forward(0, 0);
    
    send_mqtt(MQTT_TAG, "Enabling ultrasonic sensor.");
    
    Ultra_Start();
    
    ultra_isr_Enable();

    while (true) {
        motor_forward(100, 0);
        
        int d = Ultra_GetDistance();
        
        printf("Distance: %d\r\n", d);
        
        if (d < 10){
            motor_backward(100, 200);
            
            if(flip()){
                tankTurnLeft(100,260);
            } else {
                tankTurnRight(100,260);
            }
        }
    }
}
