package com.ericaskari.playground;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import androidx.appcompat.app.AppCompatActivity;

import com.ericaskari.playground.databinding.ActivityMainBinding;
import com.ericaskari.playground.databinding.PersonItemLayoutBinding;

public class MainActivity extends AppCompatActivity {
    private ActivityMainBinding binding;

    //    Lifecycles

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        ListView listView = this.binding.listView;

        listView.setAdapter(new ArrayAdapter<>(
                this,
                R.layout.person_item_layout,
                PersonItemLayoutBinding.inflate(getLayoutInflater()).textView.getId(),
                Database.getInstance().getPresidents()
        ));

        listView.setOnItemClickListener((adapterView, view, index, l) -> {
            Intent intent = new Intent(MainActivity.this, PersonDetailsActivity.class);

            President president = Database.getInstance().getPresidents().get(index);

            president.attachToIntent(intent);

            startActivity(intent);
        });
    }
}