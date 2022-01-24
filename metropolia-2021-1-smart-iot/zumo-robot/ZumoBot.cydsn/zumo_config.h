#ifndef ZUMO_CONFIG_H_
#define ZUMO_CONFIG_H_

/* Change the following definition to 0 to run in normal mode and to 1 to enable simulator mode  */
#define ZUMO_SIMULATOR 1
    
/* Change the following definition to 0 to disable MQTT and to 1 to enable MQTT  */
#define START_MQTT 1

/* The following definitions must all be in double quotes */
#define NETWORK_SSID "SmartIotMQTT"

#define NETWORK_PASSWORD "SmartIot"

#define MQTT_BROKER "192.168.1.254"
    
#define MQTT_CLIENT_ID "Zumo101"

#define DEBUG_LOGS 0
    
#define MQTT_TAG "Zumo101/group3/"
#define MQTT_LAP_TAG "Zumo101/group3/lap/"
    
#define MAX_SENSOR_RAW_VALUE 23000
#define MIN_SENSOR_RAW_VALUE 2400
    
#define MAX_VALUE 454
    
#define THRESHOLD 350
#endif