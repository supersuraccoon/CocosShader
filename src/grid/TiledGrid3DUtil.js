// TiledGrid3DUtil
var TiledGrid3DUtil = function() {};

TiledGrid3DUtil.TILE_POS_TYPE = {
    "BL": 1,
    "BR": 2,
    "TL": 3,
    "TR": 4
};

TiledGrid3DUtil.restore = function(targetNode) {
    var grid = targetNode.getGrid();
    var getGridSize = grid.getGridSize();
    for (var i = 0; i < getGridSize.width + 1; i ++) {
        for (var j = 0; j < getGridSize.height + 1; j ++) {
            var ot = grid.getOriginalTile(cc.p(i, j));
            grid.setTile(cc.p(i, j), ot);
        }
    }    
};

TiledGrid3DUtil.bindTile = function(targetNode, gridSize) {
    var gridNode = new cc.NodeGrid();
    var g = new cc.TiledGrid3D(gridSize, null, false, targetNode.getBoundingBox());
    gridNode.setGrid(g);
    gridNode.getGrid().setActive(true);
    gridNode.addChild(targetNode);
    return gridNode;
};

TiledGrid3DUtil.showTile = function(targetNode) {
    var gridDrawNode = targetNode.getChildByName("gridNodeDraw");
    if (gridDrawNode == null || gridDrawNode == undefined) {
        gridDrawNode = cc.DrawNode.create();
        targetNode.addChild(gridDrawNode, 0, "gridNodeDraw");
    }
    gridDrawNode.clear();
    var grid = targetNode.getGrid();
    var getGridSize = grid.getGridSize();
    for (var i = 0; i < getGridSize.width; i ++) {
        for (var j = 0; j < getGridSize.height; j ++) {
            var t = grid.getTile(cc.p(i, j));
            gridDrawNode.drawRect(
                cc.p(t.bl.x, t.bl.y), 
                cc.p(t.tr.x, t.tr.y), 
                cc.color(0, 0, 0, 0), 
                1, 
                cc.color(255, 0, 0, 255)
            );
        }
    }
};

TiledGrid3DUtil.showTileWorld = function(targetNode, parent) {
    var gridDrawNode = parent.getChildByName("tileNodeDraw");
    if (gridDrawNode == null || gridDrawNode == undefined) {
        gridDrawNode = cc.DrawNode.create();
        parent.addChild(gridDrawNode, 0, "tileNodeDraw");
    }
    gridDrawNode.clear();
    var grid = targetNode.getGrid();
    var getGridSize = grid.getGridSize();
    for (var i = 0; i < getGridSize.width; i ++) {
        for (var j = 0; j < getGridSize.height; j ++) {
            var t = grid.getTile(cc.p(i, j));
            gridDrawNode.drawRect(
                cc.p(t.bl.x, t.bl.y), 
                cc.p(t.tr.x, t.tr.y), 
                cc.color(0, 0, 0, 0), 
                1, 
                cc.color(255, 0, 0, 255)
            );
        }
    }
};

TiledGrid3DUtil.hideTile = function(targetNode) {
    var gridDrawNode = targetNode.getChildByName("gridNodeDraw");
    if (gridDrawNode) {
        gridDrawNode.clear();
        gridDrawNode.removeFromParent(true);
    }
};

TiledGrid3DUtil.hideTileWorld = function(parent) {
    var gridDrawNode = parent.getChildByName("tileNodeDraw");
    if (gridDrawNode) {
        gridDrawNode.clear();
        gridDrawNode.removeFromParent(true);
    }
};

TiledGrid3DUtil.getTilePosByType = function(targetNode, tilePosType) {
    if (tilePosType == TiledGrid3DUtil.TILE_POS_TYPE.BL) {
        return cc.p(0, 0);
    }
    else if (tilePosType == TiledGrid3DUtil.TILE_POS_TYPE.BR) {
        return cc.p(targetNode.getGrid().getGridSize().width - 1, 0);
    }
    else if (tilePosType == TiledGrid3DUtil.TILE_POS_TYPE.TL) {
        return cc.p(0, targetNode.getGrid().getGridSize().height - 1);
    }
    else if (tilePosType == TiledGrid3DUtil.TILE_POS_TYPE.TR) {
        return cc.p(targetNode.getGrid().getGridSize().width - 1, 
                    targetNode.getGrid().getGridSize().height - 1);
    }
    return null;
};


TiledGrid3DUtil.getTile = function(targetNode, tilePos) {
    return targetNode.getGrid().getTile(tilePos);
};

TiledGrid3DUtil.getTilePosBL = function(targetNode) {
    return TiledGrid3DUtil.getTilePosByType(targetNode, TiledGrid3DUtil.TILE_POS_TYPE.BL);
};
TiledGrid3DUtil.getTilePosBR = function(targetNode) {
    return TiledGrid3DUtil.getTilePosByType(targetNode, TiledGrid3DUtil.TILE_POS_TYPE.BR);
};
TiledGrid3DUtil.getTilePosTL = function(targetNode) {
    return TiledGrid3DUtil.getTilePosByType(targetNode, TiledGrid3DUtil.TILE_POS_TYPE.TL);
};
TiledGrid3DUtil.getTilePosTR = function(targetNode) {
    return TiledGrid3DUtil.getTilePosByType(targetNode, TiledGrid3DUtil.TILE_POS_TYPE.TR);
};

TiledGrid3DUtil.getTileBL = function(targetNode) {
    return targetNode.getGrid().getTile(TiledGrid3DUtil.getTilePosBL(targetNode));
};

TiledGrid3DUtil.getTileBR = function(targetNode) {
    return targetNode.getGrid().getTile(TiledGrid3DUtil.getTilePosBR(targetNode));
};

TiledGrid3DUtil.getTileTL = function(targetNode) {
    return targetNode.getGrid().getTile(TiledGrid3DUtil.getTilePosTL(targetNode));
};

TiledGrid3DUtil.getTileTR = function(targetNode) {
    return targetNode.getGrid().getTile(TiledGrid3DUtil.getTilePosTR(targetNode));
};

TiledGrid3DUtil.updateTile = function(targetNode, tilePos, tile) {
    targetNode.getGrid().setTile(tilePos, tile);
};

TiledGrid3DUtil.getTilePosition = function(targetNode, tilePos) {
    var tile = TiledGrid3DUtil.getTile(targetNode, tilePos);
    return cc.p(
        tile.bl.x + (tile.br.x - tile.bl.x) / 2, 
        tile.bl.y + (tile.tl.y - tile.bl.y) / 2
    );
};

TiledGrid3DUtil.updateTilePosition = function(targetNode, tilePos, position) {
    var tile = TiledGrid3DUtil.getTile(targetNode, tilePos);
    var oldPosition = TiledGrid3DUtil.getTilePosition(targetNode, tilePos);
    var positionOffset = cc.p(
        oldPosition.x - position.x,
        oldPosition.y - position.y
    );
    tile.tl.x += positionOffset.x;   tile.tr.x += positionOffset.x;
    tile.tl.y += positionOffset.y;   tile.tr.y += positionOffset.y;

    tile.bl.x += positionOffset.x;   tile.br.x += positionOffset.x;
    tile.bl.y += positionOffset.y;   tile.br.y += positionOffset.y;
    
    TiledGrid3DUtil.updateTile(targetNode, tilePos, tile);
};

