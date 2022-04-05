package com.bruxemburg.srun.receiver;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.media.AudioAttributes;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.widget.Toast;

import androidx.annotation.RequiresApi;

import com.bruxemburg.srun.R;
import com.bruxemburg.srun.activity.AlarmActivity;

public class AlarmReceiver extends BroadcastReceiver {
    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onReceive(Context context, Intent intent) {
        Toast.makeText(context, "time", Toast.LENGTH_LONG).show();

        // get the sound (default)
        Uri alarmSound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM);

        // get alarm name
        String name = intent.getStringExtra("name");

        Intent alarmIntent = new Intent(context, AlarmActivity.class);
        alarmIntent.putExtra("name", name);
        PendingIntent alarmPendingIntent = PendingIntent.getActivity(
                context,
                1,
                alarmIntent,
                PendingIntent.FLAG_UPDATE_CURRENT + PendingIntent.FLAG_IMMUTABLE
        );

        Notification.Builder notificationBuilder = new Notification.Builder(context)
                .setContentTitle(name)
                .setContentText("Wake up! Your stop is next.")
                .setSmallIcon(R.mipmap.ic_launcher)
                .setAutoCancel(false)
                .setPriority(Notification.PRIORITY_HIGH)
                .setSound(Settings.System.DEFAULT_ALARM_ALERT_URI)
                .setContentIntent(alarmPendingIntent);

        NotificationManager notificationManager = (NotificationManager) context
                .getSystemService(Context.NOTIFICATION_SERVICE);

        String channelId = "SRUN_ALARMS_01";
        String channelName = "SRUN ALARMS";
        String channelDesc = "Sleep calmly while we handle all your alarming routine";
        int importance = NotificationManager.IMPORTANCE_HIGH;
        NotificationChannel channel = new NotificationChannel(channelId, channelName, importance);
        channel.setDescription(channelDesc);
        channel.enableLights(true);
        channel.setLightColor(Color.BLUE);
        channel.enableVibration(true);
        channel.setVibrationPattern(new long[] { 100, 200, 300, 400, 500, 400, 100, 300, 500});
        channel.setShowBadge(true);
        AudioAttributes audioAttributes = new AudioAttributes.Builder()
                .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                .setUsage(AudioAttributes.USAGE_ALARM)
                .build();
        channel.setSound(Settings.System.DEFAULT_ALARM_ALERT_URI, audioAttributes);
        channel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
        notificationBuilder.setChannelId(channelId);
        notificationManager.createNotificationChannel(channel);

        Notification notification = notificationBuilder.build();
        notification.flags = Notification.FLAG_INSISTENT;
        notification.sound = alarmSound;

        notificationManager.notify(1, notification);
    }
}
