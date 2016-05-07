// TestShader
var TestShader = ShaderEffectProgram.extend({
    initWithString:function(vertexShader, framentShader, resolution) {
        if (this._super(vertexShader, framentShader)) {
            if (cc.sys.isNative) {
                // var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this);
                // glProgram_state.setUniformVec2(
                //     "resolution", 
                //     {
                //         x: resolution.width,
                //         y: resolution.height
                //     }
                // );
            }
            else {
                // this.setUniformLocationWith2f(
                //     this.getUniformLocationForName('resolution'), 
                //     resolution.width, 
                //     resolution.height
                // );
            }
            return true;
        }      
        return false;
    }
});
TestShader.create = function(resolution) {
    var shaderProgram = new TestShader();
    shaderProgram.initWithString(
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.getCommonShaderRealPath("SHADER_POSITION_TEXTURE_COLOR.vsh")
        ),
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.ShaderSpriteFolder + "SHADER_TEST.fsh"
        ),
        resolution
    );
    return shaderProgram;
};

