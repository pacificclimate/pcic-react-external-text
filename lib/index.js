'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var PropTypes = require('prop-types');
var React = require('react');
var require$$0$2 = require('path');
var _ = require('lodash');

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var immutable;
var hasRequiredImmutable;

function requireImmutable () {
	if (hasRequiredImmutable) return immutable;
	hasRequiredImmutable = 1;
	immutable = extend;

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	function extend() {
	    var target = {};

	    for (var i = 0; i < arguments.length; i++) {
	        var source = arguments[i];

	        for (var key in source) {
	            if (hasOwnProperty.call(source, key)) {
	                target[key] = source[key];
	            }
	        }
	    }

	    return target
	}
	return immutable;
}

var extend;
var hasRequiredExtend;

function requireExtend () {
	if (hasRequiredExtend) return extend;
	hasRequiredExtend = 1;

	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var defineProperty = Object.defineProperty;
	var gOPD = Object.getOwnPropertyDescriptor;

	var isArray = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}

		return toStr.call(arr) === '[object Array]';
	};

	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr.call(obj) !== '[object Object]') {
			return false;
		}

		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) { /**/ }

		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};

	// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
	var setProperty = function setProperty(target, options) {
		if (defineProperty && options.name === '__proto__') {
			defineProperty(target, options.name, {
				enumerable: true,
				configurable: true,
				value: options.newValue,
				writable: true
			});
		} else {
			target[options.name] = options.newValue;
		}
	};

	// Return undefined instead of __proto__ if '__proto__' is not an own property
	var getProperty = function getProperty(obj, name) {
		if (name === '__proto__') {
			if (!hasOwn.call(obj, name)) {
				return void 0;
			} else if (gOPD) {
				// In early versions of node, obj['__proto__'] is buggy when obj has
				// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
				return gOPD(obj, name).value;
			}
		}

		return obj[name];
	};

	extend = function extend() {
		var options, name, src, copy, copyIsArray, clone;
		var target = arguments[0];
		var i = 1;
		var length = arguments.length;
		var deep = false;

		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}
		if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
			target = {};
		}

		for (; i < length; ++i) {
			options = arguments[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = getProperty(target, name);
					copy = getProperty(options, name);

					// Prevent never-ending loop
					if (target !== copy) {
						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							setProperty(target, { name: name, newValue: extend(deep, clone, copy) });

						// Don't bring in undefined values
						} else if (typeof copy !== 'undefined') {
							setProperty(target, { name: name, newValue: copy });
						}
					}
				}
			}
		}

		// Return the modified object
		return target;
	};
	return extend;
}

var bail_1;
var hasRequiredBail;

function requireBail () {
	if (hasRequiredBail) return bail_1;
	hasRequiredBail = 1;

	bail_1 = bail;

	function bail(err) {
	  if (err) {
	    throw err
	  }
	}
	return bail_1;
}

var unistUtilStringifyPosition;
var hasRequiredUnistUtilStringifyPosition;

function requireUnistUtilStringifyPosition () {
	if (hasRequiredUnistUtilStringifyPosition) return unistUtilStringifyPosition;
	hasRequiredUnistUtilStringifyPosition = 1;

	var own = {}.hasOwnProperty;

	unistUtilStringifyPosition = stringify;

	function stringify(value) {
	  /* Nothing. */
	  if (!value || typeof value !== 'object') {
	    return null
	  }

	  /* Node. */
	  if (own.call(value, 'position') || own.call(value, 'type')) {
	    return position(value.position)
	  }

	  /* Position. */
	  if (own.call(value, 'start') || own.call(value, 'end')) {
	    return position(value)
	  }

	  /* Point. */
	  if (own.call(value, 'line') || own.call(value, 'column')) {
	    return point(value)
	  }

	  /* ? */
	  return null
	}

	function point(point) {
	  if (!point || typeof point !== 'object') {
	    point = {};
	  }

	  return index(point.line) + ':' + index(point.column)
	}

	function position(pos) {
	  if (!pos || typeof pos !== 'object') {
	    pos = {};
	  }

	  return point(pos.start) + '-' + point(pos.end)
	}

	function index(value) {
	  return value && typeof value === 'number' ? value : 1
	}
	return unistUtilStringifyPosition;
}

var vfileMessage;
var hasRequiredVfileMessage;

function requireVfileMessage () {
	if (hasRequiredVfileMessage) return vfileMessage;
	hasRequiredVfileMessage = 1;

	var stringify = requireUnistUtilStringifyPosition();

	vfileMessage = VMessage;

	// Inherit from `Error#`.
	function VMessagePrototype() {}
	VMessagePrototype.prototype = Error.prototype;
	VMessage.prototype = new VMessagePrototype();

	// Message properties.
	var proto = VMessage.prototype;

	proto.file = '';
	proto.name = '';
	proto.reason = '';
	proto.message = '';
	proto.stack = '';
	proto.fatal = null;
	proto.column = null;
	proto.line = null;

	// Construct a new VMessage.
	//
	// Note: We cannot invoke `Error` on the created context, as that adds readonly
	// `line` and `column` attributes on Safari 9, thus throwing and failing the
	// data.
	function VMessage(reason, position, origin) {
	  var parts;
	  var range;
	  var location;

	  if (typeof position === 'string') {
	    origin = position;
	    position = null;
	  }

	  parts = parseOrigin(origin);
	  range = stringify(position) || '1:1';

	  location = {
	    start: {line: null, column: null},
	    end: {line: null, column: null}
	  };

	  // Node.
	  if (position && position.position) {
	    position = position.position;
	  }

	  if (position) {
	    // Position.
	    if (position.start) {
	      location = position;
	      position = position.start;
	    } else {
	      // Point.
	      location.start = position;
	    }
	  }

	  if (reason.stack) {
	    this.stack = reason.stack;
	    reason = reason.message;
	  }

	  this.message = reason;
	  this.name = range;
	  this.reason = reason;
	  this.line = position ? position.line : null;
	  this.column = position ? position.column : null;
	  this.location = location;
	  this.source = parts[0];
	  this.ruleId = parts[1];
	}

	function parseOrigin(origin) {
	  var result = [null, null];
	  var index;

	  if (typeof origin === 'string') {
	    index = origin.indexOf(':');

	    if (index === -1) {
	      result[1] = origin;
	    } else {
	      result[0] = origin.slice(0, index);
	      result[1] = origin.slice(index + 1);
	    }
	  }

	  return result
	}
	return vfileMessage;
}

var replaceExt_1;
var hasRequiredReplaceExt;

function requireReplaceExt () {
	if (hasRequiredReplaceExt) return replaceExt_1;
	hasRequiredReplaceExt = 1;

	var path = require$$0$2;

	function replaceExt(npath, ext) {
	  if (typeof npath !== 'string') {
	    return npath;
	  }

	  if (npath.length === 0) {
	    return npath;
	  }

	  var nFileName = path.basename(npath, path.extname(npath)) + ext;
	  return path.join(path.dirname(npath), nFileName);
	}

	replaceExt_1 = replaceExt;
	return replaceExt_1;
}

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

var isBuffer_1;
var hasRequiredIsBuffer;

function requireIsBuffer () {
	if (hasRequiredIsBuffer) return isBuffer_1;
	hasRequiredIsBuffer = 1;
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	isBuffer_1 = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	};

	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}
	return isBuffer_1;
}

var core;
var hasRequiredCore;

function requireCore () {
	if (hasRequiredCore) return core;
	hasRequiredCore = 1;

	var path = require$$0$2;
	var replace = requireReplaceExt();
	var buffer = requireIsBuffer();

	core = VFile;

	var own = {}.hasOwnProperty;
	var proto = VFile.prototype;

	proto.toString = toString;

	/* Order of setting (least specific to most), we need this because
	 * otherwise `{stem: 'a', path: '~/b.js'}` would throw, as a path
	 * is needed before a stem can be set. */
	var order = [
	  'history',
	  'path',
	  'basename',
	  'stem',
	  'extname',
	  'dirname'
	];

	/* Construct a new file. */
	function VFile(options) {
	  var prop;
	  var index;
	  var length;

	  if (!options) {
	    options = {};
	  } else if (typeof options === 'string' || buffer(options)) {
	    options = {contents: options};
	  } else if ('message' in options && 'messages' in options) {
	    return options;
	  }

	  if (!(this instanceof VFile)) {
	    return new VFile(options);
	  }

	  this.data = {};
	  this.messages = [];
	  this.history = [];
	  this.cwd = process.cwd();

	  /* Set path related properties in the correct order. */
	  index = -1;
	  length = order.length;

	  while (++index < length) {
	    prop = order[index];

	    if (own.call(options, prop)) {
	      this[prop] = options[prop];
	    }
	  }

	  /* Set non-path related properties. */
	  for (prop in options) {
	    if (order.indexOf(prop) === -1) {
	      this[prop] = options[prop];
	    }
	  }
	}

	/* Access full path (`~/index.min.js`). */
	Object.defineProperty(proto, 'path', {
	  get: function () {
	    return this.history[this.history.length - 1];
	  },
	  set: function (path) {
	    assertNonEmpty(path, 'path');

	    if (path !== this.path) {
	      this.history.push(path);
	    }
	  }
	});

	/* Access parent path (`~`). */
	Object.defineProperty(proto, 'dirname', {
	  get: function () {
	    return typeof this.path === 'string' ? path.dirname(this.path) : undefined;
	  },
	  set: function (dirname) {
	    assertPath(this.path, 'dirname');
	    this.path = path.join(dirname || '', this.basename);
	  }
	});

	/* Access basename (`index.min.js`). */
	Object.defineProperty(proto, 'basename', {
	  get: function () {
	    return typeof this.path === 'string' ? path.basename(this.path) : undefined;
	  },
	  set: function (basename) {
	    assertNonEmpty(basename, 'basename');
	    assertPart(basename, 'basename');
	    this.path = path.join(this.dirname || '', basename);
	  }
	});

	/* Access extname (`.js`). */
	Object.defineProperty(proto, 'extname', {
	  get: function () {
	    return typeof this.path === 'string' ? path.extname(this.path) : undefined;
	  },
	  set: function (extname) {
	    var ext = extname || '';

	    assertPart(ext, 'extname');
	    assertPath(this.path, 'extname');

	    if (ext) {
	      if (ext.charAt(0) !== '.') {
	        throw new Error('`extname` must start with `.`');
	      }

	      if (ext.indexOf('.', 1) !== -1) {
	        throw new Error('`extname` cannot contain multiple dots');
	      }
	    }

	    this.path = replace(this.path, ext);
	  }
	});

	/* Access stem (`index.min`). */
	Object.defineProperty(proto, 'stem', {
	  get: function () {
	    return typeof this.path === 'string' ? path.basename(this.path, this.extname) : undefined;
	  },
	  set: function (stem) {
	    assertNonEmpty(stem, 'stem');
	    assertPart(stem, 'stem');
	    this.path = path.join(this.dirname || '', stem + (this.extname || ''));
	  }
	});

	/* Get the value of the file. */
	function toString(encoding) {
	  var value = this.contents || '';
	  return buffer(value) ? value.toString(encoding) : String(value);
	}

	/* Assert that `part` is not a path (i.e., does
	 * not contain `path.sep`). */
	function assertPart(part, name) {
	  if (part.indexOf(path.sep) !== -1) {
	    throw new Error('`' + name + '` cannot be a path: did not expect `' + path.sep + '`');
	  }
	}

	/* Assert that `part` is not empty. */
	function assertNonEmpty(part, name) {
	  if (!part) {
	    throw new Error('`' + name + '` cannot be empty');
	  }
	}

	/* Assert `path` exists. */
	function assertPath(path, name) {
	  if (!path) {
	    throw new Error('Setting `' + name + '` requires `path` to be set too');
	  }
	}
	return core;
}

var vfile;
var hasRequiredVfile;

function requireVfile () {
	if (hasRequiredVfile) return vfile;
	hasRequiredVfile = 1;

	var VMessage = requireVfileMessage();
	var VFile = requireCore();

	vfile = VFile;

	var proto = VFile.prototype;

	proto.message = message;
	proto.info = info;
	proto.fail = fail;

	/* Slight backwards compatibility.  Remove in the future. */
	proto.warn = message;

	/* Create a message with `reason` at `position`.
	 * When an error is passed in as `reason`, copies the stack. */
	function message(reason, position, origin) {
	  var filePath = this.path;
	  var message = new VMessage(reason, position, origin);

	  if (filePath) {
	    message.name = filePath + ':' + message.name;
	    message.file = filePath;
	  }

	  message.fatal = false;

	  this.messages.push(message);

	  return message;
	}

	/* Fail. Creates a vmessage, associates it with the file,
	 * and throws it. */
	function fail() {
	  var message = this.message.apply(this, arguments);

	  message.fatal = true;

	  throw message;
	}

	/* Info. Creates a vmessage, associates it with the file,
	 * and marks the fatality as null. */
	function info() {
	  var message = this.message.apply(this, arguments);

	  message.fatal = null;

	  return message;
	}
	return vfile;
}

var wrap_1;
var hasRequiredWrap;

function requireWrap () {
	if (hasRequiredWrap) return wrap_1;
	hasRequiredWrap = 1;

	var slice = [].slice;

	wrap_1 = wrap;

	// Wrap `fn`.
	// Can be sync or async; return a promise, receive a completion handler, return
	// new values and errors.
	function wrap(fn, callback) {
	  var invoked;

	  return wrapped

	  function wrapped() {
	    var params = slice.call(arguments, 0);
	    var callback = fn.length > params.length;
	    var result;

	    if (callback) {
	      params.push(done);
	    }

	    try {
	      result = fn.apply(null, params);
	    } catch (error) {
	      // Well, this is quite the pickle.
	      // `fn` received a callback and invoked it (thus continuing the pipeline),
	      // but later also threw an error.
	      // We’re not about to restart the pipeline again, so the only thing left
	      // to do is to throw the thing instead.
	      if (callback && invoked) {
	        throw error
	      }

	      return done(error)
	    }

	    if (!callback) {
	      if (result && typeof result.then === 'function') {
	        result.then(then, done);
	      } else if (result instanceof Error) {
	        done(result);
	      } else {
	        then(result);
	      }
	    }
	  }

	  // Invoke `next`, only once.
	  function done() {
	    if (!invoked) {
	      invoked = true;

	      callback.apply(null, arguments);
	    }
	  }

	  // Invoke `done` with one value.
	  // Tracks if an error is passed, too.
	  function then(value) {
	    done(null, value);
	  }
	}
	return wrap_1;
}

var trough_1;
var hasRequiredTrough;

function requireTrough () {
	if (hasRequiredTrough) return trough_1;
	hasRequiredTrough = 1;

	var wrap = requireWrap();

	trough_1 = trough;

	trough.wrap = wrap;

	var slice = [].slice;

	// Create new middleware.
	function trough() {
	  var fns = [];
	  var middleware = {};

	  middleware.run = run;
	  middleware.use = use;

	  return middleware

	  // Run `fns`.  Last argument must be a completion handler.
	  function run() {
	    var index = -1;
	    var input = slice.call(arguments, 0, -1);
	    var done = arguments[arguments.length - 1];

	    if (typeof done !== 'function') {
	      throw new Error('Expected function as last argument, not ' + done)
	    }

	    next.apply(null, [null].concat(input));

	    // Run the next `fn`, if any.
	    function next(err) {
	      var fn = fns[++index];
	      var params = slice.call(arguments, 0);
	      var values = params.slice(1);
	      var length = input.length;
	      var pos = -1;

	      if (err) {
	        done(err);
	        return
	      }

	      // Copy non-nully input into values.
	      while (++pos < length) {
	        if (values[pos] === null || values[pos] === undefined) {
	          values[pos] = input[pos];
	        }
	      }

	      input = values;

	      // Next or done.
	      if (fn) {
	        wrap(fn, next).apply(null, input);
	      } else {
	        done.apply(null, [null].concat(input));
	      }
	    }
	  }

	  // Add `fn` to the list.
	  function use(fn) {
	    if (typeof fn !== 'function') {
	      throw new Error('Expected `fn` to be a function, not ' + fn)
	    }

	    fns.push(fn);

	    return middleware
	  }
	}
	return trough_1;
}

var xIsString;
var hasRequiredXIsString;

function requireXIsString () {
	if (hasRequiredXIsString) return xIsString;
	hasRequiredXIsString = 1;
	var toString = Object.prototype.toString;

	xIsString = isString;

	function isString(obj) {
	    return toString.call(obj) === "[object String]"
	}
	return xIsString;
}

var isPlainObj;
var hasRequiredIsPlainObj;

function requireIsPlainObj () {
	if (hasRequiredIsPlainObj) return isPlainObj;
	hasRequiredIsPlainObj = 1;
	var toString = Object.prototype.toString;

	isPlainObj = function (x) {
		var prototype;
		return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
	};
	return isPlainObj;
}

var unified_1;
var hasRequiredUnified;

function requireUnified () {
	if (hasRequiredUnified) return unified_1;
	hasRequiredUnified = 1;

	/* Dependencies. */
	var extend = requireExtend();
	var bail = requireBail();
	var vfile = requireVfile();
	var trough = requireTrough();
	var string = requireXIsString();
	var plain = requireIsPlainObj();

	/* Expose a frozen processor. */
	unified_1 = unified().freeze();

	var slice = [].slice;
	var own = {}.hasOwnProperty;

	/* Process pipeline. */
	var pipeline = trough()
	  .use(pipelineParse)
	  .use(pipelineRun)
	  .use(pipelineStringify);

	function pipelineParse(p, ctx) {
	  ctx.tree = p.parse(ctx.file);
	}

	function pipelineRun(p, ctx, next) {
	  p.run(ctx.tree, ctx.file, done);

	  function done(err, tree, file) {
	    if (err) {
	      next(err);
	    } else {
	      ctx.tree = tree;
	      ctx.file = file;
	      next();
	    }
	  }
	}

	function pipelineStringify(p, ctx) {
	  ctx.file.contents = p.stringify(ctx.tree, ctx.file);
	}

	/* Function to create the first processor. */
	function unified() {
	  var attachers = [];
	  var transformers = trough();
	  var namespace = {};
	  var frozen = false;
	  var freezeIndex = -1;

	  /* Data management. */
	  processor.data = data;

	  /* Lock. */
	  processor.freeze = freeze;

	  /* Plug-ins. */
	  processor.attachers = attachers;
	  processor.use = use;

	  /* API. */
	  processor.parse = parse;
	  processor.stringify = stringify;
	  processor.run = run;
	  processor.runSync = runSync;
	  processor.process = process;
	  processor.processSync = processSync;

	  /* Expose. */
	  return processor

	  /* Create a new processor based on the processor
	   * in the current scope. */
	  function processor() {
	    var destination = unified();
	    var length = attachers.length;
	    var index = -1;

	    while (++index < length) {
	      destination.use.apply(null, attachers[index]);
	    }

	    destination.data(extend(true, {}, namespace));

	    return destination
	  }

	  /* Freeze: used to signal a processor that has finished
	   * configuration.
	   *
	   * For example, take unified itself.  It’s frozen.
	   * Plug-ins should not be added to it.  Rather, it should
	   * be extended, by invoking it, before modifying it.
	   *
	   * In essence, always invoke this when exporting a
	   * processor. */
	  function freeze() {
	    var values;
	    var plugin;
	    var options;
	    var transformer;

	    if (frozen) {
	      return processor
	    }

	    while (++freezeIndex < attachers.length) {
	      values = attachers[freezeIndex];
	      plugin = values[0];
	      options = values[1];
	      transformer = null;

	      if (options === false) {
	        continue
	      }

	      if (options === true) {
	        values[1] = undefined;
	      }

	      transformer = plugin.apply(processor, values.slice(1));

	      if (typeof transformer === 'function') {
	        transformers.use(transformer);
	      }
	    }

	    frozen = true;
	    freezeIndex = Infinity;

	    return processor
	  }

	  /* Data management.
	   * Getter / setter for processor-specific informtion. */
	  function data(key, value) {
	    if (string(key)) {
	      /* Set `key`. */
	      if (arguments.length === 2) {
	        assertUnfrozen('data', frozen);

	        namespace[key] = value;

	        return processor
	      }

	      /* Get `key`. */
	      return (own.call(namespace, key) && namespace[key]) || null
	    }

	    /* Set space. */
	    if (key) {
	      assertUnfrozen('data', frozen);
	      namespace = key;
	      return processor
	    }

	    /* Get space. */
	    return namespace
	  }

	  /* Plug-in management.
	   *
	   * Pass it:
	   * *   an attacher and options,
	   * *   a preset,
	   * *   a list of presets, attachers, and arguments (list
	   *     of attachers and options). */
	  function use(value) {
	    var settings;

	    assertUnfrozen('use', frozen);

	    if (value === null || value === undefined) ; else if (typeof value === 'function') {
	      addPlugin.apply(null, arguments);
	    } else if (typeof value === 'object') {
	      if ('length' in value) {
	        addList(value);
	      } else {
	        addPreset(value);
	      }
	    } else {
	      throw new Error('Expected usable value, not `' + value + '`')
	    }

	    if (settings) {
	      namespace.settings = extend(namespace.settings || {}, settings);
	    }

	    return processor

	    function addPreset(result) {
	      addList(result.plugins);

	      if (result.settings) {
	        settings = extend(settings || {}, result.settings);
	      }
	    }

	    function add(value) {
	      if (typeof value === 'function') {
	        addPlugin(value);
	      } else if (typeof value === 'object') {
	        if ('length' in value) {
	          addPlugin.apply(null, value);
	        } else {
	          addPreset(value);
	        }
	      } else {
	        throw new Error('Expected usable value, not `' + value + '`')
	      }
	    }

	    function addList(plugins) {
	      var length;
	      var index;

	      if (plugins === null || plugins === undefined) ; else if (typeof plugins === 'object' && 'length' in plugins) {
	        length = plugins.length;
	        index = -1;

	        while (++index < length) {
	          add(plugins[index]);
	        }
	      } else {
	        throw new Error('Expected a list of plugins, not `' + plugins + '`')
	      }
	    }

	    function addPlugin(plugin, value) {
	      var entry = find(plugin);

	      if (entry) {
	        if (plain(entry[1]) && plain(value)) {
	          value = extend(entry[1], value);
	        }

	        entry[1] = value;
	      } else {
	        attachers.push(slice.call(arguments));
	      }
	    }
	  }

	  function find(plugin) {
	    var length = attachers.length;
	    var index = -1;
	    var entry;

	    while (++index < length) {
	      entry = attachers[index];

	      if (entry[0] === plugin) {
	        return entry
	      }
	    }
	  }

	  /* Parse a file (in string or VFile representation)
	   * into a Unist node using the `Parser` on the
	   * processor. */
	  function parse(doc) {
	    var file = vfile(doc);
	    var Parser;

	    freeze();
	    Parser = processor.Parser;
	    assertParser('parse', Parser);

	    if (newable(Parser)) {
	      return new Parser(String(file), file).parse()
	    }

	    return Parser(String(file), file) // eslint-disable-line new-cap
	  }

	  /* Run transforms on a Unist node representation of a file
	   * (in string or VFile representation), async. */
	  function run(node, file, cb) {
	    assertNode(node);
	    freeze();

	    if (!cb && typeof file === 'function') {
	      cb = file;
	      file = null;
	    }

	    if (!cb) {
	      return new Promise(executor)
	    }

	    executor(null, cb);

	    function executor(resolve, reject) {
	      transformers.run(node, vfile(file), done);

	      function done(err, tree, file) {
	        tree = tree || node;
	        if (err) {
	          reject(err);
	        } else if (resolve) {
	          resolve(tree);
	        } else {
	          cb(null, tree, file);
	        }
	      }
	    }
	  }

	  /* Run transforms on a Unist node representation of a file
	   * (in string or VFile representation), sync. */
	  function runSync(node, file) {
	    var complete = false;
	    var result;

	    run(node, file, done);

	    assertDone('runSync', 'run', complete);

	    return result

	    function done(err, tree) {
	      complete = true;
	      bail(err);
	      result = tree;
	    }
	  }

	  /* Stringify a Unist node representation of a file
	   * (in string or VFile representation) into a string
	   * using the `Compiler` on the processor. */
	  function stringify(node, doc) {
	    var file = vfile(doc);
	    var Compiler;

	    freeze();
	    Compiler = processor.Compiler;
	    assertCompiler('stringify', Compiler);
	    assertNode(node);

	    if (newable(Compiler)) {
	      return new Compiler(node, file).compile()
	    }

	    return Compiler(node, file) // eslint-disable-line new-cap
	  }

	  /* Parse a file (in string or VFile representation)
	   * into a Unist node using the `Parser` on the processor,
	   * then run transforms on that node, and compile the
	   * resulting node using the `Compiler` on the processor,
	   * and store that result on the VFile. */
	  function process(doc, cb) {
	    freeze();
	    assertParser('process', processor.Parser);
	    assertCompiler('process', processor.Compiler);

	    if (!cb) {
	      return new Promise(executor)
	    }

	    executor(null, cb);

	    function executor(resolve, reject) {
	      var file = vfile(doc);

	      pipeline.run(processor, {file: file}, done);

	      function done(err) {
	        if (err) {
	          reject(err);
	        } else if (resolve) {
	          resolve(file);
	        } else {
	          cb(null, file);
	        }
	      }
	    }
	  }

	  /* Process the given document (in string or VFile
	   * representation), sync. */
	  function processSync(doc) {
	    var complete = false;
	    var file;

	    freeze();
	    assertParser('processSync', processor.Parser);
	    assertCompiler('processSync', processor.Compiler);
	    file = vfile(doc);

	    process(file, done);

	    assertDone('processSync', 'process', complete);

	    return file

	    function done(err) {
	      complete = true;
	      bail(err);
	    }
	  }
	}

	/* Check if `func` is a constructor. */
	function newable(value) {
	  return typeof value === 'function' && keys(value.prototype)
	}

	/* Check if `value` is an object with keys. */
	function keys(value) {
	  var key;
	  for (key in value) {
	    return true
	  }
	  return false
	}

	/* Assert a parser is available. */
	function assertParser(name, Parser) {
	  if (typeof Parser !== 'function') {
	    throw new Error('Cannot `' + name + '` without `Parser`')
	  }
	}

	/* Assert a compiler is available. */
	function assertCompiler(name, Compiler) {
	  if (typeof Compiler !== 'function') {
	    throw new Error('Cannot `' + name + '` without `Compiler`')
	  }
	}

	/* Assert the processor is not frozen. */
	function assertUnfrozen(name, frozen) {
	  if (frozen) {
	    throw new Error(
	      [
	        'Cannot invoke `' + name + '` on a frozen processor.\nCreate a new ',
	        'processor first, by invoking it: use `processor()` instead of ',
	        '`processor`.'
	      ].join('')
	    )
	  }
	}

	/* Assert `node` is a Unist node. */
	function assertNode(node) {
	  if (!node || !string(node.type)) {
	    throw new Error('Expected node, got `' + node + '`')
	  }
	}

	/* Assert that `complete` is `true`. */
	function assertDone(name, asyncName, complete) {
	  if (!complete) {
	    throw new Error(
	      '`' + name + '` finished async. Use `' + asyncName + '` instead'
	    )
	  }
	}
	return unified_1;
}

