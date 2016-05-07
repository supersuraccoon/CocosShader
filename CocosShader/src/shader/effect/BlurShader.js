// BlurShader
var BlurShader = ShaderEffectProgram.extend({
    initWithString:function(vertexShader, framentShader, spriteSize) {
        if (this._super(vertexShader, framentShader)) {
            if (cc.sys.isNative) {
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this);
                glProgram_state.setUniformVec2(
                    "u_textureSize", 
                    {
                        x: 1 / spriteSize.width,
                        y: 1 / spriteSize.height
                    }
                );
            }
            else {
                this.setUniformLocationWith2f(
                    this.getUniformLocationForName('u_textureSize'), 
                    1 / spriteSize.width, 
                    1 / spriteSize.height
                );
            }
            return true;
        }      
        return false;
    }
});
BlurShader.create = function(spriteSize) {
    var shaderProgram = new BlurShader();
    shaderProgram.initWithString(
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.getCommonShaderRealPath("SHADER_POSITION_TEXTURE_COLOR.vsh")
        ),
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.ShaderSpriteFolder + "SHADER_BLUR.fsh"
        ),
        spriteSize
    );
    return shaderProgram;
};
