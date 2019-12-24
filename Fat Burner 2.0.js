//source: wikipedia
const calories_per_kg_day = 28.66;
const calories_per_kg_hour = calories_per_kg_day / 24;
const calories_per_kg_minute = calories_per_kg_hour / 60;
const calories_per_kg_second = calories_per_kg_minute / 60;

var calories_burned = 0;
var calories_holder = UI.AddSliderFloat( "calories_burner_holder", 0, 9999999 );
UI.SetEnabled( "Script items", "calories_burner_holder", false );
calories_burned = UI.GetValue.apply( this, calories_holder );

var weight_box = UI.AddTextbox( "Your weight" );

var last_time = Global.Realtime( );
function calc_calories( ) {
    if( Global.Realtime( ) - last_time > 5.0 ) {
        var weight = Math.floor( UI.GetString.apply( this, weight_box ) );
        if( weight == NaN )
            return;
        
        var calories = weight * calories_per_kg_second * 5;
        calories_burned += calories;
        
        UI.SetValue( "Script items", "calories_burner_holder", calories_burned );
        
        last_time = Global.Realtime( );
    }
}

function draw( ) {
    calc_calories( );
    
    var screen = Global.GetScreenSize( );
    var xpos = screen[ 0 ] - 270;
    var ypos = screen[ 1 ] / 2 - 85 / 2;
    
    Render.Line( xpos + 2, ypos - 2, xpos + 198, ypos - 2, [ 0, 0, 0, 180 ] );
    Render.Line( xpos + 1, ypos - 1, xpos + 199, ypos - 1, [ 0, 0, 0, 180 ] );
    Render.FilledRect( xpos, ypos, 200, 30, [ 0, 0, 0, 180 ] );
    Render.FilledRect( xpos, ypos + 30, 200, 55, [ 55, 55, 55, 150 ] );
    Render.Line( xpos + 1, ypos + 85, xpos + 199, ypos + 85, [ 55, 55, 55, 150 ] );
    Render.Line( xpos + 2, ypos + 86, xpos + 198, ypos + 86, [ 55, 55, 55, 150 ] );
    
    Render.String( xpos + 100, ypos + 7, 1, "PsycH.pW' fitness meter", [ 255, 255, 255, 255 ], 10 );
    Render.String( xpos + 10, ypos + 40, 0, "Calories burned:", [ 255, 255, 255, 255 ], 10 );
    Render.String( xpos + 10, ypos + 60, 0, Number( calories_burned ).toFixed( 2 ) + " kcal", [ 255, 255, 255, 255 ], 10 );
}

Global.RegisterCallback( "Draw", 'draw' );