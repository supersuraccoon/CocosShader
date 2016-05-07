// ExplosionShader
var ExplosionShader = ShaderEffectProgram.extend({
    initWithString:function(vertexShader, framentShader) {
        if (this._super(vertexShader, framentShader)) {
            return true;
        }      
        return false;
    }
});
ExplosionShader.create = function() {
    var shaderProgram = new ExplosionShader();
    shaderProgram.initWithString(
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.getCommonShaderRealPath("SHADER_POSITION_TEXTURE_COLOR.vsh")
        ),
        ShaderFileUtil.loadShaderFromFile(
            ShaderFileUtil.ShaderSpriteFolder + "SHADER_EXPLOSION.fsh"
        )
    );
    return shaderProgram;
};
