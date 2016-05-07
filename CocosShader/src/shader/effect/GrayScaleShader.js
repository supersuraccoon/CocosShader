// GrayScaleShader
var GrayScaleShader = ShaderEffectProgram.extend({
    initWithString:function(vertexShader, framentShader) {
        if (this._super(vertexShader, framentShader)) {
            return true;
        }      
        return false;
    }
});
GrayScaleShader.create = function() {
    var shaderProgram = new GrayScaleShader();
    shaderProgram.initWithString(
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.getCommonShaderRealPath("SHADER_POSITION_TEXTURE_COLOR.vsh")
        ),
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.ShaderSpriteFolder + "SHADER_GRAYSCALE.fsh"
        )
    );
    return shaderProgram;
};
