package com.ericaskari.playground;

import android.annotation.SuppressLint;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RadioGroup;
import android.widget.TextView;

import com.ericaskari.playground.databinding.ActivityMainBinding;

public class MainActivity extends AppCompatActivity {
    private ActivityMainBinding binding;
    private DisplayMode displayMode = DisplayMode.Decimal;

    private final Counter counter = new Counter();

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
        // this.getResetButton().setOnClickListener(this::onResetButtonClick);
        this.getGenderRadioGroup().setOnCheckedChangeListener(this::onRadioGroupCheckedChanged);
        this.getResetButtonImageView().setOnClickListener(this::onResetButtonClick);
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

    private void onRadioGroupCheckedChanged(RadioGroup radioGroup, int i) {
        this.displayMode = MainActivity.RadioButtonToDisplayMode(radioGroup);
        this.updateUI();
    }

    //  UI Update

    @SuppressLint("SetTextI18n")
    private void updateUI() {
        if (this.displayMode == DisplayMode.Decimal) {
            this.getCounterValueTextView().setText(Integer.toString(counter.getValue()));
        } else if (this.displayMode == DisplayMode.Hexadecimal) {
            this.getCounterValueTextView().setText(Integer.toString(counter.getValue(), 16));
        } else if (this.displayMode == DisplayMode.Binary) {
            this.getCounterValueTextView().setText(Integer.toString(counter.getValue(), 2));
        }
    }

    //  Getters

    private Button getPlusButton() {
        return binding.plusButton;
    }

    private Button getMinusButton() {
        return binding.minusButton;
    }

    //  private Button getResetButton() {
    //      return binding.resetButton;
    //  }

    private TextView getCounterValueTextView() {
        return binding.counterValue;
    }

    private RadioGroup getGenderRadioGroup() {
        return binding.genderRadioGroup;
    }

    private ImageView getResetButtonImageView() {
        return binding.resetButtonImageView;
    }

    //  Radio Button to Enum converter

    private static DisplayMode RadioButtonToDisplayMode(RadioGroup radioGroup) {
        int id = radioGroup.getCheckedRadioButtonId();

        if (id == R.id.radioButtonDecimalOption) {
            return DisplayMode.Decimal;
        } else if (id == R.id.radioButtonHexOption) {
            return DisplayMode.Hexadecimal;
        } else if (id == R.id.radioButtonBinOption) {
            return DisplayMode.Binary;
        }

        return DisplayMode.Decimal;
    }

}