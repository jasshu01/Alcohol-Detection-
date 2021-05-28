#include <LiquidCrystal.h>
LiquidCrystal led(12,11,5,4,3,2);
int value;
int redLed = 8;
int greenLed = 13;
int buzzer = 9;
int smokeA0 = A0;
// Your threshold value
int sensorThres = 500;
int motorPin = 7;


void setup()
{

led. begin(16, 2);
pinMode(redLed,OUTPUT);
pinMode(greenLed,OUTPUT);
pinMode(buzzer,OUTPUT);
pinMode(smokeA0,INPUT );
pinMode(motorPin, OUTPUT);
Serial.begin(9600);  
}

void loop()
{
noTone(buzzer);
  value= analogRead(smokeA0);
  led.setCursor(1,0);
  led.print(value/10);
  led.print("% Alcohol");
  int analogSensor =analogRead(smokeA0);
  Serial.println( analogSensor);  // Checks if it has reached the threshold value
  if (analogSensor>sensorThres)
      {
    digitalWrite(redLed,HIGH);
    digitalWrite(greenLed,LOW);
    tone(buzzer, 1000, 200);
    delay(200);
        analogWrite(motorPin, 0);

    	
    }
  else
    {
    digitalWrite(redLed, LOW);
    digitalWrite(greenLed, HIGH);
    //tone(buzzer, 1000, 200);
    noTone(buzzer);
     analogWrite(motorPin, 255);

    }
  delay(0);
}