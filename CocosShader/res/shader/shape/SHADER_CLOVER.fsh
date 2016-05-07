// https://www.shadertoy.com/view/XsXGzn

#ifdef GL_ES
precision highp float;
#endif

uniform vec2 center;
uniform vec2 resolution;

void main() 
{  
	float time = CC_Time[1];
	vec2 q = 0.6 * (2.0*gl_FragCoord.xy-resolution.xy)/min(resolution.y,resolution.x);

    float a = atan(q.x,q.y);
    float r = length(q);
    float s = 0.5 + 0.5*sin(3.0*a + time);
    float g = sin(1.57+3.0*a+time);
    float d = 0.15 + 0.3*sqrt(s) + 0.15*g*g;
    float h = r/d;
    float f = 1.0-smoothstep( 0.95, 1.0, h );
    h *= 1.0-0.5*(1.0-h)*smoothstep(0.95+0.05*h,1.0,sin(3.0*a+time));
	
	// vec3 bcol = vec3(0.9+0.1*q.y,1.0,0.9-0.1*q.y);
	vec3 bcol = vec3(0.0);
	// bcol *= 1.0 - 0.5*r;
	h = 0.1 + h;
    vec3 col = mix( bcol, 1.2*vec3(0.6*h,0.2+0.5*h,0.0), f );

    if (col.r == 0.0 && col.g == 0.0 && col.b == 0.0) {
    	gl_FragColor = vec4( col, 0.0 );
    }
    else {
    	gl_FragColor = vec4( col, 1.0 );
    }
}

