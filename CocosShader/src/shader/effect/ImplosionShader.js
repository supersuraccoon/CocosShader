// ImplosionShader
var ImplosionShader = ShaderEffectProgram.extend({
    initWithString:function(vertexShader, framentShader) {
        if (this._super(vertexShader, framentShader)) {
            return true;
        }      
        return false;
    }
});
ImplosionShader.create = function() {
    var shaderProgram = new ImplosionShader();
    shaderProgram.initWithString(
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.getCommonShaderRealPath("SHADER_POSITION_TEXTURE_COLOR.vsh")
        ),
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.ShaderSpriteFolder + "SHADER_IMPLOSION.fsh"
        )
    );
    return shaderProgram;
};
