/* ----

Coded by @elleqt.
size[ 0 ] > (Currenty not using)
size[ 1 ] > Start Animation Position
Size[ 2 ] > End Animation Position
Size[ 3 ][ 0 ] > Height of Screen
Size[ 3 ][ 1 ] > Widht of Screen
---- */
var size = [ 0, 1081, 0, Render.GetScreenSize() ];
size[ 2 ] = size[ 3 ][ 0 ] / 10;
size[ 0 ] = size[ 3 ][ 1 ] + 1;
var delay = [size[ 2 ], 0];
function getCustomValue( field )
{
  var value = UI.GetValue( "MISC", "JAVASCRIPT", "Script items", field );
  return value;
}

function Background()
{
	speed = getCustomValue('Animation Speed');
	size[ 3 ] = Render.GetScreenSize();
	if ( !UI.IsMenuOpen( ) )
	{
		size[ 1 ] = size[ 0 ];
		delay[ 1 ] = 0;
		return;
	}
	if( delay[ 0 ] > delay[ 1 ] )
	{
		if( size[ 1 ] > size[ 2 ] ) { size[ 1 ] -= speed; }
		else
		{ 
			size[ 1 ] = size[ 2 ];
		}
		background = Render.AddTexture( "ot/scripts/asuna.png" );
		Render.TexturedRect( size[ 3 ][ 0 ] - (size[ 3 ][ 0 ] / 2) - (size[ 3 ][ 0 ] / 4) - (size[ 3 ][ 0 ] / 3) , size[ 1 ], size[ 3 ][ 0 ] / 2, size[ 3 ][ 1 ] / 2, background );
		if ( delay[ 1 ] < delay[ 0 ]-1 ) { delay[ 1 ]++; }
	}
}

UI.AddLabel("<> ANIMATED BACKGROUND <>")
UI.AddSliderInt('Animation Speed', 1, 40);
UI.AddLabel("<> ANIMATED BACKGROUND END <>")

Cheat.RegisterCallback( "Draw", "Background" );
