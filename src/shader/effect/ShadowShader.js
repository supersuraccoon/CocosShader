// ShadowShader
var ShadowShader = ShaderEffectProgram.extend({
    initWithString:function(vertexShader, framentShader, resolution) {
        if (this._super(vertexShader, framentShader)) {
            return true;
        }      
        return false;
    }
});
ShadowShader.create = function() {
    var shaderProgram = new ShadowShader();
    shaderProgram.initWithString(
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.getCommonShaderRealPath("SHADER_POSITION_TEXTURE_COLOR.vsh")
        ),
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.ShaderSpriteFolder + "SHADER_SHADOW.fsh"
        )
    );
    return shaderProgram;
};

