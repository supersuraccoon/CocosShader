// BloomShader
var BloomShader = ShaderEffectProgram.extend({
    initWithString:function(vertexShader, framentShader, resolution) {
        if (this._super(vertexShader, framentShader)) {
            return true;
        }      
        return false;
    }
});
BloomShader.create = function(resolution) {
    var shaderProgram = new BloomShader();
    shaderProgram.initWithString(
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.getCommonShaderRealPath("SHADER_POSITION_TEXTURE_COLOR.vsh")
        ),
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.ShaderSpriteFolder + "SHADER_BLOOM.fsh"
        ),
        resolution
    );
    return shaderProgram;
};

