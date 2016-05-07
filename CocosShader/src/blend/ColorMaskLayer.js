// ColorMaskLayer
var ColorMaskLayer = cc.LayerColor.extend({
    init:function(color, width, height, srcBlend, dstBlend) {
        if (this._super(color, width, height)) {
            this.ignoreAnchorPointForPosition(false);
            this.setBlendFunc(srcBlend, dstBlend);
            return true;
        }
        return false;
    }
});

ColorMaskLayer.create = function(color, width, height, srcBlend, dstBlend) {
    var colorMaskLayer = new ColorMaskLayer();
    if (colorMaskLayer && colorMaskLayer.init(color, width, height, srcBlend, dstBlend)) {
        return colorMaskLayer;
    }
    return null;
};
