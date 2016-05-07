// BlendModeEffectUtil
var BlendModeEffectUtil = function() {};
BlendModeEffectUtil.applyLightOpacityEffect = function(target, type) {
    if (type == 1) {
        BlendModeUtil.applyBlendMode(target, gl.ONE, gl.ONE);    
    }
    else if (type == 2) {
        BlendModeUtil.applyBlendMode(target, gl.ONE, gl.DST_ALPHA);
    }
    else if (type == 3) {
        BlendModeUtil.applyBlendMode(target, gl.SRC_ALPHA, gl.ONE);
    }
    else if (type == 4) {
        BlendModeUtil.applyBlendMode(target, gl.SRC_ALPHA, gl.DST_ALPHA);
    }
    else if (type == 5) {
        BlendModeUtil.applyBlendMode(target, gl.DST_ALPHA, gl.ONE);
    }
    else {
        BlendModeUtil.applyBlendMode(target, gl.DST_ALPHA, gl.DST_ALPHA);
    }
};

BlendModeEffectUtil.applyTransparentEffect = function(target, type) {
    if (type == 1) {
        BlendModeUtil.applyBlendMode(target, gl.ONE_MINUS_SRC_COLOR, gl.DST_ALPHA);
    }
    else if (type == 2) {
        BlendModeUtil.applyBlendMode(target, gl.DST_COLOR, gl.ONE);
    }
    else {
        BlendModeUtil.applyBlendMode(target, gl.DST_COLOR, gl.DST_ALPHA);
    }
};

BlendModeEffectUtil.applyOpacityEffect = function(target, type) {
    if (type == 1) {
        BlendModeUtil.applyBlendMode(target, gl.ONE, gl.ONE_MINUS_SRC_COLOR);
    }
    else if (type == 2) {
        BlendModeUtil.applyBlendMode(target, gl.ONE_MINUS_DST_COLOR, gl.ONE);
    }
    else if (type == 3) {
        BlendModeUtil.applyBlendMode(target, gl.ONE_MINUS_DST_COLOR, gl.DST_ALPHA);
    }
    else if (type == 4) {
        BlendModeUtil.applyBlendMode(target, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_COLOR);
    }
    else if (type == 5) {
        BlendModeUtil.applyBlendMode(target, gl.SRC_COLOR, gl.DST_ALPHA);
    }
    else if (type == 6) {
        BlendModeUtil.applyBlendMode(target, gl.SRC_COLOR, gl.ONE);
    }
    else {
        BlendModeUtil.applyBlendMode(target, gl.DST_ALPHA, gl.ONE_MINUS_SRC_COLOR);
    }
};

BlendModeEffectUtil.applyDevilEffect = function(target, type) {
    BlendModeUtil.applyBlendMode(target, gl.ONE_MINUS_SRC_COLOR, gl.ONE_MINUS_SRC_ALPHA);
};

BlendModeEffectUtil.applyDevilOpacityEffect = function(target, type) {
    if (type == 1) {
        BlendModeUtil.applyBlendMode(target, gl.ONE_MINUS_DST_ALPHA, gl.ONE_MINUS_SRC_COLOR);
    }
    else if (type == 2) {
        BlendModeUtil.applyBlendMode(target, gl.ONE_MINUS_DST_COLOR, gl.ONE_MINUS_SRC_ALPHA);
    }
    else if (type == 3) {
        BlendModeUtil.applyBlendMode(target, gl.ONE_MINUS_DST_COLOR, gl.ONE_MINUS_SRC_COLOR);
    }
    else if (type == 4) {
        BlendModeUtil.applyBlendMode(target, gl.ONE_MINUS_SRC_ALPHA, gl.ONE_MINUS_SRC_COLOR);
    }
    else if (type == 5) {
        BlendModeUtil.applyBlendMode(target, gl.ONE_MINUS_SRC_COLOR, gl.ONE_MINUS_SRC_COLOR);
    }
    else {
        BlendModeUtil.applyBlendMode(target, gl.ZERO, gl.ONE_MINUS_SRC_COLOR);
    }
};

BlendModeEffectUtil.applyDarkEffect = function(target, type) {
    if (type == 1) {
        BlendModeUtil.applyBlendMode(target, gl.ONE_MINUS_DST_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }
    else if (type == 2) {
        BlendModeUtil.applyBlendMode(target, gl.ONE_MINUS_SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }
    else if (type == 3) {
        BlendModeUtil.applyBlendMode(target, gl.ZERO, gl.ONE_MINUS_SRC_ALPHA);
    }
    else {
        BlendModeUtil.applyBlendMode(target, gl.ZERO, gl.ONE_MINUS_SRC_ALPHA);
    }
};

BlendModeEffectUtil.applyDeepenEffect = function(target, type) {
    BlendModeUtil.applyBlendMode(target, gl.SRC_COLOR, gl.ONE_MINUS_SRC_ALPHA);
};

BlendModeEffectUtil.applyDeepenOpacityEffect = function(target, type) {
    if (type == 1) {
        BlendModeUtil.applyBlendMode(target, gl.SRC_COLOR, gl.ONE_MINUS_SRC_COLOR);
    }
    else {
        BlendModeUtil.applyBlendMode(target, gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA);
    }
};
