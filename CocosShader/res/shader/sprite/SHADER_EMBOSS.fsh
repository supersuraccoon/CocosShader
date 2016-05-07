#ifdef GL_ES
precision lowp float;
#endif

varying vec2 v_texCoord;
uniform vec2 u_textureSize;

void main(void) {
	float u_kernel[9];
	u_kernel[0] = -2.0, u_kernel[1] = -1.0, u_kernel[2] = 0.0;
	u_kernel[3] = -1.0, u_kernel[4] = 1.0, u_kernel[5] = 1.0;
	u_kernel[6] = 0.0, u_kernel[7] = 1.0, u_kernel[8] = 2.0;
	vec4 normalColor = texture2D(CC_Texture0, v_texCoord).rgba;
   	vec4 colorSum = texture2D(CC_Texture0, v_texCoord + u_textureSize * vec2(-1, -1)) * u_kernel[0] +
			     	texture2D(CC_Texture0, v_texCoord + u_textureSize * vec2( 0, -1)) * u_kernel[1] +
			     	texture2D(CC_Texture0, v_texCoord + u_textureSize * vec2( 1, -1)) * u_kernel[2] +
			     	texture2D(CC_Texture0, v_texCoord + u_textureSize * vec2(-1,  0)) * u_kernel[3] +
			     	texture2D(CC_Texture0, v_texCoord + u_textureSize * vec2( 0,  0)) * u_kernel[4] +
			     	texture2D(CC_Texture0, v_texCoord + u_textureSize * vec2( 1,  0)) * u_kernel[5] +
			     	texture2D(CC_Texture0, v_texCoord + u_textureSize * vec2(-1,  1)) * u_kernel[6] +
			     	texture2D(CC_Texture0, v_texCoord + u_textureSize * vec2( 0,  1)) * u_kernel[7] +
			     	texture2D(CC_Texture0, v_texCoord + u_textureSize * vec2( 1,  1)) * u_kernel[8];
   	float kernelWeight = u_kernel[0] +
					     u_kernel[1] +
					     u_kernel[2] +
					     u_kernel[3] +
					     u_kernel[4] +
					     u_kernel[5] +
					     u_kernel[6] +
					     u_kernel[7] +
					     u_kernel[8] ;
   	if (kernelWeight <= 0.0) {
     	kernelWeight = 1.0;
   	}
   	gl_FragColor = vec4((colorSum / kernelWeight).rgb, normalColor.a);
}