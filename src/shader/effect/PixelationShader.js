// PixelationShader
var PixelationShader = ShaderEffectProgram.extend({
    initWithString:function(vertexShader, framentShader) {
        if (this._super(vertexShader, framentShader)) {
            return true;
        }      
        return false;
    }
});
PixelationShader.create = function() {
    var shaderProgram = new PixelationShader();
    shaderProgram.initWithString(
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.getCommonShaderRealPath("SHADER_POSITION_TEXTURE_COLOR.vsh")
        ),
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.ShaderSpriteFolder + "SHADER_PIXELATION.fsh"
        )
    );
    return shaderProgram;
};
