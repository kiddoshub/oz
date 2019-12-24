/**
*
* Title: gamesense spectator list
* Author: april#0001 - modifyed by Krusk
* Description: recreates the gamesense spectator list in a way or another...
*
*/

//region menu

// Backups our positions
const window_x = UI.AddSliderInt("window_x", 0, Global.GetScreenSize()[0])
const window_y = UI.AddSliderInt("window_y", 0, Global.GetScreenSize()[1])

//endregion

//region functions

/**
* Updates the visibility of our menu elements
*/
function update_menu()
{
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "window_x", false)
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "window_y", false)
}

// Update it whenever the script is activated.
update_menu();

/**
* Gets the names of the players spectating you
*
* @returns {[]}
*/
function get_spectators()
{
    var specs = [];
    const players = Entity.GetPlayers();

    for (i = 0; i < players.length; i++)
    {
        const cur = players[i];

        if (Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget") != "m_hObserverTarget") {
            const obs = Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget")

            if (obs === Entity.GetLocalPlayer())
            {
                const name = Entity.GetName(cur);
                specs.push(name);
            }
        }
    }

    return specs;
}

/**
* Checks if a point is inside a perimeter
*
* @param vec
* @param x
* @param y
* @param x2
* @param y2
* @returns {boolean}
*/
function in_bounds(vec, x, y, x2, y2)
{
    return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}

/**
* Where the magic happens
*/
function main()
{
    // Get our drawing properties
    const names = get_spectators();
    const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "window_x"),
            y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "window_y");

    // Rainbow color for our b

    // Draw the spectators list
    Render.String(x + 100, y + 10, 1, "" + "", [255, 255, 255, 255], 3);

    // For each player who's spectating us, draw their names
    for (i = 1; i < names.length; i++)
    {
        Render.String(x + 100, y + 10 * i, 1, names[i], [255, 255, 255, 255], 3);
    }

    // Handles the drag function
    if (UI.IsMenuOpen(1)){
        //info about where the spec list should be
        Render.String(x + 100, y + 10 *i, 1, "speclist info", [255, 255, 255, 255], 3)
        if (Global.IsKeyPressed(1)) {
        // Getting our mouse pos
        const mouse_pos = Global.GetCursorPosition();

        // Check if we're clicking and if we're in bounds of the drag area
            if (in_bounds(mouse_pos, x, y, x + 200, y + 30)) {

            // Update values (not the most efficient way to do it but wtvr)
            UI.SetValue("Misc", "JAVASCRIPT", "Script items", "window_x", mouse_pos[0] - 100);
            UI.SetValue("Misc", "JAVASCRIPT", "Script items", "window_y", mouse_pos[1] - 20);
            }
        }
    }

}
//endregion

//region callbacks

// Callback our main function
Global.RegisterCallback("Draw", "main")

//endregion