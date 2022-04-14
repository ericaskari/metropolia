package com.ericaskari.playground;

import android.content.Intent;
import android.os.Bundle;

public class President {
    private String name;
    private int dutyStartYear;
    private int dutyEndYear;
    private String description;

    private static final String NAME = "PRESIDENT.NAME";
    private static final String DUTY_START_YEAR = "PRESIDENT.DUTY_START_YEAR";
    private static final String DUTY_END_YEAR = "PRESIDENT.DUTY_END_YEAR";
    private static final String DUTY_DESC = "PRESIDENT.DESC";

    public President(String name, int dutyStartYear, int dutyEndYear, String description) {
        this.name = name;
        this.dutyStartYear = dutyStartYear;
        this.dutyEndYear = dutyEndYear;
        this.description = description;
    }

    private President() {

    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getDutyStartYear() {
        return dutyStartYear;
    }

    public int getDutyEndYear() {
        return dutyEndYear;
    }

    public void attachToIntent(Intent intent) {
        intent.putExtra(President.NAME, this.getName());
        intent.putExtra(President.DUTY_DESC, this.getDescription());
        intent.putExtra(President.DUTY_START_YEAR, this.getDutyStartYear());
        intent.putExtra(President.DUTY_END_YEAR, this.getDutyEndYear());
    }

    public static President extractFromBundle(Bundle bundle) {
        return new President(
                bundle.getString(President.NAME),
                bundle.getInt(President.DUTY_START_YEAR),
                bundle.getInt(President.DUTY_END_YEAR),
                bundle.getString(President.DUTY_DESC)
        );
    }


    @Override
    public String toString() {
        return name;
    }
}
