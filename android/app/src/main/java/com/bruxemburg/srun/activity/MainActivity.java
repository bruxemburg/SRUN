package com.bruxemburg.srun.activity;

import android.os.Bundle;

import com.bruxemburg.srun.plugin.AlarmPlugin;
import com.bruxemburg.srun.plugin.EchoPlugin;
import com.getcapacitor.BridgeActivity;
import java.util.Arrays;


public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        registerPlugins(
                Arrays.asList(AlarmPlugin.class, EchoPlugin.class)
        );
    }
}
