//
var ShaderObjectLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        this.winSize = cc.director.getWinSize();
        var demoTitle = new cc.LabelTTF("Shader Object", "Verdana", 28);
        demoTitle.setPosition(this.winSize.width * 0.5, this.winSize.height * 0.95);
        this.addChild(demoTitle, 10);

        // menu
        cc.MenuItemFont.setFontSize(20);
        cc.MenuItemFont.setFontName("Verdana");
        var menuItem1 = new cc.MenuItemFont("Back", this.backCallback, this);
        var menu = cc.Menu.create(menuItem1);
        menu.alignItemsHorizontallyWithPadding(100);
        menu.setPosition(this.winSize.width * 0.05, this.winSize.height * 0.93);
        this.addChild(menu);

        this.shapeIndex = 0;
        this.shaderObjectArray = [
            "SHADER_CLOVER.fsh",
            "SHADER_NOTIFY_LIGHT.fsh",
            "SHADER_COLORFUL_RING.fsh",
            "SHADER_FLOATING_BUBBLES.fsh",
            "SHADER_GALAXY.fsh"
        ];
        this.shaderObjectName = [
            "Clover",
            "Notify Light",
            "Colorful Ring",
            "Floating Bubbles",
            "Galaxy"
        ];
        this.initTestMenu();

        return true;
    },
    initTestMenu:function() {
        var menuItem1 = new cc.MenuItemFont("Create Shader Object", this.createShaderObjectCallback, this);
        var menu = cc.Menu.create(menuItem1);
        menu.alignItemsHorizontallyWithPadding(100);
        menu.setPosition(this.winSize.width * 0.5, this.winSize.height * 0.05);
        this.addChild(menu, 10);
    },
    createShaderObjectCallback:function(sender) {
        var shaderNode = this.getChildByName("shaderNode");
        if (shaderNode) {
            shaderNode.removeFromParent(true);
            shaderNode = null;
        }
        shaderNode = new ShaderNode(
            ShaderFileUtil.getCommonShaderRealPath("SHADER_POSITION.vsh"),
            ShaderFileUtil.ShaderShapeFolder + this.shaderObjectArray[this.shapeIndex],
            cc.director.getWinSize().width,
            cc.director.getWinSize().height
        );
        shaderNode.x = this.winSize.width/2;
        shaderNode.y = this.winSize.height/2;
        this.addChild(shaderNode, 0, "shaderNode");

        var shaderName = this.getChildByName("shaderName");
        if (shaderName == null) {
            shaderName = new cc.LabelTTF("", "Verdana", 30);
            shaderName.setPosition(
                this.winSize.width * 0.5, 
                this.winSize.height * 0.4
            );   
            this.addChild(shaderName, 20, "shaderName");
        }
        shaderName.setString(this.shaderObjectName[this.shapeIndex]);

        this.shapeIndex = (this.shapeIndex + 1 >= this.shaderObjectArray.length) ? 0 : (this.shapeIndex + 1);
    },
    backCallback:function() {
        cc.director.runScene(new MainMenuScene());
    }
});

var ShaderObjectScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new ShaderObjectLayer();
        this.addChild(layer);
    }
});

