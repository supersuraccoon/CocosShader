// FogShader
var FogShader = ShaderEffectProgram.extend({
    initWithString:function(vertexShader, framentShader, fogColor, fogDensity) {
        if (this._super(vertexShader, framentShader)) {
            if (cc.sys.isNative) {
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this);
                glProgram_state.setUniformVec4(
                    "u_fogColor", 
                    {
                        x: fogColor.r / 255.0, 
                        y: fogColor.g / 255.0,
                        z: fogColor.b / 255.0,
                        w: fogColor.a / 255.0
                    }
                );
                glProgram_state.setUniformFloat(
                    "u_fogDensity", 
                    fogDensity
                );
            }
            else {
                this.setUniformLocationWith4f(
                    this.getUniformLocationForName('u_fogColor'), 
                    fogColor.r / 255.0, 
                    fogColor.g / 255.0, 
                    fogColor.b / 255.0, 
                    fogColor.a / 255.0
                );
                this.setUniformLocationWith1f(
                    this.getUniformLocationForName('u_fogDensity'), 
                    fogDensity
                );
            }
            return true;
        }      
        return false;
    }
});
FogShader.create = function(fogColor, fogDensity) {
    var shaderProgram = new FogShader();
    shaderProgram.initWithString(
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.getCommonShaderRealPath("SHADER_POSITION_TEXTURE_COLOR.vsh")
        ),
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.ShaderSpriteFolder + "SHADER_FOG.fsh"
        ), 
        fogColor, 
        fogDensity
    );
    return shaderProgram;
};

