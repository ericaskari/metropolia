package com.ericaskari.playground;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.ericaskari.playground.databinding.ActivityMainBinding;

public class MainActivity extends AppCompatActivity {
    private ActivityMainBinding binding;

    private final Counter counter = new Counter(-10, 10, 0,1);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        this.initButtonClickListeners();
        this.updateUI();

    }

    private void initButtonClickListeners() {
        this.getPlusButton().setOnClickListener(this::onPlusButtonClick);
        this.getMinusButton().setOnClickListener(this::onMinusButtonClick);
        this.getResetButton().setOnClickListener(this::onResetButtonClick);
    }

    //  Click handlers

    private void onPlusButtonClick(View view) {
        this.counter.increase();
        this.updateUI();
    }

    private void onMinusButtonClick(View view) {
        this.counter.decrease();
        this.updateUI();
    }

    private void onResetButtonClick(View view) {
        this.counter.reset();
        this.updateUI();
    }

    //  UI Update

    private void updateUI() {
        this.getCounterValueTextView().setText(counter.toString());
    }

    //  Getters

    private Button getPlusButton() {
        return binding.plusButton;
    }

    private Button getMinusButton() {
        return binding.minusButton;
    }

    private Button getResetButton() {
        return binding.resetButton;
    }

    private TextView getCounterValueTextView() {
        return binding.counterValue;
    }

}