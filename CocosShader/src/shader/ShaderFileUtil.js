// ShaderFileUtil
var ShaderFileUtil = function() {};
ShaderFileUtil.ShaderFolder = "res/shader/";
ShaderFileUtil.ShaderSpriteFolder = ShaderFileUtil.ShaderFolder + "sprite/";
ShaderFileUtil.ShaderShapeFolder = ShaderFileUtil.ShaderFolder + "shape/";
ShaderFileUtil.ShaderCommonFolder = ShaderFileUtil.ShaderFolder + "common/";
ShaderFileUtil.ShaderCommonNativeFolder = ShaderFileUtil.ShaderCommonFolder + "native/";
ShaderFileUtil.ShaderCommonWebFolder = ShaderFileUtil.ShaderCommonFolder + "web/";

ShaderFileUtil.getCommonShaderRealPath = function(shaderFileName) {
    return cc.sys.isNative ? ShaderFileUtil.ShaderCommonNativeFolder + shaderFileName : ShaderFileUtil.ShaderCommonWebFolder + shaderFileName;
};

ShaderFileUtil.loadShaderFromFile = function(shaderFileName) {
    var shaderContent = null;
    if (cc.sys.isNative) {
        shaderContent = jsb.fileUtils.getStringFromFile(shaderFileName);
    }
    else {
        shaderContent = cc.loader._loadTxtSync(shaderFileName);
    }
    return shaderContent;
};
