#ifdef GL_ES
precision lowp float;
#endif

varying vec2 v_texCoord;
uniform vec2 u_textureSize;

void main(void) {
	vec4 normalColor = texture2D(CC_Texture0, vec2(v_texCoord.x + 0.3, v_texCoord.y + 0.5)).rgba;
   	gl_FragColor = normalColor;
}