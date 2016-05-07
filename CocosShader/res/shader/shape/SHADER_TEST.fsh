// https://www.shadertoy.com/view/Xt2GWc

#ifdef GL_ES
precision highp float;
#endif

uniform vec2 resolution;

vec3 saturate(vec3 a){return clamp(a,0.,1.);}

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}
float rand(float n){
    return fract(cos(n*89.42)*343.42);
}

const float left = 1.82;
const float right = 2.08;


void main()
{
    vec2 uv = gl_FragCoord.xy;
    uv = (uv / resolution.y * 2.0) - 1.;
    uv.x += cos(uv.y* (uv.x+1.) * 3.) * 0.003;
    uv.y += cos(uv.x * 6.) * 0.00007;

    vec3 col = vec3(0.5,0.3,0.86);// bg
    
    uv -= 1.0;// vignette
    float vignetteAmt = 1.-dot(uv*0.5,uv* 0.12);
    col *= vignetteAmt;
    
    // grain
    col.rgb += (rand(uv)-.5)*.07;
    col.rgb = saturate(col.rgb);

    gl_FragColor = vec4(col, 1.);
}

