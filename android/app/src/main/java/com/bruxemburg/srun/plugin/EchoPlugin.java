package com.bruxemburg.srun.plugin;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.media.AudioAttributes;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.widget.Toast;

import com.bruxemburg.srun.R;
import com.bruxemburg.srun.activity.AlarmActivity;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "Echo")
public class EchoPlugin extends Plugin {
    /**
     * Default method which I've got from Capacitor's docs
     */
    @PluginMethod()
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject returnValue = new JSObject();
        returnValue.put("value", value);
        call.resolve(returnValue);
    }

    /**
     * Custom method for calling a Toast providing the message from Typescript
     */
    @PluginMethod()
    public void print(PluginCall call) {
        String text = call.getString("text");

        Toast toast = Toast.makeText(getContext(), text, Toast.LENGTH_LONG);
        toast.show();
        call.resolve();
    }

    /**
     * Custom method for checking the Alarm sound and playing it as a ringtone
     */
    @PluginMethod()
    public void ring(PluginCall call) {
        Uri alarmTone = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM);
        Ringtone ringtone = RingtoneManager.getRingtone(getContext(), alarmTone);

        ringtone.play();
        call.resolve();
    }

    /**
     * Custom method to send a repeating notification with default Alarm sound
     */
    @PluginMethod()
    public void notify(PluginCall call) {
        Uri alarmTone = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM);

        Intent intent = new Intent(getContext(), AlarmActivity.class);
        intent.putExtra("name", "Test alarm");
        PendingIntent pendingIntent = PendingIntent.getActivity(getContext(), 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);

        Notification.Builder notificationBuilder = new Notification.Builder(getContext())
                .setContentTitle(call.getString("title", "SRUN Wakeup"))
                .setContentText(call.getString("content", "Alarming... bruh!"))
                .setSmallIcon(R.mipmap.ic_launcher)
                .setAutoCancel(true)
                .setPriority(Notification.PRIORITY_HIGH)
                .setSound(alarmTone)
                .setContentIntent(pendingIntent);

        NotificationManager notificationManager = (NotificationManager) getContext()
                .getSystemService(Context.NOTIFICATION_SERVICE);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            String channelId = "SRUN_ALARMS_01";
            String name = "SRUN ALARMS";
            String desc = "Where all your alarms are waiting...";
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel channel = new NotificationChannel(channelId, name, importance);
            channel.setDescription(desc);
            channel.enableLights(true);
            channel.setLightColor(Color.BLUE);
            channel.enableVibration(true);
            channel.setVibrationPattern(new long[] { 100, 200, 300, 400, 500, 400, 100, 300, 500});
            channel.setShowBadge(false);
            channel.setSound(alarmTone, Notification.AUDIO_ATTRIBUTES_DEFAULT);
            channel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
            notificationBuilder.setChannelId(channelId);
            notificationManager.createNotificationChannel(channel);
        }

        Notification notification = notificationBuilder.build();
        notification.flags = Notification.FLAG_INSISTENT;
        notification.sound = alarmTone;

        notificationManager.notify(0, notification);

        // try to return value
        JSObject returnValue = new JSObject();
        returnValue.put("status", true);

        call.resolve(returnValue);
    }
}
