var flakes_count = 500;
var flakes = [];
var screenSize = Global.GetScreenSize();
var isOutside = null;
var lastEntity = null;

function randomFlakes() 
{
    var i = 0;
    while(i++ < flakes_count) 
    {
        flakes.push({x : Math.random() * screenSize[0], y : Math.random() * screenSize[1], alpha: Math.random(), x_Move: 0.0, x_Move_Direction: true, down_Time: 0 });
    }
}

function onScriptInit() 
{
    randomFlakes();
    Global.RegisterCallback("Draw", "onDrawEvent");
    UI.AddSliderInt("Snow amount", 100, 1000);
    UI.AddSliderFloat("Flake size", 5.0, 10.0);
    UI.SetValue("MISC", "JAVASCRIPT", "Script Items", "Snow amount", flakes_count);
}

function onDrawEvent() 
{
    var localPlayer = Entity.GetLocalPlayer();

    if(!localPlayer)
        return;

    var entityHead = null;

    if(Entity.IsAlive(localPlayer)) 
    {
        entityHead = Entity.GetHitboxPosition(localPlayer, 0);

        if(lastEntity != localPlayer)
            isOutside = null;

        lastEntity = localPlayer;
    }
    else {
        var spectactingPlayer = Entity.GetProp(localPlayer, "CBasePlayer", "m_hObserverTarget");

        if(spectactingPlayer !== "m_hObserverTarget") 
        {
            entityHead = Entity.GetHitboxPosition(spectactingPlayer, 0);

            if(lastEntity != spectactingPlayer)
                isOutside = null;

            lastEntity = spectactingPlayer;
        }
        else 
            return;
    }

    var traceResult = Trace.Line(lastEntity, entityHead, [entityHead[0], entityHead[1], entityHead[2] + 1000]);

    var snowAmount = UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Snow amount");

    if(flakes_count != snowAmount) 
    {
        while(snowAmount != flakes.length) 
        {
            if(snowAmount < flakes.length)
                flakes.pop();
            else
                flakes.push({x : Math.random() * screenSize[0], y : Math.random() * screenSize[1], alpha: Math.random(), x_Move: 0.0, x_Move_Direction: true, down_Time: 0 });
        }

        flakes_count = snowAmount;
    }
        
    if(isOutside == null) 
    {
        isOutside = traceResult[1] == 1.0;
        
        if(!isOutside)
        {
            for(var i = 0; i < flakes.length; i ++)
                flakes[i].y = screenSize[1] + 50;
        }
    }

    if(isOutside != (traceResult[1] == 1.0))
    {
        isOutside = traceResult[1] == 1.0;

        if(isOutside)
        {
            flakes = [];
            randomFlakes();
        }
    }

    var flakeSize = UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Flake size");
    var realTime = Global.Realtime();

    for(var i = 0; i < flakes.length; i ++) 
    {
        if(flakes[i].down_Time) 
        {
            Render.Line(flakes[i].x - flakeSize/2, flakes[i].y, flakes[i].x + flakeSize/2, flakes[i].y, [255, 255, 255, flakes[i].alpha * 127]);
            Render.Line(flakes[i].x, flakes[i].y - flakeSize/2, flakes[i].x, flakes[i].y + flakeSize/2, [255, 255, 255, flakes[i].alpha * 127]);
            Render.Line(flakes[i].x - flakeSize/2, flakes[i].y - flakeSize/2, flakes[i].x + flakeSize/2, flakes[i].y + flakeSize/2, [255, 255, 255, flakes[i].alpha * 127]);
            Render.Line(flakes[i].x + flakeSize/2, flakes[i].y - flakeSize/2, flakes[i].x - flakeSize/2, flakes[i].y + flakeSize/2, [255, 255, 255, flakes[i].alpha * 127]);
            
            if(flakes[i].down_Time > realTime)    
                continue;

            if(!isOutside)
                continue;

            flakes[i].down_Time = 0;
            flakes[i].x = Math.random() * screenSize[0]; 
            flakes[i].x_Move = 0.0;
            flakes[i].x_Move_Direction = true;
            flakes[i].y = 0;
            flakes[i].alpha = Math.random();
        }

        flakes[i].y += 0.5 + Math.random() * 0.5;

        if(!isOutside)
            flakes[i].y ++;

        flakes[i].x_Move += 0.0025 * (flakes[i].x_Move_Direction === true ? 1 : -1);

        if(flakes[i].x_Move >= 0.07 || flakes[i].x_Move <= 0.0) 
            flakes[i].x_Move_Direction = !flakes[i].x_Move_Direction;
        else
            flakes[i].x += flakes[i].x_Move;

        Render.Line(flakes[i].x - flakeSize/2, flakes[i].y, flakes[i].x + flakeSize/2, flakes[i].y, [255, 255, 255, flakes[i].alpha * 127]);
        Render.Line(flakes[i].x, flakes[i].y - flakeSize/2, flakes[i].x, flakes[i].y + flakeSize/2, [255, 255, 255, flakes[i].alpha * 127]);
        Render.Line(flakes[i].x - flakeSize/2, flakes[i].y - flakeSize/2, flakes[i].x + flakeSize/2, flakes[i].y + flakeSize/2, [255, 255, 255, flakes[i].alpha * 127]);
        Render.Line(flakes[i].x + flakeSize/2, flakes[i].y - flakeSize/2, flakes[i].x - flakeSize/2, flakes[i].y + flakeSize/2, [255, 255, 255, flakes[i].alpha * 127]);

        if(flakes[i].y >= screenSize[1] - 5) 
            flakes[i].down_Time = realTime + 0.5;
    }
}

onScriptInit();