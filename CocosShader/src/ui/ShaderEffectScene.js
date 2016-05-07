//
var ShaderEffectLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        this.winSize = cc.director.getWinSize();
        var demoTitle = new cc.LabelTTF("Shader Effect", "Verdana", 28);
        demoTitle.setPosition(this.winSize.width * 0.5, this.winSize.height * 0.95);
        this.addChild(demoTitle);

        this.bgSprite = cc.Sprite.create(res.png_bg);
        this.bgSprite.setPosition(this.winSize.width * 0.5, this.winSize.height * 0.5);
        this.addChild(this.bgSprite, -1);

        // menu
        cc.MenuItemFont.setFontSize(20);
        cc.MenuItemFont.setFontName("Verdana");
        var menuItem1 = new cc.MenuItemFont("Back", this.backCallback, this);
        var menu = cc.Menu.create(menuItem1);
        menu.alignItemsHorizontallyWithPadding(100);
        menu.setPosition(this.winSize.width * 0.05, this.winSize.height * 0.93);
        this.addChild(menu);

        this.runShaderSpriteDemo();
        this.applyShaderCallback();

        return true;
    },
    backCallback:function() {
        cc.director.runScene(new MainMenuScene());
    },
    runShaderSpriteDemo:function() {
        var container = new cc.LayerColor(cc.color(0, 0, 0, 0), this.getContentSize().width, this.getContentSize().height * 2);
        this.scrollView = new cc.ScrollView(cc.size(this.getContentSize().width, this.getContentSize().height * 0.85), container);
        this.scrollView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.scrollView.setTouchEnabled(true);
        this.scrollView.setContentOffset(
            cc.p(0, -this.winSize.height - this.getContentSize().height * 0.15)
        );
        this.addChild(this.scrollView);

        // 
        var spritePerLine = 4;
        var spriteRowCount = 5;
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
    },
    addShaderName:function(sprite, name) {
        var shaderName = new cc.LabelTTF(name, "Verdana", 20);
        shaderName.setPosition(
            sprite.getBoundingBox().width * 0.6, 
            -sprite.getBoundingBox().height * 0.15
        );
        sprite.addChild(shaderName, 1, "shaderName");
    },
    applyShaderCallback:function() {
        var count = 0;
        // Normal
        this.addShaderName(this._shaderSpriteArray[count], "Normal");

        // GrayScaleShader
        count += 1;
        this._shaderSpriteArray[count].setShaderProgram(GrayScaleShader.create());
        this.addShaderName(this._shaderSpriteArray[count], "GrayScale");

        // PixelationShader
        count += 1;
        this._shaderSpriteArray[count].setShaderProgram(PixelationShader.create());
        this.addShaderName(this._shaderSpriteArray[count], "Pixelation");

        // ExplosionShader
        count += 1;
        this._shaderSpriteArray[count].setShaderProgram(ExplosionShader.create());
        this.addShaderName(this._shaderSpriteArray[count], "Explosion");

        // ImplosionShader
        count += 1;
        this._shaderSpriteArray[count].setShaderProgram(ImplosionShader.create());
        this.addShaderName(this._shaderSpriteArray[count], "Implosion");

        // FrostedShader
        count += 1;
        this._shaderSpriteArray[count].setShaderProgram(FrostedShader.create());
        this.addShaderName(this._shaderSpriteArray[count], "Frosted");

        // BlurShader
        count += 1;
        var resolution = this._shaderSpriteArray[count].getTexture().getContentSizeInPixels();
        this._shaderSpriteArray[count].setShaderProgram(BlurShader.create(resolution));
        this.addShaderName(this._shaderSpriteArray[count], "Blur");

        // SharpenShader
        count += 1;
        var resolution = this._shaderSpriteArray[count].getTexture().getContentSizeInPixels();
        this._shaderSpriteArray[count].setShaderProgram(SharpenShader.create(resolution));
        this.addShaderName(this._shaderSpriteArray[count], "Sharpen");

        // EmbossShader
        count += 1;
        var resolution = this._shaderSpriteArray[count].getTexture().getContentSizeInPixels();
        this._shaderSpriteArray[count].setShaderProgram(EmbossShader.create(resolution));
        this.addShaderName(this._shaderSpriteArray[count], "Emboss");

        // FogShader
        count += 1;
        this._shaderSpriteArray[count].setShaderProgram(FogShader.create(cc.color.GRAY, 3));
        this.addShaderName(this._shaderSpriteArray[count], "Fog");

        // OutlineShader
        count += 1;
        this._shaderSpriteArray[count].setShaderProgram(OutlineShader.create(cc.color.RED, 175, 0.01));
        this.addShaderName(this._shaderSpriteArray[count], "Outline");

        // CelShadingShader
        count += 1;
        var resolution = this._shaderSpriteArray[count].getTexture().getContentSizeInPixels();
        this._shaderSpriteArray[count].setShaderProgram(CelShadingShader.create(resolution));
        this.addShaderName(this._shaderSpriteArray[count], "CelShading");   

        // BloomShader
        count += 1;
        var resolution = this._shaderSpriteArray[count].getTexture().getContentSizeInPixels();
        this._shaderSpriteArray[count].setShaderProgram(BloomShader.create(resolution));
        this.addShaderName(this._shaderSpriteArray[count], "Bloom");   

        // SepiaShader
        count += 1;
        this._shaderSpriteArray[count].setShaderProgram(SepiaShader.create());
        this.addShaderName(this._shaderSpriteArray[count], "Sepia");   

        // ShadowShader
        count += 1;
        this._shaderSpriteArray[count].setShaderProgram(ShadowShader.create());
        this.addShaderName(this._shaderSpriteArray[count], "Shadow");   

        // TestShader
        count += 1;
        var resolution = this._shaderSpriteArray[count].getTexture().getContentSizeInPixels();
        this._shaderSpriteArray[count].setShaderProgram(TestShader.create(resolution));
        this.addShaderName(this._shaderSpriteArray[count], "Test");
    }
});

var ShaderEffectScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new ShaderEffectLayer();
        this.addChild(layer);
    }
});

