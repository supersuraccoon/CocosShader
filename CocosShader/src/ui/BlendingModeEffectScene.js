//
var BlendingModeEffectLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        this.winSize = cc.director.getWinSize();
        var demoTitle = new cc.LabelTTF("Blending Mode Effect", "Verdana", 28);
        demoTitle.setPosition(this.winSize.width * 0.5, this.winSize.height * 0.95);
        this.addChild(demoTitle, 10);

        this.bgSprite = cc.Sprite.create(res.png_bg);;
        this.bgSprite.setPosition(this.winSize.width * 0.5, this.winSize.height * 0.5);
        this.addChild(this.bgSprite, -1);

        // menu
        cc.MenuItemFont.setFontSize(20);
        cc.MenuItemFont.setFontName("Verdana");
        var menuItem1 = new cc.MenuItemFont("Back", this.backCallback, this);
        var menu = cc.Menu.create(menuItem1);
        menu.alignItemsHorizontallyWithPadding(100);
        menu.setPosition(this.winSize.width * 0.05, this.winSize.height * 0.93);
        this.addChild(menu, 10);

        this.initTestMenu();
        this.runBlendUtilDemo();
        
        return true;
    },
    addMaskLayerCallback:function(sender) {
        var maskColorLayer = this.getChildByName("maskColorLayer");
        if (maskColorLayer) {
            maskColorLayer.removeFromParent(true);
            maskColorLayer = null;
        }
        maskColorLayer = ColorMaskLayer.create(
            cc.color(Math.random() * 255, Math.random() * 255, Math.random() * 255, 0), 
            this.winSize.width, 
            this.winSize.height, 
            gl.ONE_MINUS_DST_COLOR, 
            gl.ZERO);
        maskColorLayer.setPosition(
            this.winSize.width * 0.5, 
            this.winSize.height * 0.5
        );
        this.addChild(maskColorLayer, 1, "maskColorLayer");
    },
    initTestMenu:function() {
        var menuItem1 = new cc.MenuItemFont("Add MaskLayer", this.addMaskLayerCallback, this);
        var menu = cc.Menu.create(menuItem1);
        menu.alignItemsHorizontallyWithPadding(100);
        menu.setPosition(this.winSize.width * 0.88, this.winSize.height * 0.93);
        this.addChild(menu, 10);
    },
    runBlendUtilDemo:function() {
        var container = new cc.LayerColor(cc.color(0, 0, 0, 0), this.getContentSize().width, this.getContentSize().height * 5);
        this.scrollView = new cc.ScrollView(cc.size(this.getContentSize().width, this.getContentSize().height * 0.85), container);
        this.scrollView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.scrollView.setTouchEnabled(true);
        this.scrollView.setContentOffset(
            cc.p(0, -this.winSize.height * 4 - this.getContentSize().height * 0.15)
        );
        this.addChild(this.scrollView);

        // 
        var spritePerLine = 4;
        var spriteRowCount = 8;
        var row = 1;
        this._shaderSpriteArray = [];
        for (var i = 0; i < spritePerLine; i ++) {
            var sprite = new cc.Sprite(res.png_tree);
            sprite.setScale(0.8);
            sprite.setPosition(
                this.winSize.width * 0.1 + (this.winSize.width * 0.8 / spritePerLine) * i + sprite.getBoundingBox().width / 2, 
                this.scrollView.getContentSize().height + 20 - sprite.getBoundingBox().height * 1.4 * row + sprite.getBoundingBox().height / 2
            );
            this.scrollView.addChild(sprite);
            this._shaderSpriteArray.push(sprite);

            if (i == spritePerLine - 1) {
                i = -1;
                row += 1;
                if (row > spriteRowCount) {
                    break;
                }
            }
        }
        var count = 0;
        // Normal
        this.addBlendingModeName(this._shaderSpriteArray[count], "Normal");

        // LightOpacity
        count += 1;
        BlendModeEffectUtil.applyLightOpacityEffect(this._shaderSpriteArray[count], 1);
        this.addBlendingModeName(this._shaderSpriteArray[count], "LightOpacity1");

        count += 1;
        BlendModeEffectUtil.applyLightOpacityEffect(this._shaderSpriteArray[count], 2);
        this.addBlendingModeName(this._shaderSpriteArray[count], "LightOpacity2");

        count += 1;
        BlendModeEffectUtil.applyLightOpacityEffect(this._shaderSpriteArray[count], 3);
        this.addBlendingModeName(this._shaderSpriteArray[count], "LightOpacity3");

        count += 1;
        BlendModeEffectUtil.applyLightOpacityEffect(this._shaderSpriteArray[count], 4);
        this.addBlendingModeName(this._shaderSpriteArray[count], "LightOpacity4");

        count += 1;
        BlendModeEffectUtil.applyLightOpacityEffect(this._shaderSpriteArray[count], 5);
        this.addBlendingModeName(this._shaderSpriteArray[count], "LightOpacity5");

        count += 1;
        BlendModeEffectUtil.applyLightOpacityEffect(this._shaderSpriteArray[count], 6);
        this.addBlendingModeName(this._shaderSpriteArray[count], "LightOpacity6");

        // Transparent
        count += 1;
        BlendModeEffectUtil.applyTransparentEffect(this._shaderSpriteArray[count], 1);
        this.addBlendingModeName(this._shaderSpriteArray[count], "Transparent1");

        count += 1;
        BlendModeEffectUtil.applyTransparentEffect(this._shaderSpriteArray[count], 2);
        this.addBlendingModeName(this._shaderSpriteArray[count], "Transparent2");

        count += 1;
        BlendModeEffectUtil.applyTransparentEffect(this._shaderSpriteArray[count], 3);
        this.addBlendingModeName(this._shaderSpriteArray[count], "Transparent3");

        // Opacity
        count += 1;
        BlendModeEffectUtil.applyOpacityEffect(this._shaderSpriteArray[count], 1);
        this.addBlendingModeName(this._shaderSpriteArray[count], "Opacity1");

        count += 1;
        BlendModeEffectUtil.applyOpacityEffect(this._shaderSpriteArray[count], 2);
        this.addBlendingModeName(this._shaderSpriteArray[count], "Opacity2");

        count += 1;
        BlendModeEffectUtil.applyOpacityEffect(this._shaderSpriteArray[count], 3);
        this.addBlendingModeName(this._shaderSpriteArray[count], "Opacity3");

        count += 1;
        BlendModeEffectUtil.applyOpacityEffect(this._shaderSpriteArray[count], 4);
        this.addBlendingModeName(this._shaderSpriteArray[count], "Opacity4");

        count += 1;
        BlendModeEffectUtil.applyOpacityEffect(this._shaderSpriteArray[count], 5);
        this.addBlendingModeName(this._shaderSpriteArray[count], "Opacity5");

        count += 1;
        BlendModeEffectUtil.applyOpacityEffect(this._shaderSpriteArray[count], 6);
        this.addBlendingModeName(this._shaderSpriteArray[count], "Opacity6");

        count += 1;
        BlendModeEffectUtil.applyOpacityEffect(this._shaderSpriteArray[count], 7);
        this.addBlendingModeName(this._shaderSpriteArray[count], "Opacity7");

        // Devil
        count += 1;
        BlendModeEffectUtil.applyDevilEffect(this._shaderSpriteArray[count], 1);
        this.addBlendingModeName(this._shaderSpriteArray[count], "Devil1");

        // DevilOpacity
        count += 1;
        BlendModeEffectUtil.applyDevilOpacityEffect(this._shaderSpriteArray[count], 1);
        this.addBlendingModeName(this._shaderSpriteArray[count], "DevilOpacity1");

        count += 1;
        BlendModeEffectUtil.applyDevilOpacityEffect(this._shaderSpriteArray[count], 2);
        this.addBlendingModeName(this._shaderSpriteArray[count], "DevilOpacity2");

        count += 1;
        BlendModeEffectUtil.applyDevilOpacityEffect(this._shaderSpriteArray[count], 3);
        this.addBlendingModeName(this._shaderSpriteArray[count], "DevilOpacity3");

        count += 1;
        BlendModeEffectUtil.applyDevilOpacityEffect(this._shaderSpriteArray[count], 4);
        this.addBlendingModeName(this._shaderSpriteArray[count], "DevilOpacity4");

        count += 1;
        BlendModeEffectUtil.applyDevilOpacityEffect(this._shaderSpriteArray[count], 5);
        this.addBlendingModeName(this._shaderSpriteArray[count], "DevilOpacity5");

        count += 1;
        BlendModeEffectUtil.applyDevilOpacityEffect(this._shaderSpriteArray[count], 6);
        this.addBlendingModeName(this._shaderSpriteArray[count], "DevilOpacity6");

        // Dark
        count += 1;
        BlendModeEffectUtil.applyDarkEffect(this._shaderSpriteArray[count], 1);
        this.addBlendingModeName(this._shaderSpriteArray[count], "Dark1");

        count += 1;
        BlendModeEffectUtil.applyDarkEffect(this._shaderSpriteArray[count], 2);
        this.addBlendingModeName(this._shaderSpriteArray[count], "Dark2");

        count += 1;
        BlendModeEffectUtil.applyDarkEffect(this._shaderSpriteArray[count], 3);
        this.addBlendingModeName(this._shaderSpriteArray[count], "Dark3");

        count += 1;
        BlendModeEffectUtil.applyDarkEffect(this._shaderSpriteArray[count], 4);
        this.addBlendingModeName(this._shaderSpriteArray[count], "Dark4");

        // Deepen
        count += 1;
        BlendModeEffectUtil.applyDeepenEffect(this._shaderSpriteArray[count], 1);
        this.addBlendingModeName(this._shaderSpriteArray[count], "Deepen1");

        // DeepenOpacity
        count += 1;
        BlendModeEffectUtil.applyDeepenOpacityEffect(this._shaderSpriteArray[count], 1);
        this.addBlendingModeName(this._shaderSpriteArray[count], "DeepenOpacity1");

        count += 1;
        BlendModeEffectUtil.applyDeepenOpacityEffect(this._shaderSpriteArray[count], 2);
        this.addBlendingModeName(this._shaderSpriteArray[count], "DeepenOpacity2");

        //
        count += 1;
        this._shaderSpriteArray[count].setVisible(false);
    },
    addBlendingModeName:function(sprite, name) {
        var shaderName = new cc.LabelTTF(name, "Verdana", 20);
        shaderName.setPosition(
            sprite.getBoundingBox().width * 0.6, 
            -sprite.getBoundingBox().height * 0.15
        );
        sprite.addChild(shaderName, 1, "shaderName");
    },
    backCallback:function() {
        cc.director.runScene(new MainMenuScene());
    }
});

var BlendingModeEffectScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new BlendingModeEffectLayer();
        this.addChild(layer);
    }
});

