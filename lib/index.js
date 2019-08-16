'use strict';

exports.__esModule = true;
exports.default = exports.unescape = exports.escape = exports.Provider = exports.ExternalTextContext = undefined;

var _class2, _temp2;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.evaluateAsTemplateLiteral = evaluateAsTemplateLiteral;
exports.get = get;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMarkdown = require('react-markdown');

var _reactMarkdown2 = _interopRequireDefault(_reactMarkdown);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _addMapDeep = require('deepdash/addMapDeep');

var _addMapDeep2 = _interopRequireDefault(_addMapDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _addMapDeep2.default)(_lodash2.default);

var ExternalTextContext = exports.ExternalTextContext = _react2.default.createContext(null);

var Provider = exports.Provider = function (_React$Component) {
  _inherits(Provider, _React$Component);

  function Provider() {
    var _temp, _this, _ret;

    _classCallCheck(this, Provider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      texts: null
    }, _this.setTexts = function (texts) {
      _this.setState({ texts: texts });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // Data provider for component `ExternalText`, which accesses this data
  // via the React context API.
  //
  // This component performs two tasks:
  // - loads the source data into this component's state
  // - wraps its children in a React context provider whose value is set
  //   from the source data

  Provider.prototype.componentDidMount = function componentDidMount() {
    this.setTexts(this.props.defaultTexts);
    if (this.props.loadTexts) {
      this.props.loadTexts(this.setTexts);
    }
  };

  Provider.prototype.render = function render() {
    return _react2.default.createElement(
      ExternalTextContext.Provider,
      { value: this.state.texts },
      this.props.children
    );
  };

  return Provider;
}(_react2.default.Component);

// Backticks must be escaped during processing, then unescaped when the
// final string is returned. This is because backtick (which incidentally
// is also important in Markdown) delimits template strings, and template
// strings are the core of the evaluator. Hence `escape` and `unescape`.
// Does not escape an already escaped backtick.

Provider.propTypes = process.env.NODE_ENV !== "production" ? {
  defaultTexts: _propTypes2.default.object,
  // Default, non-asynchronous data source.

  loadTexts: _propTypes2.default.func
  // Callback for loading data asynchronously.
} : {};
var escape = exports.escape = function escape(s) {
  return _lodash2.default.map(s, function (c, i, t) {
    return c !== '`' || i > 0 && t[i - 1] === '\\' ? c : '\\`';
  }).join('');
};
// This negative lookbehind formulation is tighter, but it lookbehind isn't
// supported (yet) in many browsers. It does work in Node.js and Chrome.
// export const escape = s => s.replace(/(?<!\\)`/g, '\\`');

// And the inverse.
var unescape = exports.unescape = function unescape(s) {
  return s.replace(/\\`/g, '`');
};

function evaluateAsTemplateLiteral(s) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // Convert string `s` to a template literal and evaluate it in a context
  // where all the properties of object `context` are available as identifiers
  // at the top level. (E.g., if `context = { 'a': 1, 'b': 2 }`, then
  // the template literal can refer to `context.a` and `context.b`
  // as `${a}` and `${b}`, respectively.)

  // `evaluator` constructs a function that evaluates a template string
  // constructed from the ordinary string passed in (by enclosing it in
  // backticks). The argument(s) of the returned evaluator are the context
  // values.
  var makeEvaluator = function makeEvaluator(s) {
    return new (Function.prototype.bind.apply(Function, [null].concat(Object.keys(context), ['return `' + s + '`'])))();
  };

  // `reevaluate` recursively makes and invokes an evaluator for the string.
  // A different string, containing further interpolations (`${...}`), may
  // result from interpolation of other strings into the evaluated string.
  // `reevaluate` stops reevaluating when two successive evaluations return
  // the same string. It also applies backtick escaping at each new evaluation,
  // for the same reason.
  var reevaluate = function reevaluate(prev, curr) {
    var e = escape(curr);
    return prev === e ? e : reevaluate(e, makeEvaluator(e).apply(undefined, Object.values(context)));
  };

  // It's important that `Object.keys(x)` and `Object.values(x)` are guaranteed
  // to return their results in the same order for any given `x`. That order
  // is arbitrary, but it is shared between them.

  // Kick off the evaluation(s), and strip escaping after all is done.
  return unescape(reevaluate('', s));
}

function get(texts, path) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var as = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'string';

  // This is the core of `ExternalText`.
  //
  // It gets the object selected by `path` from `texts` and maps
  // the function of (optionally) evaluation and rendering as Markdown
  // over all strings in the object's leaf (non-object) members.
  //
  // Argument `as` controls what function (identity, evaluation as a template
  // literal, or evaluation and rendering as Markdown) is applied to each
  // leaf member. The values 'raw', 'string', and 'markdown', respectively,
  // correspond to these mappings.
  //
  // Component `ExternalText` simply invokes this function on its context
  // and props. The simplest case is when `path` selects a single string
  // and it returns a single rendered React element.
  //
  // This function is exposed as a static so that more complicated use can
  // be made of it. This should be done only if there is no simpler way to
  // do it using <ExternalText/> elements. For example, if `'path.to.array'`
  // selects an array of items from `texts`, then prefer this
  //
  // ```
  //  <div>
  //    <ExternalText path='path.to.array' />
  //  </div>
  // ```
  //
  // over this equivalent but unnecessarily complicated code
  //
  // ```
  //  <div>
  //    { ExternalText.get(this.context, 'path.to.array') }
  //  </div>
  // ```

  var item = texts && _lodash2.default.get(texts, path) || '{{' + path + '}}';

  var render = function render(value) {
    if (!_lodash2.default.isString(value)) {
      return null;
    }
    if (as === 'raw') {
      return value;
    }
    var source = evaluateAsTemplateLiteral(value, _extends({ $$: texts }, data));
    if (as === 'string') {
      return source;
    }
    return _react2.default.createElement(_reactMarkdown2.default, { escapeHtml: false, source: source });
  };

  return _lodash2.default.mapDeep(item, render, { leavesOnly: true });
}

var ExternalText = (_temp2 = _class2 = function (_React$Component2) {
  _inherits(ExternalText, _React$Component2);

  function ExternalText() {
    _classCallCheck(this, ExternalText);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  // Core component of external texts module.
  //
  // This component renders an external text (source texts provided through
  // the React context API via `ExternalText.Provider`) selected by `path`,
  // using the data context `data` and rendered according to `as`.
  // See static function `get` for more details.
  //
  // Supporting components and functions are both exported by the module
  // and added as properties of `ExternalText`.

  ExternalText.prototype.render = function render() {
    var texts = this.context;
    var _props = this.props,
        path = _props.path,
        data = _props.data,
        as = _props.as;

    return get(texts, path, data, as);
  };

  return ExternalText;
}(_react2.default.Component), _class2.defaultProps = {
  as: 'markdown'
}, _temp2);
exports.default = ExternalText;
ExternalText.propTypes = process.env.NODE_ENV !== "production" ? {
  path: _propTypes2.default.string,
  // Path (JS standard notation) selecting text item from source texts.
  data: _propTypes2.default.object,
  // Data context in which to evaluate item's text.
  as: _propTypes2.default.oneOf(['raw', 'string', 'markdown'])
  // How to render the item's text.
} : {};


ExternalText.contextType = ExternalTextContext;
ExternalText.Provider = Provider;
ExternalText.get = get;
ExternalText.Markdown = _reactMarkdown2.default;