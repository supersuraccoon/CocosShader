// OutlineShader
var OutlineShader = ShaderEffectProgram.extend({
    initWithString:function(vertexShader, framentShader, outlineColor, threshold, radius) {
        if (this._super(vertexShader, framentShader)) {
            if (cc.sys.isNative) {
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this);
                glProgram_state.setUniformFloat("u_threshold", threshold);
                glProgram_state.setUniformVec3(
                    "u_outlineColor", 
                    {
                        x: outlineColor.r / 255, 
                        y: outlineColor.g / 255, 
                        z: outlineColor.b / 255
                    }
                );
                glProgram_state.setUniformFloat("u_radius", radius);
            }
            else {
                this.setUniformLocationWith1f(this.getUniformLocationForName('u_threshold'), threshold);
                this.setUniformLocationWith3f(this.getUniformLocationForName('u_outlineColor'), outlineColor.r / 255, outlineColor.g / 255, outlineColor.b / 255);
                this.setUniformLocationWith1f(this.getUniformLocationForName('u_radius'), radius);
            }
            return true;
        }      
        return false;
    }
});
OutlineShader.create = function(outlineColor, threshold, radius) {
    var shaderProgram = new OutlineShader();
    shaderProgram.initWithString(
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.getCommonShaderRealPath("SHADER_POSITION_TEXTURE_COLOR.vsh")
        ),
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.ShaderSpriteFolder + "SHADER_OUTLINE.fsh"
        ),
        outlineColor, 
        threshold, 
        radius
    );
    return shaderProgram;
};

