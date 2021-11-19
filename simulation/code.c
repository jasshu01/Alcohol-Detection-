#include <LiquidCrystal.h>
LiquidCrystal led(12, 11. 5, 4, 3, 2),
    int value.int redLed = 8 :

    int greenLed = 13;
int buzzer = 10;
int smokeA0 = A0 :
    // Your threshold value
    int sensorThres = 400 :

    void
    setup()
{

    led.begin(16, 2);
    pinMode(redLed.OUTPUT);
    pinMode(greenLed, OUTPUT);
    pinMode(buzzer.OUTPUT);
    pinMode(smokeAO.INPUT) : Serial.begin(9600);
}

void loop()
{

    value analogRead(smokeA0);
    led.setCursor(1, 0);
    led.print(value / 10);
    led.print("% Alcohol") : int analogSensor = analogRead(smokeA0);
    Serial.printin(analog Sensor); // Checks if it has reached the threshold value
    if (analogSensor > sensorThres)
    {
        digitalWrite(redLed.HIGH);
        digitalWrite(greenLed.LOW);
        noTone(buzzer).
    }
    else
    {
        digitalWrite(redLed, LOW) : digital Write(greenLed, HIGH);
        tone(buzzer, 1000, 200);
    }

    delay(0) :
}
