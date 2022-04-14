package com.ericaskari.playground;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.ericaskari.playground.databinding.PersonDetailsLayoutBinding;

public class PersonDetailsActivity extends AppCompatActivity {
    private PersonDetailsLayoutBinding binding;
    private President president;


    //    Lifecycles

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = PersonDetailsLayoutBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        president = President.extractFromBundle(getIntent().getExtras());

        this.updateUI();
    }

    //    Init click handlers

    private void updateUIPresidentInfo() {
        binding.name.setText(president.getName());
        binding.startYear.setText(String.valueOf(president.getDutyStartYear()));
        binding.endYear.setText(String.valueOf(president.getDutyEndYear()));
        binding.desc.setText(String.valueOf(president.getDescription()));
    }

    private void  updateUI() {
        updateUIPresidentInfo();
    }
}