var inherits_browser = {exports: {}};

var hasRequiredInherits_browser;

function requireInherits_browser () {
	if (hasRequiredInherits_browser) return inherits_browser.exports;
	hasRequiredInherits_browser = 1;
	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  inherits_browser.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      ctor.prototype = Object.create(superCtor.prototype, {
	        constructor: {
	          value: ctor,
	          enumerable: false,
	          writable: true,
	          configurable: true
	        }
	      });
	    }
	  };
	} else {
	  // old school shim for old browsers
	  inherits_browser.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      var TempCtor = function () {};
	      TempCtor.prototype = superCtor.prototype;
	      ctor.prototype = new TempCtor();
	      ctor.prototype.constructor = ctor;
	    }
	  };
	}
	return inherits_browser.exports;
}

var unherit_1;
var hasRequiredUnherit;

function requireUnherit () {
	if (hasRequiredUnherit) return unherit_1;
	hasRequiredUnherit = 1;

	var xtend = requireImmutable();
	var inherits = requireInherits_browser();

	unherit_1 = unherit;

	// Create a custom constructor which can be modified without affecting the
	// original class.
	function unherit(Super) {
	  var result;
	  var key;
	  var value;

	  inherits(Of, Super);
	  inherits(From, Of);

	  // Clone values.
	  result = Of.prototype;

	  for (key in result) {
	    value = result[key];

	    if (value && typeof value === 'object') {
	      result[key] = 'concat' in value ? value.concat() : xtend(value);
	    }
	  }

	  return Of

	  // Constructor accepting a single argument, which itself is an `arguments`
	  // object.
	  function From(parameters) {
	    return Super.apply(this, parameters)
	  }

	  // Constructor accepting variadic arguments.
	  function Of() {
	    if (!(this instanceof Of)) {
	      return new From(arguments)
	    }

	    return Super.apply(this, arguments)
	  }
	}
	return unherit_1;
}

var stateToggle;
var hasRequiredStateToggle;

function requireStateToggle () {
	if (hasRequiredStateToggle) return stateToggle;
	hasRequiredStateToggle = 1;

	stateToggle = factory;

	// Construct a state `toggler`: a function which inverses `property` in context
	// based on its current value.
	// The by `toggler` returned function restores that value.
	function factory(key, state, ctx) {
	  return enter

	  function enter() {
	    var context = ctx || this;
	    var current = context[key];

	    context[key] = !state;

	    return exit

	    function exit() {
	      context[key] = current;
	    }
	  }
	}
	return stateToggle;
}

var vfileLocation;
var hasRequiredVfileLocation;

function requireVfileLocation () {
	if (hasRequiredVfileLocation) return vfileLocation;
	hasRequiredVfileLocation = 1;

	vfileLocation = factory;

	function factory(file) {
	  var contents = indices(String(file));

	  return {
	    toPosition: offsetToPositionFactory(contents),
	    toOffset: positionToOffsetFactory(contents)
	  }
	}

	// Factory to get the line and column-based `position` for `offset` in the bound
	// indices.
	function offsetToPositionFactory(indices) {
	  return offsetToPosition

	  // Get the line and column-based `position` for `offset` in the bound indices.
	  function offsetToPosition(offset) {
	    var index = -1;
	    var length = indices.length;

	    if (offset < 0) {
	      return {}
	    }

	    while (++index < length) {
	      if (indices[index] > offset) {
	        return {
	          line: index + 1,
	          column: offset - (indices[index - 1] || 0) + 1,
	          offset: offset
	        }
	      }
	    }

	    return {}
	  }
	}

	// Factory to get the `offset` for a line and column-based `position` in the
	// bound indices.
	function positionToOffsetFactory(indices) {
	  return positionToOffset

	  // Get the `offset` for a line and column-based `position` in the bound
	  // indices.
	  function positionToOffset(position) {
	    var line = position && position.line;
	    var column = position && position.column;

	    if (!isNaN(line) && !isNaN(column) && line - 1 in indices) {
	      return (indices[line - 2] || 0) + column - 1 || 0
	    }

	    return -1
	  }
	}

	// Get indices of line-breaks in `value`.
	function indices(value) {
	  var result = [];
	  var index = value.indexOf('\n');

	  while (index !== -1) {
	    result.push(index + 1);
	    index = value.indexOf('\n', index + 1);
	  }

	  result.push(value.length + 1);

	  return result
	}
	return vfileLocation;
}

var _unescape;
var hasRequired_unescape;

function require_unescape () {
	if (hasRequired_unescape) return _unescape;
	hasRequired_unescape = 1;

	_unescape = factory;

	/* Factory to de-escape a value, based on a list at `key`
	 * in `ctx`. */
	function factory(ctx, key) {
	  return unescape;

	  /* De-escape a string using the expression at `key`
	   * in `ctx`. */
	  function unescape(value) {
	    var prev = 0;
	    var index = value.indexOf('\\');
	    var escape = ctx[key];
	    var queue = [];
	    var character;

	    while (index !== -1) {
	      queue.push(value.slice(prev, index));
	      prev = index + 1;
	      character = value.charAt(prev);

	      /* If the following character is not a valid escape,
	       * add the slash. */
	      if (!character || escape.indexOf(character) === -1) {
	        queue.push('\\');
	      }

	      index = value.indexOf('\\', prev);
	    }

	    queue.push(value.slice(prev));

	    return queue.join('');
	  }
	}
	return _unescape;
}

var AElig = "Æ";
var AMP = "&";
var Aacute = "Á";
var Acirc = "Â";
var Agrave = "À";
var Aring = "Å";
var Atilde = "Ã";
var Auml = "Ä";
var COPY = "©";
var Ccedil = "Ç";
var ETH = "Ð";
var Eacute = "É";
var Ecirc = "Ê";
var Egrave = "È";
var Euml = "Ë";
var GT = ">";
var Iacute = "Í";
var Icirc = "Î";
var Igrave = "Ì";
var Iuml = "Ï";
var LT = "<";
var Ntilde = "Ñ";
var Oacute = "Ó";
var Ocirc = "Ô";
var Ograve = "Ò";
var Oslash = "Ø";
var Otilde = "Õ";
var Ouml = "Ö";
var QUOT = "\"";
var REG = "®";
var THORN = "Þ";
var Uacute = "Ú";
var Ucirc = "Û";
var Ugrave = "Ù";
var Uuml = "Ü";
var Yacute = "Ý";
var aacute = "á";
var acirc = "â";
var acute = "´";
var aelig = "æ";
var agrave = "à";
var amp = "&";
var aring = "å";
var atilde = "ã";
var auml = "ä";
var brvbar = "¦";
var ccedil = "ç";
var cedil = "¸";
var cent = "¢";
var copy = "©";
var curren = "¤";
var deg = "°";
var divide = "÷";
var eacute = "é";
var ecirc = "ê";
var egrave = "è";
var eth = "ð";
var euml = "ë";
var frac12 = "½";
var frac14 = "¼";
var frac34 = "¾";
var gt = ">";
var iacute = "í";
var icirc = "î";
var iexcl = "¡";
var igrave = "ì";
var iquest = "¿";
var iuml = "ï";
var laquo = "«";
var lt = "<";
var macr = "¯";
var micro = "µ";
var middot = "·";
var nbsp = " ";
var not = "¬";
var ntilde = "ñ";
var oacute = "ó";
var ocirc = "ô";
var ograve = "ò";
var ordf = "ª";
var ordm = "º";
var oslash = "ø";
var otilde = "õ";
var ouml = "ö";
var para = "¶";
var plusmn = "±";
var pound = "£";
var quot = "\"";
var raquo = "»";
var reg = "®";
var sect = "§";
var shy = "­";
var sup1 = "¹";
var sup2 = "²";
var sup3 = "³";
var szlig = "ß";
var thorn = "þ";
var times = "×";
var uacute = "ú";
var ucirc = "û";
var ugrave = "ù";
var uml = "¨";
var uuml = "ü";
var yacute = "ý";
var yen = "¥";
var yuml = "ÿ";
var require$$0$1 = {
	AElig: AElig,
	AMP: AMP,
	Aacute: Aacute,
	Acirc: Acirc,
	Agrave: Agrave,
	Aring: Aring,
	Atilde: Atilde,
	Auml: Auml,
	COPY: COPY,
	Ccedil: Ccedil,
	ETH: ETH,
	Eacute: Eacute,
	Ecirc: Ecirc,
	Egrave: Egrave,
	Euml: Euml,
	GT: GT,
	Iacute: Iacute,
	Icirc: Icirc,
	Igrave: Igrave,
	Iuml: Iuml,
	LT: LT,
	Ntilde: Ntilde,
	Oacute: Oacute,
	Ocirc: Ocirc,
	Ograve: Ograve,
	Oslash: Oslash,
	Otilde: Otilde,
	Ouml: Ouml,
	QUOT: QUOT,
	REG: REG,
	THORN: THORN,
	Uacute: Uacute,
	Ucirc: Ucirc,
	Ugrave: Ugrave,
	Uuml: Uuml,
	Yacute: Yacute,
	aacute: aacute,
	acirc: acirc,
	acute: acute,
	aelig: aelig,
	agrave: agrave,
	amp: amp,
	aring: aring,
	atilde: atilde,
	auml: auml,
	brvbar: brvbar,
	ccedil: ccedil,
	cedil: cedil,
	cent: cent,
	copy: copy,
	curren: curren,
	deg: deg,
	divide: divide,
	eacute: eacute,
	ecirc: ecirc,
	egrave: egrave,
	eth: eth,
	euml: euml,
	frac12: frac12,
	frac14: frac14,
	frac34: frac34,
	gt: gt,
	iacute: iacute,
	icirc: icirc,
	iexcl: iexcl,
	igrave: igrave,
	iquest: iquest,
	iuml: iuml,
	laquo: laquo,
	lt: lt,
	macr: macr,
	micro: micro,
	middot: middot,
	nbsp: nbsp,
	not: not,
	ntilde: ntilde,
	oacute: oacute,
	ocirc: ocirc,
	ograve: ograve,
	ordf: ordf,
	ordm: ordm,
	oslash: oslash,
	otilde: otilde,
	ouml: ouml,
	para: para,
	plusmn: plusmn,
	pound: pound,
	quot: quot,
	raquo: raquo,
	reg: reg,
	sect: sect,
	shy: shy,
	sup1: sup1,
	sup2: sup2,
	sup3: sup3,
	szlig: szlig,
	thorn: thorn,
	times: times,
	uacute: uacute,
	ucirc: ucirc,
	ugrave: ugrave,
	uml: uml,
	uuml: uuml,
	yacute: yacute,
	yen: yen,
	yuml: yuml
};

var require$$1 = {
	"0": "�",
	"128": "€",
	"130": "‚",
	"131": "ƒ",
	"132": "„",
	"133": "…",
	"134": "†",
	"135": "‡",
	"136": "ˆ",
	"137": "‰",
	"138": "Š",
	"139": "‹",
	"140": "Œ",
	"142": "Ž",
	"145": "‘",
	"146": "’",
	"147": "“",
	"148": "”",
	"149": "•",
	"150": "–",
	"151": "—",
	"152": "˜",
	"153": "™",
	"154": "š",
	"155": "›",
	"156": "œ",
	"158": "ž",
	"159": "Ÿ"
};

var isDecimal;
var hasRequiredIsDecimal;

function requireIsDecimal () {
	if (hasRequiredIsDecimal) return isDecimal;
	hasRequiredIsDecimal = 1;

	isDecimal = decimal;

	// Check if the given character code, or the character code at the first
	// character, is decimal.
	function decimal(character) {
	  var code = typeof character === 'string' ? character.charCodeAt(0) : character;

	  return code >= 48 && code <= 57 /* 0-9 */
	}
	return isDecimal;
}

var isHexadecimal;
var hasRequiredIsHexadecimal;

function requireIsHexadecimal () {
	if (hasRequiredIsHexadecimal) return isHexadecimal;
	hasRequiredIsHexadecimal = 1;

	isHexadecimal = hexadecimal;

	// Check if the given character code, or the character code at the first
	// character, is hexadecimal.
	function hexadecimal(character) {
	  var code = typeof character === 'string' ? character.charCodeAt(0) : character;

	  return (
	    (code >= 97 /* a */ && code <= 102) /* z */ ||
	    (code >= 65 /* A */ && code <= 70) /* Z */ ||
	    (code >= 48 /* A */ && code <= 57) /* Z */
	  )
	}
	return isHexadecimal;
}

var isAlphabetical;
var hasRequiredIsAlphabetical;

function requireIsAlphabetical () {
	if (hasRequiredIsAlphabetical) return isAlphabetical;
	hasRequiredIsAlphabetical = 1;

	isAlphabetical = alphabetical;

	// Check if the given character code, or the character code at the first
	// character, is alphabetical.
	function alphabetical(character) {
	  var code = typeof character === 'string' ? character.charCodeAt(0) : character;

	  return (
	    (code >= 97 && code <= 122) /* a-z */ ||
	    (code >= 65 && code <= 90) /* A-Z */
	  )
	}
	return isAlphabetical;
}

var isAlphanumerical;
var hasRequiredIsAlphanumerical;

function requireIsAlphanumerical () {
	if (hasRequiredIsAlphanumerical) return isAlphanumerical;
	hasRequiredIsAlphanumerical = 1;

	var alphabetical = requireIsAlphabetical();
	var decimal = requireIsDecimal();

	isAlphanumerical = alphanumerical;

	// Check if the given character code, or the character code at the first
	// character, is alphanumerical.
	function alphanumerical(character) {
	  return alphabetical(character) || decimal(character)
	}
	return isAlphanumerical;
}

var decodeEntity_browser;
var hasRequiredDecodeEntity_browser;

function requireDecodeEntity_browser () {
	if (hasRequiredDecodeEntity_browser) return decodeEntity_browser;
	hasRequiredDecodeEntity_browser = 1;

	/* eslint-env browser */

	var el;

	var semicolon = 59; //  ';'

	decodeEntity_browser = decodeEntity;

	function decodeEntity(characters) {
	  var entity = '&' + characters + ';';
	  var char;

	  el = el || document.createElement('i');
	  el.innerHTML = entity;
	  char = el.textContent;

	  // Some entities do not require the closing semicolon (`&not` - for instance),
	  // which leads to situations where parsing the assumed entity of &notit; will
	  // result in the string `¬it;`.  When we encounter a trailing semicolon after
	  // parsing and the entity to decode was not a semicolon (`&semi;`), we can
	  // assume that the matching was incomplete
	  if (char.charCodeAt(char.length - 1) === semicolon && characters !== 'semi') {
	    return false
	  }

	  // If the decoded string is equal to the input, the entity was not valid
	  return char === entity ? false : char
	}
	return decodeEntity_browser;
}

var parseEntities_1;
var hasRequiredParseEntities;

function requireParseEntities () {
	if (hasRequiredParseEntities) return parseEntities_1;
	hasRequiredParseEntities = 1;

	var legacy = require$$0$1;
	var invalid = require$$1;
	var decimal = requireIsDecimal();
	var hexadecimal = requireIsHexadecimal();
	var alphanumerical = requireIsAlphanumerical();
	var decodeEntity = requireDecodeEntity_browser();

	parseEntities_1 = parseEntities;

	var own = {}.hasOwnProperty;
	var fromCharCode = String.fromCharCode;
	var noop = Function.prototype;

	// Default settings.
	var defaults = {
	  warning: null,
	  reference: null,
	  text: null,
	  warningContext: null,
	  referenceContext: null,
	  textContext: null,
	  position: {},
	  additional: null,
	  attribute: false,
	  nonTerminated: true
	};

	// Characters.
	var tab = 9; // '\t'
	var lineFeed = 10; // '\n'
	var formFeed = 12; //  '\f'
	var space = 32; // ' '
	var ampersand = 38; //  '&'
	var semicolon = 59; //  ';'
	var lessThan = 60; //  '<'
	var equalsTo = 61; //  '='
	var numberSign = 35; //  '#'
	var uppercaseX = 88; //  'X'
	var lowercaseX = 120; //  'x'
	var replacementCharacter = 65533; // '�'

	// Reference types.
	var name = 'named';
	var hexa = 'hexadecimal';
	var deci = 'decimal';

	// Map of bases.
	var bases = {};

	bases[hexa] = 16;
	bases[deci] = 10;

	// Map of types to tests.
	// Each type of character reference accepts different characters.
	// This test is used to detect whether a reference has ended (as the semicolon
	// is not strictly needed).
	var tests = {};

	tests[name] = alphanumerical;
	tests[deci] = decimal;
	tests[hexa] = hexadecimal;

	// Warning types.
	var namedNotTerminated = 1;
	var numericNotTerminated = 2;
	var namedEmpty = 3;
	var numericEmpty = 4;
	var namedUnknown = 5;
	var numericDisallowed = 6;
	var numericProhibited = 7;

	// Warning messages.
	var messages = {};

	messages[namedNotTerminated] =
	  'Named character references must be terminated by a semicolon';
	messages[numericNotTerminated] =
	  'Numeric character references must be terminated by a semicolon';
	messages[namedEmpty] = 'Named character references cannot be empty';
	messages[numericEmpty] = 'Numeric character references cannot be empty';
	messages[namedUnknown] = 'Named character references must be known';
	messages[numericDisallowed] =
	  'Numeric character references cannot be disallowed';
	messages[numericProhibited] =
	  'Numeric character references cannot be outside the permissible Unicode range';

	// Wrap to ensure clean parameters are given to `parse`.
	function parseEntities(value, options) {
	  var settings = {};
	  var option;
	  var key;

	  if (!options) {
	    options = {};
	  }

	  for (key in defaults) {
	    option = options[key];
	    settings[key] =
	      option === null || option === undefined ? defaults[key] : option;
	  }

	  if (settings.position.indent || settings.position.start) {
	    settings.indent = settings.position.indent || [];
	    settings.position = settings.position.start;
	  }

	  return parse(value, settings)
	}

	// Parse entities.
	// eslint-disable-next-line complexity
	function parse(value, settings) {
	  var additional = settings.additional;
	  var nonTerminated = settings.nonTerminated;
	  var handleText = settings.text;
	  var handleReference = settings.reference;
	  var handleWarning = settings.warning;
	  var textContext = settings.textContext;
	  var referenceContext = settings.referenceContext;
	  var warningContext = settings.warningContext;
	  var pos = settings.position;
	  var indent = settings.indent || [];
	  var length = value.length;
	  var index = 0;
	  var lines = -1;
	  var column = pos.column || 1;
	  var line = pos.line || 1;
	  var queue = '';
	  var result = [];
	  var entityCharacters;
	  var namedEntity;
	  var terminated;
	  var characters;
	  var character;
	  var reference;
	  var following;
	  var warning;
	  var reason;
	  var output;
	  var entity;
	  var begin;
	  var start;
	  var type;
	  var test;
	  var prev;
	  var next;
	  var diff;
	  var end;

	  if (typeof additional === 'string') {
	    additional = additional.charCodeAt(0);
	  }

	  // Cache the current point.
	  prev = now();

	  // Wrap `handleWarning`.
	  warning = handleWarning ? parseError : noop;

	  // Ensure the algorithm walks over the first character and the end (inclusive).
	  index--;
	  length++;

	  while (++index < length) {
	    // If the previous character was a newline.
	    if (character === lineFeed) {
	      column = indent[lines] || 1;
	    }

	    character = value.charCodeAt(index);

	    if (character === ampersand) {
	      following = value.charCodeAt(index + 1);

	      // The behaviour depends on the identity of the next character.
	      if (
	        following === tab ||
	        following === lineFeed ||
	        following === formFeed ||
	        following === space ||
	        following === ampersand ||
	        following === lessThan ||
	        following !== following ||
	        (additional && following === additional)
	      ) {
	        // Not a character reference.
	        // No characters are consumed, and nothing is returned.
	        // This is not an error, either.
	        queue += fromCharCode(character);
	        column++;

	        continue
	      }

	      start = index + 1;
	      begin = start;
	      end = start;

	      if (following === numberSign) {
	        // Numerical entity.
	        end = ++begin;

	        // The behaviour further depends on the next character.
	        following = value.charCodeAt(end);

	        if (following === uppercaseX || following === lowercaseX) {
	          // ASCII hex digits.
	          type = hexa;
	          end = ++begin;
	        } else {
	          // ASCII digits.
	          type = deci;
	        }
	      } else {
	        // Named entity.
	        type = name;
	      }

	      entityCharacters = '';
	      entity = '';
	      characters = '';
	      test = tests[type];
	      end--;

	      while (++end < length) {
	        following = value.charCodeAt(end);

	        if (!test(following)) {
	          break
	        }

	        characters += fromCharCode(following);

	        // Check if we can match a legacy named reference.
	        // If so, we cache that as the last viable named reference.
	        // This ensures we do not need to walk backwards later.
	        if (type === name && own.call(legacy, characters)) {
	          entityCharacters = characters;
	          entity = legacy[characters];
	        }
	      }

	      terminated = value.charCodeAt(end) === semicolon;

	      if (terminated) {
	        end++;

	        namedEntity = type === name ? decodeEntity(characters) : false;

	        if (namedEntity) {
	          entityCharacters = characters;
	          entity = namedEntity;
	        }
	      }

	      diff = 1 + end - start;

	      if (!terminated && !nonTerminated) ; else if (!characters) {
	        // An empty (possible) entity is valid, unless it’s numeric (thus an
	        // ampersand followed by an octothorp).
	        if (type !== name) {
	          warning(numericEmpty, diff);
	        }
	      } else if (type === name) {
	        // An ampersand followed by anything unknown, and not terminated, is
	        // invalid.
	        if (terminated && !entity) {
	          warning(namedUnknown, 1);
	        } else {
	          // If theres something after an entity name which is not known, cap
	          // the reference.
	          if (entityCharacters !== characters) {
	            end = begin + entityCharacters.length;
	            diff = 1 + end - begin;
	            terminated = false;
	          }

	          // If the reference is not terminated, warn.
	          if (!terminated) {
	            reason = entityCharacters ? namedNotTerminated : namedEmpty;

	            if (settings.attribute) {
	              following = value.charCodeAt(end);

	              if (following === equalsTo) {
	                warning(reason, diff);
	                entity = null;
	              } else if (alphanumerical(following)) {
	                entity = null;
	              } else {
	                warning(reason, diff);
	              }
	            } else {
	              warning(reason, diff);
	            }
	          }
	        }

	        reference = entity;
	      } else {
	        if (!terminated) {
	          // All non-terminated numeric entities are not rendered, and trigger a
	          // warning.
	          warning(numericNotTerminated, diff);
	        }

	        // When terminated and number, parse as either hexadecimal or decimal.
	        reference = parseInt(characters, bases[type]);

	        // Trigger a warning when the parsed number is prohibited, and replace
	        // with replacement character.
	        if (prohibited(reference)) {
	          warning(numericProhibited, diff);
	          reference = fromCharCode(replacementCharacter);
	        } else if (reference in invalid) {
	          // Trigger a warning when the parsed number is disallowed, and replace
	          // by an alternative.
	          warning(numericDisallowed, diff);
	          reference = invalid[reference];
	        } else {
	          // Parse the number.
	          output = '';

	          // Trigger a warning when the parsed number should not be used.
	          if (disallowed(reference)) {
	            warning(numericDisallowed, diff);
	          }

	          // Stringify the number.
	          if (reference > 0xffff) {
	            reference -= 0x10000;
	            output += fromCharCode((reference >>> (10 & 0x3ff)) | 0xd800);
	            reference = 0xdc00 | (reference & 0x3ff);
	          }

	          reference = output + fromCharCode(reference);
	        }
	      }

	      // Found it!
	      // First eat the queued characters as normal text, then eat an entity.
	      if (reference) {
	        flush();

	        prev = now();
	        index = end - 1;
	        column += end - start + 1;
	        result.push(reference);
	        next = now();
	        next.offset++;

	        if (handleReference) {
	          handleReference.call(
	            referenceContext,
	            reference,
	            {start: prev, end: next},
	            value.slice(start - 1, end)
	          );
	        }

	        prev = next;
	      } else {
	        // If we could not find a reference, queue the checked characters (as
	        // normal characters), and move the pointer to their end.
	        // This is possible because we can be certain neither newlines nor
	        // ampersands are included.
	        characters = value.slice(start - 1, end);
	        queue += characters;
	        column += characters.length;
	        index = end - 1;
	      }
	    } else {
	      // Handle anything other than an ampersand, including newlines and EOF.
	      if (
	        character === 10 // Line feed
	      ) {
	        line++;
	        lines++;
	        column = 0;
	      }

	      if (character === character) {
	        queue += fromCharCode(character);
	        column++;
	      } else {
	        flush();
	      }
	    }
	  }

	  // Return the reduced nodes, and any possible warnings.
	  return result.join('')

	  // Get current position.
	  function now() {
	    return {
	      line: line,
	      column: column,
	      offset: index + (pos.offset || 0)
	    }
	  }

	  // “Throw” a parse-error: a warning.
	  function parseError(code, offset) {
	    var position = now();

	    position.column += offset;
	    position.offset += offset;

	    handleWarning.call(warningContext, messages[code], position, code);
	  }

	  // Flush `queue` (normal text).
	  // Macro invoked before each entity and at the end of `value`.
	  // Does nothing when `queue` is empty.
	  function flush() {
	    if (queue) {
	      result.push(queue);

	      if (handleText) {
	        handleText.call(textContext, queue, {start: prev, end: now()});
	      }

	      queue = '';
	    }
	  }
	}

	// Check if `character` is outside the permissible unicode range.
	function prohibited(code) {
	  return (code >= 0xd800 && code <= 0xdfff) || code > 0x10ffff
	}

	// Check if `character` is disallowed.
	function disallowed(code) {
	  return (
	    (code >= 0x0001 && code <= 0x0008) ||
	    code === 0x000b ||
	    (code >= 0x000d && code <= 0x001f) ||
	    (code >= 0x007f && code <= 0x009f) ||
	    (code >= 0xfdd0 && code <= 0xfdef) ||
	    (code & 0xffff) === 0xffff ||
	    (code & 0xffff) === 0xfffe
	  )
	}
	return parseEntities_1;
}

var decode;
var hasRequiredDecode;

