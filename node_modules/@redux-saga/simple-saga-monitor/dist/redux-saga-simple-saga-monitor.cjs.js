'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var is = require('@redux-saga/is');
var effects = require('redux-saga/effects');
var _inheritsLoose = _interopDefault(require('@babel/runtime/helpers/inheritsLoose'));

var PENDING = 'PENDING';
var RESOLVED = 'RESOLVED';
var REJECTED = 'REJECTED';
var CANCELLED = 'CANCELLED';
var IS_BROWSER = typeof window !== 'undefined' && window.document;
var IS_REACT_NATIVE = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';

var isRaceEffect = function isRaceEffect(eff) {
  return is.effect(eff) && eff.type === effects.effectTypes.RACE;
};

/* eslint-disable no-console */
// Poor man's `console.group` and `console.groupEnd` for Node.
// Can be overridden by the `console-group` polyfill.
// The poor man's groups look nice, too, so whether to use
// the polyfilled methods or the hand-made ones can be made a preference.
var groupPrefix = '';
var GROUP_SHIFT = '   ';
var GROUP_ARROW = '▼';
function consoleGroup() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (console.group) {
    var _console;

    (_console = console).group.apply(_console, args);
  } else {
    var _console2;

    console.log('');

    (_console2 = console).log.apply(_console2, [groupPrefix + GROUP_ARROW].concat(args));

    groupPrefix += GROUP_SHIFT;
  }
}
function consoleGroupEnd() {
  if (console.groupEnd) {
    console.groupEnd();
  } else {
    groupPrefix = groupPrefix.substr(0, groupPrefix.length - GROUP_SHIFT.length);
  }
}

function argToString(arg) {
  return typeof arg === 'function' ? "" + arg.name : typeof arg === 'string' ? "'" + arg + "'" : arg;
}

function isPrimitive(val) {
  return typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean' || typeof val === 'symbol' || val === null || val === undefined;
}

var Formatter =
/*#__PURE__*/
function () {
  function Formatter() {
    this.logs = [];
    this.suffix = [];
  }

  var _proto = Formatter.prototype;

  _proto.add = function add(msg) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    // Remove the `%c` CSS styling that is not supported by the Node console.
    if (!IS_BROWSER && typeof msg === 'string') {
      var prevMsg = msg;
      msg = msg.replace(/^%c\s*/, '');

      if (msg !== prevMsg) {
        // Remove the first argument which is the CSS style string.
        args.shift();
      }
    }

    this.logs.push({
      msg: msg,
      args: args
    });
    return this;
  };

  _proto.appendData = function appendData() {
    var _this$suffix;

    (_this$suffix = this.suffix).push.apply(_this$suffix, arguments);

    return this;
  };

  _proto.addValue = function addValue(value) {
    if (isPrimitive(value)) {
      this.add(value);
    } else {
      // The browser console supports `%O`, the Node console does not.
      if (IS_BROWSER) {
        this.add('%O', value);
      } else {
        this.add('%s', require('util').inspect(value));
      }
    }

    return this;
  };

  _proto.addCall = function addCall(name, args) {
    var _this = this;

    if (!args.length) {
      this.add(name + "()");
    } else {
      this.add(name);
      this.add('(');
      args.forEach(function (arg, i) {
        _this.addValue(argToString(arg));

        _this.addValue(i === args.length - 1 ? ')' : ', ');
      });
    }

    return this;
  };

  _proto.getLog = function getLog() {
    var msgs = [];
    var msgsArgs = [];

    for (var _iterator = this.logs, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var _ref2 = _ref,
          msg = _ref2.msg,
          args = _ref2.args;
      msgs.push(msg);
      msgsArgs.push.apply(msgsArgs, args);
    }

    return [msgs.join('')].concat(msgsArgs, this.suffix);
  };

  return Formatter;
}();

var DEFAULT_STYLE = 'color: black';
var LABEL_STYLE = 'font-weight: bold';
var EFFECT_TYPE_STYLE = 'color: blue';
var ERROR_STYLE = 'color: red';
var CANCEL_STYLE = 'color: #ccc';

