package com.bruxemburg.srun.plugin;

import android.Manifest;
import android.app.Activity;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.util.Log;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.bruxemburg.srun.activity.AlarmActivity;
import com.bruxemburg.srun.activity.MainActivity;
import com.bruxemburg.srun.receiver.AlarmReceiver;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@CapacitorPlugin(name = "Alarm")
public class AlarmPlugin extends Plugin {
//    public static boolean checkAndRequestPermissions(Activity activity, ArrayList<String> permissions) {
//
//    }

    public static final int REQUEST_PERMISSION_MULTIPLE = 0;

    @PluginMethod()
    public void checkAndRequestPermissions(PluginCall call) {
        List<String> listPermissionsNeeded = new ArrayList<String>() {
            {
                add(Manifest.permission.INTERNET);
                add(Manifest.permission.SET_ALARM);
                add(Manifest.permission_group.STORAGE);
                add(Manifest.permission_group.LOCATION);
                add(Manifest.permission.RECEIVE_BOOT_COMPLETED);
                add(Manifest.permission.VIBRATE);
                add(Manifest.permission.WAKE_LOCK);
            }
        };

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            listPermissionsNeeded.add(Manifest.permission.USE_FULL_SCREEN_INTENT);
        }

        List<String> listPermissionsNeededFiltered = new ArrayList<String>();

        for (String permissionNeeded:
             listPermissionsNeeded) {
            int permissionCode = ContextCompat.checkSelfPermission(getActivity(), permissionNeeded);

            // if permission not granted
            if (permissionCode != PackageManager.PERMISSION_GRANTED) {
                // should show the explanation?
                if (ActivityCompat.shouldShowRequestPermissionRationale(getActivity(), permissionNeeded)) {
                    // show
                    Toast.makeText(getActivity(), "I need " + permissionNeeded, Toast.LENGTH_LONG).show();
                }

                listPermissionsNeededFiltered.add(permissionNeeded);
            }
        }

        Log.d("HERE", getPermissionState(Manifest.permission.SET_ALARM).toString());

//        if (!listPermissionsNeededFiltered.isEmpty()) {
//            Log.d("HERE", Integer.toString(listPermissionsNeededFiltered.size()));
//            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
//                getActivity().requestPermissions(
//                        listPermissionsNeededFiltered.toArray(new String[listPermissionsNeededFiltered.size()]),
//
//                );
//            }
//            else {
//                ActivityCompat.requestPermissions(getActivity(),
//                    listPermissionsNeededFiltered.toArray(new String[listPermissionsNeededFiltered.size()]),
//                    203999
//                    );
//            }
//
//            // return false;
//        }

        // return true;
    }

    /**
     * Set the exact alarm using a appropriate date and alarm name
     * @param call Passing a { date: long, name: string } object
     */
    @PluginMethod()
    public void set(PluginCall call) {
        JSObject returnValue = new JSObject();

//        // check the permissions
//        if (!checkAvailablePermissions(getActivity())) {
//            Log.d("!!!HERE", "Permissions not granted");
//
////            returnValue.put("status", false);
////            returnValue.put("permissions", )
////            call.resolve(returnValue);
//        }

    }

//    @PluginMethod()
//    public void set2(PluginCall call) {
//        // TODO: Check if permissions granted
//        JSObject returnValue = new JSObject();
//
//        // getting the date when the alarm should be set
//        long date = call.getLong("date");
//        String name = call.getString("name");
//        Log.d("HERE", Long.toString(date));
//
//        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
//            // creating Alarm view intent
//            Intent alarmIntent = new Intent(getContext(), AlarmReceiver.class);
//            alarmIntent.putExtra("name", name);
//            PendingIntent alarmPendingIntent = PendingIntent.getBroadcast(
//                    getContext(),
//                    0,
//                    alarmIntent,
//                    PendingIntent.FLAG_CANCEL_CURRENT + PendingIntent.FLAG_IMMUTABLE
//                );
//
//            // TODO: Create deeplink to current alarm settings maybe
//            // creating Alarm info view intent
//            Intent infoIntent = new Intent(getContext(), MainActivity.class);
//            PendingIntent infoPendingIntent = PendingIntent.getActivity(
//                    getContext(),
//                    0,
//                    infoIntent,
//                    PendingIntent.FLAG_IMMUTABLE
//            );
//
//            // setting the date in millis that we got from Typescript
//            Calendar calendar = Calendar.getInstance();
//            calendar.setTimeInMillis(date);
//
//            // creating alarm manager ans setting the alarm clock
//            AlarmManager alarmManager = (AlarmManager) getContext().getSystemService(Context.ALARM_SERVICE);
//
//            /*alarmManager.setInexactRepeating(
//                    AlarmManager.RTC_WAKEUP,
//                    calendar.getTimeInMillis(),
//                    AlarmManager.INTERVAL_HOUR,
//                    pendingIntent
//            );*/
//            alarmManager.setAlarmClock(
//                    new AlarmManager.AlarmClockInfo(calendar.getTimeInMillis(), infoPendingIntent),
//                    alarmPendingIntent
//            );
//
//            returnValue.put("status", true);
//            call.resolve(returnValue);
//            return;
//        }
//
//        Toast.makeText(getContext(), "NO SUPPORT", Toast.LENGTH_LONG).show();
//
//        returnValue.put("status", true);
//        call.resolve(returnValue);
//    }
//
//    @PluginMethod
//    public void unset(PluginCall call) {
//
//    }
//
//    public boolean granted(AppCompatActivity activity, String permission) {
//        // ask permissions for full screen intent
//        if (ContextCompat.checkSelfPermission(activity, permission)
//                != PackageManager.PERMISSION_GRANTED) {
//            // Permission is not granted
//            // Explanation
//            if (ActivityCompat.shouldShowRequestPermissionRationale(activity, permission)) {
//                return false;
//            }
//
//            ActivityCompat.requestPermissions(
//                    activity,
//                    new String[] { permission },
//                    0
//                    );
//            return true;
//        }
//
//        return true;
//    }
//
//    @PluginMethod
//    public void permissions(PluginCall call) {
//        // init return object
//        JSObject returnObject = new JSObject();
//
//        // init variables for check permissions
//        boolean isGranted = true;
//        List<String> notGrantedList = new ArrayList<String>();
//
//        // if API level > 29
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
//            if (!granted(getActivity(), Manifest.permission.USE_FULL_SCREEN_INTENT)) {
//                isGranted = false;
//                notGrantedList.add(Manifest.permission.USE_FULL_SCREEN_INTENT);
//            }
//        }
//
//        // send the explanation task for the TypeScript
//        returnObject.put("isGranted", isGranted);
//        returnObject.put("notGrantedTo", notGrantedList);
//
//        call.resolve(returnObject);
//    }

    /**
     * Building the alarm notification
     * @param alarmName name of the alarm
     * @param alarmContext basically name of the stop
     * @param alarmId must be unique or alarm will be rewritten
     * @param alarmVibration vibration pattern of alarm
     * @param alarmSound the uri to the music for alarm
     */
    /*public void build(String alarmName, String alarmContext, int alarmId, long[] alarmVibration, Uri alarmSound) {
        // making the full screen intent
        Intent alarmIntent = new Intent(getContext(), AlarmActivity.class);
        alarmIntent.putExtra("name", alarmName);
        PendingIntent alarmPendingIntent = PendingIntent.getActivity(
                getContext(),
                1,
                alarmIntent,
                PendingIntent.FLAG_IMMUTABLE
        );
    }*/
}