function requireDecode () {
	if (hasRequiredDecode) return decode;
	hasRequiredDecode = 1;

	var xtend = requireImmutable();
	var entities = requireParseEntities();

	decode = factory;

	/* Factory to create an entity decoder. */
	function factory(ctx) {
	  decoder.raw = decodeRaw;

	  return decoder;

	  /* Normalize `position` to add an `indent`. */
	  function normalize(position) {
	    var offsets = ctx.offset;
	    var line = position.line;
	    var result = [];

	    while (++line) {
	      if (!(line in offsets)) {
	        break;
	      }

	      result.push((offsets[line] || 0) + 1);
	    }

	    return {
	      start: position,
	      indent: result
	    };
	  }

	  /* Handle a warning.
	   * See https://github.com/wooorm/parse-entities
	   * for the warnings. */
	  function handleWarning(reason, position, code) {
	    if (code === 3) {
	      return;
	    }

	    ctx.file.message(reason, position);
	  }

	  /* Decode `value` (at `position`) into text-nodes. */
	  function decoder(value, position, handler) {
	    entities(value, {
	      position: normalize(position),
	      warning: handleWarning,
	      text: handler,
	      reference: handler,
	      textContext: ctx,
	      referenceContext: ctx
	    });
	  }

	  /* Decode `value` (at `position`) into a string. */
	  function decodeRaw(value, position, options) {
	    return entities(value, xtend(options, {
	      position: normalize(position),
	      warning: handleWarning
	    }));
	  }
	}
	return decode;
}

var tokenizer;
var hasRequiredTokenizer;

function requireTokenizer () {
	if (hasRequiredTokenizer) return tokenizer;
	hasRequiredTokenizer = 1;

	tokenizer = factory;

	var MERGEABLE_NODES = {
	  text: mergeText,
	  blockquote: mergeBlockquote
	};

	/* Check whether a node is mergeable with adjacent nodes. */
	function mergeable(node) {
	  var start;
	  var end;

	  if (node.type !== 'text' || !node.position) {
	    return true;
	  }

	  start = node.position.start;
	  end = node.position.end;

	  /* Only merge nodes which occupy the same size as their
	   * `value`. */
	  return start.line !== end.line ||
	      end.column - start.column === node.value.length;
	}

	/* Merge two text nodes: `node` into `prev`. */
	function mergeText(prev, node) {
	  prev.value += node.value;

	  return prev;
	}

	/* Merge two blockquotes: `node` into `prev`, unless in
	 * CommonMark mode. */
	function mergeBlockquote(prev, node) {
	  if (this.options.commonmark) {
	    return node;
	  }

	  prev.children = prev.children.concat(node.children);

	  return prev;
	}

	/* Construct a tokenizer.  This creates both
	 * `tokenizeInline` and `tokenizeBlock`. */
	function factory(type) {
	  return tokenize;

	  /* Tokenizer for a bound `type`. */
	  function tokenize(value, location) {
	    var self = this;
	    var offset = self.offset;
	    var tokens = [];
	    var methods = self[type + 'Methods'];
	    var tokenizers = self[type + 'Tokenizers'];
	    var line = location.line;
	    var column = location.column;
	    var index;
	    var length;
	    var method;
	    var name;
	    var matched;
	    var valueLength;

	    /* Trim white space only lines. */
	    if (!value) {
	      return tokens;
	    }

	    /* Expose on `eat`. */
	    eat.now = now;
	    eat.file = self.file;

	    /* Sync initial offset. */
	    updatePosition('');

	    /* Iterate over `value`, and iterate over all
	     * tokenizers.  When one eats something, re-iterate
	     * with the remaining value.  If no tokenizer eats,
	     * something failed (should not happen) and an
	     * exception is thrown. */
	    while (value) {
	      index = -1;
	      length = methods.length;
	      matched = false;

	      while (++index < length) {
	        name = methods[index];
	        method = tokenizers[name];

	        if (
	          method &&
	          /* istanbul ignore next */ (!method.onlyAtStart || self.atStart) &&
	          (!method.notInList || !self.inList) &&
	          (!method.notInBlock || !self.inBlock) &&
	          (!method.notInLink || !self.inLink)
	        ) {
	          valueLength = value.length;

	          method.apply(self, [eat, value]);

	          matched = valueLength !== value.length;

	          if (matched) {
	            break;
	          }
	        }
	      }

	      /* istanbul ignore if */
	      if (!matched) {
	        self.file.fail(new Error('Infinite loop'), eat.now());
	      }
	    }

	    self.eof = now();

	    return tokens;

	    /* Update line, column, and offset based on
	     * `value`. */
	    function updatePosition(subvalue) {
	      var lastIndex = -1;
	      var index = subvalue.indexOf('\n');

	      while (index !== -1) {
	        line++;
	        lastIndex = index;
	        index = subvalue.indexOf('\n', index + 1);
	      }

	      if (lastIndex === -1) {
	        column += subvalue.length;
	      } else {
	        column = subvalue.length - lastIndex;
	      }

	      if (line in offset) {
	        if (lastIndex !== -1) {
	          column += offset[line];
	        } else if (column <= offset[line]) {
	          column = offset[line] + 1;
	        }
	      }
	    }

	    /* Get offset.  Called before the first character is
	     * eaten to retrieve the range's offsets. */
	    function getOffset() {
	      var indentation = [];
	      var pos = line + 1;

	      /* Done.  Called when the last character is
	       * eaten to retrieve the range’s offsets. */
	      return function () {
	        var last = line + 1;

	        while (pos < last) {
	          indentation.push((offset[pos] || 0) + 1);

	          pos++;
	        }

	        return indentation;
	      };
	    }

	    /* Get the current position. */
	    function now() {
	      var pos = {line: line, column: column};

	      pos.offset = self.toOffset(pos);

	      return pos;
	    }

	    /* Store position information for a node. */
	    function Position(start) {
	      this.start = start;
	      this.end = now();
	    }

	    /* Throw when a value is incorrectly eaten.
	     * This shouldn’t happen but will throw on new,
	     * incorrect rules. */
	    function validateEat(subvalue) {
	      /* istanbul ignore if */
	      if (value.substring(0, subvalue.length) !== subvalue) {
	        /* Capture stack-trace. */
	        self.file.fail(
	          new Error(
	            'Incorrectly eaten value: please report this ' +
	            'warning on http://git.io/vg5Ft'
	          ),
	          now()
	        );
	      }
	    }

	    /* Mark position and patch `node.position`. */
	    function position() {
	      var before = now();

	      return update;

	      /* Add the position to a node. */
	      function update(node, indent) {
	        var prev = node.position;
	        var start = prev ? prev.start : before;
	        var combined = [];
	        var n = prev && prev.end.line;
	        var l = before.line;

	        node.position = new Position(start);

	        /* If there was already a `position`, this
	         * node was merged.  Fixing `start` wasn’t
	         * hard, but the indent is different.
	         * Especially because some information, the
	         * indent between `n` and `l` wasn’t
	         * tracked.  Luckily, that space is
	         * (should be?) empty, so we can safely
	         * check for it now. */
	        if (prev && indent && prev.indent) {
	          combined = prev.indent;

	          if (n < l) {
	            while (++n < l) {
	              combined.push((offset[n] || 0) + 1);
	            }

	            combined.push(before.column);
	          }

	          indent = combined.concat(indent);
	        }

	        node.position.indent = indent || [];

	        return node;
	      }
	    }

	    /* Add `node` to `parent`s children or to `tokens`.
	     * Performs merges where possible. */
	    function add(node, parent) {
	      var children = parent ? parent.children : tokens;
	      var prev = children[children.length - 1];

	      if (
	        prev &&
	        node.type === prev.type &&
	        node.type in MERGEABLE_NODES &&
	        mergeable(prev) &&
	        mergeable(node)
	      ) {
	        node = MERGEABLE_NODES[node.type].call(self, prev, node);
	      }

	      if (node !== prev) {
	        children.push(node);
	      }

	      if (self.atStart && tokens.length !== 0) {
	        self.exitStart();
	      }

	      return node;
	    }

	    /* Remove `subvalue` from `value`.
	     * `subvalue` must be at the start of `value`. */
	    function eat(subvalue) {
	      var indent = getOffset();
	      var pos = position();
	      var current = now();

	      validateEat(subvalue);

	      apply.reset = reset;
	      reset.test = test;
	      apply.test = test;

	      value = value.substring(subvalue.length);

	      updatePosition(subvalue);

	      indent = indent();

	      return apply;

	      /* Add the given arguments, add `position` to
	       * the returned node, and return the node. */
	      function apply(node, parent) {
	        return pos(add(pos(node), parent), indent);
	      }

	      /* Functions just like apply, but resets the
	       * content:  the line and column are reversed,
	       * and the eaten value is re-added.
	       * This is useful for nodes with a single
	       * type of content, such as lists and tables.
	       * See `apply` above for what parameters are
	       * expected. */
	      function reset() {
	        var node = apply.apply(null, arguments);

	        line = current.line;
	        column = current.column;
	        value = subvalue + value;

	        return node;
	      }

	      /* Test the position, after eating, and reverse
	       * to a not-eaten state. */
	      function test() {
	        var result = pos({});

	        line = current.line;
	        column = current.column;
	        value = subvalue + value;

	        return result.position;
	      }
	    }
	  }
	}
	return tokenizer;
}

var markdownEscapes;
var hasRequiredMarkdownEscapes;

function requireMarkdownEscapes () {
	if (hasRequiredMarkdownEscapes) return markdownEscapes;
	hasRequiredMarkdownEscapes = 1;

	markdownEscapes = escapes;

	var defaults = [
	  '\\',
	  '`',
	  '*',
	  '{',
	  '}',
	  '[',
	  ']',
	  '(',
	  ')',
	  '#',
	  '+',
	  '-',
	  '.',
	  '!',
	  '_',
	  '>'
	];

	var gfm = defaults.concat(['~', '|']);

	var commonmark = gfm.concat([
	  '\n',
	  '"',
	  '$',
	  '%',
	  '&',
	  "'",
	  ',',
	  '/',
	  ':',
	  ';',
	  '<',
	  '=',
	  '?',
	  '@',
	  '^'
	]);

	escapes.default = defaults;
	escapes.gfm = gfm;
	escapes.commonmark = commonmark;

	// Get markdown escapes.
	function escapes(options) {
	  var settings = options || {};

	  if (settings.commonmark) {
	    return commonmark
	  }

	  return settings.gfm ? gfm : defaults
	}
	return markdownEscapes;
}

var require$$0 = [
	"address",
	"article",
	"aside",
	"base",
	"basefont",
	"blockquote",
	"body",
	"caption",
	"center",
	"col",
	"colgroup",
	"dd",
	"details",
	"dialog",
	"dir",
	"div",
	"dl",
	"dt",
	"fieldset",
	"figcaption",
	"figure",
	"footer",
	"form",
	"frame",
	"frameset",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"head",
	"header",
	"hgroup",
	"hr",
	"html",
	"iframe",
	"legend",
	"li",
	"link",
	"main",
	"menu",
	"menuitem",
	"meta",
	"nav",
	"noframes",
	"ol",
	"optgroup",
	"option",
	"p",
	"param",
	"pre",
	"section",
	"source",
	"title",
	"summary",
	"table",
	"tbody",
	"td",
	"tfoot",
	"th",
	"thead",
	"title",
	"tr",
	"track",
	"ul"
];

var defaults;
var hasRequiredDefaults;

function requireDefaults () {
	if (hasRequiredDefaults) return defaults;
	hasRequiredDefaults = 1;

	defaults = {
	  position: true,
	  gfm: true,
	  commonmark: false,
	  footnotes: false,
	  pedantic: false,
	  blocks: require$$0
	};
	return defaults;
}

var setOptions_1;
var hasRequiredSetOptions;

function requireSetOptions () {
	if (hasRequiredSetOptions) return setOptions_1;
	hasRequiredSetOptions = 1;

	var xtend = requireImmutable();
	var escapes = requireMarkdownEscapes();
	var defaults = requireDefaults();

	setOptions_1 = setOptions;

	function setOptions(options) {
	  var self = this;
	  var current = self.options;
	  var key;
	  var value;

	  if (options == null) {
	    options = {};
	  } else if (typeof options === 'object') {
	    options = xtend(options);
	  } else {
	    throw new Error(
	      'Invalid value `' + options + '` ' +
	      'for setting `options`'
	    );
	  }

	  for (key in defaults) {
	    value = options[key];

	    if (value == null) {
	      value = current[key];
	    }

	    if (
	      (key !== 'blocks' && typeof value !== 'boolean') ||
	      (key === 'blocks' && typeof value !== 'object')
	    ) {
	      throw new Error('Invalid value `' + value + '` for setting `options.' + key + '`');
	    }

	    options[key] = value;
	  }

	  self.options = options;
	  self.escape = escapes(options);

	  return self;
	}
	return setOptions_1;
}

var convert_1;
var hasRequiredConvert;

function requireConvert () {
	if (hasRequiredConvert) return convert_1;
	hasRequiredConvert = 1;

	convert_1 = convert;

	function convert(test) {
	  if (typeof test === 'string') {
	    return typeFactory(test)
	  }

	  if (test === null || test === undefined) {
	    return ok
	  }

	  if (typeof test === 'object') {
	    return ('length' in test ? anyFactory : matchesFactory)(test)
	  }

	  if (typeof test === 'function') {
	    return test
	  }

	  throw new Error('Expected function, string, or object as test')
	}

	function convertAll(tests) {
	  var results = [];
	  var length = tests.length;
	  var index = -1;

	  while (++index < length) {
	    results[index] = convert(tests[index]);
	  }

	  return results
	}

	// Utility assert each property in `test` is represented in `node`, and each
	// values are strictly equal.
	function matchesFactory(test) {
	  return matches

	  function matches(node) {
	    var key;

	    for (key in test) {
	      if (node[key] !== test[key]) {
	        return false
	      }
	    }

	    return true
	  }
	}

	function anyFactory(tests) {
	  var checks = convertAll(tests);
	  var length = checks.length;

	  return matches

	  function matches() {
	    var index = -1;

	    while (++index < length) {
	      if (checks[index].apply(this, arguments)) {
	        return true
	      }
	    }

	    return false
	  }
	}

	// Utility to convert a string into a function which checks a given node’s type
	// for said string.
	function typeFactory(test) {
	  return type

	  function type(node) {
	    return Boolean(node && node.type === test)
	  }
	}

	// Utility to return true.
	function ok() {
	  return true
	}
	return convert_1;
}

var unistUtilVisitParents$1;
var hasRequiredUnistUtilVisitParents$1;

function requireUnistUtilVisitParents$1 () {
	if (hasRequiredUnistUtilVisitParents$1) return unistUtilVisitParents$1;
	hasRequiredUnistUtilVisitParents$1 = 1;

	unistUtilVisitParents$1 = visitParents;

	var convert = requireConvert();

	var CONTINUE = true;
	var SKIP = 'skip';
	var EXIT = false;

	visitParents.CONTINUE = CONTINUE;
	visitParents.SKIP = SKIP;
	visitParents.EXIT = EXIT;

	function visitParents(tree, test, visitor, reverse) {
	  var is;

	  if (typeof test === 'function' && typeof visitor !== 'function') {
	    reverse = visitor;
	    visitor = test;
	    test = null;
	  }

	  is = convert(test);

	  one(tree, null, []);

	  // Visit a single node.
	  function one(node, index, parents) {
	    var result = [];
	    var subresult;

	    if (!test || is(node, index, parents[parents.length - 1] || null)) {
	      result = toResult(visitor(node, parents));

	      if (result[0] === EXIT) {
	        return result
	      }
	    }

	    if (node.children && result[0] !== SKIP) {
	      subresult = toResult(all(node.children, parents.concat(node)));
	      return subresult[0] === EXIT ? subresult : result
	    }

	    return result
	  }

	  // Visit children in `parent`.
	  function all(children, parents) {
	    var min = -1;
	    var step = reverse ? -1 : 1;
	    var index = (reverse ? children.length : min) + step;
	    var result;

	    while (index > min && index < children.length) {
	      result = one(children[index], index, parents);

	      if (result[0] === EXIT) {
	        return result
	      }

	      index = typeof result[1] === 'number' ? result[1] : index + step;
	    }
	  }
	}

	function toResult(value) {
	  if (value !== null && typeof value === 'object' && 'length' in value) {
	    return value
	  }

	  if (typeof value === 'number') {
	    return [CONTINUE, value]
	  }

	  return [value]
	}
	return unistUtilVisitParents$1;
}

var unistUtilVisit;
var hasRequiredUnistUtilVisit;

function requireUnistUtilVisit () {
	if (hasRequiredUnistUtilVisit) return unistUtilVisit;
	hasRequiredUnistUtilVisit = 1;

	unistUtilVisit = visit;

	var visitParents = requireUnistUtilVisitParents$1();

	var CONTINUE = visitParents.CONTINUE;
	var SKIP = visitParents.SKIP;
	var EXIT = visitParents.EXIT;

	visit.CONTINUE = CONTINUE;
	visit.SKIP = SKIP;
	visit.EXIT = EXIT;

	function visit(tree, test, visitor, reverse) {
	  if (typeof test === 'function' && typeof visitor !== 'function') {
	    reverse = visitor;
	    visitor = test;
	    test = null;
	  }

	  visitParents(tree, test, overload, reverse);

	  function overload(node, parents) {
	    var parent = parents[parents.length - 1];
	    var index = parent ? parent.children.indexOf(node) : null;
	    return visitor(node, index, parent)
	  }
	}
	return unistUtilVisit;
}

var unistUtilRemovePosition;
var hasRequiredUnistUtilRemovePosition;

function requireUnistUtilRemovePosition () {
	if (hasRequiredUnistUtilRemovePosition) return unistUtilRemovePosition;
	hasRequiredUnistUtilRemovePosition = 1;

	var visit = requireUnistUtilVisit();

	unistUtilRemovePosition = removePosition;

	function removePosition(node, force) {
	  visit(node, force ? hard : soft);
	  return node
	}

	function hard(node) {
	  delete node.position;
	}

	function soft(node) {
	  node.position = undefined;
	}
	return unistUtilRemovePosition;
}

var parse_1;
var hasRequiredParse;

function requireParse () {
	if (hasRequiredParse) return parse_1;
	hasRequiredParse = 1;

	var xtend = requireImmutable();
	var removePosition = requireUnistUtilRemovePosition();

	parse_1 = parse;

	var C_NEWLINE = '\n';
	var EXPRESSION_LINE_BREAKS = /\r\n|\r/g;

	/* Parse the bound file. */
	function parse() {
	  var self = this;
	  var value = String(self.file);
	  var start = {line: 1, column: 1, offset: 0};
	  var content = xtend(start);
	  var node;

	  /* Clean non-unix newlines: `\r\n` and `\r` are all
	   * changed to `\n`.  This should not affect positional
	   * information. */
	  value = value.replace(EXPRESSION_LINE_BREAKS, C_NEWLINE);

	  if (value.charCodeAt(0) === 0xFEFF) {
	    value = value.slice(1);

	    content.column++;
	    content.offset++;
	  }

	  node = {
	    type: 'root',
	    children: self.tokenizeBlock(value, content),
	    position: {
	      start: start,
	      end: self.eof || xtend(start)
	    }
	  };

	  if (!self.options.position) {
	    removePosition(node, true);
	  }

	  return node;
	}
	return parse_1;
}

var isWhitespaceCharacter;
var hasRequiredIsWhitespaceCharacter;

function requireIsWhitespaceCharacter () {
	if (hasRequiredIsWhitespaceCharacter) return isWhitespaceCharacter;
	hasRequiredIsWhitespaceCharacter = 1;

	isWhitespaceCharacter = whitespace;

	var fromCode = String.fromCharCode;
	var re = /\s/;

	// Check if the given character code, or the character code at the first
	// character, is a whitespace character.
	function whitespace(character) {
	  return re.test(
	    typeof character === 'number' ? fromCode(character) : character.charAt(0)
	  )
	}
	return isWhitespaceCharacter;
}

var newline_1;
var hasRequiredNewline;

function requireNewline () {
	if (hasRequiredNewline) return newline_1;
	hasRequiredNewline = 1;

	var whitespace = requireIsWhitespaceCharacter();

	newline_1 = newline;

	/* Tokenise newline. */
	function newline(eat, value, silent) {
	  var character = value.charAt(0);
	  var length;
	  var subvalue;
	  var queue;
	  var index;

	  if (character !== '\n') {
	    return;
	  }

	  /* istanbul ignore if - never used (yet) */
	  if (silent) {
	    return true;
	  }

	  index = 1;
	  length = value.length;
	  subvalue = character;
	  queue = '';

	  while (index < length) {
	    character = value.charAt(index);

	    if (!whitespace(character)) {
	      break;
	    }

	    queue += character;

	    if (character === '\n') {
	      subvalue += queue;
	      queue = '';
	    }

	    index++;
	  }

	  eat(subvalue);
	}
	return newline_1;
}

/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var repeatString;
var hasRequiredRepeatString;

function requireRepeatString () {
	if (hasRequiredRepeatString) return repeatString;
	hasRequiredRepeatString = 1;

	/**
	 * Results cache
	 */

	var res = '';
	var cache;

	/**
	 * Expose `repeat`
	 */

	repeatString = repeat;

	/**
	 * Repeat the given `string` the specified `number`
	 * of times.
	 *
	 * **Example:**
	 *
	 * ```js
	 * var repeat = require('repeat-string');
	 * repeat('A', 5);
	 * //=> AAAAA
	 * ```
	 *
	 * @param {String} `string` The string to repeat
	 * @param {Number} `number` The number of times to repeat the string
	 * @return {String} Repeated string
	 * @api public
	 */

	function repeat(str, num) {
	  if (typeof str !== 'string') {
	    throw new TypeError('expected a string');
	  }

	  // cover common, quick use cases
	  if (num === 1) return str;
	  if (num === 2) return str + str;

	  var max = str.length * num;
	  if (cache !== str || typeof cache === 'undefined') {
	    cache = str;
	    res = '';
	  } else if (res.length >= max) {
	    return res.substr(0, max);
	  }

	  while (max > res.length && num > 1) {
	    if (num & 1) {
	      res += str;
	    }

	    num >>= 1;
	    str += str;
	  }

	  res += str;
	  res = res.substr(0, max);
	  return res;
	}
	return repeatString;
}

var trimTrailingLines_1;
var hasRequiredTrimTrailingLines;

function requireTrimTrailingLines () {
	if (hasRequiredTrimTrailingLines) return trimTrailingLines_1;
	hasRequiredTrimTrailingLines = 1;

	trimTrailingLines_1 = trimTrailingLines;

	var line = '\n';

	// Remove final newline characters from `value`.
	function trimTrailingLines(value) {
	  var val = String(value);
	  var index = val.length;

	  while (val.charAt(--index) === line) {
	    // Empty
	  }

	  return val.slice(0, index + 1)
	}
	return trimTrailingLines_1;
}

var codeIndented;
var hasRequiredCodeIndented;

function requireCodeIndented () {
	if (hasRequiredCodeIndented) return codeIndented;
	hasRequiredCodeIndented = 1;

	var repeat = requireRepeatString();
	var trim = requireTrimTrailingLines();

	codeIndented = indentedCode;

	var C_NEWLINE = '\n';
	var C_TAB = '\t';
	var C_SPACE = ' ';

	var CODE_INDENT_COUNT = 4;
	var CODE_INDENT = repeat(C_SPACE, CODE_INDENT_COUNT);

	/* Tokenise indented code. */
	function indentedCode(eat, value, silent) {
	  var index = -1;
	  var length = value.length;
	  var subvalue = '';
	  var content = '';
	  var subvalueQueue = '';
	  var contentQueue = '';
	  var character;
	  var blankQueue;
	  var indent;

	  while (++index < length) {
	    character = value.charAt(index);

	    if (indent) {
	      indent = false;

	      subvalue += subvalueQueue;
	      content += contentQueue;
	      subvalueQueue = '';
	      contentQueue = '';

	      if (character === C_NEWLINE) {
	        subvalueQueue = character;
	        contentQueue = character;
	      } else {
	        subvalue += character;
	        content += character;

	        while (++index < length) {
	          character = value.charAt(index);

	          if (!character || character === C_NEWLINE) {
	            contentQueue = character;
	            subvalueQueue = character;
	            break;
	          }

	          subvalue += character;
	          content += character;
	        }
	      }
	    } else if (
	      character === C_SPACE &&
	      value.charAt(index + 1) === character &&
	      value.charAt(index + 2) === character &&
	      value.charAt(index + 3) === character
	    ) {
	      subvalueQueue += CODE_INDENT;
	      index += 3;
	      indent = true;
	    } else if (character === C_TAB) {
	      subvalueQueue += character;
	      indent = true;
	    } else {
	      blankQueue = '';

	      while (character === C_TAB || character === C_SPACE) {
	        blankQueue += character;
	        character = value.charAt(++index);
	      }

	      if (character !== C_NEWLINE) {
	        break;
	      }

	      subvalueQueue += blankQueue + character;
	      contentQueue += character;
	    }
	  }

	  if (content) {
	    if (silent) {
	      return true;
	    }

	    return eat(subvalue)({
	      type: 'code',
	      lang: null,
	      value: trim(content)
	    });
	  }
	}
	return codeIndented;
}

var codeFenced;
var hasRequiredCodeFenced;

function requireCodeFenced () {
	if (hasRequiredCodeFenced) return codeFenced;
	hasRequiredCodeFenced = 1;

	var trim = requireTrimTrailingLines();

	codeFenced = fencedCode;

	var C_NEWLINE = '\n';
	var C_TAB = '\t';
	var C_SPACE = ' ';
	var C_TILDE = '~';
	var C_TICK = '`';

	var MIN_FENCE_COUNT = 3;
	var CODE_INDENT_COUNT = 4;

	function fencedCode(eat, value, silent) {
	  var self = this;
	  var settings = self.options;
	  var length = value.length + 1;
	  var index = 0;
	  var subvalue = '';
	  var fenceCount;
	  var marker;
	  var character;
	  var flag;
	  var queue;
	  var content;
	  var exdentedContent;
	  var closing;
	  var exdentedClosing;
	  var indent;
	  var now;

	  if (!settings.gfm) {
	    return;
	  }

	  /* Eat initial spacing. */
	  while (index < length) {
	    character = value.charAt(index);

	    if (character !== C_SPACE && character !== C_TAB) {
	      break;
	    }

	    subvalue += character;
	    index++;
	  }

	  indent = index;

	  /* Eat the fence. */
	  character = value.charAt(index);

	  if (character !== C_TILDE && character !== C_TICK) {
	    return;
	  }

	  index++;
	  marker = character;
	  fenceCount = 1;
	  subvalue += character;

	  while (index < length) {
	    character = value.charAt(index);

	    if (character !== marker) {
	      break;
	    }

	    subvalue += character;
	    fenceCount++;
	    index++;
	  }

	  if (fenceCount < MIN_FENCE_COUNT) {
	    return;
	  }

	  /* Eat spacing before flag. */
	  while (index < length) {
	    character = value.charAt(index);

	    if (character !== C_SPACE && character !== C_TAB) {
	      break;
	    }

	    subvalue += character;
	    index++;
	  }

	  /* Eat flag. */
	  flag = '';
	  queue = '';

	  while (index < length) {
	    character = value.charAt(index);

	    if (
	      character === C_NEWLINE ||
	      character === C_TILDE ||
	      character === C_TICK
	    ) {
	      break;
	    }

	    if (character === C_SPACE || character === C_TAB) {
	      queue += character;
	    } else {
	      flag += queue + character;
	      queue = '';
	    }

	    index++;
	  }

	  character = value.charAt(index);

	  if (character && character !== C_NEWLINE) {
	    return;
	  }

	  if (silent) {
	    return true;
	  }

	  now = eat.now();
	  now.column += subvalue.length;
	  now.offset += subvalue.length;

	  subvalue += flag;
	  flag = self.decode.raw(self.unescape(flag), now);

	  if (queue) {
	    subvalue += queue;
	  }

	  queue = '';
	  closing = '';
	  exdentedClosing = '';
	  content = '';
	  exdentedContent = '';

	  /* Eat content. */
	  while (index < length) {
	    character = value.charAt(index);
	    content += closing;
	    exdentedContent += exdentedClosing;
	    closing = '';
	    exdentedClosing = '';

	    if (character !== C_NEWLINE) {
	      content += character;
	      exdentedClosing += character;
	      index++;
	      continue;
	    }

	    /* Add the newline to `subvalue` if its the first
	     * character.  Otherwise, add it to the `closing`
	     * queue. */
	    if (content) {
	      closing += character;
	      exdentedClosing += character;
	    } else {
	      subvalue += character;
	    }

	    queue = '';
	    index++;

	    while (index < length) {
	      character = value.charAt(index);

	      if (character !== C_SPACE) {
	        break;
	      }

	      queue += character;
	      index++;
	    }

	    closing += queue;
	    exdentedClosing += queue.slice(indent);

	    if (queue.length >= CODE_INDENT_COUNT) {
	      continue;
	    }

	    queue = '';

	    while (index < length) {
	      character = value.charAt(index);

	      if (character !== marker) {
	        break;
	      }

	      queue += character;
	      index++;
	    }

	    closing += queue;
	    exdentedClosing += queue;

	    if (queue.length < fenceCount) {
	      continue;
	    }

	    queue = '';

	    while (index < length) {
	      character = value.charAt(index);

	      if (character !== C_SPACE && character !== C_TAB) {
	        break;
	      }

	      closing += character;
	      exdentedClosing += character;
	      index++;
	    }

	    if (!character || character === C_NEWLINE) {
	      break;
	    }
	  }

	  subvalue += content + closing;

	  return eat(subvalue)({
	    type: 'code',
	    lang: flag || null,
	    value: trim(exdentedContent)
	  });
	}
	return codeFenced;
}