var DescriptorFormatter =
/*#__PURE__*/
function (_Formatter) {
  _inheritsLoose(DescriptorFormatter, _Formatter);

  function DescriptorFormatter(isCancel, isError) {
    var _this;

    _this = _Formatter.call(this) || this;
    _this.logMethod = isError ? 'error' : 'log';

    _this.styleOverride = function (s) {
      return isCancel ? CANCEL_STYLE : isError ? ERROR_STYLE : s;
    };

    return _this;
  }

  var _proto = DescriptorFormatter.prototype;

  _proto.resetStyle = function resetStyle() {
    return this.add('%c', this.styleOverride(DEFAULT_STYLE));
  };

  _proto.addLabel = function addLabel(text) {
    if (text) {
      return this.add("%c " + text + " ", this.styleOverride(LABEL_STYLE));
    } else {
      return this;
    }
  };

  _proto.addEffectType = function addEffectType(text) {
    return this.add("%c " + text + " ", this.styleOverride(EFFECT_TYPE_STYLE));
  };

  _proto.addDescResult = function addDescResult(descriptor, ignoreResult) {
    var status = descriptor.status,
        result = descriptor.result,
        error = descriptor.error,
        duration = descriptor.duration;

    if (status === RESOLVED && !ignoreResult) {
      if (is.array(result)) {
        this.addValue(' 🡲 ');
        this.addValue(result);
      } else {
        this.appendData('🡲', result);
      }
    } else if (status === REJECTED) {
      this.appendData('🡲 ⚠', error);
    } else if (status === PENDING) {
      this.appendData('⌛');
    } else if (status === CANCELLED) {
      this.appendData('🡲 Cancelled!');
    }

    if (status !== PENDING) {
      this.appendData("(" + duration.toFixed(2) + "ms)");
    }

    return this;
  };

  return DescriptorFormatter;
}(Formatter);

