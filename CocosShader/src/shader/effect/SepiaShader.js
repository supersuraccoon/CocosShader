// SepiaShader
var SepiaShader = ShaderEffectProgram.extend({
    initWithString:function(vertexShader, framentShader, resolution) {
        if (this._super(vertexShader, framentShader)) {
            return true;
        }      
        return false;
    }
});
SepiaShader.create = function() {
    var shaderProgram = new SepiaShader();
    shaderProgram.initWithString(
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.getCommonShaderRealPath("SHADER_POSITION_TEXTURE_COLOR.vsh")
        ),
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.ShaderSpriteFolder + "SHADER_SEPIA.fsh"
        )
    );
    return shaderProgram;
};

