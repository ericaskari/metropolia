package com.ericaskari.playground;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import com.ericaskari.playground.databinding.ActivityMainBinding;
import com.ericaskari.playground.databinding.PersonItemLayoutBinding;

import java.util.List;

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

        listView.setOnItemClickListener((parent, view, position, id) -> {
            Intent intent = new Intent(MainActivity.this, PersonDetailsActivity.class);

            President president = Database.getInstance().getPresidents().get(position);

            president.attachToIntent(intent);

            startActivity(intent);
        });

//        AppDatabase db = Room.databaseBuilder(getApplicationContext(), AppDatabase.class, "database-name").build();
//        UserService userDao = db.userDao();
//        List<UserModel> users = userDao.getAll();

    }
}