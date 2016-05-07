//
var DrawNode = cc.GLNode.extend({
    ctor:function() {
        this._super();
        this.init();
    },
    // C++ void draw(Renderer *renderer, const Mat4& transform, uint32_t flags);
    draw:function(renderer, transform, transformUpdated) {
        // cc.log("renderer: " + renderer);
        // cc.log("transform: " + transform);
        // cc.log("transformUpdated: " + transformUpdated);
    }
});

var TestLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        this.winSize = cc.director.getWinSize();
        var demoTitle = new cc.LabelTTF("Test", "Verdana", 32);
        demoTitle.setPosition(this.winSize.width * 0.5, this.winSize.height * 0.95);
        this.addChild(demoTitle);

        // menu
        cc.MenuItemFont.setFontSize(20);
        cc.MenuItemFont.setFontName("Verdana");
        var menuItem1 = new cc.MenuItemFont("Back", this.backCallback, this);
        var menu = cc.Menu.create(menuItem1);
        menu.alignItemsHorizontallyWithPadding(100);
        menu.setPosition(this.winSize.width * 0.05, this.winSize.height * 0.93);
        this.addChild(menu);

        var drawNode = new DrawNode();
        this.addChild(drawNode);

        return true;
    },
    backCallback:function() {
        cc.director.runScene(new MainMenuScene());
    }
});

var TestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new TestLayer();
        this.addChild(layer);
    }
});
