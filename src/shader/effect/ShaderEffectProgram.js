// ShaderEffectProgram
var ShaderEffectProgram = cc.GLProgram.extend({
    initWithString:function(vertexShader, framentShader) {
        if (this._super(vertexShader, framentShader)) {
                this.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
                this.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
                this.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
                this.link();
                this.updateUniforms();
                this.use();
            return true;
        }      
        return false;
    }
});
