
var BlendingModeAllLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        this.winSize = cc.director.getWinSize();
        var demoTitle = new cc.LabelTTF("Blending Mode All", "Verdana", 28);
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

        this.runBlendSpriteDemo();

        return true;
    },
    backCallback:function() {
        cc.director.runScene(new MainMenuScene());
    },
    runBlendSpriteDemo:function() {
        var container = new cc.LayerColor(cc.color(0, 0, 0, 0), this.getContentSize().width, this.getContentSize().height * 50);
        this.scrollView = new cc.ScrollView(cc.size(this.getContentSize().width, this.getContentSize().height * 0.85), container);
        this.scrollView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.scrollView.setTouchEnabled(true);
        this.scrollView.setContentOffset(
            cc.p(0, -this.getContentSize().height * 49 - this.getContentSize().height * 0.15)
        );
        this.addChild(this.scrollView);

        this.blendSrc = 0;
        this.blendDst = 0;
        this.blendEquationMode = 0;

        this.blendModeArray = [
            gl.ONE, gl.ONE_MINUS_DST_ALPHA, gl.ONE_MINUS_DST_COLOR,
            gl.ONE_MINUS_SRC_ALPHA, gl.ONE_MINUS_SRC_COLOR,

            gl.SRC_ALPHA, gl.SRC_COLOR,

            gl.DST_ALPHA, gl.DST_COLOR,

            gl.ZERO,

            // gl.ONE_MINUS_CONSTANT_ALPHA,
            // gl.ONE_MINUS_CONSTANT_COLOR,
            // gl.SRC_ALPHA_SATURATE,
        ];

        this.blendEquationModeArray = [
            // gl.LOGIC_OP,
            // gl.MIN, 
            // gl.MAX, 
            gl.FUNC_ADD,
            // gl.FUNC_SUBTRACT,
            // gl.FUNC_REVERSE_SUBTRACT
        ];

        this.blendModeNameArray = [
            "ONE", "ONE_MINUS_DST_ALPHA", "ONE_MINUS_DST_COLOR",
            "ONE_MINUS_SRC_ALPHA", "ONE_MINUS_SRC_COLOR",

            "SRC_ALPHA", "SRC_COLOR",

            "DST_ALPHA", "DST_COLOR",

            "ZERO",

            // "ONE_MINUS_CONSTANT_ALPHA",
            // "ONE_MINUS_CONSTANT_COLOR",
            // "SRC_ALPHA_SATURATE",
        ];
        this.blendEquationModeNameArray = [
            // "LOGIC_OP",
            // "MIN", 
            // "MAX", 
            "FUNC_ADD",
            // "FUNC_SUBTRACT",
            // "FUNC_REVERSE_SUBTRACT"
        ];

        //
        var spritePerLine = 3;
        var spriteRowCount = 100;
        var row = 1;
        this._shaderSpriteArray = [];
        for (var i = 0; i < spritePerLine; i ++) {
            var sprite = new cc.Sprite(res.png_tree);
            sprite.setScale(0.8);
            sprite.setPosition(
                this.winSize.width * 0.1 + (this.winSize.width / spritePerLine) * i + sprite.getBoundingBox().width / 2, 
                this.scrollView.getContentSize().height + 20 - sprite.getBoundingBox().height * 1.5 * row + sprite.getBoundingBox().height / 2
            );
            this.scrollView.addChild(sprite);
            this._shaderSpriteArray.push(sprite);

            gl.blendEquation(this.blendEquationModeArray[this.blendEquationMode]);
            sprite.setBlendFunc(this.blendModeArray[this.blendSrc], this.blendModeArray[this.blendDst]);
            this.addBlendName(
                sprite, 
                this.blendModeNameArray[this.blendSrc] + "\n" + this.blendEquationModeNameArray[this.blendEquationMode] + "\n" + this.blendModeNameArray[this.blendDst]
            );
            this.blendDst += 1;
            if (this.blendDst >= this.blendModeArray.length) {
                this.blendSrc += 1;
                this.blendDst = 0;
                if (this.blendSrc >= this.blendModeArray.length) {
                    this.blendEquationMode += 1;
                    this.blendSrc = 0;
                    if (this.blendEquationMode >= this.blendEquationModeArray.length) {
                        break;
                    }
                }
            }

            if (i == spritePerLine - 1) {
                i = -1;
                row += 1;
                if (row > spriteRowCount) {
                    break;
                }
            }
        }
    },
    addBlendName:function(sprite, name) {
        var blendName = new cc.LabelTTF(name, "Verdana", 16);
        blendName.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        blendName.setPosition(
            sprite.getBoundingBox().width * 0.6, 
            -sprite.getBoundingBox().height * 0.25
        );
        sprite.addChild(blendName, 1, "blendName");
    }
});

var BlendingModeAllScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new BlendingModeAllLayer();
        this.addChild(layer);
    }
});

