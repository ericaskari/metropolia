package com.ericaskari.playground;

import static android.content.ContentValues.TAG;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import android.util.Log;
import android.view.View;

import com.ericaskari.playground.databinding.ActivityMainBinding;

public class MainActivity extends AppCompatActivity {
    private ActivityMainBinding binding;

    private Counter onStartCounter;
    private Counter onCreateCounter;
    private Counter onHitCounter;

    //    Lifecycles

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        onStartCounter = new Counter(0, 100, getOnStartCounterStorageValue(), 1);
        onCreateCounter = new Counter(0, 100, getOnCreateCounterStorageValue(), 1);
        onHitCounter = new Counter(0, 100, getOnHitCounterStorageValue(), 1);

        onCreateCounter.increase();
        this.updateUI();

        this.initButtonClickListeners();
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.d(TAG, "onStart: ");
        onStartCounter.increase();
        this.updateUI();
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.d(TAG, "onResume: ");
    }

    @Override
    protected void onPause() {
        super.onPause();
        saveValuesAsync();
        Log.d(TAG, "onPause: ");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.d(TAG, "onStop: ");
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        Log.d(TAG, "onRestart: ");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "onDestroy: ");
    }

    //    Storage

    private SharedPreferences getStorage() {
        return getSharedPreferences("VAR", Activity.MODE_PRIVATE);
    }

    private int getOnStartCounterStorageValue() {
        return getStorage().getInt("onStartCounter", 0);
    }

    private int getOnCreateCounterStorageValue() {
        return getStorage().getInt("onCreateCounter", 0);
    }

    private int getOnHitCounterStorageValue() {
        return getStorage().getInt("onHitCounter", 0);
    }

    private void saveValuesAsync() {
        SharedPreferences sharedPreferences = getStorage();
        SharedPreferences.Editor editor = sharedPreferences.edit();

        editor.putInt("onStartCounter", onStartCounter.getValue());
        editor.putInt("onCreateCounter", onCreateCounter.getValue());
        editor.putInt("onHitCounter", onHitCounter.getValue());
        editor.apply();
    }


    //    Init click handlers

    private void initButtonClickListeners() {
        this.binding.resetButton.setOnClickListener(this::onResetButtonClick);
        this.binding.hitButton.setOnClickListener(this::onHitButtonClick);
    }

    //  Click handlers

    private void onHitButtonClick(View view) {
        onHitCounter.increase();
        Log.d(TAG, "onHitButtonClick: " + onHitCounter.toString());
        updateUI();
    }

    private void onResetButtonClick(View view) {
        onCreateCounter.reset();
        onStartCounter.reset();
        onHitCounter.reset();
    }

    //  UI Update

    private void updateUI() {
        this.binding.creationsField.setText(onCreateCounter.toString());
        this.binding.startCountField.setText(onStartCounter.toString());
        this.binding.hitsCountField.setText(onHitCounter.toString());
    }

}