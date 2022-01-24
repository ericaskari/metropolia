#include <project.h>
#include <stdio.h>
#include <math.h>
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
#include "zumo_config.h"

struct sensorStatus {
    bool L3;
    bool L2;
    bool L1;
    bool R1;
    bool R2;
    bool R3;
};

void sharedFunctionExample(void)
{
    printf("\nHello, World!\n");
 }   

static bool isIntersection(struct sensorStatus statusValues, struct sensors_ ref) {
    return statusValues.L1 
           && statusValues.L2
           && statusValues.L3
           && statusValues.R1
           && statusValues.R2
           && statusValues.R3;
}

bool isLost(struct sensorStatus statusValues) {
    return !statusValues.L1 
           && !statusValues.L2
           && !statusValues.L3
           && !statusValues.R1
           && !statusValues.R2
           && !statusValues.R3;
}

bool isPastIntersection(struct sensorStatus statusValues) {
    return !statusValues.L3 && !statusValues.R3;
}

bool inStrightOnLine(struct sensorStatus statusValues) {
    return statusValues.L1 && statusValues.R1;
}

void SetMotorSpeed(unsigned int leftMotorSpeed, unsigned int rightMotorSpeed, bool isLeftSide, bool isRightSide){
    if(isRightSide) {
        SetMotors(0, 0, rightMotorSpeed , leftMotorSpeed, 0);
        return;
    }
    
    if(isLeftSide) {
        SetMotors(0, 0, leftMotorSpeed , rightMotorSpeed, 0);
        return;
    }
    
    SetMotors(0, 0, leftMotorSpeed , rightMotorSpeed, 0);
    return;
    
    
        #if DEBUG_LOGS
            print_mqtt(
                MQTT_TAG,
                "leftMotorSpeed: %3d rightMotorSpeed: %3d",
                leftMotorSpeed,
                rightMotorSpeed
            );
        #endif
}

