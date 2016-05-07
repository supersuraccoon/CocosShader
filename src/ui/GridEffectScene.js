//
var GridEffectLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        this.winSize = cc.director.getWinSize();
        this.gridSize = cc.size(8, 8);

        var demoTitle = new cc.LabelTTF("Simple Grid", "Verdana", 28);
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

        this.initTestMenu();
        this.initGridSprite();
        this.initTiledSprite();

        return true;
    },
    // menu
    restoreGridCallback:function() {
        this.unscheduleAllCallbacks();
        Grid3DUtil.restore(this.gridSpriteGrid);
        Grid3DUtil.showGridWorld(this.gridSpriteGrid, this);
    },
    suckInGridCallback:function() {
        var targetPosition = this.gridSprite.getPosition();
        var that = this;
        this.schedule(function(dt) {
            for(var i = 0; i < that.gridSize.width + 1; i ++) {
                for( j = 0; j < that.gridSize.height + 1; j ++) {
                    var grid = Grid3DUtil.getGrid(that.gridSpriteGrid, cc.p(i, j));
                    var dist = cc.pDistance(cc.p(grid.x, grid.y), targetPosition);
                    var distx = Math.abs(grid.x - targetPosition.x);
                    var disty = Math.abs(grid.y - targetPosition.y);

                    if (dist > 0.0) {
                        dist = dist / (10 / 1.0 * 8.0);

                        var valx = distx * dt / dist;
                        if (valx > distx) 
                            valx = distx;
                        if (valx < 0) 
                            valx = 0;
                        var valy = disty * dt / dist;
                        if (valy > disty) 
                            valy = disty;
                        if (valy < 0) 
                            valy = 0;

                        if (grid.x < targetPosition.x)
                            grid.x += valx;
                        if (grid.x >= targetPosition.x)
                            grid.x -= valx;
                        if (grid.y < targetPosition.y)
                            grid.y += valy;
                        if (grid.y >= targetPosition.y)
                            grid.y -= valy;
                    }
                    Grid3DUtil.updateGrid(that.gridSpriteGrid, cc.p(i, j), grid);
                }
            }
            Grid3DUtil.showGridWorld(that.gridSpriteGrid, that);
        }, 0, 100, 0);
    },
    restoreTileCallback:function() {
        this.unscheduleAllCallbacks();
        TiledGrid3DUtil.restore(this.tiledSpriteTile);
        TiledGrid3DUtil.showTileWorld(this.tiledSpriteTile, this);
    },
    explodeTileCallback:function() {
        var growSpeedOfTargetR = 10;
        var that = this;
        this.schedule(function(dt) {
            var initalTargetR = cc.pLength(
                cc.p(
                    this.tiledSprite.getBoundingBox().width, 
                    this.tiledSprite.getBoundingBox().height
                )
            );
            var center = this.tiledSprite.getPosition();
            for(var i = 0; i < that.gridSize.width; i ++) {
                for( j = 0; j < that.gridSize.height; j ++) {
                    var tile = TiledGrid3DUtil.getTile(that.tiledSpriteTile, cc.p(i, j));
                    //current target R
                    var targetR = initalTargetR + dt * growSpeedOfTargetR;
                    //update postion
                    var fragPos = TiledGrid3DUtil.getTilePosition(that.tiledSpriteTile, cc.p(i, j));
                    var disToCenter = cc.pLength(cc.p(fragPos.x - center.x, fragPos.y - center.y));
                    var dir = cc.p(0, 0);
                    if (disToCenter == 0) {
                        dir = cc.p(0, 0);
                    }
                    else {
                        dir = cc.p(fragPos.x - center.x, fragPos.y - center.y);
                        dir.x /= -disToCenter;
                        dir.y /= -disToCenter;
                    }
                    var disToEdge = targetR - disToCenter;
                    var disToEdgeWithRandom = disToEdge - initalTargetR / 2;
                    var movLen = disToEdgeWithRandom * 0.05;
                    var movVec = cc.pMult(dir, movLen);
                    TiledGrid3DUtil.updateTilePosition(that.tiledSpriteTile, cc.p(i, j), cc.p(fragPos.x + movVec.x, fragPos.y + movVec.y));
                }
            }
            TiledGrid3DUtil.showTileWorld(that.tiledSpriteTile, that);
        }, 0, 50, 0);
    },
    // init
    initTestMenu:function() {
        cc.MenuItemFont.setFontSize(20);
        cc.MenuItemFont.setFontName("Verdana");
        var menuItem3 = new cc.MenuItemFont("Restore Grid", this.restoreGridCallback, this);
        var menuItem4 = new cc.MenuItemFont("Restore Tile", this.restoreTileCallback, this);
        var menuItem5 = new cc.MenuItemFont("SuckIn Grid", this.suckInGridCallback, this);
        var menuItem6 = new cc.MenuItemFont("Explode Tile", this.explodeTileCallback, this);
        var menu = cc.Menu.create(menuItem3, menuItem4, menuItem5, menuItem6);
        menu.alignItemsHorizontallyWithPadding(30);
        menu.setColor(cc.color(255, 0, 0, 255));
        menu.setPosition(this.winSize.width * 0.5, this.winSize.height * 0.05);
        this.addChild(menu);
    },
    initGridSprite:function() {
        this.gridSprite = cc.Sprite.create(res.png_windmill);
        this.gridSprite.setPosition(this.winSize.width * 0.3, this.winSize.height * 0.5);

        this.gridSpriteGrid = Grid3DUtil.bindGrid(this.gridSprite, this.gridSize);
        this.addChild(this.gridSpriteGrid);

        var spriteName = new cc.LabelTTF("Grid3D Node", "Verdana", 20);
        spriteName.setPosition(
            this.gridSprite.getPositionX(),
            this.gridSprite.getPositionY() - this.gridSprite.getBoundingBox().height * 0.6
        );
        this.addChild(spriteName);

        Grid3DUtil.showGridWorld(this.gridSpriteGrid, this);
    },
    initTiledSprite:function() {
        this.tiledSprite = cc.Sprite.create(res.png_windmill);
        this.tiledSprite.setPosition(this.winSize.width * 0.7, this.winSize.height * 0.5);

        this.tiledSpriteTile = TiledGrid3DUtil.bindTile(this.tiledSprite, this.gridSize);
        this.addChild(this.tiledSpriteTile);

        var spriteName = new cc.LabelTTF("TiledGrid3D Node", "Verdana", 20);
        spriteName.setPosition(
            this.tiledSprite.getPositionX(),
            this.tiledSprite.getPositionY() - this.tiledSprite.getBoundingBox().height * 0.6
        );
        this.addChild(spriteName);
        
        TiledGrid3DUtil.showTileWorld(this.tiledSpriteTile, this);
    },
    backCallback:function() {
        cc.director.runScene(new MainMenuScene());
    }
});

var GridEffectScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GridEffectLayer();
        this.addChild(layer);
    }
});