var trim = {exports: {}};

var hasRequiredTrim;

function requireTrim () {
	if (hasRequiredTrim) return trim.exports;
	hasRequiredTrim = 1;
	(function (module, exports) {
		exports = module.exports = trim;

		function trim(str){
		  return str.replace(/^\s*|\s*$/g, '');
		}

		exports.left = function(str){
		  return str.replace(/^\s*/, '');
		};

		exports.right = function(str){
		  return str.replace(/\s*$/, '');
		}; 
	} (trim, trim.exports));
	return trim.exports;
}

var interrupt_1;
var hasRequiredInterrupt;

function requireInterrupt () {
	if (hasRequiredInterrupt) return interrupt_1;
	hasRequiredInterrupt = 1;

	interrupt_1 = interrupt;

	function interrupt(interruptors, tokenizers, ctx, params) {
	  var bools = ['pedantic', 'commonmark'];
	  var count = bools.length;
	  var length = interruptors.length;
	  var index = -1;
	  var interruptor;
	  var config;
	  var fn;
	  var offset;
	  var bool;
	  var ignore;

	  while (++index < length) {
	    interruptor = interruptors[index];
	    config = interruptor[1] || {};
	    fn = interruptor[0];
	    offset = -1;
	    ignore = false;

	    while (++offset < count) {
	      bool = bools[offset];

	      if (config[bool] !== undefined && config[bool] !== ctx.options[bool]) {
	        ignore = true;
	        break;
	      }
	    }

	    if (ignore) {
	      continue;
	    }

	    if (tokenizers[fn].apply(ctx, params)) {
	      return true;
	    }
	  }

	  return false;
	}
	return interrupt_1;
}

var blockquote_1;
var hasRequiredBlockquote;

function requireBlockquote () {
	if (hasRequiredBlockquote) return blockquote_1;
	hasRequiredBlockquote = 1;

	var trim = requireTrim();
	var interrupt = requireInterrupt();

	blockquote_1 = blockquote;

	var C_NEWLINE = '\n';
	var C_TAB = '\t';
	var C_SPACE = ' ';
	var C_GT = '>';

	/* Tokenise a blockquote. */
	function blockquote(eat, value, silent) {
	  var self = this;
	  var offsets = self.offset;
	  var tokenizers = self.blockTokenizers;
	  var interruptors = self.interruptBlockquote;
	  var now = eat.now();
	  var currentLine = now.line;
	  var length = value.length;
	  var values = [];
	  var contents = [];
	  var indents = [];
	  var add;
	  var index = 0;
	  var character;
	  var rest;
	  var nextIndex;
	  var content;
	  var line;
	  var startIndex;
	  var prefixed;
	  var exit;

	  while (index < length) {
	    character = value.charAt(index);

	    if (character !== C_SPACE && character !== C_TAB) {
	      break;
	    }

	    index++;
	  }

	  if (value.charAt(index) !== C_GT) {
	    return;
	  }

	  if (silent) {
	    return true;
	  }

	  index = 0;

	  while (index < length) {
	    nextIndex = value.indexOf(C_NEWLINE, index);
	    startIndex = index;
	    prefixed = false;

	    if (nextIndex === -1) {
	      nextIndex = length;
	    }

	    while (index < length) {
	      character = value.charAt(index);

	      if (character !== C_SPACE && character !== C_TAB) {
	        break;
	      }

	      index++;
	    }

	    if (value.charAt(index) === C_GT) {
	      index++;
	      prefixed = true;

	      if (value.charAt(index) === C_SPACE) {
	        index++;
	      }
	    } else {
	      index = startIndex;
	    }

	    content = value.slice(index, nextIndex);

	    if (!prefixed && !trim(content)) {
	      index = startIndex;
	      break;
	    }

	    if (!prefixed) {
	      rest = value.slice(index);

	      /* Check if the following code contains a possible
	       * block. */
	      if (interrupt(interruptors, tokenizers, self, [eat, rest, true])) {
	        break;
	      }
	    }

	    line = startIndex === index ? content : value.slice(startIndex, nextIndex);

	    indents.push(index - startIndex);
	    values.push(line);
	    contents.push(content);

	    index = nextIndex + 1;
	  }

	  index = -1;
	  length = indents.length;
	  add = eat(values.join(C_NEWLINE));

	  while (++index < length) {
	    offsets[currentLine] = (offsets[currentLine] || 0) + indents[index];
	    currentLine++;
	  }

	  exit = self.enterBlock();
	  contents = self.tokenizeBlock(contents.join(C_NEWLINE), now);
	  exit();

	  return add({
	    type: 'blockquote',
	    children: contents
	  });
	}
	return blockquote_1;
}

var headingAtx;
var hasRequiredHeadingAtx;

function requireHeadingAtx () {
	if (hasRequiredHeadingAtx) return headingAtx;
	hasRequiredHeadingAtx = 1;

	headingAtx = atxHeading;

	var C_NEWLINE = '\n';
	var C_TAB = '\t';
	var C_SPACE = ' ';
	var C_HASH = '#';

	var MAX_ATX_COUNT = 6;

	function atxHeading(eat, value, silent) {
	  var self = this;
	  var settings = self.options;
	  var length = value.length + 1;
	  var index = -1;
	  var now = eat.now();
	  var subvalue = '';
	  var content = '';
	  var character;
	  var queue;
	  var depth;

	  /* Eat initial spacing. */
	  while (++index < length) {
	    character = value.charAt(index);

	    if (character !== C_SPACE && character !== C_TAB) {
	      index--;
	      break;
	    }

	    subvalue += character;
	  }

	  /* Eat hashes. */
	  depth = 0;

	  while (++index <= length) {
	    character = value.charAt(index);

	    if (character !== C_HASH) {
	      index--;
	      break;
	    }

	    subvalue += character;
	    depth++;
	  }

	  if (depth > MAX_ATX_COUNT) {
	    return;
	  }

	  if (
	    !depth ||
	    (!settings.pedantic && value.charAt(index + 1) === C_HASH)
	  ) {
	    return;
	  }

	  length = value.length + 1;

	  /* Eat intermediate white-space. */
	  queue = '';

	  while (++index < length) {
	    character = value.charAt(index);

	    if (character !== C_SPACE && character !== C_TAB) {
	      index--;
	      break;
	    }

	    queue += character;
	  }

	  /* Exit when not in pedantic mode without spacing. */
	  if (
	    !settings.pedantic &&
	    queue.length === 0 &&
	    character &&
	    character !== C_NEWLINE
	  ) {
	    return;
	  }

	  if (silent) {
	    return true;
	  }

	  /* Eat content. */
	  subvalue += queue;
	  queue = '';
	  content = '';

	  while (++index < length) {
	    character = value.charAt(index);

	    if (!character || character === C_NEWLINE) {
	      break;
	    }

	    if (
	      character !== C_SPACE &&
	      character !== C_TAB &&
	      character !== C_HASH
	    ) {
	      content += queue + character;
	      queue = '';
	      continue;
	    }

	    while (character === C_SPACE || character === C_TAB) {
	      queue += character;
	      character = value.charAt(++index);
	    }

	    while (character === C_HASH) {
	      queue += character;
	      character = value.charAt(++index);
	    }

	    while (character === C_SPACE || character === C_TAB) {
	      queue += character;
	      character = value.charAt(++index);
	    }

	    index--;
	  }

	  now.column += subvalue.length;
	  now.offset += subvalue.length;
	  subvalue += content + queue;

	  return eat(subvalue)({
	    type: 'heading',
	    depth: depth,
	    children: self.tokenizeInline(content, now)
	  });
	}
	return headingAtx;
}

var thematicBreak_1;
var hasRequiredThematicBreak;

function requireThematicBreak () {
	if (hasRequiredThematicBreak) return thematicBreak_1;
	hasRequiredThematicBreak = 1;

	thematicBreak_1 = thematicBreak;

	var C_NEWLINE = '\n';
	var C_TAB = '\t';
	var C_SPACE = ' ';
	var C_ASTERISK = '*';
	var C_UNDERSCORE = '_';
	var C_DASH = '-';

	var THEMATIC_BREAK_MARKER_COUNT = 3;

	function thematicBreak(eat, value, silent) {
	  var index = -1;
	  var length = value.length + 1;
	  var subvalue = '';
	  var character;
	  var marker;
	  var markerCount;
	  var queue;

	  while (++index < length) {
	    character = value.charAt(index);

	    if (character !== C_TAB && character !== C_SPACE) {
	      break;
	    }

	    subvalue += character;
	  }

	  if (
	    character !== C_ASTERISK &&
	    character !== C_DASH &&
	    character !== C_UNDERSCORE
	  ) {
	    return;
	  }

	  marker = character;
	  subvalue += character;
	  markerCount = 1;
	  queue = '';

	  while (++index < length) {
	    character = value.charAt(index);

	    if (character === marker) {
	      markerCount++;
	      subvalue += queue + marker;
	      queue = '';
	    } else if (character === C_SPACE) {
	      queue += character;
	    } else if (
	      markerCount >= THEMATIC_BREAK_MARKER_COUNT &&
	      (!character || character === C_NEWLINE)
	    ) {
	      subvalue += queue;

	      if (silent) {
	        return true;
	      }

	      return eat(subvalue)({type: 'thematicBreak'});
	    } else {
	      return;
	    }
	  }
	}
	return thematicBreak_1;
}

var getIndentation;
var hasRequiredGetIndentation;

function requireGetIndentation () {
	if (hasRequiredGetIndentation) return getIndentation;
	hasRequiredGetIndentation = 1;

	getIndentation = indentation;

	/* Map of characters, and their column length,
	 * which can be used as indentation. */
	var characters = {' ': 1, '\t': 4};

	/* Gets indentation information for a line. */
	function indentation(value) {
	  var index = 0;
	  var indent = 0;
	  var character = value.charAt(index);
	  var stops = {};
	  var size;

	  while (character in characters) {
	    size = characters[character];

	    indent += size;

	    if (size > 1) {
	      indent = Math.floor(indent / size) * size;
	    }

	    stops[indent] = index;

	    character = value.charAt(++index);
	  }

	  return {indent: indent, stops: stops};
	}
	return getIndentation;
}

var removeIndentation;
var hasRequiredRemoveIndentation;

function requireRemoveIndentation () {
	if (hasRequiredRemoveIndentation) return removeIndentation;
	hasRequiredRemoveIndentation = 1;

	var trim = requireTrim();
	var repeat = requireRepeatString();
	var getIndent = requireGetIndentation();

	removeIndentation = indentation;

	var C_SPACE = ' ';
	var C_NEWLINE = '\n';
	var C_TAB = '\t';

	/* Remove the minimum indent from every line in `value`.
	 * Supports both tab, spaced, and mixed indentation (as
	 * well as possible). */
	function indentation(value, maximum) {
	  var values = value.split(C_NEWLINE);
	  var position = values.length + 1;
	  var minIndent = Infinity;
	  var matrix = [];
	  var index;
	  var indentation;
	  var stops;
	  var padding;

	  values.unshift(repeat(C_SPACE, maximum) + '!');

	  while (position--) {
	    indentation = getIndent(values[position]);

	    matrix[position] = indentation.stops;

	    if (trim(values[position]).length === 0) {
	      continue;
	    }

	    if (indentation.indent) {
	      if (indentation.indent > 0 && indentation.indent < minIndent) {
	        minIndent = indentation.indent;
	      }
	    } else {
	      minIndent = Infinity;

	      break;
	    }
	  }

	  if (minIndent !== Infinity) {
	    position = values.length;

	    while (position--) {
	      stops = matrix[position];
	      index = minIndent;

	      while (index && !(index in stops)) {
	        index--;
	      }

	      if (
	        trim(values[position]).length !== 0 &&
	        minIndent &&
	        index !== minIndent
	      ) {
	        padding = C_TAB;
	      } else {
	        padding = '';
	      }

	      values[position] = padding + values[position].slice(
	        index in stops ? stops[index] + 1 : 0
	      );
	    }
	  }

	  values.shift();

	  return values.join(C_NEWLINE);
	}
	return removeIndentation;
}

var list_1;
var hasRequiredList;

function requireList () {
	if (hasRequiredList) return list_1;
	hasRequiredList = 1;

	/* eslint-disable max-params */

	var trim = requireTrim();
	var repeat = requireRepeatString();
	var decimal = requireIsDecimal();
	var getIndent = requireGetIndentation();
	var removeIndent = requireRemoveIndentation();
	var interrupt = requireInterrupt();

	list_1 = list;

	var C_ASTERISK = '*';
	var C_UNDERSCORE = '_';
	var C_PLUS = '+';
	var C_DASH = '-';
	var C_DOT = '.';
	var C_SPACE = ' ';
	var C_NEWLINE = '\n';
	var C_TAB = '\t';
	var C_PAREN_CLOSE = ')';
	var C_X_LOWER = 'x';

	var TAB_SIZE = 4;
	var EXPRESSION_LOOSE_LIST_ITEM = /\n\n(?!\s*$)/;
	var EXPRESSION_TASK_ITEM = /^\[([ \t]|x|X)][ \t]/;
	var EXPRESSION_BULLET = /^([ \t]*)([*+-]|\d+[.)])( {1,4}(?! )| |\t|$|(?=\n))([^\n]*)/;
	var EXPRESSION_PEDANTIC_BULLET = /^([ \t]*)([*+-]|\d+[.)])([ \t]+)/;
	var EXPRESSION_INITIAL_INDENT = /^( {1,4}|\t)?/gm;

	/* Map of characters which can be used to mark
	 * list-items. */
	var LIST_UNORDERED_MARKERS = {};

	LIST_UNORDERED_MARKERS[C_ASTERISK] = true;
	LIST_UNORDERED_MARKERS[C_PLUS] = true;
	LIST_UNORDERED_MARKERS[C_DASH] = true;

	/* Map of characters which can be used to mark
	 * list-items after a digit. */
	var LIST_ORDERED_MARKERS = {};

	LIST_ORDERED_MARKERS[C_DOT] = true;

	/* Map of characters which can be used to mark
	 * list-items after a digit. */
	var LIST_ORDERED_COMMONMARK_MARKERS = {};

	LIST_ORDERED_COMMONMARK_MARKERS[C_DOT] = true;
	LIST_ORDERED_COMMONMARK_MARKERS[C_PAREN_CLOSE] = true;

	function list(eat, value, silent) {
	  var self = this;
	  var commonmark = self.options.commonmark;
	  var pedantic = self.options.pedantic;
	  var tokenizers = self.blockTokenizers;
	  var interuptors = self.interruptList;
	  var markers;
	  var index = 0;
	  var length = value.length;
	  var start = null;
	  var size = 0;
	  var queue;
	  var ordered;
	  var character;
	  var marker;
	  var nextIndex;
	  var startIndex;
	  var prefixed;
	  var currentMarker;
	  var content;
	  var line;
	  var prevEmpty;
	  var empty;
	  var items;
	  var allLines;
	  var emptyLines;
	  var item;
	  var enterTop;
	  var exitBlockquote;
	  var isLoose;
	  var node;
	  var now;
	  var end;
	  var indented;

	  while (index < length) {
	    character = value.charAt(index);

	    if (character === C_TAB) {
	      size += TAB_SIZE - (size % TAB_SIZE);
	    } else if (character === C_SPACE) {
	      size++;
	    } else {
	      break;
	    }

	    index++;
	  }

	  if (size >= TAB_SIZE) {
	    return;
	  }

	  character = value.charAt(index);

	  markers = commonmark ?
	    LIST_ORDERED_COMMONMARK_MARKERS :
	    LIST_ORDERED_MARKERS;

	  if (LIST_UNORDERED_MARKERS[character] === true) {
	    marker = character;
	    ordered = false;
	  } else {
	    ordered = true;
	    queue = '';

	    while (index < length) {
	      character = value.charAt(index);

	      if (!decimal(character)) {
	        break;
	      }

	      queue += character;
	      index++;
	    }

	    character = value.charAt(index);

	    if (!queue || markers[character] !== true) {
	      return;
	    }

	    start = parseInt(queue, 10);
	    marker = character;
	  }

	  character = value.charAt(++index);

	  if (character !== C_SPACE && character !== C_TAB) {
	    return;
	  }

	  if (silent) {
	    return true;
	  }

	  index = 0;
	  items = [];
	  allLines = [];
	  emptyLines = [];

	  while (index < length) {
	    nextIndex = value.indexOf(C_NEWLINE, index);
	    startIndex = index;
	    prefixed = false;
	    indented = false;

	    if (nextIndex === -1) {
	      nextIndex = length;
	    }

	    end = index + TAB_SIZE;
	    size = 0;

	    while (index < length) {
	      character = value.charAt(index);

	      if (character === C_TAB) {
	        size += TAB_SIZE - (size % TAB_SIZE);
	      } else if (character === C_SPACE) {
	        size++;
	      } else {
	        break;
	      }

	      index++;
	    }

	    if (size >= TAB_SIZE) {
	      indented = true;
	    }

	    if (item && size >= item.indent) {
	      indented = true;
	    }

	    character = value.charAt(index);
	    currentMarker = null;

	    if (!indented) {
	      if (LIST_UNORDERED_MARKERS[character] === true) {
	        currentMarker = character;
	        index++;
	        size++;
	      } else {
	        queue = '';

	        while (index < length) {
	          character = value.charAt(index);

	          if (!decimal(character)) {
	            break;
	          }

	          queue += character;
	          index++;
	        }

	        character = value.charAt(index);
	        index++;

	        if (queue && markers[character] === true) {
	          currentMarker = character;
	          size += queue.length + 1;
	        }
	      }

	      if (currentMarker) {
	        character = value.charAt(index);

	        if (character === C_TAB) {
	          size += TAB_SIZE - (size % TAB_SIZE);
	          index++;
	        } else if (character === C_SPACE) {
	          end = index + TAB_SIZE;

	          while (index < end) {
	            if (value.charAt(index) !== C_SPACE) {
	              break;
	            }

	            index++;
	            size++;
	          }

	          if (index === end && value.charAt(index) === C_SPACE) {
	            index -= TAB_SIZE - 1;
	            size -= TAB_SIZE - 1;
	          }
	        } else if (character !== C_NEWLINE && character !== '') {
	          currentMarker = null;
	        }
	      }
	    }

	    if (currentMarker) {
	      if (!pedantic && marker !== currentMarker) {
	        break;
	      }

	      prefixed = true;
	    } else {
	      if (!commonmark && !indented && value.charAt(startIndex) === C_SPACE) {
	        indented = true;
	      } else if (commonmark && item) {
	        indented = size >= item.indent || size > TAB_SIZE;
	      }

	      prefixed = false;
	      index = startIndex;
	    }

	    line = value.slice(startIndex, nextIndex);
	    content = startIndex === index ? line : value.slice(index, nextIndex);

	    if (
	      currentMarker === C_ASTERISK ||
	      currentMarker === C_UNDERSCORE ||
	      currentMarker === C_DASH
	    ) {
	      if (tokenizers.thematicBreak.call(self, eat, line, true)) {
	        break;
	      }
	    }

	    prevEmpty = empty;
	    empty = !trim(content).length;

	    if (indented && item) {
	      item.value = item.value.concat(emptyLines, line);
	      allLines = allLines.concat(emptyLines, line);
	      emptyLines = [];
	    } else if (prefixed) {
	      if (emptyLines.length !== 0) {
	        item.value.push('');
	        item.trail = emptyLines.concat();
	      }

	      item = {
	        value: [line],
	        indent: size,
	        trail: []
	      };

	      items.push(item);
	      allLines = allLines.concat(emptyLines, line);
	      emptyLines = [];
	    } else if (empty) {
	      if (prevEmpty) {
	        break;
	      }

	      emptyLines.push(line);
	    } else {
	      if (prevEmpty) {
	        break;
	      }

	      if (interrupt(interuptors, tokenizers, self, [eat, line, true])) {
	        break;
	      }

	      item.value = item.value.concat(emptyLines, line);
	      allLines = allLines.concat(emptyLines, line);
	      emptyLines = [];
	    }

	    index = nextIndex + 1;
	  }

	  node = eat(allLines.join(C_NEWLINE)).reset({
	    type: 'list',
	    ordered: ordered,
	    start: start,
	    loose: null,
	    children: []
	  });

	  enterTop = self.enterList();
	  exitBlockquote = self.enterBlock();
	  isLoose = false;
	  index = -1;
	  length = items.length;

	  while (++index < length) {
	    item = items[index].value.join(C_NEWLINE);
	    now = eat.now();

	    item = eat(item)(listItem(self, item, now), node);

	    if (item.loose) {
	      isLoose = true;
	    }

	    item = items[index].trail.join(C_NEWLINE);

	    if (index !== length - 1) {
	      item += C_NEWLINE;
	    }

	    eat(item);
	  }

	  enterTop();
	  exitBlockquote();

	  node.loose = isLoose;

	  return node;
	}

	function listItem(ctx, value, position) {
	  var offsets = ctx.offset;
	  var fn = ctx.options.pedantic ? pedanticListItem : normalListItem;
	  var checked = null;
	  var task;
	  var indent;

	  value = fn.apply(null, arguments);

	  if (ctx.options.gfm) {
	    task = value.match(EXPRESSION_TASK_ITEM);

	    if (task) {
	      indent = task[0].length;
	      checked = task[1].toLowerCase() === C_X_LOWER;
	      offsets[position.line] += indent;
	      value = value.slice(indent);
	    }
	  }

	  return {
	    type: 'listItem',
	    loose: EXPRESSION_LOOSE_LIST_ITEM.test(value) ||
	      value.charAt(value.length - 1) === C_NEWLINE,
	    checked: checked,
	    children: ctx.tokenizeBlock(value, position)
	  };
	}

	/* Create a list-item using overly simple mechanics. */
	function pedanticListItem(ctx, value, position) {
	  var offsets = ctx.offset;
	  var line = position.line;

	  /* Remove the list-item’s bullet. */
	  value = value.replace(EXPRESSION_PEDANTIC_BULLET, replacer);

	  /* The initial line was also matched by the below, so
	   * we reset the `line`. */
	  line = position.line;

	  return value.replace(EXPRESSION_INITIAL_INDENT, replacer);

	  /* A simple replacer which removed all matches,
	   * and adds their length to `offset`. */
	  function replacer($0) {
	    offsets[line] = (offsets[line] || 0) + $0.length;
	    line++;

	    return '';
	  }
	}

	/* Create a list-item using sane mechanics. */
	function normalListItem(ctx, value, position) {
	  var offsets = ctx.offset;
	  var line = position.line;
	  var max;
	  var bullet;
	  var rest;
	  var lines;
	  var trimmedLines;
	  var index;
	  var length;

	  /* Remove the list-item’s bullet. */
	  value = value.replace(EXPRESSION_BULLET, replacer);

	  lines = value.split(C_NEWLINE);

	  trimmedLines = removeIndent(value, getIndent(max).indent).split(C_NEWLINE);

	  /* We replaced the initial bullet with something
	   * else above, which was used to trick
	   * `removeIndentation` into removing some more
	   * characters when possible.  However, that could
	   * result in the initial line to be stripped more
	   * than it should be. */
	  trimmedLines[0] = rest;

	  offsets[line] = (offsets[line] || 0) + bullet.length;
	  line++;

	  index = 0;
	  length = lines.length;

	  while (++index < length) {
	    offsets[line] = (offsets[line] || 0) +
	      lines[index].length - trimmedLines[index].length;
	    line++;
	  }

	  return trimmedLines.join(C_NEWLINE);

	  function replacer($0, $1, $2, $3, $4) {
	    bullet = $1 + $2 + $3;
	    rest = $4;

	    /* Make sure that the first nine numbered list items
	     * can indent with an extra space.  That is, when
	     * the bullet did not receive an extra final space. */
	    if (Number($2) < 10 && bullet.length % 2 === 1) {
	      $2 = C_SPACE + $2;
	    }

	    max = $1 + repeat(C_SPACE, $2.length) + $3;

	    return max + rest;
	  }
	}
	return list_1;
}

var headingSetext;
var hasRequiredHeadingSetext;

