#ifdef GL_ES
precision lowp float;
#endif

varying vec2 v_texCoord;

float rand(vec2 co) {
  return fract(sin(dot(co.xy ,vec2(92.,80.))) + 
               cos(dot(co.xy ,vec2(41.,62.))) * 5.1);
}

void main(void) {
	vec2 rnd = vec2(rand(v_texCoord), rand(v_texCoord));
  	gl_FragColor = texture2D(CC_Texture0, v_texCoord + rnd * 0.05);
}