void readSensorData(struct sensors_ *value, struct sensorStatus *statusValues){
    
    struct sensors_ ref;

    static struct sensorStatus status = {false, false, false, false, false, false};
    
    
    //  read sensors
    reflectance_read(&ref);

    //  limit value between minimum and maximum
    ref.L3 = ref.L3 < MIN_SENSOR_RAW_VALUE ? MIN_SENSOR_RAW_VALUE : ref.L3;
    ref.L2 = ref.L2 < MIN_SENSOR_RAW_VALUE ? MIN_SENSOR_RAW_VALUE : ref.L2;
    ref.L1 = ref.L1 < MIN_SENSOR_RAW_VALUE ? MIN_SENSOR_RAW_VALUE : ref.L1;
    ref.R1 = ref.R1 < MIN_SENSOR_RAW_VALUE ? MIN_SENSOR_RAW_VALUE : ref.R1;
    ref.R2 = ref.R2 < MIN_SENSOR_RAW_VALUE ? MIN_SENSOR_RAW_VALUE : ref.R2;
    ref.R3 = ref.R3 < MIN_SENSOR_RAW_VALUE ? MIN_SENSOR_RAW_VALUE : ref.R3;

    ref.R3 = ref.R3 > MAX_SENSOR_RAW_VALUE ? MAX_SENSOR_RAW_VALUE : ref.R3;
    ref.L2 = ref.L2 > MAX_SENSOR_RAW_VALUE ? MAX_SENSOR_RAW_VALUE : ref.L2;
    ref.L1 = ref.L1 > MAX_SENSOR_RAW_VALUE ? MAX_SENSOR_RAW_VALUE : ref.L1;
    ref.R1 = ref.R1 > MAX_SENSOR_RAW_VALUE ? MAX_SENSOR_RAW_VALUE : ref.R1;
    ref.R2 = ref.R2 > MAX_SENSOR_RAW_VALUE ? MAX_SENSOR_RAW_VALUE : ref.R2;
    ref.L3 = ref.L3 > MAX_SENSOR_RAW_VALUE ? MAX_SENSOR_RAW_VALUE : ref.L3;

    //  reduce the calibration amount
    ref.L3 = ref.L3 - MIN_SENSOR_RAW_VALUE;
    ref.L2 = ref.L2 - MIN_SENSOR_RAW_VALUE;
    ref.L1 = ref.L1 - MIN_SENSOR_RAW_VALUE;
    ref.R1 = ref.R1 - MIN_SENSOR_RAW_VALUE;
    ref.R2 = ref.R2 - MIN_SENSOR_RAW_VALUE;
    ref.R3 = ref.R3 - MIN_SENSOR_RAW_VALUE;
    
    ref.L3 = ref.L3 * MAX_VALUE / (MAX_SENSOR_RAW_VALUE - MIN_SENSOR_RAW_VALUE);
    ref.L2 = ref.L2 * MAX_VALUE / (MAX_SENSOR_RAW_VALUE - MIN_SENSOR_RAW_VALUE);
    ref.L1 = ref.L1 * MAX_VALUE / (MAX_SENSOR_RAW_VALUE - MIN_SENSOR_RAW_VALUE);
    ref.R3 = ref.R3 * MAX_VALUE / (MAX_SENSOR_RAW_VALUE - MIN_SENSOR_RAW_VALUE);
    ref.R2 = ref.R2 * MAX_VALUE / (MAX_SENSOR_RAW_VALUE - MIN_SENSOR_RAW_VALUE);
    ref.R1 = ref.R1 * MAX_VALUE / (MAX_SENSOR_RAW_VALUE - MIN_SENSOR_RAW_VALUE);

    ref.L3 = ref.L3 < THRESHOLD ? 0 : ref.L3 - THRESHOLD;
    ref.L2 = ref.L2 < THRESHOLD ? 0 : ref.L2 - THRESHOLD;
    ref.L1 = ref.L1 < THRESHOLD ? 0 : ref.L1 - THRESHOLD;
    ref.R3 = ref.R3 < THRESHOLD ? 0 : ref.R3 - THRESHOLD;
    ref.R2 = ref.R2 < THRESHOLD ? 0 : ref.R2 - THRESHOLD;
    ref.R1 = ref.R1 < THRESHOLD ? 0 : ref.R1 - THRESHOLD;

    status.L3 = ref.L3 != 0;
    status.L2 = ref.L2 != 0;
    status.L1 = ref.L1 != 0;
    status.R3 = ref.R3 != 0;
    status.R2 = ref.R2 != 0;
    status.R1 = ref.R1 != 0;
    
    
    //  update the address value
    *value = ref;
    //  updating address value
    *statusValues = status;
}


