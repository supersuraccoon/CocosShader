#ifdef GL_ES
precision lowp float;
#endif

varying vec2 v_texCoord;
uniform vec4 u_fogColor;
uniform float u_fogDensity;

void main(void) {
	vec4 CurrentColor = texture2D(CC_Texture0, v_texCoord);
	// distance to target
	float FogDistance = distance(vec2(0.49, 0.46), v_texCoord);
	// fog factor
	float FogFactor = exp(-abs(FogDistance * u_fogDensity));
	// linear blend between fog color and pixel color
	if (CurrentColor.a > 0.5) {
		gl_FragColor = mix(u_fogColor, CurrentColor, FogFactor);
	}
	else {
		gl_FragColor = CurrentColor;
	}
}