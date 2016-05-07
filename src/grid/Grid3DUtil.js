// Grid3DUtil
var Grid3DUtil = function() {};

Grid3DUtil.GRID_POS_TYPE = {
    "BL": 1,
    "BR": 2,
    "TL": 3,
    "TR": 4
};

Grid3DUtil.restore = function(targetNode) {
    var grid = targetNode.getGrid();
    var getGridSize = grid.getGridSize();
    for (var i = 0; i < getGridSize.width + 1; i ++) {
        for (var j = 0; j < getGridSize.height + 1; j ++) {
            var ov = grid.getOriginalVertex(cc.p(i, j));
            grid.setVertex(cc.p(i, j), ov);
        }
    }    
};

Grid3DUtil.bindGrid = function(targetNode, gridSize) {
    var gridNode = new cc.NodeGrid();   
    var g = new cc.Grid3D(gridSize, null, false, targetNode.getBoundingBox());
    gridNode.setGrid(g);
    gridNode.getGrid().setActive(true);
    gridNode.addChild(targetNode);
    return gridNode;
};

Grid3DUtil.showGrid = function(targetNode) {
    var gridDrawNode = targetNode.getChildByName("gridNodeDraw");
    if (gridDrawNode == null || gridDrawNode == undefined) {
        gridDrawNode = cc.DrawNode.create();
        targetNode.addChild(gridDrawNode, 0, "gridNodeDraw");
    }
    gridDrawNode.clear();
    var grid = targetNode.getGrid();
    var getGridSize = grid.getGridSize();
    for (var i = 0; i < getGridSize.width + 1; i ++) {
        for (var j = 0; j < getGridSize.height + 1; j ++) {
            var v = grid.getVertex(cc.p(i, j));
            gridDrawNode.drawDot(cc.p(v.x, v.y), 3, cc.color(255, 0, 0, 255));
        }
    }
};

Grid3DUtil.showGridWorld = function(targetNode, parent) {
    var gridDrawNode = parent.getChildByName("gridNodeDraw");
    if (gridDrawNode == null || gridDrawNode == undefined) {
        gridDrawNode = cc.DrawNode.create();
        parent.addChild(gridDrawNode, 0, "gridNodeDraw");
    }
    gridDrawNode.clear();
    var grid = targetNode.getGrid();
    var getGridSize = grid.getGridSize();
    for (var i = 0; i < getGridSize.width + 1; i ++) {
        for (var j = 0; j < getGridSize.height + 1; j ++) {
            var v = grid.getVertex(cc.p(i, j));
            gridDrawNode.drawDot(cc.p(v.x, v.y), 3, cc.color(255, 0, 0, 255));
        }
    }
};

Grid3DUtil.hideGrid = function(targetNode) {
    var gridDrawNode = targetNode.getChildByName("gridNodeDraw");
    if (gridDrawNode) {
        gridDrawNode.clear();
        gridDrawNode.removeFromParent(true);
    }
};

Grid3DUtil.hideGridWorld = function(parent) {
    var gridDrawNode = parent.getChildByName("gridNodeDraw");
    if (gridDrawNode) {
        gridDrawNode.clear();
        gridDrawNode.removeFromParent(true);
    }
};

Grid3DUtil.getGridPosByType = function(targetNode, gridPosType) {
    if (gridPosType == Grid3DUtil.GRID_POS_TYPE.BL) {
        return cc.p(0, 0);
    }
    else if (gridPosType == Grid3DUtil.GRID_POS_TYPE.BR) {
        return cc.p(targetNode.getGrid().getGridSize().width, 0);
    }
    else if (gridPosType == Grid3DUtil.GRID_POS_TYPE.TL) {
        return cc.p(0, targetNode.getGrid().getGridSize().height);
    }
    else if (gridPosType == Grid3DUtil.GRID_POS_TYPE.TR) {
        return cc.p(
            targetNode.getGrid().getGridSize().width, 
            targetNode.getGrid().getGridSize().height
        );
    }
    return null;
};

Grid3DUtil.getGrid = function(targetNode, pos) {
    return targetNode.getGrid().getVertex(pos);
};

Grid3DUtil.getGridPosBL = function(targetNode) {
    return Grid3DUtil.getGridPosByType(targetNode, Grid3DUtil.GRID_POS_TYPE.BL);
};
Grid3DUtil.getGridPosBR = function(targetNode) {
    return Grid3DUtil.getGridPosByType(targetNode, Grid3DUtil.GRID_POS_TYPE.BR);
};
Grid3DUtil.getGridPosTL = function(targetNode) {
    return Grid3DUtil.getGridPosByType(targetNode, Grid3DUtil.GRID_POS_TYPE.TL);
};
Grid3DUtil.getGridPosTR = function(targetNode) {
    return Grid3DUtil.getGridPosByType(targetNode, Grid3DUtil.GRID_POS_TYPE.TR);
};

Grid3DUtil.getGridBL = function(targetNode) {
    return targetNode.getGrid().getVertex(Grid3DUtil.getGridPosBL(targetNode));
};

Grid3DUtil.getGridBR = function(targetNode) {
    return targetNode.getGrid().getVertex(Grid3DUtil.getGridPosBR(targetNode));
};

Grid3DUtil.getGridTL = function(targetNode) {
    return targetNode.getGrid().getVertex(Grid3DUtil.getGridPosTL(targetNode));
};

Grid3DUtil.getGridTR = function(targetNode) {
    return targetNode.getGrid().getVertex(Grid3DUtil.getGridPosTR(targetNode));
};

Grid3DUtil.updateGrid = function(targetNode, gridPos, grid) {
    targetNode.getGrid().setVertex(gridPos, grid);
};
