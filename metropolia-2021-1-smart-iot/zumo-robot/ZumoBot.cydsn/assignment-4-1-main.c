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

void assignmentWeekFourNumberOne(void) {
    printf("Motors start and are set on 0\n");
motor_start();
motor_forward(0, 0);
printf("IR start\n");
IR_Start();
printf("Reflectance starts\n");
struct sensors_ ref;
struct sensors_ dig;
reflectance_start();
printf("Sets treshold to the reflectance\n");
reflectance_set_threshold(9000, 9000, 11000, 11000, 9000, 9000); 
int button = (SW1_Read( ));
    while(true)
    {   
        printf("raw reflectance values\n");
        reflectance_read(&ref);
        printf("%5d %5d %5d %5d %5d %5d\r\n", ref.L3, ref.L2, ref.L1, ref.R1, ref.R2, ref.R3);
        printf("digital reflectance values\n");
        reflectance_digital(&dig);
        printf("%5d %5d %5d %5d %5d %5d \r\n", dig.L3, dig.L2, dig.L1, dig.R1, dig.R2, dig.R3);        
        vTaskDelay(200);
        int button = (SW1_Read());
            if( button == 0){
                motor_forward(40, 0);
                if(button == 1){
                    motor_forward(50,0);
                }
            }
        if(dig.L3 > 0){
            IR_Start();
            IR_flush();
            IR_wait();
                    while(true){
                        int i = 0;
                           if(dig.L3 > 0){
                                motor_forward(40,0);
                                if(dig.L3 == 0){
                                    i++; 
                                    if(i > 3){
                                        motor_stop();
                                    }
                                }
                        }
                }        
            }
        }
}    
