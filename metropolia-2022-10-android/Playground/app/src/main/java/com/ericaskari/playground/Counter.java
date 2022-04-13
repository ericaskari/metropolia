package com.ericaskari.playground;

public class Counter {

    private final int minimumValue;
    private final int maximumValue;
    private final int startingValue;
    private final int stepValue;
    private int counterValue;

    public Counter(int minimumValue, int maximumValue, int startingValue, int stepValue) {
        this.minimumValue = minimumValue;
        this.maximumValue = maximumValue;
        this.startingValue = startingValue;
        this.counterValue = startingValue;
        this.stepValue = stepValue;
    }

    public Counter() {
        this(-100, 100, 0, 1);
    }

    public void increase() {
        int newCounterValue = this.counterValue + this.stepValue;
        if (newCounterValue <= maximumValue) {
            this.counterValue = newCounterValue;
        }
    }

    public void decrease() {
        int newCounterValue = this.counterValue - this.stepValue;
        if (newCounterValue >= minimumValue) {
            this.counterValue = newCounterValue;
        }
    }


    public void reset() {
        this.counterValue = startingValue;
    }

    public int getValue() {
        return counterValue;
    }

    @Override
    public String toString() {
        return String.valueOf(counterValue);
    }
}
