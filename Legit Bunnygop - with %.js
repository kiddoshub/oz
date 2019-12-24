var local = Entity.GetLocalPlayer();
var rand;

UI.AddCheckbox("Legit Bunny Hop");
UI.AddSliderInt("Jump Chance", 0, 100);

Global.PrintColor([255, 0, 255, 255], "\n------------------------\n[LBh] v1.0 by Ultranite\n------------------------\n");

function calc() {
    var fv = Entity.GetProp(local, "CBasePlayer", "m_flFallVelocity");
    var max = UI.GetValue("Script items", "Jump Chance", "Integer");
    var enabled = UI.GetValue("Script items", "Legit Bunny Hop", "Enabled");

    if (enabled == 1) {
        if (fv > 1 || fv < -1) {
            rand = Math.floor(Math.random() * 100);

            if (rand < max) {
                UI.SetValue("Misc", "GENERAL", "Movement", "Auto bunnyhop", true);
            } else {
                UI.SetValue("Misc", "GENERAL", "Movement", "Auto bunnyhop", false);
            }
        }
    }

}

Global.RegisterCallback("CreateMove", "calc");