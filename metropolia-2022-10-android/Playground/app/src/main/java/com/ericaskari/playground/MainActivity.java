package com.ericaskari.playground;

import static android.content.ContentValues.TAG;

import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import android.util.Log;
import android.view.View;

import com.ericaskari.playground.databinding.ActivityMainBinding;

public class MainActivity extends AppCompatActivity {
    public static final String EXTRA_MESSAGE_NAME = "com.example.myfirstapp.NAME";
    public static final String EXTRA_MESSAGE_AGE = "com.example.myfirstapp.AGE";

    private ActivityMainBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        this.initButtonClickListeners();
        this.updateUI();
    }

    private void initButtonClickListeners() {
         this.binding.changeButton.setOnClickListener(this::onChangeButtonClick);
    }

    //  Click handlers

    private void onChangeButtonClick(View view) {
        Intent intent = new Intent(this, SecondActivity.class);
        Log.d(TAG, "name: " + this.binding.name.getText().toString());
        Log.d(TAG, "age: " + this.binding.age.getText().toString());
        intent.putExtra(EXTRA_MESSAGE_NAME, this.binding.name.getText().toString());
        intent.putExtra(EXTRA_MESSAGE_AGE, this.binding.age.getText().toString());
        startActivity(intent);
    }

    //  UI Update

    private void updateUI() {

    }
}