function requireHeadingSetext () {
	if (hasRequiredHeadingSetext) return headingSetext;
	hasRequiredHeadingSetext = 1;

	headingSetext = setextHeading;

	var C_NEWLINE = '\n';
	var C_TAB = '\t';
	var C_SPACE = ' ';
	var C_EQUALS = '=';
	var C_DASH = '-';

	var MAX_HEADING_INDENT = 3;

	/* Map of characters which can be used to mark setext
	 * headers, mapping to their corresponding depth. */
	var SETEXT_MARKERS = {};

	SETEXT_MARKERS[C_EQUALS] = 1;
	SETEXT_MARKERS[C_DASH] = 2;

	function setextHeading(eat, value, silent) {
	  var self = this;
	  var now = eat.now();
	  var length = value.length;
	  var index = -1;
	  var subvalue = '';
	  var content;
	  var queue;
	  var character;
	  var marker;
	  var depth;

	  /* Eat initial indentation. */
	  while (++index < length) {
	    character = value.charAt(index);

	    if (character !== C_SPACE || index >= MAX_HEADING_INDENT) {
	      index--;
	      break;
	    }

	    subvalue += character;
	  }

	  /* Eat content. */
	  content = '';
	  queue = '';

	  while (++index < length) {
	    character = value.charAt(index);

	    if (character === C_NEWLINE) {
	      index--;
	      break;
	    }

	    if (character === C_SPACE || character === C_TAB) {
	      queue += character;
	    } else {
	      content += queue + character;
	      queue = '';
	    }
	  }

	  now.column += subvalue.length;
	  now.offset += subvalue.length;
	  subvalue += content + queue;

	  /* Ensure the content is followed by a newline and a
	   * valid marker. */
	  character = value.charAt(++index);
	  marker = value.charAt(++index);

	  if (character !== C_NEWLINE || !SETEXT_MARKERS[marker]) {
	    return;
	  }

	  subvalue += character;

	  /* Eat Setext-line. */
	  queue = marker;
	  depth = SETEXT_MARKERS[marker];

	  while (++index < length) {
	    character = value.charAt(index);

	    if (character !== marker) {
	      if (character !== C_NEWLINE) {
	        return;
	      }

	      index--;
	      break;
	    }

	    queue += character;
	  }

	  if (silent) {
	    return true;
	  }

	  return eat(subvalue + queue)({
	    type: 'heading',
	    depth: depth,
	    children: self.tokenizeInline(content, now)
	  });
	}
	return headingSetext;
}

var html = {};

var hasRequiredHtml;

function requireHtml () {
	if (hasRequiredHtml) return html;
	hasRequiredHtml = 1;

	var attributeName = '[a-zA-Z_:][a-zA-Z0-9:._-]*';
	var unquoted = '[^"\'=<>`\\u0000-\\u0020]+';
	var singleQuoted = '\'[^\']*\'';
	var doubleQuoted = '"[^"]*"';
	var attributeValue = '(?:' + unquoted + '|' + singleQuoted + '|' + doubleQuoted + ')';
	var attribute = '(?:\\s+' + attributeName + '(?:\\s*=\\s*' + attributeValue + ')?)';
	var openTag = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';
	var closeTag = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
	var comment = '<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->';
	var processing = '<[?].*?[?]>';
	var declaration = '<![A-Za-z]+\\s+[^>]*>';
	var cdata = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';

	html.openCloseTag = new RegExp('^(?:' + openTag + '|' + closeTag + ')');

	html.tag = new RegExp('^(?:' +
	  openTag + '|' +
	  closeTag + '|' +
	  comment + '|' +
	  processing + '|' +
	  declaration + '|' +
	  cdata +
	')');
	return html;
}

var htmlBlock;
var hasRequiredHtmlBlock;

function requireHtmlBlock () {
	if (hasRequiredHtmlBlock) return htmlBlock;
	hasRequiredHtmlBlock = 1;

	var openCloseTag = requireHtml().openCloseTag;

	htmlBlock = blockHTML;

	var C_TAB = '\t';
	var C_SPACE = ' ';
	var C_NEWLINE = '\n';
	var C_LT = '<';

	function blockHTML(eat, value, silent) {
	  var self = this;
	  var blocks = self.options.blocks;
	  var length = value.length;
	  var index = 0;
	  var next;
	  var line;
	  var offset;
	  var character;
	  var count;
	  var sequence;
	  var subvalue;

	  var sequences = [
	    [/^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, true],
	    [/^<!--/, /-->/, true],
	    [/^<\?/, /\?>/, true],
	    [/^<![A-Za-z]/, />/, true],
	    [/^<!\[CDATA\[/, /\]\]>/, true],
	    [new RegExp('^</?(' + blocks.join('|') + ')(?=(\\s|/?>|$))', 'i'), /^$/, true],
	    [new RegExp(openCloseTag.source + '\\s*$'), /^$/, false]
	  ];

	  /* Eat initial spacing. */
	  while (index < length) {
	    character = value.charAt(index);

	    if (character !== C_TAB && character !== C_SPACE) {
	      break;
	    }

	    index++;
	  }

	  if (value.charAt(index) !== C_LT) {
	    return;
	  }

	  next = value.indexOf(C_NEWLINE, index + 1);
	  next = next === -1 ? length : next;
	  line = value.slice(index, next);
	  offset = -1;
	  count = sequences.length;

	  while (++offset < count) {
	    if (sequences[offset][0].test(line)) {
	      sequence = sequences[offset];
	      break;
	    }
	  }

	  if (!sequence) {
	    return;
	  }

	  if (silent) {
	    return sequence[2];
	  }

	  index = next;

	  if (!sequence[1].test(line)) {
	    while (index < length) {
	      next = value.indexOf(C_NEWLINE, index + 1);
	      next = next === -1 ? length : next;
	      line = value.slice(index + 1, next);

	      if (sequence[1].test(line)) {
	        if (line) {
	          index = next;
	        }

	        break;
	      }

	      index = next;
	    }
	  }

	  subvalue = value.slice(0, index);

	  return eat(subvalue)({type: 'html', value: subvalue});
	}
	return htmlBlock;
}

var collapseWhiteSpace;
var hasRequiredCollapseWhiteSpace;

function requireCollapseWhiteSpace () {
	if (hasRequiredCollapseWhiteSpace) return collapseWhiteSpace;
	hasRequiredCollapseWhiteSpace = 1;

	collapseWhiteSpace = collapse;

	// `collapse(' \t\nbar \nbaz\t') // ' bar baz '`
	function collapse(value) {
	  return String(value).replace(/\s+/g, ' ')
	}
	return collapseWhiteSpace;
}

var normalize_1;
var hasRequiredNormalize;

function requireNormalize () {
	if (hasRequiredNormalize) return normalize_1;
	hasRequiredNormalize = 1;

	var collapseWhiteSpace = requireCollapseWhiteSpace();

	normalize_1 = normalize;

	/* Normalize an identifier.  Collapses multiple white space
	 * characters into a single space, and removes casing. */
	function normalize(value) {
	  return collapseWhiteSpace(value).toLowerCase();
	}
	return normalize_1;
}

var footnoteDefinition_1;
var hasRequiredFootnoteDefinition;

function requireFootnoteDefinition () {
	if (hasRequiredFootnoteDefinition) return footnoteDefinition_1;
	hasRequiredFootnoteDefinition = 1;

	var whitespace = requireIsWhitespaceCharacter();
	var normalize = requireNormalize();

	footnoteDefinition_1 = footnoteDefinition;
	footnoteDefinition.notInList = true;
	footnoteDefinition.notInBlock = true;

	var C_BACKSLASH = '\\';
	var C_NEWLINE = '\n';
	var C_TAB = '\t';
	var C_SPACE = ' ';
	var C_BRACKET_OPEN = '[';
	var C_BRACKET_CLOSE = ']';
	var C_CARET = '^';
	var C_COLON = ':';

	var EXPRESSION_INITIAL_TAB = /^( {4}|\t)?/gm;

	function footnoteDefinition(eat, value, silent) {
	  var self = this;
	  var offsets = self.offset;
	  var index;
	  var length;
	  var subvalue;
	  var now;
	  var currentLine;
	  var content;
	  var queue;
	  var subqueue;
	  var character;
	  var identifier;
	  var add;
	  var exit;

	  if (!self.options.footnotes) {
	    return;
	  }

	  index = 0;
	  length = value.length;
	  subvalue = '';
	  now = eat.now();
	  currentLine = now.line;

	  while (index < length) {
	    character = value.charAt(index);

	    if (!whitespace(character)) {
	      break;
	    }

	    subvalue += character;
	    index++;
	  }

	  if (
	    value.charAt(index) !== C_BRACKET_OPEN ||
	    value.charAt(index + 1) !== C_CARET
	  ) {
	    return;
	  }

	  subvalue += C_BRACKET_OPEN + C_CARET;
	  index = subvalue.length;
	  queue = '';

	  while (index < length) {
	    character = value.charAt(index);

	    if (character === C_BRACKET_CLOSE) {
	      break;
	    } else if (character === C_BACKSLASH) {
	      queue += character;
	      index++;
	      character = value.charAt(index);
	    }

	    queue += character;
	    index++;
	  }

	  if (
	    !queue ||
	    value.charAt(index) !== C_BRACKET_CLOSE ||
	    value.charAt(index + 1) !== C_COLON
	  ) {
	    return;
	  }

	  if (silent) {
	    return true;
	  }

	  identifier = normalize(queue);
	  subvalue += queue + C_BRACKET_CLOSE + C_COLON;
	  index = subvalue.length;

	  while (index < length) {
	    character = value.charAt(index);

	    if (character !== C_TAB && character !== C_SPACE) {
	      break;
	    }

	    subvalue += character;
	    index++;
	  }

	  now.column += subvalue.length;
	  now.offset += subvalue.length;
	  queue = '';
	  content = '';
	  subqueue = '';

	  while (index < length) {
	    character = value.charAt(index);

	    if (character === C_NEWLINE) {
	      subqueue = character;
	      index++;

	      while (index < length) {
	        character = value.charAt(index);

	        if (character !== C_NEWLINE) {
	          break;
	        }

	        subqueue += character;
	        index++;
	      }

	      queue += subqueue;
	      subqueue = '';

	      while (index < length) {
	        character = value.charAt(index);

	        if (character !== C_SPACE) {
	          break;
	        }

	        subqueue += character;
	        index++;
	      }

	      if (subqueue.length === 0) {
	        break;
	      }

	      queue += subqueue;
	    }

	    if (queue) {
	      content += queue;
	      queue = '';
	    }

	    content += character;
	    index++;
	  }

	  subvalue += content;

	  content = content.replace(EXPRESSION_INITIAL_TAB, function (line) {
	    offsets[currentLine] = (offsets[currentLine] || 0) + line.length;
	    currentLine++;

	    return '';
	  });

	  add = eat(subvalue);

	  exit = self.enterBlock();
	  content = self.tokenizeBlock(content, now);
	  exit();

	  return add({
	    type: 'footnoteDefinition',
	    identifier: identifier,
	    children: content
	  });
	}
	return footnoteDefinition_1;
}

var definition_1;
var hasRequiredDefinition;

function requireDefinition () {
	if (hasRequiredDefinition) return definition_1;
	hasRequiredDefinition = 1;

	var whitespace = requireIsWhitespaceCharacter();
	var normalize = requireNormalize();

	definition_1 = definition;
	definition.notInList = true;
	definition.notInBlock = true;

	var C_DOUBLE_QUOTE = '"';
	var C_SINGLE_QUOTE = '\'';
	var C_BACKSLASH = '\\';
	var C_NEWLINE = '\n';
	var C_TAB = '\t';
	var C_SPACE = ' ';
	var C_BRACKET_OPEN = '[';
	var C_BRACKET_CLOSE = ']';
	var C_PAREN_OPEN = '(';
	var C_PAREN_CLOSE = ')';
	var C_COLON = ':';
	var C_LT = '<';
	var C_GT = '>';

	function definition(eat, value, silent) {
	  var self = this;
	  var commonmark = self.options.commonmark;
	  var index = 0;
	  var length = value.length;
	  var subvalue = '';
	  var beforeURL;
	  var beforeTitle;
	  var queue;
	  var character;
	  var test;
	  var identifier;
	  var url;
	  var title;

	  while (index < length) {
	    character = value.charAt(index);

	    if (character !== C_SPACE && character !== C_TAB) {
	      break;
	    }

	    subvalue += character;
	    index++;
	  }

	  character = value.charAt(index);

	  if (character !== C_BRACKET_OPEN) {
	    return;
	  }

	  index++;
	  subvalue += character;
	  queue = '';

	  while (index < length) {
	    character = value.charAt(index);

	    if (character === C_BRACKET_CLOSE) {
	      break;
	    } else if (character === C_BACKSLASH) {
	      queue += character;
	      index++;
	      character = value.charAt(index);
	    }

	    queue += character;
	    index++;
	  }

	  if (
	    !queue ||
	    value.charAt(index) !== C_BRACKET_CLOSE ||
	    value.charAt(index + 1) !== C_COLON
	  ) {
	    return;
	  }

	  identifier = queue;
	  subvalue += queue + C_BRACKET_CLOSE + C_COLON;
	  index = subvalue.length;
	  queue = '';

	  while (index < length) {
	    character = value.charAt(index);

	    if (
	      character !== C_TAB &&
	      character !== C_SPACE &&
	      character !== C_NEWLINE
	    ) {
	      break;
	    }

	    subvalue += character;
	    index++;
	  }

	  character = value.charAt(index);
	  queue = '';
	  beforeURL = subvalue;

	  if (character === C_LT) {
	    index++;

	    while (index < length) {
	      character = value.charAt(index);

	      if (!isEnclosedURLCharacter(character)) {
	        break;
	      }

	      queue += character;
	      index++;
	    }

	    character = value.charAt(index);

	    if (character === isEnclosedURLCharacter.delimiter) {
	      subvalue += C_LT + queue + character;
	      index++;
	    } else {
	      if (commonmark) {
	        return;
	      }

	      index -= queue.length + 1;
	      queue = '';
	    }
	  }

	  if (!queue) {
	    while (index < length) {
	      character = value.charAt(index);

	      if (!isUnclosedURLCharacter(character)) {
	        break;
	      }

	      queue += character;
	      index++;
	    }

	    subvalue += queue;
	  }

	  if (!queue) {
	    return;
	  }

	  url = queue;
	  queue = '';

	  while (index < length) {
	    character = value.charAt(index);

	    if (
	      character !== C_TAB &&
	      character !== C_SPACE &&
	      character !== C_NEWLINE
	    ) {
	      break;
	    }

	    queue += character;
	    index++;
	  }

	  character = value.charAt(index);
	  test = null;

	  if (character === C_DOUBLE_QUOTE) {
	    test = C_DOUBLE_QUOTE;
	  } else if (character === C_SINGLE_QUOTE) {
	    test = C_SINGLE_QUOTE;
	  } else if (character === C_PAREN_OPEN) {
	    test = C_PAREN_CLOSE;
	  }

	  if (!test) {
	    queue = '';
	    index = subvalue.length;
	  } else if (queue) {
	    subvalue += queue + character;
	    index = subvalue.length;
	    queue = '';

	    while (index < length) {
	      character = value.charAt(index);

	      if (character === test) {
	        break;
	      }

	      if (character === C_NEWLINE) {
	        index++;
	        character = value.charAt(index);

	        if (character === C_NEWLINE || character === test) {
	          return;
	        }

	        queue += C_NEWLINE;
	      }

	      queue += character;
	      index++;
	    }

	    character = value.charAt(index);

	    if (character !== test) {
	      return;
	    }

	    beforeTitle = subvalue;
	    subvalue += queue + character;
	    index++;
	    title = queue;
	    queue = '';
	  } else {
	    return;
	  }

	  while (index < length) {
	    character = value.charAt(index);

	    if (character !== C_TAB && character !== C_SPACE) {
	      break;
	    }

	    subvalue += character;
	    index++;
	  }

	  character = value.charAt(index);

	  if (!character || character === C_NEWLINE) {
	    if (silent) {
	      return true;
	    }

	    beforeURL = eat(beforeURL).test().end;
	    url = self.decode.raw(self.unescape(url), beforeURL, {nonTerminated: false});

	    if (title) {
	      beforeTitle = eat(beforeTitle).test().end;
	      title = self.decode.raw(self.unescape(title), beforeTitle);
	    }

	    return eat(subvalue)({
	      type: 'definition',
	      identifier: normalize(identifier),
	      title: title || null,
	      url: url
	    });
	  }
	}

	/* Check if `character` can be inside an enclosed URI. */
	function isEnclosedURLCharacter(character) {
	  return character !== C_GT &&
	    character !== C_BRACKET_OPEN &&
	    character !== C_BRACKET_CLOSE;
	}

	isEnclosedURLCharacter.delimiter = C_GT;

	/* Check if `character` can be inside an unclosed URI. */
	function isUnclosedURLCharacter(character) {
	  return character !== C_BRACKET_OPEN &&
	    character !== C_BRACKET_CLOSE &&
	    !whitespace(character);
	}
	return definition_1;
}

var table_1;
var hasRequiredTable;

function requireTable () {
	if (hasRequiredTable) return table_1;
	hasRequiredTable = 1;

	var whitespace = requireIsWhitespaceCharacter();

	table_1 = table;

	var C_BACKSLASH = '\\';
	var C_TICK = '`';
	var C_DASH = '-';
	var C_PIPE = '|';
	var C_COLON = ':';
	var C_SPACE = ' ';
	var C_NEWLINE = '\n';
	var C_TAB = '\t';

	var MIN_TABLE_COLUMNS = 1;
	var MIN_TABLE_ROWS = 2;

	var TABLE_ALIGN_LEFT = 'left';
	var TABLE_ALIGN_CENTER = 'center';
	var TABLE_ALIGN_RIGHT = 'right';
	var TABLE_ALIGN_NONE = null;

	function table(eat, value, silent) {
	  var self = this;
	  var index;
	  var alignments;
	  var alignment;
	  var subvalue;
	  var row;
	  var length;
	  var lines;
	  var queue;
	  var character;
	  var hasDash;
	  var align;
	  var cell;
	  var preamble;
	  var count;
	  var opening;
	  var now;
	  var position;
	  var lineCount;
	  var line;
	  var rows;
	  var table;
	  var lineIndex;
	  var pipeIndex;
	  var first;

	  /* Exit when not in gfm-mode. */
	  if (!self.options.gfm) {
	    return;
	  }

	  /* Get the rows.
	   * Detecting tables soon is hard, so there are some
	   * checks for performance here, such as the minimum
	   * number of rows, and allowed characters in the
	   * alignment row. */
	  index = 0;
	  lineCount = 0;
	  length = value.length + 1;
	  lines = [];

	  while (index < length) {
	    lineIndex = value.indexOf(C_NEWLINE, index);
	    pipeIndex = value.indexOf(C_PIPE, index + 1);

	    if (lineIndex === -1) {
	      lineIndex = value.length;
	    }

	    if (pipeIndex === -1 || pipeIndex > lineIndex) {
	      if (lineCount < MIN_TABLE_ROWS) {
	        return;
	      }

	      break;
	    }

	    lines.push(value.slice(index, lineIndex));
	    lineCount++;
	    index = lineIndex + 1;
	  }

	  /* Parse the alignment row. */
	  subvalue = lines.join(C_NEWLINE);
	  alignments = lines.splice(1, 1)[0] || [];
	  index = 0;
	  length = alignments.length;
	  lineCount--;
	  alignment = false;
	  align = [];

	  while (index < length) {
	    character = alignments.charAt(index);

	    if (character === C_PIPE) {
	      hasDash = null;

	      if (alignment === false) {
	        if (first === false) {
	          return;
	        }
	      } else {
	        align.push(alignment);
	        alignment = false;
	      }

	      first = false;
	    } else if (character === C_DASH) {
	      hasDash = true;
	      alignment = alignment || TABLE_ALIGN_NONE;
	    } else if (character === C_COLON) {
	      if (alignment === TABLE_ALIGN_LEFT) {
	        alignment = TABLE_ALIGN_CENTER;
	      } else if (hasDash && alignment === TABLE_ALIGN_NONE) {
	        alignment = TABLE_ALIGN_RIGHT;
	      } else {
	        alignment = TABLE_ALIGN_LEFT;
	      }
	    } else if (!whitespace(character)) {
	      return;
	    }

	    index++;
	  }

	  if (alignment !== false) {
	    align.push(alignment);
	  }

	  /* Exit when without enough columns. */
	  if (align.length < MIN_TABLE_COLUMNS) {
	    return;
	  }

	  /* istanbul ignore if - never used (yet) */
	  if (silent) {
	    return true;
	  }

	  /* Parse the rows. */
	  position = -1;
	  rows = [];

	  table = eat(subvalue).reset({
	    type: 'table',
	    align: align,
	    children: rows
	  });

	  while (++position < lineCount) {
	    line = lines[position];
	    row = {type: 'tableRow', children: []};

	    /* Eat a newline character when this is not the
	     * first row. */
	    if (position) {
	      eat(C_NEWLINE);
	    }

	    /* Eat the row. */
	    eat(line).reset(row, table);

	    length = line.length + 1;
	    index = 0;
	    queue = '';
	    cell = '';
	    preamble = true;
	    count = null;
	    opening = null;

	    while (index < length) {
	      character = line.charAt(index);

	      if (character === C_TAB || character === C_SPACE) {
	        if (cell) {
	          queue += character;
	        } else {
	          eat(character);
	        }

	        index++;
	        continue;
	      }

	      if (character === '' || character === C_PIPE) {
	        if (preamble) {
	          eat(character);
	        } else {
	          if (character && opening) {
	            queue += character;
	            index++;
	            continue;
	          }

	          if ((cell || character) && !preamble) {
	            subvalue = cell;

	            if (queue.length > 1) {
	              if (character) {
	                subvalue += queue.slice(0, queue.length - 1);
	                queue = queue.charAt(queue.length - 1);
	              } else {
	                subvalue += queue;
	                queue = '';
	              }
	            }

	            now = eat.now();

	            eat(subvalue)({
	              type: 'tableCell',
	              children: self.tokenizeInline(cell, now)
	            }, row);
	          }

	          eat(queue + character);

	          queue = '';
	          cell = '';
	        }
	      } else {
	        if (queue) {
	          cell += queue;
	          queue = '';
	        }

	        cell += character;

	        if (character === C_BACKSLASH && index !== length - 2) {
	          cell += line.charAt(index + 1);
	          index++;
	        }

	        if (character === C_TICK) {
	          count = 1;

	          while (line.charAt(index + 1) === character) {
	            cell += character;
	            index++;
	            count++;
	          }

	          if (!opening) {
	            opening = count;
	          } else if (count >= opening) {
	            opening = 0;
	          }
	        }
	      }

	      preamble = false;
	      index++;
	    }

	    /* Eat the alignment row. */
	    if (!position) {
	      eat(C_NEWLINE + alignments);
	    }
	  }

	  return table;
	}
	return table_1;
}

var paragraph_1;
var hasRequiredParagraph;

function requireParagraph () {
	if (hasRequiredParagraph) return paragraph_1;
	hasRequiredParagraph = 1;

	var trim = requireTrim();
	var decimal = requireIsDecimal();
	var trimTrailingLines = requireTrimTrailingLines();
	var interrupt = requireInterrupt();

	paragraph_1 = paragraph;

	var C_NEWLINE = '\n';
	var C_TAB = '\t';
	var C_SPACE = ' ';

	var TAB_SIZE = 4;

	/* Tokenise paragraph. */
	function paragraph(eat, value, silent) {
	  var self = this;
	  var settings = self.options;
	  var commonmark = settings.commonmark;
	  var gfm = settings.gfm;
	  var tokenizers = self.blockTokenizers;
	  var interruptors = self.interruptParagraph;
	  var index = value.indexOf(C_NEWLINE);
	  var length = value.length;
	  var position;
	  var subvalue;
	  var character;
	  var size;
	  var now;

	  while (index < length) {
	    /* Eat everything if there’s no following newline. */
	    if (index === -1) {
	      index = length;
	      break;
	    }

	    /* Stop if the next character is NEWLINE. */
	    if (value.charAt(index + 1) === C_NEWLINE) {
	      break;
	    }

	    /* In commonmark-mode, following indented lines
	     * are part of the paragraph. */
	    if (commonmark) {
	      size = 0;
	      position = index + 1;

	      while (position < length) {
	        character = value.charAt(position);

	        if (character === C_TAB) {
	          size = TAB_SIZE;
	          break;
	        } else if (character === C_SPACE) {
	          size++;
	        } else {
	          break;
	        }

	        position++;
	      }

	      if (size >= TAB_SIZE) {
	        index = value.indexOf(C_NEWLINE, index + 1);
	        continue;
	      }
	    }

	    subvalue = value.slice(index + 1);

	    /* Check if the following code contains a possible
	     * block. */
	    if (interrupt(interruptors, tokenizers, self, [eat, subvalue, true])) {
	      break;
	    }

	    /* Break if the following line starts a list, when
	     * already in a list, or when in commonmark, or when
	     * in gfm mode and the bullet is *not* numeric. */
	    if (
	      tokenizers.list.call(self, eat, subvalue, true) &&
	      (
	        self.inList ||
	        commonmark ||
	        (gfm && !decimal(trim.left(subvalue).charAt(0)))
	      )
	    ) {
	      break;
	    }

	    position = index;
	    index = value.indexOf(C_NEWLINE, index + 1);

	    if (index !== -1 && trim(value.slice(position, index)) === '') {
	      index = position;
	      break;
	    }
	  }

	  subvalue = value.slice(0, index);

	  if (trim(subvalue) === '') {
	    eat(subvalue);

	    return null;
	  }

	  /* istanbul ignore if - never used (yet) */
	  if (silent) {
	    return true;
	  }

	  now = eat.now();
	  subvalue = trimTrailingLines(subvalue);

	  return eat(subvalue)({
	    type: 'paragraph',
	    children: self.tokenizeInline(subvalue, now)
	  });
	}
	return paragraph_1;
}

var _escape$1;
var hasRequired_escape$1;

function require_escape$1 () {
	if (hasRequired_escape$1) return _escape$1;
	hasRequired_escape$1 = 1;

	_escape$1 = locate;

	function locate(value, fromIndex) {
	  return value.indexOf('\\', fromIndex);
	}
	return _escape$1;
}

var _escape;
var hasRequired_escape;

function require_escape () {
	if (hasRequired_escape) return _escape;
	hasRequired_escape = 1;

	var locate = require_escape$1();

	_escape = escape;
	escape.locator = locate;

	function escape(eat, value, silent) {
	  var self = this;
	  var character;
	  var node;

	  if (value.charAt(0) === '\\') {
	    character = value.charAt(1);

	    if (self.escape.indexOf(character) !== -1) {
	      /* istanbul ignore if - never used (yet) */
	      if (silent) {
	        return true;
	      }

	      if (character === '\n') {
	        node = {type: 'break'};
	      } else {
	        node = {
	          type: 'text',
	          value: character
	        };
	      }

	      return eat('\\' + character)(node);
	    }
	  }
	}
	return _escape;
}

var tag;
var hasRequiredTag;

function requireTag () {
	if (hasRequiredTag) return tag;
	hasRequiredTag = 1;

	tag = locate;

	function locate(value, fromIndex) {
	  return value.indexOf('<', fromIndex);
	}
	return tag;
}

var autoLink_1;
var hasRequiredAutoLink;

