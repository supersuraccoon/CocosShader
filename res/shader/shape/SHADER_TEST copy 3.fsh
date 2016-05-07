// https://www.shadertoy.com/view/XsXGzn

#ifdef GL_ES
precision highp float;
#endif

uniform vec2 center;
uniform vec2 resolution;

void main() 
{  
    float time = CC_Time[1] * 1.5;
    float frame = 2.0 + (sin(time)+1.0);
    // red frame
    if (gl_FragCoord.x > frame &&
        gl_FragCoord.y > frame &&
        gl_FragCoord.x < (resolution.x - frame) && 
        gl_FragCoord.y < (resolution.y - frame)) {
        gl_FragColor = vec4(0.0,0.0,0.0,0.0);
    }
    else {
        gl_FragColor = vec4(0.0,0.0,1.0,0.8);
    }
}

