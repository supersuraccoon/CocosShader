// FrostedShader
var FrostedShader = ShaderEffectProgram.extend({
    initWithString:function(vertexShader, framentShader) {
        if (this._super(vertexShader, framentShader)) {
            return true;
        }      
        return false;
    }
});
FrostedShader.create = function() {
    var shaderProgram = new FrostedShader();
    shaderProgram.initWithString(
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.getCommonShaderRealPath("SHADER_POSITION_TEXTURE_COLOR.vsh")
        ),
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.ShaderSpriteFolder + "SHADER_FROSTED.fsh"
        )
    );
    return shaderProgram;
};
