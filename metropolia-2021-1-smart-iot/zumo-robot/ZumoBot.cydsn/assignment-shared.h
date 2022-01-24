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


struct sensorStatus {
    bool L3;
    bool L2;
    bool L1;
    bool R1;
    bool R2;
    bool R3;
};

unsigned int calibrationCutOffRawValue();
unsigned int calibrationCutOffValue();

void SetMotorSpeed(int leftMotorSpeed, int rightMotorSpeed);
void sharedFunctionExample(void);

static bool isIntersection(struct sensorStatus statusValues, struct sensors_ ref);
bool isLost(struct sensorStatus statusValues);
bool isPastIntersection(struct sensorStatus statusValues);
bool inStrightOnLine(struct sensorStatus statusValues);

void tankTurnLeft(uint8 speed, uint32 delay);
void tankTurnRight(uint8 speed, uint32 delay);

void readSensorData(struct sensors_ *value, struct sensorStatus *statusValues);

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
);