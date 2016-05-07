#ifdef GL_ES
precision lowp float;
#endif

varying vec2 v_texCoord;

void main(void) {
	vec4 normalColor = texture2D(CC_Texture0, v_texCoord).rgba;
	gl_FragColor = vec4(normalColor.r, normalColor.g, normalColor.b, normalColor.a);
}