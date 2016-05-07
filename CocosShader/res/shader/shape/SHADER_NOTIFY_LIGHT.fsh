// https://www.shadertoy.com/view/XsXGzn

#ifdef GL_ES
precision highp float;
#endif

uniform vec2 center;
uniform vec2 resolution;

void main() 
{  
	float time = CC_Time[1];
	float radius =100.0;

    float distan = distance(center,gl_FragCoord.xy);
	float intensity = ((radius-distan)/radius);

	float offset = (sin(time)+1.0)/2.0;
	float final = ((offset+intensity)/2.0);

	gl_FragColor = vec4(0.0,0.0,final,1.0);
}

