package com.bruxemburg.srun.plugin;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.bruxemburg.srun.activity.MainActivity;
import com.bruxemburg.srun.receiver.AlarmReceiver;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.Calendar;

@CapacitorPlugin(name = "Alarm")
public class AlarmPlugin extends Plugin {
    /**
     * Set the exact alarm using a appropriate date and alarm name
     * @param call Passing a { date: long, name: string } object
     */
    @PluginMethod()
    public void set(PluginCall call) {
        // TODO: Check if permissions granted
        JSObject returnValue = new JSObject();

        // getting the date when the alarm should be set
        long date = call.getLong("date");
        String name = call.getString("name");
        Log.d("HERE", Long.toString(date));

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
            // creating Alarm view intent
            Intent alarmIntent = new Intent(getContext(), AlarmReceiver.class);
            alarmIntent.putExtra("name", name);
            PendingIntent alarmPendingIntent = PendingIntent.getBroadcast(
                    getContext(),
                    0,
                    alarmIntent,
                    PendingIntent.FLAG_CANCEL_CURRENT + PendingIntent.FLAG_IMMUTABLE
                );

            // TODO: Create deeplink to current alarm settings maybe
            // creating Alarm info view intent
            Intent infoIntent = new Intent(getContext(), MainActivity.class);
            PendingIntent infoPendingIntent = PendingIntent.getActivity(
                    getContext(),
                    0,
                    infoIntent,
                    PendingIntent.FLAG_IMMUTABLE
            );

            // setting the date in millis that we got from Typescript
            Calendar calendar = Calendar.getInstance();
            calendar.setTimeInMillis(date);

            // creating alarm manager ans setting the alarm clock
            AlarmManager alarmManager = (AlarmManager) getContext().getSystemService(Context.ALARM_SERVICE);

            /*alarmManager.setInexactRepeating(
                    AlarmManager.RTC_WAKEUP,
                    calendar.getTimeInMillis(),
                    AlarmManager.INTERVAL_HOUR,
                    pendingIntent
            );*/
            alarmManager.setAlarmClock(
                    new AlarmManager.AlarmClockInfo(calendar.getTimeInMillis(), infoPendingIntent),
                    alarmPendingIntent
            );

            returnValue.put("status", true);
            call.resolve(returnValue);
            return;
        }

        Toast.makeText(getContext(), "NO SUPPORT", Toast.LENGTH_LONG).show();

        returnValue.put("status", true);
        call.resolve(returnValue);
    }
}
