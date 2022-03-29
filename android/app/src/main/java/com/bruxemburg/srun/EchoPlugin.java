package com.bruxemburg.srun;

import android.widget.Toast;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "Echo")
public class EchoPlugin extends Plugin {
    @PluginMethod()
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject returnValue = new JSObject();
        returnValue.put("value", value);
        call.resolve(returnValue);
    }

    @PluginMethod()
    public void print(PluginCall call) {
        String text = call.getString("text");

        Toast toast = Toast.makeText(getContext(), text, Toast.LENGTH_LONG);
        toast.show();
        call.resolve();
    }
}
