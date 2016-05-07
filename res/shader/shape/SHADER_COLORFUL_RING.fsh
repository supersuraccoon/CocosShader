//https://www.shadertoy.com/view/XdlSDs

#ifdef GL_ES
precision highp float;
#endif

uniform vec2 center;
uniform vec2 resolution;

void main() 
{  
	float time = CC_Time[1];

    vec2 p = (2.0*gl_FragCoord.xy-resolution.xy)/resolution.y;
    float tau = 3.1415926535*2.0;
    float a = atan(p.x,p.y);
    float r = length(p)*0.75;
    vec2 uv = vec2(a/tau,r);
	
	//get the color
	float xCol = (uv.x - (time / 3.0)) * 3.0;
	xCol = mod(xCol, 3.0);
	vec3 horColour = vec3(0.25, 0.25, 0.25);
	
	if (xCol < 1.0) {
		
		horColour.r += 1.0 - xCol;
		horColour.g += xCol;
	}
	else if (xCol < 2.0) {
		
		xCol -= 1.0;
		horColour.g += 1.0 - xCol;
		horColour.b += xCol;
	}
	else {
		
		xCol -= 2.0;
		horColour.b += 1.0 - xCol;
		horColour.r += xCol;
	}

	// draw color beam
	uv = (2.0 * uv) - 1.0;
	float beamWidth = (0.7+0.5*cos(uv.x*10.0*tau*0.15*clamp(floor(5.0 + 10.0*cos(time)), 0.0, 10.0))) * abs(1.0 / (30.0 * uv.y));
	vec3 horBeam = vec3(beamWidth);
	vec3 finalColor = vec3((( horBeam) * horColour));
	if (finalColor.r == 0.0 && finalColor.g == 0.0 && finalColor.b == 0.0) {
		gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
	}
	else {
		gl_FragColor = vec4(finalColor, 1.0);
	}
}  