function requireAutoLink () {
	if (hasRequiredAutoLink) return autoLink_1;
	hasRequiredAutoLink = 1;

	var whitespace = requireIsWhitespaceCharacter();
	var decode = requireParseEntities();
	var locate = requireTag();

	autoLink_1 = autoLink;
	autoLink.locator = locate;
	autoLink.notInLink = true;

	var C_LT = '<';
	var C_GT = '>';
	var C_AT_SIGN = '@';
	var C_SLASH = '/';
	var MAILTO = 'mailto:';
	var MAILTO_LENGTH = MAILTO.length;

	/* Tokenise a link. */
	function autoLink(eat, value, silent) {
	  var self;
	  var subvalue;
	  var length;
	  var index;
	  var queue;
	  var character;
	  var hasAtCharacter;
	  var link;
	  var now;
	  var content;
	  var tokenizers;
	  var exit;

	  if (value.charAt(0) !== C_LT) {
	    return;
	  }

	  self = this;
	  subvalue = '';
	  length = value.length;
	  index = 0;
	  queue = '';
	  hasAtCharacter = false;
	  link = '';

	  index++;
	  subvalue = C_LT;

	  while (index < length) {
	    character = value.charAt(index);

	    if (
	      whitespace(character) ||
	      character === C_GT ||
	      character === C_AT_SIGN ||
	      (character === ':' && value.charAt(index + 1) === C_SLASH)
	    ) {
	      break;
	    }

	    queue += character;
	    index++;
	  }

	  if (!queue) {
	    return;
	  }

	  link += queue;
	  queue = '';

	  character = value.charAt(index);
	  link += character;
	  index++;

	  if (character === C_AT_SIGN) {
	    hasAtCharacter = true;
	  } else {
	    if (
	      character !== ':' ||
	      value.charAt(index + 1) !== C_SLASH
	    ) {
	      return;
	    }

	    link += C_SLASH;
	    index++;
	  }

	  while (index < length) {
	    character = value.charAt(index);

	    if (whitespace(character) || character === C_GT) {
	      break;
	    }

	    queue += character;
	    index++;
	  }

	  character = value.charAt(index);

	  if (!queue || character !== C_GT) {
	    return;
	  }

	  /* istanbul ignore if - never used (yet) */
	  if (silent) {
	    return true;
	  }

	  link += queue;
	  content = link;
	  subvalue += link + character;
	  now = eat.now();
	  now.column++;
	  now.offset++;

	  if (hasAtCharacter) {
	    if (link.slice(0, MAILTO_LENGTH).toLowerCase() === MAILTO) {
	      content = content.substr(MAILTO_LENGTH);
	      now.column += MAILTO_LENGTH;
	      now.offset += MAILTO_LENGTH;
	    } else {
	      link = MAILTO + link;
	    }
	  }

	  /* Temporarily remove all tokenizers except text in autolinks. */
	  tokenizers = self.inlineTokenizers;
	  self.inlineTokenizers = {text: tokenizers.text};

	  exit = self.enterLink();

	  content = self.tokenizeInline(content, now);

	  self.inlineTokenizers = tokenizers;
	  exit();

	  return eat(subvalue)({
	    type: 'link',
	    title: null,
	    url: decode(link, {nonTerminated: false}),
	    children: content
	  });
	}
	return autoLink_1;
}

var url;
var hasRequiredUrl$1;

function requireUrl$1 () {
	if (hasRequiredUrl$1) return url;
	hasRequiredUrl$1 = 1;

	url = locate;

	var PROTOCOLS = ['https://', 'http://', 'mailto:'];

	function locate(value, fromIndex) {
	  var length = PROTOCOLS.length;
	  var index = -1;
	  var min = -1;
	  var position;

	  if (!this.options.gfm) {
	    return -1;
	  }

	  while (++index < length) {
	    position = value.indexOf(PROTOCOLS[index], fromIndex);

	    if (position !== -1 && (position < min || min === -1)) {
	      min = position;
	    }
	  }

	  return min;
	}
	return url;
}

var url_1;
var hasRequiredUrl;

function requireUrl () {
	if (hasRequiredUrl) return url_1;
	hasRequiredUrl = 1;

	var decode = requireParseEntities();
	var whitespace = requireIsWhitespaceCharacter();
	var locate = requireUrl$1();

	url_1 = url;
	url.locator = locate;
	url.notInLink = true;

	var C_BRACKET_OPEN = '[';
	var C_BRACKET_CLOSE = ']';
	var C_PAREN_OPEN = '(';
	var C_PAREN_CLOSE = ')';
	var C_LT = '<';
	var C_AT_SIGN = '@';

	var HTTP_PROTOCOL = 'http://';
	var HTTPS_PROTOCOL = 'https://';
	var MAILTO_PROTOCOL = 'mailto:';

	var PROTOCOLS = [
	  HTTP_PROTOCOL,
	  HTTPS_PROTOCOL,
	  MAILTO_PROTOCOL
	];

	var PROTOCOLS_LENGTH = PROTOCOLS.length;

	function url(eat, value, silent) {
	  var self = this;
	  var subvalue;
	  var content;
	  var character;
	  var index;
	  var position;
	  var protocol;
	  var match;
	  var length;
	  var queue;
	  var parenCount;
	  var nextCharacter;
	  var exit;

	  if (!self.options.gfm) {
	    return;
	  }

	  subvalue = '';
	  index = -1;
	  length = PROTOCOLS_LENGTH;

	  while (++index < length) {
	    protocol = PROTOCOLS[index];
	    match = value.slice(0, protocol.length);

	    if (match.toLowerCase() === protocol) {
	      subvalue = match;
	      break;
	    }
	  }

	  if (!subvalue) {
	    return;
	  }

	  index = subvalue.length;
	  length = value.length;
	  queue = '';
	  parenCount = 0;

	  while (index < length) {
	    character = value.charAt(index);

	    if (whitespace(character) || character === C_LT) {
	      break;
	    }

	    if (
	      character === '.' ||
	      character === ',' ||
	      character === ':' ||
	      character === ';' ||
	      character === '"' ||
	      character === '\'' ||
	      character === ')' ||
	      character === ']'
	    ) {
	      nextCharacter = value.charAt(index + 1);

	      if (!nextCharacter || whitespace(nextCharacter)) {
	        break;
	      }
	    }

	    if (character === C_PAREN_OPEN || character === C_BRACKET_OPEN) {
	      parenCount++;
	    }

	    if (character === C_PAREN_CLOSE || character === C_BRACKET_CLOSE) {
	      parenCount--;

	      if (parenCount < 0) {
	        break;
	      }
	    }

	    queue += character;
	    index++;
	  }

	  if (!queue) {
	    return;
	  }

	  subvalue += queue;
	  content = subvalue;

	  if (protocol === MAILTO_PROTOCOL) {
	    position = queue.indexOf(C_AT_SIGN);

	    if (position === -1 || position === length - 1) {
	      return;
	    }

	    content = content.substr(MAILTO_PROTOCOL.length);
	  }

	  /* istanbul ignore if - never used (yet) */
	  if (silent) {
	    return true;
	  }

	  exit = self.enterLink();
	  content = self.tokenizeInline(content, eat.now());
	  exit();

	  return eat(subvalue)({
	    type: 'link',
	    title: null,
	    url: decode(subvalue, {nonTerminated: false}),
	    children: content
	  });
	}
	return url_1;
}

var htmlInline;
var hasRequiredHtmlInline;

function requireHtmlInline () {
	if (hasRequiredHtmlInline) return htmlInline;
	hasRequiredHtmlInline = 1;

	var alphabetical = requireIsAlphabetical();
	var locate = requireTag();
	var tag = requireHtml().tag;

	htmlInline = inlineHTML;
	inlineHTML.locator = locate;

	var EXPRESSION_HTML_LINK_OPEN = /^<a /i;
	var EXPRESSION_HTML_LINK_CLOSE = /^<\/a>/i;

	function inlineHTML(eat, value, silent) {
	  var self = this;
	  var length = value.length;
	  var character;
	  var subvalue;

	  if (value.charAt(0) !== '<' || length < 3) {
	    return;
	  }

	  character = value.charAt(1);

	  if (
	    !alphabetical(character) &&
	    character !== '?' &&
	    character !== '!' &&
	    character !== '/'
	  ) {
	    return;
	  }

	  subvalue = value.match(tag);

	  if (!subvalue) {
	    return;
	  }

	  /* istanbul ignore if - not used yet. */
	  if (silent) {
	    return true;
	  }

	  subvalue = subvalue[0];

	  if (!self.inLink && EXPRESSION_HTML_LINK_OPEN.test(subvalue)) {
	    self.inLink = true;
	  } else if (self.inLink && EXPRESSION_HTML_LINK_CLOSE.test(subvalue)) {
	    self.inLink = false;
	  }

	  return eat(subvalue)({type: 'html', value: subvalue});
	}
	return htmlInline;
}

var link;
var hasRequiredLink$1;

function requireLink$1 () {
	if (hasRequiredLink$1) return link;
	hasRequiredLink$1 = 1;

	link = locate;

	function locate(value, fromIndex) {
	  var link = value.indexOf('[', fromIndex);
	  var image = value.indexOf('![', fromIndex);

	  if (image === -1) {
	    return link;
	  }

	  /* Link can never be `-1` if an image is found, so we don’t need
	   * to check for that :) */
	  return link < image ? link : image;
	}
	return link;
}

var link_1;
var hasRequiredLink;

function requireLink () {
	if (hasRequiredLink) return link_1;
	hasRequiredLink = 1;

	var whitespace = requireIsWhitespaceCharacter();
	var locate = requireLink$1();

	link_1 = link;
	link.locator = locate;

	var own = {}.hasOwnProperty;

	var C_BACKSLASH = '\\';
	var C_BRACKET_OPEN = '[';
	var C_BRACKET_CLOSE = ']';
	var C_PAREN_OPEN = '(';
	var C_PAREN_CLOSE = ')';
	var C_LT = '<';
	var C_GT = '>';
	var C_TICK = '`';
	var C_DOUBLE_QUOTE = '"';
	var C_SINGLE_QUOTE = '\'';

	/* Map of characters, which can be used to mark link
	 * and image titles. */
	var LINK_MARKERS = {};

	LINK_MARKERS[C_DOUBLE_QUOTE] = C_DOUBLE_QUOTE;
	LINK_MARKERS[C_SINGLE_QUOTE] = C_SINGLE_QUOTE;

	/* Map of characters, which can be used to mark link
	 * and image titles in commonmark-mode. */
	var COMMONMARK_LINK_MARKERS = {};

	COMMONMARK_LINK_MARKERS[C_DOUBLE_QUOTE] = C_DOUBLE_QUOTE;
	COMMONMARK_LINK_MARKERS[C_SINGLE_QUOTE] = C_SINGLE_QUOTE;
	COMMONMARK_LINK_MARKERS[C_PAREN_OPEN] = C_PAREN_CLOSE;

	function link(eat, value, silent) {
	  var self = this;
	  var subvalue = '';
	  var index = 0;
	  var character = value.charAt(0);
	  var pedantic = self.options.pedantic;
	  var commonmark = self.options.commonmark;
	  var gfm = self.options.gfm;
	  var closed;
	  var count;
	  var opening;
	  var beforeURL;
	  var beforeTitle;
	  var subqueue;
	  var hasMarker;
	  var markers;
	  var isImage;
	  var content;
	  var marker;
	  var length;
	  var title;
	  var depth;
	  var queue;
	  var url;
	  var now;
	  var exit;
	  var node;

	  /* Detect whether this is an image. */
	  if (character === '!') {
	    isImage = true;
	    subvalue = character;
	    character = value.charAt(++index);
	  }

	  /* Eat the opening. */
	  if (character !== C_BRACKET_OPEN) {
	    return;
	  }

	  /* Exit when this is a link and we’re already inside
	   * a link. */
	  if (!isImage && self.inLink) {
	    return;
	  }

	  subvalue += character;
	  queue = '';
	  index++;

	  /* Eat the content. */
	  length = value.length;
	  now = eat.now();
	  depth = 0;

	  now.column += index;
	  now.offset += index;

	  while (index < length) {
	    character = value.charAt(index);
	    subqueue = character;

	    if (character === C_TICK) {
	      /* Inline-code in link content. */
	      count = 1;

	      while (value.charAt(index + 1) === C_TICK) {
	        subqueue += character;
	        index++;
	        count++;
	      }

	      if (!opening) {
	        opening = count;
	      } else if (count >= opening) {
	        opening = 0;
	      }
	    } else if (character === C_BACKSLASH) {
	      /* Allow brackets to be escaped. */
	      index++;
	      subqueue += value.charAt(index);
	    /* In GFM mode, brackets in code still count.
	     * In all other modes, they don’t.  This empty
	     * block prevents the next statements are
	     * entered. */
	    } else if ((!opening || gfm) && character === C_BRACKET_OPEN) {
	      depth++;
	    } else if ((!opening || gfm) && character === C_BRACKET_CLOSE) {
	      if (depth) {
	        depth--;
	      } else {
	        /* Allow white-space between content and
	         * url in GFM mode. */
	        if (!pedantic) {
	          while (index < length) {
	            character = value.charAt(index + 1);

	            if (!whitespace(character)) {
	              break;
	            }

	            subqueue += character;
	            index++;
	          }
	        }

	        if (value.charAt(index + 1) !== C_PAREN_OPEN) {
	          return;
	        }

	        subqueue += C_PAREN_OPEN;
	        closed = true;
	        index++;

	        break;
	      }
	    }

	    queue += subqueue;
	    subqueue = '';
	    index++;
	  }

	  /* Eat the content closing. */
	  if (!closed) {
	    return;
	  }

	  content = queue;
	  subvalue += queue + subqueue;
	  index++;

	  /* Eat white-space. */
	  while (index < length) {
	    character = value.charAt(index);

	    if (!whitespace(character)) {
	      break;
	    }

	    subvalue += character;
	    index++;
	  }

	  /* Eat the URL. */
	  character = value.charAt(index);
	  markers = commonmark ? COMMONMARK_LINK_MARKERS : LINK_MARKERS;
	  queue = '';
	  beforeURL = subvalue;

	  if (character === C_LT) {
	    index++;
	    beforeURL += C_LT;

	    while (index < length) {
	      character = value.charAt(index);

	      if (character === C_GT) {
	        break;
	      }

	      if (commonmark && character === '\n') {
	        return;
	      }

	      queue += character;
	      index++;
	    }

	    if (value.charAt(index) !== C_GT) {
	      return;
	    }

	    subvalue += C_LT + queue + C_GT;
	    url = queue;
	    index++;
	  } else {
	    character = null;
	    subqueue = '';

	    while (index < length) {
	      character = value.charAt(index);

	      if (subqueue && own.call(markers, character)) {
	        break;
	      }

	      if (whitespace(character)) {
	        if (!pedantic) {
	          break;
	        }

	        subqueue += character;
	      } else {
	        if (character === C_PAREN_OPEN) {
	          depth++;
	        } else if (character === C_PAREN_CLOSE) {
	          if (depth === 0) {
	            break;
	          }

	          depth--;
	        }

	        queue += subqueue;
	        subqueue = '';

	        if (character === C_BACKSLASH) {
	          queue += C_BACKSLASH;
	          character = value.charAt(++index);
	        }

	        queue += character;
	      }

	      index++;
	    }

	    subvalue += queue;
	    url = queue;
	    index = subvalue.length;
	  }

	  /* Eat white-space. */
	  queue = '';

	  while (index < length) {
	    character = value.charAt(index);

	    if (!whitespace(character)) {
	      break;
	    }

	    queue += character;
	    index++;
	  }

	  character = value.charAt(index);
	  subvalue += queue;

	  /* Eat the title. */
	  if (queue && own.call(markers, character)) {
	    index++;
	    subvalue += character;
	    queue = '';
	    marker = markers[character];
	    beforeTitle = subvalue;

	    /* In commonmark-mode, things are pretty easy: the
	     * marker cannot occur inside the title.
	     *
	     * Non-commonmark does, however, support nested
	     * delimiters. */
	    if (commonmark) {
	      while (index < length) {
	        character = value.charAt(index);

	        if (character === marker) {
	          break;
	        }

	        if (character === C_BACKSLASH) {
	          queue += C_BACKSLASH;
	          character = value.charAt(++index);
	        }

	        index++;
	        queue += character;
	      }

	      character = value.charAt(index);

	      if (character !== marker) {
	        return;
	      }

	      title = queue;
	      subvalue += queue + character;
	      index++;

	      while (index < length) {
	        character = value.charAt(index);

	        if (!whitespace(character)) {
	          break;
	        }

	        subvalue += character;
	        index++;
	      }
	    } else {
	      subqueue = '';

	      while (index < length) {
	        character = value.charAt(index);

	        if (character === marker) {
	          if (hasMarker) {
	            queue += marker + subqueue;
	            subqueue = '';
	          }

	          hasMarker = true;
	        } else if (!hasMarker) {
	          queue += character;
	        } else if (character === C_PAREN_CLOSE) {
	          subvalue += queue + marker + subqueue;
	          title = queue;
	          break;
	        } else if (whitespace(character)) {
	          subqueue += character;
	        } else {
	          queue += marker + subqueue + character;
	          subqueue = '';
	          hasMarker = false;
	        }

	        index++;
	      }
	    }
	  }

	  if (value.charAt(index) !== C_PAREN_CLOSE) {
	    return;
	  }

	  /* istanbul ignore if - never used (yet) */
	  if (silent) {
	    return true;
	  }

	  subvalue += C_PAREN_CLOSE;

	  url = self.decode.raw(self.unescape(url), eat(beforeURL).test().end, {nonTerminated: false});

	  if (title) {
	    beforeTitle = eat(beforeTitle).test().end;
	    title = self.decode.raw(self.unescape(title), beforeTitle);
	  }

	  node = {
	    type: isImage ? 'image' : 'link',
	    title: title || null,
	    url: url
	  };

	  if (isImage) {
	    node.alt = self.decode.raw(self.unescape(content), now) || null;
	  } else {
	    exit = self.enterLink();
	    node.children = self.tokenizeInline(content, now);
	    exit();
	  }

	  return eat(subvalue)(node);
	}
	return link_1;
}

var reference_1;
var hasRequiredReference;

function requireReference () {
	if (hasRequiredReference) return reference_1;
	hasRequiredReference = 1;

	var whitespace = requireIsWhitespaceCharacter();
	var locate = requireLink$1();
	var normalize = requireNormalize();

	reference_1 = reference;
	reference.locator = locate;

	var T_LINK = 'link';
	var T_IMAGE = 'image';
	var T_FOOTNOTE = 'footnote';
	var REFERENCE_TYPE_SHORTCUT = 'shortcut';
	var REFERENCE_TYPE_COLLAPSED = 'collapsed';
	var REFERENCE_TYPE_FULL = 'full';
	var C_CARET = '^';
	var C_BACKSLASH = '\\';
	var C_BRACKET_OPEN = '[';
	var C_BRACKET_CLOSE = ']';

	function reference(eat, value, silent) {
	  var self = this;
	  var character = value.charAt(0);
	  var index = 0;
	  var length = value.length;
	  var subvalue = '';
	  var intro = '';
	  var type = T_LINK;
	  var referenceType = REFERENCE_TYPE_SHORTCUT;
	  var content;
	  var identifier;
	  var now;
	  var node;
	  var exit;
	  var queue;
	  var bracketed;
	  var depth;

	  /* Check whether we’re eating an image. */
	  if (character === '!') {
	    type = T_IMAGE;
	    intro = character;
	    character = value.charAt(++index);
	  }

	  if (character !== C_BRACKET_OPEN) {
	    return;
	  }

	  index++;
	  intro += character;
	  queue = '';

	  /* Check whether we’re eating a footnote. */
	  if (self.options.footnotes && value.charAt(index) === C_CARET) {
	    /* Exit if `![^` is found, so the `!` will be seen as text after this,
	     * and we’ll enter this function again when `[^` is found. */
	    if (type === T_IMAGE) {
	      return;
	    }

	    intro += C_CARET;
	    index++;
	    type = T_FOOTNOTE;
	  }

	  /* Eat the text. */
	  depth = 0;

	  while (index < length) {
	    character = value.charAt(index);

	    if (character === C_BRACKET_OPEN) {
	      bracketed = true;
	      depth++;
	    } else if (character === C_BRACKET_CLOSE) {
	      if (!depth) {
	        break;
	      }

	      depth--;
	    }

	    if (character === C_BACKSLASH) {
	      queue += C_BACKSLASH;
	      character = value.charAt(++index);
	    }

	    queue += character;
	    index++;
	  }

	  subvalue = queue;
	  content = queue;
	  character = value.charAt(index);

	  if (character !== C_BRACKET_CLOSE) {
	    return;
	  }

	  index++;
	  subvalue += character;
	  queue = '';

	  while (index < length) {
	    character = value.charAt(index);

	    if (!whitespace(character)) {
	      break;
	    }

	    queue += character;
	    index++;
	  }

	  character = value.charAt(index);

	  /* Inline footnotes cannot have an identifier. */
	  if (type !== T_FOOTNOTE && character === C_BRACKET_OPEN) {
	    identifier = '';
	    queue += character;
	    index++;

	    while (index < length) {
	      character = value.charAt(index);

	      if (character === C_BRACKET_OPEN || character === C_BRACKET_CLOSE) {
	        break;
	      }

	      if (character === C_BACKSLASH) {
	        identifier += C_BACKSLASH;
	        character = value.charAt(++index);
	      }

	      identifier += character;
	      index++;
	    }

	    character = value.charAt(index);

	    if (character === C_BRACKET_CLOSE) {
	      referenceType = identifier ? REFERENCE_TYPE_FULL : REFERENCE_TYPE_COLLAPSED;
	      queue += identifier + character;
	      index++;
	    } else {
	      identifier = '';
	    }

	    subvalue += queue;
	    queue = '';
	  } else {
	    if (!content) {
	      return;
	    }

	    identifier = content;
	  }

	  /* Brackets cannot be inside the identifier. */
	  if (referenceType !== REFERENCE_TYPE_FULL && bracketed) {
	    return;
	  }

	  subvalue = intro + subvalue;

	  if (type === T_LINK && self.inLink) {
	    return null;
	  }

	  /* istanbul ignore if - never used (yet) */
	  if (silent) {
	    return true;
	  }

	  if (type === T_FOOTNOTE && content.indexOf(' ') !== -1) {
	    return eat(subvalue)({
	      type: 'footnote',
	      children: this.tokenizeInline(content, eat.now())
	    });
	  }

	  now = eat.now();
	  now.column += intro.length;
	  now.offset += intro.length;
	  identifier = referenceType === REFERENCE_TYPE_FULL ? identifier : content;

	  node = {
	    type: type + 'Reference',
	    identifier: normalize(identifier)
	  };

	  if (type === T_LINK || type === T_IMAGE) {
	    node.referenceType = referenceType;
	  }

	  if (type === T_LINK) {
	    exit = self.enterLink();
	    node.children = self.tokenizeInline(content, now);
	    exit();
	  } else if (type === T_IMAGE) {
	    node.alt = self.decode.raw(self.unescape(content), now) || null;
	  }

	  return eat(subvalue)(node);
	}
	return reference_1;
}

var strong;
var hasRequiredStrong$1;

function requireStrong$1 () {
	if (hasRequiredStrong$1) return strong;
	hasRequiredStrong$1 = 1;

	strong = locate;

	function locate(value, fromIndex) {
	  var asterisk = value.indexOf('**', fromIndex);
	  var underscore = value.indexOf('__', fromIndex);

	  if (underscore === -1) {
	    return asterisk;
	  }

	  if (asterisk === -1) {
	    return underscore;
	  }

	  return underscore < asterisk ? underscore : asterisk;
	}
	return strong;
}

var strong_1;
var hasRequiredStrong;

function requireStrong () {
	if (hasRequiredStrong) return strong_1;
	hasRequiredStrong = 1;

	var trim = requireTrim();
	var whitespace = requireIsWhitespaceCharacter();
	var locate = requireStrong$1();

	strong_1 = strong;
	strong.locator = locate;

	var C_ASTERISK = '*';
	var C_UNDERSCORE = '_';

	function strong(eat, value, silent) {
	  var self = this;
	  var index = 0;
	  var character = value.charAt(index);
	  var now;
	  var pedantic;
	  var marker;
	  var queue;
	  var subvalue;
	  var length;
	  var prev;

	  if (
	    (character !== C_ASTERISK && character !== C_UNDERSCORE) ||
	    value.charAt(++index) !== character
	  ) {
	    return;
	  }

	  pedantic = self.options.pedantic;
	  marker = character;
	  subvalue = marker + marker;
	  length = value.length;
	  index++;
	  queue = '';
	  character = '';

	  if (pedantic && whitespace(value.charAt(index))) {
	    return;
	  }

	  while (index < length) {
	    prev = character;
	    character = value.charAt(index);

	    if (
	      character === marker &&
	      value.charAt(index + 1) === marker &&
	      (!pedantic || !whitespace(prev))
	    ) {
	      character = value.charAt(index + 2);

	      if (character !== marker) {
	        if (!trim(queue)) {
	          return;
	        }

	        /* istanbul ignore if - never used (yet) */
	        if (silent) {
	          return true;
	        }

	        now = eat.now();
	        now.column += 2;
	        now.offset += 2;

	        return eat(subvalue + queue + subvalue)({
	          type: 'strong',
	          children: self.tokenizeInline(queue, now)
	        });
	      }
	    }

	    if (!pedantic && character === '\\') {
	      queue += character;
	      character = value.charAt(++index);
	    }

	    queue += character;
	    index++;
	  }
	}
	return strong_1;
}

var isWordCharacter;
var hasRequiredIsWordCharacter;

function requireIsWordCharacter () {
	if (hasRequiredIsWordCharacter) return isWordCharacter;
	hasRequiredIsWordCharacter = 1;

	isWordCharacter = wordCharacter;

	var fromCode = String.fromCharCode;
	var re = /\w/;

	// Check if the given character code, or the character code at the first
	// character, is a word character.
	function wordCharacter(character) {
	  return re.test(
	    typeof character === 'number' ? fromCode(character) : character.charAt(0)
	  )
	}
	return isWordCharacter;
}

var emphasis;
var hasRequiredEmphasis$1;

function requireEmphasis$1 () {
	if (hasRequiredEmphasis$1) return emphasis;
	hasRequiredEmphasis$1 = 1;

	emphasis = locate;

	function locate(value, fromIndex) {
	  var asterisk = value.indexOf('*', fromIndex);
	  var underscore = value.indexOf('_', fromIndex);

	  if (underscore === -1) {
	    return asterisk;
	  }

	  if (asterisk === -1) {
	    return underscore;
	  }

	  return underscore < asterisk ? underscore : asterisk;
	}
	return emphasis;
}

var emphasis_1;
var hasRequiredEmphasis;

