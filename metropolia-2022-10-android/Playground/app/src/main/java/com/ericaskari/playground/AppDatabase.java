package com.ericaskari.playground;

import androidx.room.Database;
import androidx.room.RoomDatabase;

@Database(entities = {UserModel.class}, version = 1)
public abstract class AppDatabase extends RoomDatabase {

    public abstract UserService userDao();


}