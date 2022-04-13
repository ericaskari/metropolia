package com.ericaskari.playground;

import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.ericaskari.playground.databinding.ActivitySecondBinding;

public class SecondActivity extends AppCompatActivity {
    private ActivitySecondBinding binding;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivitySecondBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        Intent intent = getIntent();
        String name = intent.getStringExtra(MainActivity.EXTRA_MESSAGE_NAME);
        String age = intent.getStringExtra(MainActivity.EXTRA_MESSAGE_AGE);
        this.binding.textView.setText(
                new StringBuilder()
                        .append("Hello ")
                        .append(name)
                        .append(", you are ")
                        .append(age)
                        .append(" years old")
                        .toString()
        );

    }

}