void keepOnLineBase(
    struct sensors_ ref, 
    struct sensorStatus statusValues,
    uint8 SPEED_A_R,
    uint8 SPEED_A_L,
    uint8 SPEED_B_R,
    uint8 SPEED_B_L,
    uint8 SPEED_C_R,
    uint8 SPEED_C_L,
    uint8 SPEED_D_R,
    uint8 SPEED_D_L,
    uint8 SPEED_E_R,
    uint8 SPEED_E_L,
    uint8 SPEED_F_R,
    uint8 SPEED_F_L,
    uint8 SPEED_G_R,
    uint8 SPEED_G_L,
    uint8 SPEED_H_R,
    uint8 SPEED_H_L,
    uint8 SPEED_I_R,
    uint8 SPEED_I_L,
    uint8 SPEED_J_R,
    uint8 SPEED_J_L,
    uint8 SPEED_K_R,
    uint8 SPEED_K_L
) {
    bool levelA_L = statusValues.L1 && statusValues.R1 && ref.L1 > 200 && ref.R1 > 200 && ref.L1 > ref.R1;
    bool levelA_R = statusValues.L1 && statusValues.R1 && ref.L1 > 200 && ref.R1 > 200 && ref.R1 > ref.L1;
    
    if (levelA_L || levelA_R) {
        SetMotorSpeed(
            SPEED_A_R, 
            SPEED_A_L, 
            levelA_L, 
            levelA_R
        );
        return;
    }
    
    bool levelB_L = statusValues.L1 && statusValues.R1 && ref.L1 > ref.R1;
    bool levelB_R = statusValues.L1 && statusValues.R1 && ref.R1 > ref.L1;
    
    if (levelB_L || levelB_R) {
        SetMotorSpeed(
            SPEED_B_R, 
            SPEED_B_L, 
            levelB_L, 
            levelB_R
        );
        return;
    }

    bool levelC_L = (statusValues.L1 && !statusValues.L2);
    bool levelC_R = (statusValues.R1 && !statusValues.R2);
    
    if (levelC_L || levelC_R) {
        SetMotorSpeed(
            SPEED_C_R, 
            SPEED_C_L, 
            levelC_L, 
            levelC_R
        );
        return;
    }
    
    bool levelD_L = statusValues.L1 && statusValues.L2 && ref.L1 > 200 && ref.L1 > ref.L2;
    bool levelD_R = statusValues.R1 && statusValues.R2 && ref.R1 > 200 && ref.R1 > ref.R2;
    
    if(levelD_L || levelD_R){
        SetMotorSpeed(
            SPEED_D_R, 
            SPEED_D_L, 
            levelD_L, 
            levelD_R
        );
        return;
    }
    
    bool levelE_L = statusValues.L1 && statusValues.L2 && ref.L1 > 100 && ref.L2 > 100;
    bool levelE_R = statusValues.R1 && statusValues.R2 && ref.R1 > 100 && ref.R2 > 100;
    
    if(levelE_L || levelE_R){
        SetMotorSpeed(
            SPEED_E_R, 
            SPEED_E_L, 
            levelE_L, 
            levelE_R
        );
        return;
    } 
    
    bool levelF_L = statusValues.L1 && statusValues.L2 && ref.L2 > 200 && ref.L2 > ref.L1;
    bool levelF_R = statusValues.R1 && statusValues.R2 && ref.R2 > 200 && ref.R2 > ref.L1;
    
    if(levelF_L || levelF_R){
        SetMotorSpeed(
            SPEED_F_R, 
            SPEED_F_L, 
            levelF_L, 
            levelF_R
        );
        return;
    } 

    bool levelG_L = statusValues.L2 && !statusValues.L3;
    bool levelG_R = statusValues.R2 && !statusValues.R3;
    
    if(levelG_L || levelG_R){
        SetMotorSpeed(
            SPEED_G_R, 
            SPEED_G_L, 
            levelG_L, 
            levelG_R
        );
        return;
    } 

    bool levelH_L = statusValues.L2 && statusValues.L3 && ref.L2 > 200 && ref.L3 > ref.L2;
    bool levelH_R = statusValues.R2 && statusValues.R3 && ref.R2 > 200 && ref.R3 > ref.R2;
    
    if(levelH_L || levelH_R){
        SetMotorSpeed(
            SPEED_H_R, 
            SPEED_H_L, 
            levelH_L, 
            levelH_R
        );
        return;
    } 
    
    bool levelI_L = statusValues.L2 && statusValues.L3 && ref.L2 > 100 && ref.L3 > 100;
    bool levelI_R = statusValues.R2 && statusValues.R3 && ref.R2 > 100 && ref.R3 > 100;
    
    if(levelI_L || levelI_R){
        SetMotorSpeed(
            SPEED_I_R, 
            SPEED_I_L, 
            levelI_L, 
            levelI_R
        );
        return;
    } 
    
    bool levelJ_L = statusValues.L2 && statusValues.L3 && ref.L3 > 200 && ref.L3 > ref.L2;
    bool levelJ_R = statusValues.R2 && statusValues.R3 && ref.R3 > 200 && ref.R3 > ref.R2;
    
    if(levelJ_L || levelJ_R){
        SetMotorSpeed(
            SPEED_J_R, 
            SPEED_J_L, 
            levelJ_L, 
            levelJ_R
        );
        return;
    } 

    bool levelK_L = statusValues.L3;
    bool levelK_R = statusValues.R3;
    
    if(levelK_L || levelK_R){
        SetMotorSpeed(
            SPEED_K_R, 
            SPEED_K_L, 
            levelK_L, 
            levelK_R
        );
        return;
    } 
}

void tankTurnLeft(uint8 speed, uint32 delay){
    SetMotors(1,0, speed, speed, delay);
}

void tankTurnRight(uint8 speed, uint32 delay){
    SetMotors(0,1, speed, speed, delay);
}
