//
// cc.SPRITE_DEBUG_DRAW = 2;
var MainMenuLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        this.winSize = cc.director.getWinSize();
        var demoTitle = new cc.LabelTTF("CocosShader Demo", "Verdana", 32);
        demoTitle.setPosition(this.winSize.width * 0.5, this.winSize.height * 0.95);
        this.addChild(demoTitle);

        // menu
        cc.MenuItemFont.setFontSize(26);
        cc.MenuItemFont.setFontName("Verdana");
        var menuItem1 = new cc.MenuItemFont("Blending Mode All", this.blendingModeAllCallback, this);
        var menuItem2 = new cc.MenuItemFont("Blending Mode Effect", this.blendingModeEffectCallback, this);
        var menuItem3 = new cc.MenuItemFont("Shader Effect", this.shaderEffectCallback, this);
        var menuItem4 = new cc.MenuItemFont("Shader Object", this.shaderObjectCallback, this);
        var menuItem5 = new cc.MenuItemFont("Grid Effect", this.gridEffectCallback, this);
        var menuItem6 = new cc.MenuItemFont("Test", this.testCallback, this);
        var menu = cc.Menu.create(menuItem1, menuItem2, menuItem3, menuItem4, menuItem5, menuItem6);
        menu.alignItemsVerticallyWithPadding(20);
        menu.setPosition(this.winSize.width * 0.5, this.winSize.height * 0.5);
        this.addChild(menu);

        // 
        var shaderNode = new ShaderNode(
            ShaderFileUtil.getCommonShaderRealPath("SHADER_POSITION.vsh"),
            ShaderFileUtil.ShaderShapeFolder + "SHADER_FLOATING_BUBBLES.fsh",
            // ShaderFileUtil.ShaderShapeFolder + "SHADER_TEST.fsh",
            cc.director.getWinSize().width,
            cc.director.getWinSize().height
        );
        shaderNode.x = this.winSize.width/2;
        shaderNode.y = this.winSize.height/2;
        this.addChild(shaderNode, -100);

        return true;
    },
    blendingModeAllCallback:function() {
        cc.director.runScene(new BlendingModeAllScene());
    },
    blendingModeEffectCallback:function() {
        cc.director.runScene(new BlendingModeEffectScene());
    },
    shaderEffectCallback:function() {
        cc.director.runScene(new ShaderEffectScene());
    },
    shaderObjectCallback:function() {
        cc.director.runScene(new ShaderObjectScene());
    },
    gridEffectCallback:function() {
        cc.director.runScene(new GridEffectScene());
    },
    testCallback:function() {
        cc.director.runScene(new TestScene());
    }
});

var MainMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
    }
});
