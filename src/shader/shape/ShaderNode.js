//
cc.GLNode = cc.GLNode || cc.Node.extend({
    ctor:function(){
        this._super();
        this.init();
    },
    init:function(){
        this._renderCmd._needDraw = true;
        this._renderCmd.rendering =  function(ctx){
            cc.kmGLMatrixMode(cc.KM_GL_MODELVIEW);
            cc.kmGLPushMatrix();
            cc.kmGLLoadMatrix(this._stackMatrix);
            this._node.draw(ctx);
            cc.kmGLPopMatrix();
        };
    },
    draw:function(ctx){
        this._super(ctx);
    }
});

var ShaderNode = cc.GLNode.extend({
    ctor:function(vertexShader, framentShader, width, height) {
        this._super();
        this.init();

        this.width = width;
        this.height = height;
        this.anchorX = 0.5;
        this.anchorY = 0.5;

        this.shader = new cc.GLProgram();
        this.shader.initWithString(
            ShaderFileUtil.loadShaderFromFile(vertexShader),
            ShaderFileUtil.loadShaderFromFile(framentShader)
        );
        this.shader.retain();
        this.shader.addAttribute("aVertex", cc.VERTEX_ATTRIB_POSITION);
        this.shader.link();
        this.shader.updateUniforms();

        var program = this.shader.getProgram();
        this.uniformCenter = gl.getUniformLocation( program, "center");
        this.uniformResolution = gl.getUniformLocation( program, "resolution");
        this.initBuffers();

        // this.scheduleUpdate();
        // this._time = 0;
    },
    draw:function() {
        this.shader.use();
        this.shader.setUniformsForBuiltins();

        //
        // Uniforms
        //
        var frameSize = cc.view.getFrameSize();
        var visibleSize = cc.view.getVisibleSize();
        var retinaFactor = cc.view.getDevicePixelRatio();
        var position = this.getPosition();

        var centerx = position.x * frameSize.width/visibleSize.width * retinaFactor;
        var centery = position.y * frameSize.height/visibleSize.height * retinaFactor;
        this.shader.setUniformLocationF32( this.uniformCenter, centerx, centery);
        this.shader.setUniformLocationF32( this.uniformResolution, cc.director.getWinSize().width, cc.director.getWinSize().height);

        cc.glEnableVertexAttribs( cc.VERTEX_ATTRIB_FLAG_POSITION );

        // Draw fullscreen Square
        gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
        gl.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    },
    initBuffers:function() {
        // Square
        var squareVertexPositionBuffer = this.squareVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        vertices = [
            this.width, this.height,
            0,          this.height,
            this.width, 0,
            0,          0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    },
    update:function(dt) {
        this._time += dt;
    }
});
