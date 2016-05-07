// BlendModeUtil
var BlendModeUtil = function() {};
BlendModeUtil.applyBlendMode = function(target, srcBlend, dstBlend) {
    target.setBlendFunc(srcBlend, dstBlend);
};

BlendModeUtil.restoreBlendMode = function(target) {
    target.setBlendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
};