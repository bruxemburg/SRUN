package com.bruxemburg.srun.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.bruxemburg.srun.R;

public class AlarmActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // set the layout
        setContentView(R.layout.activity_alarm);

        // init layout elements
        TextView alarmName = findViewById(R.id.alarmName);
        Bundle bundle = getIntent().getExtras();
        alarmName.setText(bundle.getString("name", "Alarm"));

        Button snoozeButton = findViewById(R.id.snoozeButton);
        Button dismissButton = findViewById(R.id.dismissButton);

        // event listeners
        snoozeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // TODO: Snooze logic (set inexact alarm with appropriate step)
                Toast.makeText(AlarmActivity.this, "SNOOZE", Toast.LENGTH_LONG).show();
            }
        });

        dismissButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // TODO: Cancel alarm logic
                Toast.makeText(AlarmActivity.this, "CANCEL...", Toast.LENGTH_LONG).show();
            }
        });
    }

}