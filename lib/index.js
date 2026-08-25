'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var PropTypes = require('prop-types');
var React = require('react');
var ReactMarkdown = require('react-markdown');
var _ = require('lodash');
var addMapValuesDeep = require('deepdash/addMapValuesDeep');

function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

addMapValuesDeep(_);
var ExternalTextContext = /*#__PURE__*/React.createContext(null);
class Provider extends React.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      texts: null
    });
    _defineProperty(this, "setTexts", texts => {
      this.setState({
        texts
      });
    });
  }
  componentDidMount() {
    this.setTexts(this.props.defaultTexts);
    if (this.props.loadTexts) {
      this.props.loadTexts(this.setTexts);
    }
  }
  render() {
    return /*#__PURE__*/React.createElement(ExternalTextContext.Provider, {
      value: this.state.texts
    }, this.props.children);
  }
}

// Backticks must be escaped during processing, then unescaped when the
// final string is returned. This is because backtick (which incidentally
// is also important in Markdown) delimits template strings, and template
// strings are the core of the evaluator. Hence `escape` and `unescape`.
// Does not escape an already escaped backtick.
// Data provider for component `ExternalText`, which accesses this data
// via the React context API.
//
// This component performs two tasks:
// - loads the source data into this component's state
// - wraps its children in a React context provider whose value is set
//   from the source data
_defineProperty(Provider, "propTypes", {
  defaultTexts: PropTypes.object,
  // Default, non-asynchronous data source.

  loadTexts: PropTypes.func
  // Callback for loading data asynchronously.
});
var escape = s => _.map(s, (c, i, t) => c !== '`' || i > 0 && t[i - 1] === "\\" ? c : '\\`').join('');
// This negative lookbehind formulation is tighter, but it lookbehind isn't
// supported (yet) in many browsers. It does work in Node.js and Chrome.
// export const escape = s => s.replace(/(?<!\\)`/g, '\\`');

// And the inverse.
var unescape = s => s.replace(/\\`/g, '`');
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
  var makeEvaluator = s => new Function(...Object.keys(context), 'return `' + s + '`');

  // `reevaluate` recursively makes and invokes an evaluator for the string.
  // A different string, containing further interpolations (`${...}`), may
  // result from interpolation of other strings into the evaluated string.
  // `reevaluate` stops reevaluating when two successive evaluations return
  // the same string. It also applies backtick escaping at each new evaluation,
  // for the same reason.
  var reevaluate = (prev, curr) => {
    var e = escape(curr);
    return prev === e ? e : reevaluate(e, makeEvaluator(e)(...Object.values(context)));
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

  var item = texts && _.get(texts, path) || "{{".concat(path, "}}");
  var render = value => {
    if (!_.isString(value)) {
      return null;
    }
    if (as === 'raw') {
      return value;
    }
    var source = evaluateAsTemplateLiteral(value, _objectSpread2({
      $$: texts
    }, data));
    if (as === 'string') {
      return source;
    }
    return /*#__PURE__*/React.createElement(ReactMarkdown, {
      escapeHtml: false,
      source: source
    });
  };
  return _.mapValuesDeep(item, render, {
    leavesOnly: true
  });
}
class ExternalText extends React.Component {
  render() {
    var texts = this.context;
    var _this$props = this.props,
      path = _this$props.path,
      data = _this$props.data,
      as = _this$props.as;
    return get(texts, path, data, as);
  }
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
_defineProperty(ExternalText, "propTypes", {
  path: PropTypes.string,
  // Path (JS standard notation) selecting text item from source texts.
  data: PropTypes.object,
  // Data context in which to evaluate item's text.
  as: PropTypes.oneOf(['raw', 'string', 'markdown'])
  // How to render the item's text.
});
_defineProperty(ExternalText, "defaultProps", {
  as: 'markdown'
});
ExternalText.contextType = ExternalTextContext;
ExternalText.Provider = Provider;
ExternalText.get = get;
ExternalText.Markdown = ReactMarkdown;

exports.ExternalTextContext = ExternalTextContext;
exports.Provider = Provider;
exports.default = ExternalText;
exports.escape = escape;
exports.evaluateAsTemplateLiteral = evaluateAsTemplateLiteral;
exports.get = get;
exports.unescape = unescape;
