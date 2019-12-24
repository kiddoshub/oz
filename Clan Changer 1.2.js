var ind = 0;
var di = true;
var lt = 0;
var fl = false;
var md = true;
function d() {
    var e = UI.GetValue("Misc", "JAVASCRIPT", "Misc items", "clantag enable");
    if (e) {
        var m = UI.GetString("Misc", "JAVASCRIPT", "Misc items", "clantag mode");
        var c = UI.GetString("Misc", "JAVASCRIPT", "Misc items", "clantag");
        var p = UI.GetString("Misc", "JAVASCRIPT", "Misc items", "clantag prefix");
        var s = UI.GetString("Misc", "JAVASCRIPT", "Misc items", "clantag suffix");
        var d = UI.GetValue("Misc", "JAVASCRIPT", "Misc items", "clantag delay");
        if (m.includes("scroll")) {
            if (Globals.Curtime() > lt + d) {
                if (di) {
                    ind++;
                    var oc = "";
                    for (var i = 0; i < ind; i++) {
                        oc += c[i];
                    }
                    Local.SetClanTag(p + oc + s);
                } else {
                    ind--;
                    var oc = "";
                    for (var i = 0; i < ind; i++) {
                        oc += c[i];
                    }
                    Local.SetClanTag(p + oc + s);
                }
                if (c[ind] == null)  {
                    di = false;
                } else if (ind == 0) {
                    di = true;
                }
                lt = Globals.Curtime();
            }
        } else if(m.includes("flash")) {
            if (Globals.Curtime() > lt + d) {
                fl = !fl;
                lt = Globals.Curtime();
                if (fl) {
                    Local.SetClanTag(p + c + s);
                } else {
                    Local.SetClanTag(p + s);
                }
            }
        } else if(m.includes("slide")) {
            if (Globals.Curtime() > lt + d) {
                if (md) {
                    var oc = "";
                    for (var i = 0; i < ind; i++) {
                        oc += c[i];
                    }
                    Local.SetClanTag(p + oc + s);
                } else {
                    var oc = "";
                    for (var i = ind; 1; i++) {
                        if (c[i] == null) break;
                        oc += c[i];
                    }
                    Local.SetClanTag(p + oc + s);
                }
                ind++;
                if (c[ind] == null) {
                    ind = 0;
                    md = !md;
                }
                lt = Globals.Curtime();
            }
        } else {
            Local.SetClanTag(p + c + s);
        }
    }
}
function s() {
    UI.AddCheckbox("clantag enable")
    UI.AddTextbox("clantag");
    UI.AddTextbox("clantag prefix");
    UI.AddTextbox("clantag suffix");
    UI.AddMultiDropdown("clantag mode", ["scroll", "slide", "flash"]);
    UI.AddSliderFloat("clantag delay", .1, 2);
    UI.SetValue("Misc", "JAVASCRIPT", "Misc items", "clantag delay", .5);
    Cheat.RegisterCallback("CreateMove", "d");
}
s();