function requireEmphasis () {
	if (hasRequiredEmphasis) return emphasis_1;
	hasRequiredEmphasis = 1;

	var trim = requireTrim();
	var word = requireIsWordCharacter();
	var whitespace = requireIsWhitespaceCharacter();
	var locate = requireEmphasis$1();

	emphasis_1 = emphasis;
	emphasis.locator = locate;

	var C_ASTERISK = '*';
	var C_UNDERSCORE = '_';

	function emphasis(eat, value, silent) {
	  var self = this;
	  var index = 0;
	  var character = value.charAt(index);
	  var now;
	  var pedantic;
	  var marker;
	  var queue;
	  var subvalue;
	  var length;
	  var prev;

	  if (character !== C_ASTERISK && character !== C_UNDERSCORE) {
	    return;
	  }

	  pedantic = self.options.pedantic;
	  subvalue = character;
	  marker = character;
	  length = value.length;
	  index++;
	  queue = '';
	  character = '';

	  if (pedantic && whitespace(value.charAt(index))) {
	    return;
	  }

	  while (index < length) {
	    prev = character;
	    character = value.charAt(index);

	    if (character === marker && (!pedantic || !whitespace(prev))) {
	      character = value.charAt(++index);

	      if (character !== marker) {
	        if (!trim(queue) || prev === marker) {
	          return;
	        }

	        if (!pedantic && marker === C_UNDERSCORE && word(character)) {
	          queue += marker;
	          continue;
	        }

	        /* istanbul ignore if - never used (yet) */
	        if (silent) {
	          return true;
	        }

	        now = eat.now();
	        now.column++;
	        now.offset++;

	        return eat(subvalue + queue + marker)({
	          type: 'emphasis',
	          children: self.tokenizeInline(queue, now)
	        });
	      }

	      queue += marker;
	    }

	    if (!pedantic && character === '\\') {
	      queue += character;
	      character = value.charAt(++index);
	    }

	    queue += character;
	    index++;
	  }
	}
	return emphasis_1;
}

var _delete$1;
var hasRequired_delete$1;

function require_delete$1 () {
	if (hasRequired_delete$1) return _delete$1;
	hasRequired_delete$1 = 1;

	_delete$1 = locate;

	function locate(value, fromIndex) {
	  return value.indexOf('~~', fromIndex);
	}
	return _delete$1;
}

var _delete;
var hasRequired_delete;

function require_delete () {
	if (hasRequired_delete) return _delete;
	hasRequired_delete = 1;

	var whitespace = requireIsWhitespaceCharacter();
	var locate = require_delete$1();

	_delete = strikethrough;
	strikethrough.locator = locate;

	var C_TILDE = '~';
	var DOUBLE = '~~';

	function strikethrough(eat, value, silent) {
	  var self = this;
	  var character = '';
	  var previous = '';
	  var preceding = '';
	  var subvalue = '';
	  var index;
	  var length;
	  var now;

	  if (
	    !self.options.gfm ||
	    value.charAt(0) !== C_TILDE ||
	    value.charAt(1) !== C_TILDE ||
	    whitespace(value.charAt(2))
	  ) {
	    return;
	  }

	  index = 1;
	  length = value.length;
	  now = eat.now();
	  now.column += 2;
	  now.offset += 2;

	  while (++index < length) {
	    character = value.charAt(index);

	    if (
	      character === C_TILDE &&
	      previous === C_TILDE &&
	      (!preceding || !whitespace(preceding))
	    ) {
	      /* istanbul ignore if - never used (yet) */
	      if (silent) {
	        return true;
	      }

	      return eat(DOUBLE + subvalue + DOUBLE)({
	        type: 'delete',
	        children: self.tokenizeInline(subvalue, now)
	      });
	    }

	    subvalue += previous;
	    preceding = previous;
	    previous = character;
	  }
	}
	return _delete;
}

var codeInline$1;
var hasRequiredCodeInline$1;

function requireCodeInline$1 () {
	if (hasRequiredCodeInline$1) return codeInline$1;
	hasRequiredCodeInline$1 = 1;

	codeInline$1 = locate;

	function locate(value, fromIndex) {
	  return value.indexOf('`', fromIndex);
	}
	return codeInline$1;
}

var codeInline;
var hasRequiredCodeInline;

function requireCodeInline () {
	if (hasRequiredCodeInline) return codeInline;
	hasRequiredCodeInline = 1;

	var whitespace = requireIsWhitespaceCharacter();
	var locate = requireCodeInline$1();

	codeInline = inlineCode;
	inlineCode.locator = locate;

	var C_TICK = '`';

	/* Tokenise inline code. */
	function inlineCode(eat, value, silent) {
	  var length = value.length;
	  var index = 0;
	  var queue = '';
	  var tickQueue = '';
	  var contentQueue;
	  var subqueue;
	  var count;
	  var openingCount;
	  var subvalue;
	  var character;
	  var found;
	  var next;

	  while (index < length) {
	    if (value.charAt(index) !== C_TICK) {
	      break;
	    }

	    queue += C_TICK;
	    index++;
	  }

	  if (!queue) {
	    return;
	  }

	  subvalue = queue;
	  openingCount = index;
	  queue = '';
	  next = value.charAt(index);
	  count = 0;

	  while (index < length) {
	    character = next;
	    next = value.charAt(index + 1);

	    if (character === C_TICK) {
	      count++;
	      tickQueue += character;
	    } else {
	      count = 0;
	      queue += character;
	    }

	    if (count && next !== C_TICK) {
	      if (count === openingCount) {
	        subvalue += queue + tickQueue;
	        found = true;
	        break;
	      }

	      queue += tickQueue;
	      tickQueue = '';
	    }

	    index++;
	  }

	  if (!found) {
	    if (openingCount % 2 !== 0) {
	      return;
	    }

	    queue = '';
	  }

	  /* istanbul ignore if - never used (yet) */
	  if (silent) {
	    return true;
	  }

	  contentQueue = '';
	  subqueue = '';
	  length = queue.length;
	  index = -1;

	  while (++index < length) {
	    character = queue.charAt(index);

	    if (whitespace(character)) {
	      subqueue += character;
	      continue;
	    }

	    if (subqueue) {
	      if (contentQueue) {
	        contentQueue += subqueue;
	      }

	      subqueue = '';
	    }

	    contentQueue += character;
	  }

	  return eat(subvalue)({
	    type: 'inlineCode',
	    value: contentQueue
	  });
	}
	return codeInline;
}

var _break$1;
var hasRequired_break$1;

function require_break$1 () {
	if (hasRequired_break$1) return _break$1;
	hasRequired_break$1 = 1;

	_break$1 = locate;

	function locate(value, fromIndex) {
	  var index = value.indexOf('\n', fromIndex);

	  while (index > fromIndex) {
	    if (value.charAt(index - 1) !== ' ') {
	      break;
	    }

	    index--;
	  }

	  return index;
	}
	return _break$1;
}

var _break;
var hasRequired_break;

function require_break () {
	if (hasRequired_break) return _break;
	hasRequired_break = 1;

	var locate = require_break$1();

	_break = hardBreak;
	hardBreak.locator = locate;

	var MIN_BREAK_LENGTH = 2;

	function hardBreak(eat, value, silent) {
	  var length = value.length;
	  var index = -1;
	  var queue = '';
	  var character;

	  while (++index < length) {
	    character = value.charAt(index);

	    if (character === '\n') {
	      if (index < MIN_BREAK_LENGTH) {
	        return;
	      }

	      /* istanbul ignore if - never used (yet) */
	      if (silent) {
	        return true;
	      }

	      queue += character;

	      return eat(queue)({type: 'break'});
	    }

	    if (character !== ' ') {
	      return;
	    }

	    queue += character;
	  }
	}
	return _break;
}

var text_1;
var hasRequiredText;

function requireText () {
	if (hasRequiredText) return text_1;
	hasRequiredText = 1;

	text_1 = text;

	function text(eat, value, silent) {
	  var self = this;
	  var methods;
	  var tokenizers;
	  var index;
	  var length;
	  var subvalue;
	  var position;
	  var tokenizer;
	  var name;
	  var min;
	  var now;

	  /* istanbul ignore if - never used (yet) */
	  if (silent) {
	    return true;
	  }

	  methods = self.inlineMethods;
	  length = methods.length;
	  tokenizers = self.inlineTokenizers;
	  index = -1;
	  min = value.length;

	  while (++index < length) {
	    name = methods[index];

	    if (name === 'text' || !tokenizers[name]) {
	      continue;
	    }

	    tokenizer = tokenizers[name].locator;

	    if (!tokenizer) {
	      eat.file.fail('Missing locator: `' + name + '`');
	    }

	    position = tokenizer.call(self, value, 1);

	    if (position !== -1 && position < min) {
	      min = position;
	    }
	  }

	  subvalue = value.slice(0, min);
	  now = eat.now();

	  self.decode(subvalue, now, function (content, position, source) {
	    eat(source || content)({
	      type: 'text',
	      value: content
	    });
	  });
	}
	return text_1;
}

var parser;
var hasRequiredParser;

function requireParser () {
	if (hasRequiredParser) return parser;
	hasRequiredParser = 1;

	var xtend = requireImmutable();
	var toggle = requireStateToggle();
	var vfileLocation = requireVfileLocation();
	var unescape = require_unescape();
	var decode = requireDecode();
	var tokenizer = requireTokenizer();

	parser = Parser;

	function Parser(doc, file) {
	  this.file = file;
	  this.offset = {};
	  this.options = xtend(this.options);
	  this.setOptions({});

	  this.inList = false;
	  this.inBlock = false;
	  this.inLink = false;
	  this.atStart = true;

	  this.toOffset = vfileLocation(file).toOffset;
	  this.unescape = unescape(this, 'escape');
	  this.decode = decode(this);
	}

	var proto = Parser.prototype;

	/* Expose core. */
	proto.setOptions = requireSetOptions();
	proto.parse = requireParse();

	/* Expose `defaults`. */
	proto.options = requireDefaults();

	/* Enter and exit helpers. */
	proto.exitStart = toggle('atStart', true);
	proto.enterList = toggle('inList', false);
	proto.enterLink = toggle('inLink', false);
	proto.enterBlock = toggle('inBlock', false);

	/* Nodes that can interupt a paragraph:
	 *
	 * ```markdown
	 * A paragraph, followed by a thematic break.
	 * ___
	 * ```
	 *
	 * In the above example, the thematic break “interupts”
	 * the paragraph. */
	proto.interruptParagraph = [
	  ['thematicBreak'],
	  ['atxHeading'],
	  ['fencedCode'],
	  ['blockquote'],
	  ['html'],
	  ['setextHeading', {commonmark: false}],
	  ['definition', {commonmark: false}],
	  ['footnote', {commonmark: false}]
	];

	/* Nodes that can interupt a list:
	 *
	 * ```markdown
	 * - One
	 * ___
	 * ```
	 *
	 * In the above example, the thematic break “interupts”
	 * the list. */
	proto.interruptList = [
	  ['atxHeading', {pedantic: false}],
	  ['fencedCode', {pedantic: false}],
	  ['thematicBreak', {pedantic: false}],
	  ['definition', {commonmark: false}],
	  ['footnote', {commonmark: false}]
	];

	/* Nodes that can interupt a blockquote:
	 *
	 * ```markdown
	 * > A paragraph.
	 * ___
	 * ```
	 *
	 * In the above example, the thematic break “interupts”
	 * the blockquote. */
	proto.interruptBlockquote = [
	  ['indentedCode', {commonmark: true}],
	  ['fencedCode', {commonmark: true}],
	  ['atxHeading', {commonmark: true}],
	  ['setextHeading', {commonmark: true}],
	  ['thematicBreak', {commonmark: true}],
	  ['html', {commonmark: true}],
	  ['list', {commonmark: true}],
	  ['definition', {commonmark: false}],
	  ['footnote', {commonmark: false}]
	];

	/* Handlers. */
	proto.blockTokenizers = {
	  newline: requireNewline(),
	  indentedCode: requireCodeIndented(),
	  fencedCode: requireCodeFenced(),
	  blockquote: requireBlockquote(),
	  atxHeading: requireHeadingAtx(),
	  thematicBreak: requireThematicBreak(),
	  list: requireList(),
	  setextHeading: requireHeadingSetext(),
	  html: requireHtmlBlock(),
	  footnote: requireFootnoteDefinition(),
	  definition: requireDefinition(),
	  table: requireTable(),
	  paragraph: requireParagraph()
	};

	proto.inlineTokenizers = {
	  escape: require_escape(),
	  autoLink: requireAutoLink(),
	  url: requireUrl(),
	  html: requireHtmlInline(),
	  link: requireLink(),
	  reference: requireReference(),
	  strong: requireStrong(),
	  emphasis: requireEmphasis(),
	  deletion: require_delete(),
	  code: requireCodeInline(),
	  break: require_break(),
	  text: requireText()
	};

	/* Expose precedence. */
	proto.blockMethods = keys(proto.blockTokenizers);
	proto.inlineMethods = keys(proto.inlineTokenizers);

	/* Tokenizers. */
	proto.tokenizeBlock = tokenizer('block');
	proto.tokenizeInline = tokenizer('inline');
	proto.tokenizeFactory = tokenizer;

	/* Get all keys in `value`. */
	function keys(value) {
	  var result = [];
	  var key;

	  for (key in value) {
	    result.push(key);
	  }

	  return result;
	}
	return parser;
}

var remarkParse;
var hasRequiredRemarkParse;

function requireRemarkParse () {
	if (hasRequiredRemarkParse) return remarkParse;
	hasRequiredRemarkParse = 1;

	var unherit = requireUnherit();
	var xtend = requireImmutable();
	var Parser = requireParser();

	remarkParse = parse;
	parse.Parser = Parser;

	function parse(options) {
	  var Local = unherit(Parser);
	  Local.prototype.options = xtend(Local.prototype.options, this.data('settings'), options);
	  this.Parser = Local;
	}
	return remarkParse;
}

var unistUtilVisitParents;
var hasRequiredUnistUtilVisitParents;

function requireUnistUtilVisitParents () {
	if (hasRequiredUnistUtilVisitParents) return unistUtilVisitParents;
	hasRequiredUnistUtilVisitParents = 1;

	/* Expose. */
	unistUtilVisitParents = visitParents;

	/* Visit. */
	function visitParents(tree, type, visitor) {
	  var stack = [];

	  if (typeof type === 'function') {
	    visitor = type;
	    type = null;
	  }

	  one(tree);

	  /* Visit a single node. */
	  function one(node) {
	    var result;

	    if (!type || node.type === type) {
	      result = visitor(node, stack.concat());
	    }

	    if (node.children && result !== false) {
	      return all(node.children, node)
	    }

	    return result
	  }

	  /* Visit children in `parent`. */
	  function all(children, parent) {
	    var length = children.length;
	    var index = -1;
	    var child;

	    stack.push(parent);

	    while (++index < length) {
	      child = children[index];

	      if (child && one(child) === false) {
	        return false
	      }
	    }

	    stack.pop();

	    return true
	  }
	}
	return unistUtilVisitParents;
}

var mdastAddListMetadata;
var hasRequiredMdastAddListMetadata;

function requireMdastAddListMetadata () {
	if (hasRequiredMdastAddListMetadata) return mdastAddListMetadata;
	hasRequiredMdastAddListMetadata = 1;
	var visitWithParents = requireUnistUtilVisitParents();

	function addListMetadata() {
	  return function (ast) {
	    visitWithParents(ast, 'list', function (listNode, parents) {
	      var depth = 0, i, n;
	      for (i = 0, n = parents.length; i < n; i++) {
	        if (parents[i].type === 'list') depth += 1;
	      }
	      for (i = 0, n = listNode.children.length; i < n; i++) {
	        var child = listNode.children[i];
	        child.index = i;
	        child.ordered = listNode.ordered;
	      }
	      listNode.depth = depth;
	    });
	    return ast;
	  };
	}

	mdastAddListMetadata = addListMetadata;
	return mdastAddListMetadata;
}

var naiveHtml;
var hasRequiredNaiveHtml;

function requireNaiveHtml () {
	if (hasRequiredNaiveHtml) return naiveHtml;
	hasRequiredNaiveHtml = 1;

	/**
	 * Naive, simple plugin to match inline nodes without attributes
	 * This allows say <strong>foo</strong>, but not <strong class="very">foo</strong>
	 * For proper HTML support, you'll want a different plugin
	 **/
	var visit = requireUnistUtilVisit();

	var type = 'virtualHtml';
	var selfClosingRe = /^<(area|base|br|col|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)\s*\/?>$/i;
	var simpleTagRe = /^<(\/?)([a-z]+)\s*>$/;

	naiveHtml = function (tree) {
	  var open;
	  var currentParent;
	  visit(tree, 'html', function (node, index, parent) {
	    if (currentParent !== parent) {
	      open = [];
	      currentParent = parent;
	    }

	    var selfClosing = getSelfClosing(node);

	    if (selfClosing) {
	      parent.children.splice(index, 1, {
	        type: type,
	        tag: selfClosing,
	        position: node.position
	      });
	      return true;
	    }

	    var current = getSimpleTag(node);

	    if (!current) {
	      return true;
	    }

	    var matching = findAndPull(open, current.tag);

	    if (matching) {
	      parent.children.splice(index, 0, virtual(current, matching, parent));
	    } else if (!current.opening) {
	      open.push(current);
	    }

	    return true;
	  }, true // Iterate in reverse
	  );
	  return tree;
	};

	function findAndPull(open, matchingTag) {
	  var i = open.length;

	  while (i--) {
	    if (open[i].tag === matchingTag) {
	      return open.splice(i, 1)[0];
	    }
	  }

	  return false;
	}

	function getSimpleTag(node, parent) {
	  var match = node.value.match(simpleTagRe);
	  return match ? {
	    tag: match[2],
	    opening: !match[1],
	    node: node
	  } : false;
	}

	function getSelfClosing(node) {
	  var match = node.value.match(selfClosingRe);
	  return match ? match[1] : false;
	}

	function virtual(fromNode, toNode, parent) {
	  var fromIndex = parent.children.indexOf(fromNode.node);
	  var toIndex = parent.children.indexOf(toNode.node);
	  var extracted = parent.children.splice(fromIndex, toIndex - fromIndex + 1);
	  var children = extracted.slice(1, -1);
	  return {
	    type: type,
	    children: children,
	    tag: fromNode.tag,
	    position: {
	      start: fromNode.node.position.start,
	      end: toNode.node.position.end,
	      indent: []
	    }
	  };
	}
	return naiveHtml;
}

var disallowNode = {};

var hasRequiredDisallowNode;

function requireDisallowNode () {
	if (hasRequiredDisallowNode) return disallowNode;
	hasRequiredDisallowNode = 1;

	var visit = requireUnistUtilVisit();

	disallowNode.ofType = function (types, mode) {
	  return function (node) {
	    types.forEach(function (type) {
	      return visit(node, type, disallow, true);
	    });
	    return node;
	  };

	  function disallow(node, index, parent) {
	    if (parent) {
	      untangle(node, index, parent, mode);
	    }
	  }
	};

	disallowNode.ifNotMatch = function (allowNode, mode) {
	  return function (node) {
	    visit(node, disallow, true);
	    return node;
	  };

	  function disallow(node, index, parent) {
	    if (parent && !allowNode(node, index, parent)) {
	      untangle(node, index, parent, mode);
	    }
	  }
	};

	function untangle(node, index, parent, mode) {
	  if (mode === 'remove') {
	    parent.children.splice(index, 1);
	  } else if (mode === 'unwrap') {
	    var args = [index, 1];

	    if (node.children) {
	      args = args.concat(node.children);
	    }

	    Array.prototype.splice.apply(parent.children, args);
	  }
	}
	return disallowNode;
}

var astToReact_1;
var hasRequiredAstToReact;

function requireAstToReact () {
	if (hasRequiredAstToReact) return astToReact_1;
	hasRequiredAstToReact = 1;

	var React$1 = React;

	var xtend = requireImmutable();

	function astToReact(node, options) {
	  var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
	  var renderer = options.renderers[node.type];
	  var pos = node.position.start;
	  var key = [node.type, pos.line, pos.column].join('-');

	  if (typeof renderer !== 'function' && typeof renderer !== 'string' && !isReactFragment(renderer)) {
	    throw new Error("Renderer for type `".concat(node.type, "` not defined or is not renderable"));
	  }

	  var nodeProps = getNodeProps(node, key, options, renderer, parent, index);
	  return React$1.createElement(renderer, nodeProps, nodeProps.children || resolveChildren() || undefined);

	  function resolveChildren() {
	    return node.children && node.children.map(function (childNode, i) {
	      return astToReact(childNode, options, {
	        node: node,
	        props: nodeProps
	      }, i);
	    });
	  }
	}

	function isReactFragment(renderer) {
	  return React$1.Fragment && React$1.Fragment === renderer;
	} // eslint-disable-next-line max-params, complexity


	function getNodeProps(node, key, opts, renderer, parent, index) {
	  var props = {
	    key: key
	  };
	  var isTagRenderer = typeof renderer === 'string'; // `sourcePos` is true if the user wants source information (line/column info from markdown source)

	  if (opts.sourcePos && node.position) {
	    props['data-sourcepos'] = flattenPosition(node.position);
	  }

	  if (opts.rawSourcePos && !isTagRenderer) {
	    props.sourcePosition = node.position;
	  } // If `includeNodeIndex` is true, pass node index info to all non-tag renderers


	  if (opts.includeNodeIndex && parent.node && parent.node.children && !isTagRenderer) {
	    props.index = parent.node.children.indexOf(node);
	    props.parentChildCount = parent.node.children.length;
	  }

	  var ref = node.identifier !== null && node.identifier !== undefined ? opts.definitions[node.identifier] || {} : null;

	  switch (node.type) {
	    case 'root':
	      assignDefined(props, {
	        className: opts.className
	      });
	      break;

	    case 'text':
	      props.nodeKey = key;
	      props.children = node.value;
	      break;

	    case 'heading':
	      props.level = node.depth;
	      break;

	    case 'list':
	      props.start = node.start;
	      props.ordered = node.ordered;
	      props.tight = !node.loose;
	      props.depth = node.depth;
	      break;

	    case 'listItem':
	      props.checked = node.checked;
	      props.tight = !node.loose;
	      props.ordered = node.ordered;
	      props.index = node.index;
	      props.children = getListItemChildren(node, parent).map(function (childNode, i) {
	        return astToReact(childNode, opts, {
	          node: node,
	          props: props
	        }, i);
	      });
	      break;

	    case 'definition':
	      assignDefined(props, {
	        identifier: node.identifier,
	        title: node.title,
	        url: node.url
	      });
	      break;

	    case 'code':
	      assignDefined(props, {
	        language: node.lang && node.lang.split(/\s/, 1)[0]
	      });
	      break;

	    case 'inlineCode':
	      props.children = node.value;
	      props.inline = true;
	      break;

	    case 'link':
	      assignDefined(props, {
	        title: node.title || undefined,
	        target: typeof opts.linkTarget === 'function' ? opts.linkTarget(node.url, node.children, node.title) : opts.linkTarget,
	        href: opts.transformLinkUri ? opts.transformLinkUri(node.url, node.children, node.title) : node.url
	      });
	      break;

	    case 'image':
	      assignDefined(props, {
	        alt: node.alt || undefined,
	        title: node.title || undefined,
	        src: opts.transformImageUri ? opts.transformImageUri(node.url, node.children, node.title, node.alt) : node.url
	      });
	      break;

	    case 'linkReference':
	      assignDefined(props, xtend(ref, {
	        href: opts.transformLinkUri ? opts.transformLinkUri(ref.href) : ref.href
	      }));
	      break;

	    case 'imageReference':
	      assignDefined(props, {
	        src: opts.transformImageUri && ref.href ? opts.transformImageUri(ref.href, node.children, ref.title, node.alt) : ref.href,
	        title: ref.title || undefined,
	        alt: node.alt || undefined
	      });
	      break;

	    case 'table':
	    case 'tableHead':
	    case 'tableBody':
	      props.columnAlignment = node.align;
	      break;

	    case 'tableRow':
	      props.isHeader = parent.node.type === 'tableHead';
	      props.columnAlignment = parent.props.columnAlignment;
	      break;

	    case 'tableCell':
	      assignDefined(props, {
	        isHeader: parent.props.isHeader,
	        align: parent.props.columnAlignment[index]
	      });
	      break;

	    case 'virtualHtml':
	      props.tag = node.tag;
	      break;

	    case 'html':
	      // @todo find a better way than this
	      props.isBlock = node.position.start.line !== node.position.end.line;
	      props.escapeHtml = opts.escapeHtml;
	      props.skipHtml = opts.skipHtml;
	      break;

	    case 'parsedHtml':
	      {
	        var parsedChildren;

	        if (node.children) {
	          parsedChildren = node.children.map(function (child, i) {
	            return astToReact(child, opts, {
	              node: node,
	              props: props
	            }, i);
	          });
	        }

	        props.escapeHtml = opts.escapeHtml;
	        props.skipHtml = opts.skipHtml;
	        props.element = mergeNodeChildren(node, parsedChildren);
	        break;
	      }

	    default:
	      assignDefined(props, xtend(node, {
	        type: undefined,
	        position: undefined,
	        children: undefined
	      }));
	  }

	  if (!isTagRenderer && node.value) {
	    props.value = node.value;
	  }

	  return props;
	}

	function assignDefined(target, attrs) {
	  for (var key in attrs) {
	    if (typeof attrs[key] !== 'undefined') {
	      target[key] = attrs[key];
	    }
	  }
	}

	function mergeNodeChildren(node, parsedChildren) {
	  var el = node.element;

	  if (Array.isArray(el)) {
	    var Fragment = React$1.Fragment || 'div';
	    return React$1.createElement(Fragment, null, el);
	  }

	  if (el.props.children || parsedChildren) {
	    var children = React$1.Children.toArray(el.props.children).concat(parsedChildren);
	    return React$1.cloneElement(el, null, children);
	  }

	  return React$1.cloneElement(el, null);
	}

	function flattenPosition(pos) {
	  return [pos.start.line, ':', pos.start.column, '-', pos.end.line, ':', pos.end.column].map(String).join('');
	}

	function getListItemChildren(node, parent) {
	  if (node.loose) {
	    return node.children;
	  }

	  if (parent.node && node.index > 0 && parent.node.children[node.index - 1].loose) {
	    return node.children;
	  }

	  return unwrapParagraphs(node);
	}

	function unwrapParagraphs(node) {
	  return node.children.reduce(function (array, child) {
	    return array.concat(child.type === 'paragraph' ? child.children || [] : [child]);
	  }, []);
	}

	astToReact_1 = astToReact;
	return astToReact_1;
}

var wrapTableRows;
var hasRequiredWrapTableRows;

function requireWrapTableRows () {
	if (hasRequiredWrapTableRows) return wrapTableRows;
	hasRequiredWrapTableRows = 1;

	var visit = requireUnistUtilVisit();

	wrapTableRows = function (node) {
	  visit(node, 'table', wrap);
	  return node;
	};

	function wrap(table) {
	  var children = table.children;
	  table.children = [{
	    type: 'tableHead',
	    align: table.align,
	    children: [children[0]],
	    position: children[0].position
	  }];

	  if (children.length > 1) {
	    table.children.push({
	      type: 'tableBody',
	      align: table.align,
	      children: children.slice(1),
	      position: {
	        start: children[1].position.start,
	        end: children[children.length - 1].position.end
	      }
	    });
	  }
	}
	return wrapTableRows;
}

var getDefinitions;
var hasRequiredGetDefinitions;