/* eslint-disable no-console */
function logSaga(manager) {
  if (manager.getRootIds().length === 0) {
    console.log('Saga monitor: No effects to log');
  }

  console.log('');
  console.log('Saga monitor:', Date.now(), new Date().toISOString());

  for (var _iterator = manager.getRootIds(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var id = _ref;
    logEffectTree(manager, id);
  }

  console.log('');
}

function logEffectTree(manager, effectId) {
  var desc = manager.get(effectId);
  var childIds = manager.getChildIds(effectId);
  var formatter = getFormatterFromDescriptor(desc);

  if (childIds.length === 0) {
    var _console;

    (_console = console)[formatter.logMethod].apply(_console, formatter.getLog());
  } else {
    consoleGroup.apply(void 0, formatter.getLog());

    for (var _iterator2 = childIds, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var id = _ref2;
      logEffectTree(manager, id);
    }

    consoleGroupEnd();
  }
}

function getFormatterFromDescriptor(desc) {
  var isCancel = desc.status === CANCELLED;
  var isError = desc.status === REJECTED;
  var formatter = new DescriptorFormatter(isCancel, isError);
  var winnerInd = desc.winner ? isError ? '✘' : '✓' : '';
  formatter.addLabel(winnerInd).addLabel(desc.label);

  if (desc.root) {
    formatter.addEffectType('root').resetStyle().addCall(desc.saga.name, desc.args).addDescResult(desc);
  } else if (is.iterator(desc.effect)) {
    formatter.addValue(desc.effect.name).addDescResult(desc, true);
  } else if (is.promise(desc.effect)) {
    formatter.addEffectType('promise').resetStyle().addDescResult(desc);
  } else if (is.effect(desc.effect)) {
    var _desc$effect = desc.effect,
        type = _desc$effect.type,
        payload = _desc$effect.payload;

    if (type === effects.effectTypes.TAKE) {
      formatter.addEffectType('take').resetStyle().addValue(payload.channel == null ? payload.pattern : payload).addDescResult(desc);
    } else if (type === effects.effectTypes.PUT) {
      formatter.addEffectType('put').resetStyle().addDescResult(Object.assign({}, desc, {
        result: payload
      }));
    } else if (type === effects.effectTypes.ALL) {
      formatter.addEffectType('all').resetStyle().addDescResult(desc, true);
    } else if (type === effects.effectTypes.RACE) {
      formatter.addEffectType('race').resetStyle().addDescResult(desc, true);
    } else if (type === effects.effectTypes.CALL) {
      formatter.addEffectType('call').resetStyle().addCall(payload.fn.name, payload.args).addDescResult(desc);
    } else if (type === effects.effectTypes.CPS) {
      formatter.addEffectType('cps').resetStyle().addCall(payload.fn.name, payload.args).addDescResult(desc);
    } else if (type === effects.effectTypes.FORK) {
      formatter.addEffectType(payload.detached ? 'spawn' : 'fork').resetStyle().addCall(payload.fn.name, payload.args).addDescResult(desc);
    } else if (type === effects.effectTypes.JOIN) {
      formatter.addEffectType('join').resetStyle().addDescResult(desc);
    } else if (type === effects.effectTypes.CANCEL) {
      formatter.addEffectType('cancel').resetStyle().appendData(payload.name);
    } else if (type === effects.effectTypes.SELECT) {
      formatter.addEffectType('select').resetStyle().addCall(payload.selector.name, payload.args).addDescResult(desc);
    } else if (type === effects.effectTypes.ACTION_CHANNEL) {
      formatter.addEffectType('actionChannel').resetStyle().addValue(payload.buffer == null ? payload.pattern : payload).addDescResult(desc);
    } else if (type === effects.effectTypes.CANCELLED) {
      formatter.addEffectType('cancelled').resetStyle().addDescResult(desc);
    } else if (type === effects.effectTypes.FLUSH) {
      formatter.addEffectType('flush').resetStyle().addValue(payload).addDescResult(desc);
    } else if (type === effects.effectTypes.GET_CONTEXT) {
      formatter.addEffectType('getContext').resetStyle().addValue(payload).addDescResult(desc);
    } else if (type === effects.effectTypes.SET_CONTEXT) {
      formatter.addEffectType('setContext').resetStyle().addValue(payload).addDescResult(desc, true);
    } else {
      throw new Error("Invalid effect type " + type);
    }
  } else {
    formatter.addEffectType('unknown').resetStyle().addDescResult(desc);
  }

  return formatter;
}

/** The manager is used for bookkeeping all the effect descriptors */
var Manager =
/*#__PURE__*/
function () {
  function Manager() {
    this.rootIds = []; // effect-id-to-effect-descriptor

    this.map = {}; // effect-id-to-array-of-child-id

    this.childIdsMap = {};
  }

  var _proto = Manager.prototype;

  _proto.get = function get(effectId) {
    return this.map[effectId];
  };

  _proto.set = function set(effectId, desc) {
    this.map[effectId] = desc;

    if (this.childIdsMap[desc.parentEffectId] == null) {
      this.childIdsMap[desc.parentEffectId] = [];
    }

    this.childIdsMap[desc.parentEffectId].push(effectId);
  };

  _proto.setRootEffect = function setRootEffect(effectId, desc) {
    this.rootIds.push(effectId);
    this.set(effectId, Object.assign({
      root: true
    }, desc));
  };

  _proto.getRootIds = function getRootIds() {
    return this.rootIds;
  };

  _proto.getChildIds = function getChildIds(parentEffectId) {
    return this.childIdsMap[parentEffectId] || [];
  };

  return Manager;
}();

/* eslint-disable no-console */
var globalScope = IS_REACT_NATIVE ? global : IS_BROWSER ? window : null; // `VERBOSE` can be made a setting configured from the outside.

function time() {
  if (typeof performance !== 'undefined' && performance.now) {
    return performance.now();
  } else {
    return Date.now();
  }
}

var manager =
/*#__PURE__*/
new Manager();

function rootSagaStarted(desc) {

  manager.setRootEffect(desc.effectId, Object.assign({}, desc, {
    status: PENDING,
    start: time()
  }));
}

function effectTriggered(desc) {

  manager.set(desc.effectId, Object.assign({}, desc, {
    status: PENDING,
    start: time()
  }));
}

function effectResolved(effectId, result) {

  resolveEffect(effectId, result);
}

function effectRejected(effectId, error) {

  rejectEffect(effectId, error);
}

function effectCancelled(effectId) {

  cancelEffect(effectId);
}

function computeEffectDur(effect) {
  var now = time();
  Object.assign(effect, {
    end: now,
    duration: now - effect.start
  });
}

function resolveEffect(effectId, result) {
  var effect = manager.get(effectId);

  if (is.task(result)) {
    result.toPromise().then(function (taskResult) {
      if (result.isCancelled()) {
        cancelEffect(effectId);
      } else {
        resolveEffect(effectId, taskResult);
      }
    }, function (taskError) {
      return rejectEffect(effectId, taskError);
    });
  } else {
    computeEffectDur(effect);
    effect.status = RESOLVED;
    effect.result = result;

    if (isRaceEffect(effect.effect)) {
      setRaceWinner(effectId, result);
    }
  }
}

function rejectEffect(effectId, error) {
  var effect = manager.get(effectId);
  computeEffectDur(effect);
  effect.status = REJECTED;
  effect.error = error;

  if (isRaceEffect(effect.effect)) {
    setRaceWinner(effectId, error);
  }
}

function cancelEffect(effectId) {
  var effect = manager.get(effectId);
  computeEffectDur(effect);
  effect.status = CANCELLED;
}

function setRaceWinner(raceEffectId, result) {
  var winnerLabel = Object.keys(result)[0];

  for (var _iterator = manager.getChildIds(raceEffectId), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var childId = _ref;
    var childEffect = manager.get(childId);

    if (childEffect.label === winnerLabel) {
      childEffect.winner = true;
    }
  }
} // Export the snapshot-logging function to run from the browser console or extensions.


if (globalScope) {
  console.log('Enter `$$LogSagas()` to print the monitor log');

  globalScope.$$LogSagas = function () {
    return logSaga(manager);
  };
} // Export the snapshot-logging function for arbitrary use by external code.

var index = {
  rootSagaStarted: rootSagaStarted,
  effectTriggered: effectTriggered,
  effectResolved: effectResolved,
  effectRejected: effectRejected,
  effectCancelled: effectCancelled,
  actionDispatched: function actionDispatched() {}
};

exports.default = index;
exports.logSaga = logSaga;
