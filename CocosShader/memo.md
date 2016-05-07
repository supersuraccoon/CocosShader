. OpenGL Blending
. Shader
. Grid
. Texture


Multiply = GL_DST_COLOR, GL_ONE_MINUS_SRC_ALPHA
Screen = GL_MINUS_DST_COLOR, GL_ONE
Linear Dodge = GL_ONE, GL_ONE
Add: GL_ONE, GL_ONE
Blend: GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA
Multiply: various, such as the one you mentioned: GL_DST_COLOR, GL_ONE_MINUS_SRC_ALPHA


shadertoy =>

iResolution		=>		resolution
fragCoord		=>		gl_FragCoord
iGlobalTime		=>		CC_Time[1]
fragColor		=>		gl_FragColor


// grid reuse
fold effect


// bind to sprite tex
// var tex = this.sprite1.getTexture();
// var g = new cc.Grid3D(GRID_SIZE, tex, false, this.sprite1.getBoundingBox());

// bind to screen tex + screen rect
// var g = new cc.Grid3D(GRID_SIZE, null, false, cc.rect(0, 0, 0, 0));

// bind to screen tex + sprite rect