function requireGetDefinitions () {
	if (hasRequiredGetDefinitions) return getDefinitions;
	hasRequiredGetDefinitions = 1;

	getDefinitions = function getDefinitions(node) {
	  var defs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  return (node.children || []).reduce(function (definitions, child) {
	    if (child.type === 'definition') {
	      definitions[child.identifier] = {
	        href: child.url,
	        title: child.title
	      };
	    }

	    return getDefinitions(child, definitions);
	  }, defs);
	};
	return getDefinitions;
}

var uriTransformer;
var hasRequiredUriTransformer;

function requireUriTransformer () {
	if (hasRequiredUriTransformer) return uriTransformer;
	hasRequiredUriTransformer = 1;

	var protocols = ['http', 'https', 'mailto', 'tel'];

	uriTransformer = function uriTransformer(uri) {
	  var url = (uri || '').trim();
	  var first = url.charAt(0);

	  if (first === '#' || first === '/') {
	    return url;
	  }

	  var colon = url.indexOf(':');

	  if (colon === -1) {
	    return url;
	  }

	  var length = protocols.length;
	  var index = -1;

	  while (++index < length) {
	    var protocol = protocols[index];

	    if (colon === protocol.length && url.slice(0, protocol.length).toLowerCase() === protocol) {
	      return url;
	    }
	  }

	  index = url.indexOf('?');

	  if (index !== -1 && colon > index) {
	    return url;
	  }

	  index = url.indexOf('#');

	  if (index !== -1 && colon > index) {
	    return url;
	  } // eslint-disable-next-line no-script-url


	  return 'javascript:void(0)';
	};
	return uriTransformer;
}

/* eslint-disable react/prop-types, react/no-multi-comp */

var renderers;
var hasRequiredRenderers;

function requireRenderers () {
	if (hasRequiredRenderers) return renderers;
	hasRequiredRenderers = 1;

	var xtend = requireImmutable();

	var React$1 = React;

	var supportsStringRender = parseInt((React$1.version || '16').slice(0, 2), 10) >= 16;
	var createElement = React$1.createElement;
	renderers = {
	  break: 'br',
	  paragraph: 'p',
	  emphasis: 'em',
	  strong: 'strong',
	  thematicBreak: 'hr',
	  blockquote: 'blockquote',
	  delete: 'del',
	  link: 'a',
	  image: 'img',
	  linkReference: 'a',
	  imageReference: 'img',
	  table: SimpleRenderer.bind(null, 'table'),
	  tableHead: SimpleRenderer.bind(null, 'thead'),
	  tableBody: SimpleRenderer.bind(null, 'tbody'),
	  tableRow: SimpleRenderer.bind(null, 'tr'),
	  tableCell: TableCell,
	  root: Root,
	  text: TextRenderer,
	  list: List,
	  listItem: ListItem,
	  definition: NullRenderer,
	  heading: Heading,
	  inlineCode: InlineCode,
	  code: CodeBlock,
	  html: Html,
	  virtualHtml: VirtualHtml,
	  parsedHtml: ParsedHtml
	};

	function TextRenderer(props) {
	  return supportsStringRender ? props.children : createElement('span', null, props.children);
	}

	function Root(props) {
	  var useFragment = !props.className;
	  var root = useFragment ? React$1.Fragment || 'div' : 'div';
	  return createElement(root, useFragment ? null : props, props.children);
	}

	function SimpleRenderer(tag, props) {
	  return createElement(tag, getCoreProps(props), props.children);
	}

	function TableCell(props) {
	  var style = props.align ? {
	    textAlign: props.align
	  } : undefined;
	  var coreProps = getCoreProps(props);
	  return createElement(props.isHeader ? 'th' : 'td', style ? xtend({
	    style: style
	  }, coreProps) : coreProps, props.children);
	}

	function Heading(props) {
	  return createElement("h".concat(props.level), getCoreProps(props), props.children);
	}

	function List(props) {
	  var attrs = getCoreProps(props);

	  if (props.start !== null && props.start !== 1) {
	    attrs.start = props.start.toString();
	  }

	  return createElement(props.ordered ? 'ol' : 'ul', attrs, props.children);
	}

	function ListItem(props) {
	  var checkbox = null;

	  if (props.checked !== null) {
	    var checked = props.checked;
	    checkbox = createElement('input', {
	      type: 'checkbox',
	      checked: checked,
	      readOnly: true
	    });
	  }

	  return createElement('li', getCoreProps(props), checkbox, props.children);
	}

	function CodeBlock(props) {
	  var className = props.language && "language-".concat(props.language);
	  var code = createElement('code', className ? {
	    className: className
	  } : null, props.value);
	  return createElement('pre', getCoreProps(props), code);
	}

	function InlineCode(props) {
	  return createElement('code', getCoreProps(props), props.children);
	}

	function Html(props) {
	  if (props.skipHtml) {
	    return null;
	  }

	  var tag = props.isBlock ? 'div' : 'span';

	  if (props.escapeHtml) {
	    var comp = React$1.Fragment || tag;
	    return createElement(comp, null, props.value);
	  }

	  var nodeProps = {
	    dangerouslySetInnerHTML: {
	      __html: props.value
	    }
	  };
	  return createElement(tag, nodeProps);
	}

	function ParsedHtml(props) {
	  return props['data-sourcepos'] ? React$1.cloneElement(props.element, {
	    'data-sourcepos': props['data-sourcepos']
	  }) : props.element;
	}

	function VirtualHtml(props) {
	  return createElement(props.tag, getCoreProps(props), props.children);
	}

	function NullRenderer() {
	  return null;
	}

	function getCoreProps(props) {
	  return props['data-sourcepos'] ? {
	    'data-sourcepos': props['data-sourcepos']
	  } : {};
	}
	return renderers;
}

var symbols = {};

var hasRequiredSymbols;

function requireSymbols () {
	if (hasRequiredSymbols) return symbols;
	hasRequiredSymbols = 1;

	var HtmlParser = '__RMD_HTML_PARSER__';
	symbols.HtmlParser = typeof Symbol === 'undefined' ? HtmlParser : Symbol(HtmlParser);
	return symbols;
}

var reactMarkdown;
var hasRequiredReactMarkdown;

function requireReactMarkdown () {
	if (hasRequiredReactMarkdown) return reactMarkdown;
	hasRequiredReactMarkdown = 1;

	function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

	function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

	function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

	function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

	var xtend = requireImmutable();

	var unified = requireUnified();

	var parse = requireRemarkParse();

	var PropTypes$1 = PropTypes;

	var addListMetadata = requireMdastAddListMetadata();

	var naiveHtml = requireNaiveHtml();

	var disallowNode = requireDisallowNode();

	var astToReact = requireAstToReact();

	var wrapTableRows = requireWrapTableRows();

	var getDefinitions = requireGetDefinitions();

	var uriTransformer = requireUriTransformer();

	var defaultRenderers = requireRenderers();

	var symbols = requireSymbols();

	var allTypes = Object.keys(defaultRenderers);

	var ReactMarkdown = function ReactMarkdown(props) {
	  var src = props.source || props.children || '';
	  var parserOptions = props.parserOptions;

	  if (props.allowedTypes && props.disallowedTypes) {
	    throw new Error('Only one of `allowedTypes` and `disallowedTypes` should be defined');
	  }

	  var renderers = xtend(defaultRenderers, props.renderers);
	  var plugins = [[parse, parserOptions]].concat(props.plugins || []);
	  var parser = plugins.reduce(applyParserPlugin, unified());
	  var rawAst = parser.parse(src);
	  var renderProps = xtend(props, {
	    renderers: renderers,
	    definitions: getDefinitions(rawAst)
	  });
	  var astPlugins = determineAstPlugins(props);
	  var ast = astPlugins.reduce(function (node, plugin) {
	    return plugin(node, renderProps);
	  }, rawAst);
	  return astToReact(ast, renderProps);
	};

	function applyParserPlugin(parser, plugin) {
	  return Array.isArray(plugin) ? parser.use.apply(parser, _toConsumableArray(plugin)) : parser.use(plugin);
	}

	function determineAstPlugins(props) {
	  var plugins = [wrapTableRows, addListMetadata()];
	  var disallowedTypes = props.disallowedTypes;

	  if (props.allowedTypes) {
	    disallowedTypes = allTypes.filter(function (type) {
	      return type !== 'root' && props.allowedTypes.indexOf(type) === -1;
	    });
	  }

	  var removalMethod = props.unwrapDisallowed ? 'unwrap' : 'remove';

	  if (disallowedTypes && disallowedTypes.length > 0) {
	    plugins.push(disallowNode.ofType(disallowedTypes, removalMethod));
	  }

	  if (props.allowNode) {
	    plugins.push(disallowNode.ifNotMatch(props.allowNode, removalMethod));
	  }

	  var renderHtml = !props.escapeHtml && !props.skipHtml;
	  var hasHtmlParser = (props.astPlugins || []).some(function (item) {
	    var plugin = Array.isArray(item) ? item[0] : item;
	    return plugin.identity === symbols.HtmlParser;
	  });

	  if (renderHtml && !hasHtmlParser) {
	    plugins.push(naiveHtml);
	  }

	  return props.astPlugins ? plugins.concat(props.astPlugins) : plugins;
	}

	ReactMarkdown.defaultProps = {
	  renderers: {},
	  escapeHtml: true,
	  skipHtml: false,
	  sourcePos: false,
	  rawSourcePos: false,
	  transformLinkUri: uriTransformer,
	  astPlugins: [],
	  plugins: [],
	  parserOptions: {}
	};
	ReactMarkdown.propTypes = {
	  className: PropTypes$1.string,
	  source: PropTypes$1.string,
	  children: PropTypes$1.string,
	  sourcePos: PropTypes$1.bool,
	  rawSourcePos: PropTypes$1.bool,
	  escapeHtml: PropTypes$1.bool,
	  skipHtml: PropTypes$1.bool,
	  allowNode: PropTypes$1.func,
	  allowedTypes: PropTypes$1.arrayOf(PropTypes$1.oneOf(allTypes)),
	  disallowedTypes: PropTypes$1.arrayOf(PropTypes$1.oneOf(allTypes)),
	  transformLinkUri: PropTypes$1.oneOfType([PropTypes$1.func, PropTypes$1.bool]),
	  linkTarget: PropTypes$1.oneOfType([PropTypes$1.func, PropTypes$1.string]),
	  transformImageUri: PropTypes$1.func,
	  astPlugins: PropTypes$1.arrayOf(PropTypes$1.func),
	  unwrapDisallowed: PropTypes$1.bool,
	  renderers: PropTypes$1.object,
	  plugins: PropTypes$1.array,
	  parserOptions: PropTypes$1.object
	};
	ReactMarkdown.types = allTypes;
	ReactMarkdown.renderers = defaultRenderers;
	ReactMarkdown.uriTransformer = uriTransformer;
	reactMarkdown = ReactMarkdown;
	return reactMarkdown;
}

var reactMarkdownExports = requireReactMarkdown();
var ReactMarkdown = /*@__PURE__*/getDefaultExportFromCjs(reactMarkdownExports);

function getMixOrPatchIn(_) {
  function mixOrPatchIn(name, method, chain) {
    if (!_[name]) {
      if (_.mixin) {
        var patch = {};
        patch[name] = method;
        _.mixin(patch, { chain: chain });
      } else {
        _[name] = method;
      }
    }
    return _;
  }
  return mixOrPatchIn;
}

var rxArrIndex = /\D/;
var rxVarName$1 = /^[a-zA-Z_$]+([\w_$]*)$/;
var rxQuot$1 = /"/g;

function joinPaths(...paths) {
  return paths.reduce(
    (acc, p) =>
      acc ? (!p || p.startsWith('[') ? `${acc}${p}` : `${acc}.${p}`) : p,
    ''
  );
}

function getPathToString(_) {
  function pathToString(path, ...prefixes) {
    prefixes = prefixes.filter((p) => p !== undefined);
    if (_.isString(path)) return joinPaths(...prefixes, path);
    if (!Array.isArray(path)) return undefined;
    prefixes = joinPaths(...prefixes);
    return path.reduce((acc, value) => {
      const type = typeof value;
      if (type === 'number') {
        if (value < 0 || value % 1 !== 0) {
          return `${acc}["${value}"]`;
        } else {
          return `${acc}[${value}]`;
        }
      } else if (type !== 'string') {
        return `${acc}["${value}"]`;
      } else if (!value) {
        return `${acc}[""]`;
      }
      if (!rxArrIndex.test(value)) {
        return `${acc}[${value}]`;
      }
      if (rxVarName$1.test(value)) {
        if (acc) {
          return `${acc}.${value}`;
        } else {
          return `${acc}${value}`;
        }
      }
      return `${acc}["${value.replace(rxQuot$1, '\\"')}"]`;
    }, prefixes);
  }
  return pathToString;
}

getPathToString.notChainable = true;

function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var rxVarName = /^[a-zA-Z_$]+([\w_$]*)$/;
var rxQuot = /"/g;
const has = Object.prototype.hasOwnProperty;

function getIterate(_) {
  const pathToString = getPathToString(_);

  function iterate(item) {
    const { options, obj, callback } = item;
    options.pathFormatArray = options.pathFormat == 'array';
    item.depth = 0;

    let broken = false;
    const breakIt = () => {
      broken = true;
      return false;
    };

    while (item) {
      if (broken) break;
      if (!item.inited) {
        item.inited = true;
        item.info = describeValue(item.value, options.ownPropertiesOnly);

        if (options.checkCircular) {
          item.circularParentIndex = -1;
          item.circularParent = null;
          item.isCircular = false;
          if (item.info.isObject && !item.info.isEmpty) {
            let parent = item.parent;
            while (parent) {
              if (parent.value === item.value) {
                item.isCircular = true;
                item.circularParent = parent;
                item.circularParentIndex = item.depth - parent.depth - 1;
                break;
              }
              parent = parent.parent;
            }
          }
        }

        item.children = [];
        if (options.childrenPath) {
          options.childrenPath.forEach((cp, i) => {
            const children = _.get(item.value, cp);
            const info = describeValue(children, options.ownPropertiesOnly);
            if (!info.isEmpty) {
              item.children.push([
                cp,
                options.strChildrenPath[i],
                children,
                info,
              ]);
            }
          });
        }

        item.isLeaf =
          item.isCircular ||
          (options.childrenPath !== undefined && !item.children.length) ||
          !item.info.isObject ||
          item.info.isEmpty;

        item.needCallback =
          (item.depth || options.includeRoot) &&
          (!options.leavesOnly || item.isLeaf);

        if (item.needCallback) {
          const contextReader = new ContextReader(obj, options, breakIt);
          contextReader.setItem(item, false);
          try {
            item.res = callback(
              item.value,
              item.key,
              item.parent && item.parent.value,
              contextReader
            );
          } catch (err) {
            if (err.message) {
              err.message +=
                '\ncallback failed before deep iterate at:\n' +
                pathToString(item.path);
            }

            throw err;
          }
        }

        if (broken) {
          break;
        }

        if (item.res !== false) {
          if (!broken && !item.isCircular && item.info.isObject) {
            if (
              options.childrenPath !== undefined &&
              (item.depth || !options.rootIsChildren)
            ) {
              item.childrenItems = [];
              if (item.children.length) {
                item.children.forEach(([cp, scp, children, info]) => {
                  item.childrenItems = [
                    ...item.childrenItems,
                    ...(info.isArray
                      ? getElements(item, children, options, cp, scp)
                      : getOwnChildren(item, children, options, cp, scp)),
                  ];
                });
              }
            } else {
              item.childrenItems = item.info.isArray
                ? getElements(item, item.value, options, [], '')
                : getOwnChildren(item, item.value, options, [], '');
            }
          }
        }

        item.currentChildIndex = -1;
      }
      if (
        item.childrenItems &&
        item.currentChildIndex < item.childrenItems.length - 1
      ) {
        item.currentChildIndex++;
        item.childrenItems[item.currentChildIndex].parentItem = item;
        item = item.childrenItems[item.currentChildIndex];
        continue;
      }

      if (item.needCallback && options.callbackAfterIterate) {
        const contextReader = new ContextReader(obj, options, breakIt);
        contextReader.setItem(item, true);

        try {
          callback(
            item.value,
            item.key,
            item.parent && item.parent.value,
            contextReader
          );
        } catch (err) {
          if (err.message) {
            err.message +=
              '\ncallback failed after deep iterate at:\n' +
              pathToString(item.path);
          }

          throw err;
        }
      }
      item = item.parentItem;
    }
  }

  return iterate;

  function getElements(item, children, options, childrenPath, strChildrenPath) {
    let strChildPathPrefix;
    if (!options.pathFormatArray) {
      strChildPathPrefix = item.strPath || '';

      if (
        strChildrenPath &&
        strChildPathPrefix &&
        !strChildrenPath.startsWith('[')
      ) {
        strChildPathPrefix += '.';
      }
      strChildPathPrefix += strChildrenPath || '';
    }
    const res = [];
    for (var i = 0; i < children.length; i++) {
      const val = children[i];
      if (val === undefined && !(i in children)) {
        continue;
      }
      let strChildPath;
      const pathFormatString = !options.pathFormatArray;
      if (pathFormatString) {
        strChildPath = `${strChildPathPrefix}[${i}]`;
      }
      res.push({
        value: val,
        key: i + '',
        path: [...(item.path || []), ...childrenPath, i + ''],
        strPath: strChildPath,
        depth: item.depth + 1,
        parent: {
          value: item.value,
          key: item.key,
          path: pathFormatString ? item.strPath : item.path,
          parent: item.parent,
          depth: item.depth,
          info: item.info,
        },
        childrenPath: (childrenPath.length && childrenPath) || undefined,
        strChildrenPath: strChildrenPath || undefined,
      });
    }
    return res;
  }

  function getOwnChildren(
    item,
    children,
    options,
    childrenPath,
    strChildrenPath
  ) {
    let strChildPathPrefix;
    if (!options.pathFormatArray) {
      strChildPathPrefix = item.strPath || '';

      if (
        strChildrenPath &&
        strChildPathPrefix &&
        !strChildrenPath.startsWith('[')
      ) {
        strChildPathPrefix += '.';
      }
      strChildPathPrefix += strChildrenPath || '';
    }
    const res = [];
    const pathFormatString = !options.pathFormatArray;
    for (var childKey in children) {
      if (options.ownPropertiesOnly && !has.call(children, childKey)) {
        continue;
      }

      let strChildPath;
      if (pathFormatString) {
        if (rxVarName.test(childKey)) {
          if (strChildPathPrefix) {
            strChildPath = `${strChildPathPrefix}.${childKey}`;
          } else {
            strChildPath = `${childKey}`;
          }
        } else {
          strChildPath = `${strChildPathPrefix}["${childKey.replace(
            rxQuot,
            '\\"'
          )}"]`;
        }
      }

      res.push({
        value: children[childKey],
        key: childKey,
        path: [...(item.path || []), ...childrenPath, childKey],
        strPath: strChildPath,
        depth: item.depth + 1,
        parent: {
          value: item.value,
          key: item.key,
          path: pathFormatString ? item.strPath : item.path,
          parent: item.parent,
          depth: item.depth,
          info: item.info,
        },
        childrenPath: (childrenPath.length && childrenPath) || undefined,
        strChildrenPath: strChildrenPath || undefined,
      });
    }

    return res;
  }
}

class ContextReader {
  constructor(obj, options, breakIt) {
    this.obj = obj;
    this._options = options;
    this['break'] = breakIt;
  }
  setItem(item, afterIterate) {
    this._item = item;
    this.afterIterate = afterIterate;
  }
  get path() {
    return this._options.pathFormatArray ? this._item.path : this._item.strPath;
  }

  get parent() {
    return this._item.parent;
  }

  get parents() {
    if (!this._item._parents) {
      this._item._parents = [];
      let curParent = this._item.parent;
      while (curParent) {
        this._item._parents[curParent.depth] = curParent;
        curParent = curParent.parent;
      }
    }
    return this._item._parents;
  }
  get depth() {
    return this._item.depth;
  }

  get isLeaf() {
    return this._item.isLeaf;
  }

  get isCircular() {
    return this._item.isCircular;
  }

  get circularParentIndex() {
    return this._item.circularParentIndex;
  }

  get circularParent() {
    return this._item.circularParent;
  }

  get childrenPath() {
    return (
      (this._options.childrenPath !== undefined &&
        (this._options.pathFormatArray
          ? this._item.childrenPath
          : this._item.strChildrenPath)) ||
      undefined
    );
  }

  get info() {
    return this._item.info;
  }
}

function isObjectEmpty(value, ownPropertiesOnly) {
  for (var key in value) {
    if (!ownPropertiesOnly || has.call(value, key)) {
      return false;
    }
  }
  return true;
}

function describeValue(value, ownPropertiesOnly) {
  const res = { isObject: isObject(value) };
  res.isArray = res.isObject && Array.isArray(value);
  res.isEmpty = res.isArray
    ? !value.length
    : res.isObject
    ? isObjectEmpty(value, ownPropertiesOnly)
    : true;

  return res;
}

function getEachDeep(_) {
  var iterate = getIterate(_);

  function eachDeep(obj, callback, options) {
    if (callback === undefined) callback = _.identity;
    options = _.merge(
      {
        includeRoot: !Array.isArray(obj),
        pathFormat: 'string',
        checkCircular: false,
        leavesOnly: false,
        ownPropertiesOnly: true, //
      },
      options || {}
    );
    if (options.childrenPath !== undefined) {
      if (!options.includeRoot && options.rootIsChildren === undefined) {
        options.rootIsChildren = Array.isArray(obj);
      }
      if (
        !_.isString(options.childrenPath) &&
        !Array.isArray(options.childrenPath)
      ) {
        throw Error('childrenPath can be string or array');
      } else {
        if (_.isString(options.childrenPath)) {
          options.childrenPath = [options.childrenPath];
        }
        options.strChildrenPath = options.childrenPath;
        options.childrenPath = [];
        for (var i = options.strChildrenPath.length - 1; i >= 0; i--) {
          options.childrenPath[i] = _.toPath(options.strChildrenPath[i]);
        }
      }
    }
    iterate({
      value: obj,
      callback,
      options,
      obj,
    });
    return obj;
  }
  return eachDeep;
}

function getMapValuesDeep(_) {
  var eachDeep = getEachDeep(_);

  function mapValuesDeep(obj, iteratee, options) {
    iteratee = _.iteratee(iteratee);
    let res = Array.isArray(obj) ? [] : _.isObject(obj) ? {} : _.clone(obj);
    let skipChildren;

    eachDeep(
      obj,
      function (value, key, parent, context) {
        // if (!context.skipChildren) {
        context.skipChildren = (skip) => {
          skipChildren = skip;
        };
        // }
        skipChildren = undefined;
        var r = iteratee(value, key, parent, context);
        if (!context.isLeaf && skipChildren === undefined) {
          skipChildren =
            value !== r && Array.isArray(value) != Array.isArray(r);
        }
        if (context.path !== undefined) {
          _.set(res, context.path, r);
        } else {
          res = r;
        }
        if (skipChildren) {
          return false;
        }
      },
      options
    );

    return res;
  }
  return mapValuesDeep;
}

/* build/tpl */

function addMapValuesDeep(_) {
  var mixOrPatchIn = getMixOrPatchIn(_);
  return mixOrPatchIn('mapValuesDeep', getMapValuesDeep(_), !getMapValuesDeep.notChainable);
}

addMapValuesDeep(_);
const ExternalTextContext = /*#__PURE__*/React.createContext(null);
class Provider extends React.Component {
  // Data provider for component `ExternalText`, which accesses this data
  // via the React context API.
  //
  // This component performs two tasks:
  // - loads the source data into this component's state
  // - wraps its children in a React context provider whose value is set
  //   from the source data

  static propTypes = {
    defaultTexts: PropTypes.object,
    // Default, non-asynchronous data source.

    loadTexts: PropTypes.func
    // Callback for loading data asynchronously.
  };
  state = {
    texts: null
  };
  setTexts = texts => {
    this.setState({
      texts
    });
  };
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

const escape = s => _.map(s, (c, i, t) => c !== '`' || i > 0 && t[i - 1] === `\\` ? c : '\\`').join('');
// This negative lookbehind formulation is tighter, but it lookbehind isn't
// supported (yet) in many browsers. It does work in Node.js and Chrome.
// export const escape = s => s.replace(/(?<!\\)`/g, '\\`');

// And the inverse.
const unescape = s => s.replace(/\\`/g, '`');
function evaluateAsTemplateLiteral(s, context = {}) {
  // Convert string `s` to a template literal and evaluate it in a context
  // where all the properties of object `context` are available as identifiers
  // at the top level. (E.g., if `context = { 'a': 1, 'b': 2 }`, then
  // the template literal can refer to `context.a` and `context.b`
  // as `${a}` and `${b}`, respectively.)

  // `evaluator` constructs a function that evaluates a template string
  // constructed from the ordinary string passed in (by enclosing it in
  // backticks). The argument(s) of the returned evaluator are the context
  // values.
  const makeEvaluator = s => new Function(...Object.keys(context), 'return `' + s + '`');

  // `reevaluate` recursively makes and invokes an evaluator for the string.
  // A different string, containing further interpolations (`${...}`), may
  // result from interpolation of other strings into the evaluated string.
  // `reevaluate` stops reevaluating when two successive evaluations return
  // the same string. It also applies backtick escaping at each new evaluation,
  // for the same reason.
  const reevaluate = (prev, curr) => {
    const e = escape(curr);
    return prev === e ? e : reevaluate(e, makeEvaluator(e)(...Object.values(context)));
  };

  // It's important that `Object.keys(x)` and `Object.values(x)` are guaranteed
  // to return their results in the same order for any given `x`. That order
  // is arbitrary, but it is shared between them.

  // Kick off the evaluation(s), and strip escaping after all is done.
  return unescape(reevaluate('', s));
}
function get(texts, path, data = {}, as = 'string') {
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

  const item = texts && _.get(texts, path) || `{{${path}}}`;
  const render = value => {
    if (!_.isString(value)) {
      return null;
    }
    if (as === 'raw') {
      return value;
    }
    const source = evaluateAsTemplateLiteral(value, {
      $$: texts,
      ...data
    });
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
  // Core component of external texts module.
  //
  // This component renders an external text (source texts provided through
  // the React context API via `ExternalText.Provider`) selected by `path`,
  // using the data context `data` and rendered according to `as`.
  // See static function `get` for more details.
  //
  // Supporting components and functions are both exported by the module
  // and added as properties of `ExternalText`.

  static propTypes = {
    path: PropTypes.string,
    // Path (JS standard notation) selecting text item from source texts.
    data: PropTypes.object,
    // Data context in which to evaluate item's text.
    as: PropTypes.oneOf(['raw', 'string', 'markdown'])
    // How to render the item's text.
  };
  static defaultProps = {
    as: 'markdown'
  };
  render() {
    const texts = this.context;
    const {
      path,
      data,
      as
    } = this.props;
    return get(texts, path, data, as);
  }
}
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
