var _model = require("../../util/model");

var makeInner = _model.makeInner;

/**
 * @return {string} If large mode changed, return string 'reset';
 */
function _default() {
  var inner = makeInner();
  return function (seriesModel) {
    var fields = inner(seriesModel);
    var pipelineContext = seriesModel.pipelineContext;
    var originalLarge = fields.large;
    var originalProgressive = fields.canProgressiveRender;
    var large = fields.large = pipelineContext.large;
    var progressive = fields.canProgressiveRender = pipelineContext.canProgressiveRender;
    return !!(originalLarge ^ large || originalProgressive ^ progressive) && 'reset';
  };
}

module.exports = _default;