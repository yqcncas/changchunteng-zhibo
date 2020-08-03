(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin']['options']) {
      Object.assign(options, vueOptions['mp-weixin']['options']);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 12:
/*!**************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/libs/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.checkVerion = void 0;var checkVerion = function checkVerion(data) {
  // 检测是大版本更新还是小版本更新
  plus.runtime.getProperty(plus.runtime.appid, function (info) {
    // 比较当前版本和线上版本
    if (parseInt(info.version.split('.').join('')) === parseInt(data.version.split('.').join(''))) return;
    console.log('测试: ', data);
    // 查看是大版本更新还是小版本更新
    if (data.mustupdate === 1) {
      // 大版本更新
      uni.showModal({
        title: '更新提示',
        content: data.content,
        success: function success(showResult) {
          if (showResult.confirm) {
            plus.runtime.openURL(data.file);
          } else {
            plus.runtime.quit();
          }
        } });

    } else {
      console.log(data);
      // 小版本更新
      plus.nativeUI.showWaiting("正在更新最新数据...");
      uni.downloadFile({
        url: data.file,
        success: function success(downloadResult) {
          console.log(downloadResult);
          if (downloadResult.statusCode === 200) {
            plus.runtime.install(downloadResult.tempFilePath, {
              force: true },
            function () {
              console.log('install success...');
              plus.nativeUI.closeWaiting();
              uni.showToast({ title: '更新成功！', duration: 1000 });
              setTimeout(function () {plus.runtime.restart();}, 1500);
            }, function (e) {
              console.error('install fail...');
            });
          }
        } });

    }
  });
};exports.checkVerion = checkVerion;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    options.components = Object.assign(components, options.components || {})
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 16:
/*!***************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/store/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 17));
var _state = _interopRequireDefault(__webpack_require__(/*! ./state */ 18));
var _mutations = _interopRequireDefault(__webpack_require__(/*! ./mutations */ 19));
var _actions = _interopRequireDefault(__webpack_require__(/*! ./actions */ 20));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_vue.default.use(_vuex.default);var _default =

new _vuex.default.Store({
  state: _state.default,
  mutations: _mutations.default,
  actions: _actions.default });exports.default = _default;

/***/ }),

/***/ 17:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 18:
/*!***************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/store/state.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  chatRoomList: [] // 聊天室消息列表
};exports.default = _default;

/***/ }),

/***/ 19:
/*!*******************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/store/mutations.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  // 添加最新的
  pushChatRoomList: function pushChatRoomList(state, newMsg) {
    // 添加标签,判断是老师还是学生
    newMsg.label = 1; // 1 是学生 2是老师
    // newMsg.isCurrentUser = false 
    var teacherList = uni.getStorageSync('teacher_list');
    // 遍历老师列表,判断消息发送者是否为老师
    teacherList.forEach(function (item) {
      if (item.dictValue === parseInt(newMsg.username)) newMsg.label = 2;
    });
    // 判断消息发送者是否为当前用户
    // let userId = uni.getStorageSync('userId')
    // if (parseInt(userId) === parseInt(newMsg.username)) newMsg.isCurrentUser = true
    state.chatRoomList.push(newMsg);
    // console.log(state.chatRoomList)
  },

  // 清空 chatRoomList
  cleanChatRoomList: function cleanChatRoomList(state) {
    console.log('我执行了吗');
    state.chatRoomList = [];
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!*****************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/store/actions.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {};exports.default = _default;

/***/ }),

/***/ 21:
/*!****************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/libs/request.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _config = __webpack_require__(/*! @/config */ 22);
/**
                                                                                                                                        * @param{string}url 请求地址(baseUrl基础地址之后的地址)
                                                                                                                                        * @param{Object}data 请求参数
                                                                                                                                        * @param{string}method 请求方法(默认为GET请求)
                                                                                                                                        * @param{string}contentType 请求内容类型(默认为JSON类型，可选form)
                                                                                                                                        * @param{Object}headers 其他 header 数据
                                                                                                                                        */var _default =
function _default(url, data) {var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';var contentType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'form';var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  // 判断url地址第一个字符是否含 '/', 有则截取掉
  if (_config.baseURL.slice(_config.baseURL.length - 1) === '/' && url.slice(0, 1) === '/') url = url.slice(1);
  // 删除data对象空属性
  for (var i in data) {
    if (typeof data[i] == 'undefined' || data[i] != 0 && !data[i]) {
      delete data[i];
    }
  }
  // 判断请求内容类型
  if (!/[A-Za-z]{4}/.test(contentType)) throw 'contentType 格式不正确，请检查是否为字符串json或者form';
  if (contentType.toUpperCase() === 'JSON') {
    headers['Content-Type'] = 'application/json; charset=UTF-8'; // 可以传引用类型
  } else {
    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'; // 无法传引用类型（传的是字符串，后端不想解析）
  }

  // 存储TOKEN
  var token = uni.getStorageSync('token');
  if (token) headers.token = token;

  return new Promise(function (resolve, reject) {
    uni.request({
      url: _config.baseURL + url,
      data: data,
      method: method,
      header: headers,
      success: function success(res) {
        if (parseInt(res.statusCode) === 200) {
          if (res.data.code === 401) {
            uni.showToast({ title: res.data.msg, icon: 'none' });
            // return setTimeout(() => { uni.reLaunch({ url: '/pages/wechat-login/wechat-login' }) }, 600)
            return setTimeout(function () {uni.reLaunch({ url: '/pages/login/login' });}, 600);
          }
          resolve(res.data);
        } else if (parseInt(res.statusCode) === 401) {
          // 请求401时
          throw Error("\u8BF7\u6C42\u63A5\u53E3".concat(baseUrl).concat(url, ",\u8BF7\u6C42\u6240\u4F20\u53C2\u6570").concat(JSON.stringify(data), ";\u540E\u7AEF\u8FD4\u56DE401"));
        } else if (parseInt(res.statusCode) === 500) {
          // 	请求500时				
          throw Error("\u8BF7\u6C42\u63A5\u53E3".concat(baseUrl).concat(url, ",\u8BF7\u6C42\u6240\u4F20\u53C2\u6570").concat(JSON.stringify(data), ";\u540E\u7AEF\u8FD4\u56DE500"));
        } else {
          resolve(res.data);
        }
      },
      fail: function fail(err) {
        console.log(err);
        // uni.showToast({
        // 	icon: 'none',
        // 	title: err
        // })
      } });

  });
};exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 22:
/*!****************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/config/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.numberToChinese = exports.SectionToChinese = exports.wsBaseUrl = exports.baseURL = exports.JMessage = void 0;






var _wechatJmessage = _interopRequireDefault(__webpack_require__(/*! @/libs/wechat-jmessage.js */ 23));



var _api = _interopRequireDefault(__webpack_require__(/*! @/api */ 24));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];var chnUnitChar = ["", "十", "百", "千"];

var JMessage = _wechatJmessage.default;exports.JMessage = JMessage;

var dev = _api.default.dev;
var pro = _api.default.pro;
var baseURL =
 false ?
undefined // 生产环境接口地址
:
dev; // 开发环境接口地址


// ws 连接基础地址
exports.baseURL = baseURL;var wsBaseUrl =  false ? undefined : _api.default.wsDev;exports.wsBaseUrl = wsBaseUrl;

var SectionToChinese = function SectionToChinese(section) {
  var strIns = '',
  chnStr = '';
  var unitPos = 0;
  var zero = true;
  while (section > 0) {
    var v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
};

// 数字转中文数字
exports.SectionToChinese = SectionToChinese;var numberToChinese = function numberToChinese(num) {

  var unitPos = 0;
  var strIns = '',
  chnStr = '';
  var needZero = false;

  if (num === 0) {
    return chnNumChar[0];
  }

  while (num > 0) {
    var section = num % 10000;
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr;
    }
    strIns = SectionToChinese(section);
    strIns += section !== 0 ? chnUnitSection[unitPos] : chnUnitSection[0];
    chnStr = strIns + chnStr;
    needZero = section < 1000 && section > 0;
    num = Math.floor(num / 10000);
    unitPos++;
  }

  return chnStr;
};exports.numberToChinese = numberToChinese;

/***/ }),

/***/ 23:
/*!************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/libs/wechat-jmessage.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
!function (t, e) { true ? module.exports = e() : undefined;}(void 0, function () {return function (t) {function e(o) {if (n[o]) return n[o].exports;var i = n[o] = { exports: {}, id: o, loaded: !1 };return t[o].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports;}var n = {};return e.m = t, e.c = n, e.p = "", e(0);}([function (t, e, n) {t.exports = n(18);}, function (t, e, n) {(function (o) {function i() {return "undefined" != typeof document && "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;}function s() {var t = arguments,n = this.useColors;if (t[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + t[0] + (n ? "%c " : " ") + "+" + e.humanize(this.diff), !n) return t;var o = "color: " + this.color;t = [t[0], o, "color: inherit"].concat(Array.prototype.slice.call(t, 1));var i = 0,s = 0;return t[0].replace(/%[a-z%]/g, function (t) {"%%" !== t && (i++, "%c" === t && (s = i));}), t.splice(s, 0, o), t;}function r() {return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);}function a(t) {try {null == t ? e.storage.removeItem("debug") : e.storage.debug = t;} catch (t) {}}function c() {try {return e.storage.debug;} catch (t) {}if ("undefined" != typeof o && "env" in o) return o.env.DEBUG;}function p() {try {return window.localStorage;} catch (t) {}}e = t.exports = n(34), e.log = r, e.formatArgs = s, e.save = a, e.load = c, e.useColors = i, e.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : p(), e.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], e.formatters.j = function (t) {try {return JSON.stringify(t);} catch (t) {return "[UnexpectedJSONParseError]: " + t.message;}}, e.enable(c());}).call(e, n(38));}, function (t, e, n) {t.exports = n(25);}, function (t, e, n) {function o(t) {if (t) return i(t);}function i(t) {for (var e in o.prototype) {t[e] = o.prototype[e];}return t;}t.exports = o, o.prototype.on = o.prototype.addEventListener = function (t, e) {return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this;}, o.prototype.once = function (t, e) {function n() {this.off(t, n), e.apply(this, arguments);}return n.fn = e, this.on(t, n), this;}, o.prototype.off = o.prototype.removeListener = o.prototype.removeAllListeners = o.prototype.removeEventListener = function (t, e) {if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;var n = this._callbacks["$" + t];if (!n) return this;if (1 == arguments.length) return delete this._callbacks["$" + t], this;for (var o, i = 0; i < n.length; i++) {if (o = n[i], o === e || o.fn === e) {n.splice(i, 1);break;}}return this;}, o.prototype.emit = function (t) {this._callbacks = this._callbacks || {};var e = [].slice.call(arguments, 1),n = this._callbacks["$" + t];if (n) {n = n.slice(0);for (var o = 0, i = n.length; o < i; ++o) {n[o].apply(this, e);}}return this;}, o.prototype.listeners = function (t) {return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];}, o.prototype.hasListeners = function (t) {return !!this.listeners(t).length;};}, function (t, e) {var n = { SDK_VERSION: "2.6.0", WSS_ADDRESS: "wss://ws.im.jiguang.cn", UPLOAD_FILE: "https://sdk.im.jiguang.cn/resource", ALLOW_MSG_TYPE: ["text", "image", "file", "location", "custom"], LOGIN_OUT_EVENT: [1, 2], FROM_PLATFORM: "x", ACK_TIMEOUT: 5e3, RESP_TIMEOUT: 3e4, RETRY_TIMES: 5, SYNC_INTERVAL: 15e4, RECEIPT_REPORT_INTERVAL: 2e3, RECEIPT_REPORT_MAX_SIZE: 50, EVENT_KEY: "eve-k-", CONVERSATION_KEY: "conversations-", SYNC_TYPE_OPEN: 1, SYNC_TYPE_CLOSE: 0, FRIEND_INVITE: 1, FRIEND_INVITED: 2, PLAT_CHANNEL: "w", EVENTS: { ACK: "ack", INIT: "c_init", LOGIN: "login", REGISTER: "register", GET_USER_INFO: "get_across_user_info", GET_ACROSS_USER_INFO: "get_across_user_info", S_SINGLE_TEXT: "s_across_single_text", S_SINGLE_TEXT_: "s_single_text", MSG_SYNC: "msg_sync", MSG_RECV: "msg_recv", MSG_RECV_V2: "msg_recv_v2", SEND_GROUP_MSG: "send_group_msg", CREATE_GROUP: "create_group", GET_GROUPS_LIST: "get_groups_list", GET_GROUP_INFO: "get_group_info", ADD_GROUP_MEMBER: "add_group_member", ADD_ACROSS_GROUP_MEMBER: "add_across_group_member", DEL_GROUP_MEMBER: "del_group_member", DEL_ACROSS_GROUP_MEMBER: "del_across_group_member", GET_GROUP_MEMBERS: "get_group_members", UPDATE_GROUP_INFO: "update_group_info", EXIT_GROUP: "exit_group", EVENT_NOTIFICATION: "event_notification", GET_CONVERSATIONS: "get_conversations", GET_UPLOAD_TOKEN: "get_upload_token", NO_DISTURB: "no_disturb", ADD_MSG_NO_DISTURB_SINGLE: "add_msg_no_disturb_single", DELETE_MSG_NO_DISTURB_SINGLE: "delete_msg_no_disturb_single", ADD_MSG_NO_DISTURB_GROUP: "add_msg_no_disturb_group", DELETE_MSG_NO_DISTURB_GROUP: "delete_msg_no_disturb_group", ADD_MSG_NO_DISTURB_GLOBAL: "add_msg_no_disturb_global", DELETE_MSG_NO_DISTURB_GLOBAL: "delete_msg_no_disturb_global", DISCONNECT: "disconnect", GET_BLACK_LIST: "get_black_list", ADD_BLACK_LIST: "add_black_list", DEL_BLACK_LIST: "del_black_list", UPDATE_SELF_INFO: "update_user_inf", UPDATE_SELF_PWD: "update_user_pwd", ADD_MSG_SHIELD_GROUP: "add_msg_shield_group", DEL_MSG_SHIELD_GROUP: "del_msg_shield_group", ADD_FRIEND: "add_friend", DEL_FRIEND: "del_friend", UPDATE_FRIEND_MEMO: "update_friend_memo", GET_FRIEND_LIST: "get_friend_list", SYNC_CHECK: "sync_check", SYNC_CONVERSATION: "sync_conversation", SYNC_CONVERSATION_ACK: "sync_conversation_ack", MSG_RETRACT: "msg_retract", GET_RESOURCE: "get_resource", LIST_SHIELD_GROUP: "list_shield_group", SYNC_EVENT_CHECK: "sync_event_check", SYNC_EVENT: "sync_event", SYNC_EVENT_ACK: "sync_event_ack", RECEIPT_REPORT: "receipt_report", SYNC_RECEIPT_ACK: "sync_receipt_ack", SYNC_RECEIPT: "sync_receipt", RECEIPT_CHANGE: "receipt_change", UNREAD_GROUP_COUNT: "unread_group_count", UNREAD_SINGLE_COUNT: "unread_single_count", MSG_UNREAD_LIST: "msg_unread_list", TRANS_MSG_SINGLE: "trans_msg_single", TRANS_MSG_GROUP: "trans_msg_group", TRANS_MSG_PLATFORM: "trans_msg_platform", TRANS_MSG_REC: "trans_msg_rec", ADMIN_ADD_GROUP_MEMBER: "admin_add_group_member", APPLY_JOIN_GROUP: "apply_join_group", ROOM_LIST: "room_list", ROOM_LIST_SELF: "room_list_self", JOIN_ROOM: "join_room", EXIT_ROOM: "exit_room", ROOM_INFO: "room_info", SEND_ROOM_MSG: "send_room_msg", ROOM_MSG_SYNC: "room_msg_sync", GROUP_MEM_SILENCE: "group_mem_silence", ROOM_MSG_SYNC_HIS: "room_msg_sync_his", DISSOLVE_GROUP: "dissolve_group", ADD_GROUP_KEEPER: "add_group_keeper", DEL_GROUP_KEEPER: "del_group_keeper", CHANGE_GROUP_ADMIN: "change_group_admin", PUBLIC_GROUP_LIST: "public_group_list" } };t.exports = n;}, function (t, e, n) {function o() {}function i(t) {var n = "",o = !1;return n += t.type, e.BINARY_EVENT != t.type && e.BINARY_ACK != t.type || (n += t.attachments, n += "-"), t.nsp && "/" != t.nsp && (o = !0, n += t.nsp), null != t.id && (o && (n += ",", o = !1), n += t.id), null != t.data && (o && (n += ","), n += JSON.stringify(t.data)), h("encoded %j as %s", t, n), n;}function s(t, e) {function n(t) {var n = f.deconstructPacket(t),o = i(n.packet),s = n.buffers;s.unshift(o), e(s);}f.removeBlobs(t, n);}function r() {this.reconstructor = null;}function a(t) {var n = {},o = 0;if (n.type = Number(t.charAt(0)), null == e.types[n.type]) return u();if (e.BINARY_EVENT == n.type || e.BINARY_ACK == n.type) {for (var i = ""; "-" != t.charAt(++o) && (i += t.charAt(o), o != t.length);) {;}if (i != Number(i) || "-" != t.charAt(o)) throw new Error("Illegal attachments");n.attachments = Number(i);}if ("/" == t.charAt(o + 1)) for (n.nsp = ""; ++o;) {var s = t.charAt(o);if ("," == s) break;if (n.nsp += s, o == t.length) break;} else n.nsp = "/";var r = t.charAt(o + 1);if ("" !== r && Number(r) == r) {for (n.id = ""; ++o;) {var s = t.charAt(o);if (null == s || Number(s) != s) {--o;break;}if (n.id += t.charAt(o), o == t.length) break;}n.id = Number(n.id);}return t.charAt(++o) && (n = c(n, t.substr(o))), h("decoded %s as %j", t, n), n;}function c(t, e) {try {t.data = JSON.parse(e);} catch (t) {return u();}return t;}function p(t) {this.reconPack = t, this.buffers = [];}function u(t) {return { type: e.ERROR, data: "parser error" };}var h = n(1)("socket.io-parser"),_ = n(40),f = n(39),d = n(16);e.protocol = 4, e.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"], e.CONNECT = 0, e.DISCONNECT = 1, e.EVENT = 2, e.ACK = 3, e.ERROR = 4, e.BINARY_EVENT = 5, e.BINARY_ACK = 6, e.Encoder = o, e.Decoder = r, o.prototype.encode = function (t, n) {if (h("encoding packet %j", t), e.BINARY_EVENT == t.type || e.BINARY_ACK == t.type) s(t, n);else {var o = i(t);n([o]);}}, _(r.prototype), r.prototype.add = function (t) {var n;if ("string" == typeof t) n = a(t), e.BINARY_EVENT == n.type || e.BINARY_ACK == n.type ? (this.reconstructor = new p(n), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", n)) : this.emit("decoded", n);else {if (!d(t) && !t.base64) throw new Error("Unknown type: " + t);if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");n = this.reconstructor.takeBinaryData(t), n && (this.reconstructor = null, this.emit("decoded", n));}}, r.prototype.destroy = function () {this.reconstructor && this.reconstructor.finishedReconstruction();}, p.prototype.takeBinaryData = function (t) {if (this.buffers.push(t), this.buffers.length == this.reconPack.attachments) {var e = f.reconstructPacket(this.reconPack, this.buffers);return this.finishedReconstruction(), e;}return null;}, p.prototype.finishedReconstruction = function () {this.reconPack = null, this.buffers = [];};}, function (t, e, n) {function o(t, e) {return this instanceof o ? (t && "object" == typeof t && (e = t, t = void 0), e = e || {}, e.path = e.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = e, this.reconnection(e.reconnection !== !1), this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0), this.reconnectionDelay(e.reconnectionDelay || 2e3), this.reconnectionDelayMax(e.reconnectionDelayMax || 2e3), this.randomizationFactor(e.randomizationFactor || .5), this.backoff = new _({ min: this.reconnectionDelay(), max: this.reconnectionDelayMax(), jitter: this.randomizationFactor() }), this.timeout(null == e.timeout ? 3e3 : e.timeout), this.readyState = "closed", this.uri = t, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [], this.encoder = new a.Encoder(), this.decoder = new a.Decoder(), this.autoConnect = e.autoConnect !== !1, void (this.autoConnect && this.open())) : new o(t, e);}var i = n(27),s = n(8),r = n(3),a = n(5),c = n(7),p = n(11),u = n(1)("socket.io-client:manager"),h = n(12),_ = n(32),f = Object.prototype.hasOwnProperty;t.exports = o, o.prototype.emitAll = function () {this.emit.apply(this, arguments);for (var t in this.nsps) {f.call(this.nsps, t) && this.nsps[t].emit.apply(this.nsps[t], arguments);}}, o.prototype.updateSocketIds = function () {for (var t in this.nsps) {f.call(this.nsps, t) && (this.nsps[t].id = this.engine.id);}}, r(o.prototype), o.prototype.reconnection = function (t) {return arguments.length ? (this._reconnection = !!t, this) : this._reconnection;}, o.prototype.reconnectionAttempts = function (t) {return arguments.length ? (this._reconnectionAttempts = t, this) : this._reconnectionAttempts;}, o.prototype.reconnectionDelay = function (t) {return arguments.length ? (this._reconnectionDelay = t, this.backoff && this.backoff.setMin(t), this) : this._reconnectionDelay;}, o.prototype.randomizationFactor = function (t) {return arguments.length ? (this._randomizationFactor = t, this.backoff && this.backoff.setJitter(t), this) : this._randomizationFactor;}, o.prototype.reconnectionDelayMax = function (t) {return arguments.length ? (this._reconnectionDelayMax = t, this.backoff && this.backoff.setMax(t), this) : this._reconnectionDelayMax;}, o.prototype.timeout = function (t) {return arguments.length ? (this._timeout = t, this) : this._timeout;}, o.prototype.maybeReconnectOnOpen = function () {!this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();}, o.prototype.open = o.prototype.connect = function (t, e) {if (u("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;u("opening %s", this.uri), this.engine = i(this.uri, this.opts);var n = this.engine,o = this;this.readyState = "opening", this.skipReconnect = !1;var s = c(n, "open", function () {o.onopen(), t && t();}),r = c(n, "error", function (e) {if (u("connect_error"), o.cleanup(), o.readyState = "closed", o.emitAll("connect_error", e), t) {var n = new Error("Connection error");n.data = e, t(n);} else o.maybeReconnectOnOpen();});if (!1 !== this._timeout) {var a = this._timeout;u("connect attempt will timeout after %d", a);var p = setTimeout(function () {u("connect attempt timed out after %d", a), s.destroy(), n.close(), n.emit("error", "timeout"), o.emitAll("connect_timeout", a);}, a);this.subs.push({ destroy: function destroy() {clearTimeout(p);} });}return this.subs.push(s), this.subs.push(r), this;}, o.prototype.onopen = function () {u("open"), this.cleanup(), this.readyState = "open", this.emit("open");var t = this.engine;this.subs.push(c(t, "data", p(this, "ondata"))), this.subs.push(c(t, "ping", p(this, "onping"))), this.subs.push(c(t, "pong", p(this, "onpong"))), this.subs.push(c(t, "error", p(this, "onerror"))), this.subs.push(c(t, "close", p(this, "onclose"))), this.subs.push(c(this.decoder, "decoded", p(this, "ondecoded")));}, o.prototype.onping = function () {this.lastPing = new Date(), this.emitAll("ping");}, o.prototype.onpong = function () {this.emitAll("pong", new Date() - this.lastPing);}, o.prototype.ondata = function (t) {this.decoder.add(t);}, o.prototype.ondecoded = function (t) {this.emit("packet", t);}, o.prototype.onerror = function (t) {u("error", t), this.emitAll("error", t);}, o.prototype.socket = function (t, e) {function n() {~h(i.connecting, o) || i.connecting.push(o);}var o = this.nsps[t];if (!o) {o = new s(this, t, e), this.nsps[t] = o;var i = this;o.on("connecting", n), o.on("connect", function () {o.id = i.engine.id;}), this.autoConnect && n();}return o;}, o.prototype.destroy = function (t) {var e = h(this.connecting, t);~e && this.connecting.splice(e, 1), this.connecting.length || this.close();}, o.prototype.packet = function (t) {u("writing packet %j", t);var e = this;t.query && 0 === t.type && (t.nsp += "?" + t.query), e.encoding ? e.packetBuffer.push(t) : (e.encoding = !0, this.encoder.encode(t, function (n) {for (var o = 0; o < n.length; o++) {e.engine.write(n[o], t.options);}e.encoding = !1, e.processPacketQueue();}));}, o.prototype.processPacketQueue = function () {if (this.packetBuffer.length > 0 && !this.encoding) {var t = this.packetBuffer.shift();this.packet(t);}}, o.prototype.cleanup = function () {u("cleanup");for (var t = this.subs.length, e = 0; e < t; e++) {var n = this.subs.shift();n.destroy();}this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy();}, o.prototype.close = o.prototype.disconnect = function () {u("disconnect"), this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState && this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close();}, o.prototype.onclose = function (t) {u("onclose"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", t), this._reconnection && !this.skipReconnect && this.reconnect();}, o.prototype.reconnect = function () {if (this.reconnecting || this.skipReconnect) return this;var t = this;if (this.backoff.attempts >= this._reconnectionAttempts) u("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1;else {var e = this.backoff.duration();u("will wait %dms before reconnect attempt", e), this.reconnecting = !0;var n = setTimeout(function () {t.skipReconnect || (u("attempting reconnect"), t.emitAll("reconnect_attempt", t.backoff.attempts), t.emitAll("reconnecting", t.backoff.attempts), t.skipReconnect || t.open(function (e) {e ? (u("reconnect attempt error"), t.reconnecting = !1, t.reconnect(), t.emitAll("reconnect_error", e.data)) : (u("reconnect success"), t.onreconnect());}));}, e);this.subs.push({ destroy: function destroy() {clearTimeout(n);} });}}, o.prototype.onreconnect = function () {var t = this.backoff.attempts;this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", t);};}, function (t, e) {function n(t, e, n) {return t.on(e, n), { destroy: function destroy() {t.removeListener(e, n);} };}t.exports = n;}, function (t, e, n) {function o(t, e, n) {this.io = t, this.nsp = e, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0, n && n.query && (this.query = n.query), this.io.autoConnect && this.open();}var i = n(5),s = n(3),r = n(41),a = n(7),c = n(11),p = n(1)("socket.io-client:socket"),u = n(35);t.exports = e = o;var h = { connect: 1, connect_error: 1, connect_timeout: 1, connecting: 1, disconnect: 1, error: 1, reconnect: 1, reconnect_attempt: 1, reconnect_failed: 1, reconnect_error: 1, reconnecting: 1, ping: 1, pong: 1 },_ = s.prototype.emit;s(o.prototype), o.prototype.subEvents = function () {if (!this.subs) {var t = this.io;this.subs = [a(t, "open", c(this, "onopen")), a(t, "packet", c(this, "onpacket")), a(t, "close", c(this, "onclose"))];}}, o.prototype.open = o.prototype.connect = function () {return this.connected ? this : (this.subEvents(), this.io.open(), "open" === this.io.readyState && this.onopen(), this.emit("connecting"), this);}, o.prototype.send = function () {var t = r(arguments);return t.unshift("message"), this.emit.apply(this, t), this;}, o.prototype.emit = function (t) {if (h.hasOwnProperty(t)) return _.apply(this, arguments), this;var e = r(arguments),n = i.EVENT,o = { type: n, data: e };return o.options = {}, o.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof e[e.length - 1] && (p("emitting packet with ack id %d", this.ids), this.acks[this.ids] = e.pop(), o.id = this.ids++), this.connected ? this.packet(o) : this.sendBuffer.push(o), delete this.flags, this;}, o.prototype.packet = function (t) {t.nsp = this.nsp, this.io.packet(t);}, o.prototype.onopen = function () {p("transport is open - connecting"), "/" !== this.nsp && (this.query ? this.packet({ type: i.CONNECT, query: this.query }) : this.packet({ type: i.CONNECT }));}, o.prototype.onclose = function (t) {p("close (%s)", t), this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", t);}, o.prototype.onpacket = function (t) {if (t.nsp === this.nsp) switch (t.type) {case i.CONNECT:this.onconnect();break;case i.EVENT:this.onevent(t);break;case i.BINARY_EVENT:this.onevent(t);break;case i.ACK:this.onack(t);break;case i.BINARY_ACK:this.onack(t);break;case i.DISCONNECT:this.ondisconnect();break;case i.ERROR:this.emit("error", t.data);}}, o.prototype.onevent = function (t) {var e = t.data || [];p("emitting event %j", e), null != t.id && (p("attaching ack callback to event"), e.push(this.ack(t.id))), this.connected ? _.apply(this, e) : this.receiveBuffer.push(e);}, o.prototype.ack = function (t) {var e = this,n = !1;return function () {if (!n) {n = !0;var o = r(arguments);p("sending ack %j", o);var s = u(o) ? i.BINARY_ACK : i.ACK;e.packet({ type: s, id: t, data: o });}};}, o.prototype.onack = function (t) {var e = this.acks[t.id];"function" == typeof e ? (p("calling ack %s with %j", t.id, t.data), e.apply(this, t.data), delete this.acks[t.id]) : p("bad ack %s", t.id);}, o.prototype.onconnect = function () {this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered();}, o.prototype.emitBuffered = function () {var t;for (t = 0; t < this.receiveBuffer.length; t++) {_.apply(this, this.receiveBuffer[t]);}for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++) {this.packet(this.sendBuffer[t]);}this.sendBuffer = [];}, o.prototype.ondisconnect = function () {p("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect");}, o.prototype.destroy = function () {if (this.subs) {for (var t = 0; t < this.subs.length; t++) {this.subs[t].destroy();}this.subs = null;}this.io.destroy(this);}, o.prototype.close = o.prototype.disconnect = function () {return this.connected && (p("performing disconnect (%s)", this.nsp), this.packet({ type: i.DISCONNECT })), this.destroy(), this.connected && this.onclose("io client disconnect"), this;}, o.prototype.compress = function (t) {return this.flags = this.flags || {}, this.flags.compress = t, this;};}, function (t, e, n) {function o(t) {this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, this.query = t.query, this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, this.readyState = "", this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this.forceNode = t.forceNode, this.extraHeaders = t.extraHeaders, this.localAddress = t.localAddress;}var i = n(2),s = n(3);t.exports = o, s(o.prototype), o.prototype.onError = function (t, e) {var n = new Error(t);return n.type = "TransportError", n.description = e, this.emit("error", n), this;}, o.prototype.open = function () {return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this;}, o.prototype.close = function () {return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this;}, o.prototype.send = function (t) {if ("open" !== this.readyState) throw new Error("Transport not open");this.write(t);}, o.prototype.onOpen = function () {this.readyState = "open", this.writable = !0, this.emit("open");}, o.prototype.onData = function (t) {var e = i.decodePacket(t, this.socket.binaryType);this.onPacket(e);}, o.prototype.onPacket = function (t) {this.emit("packet", t);}, o.prototype.onClose = function () {this.readyState = "closed", this.emit("close");};}, function (t, e, n) {function o(t) {var e = t && t.forceBase64;e && (this.supportsBinary = !1), this.perMessageDeflate = t.perMessageDeflate, i.call(this, t);}var i = n(9),s = n(2),r = n(14),a = n(33),c = n(42),p = n(1)("engine.io-client:websocket");t.exports = o, a(o, i), o.prototype.name = "wx", o.prototype.supportsBinary = !0, o.prototype.doOpen = function () {if (this.check()) {var t = this.uri(),e = { agent: this.agent, perMessageDeflate: this.perMessageDeflate };e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (e.headers = this.extraHeaders), this.localAddress && (e.localAddress = this.localAddress), this.isOk = !1, this.ws = wx, this.ws.connectSocket({ url: t }), void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners();}}, o.prototype.addEventListeners = function () {var t = this;this.ws.onSocketOpen(function () {t.onOpen(), t.isOk = !0;}), this.ws.onSocketClose(function () {t.onClose(), t.isOk = !1;}), this.ws.onSocketMessage(function (e) {t.onData(e.data);}), this.ws.onSocketError(function (e) {t.onError("websocket error", e);});}, o.prototype.write = function (t) {function e() {n.emit("flush"), setTimeout(function () {n.writable = !0, n.emit("drain");}, 0);}var n = this;this.writable = !1;for (var o = t.length, i = 0, r = o; i < r; i++) {!function (t) {s.encodePacket(t, n.supportsBinary, function (t) {try {n.ws.sendSocketMessage({ data: t });} catch (t) {p("websocket closed before onclose event");}--o || e();});}(t[i]);}}, o.prototype.onClose = function () {i.prototype.onClose.call(this);}, o.prototype.doClose = function () {"undefined" != typeof this.ws && this.ws.closeSocket();}, o.prototype.uri = function () {var t = this.query || {},e = this.secure ? "wss" : "ws",n = "";this.port && ("wss" === e && 443 !== Number(this.port) || "ws" === e && 80 !== Number(this.port)) && (n = ":" + this.port), this.timestampRequests && (t[this.timestampParam] = c()), this.supportsBinary || (t.b64 = 1), t = r.encode(t), t.length && (t = "?" + t);var o = this.hostname.indexOf(":") !== -1;return e + "://" + (o ? "[" + this.hostname + "]" : this.hostname) + n + this.path + t;}, o.prototype.check = function () {return !this.isOk;};}, function (t, e) {var n = [].slice;t.exports = function (t, e) {if ("string" == typeof e && (e = t[e]), "function" != typeof e) throw new Error("bind() requires a function");var o = n.call(arguments, 2);return function () {return e.apply(t, o.concat(n.call(arguments)));};};}, function (t, e) {var n = [].indexOf;t.exports = function (t, e) {if (n) return t.indexOf(e);for (var o = 0; o < t.length; ++o) {if (t[o] === e) return o;}return -1;};}, function (t, e) {t.exports = Array.isArray || function (t) {return "[object Array]" == Object.prototype.toString.call(t);};}, function (t, e) {e.encode = function (t) {var e = "";for (var n in t) {t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));}return e;}, e.decode = function (t) {for (var e = {}, n = t.split("&"), o = 0, i = n.length; o < i; o++) {var s = n[o].split("=");e[decodeURIComponent(s[0])] = decodeURIComponent(s[1]);}return e;};}, function (t, e) {var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,o = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];t.exports = function (t) {var e = t,i = t.indexOf("["),s = t.indexOf("]");i != -1 && s != -1 && (t = t.substring(0, i) + t.substring(i, s).replace(/:/g, ";") + t.substring(s, t.length));for (var r = n.exec(t || ""), a = {}, c = 14; c--;) {a[o[c]] = r[c] || "";}return i != -1 && s != -1 && (a.source = e, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"), a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), a.ipv6uri = !0), a;};}, function (t, e) {(function (e) {function n(t) {return e.Buffer && e.Buffer.isBuffer(t) || e.ArrayBuffer && t instanceof ArrayBuffer;}t.exports = n;}).call(e, function () {return this;}());}, function (t, e, n) {"use strict";var o = n(3),i = n(28),s = n(4),r = function r(t) {this.init(t);};r.prototype.init = function (t) {this.opts = t, this.dataCache = {}, this.memStore = {}, this.sync_key = 0, this.sync_type = 0, void 0 != this.client && this.client.close(), this.client = i(this.opts.address, { transports: ["websocket", "polling"] });var e = this,n = o.prototype.emit,s = this.client.onevent;this.client.onevent = function (t) {var o = t.data || [];s.call(e.client, t), n.apply(e.client, ["*"].concat(o));}, this.client.on("*", function (t, n) {e.onReceive(t, n);});}, r.prototype.onReceive = function (t, e) {if (this.opts.debug && console.log("---<- event:%s, data:%s", t, JSON.stringify(e)), t !== s.EVENTS.EVENT_NOTIFICATION && t !== s.EVENTS.MSG_SYNC && t !== s.EVENTS.SYNC_CONVERSATION && t !== s.EVENTS.SYNC_EVENT && t !== s.EVENTS.SYNC_RECEIPT && t !== s.EVENTS.RECEIPT_CHANGE && t !== s.ROOM_MSG_SYNC && t !== s.ROOM_MSG_SYNC_HIS) {var n = this.dataCache[e.rid];delete e.rid, n && (0 === e.code && t === s.EVENTS.GET_GROUP_MEMBERS ? e.member_list.forEach(function (t) {n.userInfoGet && n.userInfoGet(t.uid, t.mtime), delete t.uid, delete t.mtime;}) : 0 === e.code && t === s.EVENTS.GET_CONVERSATIONS ? e.conversations.forEach(function (t) {3 === t.type && (n.userInfoGet && n.userInfoGet(t.key, t.utime), delete t.utime);}) : 0 === e.code && t === s.EVENTS.GET_FRIEND_LIST ? e.friend_list.forEach(function (t) {n.userInfoGet && n.userInfoGet(t.uid, 1e3 * t.mtime), delete t.uid;}) : 0 === e.code && t === s.EVENTS.GET_BLACK_LIST && e.black_list.forEach(function (t) {delete t.uid;}), t === s.EVENTS.ACK ? (n.ack && n.ack({ rid: e.rid, data: n.data }), n.cleanAckTimeout()) : (n.cleanRespTimeout(), delete this.dataCache[n.rid], e.code && 0 !== e.code ? n.fail && n.fail(e) : t != s.EVENTS.S_SINGLE_TEXT_ && t != s.EVENTS.SEND_GROUP_MSG && t != s.EVENTS.SEND_ROOM_MSG ? n.hook ? n.hook(e, n.success) : n.success && n.success(e) : (n.data.msg_id = e.msg_id, t === s.EVENTS.S_SINGLE_TEXT_ && (e.target_username = n.data.content.target_id, e.appkey = n.data.appkey), n.success && n.success(e, n.data), n.innerCall && n.innerCall(e.msg_id))));}}, r.prototype.generateRid = function () {for (var t = Math.floor(Math.random() * -2147483646 + 2147483647); this.dataCache[t];) {t = Math.floor(Math.random() * -2147483646 + 2147483647);}return t;}, r.prototype.send = function (t, e) {this.opts.debug && console.log("--->- event:%s, data:%s", t, JSON.stringify(e)), this.client.emit(t, e);}, t.exports = r;}, function (t, e, n) {"use strict";var o = n(19);t.exports = o;}, function (t, e, n) {"use strict";var o = n(31),i = n(17),s = n(4),r = n(21),a = n(23),c = n(22),p = n(20)(),u = n(24),h = function h(t) {var e = t ? t : {};this.opts = { address: e.address ? e.address : s.WSS_ADDRESS, debug: !!e.debug }, this.channel = new i(this.opts), this.syncTask = 0, this.msgReceipTask = 0;};h.prototype.init = function (t) {var e = this;return e.autoDiscon = !0, t.flag !== s.SYNC_TYPE_OPEN && t.flag !== s.SYNC_TYPE_CLOSE || (e.channel.sync_type = t.flag), t.fromPlatForm = s.FROM_PLATFORM, new r(this.channel).setEvent(s.EVENTS.INIT).setData(t).send().addHook(function (n, o) {e.current_appkey = t.appkey, o && o(n);});}, h.prototype.loginOut = function () {if (this.current_user) {this.autoDiscon = !1, this.channel.client.close();var t = this.channel.dataCache;for (var e in t) {t[e].cleanAckTimeout(), t[e].cleanRespTimeout();}this.current_user = null, this.current_appkey = null, this.channel.init(this.channel.opts);}}, h.prototype.login = function (t) {this.__checkInit(), t.is_md5 || (t.password = p(t.password)), t.version = s.SDK_VERSION;var e = this,n = new r(this.channel).setEvent(s.EVENTS.LOGIN).setData(t).addHook(function (n, o) {e.current_user = t.username, u.StorageUtils.removeItems(e.current_user), e.channel.sync_key = 0, e.channel.sync_event_key = 0, e.channel.msg_receipt_key = 0, e.channel.ses_key = s.SESSION_KEY + e.current_appkey + "-" + e.current_user, e.channel.conversations_key = s.CONVERSATION_KEY + e.current_appkey + "-" + e.current_user, e.channel.event_key = s.EVENT_KEY + e.current_appkey + "-" + e.current_user, e._syncCheckTask(), e._receiptReportTask(), e._initConversation(), e.lastMsgs = {}, e.channel.client.removeListener(s.EVENTS.LOGIN), e._addEventListen(), e.firstLogin = !1, o && o(n);});return setTimeout(function () {n.send();}, 500), n;}, h.prototype._initConversation = function () {var t = this,e = u.StorageUtils.getItem(t.channel.conversations_key);null !== e && "" !== e || (e = JSON.stringify({}), u.StorageUtils.addItem(t.channel.conversations_key, e)), t.conversations = JSON.parse(e);}, h.prototype._receiptReportTask = function () {var t = this;t.report = [], t.msgReceipTask = setInterval(function () {t._receiptReport();}, s.RECEIPT_REPORT_INTERVAL);}, h.prototype._syncCheckTask = function () {var t = this,e = u.StorageUtils.getItem(t.channel.event_key);null != e && (t.channel.sync_event_key = e), t._syncCheck({ sync_key: t.channel.sync_key, sync_type: t.channel.sync_type, sync_event_key: t.channel.sync_event_key, msg_receipt_key: t.channel.msg_receipt_key }).onSuccess(function (e) {e && 0 === e.code && (t.channel.sync_key = e.sync_key, t.channel.sync_type = e.sync_type, t.channel.sync_event_key = e.sync_event_key, t.channel.msg_receipt_key = e.msg_receipt_key, u.StorageUtils.addItem(t.channel.event_key, e.sync_event_key));}), t.syncTask = setInterval(function () {t._syncCheck({ sync_key: t.channel.sync_key, sync_type: t.channel.sync_type, sync_event_key: t.channel.sync_event_key, msg_receipt_key: t.channel.msg_receipt_key }).onSuccess(function (e) {e && 0 === e.code && (t.channel.sync_key = e.sync_key, t.channel.sync_type = e.sync_type, t.channel.sync_event_key = e.sync_event_key, t.channel.msg_receipt_key = e.msg_receipt_key, u.StorageUtils.addItem(t.channel.event_key, e.sync_event_key));});}, s.SYNC_INTERVAL);}, h.prototype._syncCheck = function (t) {return new r(this.channel).setEvent(s.EVENTS.SYNC_CHECK).setData(t).send();}, h.prototype.register = function (t) {return this.__checkInit(), t.is_md5 || (t.password = p(t.password)), new r(this.channel).setEvent(s.EVENTS.REGISTER).setData(t).send();}, h.prototype.getUserInfo = function (t) {return this.__checkLogin(), u.StringUtils.isBlack(t.appkey) && (t.appkey = this.current_appkey), new r(this.channel).setEvent(s.EVENTS.GET_ACROSS_USER_INFO).setData(t).send();}, h.prototype.updateSelfInfo = function (t) {return this.__checkLogin(), u.StringUtils.isBlack(t.avatar) || delete t.avatar, new r(this.channel).setEvent(s.EVENTS.UPDATE_SELF_INFO).setData(t).send();}, h.prototype.updateSelfAvatar = function (t) {this.__checkLogin();var e = new r(this.channel).setEvent(s.EVENTS.UPDATE_SELF_INFO),n = this;return this.__uploadFile({ appkey: n.current_appkey, username: n.current_user, file: t.avatar, type: "image" }, function (t, n) {return t ? t.is_timeout ? e.timeout && e.timeout(t.data) : e.fail && e.fail(t.data) : void e.setData({ avatar: n.media_id }).send();}), e;}, h.prototype.updateSelfPwd = function (t) {return this.__checkLogin(), t.is_md5 || (t.old_pwd = p(t.old_pwd), t.new_pwd = p(t.new_pwd)), new r(this.channel).setEvent(s.EVENTS.UPDATE_SELF_PWD).setData(t).send();}, h.prototype.getConversation = function () {var t = this;return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.GET_CONVERSATIONS).setData({}).send().onUserInfoGet(function (e, n) {t[e] = n;}).addHook(function (e, n) {e.conversations.forEach(function (e) {var n;3 === e.type ? (t[e.key] = e.utime, delete e.utime, n = e.appkey + e.username) : (n = e.key, e.gid = e.key), t.conversations[n] ? (t.conversations[n].extras ? e.extras = t.conversations[n].extras : e.extras = {}, e.unread_msg_count = t.conversations[n].unread_msg_count) : (e.extras = {}, e.unread_msg_count = 0, t.conversations[n] = {}, t.conversations[n].extras = {}, t.conversations[n].unread_msg_count = 0, t.conversations[n].msg_time = []);}), u.StorageUtils.addItem(t.channel.conversations_key, JSON.stringify(t.conversations)), n && n(e);});}, h.prototype.resetUnreadCount = function (t) {this.__checkLogin();var e,n = this;t.gid ? e = String(t.gid) : (t.appkey || (t.appkey = n.current_appkey), e = t.appkey + t.username), n.conversations[e] = void 0 === n.conversations[e] ? {} : n.conversations[e], t.gid ? n._updateGroupUnreadCount({ gid: t.gid }) : n._updateSingleUnreadCount({ appkey: t.appkey, username: t.username }), n.conversations[e].unread_msg_count = 0, n.conversations[e].msg_time = [];var o = new Date().getTime();n.lastMsgs[e] && (o = n.lastMsgs[e].last_msg_time), n.conversations[e].recent_time = o, n.current_conversation = e, u.StorageUtils.addItem(n.channel.conversations_key, JSON.stringify(n.conversations));
    }, h.prototype.getUnreadMsgCnt = function (t) {this.__checkLogin();var e,n = this;return t.gid ? e = String(t.gid) : (t.appkey || (t.appkey = n.current_appkey), e = t.appkey + t.username), n.conversations[e] || (n.conversations[e] = {}), n.conversations[e] = void 0 === n.conversations[e] ? {} : n.conversations[e], n.conversations[e].unread_msg_count ? n.conversations[e].unread_msg_count : 0;}, h.prototype.msgRetract = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.MSG_RETRACT).setData(t).send();}, h.prototype.sendSingleMsg = function (t) {return this.__checkLogin(), this.__sendMsg({ type: "single", target_id: t.target_username, target_name: t.target_nickname, content: t.content, extras: t.extras, msg_body: t.msg_body, appkey: t.appkey, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt });}, h.prototype.sendGroupMsg = function (t) {return this.__checkLogin(), this.__sendMsg({ type: "group", target_id: t.target_gid, target_name: t.target_gname, content: t.content, extras: t.extras, msg_body: t.msg_body, at_list: t.at_list, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt });}, h.prototype.sendSinglePic = function (t) {return this.__checkLogin(), this.__sendPic({ type: "single", target_id: t.target_username, target_name: t.target_nickname, file: t.image, msg_body: t.msg_body, extras: t.extras, appkey: t.appkey, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt });}, h.prototype.sendGroupPic = function (t) {return this.__checkLogin(), this.__sendPic({ type: "group", target_id: t.target_gid, target_name: t.target_gname, file: t.image, msg_body: t.msg_body, extras: t.extras, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt });}, h.prototype.sendSingleFile = function (t) {return this.__sendVideoOrFile({ type: "single", target_id: t.target_username, target_name: t.target_nickname, file: t.file, msg_body: t.msg_body, extras: t.extras, appkey: t.appkey, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt }, "file");}, h.prototype.sendGroupFile = function (t) {return this.__sendVideoOrFile({ type: "group", target_id: t.target_gid, target_name: t.target_gname, file: t.file, msg_body: t.msg_body, extras: t.extras, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt }, "file");}, h.prototype.sendSingleVedio = function (t) {return this.__sendVideoOrFile({ type: "single", target_id: t.target_username, target_name: t.target_nickname, file: t.file, msg_body: t.msg_body, extras: t.extras, appkey: t.appkey, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt }, "video");}, h.prototype.sendGroupVedio = function (t) {return this.__sendVideoOrFile({ type: "group", target_id: t.target_gid, target_name: t.target_gname, file: t.file, msg_body: t.msg_body, extras: t.extras, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt }, "video");}, h.prototype.sendSingleLocation = function (t) {return this.__checkLogin(), this.__sendLocation({ type: "single", target_id: t.target_username, target_name: t.target_nickname, latitude: t.latitude, longitude: t.longitude, scale: t.scale, label: t.label, msg_body: t.msg_body, extras: t.extras, appkey: t.appkey, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt });}, h.prototype.sendGroupLocation = function (t) {return this.__checkLogin(), this.__sendLocation({ type: "group", target_id: t.target_gid, target_name: t.target_gname, latitude: t.latitude, longitude: t.longitude, scale: t.scale, label: t.label, msg_body: t.msg_body, extras: t.extras, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt });}, h.prototype.sendSingleCustom = function (t) {return this.__checkLogin(), this.__sendCustom({ type: "single", target_id: t.target_username, target_name: t.target_nickname, custom: t.custom, extras: t.extras, msg_body: t.msg_body, appkey: t.appkey, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt });}, h.prototype.sendGroupCustom = function (t) {return this.__checkLogin(), this.__sendCustom({ type: "group", target_id: t.target_gid, target_name: t.target_gname, custom: t.custom, msg_body: t.msg_body, extras: t.extras, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt });}, h.prototype.createGroup = function (t) {this.__checkLogin();var e = this,n = new r(this.channel).setEvent(s.EVENTS.CREATE_GROUP);return t.avatar ? this.__uploadFile({ appkey: e.current_appkey, username: e.current_user, file: t.avatar, type: "image" }, function (e, o) {return e ? e.is_timeout ? n.timeout && n.timeout(e.data) : n.fail && n.fail(e.data) : (delete t.avatar, t.media_id = o.media_id, void n.setData(t).send());}) : n.setData(t).send(), n;}, h.prototype.exitGroup = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.EXIT_GROUP).setData(t).send();}, h.prototype.getGroups = function () {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.GET_GROUPS_LIST).setData({}).send().addHook(function (t, e) {t.group_list.forEach(function (t) {t.group_type = t.flag, delete t.flag;}), e && e(t);});}, h.prototype.getGroupInfo = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.GET_GROUP_INFO).setData(t).send().addHook(function (t, e) {t.group_info.group_type = t.group_info.flag, delete t.group_info.flag, e && e(t);});}, h.prototype.updateGroupInfo = function (t) {this.__checkLogin();var e = this,n = new r(this.channel).setEvent(s.EVENTS.UPDATE_GROUP_INFO);return t.avatar ? this.__uploadFile({ appkey: e.current_appkey, username: e.current_user, file: t.avatar, type: "image" }, function (e, o) {return e ? e.is_timeout ? n.timeout && n.timeout(e.data) : n.fail && n.fail(e.data) : (delete t.avatar, t.media_id = o.media_id, void n.setData(t).send());}) : n.setData(t).send(), n;}, h.prototype.getGroupMembers = function (t) {var e = this;return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.GET_GROUP_MEMBERS).setData(t).send().onUserInfoGet(function (t, n) {e[t] = n;});}, h.prototype.addGroupMembers = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.ADD_ACROSS_GROUP_MEMBER).setData(t).send();}, h.prototype.delGroupMembers = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.DEL_ACROSS_GROUP_MEMBER).setData(t).send();}, h.prototype.getNoDisturb = function () {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.NO_DISTURB).setData({ version: 0 }).send().addHook(function (t, e) {t.no_disturb.groups.forEach(function (t) {t.group_type = t.flag, delete t.flag;}), e && e(t);});}, h.prototype.addSingleNoDisturb = function (t) {return this.__checkLogin(), t.version = 0, new r(this.channel).setEvent(s.EVENTS.ADD_MSG_NO_DISTURB_SINGLE).setData(t).send();}, h.prototype.delSingleNoDisturb = function (t) {return this.__checkLogin(), t.version = 0, new r(this.channel).setEvent(s.EVENTS.DELETE_MSG_NO_DISTURB_SINGLE).setData(t).send();}, h.prototype.addGroupNoDisturb = function (t) {return this.__checkLogin(), t.version = 0, new r(this.channel).setEvent(s.EVENTS.ADD_MSG_NO_DISTURB_GROUP).setData(t).send();}, h.prototype.delGroupNoDisturb = function (t) {return this.__checkLogin(), t.version = 0, new r(this.channel).setEvent(s.EVENTS.DELETE_MSG_NO_DISTURB_GROUP).setData(t).send();}, h.prototype.addGlobalNoDisturb = function () {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.ADD_MSG_NO_DISTURB_GLOBAL).setData({ version: 0 }).send();}, h.prototype.delGlobalNoDisturb = function () {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.DELETE_MSG_NO_DISTURB_GLOBAL).setData({ version: 0 }).send();}, h.prototype.getBlacks = function () {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.GET_BLACK_LIST).setData({ version: 0 }).send();}, h.prototype.addSingleBlacks = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.ADD_BLACK_LIST).setData(t).send();}, h.prototype.delSingleBlacks = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.DEL_BLACK_LIST).setData(t).send();}, h.prototype.getFriendList = function () {var t = this;return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.GET_FRIEND_LIST).setData({}).send().onUserInfoGet(function (e, n) {t[e] = n;});}, h.prototype.addFriend = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.ADD_FRIEND).setData(t).send();}, h.prototype.acceptFriend = function (t) {return this.__checkLogin(), t.why = "yes", t.from_type = s.FRIEND_INVITED, new r(this.channel).setEvent(s.EVENTS.ADD_FRIEND).setData(t).send();}, h.prototype.declineFriend = function (t) {return this.__checkLogin(), t.why && "" != t.why.trim() || (t.why = "no"), t.from_type = s.FRIEND_INVITED, new r(this.channel).setEvent(s.EVENTS.ADD_FRIEND).setData(t).send();}, h.prototype.delFriend = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.DEL_FRIEND).setData(t).send();}, h.prototype.updateFriendMemo = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.UPDATE_FRIEND_MEMO).setData(t).send();}, h.prototype.addGroupShield = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.ADD_MSG_SHIELD_GROUP).setData(t).send();}, h.prototype.delGroupShield = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.DEL_MSG_SHIELD_GROUP).setData(t).send();}, h.prototype.groupShieldList = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.LIST_SHIELD_GROUP).setData(t).send().addHook(function (t, e) {t.groups.forEach(function (t) {t.group_type = t.flag, delete t.flag;}), e && e(t);});}, h.prototype.getResource = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.GET_RESOURCE).setData(t).send();}, h.prototype._updateGroupUnreadCount = function (t) {this.__checkLogin(), t.type = 4, new r(this.channel).setEvent(s.EVENTS.UNREAD_GROUP_COUNT).setData(t).send();}, h.prototype._updateSingleUnreadCount = function (t) {this.__checkLogin(), t.type = 3, new r(this.channel).setEvent(s.EVENTS.UNREAD_SINGLE_COUNT).setData(t).send();}, h.prototype.msgUnreadList = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.MSG_UNREAD_LIST).setData(t).send();}, h.prototype.addGroupReceiptReport = function (t) {this.__checkLogin();var e = this;if (!(t.msg_ids instanceof Array) || 0 === t.msg_ids.length) return void console.error("msg_ids is not Array type or msg_ids size=0");t.key = t.gid, t.type = 4;var n = new a(t);return e.report.push(n), setTimeout(function () {e._checkReportSize() >= s.RECEIPT_REPORT_MAX_SIZE && e._receiptReport();}, 50), n;}, h.prototype.addSingleReceiptReport = function (t) {this.__checkLogin();var e = this;if (!(t.msg_ids instanceof Array) || 0 === t.msg_ids.length) return void console.error("msg_ids is not Array type or msg_ids size=0");t.appkey || (t.appkey = e.current_appkey), t.type = 3, t.key = t.appkey + t.username;var n = new a(t);return e.report.push(n), setTimeout(function () {e._checkReportSize() >= s.RECEIPT_REPORT_MAX_SIZE && e._receiptReport();}, 50), n;}, h.prototype._checkReportSize = function () {var t = this,e = 0;return t.report.forEach(function (t) {e += t.args.msg_ids.length;}), e;}, h.prototype.transSingleMsg = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.TRANS_MSG_SINGLE).setData(t).send();}, h.prototype.transGroupMsg = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.TRANS_MSG_GROUP).setData(t).send();}, h.prototype.transPlatMsg = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.TRANS_MSG_PLATFORM).setData(t).send();}, h.prototype.updateConversation = function (t) {this.__checkLogin();var e = this;t.appkey || (t.appkey = e.current_appkey);var n;t.gid ? n = t.gid : t.username && (n = t.appkey + t.username), n && t.extras && (e.conversations[n] || (e.conversations[n] = {}), e.conversations[n].extras = t.extras), u.StorageUtils.addItem(e.channel.conversations_key, JSON.stringify(e.conversations));}, h.prototype.addGroupMemberResp = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.ADMIN_ADD_GROUP_MEMBER).setData(t).send();}, h.prototype.joinGroup = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.APPLY_JOIN_GROUP).setData(t).send();}, h.prototype.getAppkeyChatrooms = function (t) {return this.__checkLogin(), !t && (t = {}), new r(this.channel).setEvent(s.EVENTS.ROOM_LIST).setData(t).send().addHook(function (t, e) {t.result.rooms.forEach(function (t) {u.Cache.rooms[t.id] = t;}), e && e(t);});}, h.prototype.getSelfChatrooms = function () {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.ROOM_LIST_SELF).setData({}).send().addHook(function (t, e) {t.chat_rooms.forEach(function (t) {u.Cache.rooms[t.id] = t;}), e && e(t);});}, h.prototype.getChatroomInfo = function (t) {this.__checkLogin();var e = new r(this.channel);return u.Cache.rooms[t.id] ? setTimeout(function () {var n = {};n.code = 0, n.message = "success", n.info = u.Cache.rooms[t.id], e.cleanRespTimeout(), e.success && e.success(n);}, 100) : e.setEvent(s.EVENTS.ROOM_INFO).setData(t).send().addHook(function (t, e) {u.Cache.rooms[t.info.id] = t.info, e && e(t);}), e;}, h.prototype.enterChatroom = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.JOIN_ROOM).setData(t).send();}, h.prototype.exitChatroom = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.EXIT_ROOM).setData(t).send();}, h.prototype.sendChatroomMsg = function (t) {return this.__checkLogin(), t.target_rname || (t.target_rname = void 0 === u.Cache.rooms[t.target_rid] ? "" : u.Cache.rooms[t.target_rid].name), this.__sendMsg({ type: "chatroom", target_id: t.target_rid, target_name: t.target_rname, content: t.content, extras: t.extras, msg_body: t.msg_body });}, h.prototype.sendChatroomPic = function (t) {return this.__checkLogin(), t.target_rname || (t.target_rname = void 0 === u.Cache.rooms[t.target_rid] ? "" : u.Cache.rooms[t.target_rid].name), this.__sendPic({ type: "chatroom", target_id: t.target_rid, target_name: t.target_rname, file: t.image, extras: t.extras, msg_body: t.msg_body });}, h.prototype.sendChatroomFile = function (t) {return this.__checkLogin(), t.target_rname || (t.target_rname = void 0 === u.Cache.rooms[t.target_rid] ? "" : u.Cache.rooms[t.target_rid].name), this.__sendVideoOrFile({ type: "chatroom", target_id: t.target_rid, target_name: t.target_rname, file: t.file, extras: t.extras, msg_body: t.msg_body }, "file");}, h.prototype.sendChatroomVideo = function (t) {return this.__checkLogin(), t.target_rname || (t.target_rname = void 0 === u.Cache.rooms[t.target_rid] ? "" : u.Cache.rooms[t.target_rid].name), this.__sendVideoOrFile({ type: "chatroom", target_id: t.target_rid, target_name: t.target_rname, file: t.file, msg_body: t.msg_body, extras: t.extras }, "video");}, h.prototype.sendChatroomCustom = function (t) {return this.__checkLogin(), t.target_rname || (t.target_rname = void 0 === u.Cache.rooms[t.target_rid] ? "" : u.Cache.rooms[t.target_rid].name), this.__sendCustom({ type: "chatroom", target_id: t.target_rid, target_name: t.target_rname, custom: t.custom, extras: t.extras, msg_body: t.msg_body });}, h.prototype.sendChatroomLocation = function (t) {return this.__checkLogin(), t.target_rname || (t.target_rname = void 0 === u.Cache.rooms[t.target_rid] ? "" : u.Cache.rooms[t.target_rid].name), this.__sendLocation({ type: "chatroom", target_id: t.target_rid, target_name: t.target_rname, latitude: t.latitude, longitude: t.longitude, scale: t.scale, label: t.label, extras: t.extras, msg_body: t.msg_body });}, h.prototype.addGroupMemSilence = function (t) {return this.__checkLogin(), t.keep_silence = !0, new r(this.channel).setEvent(s.EVENTS.GROUP_MEM_SILENCE).setData(t).send();}, h.prototype.delGroupMemSilence = function (t) {return this.__checkLogin(), t.keep_silence = !1, new r(this.channel).setEvent(s.EVENTS.GROUP_MEM_SILENCE).setData(t).send();}, h.prototype.dissolveGroup = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.DISSOLVE_GROUP).setData(t).send();}, h.prototype.addGroupKeeper = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.ADD_GROUP_KEEPER).setData(t).send();}, h.prototype.delGroupKeeper = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.DEL_GROUP_KEEPER).setData(t).send();}, h.prototype.changeGroupAdmin = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.CHANGE_GROUP_ADMIN).setData(t).send();}, h.prototype.getAppkeyPublicGroups = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.PUBLIC_GROUP_LIST).setData(t).send().addHook(function (t, e) {t.result.groups.forEach(function (t) {t.group_type = t.flag, delete t.flag;}), e && e(t);});}, h.prototype.isInit = function () {return !!this.current_appkey;}, h.prototype.isLogin = function () {return !!this.current_user;}, h.prototype.isConnect = function () {return !!this.channel.client.connected;}, h.prototype._addEventListen = function () {var t = this;t.channel.client.on(s.EVENTS.MSG_SYNC, function (e) {t._onMsgReceive(e);}), t.channel.client.on(s.EVENTS.EVENT_NOTIFICATION, function (e) {t._onEventNotification(e);}), t.channel.client.on(s.EVENTS.SYNC_CONVERSATION, function (e) {t._onSyncConversation(e);}), t.channel.client.on(s.EVENTS.SYNC_EVENT, function (e) {t._onSyncEvent(e);}), t.channel.client.on(s.EVENTS.SYNC_RECEIPT, function (e) {t._onSyncMsgReceipt(e);}), t.channel.client.on(s.EVENTS.RECEIPT_CHANGE, function (e) {t._onMsgReceiptChange(e);}), t.channel.client.on(s.EVENTS.TRANS_MSG_REC, function (e) {t._onTransMsgRec(e);}), t.channel.client.on(s.EVENTS.ROOM_MSG_SYNC, function (e) {t._onRoomMsg(e);}), t.channel.client.on(s.EVENTS.ROOM_MSG_SYNC_HIS, function (e) {t._onSyncRoomMsg(e);}), t.channel.client.on("disconnect", function () {t._onDisconnect();});}, h.prototype.onRoomMsg = function (t) {this._onRoomMsgFn = t;}, h.prototype._onRoomMsg = function (t) {this._onRoomMsgFn && this._onRoomMsgFn(t);}, h.prototype._onSyncRoomMsg = function (t) {var e = this;t.messages.forEach(function (n) {u.Cache.rooms[n.room_id] || e.getChatroomInfo({ id: t.room_id }), n.msgs && n.msgs.forEach(function (t) {e._onRoomMsgFn && e._onRoomMsgFn(t);});});}, h.prototype.onMsgReceive = function (t) {this._onMsgReceiveFn = t;}, h.prototype._onMsgReceive = function (t) {var e = [],n = this;Array.prototype.push.apply(e, t.messages.map(function (t) {return { msg_id: t.msg_id, msg_type: t.msg_type, from_uid: t.from_uid, from_gid: t.from_gid };})), t.messages.forEach(function (t) {if (t.content.sui_mtime && n[t.from_uid] && t.content.sui_mtime > new Date(n[t.from_uid]).getTime() / 1e3) {n[t.from_uid] = 1e3 * t.content.sui_mtime;var e = {};e.from_username = t.content.from_id, e.from_appkey = t.content.from_appkey, e.mtime = t.content.sui_mtime, delete t.content.sui_mtime, n._updateInfoEventFun && n._updateInfoEventFun(e);}var o;3 === t.msg_type ? (t.key = t.from_uid, t.from_username = t.content.from_id, t.from_appkey = t.content.from_appkey, o = t.from_appkey + t.from_username) : (t.key = t.from_gid, o = String(t.from_gid)), 0 === t.msg_level ? t.msg_level = "normal" : 1 === t.msg_level && (t.msg_level = "across");var i = !1;if (t.from_appkey === n.current_appkey && t.from_username === n.current_user) {i = !0;var a = void 0 === t.content.target_appkey || "" === t.content.target_appkey ? t.content.from_appkey : t.content.target_appkey;o = a + t.content.target_id;}n.lastMsgs[o] = { last_msg_time: t.ctime_ms }, n.conversations[o] || (n.conversations[o] = {}, n.conversations[o].extras = {}, n.conversations[o].unread_msg_count = 0, n.conversations[o].msg_time = []), n.current_conversation === o || i ? (n.conversations[o].recent_time = t.ctime_ms, n.conversations[o].unread_msg_count = 0, n.conversations[o].msg_time = []) : (n.conversations[o].unread_msg_count = n.conversations[o].unread_msg_count + 1, n.conversations[o].msg_time.push(t.ctime_ms)), new r(n.channel).setEvent(s.EVENTS.MSG_RECV_V2).setData({ msg_id: t.msg_id, msg_type: t.msg_type, from_uid: t.from_uid, from_gid: t.from_gid }).send();}), u.StorageUtils.addItem(n.channel.conversations_key, JSON.stringify(n.conversations)), this._onMsgReceiveFn && this._onMsgReceiveFn(t);}, h.prototype.onEventNotification = function (t) {this._onEventNotificationFn = t;}, h.prototype._onEventNotification = function (t) {var e = this;if (200 === t.event_type) return void (3 === t.description.type ? e._dealMutlReadEvent(t.description.type, t.ctime_ms, t.description.appkey, t.description.username) : e._dealMutlReadEvent(t.description.type, t.ctime_ms, t.description.gid));var n = e.__eventDateFilter(t);if (56 === t.event_type && 10 == t.extra ? (n.by_self = !1, delete n.extra) : 56 === t.event_type && 59 == t.extra && (n.by_self = !0, delete n.extra), 1 === t.event_type) {var o = { event_id: t.event_id, event_type: t.event_type, from_uid: t.from_uid, gid: t.gid };new r(e.channel).setEvent(s.EVENTS.EVENT_NOTIFICATION).setData(o).send();}e._onEventNotificationFn && e._onEventNotificationFn(n), s.LOGIN_OUT_EVENT.indexOf(t.event_type) != -1 && e.loginOut();}, h.prototype.onSyncConversation = function (t) {this._onSyncConversationFn = t;}, h.prototype._onSyncConversation = function (t) {var e = this;e.channel.sync_key = t.sync_key, t.messages && (t.messages.forEach(function (t) {var n,o = 0;n = 3 === t.msg_type ? t.from_appkey + t.from_username : String(t.from_gid);var i = t.msgs[t.msgs.length - 1].ctime_ms;if (e.current_conversation === n) e.conversations[n] = void 0 === e.conversations[n] ? {} : e.conversations[n], e.conversations[n].unread_msg_count = o, e.conversations[n].recent_time = i, e.conversations[n].msg_time = [];else if (e.conversations[n] && e.conversations[n].recent_time) {var r = e.conversations[n].recent_time;t.msgs.forEach(function (t) {t.ctime_ms <= r || t.content.from_appkey === e.current_appkey && t.content.from_id === e.current_user ? (o = 0, e.conversations[n].msg_time = []) : (o++, e.conversations[n].msg_time.push(t.ctime_ms));}), e.channel.sync_type === s.SYNC_TYPE_OPEN ? e.conversations[n].unread_msg_count = o : e.conversations[n].unread_msg_count += o;} else o = t.unsync_count, e.conversations[n] = void 0 === e.conversations[n] ? {} : e.conversations[n], e.conversations[n].unread_msg_count = o, t.msgs.length - 1 - o < 0 ? e.conversations[n].recent_time = -1 : e.conversations[n].recent_time = t.msgs[t.msgs.length - 1 - o].ctime_ms, e.conversations[n].msg_time = [];e.lastMsgs[n] = { last_msg_time: i }, delete t.unsync_count, t.unread_msg_count = o;}), u.StorageUtils.addItem(e.channel.conversations_key, JSON.stringify(e.conversations)), e._onSyncConversationFn && t.messages.length > 0 && e._onSyncConversationFn(t.messages));var n = { sync_key: e.channel.sync_key };new r(e.channel).setEvent(s.EVENTS.SYNC_CONVERSATION_ACK).setData(n).send();}, h.prototype.onSyncEvent = function (t) {this._onSyncEventFn = t;}, h.prototype._onSyncEvent = function (t) {var e = this;e.channel.sync_event_key = t.sync_key, u.StorageUtils.addItem(e.channel.event_key, t.sync_key);var n = { sync_key: e.channel.sync_event_key };new r(e.channel).setEvent(s.EVENTS.SYNC_EVENT_ACK).setData(n).send(), setTimeout(function () {if (e._onSyncEventFn && t.events && t.events.length > 0) {var n = [];t.events.forEach(function (o) {if (200 === o.event_type) 3 === o.description.type ? e._dealMutlReadEvent(o.description.type, o.ctime_ms, o.description.appkey, o.description.username) : e._dealMutlReadEvent(o.description.type, o.ctime_ms, o.description.gid);else {var i = e.__eventDateFilter(o);56 === t.event_type && 10 == t.extra ? (delete i.extra, i.by_self = !1) : 56 === t.event_type && 59 == t.extra && (delete i.extra, i.by_self = !0), n.push(i);}}), e._onSyncEventFn(n);}}, 1700);}, h.prototype.onSyncMsgReceipt = function (t) {this._onSyncMsgReceiptFn = t;}, h.prototype._onSyncMsgReceipt = function (t) {var e = this;if (e.channel.msg_receipt_key = t.sync_key, e._onSyncMsgReceiptFn && t.receipts && t.receipts.length > 0) {var n = {},o = [];t.receipts.forEach(function (t) {var e = t.gid;if (3 === t.type && (e = t.appkey + t.username), n[e]) {var i = Number(n[e]);Array.prototype.push.apply(o[i].receipt_msgs, t.receipt_msgs);} else t.receipt_msgs.length > 0 && (n[e] = String(o.length), o.push(t));}), setTimeout(function () {e._onSyncMsgReceiptFn && o.length > 0 && e._onSyncMsgReceiptFn(o);}, 1500);}var i = { sync_key: e.channel.msg_receipt_key };new r(e.channel).setEvent(s.EVENTS.SYNC_RECEIPT_ACK).setData(i).send();}, h.prototype.onMsgReceiptChange = function (t) {this._onMsgReceiptChangeFn = t;}, h.prototype._onMsgReceiptChange = function (t) {this._onMsgReceiptChangeFn && this._onMsgReceiptChangeFn(t);}, h.prototype.onUserInfUpdate = function (t) {this._updateInfoEventFun = t;}, h.prototype.onMutiUnreadMsgUpdate = function (t) {this._conversationUpdateFun = t;}, h.prototype.onTransMsgRec = function (t) {this._onTransMsgRecFn = t;}, h.prototype._onTransMsgRec = function (t) {this._onTransMsgRecFn && this._onTransMsgRecFn(t);}, h.prototype.onDisconnect = function (t) {this._onDisconnectFn = t;}, h.prototype._onDisconnect = function () {var t = this;clearTimeout(t.syncTask), clearTimeout(t.msgReceipTask), t.autoDiscon && (t.current_appkey = null, t.current_user = null, t._onDisconnectFn && t._onDisconnectFn()), this.channel.init(this.channel.opts);}, h.prototype._dealMutlReadEvent = function (t, e, n, o) {var i,s = this,r = {};if (r.type = t, 3 === t ? (i = n + o, r.username = o, r.appkey = n) : (i = String(n), r.gid = n), s.conversations[i] = void 0 === s.conversations[i] ? { msg_time: [], unread_msg_count: 0 } : s.conversations[i], s.conversations[i].recent_time = e, s.current_conversation === i) s.conversations[i].unread_msg_count = 0, s.conversations[i].msg_time = [];else {var a = s.conversations[i].unread_msg_count,c = s.conversations[i].msg_time,p = [],h = 0;c.forEach(function (t) {t > e && (h++, p.push(t));}), s.conversations[i].msg_time = p, h < a && (s.conversations[i].unread_msg_count = h, r.unreadCount = h, u.StorageUtils.addItem(s.channel.conversations_key, JSON.stringify(s.conversations)), s._conversationUpdateFun && s._conversationUpdateFun(r));}}, h.prototype._receiptReport = function () {var t = this;if (t.report.length > 0) {var e = {},n = [];t.report.forEach(function (t) {if (e[t.args.key]) {var o = Number(e[t.args.key]);Array.prototype.push.apply(n[o].result.msg_ids, t.args.msg_ids), n[o].msg_reports.push(t);} else e[t.args.key] = String(n.length), n.push({ result: t.args, msg_reports: [t] });}), t.report = [];for (var o = 0; o < n.length; o++) {n[o].result.msg_ids = u.ArrayUtils.delRepeatItem(n[o].result.msg_ids), delete n[o].result.key, t._msgReceipt(n[o]);}}}, h.prototype._msgReceipt = function (t) {new r(this.channel).setEvent(s.EVENTS.RECEIPT_REPORT).setData({ sessions: [t.result] }).send().onSuccess(function (e) {t.msg_reports.forEach(function (t) {t.success && t.success(e, t.args.msg_ids);});}).onFail(function (e) {t.msg_reports.forEach(function (t) {t.fail && t.fail(e, t.args.msg_ids);});}).onAck(function (e) {t.msg_reports.forEach(function (t) {t.ack && t.ack(e, t.args.msg_ids);});}).onTimeout(function (e) {t.msg_reports.forEach(function (t) {t.timeout && t.timeout(e, t.args.msg_ids);});});}, h.prototype.__eventDateFilter = function (t) {var e = {};return e.event_id = t.event_id, e.event_type = t.event_type, e.from_username = t.from_username, e.gid = t.gid, e.to_usernames = t.to_usernames, e.ctime = t.ctime, e.extra = t.extra, e.return_code = t.return_code, e.from_appkey = t.from_appkey, e.msg_ids = t.msg_ids, e.from_gid = t.from_gid, e.msgid_list = t.msgid_list, e.to_groups = t.to_groups, e.new_owner = t.new_owner, e.group_name = t.group_name, e.ctime_ms = t.ctime_ms, e.media_id = t.media_id, e.from_nickname = t.from_nickname, e.from_eventid = t.from_eventid, 100 === t.event_type && 7 === t.extra ? e.description = JSON.parse(t.description) : e.description = t.description, 55 === t.event_type && 0 === t.from_gid ? e.type = 0 : 55 === t.event_type && 0 != t.from_gid && (e.type = 1), e;}, h.prototype.__checkConnect = function () {if (!this.channel.client.connected) throw new Error("wss socket not connect");}, h.prototype.__checkInit = function () {if (!this.current_appkey) throw new Error("必须执行init操作后能执行此动作");}, h.prototype.__checkLogin = function () {if (!this.current_user) throw new Error("必须执行login操作后能执行此动作");}, h.prototype.__getUploadToken = function () {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.GET_UPLOAD_TOKEN).setData({}).send();}, h.prototype.__uploadFile0 = function (t, e) {wx.uploadFile({ url: s.UPLOAD_FILE + "?type=" + t.type, filePath: t.file, name: "file", header: { "X-App-Key": t.appkey, Authorization: "Basic " + o.btoa(t.username + ":" + t.token), "jm-channel": s.PLAT_CHANNEL }, success: function success(t) {if (200 == t.statusCode) e(null, JSON.parse(t.data));else try {var n = JSON.parse(t.data);e(898061 === n.error.code ? { code: 880210, message: "file size exceed limit" } : n);} catch (t) {e({ code: 880210, message: "file size exceed the limit" });}}, fail: function fail(t) {console.error(JSON.parse(t));} });}, h.prototype.__uploadFile = function (t, e) {var n = this;n.__getUploadToken().onSuccess(function (o) {n.__uploadFile0({ type: t.type, file: t.file, appkey: t.appkey, username: t.username, token: o.uptoken }, e);}).onFail(function (t) {e({ data: t });}).onTimeout(function (t) {e({ is_timeout: !0, data: t });});}, h.prototype.__sendMsg = function (t) {return this.__checkLogin(), new r(this.channel).setEvent("single" === t.type ? s.EVENTS.S_SINGLE_TEXT : "group" === t.type ? s.EVENTS.SEND_GROUP_MSG : s.EVENTS.SEND_ROOM_MSG).setData(new c(this.current_user, this.current_appkey).setType(t.type).setAppkey(t.appkey).setNeedReceipt(t.need_receipt).setTarget(t.target_id, t.target_name).setText(t.content ? t.content : t.msg_body.text, t.content ? t.extras : t.msg_body.extras).setAtList(t.at_list).setNoOffline(t.no_offline === !0).setNoNotification(t.no_notification === !0).setCustomNotification(t.custom_notification).build()).send();}, h.prototype.__sendPic = function (t) {this.__checkLogin();var e = new r(this.channel).setEvent("single" === t.type ? s.EVENTS.S_SINGLE_TEXT : "group" === t.type ? s.EVENTS.SEND_GROUP_MSG : s.EVENTS.SEND_ROOM_MSG),n = this,o = new c(n.current_user, n.current_appkey).setType(t.type).setAppkey(t.appkey).setNeedReceipt(t.need_receipt).setTarget(t.target_id, t.target_name).setNoOffline(t.no_offline === !0).setNoNotification(t.no_notification === !0).setCustomNotification(t.custom_notification);return t.file ? this.__uploadFile({ appkey: n.current_appkey, username: n.current_user, file: t.file, type: "image" }, function (n, i) {return n ? n.is_timeout ? e.timeout && e.timeout(n.data) : e.fail && e.fail(n.data) : void e.setData(o.setImage(i, t.extras).build()).send();}) : e.setData(o.setImage(t.msg_body, t.msg_body.extras).build()).send(), e;}, h.prototype.__sendVideoOrFile = function (t, e) {this.__checkLogin();var n = new r(this.channel).setEvent("single" === t.type ? s.EVENTS.S_SINGLE_TEXT : "group" === t.type ? s.EVENTS.SEND_GROUP_MSG : s.EVENTS.SEND_ROOM_MSG),o = this,i = new c(o.current_user, o.current_appkey).setType(t.type).setAppkey(t.appkey).setNeedReceipt(t.need_receipt).setTarget(t.target_id, t.target_name).setNoOffline(t.no_offline === !0).setNoNotification(t.no_notification === !0).setCustomNotification(t.custom_notification);return t.file ? this.__uploadFile({ appkey: o.current_appkey, username: o.current_user, file: t.file, type: "file" }, function (o, s) {return o ? o.is_timeout ? n.timeout && n.timeout(o.data) : n.fail && n.fail(o.data) : ("video" === e && (!t.extras && (t.extras = {}), t.extras.video = s.media_id.slice(s.media_id.lastIndexOf(".") + 1)), void n.setData(i.setFile(s, t.extras).build()).send());}) : n.setData(i.setFile(t.msg_body, t.msg_body.extras).build()).send(), n;}, h.prototype.__sendVoice = function (t) {this.__checkLogin();var e = new r(this.channel).setEvent("single" === t.type ? s.EVENTS.S_SINGLE_TEXT : s.EVENTS.SEND_GROUP_MSG),n = this,o = new c(n.current_user, n.current_appkey).setType(t.type).setAppkey(t.appkey).setNeedReceipt(t.need_receipt).setTarget(t.target_id, t.target_name).setNoOffline(t.no_offline === !0).setNoNotification(t.no_notification === !0).setCustomNotification(t.custom_notification);return t.file ? this.__uploadFile({ appkey: n.current_appkey, username: n.current_user, file: t.file, type: "voice" }, function (n, i) {return n ? n.is_timeout ? e.timeout && e.timeout(n.data) : e.fail && e.fail(n.data) : void e.setData(o.setVoice(i, t.extras).build()).send();}) : e.setData(o.setVoice(t.msg_body, t.msg_body.extras).build()).send(), e;}, h.prototype.__sendLocation = function (t) {return this.__checkLogin(), new r(this.channel).setEvent("single" === t.type ? s.EVENTS.S_SINGLE_TEXT : "group" === t.type ? s.EVENTS.SEND_GROUP_MSG : s.EVENTS.SEND_ROOM_MSG).setData(new c(this.current_user, this.current_appkey).setType(t.type).setAppkey(t.appkey).setNeedReceipt(t.need_receipt).setTarget(t.target_id, t.target_name).setLocation(t.latitude ? t : t.msg_body, t.latitude ? t.extras : t.msg_body.extras).setNoOffline(t.no_offline === !0).setNoNotification(t.no_notification === !0).setCustomNotification(t.custom_notification).build()).send();}, h.prototype.__sendCustom = function (t) {return this.__checkLogin(), new r(this.channel).setEvent("single" === t.type ? s.EVENTS.S_SINGLE_TEXT : "group" === t.type ? s.EVENTS.SEND_GROUP_MSG : s.EVENTS.SEND_ROOM_MSG).setData(new c(this.current_user, this.current_appkey).setType(t.type).setAppkey(t.appkey).setNeedReceipt(t.need_receipt).setTarget(t.target_id, t.target_name).setCustom(t.custom ? t.custom : t.msg_body, t.custom ? t.extras : t.msg_body.extras).setCustom(t.custom).setNoOffline(t.no_offline === !0).setNoNotification(t.no_notification === !0).setCustomNotification(t.custom_notification).build()).send();
    }, t.exports = h;}, function (t, e) {"use strict";t.exports = function () {function t(t, e) {var n = (65535 & t) + (65535 & e),o = (t >> 16) + (e >> 16) + (n >> 16);return o << 16 | 65535 & n;}function e(t, e) {return t << e | t >>> 32 - e;}function n(n, o, i, s, r, a) {return t(e(t(t(o, n), t(s, a)), r), i);}function o(t, e, o, i, s, r, a) {return n(e & o | ~e & i, t, e, s, r, a);}function i(t, e, o, i, s, r, a) {return n(e & i | o & ~i, t, e, s, r, a);}function s(t, e, o, i, s, r, a) {return n(e ^ o ^ i, t, e, s, r, a);}function r(t, e, o, i, s, r, a) {return n(o ^ (e | ~i), t, e, s, r, a);}function a(e, n) {e[n >> 5] |= 128 << n % 32, e[(n + 64 >>> 9 << 4) + 14] = n;var a,c,p,u,h,_ = 1732584193,f = -271733879,d = -1732584194,l = 271733878;for (a = 0; a < e.length; a += 16) {c = _, p = f, u = d, h = l, _ = o(_, f, d, l, e[a], 7, -680876936), l = o(l, _, f, d, e[a + 1], 12, -389564586), d = o(d, l, _, f, e[a + 2], 17, 606105819), f = o(f, d, l, _, e[a + 3], 22, -1044525330), _ = o(_, f, d, l, e[a + 4], 7, -176418897), l = o(l, _, f, d, e[a + 5], 12, 1200080426), d = o(d, l, _, f, e[a + 6], 17, -1473231341), f = o(f, d, l, _, e[a + 7], 22, -45705983), _ = o(_, f, d, l, e[a + 8], 7, 1770035416), l = o(l, _, f, d, e[a + 9], 12, -1958414417), d = o(d, l, _, f, e[a + 10], 17, -42063), f = o(f, d, l, _, e[a + 11], 22, -1990404162), _ = o(_, f, d, l, e[a + 12], 7, 1804603682), l = o(l, _, f, d, e[a + 13], 12, -40341101), d = o(d, l, _, f, e[a + 14], 17, -1502002290), f = o(f, d, l, _, e[a + 15], 22, 1236535329), _ = i(_, f, d, l, e[a + 1], 5, -165796510), l = i(l, _, f, d, e[a + 6], 9, -1069501632), d = i(d, l, _, f, e[a + 11], 14, 643717713), f = i(f, d, l, _, e[a], 20, -373897302), _ = i(_, f, d, l, e[a + 5], 5, -701558691), l = i(l, _, f, d, e[a + 10], 9, 38016083), d = i(d, l, _, f, e[a + 15], 14, -660478335), f = i(f, d, l, _, e[a + 4], 20, -405537848), _ = i(_, f, d, l, e[a + 9], 5, 568446438), l = i(l, _, f, d, e[a + 14], 9, -1019803690), d = i(d, l, _, f, e[a + 3], 14, -187363961), f = i(f, d, l, _, e[a + 8], 20, 1163531501), _ = i(_, f, d, l, e[a + 13], 5, -1444681467), l = i(l, _, f, d, e[a + 2], 9, -51403784), d = i(d, l, _, f, e[a + 7], 14, 1735328473), f = i(f, d, l, _, e[a + 12], 20, -1926607734), _ = s(_, f, d, l, e[a + 5], 4, -378558), l = s(l, _, f, d, e[a + 8], 11, -2022574463), d = s(d, l, _, f, e[a + 11], 16, 1839030562), f = s(f, d, l, _, e[a + 14], 23, -35309556), _ = s(_, f, d, l, e[a + 1], 4, -1530992060), l = s(l, _, f, d, e[a + 4], 11, 1272893353), d = s(d, l, _, f, e[a + 7], 16, -155497632), f = s(f, d, l, _, e[a + 10], 23, -1094730640), _ = s(_, f, d, l, e[a + 13], 4, 681279174), l = s(l, _, f, d, e[a], 11, -358537222), d = s(d, l, _, f, e[a + 3], 16, -722521979), f = s(f, d, l, _, e[a + 6], 23, 76029189), _ = s(_, f, d, l, e[a + 9], 4, -640364487), l = s(l, _, f, d, e[a + 12], 11, -421815835), d = s(d, l, _, f, e[a + 15], 16, 530742520), f = s(f, d, l, _, e[a + 2], 23, -995338651), _ = r(_, f, d, l, e[a], 6, -198630844), l = r(l, _, f, d, e[a + 7], 10, 1126891415), d = r(d, l, _, f, e[a + 14], 15, -1416354905), f = r(f, d, l, _, e[a + 5], 21, -57434055), _ = r(_, f, d, l, e[a + 12], 6, 1700485571), l = r(l, _, f, d, e[a + 3], 10, -1894986606), d = r(d, l, _, f, e[a + 10], 15, -1051523), f = r(f, d, l, _, e[a + 1], 21, -2054922799), _ = r(_, f, d, l, e[a + 8], 6, 1873313359), l = r(l, _, f, d, e[a + 15], 10, -30611744), d = r(d, l, _, f, e[a + 6], 15, -1560198380), f = r(f, d, l, _, e[a + 13], 21, 1309151649), _ = r(_, f, d, l, e[a + 4], 6, -145523070), l = r(l, _, f, d, e[a + 11], 10, -1120210379), d = r(d, l, _, f, e[a + 2], 15, 718787259), f = r(f, d, l, _, e[a + 9], 21, -343485551), _ = t(_, c), f = t(f, p), d = t(d, u), l = t(l, h);}return [_, f, d, l];}function c(t) {var e,n = "";for (e = 0; e < 32 * t.length; e += 8) {n += String.fromCharCode(t[e >> 5] >>> e % 32 & 255);}return n;}function p(t) {var e,n = [];for (n[(t.length >> 2) - 1] = void 0, e = 0; e < n.length; e += 1) {n[e] = 0;}for (e = 0; e < 8 * t.length; e += 8) {n[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32;}return n;}function u(t) {return c(a(p(t), 8 * t.length));}function h(t, e) {var n,o,i = p(t),s = [],r = [];for (s[15] = r[15] = void 0, i.length > 16 && (i = a(i, 8 * t.length)), n = 0; n < 16; n += 1) {s[n] = 909522486 ^ i[n], r[n] = 1549556828 ^ i[n];}return o = a(s.concat(p(e)), 512 + 8 * e.length), c(a(r.concat(o), 640));}function _(t) {var e,n,o = "0123456789abcdef",i = "";for (n = 0; n < t.length; n += 1) {e = t.charCodeAt(n), i += o.charAt(e >>> 4 & 15) + o.charAt(15 & e);}return i;}function f(t) {return unescape(encodeURIComponent(t));}function d(t) {return u(f(t));}function l(t) {return _(d(t));}function g(t, e) {return h(f(t), f(e));}function m(t, e) {return _(g(t, e));}function y(t, e, n) {return e ? n ? g(e, t) : m(e, t) : n ? d(t) : l(t);}return y;};}, function (t, e, n) {"use strict";var o = n(4),i = function i(t) {this.channel = t, this.rid = this.channel.generateRid(), this.times = 1;};i.prototype.setEvent = function (t) {return this.event = t, this;}, i.prototype.setData = function (t) {return this.data = t, this;}, i.prototype.onSuccess = function (t) {return "function" == typeof t && (this.success = t), this;}, i.prototype.onFail = function (t) {return "function" == typeof t && (this.fail = t), this;}, i.prototype.onTimeout = function (t) {if ("function" == typeof t) {this.timeout = t;var e = this;this.respTimeoutTaskId = setTimeout(function () {e.respTimeoutTask();}, o.RESP_TIMEOUT);}return this;}, i.prototype.onAck = function (t) {return "function" == typeof t && (this.ack = t), this;}, i.prototype.onInnerCall = function (t) {return "function" == typeof t && (this.innerCall = t), this;}, i.prototype.onUserInfoGet = function (t) {return "function" == typeof t && (this.userInfoGet = t), this;}, i.prototype.addHook = function (t) {return "function" == typeof t && (this.hook = t), this;}, i.prototype.ackTimeoutTask = function () {if (this.times < o.RETRY_TIMES) {this.channel.send(this.event, this._data), this.times++;var t = this;this.ackTimeoutTaskId = setTimeout(function () {t.ackTimeoutTask();}, o.ACK_TIMEOUT);} else this.timeout && this.timeout({ rid: this.rid, data: this.data, response_timeout: !1 }), delete this.channel.dataCache[this.rid];return this;}, i.prototype.respTimeoutTask = function () {if (this.times < o.RETRY_TIMES) {this.channel.send(this.event, this._data), this.times++;var t = this;this.respTimeoutTaskId = setTimeout(function () {t.respTimeoutTask();}, o.RESP_TIMEOUT);} else this.timeout && this.timeout({ rid: this.rid, data: this.data, response_timeout: !0 }), delete this.channel.dataCache[this.rid];return this;}, i.prototype.cleanAckTimeout = function () {return this.ackTimeoutTaskId && clearTimeout(this.ackTimeoutTaskId), this;}, i.prototype.cleanRespTimeout = function () {return this.respTimeoutTaskId && clearTimeout(this.respTimeoutTaskId), this;}, i.prototype.send = function () {if (!this.event || !this.data) return void console.error("发send fail，event and data can not empty");var t = this;return this.ackTimeoutTaskId = setTimeout(function () {t.ackTimeoutTask();}, o.ACK_TIMEOUT), this._data = JSON.parse(JSON.stringify(this.data)), this._data.rid = this.rid, this.channel.send(this.event, this._data), this.channel.dataCache[this.rid] = this, this;}, t.exports = i;}, function (t, e) {"use strict";var n = function n(t, e) {this.current_user = t, this.current_appkey = e, this.version = 1, this.from_platform = "web";};n.prototype.setNeedReceipt = function (t) {return this.need_receipt = t, this;}, n.prototype.setNoOffline = function (t) {return this.no_offline = t, this;}, n.prototype.setNoNotification = function (t) {return this.no_notification = t, this;}, n.prototype.setType = function (t) {return this.type = t, this;}, n.prototype.setAtList = function (t) {return this.at_list = t, this;}, n.prototype.setAppkey = function (t) {return t && (this.appkey = t), this;}, n.prototype.setTarget = function (t, e) {return this.target_id = t.toString(), this.target_name = e, this;}, n.prototype.setFromName = function (t) {return this.from_name = t, this;}, n.prototype.setText = function (t, e) {return this.msg_type = "text", this.msg_body = { text: t }, e && (this.msg_body.extras = e), this;}, n.prototype.setImage = function (t, e) {return this.msg_type = "image", this.msg_body = { media_id: t.media_id, media_crc32: t.media_crc32, width: t.width, height: t.height, format: t.format, fsize: t.fsize }, e && (this.msg_body.extras = e), this;}, n.prototype.setFile = function (t, e) {return this.msg_type = "file", this.msg_body = { media_id: t.media_id, media_crc32: t.media_crc32, hash: t.hash, fsize: t.fsize, fname: t.fname }, e && (this.msg_body.extras = e), this;}, n.prototype.setVoice = function (t, e) {return this.msg_type = "voice", this.msg_body = { media_id: t.media_id, media_crc32: t.media_crc32, hash: t.hash, fsize: t.fsize, duration: t.duration, format: t.format }, e && (this.msg_body.extras = e), this;}, n.prototype.setCustomNotification = function (t) {return t && (this.custom_notification = t), this;}, n.prototype.setLocation = function (t, e) {return this.msg_type = "location", this.msg_body = { latitude: t.latitude, longitude: t.longitude, scale: t.scale, label: t.label }, e && (this.msg_body.extras = e), this;}, n.prototype.setCustom = function (t) {return this.msg_type = "custom", this.msg_body = t, this;}, n.prototype.build = function () {var t = this.current_user;if ("single" != this.type && "group" != this.type && "across_single" != this.type && "chatroom" != this.type) return console.log("type must be single or group or chatroom");if (!this.target_id) return console.error("target_id must not null");if ("text" == this.msg_type) {if (!this.msg_body.text && this.at_list && "single" != this.type) this.msg_body.text = " ";else if (!this.msg_body.text && !this.at_list) return console.error("未设置文本消息内容");} else if ("custom" == this.msg_type) {if (!this.msg_body) return console.error("custom对象不能为空");} else if ("image" == this.msg_type) {if (!this.msg_body.media_id) return console.error("未设置image消息media_id字段");if (!this.msg_body.media_crc32) return console.error("未设置image消息media_crc32字段");if (!this.msg_body.width) return console.error("未设置image消息width字段");if (!this.msg_body.height) return console.error("未设置image消息height字段");} else if ("file" == this.msg_type) {if (!this.msg_body.media_id) return console.error("未设置file消息media_id字段");if (!this.msg_body.media_crc32) return console.error("未设置file消息media_crc32字段");if (!this.msg_body.fsize) return console.error("未设置file消息fsize字段");if (!this.msg_body.fname) return console.error("未设置file消息fname字段");} else if ("location" == this.msg_type) {if (!this.msg_body.latitude) return console.error("未设置location消息latitude字段");if (!this.msg_body.longitude) return console.error("未设置location消息longitude字段");if (!this.msg_body.scale) return console.error("未设置location消息scale字段");if (!this.msg_body.label) return console.error("未设置location消息label字段");} else {if ("voice" != this.msg_type) return console.error("请设置合法的msg_type");if (!this.msg_body.media_id) return console.error("未设置voice消息media_id字段");if (!this.msg_body.media_crc32) return console.error("未设置voice消息media_crc32字段");}var e = { version: this.version, target_type: this.type, from_platform: this.from_platform, target_id: this.target_id, target_name: this.target_name, from_id: t, from_name: this.from_name, create_time: new Date().getTime(), msg_type: this.msg_type, msg_body: this.msg_body };this.appkey && (e.target_appkey = this.appkey, e.from_appkey = this.current_appkey);var n = { content: e };if (n.no_offline = this.no_offline, n.no_notification = this.no_notification, n.custom_notification = this.custom_notification, n.target_name = e.target_name, n.need_receipt = this.need_receipt, "single" == e.target_type) n.target_name = e.target_id;else if (n.target_gid = e.target_id, this.at_list && this.at_list instanceof Array) n.users = this.at_list;else if (this.at_list && !(this.at_list instanceof Array)) return console.error("参数值不合法，at_list必须为数组类型");return this.appkey ? n.appkey = this.appkey : n.appkey = this.current_appkey, n;}, t.exports = n;}, function (t, e) {"use strict";var n = function n(t) {this.args = t;};n.prototype.onSuccess = function (t) {return "function" == typeof t && (this.success = t), this;}, n.prototype.onFail = function (t) {return "function" == typeof t && (this.fail = t), this;}, n.prototype.onTimeout = function (t) {return "function" == typeof t && (this.timeout = t), this;}, n.prototype.onAck = function (t) {return "function" == typeof t && (this.ack = t), this;}, t.exports = n;}, function (t, e) {"use strict";var n = {};n.isBlack = function (t) {return !(t && "string" == typeof t && t.length > 0);};var o = {};o.addItem = function (t, e) {wx.setStorage({ key: t.toString(), data: e });}, o.removeItems = function (t) {wx.getStorageInfo({ success: function success(e) {var n = e.keys,o = [];n.forEach(function (e) {try {var n = wx.getStorageSync(e);n === t && o.push(e);} catch (t) {}}), o.forEach(function (t) {wx.removeStorage({ key: t, success: function success(t) {} });});} });}, o.getItem = function (t) {return wx.getStorageSync(t);};var i = {};i.delRepeatItem = function (t) {var e = [];return t.forEach(function (t) {e.indexOf(t) === -1 && null != t && e.push(t);}), e;};var s = {};s.rooms = {}, t.exports = { StringUtils: n, StorageUtils: o, ArrayUtils: i, Cache: s };}, function (t, e, n) {var o = n(26);e.protocol = 3;var i = e.packets = { open: 0, close: 1, ping: 2, pong: 3, message: 4, upgrade: 5, noop: 6 },s = o(i),r = { type: "error", data: "parser error" };e.encodePacket = function (t, e, n, o) {"function" == typeof n && (o = n, n = null);var s = i[t.type];return void 0 !== t.data && (s += String(t.data)), o("" + s);}, e.decodePacket = function (t, e, n) {if (void 0 === t) return r;if ("string" == typeof t) {var o = t.charAt(0);return Number(o) == o && s[o] ? t.length > 1 ? { type: s[o], data: t.substring(1) } : { type: s[o] } : r;}};}, function (t, e) {t.exports = Object.keys || function (t) {var e = [],n = Object.prototype.hasOwnProperty;for (var o in t) {n.call(t, o) && e.push(o);}return e;};}, function (t, e, n) {t.exports = n(30), t.exports.parser = n(2);}, function (t, e, n) {function o(t, e) {"object" == typeof t && (e = t, t = void 0), e = e || {};var n,o = s(t),r = o.source,u = o.id,h = o.path,_ = p[u] && h in p[u].nsps,f = e.forceNew || e["force new connection"] || !1 === e.multiplex || _;return f ? (c("ignoring socket cache for %s", r), n = a(r, e)) : (p[u] || (c("new io instance for %s", r), p[u] = a(r, e)), n = p[u]), o.query && !e.query ? e.query = o.query : e && "object" == typeof e.query && (e.query = i(e.query)), n.socket(o.path, e);}function i(t) {var e = [];for (var n in t) {t.hasOwnProperty(n) && e.push(encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));}return e.join("&");}var s = n(29),r = n(5),a = n(6),c = n(1)("socket.io-client");t.exports = e = o;var p = e.managers = {};e.protocol = r.protocol, e.connect = o, e.Manager = n(6), e.Socket = n(8);}, function (t, e, n) {function o(t, e) {var n = t;null == t && (t = e.protocol + "//" + e.host), "string" == typeof t && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? e.protocol + t : e.host + t), /^(https?|wss?):\/\//.test(t) || (s("protocol-less url %s", t), t = "undefined" != typeof e ? e.protocol + "//" + t : "https://" + t), s("parse %s", t), n = i(t)), n.port || (/^(http|ws)$/.test(n.protocol) ? n.port = "80" : /^(http|ws)s$/.test(n.protocol) && (n.port = "443")), n.path = n.path || "/";var o = n.host.indexOf(":") !== -1,r = o ? "[" + n.host + "]" : n.host;return n.id = n.protocol + "://" + r + ":" + n.port, n.href = n.protocol + "://" + r + (e && e.port === n.port ? "" : ":" + n.port), n;}var i = n(15),s = n(1)("socket.io-client:url");t.exports = o;}, function (t, e, n) {function o(t, e) {return this instanceof o ? (e = e || {}, t && "object" == typeof t && (e = t, t = null), t ? (t = u(t), e.hostname = t.host, e.secure = "https" === t.protocol || "wss" === t.protocol, e.port = t.port, t.query && (e.query = t.query)) : e.host && (e.hostname = u(e.host).host), this.secure = !0, this.port = "443", this.agent = e.agent || !1, this.hostname = e.hostname, this.port = e.port, this.query = e.query || {}, "string" == typeof this.query && (this.query = _.decode(this.query)), this.upgrade = !1 !== e.upgrade, this.path = (e.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!e.forceJSONP, this.jsonp = !1 !== e.jsonp, this.forceBase64 = !!e.forceBase64, this.enablesXDR = !!e.enablesXDR, this.timestampParam = e.timestampParam || "t", this.timestampRequests = e.timestampRequests, this.transports = e.transports || ["polling", "websocket"], this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.policyPort = e.policyPort || 843, this.rememberUpgrade = e.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = e.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== e.perMessageDeflate && (e.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = e.pfx || null, this.key = e.key || null, this.passphrase = e.passphrase || null, this.cert = e.cert || null, this.ca = e.ca || null, this.ciphers = e.ciphers || null, this.rejectUnauthorized = void 0 === e.rejectUnauthorized ? null : e.rejectUnauthorized, this.forceNode = !!e.forceNode, this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, this.pingTimeoutTimer = null, void this.open()) : new o(t, e);}function i(t) {var e = {};for (var n in t) {t.hasOwnProperty(n) && (e[n] = t[n]);}return e;}var s = n(10),r = n(3),a = n(1)("engine.io-client:socket"),c = n(12),p = n(2),u = n(15),h = n(37),_ = n(14);t.exports = o, o.priorWebsocketSuccess = !1, r(o.prototype), o.protocol = p.protocol, o.Socket = o, o.Transport = n(9), o.transports = n(10), o.parser = n(2), o.prototype.createTransport = function (t) {a('creating transport "%s"', t);var e = i(this.query);e.EIO = p.protocol, e.transport = t, this.id && (e.sid = this.id);var n = new s({ agent: this.agent, hostname: this.hostname, port: this.port, secure: this.secure, path: this.path, query: e, forceJSONP: this.forceJSONP, jsonp: this.jsonp, forceBase64: this.forceBase64, enablesXDR: this.enablesXDR, timestampRequests: this.timestampRequests, timestampParam: this.timestampParam, policyPort: this.policyPort, socket: this, pfx: this.pfx, key: this.key, passphrase: this.passphrase, cert: this.cert, ca: this.ca, ciphers: this.ciphers, rejectUnauthorized: this.rejectUnauthorized, perMessageDeflate: this.perMessageDeflate, extraHeaders: this.extraHeaders, forceNode: this.forceNode, localAddress: this.localAddress });return n;}, o.prototype.open = function () {var t = "websocket";this.readyState = "opening";try {t = this.createTransport(t);} catch (t) {return this.transports.shift(), void this.open();}t.open(), this.setTransport(t);}, o.prototype.setTransport = function (t) {a("setting transport %s", t.name);var e = this;this.transport && (a("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = t, t.on("drain", function () {e.onDrain();}).on("packet", function (t) {e.onPacket(t);}).on("error", function (t) {e.onError(t);}).on("close", function () {e.onClose("transport close");});}, o.prototype.probe = function (t) {function e() {if (_.onlyBinaryUpgrades) {var e = !this.supportsBinary && _.transport.supportsBinary;h = h || e;}h || (a('probe transport "%s" opened', t), u.send([{ type: "ping", data: "probe" }]), u.once("packet", function (e) {if (!h) if ("pong" === e.type && "probe" === e.data) {if (a('probe transport "%s" pong', t), _.upgrading = !0, _.emit("upgrading", u), !u) return;o.priorWebsocketSuccess = "websocket" === u.name, a('pausing current transport "%s"', _.transport.name), _.transport.pause(function () {h || "closed" !== _.readyState && (a("changing transport and sending upgrade packet"), p(), _.setTransport(u), u.send([{ type: "upgrade" }]), _.emit("upgrade", u), u = null, _.upgrading = !1, _.flush());});} else {a('probe transport "%s" failed', t);var n = new Error("probe error");n.transport = u.name, _.emit("upgradeError", n);}}));}function n() {h || (h = !0, p(), u.close(), u = null);}function i(e) {var o = new Error("probe error: " + e);o.transport = u.name, n(), a('probe transport "%s" failed because of error: %s', t, e), _.emit("upgradeError", o);}function s() {i("transport closed");}function r() {i("socket closed");}function c(t) {u && t.name !== u.name && (a('"%s" works - aborting "%s"', t.name, u.name), n());}function p() {u.removeListener("open", e), u.removeListener("error", i), u.removeListener("close", s), _.removeListener("close", r), _.removeListener("upgrading", c);}a('probing transport "%s"', t);var u = this.createTransport(t, { probe: 1 }),h = !1,_ = this;o.priorWebsocketSuccess = !1, u.once("open", e), u.once("error", i), u.once("close", s), this.once("close", r), this.once("upgrading", c), u.open();}, o.prototype.onOpen = function () {if (this.readyState = "open", o.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {a("starting upgrade probes");for (var t = 0, e = this.upgrades.length; t < e; t++) {this.probe(this.upgrades[t]);}}}, o.prototype.onPacket = function (t) {if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (a('socket receive: type "%s", data "%s"', t.type, t.data), this.emit("packet", t), this.emit("heartbeat"), t.type) {case "open":this.onHandshake(h(t.data));break;case "pong":this.setPing(), this.emit("pong");break;case "error":var e = new Error("server error");e.code = t.data, this.onError(e);break;case "message":this.emit("data", t.data), this.emit("message", t.data);} else a('packet received with socket readyState "%s"', this.readyState);}, o.prototype.onHandshake = function (t) {this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat));}, o.prototype.onHeartbeat = function (t) {clearTimeout(this.pingTimeoutTimer);var e = this;e.pingTimeoutTimer = setTimeout(function () {"closed" !== e.readyState && e.onClose("ping timeout");}, t || e.pingInterval + e.pingTimeout);}, o.prototype.setPing = function () {var t = this;clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(function () {a("writing ping packet - expecting pong within %sms", t.pingTimeout), t.ping(), t.onHeartbeat(t.pingTimeout);}, t.pingInterval);}, o.prototype.ping = function () {var t = this;this.sendPacket("ping", function () {t.emit("ping");});}, o.prototype.onDrain = function () {this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush();}, o.prototype.flush = function () {"closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (a("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"));}, o.prototype.write = o.prototype.send = function (t, e, n) {return this.sendPacket("message", t, e, n), this;}, o.prototype.sendPacket = function (t, e, n, o) {if ("function" == typeof e && (o = e, e = void 0), "function" == typeof n && (o = n, n = null), "closing" !== this.readyState && "closed" !== this.readyState) {n = n || {}, n.compress = !1 !== n.compress;var i = { type: t, data: e, options: n };this.emit("packetCreate", i), this.writeBuffer.push(i), o && this.once("flush", o), this.flush();}}, o.prototype.close = function () {function t() {o.onClose("forced close"), a("socket closing - telling transport to close"), o.transport.close();}function e() {o.removeListener("upgrade", e), o.removeListener("upgradeError", e), t();}function n() {o.once("upgrade", e), o.once("upgradeError", e);}if ("opening" === this.readyState || "open" === this.readyState) {this.readyState = "closing";var o = this;this.writeBuffer.length ? this.once("drain", function () {this.upgrading ? n() : t();}) : this.upgrading ? n() : t();}return this;}, o.prototype.onError = function (t) {a("socket error %j", t), o.priorWebsocketSuccess = !1, this.emit("error", t), this.onClose("transport error", t);}, o.prototype.onClose = function (t, e) {if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {a('socket close with reason: "%s"', t);var n = this;clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", t, e), n.writeBuffer = [], n.prevBufferLen = 0;}}, o.prototype.filterUpgrades = function (t) {for (var e = [], n = 0, o = t.length; n < o; n++) {~c(this.transports, t[n]) && e.push(t[n]);}return e;};}, function (t, e, n) {!function () {function t(t) {this.message = t;}var n = e,o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";t.prototype = new Error(), t.prototype.name = "InvalidCharacterError", n.btoa || (n.btoa = function (e) {for (var n, i, s = String(e), r = 0, a = o, c = ""; s.charAt(0 | r) || (a = "=", r % 1); c += a.charAt(63 & n >> 8 - r % 1 * 8)) {if (i = s.charCodeAt(r += .75), i > 255) throw new t("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");n = n << 8 | i;}return c;}), n.atob || (n.atob = function (e) {var n = String(e).replace(/=+$/, "");if (n.length % 4 == 1) throw new t("'atob' failed: The string to be decoded is not correctly encoded.");for (var i, s, r = 0, a = 0, c = ""; s = n.charAt(a++); ~s && (i = r % 4 ? 64 * i + s : s, r++ % 4) ? c += String.fromCharCode(255 & i >> (-2 * r & 6)) : 0) {s = o.indexOf(s);}return c;});}();}, function (t, e) {function n(t) {t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0;}t.exports = n, n.prototype.duration = function () {var t = this.ms * Math.pow(this.factor, this.attempts++);if (this.jitter) {var e = Math.random(),n = Math.floor(e * this.jitter * t);t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n;}return 0 | Math.min(t, this.max);}, n.prototype.reset = function () {this.attempts = 0;}, n.prototype.setMin = function (t) {this.ms = t;}, n.prototype.setMax = function (t) {this.max = t;}, n.prototype.setJitter = function (t) {this.jitter = t;};}, function (t, e) {t.exports = function (t, e) {var n = function n() {};n.prototype = e.prototype, t.prototype = new n(), t.prototype.constructor = t;};}, function (t, e, n) {function o() {return e.colors[u++ % e.colors.length];}function i(t) {function n() {}function i() {var t = i,n = +new Date(),s = n - (p || n);t.diff = s, t.prev = p, t.curr = n, p = n, null == t.useColors && (t.useColors = e.useColors()), null == t.color && t.useColors && (t.color = o());for (var r = new Array(arguments.length), a = 0; a < r.length; a++) {r[a] = arguments[a];}r[0] = e.coerce(r[0]), "string" != typeof r[0] && (r = ["%o"].concat(r));var c = 0;r[0] = r[0].replace(/%([a-z%])/g, function (n, o) {if ("%%" === n) return n;c++;var i = e.formatters[o];if ("function" == typeof i) {var s = r[c];n = i.call(t, s), r.splice(c, 1), c--;}return n;}), r = e.formatArgs.apply(t, r);var u = i.log || e.log || console.log.bind(console);u.apply(t, r);}n.enabled = !1, i.enabled = !0;var s = e.enabled(t) ? i : n;return s.namespace = t, s;}function s(t) {e.save(t);for (var n = (t || "").split(/[\s,]+/), o = n.length, i = 0; i < o; i++) {n[i] && (t = n[i].replace(/[\\^$+?.()|[\]{}]/g, "\\$&").replace(/\*/g, ".*?"), "-" === t[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t + "$")));}}function r() {e.enable("");}function a(t) {var n, o;for (n = 0, o = e.skips.length; n < o; n++) {if (e.skips[n].test(t)) return !1;}for (n = 0, o = e.names.length; n < o; n++) {if (e.names[n].test(t)) return !0;}return !1;}function c(t) {return t instanceof Error ? t.stack || t.message : t;}e = t.exports = i.debug = i, e.coerce = c, e.disable = r, e.enable = s, e.enabled = a, e.humanize = n(36), e.names = [], e.skips = [], e.formatters = {};var p,u = 0;}, function (t, e, n) {(function (e) {function o(t) {function n(t) {if (!t) return !1;if (e.Buffer && e.Buffer.isBuffer && e.Buffer.isBuffer(t) || e.ArrayBuffer && t instanceof ArrayBuffer || e.Blob && t instanceof Blob || e.File && t instanceof File) return !0;if (i(t)) {for (var o = 0; o < t.length; o++) {if (n(t[o])) return !0;}} else if (t && "object" == typeof t) {t.toJSON && "function" == typeof t.toJSON && (t = t.toJSON());for (var s in t) {if (Object.prototype.hasOwnProperty.call(t, s) && n(t[s])) return !0;}}return !1;}return n(t);}var i = n(13);t.exports = o;}).call(e, function () {return this;}());}, function (t, e) {function n(t) {if (t = String(t), !(t.length > 1e4)) {var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);if (e) {var n = parseFloat(e[1]),o = (e[2] || "ms").toLowerCase();switch (o) {case "years":case "year":case "yrs":case "yr":case "y":return n * u;case "days":case "day":case "d":return n * p;case "hours":case "hour":case "hrs":case "hr":case "h":return n * c;case "minutes":case "minute":case "mins":case "min":case "m":return n * a;case "seconds":case "second":case "secs":case "sec":case "s":return n * r;case "milliseconds":case "millisecond":case "msecs":case "msec":case "ms":return n;default:return;}}}}function o(t) {return t >= p ? Math.round(t / p) + "d" : t >= c ? Math.round(t / c) + "h" : t >= a ? Math.round(t / a) + "m" : t >= r ? Math.round(t / r) + "s" : t + "ms";}function i(t) {return s(t, p, "day") || s(t, c, "hour") || s(t, a, "minute") || s(t, r, "second") || t + " ms";}function s(t, e, n) {if (!(t < e)) return t < 1.5 * e ? Math.floor(t / e) + " " + n : Math.ceil(t / e) + " " + n + "s";}var r = 1e3,a = 60 * r,c = 60 * a,p = 24 * c,u = 365.25 * p;t.exports = function (t, e) {e = e || {};var s = typeof t;if ("string" === s && t.length > 0) return n(t);if ("number" === s && isNaN(t) === !1) return e.long ? i(t) : o(t);throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t));};}, function (t, e) {var n = /^\s+/,o = /\s+$/;t.exports = function (t) {return "string" == typeof t && t ? (t = t.replace(n, "").replace(o, ""), JSON.parse(t)) : null;};}, function (t, e) {function n() {throw new Error("setTimeout has not been defined");}function o() {throw new Error("clearTimeout has not been defined");}function i(t) {if (u === setTimeout) return setTimeout(t, 0);if ((u === n || !u) && setTimeout) return u = setTimeout, setTimeout(t, 0);try {return u(t, 0);} catch (e) {try {return u.call(null, t, 0);} catch (e) {return u.call(this, t, 0);}}}function s(t) {if (h === clearTimeout) return clearTimeout(t);if ((h === o || !h) && clearTimeout) return h = clearTimeout, clearTimeout(t);try {return h(t);} catch (e) {try {return h.call(null, t);} catch (e) {return h.call(this, t);}}}function r() {l && f && (l = !1, f.length ? d = f.concat(d) : g = -1, d.length && a());}function a() {if (!l) {var t = i(r);l = !0;for (var e = d.length; e;) {for (f = d, d = []; ++g < e;) {f && f[g].run();}g = -1, e = d.length;}f = null, l = !1, s(t);}}function c(t, e) {this.fun = t, this.array = e;}function p() {}var u,h,_ = t.exports = {};!function () {try {u = "function" == typeof setTimeout ? setTimeout : n;} catch (t) {u = n;}try {h = "function" == typeof clearTimeout ? clearTimeout : o;} catch (t) {h = o;}}();var f,d = [],l = !1,g = -1;_.nextTick = function (t) {var e = new Array(arguments.length - 1);if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) {e[n - 1] = arguments[n];}d.push(new c(t, e)), 1 !== d.length || l || i(a);}, c.prototype.run = function () {this.fun.apply(null, this.array);}, _.title = "browser", _.browser = !0, _.env = {}, _.argv = [], _.version = "", _.versions = {}, _.on = p, _.addListener = p, _.once = p, _.off = p, _.removeListener = p, _.removeAllListeners = p, _.emit = p, _.binding = function (t) {throw new Error("process.binding is not supported");}, _.cwd = function () {return "/";}, _.chdir = function (t) {throw new Error("process.chdir is not supported");}, _.umask = function () {return 0;};}, function (t, e, n) {(function (t) {var o = n(13),i = n(16);e.deconstructPacket = function (t) {function e(t) {if (!t) return t;if (i(t)) {var s = { _placeholder: !0, num: n.length };return n.push(t), s;}if (o(t)) {for (var r = new Array(t.length), a = 0; a < t.length; a++) {r[a] = e(t[a]);}return r;}if ("object" == typeof t && !(t instanceof Date)) {var r = {};for (var c in t) {r[c] = e(t[c]);}return r;}return t;}var n = [],s = t.data,r = t;return r.data = e(s), r.attachments = n.length, { packet: r, buffers: n };}, e.reconstructPacket = function (t, e) {function n(t) {if (t && t._placeholder) {var i = e[t.num];return i;}if (o(t)) {for (var s = 0; s < t.length; s++) {t[s] = n(t[s]);}return t;}if (t && "object" == typeof t) {for (var r in t) {t[r] = n(t[r]);}return t;}return t;}return t.data = n(t.data), t.attachments = void 0, t;}, e.removeBlobs = function (e, n) {function s(e, c, p) {if (!e) return e;if (t.Blob && e instanceof Blob || t.File && e instanceof File) {r++;var u = new FileReader();u.onload = function () {p ? p[c] = this.result : a = this.result, --r || n(a);}, u.readAsArrayBuffer(e);} else if (o(e)) for (var h = 0; h < e.length; h++) {s(e[h], h, e);} else if (e && "object" == typeof e && !i(e)) for (var _ in e) {s(e[_], _, e);}}var r = 0,a = e;s(a), r || n(a);};}).call(e, function () {return this;}());}, function (t, e) {function n(t) {if (t) return o(t);}function o(t) {for (var e in n.prototype) {t[e] = n.prototype[e];}return t;}t.exports = n, n.prototype.on = n.prototype.addEventListener = function (t, e) {return this._callbacks = this._callbacks || {}, (this._callbacks[t] = this._callbacks[t] || []).push(e), this;}, n.prototype.once = function (t, e) {function n() {o.off(t, n), e.apply(this, arguments);}var o = this;return this._callbacks = this._callbacks || {}, n.fn = e, this.on(t, n), this;}, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function (t, e) {if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;var n = this._callbacks[t];if (!n) return this;if (1 == arguments.length) return delete this._callbacks[t], this;for (var o, i = 0; i < n.length; i++) {if (o = n[i], o === e || o.fn === e) {n.splice(i, 1);break;}}return this;}, n.prototype.emit = function (t) {this._callbacks = this._callbacks || {};var e = [].slice.call(arguments, 1),n = this._callbacks[t];if (n) {n = n.slice(0);for (var o = 0, i = n.length; o < i; ++o) {n[o].apply(this, e);}}return this;}, n.prototype.listeners = function (t) {return this._callbacks = this._callbacks || {}, this._callbacks[t] || [];}, n.prototype.hasListeners = function (t) {return !!this.listeners(t).length;};}, function (t, e) {function n(t, e) {var n = [];e = e || 0;for (var o = e || 0; o < t.length; o++) {n[o - e] = t[o];}return n;}t.exports = n;}, function (t, e) {"use strict";function n(t) {var e = "";do {e = r[t % a] + e, t = Math.floor(t / a);} while (t > 0);return e;}function o(t) {var e = 0;for (u = 0; u < t.length; u++) {e = e * a + c[t.charAt(u)];}return e;}function i() {var t = n(+new Date());return t !== s ? (p = 0, s = t) : t + "." + n(p++);}for (var s, r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), a = 64, c = {}, p = 0, u = 0; u < a; u++) {c[r[u]] = u;}i.encode = n, i.decode = o, t.exports = i;}]);});

/***/ }),

/***/ 24:
/*!*************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/api/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 请在此对象写后端的请求接口列表
var _default = {
  // 此处写开发调试地址--自动生效
  // dev: 'http://60.180.141.109:8081', 
  dev: 'http://cct.bajiaostar.com',
  // 此处写线上环境地址--自动生效
  pro: 'http://cct.bajiaostar.com',
  // pro: 'http://106.54.226.179:18081',  
  // 上传图片的地址
  unloadLocation: 'https://upload.qiniup.com/',
  // 上传成功之后拼接资源的基础地址
  baseLocation: 'https://img.bajiaostar.com/',
  // 
  wsDev: 'ws://101.132.115.48:8081',
  wsPro: 'ws://101.132.115.48:8081',

  /* ------------------------------------------接口---------------------------------------------- */

  /** 
                                                                                                    * 无token接口
                                                                                                    */
  getUserDict: '/api/no/getUserDict', // 获取老师列表
  register: '/api/no/register', // 注册
  wxLogin: '/api/no/wxLogin', // 微信直接登录
  sms: '/api/no/sms', // 短信验证
  login: '/api/no/login', // 登录
  getCourseType: '/api/no/getCourseType', // 获取学科列表
  update: '/api/no/update', // 版本检测
  getTime: '/api/no/getTime', // 截止时间


  /**
   * 课程
   */
  getPicasaList: '/api/course/getPicasaList', // 轮播图
  getCourseList: '/api/course/getCourseList', // 课程list childNum为章节数
  getClassType: '/api/no/getClassType', // 获取年级树
  getCourseInfo: '/api/course/getCourseInfo', // 进入课程详情
  addCart: '/api/course/addCart', // 加入购物车
  getChapterList: '/api/course/getChapterList', // 章节list
  getTeacherInfo: '/api/course/getTeacherInfo', // 老师详情
  genOrderFromCourse: '/api/course/genOrderFromCourse', // 课程直接生成订单
  getCartList: '/api/course/getCartList', // 购物车list
  genOrder: '/api/course/genOrder', // 购物车生成订单 orderItemIds用数组
  delCart: '/api/course/delCart', // 删除购物车内课程
  cancelOrder: '/api/course/cancelOrder', // 取消订单
  orderInfo: '/api/course/orderInfo', // 订单详情
  orderList: '/api/course/orderList', // 获取订单列表
  getActivityInfo: '/api/course/getActivityInfo', // 活动info code=-1即不可购买
  genOrderFromActivity: '/api/course/genOrderFromActivity', // 活动直接生成订单
  pay: '/api/course/pay', // 课程支付接口
  enterRoom: '/api/study/enterRoom', // 进入直播间
  getAchaoBook: '/api/no/getAchaoBook', // 获取操作指南,关于平台,用户协议
  getQrCode: '/api/mine/getQrCode', // 邀请好友

  /**
   * 用户模块
   */
  collect: '/api/mine/collect', // 加入收藏 
  cancelCollect: '/api/mine/cancelCollect', // 取消收藏 
  collectList: '/api/mine/collectList', // 查看我的收藏
  moneyList: '/api/mine/moneyList', // 学币明细
  editUserInfo: '/api/mine/editUserInfo', // 修改个人信息 用户性别（0男 1女 2未知）
  get10086Info: '/api/mine/get10086Info', // 获取客服信息列表
  sendInfo: '/api/mine/sendInfo', // 客服：发送信息
  draw: '/api/mine/draw', // 我要提现
  userInfo: '/api/mine/userInfo', // 用户信息
  uptoken: '/api/mine/uptoken', // 获取七牛token
  getPayConfig: '/api/mine/getPayConfig', // 获取充值面额列表
  joinUs: '/api/mine/joinUs', // 我要加盟

  /**
   * 学习
   */
  getStudyList: '/api/study/getStudyList', // 课程list childNum为章节数

  /**
   * 支付充值
   */
  aliPay: '/api/aliPay/appPay', // 支付宝app支付
  wxPay: '/api/wxPay/appPay' // 微信app支付
};exports.default = _default;

/***/ }),

/***/ 25:
/*!***********************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/libs/IM.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _md = _interopRequireDefault(__webpack_require__(/*! @/libs/md5.js */ 26));
var _index = __webpack_require__(/*! @/config/index.js */ 22);

var _store = _interopRequireDefault(__webpack_require__(/*! @/store */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var JIM = new _index.JMessage();var

IM = /*#__PURE__*/function () {
  /**
                                * appkey : 开发者在极光平台注册的 IM 应用 appkey
                                * secret 为开发者在极光平台注册的 IM 应用 masterSecret
                                * random_str : 20-36 长度的随机字符串, 作为签名加 salt 使用
                                */
  function IM(appKey, secret, random_str) {_classCallCheck(this, IM);
    this.appKey = appKey;
    this.secret = secret;
    this.random_str = random_str;
    // console.log(this.signature) 
  }

  // 初始化
  _createClass(IM, [{ key: "init", value: function init() {var _this = this;
      var timestamp = Date.now();
      var signature = (0, _md.default)("appkey=".concat(this.appKey, "&timestamp=").concat(timestamp, "&random_str=").concat(this.random_str, "&key=").concat(this.secret));

      JIM.init({
        "appkey": this.appKey,
        "random_str": this.random_str,
        "signature": signature,
        "timestamp": timestamp,
        "flag": 1 // 是否启用消息记录漫游，默认 0 否，1 是
      }).onSuccess(function (data) {
        console.log('初始化成功：', data);
        // 如果用户缓存有信息,登录极光
        var userDetail = uni.getStorageSync('user_info');
        if (userDetail) _this.login({ username: "".concat(userDetail.userId), password: "".concat(userDetail.userId) });
        _this.onDisconnect(); // 断线监听
      }).onFail(function (err) {
        // 同上
        console.log('初始化失败：', err);
      });
    }

    // 登录
  }, { key: "login", value: function login(parames) {var _this2 = this;var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      JIM.login({
        username: parames.username,
        password: parames.password }).
      onSuccess(function (data) {
        console.log('登录成功：', data);
        // 开始监听聊天室消息
        _this2.onRoomMsg(function (res) {});
        // 登录成功进入聊天室
        // this.enterChatroom('23606744')  
        // this.exitChatroom('23606744', (res) => {
        // 	console.log(res)
        // })
        // 传递登录成功之后的回调
        callback(data);
      }).onFail(function (err) {
        //同上
        callback(err);
      });
    }

    // 进入聊天室
  }, { key: "enterChatroom", value: function enterChatroom(id) {var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      console.log(id);
      JIM.enterChatroom({
        id: id }).
      onSuccess(function (data) {
        //data.code 返回码
        //data.message 描述
        //data.id 聊天室 id
        console.log('进入聊天室成功：', data);
        // this.getChatroomInfo(id)
        callback();
      }).onFail(function (data) {
        console.log('进入聊天室失败：', data);
        //data.code 返回码
        //data.message 描述
      });
    }

    // 退出聊天室
  }, { key: "exitChatroom", value: function exitChatroom(id) {var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      JIM.exitChatroom({
        id: id }).
      onSuccess(function (data) {
        //data.code 返回码
        //data.message 描述
        //data.id 聊天室 id
        // console.log('退出聊天室成功：', data)
        callback(data);
      }).onFail(function (data) {
        //data.code 返回码
        //data.message 描述
        console.log('退出聊天室失败：', data);
        callback(data);
      });
    }

    // 聊天室发送消息
  }, { key: "sendChatroomMsg", value: function sendChatroomMsg(parames) {var _this3 = this;var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      JIM.sendChatroomMsg({
        target_rid: parames.target_rid, // 聊天室ID
        content: parames.content // 消息文本
      }).onSuccess(function (data, msg) {
        var obj = {
          username: msg.content.from_id,
          content: msg.content.msg_body.text,
          msg_id: data.msg_id,
          isCurrentUser: true // 自己发送的消息
        };

        _this3.getUserInfo(msg.content.from_id, function (res) {
          obj.nickname = res.user_info.nickname;
          obj.avatar = res.user_info.avatar;
          _store.default.commit('pushChatRoomList', obj);
        });

        callback(data, msg);
      }).onFail(function (data) {
        //data.code 返回码
        //data.message 描述
      });
    }

    // 聊天室消息监听
  }, { key: "onRoomMsg", value: function onRoomMsg() {var _this4 = this;var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      JIM.onRoomMsg(function (data) {
        // 这里可以做判断,如果不是当前聊天室return 掉
        if (Date.now() - data.ctime_ms > 1000) return;
        var obj = {
          username: data.content.from_id,
          content: data.content.msg_body.text,
          msg_id: data.msg_id,
          isCurrentUser: false // 监听到的聊天室消息肯定不是自己发送的消息


          // 获取头像 昵称
        };_this4.getUserInfo(data.content.from_id, function (res) {
          obj.nickname = res.user_info.nickname;
          obj.avatar = res.user_info.avatar;
          _store.default.commit('pushChatRoomList', obj);
        });
        callback(data);
      });
    }

    // 断线监听
  }, { key: "onDisconnect", value: function onDisconnect() {
      JIM.onDisconnect(function () {
        console.log('断线啦');
      });
    }

    // 登录状态
  }, { key: "isLogin", value: function isLogin() {
      return JIM.isLogin();
    }

    // 根据username获取个人信息
  }, { key: "getUserInfo", value: function getUserInfo(username, callback) {
      JIM.getUserInfo({
        username: username }).
      onSuccess(function (res) {
        callback(res);
      });
    }

    // 获取聊天室详情
  }, { key: "getChatroomInfo", value: function getChatroomInfo(id) {var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      JIM.getChatroomInfo({
        id: id }).
      onSuccess(function (res) {
        callback(res);
      });
    }

    // 退出登录
  }, { key: "loginOut", value: function loginOut() {
      JIM.loginOut();
    } }]);return IM;}();var _default =


IM;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 26:
/*!************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/libs/md5.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
                                                                             * These are the functions you'll usually want to call
                                                                             * They take string arguments and return either hex or base-64 encoded strings
                                                                             */
var hex_md5 = function hex_md5(s) {return binl2hex(core_md5(str2binl(s), s.length * chrsz));};
function b64_md5(s) {return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s) {return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) {return binl2hex(core_hmac_md5(key, data));}
function b64_hmac_md5(key, data) {return binl2b64(core_hmac_md5(key, data));}
function str_hmac_md5(key, data) {return binl2str(core_hmac_md5(key, data));}

/*
                                                                               * Perform a simple self-test to see if the VM is working
                                                                               */
function md5_vm_test() {
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
   * Calculate the MD5 of an array of little-endian words, and a bit length
   */
function core_md5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;

  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
   * These functions implement the four basic operations the algorithm uses.
   */
function md5_cmn(q, a, b, x, s, t) {
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
  return md5_cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
  return md5_cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
}

/*
   * Calculate the HMAC-MD5, of a key and some data
   */
function core_hmac_md5(key, data) {
  var bkey = str2binl(key);
  if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16),opad = Array(16);
  for (var i = 0; i < 16; i++) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
   * to work around bugs in some JS interpreters.
   */
function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xFFFF;
}

/*
   * Bitwise rotate a 32-bit number to the left.
   */
function bit_rol(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}

/*
   * Convert a string to an array of little-endian words
   * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
   */
function str2binl(str) {
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for (var i = 0; i < str.length * chrsz; i += chrsz) {
    bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;}
  return bin;
}

/*
   * Convert an array of little-endian words to a string
   */
function binl2str(bin) {
  var str = "";
  var mask = (1 << chrsz) - 1;
  for (var i = 0; i < bin.length * 32; i += chrsz) {
    str += String.fromCharCode(bin[i >> 5] >>> i % 32 & mask);}
  return str;
}

/*
   * Convert an array of little-endian words to a hex string.
   */
function binl2hex(binarray) {
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for (var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 0xF) +
    hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 0xF);
  }
  return str;
}

/*
   * Convert an array of little-endian words to a base-64 string
   */
function binl2b64(binarray) {
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for (var i = 0; i < binarray.length * 4; i += 3) {
    var triplet = (binarray[i >> 2] >> 8 * (i % 4) & 0xFF) << 16 |
    (binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4) & 0xFF) << 8 |
    binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4) & 0xFF;
    for (var j = 0; j < 4; j++) {
      if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;else
      str += tab.charAt(triplet >> 6 * (3 - j) & 0x3F);
    }
  }
  return str;
}var _default =

hex_md5;exports.default = _default;

/***/ }),

/***/ 27:
/*!********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/node_modules/dayjs/dayjs.min.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
!function (t, n) { true ? module.exports = n() : undefined;}(void 0, function () {"use strict";var t = "millisecond",n = "second",e = "minute",r = "hour",i = "day",s = "week",u = "month",o = "quarter",a = "year",h = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,f = /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,c = function c(t, n, e) {var r = String(t);return !r || r.length >= n ? t : "" + Array(n + 1 - r.length).join(e) + t;},d = { s: c, z: function z(t) {var n = -t.utcOffset(),e = Math.abs(n),r = Math.floor(e / 60),i = e % 60;return (n <= 0 ? "+" : "-") + c(r, 2, "0") + ":" + c(i, 2, "0");}, m: function m(t, n) {var e = 12 * (n.year() - t.year()) + (n.month() - t.month()),r = t.clone().add(e, u),i = n - r < 0,s = t.clone().add(e + (i ? -1 : 1), u);return Number(-(e + (n - r) / (i ? r - s : s - r)) || 0);}, a: function a(t) {return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);}, p: function p(h) {return { M: u, y: a, w: s, d: i, h: r, m: e, s: n, ms: t, Q: o }[h] || String(h || "").toLowerCase().replace(/s$/, "");}, u: function u(t) {return void 0 === t;} },$ = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") },l = "en",m = {};m[l] = $;var y = function y(t) {return t instanceof v;},M = function M(t, n, e) {var r;if (!t) return l;if ("string" == typeof t) m[t] && (r = t), n && (m[t] = n, r = t);else {var i = t.name;m[i] = t, r = i;}return e || (l = r), r;},g = function g(t, n, e) {if (y(t)) return t.clone();var r = n ? "string" == typeof n ? { format: n, pl: e } : n : {};return r.date = t, new v(r);},D = d;D.l = M, D.i = y, D.w = function (t, n) {return g(t, { locale: n.$L, utc: n.$u, $offset: n.$offset });};var v = function () {function c(t) {this.$L = this.$L || M(t.locale, null, !0), this.parse(t);}var d = c.prototype;return d.parse = function (t) {this.$d = function (t) {var n = t.date,e = t.utc;if (null === n) return new Date(NaN);if (D.u(n)) return new Date();if (n instanceof Date) return new Date(n);if ("string" == typeof n && !/Z$/i.test(n)) {var r = n.match(h);if (r) return e ? new Date(Date.UTC(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0)) : new Date(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0);}return new Date(n);}(t), this.init();}, d.init = function () {var t = this.$d;this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();}, d.$utils = function () {return D;}, d.isValid = function () {return !("Invalid Date" === this.$d.toString());}, d.isSame = function (t, n) {var e = g(t);return this.startOf(n) <= e && e <= this.endOf(n);}, d.isAfter = function (t, n) {return g(t) < this.startOf(n);}, d.isBefore = function (t, n) {return this.endOf(n) < g(t);}, d.$g = function (t, n, e) {return D.u(t) ? this[n] : this.set(e, t);}, d.year = function (t) {return this.$g(t, "$y", a);}, d.month = function (t) {return this.$g(t, "$M", u);}, d.day = function (t) {return this.$g(t, "$W", i);}, d.date = function (t) {return this.$g(t, "$D", "date");}, d.hour = function (t) {return this.$g(t, "$H", r);}, d.minute = function (t) {return this.$g(t, "$m", e);}, d.second = function (t) {return this.$g(t, "$s", n);}, d.millisecond = function (n) {return this.$g(n, "$ms", t);}, d.unix = function () {return Math.floor(this.valueOf() / 1e3);}, d.valueOf = function () {return this.$d.getTime();}, d.startOf = function (t, o) {var h = this,f = !!D.u(o) || o,c = D.p(t),d = function d(t, n) {var e = D.w(h.$u ? Date.UTC(h.$y, n, t) : new Date(h.$y, n, t), h);return f ? e : e.endOf(i);},$ = function $(t, n) {return D.w(h.toDate()[t].apply(h.toDate(), (f ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(n)), h);},l = this.$W,m = this.$M,y = this.$D,M = "set" + (this.$u ? "UTC" : "");switch (c) {case a:return f ? d(1, 0) : d(31, 11);case u:return f ? d(1, m) : d(0, m + 1);case s:var g = this.$locale().weekStart || 0,v = (l < g ? l + 7 : l) - g;return d(f ? y - v : y + (6 - v), m);case i:case "date":return $(M + "Hours", 0);case r:return $(M + "Minutes", 1);case e:return $(M + "Seconds", 2);case n:return $(M + "Milliseconds", 3);default:return this.clone();}}, d.endOf = function (t) {return this.startOf(t, !1);}, d.$set = function (s, o) {var h,f = D.p(s),c = "set" + (this.$u ? "UTC" : ""),d = (h = {}, h[i] = c + "Date", h.date = c + "Date", h[u] = c + "Month", h[a] = c + "FullYear", h[r] = c + "Hours", h[e] = c + "Minutes", h[n] = c + "Seconds", h[t] = c + "Milliseconds", h)[f],$ = f === i ? this.$D + (o - this.$W) : o;if (f === u || f === a) {var l = this.clone().set("date", 1);l.$d[d]($), l.init(), this.$d = l.set("date", Math.min(this.$D, l.daysInMonth())).toDate();} else d && this.$d[d]($);return this.init(), this;}, d.set = function (t, n) {return this.clone().$set(t, n);}, d.get = function (t) {return this[D.p(t)]();}, d.add = function (t, o) {var h,f = this;t = Number(t);var c = D.p(o),d = function d(n) {var e = g(f);return D.w(e.date(e.date() + Math.round(n * t)), f);};if (c === u) return this.set(u, this.$M + t);if (c === a) return this.set(a, this.$y + t);if (c === i) return d(1);if (c === s) return d(7);var $ = (h = {}, h[e] = 6e4, h[r] = 36e5, h[n] = 1e3, h)[c] || 1,l = this.$d.getTime() + t * $;return D.w(l, this);}, d.subtract = function (t, n) {return this.add(-1 * t, n);}, d.format = function (t) {var n = this;if (!this.isValid()) return "Invalid Date";var e = t || "YYYY-MM-DDTHH:mm:ssZ",r = D.z(this),i = this.$locale(),s = this.$H,u = this.$m,o = this.$M,a = i.weekdays,h = i.months,c = function c(t, r, i, s) {return t && (t[r] || t(n, e)) || i[r].substr(0, s);},d = function d(t) {return D.s(s % 12 || 12, t, "0");},$ = i.meridiem || function (t, n, e) {var r = t < 12 ? "AM" : "PM";return e ? r.toLowerCase() : r;},l = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: o + 1, MM: D.s(o + 1, 2, "0"), MMM: c(i.monthsShort, o, h, 3), MMMM: h[o] || h(this, e), D: this.$D, DD: D.s(this.$D, 2, "0"), d: String(this.$W), dd: c(i.weekdaysMin, this.$W, a, 2), ddd: c(i.weekdaysShort, this.$W, a, 3), dddd: a[this.$W], H: String(s), HH: D.s(s, 2, "0"), h: d(1), hh: d(2), a: $(s, u, !0), A: $(s, u, !1), m: String(u), mm: D.s(u, 2, "0"), s: String(this.$s), ss: D.s(this.$s, 2, "0"), SSS: D.s(this.$ms, 3, "0"), Z: r };return e.replace(f, function (t, n) {return n || l[t] || r.replace(":", "");});}, d.utcOffset = function () {return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);}, d.diff = function (t, h, f) {var c,d = D.p(h),$ = g(t),l = 6e4 * ($.utcOffset() - this.utcOffset()),m = this - $,y = D.m(this, $);return y = (c = {}, c[a] = y / 12, c[u] = y, c[o] = y / 3, c[s] = (m - l) / 6048e5, c[i] = (m - l) / 864e5, c[r] = m / 36e5, c[e] = m / 6e4, c[n] = m / 1e3, c)[d] || m, f ? y : D.a(y);}, d.daysInMonth = function () {return this.endOf(u).$D;}, d.$locale = function () {return m[this.$L];}, d.locale = function (t, n) {if (!t) return this.$L;var e = this.clone();return e.$L = M(t, n, !0), e;}, d.clone = function () {return D.w(this.$d, this);}, d.toDate = function () {return new Date(this.valueOf());}, d.toJSON = function () {return this.isValid() ? this.toISOString() : null;}, d.toISOString = function () {return this.$d.toISOString();}, d.toString = function () {return this.$d.toUTCString();}, c;}();return g.prototype = v.prototype, g.extend = function (t, n) {return t(n, v, g), g;}, g.locale = M, g.isDayjs = y, g.unix = function (t) {return g(1e3 * t);}, g.en = m[l], g.Ls = m, g;});

/***/ }),

/***/ 274:
/*!********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/components/jyf-Parser/Parser.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //Parser.js
var Tokenizer = __webpack_require__(/*! ./Tokenizer.js */ 275);
var DomHandler = __webpack_require__(/*! ./DomHandler.js */ 276);
var trustAttrs = {
  align: true,
  alt: true,




  author: true,
  autoplay: true,
  class: true,
  color: true,
  colspan: true,
  controls: true,
  "data-src": true,
  dir: true,
  face: true,
  height: true,
  href: true,
  id: true,
  ignore: true,
  loop: true,
  muted: true,
  name: true,
  poster: true,
  rowspan: true,
  size: true,
  span: true,
  src: true,
  start: true,
  style: true,
  type: true,

  "unit-id": true,

  width: true };








































































var voidTag = {
  area: true,
  base: true,
  basefont: true,
  br: true,
  col: true,
  circle: true,
  command: true,
  ellipse: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  isindex: true,
  keygen: true,
  line: true,
  link: true,
  meta: true,
  param: true,
  path: true,
  polygon: true,
  polyline: true,
  rect: true,
  source: true,
  stop: true,
  track: true,
  use: true,
  wbr: true };


function Parser(cbs, callback) {
  this._cbs = cbs;
  this._callback = callback;
  this._tagname = "";
  this._attribname = "";
  this._attribvalue = "";
  this._attribs = null;
  this._stack = [];
  this._tokenizer = new Tokenizer(this);
}
Parser.prototype.ontext = function (data) {
  this._cbs.ontext(data);
};
Parser.prototype.onopentagname = function (name) {
  name = name.toLowerCase();
  this._tagname = name;
  this._attribs = {
    style: '' };

  if (!voidTag[name]) this._stack.push(name);
};
Parser.prototype.onopentagend = function () {
  if (this._attribs) {
    this._cbs.onopentag(this._tagname, this._attribs);
    this._attribs = null;
  }
  if (voidTag[this._tagname]) this._cbs.onclosetag(this._tagname);
  this._tagname = "";
};
Parser.prototype.onclosetag = function (name) {
  name = name.toLowerCase();
  if (this._stack.length && !voidTag[name]) {
    var pos = this._stack.lastIndexOf(name);
    if (pos !== -1) {
      pos = this._stack.length - pos;
      while (pos--) {this._cbs.onclosetag(this._stack.pop());}
    } else if (name === "p") {
      this.onopentagname(name);
      this._closeCurrentTag();
    }
  } else if (name === "br" || name === "hr" || name === "p") {
    this.onopentagname(name);
    this._closeCurrentTag();
  }
};
Parser.prototype._closeCurrentTag = function () {
  var name = this._tagname;
  this.onopentagend();
  if (this._stack[this._stack.length - 1] === name) {
    this._cbs.onclosetag(name);
    this._stack.pop();
  }
};
Parser.prototype.onattribend = function () {
  this._attribvalue = this._attribvalue.replace(/&quot;/g, '"');
  if (this._attribs && trustAttrs[this._attribname]) {
    this._attribs[this._attribname] = this._attribvalue;
  }
  this._attribname = "";
  this._attribvalue = "";
};
Parser.prototype.onend = function () {
  for (
  var i = this._stack.length; i > 0; this._cbs.onclosetag(this._stack[--i])) {
    ;}
  this._callback({
    'nodes': this._cbs.nodes,
    'title': this._cbs.title,
    'imgList': this._cbs.imgList });

};
Parser.prototype.write = function (chunk) {
  this._tokenizer.parse(chunk);
};

function html2nodes(data, tagStyle, imgMode) {
  return new Promise(function (resolve, reject) {
    try {
      var style = '';
      data = data.replace(/<style.*?>([\s\S]*?)<\/style>/gi, function () {
        style += arguments[1];
        return '';
      });
      var handler = new DomHandler(style, tagStyle, imgMode);
      new Parser(handler, function (res) {



        return resolve(res);
      }).write(data);
    } catch (err) {
      return reject(err);
    }
  });
}
module.exports = html2nodes;

/***/ }),

/***/ 275:
/*!***********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/components/jyf-Parser/Tokenizer.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //Tokenizer.js
function Tokenizer(cbs) {
  this._state = "TEXT";
  this._buffer = "";
  this._sectionStart = 0;
  this._index = 0;
  this._cbs = cbs;
}
Tokenizer.prototype.TEXT = function (c) {
  var index = this._buffer.indexOf("<", this._index);
  if (index != -1) {
    this._index = index;
    this._cbs.ontext(this._getSection());
    this._state = "BeforeTag";
    this._sectionStart = this._index;
  } else this._index = this._buffer.length;
};
Tokenizer.prototype.BeforeTag = function (c) {
  switch (c) {
    case "/":
      this._state = "BeforeCloseTag";
      break;
    case "!":
      this._state = "BeforeDeclaration";
      break;
    case "?":
      var index = this._buffer.indexOf(">", this._index);
      if (index != -1) {
        this._index = index;
        this._sectionStart = this._index + 1;
      } else this._sectionStart = this._index = this._buffer.length;
      this._state = "TEXT";
      break;
    case ">":
      this._state = "TEXT";
      break;
    case "<":
      this._cbs.ontext(this._getSection());
      this._sectionStart = this._index;
      break;
    default:
      if (/\s/.test(c)) this._state = "TEXT";else
      {
        this._state = "InTag";
        this._sectionStart = this._index;
      }}

};
Tokenizer.prototype.InTag = function (c) {
  if (c === "/" || c === ">" || /\s/.test(c)) {
    this._cbs.onopentagname(this._getSection());
    this._state = "BeforeAttrsName";
    this._index--;
  }
};
Tokenizer.prototype.BeforeAttrsName = function (c) {
  if (c === ">") {
    this._cbs.onopentagend();
    this._state = "TEXT";
    this._sectionStart = this._index + 1;
  } else if (c === "/") {
    this._state = "InSelfCloseTag";
  } else if (!/\s/.test(c)) {
    this._state = "InAttrsName";
    this._sectionStart = this._index;
  }
};
Tokenizer.prototype.InAttrsName = function (c) {
  if (c === "=" || c === "/" || c === ">" || /\s/.test(c)) {
    this._cbs._attribname = this._getSection().toLowerCase();
    this._sectionStart = -1;
    this._state = "AfterAttrsName";
    this._index--;
  }
};
Tokenizer.prototype.AfterAttrsName = function (c) {
  if (c === "=") {
    this._state = "BeforeAttrsValue";
  } else if (c === "/" || c === ">") {
    this._cbs.onattribend();
    this._state = "BeforeAttrsName";
    this._index--;
  } else if (!/\s/.test(c)) {
    this._cbs.onattribend();
    this._state = "InAttrsName";
    this._sectionStart = this._index;
  }
};
Tokenizer.prototype.BeforeAttrsValue = function (c) {
  if (c === '"') {
    this._state = "InAttrsValueDQ";
    this._sectionStart = this._index + 1;
  } else if (c === "'") {
    this._state = "InAttrsValueSQ";
    this._sectionStart = this._index + 1;
  } else if (!/\s/.test(c)) {
    this._state = "InAttrsValueNQ";
    this._sectionStart = this._index;
    this._index--;
  }
};
Tokenizer.prototype.InAttrsValueDQ = function (c) {
  if (c === '"') {
    this._cbs._attribvalue += this._getSection();
    this._cbs.onattribend();
    this._state = "BeforeAttrsName";
  }
};
Tokenizer.prototype.InAttrsValueSQ = function (c) {
  if (c === "'") {
    this._cbs._attribvalue += this._getSection();
    this._cbs.onattribend();
    this._state = "BeforeAttrsName";
  }
};
Tokenizer.prototype.InAttrsValueNQ = function (c) {
  if (/\s/.test(c) || c === ">") {
    this._cbs._attribvalue += this._getSection();
    this._cbs.onattribend();
    this._state = "BeforeAttrsName";
    this._index--;
  }
};
Tokenizer.prototype.BeforeCloseTag = function (c) {
  if (/\s/.test(c)) ;else
  if (c === ">") {
    this._state = "TEXT";
  } else {
    this._state = "InCloseTag";
    this._sectionStart = this._index;
  }
};
Tokenizer.prototype.InCloseTag = function (c) {
  if (c === ">" || /\s/.test(c)) {
    this._cbs.onclosetag(this._getSection());
    this._state = "AfterCloseTag";
    this._index--;
  }
};
Tokenizer.prototype.InSelfCloseTag = function (c) {
  if (c === ">") {
    this._cbs.onopentagend();
    this._state = "TEXT";
    this._sectionStart = this._index + 1;
  } else if (!/\s/.test(c)) {
    this._state = "BeforeAttrsName";
    this._index--;
  }
};
Tokenizer.prototype.AfterCloseTag = function (c) {
  if (c === ">") {
    this._state = "TEXT";
    this._sectionStart = this._index + 1;
  }
};
Tokenizer.prototype.BeforeDeclaration = function (c) {
  if (c == '-') this._state = "InComment";else
  if (c == '[') this._state = "BeforeCDATA1";else
  this._state = "InDeclaration";
};
Tokenizer.prototype.InDeclaration = function (c) {
  var index = this._buffer.indexOf(">", this._index);
  if (index != -1) {
    this._index = index;
    this._sectionStart = index + 1;
  } else this._sectionStart = this._index = this._buffer.length;
  this._state = "TEXT";
};
Tokenizer.prototype.InComment = function (c) {
  var key = c == '-' ? '-->' : '>';
  var index = this._buffer.indexOf(key, this._index);
  if (index != -1) {
    this._index = index + key.length - 1;
    this._sectionStart = this._index + 1;
  } else this._sectionStart = this._index = this._buffer.length;
  this._state = "TEXT";
};
Tokenizer.prototype.BeforeCDATA1 = function (c) {
  if (c == 'C') this._state = "BeforeCDATA2";else
  this._state = "InDeclaration";
};
Tokenizer.prototype.BeforeCDATA2 = function (c) {
  if (c == 'D') this._state = "BeforeCDATA3";else
  this._state = "InDeclaration";
};
Tokenizer.prototype.BeforeCDATA3 = function (c) {
  if (c == 'A') this._state = "BeforeCDATA4";else
  this._state = "InDeclaration";
};
Tokenizer.prototype.BeforeCDATA4 = function (c) {
  if (c == 'T') this._state = "BeforeCDATA5";else
  this._state = "InDeclaration";
};
Tokenizer.prototype.BeforeCDATA5 = function (c) {
  if (c == 'A') this._state = "InCDATA";else
  this._state = "InDeclaration";
};
Tokenizer.prototype.InCDATA = function (c) {
  var key = c == '[' ? ']]>' : '>';
  var index = this._buffer.indexOf(key, this._index);
  if (index != -1) {
    this._index = index + key.length - 1;
    this._sectionStart = this._index + 1;
  } else this._sectionStart = this._index = this._buffer.length;
  this._state = "TEXT";
};
Tokenizer.prototype.parse = function (chunk) {
  this._buffer += chunk;
  for (; this._index < this._buffer.length; this._index++) {
    this[this._state](this._buffer[this._index]);}
  if (this._state === "TEXT" && this._sectionStart !== this._index)
  this._cbs.ontext(this._buffer.substr(this._sectionStart));
  this._cbs.onend();
};
Tokenizer.prototype._getSection = function () {
  return this._buffer.substring(this._sectionStart, this._index);
};
module.exports = Tokenizer;

/***/ }),

/***/ 276:
/*!************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/components/jyf-Parser/DomHandler.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //DomHandler.js
var emoji; // 使用emoji补丁包时将此句改为 const emoji = require('./emoji.js');
var CssHandler = __webpack_require__(/*! ./CssHandler.js */ 277);

var CanIUse = __webpack_require__(/*! ./api.js */ 278).versionHigherThan('2.7.1');

var trustTag = {
  a: 0,
  abbr: 1,
  ad: 0,
  audio: 0,
  b: 1,
  blockquote: 1,
  br: 0,
  code: 1,
  col: 0,
  colgroup: 0,
  dd: 1,
  del: 1,
  dl: 1,
  dt: 1,
  div: 1,
  em: 1,
  fieldset: 0,
  font: 1,
  h1: 0,
  h2: 0,
  h3: 0,
  h4: 0,
  h5: 0,
  h6: 0,
  hr: 0,
  i: 1,
  img: 1,
  ins: 1,
  label: 1,
  legend: 0,
  li: 0,
  ol: 0,
  p: 1,
  q: 1,
  source: 0,
  span: 1,
  strong: 1,
  sub: 0,
  sup: 0,
  table: 0,
  tbody: 0,
  td: 0,
  tfoot: 0,
  th: 0,
  thead: 0,
  tr: 0,
  u: 1,
  ul: 0,
  video: 1 };

var blockTag = {
  address: true,
  article: true,
  aside: true,
  body: true,
  center: true,
  cite: true,
  footer: true,
  header: true,
  html: true,
  nav: true,
  pre: true,
  section: true };

var ignoreTag = {
  area: true,
  base: true,
  basefont: true,
  canvas: true,
  circle: true,
  command: true,
  ellipse: true,
  embed: true,
  frame: true,
  head: true,
  iframe: true,
  input: true,
  isindex: true,
  keygen: true,
  line: true,
  link: true,
  map: true,
  meta: true,
  param: true,
  path: true,
  polygon: true,
  polyline: true,
  rect: true,
  script: true,
  stop: true,
  textarea: true,
  title: true,
  track: true,
  use: true,
  wbr: true };


if (CanIUse) {
  trustTag.bdi = 0;
  trustTag.bdo = 0;
  trustTag.caption = 0;
  trustTag.rt = 0;
  trustTag.ruby = 0;
  ignoreTag.rp = true;
  trustTag.big = 1;
  trustTag.small = 1;
  trustTag.pre = 0;
  delete blockTag.pre;
} else blockTag.caption = true;


function randomId() {
  var res = "";
  for (var i = 0; i < 5; i++) {
    var rand = parseInt(Math.random() * 52);
    if (rand < 26)
    res = res + String.fromCharCode(65 + rand);else

    res = res + String.fromCharCode(71 + rand);
  }
  return res;
}

function DomHandler(style) {var tagStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var imgMode = arguments.length > 2 ? arguments[2] : undefined;
  this.imgList = [];
  this.imgIndex = 0;
  this.nodes = [];
  this.title = "";
  this._CssHandler = new CssHandler(style, tagStyle);
  this._tagStack = [];
  this._videoNum = 0;



  this._whiteSpace = false;
}
DomHandler.prototype._addDomElement = function (element) {
  if (element.name == 'pre' || element.attrs && /white-space\s*:\s*pre/.test(element.attrs.style)) {
    this._whiteSpace = true;
    element.pre = true;
  }
  var parent = this._tagStack[this._tagStack.length - 1];
  var siblings = parent ? parent.children : this.nodes;
  siblings.push(element);
};
DomHandler.prototype._bubbling = function () {
  for (var i = this._tagStack.length - 1; i >= 0; i--) {
    if (trustTag[this._tagStack[i].name])
    this._tagStack[i].continue = true;else

    return this._tagStack[i].name;
  }
};
DomHandler.prototype.onopentag = function (name, attrs) {
  var element = {
    children: [] };

  var matched = this._CssHandler.match(name, attrs, element);
  //处理属性
  switch (name) {
    case 'div':
    case 'p':
      if (attrs.align) {
        attrs.style += ';text-align:' + attrs.align;
        delete attrs.align;
      }
      break;
    case 'img':
      if (attrs.width) {
        attrs.style = 'width:' + attrs.width + (/[0-9]/.test(attrs.width[attrs.width.length - 1]) ? 'px' : '') + ';' +
        attrs.style;
        delete attrs.width;
      }
      if (attrs['data-src']) {
        attrs.src = attrs.src || attrs['data-src'];
        delete attrs['data-src'];
      }



      if (!attrs.hasOwnProperty('ignore') && attrs.src) {
        if (this._bubbling() == 'a') {
          attrs.ignore = "true"; // 图片在链接中不可预览
          break;
        }
        var url = attrs.src;

        // 去重，至多重试10次
        for (var i = 0; this.imgList.indexOf(url) != -1 && i < 10; i++) {
          // 网络链接
          if (/^http/.test(url)) {
            url = url.replace(/^(https*):\/\/([\S]+?)\//, function () {
              var domain = "";var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
                for (var _iterator = arguments[2][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var c = _step.value;
                  if (/[a-zA-Z]/.test(c))
                  domain += Math.random() >= 0.5 ? c.toUpperCase() : c;else
                  domain += c;
                }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return != null) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}
              return arguments[1] + '://' + domain + '/';
            });
          }
          // base64
          else if (/base64/.test(url)) {
              url = url.replace(/^data:(image\/\S+);base64,/, function () {
                var head = "";var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
                  for (var _iterator2 = arguments[1][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var c = _step2.value;
                    if (/[a-zA-Z]/.test(c))
                    head += Math.random() >= 0.5 ? c.toUpperCase() : c;else
                    head += c;
                  }} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return != null) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}
                return 'data:' + head + ';base64,';
              });
            } else break;
        }

        element.current = this.imgList.length;
        this.imgList.push(url);
      } else
      attrs.ignore = "true";
      break;
    case 'font':
      name = 'span';
      if (attrs.color) {
        attrs.style += ';color:' + attrs.color;
        delete attrs.color;
      }
      if (attrs.face) {
        attrs.style += ";font-family:" + attrs.face;
        delete attrs.face;
      }
      if (attrs.size) {
        var size = parseInt(attrs.size);
        if (size < 1) size = 1;else
        if (size > 7) size = 7;
        var map = [10, 13, 16, 18, 24, 32, 48];
        attrs.style += ";font-size:" + map[size - 1] + "px";
        delete attrs.size;
      }
      break;
    case 'a':
    case 'ad':
      this._bubbling();
      break;
    case 'video':
    case 'audio':
      attrs.loop = attrs.hasOwnProperty('loop');
      attrs.controls = attrs.hasOwnProperty('controls');
      attrs.autoplay = attrs.hasOwnProperty('autoplay');
      if (name == 'video') {
        attrs.muted = attrs.hasOwnProperty('muted');
        if (attrs.width) {
          attrs.style = 'width:' + parseFloat(attrs.width) + 'px;' + attrs.style;
          delete attrs.width;
        }
        if (attrs.height) {
          attrs.style = 'height:' + parseFloat(attrs.height) + 'px;' + attrs.style;
          delete attrs.height;
        }
      }
      attrs.id = randomId() + (name == 'video' ? ++this._videoNum : '');
      attrs.source = [];
      if (attrs.src) attrs.source.push(attrs.src);
      if (!attrs.controls && !attrs.autoplay)
      console.warn('存在没有controls属性的' + name + '标签，可能导致无法播放', attrs);
      this._bubbling();
      break;
    case 'source':
      var parent = this._tagStack[this._tagStack.length - 1];
      if (parent && (parent.name == 'video' || parent.name == 'audio')) {
        parent.attrs.source.push(attrs.src);
        if (!parent.attrs.src) parent.attrs.src = attrs.src;
      }
      this._tagStack.push(element);
      return;}

  attrs.style = matched + attrs.style;
  if (blockTag[name]) name = 'div';else
  if (!trustTag.hasOwnProperty(name)) name = 'span';
  element.name = name;
  element.attrs = attrs;
  this._addDomElement(element);
  this._tagStack.push(element);
};
DomHandler.prototype.ontext = function (data) {
  if (!this._whiteSpace) {
    if (!/\S/.test(data))
    return;
    data = data.replace(/\s+/g, " ");
  }




































  var element = {
    type: 'text' };


  data = data.replace(/&nbsp;/g, '&#xA0;'); // 解决连续&nbsp;失效问题
  if (/&#*((?!sp|lt|gt).){2,8};/.test(data)) element.decode = true;

  if (emoji) data = emoji.parseEmoji(data);
  element.text = data;
  this._addDomElement(element);
};
DomHandler.prototype.onclosetag = function (name) {
  var element = this._tagStack.pop();
  var parent = this._tagStack.length ? this._tagStack[this._tagStack.length - 1].children : this.nodes;
  if (ignoreTag[name]) {
    if (name == 'title') {
      try {
        this.title = element.children[0].text;
      } catch (e) {}
    }
    parent.pop();
  }
  // 合并一些不必要的层，减小节点深度
  if (element.children.length == 1 && element.name == 'div') {
    var child = element.children[0];
    if (child.name == 'div' && !/padding/.test(element.attrs.style) && !(/margin/.test(element.attrs.style) &&
    /margin/.test(child.attrs.style)) && !/display/.test(element.attrs.style) && !/display/.test(child.attrs.style) &&
    !(element.attrs.id && child.attrs.id) && !(element.attrs.class && child.attrs.class)) {
      if (/padding/.test(child.attrs.style))
      child.attrs.style = ";box-sizing:border-box;" + child.attrs.style;
      child.attrs.style = element.attrs.style + ";" + child.attrs.style;
      child.attrs.id = (child.attrs.id || "") + (element.attrs.id || "");
      child.attrs.class = (child.attrs.class || "") + (element.attrs.class || "");
      parent[parent.indexOf(element)] = child;
    }
  }
  if (element.pre) {
    this._whiteSpace = false;var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {
      for (var _iterator3 = this._tagStack[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var ele = _step3.value;
        if (ele.pre)
        this._whiteSpace = true;}} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return != null) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}
    delete element.pre;
  }
  // 多层样式处理 
  if (this._CssHandler.pop)
  this._CssHandler.pop(element);
};
module.exports = DomHandler;

/***/ }),

/***/ 277:
/*!************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/components/jyf-Parser/CssHandler.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //CssHandler.js

var CanIUse = __webpack_require__(/*! ./api.js */ 278).versionHigherThan('2.7.1');

function CssHandler(style, tagStyle) {
  this._style = new CssTokenizer(style, tagStyle).parse();
}
CssHandler.prototype.match = function (name, attrs) {
  var matched = this._style[name] ? this._style[name] + ';' : '';
  if (attrs.id)
  matched += this._style['#' + attrs.id] ? this._style['#' + attrs.id] + ';' : '';
  if (attrs.class) {var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
      for (var _iterator = attrs.class.split(' ')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var Class = _step.value;
        matched += this._style['.' + Class] ? this._style['.' + Class] + ';' : '';}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return != null) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}}
  return matched;
};

function CssTokenizer() {var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';var tagStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  this.res = this.initClass(tagStyle);
  this._state = "SPACE";
  this._buffer = style;
  this._sectionStart = 0;
  this._index = 0;
  this._name = '';
  this._content = '';
  this._list = [];
  this._comma = false;
}
CssTokenizer.prototype.initClass = function (tagStyle) {
  var initStyle = JSON.parse(JSON.stringify(tagStyle));
  initStyle.a = "display:inline;color:#366092;word-break:break-all;" + (initStyle.a || "");
  initStyle.address = "font-style:italic;" + (initStyle.address || "");
  initStyle.blockquote = initStyle.blockquote ||
  'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px;';
  initStyle.center = 'text-align:center;' + (initStyle.center || "");
  initStyle.cite = "font-style:italic;" + (initStyle.cite || "");
  initStyle.code = initStyle.code ||
  'padding:0 1px 0 1px;margin-left:2px;margin-right:2px;background-color:#f8f8f8;border:1px solid #cccccc;border-radius:3px;';
  initStyle.dd = "margin-left:40px;" + (initStyle.dd || "");
  initStyle.img = "max-width:100%;" + (initStyle.img || "");
  initStyle.mark = "display:inline;background-color:yellow;" + (initStyle.mark || "");
  initStyle.pre = "overflow:scroll;" + (initStyle.pre || 'background-color:#f6f8fa;padding:5px;border-radius:5px;');
  initStyle.s = "display:inline;text-decoration:line-through;" + (initStyle.s || "");
  initStyle.u = "display:inline;text-decoration:underline;" + (initStyle.u || "");

  //低版本兼容
  if (!CanIUse) {

    initStyle.big = "display:inline;font-size:1.2em;" + (initStyle.big || "");
    initStyle.small = "display:inline;font-size:0.8em;" + (initStyle.small || "");
    initStyle.pre = "font-family:monospace;white-space:pre;" + initStyle.pre;

  }

  return initStyle;
};
CssTokenizer.prototype.SPACE = function (c) {
  if (/[a-zA-Z.#]/.test(c)) {
    this._sectionStart = this._index;
    this._state = "InName";
  } else if (c == '@') this._state = "Ignore1";else
  if (c == '/') this._state = "BeforeComment";
};
CssTokenizer.prototype.BeforeComment = function (c) {
  if (c == '*') this._state = "InComment";else
  {
    this._index--;
    this._state = "SPACE";
  }
};
CssTokenizer.prototype.InComment = function (c) {
  if (c == '*') this._state = "AfterComment";
};
CssTokenizer.prototype.AfterComment = function (c) {
  if (c == '/') this._state = "SPACE";else
  {
    this._index--;
    this._state = "InComment";
  }
};
CssTokenizer.prototype.InName = function (c) {
  if (c == '{') {
    this._list.push(this._buffer.substring(this._sectionStart, this._index));
    this._sectionStart = this._index + 1;
    this._state = "InContent";
  } else if (c == ',') {
    this._list.push(this._buffer.substring(this._sectionStart, this._index));
    this._sectionStart = this._index + 1;
    this._comma = true;
  } else if ((c == '.' || c == '#') && !this._comma) {
    this._buffer = this._buffer.splice(this._index, 1, ' ');
  } else if (/\s/.test(c)) {
    this._name = this._buffer.substring(this._sectionStart, this._index);
    this._state = "NameSpace";
  } else if (/[>:\[]/.test(c)) {
    if (this._list.length) this._state = "IgnoreName";else
    this._state = "Ignore1";
  } else this._comma = false;
};
CssTokenizer.prototype.NameSpace = function (c) {
  if (c == '{') {
    this._list.push(this._name);
    this._sectionStart = this._index + 1;
    this._state = "InContent";
  } else if (c == ',') {
    this._comma = true;
    this._list.push(this._name);
    this._sectionStart = this._index + 1;
    this._state = "InName";
  } else if (/\S/.test(c)) {
    if (this._comma) {
      this._sectionStart = this._index;
      this._index--;
      this._state = "InName";
    } else if (this._list.length) this._state = "IgnoreName";else
    this._state = "Ignore1";
  }
};
CssTokenizer.prototype.InContent = function (c) {
  if (c == '}') {
    this._content = this._buffer.substring(this._sectionStart, this._index);var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
      for (var _iterator2 = this._list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var item = _step2.value;
        this.res[item] = (this.res[item] || '') + ";" + this._content;}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return != null) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}
    this._list = [];
    this._comma = false;
    this._state = "SPACE";
  }
};
CssTokenizer.prototype.IgnoreName = function (c) {
  if (c == ',') {
    this._sectionStart = this._index + 1;
    this._state = "InName";
  } else if (c == '{') {
    this._sectionStart = this._index + 1;
    this._state = "InContent";
  }
};
CssTokenizer.prototype.Ignore1 = function (c) {
  if (c == ';') {
    this._state = "SPACE";
    this._sectionStart = this._index + 1;
  } else if (c == '{') this._state = "Ignore2";
};
CssTokenizer.prototype.Ignore2 = function (c) {
  if (c == '}') {
    this._state = "SPACE";
    this._sectionStart = this._index + 1;
  } else if (c == '{') this._state = "Ignore3";
};
CssTokenizer.prototype.Ignore3 = function (c) {
  if (c == '}') this._state = "Ignore2";
};
CssTokenizer.prototype.parse = function () {
  for (; this._index < this._buffer.length; this._index++) {
    this[this._state](this._buffer[this._index]);}
  return this.res;
};
module.exports = CssHandler;

/***/ }),

/***/ 278:
/*!*****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/components/jyf-Parser/api.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {String.prototype.splice = function () {var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;var deleteCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var addStr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  if (start < 0) start = this.length + start;
  if (deleteCount < 0) deleteCount = 0;
  return this.substring(0, start) + addStr + this.substring(start + deleteCount);
};

var SDKVersion = uni.getSystemInfoSync().SDKVersion;

module.exports = {

  versionHigherThan: function versionHigherThan() {var version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var v1 = SDKVersion.split('.');
    var v2 = version.split('.');
    var len = Math.max(v1.length, v2.length);
    while (v1.length < len) {
      v1.push('0');
    }
    while (v2.length < len) {
      v2.push('0');
    }
    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i]);
      var num2 = parseInt(v2[i]);
      if (num1 > num2) {
        return true;
      } else if (num1 < num2) {
        return false;
      }
    }
    return true;
  },

  html2nodes: function html2nodes(html, tagStyle) {
    var Parser = __webpack_require__(/*! ./Parser.js */ 274);
    return Parser(html, tagStyle);
  },
  css2object: function css2object(style, tagStyle) {
    var CssHandler = __webpack_require__(/*! ./CssHandler.js */ 277);
    return new CssHandler(style, tagStyle)._style;
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 28:
/*!******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/node_modules/dayjs/plugin/relativeTime.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
!function (r, t) { true ? module.exports = t() : undefined;}(void 0, function () {"use strict";return function (r, t, e) {var n = t.prototype;e.en.relativeTime = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };var o = function o(r, t, n, _o) {for (var d, i, u = n.$locale().relativeTime, a = [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], f = a.length, s = 0; s < f; s += 1) {var l = a[s];l.d && (d = _o ? e(r).diff(n, l.d, !0) : n.diff(r, l.d, !0));var h = Math.round(Math.abs(d));if (h <= l.r || !l.r) {1 === h && s > 0 && (l = a[s - 1]), i = u[l.l].replace("%d", h);break;}}return t ? i : (d > 0 ? u.future : u.past).replace("%s", i);};n.to = function (r, t) {return o(r, t, this, !0);}, n.from = function (r, t) {return o(r, t, this);};var d = function d(r) {return r.$u ? e.utc() : e();};n.toNow = function (r) {return this.to(d(this), r);}, n.fromNow = function (r) {return this.from(d(this), r);};};});

/***/ }),

/***/ 286:
/*!*********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/components/city-picker/city-data/province.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var provinceData = [{
  "label": "北京市",
  "value": "11" },

{
  "label": "天津市",
  "value": "12" },

{
  "label": "河北省",
  "value": "13" },

{
  "label": "山西省",
  "value": "14" },

{
  "label": "内蒙古自治区",
  "value": "15" },

{
  "label": "辽宁省",
  "value": "21" },

{
  "label": "吉林省",
  "value": "22" },

{
  "label": "黑龙江省",
  "value": "23" },

{
  "label": "上海市",
  "value": "31" },

{
  "label": "江苏省",
  "value": "32" },

{
  "label": "浙江省",
  "value": "33" },

{
  "label": "安徽省",
  "value": "34" },

{
  "label": "福建省",
  "value": "35" },

{
  "label": "江西省",
  "value": "36" },

{
  "label": "山东省",
  "value": "37" },

{
  "label": "河南省",
  "value": "41" },

{
  "label": "湖北省",
  "value": "42" },

{
  "label": "湖南省",
  "value": "43" },

{
  "label": "广东省",
  "value": "44" },

{
  "label": "广西壮族自治区",
  "value": "45" },

{
  "label": "海南省",
  "value": "46" },

{
  "label": "重庆市",
  "value": "50" },

{
  "label": "四川省",
  "value": "51" },

{
  "label": "贵州省",
  "value": "52" },

{
  "label": "云南省",
  "value": "53" },

{
  "label": "西藏自治区",
  "value": "54" },

{
  "label": "陕西省",
  "value": "61" },

{
  "label": "甘肃省",
  "value": "62" },

{
  "label": "青海省",
  "value": "63" },

{
  "label": "宁夏回族自治区",
  "value": "64" },

{
  "label": "新疆维吾尔自治区",
  "value": "65" },

{
  "label": "台湾",
  "value": "66" },

{
  "label": "香港",
  "value": "67" },

{
  "label": "澳门",
  "value": "68" }];var _default =


provinceData;exports.default = _default;

/***/ }),

/***/ 287:
/*!*****************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/components/city-picker/city-data/city.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var cityData = [
[{
  "label": "市辖区",
  "value": "1101" }],

[{
  "label": "市辖区",
  "value": "1201" }],

[{
  "label": "石家庄市",
  "value": "1301" },

{
  "label": "唐山市",
  "value": "1302" },

{
  "label": "秦皇岛市",
  "value": "1303" },

{
  "label": "邯郸市",
  "value": "1304" },

{
  "label": "邢台市",
  "value": "1305" },

{
  "label": "保定市",
  "value": "1306" },

{
  "label": "张家口市",
  "value": "1307" },

{
  "label": "承德市",
  "value": "1308" },

{
  "label": "沧州市",
  "value": "1309" },

{
  "label": "廊坊市",
  "value": "1310" },

{
  "label": "衡水市",
  "value": "1311" }],


[{
  "label": "太原市",
  "value": "1401" },

{
  "label": "大同市",
  "value": "1402" },

{
  "label": "阳泉市",
  "value": "1403" },

{
  "label": "长治市",
  "value": "1404" },

{
  "label": "晋城市",
  "value": "1405" },

{
  "label": "朔州市",
  "value": "1406" },

{
  "label": "晋中市",
  "value": "1407" },

{
  "label": "运城市",
  "value": "1408" },

{
  "label": "忻州市",
  "value": "1409" },

{
  "label": "临汾市",
  "value": "1410" },

{
  "label": "吕梁市",
  "value": "1411" }],


[{
  "label": "呼和浩特市",
  "value": "1501" },

{
  "label": "包头市",
  "value": "1502" },

{
  "label": "乌海市",
  "value": "1503" },

{
  "label": "赤峰市",
  "value": "1504" },

{
  "label": "通辽市",
  "value": "1505" },

{
  "label": "鄂尔多斯市",
  "value": "1506" },

{
  "label": "呼伦贝尔市",
  "value": "1507" },

{
  "label": "巴彦淖尔市",
  "value": "1508" },

{
  "label": "乌兰察布市",
  "value": "1509" },

{
  "label": "兴安盟",
  "value": "1522" },

{
  "label": "锡林郭勒盟",
  "value": "1525" },

{
  "label": "阿拉善盟",
  "value": "1529" }],


[{
  "label": "沈阳市",
  "value": "2101" },

{
  "label": "大连市",
  "value": "2102" },

{
  "label": "鞍山市",
  "value": "2103" },

{
  "label": "抚顺市",
  "value": "2104" },

{
  "label": "本溪市",
  "value": "2105" },

{
  "label": "丹东市",
  "value": "2106" },

{
  "label": "锦州市",
  "value": "2107" },

{
  "label": "营口市",
  "value": "2108" },

{
  "label": "阜新市",
  "value": "2109" },

{
  "label": "辽阳市",
  "value": "2110" },

{
  "label": "盘锦市",
  "value": "2111" },

{
  "label": "铁岭市",
  "value": "2112" },

{
  "label": "朝阳市",
  "value": "2113" },

{
  "label": "葫芦岛市",
  "value": "2114" }],


[{
  "label": "长春市",
  "value": "2201" },

{
  "label": "吉林市",
  "value": "2202" },

{
  "label": "四平市",
  "value": "2203" },

{
  "label": "辽源市",
  "value": "2204" },

{
  "label": "通化市",
  "value": "2205" },

{
  "label": "白山市",
  "value": "2206" },

{
  "label": "松原市",
  "value": "2207" },

{
  "label": "白城市",
  "value": "2208" },

{
  "label": "延边朝鲜族自治州",
  "value": "2224" }],


[{
  "label": "哈尔滨市",
  "value": "2301" },

{
  "label": "齐齐哈尔市",
  "value": "2302" },

{
  "label": "鸡西市",
  "value": "2303" },

{
  "label": "鹤岗市",
  "value": "2304" },

{
  "label": "双鸭山市",
  "value": "2305" },

{
  "label": "大庆市",
  "value": "2306" },

{
  "label": "伊春市",
  "value": "2307" },

{
  "label": "佳木斯市",
  "value": "2308" },

{
  "label": "七台河市",
  "value": "2309" },

{
  "label": "牡丹江市",
  "value": "2310" },

{
  "label": "黑河市",
  "value": "2311" },

{
  "label": "绥化市",
  "value": "2312" },

{
  "label": "大兴安岭地区",
  "value": "2327" }],


[{
  "label": "市辖区",
  "value": "3101" }],

[{
  "label": "南京市",
  "value": "3201" },

{
  "label": "无锡市",
  "value": "3202" },

{
  "label": "徐州市",
  "value": "3203" },

{
  "label": "常州市",
  "value": "3204" },

{
  "label": "苏州市",
  "value": "3205" },

{
  "label": "南通市",
  "value": "3206" },

{
  "label": "连云港市",
  "value": "3207" },

{
  "label": "淮安市",
  "value": "3208" },

{
  "label": "盐城市",
  "value": "3209" },

{
  "label": "扬州市",
  "value": "3210" },

{
  "label": "镇江市",
  "value": "3211" },

{
  "label": "泰州市",
  "value": "3212" },

{
  "label": "宿迁市",
  "value": "3213" }],


[{
  "label": "杭州市",
  "value": "3301" },

{
  "label": "宁波市",
  "value": "3302" },

{
  "label": "温州市",
  "value": "3303" },

{
  "label": "嘉兴市",
  "value": "3304" },

{
  "label": "湖州市",
  "value": "3305" },

{
  "label": "绍兴市",
  "value": "3306" },

{
  "label": "金华市",
  "value": "3307" },

{
  "label": "衢州市",
  "value": "3308" },

{
  "label": "舟山市",
  "value": "3309" },

{
  "label": "台州市",
  "value": "3310" },

{
  "label": "丽水市",
  "value": "3311" }],


[{
  "label": "合肥市",
  "value": "3401" },

{
  "label": "芜湖市",
  "value": "3402" },

{
  "label": "蚌埠市",
  "value": "3403" },

{
  "label": "淮南市",
  "value": "3404" },

{
  "label": "马鞍山市",
  "value": "3405" },

{
  "label": "淮北市",
  "value": "3406" },

{
  "label": "铜陵市",
  "value": "3407" },

{
  "label": "安庆市",
  "value": "3408" },

{
  "label": "黄山市",
  "value": "3410" },

{
  "label": "滁州市",
  "value": "3411" },

{
  "label": "阜阳市",
  "value": "3412" },

{
  "label": "宿州市",
  "value": "3413" },

{
  "label": "六安市",
  "value": "3415" },

{
  "label": "亳州市",
  "value": "3416" },

{
  "label": "池州市",
  "value": "3417" },

{
  "label": "宣城市",
  "value": "3418" }],


[{
  "label": "福州市",
  "value": "3501" },

{
  "label": "厦门市",
  "value": "3502" },

{
  "label": "莆田市",
  "value": "3503" },

{
  "label": "三明市",
  "value": "3504" },

{
  "label": "泉州市",
  "value": "3505" },

{
  "label": "漳州市",
  "value": "3506" },

{
  "label": "南平市",
  "value": "3507" },

{
  "label": "龙岩市",
  "value": "3508" },

{
  "label": "宁德市",
  "value": "3509" }],


[{
  "label": "南昌市",
  "value": "3601" },

{
  "label": "景德镇市",
  "value": "3602" },

{
  "label": "萍乡市",
  "value": "3603" },

{
  "label": "九江市",
  "value": "3604" },

{
  "label": "新余市",
  "value": "3605" },

{
  "label": "鹰潭市",
  "value": "3606" },

{
  "label": "赣州市",
  "value": "3607" },

{
  "label": "吉安市",
  "value": "3608" },

{
  "label": "宜春市",
  "value": "3609" },

{
  "label": "抚州市",
  "value": "3610" },

{
  "label": "上饶市",
  "value": "3611" }],


[{
  "label": "济南市",
  "value": "3701" },

{
  "label": "青岛市",
  "value": "3702" },

{
  "label": "淄博市",
  "value": "3703" },

{
  "label": "枣庄市",
  "value": "3704" },

{
  "label": "东营市",
  "value": "3705" },

{
  "label": "烟台市",
  "value": "3706" },

{
  "label": "潍坊市",
  "value": "3707" },

{
  "label": "济宁市",
  "value": "3708" },

{
  "label": "泰安市",
  "value": "3709" },

{
  "label": "威海市",
  "value": "3710" },

{
  "label": "日照市",
  "value": "3711" },

{
  "label": "莱芜市",
  "value": "3712" },

{
  "label": "临沂市",
  "value": "3713" },

{
  "label": "德州市",
  "value": "3714" },

{
  "label": "聊城市",
  "value": "3715" },

{
  "label": "滨州市",
  "value": "3716" },

{
  "label": "菏泽市",
  "value": "3717" }],


[{
  "label": "郑州市",
  "value": "4101" },

{
  "label": "开封市",
  "value": "4102" },

{
  "label": "洛阳市",
  "value": "4103" },

{
  "label": "平顶山市",
  "value": "4104" },

{
  "label": "安阳市",
  "value": "4105" },

{
  "label": "鹤壁市",
  "value": "4106" },

{
  "label": "新乡市",
  "value": "4107" },

{
  "label": "焦作市",
  "value": "4108" },

{
  "label": "濮阳市",
  "value": "4109" },

{
  "label": "许昌市",
  "value": "4110" },

{
  "label": "漯河市",
  "value": "4111" },

{
  "label": "三门峡市",
  "value": "4112" },

{
  "label": "南阳市",
  "value": "4113" },

{
  "label": "商丘市",
  "value": "4114" },

{
  "label": "信阳市",
  "value": "4115" },

{
  "label": "周口市",
  "value": "4116" },

{
  "label": "驻马店市",
  "value": "4117" },

{
  "label": "省直辖县级行政区划",
  "value": "4190" }],


[{
  "label": "武汉市",
  "value": "4201" },

{
  "label": "黄石市",
  "value": "4202" },

{
  "label": "十堰市",
  "value": "4203" },

{
  "label": "宜昌市",
  "value": "4205" },

{
  "label": "襄阳市",
  "value": "4206" },

{
  "label": "鄂州市",
  "value": "4207" },

{
  "label": "荆门市",
  "value": "4208" },

{
  "label": "孝感市",
  "value": "4209" },

{
  "label": "荆州市",
  "value": "4210" },

{
  "label": "黄冈市",
  "value": "4211" },

{
  "label": "咸宁市",
  "value": "4212" },

{
  "label": "随州市",
  "value": "4213" },

{
  "label": "恩施土家族苗族自治州",
  "value": "4228" },

{
  "label": "省直辖县级行政区划",
  "value": "4290" }],


[{
  "label": "长沙市",
  "value": "4301" },

{
  "label": "株洲市",
  "value": "4302" },

{
  "label": "湘潭市",
  "value": "4303" },

{
  "label": "衡阳市",
  "value": "4304" },

{
  "label": "邵阳市",
  "value": "4305" },

{
  "label": "岳阳市",
  "value": "4306" },

{
  "label": "常德市",
  "value": "4307" },

{
  "label": "张家界市",
  "value": "4308" },

{
  "label": "益阳市",
  "value": "4309" },

{
  "label": "郴州市",
  "value": "4310" },

{
  "label": "永州市",
  "value": "4311" },

{
  "label": "怀化市",
  "value": "4312" },

{
  "label": "娄底市",
  "value": "4313" },

{
  "label": "湘西土家族苗族自治州",
  "value": "4331" }],


[{
  "label": "广州市",
  "value": "4401" },

{
  "label": "韶关市",
  "value": "4402" },

{
  "label": "深圳市",
  "value": "4403" },

{
  "label": "珠海市",
  "value": "4404" },

{
  "label": "汕头市",
  "value": "4405" },

{
  "label": "佛山市",
  "value": "4406" },

{
  "label": "江门市",
  "value": "4407" },

{
  "label": "湛江市",
  "value": "4408" },

{
  "label": "茂名市",
  "value": "4409" },

{
  "label": "肇庆市",
  "value": "4412" },

{
  "label": "惠州市",
  "value": "4413" },

{
  "label": "梅州市",
  "value": "4414" },

{
  "label": "汕尾市",
  "value": "4415" },

{
  "label": "河源市",
  "value": "4416" },

{
  "label": "阳江市",
  "value": "4417" },

{
  "label": "清远市",
  "value": "4418" },

{
  "label": "东莞市",
  "value": "4419" },

{
  "label": "中山市",
  "value": "4420" },

{
  "label": "潮州市",
  "value": "4451" },

{
  "label": "揭阳市",
  "value": "4452" },

{
  "label": "云浮市",
  "value": "4453" }],


[{
  "label": "南宁市",
  "value": "4501" },

{
  "label": "柳州市",
  "value": "4502" },

{
  "label": "桂林市",
  "value": "4503" },

{
  "label": "梧州市",
  "value": "4504" },

{
  "label": "北海市",
  "value": "4505" },

{
  "label": "防城港市",
  "value": "4506" },

{
  "label": "钦州市",
  "value": "4507" },

{
  "label": "贵港市",
  "value": "4508" },

{
  "label": "玉林市",
  "value": "4509" },

{
  "label": "百色市",
  "value": "4510" },

{
  "label": "贺州市",
  "value": "4511" },

{
  "label": "河池市",
  "value": "4512" },

{
  "label": "来宾市",
  "value": "4513" },

{
  "label": "崇左市",
  "value": "4514" }],


[{
  "label": "海口市",
  "value": "4601" },

{
  "label": "三亚市",
  "value": "4602" },

{
  "label": "三沙市",
  "value": "4603" },

{
  "label": "儋州市",
  "value": "4604" },

{
  "label": "省直辖县级行政区划",
  "value": "4690" }],


[{
  "label": "市辖区",
  "value": "5001" },

{
  "label": "县",
  "value": "5002" }],


[{
  "label": "成都市",
  "value": "5101" },

{
  "label": "自贡市",
  "value": "5103" },

{
  "label": "攀枝花市",
  "value": "5104" },

{
  "label": "泸州市",
  "value": "5105" },

{
  "label": "德阳市",
  "value": "5106" },

{
  "label": "绵阳市",
  "value": "5107" },

{
  "label": "广元市",
  "value": "5108" },

{
  "label": "遂宁市",
  "value": "5109" },

{
  "label": "内江市",
  "value": "5110" },

{
  "label": "乐山市",
  "value": "5111" },

{
  "label": "南充市",
  "value": "5113" },

{
  "label": "眉山市",
  "value": "5114" },

{
  "label": "宜宾市",
  "value": "5115" },

{
  "label": "广安市",
  "value": "5116" },

{
  "label": "达州市",
  "value": "5117" },

{
  "label": "雅安市",
  "value": "5118" },

{
  "label": "巴中市",
  "value": "5119" },

{
  "label": "资阳市",
  "value": "5120" },

{
  "label": "阿坝藏族羌族自治州",
  "value": "5132" },

{
  "label": "甘孜藏族自治州",
  "value": "5133" },

{
  "label": "凉山彝族自治州",
  "value": "5134" }],


[{
  "label": "贵阳市",
  "value": "5201" },

{
  "label": "六盘水市",
  "value": "5202" },

{
  "label": "遵义市",
  "value": "5203" },

{
  "label": "安顺市",
  "value": "5204" },

{
  "label": "毕节市",
  "value": "5205" },

{
  "label": "铜仁市",
  "value": "5206" },

{
  "label": "黔西南布依族苗族自治州",
  "value": "5223" },

{
  "label": "黔东南苗族侗族自治州",
  "value": "5226" },

{
  "label": "黔南布依族苗族自治州",
  "value": "5227" }],


[{
  "label": "昆明市",
  "value": "5301" },

{
  "label": "曲靖市",
  "value": "5303" },

{
  "label": "玉溪市",
  "value": "5304" },

{
  "label": "保山市",
  "value": "5305" },

{
  "label": "昭通市",
  "value": "5306" },

{
  "label": "丽江市",
  "value": "5307" },

{
  "label": "普洱市",
  "value": "5308" },

{
  "label": "临沧市",
  "value": "5309" },

{
  "label": "楚雄彝族自治州",
  "value": "5323" },

{
  "label": "红河哈尼族彝族自治州",
  "value": "5325" },

{
  "label": "文山壮族苗族自治州",
  "value": "5326" },

{
  "label": "西双版纳傣族自治州",
  "value": "5328" },

{
  "label": "大理白族自治州",
  "value": "5329" },

{
  "label": "德宏傣族景颇族自治州",
  "value": "5331" },

{
  "label": "怒江傈僳族自治州",
  "value": "5333" },

{
  "label": "迪庆藏族自治州",
  "value": "5334" }],


[{
  "label": "拉萨市",
  "value": "5401" },

{
  "label": "日喀则市",
  "value": "5402" },

{
  "label": "昌都市",
  "value": "5403" },

{
  "label": "林芝市",
  "value": "5404" },

{
  "label": "山南市",
  "value": "5405" },

{
  "label": "那曲地区",
  "value": "5424" },

{
  "label": "阿里地区",
  "value": "5425" }],


[{
  "label": "西安市",
  "value": "6101" },

{
  "label": "铜川市",
  "value": "6102" },

{
  "label": "宝鸡市",
  "value": "6103" },

{
  "label": "咸阳市",
  "value": "6104" },

{
  "label": "渭南市",
  "value": "6105" },

{
  "label": "延安市",
  "value": "6106" },

{
  "label": "汉中市",
  "value": "6107" },

{
  "label": "榆林市",
  "value": "6108" },

{
  "label": "安康市",
  "value": "6109" },

{
  "label": "商洛市",
  "value": "6110" }],


[{
  "label": "兰州市",
  "value": "6201" },

{
  "label": "嘉峪关市",
  "value": "6202" },

{
  "label": "金昌市",
  "value": "6203" },

{
  "label": "白银市",
  "value": "6204" },

{
  "label": "天水市",
  "value": "6205" },

{
  "label": "武威市",
  "value": "6206" },

{
  "label": "张掖市",
  "value": "6207" },

{
  "label": "平凉市",
  "value": "6208" },

{
  "label": "酒泉市",
  "value": "6209" },

{
  "label": "庆阳市",
  "value": "6210" },

{
  "label": "定西市",
  "value": "6211" },

{
  "label": "陇南市",
  "value": "6212" },

{
  "label": "临夏回族自治州",
  "value": "6229" },

{
  "label": "甘南藏族自治州",
  "value": "6230" }],


[{
  "label": "西宁市",
  "value": "6301" },

{
  "label": "海东市",
  "value": "6302" },

{
  "label": "海北藏族自治州",
  "value": "6322" },

{
  "label": "黄南藏族自治州",
  "value": "6323" },

{
  "label": "海南藏族自治州",
  "value": "6325" },

{
  "label": "果洛藏族自治州",
  "value": "6326" },

{
  "label": "玉树藏族自治州",
  "value": "6327" },

{
  "label": "海西蒙古族藏族自治州",
  "value": "6328" }],


[{
  "label": "银川市",
  "value": "6401" },

{
  "label": "石嘴山市",
  "value": "6402" },

{
  "label": "吴忠市",
  "value": "6403" },

{
  "label": "固原市",
  "value": "6404" },

{
  "label": "中卫市",
  "value": "6405" }],


[{
  "label": "乌鲁木齐市",
  "value": "6501" },

{
  "label": "克拉玛依市",
  "value": "6502" },

{
  "label": "吐鲁番市",
  "value": "6504" },

{
  "label": "哈密市",
  "value": "6505" },

{
  "label": "昌吉回族自治州",
  "value": "6523" },

{
  "label": "博尔塔拉蒙古自治州",
  "value": "6527" },

{
  "label": "巴音郭楞蒙古自治州",
  "value": "6528" },

{
  "label": "阿克苏地区",
  "value": "6529" },

{
  "label": "克孜勒苏柯尔克孜自治州",
  "value": "6530" },

{
  "label": "喀什地区",
  "value": "6531" },

{
  "label": "和田地区",
  "value": "6532" },

{
  "label": "伊犁哈萨克自治州",
  "value": "6540" },

{
  "label": "塔城地区",
  "value": "6542" },

{
  "label": "阿勒泰地区",
  "value": "6543" },

{
  "label": "自治区直辖县级行政区划",
  "value": "6590" }],


[{
  "label": "台北",
  "value": "6601" },

{
  "label": "高雄",
  "value": "6602" },

{
  "label": "基隆",
  "value": "6603" },

{
  "label": "台中",
  "value": "6604" },

{
  "label": "台南",
  "value": "6605" },

{
  "label": "新竹",
  "value": "6606" },

{
  "label": "嘉义",
  "value": "6607" },

{
  "label": "宜兰",
  "value": "6608" },

{
  "label": "桃园",
  "value": "6609" },

{
  "label": "苗栗",
  "value": "6610" },

{
  "label": "彰化",
  "value": "6611" },

{
  "label": "南投",
  "value": "6612" },

{
  "label": "云林",
  "value": "6613" },

{
  "label": "屏东",
  "value": "6614" },

{
  "label": "台东",
  "value": "6615" },

{
  "label": "花莲",
  "value": "6616" },

{
  "label": "澎湖",
  "value": "6617" }],


[{
  "label": "香港岛",
  "value": "6701" },

{
  "label": "九龙",
  "value": "6702" },

{
  "label": "新界",
  "value": "6703" }],


[{
  "label": "澳门半岛",
  "value": "6801" },

{
  "label": "氹仔岛",
  "value": "6802" },

{
  "label": "路环岛",
  "value": "6803" },

{
  "label": "路氹城",
  "value": "6804" }]];var _default =



cityData;exports.default = _default;

/***/ }),

/***/ 288:
/*!*****************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/components/city-picker/city-data/area.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var areaData = [
[
[{
  "label": "东城区",
  "value": "110101" },

{
  "label": "西城区",
  "value": "110102" },

{
  "label": "朝阳区",
  "value": "110105" },

{
  "label": "丰台区",
  "value": "110106" },

{
  "label": "石景山区",
  "value": "110107" },

{
  "label": "海淀区",
  "value": "110108" },

{
  "label": "门头沟区",
  "value": "110109" },

{
  "label": "房山区",
  "value": "110111" },

{
  "label": "通州区",
  "value": "110112" },

{
  "label": "顺义区",
  "value": "110113" },

{
  "label": "昌平区",
  "value": "110114" },

{
  "label": "大兴区",
  "value": "110115" },

{
  "label": "怀柔区",
  "value": "110116" },

{
  "label": "平谷区",
  "value": "110117" },

{
  "label": "密云区",
  "value": "110118" },

{
  "label": "延庆区",
  "value": "110119" }]],



[
[{
  "label": "和平区",
  "value": "120101" },

{
  "label": "河东区",
  "value": "120102" },

{
  "label": "河西区",
  "value": "120103" },

{
  "label": "南开区",
  "value": "120104" },

{
  "label": "河北区",
  "value": "120105" },

{
  "label": "红桥区",
  "value": "120106" },

{
  "label": "东丽区",
  "value": "120110" },

{
  "label": "西青区",
  "value": "120111" },

{
  "label": "津南区",
  "value": "120112" },

{
  "label": "北辰区",
  "value": "120113" },

{
  "label": "武清区",
  "value": "120114" },

{
  "label": "宝坻区",
  "value": "120115" },

{
  "label": "滨海新区",
  "value": "120116" },

{
  "label": "宁河区",
  "value": "120117" },

{
  "label": "静海区",
  "value": "120118" },

{
  "label": "蓟州区",
  "value": "120119" }]],



[
[{
  "label": "长安区",
  "value": "130102" },

{
  "label": "桥西区",
  "value": "130104" },

{
  "label": "新华区",
  "value": "130105" },

{
  "label": "井陉矿区",
  "value": "130107" },

{
  "label": "裕华区",
  "value": "130108" },

{
  "label": "藁城区",
  "value": "130109" },

{
  "label": "鹿泉区",
  "value": "130110" },

{
  "label": "栾城区",
  "value": "130111" },

{
  "label": "井陉县",
  "value": "130121" },

{
  "label": "正定县",
  "value": "130123" },

{
  "label": "行唐县",
  "value": "130125" },

{
  "label": "灵寿县",
  "value": "130126" },

{
  "label": "高邑县",
  "value": "130127" },

{
  "label": "深泽县",
  "value": "130128" },

{
  "label": "赞皇县",
  "value": "130129" },

{
  "label": "无极县",
  "value": "130130" },

{
  "label": "平山县",
  "value": "130131" },

{
  "label": "元氏县",
  "value": "130132" },

{
  "label": "赵县",
  "value": "130133" },

{
  "label": "石家庄高新技术产业开发区",
  "value": "130171" },

{
  "label": "石家庄循环化工园区",
  "value": "130172" },

{
  "label": "辛集市",
  "value": "130181" },

{
  "label": "晋州市",
  "value": "130183" },

{
  "label": "新乐市",
  "value": "130184" }],


[{
  "label": "路南区",
  "value": "130202" },

{
  "label": "路北区",
  "value": "130203" },

{
  "label": "古冶区",
  "value": "130204" },

{
  "label": "开平区",
  "value": "130205" },

{
  "label": "丰南区",
  "value": "130207" },

{
  "label": "丰润区",
  "value": "130208" },

{
  "label": "曹妃甸区",
  "value": "130209" },

{
  "label": "滦县",
  "value": "130223" },

{
  "label": "滦南县",
  "value": "130224" },

{
  "label": "乐亭县",
  "value": "130225" },

{
  "label": "迁西县",
  "value": "130227" },

{
  "label": "玉田县",
  "value": "130229" },

{
  "label": "唐山市芦台经济技术开发区",
  "value": "130271" },

{
  "label": "唐山市汉沽管理区",
  "value": "130272" },

{
  "label": "唐山高新技术产业开发区",
  "value": "130273" },

{
  "label": "河北唐山海港经济开发区",
  "value": "130274" },

{
  "label": "遵化市",
  "value": "130281" },

{
  "label": "迁安市",
  "value": "130283" }],


[{
  "label": "海港区",
  "value": "130302" },

{
  "label": "山海关区",
  "value": "130303" },

{
  "label": "北戴河区",
  "value": "130304" },

{
  "label": "抚宁区",
  "value": "130306" },

{
  "label": "青龙满族自治县",
  "value": "130321" },

{
  "label": "昌黎县",
  "value": "130322" },

{
  "label": "卢龙县",
  "value": "130324" },

{
  "label": "秦皇岛市经济技术开发区",
  "value": "130371" },

{
  "label": "北戴河新区",
  "value": "130372" }],


[{
  "label": "邯山区",
  "value": "130402" },

{
  "label": "丛台区",
  "value": "130403" },

{
  "label": "复兴区",
  "value": "130404" },

{
  "label": "峰峰矿区",
  "value": "130406" },

{
  "label": "肥乡区",
  "value": "130407" },

{
  "label": "永年区",
  "value": "130408" },

{
  "label": "临漳县",
  "value": "130423" },

{
  "label": "成安县",
  "value": "130424" },

{
  "label": "大名县",
  "value": "130425" },

{
  "label": "涉县",
  "value": "130426" },

{
  "label": "磁县",
  "value": "130427" },

{
  "label": "邱县",
  "value": "130430" },

{
  "label": "鸡泽县",
  "value": "130431" },

{
  "label": "广平县",
  "value": "130432" },

{
  "label": "馆陶县",
  "value": "130433" },

{
  "label": "魏县",
  "value": "130434" },

{
  "label": "曲周县",
  "value": "130435" },

{
  "label": "邯郸经济技术开发区",
  "value": "130471" },

{
  "label": "邯郸冀南新区",
  "value": "130473" },

{
  "label": "武安市",
  "value": "130481" }],


[{
  "label": "桥东区",
  "value": "130502" },

{
  "label": "桥西区",
  "value": "130503" },

{
  "label": "邢台县",
  "value": "130521" },

{
  "label": "临城县",
  "value": "130522" },

{
  "label": "内丘县",
  "value": "130523" },

{
  "label": "柏乡县",
  "value": "130524" },

{
  "label": "隆尧县",
  "value": "130525" },

{
  "label": "任县",
  "value": "130526" },

{
  "label": "南和县",
  "value": "130527" },

{
  "label": "宁晋县",
  "value": "130528" },

{
  "label": "巨鹿县",
  "value": "130529" },

{
  "label": "新河县",
  "value": "130530" },

{
  "label": "广宗县",
  "value": "130531" },

{
  "label": "平乡县",
  "value": "130532" },

{
  "label": "威县",
  "value": "130533" },

{
  "label": "清河县",
  "value": "130534" },

{
  "label": "临西县",
  "value": "130535" },

{
  "label": "河北邢台经济开发区",
  "value": "130571" },

{
  "label": "南宫市",
  "value": "130581" },

{
  "label": "沙河市",
  "value": "130582" }],


[{
  "label": "竞秀区",
  "value": "130602" },

{
  "label": "莲池区",
  "value": "130606" },

{
  "label": "满城区",
  "value": "130607" },

{
  "label": "清苑区",
  "value": "130608" },

{
  "label": "徐水区",
  "value": "130609" },

{
  "label": "涞水县",
  "value": "130623" },

{
  "label": "阜平县",
  "value": "130624" },

{
  "label": "定兴县",
  "value": "130626" },

{
  "label": "唐县",
  "value": "130627" },

{
  "label": "高阳县",
  "value": "130628" },

{
  "label": "容城县",
  "value": "130629" },

{
  "label": "涞源县",
  "value": "130630" },

{
  "label": "望都县",
  "value": "130631" },

{
  "label": "安新县",
  "value": "130632" },

{
  "label": "易县",
  "value": "130633" },

{
  "label": "曲阳县",
  "value": "130634" },

{
  "label": "蠡县",
  "value": "130635" },

{
  "label": "顺平县",
  "value": "130636" },

{
  "label": "博野县",
  "value": "130637" },

{
  "label": "雄县",
  "value": "130638" },

{
  "label": "保定高新技术产业开发区",
  "value": "130671" },

{
  "label": "保定白沟新城",
  "value": "130672" },

{
  "label": "涿州市",
  "value": "130681" },

{
  "label": "定州市",
  "value": "130682" },

{
  "label": "安国市",
  "value": "130683" },

{
  "label": "高碑店市",
  "value": "130684" }],


[{
  "label": "桥东区",
  "value": "130702" },

{
  "label": "桥西区",
  "value": "130703" },

{
  "label": "宣化区",
  "value": "130705" },

{
  "label": "下花园区",
  "value": "130706" },

{
  "label": "万全区",
  "value": "130708" },

{
  "label": "崇礼区",
  "value": "130709" },

{
  "label": "张北县",
  "value": "130722" },

{
  "label": "康保县",
  "value": "130723" },

{
  "label": "沽源县",
  "value": "130724" },

{
  "label": "尚义县",
  "value": "130725" },

{
  "label": "蔚县",
  "value": "130726" },

{
  "label": "阳原县",
  "value": "130727" },

{
  "label": "怀安县",
  "value": "130728" },

{
  "label": "怀来县",
  "value": "130730" },

{
  "label": "涿鹿县",
  "value": "130731" },

{
  "label": "赤城县",
  "value": "130732" },

{
  "label": "张家口市高新技术产业开发区",
  "value": "130771" },

{
  "label": "张家口市察北管理区",
  "value": "130772" },

{
  "label": "张家口市塞北管理区",
  "value": "130773" }],


[{
  "label": "双桥区",
  "value": "130802" },

{
  "label": "双滦区",
  "value": "130803" },

{
  "label": "鹰手营子矿区",
  "value": "130804" },

{
  "label": "承德县",
  "value": "130821" },

{
  "label": "兴隆县",
  "value": "130822" },

{
  "label": "滦平县",
  "value": "130824" },

{
  "label": "隆化县",
  "value": "130825" },

{
  "label": "丰宁满族自治县",
  "value": "130826" },

{
  "label": "宽城满族自治县",
  "value": "130827" },

{
  "label": "围场满族蒙古族自治县",
  "value": "130828" },

{
  "label": "承德高新技术产业开发区",
  "value": "130871" },

{
  "label": "平泉市",
  "value": "130881" }],


[{
  "label": "新华区",
  "value": "130902" },

{
  "label": "运河区",
  "value": "130903" },

{
  "label": "沧县",
  "value": "130921" },

{
  "label": "青县",
  "value": "130922" },

{
  "label": "东光县",
  "value": "130923" },

{
  "label": "海兴县",
  "value": "130924" },

{
  "label": "盐山县",
  "value": "130925" },

{
  "label": "肃宁县",
  "value": "130926" },

{
  "label": "南皮县",
  "value": "130927" },

{
  "label": "吴桥县",
  "value": "130928" },

{
  "label": "献县",
  "value": "130929" },

{
  "label": "孟村回族自治县",
  "value": "130930" },

{
  "label": "河北沧州经济开发区",
  "value": "130971" },

{
  "label": "沧州高新技术产业开发区",
  "value": "130972" },

{
  "label": "沧州渤海新区",
  "value": "130973" },

{
  "label": "泊头市",
  "value": "130981" },

{
  "label": "任丘市",
  "value": "130982" },

{
  "label": "黄骅市",
  "value": "130983" },

{
  "label": "河间市",
  "value": "130984" }],


[{
  "label": "安次区",
  "value": "131002" },

{
  "label": "广阳区",
  "value": "131003" },

{
  "label": "固安县",
  "value": "131022" },

{
  "label": "永清县",
  "value": "131023" },

{
  "label": "香河县",
  "value": "131024" },

{
  "label": "大城县",
  "value": "131025" },

{
  "label": "文安县",
  "value": "131026" },

{
  "label": "大厂回族自治县",
  "value": "131028" },

{
  "label": "廊坊经济技术开发区",
  "value": "131071" },

{
  "label": "霸州市",
  "value": "131081" },

{
  "label": "三河市",
  "value": "131082" }],


[{
  "label": "桃城区",
  "value": "131102" },

{
  "label": "冀州区",
  "value": "131103" },

{
  "label": "枣强县",
  "value": "131121" },

{
  "label": "武邑县",
  "value": "131122" },

{
  "label": "武强县",
  "value": "131123" },

{
  "label": "饶阳县",
  "value": "131124" },

{
  "label": "安平县",
  "value": "131125" },

{
  "label": "故城县",
  "value": "131126" },

{
  "label": "景县",
  "value": "131127" },

{
  "label": "阜城县",
  "value": "131128" },

{
  "label": "河北衡水经济开发区",
  "value": "131171" },

{
  "label": "衡水滨湖新区",
  "value": "131172" },

{
  "label": "深州市",
  "value": "131182" }]],



[
[{
  "label": "小店区",
  "value": "140105" },

{
  "label": "迎泽区",
  "value": "140106" },

{
  "label": "杏花岭区",
  "value": "140107" },

{
  "label": "尖草坪区",
  "value": "140108" },

{
  "label": "万柏林区",
  "value": "140109" },

{
  "label": "晋源区",
  "value": "140110" },

{
  "label": "清徐县",
  "value": "140121" },

{
  "label": "阳曲县",
  "value": "140122" },

{
  "label": "娄烦县",
  "value": "140123" },

{
  "label": "山西转型综合改革示范区",
  "value": "140171" },

{
  "label": "古交市",
  "value": "140181" }],


[{
  "label": "城区",
  "value": "140202" },

{
  "label": "矿区",
  "value": "140203" },

{
  "label": "南郊区",
  "value": "140211" },

{
  "label": "新荣区",
  "value": "140212" },

{
  "label": "阳高县",
  "value": "140221" },

{
  "label": "天镇县",
  "value": "140222" },

{
  "label": "广灵县",
  "value": "140223" },

{
  "label": "灵丘县",
  "value": "140224" },

{
  "label": "浑源县",
  "value": "140225" },

{
  "label": "左云县",
  "value": "140226" },

{
  "label": "大同县",
  "value": "140227" },

{
  "label": "山西大同经济开发区",
  "value": "140271" }],


[{
  "label": "城区",
  "value": "140302" },

{
  "label": "矿区",
  "value": "140303" },

{
  "label": "郊区",
  "value": "140311" },

{
  "label": "平定县",
  "value": "140321" },

{
  "label": "盂县",
  "value": "140322" },

{
  "label": "山西阳泉经济开发区",
  "value": "140371" }],


[{
  "label": "城区",
  "value": "140402" },

{
  "label": "郊区",
  "value": "140411" },

{
  "label": "长治县",
  "value": "140421" },

{
  "label": "襄垣县",
  "value": "140423" },

{
  "label": "屯留县",
  "value": "140424" },

{
  "label": "平顺县",
  "value": "140425" },

{
  "label": "黎城县",
  "value": "140426" },

{
  "label": "壶关县",
  "value": "140427" },

{
  "label": "长子县",
  "value": "140428" },

{
  "label": "武乡县",
  "value": "140429" },

{
  "label": "沁县",
  "value": "140430" },

{
  "label": "沁源县",
  "value": "140431" },

{
  "label": "山西长治高新技术产业园区",
  "value": "140471" },

{
  "label": "潞城市",
  "value": "140481" }],


[{
  "label": "城区",
  "value": "140502" },

{
  "label": "沁水县",
  "value": "140521" },

{
  "label": "阳城县",
  "value": "140522" },

{
  "label": "陵川县",
  "value": "140524" },

{
  "label": "泽州县",
  "value": "140525" },

{
  "label": "高平市",
  "value": "140581" }],


[{
  "label": "朔城区",
  "value": "140602" },

{
  "label": "平鲁区",
  "value": "140603" },

{
  "label": "山阴县",
  "value": "140621" },

{
  "label": "应县",
  "value": "140622" },

{
  "label": "右玉县",
  "value": "140623" },

{
  "label": "怀仁县",
  "value": "140624" },

{
  "label": "山西朔州经济开发区",
  "value": "140671" }],


[{
  "label": "榆次区",
  "value": "140702" },

{
  "label": "榆社县",
  "value": "140721" },

{
  "label": "左权县",
  "value": "140722" },

{
  "label": "和顺县",
  "value": "140723" },

{
  "label": "昔阳县",
  "value": "140724" },

{
  "label": "寿阳县",
  "value": "140725" },

{
  "label": "太谷县",
  "value": "140726" },

{
  "label": "祁县",
  "value": "140727" },

{
  "label": "平遥县",
  "value": "140728" },

{
  "label": "灵石县",
  "value": "140729" },

{
  "label": "介休市",
  "value": "140781" }],


[{
  "label": "盐湖区",
  "value": "140802" },

{
  "label": "临猗县",
  "value": "140821" },

{
  "label": "万荣县",
  "value": "140822" },

{
  "label": "闻喜县",
  "value": "140823" },

{
  "label": "稷山县",
  "value": "140824" },

{
  "label": "新绛县",
  "value": "140825" },

{
  "label": "绛县",
  "value": "140826" },

{
  "label": "垣曲县",
  "value": "140827" },

{
  "label": "夏县",
  "value": "140828" },

{
  "label": "平陆县",
  "value": "140829" },

{
  "label": "芮城县",
  "value": "140830" },

{
  "label": "永济市",
  "value": "140881" },

{
  "label": "河津市",
  "value": "140882" }],


[{
  "label": "忻府区",
  "value": "140902" },

{
  "label": "定襄县",
  "value": "140921" },

{
  "label": "五台县",
  "value": "140922" },

{
  "label": "代县",
  "value": "140923" },

{
  "label": "繁峙县",
  "value": "140924" },

{
  "label": "宁武县",
  "value": "140925" },

{
  "label": "静乐县",
  "value": "140926" },

{
  "label": "神池县",
  "value": "140927" },

{
  "label": "五寨县",
  "value": "140928" },

{
  "label": "岢岚县",
  "value": "140929" },

{
  "label": "河曲县",
  "value": "140930" },

{
  "label": "保德县",
  "value": "140931" },

{
  "label": "偏关县",
  "value": "140932" },

{
  "label": "五台山风景名胜区",
  "value": "140971" },

{
  "label": "原平市",
  "value": "140981" }],


[{
  "label": "尧都区",
  "value": "141002" },

{
  "label": "曲沃县",
  "value": "141021" },

{
  "label": "翼城县",
  "value": "141022" },

{
  "label": "襄汾县",
  "value": "141023" },

{
  "label": "洪洞县",
  "value": "141024" },

{
  "label": "古县",
  "value": "141025" },

{
  "label": "安泽县",
  "value": "141026" },

{
  "label": "浮山县",
  "value": "141027" },

{
  "label": "吉县",
  "value": "141028" },

{
  "label": "乡宁县",
  "value": "141029" },

{
  "label": "大宁县",
  "value": "141030" },

{
  "label": "隰县",
  "value": "141031" },

{
  "label": "永和县",
  "value": "141032" },

{
  "label": "蒲县",
  "value": "141033" },

{
  "label": "汾西县",
  "value": "141034" },

{
  "label": "侯马市",
  "value": "141081" },

{
  "label": "霍州市",
  "value": "141082" }],


[{
  "label": "离石区",
  "value": "141102" },

{
  "label": "文水县",
  "value": "141121" },

{
  "label": "交城县",
  "value": "141122" },

{
  "label": "兴县",
  "value": "141123" },

{
  "label": "临县",
  "value": "141124" },

{
  "label": "柳林县",
  "value": "141125" },

{
  "label": "石楼县",
  "value": "141126" },

{
  "label": "岚县",
  "value": "141127" },

{
  "label": "方山县",
  "value": "141128" },

{
  "label": "中阳县",
  "value": "141129" },

{
  "label": "交口县",
  "value": "141130" },

{
  "label": "孝义市",
  "value": "141181" },

{
  "label": "汾阳市",
  "value": "141182" }]],



[
[{
  "label": "新城区",
  "value": "150102" },

{
  "label": "回民区",
  "value": "150103" },

{
  "label": "玉泉区",
  "value": "150104" },

{
  "label": "赛罕区",
  "value": "150105" },

{
  "label": "土默特左旗",
  "value": "150121" },

{
  "label": "托克托县",
  "value": "150122" },

{
  "label": "和林格尔县",
  "value": "150123" },

{
  "label": "清水河县",
  "value": "150124" },

{
  "label": "武川县",
  "value": "150125" },

{
  "label": "呼和浩特金海工业园区",
  "value": "150171" },

{
  "label": "呼和浩特经济技术开发区",
  "value": "150172" }],


[{
  "label": "东河区",
  "value": "150202" },

{
  "label": "昆都仑区",
  "value": "150203" },

{
  "label": "青山区",
  "value": "150204" },

{
  "label": "石拐区",
  "value": "150205" },

{
  "label": "白云鄂博矿区",
  "value": "150206" },

{
  "label": "九原区",
  "value": "150207" },

{
  "label": "土默特右旗",
  "value": "150221" },

{
  "label": "固阳县",
  "value": "150222" },

{
  "label": "达尔罕茂明安联合旗",
  "value": "150223" },

{
  "label": "包头稀土高新技术产业开发区",
  "value": "150271" }],


[{
  "label": "海勃湾区",
  "value": "150302" },

{
  "label": "海南区",
  "value": "150303" },

{
  "label": "乌达区",
  "value": "150304" }],


[{
  "label": "红山区",
  "value": "150402" },

{
  "label": "元宝山区",
  "value": "150403" },

{
  "label": "松山区",
  "value": "150404" },

{
  "label": "阿鲁科尔沁旗",
  "value": "150421" },

{
  "label": "巴林左旗",
  "value": "150422" },

{
  "label": "巴林右旗",
  "value": "150423" },

{
  "label": "林西县",
  "value": "150424" },

{
  "label": "克什克腾旗",
  "value": "150425" },

{
  "label": "翁牛特旗",
  "value": "150426" },

{
  "label": "喀喇沁旗",
  "value": "150428" },

{
  "label": "宁城县",
  "value": "150429" },

{
  "label": "敖汉旗",
  "value": "150430" }],


[{
  "label": "科尔沁区",
  "value": "150502" },

{
  "label": "科尔沁左翼中旗",
  "value": "150521" },

{
  "label": "科尔沁左翼后旗",
  "value": "150522" },

{
  "label": "开鲁县",
  "value": "150523" },

{
  "label": "库伦旗",
  "value": "150524" },

{
  "label": "奈曼旗",
  "value": "150525" },

{
  "label": "扎鲁特旗",
  "value": "150526" },

{
  "label": "通辽经济技术开发区",
  "value": "150571" },

{
  "label": "霍林郭勒市",
  "value": "150581" }],


[{
  "label": "东胜区",
  "value": "150602" },

{
  "label": "康巴什区",
  "value": "150603" },

{
  "label": "达拉特旗",
  "value": "150621" },

{
  "label": "准格尔旗",
  "value": "150622" },

{
  "label": "鄂托克前旗",
  "value": "150623" },

{
  "label": "鄂托克旗",
  "value": "150624" },

{
  "label": "杭锦旗",
  "value": "150625" },

{
  "label": "乌审旗",
  "value": "150626" },

{
  "label": "伊金霍洛旗",
  "value": "150627" }],


[{
  "label": "海拉尔区",
  "value": "150702" },

{
  "label": "扎赉诺尔区",
  "value": "150703" },

{
  "label": "阿荣旗",
  "value": "150721" },

{
  "label": "莫力达瓦达斡尔族自治旗",
  "value": "150722" },

{
  "label": "鄂伦春自治旗",
  "value": "150723" },

{
  "label": "鄂温克族自治旗",
  "value": "150724" },

{
  "label": "陈巴尔虎旗",
  "value": "150725" },

{
  "label": "新巴尔虎左旗",
  "value": "150726" },

{
  "label": "新巴尔虎右旗",
  "value": "150727" },

{
  "label": "满洲里市",
  "value": "150781" },

{
  "label": "牙克石市",
  "value": "150782" },

{
  "label": "扎兰屯市",
  "value": "150783" },

{
  "label": "额尔古纳市",
  "value": "150784" },

{
  "label": "根河市",
  "value": "150785" }],


[{
  "label": "临河区",
  "value": "150802" },

{
  "label": "五原县",
  "value": "150821" },

{
  "label": "磴口县",
  "value": "150822" },

{
  "label": "乌拉特前旗",
  "value": "150823" },

{
  "label": "乌拉特中旗",
  "value": "150824" },

{
  "label": "乌拉特后旗",
  "value": "150825" },

{
  "label": "杭锦后旗",
  "value": "150826" }],


[{
  "label": "集宁区",
  "value": "150902" },

{
  "label": "卓资县",
  "value": "150921" },

{
  "label": "化德县",
  "value": "150922" },

{
  "label": "商都县",
  "value": "150923" },

{
  "label": "兴和县",
  "value": "150924" },

{
  "label": "凉城县",
  "value": "150925" },

{
  "label": "察哈尔右翼前旗",
  "value": "150926" },

{
  "label": "察哈尔右翼中旗",
  "value": "150927" },

{
  "label": "察哈尔右翼后旗",
  "value": "150928" },

{
  "label": "四子王旗",
  "value": "150929" },

{
  "label": "丰镇市",
  "value": "150981" }],


[{
  "label": "乌兰浩特市",
  "value": "152201" },

{
  "label": "阿尔山市",
  "value": "152202" },

{
  "label": "科尔沁右翼前旗",
  "value": "152221" },

{
  "label": "科尔沁右翼中旗",
  "value": "152222" },

{
  "label": "扎赉特旗",
  "value": "152223" },

{
  "label": "突泉县",
  "value": "152224" }],


[{
  "label": "二连浩特市",
  "value": "152501" },

{
  "label": "锡林浩特市",
  "value": "152502" },

{
  "label": "阿巴嘎旗",
  "value": "152522" },

{
  "label": "苏尼特左旗",
  "value": "152523" },

{
  "label": "苏尼特右旗",
  "value": "152524" },

{
  "label": "东乌珠穆沁旗",
  "value": "152525" },

{
  "label": "西乌珠穆沁旗",
  "value": "152526" },

{
  "label": "太仆寺旗",
  "value": "152527" },

{
  "label": "镶黄旗",
  "value": "152528" },

{
  "label": "正镶白旗",
  "value": "152529" },

{
  "label": "正蓝旗",
  "value": "152530" },

{
  "label": "多伦县",
  "value": "152531" },

{
  "label": "乌拉盖管委会",
  "value": "152571" }],


[{
  "label": "阿拉善左旗",
  "value": "152921" },

{
  "label": "阿拉善右旗",
  "value": "152922" },

{
  "label": "额济纳旗",
  "value": "152923" },

{
  "label": "内蒙古阿拉善经济开发区",
  "value": "152971" }]],



[
[{
  "label": "和平区",
  "value": "210102" },

{
  "label": "沈河区",
  "value": "210103" },

{
  "label": "大东区",
  "value": "210104" },

{
  "label": "皇姑区",
  "value": "210105" },

{
  "label": "铁西区",
  "value": "210106" },

{
  "label": "苏家屯区",
  "value": "210111" },

{
  "label": "浑南区",
  "value": "210112" },

{
  "label": "沈北新区",
  "value": "210113" },

{
  "label": "于洪区",
  "value": "210114" },

{
  "label": "辽中区",
  "value": "210115" },

{
  "label": "康平县",
  "value": "210123" },

{
  "label": "法库县",
  "value": "210124" },

{
  "label": "新民市",
  "value": "210181" }],


[{
  "label": "中山区",
  "value": "210202" },

{
  "label": "西岗区",
  "value": "210203" },

{
  "label": "沙河口区",
  "value": "210204" },

{
  "label": "甘井子区",
  "value": "210211" },

{
  "label": "旅顺口区",
  "value": "210212" },

{
  "label": "金州区",
  "value": "210213" },

{
  "label": "普兰店区",
  "value": "210214" },

{
  "label": "长海县",
  "value": "210224" },

{
  "label": "瓦房店市",
  "value": "210281" },

{
  "label": "庄河市",
  "value": "210283" }],


[{
  "label": "铁东区",
  "value": "210302" },

{
  "label": "铁西区",
  "value": "210303" },

{
  "label": "立山区",
  "value": "210304" },

{
  "label": "千山区",
  "value": "210311" },

{
  "label": "台安县",
  "value": "210321" },

{
  "label": "岫岩满族自治县",
  "value": "210323" },

{
  "label": "海城市",
  "value": "210381" }],


[{
  "label": "新抚区",
  "value": "210402" },

{
  "label": "东洲区",
  "value": "210403" },

{
  "label": "望花区",
  "value": "210404" },

{
  "label": "顺城区",
  "value": "210411" },

{
  "label": "抚顺县",
  "value": "210421" },

{
  "label": "新宾满族自治县",
  "value": "210422" },

{
  "label": "清原满族自治县",
  "value": "210423" }],


[{
  "label": "平山区",
  "value": "210502" },

{
  "label": "溪湖区",
  "value": "210503" },

{
  "label": "明山区",
  "value": "210504" },

{
  "label": "南芬区",
  "value": "210505" },

{
  "label": "本溪满族自治县",
  "value": "210521" },

{
  "label": "桓仁满族自治县",
  "value": "210522" }],


[{
  "label": "元宝区",
  "value": "210602" },

{
  "label": "振兴区",
  "value": "210603" },

{
  "label": "振安区",
  "value": "210604" },

{
  "label": "宽甸满族自治县",
  "value": "210624" },

{
  "label": "东港市",
  "value": "210681" },

{
  "label": "凤城市",
  "value": "210682" }],


[{
  "label": "古塔区",
  "value": "210702" },

{
  "label": "凌河区",
  "value": "210703" },

{
  "label": "太和区",
  "value": "210711" },

{
  "label": "黑山县",
  "value": "210726" },

{
  "label": "义县",
  "value": "210727" },

{
  "label": "凌海市",
  "value": "210781" },

{
  "label": "北镇市",
  "value": "210782" }],


[{
  "label": "站前区",
  "value": "210802" },

{
  "label": "西市区",
  "value": "210803" },

{
  "label": "鲅鱼圈区",
  "value": "210804" },

{
  "label": "老边区",
  "value": "210811" },

{
  "label": "盖州市",
  "value": "210881" },

{
  "label": "大石桥市",
  "value": "210882" }],


[{
  "label": "海州区",
  "value": "210902" },

{
  "label": "新邱区",
  "value": "210903" },

{
  "label": "太平区",
  "value": "210904" },

{
  "label": "清河门区",
  "value": "210905" },

{
  "label": "细河区",
  "value": "210911" },

{
  "label": "阜新蒙古族自治县",
  "value": "210921" },

{
  "label": "彰武县",
  "value": "210922" }],


[{
  "label": "白塔区",
  "value": "211002" },

{
  "label": "文圣区",
  "value": "211003" },

{
  "label": "宏伟区",
  "value": "211004" },

{
  "label": "弓长岭区",
  "value": "211005" },

{
  "label": "太子河区",
  "value": "211011" },

{
  "label": "辽阳县",
  "value": "211021" },

{
  "label": "灯塔市",
  "value": "211081" }],


[{
  "label": "双台子区",
  "value": "211102" },

{
  "label": "兴隆台区",
  "value": "211103" },

{
  "label": "大洼区",
  "value": "211104" },

{
  "label": "盘山县",
  "value": "211122" }],


[{
  "label": "银州区",
  "value": "211202" },

{
  "label": "清河区",
  "value": "211204" },

{
  "label": "铁岭县",
  "value": "211221" },

{
  "label": "西丰县",
  "value": "211223" },

{
  "label": "昌图县",
  "value": "211224" },

{
  "label": "调兵山市",
  "value": "211281" },

{
  "label": "开原市",
  "value": "211282" }],


[{
  "label": "双塔区",
  "value": "211302" },

{
  "label": "龙城区",
  "value": "211303" },

{
  "label": "朝阳县",
  "value": "211321" },

{
  "label": "建平县",
  "value": "211322" },

{
  "label": "喀喇沁左翼蒙古族自治县",
  "value": "211324" },

{
  "label": "北票市",
  "value": "211381" },

{
  "label": "凌源市",
  "value": "211382" }],


[{
  "label": "连山区",
  "value": "211402" },

{
  "label": "龙港区",
  "value": "211403" },

{
  "label": "南票区",
  "value": "211404" },

{
  "label": "绥中县",
  "value": "211421" },

{
  "label": "建昌县",
  "value": "211422" },

{
  "label": "兴城市",
  "value": "211481" }]],



[
[{
  "label": "南关区",
  "value": "220102" },

{
  "label": "宽城区",
  "value": "220103" },

{
  "label": "朝阳区",
  "value": "220104" },

{
  "label": "二道区",
  "value": "220105" },

{
  "label": "绿园区",
  "value": "220106" },

{
  "label": "双阳区",
  "value": "220112" },

{
  "label": "九台区",
  "value": "220113" },

{
  "label": "农安县",
  "value": "220122" },

{
  "label": "长春经济技术开发区",
  "value": "220171" },

{
  "label": "长春净月高新技术产业开发区",
  "value": "220172" },

{
  "label": "长春高新技术产业开发区",
  "value": "220173" },

{
  "label": "长春汽车经济技术开发区",
  "value": "220174" },

{
  "label": "榆树市",
  "value": "220182" },

{
  "label": "德惠市",
  "value": "220183" }],


[{
  "label": "昌邑区",
  "value": "220202" },

{
  "label": "龙潭区",
  "value": "220203" },

{
  "label": "船营区",
  "value": "220204" },

{
  "label": "丰满区",
  "value": "220211" },

{
  "label": "永吉县",
  "value": "220221" },

{
  "label": "吉林经济开发区",
  "value": "220271" },

{
  "label": "吉林高新技术产业开发区",
  "value": "220272" },

{
  "label": "吉林中国新加坡食品区",
  "value": "220273" },

{
  "label": "蛟河市",
  "value": "220281" },

{
  "label": "桦甸市",
  "value": "220282" },

{
  "label": "舒兰市",
  "value": "220283" },

{
  "label": "磐石市",
  "value": "220284" }],


[{
  "label": "铁西区",
  "value": "220302" },

{
  "label": "铁东区",
  "value": "220303" },

{
  "label": "梨树县",
  "value": "220322" },

{
  "label": "伊通满族自治县",
  "value": "220323" },

{
  "label": "公主岭市",
  "value": "220381" },

{
  "label": "双辽市",
  "value": "220382" }],


[{
  "label": "龙山区",
  "value": "220402" },

{
  "label": "西安区",
  "value": "220403" },

{
  "label": "东丰县",
  "value": "220421" },

{
  "label": "东辽县",
  "value": "220422" }],


[{
  "label": "东昌区",
  "value": "220502" },

{
  "label": "二道江区",
  "value": "220503" },

{
  "label": "通化县",
  "value": "220521" },

{
  "label": "辉南县",
  "value": "220523" },

{
  "label": "柳河县",
  "value": "220524" },

{
  "label": "梅河口市",
  "value": "220581" },

{
  "label": "集安市",
  "value": "220582" }],


[{
  "label": "浑江区",
  "value": "220602" },

{
  "label": "江源区",
  "value": "220605" },

{
  "label": "抚松县",
  "value": "220621" },

{
  "label": "靖宇县",
  "value": "220622" },

{
  "label": "长白朝鲜族自治县",
  "value": "220623" },

{
  "label": "临江市",
  "value": "220681" }],


[{
  "label": "宁江区",
  "value": "220702" },

{
  "label": "前郭尔罗斯蒙古族自治县",
  "value": "220721" },

{
  "label": "长岭县",
  "value": "220722" },

{
  "label": "乾安县",
  "value": "220723" },

{
  "label": "吉林松原经济开发区",
  "value": "220771" },

{
  "label": "扶余市",
  "value": "220781" }],


[{
  "label": "洮北区",
  "value": "220802" },

{
  "label": "镇赉县",
  "value": "220821" },

{
  "label": "通榆县",
  "value": "220822" },

{
  "label": "吉林白城经济开发区",
  "value": "220871" },

{
  "label": "洮南市",
  "value": "220881" },

{
  "label": "大安市",
  "value": "220882" }],


[{
  "label": "延吉市",
  "value": "222401" },

{
  "label": "图们市",
  "value": "222402" },

{
  "label": "敦化市",
  "value": "222403" },

{
  "label": "珲春市",
  "value": "222404" },

{
  "label": "龙井市",
  "value": "222405" },

{
  "label": "和龙市",
  "value": "222406" },

{
  "label": "汪清县",
  "value": "222424" },

{
  "label": "安图县",
  "value": "222426" }]],



[
[{
  "label": "道里区",
  "value": "230102" },

{
  "label": "南岗区",
  "value": "230103" },

{
  "label": "道外区",
  "value": "230104" },

{
  "label": "平房区",
  "value": "230108" },

{
  "label": "松北区",
  "value": "230109" },

{
  "label": "香坊区",
  "value": "230110" },

{
  "label": "呼兰区",
  "value": "230111" },

{
  "label": "阿城区",
  "value": "230112" },

{
  "label": "双城区",
  "value": "230113" },

{
  "label": "依兰县",
  "value": "230123" },

{
  "label": "方正县",
  "value": "230124" },

{
  "label": "宾县",
  "value": "230125" },

{
  "label": "巴彦县",
  "value": "230126" },

{
  "label": "木兰县",
  "value": "230127" },

{
  "label": "通河县",
  "value": "230128" },

{
  "label": "延寿县",
  "value": "230129" },

{
  "label": "尚志市",
  "value": "230183" },

{
  "label": "五常市",
  "value": "230184" }],


[{
  "label": "龙沙区",
  "value": "230202" },

{
  "label": "建华区",
  "value": "230203" },

{
  "label": "铁锋区",
  "value": "230204" },

{
  "label": "昂昂溪区",
  "value": "230205" },

{
  "label": "富拉尔基区",
  "value": "230206" },

{
  "label": "碾子山区",
  "value": "230207" },

{
  "label": "梅里斯达斡尔族区",
  "value": "230208" },

{
  "label": "龙江县",
  "value": "230221" },

{
  "label": "依安县",
  "value": "230223" },

{
  "label": "泰来县",
  "value": "230224" },

{
  "label": "甘南县",
  "value": "230225" },

{
  "label": "富裕县",
  "value": "230227" },

{
  "label": "克山县",
  "value": "230229" },

{
  "label": "克东县",
  "value": "230230" },

{
  "label": "拜泉县",
  "value": "230231" },

{
  "label": "讷河市",
  "value": "230281" }],


[{
  "label": "鸡冠区",
  "value": "230302" },

{
  "label": "恒山区",
  "value": "230303" },

{
  "label": "滴道区",
  "value": "230304" },

{
  "label": "梨树区",
  "value": "230305" },

{
  "label": "城子河区",
  "value": "230306" },

{
  "label": "麻山区",
  "value": "230307" },

{
  "label": "鸡东县",
  "value": "230321" },

{
  "label": "虎林市",
  "value": "230381" },

{
  "label": "密山市",
  "value": "230382" }],


[{
  "label": "向阳区",
  "value": "230402" },

{
  "label": "工农区",
  "value": "230403" },

{
  "label": "南山区",
  "value": "230404" },

{
  "label": "兴安区",
  "value": "230405" },

{
  "label": "东山区",
  "value": "230406" },

{
  "label": "兴山区",
  "value": "230407" },

{
  "label": "萝北县",
  "value": "230421" },

{
  "label": "绥滨县",
  "value": "230422" }],


[{
  "label": "尖山区",
  "value": "230502" },

{
  "label": "岭东区",
  "value": "230503" },

{
  "label": "四方台区",
  "value": "230505" },

{
  "label": "宝山区",
  "value": "230506" },

{
  "label": "集贤县",
  "value": "230521" },

{
  "label": "友谊县",
  "value": "230522" },

{
  "label": "宝清县",
  "value": "230523" },

{
  "label": "饶河县",
  "value": "230524" }],


[{
  "label": "萨尔图区",
  "value": "230602" },

{
  "label": "龙凤区",
  "value": "230603" },

{
  "label": "让胡路区",
  "value": "230604" },

{
  "label": "红岗区",
  "value": "230605" },

{
  "label": "大同区",
  "value": "230606" },

{
  "label": "肇州县",
  "value": "230621" },

{
  "label": "肇源县",
  "value": "230622" },

{
  "label": "林甸县",
  "value": "230623" },

{
  "label": "杜尔伯特蒙古族自治县",
  "value": "230624" },

{
  "label": "大庆高新技术产业开发区",
  "value": "230671" }],


[{
  "label": "伊春区",
  "value": "230702" },

{
  "label": "南岔区",
  "value": "230703" },

{
  "label": "友好区",
  "value": "230704" },

{
  "label": "西林区",
  "value": "230705" },

{
  "label": "翠峦区",
  "value": "230706" },

{
  "label": "新青区",
  "value": "230707" },

{
  "label": "美溪区",
  "value": "230708" },

{
  "label": "金山屯区",
  "value": "230709" },

{
  "label": "五营区",
  "value": "230710" },

{
  "label": "乌马河区",
  "value": "230711" },

{
  "label": "汤旺河区",
  "value": "230712" },

{
  "label": "带岭区",
  "value": "230713" },

{
  "label": "乌伊岭区",
  "value": "230714" },

{
  "label": "红星区",
  "value": "230715" },

{
  "label": "上甘岭区",
  "value": "230716" },

{
  "label": "嘉荫县",
  "value": "230722" },

{
  "label": "铁力市",
  "value": "230781" }],


[{
  "label": "向阳区",
  "value": "230803" },

{
  "label": "前进区",
  "value": "230804" },

{
  "label": "东风区",
  "value": "230805" },

{
  "label": "郊区",
  "value": "230811" },

{
  "label": "桦南县",
  "value": "230822" },

{
  "label": "桦川县",
  "value": "230826" },

{
  "label": "汤原县",
  "value": "230828" },

{
  "label": "同江市",
  "value": "230881" },

{
  "label": "富锦市",
  "value": "230882" },

{
  "label": "抚远市",
  "value": "230883" }],


[{
  "label": "新兴区",
  "value": "230902" },

{
  "label": "桃山区",
  "value": "230903" },

{
  "label": "茄子河区",
  "value": "230904" },

{
  "label": "勃利县",
  "value": "230921" }],


[{
  "label": "东安区",
  "value": "231002" },

{
  "label": "阳明区",
  "value": "231003" },

{
  "label": "爱民区",
  "value": "231004" },

{
  "label": "西安区",
  "value": "231005" },

{
  "label": "林口县",
  "value": "231025" },

{
  "label": "牡丹江经济技术开发区",
  "value": "231071" },

{
  "label": "绥芬河市",
  "value": "231081" },

{
  "label": "海林市",
  "value": "231083" },

{
  "label": "宁安市",
  "value": "231084" },

{
  "label": "穆棱市",
  "value": "231085" },

{
  "label": "东宁市",
  "value": "231086" }],


[{
  "label": "爱辉区",
  "value": "231102" },

{
  "label": "嫩江县",
  "value": "231121" },

{
  "label": "逊克县",
  "value": "231123" },

{
  "label": "孙吴县",
  "value": "231124" },

{
  "label": "北安市",
  "value": "231181" },

{
  "label": "五大连池市",
  "value": "231182" }],


[{
  "label": "北林区",
  "value": "231202" },

{
  "label": "望奎县",
  "value": "231221" },

{
  "label": "兰西县",
  "value": "231222" },

{
  "label": "青冈县",
  "value": "231223" },

{
  "label": "庆安县",
  "value": "231224" },

{
  "label": "明水县",
  "value": "231225" },

{
  "label": "绥棱县",
  "value": "231226" },

{
  "label": "安达市",
  "value": "231281" },

{
  "label": "肇东市",
  "value": "231282" },

{
  "label": "海伦市",
  "value": "231283" }],


[{
  "label": "加格达奇区",
  "value": "232701" },

{
  "label": "松岭区",
  "value": "232702" },

{
  "label": "新林区",
  "value": "232703" },

{
  "label": "呼中区",
  "value": "232704" },

{
  "label": "呼玛县",
  "value": "232721" },

{
  "label": "塔河县",
  "value": "232722" },

{
  "label": "漠河县",
  "value": "232723" }]],



[
[{
  "label": "黄浦区",
  "value": "310101" },

{
  "label": "徐汇区",
  "value": "310104" },

{
  "label": "长宁区",
  "value": "310105" },

{
  "label": "静安区",
  "value": "310106" },

{
  "label": "普陀区",
  "value": "310107" },

{
  "label": "虹口区",
  "value": "310109" },

{
  "label": "杨浦区",
  "value": "310110" },

{
  "label": "闵行区",
  "value": "310112" },

{
  "label": "宝山区",
  "value": "310113" },

{
  "label": "嘉定区",
  "value": "310114" },

{
  "label": "浦东新区",
  "value": "310115" },

{
  "label": "金山区",
  "value": "310116" },

{
  "label": "松江区",
  "value": "310117" },

{
  "label": "青浦区",
  "value": "310118" },

{
  "label": "奉贤区",
  "value": "310120" },

{
  "label": "崇明区",
  "value": "310151" }]],



[
[{
  "label": "玄武区",
  "value": "320102" },

{
  "label": "秦淮区",
  "value": "320104" },

{
  "label": "建邺区",
  "value": "320105" },

{
  "label": "鼓楼区",
  "value": "320106" },

{
  "label": "浦口区",
  "value": "320111" },

{
  "label": "栖霞区",
  "value": "320113" },

{
  "label": "雨花台区",
  "value": "320114" },

{
  "label": "江宁区",
  "value": "320115" },

{
  "label": "六合区",
  "value": "320116" },

{
  "label": "溧水区",
  "value": "320117" },

{
  "label": "高淳区",
  "value": "320118" }],


[{
  "label": "锡山区",
  "value": "320205" },

{
  "label": "惠山区",
  "value": "320206" },

{
  "label": "滨湖区",
  "value": "320211" },

{
  "label": "梁溪区",
  "value": "320213" },

{
  "label": "新吴区",
  "value": "320214" },

{
  "label": "江阴市",
  "value": "320281" },

{
  "label": "宜兴市",
  "value": "320282" }],


[{
  "label": "鼓楼区",
  "value": "320302" },

{
  "label": "云龙区",
  "value": "320303" },

{
  "label": "贾汪区",
  "value": "320305" },

{
  "label": "泉山区",
  "value": "320311" },

{
  "label": "铜山区",
  "value": "320312" },

{
  "label": "丰县",
  "value": "320321" },

{
  "label": "沛县",
  "value": "320322" },

{
  "label": "睢宁县",
  "value": "320324" },

{
  "label": "徐州经济技术开发区",
  "value": "320371" },

{
  "label": "新沂市",
  "value": "320381" },

{
  "label": "邳州市",
  "value": "320382" }],


[{
  "label": "天宁区",
  "value": "320402" },

{
  "label": "钟楼区",
  "value": "320404" },

{
  "label": "新北区",
  "value": "320411" },

{
  "label": "武进区",
  "value": "320412" },

{
  "label": "金坛区",
  "value": "320413" },

{
  "label": "溧阳市",
  "value": "320481" }],


[{
  "label": "虎丘区",
  "value": "320505" },

{
  "label": "吴中区",
  "value": "320506" },

{
  "label": "相城区",
  "value": "320507" },

{
  "label": "姑苏区",
  "value": "320508" },

{
  "label": "吴江区",
  "value": "320509" },

{
  "label": "苏州工业园区",
  "value": "320571" },

{
  "label": "常熟市",
  "value": "320581" },

{
  "label": "张家港市",
  "value": "320582" },

{
  "label": "昆山市",
  "value": "320583" },

{
  "label": "太仓市",
  "value": "320585" }],


[{
  "label": "崇川区",
  "value": "320602" },

{
  "label": "港闸区",
  "value": "320611" },

{
  "label": "通州区",
  "value": "320612" },

{
  "label": "海安县",
  "value": "320621" },

{
  "label": "如东县",
  "value": "320623" },

{
  "label": "南通经济技术开发区",
  "value": "320671" },

{
  "label": "启东市",
  "value": "320681" },

{
  "label": "如皋市",
  "value": "320682" },

{
  "label": "海门市",
  "value": "320684" }],


[{
  "label": "连云区",
  "value": "320703" },

{
  "label": "海州区",
  "value": "320706" },

{
  "label": "赣榆区",
  "value": "320707" },

{
  "label": "东海县",
  "value": "320722" },

{
  "label": "灌云县",
  "value": "320723" },

{
  "label": "灌南县",
  "value": "320724" },

{
  "label": "连云港经济技术开发区",
  "value": "320771" },

{
  "label": "连云港高新技术产业开发区",
  "value": "320772" }],


[{
  "label": "淮安区",
  "value": "320803" },

{
  "label": "淮阴区",
  "value": "320804" },

{
  "label": "清江浦区",
  "value": "320812" },

{
  "label": "洪泽区",
  "value": "320813" },

{
  "label": "涟水县",
  "value": "320826" },

{
  "label": "盱眙县",
  "value": "320830" },

{
  "label": "金湖县",
  "value": "320831" },

{
  "label": "淮安经济技术开发区",
  "value": "320871" }],


[{
  "label": "亭湖区",
  "value": "320902" },

{
  "label": "盐都区",
  "value": "320903" },

{
  "label": "大丰区",
  "value": "320904" },

{
  "label": "响水县",
  "value": "320921" },

{
  "label": "滨海县",
  "value": "320922" },

{
  "label": "阜宁县",
  "value": "320923" },

{
  "label": "射阳县",
  "value": "320924" },

{
  "label": "建湖县",
  "value": "320925" },

{
  "label": "盐城经济技术开发区",
  "value": "320971" },

{
  "label": "东台市",
  "value": "320981" }],


[{
  "label": "广陵区",
  "value": "321002" },

{
  "label": "邗江区",
  "value": "321003" },

{
  "label": "江都区",
  "value": "321012" },

{
  "label": "宝应县",
  "value": "321023" },

{
  "label": "扬州经济技术开发区",
  "value": "321071" },

{
  "label": "仪征市",
  "value": "321081" },

{
  "label": "高邮市",
  "value": "321084" }],


[{
  "label": "京口区",
  "value": "321102" },

{
  "label": "润州区",
  "value": "321111" },

{
  "label": "丹徒区",
  "value": "321112" },

{
  "label": "镇江新区",
  "value": "321171" },

{
  "label": "丹阳市",
  "value": "321181" },

{
  "label": "扬中市",
  "value": "321182" },

{
  "label": "句容市",
  "value": "321183" }],


[{
  "label": "海陵区",
  "value": "321202" },

{
  "label": "高港区",
  "value": "321203" },

{
  "label": "姜堰区",
  "value": "321204" },

{
  "label": "泰州医药高新技术产业开发区",
  "value": "321271" },

{
  "label": "兴化市",
  "value": "321281" },

{
  "label": "靖江市",
  "value": "321282" },

{
  "label": "泰兴市",
  "value": "321283" }],


[{
  "label": "宿城区",
  "value": "321302" },

{
  "label": "宿豫区",
  "value": "321311" },

{
  "label": "沭阳县",
  "value": "321322" },

{
  "label": "泗阳县",
  "value": "321323" },

{
  "label": "泗洪县",
  "value": "321324" },

{
  "label": "宿迁经济技术开发区",
  "value": "321371" }]],



[
[{
  "label": "上城区",
  "value": "330102" },

{
  "label": "下城区",
  "value": "330103" },

{
  "label": "江干区",
  "value": "330104" },

{
  "label": "拱墅区",
  "value": "330105" },

{
  "label": "西湖区",
  "value": "330106" },

{
  "label": "滨江区",
  "value": "330108" },

{
  "label": "萧山区",
  "value": "330109" },

{
  "label": "余杭区",
  "value": "330110" },

{
  "label": "富阳区",
  "value": "330111" },

{
  "label": "临安区",
  "value": "330112" },

{
  "label": "桐庐县",
  "value": "330122" },

{
  "label": "淳安县",
  "value": "330127" },

{
  "label": "建德市",
  "value": "330182" }],


[{
  "label": "海曙区",
  "value": "330203" },

{
  "label": "江北区",
  "value": "330205" },

{
  "label": "北仑区",
  "value": "330206" },

{
  "label": "镇海区",
  "value": "330211" },

{
  "label": "鄞州区",
  "value": "330212" },

{
  "label": "奉化区",
  "value": "330213" },

{
  "label": "象山县",
  "value": "330225" },

{
  "label": "宁海县",
  "value": "330226" },

{
  "label": "余姚市",
  "value": "330281" },

{
  "label": "慈溪市",
  "value": "330282" }],


[{
  "label": "鹿城区",
  "value": "330302" },

{
  "label": "龙湾区",
  "value": "330303" },

{
  "label": "瓯海区",
  "value": "330304" },

{
  "label": "洞头区",
  "value": "330305" },

{
  "label": "永嘉县",
  "value": "330324" },

{
  "label": "平阳县",
  "value": "330326" },

{
  "label": "苍南县",
  "value": "330327" },

{
  "label": "文成县",
  "value": "330328" },

{
  "label": "泰顺县",
  "value": "330329" },

{
  "label": "温州经济技术开发区",
  "value": "330371" },

{
  "label": "瑞安市",
  "value": "330381" },

{
  "label": "乐清市",
  "value": "330382" }],


[{
  "label": "南湖区",
  "value": "330402" },

{
  "label": "秀洲区",
  "value": "330411" },

{
  "label": "嘉善县",
  "value": "330421" },

{
  "label": "海盐县",
  "value": "330424" },

{
  "label": "海宁市",
  "value": "330481" },

{
  "label": "平湖市",
  "value": "330482" },

{
  "label": "桐乡市",
  "value": "330483" }],


[{
  "label": "吴兴区",
  "value": "330502" },

{
  "label": "南浔区",
  "value": "330503" },

{
  "label": "德清县",
  "value": "330521" },

{
  "label": "长兴县",
  "value": "330522" },

{
  "label": "安吉县",
  "value": "330523" }],


[{
  "label": "越城区",
  "value": "330602" },

{
  "label": "柯桥区",
  "value": "330603" },

{
  "label": "上虞区",
  "value": "330604" },

{
  "label": "新昌县",
  "value": "330624" },

{
  "label": "诸暨市",
  "value": "330681" },

{
  "label": "嵊州市",
  "value": "330683" }],


[{
  "label": "婺城区",
  "value": "330702" },

{
  "label": "金东区",
  "value": "330703" },

{
  "label": "武义县",
  "value": "330723" },

{
  "label": "浦江县",
  "value": "330726" },

{
  "label": "磐安县",
  "value": "330727" },

{
  "label": "兰溪市",
  "value": "330781" },

{
  "label": "义乌市",
  "value": "330782" },

{
  "label": "东阳市",
  "value": "330783" },

{
  "label": "永康市",
  "value": "330784" }],


[{
  "label": "柯城区",
  "value": "330802" },

{
  "label": "衢江区",
  "value": "330803" },

{
  "label": "常山县",
  "value": "330822" },

{
  "label": "开化县",
  "value": "330824" },

{
  "label": "龙游县",
  "value": "330825" },

{
  "label": "江山市",
  "value": "330881" }],


[{
  "label": "定海区",
  "value": "330902" },

{
  "label": "普陀区",
  "value": "330903" },

{
  "label": "岱山县",
  "value": "330921" },

{
  "label": "嵊泗县",
  "value": "330922" }],


[{
  "label": "椒江区",
  "value": "331002" },

{
  "label": "黄岩区",
  "value": "331003" },

{
  "label": "路桥区",
  "value": "331004" },

{
  "label": "三门县",
  "value": "331022" },

{
  "label": "天台县",
  "value": "331023" },

{
  "label": "仙居县",
  "value": "331024" },

{
  "label": "温岭市",
  "value": "331081" },

{
  "label": "临海市",
  "value": "331082" },

{
  "label": "玉环市",
  "value": "331083" }],


[{
  "label": "莲都区",
  "value": "331102" },

{
  "label": "青田县",
  "value": "331121" },

{
  "label": "缙云县",
  "value": "331122" },

{
  "label": "遂昌县",
  "value": "331123" },

{
  "label": "松阳县",
  "value": "331124" },

{
  "label": "云和县",
  "value": "331125" },

{
  "label": "庆元县",
  "value": "331126" },

{
  "label": "景宁畲族自治县",
  "value": "331127" },

{
  "label": "龙泉市",
  "value": "331181" }]],



[
[{
  "label": "瑶海区",
  "value": "340102" },

{
  "label": "庐阳区",
  "value": "340103" },

{
  "label": "蜀山区",
  "value": "340104" },

{
  "label": "包河区",
  "value": "340111" },

{
  "label": "长丰县",
  "value": "340121" },

{
  "label": "肥东县",
  "value": "340122" },

{
  "label": "肥西县",
  "value": "340123" },

{
  "label": "庐江县",
  "value": "340124" },

{
  "label": "合肥高新技术产业开发区",
  "value": "340171" },

{
  "label": "合肥经济技术开发区",
  "value": "340172" },

{
  "label": "合肥新站高新技术产业开发区",
  "value": "340173" },

{
  "label": "巢湖市",
  "value": "340181" }],


[{
  "label": "镜湖区",
  "value": "340202" },

{
  "label": "弋江区",
  "value": "340203" },

{
  "label": "鸠江区",
  "value": "340207" },

{
  "label": "三山区",
  "value": "340208" },

{
  "label": "芜湖县",
  "value": "340221" },

{
  "label": "繁昌县",
  "value": "340222" },

{
  "label": "南陵县",
  "value": "340223" },

{
  "label": "无为县",
  "value": "340225" },

{
  "label": "芜湖经济技术开发区",
  "value": "340271" },

{
  "label": "安徽芜湖长江大桥经济开发区",
  "value": "340272" }],


[{
  "label": "龙子湖区",
  "value": "340302" },

{
  "label": "蚌山区",
  "value": "340303" },

{
  "label": "禹会区",
  "value": "340304" },

{
  "label": "淮上区",
  "value": "340311" },

{
  "label": "怀远县",
  "value": "340321" },

{
  "label": "五河县",
  "value": "340322" },

{
  "label": "固镇县",
  "value": "340323" },

{
  "label": "蚌埠市高新技术开发区",
  "value": "340371" },

{
  "label": "蚌埠市经济开发区",
  "value": "340372" }],


[{
  "label": "大通区",
  "value": "340402" },

{
  "label": "田家庵区",
  "value": "340403" },

{
  "label": "谢家集区",
  "value": "340404" },

{
  "label": "八公山区",
  "value": "340405" },

{
  "label": "潘集区",
  "value": "340406" },

{
  "label": "凤台县",
  "value": "340421" },

{
  "label": "寿县",
  "value": "340422" }],


[{
  "label": "花山区",
  "value": "340503" },

{
  "label": "雨山区",
  "value": "340504" },

{
  "label": "博望区",
  "value": "340506" },

{
  "label": "当涂县",
  "value": "340521" },

{
  "label": "含山县",
  "value": "340522" },

{
  "label": "和县",
  "value": "340523" }],


[{
  "label": "杜集区",
  "value": "340602" },

{
  "label": "相山区",
  "value": "340603" },

{
  "label": "烈山区",
  "value": "340604" },

{
  "label": "濉溪县",
  "value": "340621" }],


[{
  "label": "铜官区",
  "value": "340705" },

{
  "label": "义安区",
  "value": "340706" },

{
  "label": "郊区",
  "value": "340711" },

{
  "label": "枞阳县",
  "value": "340722" }],


[{
  "label": "迎江区",
  "value": "340802" },

{
  "label": "大观区",
  "value": "340803" },

{
  "label": "宜秀区",
  "value": "340811" },

{
  "label": "怀宁县",
  "value": "340822" },

{
  "label": "潜山县",
  "value": "340824" },

{
  "label": "太湖县",
  "value": "340825" },

{
  "label": "宿松县",
  "value": "340826" },

{
  "label": "望江县",
  "value": "340827" },

{
  "label": "岳西县",
  "value": "340828" },

{
  "label": "安徽安庆经济开发区",
  "value": "340871" },

{
  "label": "桐城市",
  "value": "340881" }],


[{
  "label": "屯溪区",
  "value": "341002" },

{
  "label": "黄山区",
  "value": "341003" },

{
  "label": "徽州区",
  "value": "341004" },

{
  "label": "歙县",
  "value": "341021" },

{
  "label": "休宁县",
  "value": "341022" },

{
  "label": "黟县",
  "value": "341023" },

{
  "label": "祁门县",
  "value": "341024" }],


[{
  "label": "琅琊区",
  "value": "341102" },

{
  "label": "南谯区",
  "value": "341103" },

{
  "label": "来安县",
  "value": "341122" },

{
  "label": "全椒县",
  "value": "341124" },

{
  "label": "定远县",
  "value": "341125" },

{
  "label": "凤阳县",
  "value": "341126" },

{
  "label": "苏滁现代产业园",
  "value": "341171" },

{
  "label": "滁州经济技术开发区",
  "value": "341172" },

{
  "label": "天长市",
  "value": "341181" },

{
  "label": "明光市",
  "value": "341182" }],


[{
  "label": "颍州区",
  "value": "341202" },

{
  "label": "颍东区",
  "value": "341203" },

{
  "label": "颍泉区",
  "value": "341204" },

{
  "label": "临泉县",
  "value": "341221" },

{
  "label": "太和县",
  "value": "341222" },

{
  "label": "阜南县",
  "value": "341225" },

{
  "label": "颍上县",
  "value": "341226" },

{
  "label": "阜阳合肥现代产业园区",
  "value": "341271" },

{
  "label": "阜阳经济技术开发区",
  "value": "341272" },

{
  "label": "界首市",
  "value": "341282" }],


[{
  "label": "埇桥区",
  "value": "341302" },

{
  "label": "砀山县",
  "value": "341321" },

{
  "label": "萧县",
  "value": "341322" },

{
  "label": "灵璧县",
  "value": "341323" },

{
  "label": "泗县",
  "value": "341324" },

{
  "label": "宿州马鞍山现代产业园区",
  "value": "341371" },

{
  "label": "宿州经济技术开发区",
  "value": "341372" }],


[{
  "label": "金安区",
  "value": "341502" },

{
  "label": "裕安区",
  "value": "341503" },

{
  "label": "叶集区",
  "value": "341504" },

{
  "label": "霍邱县",
  "value": "341522" },

{
  "label": "舒城县",
  "value": "341523" },

{
  "label": "金寨县",
  "value": "341524" },

{
  "label": "霍山县",
  "value": "341525" }],


[{
  "label": "谯城区",
  "value": "341602" },

{
  "label": "涡阳县",
  "value": "341621" },

{
  "label": "蒙城县",
  "value": "341622" },

{
  "label": "利辛县",
  "value": "341623" }],


[{
  "label": "贵池区",
  "value": "341702" },

{
  "label": "东至县",
  "value": "341721" },

{
  "label": "石台县",
  "value": "341722" },

{
  "label": "青阳县",
  "value": "341723" }],


[{
  "label": "宣州区",
  "value": "341802" },

{
  "label": "郎溪县",
  "value": "341821" },

{
  "label": "广德县",
  "value": "341822" },

{
  "label": "泾县",
  "value": "341823" },

{
  "label": "绩溪县",
  "value": "341824" },

{
  "label": "旌德县",
  "value": "341825" },

{
  "label": "宣城市经济开发区",
  "value": "341871" },

{
  "label": "宁国市",
  "value": "341881" }]],



[
[{
  "label": "鼓楼区",
  "value": "350102" },

{
  "label": "台江区",
  "value": "350103" },

{
  "label": "仓山区",
  "value": "350104" },

{
  "label": "马尾区",
  "value": "350105" },

{
  "label": "晋安区",
  "value": "350111" },

{
  "label": "闽侯县",
  "value": "350121" },

{
  "label": "连江县",
  "value": "350122" },

{
  "label": "罗源县",
  "value": "350123" },

{
  "label": "闽清县",
  "value": "350124" },

{
  "label": "永泰县",
  "value": "350125" },

{
  "label": "平潭县",
  "value": "350128" },

{
  "label": "福清市",
  "value": "350181" },

{
  "label": "长乐市",
  "value": "350182" }],


[{
  "label": "思明区",
  "value": "350203" },

{
  "label": "海沧区",
  "value": "350205" },

{
  "label": "湖里区",
  "value": "350206" },

{
  "label": "集美区",
  "value": "350211" },

{
  "label": "同安区",
  "value": "350212" },

{
  "label": "翔安区",
  "value": "350213" }],


[{
  "label": "城厢区",
  "value": "350302" },

{
  "label": "涵江区",
  "value": "350303" },

{
  "label": "荔城区",
  "value": "350304" },

{
  "label": "秀屿区",
  "value": "350305" },

{
  "label": "仙游县",
  "value": "350322" }],


[{
  "label": "梅列区",
  "value": "350402" },

{
  "label": "三元区",
  "value": "350403" },

{
  "label": "明溪县",
  "value": "350421" },

{
  "label": "清流县",
  "value": "350423" },

{
  "label": "宁化县",
  "value": "350424" },

{
  "label": "大田县",
  "value": "350425" },

{
  "label": "尤溪县",
  "value": "350426" },

{
  "label": "沙县",
  "value": "350427" },

{
  "label": "将乐县",
  "value": "350428" },

{
  "label": "泰宁县",
  "value": "350429" },

{
  "label": "建宁县",
  "value": "350430" },

{
  "label": "永安市",
  "value": "350481" }],


[{
  "label": "鲤城区",
  "value": "350502" },

{
  "label": "丰泽区",
  "value": "350503" },

{
  "label": "洛江区",
  "value": "350504" },

{
  "label": "泉港区",
  "value": "350505" },

{
  "label": "惠安县",
  "value": "350521" },

{
  "label": "安溪县",
  "value": "350524" },

{
  "label": "永春县",
  "value": "350525" },

{
  "label": "德化县",
  "value": "350526" },

{
  "label": "金门县",
  "value": "350527" },

{
  "label": "石狮市",
  "value": "350581" },

{
  "label": "晋江市",
  "value": "350582" },

{
  "label": "南安市",
  "value": "350583" }],


[{
  "label": "芗城区",
  "value": "350602" },

{
  "label": "龙文区",
  "value": "350603" },

{
  "label": "云霄县",
  "value": "350622" },

{
  "label": "漳浦县",
  "value": "350623" },

{
  "label": "诏安县",
  "value": "350624" },

{
  "label": "长泰县",
  "value": "350625" },

{
  "label": "东山县",
  "value": "350626" },

{
  "label": "南靖县",
  "value": "350627" },

{
  "label": "平和县",
  "value": "350628" },

{
  "label": "华安县",
  "value": "350629" },

{
  "label": "龙海市",
  "value": "350681" }],


[{
  "label": "延平区",
  "value": "350702" },

{
  "label": "建阳区",
  "value": "350703" },

{
  "label": "顺昌县",
  "value": "350721" },

{
  "label": "浦城县",
  "value": "350722" },

{
  "label": "光泽县",
  "value": "350723" },

{
  "label": "松溪县",
  "value": "350724" },

{
  "label": "政和县",
  "value": "350725" },

{
  "label": "邵武市",
  "value": "350781" },

{
  "label": "武夷山市",
  "value": "350782" },

{
  "label": "建瓯市",
  "value": "350783" }],


[{
  "label": "新罗区",
  "value": "350802" },

{
  "label": "永定区",
  "value": "350803" },

{
  "label": "长汀县",
  "value": "350821" },

{
  "label": "上杭县",
  "value": "350823" },

{
  "label": "武平县",
  "value": "350824" },

{
  "label": "连城县",
  "value": "350825" },

{
  "label": "漳平市",
  "value": "350881" }],


[{
  "label": "蕉城区",
  "value": "350902" },

{
  "label": "霞浦县",
  "value": "350921" },

{
  "label": "古田县",
  "value": "350922" },

{
  "label": "屏南县",
  "value": "350923" },

{
  "label": "寿宁县",
  "value": "350924" },

{
  "label": "周宁县",
  "value": "350925" },

{
  "label": "柘荣县",
  "value": "350926" },

{
  "label": "福安市",
  "value": "350981" },

{
  "label": "福鼎市",
  "value": "350982" }]],



[
[{
  "label": "东湖区",
  "value": "360102" },

{
  "label": "西湖区",
  "value": "360103" },

{
  "label": "青云谱区",
  "value": "360104" },

{
  "label": "湾里区",
  "value": "360105" },

{
  "label": "青山湖区",
  "value": "360111" },

{
  "label": "新建区",
  "value": "360112" },

{
  "label": "南昌县",
  "value": "360121" },

{
  "label": "安义县",
  "value": "360123" },

{
  "label": "进贤县",
  "value": "360124" }],


[{
  "label": "昌江区",
  "value": "360202" },

{
  "label": "珠山区",
  "value": "360203" },

{
  "label": "浮梁县",
  "value": "360222" },

{
  "label": "乐平市",
  "value": "360281" }],


[{
  "label": "安源区",
  "value": "360302" },

{
  "label": "湘东区",
  "value": "360313" },

{
  "label": "莲花县",
  "value": "360321" },

{
  "label": "上栗县",
  "value": "360322" },

{
  "label": "芦溪县",
  "value": "360323" }],


[{
  "label": "濂溪区",
  "value": "360402" },

{
  "label": "浔阳区",
  "value": "360403" },

{
  "label": "柴桑区",
  "value": "360404" },

{
  "label": "武宁县",
  "value": "360423" },

{
  "label": "修水县",
  "value": "360424" },

{
  "label": "永修县",
  "value": "360425" },

{
  "label": "德安县",
  "value": "360426" },

{
  "label": "都昌县",
  "value": "360428" },

{
  "label": "湖口县",
  "value": "360429" },

{
  "label": "彭泽县",
  "value": "360430" },

{
  "label": "瑞昌市",
  "value": "360481" },

{
  "label": "共青城市",
  "value": "360482" },

{
  "label": "庐山市",
  "value": "360483" }],


[{
  "label": "渝水区",
  "value": "360502" },

{
  "label": "分宜县",
  "value": "360521" }],


[{
  "label": "月湖区",
  "value": "360602" },

{
  "label": "余江县",
  "value": "360622" },

{
  "label": "贵溪市",
  "value": "360681" }],


[{
  "label": "章贡区",
  "value": "360702" },

{
  "label": "南康区",
  "value": "360703" },

{
  "label": "赣县区",
  "value": "360704" },

{
  "label": "信丰县",
  "value": "360722" },

{
  "label": "大余县",
  "value": "360723" },

{
  "label": "上犹县",
  "value": "360724" },

{
  "label": "崇义县",
  "value": "360725" },

{
  "label": "安远县",
  "value": "360726" },

{
  "label": "龙南县",
  "value": "360727" },

{
  "label": "定南县",
  "value": "360728" },

{
  "label": "全南县",
  "value": "360729" },

{
  "label": "宁都县",
  "value": "360730" },

{
  "label": "于都县",
  "value": "360731" },

{
  "label": "兴国县",
  "value": "360732" },

{
  "label": "会昌县",
  "value": "360733" },

{
  "label": "寻乌县",
  "value": "360734" },

{
  "label": "石城县",
  "value": "360735" },

{
  "label": "瑞金市",
  "value": "360781" }],


[{
  "label": "吉州区",
  "value": "360802" },

{
  "label": "青原区",
  "value": "360803" },

{
  "label": "吉安县",
  "value": "360821" },

{
  "label": "吉水县",
  "value": "360822" },

{
  "label": "峡江县",
  "value": "360823" },

{
  "label": "新干县",
  "value": "360824" },

{
  "label": "永丰县",
  "value": "360825" },

{
  "label": "泰和县",
  "value": "360826" },

{
  "label": "遂川县",
  "value": "360827" },

{
  "label": "万安县",
  "value": "360828" },

{
  "label": "安福县",
  "value": "360829" },

{
  "label": "永新县",
  "value": "360830" },

{
  "label": "井冈山市",
  "value": "360881" }],


[{
  "label": "袁州区",
  "value": "360902" },

{
  "label": "奉新县",
  "value": "360921" },

{
  "label": "万载县",
  "value": "360922" },

{
  "label": "上高县",
  "value": "360923" },

{
  "label": "宜丰县",
  "value": "360924" },

{
  "label": "靖安县",
  "value": "360925" },

{
  "label": "铜鼓县",
  "value": "360926" },

{
  "label": "丰城市",
  "value": "360981" },

{
  "label": "樟树市",
  "value": "360982" },

{
  "label": "高安市",
  "value": "360983" }],


[{
  "label": "临川区",
  "value": "361002" },

{
  "label": "东乡区",
  "value": "361003" },

{
  "label": "南城县",
  "value": "361021" },

{
  "label": "黎川县",
  "value": "361022" },

{
  "label": "南丰县",
  "value": "361023" },

{
  "label": "崇仁县",
  "value": "361024" },

{
  "label": "乐安县",
  "value": "361025" },

{
  "label": "宜黄县",
  "value": "361026" },

{
  "label": "金溪县",
  "value": "361027" },

{
  "label": "资溪县",
  "value": "361028" },

{
  "label": "广昌县",
  "value": "361030" }],


[{
  "label": "信州区",
  "value": "361102" },

{
  "label": "广丰区",
  "value": "361103" },

{
  "label": "上饶县",
  "value": "361121" },

{
  "label": "玉山县",
  "value": "361123" },

{
  "label": "铅山县",
  "value": "361124" },

{
  "label": "横峰县",
  "value": "361125" },

{
  "label": "弋阳县",
  "value": "361126" },

{
  "label": "余干县",
  "value": "361127" },

{
  "label": "鄱阳县",
  "value": "361128" },

{
  "label": "万年县",
  "value": "361129" },

{
  "label": "婺源县",
  "value": "361130" },

{
  "label": "德兴市",
  "value": "361181" }]],



[
[{
  "label": "历下区",
  "value": "370102" },

{
  "label": "市中区",
  "value": "370103" },

{
  "label": "槐荫区",
  "value": "370104" },

{
  "label": "天桥区",
  "value": "370105" },

{
  "label": "历城区",
  "value": "370112" },

{
  "label": "长清区",
  "value": "370113" },

{
  "label": "章丘区",
  "value": "370114" },

{
  "label": "平阴县",
  "value": "370124" },

{
  "label": "济阳县",
  "value": "370125" },

{
  "label": "商河县",
  "value": "370126" },

{
  "label": "济南高新技术产业开发区",
  "value": "370171" }],


[{
  "label": "市南区",
  "value": "370202" },

{
  "label": "市北区",
  "value": "370203" },

{
  "label": "黄岛区",
  "value": "370211" },

{
  "label": "崂山区",
  "value": "370212" },

{
  "label": "李沧区",
  "value": "370213" },

{
  "label": "城阳区",
  "value": "370214" },

{
  "label": "即墨区",
  "value": "370215" },

{
  "label": "青岛高新技术产业开发区",
  "value": "370271" },

{
  "label": "胶州市",
  "value": "370281" },

{
  "label": "平度市",
  "value": "370283" },

{
  "label": "莱西市",
  "value": "370285" }],


[{
  "label": "淄川区",
  "value": "370302" },

{
  "label": "张店区",
  "value": "370303" },

{
  "label": "博山区",
  "value": "370304" },

{
  "label": "临淄区",
  "value": "370305" },

{
  "label": "周村区",
  "value": "370306" },

{
  "label": "桓台县",
  "value": "370321" },

{
  "label": "高青县",
  "value": "370322" },

{
  "label": "沂源县",
  "value": "370323" }],


[{
  "label": "市中区",
  "value": "370402" },

{
  "label": "薛城区",
  "value": "370403" },

{
  "label": "峄城区",
  "value": "370404" },

{
  "label": "台儿庄区",
  "value": "370405" },

{
  "label": "山亭区",
  "value": "370406" },

{
  "label": "滕州市",
  "value": "370481" }],


[{
  "label": "东营区",
  "value": "370502" },

{
  "label": "河口区",
  "value": "370503" },

{
  "label": "垦利区",
  "value": "370505" },

{
  "label": "利津县",
  "value": "370522" },

{
  "label": "广饶县",
  "value": "370523" },

{
  "label": "东营经济技术开发区",
  "value": "370571" },

{
  "label": "东营港经济开发区",
  "value": "370572" }],


[{
  "label": "芝罘区",
  "value": "370602" },

{
  "label": "福山区",
  "value": "370611" },

{
  "label": "牟平区",
  "value": "370612" },

{
  "label": "莱山区",
  "value": "370613" },

{
  "label": "长岛县",
  "value": "370634" },

{
  "label": "烟台高新技术产业开发区",
  "value": "370671" },

{
  "label": "烟台经济技术开发区",
  "value": "370672" },

{
  "label": "龙口市",
  "value": "370681" },

{
  "label": "莱阳市",
  "value": "370682" },

{
  "label": "莱州市",
  "value": "370683" },

{
  "label": "蓬莱市",
  "value": "370684" },

{
  "label": "招远市",
  "value": "370685" },

{
  "label": "栖霞市",
  "value": "370686" },

{
  "label": "海阳市",
  "value": "370687" }],


[{
  "label": "潍城区",
  "value": "370702" },

{
  "label": "寒亭区",
  "value": "370703" },

{
  "label": "坊子区",
  "value": "370704" },

{
  "label": "奎文区",
  "value": "370705" },

{
  "label": "临朐县",
  "value": "370724" },

{
  "label": "昌乐县",
  "value": "370725" },

{
  "label": "潍坊滨海经济技术开发区",
  "value": "370772" },

{
  "label": "青州市",
  "value": "370781" },

{
  "label": "诸城市",
  "value": "370782" },

{
  "label": "寿光市",
  "value": "370783" },

{
  "label": "安丘市",
  "value": "370784" },

{
  "label": "高密市",
  "value": "370785" },

{
  "label": "昌邑市",
  "value": "370786" }],


[{
  "label": "任城区",
  "value": "370811" },

{
  "label": "兖州区",
  "value": "370812" },

{
  "label": "微山县",
  "value": "370826" },

{
  "label": "鱼台县",
  "value": "370827" },

{
  "label": "金乡县",
  "value": "370828" },

{
  "label": "嘉祥县",
  "value": "370829" },

{
  "label": "汶上县",
  "value": "370830" },

{
  "label": "泗水县",
  "value": "370831" },

{
  "label": "梁山县",
  "value": "370832" },

{
  "label": "济宁高新技术产业开发区",
  "value": "370871" },

{
  "label": "曲阜市",
  "value": "370881" },

{
  "label": "邹城市",
  "value": "370883" }],


[{
  "label": "泰山区",
  "value": "370902" },

{
  "label": "岱岳区",
  "value": "370911" },

{
  "label": "宁阳县",
  "value": "370921" },

{
  "label": "东平县",
  "value": "370923" },

{
  "label": "新泰市",
  "value": "370982" },

{
  "label": "肥城市",
  "value": "370983" }],


[{
  "label": "环翠区",
  "value": "371002" },

{
  "label": "文登区",
  "value": "371003" },

{
  "label": "威海火炬高技术产业开发区",
  "value": "371071" },

{
  "label": "威海经济技术开发区",
  "value": "371072" },

{
  "label": "威海临港经济技术开发区",
  "value": "371073" },

{
  "label": "荣成市",
  "value": "371082" },

{
  "label": "乳山市",
  "value": "371083" }],


[{
  "label": "东港区",
  "value": "371102" },

{
  "label": "岚山区",
  "value": "371103" },

{
  "label": "五莲县",
  "value": "371121" },

{
  "label": "莒县",
  "value": "371122" },

{
  "label": "日照经济技术开发区",
  "value": "371171" },

{
  "label": "日照国际海洋城",
  "value": "371172" }],


[{
  "label": "莱城区",
  "value": "371202" },

{
  "label": "钢城区",
  "value": "371203" }],


[{
  "label": "兰山区",
  "value": "371302" },

{
  "label": "罗庄区",
  "value": "371311" },

{
  "label": "河东区",
  "value": "371312" },

{
  "label": "沂南县",
  "value": "371321" },

{
  "label": "郯城县",
  "value": "371322" },

{
  "label": "沂水县",
  "value": "371323" },

{
  "label": "兰陵县",
  "value": "371324" },

{
  "label": "费县",
  "value": "371325" },

{
  "label": "平邑县",
  "value": "371326" },

{
  "label": "莒南县",
  "value": "371327" },

{
  "label": "蒙阴县",
  "value": "371328" },

{
  "label": "临沭县",
  "value": "371329" },

{
  "label": "临沂高新技术产业开发区",
  "value": "371371" },

{
  "label": "临沂经济技术开发区",
  "value": "371372" },

{
  "label": "临沂临港经济开发区",
  "value": "371373" }],


[{
  "label": "德城区",
  "value": "371402" },

{
  "label": "陵城区",
  "value": "371403" },

{
  "label": "宁津县",
  "value": "371422" },

{
  "label": "庆云县",
  "value": "371423" },

{
  "label": "临邑县",
  "value": "371424" },

{
  "label": "齐河县",
  "value": "371425" },

{
  "label": "平原县",
  "value": "371426" },

{
  "label": "夏津县",
  "value": "371427" },

{
  "label": "武城县",
  "value": "371428" },

{
  "label": "德州经济技术开发区",
  "value": "371471" },

{
  "label": "德州运河经济开发区",
  "value": "371472" },

{
  "label": "乐陵市",
  "value": "371481" },

{
  "label": "禹城市",
  "value": "371482" }],


[{
  "label": "东昌府区",
  "value": "371502" },

{
  "label": "阳谷县",
  "value": "371521" },

{
  "label": "莘县",
  "value": "371522" },

{
  "label": "茌平县",
  "value": "371523" },

{
  "label": "东阿县",
  "value": "371524" },

{
  "label": "冠县",
  "value": "371525" },

{
  "label": "高唐县",
  "value": "371526" },

{
  "label": "临清市",
  "value": "371581" }],


[{
  "label": "滨城区",
  "value": "371602" },

{
  "label": "沾化区",
  "value": "371603" },

{
  "label": "惠民县",
  "value": "371621" },

{
  "label": "阳信县",
  "value": "371622" },

{
  "label": "无棣县",
  "value": "371623" },

{
  "label": "博兴县",
  "value": "371625" },

{
  "label": "邹平县",
  "value": "371626" }],


[{
  "label": "牡丹区",
  "value": "371702" },

{
  "label": "定陶区",
  "value": "371703" },

{
  "label": "曹县",
  "value": "371721" },

{
  "label": "单县",
  "value": "371722" },

{
  "label": "成武县",
  "value": "371723" },

{
  "label": "巨野县",
  "value": "371724" },

{
  "label": "郓城县",
  "value": "371725" },

{
  "label": "鄄城县",
  "value": "371726" },

{
  "label": "东明县",
  "value": "371728" },

{
  "label": "菏泽经济技术开发区",
  "value": "371771" },

{
  "label": "菏泽高新技术开发区",
  "value": "371772" }]],



[
[{
  "label": "中原区",
  "value": "410102" },

{
  "label": "二七区",
  "value": "410103" },

{
  "label": "管城回族区",
  "value": "410104" },

{
  "label": "金水区",
  "value": "410105" },

{
  "label": "上街区",
  "value": "410106" },

{
  "label": "惠济区",
  "value": "410108" },

{
  "label": "中牟县",
  "value": "410122" },

{
  "label": "郑州经济技术开发区",
  "value": "410171" },

{
  "label": "郑州高新技术产业开发区",
  "value": "410172" },

{
  "label": "郑州航空港经济综合实验区",
  "value": "410173" },

{
  "label": "巩义市",
  "value": "410181" },

{
  "label": "荥阳市",
  "value": "410182" },

{
  "label": "新密市",
  "value": "410183" },

{
  "label": "新郑市",
  "value": "410184" },

{
  "label": "登封市",
  "value": "410185" }],


[{
  "label": "龙亭区",
  "value": "410202" },

{
  "label": "顺河回族区",
  "value": "410203" },

{
  "label": "鼓楼区",
  "value": "410204" },

{
  "label": "禹王台区",
  "value": "410205" },

{
  "label": "祥符区",
  "value": "410212" },

{
  "label": "杞县",
  "value": "410221" },

{
  "label": "通许县",
  "value": "410222" },

{
  "label": "尉氏县",
  "value": "410223" },

{
  "label": "兰考县",
  "value": "410225" }],


[{
  "label": "老城区",
  "value": "410302" },

{
  "label": "西工区",
  "value": "410303" },

{
  "label": "瀍河回族区",
  "value": "410304" },

{
  "label": "涧西区",
  "value": "410305" },

{
  "label": "吉利区",
  "value": "410306" },

{
  "label": "洛龙区",
  "value": "410311" },

{
  "label": "孟津县",
  "value": "410322" },

{
  "label": "新安县",
  "value": "410323" },

{
  "label": "栾川县",
  "value": "410324" },

{
  "label": "嵩县",
  "value": "410325" },

{
  "label": "汝阳县",
  "value": "410326" },

{
  "label": "宜阳县",
  "value": "410327" },

{
  "label": "洛宁县",
  "value": "410328" },

{
  "label": "伊川县",
  "value": "410329" },

{
  "label": "洛阳高新技术产业开发区",
  "value": "410371" },

{
  "label": "偃师市",
  "value": "410381" }],


[{
  "label": "新华区",
  "value": "410402" },

{
  "label": "卫东区",
  "value": "410403" },

{
  "label": "石龙区",
  "value": "410404" },

{
  "label": "湛河区",
  "value": "410411" },

{
  "label": "宝丰县",
  "value": "410421" },

{
  "label": "叶县",
  "value": "410422" },

{
  "label": "鲁山县",
  "value": "410423" },

{
  "label": "郏县",
  "value": "410425" },

{
  "label": "平顶山高新技术产业开发区",
  "value": "410471" },

{
  "label": "平顶山市新城区",
  "value": "410472" },

{
  "label": "舞钢市",
  "value": "410481" },

{
  "label": "汝州市",
  "value": "410482" }],


[{
  "label": "文峰区",
  "value": "410502" },

{
  "label": "北关区",
  "value": "410503" },

{
  "label": "殷都区",
  "value": "410505" },

{
  "label": "龙安区",
  "value": "410506" },

{
  "label": "安阳县",
  "value": "410522" },

{
  "label": "汤阴县",
  "value": "410523" },

{
  "label": "滑县",
  "value": "410526" },

{
  "label": "内黄县",
  "value": "410527" },

{
  "label": "安阳高新技术产业开发区",
  "value": "410571" },

{
  "label": "林州市",
  "value": "410581" }],


[{
  "label": "鹤山区",
  "value": "410602" },

{
  "label": "山城区",
  "value": "410603" },

{
  "label": "淇滨区",
  "value": "410611" },

{
  "label": "浚县",
  "value": "410621" },

{
  "label": "淇县",
  "value": "410622" },

{
  "label": "鹤壁经济技术开发区",
  "value": "410671" }],


[{
  "label": "红旗区",
  "value": "410702" },

{
  "label": "卫滨区",
  "value": "410703" },

{
  "label": "凤泉区",
  "value": "410704" },

{
  "label": "牧野区",
  "value": "410711" },

{
  "label": "新乡县",
  "value": "410721" },

{
  "label": "获嘉县",
  "value": "410724" },

{
  "label": "原阳县",
  "value": "410725" },

{
  "label": "延津县",
  "value": "410726" },

{
  "label": "封丘县",
  "value": "410727" },

{
  "label": "长垣县",
  "value": "410728" },

{
  "label": "新乡高新技术产业开发区",
  "value": "410771" },

{
  "label": "新乡经济技术开发区",
  "value": "410772" },

{
  "label": "新乡市平原城乡一体化示范区",
  "value": "410773" },

{
  "label": "卫辉市",
  "value": "410781" },

{
  "label": "辉县市",
  "value": "410782" }],


[{
  "label": "解放区",
  "value": "410802" },

{
  "label": "中站区",
  "value": "410803" },

{
  "label": "马村区",
  "value": "410804" },

{
  "label": "山阳区",
  "value": "410811" },

{
  "label": "修武县",
  "value": "410821" },

{
  "label": "博爱县",
  "value": "410822" },

{
  "label": "武陟县",
  "value": "410823" },

{
  "label": "温县",
  "value": "410825" },

{
  "label": "焦作城乡一体化示范区",
  "value": "410871" },

{
  "label": "沁阳市",
  "value": "410882" },

{
  "label": "孟州市",
  "value": "410883" }],


[{
  "label": "华龙区",
  "value": "410902" },

{
  "label": "清丰县",
  "value": "410922" },

{
  "label": "南乐县",
  "value": "410923" },

{
  "label": "范县",
  "value": "410926" },

{
  "label": "台前县",
  "value": "410927" },

{
  "label": "濮阳县",
  "value": "410928" },

{
  "label": "河南濮阳工业园区",
  "value": "410971" },

{
  "label": "濮阳经济技术开发区",
  "value": "410972" }],


[{
  "label": "魏都区",
  "value": "411002" },

{
  "label": "建安区",
  "value": "411003" },

{
  "label": "鄢陵县",
  "value": "411024" },

{
  "label": "襄城县",
  "value": "411025" },

{
  "label": "许昌经济技术开发区",
  "value": "411071" },

{
  "label": "禹州市",
  "value": "411081" },

{
  "label": "长葛市",
  "value": "411082" }],


[{
  "label": "源汇区",
  "value": "411102" },

{
  "label": "郾城区",
  "value": "411103" },

{
  "label": "召陵区",
  "value": "411104" },

{
  "label": "舞阳县",
  "value": "411121" },

{
  "label": "临颍县",
  "value": "411122" },

{
  "label": "漯河经济技术开发区",
  "value": "411171" }],


[{
  "label": "湖滨区",
  "value": "411202" },

{
  "label": "陕州区",
  "value": "411203" },

{
  "label": "渑池县",
  "value": "411221" },

{
  "label": "卢氏县",
  "value": "411224" },

{
  "label": "河南三门峡经济开发区",
  "value": "411271" },

{
  "label": "义马市",
  "value": "411281" },

{
  "label": "灵宝市",
  "value": "411282" }],


[{
  "label": "宛城区",
  "value": "411302" },

{
  "label": "卧龙区",
  "value": "411303" },

{
  "label": "南召县",
  "value": "411321" },

{
  "label": "方城县",
  "value": "411322" },

{
  "label": "西峡县",
  "value": "411323" },

{
  "label": "镇平县",
  "value": "411324" },

{
  "label": "内乡县",
  "value": "411325" },

{
  "label": "淅川县",
  "value": "411326" },

{
  "label": "社旗县",
  "value": "411327" },

{
  "label": "唐河县",
  "value": "411328" },

{
  "label": "新野县",
  "value": "411329" },

{
  "label": "桐柏县",
  "value": "411330" },

{
  "label": "南阳高新技术产业开发区",
  "value": "411371" },

{
  "label": "南阳市城乡一体化示范区",
  "value": "411372" },

{
  "label": "邓州市",
  "value": "411381" }],


[{
  "label": "梁园区",
  "value": "411402" },

{
  "label": "睢阳区",
  "value": "411403" },

{
  "label": "民权县",
  "value": "411421" },

{
  "label": "睢县",
  "value": "411422" },

{
  "label": "宁陵县",
  "value": "411423" },

{
  "label": "柘城县",
  "value": "411424" },

{
  "label": "虞城县",
  "value": "411425" },

{
  "label": "夏邑县",
  "value": "411426" },

{
  "label": "豫东综合物流产业聚集区",
  "value": "411471" },

{
  "label": "河南商丘经济开发区",
  "value": "411472" },

{
  "label": "永城市",
  "value": "411481" }],


[{
  "label": "浉河区",
  "value": "411502" },

{
  "label": "平桥区",
  "value": "411503" },

{
  "label": "罗山县",
  "value": "411521" },

{
  "label": "光山县",
  "value": "411522" },

{
  "label": "新县",
  "value": "411523" },

{
  "label": "商城县",
  "value": "411524" },

{
  "label": "固始县",
  "value": "411525" },

{
  "label": "潢川县",
  "value": "411526" },

{
  "label": "淮滨县",
  "value": "411527" },

{
  "label": "息县",
  "value": "411528" },

{
  "label": "信阳高新技术产业开发区",
  "value": "411571" }],


[{
  "label": "川汇区",
  "value": "411602" },

{
  "label": "扶沟县",
  "value": "411621" },

{
  "label": "西华县",
  "value": "411622" },

{
  "label": "商水县",
  "value": "411623" },

{
  "label": "沈丘县",
  "value": "411624" },

{
  "label": "郸城县",
  "value": "411625" },

{
  "label": "淮阳县",
  "value": "411626" },

{
  "label": "太康县",
  "value": "411627" },

{
  "label": "鹿邑县",
  "value": "411628" },

{
  "label": "河南周口经济开发区",
  "value": "411671" },

{
  "label": "项城市",
  "value": "411681" }],


[{
  "label": "驿城区",
  "value": "411702" },

{
  "label": "西平县",
  "value": "411721" },

{
  "label": "上蔡县",
  "value": "411722" },

{
  "label": "平舆县",
  "value": "411723" },

{
  "label": "正阳县",
  "value": "411724" },

{
  "label": "确山县",
  "value": "411725" },

{
  "label": "泌阳县",
  "value": "411726" },

{
  "label": "汝南县",
  "value": "411727" },

{
  "label": "遂平县",
  "value": "411728" },

{
  "label": "新蔡县",
  "value": "411729" },

{
  "label": "河南驻马店经济开发区",
  "value": "411771" }],


[{
  "label": "济源市",
  "value": "419001" }]],


[
[{
  "label": "江岸区",
  "value": "420102" },

{
  "label": "江汉区",
  "value": "420103" },

{
  "label": "硚口区",
  "value": "420104" },

{
  "label": "汉阳区",
  "value": "420105" },

{
  "label": "武昌区",
  "value": "420106" },

{
  "label": "青山区",
  "value": "420107" },

{
  "label": "洪山区",
  "value": "420111" },

{
  "label": "东西湖区",
  "value": "420112" },

{
  "label": "汉南区",
  "value": "420113" },

{
  "label": "蔡甸区",
  "value": "420114" },

{
  "label": "江夏区",
  "value": "420115" },

{
  "label": "黄陂区",
  "value": "420116" },

{
  "label": "新洲区",
  "value": "420117" }],


[{
  "label": "黄石港区",
  "value": "420202" },

{
  "label": "西塞山区",
  "value": "420203" },

{
  "label": "下陆区",
  "value": "420204" },

{
  "label": "铁山区",
  "value": "420205" },

{
  "label": "阳新县",
  "value": "420222" },

{
  "label": "大冶市",
  "value": "420281" }],


[{
  "label": "茅箭区",
  "value": "420302" },

{
  "label": "张湾区",
  "value": "420303" },

{
  "label": "郧阳区",
  "value": "420304" },

{
  "label": "郧西县",
  "value": "420322" },

{
  "label": "竹山县",
  "value": "420323" },

{
  "label": "竹溪县",
  "value": "420324" },

{
  "label": "房县",
  "value": "420325" },

{
  "label": "丹江口市",
  "value": "420381" }],


[{
  "label": "西陵区",
  "value": "420502" },

{
  "label": "伍家岗区",
  "value": "420503" },

{
  "label": "点军区",
  "value": "420504" },

{
  "label": "猇亭区",
  "value": "420505" },

{
  "label": "夷陵区",
  "value": "420506" },

{
  "label": "远安县",
  "value": "420525" },

{
  "label": "兴山县",
  "value": "420526" },

{
  "label": "秭归县",
  "value": "420527" },

{
  "label": "长阳土家族自治县",
  "value": "420528" },

{
  "label": "五峰土家族自治县",
  "value": "420529" },

{
  "label": "宜都市",
  "value": "420581" },

{
  "label": "当阳市",
  "value": "420582" },

{
  "label": "枝江市",
  "value": "420583" }],


[{
  "label": "襄城区",
  "value": "420602" },

{
  "label": "樊城区",
  "value": "420606" },

{
  "label": "襄州区",
  "value": "420607" },

{
  "label": "南漳县",
  "value": "420624" },

{
  "label": "谷城县",
  "value": "420625" },

{
  "label": "保康县",
  "value": "420626" },

{
  "label": "老河口市",
  "value": "420682" },

{
  "label": "枣阳市",
  "value": "420683" },

{
  "label": "宜城市",
  "value": "420684" }],


[{
  "label": "梁子湖区",
  "value": "420702" },

{
  "label": "华容区",
  "value": "420703" },

{
  "label": "鄂城区",
  "value": "420704" }],


[{
  "label": "东宝区",
  "value": "420802" },

{
  "label": "掇刀区",
  "value": "420804" },

{
  "label": "京山县",
  "value": "420821" },

{
  "label": "沙洋县",
  "value": "420822" },

{
  "label": "钟祥市",
  "value": "420881" }],


[{
  "label": "孝南区",
  "value": "420902" },

{
  "label": "孝昌县",
  "value": "420921" },

{
  "label": "大悟县",
  "value": "420922" },

{
  "label": "云梦县",
  "value": "420923" },

{
  "label": "应城市",
  "value": "420981" },

{
  "label": "安陆市",
  "value": "420982" },

{
  "label": "汉川市",
  "value": "420984" }],


[{
  "label": "沙市区",
  "value": "421002" },

{
  "label": "荆州区",
  "value": "421003" },

{
  "label": "公安县",
  "value": "421022" },

{
  "label": "监利县",
  "value": "421023" },

{
  "label": "江陵县",
  "value": "421024" },

{
  "label": "荆州经济技术开发区",
  "value": "421071" },

{
  "label": "石首市",
  "value": "421081" },

{
  "label": "洪湖市",
  "value": "421083" },

{
  "label": "松滋市",
  "value": "421087" }],


[{
  "label": "黄州区",
  "value": "421102" },

{
  "label": "团风县",
  "value": "421121" },

{
  "label": "红安县",
  "value": "421122" },

{
  "label": "罗田县",
  "value": "421123" },

{
  "label": "英山县",
  "value": "421124" },

{
  "label": "浠水县",
  "value": "421125" },

{
  "label": "蕲春县",
  "value": "421126" },

{
  "label": "黄梅县",
  "value": "421127" },

{
  "label": "龙感湖管理区",
  "value": "421171" },

{
  "label": "麻城市",
  "value": "421181" },

{
  "label": "武穴市",
  "value": "421182" }],


[{
  "label": "咸安区",
  "value": "421202" },

{
  "label": "嘉鱼县",
  "value": "421221" },

{
  "label": "通城县",
  "value": "421222" },

{
  "label": "崇阳县",
  "value": "421223" },

{
  "label": "通山县",
  "value": "421224" },

{
  "label": "赤壁市",
  "value": "421281" }],


[{
  "label": "曾都区",
  "value": "421303" },

{
  "label": "随县",
  "value": "421321" },

{
  "label": "广水市",
  "value": "421381" }],


[{
  "label": "恩施市",
  "value": "422801" },

{
  "label": "利川市",
  "value": "422802" },

{
  "label": "建始县",
  "value": "422822" },

{
  "label": "巴东县",
  "value": "422823" },

{
  "label": "宣恩县",
  "value": "422825" },

{
  "label": "咸丰县",
  "value": "422826" },

{
  "label": "来凤县",
  "value": "422827" },

{
  "label": "鹤峰县",
  "value": "422828" }],


[{
  "label": "仙桃市",
  "value": "429004" },

{
  "label": "潜江市",
  "value": "429005" },

{
  "label": "天门市",
  "value": "429006" },

{
  "label": "神农架林区",
  "value": "429021" }]],



[
[{
  "label": "芙蓉区",
  "value": "430102" },

{
  "label": "天心区",
  "value": "430103" },

{
  "label": "岳麓区",
  "value": "430104" },

{
  "label": "开福区",
  "value": "430105" },

{
  "label": "雨花区",
  "value": "430111" },

{
  "label": "望城区",
  "value": "430112" },

{
  "label": "长沙县",
  "value": "430121" },

{
  "label": "浏阳市",
  "value": "430181" },

{
  "label": "宁乡市",
  "value": "430182" }],


[{
  "label": "荷塘区",
  "value": "430202" },

{
  "label": "芦淞区",
  "value": "430203" },

{
  "label": "石峰区",
  "value": "430204" },

{
  "label": "天元区",
  "value": "430211" },

{
  "label": "株洲县",
  "value": "430221" },

{
  "label": "攸县",
  "value": "430223" },

{
  "label": "茶陵县",
  "value": "430224" },

{
  "label": "炎陵县",
  "value": "430225" },

{
  "label": "云龙示范区",
  "value": "430271" },

{
  "label": "醴陵市",
  "value": "430281" }],


[{
  "label": "雨湖区",
  "value": "430302" },

{
  "label": "岳塘区",
  "value": "430304" },

{
  "label": "湘潭县",
  "value": "430321" },

{
  "label": "湖南湘潭高新技术产业园区",
  "value": "430371" },

{
  "label": "湘潭昭山示范区",
  "value": "430372" },

{
  "label": "湘潭九华示范区",
  "value": "430373" },

{
  "label": "湘乡市",
  "value": "430381" },

{
  "label": "韶山市",
  "value": "430382" }],


[{
  "label": "珠晖区",
  "value": "430405" },

{
  "label": "雁峰区",
  "value": "430406" },

{
  "label": "石鼓区",
  "value": "430407" },

{
  "label": "蒸湘区",
  "value": "430408" },

{
  "label": "南岳区",
  "value": "430412" },

{
  "label": "衡阳县",
  "value": "430421" },

{
  "label": "衡南县",
  "value": "430422" },

{
  "label": "衡山县",
  "value": "430423" },

{
  "label": "衡东县",
  "value": "430424" },

{
  "label": "祁东县",
  "value": "430426" },

{
  "label": "衡阳综合保税区",
  "value": "430471" },

{
  "label": "湖南衡阳高新技术产业园区",
  "value": "430472" },

{
  "label": "湖南衡阳松木经济开发区",
  "value": "430473" },

{
  "label": "耒阳市",
  "value": "430481" },

{
  "label": "常宁市",
  "value": "430482" }],


[{
  "label": "双清区",
  "value": "430502" },

{
  "label": "大祥区",
  "value": "430503" },

{
  "label": "北塔区",
  "value": "430511" },

{
  "label": "邵东县",
  "value": "430521" },

{
  "label": "新邵县",
  "value": "430522" },

{
  "label": "邵阳县",
  "value": "430523" },

{
  "label": "隆回县",
  "value": "430524" },

{
  "label": "洞口县",
  "value": "430525" },

{
  "label": "绥宁县",
  "value": "430527" },

{
  "label": "新宁县",
  "value": "430528" },

{
  "label": "城步苗族自治县",
  "value": "430529" },

{
  "label": "武冈市",
  "value": "430581" }],


[{
  "label": "岳阳楼区",
  "value": "430602" },

{
  "label": "云溪区",
  "value": "430603" },

{
  "label": "君山区",
  "value": "430611" },

{
  "label": "岳阳县",
  "value": "430621" },

{
  "label": "华容县",
  "value": "430623" },

{
  "label": "湘阴县",
  "value": "430624" },

{
  "label": "平江县",
  "value": "430626" },

{
  "label": "岳阳市屈原管理区",
  "value": "430671" },

{
  "label": "汨罗市",
  "value": "430681" },

{
  "label": "临湘市",
  "value": "430682" }],


[{
  "label": "武陵区",
  "value": "430702" },

{
  "label": "鼎城区",
  "value": "430703" },

{
  "label": "安乡县",
  "value": "430721" },

{
  "label": "汉寿县",
  "value": "430722" },

{
  "label": "澧县",
  "value": "430723" },

{
  "label": "临澧县",
  "value": "430724" },

{
  "label": "桃源县",
  "value": "430725" },

{
  "label": "石门县",
  "value": "430726" },

{
  "label": "常德市西洞庭管理区",
  "value": "430771" },

{
  "label": "津市市",
  "value": "430781" }],


[{
  "label": "永定区",
  "value": "430802" },

{
  "label": "武陵源区",
  "value": "430811" },

{
  "label": "慈利县",
  "value": "430821" },

{
  "label": "桑植县",
  "value": "430822" }],


[{
  "label": "资阳区",
  "value": "430902" },

{
  "label": "赫山区",
  "value": "430903" },

{
  "label": "南县",
  "value": "430921" },

{
  "label": "桃江县",
  "value": "430922" },

{
  "label": "安化县",
  "value": "430923" },

{
  "label": "益阳市大通湖管理区",
  "value": "430971" },

{
  "label": "湖南益阳高新技术产业园区",
  "value": "430972" },

{
  "label": "沅江市",
  "value": "430981" }],


[{
  "label": "北湖区",
  "value": "431002" },

{
  "label": "苏仙区",
  "value": "431003" },

{
  "label": "桂阳县",
  "value": "431021" },

{
  "label": "宜章县",
  "value": "431022" },

{
  "label": "永兴县",
  "value": "431023" },

{
  "label": "嘉禾县",
  "value": "431024" },

{
  "label": "临武县",
  "value": "431025" },

{
  "label": "汝城县",
  "value": "431026" },

{
  "label": "桂东县",
  "value": "431027" },

{
  "label": "安仁县",
  "value": "431028" },

{
  "label": "资兴市",
  "value": "431081" }],


[{
  "label": "零陵区",
  "value": "431102" },

{
  "label": "冷水滩区",
  "value": "431103" },

{
  "label": "祁阳县",
  "value": "431121" },

{
  "label": "东安县",
  "value": "431122" },

{
  "label": "双牌县",
  "value": "431123" },

{
  "label": "道县",
  "value": "431124" },

{
  "label": "江永县",
  "value": "431125" },

{
  "label": "宁远县",
  "value": "431126" },

{
  "label": "蓝山县",
  "value": "431127" },

{
  "label": "新田县",
  "value": "431128" },

{
  "label": "江华瑶族自治县",
  "value": "431129" },

{
  "label": "永州经济技术开发区",
  "value": "431171" },

{
  "label": "永州市金洞管理区",
  "value": "431172" },

{
  "label": "永州市回龙圩管理区",
  "value": "431173" }],


[{
  "label": "鹤城区",
  "value": "431202" },

{
  "label": "中方县",
  "value": "431221" },

{
  "label": "沅陵县",
  "value": "431222" },

{
  "label": "辰溪县",
  "value": "431223" },

{
  "label": "溆浦县",
  "value": "431224" },

{
  "label": "会同县",
  "value": "431225" },

{
  "label": "麻阳苗族自治县",
  "value": "431226" },

{
  "label": "新晃侗族自治县",
  "value": "431227" },

{
  "label": "芷江侗族自治县",
  "value": "431228" },

{
  "label": "靖州苗族侗族自治县",
  "value": "431229" },

{
  "label": "通道侗族自治县",
  "value": "431230" },

{
  "label": "怀化市洪江管理区",
  "value": "431271" },

{
  "label": "洪江市",
  "value": "431281" }],


[{
  "label": "娄星区",
  "value": "431302" },

{
  "label": "双峰县",
  "value": "431321" },

{
  "label": "新化县",
  "value": "431322" },

{
  "label": "冷水江市",
  "value": "431381" },

{
  "label": "涟源市",
  "value": "431382" }],


[{
  "label": "吉首市",
  "value": "433101" },

{
  "label": "泸溪县",
  "value": "433122" },

{
  "label": "凤凰县",
  "value": "433123" },

{
  "label": "花垣县",
  "value": "433124" },

{
  "label": "保靖县",
  "value": "433125" },

{
  "label": "古丈县",
  "value": "433126" },

{
  "label": "永顺县",
  "value": "433127" },

{
  "label": "龙山县",
  "value": "433130" },

{
  "label": "湖南吉首经济开发区",
  "value": "433172" },

{
  "label": "湖南永顺经济开发区",
  "value": "433173" }]],



[
[{
  "label": "荔湾区",
  "value": "440103" },

{
  "label": "越秀区",
  "value": "440104" },

{
  "label": "海珠区",
  "value": "440105" },

{
  "label": "天河区",
  "value": "440106" },

{
  "label": "白云区",
  "value": "440111" },

{
  "label": "黄埔区",
  "value": "440112" },

{
  "label": "番禺区",
  "value": "440113" },

{
  "label": "花都区",
  "value": "440114" },

{
  "label": "南沙区",
  "value": "440115" },

{
  "label": "从化区",
  "value": "440117" },

{
  "label": "增城区",
  "value": "440118" }],


[{
  "label": "武江区",
  "value": "440203" },

{
  "label": "浈江区",
  "value": "440204" },

{
  "label": "曲江区",
  "value": "440205" },

{
  "label": "始兴县",
  "value": "440222" },

{
  "label": "仁化县",
  "value": "440224" },

{
  "label": "翁源县",
  "value": "440229" },

{
  "label": "乳源瑶族自治县",
  "value": "440232" },

{
  "label": "新丰县",
  "value": "440233" },

{
  "label": "乐昌市",
  "value": "440281" },

{
  "label": "南雄市",
  "value": "440282" }],


[{
  "label": "罗湖区",
  "value": "440303" },

{
  "label": "福田区",
  "value": "440304" },

{
  "label": "南山区",
  "value": "440305" },

{
  "label": "宝安区",
  "value": "440306" },

{
  "label": "龙岗区",
  "value": "440307" },

{
  "label": "盐田区",
  "value": "440308" },

{
  "label": "龙华区",
  "value": "440309" },

{
  "label": "坪山区",
  "value": "440310" }],


[{
  "label": "香洲区",
  "value": "440402" },

{
  "label": "斗门区",
  "value": "440403" },

{
  "label": "金湾区",
  "value": "440404" }],


[{
  "label": "龙湖区",
  "value": "440507" },

{
  "label": "金平区",
  "value": "440511" },

{
  "label": "濠江区",
  "value": "440512" },

{
  "label": "潮阳区",
  "value": "440513" },

{
  "label": "潮南区",
  "value": "440514" },

{
  "label": "澄海区",
  "value": "440515" },

{
  "label": "南澳县",
  "value": "440523" }],


[{
  "label": "禅城区",
  "value": "440604" },

{
  "label": "南海区",
  "value": "440605" },

{
  "label": "顺德区",
  "value": "440606" },

{
  "label": "三水区",
  "value": "440607" },

{
  "label": "高明区",
  "value": "440608" }],


[{
  "label": "蓬江区",
  "value": "440703" },

{
  "label": "江海区",
  "value": "440704" },

{
  "label": "新会区",
  "value": "440705" },

{
  "label": "台山市",
  "value": "440781" },

{
  "label": "开平市",
  "value": "440783" },

{
  "label": "鹤山市",
  "value": "440784" },

{
  "label": "恩平市",
  "value": "440785" }],


[{
  "label": "赤坎区",
  "value": "440802" },

{
  "label": "霞山区",
  "value": "440803" },

{
  "label": "坡头区",
  "value": "440804" },

{
  "label": "麻章区",
  "value": "440811" },

{
  "label": "遂溪县",
  "value": "440823" },

{
  "label": "徐闻县",
  "value": "440825" },

{
  "label": "廉江市",
  "value": "440881" },

{
  "label": "雷州市",
  "value": "440882" },

{
  "label": "吴川市",
  "value": "440883" }],


[{
  "label": "茂南区",
  "value": "440902" },

{
  "label": "电白区",
  "value": "440904" },

{
  "label": "高州市",
  "value": "440981" },

{
  "label": "化州市",
  "value": "440982" },

{
  "label": "信宜市",
  "value": "440983" }],


[{
  "label": "端州区",
  "value": "441202" },

{
  "label": "鼎湖区",
  "value": "441203" },

{
  "label": "高要区",
  "value": "441204" },

{
  "label": "广宁县",
  "value": "441223" },

{
  "label": "怀集县",
  "value": "441224" },

{
  "label": "封开县",
  "value": "441225" },

{
  "label": "德庆县",
  "value": "441226" },

{
  "label": "四会市",
  "value": "441284" }],


[{
  "label": "惠城区",
  "value": "441302" },

{
  "label": "惠阳区",
  "value": "441303" },

{
  "label": "博罗县",
  "value": "441322" },

{
  "label": "惠东县",
  "value": "441323" },

{
  "label": "龙门县",
  "value": "441324" }],


[{
  "label": "梅江区",
  "value": "441402" },

{
  "label": "梅县区",
  "value": "441403" },

{
  "label": "大埔县",
  "value": "441422" },

{
  "label": "丰顺县",
  "value": "441423" },

{
  "label": "五华县",
  "value": "441424" },

{
  "label": "平远县",
  "value": "441426" },

{
  "label": "蕉岭县",
  "value": "441427" },

{
  "label": "兴宁市",
  "value": "441481" }],


[{
  "label": "城区",
  "value": "441502" },

{
  "label": "海丰县",
  "value": "441521" },

{
  "label": "陆河县",
  "value": "441523" },

{
  "label": "陆丰市",
  "value": "441581" }],


[{
  "label": "源城区",
  "value": "441602" },

{
  "label": "紫金县",
  "value": "441621" },

{
  "label": "龙川县",
  "value": "441622" },

{
  "label": "连平县",
  "value": "441623" },

{
  "label": "和平县",
  "value": "441624" },

{
  "label": "东源县",
  "value": "441625" }],


[{
  "label": "江城区",
  "value": "441702" },

{
  "label": "阳东区",
  "value": "441704" },

{
  "label": "阳西县",
  "value": "441721" },

{
  "label": "阳春市",
  "value": "441781" }],


[{
  "label": "清城区",
  "value": "441802" },

{
  "label": "清新区",
  "value": "441803" },

{
  "label": "佛冈县",
  "value": "441821" },

{
  "label": "阳山县",
  "value": "441823" },

{
  "label": "连山壮族瑶族自治县",
  "value": "441825" },

{
  "label": "连南瑶族自治县",
  "value": "441826" },

{
  "label": "英德市",
  "value": "441881" },

{
  "label": "连州市",
  "value": "441882" }],


[{
  "label": "东莞市",
  "value": "441900" }],

[{
  "label": "中山市",
  "value": "442000" }],

[{
  "label": "湘桥区",
  "value": "445102" },

{
  "label": "潮安区",
  "value": "445103" },

{
  "label": "饶平县",
  "value": "445122" }],


[{
  "label": "榕城区",
  "value": "445202" },

{
  "label": "揭东区",
  "value": "445203" },

{
  "label": "揭西县",
  "value": "445222" },

{
  "label": "惠来县",
  "value": "445224" },

{
  "label": "普宁市",
  "value": "445281" }],


[{
  "label": "云城区",
  "value": "445302" },

{
  "label": "云安区",
  "value": "445303" },

{
  "label": "新兴县",
  "value": "445321" },

{
  "label": "郁南县",
  "value": "445322" },

{
  "label": "罗定市",
  "value": "445381" }]],



[
[{
  "label": "兴宁区",
  "value": "450102" },

{
  "label": "青秀区",
  "value": "450103" },

{
  "label": "江南区",
  "value": "450105" },

{
  "label": "西乡塘区",
  "value": "450107" },

{
  "label": "良庆区",
  "value": "450108" },

{
  "label": "邕宁区",
  "value": "450109" },

{
  "label": "武鸣区",
  "value": "450110" },

{
  "label": "隆安县",
  "value": "450123" },

{
  "label": "马山县",
  "value": "450124" },

{
  "label": "上林县",
  "value": "450125" },

{
  "label": "宾阳县",
  "value": "450126" },

{
  "label": "横县",
  "value": "450127" }],


[{
  "label": "城中区",
  "value": "450202" },

{
  "label": "鱼峰区",
  "value": "450203" },

{
  "label": "柳南区",
  "value": "450204" },

{
  "label": "柳北区",
  "value": "450205" },

{
  "label": "柳江区",
  "value": "450206" },

{
  "label": "柳城县",
  "value": "450222" },

{
  "label": "鹿寨县",
  "value": "450223" },

{
  "label": "融安县",
  "value": "450224" },

{
  "label": "融水苗族自治县",
  "value": "450225" },

{
  "label": "三江侗族自治县",
  "value": "450226" }],


[{
  "label": "秀峰区",
  "value": "450302" },

{
  "label": "叠彩区",
  "value": "450303" },

{
  "label": "象山区",
  "value": "450304" },

{
  "label": "七星区",
  "value": "450305" },

{
  "label": "雁山区",
  "value": "450311" },

{
  "label": "临桂区",
  "value": "450312" },

{
  "label": "阳朔县",
  "value": "450321" },

{
  "label": "灵川县",
  "value": "450323" },

{
  "label": "全州县",
  "value": "450324" },

{
  "label": "兴安县",
  "value": "450325" },

{
  "label": "永福县",
  "value": "450326" },

{
  "label": "灌阳县",
  "value": "450327" },

{
  "label": "龙胜各族自治县",
  "value": "450328" },

{
  "label": "资源县",
  "value": "450329" },

{
  "label": "平乐县",
  "value": "450330" },

{
  "label": "荔浦县",
  "value": "450331" },

{
  "label": "恭城瑶族自治县",
  "value": "450332" }],


[{
  "label": "万秀区",
  "value": "450403" },

{
  "label": "长洲区",
  "value": "450405" },

{
  "label": "龙圩区",
  "value": "450406" },

{
  "label": "苍梧县",
  "value": "450421" },

{
  "label": "藤县",
  "value": "450422" },

{
  "label": "蒙山县",
  "value": "450423" },

{
  "label": "岑溪市",
  "value": "450481" }],


[{
  "label": "海城区",
  "value": "450502" },

{
  "label": "银海区",
  "value": "450503" },

{
  "label": "铁山港区",
  "value": "450512" },

{
  "label": "合浦县",
  "value": "450521" }],


[{
  "label": "港口区",
  "value": "450602" },

{
  "label": "防城区",
  "value": "450603" },

{
  "label": "上思县",
  "value": "450621" },

{
  "label": "东兴市",
  "value": "450681" }],


[{
  "label": "钦南区",
  "value": "450702" },

{
  "label": "钦北区",
  "value": "450703" },

{
  "label": "灵山县",
  "value": "450721" },

{
  "label": "浦北县",
  "value": "450722" }],


[{
  "label": "港北区",
  "value": "450802" },

{
  "label": "港南区",
  "value": "450803" },

{
  "label": "覃塘区",
  "value": "450804" },

{
  "label": "平南县",
  "value": "450821" },

{
  "label": "桂平市",
  "value": "450881" }],


[{
  "label": "玉州区",
  "value": "450902" },

{
  "label": "福绵区",
  "value": "450903" },

{
  "label": "容县",
  "value": "450921" },

{
  "label": "陆川县",
  "value": "450922" },

{
  "label": "博白县",
  "value": "450923" },

{
  "label": "兴业县",
  "value": "450924" },

{
  "label": "北流市",
  "value": "450981" }],


[{
  "label": "右江区",
  "value": "451002" },

{
  "label": "田阳县",
  "value": "451021" },

{
  "label": "田东县",
  "value": "451022" },

{
  "label": "平果县",
  "value": "451023" },

{
  "label": "德保县",
  "value": "451024" },

{
  "label": "那坡县",
  "value": "451026" },

{
  "label": "凌云县",
  "value": "451027" },

{
  "label": "乐业县",
  "value": "451028" },

{
  "label": "田林县",
  "value": "451029" },

{
  "label": "西林县",
  "value": "451030" },

{
  "label": "隆林各族自治县",
  "value": "451031" },

{
  "label": "靖西市",
  "value": "451081" }],


[{
  "label": "八步区",
  "value": "451102" },

{
  "label": "平桂区",
  "value": "451103" },

{
  "label": "昭平县",
  "value": "451121" },

{
  "label": "钟山县",
  "value": "451122" },

{
  "label": "富川瑶族自治县",
  "value": "451123" }],


[{
  "label": "金城江区",
  "value": "451202" },

{
  "label": "宜州区",
  "value": "451203" },

{
  "label": "南丹县",
  "value": "451221" },

{
  "label": "天峨县",
  "value": "451222" },

{
  "label": "凤山县",
  "value": "451223" },

{
  "label": "东兰县",
  "value": "451224" },

{
  "label": "罗城仫佬族自治县",
  "value": "451225" },

{
  "label": "环江毛南族自治县",
  "value": "451226" },

{
  "label": "巴马瑶族自治县",
  "value": "451227" },

{
  "label": "都安瑶族自治县",
  "value": "451228" },

{
  "label": "大化瑶族自治县",
  "value": "451229" }],


[{
  "label": "兴宾区",
  "value": "451302" },

{
  "label": "忻城县",
  "value": "451321" },

{
  "label": "象州县",
  "value": "451322" },

{
  "label": "武宣县",
  "value": "451323" },

{
  "label": "金秀瑶族自治县",
  "value": "451324" },

{
  "label": "合山市",
  "value": "451381" }],


[{
  "label": "江州区",
  "value": "451402" },

{
  "label": "扶绥县",
  "value": "451421" },

{
  "label": "宁明县",
  "value": "451422" },

{
  "label": "龙州县",
  "value": "451423" },

{
  "label": "大新县",
  "value": "451424" },

{
  "label": "天等县",
  "value": "451425" },

{
  "label": "凭祥市",
  "value": "451481" }]],



[
[{
  "label": "秀英区",
  "value": "460105" },

{
  "label": "龙华区",
  "value": "460106" },

{
  "label": "琼山区",
  "value": "460107" },

{
  "label": "美兰区",
  "value": "460108" }],


[{
  "label": "海棠区",
  "value": "460202" },

{
  "label": "吉阳区",
  "value": "460203" },

{
  "label": "天涯区",
  "value": "460204" },

{
  "label": "崖州区",
  "value": "460205" }],


[{
  "label": "西沙群岛",
  "value": "460321" },

{
  "label": "南沙群岛",
  "value": "460322" },

{
  "label": "中沙群岛的岛礁及其海域",
  "value": "460323" }],


[{
  "label": "儋州市",
  "value": "460400" }],

[{
  "label": "五指山市",
  "value": "469001" },

{
  "label": "琼海市",
  "value": "469002" },

{
  "label": "文昌市",
  "value": "469005" },

{
  "label": "万宁市",
  "value": "469006" },

{
  "label": "东方市",
  "value": "469007" },

{
  "label": "定安县",
  "value": "469021" },

{
  "label": "屯昌县",
  "value": "469022" },

{
  "label": "澄迈县",
  "value": "469023" },

{
  "label": "临高县",
  "value": "469024" },

{
  "label": "白沙黎族自治县",
  "value": "469025" },

{
  "label": "昌江黎族自治县",
  "value": "469026" },

{
  "label": "乐东黎族自治县",
  "value": "469027" },

{
  "label": "陵水黎族自治县",
  "value": "469028" },

{
  "label": "保亭黎族苗族自治县",
  "value": "469029" },

{
  "label": "琼中黎族苗族自治县",
  "value": "469030" }]],



[
[{
  "label": "万州区",
  "value": "500101" },

{
  "label": "涪陵区",
  "value": "500102" },

{
  "label": "渝中区",
  "value": "500103" },

{
  "label": "大渡口区",
  "value": "500104" },

{
  "label": "江北区",
  "value": "500105" },

{
  "label": "沙坪坝区",
  "value": "500106" },

{
  "label": "九龙坡区",
  "value": "500107" },

{
  "label": "南岸区",
  "value": "500108" },

{
  "label": "北碚区",
  "value": "500109" },

{
  "label": "綦江区",
  "value": "500110" },

{
  "label": "大足区",
  "value": "500111" },

{
  "label": "渝北区",
  "value": "500112" },

{
  "label": "巴南区",
  "value": "500113" },

{
  "label": "黔江区",
  "value": "500114" },

{
  "label": "长寿区",
  "value": "500115" },

{
  "label": "江津区",
  "value": "500116" },

{
  "label": "合川区",
  "value": "500117" },

{
  "label": "永川区",
  "value": "500118" },

{
  "label": "南川区",
  "value": "500119" },

{
  "label": "璧山区",
  "value": "500120" },

{
  "label": "铜梁区",
  "value": "500151" },

{
  "label": "潼南区",
  "value": "500152" },

{
  "label": "荣昌区",
  "value": "500153" },

{
  "label": "开州区",
  "value": "500154" },

{
  "label": "梁平区",
  "value": "500155" },

{
  "label": "武隆区",
  "value": "500156" }],


[{
  "label": "城口县",
  "value": "500229" },

{
  "label": "丰都县",
  "value": "500230" },

{
  "label": "垫江县",
  "value": "500231" },

{
  "label": "忠县",
  "value": "500233" },

{
  "label": "云阳县",
  "value": "500235" },

{
  "label": "奉节县",
  "value": "500236" },

{
  "label": "巫山县",
  "value": "500237" },

{
  "label": "巫溪县",
  "value": "500238" },

{
  "label": "石柱土家族自治县",
  "value": "500240" },

{
  "label": "秀山土家族苗族自治县",
  "value": "500241" },

{
  "label": "酉阳土家族苗族自治县",
  "value": "500242" },

{
  "label": "彭水苗族土家族自治县",
  "value": "500243" }]],



[
[{
  "label": "锦江区",
  "value": "510104" },

{
  "label": "青羊区",
  "value": "510105" },

{
  "label": "金牛区",
  "value": "510106" },

{
  "label": "武侯区",
  "value": "510107" },

{
  "label": "成华区",
  "value": "510108" },

{
  "label": "龙泉驿区",
  "value": "510112" },

{
  "label": "青白江区",
  "value": "510113" },

{
  "label": "新都区",
  "value": "510114" },

{
  "label": "温江区",
  "value": "510115" },

{
  "label": "双流区",
  "value": "510116" },

{
  "label": "郫都区",
  "value": "510117" },

{
  "label": "金堂县",
  "value": "510121" },

{
  "label": "大邑县",
  "value": "510129" },

{
  "label": "蒲江县",
  "value": "510131" },

{
  "label": "新津县",
  "value": "510132" },

{
  "label": "都江堰市",
  "value": "510181" },

{
  "label": "彭州市",
  "value": "510182" },

{
  "label": "邛崃市",
  "value": "510183" },

{
  "label": "崇州市",
  "value": "510184" },

{
  "label": "简阳市",
  "value": "510185" }],


[{
  "label": "自流井区",
  "value": "510302" },

{
  "label": "贡井区",
  "value": "510303" },

{
  "label": "大安区",
  "value": "510304" },

{
  "label": "沿滩区",
  "value": "510311" },

{
  "label": "荣县",
  "value": "510321" },

{
  "label": "富顺县",
  "value": "510322" }],


[{
  "label": "东区",
  "value": "510402" },

{
  "label": "西区",
  "value": "510403" },

{
  "label": "仁和区",
  "value": "510411" },

{
  "label": "米易县",
  "value": "510421" },

{
  "label": "盐边县",
  "value": "510422" }],


[{
  "label": "江阳区",
  "value": "510502" },

{
  "label": "纳溪区",
  "value": "510503" },

{
  "label": "龙马潭区",
  "value": "510504" },

{
  "label": "泸县",
  "value": "510521" },

{
  "label": "合江县",
  "value": "510522" },

{
  "label": "叙永县",
  "value": "510524" },

{
  "label": "古蔺县",
  "value": "510525" }],


[{
  "label": "旌阳区",
  "value": "510603" },

{
  "label": "罗江区",
  "value": "510604" },

{
  "label": "中江县",
  "value": "510623" },

{
  "label": "广汉市",
  "value": "510681" },

{
  "label": "什邡市",
  "value": "510682" },

{
  "label": "绵竹市",
  "value": "510683" }],


[{
  "label": "涪城区",
  "value": "510703" },

{
  "label": "游仙区",
  "value": "510704" },

{
  "label": "安州区",
  "value": "510705" },

{
  "label": "三台县",
  "value": "510722" },

{
  "label": "盐亭县",
  "value": "510723" },

{
  "label": "梓潼县",
  "value": "510725" },

{
  "label": "北川羌族自治县",
  "value": "510726" },

{
  "label": "平武县",
  "value": "510727" },

{
  "label": "江油市",
  "value": "510781" }],


[{
  "label": "利州区",
  "value": "510802" },

{
  "label": "昭化区",
  "value": "510811" },

{
  "label": "朝天区",
  "value": "510812" },

{
  "label": "旺苍县",
  "value": "510821" },

{
  "label": "青川县",
  "value": "510822" },

{
  "label": "剑阁县",
  "value": "510823" },

{
  "label": "苍溪县",
  "value": "510824" }],


[{
  "label": "船山区",
  "value": "510903" },

{
  "label": "安居区",
  "value": "510904" },

{
  "label": "蓬溪县",
  "value": "510921" },

{
  "label": "射洪县",
  "value": "510922" },

{
  "label": "大英县",
  "value": "510923" }],


[{
  "label": "市中区",
  "value": "511002" },

{
  "label": "东兴区",
  "value": "511011" },

{
  "label": "威远县",
  "value": "511024" },

{
  "label": "资中县",
  "value": "511025" },

{
  "label": "内江经济开发区",
  "value": "511071" },

{
  "label": "隆昌市",
  "value": "511083" }],


[{
  "label": "市中区",
  "value": "511102" },

{
  "label": "沙湾区",
  "value": "511111" },

{
  "label": "五通桥区",
  "value": "511112" },

{
  "label": "金口河区",
  "value": "511113" },

{
  "label": "犍为县",
  "value": "511123" },

{
  "label": "井研县",
  "value": "511124" },

{
  "label": "夹江县",
  "value": "511126" },

{
  "label": "沐川县",
  "value": "511129" },

{
  "label": "峨边彝族自治县",
  "value": "511132" },

{
  "label": "马边彝族自治县",
  "value": "511133" },

{
  "label": "峨眉山市",
  "value": "511181" }],


[{
  "label": "顺庆区",
  "value": "511302" },

{
  "label": "高坪区",
  "value": "511303" },

{
  "label": "嘉陵区",
  "value": "511304" },

{
  "label": "南部县",
  "value": "511321" },

{
  "label": "营山县",
  "value": "511322" },

{
  "label": "蓬安县",
  "value": "511323" },

{
  "label": "仪陇县",
  "value": "511324" },

{
  "label": "西充县",
  "value": "511325" },

{
  "label": "阆中市",
  "value": "511381" }],


[{
  "label": "东坡区",
  "value": "511402" },

{
  "label": "彭山区",
  "value": "511403" },

{
  "label": "仁寿县",
  "value": "511421" },

{
  "label": "洪雅县",
  "value": "511423" },

{
  "label": "丹棱县",
  "value": "511424" },

{
  "label": "青神县",
  "value": "511425" }],


[{
  "label": "翠屏区",
  "value": "511502" },

{
  "label": "南溪区",
  "value": "511503" },

{
  "label": "宜宾县",
  "value": "511521" },

{
  "label": "江安县",
  "value": "511523" },

{
  "label": "长宁县",
  "value": "511524" },

{
  "label": "高县",
  "value": "511525" },

{
  "label": "珙县",
  "value": "511526" },

{
  "label": "筠连县",
  "value": "511527" },

{
  "label": "兴文县",
  "value": "511528" },

{
  "label": "屏山县",
  "value": "511529" }],


[{
  "label": "广安区",
  "value": "511602" },

{
  "label": "前锋区",
  "value": "511603" },

{
  "label": "岳池县",
  "value": "511621" },

{
  "label": "武胜县",
  "value": "511622" },

{
  "label": "邻水县",
  "value": "511623" },

{
  "label": "华蓥市",
  "value": "511681" }],


[{
  "label": "通川区",
  "value": "511702" },

{
  "label": "达川区",
  "value": "511703" },

{
  "label": "宣汉县",
  "value": "511722" },

{
  "label": "开江县",
  "value": "511723" },

{
  "label": "大竹县",
  "value": "511724" },

{
  "label": "渠县",
  "value": "511725" },

{
  "label": "达州经济开发区",
  "value": "511771" },

{
  "label": "万源市",
  "value": "511781" }],


[{
  "label": "雨城区",
  "value": "511802" },

{
  "label": "名山区",
  "value": "511803" },

{
  "label": "荥经县",
  "value": "511822" },

{
  "label": "汉源县",
  "value": "511823" },

{
  "label": "石棉县",
  "value": "511824" },

{
  "label": "天全县",
  "value": "511825" },

{
  "label": "芦山县",
  "value": "511826" },

{
  "label": "宝兴县",
  "value": "511827" }],


[{
  "label": "巴州区",
  "value": "511902" },

{
  "label": "恩阳区",
  "value": "511903" },

{
  "label": "通江县",
  "value": "511921" },

{
  "label": "南江县",
  "value": "511922" },

{
  "label": "平昌县",
  "value": "511923" },

{
  "label": "巴中经济开发区",
  "value": "511971" }],


[{
  "label": "雁江区",
  "value": "512002" },

{
  "label": "安岳县",
  "value": "512021" },

{
  "label": "乐至县",
  "value": "512022" }],


[{
  "label": "马尔康市",
  "value": "513201" },

{
  "label": "汶川县",
  "value": "513221" },

{
  "label": "理县",
  "value": "513222" },

{
  "label": "茂县",
  "value": "513223" },

{
  "label": "松潘县",
  "value": "513224" },

{
  "label": "九寨沟县",
  "value": "513225" },

{
  "label": "金川县",
  "value": "513226" },

{
  "label": "小金县",
  "value": "513227" },

{
  "label": "黑水县",
  "value": "513228" },

{
  "label": "壤塘县",
  "value": "513230" },

{
  "label": "阿坝县",
  "value": "513231" },

{
  "label": "若尔盖县",
  "value": "513232" },

{
  "label": "红原县",
  "value": "513233" }],


[{
  "label": "康定市",
  "value": "513301" },

{
  "label": "泸定县",
  "value": "513322" },

{
  "label": "丹巴县",
  "value": "513323" },

{
  "label": "九龙县",
  "value": "513324" },

{
  "label": "雅江县",
  "value": "513325" },

{
  "label": "道孚县",
  "value": "513326" },

{
  "label": "炉霍县",
  "value": "513327" },

{
  "label": "甘孜县",
  "value": "513328" },

{
  "label": "新龙县",
  "value": "513329" },

{
  "label": "德格县",
  "value": "513330" },

{
  "label": "白玉县",
  "value": "513331" },

{
  "label": "石渠县",
  "value": "513332" },

{
  "label": "色达县",
  "value": "513333" },

{
  "label": "理塘县",
  "value": "513334" },

{
  "label": "巴塘县",
  "value": "513335" },

{
  "label": "乡城县",
  "value": "513336" },

{
  "label": "稻城县",
  "value": "513337" },

{
  "label": "得荣县",
  "value": "513338" }],


[{
  "label": "西昌市",
  "value": "513401" },

{
  "label": "木里藏族自治县",
  "value": "513422" },

{
  "label": "盐源县",
  "value": "513423" },

{
  "label": "德昌县",
  "value": "513424" },

{
  "label": "会理县",
  "value": "513425" },

{
  "label": "会东县",
  "value": "513426" },

{
  "label": "宁南县",
  "value": "513427" },

{
  "label": "普格县",
  "value": "513428" },

{
  "label": "布拖县",
  "value": "513429" },

{
  "label": "金阳县",
  "value": "513430" },

{
  "label": "昭觉县",
  "value": "513431" },

{
  "label": "喜德县",
  "value": "513432" },

{
  "label": "冕宁县",
  "value": "513433" },

{
  "label": "越西县",
  "value": "513434" },

{
  "label": "甘洛县",
  "value": "513435" },

{
  "label": "美姑县",
  "value": "513436" },

{
  "label": "雷波县",
  "value": "513437" }]],



[
[{
  "label": "南明区",
  "value": "520102" },

{
  "label": "云岩区",
  "value": "520103" },

{
  "label": "花溪区",
  "value": "520111" },

{
  "label": "乌当区",
  "value": "520112" },

{
  "label": "白云区",
  "value": "520113" },

{
  "label": "观山湖区",
  "value": "520115" },

{
  "label": "开阳县",
  "value": "520121" },

{
  "label": "息烽县",
  "value": "520122" },

{
  "label": "修文县",
  "value": "520123" },

{
  "label": "清镇市",
  "value": "520181" }],


[{
  "label": "钟山区",
  "value": "520201" },

{
  "label": "六枝特区",
  "value": "520203" },

{
  "label": "水城县",
  "value": "520221" },

{
  "label": "盘州市",
  "value": "520281" }],


[{
  "label": "红花岗区",
  "value": "520302" },

{
  "label": "汇川区",
  "value": "520303" },

{
  "label": "播州区",
  "value": "520304" },

{
  "label": "桐梓县",
  "value": "520322" },

{
  "label": "绥阳县",
  "value": "520323" },

{
  "label": "正安县",
  "value": "520324" },

{
  "label": "道真仡佬族苗族自治县",
  "value": "520325" },

{
  "label": "务川仡佬族苗族自治县",
  "value": "520326" },

{
  "label": "凤冈县",
  "value": "520327" },

{
  "label": "湄潭县",
  "value": "520328" },

{
  "label": "余庆县",
  "value": "520329" },

{
  "label": "习水县",
  "value": "520330" },

{
  "label": "赤水市",
  "value": "520381" },

{
  "label": "仁怀市",
  "value": "520382" }],


[{
  "label": "西秀区",
  "value": "520402" },

{
  "label": "平坝区",
  "value": "520403" },

{
  "label": "普定县",
  "value": "520422" },

{
  "label": "镇宁布依族苗族自治县",
  "value": "520423" },

{
  "label": "关岭布依族苗族自治县",
  "value": "520424" },

{
  "label": "紫云苗族布依族自治县",
  "value": "520425" }],


[{
  "label": "七星关区",
  "value": "520502" },

{
  "label": "大方县",
  "value": "520521" },

{
  "label": "黔西县",
  "value": "520522" },

{
  "label": "金沙县",
  "value": "520523" },

{
  "label": "织金县",
  "value": "520524" },

{
  "label": "纳雍县",
  "value": "520525" },

{
  "label": "威宁彝族回族苗族自治县",
  "value": "520526" },

{
  "label": "赫章县",
  "value": "520527" }],


[{
  "label": "碧江区",
  "value": "520602" },

{
  "label": "万山区",
  "value": "520603" },

{
  "label": "江口县",
  "value": "520621" },

{
  "label": "玉屏侗族自治县",
  "value": "520622" },

{
  "label": "石阡县",
  "value": "520623" },

{
  "label": "思南县",
  "value": "520624" },

{
  "label": "印江土家族苗族自治县",
  "value": "520625" },

{
  "label": "德江县",
  "value": "520626" },

{
  "label": "沿河土家族自治县",
  "value": "520627" },

{
  "label": "松桃苗族自治县",
  "value": "520628" }],


[{
  "label": "兴义市",
  "value": "522301" },

{
  "label": "兴仁县",
  "value": "522322" },

{
  "label": "普安县",
  "value": "522323" },

{
  "label": "晴隆县",
  "value": "522324" },

{
  "label": "贞丰县",
  "value": "522325" },

{
  "label": "望谟县",
  "value": "522326" },

{
  "label": "册亨县",
  "value": "522327" },

{
  "label": "安龙县",
  "value": "522328" }],


[{
  "label": "凯里市",
  "value": "522601" },

{
  "label": "黄平县",
  "value": "522622" },

{
  "label": "施秉县",
  "value": "522623" },

{
  "label": "三穗县",
  "value": "522624" },

{
  "label": "镇远县",
  "value": "522625" },

{
  "label": "岑巩县",
  "value": "522626" },

{
  "label": "天柱县",
  "value": "522627" },

{
  "label": "锦屏县",
  "value": "522628" },

{
  "label": "剑河县",
  "value": "522629" },

{
  "label": "台江县",
  "value": "522630" },

{
  "label": "黎平县",
  "value": "522631" },

{
  "label": "榕江县",
  "value": "522632" },

{
  "label": "从江县",
  "value": "522633" },

{
  "label": "雷山县",
  "value": "522634" },

{
  "label": "麻江县",
  "value": "522635" },

{
  "label": "丹寨县",
  "value": "522636" }],


[{
  "label": "都匀市",
  "value": "522701" },

{
  "label": "福泉市",
  "value": "522702" },

{
  "label": "荔波县",
  "value": "522722" },

{
  "label": "贵定县",
  "value": "522723" },

{
  "label": "瓮安县",
  "value": "522725" },

{
  "label": "独山县",
  "value": "522726" },

{
  "label": "平塘县",
  "value": "522727" },

{
  "label": "罗甸县",
  "value": "522728" },

{
  "label": "长顺县",
  "value": "522729" },

{
  "label": "龙里县",
  "value": "522730" },

{
  "label": "惠水县",
  "value": "522731" },

{
  "label": "三都水族自治县",
  "value": "522732" }]],



[
[{
  "label": "五华区",
  "value": "530102" },

{
  "label": "盘龙区",
  "value": "530103" },

{
  "label": "官渡区",
  "value": "530111" },

{
  "label": "西山区",
  "value": "530112" },

{
  "label": "东川区",
  "value": "530113" },

{
  "label": "呈贡区",
  "value": "530114" },

{
  "label": "晋宁区",
  "value": "530115" },

{
  "label": "富民县",
  "value": "530124" },

{
  "label": "宜良县",
  "value": "530125" },

{
  "label": "石林彝族自治县",
  "value": "530126" },

{
  "label": "嵩明县",
  "value": "530127" },

{
  "label": "禄劝彝族苗族自治县",
  "value": "530128" },

{
  "label": "寻甸回族彝族自治县",
  "value": "530129" },

{
  "label": "安宁市",
  "value": "530181" }],


[{
  "label": "麒麟区",
  "value": "530302" },

{
  "label": "沾益区",
  "value": "530303" },

{
  "label": "马龙县",
  "value": "530321" },

{
  "label": "陆良县",
  "value": "530322" },

{
  "label": "师宗县",
  "value": "530323" },

{
  "label": "罗平县",
  "value": "530324" },

{
  "label": "富源县",
  "value": "530325" },

{
  "label": "会泽县",
  "value": "530326" },

{
  "label": "宣威市",
  "value": "530381" }],


[{
  "label": "红塔区",
  "value": "530402" },

{
  "label": "江川区",
  "value": "530403" },

{
  "label": "澄江县",
  "value": "530422" },

{
  "label": "通海县",
  "value": "530423" },

{
  "label": "华宁县",
  "value": "530424" },

{
  "label": "易门县",
  "value": "530425" },

{
  "label": "峨山彝族自治县",
  "value": "530426" },

{
  "label": "新平彝族傣族自治县",
  "value": "530427" },

{
  "label": "元江哈尼族彝族傣族自治县",
  "value": "530428" }],


[{
  "label": "隆阳区",
  "value": "530502" },

{
  "label": "施甸县",
  "value": "530521" },

{
  "label": "龙陵县",
  "value": "530523" },

{
  "label": "昌宁县",
  "value": "530524" },

{
  "label": "腾冲市",
  "value": "530581" }],


[{
  "label": "昭阳区",
  "value": "530602" },

{
  "label": "鲁甸县",
  "value": "530621" },

{
  "label": "巧家县",
  "value": "530622" },

{
  "label": "盐津县",
  "value": "530623" },

{
  "label": "大关县",
  "value": "530624" },

{
  "label": "永善县",
  "value": "530625" },

{
  "label": "绥江县",
  "value": "530626" },

{
  "label": "镇雄县",
  "value": "530627" },

{
  "label": "彝良县",
  "value": "530628" },

{
  "label": "威信县",
  "value": "530629" },

{
  "label": "水富县",
  "value": "530630" }],


[{
  "label": "古城区",
  "value": "530702" },

{
  "label": "玉龙纳西族自治县",
  "value": "530721" },

{
  "label": "永胜县",
  "value": "530722" },

{
  "label": "华坪县",
  "value": "530723" },

{
  "label": "宁蒗彝族自治县",
  "value": "530724" }],


[{
  "label": "思茅区",
  "value": "530802" },

{
  "label": "宁洱哈尼族彝族自治县",
  "value": "530821" },

{
  "label": "墨江哈尼族自治县",
  "value": "530822" },

{
  "label": "景东彝族自治县",
  "value": "530823" },

{
  "label": "景谷傣族彝族自治县",
  "value": "530824" },

{
  "label": "镇沅彝族哈尼族拉祜族自治县",
  "value": "530825" },

{
  "label": "江城哈尼族彝族自治县",
  "value": "530826" },

{
  "label": "孟连傣族拉祜族佤族自治县",
  "value": "530827" },

{
  "label": "澜沧拉祜族自治县",
  "value": "530828" },

{
  "label": "西盟佤族自治县",
  "value": "530829" }],


[{
  "label": "临翔区",
  "value": "530902" },

{
  "label": "凤庆县",
  "value": "530921" },

{
  "label": "云县",
  "value": "530922" },

{
  "label": "永德县",
  "value": "530923" },

{
  "label": "镇康县",
  "value": "530924" },

{
  "label": "双江拉祜族佤族布朗族傣族自治县",
  "value": "530925" },

{
  "label": "耿马傣族佤族自治县",
  "value": "530926" },

{
  "label": "沧源佤族自治县",
  "value": "530927" }],


[{
  "label": "楚雄市",
  "value": "532301" },

{
  "label": "双柏县",
  "value": "532322" },

{
  "label": "牟定县",
  "value": "532323" },

{
  "label": "南华县",
  "value": "532324" },

{
  "label": "姚安县",
  "value": "532325" },

{
  "label": "大姚县",
  "value": "532326" },

{
  "label": "永仁县",
  "value": "532327" },

{
  "label": "元谋县",
  "value": "532328" },

{
  "label": "武定县",
  "value": "532329" },

{
  "label": "禄丰县",
  "value": "532331" }],


[{
  "label": "个旧市",
  "value": "532501" },

{
  "label": "开远市",
  "value": "532502" },

{
  "label": "蒙自市",
  "value": "532503" },

{
  "label": "弥勒市",
  "value": "532504" },

{
  "label": "屏边苗族自治县",
  "value": "532523" },

{
  "label": "建水县",
  "value": "532524" },

{
  "label": "石屏县",
  "value": "532525" },

{
  "label": "泸西县",
  "value": "532527" },

{
  "label": "元阳县",
  "value": "532528" },

{
  "label": "红河县",
  "value": "532529" },

{
  "label": "金平苗族瑶族傣族自治县",
  "value": "532530" },

{
  "label": "绿春县",
  "value": "532531" },

{
  "label": "河口瑶族自治县",
  "value": "532532" }],


[{
  "label": "文山市",
  "value": "532601" },

{
  "label": "砚山县",
  "value": "532622" },

{
  "label": "西畴县",
  "value": "532623" },

{
  "label": "麻栗坡县",
  "value": "532624" },

{
  "label": "马关县",
  "value": "532625" },

{
  "label": "丘北县",
  "value": "532626" },

{
  "label": "广南县",
  "value": "532627" },

{
  "label": "富宁县",
  "value": "532628" }],


[{
  "label": "景洪市",
  "value": "532801" },

{
  "label": "勐海县",
  "value": "532822" },

{
  "label": "勐腊县",
  "value": "532823" }],


[{
  "label": "大理市",
  "value": "532901" },

{
  "label": "漾濞彝族自治县",
  "value": "532922" },

{
  "label": "祥云县",
  "value": "532923" },

{
  "label": "宾川县",
  "value": "532924" },

{
  "label": "弥渡县",
  "value": "532925" },

{
  "label": "南涧彝族自治县",
  "value": "532926" },

{
  "label": "巍山彝族回族自治县",
  "value": "532927" },

{
  "label": "永平县",
  "value": "532928" },

{
  "label": "云龙县",
  "value": "532929" },

{
  "label": "洱源县",
  "value": "532930" },

{
  "label": "剑川县",
  "value": "532931" },

{
  "label": "鹤庆县",
  "value": "532932" }],


[{
  "label": "瑞丽市",
  "value": "533102" },

{
  "label": "芒市",
  "value": "533103" },

{
  "label": "梁河县",
  "value": "533122" },

{
  "label": "盈江县",
  "value": "533123" },

{
  "label": "陇川县",
  "value": "533124" }],


[{
  "label": "泸水市",
  "value": "533301" },

{
  "label": "福贡县",
  "value": "533323" },

{
  "label": "贡山独龙族怒族自治县",
  "value": "533324" },

{
  "label": "兰坪白族普米族自治县",
  "value": "533325" }],


[{
  "label": "香格里拉市",
  "value": "533401" },

{
  "label": "德钦县",
  "value": "533422" },

{
  "label": "维西傈僳族自治县",
  "value": "533423" }]],



[
[{
  "label": "城关区",
  "value": "540102" },

{
  "label": "堆龙德庆区",
  "value": "540103" },

{
  "label": "林周县",
  "value": "540121" },

{
  "label": "当雄县",
  "value": "540122" },

{
  "label": "尼木县",
  "value": "540123" },

{
  "label": "曲水县",
  "value": "540124" },

{
  "label": "达孜县",
  "value": "540126" },

{
  "label": "墨竹工卡县",
  "value": "540127" },

{
  "label": "格尔木藏青工业园区",
  "value": "540171" },

{
  "label": "拉萨经济技术开发区",
  "value": "540172" },

{
  "label": "西藏文化旅游创意园区",
  "value": "540173" },

{
  "label": "达孜工业园区",
  "value": "540174" }],


[{
  "label": "桑珠孜区",
  "value": "540202" },

{
  "label": "南木林县",
  "value": "540221" },

{
  "label": "江孜县",
  "value": "540222" },

{
  "label": "定日县",
  "value": "540223" },

{
  "label": "萨迦县",
  "value": "540224" },

{
  "label": "拉孜县",
  "value": "540225" },

{
  "label": "昂仁县",
  "value": "540226" },

{
  "label": "谢通门县",
  "value": "540227" },

{
  "label": "白朗县",
  "value": "540228" },

{
  "label": "仁布县",
  "value": "540229" },

{
  "label": "康马县",
  "value": "540230" },

{
  "label": "定结县",
  "value": "540231" },

{
  "label": "仲巴县",
  "value": "540232" },

{
  "label": "亚东县",
  "value": "540233" },

{
  "label": "吉隆县",
  "value": "540234" },

{
  "label": "聂拉木县",
  "value": "540235" },

{
  "label": "萨嘎县",
  "value": "540236" },

{
  "label": "岗巴县",
  "value": "540237" }],


[{
  "label": "卡若区",
  "value": "540302" },

{
  "label": "江达县",
  "value": "540321" },

{
  "label": "贡觉县",
  "value": "540322" },

{
  "label": "类乌齐县",
  "value": "540323" },

{
  "label": "丁青县",
  "value": "540324" },

{
  "label": "察雅县",
  "value": "540325" },

{
  "label": "八宿县",
  "value": "540326" },

{
  "label": "左贡县",
  "value": "540327" },

{
  "label": "芒康县",
  "value": "540328" },

{
  "label": "洛隆县",
  "value": "540329" },

{
  "label": "边坝县",
  "value": "540330" }],


[{
  "label": "巴宜区",
  "value": "540402" },

{
  "label": "工布江达县",
  "value": "540421" },

{
  "label": "米林县",
  "value": "540422" },

{
  "label": "墨脱县",
  "value": "540423" },

{
  "label": "波密县",
  "value": "540424" },

{
  "label": "察隅县",
  "value": "540425" },

{
  "label": "朗县",
  "value": "540426" }],


[{
  "label": "乃东区",
  "value": "540502" },

{
  "label": "扎囊县",
  "value": "540521" },

{
  "label": "贡嘎县",
  "value": "540522" },

{
  "label": "桑日县",
  "value": "540523" },

{
  "label": "琼结县",
  "value": "540524" },

{
  "label": "曲松县",
  "value": "540525" },

{
  "label": "措美县",
  "value": "540526" },

{
  "label": "洛扎县",
  "value": "540527" },

{
  "label": "加查县",
  "value": "540528" },

{
  "label": "隆子县",
  "value": "540529" },

{
  "label": "错那县",
  "value": "540530" },

{
  "label": "浪卡子县",
  "value": "540531" }],


[{
  "label": "那曲县",
  "value": "542421" },

{
  "label": "嘉黎县",
  "value": "542422" },

{
  "label": "比如县",
  "value": "542423" },

{
  "label": "聂荣县",
  "value": "542424" },

{
  "label": "安多县",
  "value": "542425" },

{
  "label": "申扎县",
  "value": "542426" },

{
  "label": "索县",
  "value": "542427" },

{
  "label": "班戈县",
  "value": "542428" },

{
  "label": "巴青县",
  "value": "542429" },

{
  "label": "尼玛县",
  "value": "542430" },

{
  "label": "双湖县",
  "value": "542431" }],


[{
  "label": "普兰县",
  "value": "542521" },

{
  "label": "札达县",
  "value": "542522" },

{
  "label": "噶尔县",
  "value": "542523" },

{
  "label": "日土县",
  "value": "542524" },

{
  "label": "革吉县",
  "value": "542525" },

{
  "label": "改则县",
  "value": "542526" },

{
  "label": "措勤县",
  "value": "542527" }]],



[
[{
  "label": "新城区",
  "value": "610102" },

{
  "label": "碑林区",
  "value": "610103" },

{
  "label": "莲湖区",
  "value": "610104" },

{
  "label": "灞桥区",
  "value": "610111" },

{
  "label": "未央区",
  "value": "610112" },

{
  "label": "雁塔区",
  "value": "610113" },

{
  "label": "阎良区",
  "value": "610114" },

{
  "label": "临潼区",
  "value": "610115" },

{
  "label": "长安区",
  "value": "610116" },

{
  "label": "高陵区",
  "value": "610117" },

{
  "label": "鄠邑区",
  "value": "610118" },

{
  "label": "蓝田县",
  "value": "610122" },

{
  "label": "周至县",
  "value": "610124" }],


[{
  "label": "王益区",
  "value": "610202" },

{
  "label": "印台区",
  "value": "610203" },

{
  "label": "耀州区",
  "value": "610204" },

{
  "label": "宜君县",
  "value": "610222" }],


[{
  "label": "渭滨区",
  "value": "610302" },

{
  "label": "金台区",
  "value": "610303" },

{
  "label": "陈仓区",
  "value": "610304" },

{
  "label": "凤翔县",
  "value": "610322" },

{
  "label": "岐山县",
  "value": "610323" },

{
  "label": "扶风县",
  "value": "610324" },

{
  "label": "眉县",
  "value": "610326" },

{
  "label": "陇县",
  "value": "610327" },

{
  "label": "千阳县",
  "value": "610328" },

{
  "label": "麟游县",
  "value": "610329" },

{
  "label": "凤县",
  "value": "610330" },

{
  "label": "太白县",
  "value": "610331" }],


[{
  "label": "秦都区",
  "value": "610402" },

{
  "label": "杨陵区",
  "value": "610403" },

{
  "label": "渭城区",
  "value": "610404" },

{
  "label": "三原县",
  "value": "610422" },

{
  "label": "泾阳县",
  "value": "610423" },

{
  "label": "乾县",
  "value": "610424" },

{
  "label": "礼泉县",
  "value": "610425" },

{
  "label": "永寿县",
  "value": "610426" },

{
  "label": "彬县",
  "value": "610427" },

{
  "label": "长武县",
  "value": "610428" },

{
  "label": "旬邑县",
  "value": "610429" },

{
  "label": "淳化县",
  "value": "610430" },

{
  "label": "武功县",
  "value": "610431" },

{
  "label": "兴平市",
  "value": "610481" }],


[{
  "label": "临渭区",
  "value": "610502" },

{
  "label": "华州区",
  "value": "610503" },

{
  "label": "潼关县",
  "value": "610522" },

{
  "label": "大荔县",
  "value": "610523" },

{
  "label": "合阳县",
  "value": "610524" },

{
  "label": "澄城县",
  "value": "610525" },

{
  "label": "蒲城县",
  "value": "610526" },

{
  "label": "白水县",
  "value": "610527" },

{
  "label": "富平县",
  "value": "610528" },

{
  "label": "韩城市",
  "value": "610581" },

{
  "label": "华阴市",
  "value": "610582" }],


[{
  "label": "宝塔区",
  "value": "610602" },

{
  "label": "安塞区",
  "value": "610603" },

{
  "label": "延长县",
  "value": "610621" },

{
  "label": "延川县",
  "value": "610622" },

{
  "label": "子长县",
  "value": "610623" },

{
  "label": "志丹县",
  "value": "610625" },

{
  "label": "吴起县",
  "value": "610626" },

{
  "label": "甘泉县",
  "value": "610627" },

{
  "label": "富县",
  "value": "610628" },

{
  "label": "洛川县",
  "value": "610629" },

{
  "label": "宜川县",
  "value": "610630" },

{
  "label": "黄龙县",
  "value": "610631" },

{
  "label": "黄陵县",
  "value": "610632" }],


[{
  "label": "汉台区",
  "value": "610702" },

{
  "label": "南郑区",
  "value": "610703" },

{
  "label": "城固县",
  "value": "610722" },

{
  "label": "洋县",
  "value": "610723" },

{
  "label": "西乡县",
  "value": "610724" },

{
  "label": "勉县",
  "value": "610725" },

{
  "label": "宁强县",
  "value": "610726" },

{
  "label": "略阳县",
  "value": "610727" },

{
  "label": "镇巴县",
  "value": "610728" },

{
  "label": "留坝县",
  "value": "610729" },

{
  "label": "佛坪县",
  "value": "610730" }],


[{
  "label": "榆阳区",
  "value": "610802" },

{
  "label": "横山区",
  "value": "610803" },

{
  "label": "府谷县",
  "value": "610822" },

{
  "label": "靖边县",
  "value": "610824" },

{
  "label": "定边县",
  "value": "610825" },

{
  "label": "绥德县",
  "value": "610826" },

{
  "label": "米脂县",
  "value": "610827" },

{
  "label": "佳县",
  "value": "610828" },

{
  "label": "吴堡县",
  "value": "610829" },

{
  "label": "清涧县",
  "value": "610830" },

{
  "label": "子洲县",
  "value": "610831" },

{
  "label": "神木市",
  "value": "610881" }],


[{
  "label": "汉滨区",
  "value": "610902" },

{
  "label": "汉阴县",
  "value": "610921" },

{
  "label": "石泉县",
  "value": "610922" },

{
  "label": "宁陕县",
  "value": "610923" },

{
  "label": "紫阳县",
  "value": "610924" },

{
  "label": "岚皋县",
  "value": "610925" },

{
  "label": "平利县",
  "value": "610926" },

{
  "label": "镇坪县",
  "value": "610927" },

{
  "label": "旬阳县",
  "value": "610928" },

{
  "label": "白河县",
  "value": "610929" }],


[{
  "label": "商州区",
  "value": "611002" },

{
  "label": "洛南县",
  "value": "611021" },

{
  "label": "丹凤县",
  "value": "611022" },

{
  "label": "商南县",
  "value": "611023" },

{
  "label": "山阳县",
  "value": "611024" },

{
  "label": "镇安县",
  "value": "611025" },

{
  "label": "柞水县",
  "value": "611026" }]],



[
[{
  "label": "城关区",
  "value": "620102" },

{
  "label": "七里河区",
  "value": "620103" },

{
  "label": "西固区",
  "value": "620104" },

{
  "label": "安宁区",
  "value": "620105" },

{
  "label": "红古区",
  "value": "620111" },

{
  "label": "永登县",
  "value": "620121" },

{
  "label": "皋兰县",
  "value": "620122" },

{
  "label": "榆中县",
  "value": "620123" },

{
  "label": "兰州新区",
  "value": "620171" }],


[{
  "label": "嘉峪关市",
  "value": "620201" }],

[{
  "label": "金川区",
  "value": "620302" },

{
  "label": "永昌县",
  "value": "620321" }],


[{
  "label": "白银区",
  "value": "620402" },

{
  "label": "平川区",
  "value": "620403" },

{
  "label": "靖远县",
  "value": "620421" },

{
  "label": "会宁县",
  "value": "620422" },

{
  "label": "景泰县",
  "value": "620423" }],


[{
  "label": "秦州区",
  "value": "620502" },

{
  "label": "麦积区",
  "value": "620503" },

{
  "label": "清水县",
  "value": "620521" },

{
  "label": "秦安县",
  "value": "620522" },

{
  "label": "甘谷县",
  "value": "620523" },

{
  "label": "武山县",
  "value": "620524" },

{
  "label": "张家川回族自治县",
  "value": "620525" }],


[{
  "label": "凉州区",
  "value": "620602" },

{
  "label": "民勤县",
  "value": "620621" },

{
  "label": "古浪县",
  "value": "620622" },

{
  "label": "天祝藏族自治县",
  "value": "620623" }],


[{
  "label": "甘州区",
  "value": "620702" },

{
  "label": "肃南裕固族自治县",
  "value": "620721" },

{
  "label": "民乐县",
  "value": "620722" },

{
  "label": "临泽县",
  "value": "620723" },

{
  "label": "高台县",
  "value": "620724" },

{
  "label": "山丹县",
  "value": "620725" }],


[{
  "label": "崆峒区",
  "value": "620802" },

{
  "label": "泾川县",
  "value": "620821" },

{
  "label": "灵台县",
  "value": "620822" },

{
  "label": "崇信县",
  "value": "620823" },

{
  "label": "华亭县",
  "value": "620824" },

{
  "label": "庄浪县",
  "value": "620825" },

{
  "label": "静宁县",
  "value": "620826" },

{
  "label": "平凉工业园区",
  "value": "620871" }],


[{
  "label": "肃州区",
  "value": "620902" },

{
  "label": "金塔县",
  "value": "620921" },

{
  "label": "瓜州县",
  "value": "620922" },

{
  "label": "肃北蒙古族自治县",
  "value": "620923" },

{
  "label": "阿克塞哈萨克族自治县",
  "value": "620924" },

{
  "label": "玉门市",
  "value": "620981" },

{
  "label": "敦煌市",
  "value": "620982" }],


[{
  "label": "西峰区",
  "value": "621002" },

{
  "label": "庆城县",
  "value": "621021" },

{
  "label": "环县",
  "value": "621022" },

{
  "label": "华池县",
  "value": "621023" },

{
  "label": "合水县",
  "value": "621024" },

{
  "label": "正宁县",
  "value": "621025" },

{
  "label": "宁县",
  "value": "621026" },

{
  "label": "镇原县",
  "value": "621027" }],


[{
  "label": "安定区",
  "value": "621102" },

{
  "label": "通渭县",
  "value": "621121" },

{
  "label": "陇西县",
  "value": "621122" },

{
  "label": "渭源县",
  "value": "621123" },

{
  "label": "临洮县",
  "value": "621124" },

{
  "label": "漳县",
  "value": "621125" },

{
  "label": "岷县",
  "value": "621126" }],


[{
  "label": "武都区",
  "value": "621202" },

{
  "label": "成县",
  "value": "621221" },

{
  "label": "文县",
  "value": "621222" },

{
  "label": "宕昌县",
  "value": "621223" },

{
  "label": "康县",
  "value": "621224" },

{
  "label": "西和县",
  "value": "621225" },

{
  "label": "礼县",
  "value": "621226" },

{
  "label": "徽县",
  "value": "621227" },

{
  "label": "两当县",
  "value": "621228" }],


[{
  "label": "临夏市",
  "value": "622901" },

{
  "label": "临夏县",
  "value": "622921" },

{
  "label": "康乐县",
  "value": "622922" },

{
  "label": "永靖县",
  "value": "622923" },

{
  "label": "广河县",
  "value": "622924" },

{
  "label": "和政县",
  "value": "622925" },

{
  "label": "东乡族自治县",
  "value": "622926" },

{
  "label": "积石山保安族东乡族撒拉族自治县",
  "value": "622927" }],


[{
  "label": "合作市",
  "value": "623001" },

{
  "label": "临潭县",
  "value": "623021" },

{
  "label": "卓尼县",
  "value": "623022" },

{
  "label": "舟曲县",
  "value": "623023" },

{
  "label": "迭部县",
  "value": "623024" },

{
  "label": "玛曲县",
  "value": "623025" },

{
  "label": "碌曲县",
  "value": "623026" },

{
  "label": "夏河县",
  "value": "623027" }]],



[
[{
  "label": "城东区",
  "value": "630102" },

{
  "label": "城中区",
  "value": "630103" },

{
  "label": "城西区",
  "value": "630104" },

{
  "label": "城北区",
  "value": "630105" },

{
  "label": "大通回族土族自治县",
  "value": "630121" },

{
  "label": "湟中县",
  "value": "630122" },

{
  "label": "湟源县",
  "value": "630123" }],


[{
  "label": "乐都区",
  "value": "630202" },

{
  "label": "平安区",
  "value": "630203" },

{
  "label": "民和回族土族自治县",
  "value": "630222" },

{
  "label": "互助土族自治县",
  "value": "630223" },

{
  "label": "化隆回族自治县",
  "value": "630224" },

{
  "label": "循化撒拉族自治县",
  "value": "630225" }],


[{
  "label": "门源回族自治县",
  "value": "632221" },

{
  "label": "祁连县",
  "value": "632222" },

{
  "label": "海晏县",
  "value": "632223" },

{
  "label": "刚察县",
  "value": "632224" }],


[{
  "label": "同仁县",
  "value": "632321" },

{
  "label": "尖扎县",
  "value": "632322" },

{
  "label": "泽库县",
  "value": "632323" },

{
  "label": "河南蒙古族自治县",
  "value": "632324" }],


[{
  "label": "共和县",
  "value": "632521" },

{
  "label": "同德县",
  "value": "632522" },

{
  "label": "贵德县",
  "value": "632523" },

{
  "label": "兴海县",
  "value": "632524" },

{
  "label": "贵南县",
  "value": "632525" }],


[{
  "label": "玛沁县",
  "value": "632621" },

{
  "label": "班玛县",
  "value": "632622" },

{
  "label": "甘德县",
  "value": "632623" },

{
  "label": "达日县",
  "value": "632624" },

{
  "label": "久治县",
  "value": "632625" },

{
  "label": "玛多县",
  "value": "632626" }],


[{
  "label": "玉树市",
  "value": "632701" },

{
  "label": "杂多县",
  "value": "632722" },

{
  "label": "称多县",
  "value": "632723" },

{
  "label": "治多县",
  "value": "632724" },

{
  "label": "囊谦县",
  "value": "632725" },

{
  "label": "曲麻莱县",
  "value": "632726" }],


[{
  "label": "格尔木市",
  "value": "632801" },

{
  "label": "德令哈市",
  "value": "632802" },

{
  "label": "乌兰县",
  "value": "632821" },

{
  "label": "都兰县",
  "value": "632822" },

{
  "label": "天峻县",
  "value": "632823" },

{
  "label": "大柴旦行政委员会",
  "value": "632857" },

{
  "label": "冷湖行政委员会",
  "value": "632858" },

{
  "label": "茫崖行政委员会",
  "value": "632859" }]],



[
[{
  "label": "兴庆区",
  "value": "640104" },

{
  "label": "西夏区",
  "value": "640105" },

{
  "label": "金凤区",
  "value": "640106" },

{
  "label": "永宁县",
  "value": "640121" },

{
  "label": "贺兰县",
  "value": "640122" },

{
  "label": "灵武市",
  "value": "640181" }],


[{
  "label": "大武口区",
  "value": "640202" },

{
  "label": "惠农区",
  "value": "640205" },

{
  "label": "平罗县",
  "value": "640221" }],


[{
  "label": "利通区",
  "value": "640302" },

{
  "label": "红寺堡区",
  "value": "640303" },

{
  "label": "盐池县",
  "value": "640323" },

{
  "label": "同心县",
  "value": "640324" },

{
  "label": "青铜峡市",
  "value": "640381" }],


[{
  "label": "原州区",
  "value": "640402" },

{
  "label": "西吉县",
  "value": "640422" },

{
  "label": "隆德县",
  "value": "640423" },

{
  "label": "泾源县",
  "value": "640424" },

{
  "label": "彭阳县",
  "value": "640425" }],


[{
  "label": "沙坡头区",
  "value": "640502" },

{
  "label": "中宁县",
  "value": "640521" },

{
  "label": "海原县",
  "value": "640522" }]],



[
[{
  "label": "天山区",
  "value": "650102" },

{
  "label": "沙依巴克区",
  "value": "650103" },

{
  "label": "新市区",
  "value": "650104" },

{
  "label": "水磨沟区",
  "value": "650105" },

{
  "label": "头屯河区",
  "value": "650106" },

{
  "label": "达坂城区",
  "value": "650107" },

{
  "label": "米东区",
  "value": "650109" },

{
  "label": "乌鲁木齐县",
  "value": "650121" },

{
  "label": "乌鲁木齐经济技术开发区",
  "value": "650171" },

{
  "label": "乌鲁木齐高新技术产业开发区",
  "value": "650172" }],


[{
  "label": "独山子区",
  "value": "650202" },

{
  "label": "克拉玛依区",
  "value": "650203" },

{
  "label": "白碱滩区",
  "value": "650204" },

{
  "label": "乌尔禾区",
  "value": "650205" }],


[{
  "label": "高昌区",
  "value": "650402" },

{
  "label": "鄯善县",
  "value": "650421" },

{
  "label": "托克逊县",
  "value": "650422" }],


[{
  "label": "伊州区",
  "value": "650502" },

{
  "label": "巴里坤哈萨克自治县",
  "value": "650521" },

{
  "label": "伊吾县",
  "value": "650522" }],


[{
  "label": "昌吉市",
  "value": "652301" },

{
  "label": "阜康市",
  "value": "652302" },

{
  "label": "呼图壁县",
  "value": "652323" },

{
  "label": "玛纳斯县",
  "value": "652324" },

{
  "label": "奇台县",
  "value": "652325" },

{
  "label": "吉木萨尔县",
  "value": "652327" },

{
  "label": "木垒哈萨克自治县",
  "value": "652328" }],


[{
  "label": "博乐市",
  "value": "652701" },

{
  "label": "阿拉山口市",
  "value": "652702" },

{
  "label": "精河县",
  "value": "652722" },

{
  "label": "温泉县",
  "value": "652723" }],


[{
  "label": "库尔勒市",
  "value": "652801" },

{
  "label": "轮台县",
  "value": "652822" },

{
  "label": "尉犁县",
  "value": "652823" },

{
  "label": "若羌县",
  "value": "652824" },

{
  "label": "且末县",
  "value": "652825" },

{
  "label": "焉耆回族自治县",
  "value": "652826" },

{
  "label": "和静县",
  "value": "652827" },

{
  "label": "和硕县",
  "value": "652828" },

{
  "label": "博湖县",
  "value": "652829" },

{
  "label": "库尔勒经济技术开发区",
  "value": "652871" }],


[{
  "label": "阿克苏市",
  "value": "652901" },

{
  "label": "温宿县",
  "value": "652922" },

{
  "label": "库车县",
  "value": "652923" },

{
  "label": "沙雅县",
  "value": "652924" },

{
  "label": "新和县",
  "value": "652925" },

{
  "label": "拜城县",
  "value": "652926" },

{
  "label": "乌什县",
  "value": "652927" },

{
  "label": "阿瓦提县",
  "value": "652928" },

{
  "label": "柯坪县",
  "value": "652929" }],


[{
  "label": "阿图什市",
  "value": "653001" },

{
  "label": "阿克陶县",
  "value": "653022" },

{
  "label": "阿合奇县",
  "value": "653023" },

{
  "label": "乌恰县",
  "value": "653024" }],


[{
  "label": "喀什市",
  "value": "653101" },

{
  "label": "疏附县",
  "value": "653121" },

{
  "label": "疏勒县",
  "value": "653122" },

{
  "label": "英吉沙县",
  "value": "653123" },

{
  "label": "泽普县",
  "value": "653124" },

{
  "label": "莎车县",
  "value": "653125" },

{
  "label": "叶城县",
  "value": "653126" },

{
  "label": "麦盖提县",
  "value": "653127" },

{
  "label": "岳普湖县",
  "value": "653128" },

{
  "label": "伽师县",
  "value": "653129" },

{
  "label": "巴楚县",
  "value": "653130" },

{
  "label": "塔什库尔干塔吉克自治县",
  "value": "653131" }],


[{
  "label": "和田市",
  "value": "653201" },

{
  "label": "和田县",
  "value": "653221" },

{
  "label": "墨玉县",
  "value": "653222" },

{
  "label": "皮山县",
  "value": "653223" },

{
  "label": "洛浦县",
  "value": "653224" },

{
  "label": "策勒县",
  "value": "653225" },

{
  "label": "于田县",
  "value": "653226" },

{
  "label": "民丰县",
  "value": "653227" }],


[{
  "label": "伊宁市",
  "value": "654002" },

{
  "label": "奎屯市",
  "value": "654003" },

{
  "label": "霍尔果斯市",
  "value": "654004" },

{
  "label": "伊宁县",
  "value": "654021" },

{
  "label": "察布查尔锡伯自治县",
  "value": "654022" },

{
  "label": "霍城县",
  "value": "654023" },

{
  "label": "巩留县",
  "value": "654024" },

{
  "label": "新源县",
  "value": "654025" },

{
  "label": "昭苏县",
  "value": "654026" },

{
  "label": "特克斯县",
  "value": "654027" },

{
  "label": "尼勒克县",
  "value": "654028" }],


[{
  "label": "塔城市",
  "value": "654201" },

{
  "label": "乌苏市",
  "value": "654202" },

{
  "label": "额敏县",
  "value": "654221" },

{
  "label": "沙湾县",
  "value": "654223" },

{
  "label": "托里县",
  "value": "654224" },

{
  "label": "裕民县",
  "value": "654225" },

{
  "label": "和布克赛尔蒙古自治县",
  "value": "654226" }],


[{
  "label": "阿勒泰市",
  "value": "654301" },

{
  "label": "布尔津县",
  "value": "654321" },

{
  "label": "富蕴县",
  "value": "654322" },

{
  "label": "福海县",
  "value": "654323" },

{
  "label": "哈巴河县",
  "value": "654324" },

{
  "label": "青河县",
  "value": "654325" },

{
  "label": "吉木乃县",
  "value": "654326" }],


[{
  "label": "石河子市",
  "value": "659001" },

{
  "label": "阿拉尔市",
  "value": "659002" },

{
  "label": "图木舒克市",
  "value": "659003" },

{
  "label": "五家渠市",
  "value": "659004" },

{
  "label": "铁门关市",
  "value": "659006" }]],



[
[{
  "label": "台北",
  "value": "660101" }],

[{
  "label": "高雄",
  "value": "660201" }],

[{
  "label": "基隆",
  "value": "660301" }],

[{
  "label": "台中",
  "value": "660401" }],

[{
  "label": "台南",
  "value": "660501" }],

[{
  "label": "新竹",
  "value": "660601" }],

[{
  "label": "嘉义",
  "value": "660701" }],

[{
  "label": "宜兰",
  "value": "660801" }],

[{
  "label": "桃园",
  "value": "660901" }],

[{
  "label": "苗栗",
  "value": "661001" }],

[{
  "label": "彰化",
  "value": "661101" }],

[{
  "label": "南投",
  "value": "661201" }],

[{
  "label": "云林",
  "value": "661301" }],

[{
  "label": "屏东",
  "value": "661401" }],

[{
  "label": "台东",
  "value": "661501" }],

[{
  "label": "花莲",
  "value": "661601" }],

[{
  "label": "澎湖",
  "value": "661701" }]],


[
[{
  "label": "香港岛",
  "value": "670101" }],

[{
  "label": "九龙",
  "value": "670201" }],

[{
  "label": "新界",
  "value": "670301" }]],


[
[{
  "label": "澳门半岛",
  "value": "680101" }],

[{
  "label": "氹仔岛",
  "value": "680201" }],

[{
  "label": "路环岛",
  "value": "680301" }],

[{
  "label": "路氹城",
  "value": "680401" }]]];var _default =



areaData;exports.default = _default;

/***/ }),

/***/ 29:
/*!***********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/node_modules/dayjs/locale/zh-cn.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
!function (_, e) { true ? module.exports = e(__webpack_require__(/*! dayjs */ 27)) : undefined;}(void 0, function (_) {"use strict";_ = _ && _.hasOwnProperty("default") ? _.default : _;var e = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function ordinal(_, e) {switch (e) {case "W":return _ + "周";default:return _ + "日";}}, weekStart: 1, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" } };return _.locale(e, null, !0), e;});

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!***********************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/pages.json ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 44:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 45);


/***/ }),

/***/ 45:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 46);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 46:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 55:
/*!**********************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/static.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.gradeTree = exports.noCourse = void 0;var noCourse = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAagAAAFoCAYAAAF1XV/iAAAABGdBTUEAALGPC/xhBQAAQABJREFUeAHsvQdgpFd1L36/mdGod23XarXNNsbruu5ebGMbg4ONMcSA6XESeCHkpfHSEyf5v/cPIQQSQh5J4D3AccG0BJtmx72Cu9d1q7Zqm3bV24xm3u937ne+ud/MN9JIK+1Ki470zW3nnlvOPbcXY44hHDiQrenuzj7d05M9ePhwdt1MBe3NFGGXLhKRgjnh2uXpf1xf712TZzdl44wmCokZQMxi+MrwxSeKJRI2LfFhgDMCSNAhEM7gY0RLiiz8ZKcjMjOSKESuE5EjbSZG1ZLiOx0Jm5FE+QmJId81QSVxSlN9tAmb9kShdmOxI90YJKTkoqcJUvVoEjbtiUJCRhEx5cyUE8XEjY5OTcbGq2Y10yarCpfgiSoTVXLGbdxozNbNXeb6G5olzKEhUSJ/Xnxxy0LX4Ywz1hxQc8kBqofxVBSZnXBX7pSUoFdfNWb3Lvsp7ZgTq6hi+NhjO5f29SUT/DyvLEWVdup/2jiFwDtYMaD4sT1itPgxYQWw6Q1jXn2lS+xXr7FcoeHgATZrxnzvOzlu0cyEuW3Y0JFUwlQYc9VVq5mJhCM//emW5VY7fiuvOBOqCBTRNBkkSBOiapCo7dvQArMJBnR3s4NhobJSdcb09gyb665vNi6n1HVgIJutrkYIgAO9iYTpNea227atqKxM9t9wQ2vXoUNKfRoS1dubfcEXZybETYz38sYhb8vmQYnXmWflONK5t0/s+FOBHG9ZYNXW5TmcAMHXpNPCsT8Dx/56ZGS0b3Q01gCneF/fSNNXvrK1qa8PCD5MufiBO4+BRjKTMXHkn8dix+J3uMtUDw6aJBOqCWJYyNsAsnC8+uomU1kdMDJwm0DzVwi3Hwn7wi//8l2Hzz//3LXEr0r17f+NPzr9iPqdNFUQ/U94ZqGp+so/d1yshBKJmLn8rW2mvNza9KJ4bHrDyk0mkzXnnd9imprgqVp9TF1F8czW1nosFZHg5F+ke2CJxNwObiTIDVjqF7in0xnDKlgTNTZmnc6/oM4sWeoLU4B9dBqUDg/xCVUeLsUJE3XkSPaf4nFThsQwmuQDi5sUNZcQ9Y892mEuvqTdrFhh0q3LTXzd6c2TLgn5NMczF0tY0US98ko2uXy5+UsmBjlTjoTEoLLKDtRiAT5wf1dAd+1Jzaa+3mKOoq/x0ou2SNKG1XljY45KV1fWbN92WCxqapPmtNNqzeIlOfcoXVTCgsBdD0D8HZjr/USw3ZG2hwminpyCWlCmWVts3RKOtCYI+Ka/n78WysvjoQQdgZhrgoixaFGtjzm+gjgalKZsYyMC96EgYkjQb4I7LGaSAKpMhJ8QqrQnASYsBBddvCIwx+Oxgkhv25pLcOty1sg52ILukcKatWEOqn2+ygqIEeHX14dY+xCkjua9e7Mt1dXmQ3CuRg1TBbUSiaiGWgW16vbbdl8JfeymD7a+AnPlww/1n26MpbViRS3qdSULW1jzU6Cbuo/nRnx1X7UaLTqHmXlg3UncDgMkVTA1NNgQQpyqqjLvhbVyQzjFIgh8K0fQxGOe+dYde06jXVtbjWlrq5WPATEC+tHsgus+nhv9qzt66WYsjW/MfuRMzp0JQiBeLiCUsi8wzCBR6Bn8ChPk28XhOdDTDm5IROVBeoLe++E9B9qon1Eg533uI0zfkCtylvU+go3Ib1NxK4qAM0wAPiZKuEY9ci92wYVNu3bt2ru4r28MMufF2Edjzg0Npc3zzwc9f0s+7/eii5ZKHB5/fG+eS6GRuASNLisg8M//oMf/c8/2ozFPmPaVFRZPkYEliYKQvR+NpXADdsohMW/bZq6HWzUa1Z7WVu9luJva2oQ7EKTVjEEuQTaRWT/yoyNjZn/nmBlNZczJJ1eFwpdEgQtshzA2CbgjnGERREdSWpnhYdO8ZYu59Oz1y1A1j2Q2b+rKdbVDJIsbKCu/9EvBsKcoIqt3gjDIamkyTBDTRPuhoTHT1582A1A1UYcOpcxPfzya1eJH7hA/Vyn48rV2rblz/35zFvpyJ8NdoKamPHbW2UtZ7c8wMEo2YozdU09mMTxBzRUfQwe5EhVIjxlG0Wci77kb4s4SCr0mSuVJ2iMg0V7kCvq4myAGokB5mgww8B/+sHSZIm36IYsovz09mLcYGTbp9Khpaq4wy5ZWmCMYm931rX2QbRQr1MxA/FVMY2Vl+ACvgSxBrxWFcA7c+hGI5+pOIBxTYGbcgxxExCurykxDYyUYkjXnX9hg3v6OBWZ4OI3EskM9Zm6+efHXyBHliiSAnEHZ1wSyamcCE21t5ukdO8x5mhjJQTWUqFKm3vnOiWXqsO3+hWTqmmsYPUIc3SIWQbLQAiouc+jgiBolQSkmBDby+YlgYxtU53DzkkkzetJJ5plNm8x6+mYEpwJT8RdE39c0NWNA5Ye/f1/aXHRRC/iWRX+xzPzeZ8AlVJkptMTa81YOSXWOSAv3qKIXcRYSD7Le8LLWurKFi2qIK1BZmQDhiTlAZK3ZrM+Jf5kOxl9LxiMPD8OUMW+5tAqzUGxZbDtZhTjU1Rmp23M89WWKXFPO+arKF3NH8Pfu6R174fnOFIV3psFN0H/9dNRk0GXykKgnHu81y9uSZgTtVQwVxDBk6i//0kgZlGgh8sIZTQyLICIr3IMqcvW+Dyx79f03LduCQbRH1rOm0dHtTCYMcQogFkeuxvhZK8Zj9ZpKJCwrFcUtt3hSH0uVXltrvohq+89UjuCF3pRjyimZ8P/lG5fuBrEKBMZ2ih/H6lrhcKoYxlxx0UhJ3PwIWrugYLFMwwN/chBll06nTFkSLujEYjQewLrTq8yzz/a/Ry0kUZCrMcoVLElL2ypdtRCuwT5QESniKT60oqcqECREYhaOr+32KCbcfBy1oVGyxTYhrms2WR7zNrzFdomeeLxbOAZGmJqaMBXXE2dCvwDnSnCC04YcT5EjOq6qgJmzSMohqkl85BQ/ocXhAYulGPCjKtyRAJoYZR02iCudAhCUwBTW0A1xEOg+kjIbN/abd17bVECEue1CB4sgLELy5JgDbtEOHwmqCi0MkDWJGFwkND9In0P9Y2PeqQ0NJlbf4HFm6kzgPl0m5UW8j/ujCSLSXd/q7Hv9td6nojz4QeacMN7/GgSRPOYn83tQMY8qH7nIzi855HIqKOEc0DFwTVDGZL/U0hT/LeBPCrDO9ceYAP2fLF4EVg7oXF+N0e29//D3HUOV1bHNdTWJXclKc/iGG5Z+2GLZ34I8wgTGzRgwXoSI/RFp4WP8qMqHBKmZqn7QWpAEwRacaQetHWo/WRWR/1/ww68AkG8j6A/GMCj2yrJewWiBES2AujrvCUztXosEaEKkSAKRiQgS6OtpJ5BmKN1eQ1NTzDuaBCm9YioyLo55u0QWH9qXgjQUcMolhMS9lWZUIG9AcRPDtopVPRMkiXKXWuhnJoGJQrCQSQ9qLCj6Gua4iVIkRPhk1c8KNZuNj41lEplsPJEZyxQkqoB1syLSE0QilshuMFn0L1gETcyu1Dl+Anlw7Ga19vP//56zMrHUA4l4vAa9iyEk6r6YF9/3qU8v+tRxiTiai49DPjkq+BYGpzNWSmacU0gAl/gYTtFETHclM6OJQoJY3rUbNW7pQE2K8RB/jx6K5t7RkkaCulH1MpIlRRS4sgp/tOHS/4wkCgni9DS7eyUnShMDv36XVW0mr057ohCpfUwQPtKedKKYBG4voDpVmPZE+RHRBKk6qfhxewH6n6dMypODPK2JApduBW3hEvJaE0TzpAH+X5u0J9/DlAIsFhiGC7shR0WHJcX80Z7cuecHXVjJrzDnX1AdoEZV9889t3lBnONzB2ZkwxUa1nYEQ+6wL8YA9XOCDmuzGCvpZqv9lERA515OgeUA3MeOjDAMDpaX6YarVCqBXS/JxF133RX0AUvq0IZJRpswiHsYLlrkqKq+wMP3v9slo2OuC591tl2eHyjowQXeQiva99/9xjJsuIpfdW2w2crcd9/WtsbKc5bBx076YsBHDcjNzT6XJCH58sRRq3Jk+zaw0C84bStyi9kjmLGrri4P9vq5kQL9oDbsGkof5Iar227bsYo499y2o7Grq6zsyFBufskn75IoXY/AfgjsdnyclOEwX4b40JdhKF723W/b/RRcbce8hEB3N/cs2ZV42tfUgMBK6zbRr8oXNlitzcf95CdXb1a7KRU/dEY9zBM+DiKcwyB37GQoJjp37TB1JK6T/NTn8tnq2Sq/693YqDRJIMeYMCbg7/5u86mYbszExzzvd/6gPVRTTopTSAzXqu5GnCr/6R93XBbHjKnCxdi+4+5eee21PjPQb+e6ubOFnGpbEU6g+p2sqhwr5o+5PCEgMfXIpdux6PUdIOv0Wcjf4491hCb/+/swN4I03/DeZrMOuy2Wt01PghgoOYYtPxeGIuAYJix+IPAlJIaTm1LE4Fenox0yVtvdPQxuVZAj2HDVIrR1iqsA+SgtILNPDGGIWMntK3lQNFFIzF8hpzn3x0RIgmAO1Dw6Ynzl5X1Y/KoxzzztCV23giACl3F07xK5uP7c5qAmdN2IyyJLDo8H3MA1PJzNVnAe2YHI4oeewZ8ATRPDRk0qA6iu3iFjtZQrVgIERhoLDwHkR5oJdqOyb19uC+rKVU0h+QyIRGi4xxD9xK+6TgWJAsLvIbAgESg+1Ac7YHxzgb+TT1kYcIEBMNK5lgM7mQ/mtpAtb2sIRZoJ1kqFfhOJUMbTKhJ0wxXidLOLEPKNIvcpJIgLArrJKlgsuO3f974jHsuY99/UuhEEKp57tndZf7+3WInlb7hyZYkccblCLvJTYOOs4Lq1r1TbsJqjjVGoT5g0dOQcyBSK3CfhVTgCPC1mWgRjVdWxoZHhbNX3vrN3HWZiEze+f9mOju0mSJQbmXAUbALcROS75yIZdpEZX1r5WW/j7/Ihp3dpOHkkZ51oZoKYAVrLid073r5gIyb/Y6lUFu6e99279rYDb0ZBolyQoNwcgc8kiUMueXYFkIL2MaRUq2yquo1H9HDzKirjY4m47EMT/5ikDzLkiSf2jps4roRs2LDMTIRHImVlcXPuuYssvSBBuSjbGQJjXnih35x5FvpYCkCB+NyKhvnDGjHhDNzJJa0U4qhZmrZuNe/dvt28Hfo6DBWI5w0MpDlmmnEgJ5QbXFhU/TDWeIeGMubJJ7AFBqD2UD9EMybZs7G+vlxi4CDcgVscmxr7wKVkZ2c/VgdrLnzPjcue6egw659/du8wwtMMIZ2SoJTNVpQ9dnpzYLnEekV0+HnyiSNS0dA8Oopdy+U2Kvffd9j8x3cPfRknW8xH3KIHPGKQI1zzjS9ZYh71vJoNG1/iBNEC2RiCPRSJA/v7/OUwWM8YsLD5yUGEfvojbC+IY6kzUY2NVnbs+MrL/WbvHjuwZKRv+tDCT7H2o6+gUoA95SmBhErNhw0XBzo7jTlt3QLzwH0d5q1XtaMNqhvFBhH2NiYFpWy2cmVKOcNAfvKjjOkf6EO3KGmqy2ImmSwzXV2D5opTm822rQMsnH4G+D0FcgX++Kk8qZmd17LWVvMUCTNBjz28C+XZ7iyh3UyCblhkkeRXV1eDAy9x7AnNmquubkCbudQ89dQR7D9MmxFskeOGKwI5FVQO5BLMkiBXj+NAwWD7kkuX45zToFmwcNKMKmmzFSPPHgZBOEUOQPOOX8JgDVGLxRPgTG5F9LLLm81XN/fLxE11Vfy36Y/FLKjKYRY9EwTiUmGoiu1xP8fOzPMYKBPEbk1Dw+QqQfqdCIrhaFFEfM3KVWWS0KHBrNm1a8hc965lZumyBKYDvH8gfeGUcsVPDIugJM5X43fevvtcqTs8b4jZxV2Z1TW5BM3UZivJAKTGcowxMOahBwaxUp81K9rLoWZQHBPYRztmOrbn6i0WNQ5PVZ5EVbMm9vQzGnaRoAI3W73w3F7M1M0sMEhn27l54L+4KxM5jkTt3jWIPUkZ+Xp7xkTV2MSwtP81cETkCpYiU0wMvkC23nRqzRH09Ta987rFu9TjyafUYP7nGICfmQ8/OCJL1klM7XhIKUtyd3caNTG2cANnNJUr2yx+BE2AFDvKkdqpykRWVcWyN75vKacdQVo2i7AC0fUnL9hsBUuWGQYmWl+1JtqHLayRkbL28htGMWlUbAm0Uer1pJMqcewvYRvh2FjL+efXBYdFGHm0yuYfgSzcUq45qiQQZgbjJpYEaaa9RCGJHV4SKEyiIp7iAAQFmyDbKaWdbVytLvdLXR5wOhf8uWRDjbl4Q62pqmJYHqp5E3cTRF/CqYULvX4MPYRLsNMiKAmAv5DKhPh2xCPQPQRBQqgJDH5CfUzdY64IAVqgCZE0b70Sm4F9N9aQGRAoNqsURAiy9QcgI7IEz8I1VWnvf5og8ecnLhQNMfg2rkNZGXiS9T6LmdgahBXD1r06cP/ToCsVjkiE6wEOLmiCaAd95q7bd73DdXf1BWTYfYcnjnh1Sxzna2SjFTxW4KM88WOdHsgT9AIysNNEwaN7WEtxJlIxFDoZ4d+N0exacgVkWNRfwcj2tM9+dnNrTVXymeqaxBvY53eoLOFtede7l5AhAWhFEVhwPIKi+H0QkmIHB5nng1mKJc34GG1+qoeWyzF2eECu4HSnnzRxmtQPIs9tQydFeYpnY+1IYCqb5d6kGLgcyzWYvgcpRvmeUTzejSjdpwnzVcqlm5iCBFWUezgpE/OOJkH5cSkwZxKHkSj0eDz/y9jT0Q5iZKLojtz6PLi2ATNCfwIjE8Ouk3JLEyeVF4b432lujnnVeds+SWe6oX+0fwsqwjj2JKGLl42jLX46P4wpF5F8QsfS/MW/7+iqqo7vqq6J7frgB5ddmx92UU7lI84mM7bpYgCLE0WyNa4wZnMuUX/7N9uHs2lvaHg4trobS7L/9E/7/j0/WXOy+OUnQs2otX+CE3lXc469FOBlDzjs9pamJu/RUvCPJ86cZhTa6NfQKVmBlkY7PEyPK1Hsp0wqjdhSfy0Yd8/xZEpU2JNKRBSB42GHjhznMJQ5qiqTpiVNXK/JP2xxPNKqYU5LopTYTKtgEKdTKTFkDjutVNWsjILV9EKx8c30hjI+tTnBKKzC12HRehOSosxRKVJGKbPGT+1RuHJBb0Y76RPEjQmc1dDfn10HJnFoxbiyYKnkqJnqjKcDbaFs3YBU34fwjjnMeolCxuxBrrhVnUoTmePqZzrzQh2TY10dzmpGoVfXiWE2QRnCqk9WAZ2enkqWIBb5CWVyEZxIa0oSOxZ+PEI4cPsGZpQ+FrKcwIABYHLLli31+Wg9PT2j69evtwu9+Y4wz1pGQZIOIH5cgCrWLpF5KlXQHh3wpOteyC4KgIC7yZJMevd7om+yK7Xt+tnPXmv2vApOJU4I5523klP6IZiVjAKTOpA5eiuLSBFiTcbw9Cwnh1XCGH8yq2Rgpj/0QB8WSkaFKfk3hpEQmXbo4BjW8XK7A2pr4+aKq7ABswiAYW9FZ+PBKOcHH3wQc7+tLXTLZCqysdiwl0gkBzZsWHHkwe9vb7js+vY+TDuOPfjg7lbcaiA4V1yxnFV+AMyEWQNg0HZEhosa7nSpMoMq7ckYfmoPbSFQMjo7MVcMmaSeq8e6DZnYtGtuqRY13zcvW3GZJPgxuxBLRkcBqsEHcJdRZM+w/+Ca5nRZWvI6jq2+1123lukUuPzdK4PScPBguqysDOcQ7aKCoojKxB5XQDvUgkQ+iIxjQlg1iCRRoqAXKYKqVRztGOdAoth+PPpIn9m/bxTnKGplRZ17wV3Arheze3dud7K6cSMiFrWwxqo2BmurhpcSmkRJlVTOn6tDeh5H23WJa/fVr25Z45pVX2liKchQKLSbb169FSUyVCSOC6NwFmQFMucuRLYMDOK8vDAIZjKAemWQMkTWyrq6TMXQoInnSwfwBaKqMTpwX/zWLYdEHC0mmINjGFe9rRG7ZtSmZJUZWGq+3YTe4R1K+Qtf2N6O/OfSl0mMZbNppEpV2qXTnvf7v7/yderzodQA8/1N2oxq7adgCq/bVKZQcspQ+sgESop8kJD4vn2mHtc8oawXAk8hHT48ZnbuCGqMACmKUaAvV9viqsLInlvgeQY1KJRPov266GiCYOZMO6ALihNN5lsgDK0wRqQEmSarxF/+0o4L3EMU+RE497xW7AtLyE218B8CqcZ2FfZi47j5lucSeBgj3w8JRNmFCM+gAem+EAUVnYipz25MC6P4QAeuvPoi0srGvgynWlilQbiDasxdxndahOjcefrnu8WBu/VBFzunwnhnnFVrVq4sQ+8obE/T8WRIYWzCNowvGebbPo1qMbj3LIxZaJoyo9DO/DaYsRSfbDWAmvEZQ0ZwBV/aFep9s8uswphE2Dz+WIf51KfbB9FdJg1pr3DzMPTRTIogMZutziXTeOt4OY/PTQCTYhR6aNeBGWeBprQv0DPzlBHKGFXFnu6IhuoVf4JoWeeLLlqByxZTVXt2F5wXNY1Nlagaq0JHRFyi7HDwwmEe/8gHtmUE98ya4rC8c7Crh4XUXlX6ZebyLM5ENzKrn/FULFxi6JCRarG+npcsRkNJjAKDfhcSoh0BZrx7AoSMUQaI6ksT9fI5ZjKMdhPCJRvazY6ObpPCHst8KCWjOWaKKqf0y8vOscO+ANj+cbA7HpN4wzuZOR2AfPEBm0+gxzJ8tsG5kVpdqY7LKCxt34jELgGeZrBKRiAlPtPULEy79Zu7r8L9joPXvWvRSzj77fq10jZOQtn7uGTDSoP7Xyed0TztnMIAlxmdzyTSXbO2JVKKmBGUQNw7i/FY7lAX7Qk4SQAJKi/aUbFYpf3mmEN8ZAQjyvzwZQl5zqg2YhwW6tYWFTV4+CRosIrjTafsHLDnJirMSbqpGYTFDWapEr/5jT1vwwAbbZaHe5GNOeuc+j3PP9uzHJccvkF/xO/Ybt4E/DkLy9vs7jiZQonIRaQRkqclUhF8jojR6tUlPyOwwS3kFDIQeceObCMunudt4vmMETMz2XeLYqIwYf/+kcYH7z94JkqL198/VllbEx+BH4Rlf7GPmAfiTsmP3Fwyty73t/wW5KDt+ubS4jPHF5sAPdDkMFVHJ+SUqXMeSQtVfTj2246q4wpIjLYvod4bPHOJwa3KtMoj7aBaXLSofJBMoiWYNIzTTGU4zSSNDd3u+tbelRdcsDTUveZF5C++yJX2qQPPzl188dKAQGdncBglsJuKBtW3WZh3ikUSl0csZ6fMIQJzwWY8efX88wO4mCJvvCEY/o9FF7aCH204hr2TLiFGgUmXgUma+VQ5vRMwgAyEnZr18IcwlfbAVQbHr71u0Us/umf/6fX1ZUN42Qd+bDL27xvBTKgbs5w+qoeWc51Y5/pnaNu3Fw6MJ6ZSiMHDW/mMcrFskXRtlD0Ow7C3nK11Ghe5P3j/YWycwSQvzOeeWxs0UQ62EMN2th3QSG4FjEKf/iOwDDIaCS3o2bnSRMag/cm+8Yb5cDiKakqgbVqGE6gjVd3dhzDVKYBLDTMoADhpMsOAuJoLL8xJ13QHZ5mTn7XMVZ43kS3EUjatzpbMRx5CjwUZl8CJvJ6elCmviJlHHunG1c0NQb/Cjad7FYwwCs99XsOMd6SJlFVyqJKBImGq96WrDO3Zi1gWOAP2Ajs6enCEqV702OswjN5SBRgmneFdO3tShw4NZEaGCy9J9L1Pq8Ku9HQAmR4+uKpULQNoyjEEkuNbH0JN/uyzPAvDU1DIwFg1ztv0wuzhDZWUqc2y2Tdm44v9Zt0Zdsp/544h8/rr2HyOMHt7R8237zoEzme+L4zCRChHgMIMqMIYMsLXS1XoVnuIiFaJ8YULzetg1Gm+/4BJTz2xx1xw0TIMDXOAZ3u6e3rrF+RsZlbHLvfMAaWJYLlCKVIGbdqUNdu2gEFkDlYruGJBN6rlyWozgLfFCIM4/kkGn35mM16r2y/44oAfUqXkDQ6Obf7oxxbdwGPXHgZ6+e2NMIIMAX6oCoRZOxiBlOGk5T3bt5srMbMdtJJgElCN+a974fC2laLv6Y0FTALjZxSYMaW8flJKJNwDxopPqchVfND5XLrn7gxOmvZgXazeYvhM4rlCDwclMxjZXnFlE2Y3yAoLjz92xIwMj/krprBzysAn/9syOdhCiWKp1+pNBqy+9ASM8Nsm4mj1J3rfn+hXrjSPQrzjeIfgKsQ5jclUbHo3tcqk11/tMqfghPSxAlZX550XXIkxI8H6vAFtm+mc1XjntcyORmsD6/vuhdSQSWCYSBdy1WUSI3bxJY14466/YMaDa2YK3vbt2QrMeX0EgbLClAErGKVjJVGRaBlDwV2mkYDLiVjBddwCM3qPlR0d5hwNxFUHBlLS40mwGDhQyjtBDnqkVq+2UMeouTx1m4xKpue3USvax6cgrMsJDV6VQtUUdN0K/bIN+8b/3Y2qDoiAMcxR/tEfrwooiMafhRCmkEnAk0wn82DmLIQwimoUY4AvfuiGLmX8B/+x71QMdCGpuNahJhlbtbY5iXtFeI11AFFXuzOyRwuIbwBR83mB4yQ0jDcvK3IhilHIHwtMp+odT7jFSaQJt+GgncKRaqg8f81qVABGeuUv3roYxsH4YP1ZeIwAqDKb5IOZ5V0+Xy9VHjIhGEfB3u0lxv791j0XIvM1irgThS9r8ZDwWKb3ub0peX0H5rJkLLbu9MWRZcvNZPo9WvDb7KMlM7F/5DPyOwcws9D9173DUu3ZdzmIgOoP1SBO4JnlrbiWAZkowJJAGoJhCblMIo5gYm2pAYQ/Dn+UGF1f4rUNlDI1U7ooaWqW6SLQYKbzgVSVwsTDD3Wt2Nc5wqV0DwzK4uYxbyyFC6gRMzTBEuZ55y8l/TkL7e1MXXT0U6PYcPPwCBLPh/TSXG8CrmUSMkD0F11Uh+o0bQ7s59ZFMAfZcvjIKJZvksL0c8/HkXIHpGRzphZLGcw46UzAnZIV6EFce37EF3swhhKneCKJNMM+dullzfugHiIuPvohE8lY8e/biV/SgZvoffwggrx5gbkhiYOO4OpDZhZE36coARViWZASjAAtnoMArZgcGuonSnV8RjlnH3poxEuASdnsmEmCSdI99zsU9Nu6TCobs2vnCC6+CzrK5uWXMvL6DY7/FwQhjGJoOLX7OcxO/AW0bjWnVaCMpejmfySk+lAVmOeuzNQ5QvUDNOsfGa+0CiLH247yL3ugR4IwjBmrAN9CoICKjyuuZBIR6JFfuBBYAkowT1X6edYRRo+9OzIpjrvtONhll3zDJXUYt2bNj+7pMqedYZlzOlSWG8JEe9kLkoWOxd+wfgWB/J5efoeCTNZeoehhpqr6fGkKzMAhwyhhUd19OOUgxSeQnFhGSpTN85wnXxfGdYkAAYGLTRipOI0iYRR4gMXGjaOm62DaXPbW8Ookg9qzG/drNpVh3SwL4UhMyCClzwwLAdZB/hBnYL8ES5EGENfMpFnsoNKf6plemkVF+tVeVUqc4mh4opK274/u/AqAb0mpoyD4JVDtfMEI+aMPqeZCJH2PwLR+8TsOkyQsl2qBhesY1q9blyxgEjGQN9jfPoIB8djW7327c/9EUuRSZekvgJYWbw8sfxtV4Zf9dosZKm2JzwhhAtLJGQxliKpMEvH1Y565DBE8+GMBIK77wRgBTiYF2kBj8RkI/q9EQbs/gsKkrLA1+U1I9x8iiA+hdmFBKwYTyhnixOWcXYhXG4l87m87dj/7XPdTqB6ZxyVDXnKj/YFhfw+XZQiU1ZUMdmGWXh/toGe1qGYyQsxQhZE+DvHIMKrE0Y9xoD4SeM8IgQkW6YHCJx1hvhAl8im6zXb4u7/bfgp6U08mkrHe8oTpxa1O3dhj3pMo8/oTSTOA5BzBZS2/P146IiUq3wMy5HfVDm0Yd7wyo1RiVFpUZaYzW+UDnmsWHDBbBMCnSbwCcBnEy2BQKtciHlsKEOeABTboLI2VoR+IARRaATyKFcNa5BjyXgYvvOduQiiJUS4ViPDVagbT/hWMOB1m7WIr88gc6pVJas8o5Vd5dBNI854wy94M7oKh3xMCqmMVm9ImzZ4vtprjomOD9Y0xPCEVz9KMvIsdniihJfByIhJhd565xeTkHWBgCyLG2j1U1cGOTCUTOEgewENen2tujv9lmMqJZ/q7v+0YwvRaP+6k6sPsTHeyPN6NK9n6kmXZvqaWJb96+eWevaS0SNInLVFF6ATWuJthIwxcn5oHJwdQKD25xQlVH7p/ZXiQDR+ulc148YmYRDLTLlFO3Oa1eTnw95/vGESrNIp5tVQy4fVjI+iBj9/cen4eWqRxnlGR2TJ9lrfc8mCipmpNChLUgx7UIFZ9B9FI93lxbwCbTgbQQEP1RjAM+PEnP7Xkm9MX8hyhdPBgdgk6O1/D0GIfPr5M+DImn3+PE9BzJAmhaJ4wErV/f3YRNu/vQOrsjGcomYUG3iyGGZhN6MWeXOg6+2zmPKMwi/CnGGP9ObKW3fwpdel5PBQ9sFmdF7M6cuOV62z2QTwdcFkfe1MOk6ifcpo4GX087zsaL71TTtR4RGfaDe0NG913+2MySpJKE1XChHNwFq3o76ybBdGEFY3xbHMAkzoQp+uceEVJ0VQLoJ1YNGYzwvmCE8Zx1041Qccl4ujFvYSWZDkCVwlim+TqpyteIpHYmPoiBvBnThfRo6EzZySKpx7BJN1M7hYw1as0TDU/6F9pCE1MhZ2BKbF9UyU4nf40kdNJc0ZooSraD8LBvKHTPqlUzVihg2Q9A8k6d0YSViLRGUtcieGXhAYm8aEKFir9XH8zXtggWesh0Z9xAz3W+hlP5NEmCDMJvI7nZ6BDyeFHqXLbJaZh2ieXQbMAcG8SXosYf5a7wNM0Wcx6iQKTnkZaVZKiChbToG3LNGVLNBlcdJK3XzYabyZsZzWjeOkvEs3N2C6jXL3mSRQD1W1a1cFBtI7HAWY1o7AU+jLyxGWM6P3ZCNd+JrMuxBhej4A287mZDDCK9qxmFBiSHz+RHHTTRfWZGJWu6bTTsFyaZ+FcWW6Lq+syQ/pj0ghPJe4otWvgj5lEZlF1PxgDZlE/I8C5v46OtGlrK8wmHP7jzSFRTBw3Lps3bw4O87mIa9euPeia8/WTDiifwEyZ0R3e7UuU29vT7Wdk3oyMnziH3oVd8y+8MGB6e+w2hutviD6Ax5vPol55j8oTVtcvvbQlkkk5/IGBM844YyBnzukKi0rO7bjpUK3wUV22DSxIrkRxm5pbuFz9lONL5vTgQhv06gR4p+zQIE9ZWDh8ZMw0NbJchIGv6kDyP4BtbHeEXQpNTz+9fVGhbb5NXS3SPoghQKhdJBYzYdYBMmwb1pjIBGWE6tWszJty3FmtkSGvv4aLfnfmmESCPOI5MmJP/tH8wH3jntq+nTjjweOP71uI5Xa8bhmP8VM9biLEeSlrj4dQh6h/8sndOk0WIjnrJApV3jdQTajk5DNIGcVEuPpQoooZbLWWMQ/jvgfqefkvr3PLB7oh0wLrBE5ljAeYD8yO9zLO6GhfktLHq7RJJ5VKxS6/fO1u6u+99/Wlb3vbKXvvuisbX7BgC2KTk2S6K8wqRmEWgmtMG/zIae5Q1Y9Oas9El1Qj9PdBKnBbit7sQkYQWCAwj1cS7MRZpra26FV+SiBm9nuwrG8v2MijmO6n/IJRyZFsc/PqfevXewE3yCRFVzw1u2pJCXU9zJQeS+qXIzmfA31U0QEzlCkMlnrG11VpHwm89WTnDlyjvcvgqh2WZinMkbgTWdJrGQZ14wHiXIfa4KNROP3pWIzf4GActwZsimTmq68+5CleFI1ZwSgw6U/QJn0FESQTPKd9EjPslEFMA+2Y61RDQOawvSFzjmCTsC3HFoXSMxngobNzz683N7y32dyA5x6WLJ1Y9BDG12+5BUdg82BwkEyyHy4nrbvtth2r/uVf7LUtd965c7WiK46aXbUgsa7jsdCjyngRpVFPf7DYMkeoqp5m/ZgJ1FPl5/Fq7YceOCJtCm+3jLqygDe45N9qSQlbe1LhRYsV2OiyAJ3oyTIWcQkAvcBQvt7xtYNLB7I94VNtwMZJAQ9XLvhFKIbqMINz0l7s13999aaAmK8ZX57zsafRjG4ob3P+OaLJREV9Gpq4Ec+vEj1cj+b9+IeH5dJGIrkNv3pSlVkWzjbrgmsVAmZQ8pa15pijWac0Jquihsi6m2Q+cPOCvV/5yta1+XR4h3sudlmMyjzzyU8WMolYx4VRkKKHwSQpYchESgahgCGwC9yQKG//PlNO6ejooASJn+Anihl0RDVa0D5RmtpWVJk3nTp9zAki4oeZzywwYPMXv7gt2EPIFwToh68JqN/u7sO7VJ+vBkj5DjNhxuDw06D7Pnysvnj+Vw6/QR9UdYi+nKCHXQzMSe7rNKHGN+r5BuDiLGwFXgyoLqj6OIl6COdp+SjK0tYqc8EFBTUQvc8IsDC5ksVAPve511d6Hq8fzoGHVvn3fi9akhTrmDAKDPowAvyoz4SgPYJZmAU3ZVQCXd0EmLMYbpFxi2pvmJi2FQ3IlHjBWxt4OsKsLqh06OPYAOUFNw5EpmUyMZjRqg9VHC8QficiRCnhFTsethJnv/QPHUVv0Oc12sArkIyJEsUbwDj3RqB/tjn51aN1Pba/jAsKahYD3lMWLPD4VuOUIK+mnxKNAk+I2J9hTPFtMOftcGRpYjjsDFAdN8xHHt4OlMJLosQSP6ARCRzm8G0OvDQg6nFmEtgTBhSi19k2h21LN02rRGFm4a+RQe0InnSFOVCZtfoxo6kvCuzBvf7aAXPKmxZKR2C8DMepPfP2axpw1rQouePlEBkjpP0tuLgKzzwUK27FozstjEIP5y/QtvDUPNsfRlKlRvUyiPWZFJkIN4pdXbzk2U6auuMiPo8wiFnta9/VXPLUj0t3Nuj5kBhqm+xk262jYhSquA8i8eejC0w6AVPIENhhLthKkq+6EjZhnj36yHZ5UYCdB9xbyzYnjXk50MD9nXMctN2Cugbzg1tLSc6UEo3Bajnq288igHMYCBihTBCjWFkmKX0yMWAkkSYCNmhvvL4nc9o6M9S2woyCSQTSOGEASdyC5uLSUhI0aYmC2H4Gg1Ud27iZr8zIt1Mmuu6lxA2vyTTHXt5oKvOnf+i5DILVtqKxaO+QknjgQL/p69WbvHNBrmhvxB0CsXH9bt50KHLGg0sjbDdPfXOO3tHoQOshFPpzIVnPjEdHS/x4OIEbqro/hbjW+BJEvwETHLuCSVV3khV4ZNiEwNkDDmLdlz5dT2QSnweKAqwOSxsXxSTij8ckDqj7+kYimbR4CS6TR3+OD1hOF6B2Is2nOaU2Hs2SGAUiMXD9D31CIjE+Y0SfxwilKRLkM0b08C/440VI3Ta8ZaXRToXaqbqs1Qp0sYckMaOB13Kw8SECKBF+NVrgysU9xBeXHRa+eMMMra5O4vblAm/jWRR00/ORcUm2WPV0ZxF6cdBMLYrxyivZJEoor9ghRZ25VnydKA0ki3g+EwM7h6n0Z2OmFCJUShIzrPtI4cZUZlhFRaJotUWJGBzgY8iFwfDdXXgvKhFcJuHjYFHAJ40IEWSj0NWuMBLqAhUFXECRsFIs07QOSqCdgFFZr7XVfArYpCUfIio9OpgDRqhbhCqXLjr2E4QHTMBp6xYXrfK4NFEss1QiOjtR9+UBGdTQUFGUSWzTWAiiFhgrKmxPxh0q5JGflJEMymcSE4XHnbHLyhexPIrjZhw2f3yKjIEflZKAYbTTT3Fgju3aNdx0+7/vvuyJxw6v9t2hCK4wFhEcN8zzzl+OPQVY246AhsZKkYhi1Q8lomM7cjwCWOURoqo9MpGwbWu0NC1rbSjaHlqfpf9aBnEi0wYqv8xJaqBiEtmXszBNokQCOg6/CQeOhXjpr9x0CbOojlke/EJCOcvG+bwyXGhb+6Mf7r9QLvkFe5ubk/1XvW1BB/3i4/tsZS8+39vc3e0tgTkEzLD29tqiEqMZqmrIMwwIf1y/4/kjLfrPB/WjKt2Jt6I9HzMw+1kemKVw5fxbZwmKPwXYlPzCmERETTZqvA+orJQl84swJp9pgosSm7j1m3suV0YhAKkqwaztLQuSKUQ4AZz4tq1z90U2ZqP7IluOJTkdGcN3CzEVzR98VKmzesoUdQKBxjdnzSDeOqz2TaIUq4bYraJ3flJl+XrWrWofqfruQGejnpYONMY8Yw/cf3Dlf35/3xokUukJzlz9QTpNBjX0GC5+5AsG+Z9IEHNIsssyiXppgWCvVV9O4+SEZxdVHZvC9gID2l8DgjCQmcqM9zNXp4Q0o4VRcAsYBlzbeeDmfviqqk5gdk6eL5Ao43psrmcqvhuPuakvkhJmWBgUURfZfLNFy0cWr3yE2qUhDFELOC6GXmU1xBDYa2iB6kuPmH1mkpQEvHpVZSc0fOOwApW02NHxu9/uXIGL0OY8FPDCT1Ehk+hgGRRkAq0Kdy3bjKMTELEsgj28OQhNIWGk/w5fgkhTP5dhKlUiZRBv103s4C+GjfOjW7cNLSGBGjxEmR7LxnGhoPRmcAVp7Nt37m07++yluVhA9+STnRLBkOUkDRdckOufdHUN4a4jCXKSVArRlywJNRcWQYuzjy4VRSjzXQTmBN+Lwq39eJyurY0tgrUTh4gfLNZj6TMHAaMwOahjblIIMYBmSkwEExXXxTfX37D0+e99d+85uLNcpkWwJRg5liuDqAKJHwKOX3IYIacpGfbuHcBU0LiD/ZLpRjLKyecwk7Q9InmmCa2RzzPek7tt65A5eCBl1vNtQxdVY0O6sOeY0IUgwzA5eB0ciKZRkN4awgnMcCO+fowD3WhWf2rG6zCZ5Nnn1O+CmzjiTT9bjJQaHU4AkOQEkmSzQbNMk6rqzo4hU12VkE7Iz5+yR0esD+SRrxFc9eDkTyBRvp36EwkCxwMz3FUvKqVrxw5zDdQafOyqZ9HtHqmuNvsXLTI73vPeJS+gl3emMhqvh6JjwbaKUSKJuQ+SuZIMNz1WfJRZrnNfnx3IH+nGYykNSfPkEz3moovRwaYX6y2UKZ2d2QVLlngHaSmMQrXHDJUeG1XY50sJYxK0QdTzw+RnI5gp1RvFGAxL4kGsWnxrVq+OP7H+/GXVLzzbOYgLfiUl6MLG8F4FuJXrXIDOjMC6dS3RVcs0hcbMiMxdvxBKkXTC4owIu/DkB55nx6OU1OHA3PN95swzcYhDckisgh9MOl8Pw7/RQhiFam8d9JL5eWrANDChoCOxcqX5zrZt5gMkxHi7de7WreYi2p1+5pIqqs/8fM9wPI5DQEOZRHkyepqEdKYLeJxmgn39JQfFecBoYJa5YNskciMY5/rOb+Al0FG8wSs+5McyqquLzbdLA1KCXH/66V6ceDT/+h/fO/zZ629oanKrPqILY5CxbvskbZFTDRJP7FBKgm4VmcTDX+W4Kl+BVSGkrpxu55y7rOL55/YOV1XGxlTCFG+uq6F8Zv6DS8ygH92DF2/wPJE8RIlHtIyXhFRxIZPu8hsq3ZS6e35wCH48YSoXR4HXyPzBpelZ0gwkh5YAYYaj0j2wg3QFeiyivb56tbkbgQyRSUewNMFIENDFtO+YWqPBJv4kNkqWDQ0em3d4/WBnXCFv5PMTzp1UP/7hGJ6msJmmuRUDs2LxcpNC74/PLaUgYXIpP/zzFZwf/OdBmb3v6RkVhqTTGbzomb6ACUhgWX016EvW+mqIKcARs+8WMAj21McWLzYv46XQ90Iv0IgZ7oMHBs3CRVUGs9lSGtStvr6ct+njWZ5ybDSWtS11mnaVq7zHBpAgzUAGiNziE6988FOmiShdrI5EyjAzDYf+vowwFt6kueB47+mncU4VgGk3gxkdMNNWVh/52GJeL2QSqA9PJx23DYJ9wCzGgRKkjILKzHYZxraLW95Rfiy0LKjC4eURU1sX2mIdtGFvXrdIOiCKPxPqxo2Hpm0cddFF4cG5xpeZQEmiaiFrfvojVHWwSKfHTD+OOtbWVeGVtRE8N54wVZW2WeDrochTHOjOmJs+tMTccVunLL8gDzEjEZf35EkPh319umAUHOtgYljCHDKCrr6qDKOqn1tVyiTtmjXmR5s3m2vpT4FMsg+h8DEKIalOJ4bqc4mZoYCzTXh9DbmNafME3q9tasKjyRjrV5RXSgchjZVBnge+9rpF6kUYlgV+Kg35w6Cf1SYXMMkR93UV5qBbKGgW6aLqfNDaguO2Tz4ziRc76STzY8xP+RcAEJ29LhzXkGe0WdOdWJDfq0Pqsvf+GGIiuYlqSBBY5cFFPr59GzMXXiKnSYjFT4Cvs6XRXvHtXWm30Iax7RpNpd9QHJFFv9oTJsEhIK16ZQhUXsiheFSDLjvs45j2kHML6BbjrgSDo/p4NRvRqakpw0YVPBnXWGTbkMZmGtVT8Yq2lMxppDkBKe8avGrNKo1ABu3amcGL1SlkqM8T2JXjhTk680dB5iSBEuPpe5EmqqgGK7IXKg4ZRU/6KRNoltkJn4nqTn+qL1AhVQ+iY3E5lpNDh5AYeTJp+7Yes3IVl7pmHrBKihLMKB49cMNMAUSQDphEZGT08uUxLDCWo0vOw3cps8x/LTSf1s2/1ma++q87ZG3LZq9l7G/8xopgBEfGsBMgmY5SoJ2KEMPgLtJDPOL4Zulk+H7FnUxdu9Y8AbtIIJO2bcUVKccIWDin45t0dJWJvsrxUUN9XF613rkjej/Ihre0GD68iTEm5gKz5mO/0ma55QdOiQqYAL0wLE8lqhu04JBhzATHLdCDWU/v22dWo4vcJBjOz6rVDZjqHzJLFuNU84kHGJQir0JZbBPZuS9jmlti5vDhDHb42g7ygQM47wpkLtc1NCbNe3651VRVxUxNrQx0P+NmDx9J5l4HZr4rRYHZdxMzJQbmAC9PLwxEYYh/+47dp9kD0N7Qm05dWIFxAaUvgJaWQiZt2BDdBQ48laBxw+CRUFY5xxKQAcwD/pJVVi8Wxixdao31/mJS595cB2tHR79ZsZJrXhnT14+tyGAUTnt83vcqCrvnryPDcexYCJOaSBgZ5DBGOg3A1cADZvn+YocPp6ru/cmB02gGkzD7inetMDh/7dUDI4i1d876pTKVBPdIcDM5EmGSljyicyyAGSJcyckRrSSfsKESc5zD/hRS1px0cjmuRsAUDsZPnKBVaF1eJdWdraGy2C+vLjmV0vQCjJLBULUNIoYGKIGSaY6dugtTOS4Dk95MS8JoKhsf6kmXlSXjmSSWX9BFz77w3F7UwJ538skt8coq9FNPIEAeEuyvn66fPZnCWa4xlFrLkK7Dg9hUyi56FouGNcIoYbCPv2vXIDofVcL0qEIWQ+9IehYIzG5MsQG6TBFmMCLEgRr0Bv0wOFMRu/H9y54nDu2SZd5YS0tyCBOwaTxpKnJoS4tBd/Vg5tmndxfduuvTnPUKEyqJ5U9OOCTeI1idHRhAXQ83MnF0NG1amtERxtiKyxt4oxzdeHQcOF7yv9bWStGzM5GKyB0t2S5jGLRb7YnZj1egRwSoD/zR/L4PLHsJDHudjMMgDozPeiefUtMLROIG4I7mA8s5ppEVtVCqcgl45EHMkHNuDxxMY9dveQWyiWYfnwPclasqTHNzAsxCNehP0pJJZNxA/xALfQiEUcjYfbAlmaiPAai9MkZVP+icOyPz/puWvfH+m5ZuW7ykYvCN1/vrKE2M5rnn1fdXVMQyV799ITYfz22QiQdNguYCzGwGZNYcCP39I6hd4sIg24SReQY9P/T2oGkCo046pcrUN2AhEQza1zkCphlUjVVnK2lVZWYC1d+3cKzmD+CZDJCqDZlLmmKGqtWe2tG/MktXhukWfGzTLru8+RDs2BdlOPzi7e1V7P/FGxpluknsYNZwlCasUGVIN0S08kPiriYw09I3MAOKQU6S3daBibNd5PH8ujTHw8NhamECQ6ir4605fr3ox6utvRxneFNm0aKEZCrpLlpchuk2Yzo72QOK7aFdPjBjFDSJVJUxdJNqkKpvr2a6SW+QGoC4U83reCgtdRdk/OgsPM3qRjUHYZO19+0ks/Lcgwz080YJEc2ihh1YysUe9VgeKfUaVoFk8cPWrolDAksXYREfjNIljlPfXCWzE4Novw4dzHXP6b+5pewjC7HqcOFFlaFtYko7YBTGHV+GZTBLAT3jFPkhQ9SedMgImlUaqCdEqepP3aLwxLP7QwYIE1xfiuBTFHfXztcHUQ0RUEJWHa+9UUymRvT8sZZhrvvhcSKas+GsAqW6A+6KFeXYxFJrdnQMSzpGR8bMyxtzh+UgTdtwI9mtl7yl0lLWdDhqwCjcKsKltvweXb40aDSpuowJ9MgPZRyDEXxImPqjHUHMxLXGQPWNVrGLbyErSah6UhcxR2YbMCQkYhJBkawkWZMvVUQJ3MUQ/AgJ9RrYRse5HPPOR7rtwvYZZ1XgZH8NLimxV8ps3WKbZvb8autY6yN64GZ1tbc6RzZaFzCKzlhW/ysomjS6CQNATPVidnH8ag5WgT/Xv+gdhrj+6YdAHIKq1oRf7FgK2QYIgcZ3dsyBZxJEwBaYy9Rbsy0ftkoSzgccUnzfGxThT85rzsHqCtgHYcJWsErzlksrkZ92qkg9VVTGcex0VMZQp6ATARjEDATzZEIIISFhnHTpwqdRY3ujsRfVbX+iGODjuwwJaPmxcem5+nEjK3lObCdrAjv6VErUQi9utA8BPBOPDbzgB54CjaILGlELXBRD1AJX9nCT5bZaCWHCsGp1pdm4sU9WcyurYrehuovYK53vy5pDjKIV55gQOcplEFfoJeNhr/h0UzsXT/VwFv/a2VD7QPV7lTQrTfqJBCIF4BtEcZim7rmMdX1Rb6s4O5NMs7qHiahtkPqwswYzrnrJhtAqT4C7eHESVyqM4v6Mgb9paop/KHAoQROZSeD0b8OvtFdU8WnK3DaL5GkfuCOTtH1SfFmqJyJA7UQlrrUO3BxjTpvL+JxdoHMpwFIJ++6PQrqvRqPejKOkSQxBYvX2q8QWtlb0zq5Go/91+MLT4EiE5gT0IbIhQxDypDUMY9Gist9NjWJTYyY76XGkbdEiggWzfhNnpf7Vz9CAGUBl1Plx/BRiDKtF4Csuqaq72qnfKJX4hcASTWwHmGgXGAgS/0xjk4dNn7mrql0cR8/BCscq/O7F93F8AWzfnq1oaTHXIS1fAFmZ0md1NlVgXNGru7CqynuKNP72s9vfjY3C4V0/JRDPS3LYB5ayee/rv8HWPQZK5qpZjoPCTDu5zRIRYwvKXUZUxd7X05z/kYG0oxoJdoOMdWKiXeBSytCQWaj7s1236dYjL5LYMXslJO9XsBD4HsaFDHSZSDtKJrYgfBn3Ev41Lq3fz3h84fM7s4lEpqcsGeupSMYPJMqyfYmkN5Asi+FG9Njw9e9e9PGJ4ltUoujRL50fw8Hr22n0iVGVjEXEqHc/otBNcOie1xYJLu0cv/QTCcGeB/jSAT4RYexsbIod/QJWZKjRlogwplrNj/wvGqmIbSaTGcC05zCayZE0RDWexdYk3LUIPo+id066E0LRkuz6RDV4EzKXJ+CVCXSmXs2S8X7mB15ZNfoGYRD0ojpMUvvAj6uxo3zryVLyHmlqinnHmklunKaiB0Mg+1jwQNOAyaoYevAxVH8wZ93ZmXFJl8QoUgCz3oWM59qVMKcYE+Cuma9Skx8G3V3IN0sXnFWeOqCQvEQGNTV5l7oe54wenOJKAhSWdZlREuZlwL8SYdyqL59GY6P3F7RDJ+NRZB4nVwOJIuMiJEUjMpEaBMUpfySCKTLZMfN484LYJYHj3NUgn/jCAAa3kCIsRcUpURn8IZmaN+OmLr+0j4usjhhrbcBlh1fBzI16ZFDAMJr9D4oAzYE72yeY9bMY+OWIXqQIJxnQNv0zJegEYULa7ecAAEAASURBVBKTS4Hg+lwcjROrPexTINN4kfYUZiaCXCtBA+6Mojo8+wtfMOcDvdtnlssQ6vkpkDkuBMwig7BLNIUJzeZG3FrS0hL/lIs41/UxLx63TQV7X1zfZVvF/c+UqMLzzFHpdTMyyn1Cu1tu8TKQsMvAtDcfOGBOB8PuhydKGbvdBGWIqLBnTxCvXYn7zzD4bGtuhvQ0x5KgEbXV0VKZw7/psVGsy7Hqg0Th1CUkC50IdCaQS9wJVErSJtVGTURw7VqPp7Q+MRHeL5o7uPEvKK//nVJle32UKjBLeoKFr+NE5c9RS1QU0Xm7cA585g/acXOorHohv6VNkm4522s0Uv87jB1tmmdUdL7MhC06EVj9tp0Kv+eXjd1wY+uTpQQ2z6hScmk6cGLejRhKVeCIVFN6xFsyMuotTmc89ppLgpIaspIozSNF5sDnP7cnO5ZJDaDPMIR+VBMOUo9Bn8INASkw7mF4GkIHa3jhosU333ijrAdG0pnWzkRkCL/glmPp0ZfQu1sj7RFe9cNgtx8HaQdQDQ5wyMtecMyLlY/HJGbhvETN8oLU1ZVtxUnOazHv+YmaGnMGZuYxMYCOPqdvSgQe+wENrjTsR8H4PxgafQsz+y+W6H0ebRI5MC9Qk8ismUbFatIHEMbX8XGugLzRD9qZA97zj3P7/wuX3fwFRuAQ13mYag7MC9RUc24a/OH01JVoebgUyXUIFR6qOmhSu2kIrXQS3FyNVvCvMKEnayWl+5zHnBeoY1wGDh/OXoMu2F1+sCo8KjiqUqBUf4xjGA6OG0DQvXwAs+5XhF3mTVE5QKbNwwznACdjcTvACyiY7QhKBYVLPTLYhZ0rQIG7jwtldgBbLrSoH4dwfX12xGj2xWJeoGaYJ9hash2CU49gQkIDO1lTxSSB2lMl5KvWdhb9Is5YlzbPY+NxwaHIWRTN4xKVeYGaoWzHBMNPQHo9PuYxhSQkOE7rpO5UVQ+t6KnOdtiHsdaS2R7JYxU/MnAepjEHcCf5Cow7uEOVs2UqICpManZV6l0zY6OtFPVzBTogWCvnSmRnKp5zkXEzlRdHTRdXP3wZwsRLevWoOwXFhSgz7fI/189c0bejVc6ii/vtuRLhmYhnPoNnIoxfCJooTHcjoezisZLSFsnVM6/FHt097ktVHBUm1wzUuQtc18JxupNxwcKmuZuKqcV8XqCmlm8hX6iVOYO3EJYqQK5wqJ0IjjN2cnFUqFQN0Z8mgxyNmSZaJZFBa91TW+s1lIR8giCRqfNwFDmAbt4DvjCpMFBV0PzNd3NxXDfXXmnkq5PYdBTyWgrtkIejNWAmsJ7dQOTRzUdLa674P+aZPFcyppR4orDcArxfw6etTb4qU+Pq7rROzHfFpd79YDzxgAvEaK1O+PJGps7DFHKgry97Krzx+JcWElcoqNe8DQQHxcnFYaiumfoTFtBa4cGhbBY7RT55wiYSCTuhmTiTjMO4aR9aHN6/xjxUoWGLpEJCO7WXo2qOQAX2Pj6UGefFMR9DMVFRgHwbwqJw9F1eUR6mwe7BBx9MtLe314yOjspRGNyRE5R92I2l0+mRM844HVcrupfNTD7ggOjkvf7i+kBN+x1swbnAFxAVIldIXL27xUiFjSpxCIprTXPgFwJhOranzeZNA7h6msttWfP2a5rkIZFSo8/jJMjDM2fyGMnu3bubh4eHtdtdatSAV2NWr16Eqx3kHqVJ+Jv5WnFSkZkLyBg3fRGC9B6eaIdKYdBPhURVFRRXoAI73x+TrEJG/ayDLly0gHNUcv6KD3pCCMze3T18vbQgrje8t5lbkiYLr2BBmE+MTBts2bJv4dDQIPP1qACNmHfqqe1HwGje7lASHHWgJYVygiBBmL6OpLyVLRNqabdlUkFxVdEDTzfAquBQpRtB8a3pOP0yQoccwUH6CoB2fIiOkwubN/GW4UJoai4zl15WN6nDj6TCdavBQbzR1+h1F1It3eauu15JrlpV3Vy6j9IwY7FU+uyz1x4sBVsZWwruLzQOpn43IwMuozCxdfIzQ1UaVU810AM/f5o7cPNpHDOFJ3cPHRozjz06YL5z1yGz8SUjHx7ilVaIEYkSJtqz5WFXj8+9YPc8rQrgcFcK75gHLVc0UoEvY/joEgT1CPL4+xHOJVlxR39ra92C4eGYN9E3OhqPoSvYv359e+eRI2ODxKddX99Iav36Ffu2bfv5gZ4e4lhag4PlZffdt5UbnCcEGaBNiPULjIDJh19F+fljZIG0Jn5XT4VGVa2YBMfPLrZiIjwUQtjpR2fVi7uPPz0KKPK5hYMHx8xrrw6b/fuGUFgLg+EDwBQeygZbiImA7w4Sf3gYb9MWkzoQefD+HjzMKF2/wkAnCARkr+dMII76V0ymm0Wy3//+z5sacdUztAXhjo56Hp4HT112WfsB0A11ShOJVQOXXOLZx96D+PERr62Yt8jVHDi6UgvnPLzAQ6CZF6ggK8Ia1JbrweDvIEs5k0cQZsGOqgqO6tVd1YCpPr74VRpEOloAXQGObw6jB8YWBDdGS6HftvUwzLaBiBImeqysSkyqa6ZP9x3uQoDjAOP10x8fMVe/o7HU8RQjGuQX04FtS8PoXn8DY6uPjRNUyCkWa67q79dcsU54MzL7rnet3g0hKtpaXn559JH/dDqGx71zAhUKbBzDvEDlZQ4E6Sqw5Z99a/ZfKDwiQLAPWh3YqZAQVfVaMMRMfN8tH8e1p9uEMIphMcc5LHDjAd352t54rQj9NzfZWWtcxV4ScDKCwKcZFbS41dQmzMkn1+DB7riMsWg/UTyVBlTNM8dKtB/F+2gfxUTIUuwJ7Mx3zDfjjU9cH5WsoT2ulhKaFKg77+xYcccd2wW9t7frwCc+sR5T4zm4++69VddeuzRk9+qrD2EyYmWM/omp9HK+iuuKJaa4jxPUBTXirUjaOfiYJxQgTjqIIFEFi9gBCITLdXP06rfYzB7d3Q9GCywC/Piu6AvPDWKsEsO71lXyeB4ehpoQ2FKxFTnSPWQOHwqVjwK/HAOtXtMsQoeLWSSMAiTHgsWKrR8nJCoq0nifJyFv89ji5iDOkBb5chCnhBeOTz7r3XnnrlUqBKmU55VlstkUOWdG8IBuEg8BWAq0S6RiIx/81WV77rhjU3N2uKLOlLMiymYrKlbsMebbYyO9Z6+Mxcoyqdgo6CSzo17m8Mc/vnLCSRMy9xcW0Bq9D9n9ZygYuME6ECLmiQqOqjKrB5x8NzWrSnwRJmaqT1PdqAZ2I3hR83kIzv59I3JfOAurAgvqqtVNMvapxLPspYxxetC7p7+dO3vwWmeuFVGarornxc2qVU3SijQ2WkFWd9Lgl0DLtWCBvX6M5uMNyEvG92tYEP7VYnG55ZZsbPHibasTfA5mGmFsLDHwiU+0T9hKMkhh8jSGPetJYZKBe+9+E1kuuxxY6KHPnwLPNzOfXLt8s4pDIFAqfCgE3p49Jt7bg/dZd/dhehgX65UAa9Y2S8FmgS8FdEp70xuHIichXBpNeE27sRGSCmhqMqYFgkOhnd5i6IY4rp6Fv+RyyHstcDfhRzDFfmsxqv/2b7tbR0ZGjnonBtehDhxYuRVXw49fQzkRKTkhjp85pUX3BtOh5p9RWNidY8ZQMFjw2dPmFLh059QOaoGwEC9C6IgnAkQV7l5Xl6kcHsTTWHm5OpnCDlqmLBk3bW321EMpAsXxDQbyaOkyeCkWfbMIaF9ZbdaeVM4XEGVxNgJlTllxpwUE66OYuPhmsYj/4z9uXoCdRrIulUB3Lu2PraLwXfeyssTYkSOtFKQJRqyFlPJYX4gwF23QCv0uCjjfRuM8TSBASIsKCwUhaJmAJ2bYua2Q2NENNNTdQ+FNdHebmqFB9ronBg7O2R3jrNv2baW9W7F4Sa2prk7K2IZjnIkAi6K8qNJ0YexU1+CZNWvK0QLFTgjBmSjtXFtDHn8VFQV7HuOB9z/+x+s1rc019amEqcpmxxJmNJNJebHRsrLh3h07Yn1f+tLakndEFAvohBAorF18CgX93Sj8bIHY4ohgIKNZJ8XQTfB+8uMDaxMJvngGd64PYRmGmYL1QKBAjz9RVQ8DJsviTU2NlV4WIxw64mOLAQErGXSyoLd32Bw8MPGLoJwwWLW6WbptWI/BYLowKIbPglSHpUYK3GTiU0jtxLEBlw4iz5aBo1g1Oz4w56bNUeAS6MJ9BNl1PQRmjALjCw4zkS0Jir394CZ6PE3ivfH60MJ4fBKSACIW+gxbjNUo5Cy47L7h7V4RLsUYT2XLQThyePz1G4tlfzFNKxMGFBoKcRVGA03ouEQJTpSdS+sXSY9ysABd39GhoayMs9AdvPVYp3/WCxRuEWpAzfObyJhT8fHCSLY+FKI0Chv1KkDQBnrZHsTCCKCQHRXs6+zDbFy/uWTDCino6PLJIJ4zcBMBCzzjwbWhYoDpWrznWWZWr62C4JZJGPm484KTnyPFzXxQAfBNLIV8E+oAlh0WodWauHsg3o7uZ9YJ1O7d2ebqavPfUQiXIWnsj4kA+clU4XHVYHzj41PYXHcaaD4qYFfskYe3m7PPWYYWIylrPlz34SxZscLOVzIIoyNjIiQcR1XXJMzqVVXmpFMwqgbk+0Xc52H6coBdkmq0Wv0YFvC+9r/G7OCfTx/5QkpHXdAKSU7OBgU1iQTzGdA1+ChAIiAoWDL+gZ0KFM3aOlHPuLNCoKo4Mn6CX3fmLoZxSOyLf7/jvKl1+UA9D+rqKszpZywOhIELr+yeKVBIED9TXm6ymJLmCIwTG/MwtRxgzh1NOY3yP4Cu+OKFC73+qUWpuK/j0kKhtjgVkwgfRaFLQJgoQCyOTLgKE1VmIj+x81W1g1HsqQZ2oEdcFma1E9U302lagBMMjz6y3Vx8yUrZPVCWNGksgo5BcBkewY0/p9yPN0QVquMdp1LD1zwtFT8fL8p/NSq7vsFBHB0eMhc3N3tP5HuaqvmYCRT3yKGmvgIRzUCYtEVhYrXwsVXRoxFBSwV34tAsqq8P/Kg7VBEmdvdcXLWHOq3AQJ58osNc+bb2zEC/iR/uSseHhtDHQywZUQJaX8RaTdbOOmCGri4JYZQoG47FotAcHyEtp8kVurvR74wIQt19VTASmOyoqbGz/QyvlDGg0gHPZGqeYfX3290d6jauClFuaGCYNpJszRctHtfHMXPkDnrMAD/OSQzob8DU+/ePNvAZFSgMCtcggh/2I8nSw90JIgxgqKiOG7Vqx9yP/FDbK47vNaCXv0gb+Icfy031MQ1qTU3SnHnWUjM4YGK7cYJ1JOIEa7FguK0IRwqky8gxGKHUVox76gicyOjYXtq6FvFra5Nm4aJaGfuhdhZhKjXMAQzn/YG+6eg4bMbSpTe53PHBsSbDGm+8yTgeL2DaML79HgUL0F5Z6e2YalxmRKDQpfsEajSuULPwc5itQiCFHmYt7LQXN0fAtHUiTuCPfvJan0i/Pm0oQRgeGoJpFSjuYlju72TYugVnJ0oEtgrclKoFWYWpFO9sIdA9Fih1TYvIDKt1eQNmJe0gr5TNsDYU+2sXpa1+y+ZD0vy77sX0PG/VtqIxSGtzkWn/Yv6PlT3zx/IDLx1D8AEdAwPZfdXVU3sAYdoEipMLyPzf4gCcXTpfQAKBcM2u8CABKlxBd8+1ox74AU6+m2v28VTQVFW/QD064Ezf+nOXo3AmWKOZUnc+MNTKqjKzdKk9Hs7FWi7algraQiB92FrUje4JG/rSgC0EgYVmMgJMP9oa4lIgs2tnd8nC1NBQYZpbqkmCEzOyjmYLrVjNih/Gx8YJGgdY1NBiLUajQHZfjG7gpMZXRy1QCDWOmvO3sD4kQwK2IqH4WYERwfLdtIAHKgUMboKTLzx0A72irRPdHHfiuhCE4VpORc/Mf8ulK2X6e2gwZfbs6S153LNocU0wdsGSgDwgXWoctIWgMG3ZfGxaQ/BCtksxjr092OFxsPQlnNbl9RAiW6wmm9ZS8+Ro8KwgUYhYNAgUIRzr91W1Zo8Alo9j7P+n2OH+PwW1hJ+jEiju3IYw6a5eLbws1PrRTqewxV0FxMdRP1QJrjnQU8hQq0tVwgyRxPq4dKOgOnTpT4Qwjx7pTwmwZclceFGbCBMXeQcGRksSJsZVj2Ew4MnssEB6ZFcG/U22NaxCa7jEbw25O7uU/YAMh6D7AqnfuWNyrSG7swqTSav6mUmVlYQCC4gUJt8iN8SmCwsWXaG3xv+vuztzaUND7G3iOMHPlAQKgnQhCsvZ+KTgslAzBhGtTFCwWehtLMMqBcF3U8FTP6p6nXtH6h+4/9B6+JQkIsGillfE0pe/dcEbTU1l2OYYpouwNG6kH85BGEuFBQtrzNq1LSLE7PbgzJqJQ8AmBPBk5Sp7DJyCVY99dxKPCT1aBLZMhKGhlDlwANOIpYQJ/IWIb2Ulah+EyVk8//47oTXRTz9WZVhZUZi3Y8KDtVQp4ZJxbSsa/C7U+Gn1JzYnispRu7O/xjxQqbAEaWGLoRQgsbStk2hpSU/MgBB4V/X1ZG+rrfc+GLKOMOT7jEAJW6EJ/G+0YV5DkelvXy/dNugppCxx8ikeCpM7rtJpc7GjG/GVjkuXbjjbX/adb++9FMyAaGA3KxAEwHFf7116WdPWAwdGa884s/4Q8sQNX+MlXdJtW2ULk1KYV49hDpBZK9qnP0DKAAXICouqheFo1461qy03/PXx/YIUmPO8M+4oi3+BnRZ/lecUMpbcQmFKsQ2ry+9gDECcAsAosESLisCosiATxA6qFGzfLWRHHPilu/hTOo5fxfcw45JOJLw0uj65+3vgm3R5ww/hhRd6l3YdStW89mr/ImRubPGSir63XtHSiRpX40hM5t48HMccSDtT7mRwAURahrGkyMm9K0TOF6BoAtaWPoGPwiYgpQH6kJeQIQiY8ooJlr9Eg3IrxlTbA4c8jV8c82zzjOjiXYeFL+1DMkR+Kgza1VNzoDpCwtYn5Ef9Qyg0DoE/Bu/ji4o9WLGGhkQf7V1Ai5XFPXEUbtPTna6qrIzjJgGDaXIve2D/SM2dt+896Qf/uW8lnBk2QVVrmv89LjlAJvCTjrsaVB0nRlIzCh4lgRqCqtZkBYwtkG2FlCx9BOERVUnke1cyEWoK61U42bwtwimw0sIcWORrsDj7Ydgt0BYIBVYLvlvz05uaNQ1UpbtFN/+DYvUs+Npy+cIj+L47wwj5ffNpdbuuf/fiZ7C+kZaQLCImK7wx3Hgjy/+pVEaEC050JT2TTmVj+/cPV/b2pJK0pN08HL8ccBkgjQwL9jhghQiFxfUYwlcCikBVP4sosgMraZ20CCi6SFaIYIFBUH18rlWhgflsAZJvEZCNQoAwfQQJKfNbkcgxDvyx4OsYiIJAPcdGVCk0qlc3UeHu+hP/vl+GIzgM16cTw+ZT77Zbd19CYcIuAVzGUd7d25OuHh3NsNvq9fSkqxobywbR3WOa8NmkLVtWMbhn93A1jN75FzQczGarWuE+D8chB8BLLDKrAIwfAQqSBcWnWUSjqEfxgR92z6gfxkU45eXjCWNRUoGD0FSTb+CMc1UVTtlFQAjfdYcwfRBpYq0ejxIouGmhV2ESAQK+TErAXQUqobhwixImsVM3qsT3BTHkhlam8u6795+DA3gZRNyNu+i7u1MUKpzkAwUfOG2MLiNy1UAQM+bii1vLQbsocD/ec88dcCgURZ1RB24t2rCBJ1jCwJS99NIhvLVU2mUvYd8zZyori5tzz100bgCM+0QCZTmn7IsSoEIBI7ZrK5FA88cr2V5/bQibR1GrJ+JmzdoK7KFksRwflJ6rBqWNwopSCaH9IA4w3p5PiQW2ADhmQsKk5kfhI93xPvpXd6EHv2KmIKrewQnw4UZ8fuqfFZPY+WpgT5yGxrLR5qZk74a3NG1+06m1ezlJQWIE4ON4etnQwMBYElPb9EfwRJisfv53FueAdu1sUdCIko0UFRUX2muRsHo7yeDbqpNw30OlwwNpWObAzFV394jZ/MagefaZflRIWKgWHNKwoMZIVS2JCr1MKBrzJd9rSAkKpNpiFuMceOCVO1KwoZKcKxiqpzvdJC9UT1zqiwiitD4+LhR6ljvxsujSZTjJgI/H2nlPHj8J28cXmte8c+Hrzz3b0/baq31LOflAoVqwsJznWoiLy00SKSZ4ZBSXcChYOmqaV2dRDlhBYoRcoVEhoipFzDIXSHYcpLbW2S/gQUknNcL27XZXfAq3QdXgYGdvbwobezNmeHDM/OzJXtyL2CcVsRQc4Ksqnm2weZbiIj/o9jW9+GLW7q/KWUsrFBgx/qjCFqJ1sNCU0C1fYBiUCKIjNCpcBcJG/z5+EEW2XGg5KnfuNDdBPynAqv/ea35p8Zbnnu1r37KpB6+2etmDB0ZqIHwBxCFo8WR8DDVUsrY2EfSNgOJgBehzSsPCs25dixSE2RbxoGCXEDEWqhyoXosdzdTnGMblVxZF2gi2/Fj8HCmxFH8bX+pHVw83mGpR5s08WHTh7cpZ2QqJs1BowB55uNtcdFE9jnFAVIW6eJ/wh0c/2tvNm4H4cxc5V4vDFnclvIeLp4ggBYTjGMZQhAcq9YFwUSjo5uMqnuCoP8ct5Jd0IOGjmNffigNeq2EuGSDwSymMK9prBxsaa6WGQDjY0JjJvvHagRGqMDM8bLlJjPb1pcpr68pwWMLalRzQLEac7I7xY5EUChPv2pgIyCs7f20FJswWYVuIBLCs1Cj7xL9vFcLMGfr7x0wXntaRsGCtrRrXLLuPpEx1VdwXV+vnsce6zWWXN2oIOUJFdKQLOYHAmvcDJVqgcBlKO5GALILi03JbHLVnktyP9jTTL1Ux+3o1q18KqeLjPR/zBN4mihQo4Jmd2Fm9cnVuSwvDIEAIG3ETkL85BzmO/MV0unfa6Yv9h1my5uWX9g+zqacwDQ9l4pWVcoWYJTD/exxzAEUiWJTVaOQLiCNDvOeNxQr/QQsIGwueCPGOHWOmr5d+sqa2xkPXbhhbqFCAaOWD1rKcdOLMHx8n8WSojRYL5HbtGDbLVxR/12frliGzY8cQ6KKlk+jgzrqx7O984+v7fqeyMoEWDkKaHTsYtFAQpgsQNmMqsdUWyLFj6yTCoEKhZuCowBQbO4mwwZ/Q9/3RT3ztWnMnWp3W/fsl/OBWagp3+6oGmc3ataPXnHpaSy5D4RHXebWjhevH7o2IgxAert2qSgwMprILWqri27YdSWGFnpWDk8UgMg/HKQekiCFssiMocgVmulAQlGvU8vvZUxlc6on9ZSxBAF60SCGl28gw9UlQxX0E4p7BJTn9fqNoaWErmx80F3/tXr79B0ZCAjU8nDGPPHQEdzMSlzT572EX/igraQmLYZeXQ5Ay2f4b3tOIGxLtFDeQsjw3mkSE4C3XghABQDvXntFUc+BOv3mC5uKpXmmFVHT/eD6A0+uEDKa6B/DxIjvMcSab3/TmFlwSOYhBZrc574KlSICfxnEEBNcSZ08+uZlraOac9ZXl2Ng6hrvF2Z2d88C7/tiHn00QtB4lRQoFNChW1NlWwrYYvhNRqPVRybcnn8yYbh5ShiUmpOAPzHVKkjwDBTNVsaZnaCqrakwvam3u96OQjY6gZhcEuMvAKWsWLOQKkTFYszTPPMOLThgnIEk88HDHaMZUlMfkXS2eWOYfiVeWV5n33Fhd974PiHc7KQF/b/YzhAWfmwBtfHLdP+36BS0Q/BCH+Coseh5KzUID7jLu8oUtoOP487Arun/pUvMQLtW/jPYoLLX8oA+gZUEVLrWvMocODJmXXz6IPm8bT1iGcAJkaM4+p6EH7ym10I5pw6nV+NJl9XH/6IeLOqf05PHOHQNIu4ysZ03ceTnn8rai7MiLJ4sGCwZ5IyU21/1CsbK32lgcCs/IiGf+616sJckSko9PYSEuhcdHFaLBj+JZiyRr7QF762ga3UFbfImTxWHIpFm5stLc84ODkq+WMv3xEpcxHJCM41VID5WYxbcUrXvfaO/tnldjA4OVdvnWIFIQdxEmV0gY1fzPFRjRw6+oFBroXXxmAc3qB9qQEAbCBqHqhlA91tlpLvHzmLgF0NxSiYeR25DJY+aRB3eay69cIesM+Yi4uD93OMd3ZK12IsDBQ0OzcmG3dIEiF7SOt90MEQq0FqJKkaHAYSy8EeObnVaYxjALMDgwaGpqK9HScGIB5VgEywpVrmXiskkaU+Rp3IOIlgdsP+fcOhxtwdoMSjkFk6oCy9uWzYOmrx/Nvt9i0Q1b2UwZjs2MUpDcQslIwiqRSJoBb/AzSocq7ouTzaVwDhX8YDaP9iokiISUSDWTgA9BywUzcfRjBokf2uX5UxwKm+DhhGf36tXmJzRPBHgz1Vx59Upp+u+/r0Muk3T9IP0arms9r58FOWAZj4LBwouSiXJhQVXf+PyzFCa2EvYa6wSEqK6uBq0FJMJnsOtF6EhpwiZWjG2qccMT69AyNBsqTCTNXgrlQz/abd0yKO90sfVilw4TWfAb48QD94NaN9iLGZNdfOlkeGR44NM3t+2lfwW2UNpKaSvCOPITMyKp9q5Kfb47BcbFUTpRwkY8FTbXH/VZTFT8FN21VdjZO4CWawCCXIYWZwW6ePWodCqYEQr0cMVV7TJA/dlTnebkU5rlii51PxFVdpN4inc2QenxQbzBM9bwAtTnAa2eegKTCVhBPOlkzyxeXIUlENuF6jmcNVu2ZHDoMosWAh6BSwpsnSyQvrXzLcxFl1SFWiS1d9XVq6vM3k4ILoRc285UGmd/aJZXbRgKaMNso0wexP7cpUE9uqvZSozXOJ+uU9qhzazwLMKDQs3umxwIpOp/7OLJvjv693GZTPoRXN8fy33gx/dLuwTc6Y9ujDFV8UsVNUn59u3jdwGBFwLQQvN9BCvjSdz/VrCQLbVVyEOeYbbv5WN0mcbZCG5FFxU/xrutDS5TiH/Ii29geJzpO7AfQrZp1Azg4kp256TrF4NYoNJZurQc115rmxEVq7Dd//3aThG+cfMY4SbLK7Kf+vQiltUQeLt2ZStxPJtzFFECpYVdN8iqQEndgEBFSByhYAAqEK5ABXTgzuxQOkLXp6N+RaUdhREqXuM2VTt2yINp8Fo69PaOYAZzBEy0tw3RJ5v/8WAuCNRcXdgFL3FUPj/3UTonkLCQMNE7LYp44+wn5h8CYPeO9+3VYH2qFBjAovCt39xl+GxqgQ8J08OZqHIDYVqBFmFnPs0EulEZCBSFif61lXH16sYWhfYajgoAaVIvflRPQfDtovwJHYbp0HT9u7Q93Iswgm7gU6iRsKZkzoK/CcQCIQPq6vhiXzkGsilciTVsli4rdRbK+p//PRY5oMWpMCy6sAz75TiYF5DeXRFvFKYtm9PYWW6LCFus3TvHzJvenAj8a0gUcJQls2/fmGlpiaPyTYv5hve2QhAQLgJ+4/U+s3Fjj2xNWozW7trr5E777VHCRLqJNWvMKC4EYegSb6iMqn7aagVmuElhV0FAhCiE6q6qCBPdfFqqiruP79q5ehUydm0Ce+pR28Q693Qd2o/TuPF4PLFwUU2ivCLh1deXZ7Fwi6zL8rSuSCnCDYB34vHr6x01zc3JgowNEH3NRF2XfPyZMM+GOMxEukqhyUKigkR8mgkoAxMCcShEyD8uI4kPTiC4+dl1MG1SmGxQYCHbthUD9HqcU4W00ltaYoAXLNbWyFdfH0cZigltTJ6don7zVQkQC7s3IcB6PwIULhZqducoUDRry8Ww2Q0THLgRh2aqpCV+HL9B1w5u4pcq3Ek3301pCy26P/XUkRUd2wZxWjgLoUkML1xUPrijY6gBcSWuArIga5YsqUugBQp2WqhjvjpRly8ff948fTkAvkd0+XL0WYCkVpdSqYace5SONFFWzL7ONHbPcFdExpRXeqauNoa1R9v3O3QQ77hi82tdvWc692KPHwnBo518YMGlnlZZs21Lv1m5GptvRN5sjCgMnAhqbErgJqnYr+NOiX+LiouQ5c/wcPYkdP2ugD8REFipAMk4xjX7ehEcXygCP3RTd7qp3rdXswgO3BkG7RhrpRHf9Eb/wmee6Vmpl6/QHbi8TtmpoeDTQk71dVCAj/MnDRWx9lVNcbRYiiM+5gXKz7njoJATOoYiU3JthB8ZMk8tFYFqHpDOiy/wejVcUcxygQkIliJeipXjNoQL091XXFUHIcua114dwXVwSXOoC6dNnebKztxrYKCBHs6Bg8NmQUuFjR9x1RnE163DRsBxgC0NBlneJrRSb4eWydEulzt2EkGhGz7RUyB8M+2CD2EG3UToA3vi0I0qBcRxc+lgnFPRW/lyb4pXhwFXAMIUNN+wIE0B0JCmHLUHaXLjopfBaSpMaHr79g2avXsHuMiRTZbhOEfcyy5aVOOtWl0fd/JTSc2rxzgHRG7APwoQC3WOqYiIOEINLG3kyO9Nb4yZnTtxaw88smtHZHKcwH13w3i0obbWFh2Ua/PEY7jbBwyHk6mqqTDxbu68gB+GiwC0nZKg8MN1KL5SgvN0IlwaBZaZqqpys3nz5vK1a4s/bq34vHjiWnhaiXgFXTFfaNTMgk+9tCZ08/ViDzd1V4FSf8QP3KiH33w3dScuhUNog753370H1+zfN1xbVZVIQ9j6k8lYZvOmAe49tHH3f5lgDp9gb4Eiq1phGQUugxtgWzlVPw/HIQfIEbeFEm6BbyF1nHg9/ugoe1MQIHiBREjLBPw0FicpNOX+gwjiJoLm0yZN4F9wQZ1Ms9O4a+cIaNkWjVEgsMCokO3cOYjZ4SqYLdANOyMyZ5yJbeXjgLRQdMdU7D1Yj/pdH9dtnUiLBZ4f9dLCqN61pwD49hSIQO/i+sKS7+bSpl8xI49iV161oMMPI97ZOVz94gu9C3Fj7NiCBeXDa0+q7t/4Ul/joUMjFczkHORMdXWxDKZNY+lU/jUUOex53bHLAWWTyBF+gtZJHYpE5ZWX04EwSfMieNhFgXvmq2vYIpEixQGAH0tOQoGeqsF2rTFMPFh54P2Aa9ZWioAdOZLGG8opi8Wd1/CxcGFFsKOCflk/p9KpS6kfD0LJwDMeSzGT9kF4oNBIawE6MikBu6BF8t3UTDwROOC6Yy61FxVuxMlfd1IcFSI+nUk7xkvdAjNp+AIp4TnhavhU2UV23V0z6TIstvicGRWz+qE99REfrHKAOPgbJXN2wkz6FO+OPezEmlaWv46j1QbeLN8dyzAq4mdpqHVAWC3CqqWLXwk3CBwaGTkAuZAAbULRKEQJCIVDK24K0WToDLmQbnECcLn3JyO4aIVMYwuVxe7xYY6T4WK7G6QXkx0NJE76NhVkKU/pNmFCgQcLV7RjOxJKx2OP9JmLN9TKkMENmOtQ27YNozvpYcgwhMku7Bsk8bHsdRduqL7bxY3Ss+AFgBtauS9pMwqMJBd0pIDCjmb5WKChVwEQvDyzOz4K/BGHdEHTtQvpfdq0yw9XhKCYf+SXjDPp7utVZYbl0xI3cFVU+NFM5UQO9a5f6sXdVTmms2bLNMQXwJkgfgE9a02zHwaxA3f16uOLvbqrqjiWkvWrbqq6/okvfpiF1DI+di7Lhgu9pE/jKWahS2zBDWgICXGzfhl39f//2HsPAM2Oq0z03j90DtM905OTJihYwbIky5KtYDkhBAZZgFjAGDDB4F0Da+Izu/vEsvAw9gPzeLx9DiywC8tDC9gG5yRbtmVjWbKCFUfS5Ngz09PT+Y/v+07Vqb/u/e+funt6umf+6r5/VZ0651Q651a4FehOfhg/w5xtnOInjLVP+WzFsJunKyBIf+bMdDCI74smIgqj5NQwd4xNJP045eiWWwaC4aEMbl40K/TZ1du5CxcgMz0x09uXxpVFvSyNE0xnGGbQtZwZbEaZyIrCFjG4D+djAPCevIggWuVSGGmYYvoVJmMfC2eYe+ooEdCMklGZEvCUt+DxB8bxjbtJT6UCXOkUl3S+IZwFqgru50PxBEc9vk06riOTN5cfADfSIAmIgD1OdBLHGQE4nyN2eFrpahPVp7ekEm8kckWibSXZ4hpLwxUIP0H6KNjZSTxcoHGA1mEl8SFs3oaVhW7b+DROt8ItCHBXsksPGEOxqCT9mDLfupU3TPYGRw7PSoyd2MuUm+MpSJzYmMHkl9n/JADvBzy/jMmM8NWv7lu3ZnXX39z86s7wpptWn/VQ6jrdGMrHwjz7h+ylACOAM6kUODWUo4jAwi/ZAYIfJkKquBR0H4+4eHw+5O/42DCBkYel9/F9XOXFQqZb6PCjbkmL9SssbgtRDEdhVTa7BNwOrUaZiT/iMRhIV/SNmIBDTAdWR9w27NyvZFdxRJwZ5MTa4RHmiob4QBGIo2Xc6kmi1zCPpXVKCH/I00Ozva5KrVaTNgXhlnWoCsZLuWBwFbtgTB8hvGEEU9nXdIsdb3G++AXsRmTrhTR1gMes3VhIJbvq6ug6T+DMYR6hB0Jq+pDgfdtr+36yqQR6SIkKxXAo1X+dnCz/OMZUV1gh9ccvLLaIcLOFAYxwDYMz4le4jydKRlrEEYF7fEhHo7zVVpizUaBJPJRe8Yjjt04K9+24m/4qg2OgZVl/VYAHiETue+I4DPPl2Hd7uOqkkJgioS3I+DFQ4yeMphKpQFw88DnpZ0gFL+oWJjV/HDtiwCOyrqzUrlDHI6qE1HGxu9eLVQpcfa4KcsttPchtJYK4MjHo1MkcWqkBefHxBQg5k67jpZfrlWZgB12FIqFNCt3pWHWS0jBIhKsWFhYU/k8k9OMIl8kE2MwBHxVcUQRVJiROw30c6YbFwiLhHCRavj69uElnFS4epmkgnAUjtsdHwJ5fwwWekB4Np61u4tY04OFEOI7kwhpwI56LzY/Vd3vMgY9vchpI+VQZddphGUYZS/EARIGXtCFS5VJJgBdRzFnBNQGOO3kSxGTQxBENVH/rhypWzKYibNueCTpxOu3LX94Z3Hp7VJli6M67dWsnZus6gqefmpRJJI4Bn3pqWlagQ0n34uTXEEMcyPDiKBMjrqtQREBL9W1E+tuoBD1SmYVS7yFPeUDj4/kKIHCEC8xrWZRW6ZgEdVfR2zCBo9CJRzeN0vi2CcEv4iOcRm3jq/YrvKbNJS3OwEkfBdYZFTQHsDjwC15CuIcqTioQcY0iKXeNJG5HqRkawVAP0Xx3lCziIxqT6aNLshVAW90RypY9NUtj0+Z0cPvr+oJVQ5z0bWxQx8H2S3owVZ7H/qkp2TTIVuqJxycOjIykQzQWOxpzaR2jpWLAuOqNqM7vQzQypQ130jQ5hVrD2U3Uj8EKZ5waTnrKifgVDpu4rvVDuPgV7tnCC+GcjfP5080wPupWHjKLZ3n6OEB1uHQ3bbij0wkURYJcE4yA+aNiUwNPSUWBHD/n0GBRMrbuyItMBdPNpTh5jL35VufKa4Zh57hESRgFTW3HKOqQiPykEUDjw6IeE34efqsLxUsEz4D47KdPlEZPFMLcbOGGdEf5e8Iw/c53//rWLR7aojprjqGSYkFr9XnAP49VFe9HxbAjyjL2H5JRcCkLtMVNv31gGTfCdUZOw2jT1LMTca1SKp3hUokzQoN0M20KU1w/Xh/WlJudLRe5c1RIBaRwFQGV0gpaxMW3UAc+s2DK+BDWJv5DKlX870NDHd+JIC2yZ3S03I9d0ttQnrdjqv927AC/GuW1DWcgdhewz4iKusyMlqokC0Umu3iL+eD/wvWdv0Lg+9+7D3eGlcfCjvC1pVLYjW9VD57LPEQS1EpE999fTt95Z/D/WmGmYqoCudYHMLYGfuuj7njrQ3qmRXmITVoUEt0Mc7Q+HpXDxqH0vq10DgZcVXbC9NE46G/ZuFv5VFksB1ZwpK8UC9eIuOYMR4PtK5WKv7d6dea/KXy52xiT9E5NBTshA3jzB98DexfSvBnbG9Lc6McVQYAtqmGZ4jxGjImE97fB/M8xJPkrRvKX9+3ll95gP57hYSyFgJmZSj8MksfLpfDmMB3+M5Jz+g1v2Pbel156Otyx42WC8wjOrrj00qB8xx3hgl8ZrPIFGRRqCkuWPgJB5foPCqYqgXbnVNlUISjQ4kZhi2KRxtKKIikPhDvcWDjTTVqNg/SECdzDVb+EIY2k8WFAdUpMNw3DmzZOmSwFiUVvanDhmAuCNlEuFt+9eiTzkaYjuoAQITOsL8pFZmxMxuautHB7fGl0NCiNjARQGV4c0ZyQv+99+y7B0penUMGzWFGRQ/d3Fotc52DPZbLhLP0QzNlUJj2XzhTn0mE6j4mJuXS6DCVKYTFFOHb3Pet+e6HFzEwtyCDDfAe9nUywYv1dENjb4NSZvaQ3PwtPZ+78cMJFoSj0Vpk0HEFOYRRPKsEqCMNpFF/C4Kftu4kT9xNGo3Dja+LXVyYhthx8Rpxax8r5ZwqF8M3r1oUvNsH2gkeBzGBUF/AxB+UtQo7DQnENlomj/4EOOPcmVD6h8MxKXNOCDmwGT4gThLEPFXVEwaXbeMKy3IK50KQsWKH8BGAa8s/g/zOck74K2s9Wq6rlQFZF6K0iUPZEiaxNf9KjioJgJ/iqdD6+hlfBbFdP4cSjifsNtMFvXJHYIkmrhB+2QPlC+Um88b53zZrwcANW7eBFKoFiKt2HfTmiTNLzSfOIvCCNg1pSZVyUlEqXU9jCweV+POQ+lcri5qRiKlUKi9ykgIaNIrZws6gKpcnB1fO8h+GH6beXEPy5193S1onBvkCLm4pmWyf6aRSHtioWu4LqF6QYnsJoC73FV7jy1HCF17S5aRHpqhhwkASgOgB/FEfH3b1pU3iwgtB2LW0JpKdwvR63GmJyHBfW4NDtElojGIyxS9A16Ax+2HoBB7PPJR67B02ijkHTymV2MRdszolC+amCcu2Dn1Pt2JxV7ly3LvjfIdzsFtKoYOvrgX4ahde0rdIpriqaECfQ+3ClSbIVT2wuLcKLIGK4+QzHtf3T5MT4z23btoprHttmGZRAqTR3Oh1mUmij2N0TpUGyQmw6ROtEXSqjP4gXMm1OTLG3h64f/HDDn0nxfP0Fm3OuUH4Kd+8O2Wd+j8KOHMHdvz3BOzFg/ClkEtObbmyliqSKon6xiQce+vjKmIRPpdAWjVH7+MpDkyTLVFSJuB0axEdB/Y7h4bDh0n3HpO1Y8hLo7Jw7Xcrjy1upnC9jgTi7d+jbpaEy3BmfwtXmbLJSaKP4gxYK/b1UhkpFaUIDVRpdjERToJaVwZskg1nDN6MF+lVkdSsSx6lMKoEoC2A6s6cwgSOcedExm4NBOehGabowVSKBM4gKxO4cCvXvcrniBzZs6IhcokX6tln+JfAn/+dRTJ7OzmJFBGf55nDAfw67L+Yy6dQs2qNZ3CE2BwVjOGb3ghzCxcaLMx+mO//47ruHn1xoLpe0hWomsWhKqEAftU8VCTZBboDw3woFeSUCd8C9CW7esjEEuxPKgbX9ooRc7JgDjN0y7m05APs7WGD5BUwWPAx321xgJZAv5L6KkdIr0TqhumWsxF3yMm4yrZCZ4YNbljQy+5AXdgfDtyyCMpHfslMoJqqewSbIowi/3z71UNthF1kJlOYK/zbVlX4c2caUPL91QZ+oMKUS7qMJzeweFc18/5RxFsdcGEot2mSSdnsusqJvZ/dCLIHf/k870WUrP8fTxPDdCQ9GTBwqQGkwS4vpPCgYZv7QLGEKHQrHWT/cozZcTL13scqjrVCLVZJtPsuiBH79Ny+5Ao0QlyDJh1vTpcP4GV0/KpV8l4KScTKCs37w/9Ud966dXKzEL7tJicXKWJvPxVMCXFe6/6WDPwJh/l2o0Sr08nCFeTjAlgmTE7wGFvN6YRHhaKNSBfjxqTcs4oTmJ6FV41DAMwjbl+nIfPAd7xjhkGLepq1Q8y66NuFyKIE/+sOXcN5DChNR7OSF/DgLhaGNGb6gBHdqDb7dZo1SYW0gZ/7KwbNorMbQRhWgc/hcgw2GqbCA2QkcK8tJ9vKfv/OdG7FktnXTVqjWy6xNsQxL4H3ve7y3mBu8LUwHb0Or9AYMnPBZHsrC6XPY6N7lsNo8D2Wag5Jx9peHnOMwvvI4/J/FCOvBd71r/d6FZq2tUAstwSWkx/Ru9uzZoB/CcBnGBnci6hvx7IZ7BEI0AHsc/rMIfwHu7+KTwpdwOtNDZ84EE1u2hOZezSVM78UYVVuhlnmtT0yUb4NyvI0P9gFluceIl4g1a6BcsnOXx55NT8v9xf8D6w4/vn59uChLbZpNx8WC11aoZVbTDzxQztxwQ/B2KNB9uGhuQ6sK1Cg7VDBu0MNtKzxr7q9Pnw5+85JLQnN4XSPidnjDEmgrVMMiWhqEU6fKW9CK/D8Q+O+HMnFdO+vmXNQPhhMVvugqcsPjXtg/ju0331ya3F64sZyLCrtwS+sc5Aznc6wG2y9Dka7CmIezVPw2qMq0ZPXDLiG6khNQ5h+FYn36HGT1omC5ZBV2UZRmC5nEBEMnJhg+BgF+HZSJLRIX9tKcF4UyUZtfpIkTGFfhUJ6XfHjb3bgE2islGpfRomPgOLZfx4r6aTC+zSrTUr/Y2O2raZCmboyzXkTr+UBNpHZAYgksdUUmJuJiAX772+UsbrPn1pBL8aCRwudEcyQAi0BbJn3Jqc2w82awzaGEMdareODpeUvECoq4rVBLVFlolXZAeZ5AdOzeifJAofCR3ikS64KPKtayqRuOr6BUf4Ox1U8ifW1TpwSWTaXVSeOKD8K5Gq/FLNonkBEqE40qjdqqTMtSoZhgKD6a1OD4wECwVZbqENg2VSXACm2bc1gCp0+Xv98qU+QQELZOXrS+Qnng5eNEemnW4WDLObS2Q8snZcsrJW2FOof1geuAfgxjkL9FFFQmVSBVnnoxK249nPMSxlUamLA4jTMYuWO6bWIlsGwrLpbOFedFy3Q1WqavoavEhUIsZ797JztJE8ZPisf8Luu64WoLLGG6A6dafZmJbRtTAu0W6hxIAtbfrUXL9HUojHbzfOXw3Rq7wtRW+LK1cRZ7gIsFHkD370eWbSLPQ8LaCrXIhY65cLY+j4Ft0jHDojAcP0HZ4srj+333QlNY95vTQpjzRkG0VPdDqd6wED4XEm1boRa5NrH64RtQGEw0i6FiqHLEbYviwmv5FT5fW+OdL31dOqtUn8dM5m11ES+SwLZCLWJFY2XB3VCmSyxLCrIKs9oS5LVOPlzxW21RWsVfxBwbVlSq7u7gKzjibeOiM19hDP0KXWFJX27JLYfj48EJpMp9uIWbLyw+qizqVlvhtH0YvCvPYLtJMDkZDIyMhBMrL/WLk2JWYtssQglAmf4FbHhIp76kVFkiLQjHT7HoFC8GXnletlRQqpMYR+pC35WXiQWmuK1QCyxAkvM0WyjKzXCqsqjNYFUYgaG7RwWLwIgE49MYyMr87UAr9dzKTPrCU91WqIWXIfcRfR6KgvezmCTFUBjPUVd3PGZVtDh8xfmxr2snJin+ZsUlfBES3FaoBRYipowvgZJwkyAVhY/fxVPlcTBvQsKPWfF82Epwu3zFE4sFtT+Bsrk3Dr/Q/Su1IpdNvUBovgkl2YoE8eXE8qSd5GbrxO0aigM0p4SKf0HVB1dToLXa3NNz8dzkyIpsm3mWwIkT5fUg3WXJVRnUVq7alYvD6ddHcS8om6spsO3j0AWVqQaZaStUgwKqF4wZrT/wxk5EVaXxFUVhtbpHGq52vShXXBhaZV5mPq9TWFdcZpHgtkLNs9YwNcxzs+8CubZA5OQrkvpp0+hyI1UctX16g3mB/aKcrkPX+OcusGwlZqetUInF0hiIqeEfweyeriQngSqIEquftj+7J36L5LuV7oKzMY7imr8PYzvLugsuc7EMtRUqViDNeiEkv4XunrYuqjxKrn61FU6bNM2YZvGa4XXecfjRF2X24nlPyDlOQFuh5lHA6O5lMDbYZmfsfA7a4qii+WF0a7i6fZtu3yQpox++4twos150/f5ixSW8hQRfcJXWQt7njYqPlndjXPDnlgFfSv7DMqVflUf9STCyUDjdy9XUekG0nF6UGz+EvwmnKH2+ZeJ5EnC8+8QTT/RkMpnOjo6OdG9vb3lqakpkv4Rb2AAr7Nu3b/KOO+7g0rEFGWG6IA4XITFmrbhFYwtaKCqDKkTcrYpEW92Ky1JTt4YTtqIMNlEGaHHkPLSBAWanOQOlKvf1Bb2YpTmnN4JQkV566aUBKA2W7TZncrld41deifui5mlYmW3TQgmgknpxSCWvi+Gqcl9RVEHUZhgXicqEhO0eqvL4OM1LYgvpPJeoOKgl+O6TM8Hxo7NBAc1Nb282uPOuQZ6K1IoZxbFka1shaAV3z549nVDYwVZoFLezs7OwZcuW0+pvxc60gtzGxeVLZ4P/A8rBrkEjRaDy+F0lVSbaNOpXMVS4CV1Gv8gvz48IjhyBjfNun3/ulBwrxiTiak1ck1PghIODNZn0EbRu70HX7w+axG8a7YEHnuqbng57miaIIU5NzWUefXTPyHXX7R6NBTX0LttKbJjy84QAIZAv/7bFoVLpw7L03erXFophhDk43DSELztDJWJLhBdIkMNlNym0tWNjTGY5eGEPFYrZqJirru4Ldu3GWqMWjD1A81K0VHtaIKuLevDgwe4zZ/IDdZGaDOT46uUv38U9bk2bdgvVdFHJeIHXzZTQtfGVIypZhh9hDg4aVRoHs9HG/S2kZvFRqSNcLnQS72W2OGqoTFhCJCaf156uhhp7z57pYPelnS11+8gT46mn0I1m90xb6ijjFnwcMz398L7BmUrRV1H3AoL3RJMmjcmM/UPXXLNNXiXNEGlFN4N7UeOgsvpR+fdA6PhyjisC/fr45aQfdONdPx/nvLqpRNOQsBPHg2D/PmP7yqSJcwqVKyZ27aan8ZW70LpOIK4sNmd+WeNZiP3EE8dHZrD8GN3Qmk+j8Djt2bMz3ffffz/Hwk2ZtkI1VUzS9fkcWia8v52JK5ULgCMeFvcTNwnm8zhnbk5dz82Vg337guCJx01Xjh9eCa9lMPcgJgeFSjJpjKUOHIhMjjWtXZgtvA1Hr92TxLdZ2AMPPJA5eTKfnZ1FQmBo13o0vKMjnE1Bg3y8QqGEyxFKJYUFQU+wbdurVzWbjjpF2CyLCx8P0+RvRS434gnxRvUVIclNmGuRElozFpjSqU3YOTVUlhxOCXxhz1zw8Y+OBV/6wtlggpeCNmm01ZqdtX2/BLonn5zylbJe3iLKRt5Qqn88dqzMHtk8zfa+zk4zz0hlqMUklZoJ5+a6iq95zZajV1+99czsLNtovmDCcGwsc+amm3YcLxZLkfThbuLuWvzi8PYYKl4iMT+3t+Pt/F5UlS9JrAStNLVJqXCBgSY+do+Ex6JadC9FJZ8vB888PRcc2D8DoSnKrBwj6u/vkPioaEYMa0dPPmyhaNdTqALimp0t41wJZrOuqULIQ9lxctIRUM1rqhtXc/fl8/U/a3GSYXBw4sQNN1yG2JjvcjgxMZdanQrP3vLGneOa4hn0C9PpuUhj86lP7em8667dfg9F0SN2W6EixVHtwdjh64CyL6ObA31hUDdtdVczMRANp803YKTCahG1CjfdOYyH9s8Fzzw1jckENKk2Zk5xq+nqzopTwxRey2YrQt75fEUp47jk9TTivPYV825oBtAb+EvM+v1MnHdjf21l4rgIL8bxu+66rKpNftObdh1CuiMtUlJcpdIMp+HbCpVUOM3CULmPWlyRRHb3rABWJLOiSITFH41K8eO2hi/YZitz5HAQnDpVCvY8fxpdKBNVLYXptgqVNXpVN37t7uEF75SzFsEBKPJ11/dGZglr4SbBMZX+0zMz5b/o7g6/lhSeBGNL84VPvBR5QZU6cIQvFCmT6Z6+/fYNp1A1VUpTa2axUEilyjPlCL8w1d/UN4F2C5VUQ4Dhe9MXYfkb/MtNAABAAElEQVTfM+LKoH7lUFVhNsDHI47vV9qW7RDVncP7chIn4GErScBJBfT18e2o4JSpHlNtrbh8qJGhslIxjWLVT34BM33jZwpB/8D8RIuziTgz/atQkh4IfO1mJ5ZofCqLmlwYdnT0nrrjjvXNz5JbDvz+xjMGI6aUa6KkAndkcIT2YvdQmSBAW1EOKj1qa9HQ7z98m6lfcSiESqdh6nc4rToo3KfxvuXKBRV0CjvHIDQzM5GZNgOs89tMC8V4aPzuo4FEf9OZVLBje2/Q0dmU7EWJPd8stAP5Qy4xxdakYasSRy0UZkY+9rHDw5s3bzx2ww2hLaE4VrW/WJxLFQodEX6lUmdT9BGiatYXHwTK9BUI6Gabc1UEvyB8pfDdPk4jd9N0VBa+tc+cCYJDB4Pg8CGjTIyAYWq0W8aJh1aMz6MWnX6DmpmOyhS7gKl0Kti8pTd44/esDt78A0PBNdd0YDOhl7BaTBvAka5ubEj8VgM0CWbXDZMLmP7mpAlfLmHIxyhmLr1nz75N//iP+zbcd999EXlnV/Ev/3JvVzwOvqyUXnkWi1MNx0/kM792OZ6CC8CP+5wG0X9/CG9jvl4pEb5UoM6qYTbbETylBZ96NJY02aKQs1U4dgyjYFSudMv8WBLIqFCkK2ISopHBDoZGKJFwVajpGatQiGjb1p5g92VdwSDm5PQbVYRoETzg+0qMY/8UkxS/0ohdOt3tPmnoy8V/5UAxui/f/vZL/ucHf2H8x9+x8aTy6+5Ob/q7vzucS6e/fuTee++Vt1E63QuFLKI0WaLGrF//sqoJDQ3z7YjG+gEXkxvKdBWE9ltUAptv31Y3g9RN23aEhIJ+DRNAnZ9EPHZYKLj79+eCT/7LGFZzB8EoV5E1wVkVkHah2FihurrMTASVthnD7iRxBweyweveMBzc/Zbh4LobugJswThnyqTpQr38Mi5h+EH117Ix1X3GzcGxLcHDVkbwbduCz0vlcjY/8Ld/u3/H/feXu9my5SdzYWmmkJ2evmn7hz/85DrBx0vM0YG2VEql7rgjRO00Nhd9C4Uu3n9Bsb8FRcUC4wtGBd7ZCJe3n60eB/dw4Ywa0gBSF9fyC557djZ48cVZrOQuyHcinaEjRy4gbST4DNenVEQ3zJsej6bK+HSGj7zrGbY8bB23bYcyoSUqlSq9o0Zpqse3lTCmAedRfAybOi/BbYn7atEeOvQXZ7Zt+9nVxRksAVGDdwteUqYOVEkYBvfMzIubPvzhfcU5Vnspn+JmnDDs7v/IRw7251JFzJIDJmYuKE4PocPdnNEKbw77AsLCu6oD+5o+jSyNQDhUkWj7j3T/IPi8RM3HYblp1zAO1+s+iaOP4kg3EEISHj6cD57+7hRm5czaOFUu0ATZbDrYus2sdhkebqxQ7OJgPZxMGuzbe1r6muRTy2zeMgghzVBQg57YsJ+KwpZyzUiAfU5GoZZKeWqll3C24GgRO1CA0YGcR/TX//Xgpnx2rulVDR5pTSdebuHP/MzOF4BQUdSa2BfpGAqt0pugTH+McsGqLb6ZpITMryksdbMQ462TKomEGfSav4Kr/I8eyYdPPjkdTpxlS2Ro1PY5ZO0Yh3TNCLOOGTgLZ3TY5xZ140WCVs9Eri2UlkEXRHEttvz5cfruKKel9TGNmM4+i/Rzpy8zWmV+6pe2HP7Qh168FLhNCX8Vg0RAB2cbm+bXoNFPjGHFAlEZXdjf8w/IwEYICr5USKvj50eVhTB1004ySXDd++RosV4udfRokJqaKoX79o5L65GkRH4EPT2trWLQSYN8jZXgPm8qSBozczQcbvXjS1s/xkJp27VcLgrkp1ndaNm78M1tDH50QJNNubxjb6m0dwdmIJtWgmRO7OKWpn/xF1vbuXvRKBRmizC4Dd5qC49vOO2yqWI4JUCY7/bLW3EJ83HErS0Kpl1TZ04HWQhsSGHnHiNOMTdqPTSiZsc4is9xBs3MbM3ekIQTb3AoG6zfgH4uunS+Wbj4+dzOnRutzwBWpp/q7w95QUOVecc7wvwHP3jkYHF6Ymsxky1niuVyAd22OCLhCvPDFR+t9+wv//LuQ4rTrF0VUbOEKwUPa7i+F0L9n2x6mV8qEl/RXJuXQgWJrbCYzapgq0N80gqd51Z+6MYFHeiSZDEjRn7OUJm4gmF6KhccPYplDU2YHTuHpSXjGKbqi30CPb9RUTwO7B/DzFa0N0R4b29HcNU13cGGDRmZZGD3aaUbCPyJ3t5wXa18YBYvfeDAvt3xcFWYOJx+DcvlZkff854r2NVr2VywLRRWPe/At4cPQpk4NUURUqWQQqKiQLBkkgAAqoCnBgZFfs2PhqktUChLFqsWevDmJ28xvjIRoN2x6Rk0VU0YKgATRaNjnEZkVBCScK8SaYuY6ePSn127+4IdOzISRr40LSoTqSJ5FibL4AfluhbT6dP9/cEw8ly18ujee0O228/+8R8fHM7n82iPU6l0Orm1YnY4+YDPbLNzM3994L777pv3K2dZFtZC6mt6urwFrcT7IFcbrKBp18632YqkrUJpq0NbcVT5tIWSVo1Ci8mMXvTjuwr55j6Ka+tx8OAZrL2zfbM6GeSkwa7dawRjFSb6GGc9Q0VhHDQHD44HV1/TE2zalBVlbFF5DJMV9stpfdT3EKbUbSkkZ+C++/Z2dXSM9YdhX382m+0Icvi40FkoYMXf1NmzZ8fvu+9KrIhcuGlQXQuPYKk4oF89gpbizzDg19EBu2psgZlHUQjYqjxUlEbdPdJJdxBjoo7jx4JVqLwm1maDyjOnTxulePGF5noQ/IbELh+VgVPm9Yy2Opzk2IDtjxQuhdWju9DCmG90t69dty7E/uPza1Z8l4+rHCBQ74YAbuLbHAJVgs3WR8cy4dNPTaw5cWKuH0XNnS84cECUDAqHzgJosLA/LEPB6GR1AMa1/mEhn+pYMzKEA0SMoPLjJiuvFUPaVkwXZvhUKTTeOD27kYNovdDdwTerihIpXRz/QvdzsmVgIHgME0//EcuU/sv5zO+KVSjsmdmKLQv/GYXHgSn7vHy0qwanGIpzePDAzKq9e6e15bJBzVnZjq5g1apu6Xrx42mjVqM5rrWxuvDBlYbjJ1UQ2lQuKs9q9AbbShQpPxnn2TMxfg9KdTOU6vsiGEvooQCuKIOu3RUYjP4VJgT+FAnHe1qWDIniwK3tgfpN3hRqfC39fvfJ4yLMJKJQYwzVtNExjCpGM4SddusDu3F886K3H6zFK2PLVrw51kcVrRl+FwGOq11b3ndBRvZjLHpeZHvFtFBQopshHD8P4eRHPb6VaKKKQ5k3a+go/BrmCtyQtPZLJfrOd44Er3jFRmkx2N3i27CZ6WwuKqWZbfB9yGCZGTguO2J3bj2Uh0uDVBnVVty2XbsEoFhbMe4tQmYuGxgIn6+Nufghy16hTp0q34zuz7+DQFExOC6Srp2nMFoqqkAc0MvYyAZgrIQR0gLM1GQuGB2dCtasMWclJO7oTOCvU+YzdabMdU/Rxk2d2EvUy4NK2kqUUJatgvgyw3j3OSyq/feYAfxAq/TzxV+2CoWC+EF0e+5BxqgMbJF0fKTfj5hnVSJfYXyYwH3tItF8zDNPnwhuuXW701SOpzhJUc+oQs0m7KJli7Nla3dw+eXYU7Qq5bZBXKAtkYxz6pXVuQhjlxkv4z9BS/V2tFTXnIs44jyXnUKh/3sHhOqtbGWQ2HoVoUrkFMi2WvE8Kl4c3pKf09mPoet33fWbpAVhf52rINgtq2WoHOwy8pwF4w6x+DQLHn1BV3clWaz4c2zqleM5jlrYVzK7FLF5cbCeYK6GUuXgXofLCca84EV3LhuFwuzMnRC+eyB4ZWTcFwBWhjxeN08rSG2/YHQcpXR+2ILc09gCzg+0mzdzLsQsKeJYikoTN4RRifisXd8R7N7ViS0RabdyIo5/jv0JKTzHMTZm79dxY+wFYqAesjj85TQU6za0Vl9dILua5OddobCVYieE75eRQl6zWYTbn51RQVBbxkc2Nwqj7R4ooypUzUwvJGDf3rFg/bqBIJM1yWTXjysafMN1sNwhsWt3UMKYCOnpwTiusgzJx72I3Vp/S1YE7FGgC/ggZO53zsU1OszIeVMotEi7oDxvR3cH+1uMEsF2iuG7bYlrGFsEdWulqK2Vo28/wt0HWw1ciE1tffjhg8FrbtkmqxmoKFz8yskEVFZ51VBQ7OnFh2HT1ZB0EadtlkcJcFyLsfnvQ/5uw/eqOxc7VUuuUJhxy2Abxb9FRrZD0HAYoWSJghdXCvVLmKdE8TKI4Fk+5Cp0gqwYccp5+jkzt/elMWwNH+IYqrRxY1Do7ZO8sCWiMmnc9WJWpZ9nKtpk8y0BvuAgT9+D7t+T6P5dPV8+SXRGnJNCzgEMWymuw4fRP0SGuMGPQ/G4wMkMngfXcLWZKrqTHoYtmeFC1J27CtO7Lw3moEzsqooyIQF+WpmeuF/TWAuu4W37HJYAlQrPVTiq7InFjGZJWqinnip3bNkSvBvdO+wPlZUNsoobblUM5skJWKw1UngcV+GklW5gbPwUbaUEa/F+kMbgwS9P9uzavYp7Q8MzZ2aYCqZDjHz7Uk8sWn5MGxiw04PA72nhFATOCHIswNKawh6r+P6nWFQVLwRocLAT6TMJ7MZZEjapFZw6LnZr1Zw5g90STRJnMyH2Y1WmQi+7vOUtJBrtObFRnlej+3cE3T8sL164OecKhQHgdajDt1DoYLObQ0PbrxJxQyFUCQTJw3G44OHcNpz+JJjGpbwW1ebJRJu3rOIJp6lTJ6exhYIK1djwzbh9+yo5kJHY/JZFWLOGkyA0pHnpBeyv5wixCcPTXLu7u4SOC3y7Qd9stFwZwgMfaY4fm8TRz9Toxgb1iVZ82NFyMe8yNRvQUu3t6wsvWWj6zmmXD8r0C1CAH0AizRAd40G2IvCr4tAtj6coDqZhsGni3UGBEU4HjGy1ME7DE27Dy6yysEELtziGuu66zSKcdDerTIyZN6ZnsLyIhotc7RhS/I1+/Fbi4IEzTSsT+W7BSUdUQj5Ymd20Qb1wa4QY3rzRrDKRYGi426WR3+vIa7karKzYjpbqkYWm75wo1OhouR/K9B4UIFeC07B10uJU24RUFELhtH03K0JhaqtCCg+G820YM4obAy/cu3p1T9DZlRZl4HepZg2FecPGijS38sYmrbYS09Ps6jX/NXjNCJdMmSLlbGQrRltElHFw8IBtHpthAPyREXNGGdPO7fzzNKBuaJrBqcmEL0W210jndZio+FBNxCYCFl2hOB2O6eNfRQXEeauAm5o1Ney7mVxf8VRplC6enSpai6D48fA4/bz8FKwrr14nb/qzZ3NBIXaGQy2mFKqNmyp9Hp66SlizhrexM24+Rw43v+SdB/ivWlU5oLIVheIUM8dsNCeOTyK9zSWYaFu3rnL5Y4uYQNocMyMnJhG1f7Wua2PUCKm8iDEeQSLRY/h5rNZ5bQ30huC40DckqIcA7b4ZafoRVLq+PplRfRwpwv0CECWyXUGF02aB8xEYwz06wvho+gVHcWFHjYZGofPyXfEyKJNtDY81eegKI8riMgcelkLDMQy7e80ajmG04o9DsKlUzRgKsXb1iN9o7WGcp25V4Rt8fNwOouJICf7ungxW45tuLbu0eMEmmSZzkURaE9askgoDLdMKt5Db6Sl1D0C5klNdQU50qUAmBrYCxKDue4B/Kx7tfGmB0Ra3pzQKi9uMshmY8BPkSneQXhoNc3wgWAozGPP87evrwAZDs9nw8CGesdc8o/gbu1lKxqFjGNz9intxm5sQIH/OJOoZfK2O1zRO8jlwYEzeZnQ3YzZvnt94rRneDXCarhHt5hmCyi9dbJVxTsfeBnElBi+KQmG89CZ0D/iBTFsUzZjajJzueCtDuG/q4Sue4gg/BcJWv9oaxDhbenMpoW+zAq6+ZoN0XXi6UL0tGT4d3auGZP2RgOstpo3T0c/L1GioWK2MYdg6rV2HfqU1rY7XZGoetLgmBjd6NF9869b1u+4d1s619NLRtJ5ru9IyVQSDQmMMxlL44y092PHwFoU2a8+rWfOZs5sH/1V4WOpJCqpKVEmzEX6yiQs/YXEjs3sQKJ8+jsOK88OVr4VRHBdmNm4akBkrcjqEiYhmOTLiNWt6nJDFzxKvlypWPLt7NBMTObw5tfE3sHq/mzZXJj84IUAFa9b447XjxydQsM0VH4947h/ocHG1klcvbUxpcxF6RM06TcvkY2v3hVGaqFm3nKfAePOfAGwpLUkK4MdW140JiJtQUa+ySG5aGwliIvgof02Uwn2b5IJr6UgTCfemln24c9uupPJROP2LZnbtMgeVnjo17cYzzTDfZKeridvKdDXxKdg0VIaWxmuYltfjnFl2zewuNjEZBdY3+NEjZ1ERLM7GhgP6LbGJiMZUiRjNRZhIWhvIMjT5qogH2yf6qEb6GJcBcFYVva9/rM21OkQFvjqkAQTn320CiipTHNsvFMmBJ/TEdbmySpREry0bB7UljAFwS4/kOxHX8mSYxi1xCH+W1jwNK+Fau/2dQjN2urkPuIyOU+u85YKGExF8mjX4YOze9IcPtzhew80dFCCaVpQYZeXGa4VCEW67h9+wqvs7MFj55tRqXusyXoRAloWWh2FHRVJ1QqYpJLQcrBIpuq337N1brkyTVoISXfPq8vE7E2ZDfhgcWW0iuDGbkQlcBLoaj+E0guMpm6/gDKMQhh/58KHvxcqEYjYbFvr7M9NXXd13ePv2nnEKO2ltHJoO5as2y0l4EdCqGRzswDUqZnZu//7mvzlxPZLum2KcrQg2K58KxUqemysEc7OYv27SrEb3Uk2rH1N1IoKtWivjNca3dm3lQ1Orqz80vXVslbM6KNVBRpHipHE/ypkgiLKomUqKtdlK4aSrDwLhp6pjqIa0rFB4S6fQFflJsGIt853LqOs9CHZdP7rjuD4s7qYft4KnZtH3xVl7iHs81//Q105f/tDXxsLLLu87ct31g8e8t48tBiFb8A/5XvPyjdJVyOUK8pbjd51mzPCgWeZDXI4l9HtOM7Q6EUFcnofebJzMPI880/KgQjUbL2n0w/H4eC4IsaQp3eSypvXrKxMRzKtu/Y/ntRY8jpfgb7lezVhJyagxdOt4ybzhXTyCVvut25EN3ga5/3m8ue2I1lFWOTTGqoBaAExC/DQKn68jSpacwEobLQX9XP5DJePj+7nkiLgOThzr59hL3dXhyOe/fPzEjRMTefkqiobapJntEky5WE798I9ueryjA4u9zf24Ei/jJ3+m68D+mf6xsXwXKrRrejqMbQckl2Qz0N+B5TOVhZ0mxmTcOFSFmnDfHcdL8vvx+O4k3DjMj8t3x/GS/H5cvjsJ14f58fhuH4fuS3a0XhZxHvX8jJtCYAzFQxUpmcoJv3MQL5kG5fHfsYD2p5I5VaAttVCYhLgRAtpVp7CZNH00Fp2scP4YThyfeC6LJZx/PziYnlSFUiZqp9Jh+btPnl275/nJ9d/35nXP9fXJRSURntu2d0/jmcGHysFTJ+UsPyVvaLv6Aabvbki4AAQ/Ht+9AJZNkfpx+e6miJtAguxIN7YJ1JZQojN3TnSSeSBYunhEU91hZp1Q16T/cVA0VCi+zZsyUKZhxPsKIGuMvk23PsqPbYjy1zC1iSNuFLLCIjZonX9oOCtfYwhQY+nEu/fFqbXDwx1T//yxY1d86Ysnt3mDf+VBPJzALDyVRdte4hLg9yzeDEIFoHJRjltVXLZApCG98qmIni8hQLLV7UPlLAKXb5sAp0yk0cchiQO9X2yMLf98FFrtU4GvDolBEOfdBPmCTi9hvnDTDxMRZAFEu6iaR8GzPIUw6WdgIDuLglQaQcH1l651zeVK6eHVHdPYylAePTHX9/d/d+Tys2cLHQnpSmLfhi1RCagCqTLgVvaAl2xTyUTZrMKJX+Exm8u+TLeOgu+buL8SxhAjaITBZWYhDIJTJhsWEV2Dwl9+AkS6f6sCSXY1pVCYi78BzDi+iRhPuQj3Z9sieJ5HlUJxvSCXE8k7+TGQcQwMZKBQ0aRyxo/jJ8HB78mTc26aCW+u8JOfOL7jyOEZnfISnlBJjZ9kbbPUJeCVvjh9HZAaqp8gkX2PhxERZaIBxq/sjM0ZPBj8KLY4IsqkIWpXpwUTLjv37ClXBtXVKK5LlhBkQHgbZDGNql09P51KozmhX8Od27YSFHzFS7LjdKR3Ld/QUJZfZYBTmZCARpanZ0o2c2F5cqKo3wqEP2eovvbV05tOHHe3gmu8wrv9c35KQCra1kS1gtROE9/A1YbCH4ebtyZD5JFg+yaFW7wUI3H4HBWgth9m0Gewa3nNmuB7oyFRX/S1Hw0TH/bDsKvnqy1j9B/iqb8Zt8O1yka/GnGj7BRHbH4XWb26o+ojUG9Pai6fl1XBYb4Qa8LAkUo3dibP62jIx8+Dxte2z1cJSE03VytSfW6w5YuGJl6rltPixu2w6FWPoAOgcSu5wiP+ZA9k6QPJIQZaV6EwCFsDYR70BN9PiiTTCyNHDecLRXfnavyCbz3qdviW1odrGFuq1MaNXWPX3zD0Au90cgwxZpqdLZqNEHLZk8Zfwdm0qWvmi184uR4Q/TSu5G17iUvAVZzGq8Ku/gRbWiaOeVyVkkgNORomdJkqrrRMgukitXSOj/JQ2yEqQIVJ/KS2DdtWh5DgqKtQeCncRT6Wjnkz6a4ojuxa1fA4f7YsMEqnwZGUW56CR1z7SHfPhgmXvS9NbnjkkbFdt7929dP40Os+sGHlxAwmIGL7UN3rjBsAU6Mncl0nR+fq9n01cW17CUsgIgnV8YoySVUqotoi3pbAwDhKMoJq/KKDwFDh9UTW0lVCqmM2EBlg2ChpkWcaVxajobm0Fk1NhcKtF1sg0JyIEF6WgbpVSfQbk/PH8EnmaJQHFaVGy2ZRojQo03Dd+q5TLJ2vfOXklWQ4MtKh21ZDTFAUMevnTZogBhjSPfHYxBB9Dzxwel3Kw9CI2vbyKwEVGFEHU5VeIiuhBqiKIVVuBQcVjzH0+Lh3m7jHwTgNvg/2IRILWIuNH43Frjz5NZ/Od7upZx9INxakcrOgbzQ+iQMBvk0856fC0G+VRsNo+wrs8BkAo37jq/wSHlx/w6pD+/ZObYTmlmdmSx2zsznX4nR3p3MYK/UOD6W8w64Mg9HRnLRemIoNn39usn/VqsoeoUoUxsW6e+yx0Zb2OsV5LJZ/y5Y+XD5d2TKvfDmlfOIET02RYlHwebfXr8dxuY2SxPBGOJITi0Qpdvgq0kRQRhUERRMIPPQfODCLh0did2P5F1ZW+yzIJmYiwWAgvCzQ5U2AwW0xUudNVCjsvl0HZaDAqlL4LZAj1lYGkdVSFKUjjeaZtrhBpzDSC9zCFK52Cq1Qae3arjMnRueGyCxuBtD1m54uZnt6Mm6JNAsBi1SFB92nTuU74ueQx/mYj4WRoo2jLIm/VuWjJQ5eeomrz7VoliQ5DSNZt66ncZqMMNbkZbKEfDk85wCNn1+FU4DUbdjifQt64EKi+M3q6NFp+cbV05fG1UHdHErQRIkMqfwiDew7CttIESsFWGMF+uUeScTpK4ILwJo3tk4eCxckDkTE3Pk5JFxhAldl8+CC49EqvdoMpxEltnjiFyh+XveGNc9ffdXAwTK+MylM7UwmLGPGD5266jDgVOErXdtewhJoqhYgdlQKET9NG/2+8RkZldJQ6oIYkGDmNxhZ2x2cPDUXTJ4tBN9+eDLIzYlG+QyUVOkkdmHDaImpj4eJy9ITbwerUih+uMJkQrxfpCzVJmu6adQ2PlsS4FGzFKyyKb7Sa2um/jjvEFvPM4ePzK76wbesfxK7Q7HzP2oGBzOz4+N5/R4VDWz7lm0JsCXgU3kX+iLAZPv+iliZxsRkS6CKBps7btk95qqKDtyUQj9exMHjT0xhbFW9HYakfMhHbHUY9pFfeyXstgjQeqoUasOG4HaEKTvyptH4fFvhavthbGXIOwLz/Ek0hKlJpOvqShdxHl3m4x899nKs75u+8VVDB5RA7d7eTA7dIo3bgMmtbZZ/CUjbwMqi+NEkVZyBmXYJXSV4DcTQKAXP/aDh0qae3kwwfmYO3T3gQMGee2Y6OHXSKBXxlcb1bQAQBRcO1T+cmEAv7qbqkOgkgYQDea1F1Hi05fDpNYwwut2DhKg7CV/DaJvCwJ25oOFuXLWLtnXTUnV8UBbh69+wZg/W7JWwZq//W/86tq23N53r6ky7Vw5artLkpP025SjbjuVYAiJYIgnx1FGzNKAiBgZCv5ki14lydhEVWzmNjUHqITCVlgoqCFI7hgpeeGEaB+AYpavEYGTS6bMyM7aPRtl9fTTY+CKTEjykEoicXGb63ISEJRSYVRiC6PdbOAlngI6fLC7hNGrTXTpyJHgddv3yo3EHMsrL1iQtoGHCqVS80aKATXITWEM1hh2vo+SHLeUFrj4fO52XbunUVLHDxkO+Ylatys5Rqfr6oGhGwQXuOS1m2zpfJWAmVVRGfdEgDDXqpNrUGqESggo1NtGMaoVsWnwWCNq/bxYLWolpDFupuVwpyOJM+pJFxyeV4OZbVokQOxZK4iJRDvEYgjtciOeIKBSycQUEm2sRmDx9PHTHVJWNWY/jxZWM9IJDXCoblIUHCvbhGfaZ0823CExW3yRUOuxg3XziBJiAy65dwVevfcXamQcfODqA7l8Z+6GEwPwQw5hMFqzAqwLRkJVtd+LQ/1tu4XEey8vYemsqURVlYnWpBCeRmupUDKlL1imp8EPb9RJj5NiBIDtMBQHIxD9zJoft7B0AQakQL/k98/RUcOWVvCGPzCxf646xjHghwyMRgPU4hbr/fs6QBTzah9MgTKsauvnouET9vi24SCBhNBpGtyqYg0FZ0mhxnj19OhhppSKIe/BgcBXOLDj+ihs29KDQykePTORHT0wUTCUxOjEhuoHFsxOFDqxUd9PoGrjSbX3ZLKd8NPviMnhxifX9FBPjV2HSUHlBSqahDApMiPjFF2ZkAqIoDIhIg8kJnN5LHiV7Ix4ni0+ewHHal/Xgu6uJTX41YkPY0q9TqDvvDIYQGbtZ0uVjSwJOypq2pkxhfkSEqeIIHHwIU1y1GSbu1auDPVCoWwU59sMyYsaTDM49GMJdU0+zxcJ4KdyydbCDz+HDZ/M4aqvAfe9q+vsyeeyzCdOYUge0EqAIK9Bm697qkcpLkU2ctFqzzjR+qRqpCVZuUgUTxmrSquIoyXtLU4uELKk2DS3L5wSUhL09biYUdI0LHs70aU/QdB7RPdw/G+zcGVu9polOsBkHnyTjFApxXw8EzQlxJWdWMeiPs5AxpeIRAUZoYrbC1ZY4EF8GO2snMFtStRzg7PgcDkx0CyFIFzEYf10K2hnQulLYtGkgywdXdc6dGZuRcmQFzs2V0r2ZyqRFhFHbs7QlQGWKSBFFgVXl29EkMaSCY8MEmEzHqfKpyQLW3BlKJSc2D7uBPAQphGkLxxf3kcOzwS4oFHEameeencbeu1wwPVUMPvOpuXKhmA8KxcK3SqXCT99zz5pnnEKB0WqrPEyJlxqnJG68hNZLi0VxHX6sZWP6JMxTTMdn7drgm1CONxLJN1SmfXvHcaiHOSPbD6Mb9yStQZfxCLaWVA0mduwc6hwf7y69uOc0ju7BiUO96cLMTDnd3R2ab+RxZm3/0pWASDGjU3FRpfBhdJt2ib8mhLbFtaS8aI7HRR88wM2lRRy1VsaFDAGOfCMepozZLxYSEFBrYLFVmYVCdYZpjKnQehGMJ59DTAjTSyAkUvvDlzImvoLvPDIRTM/ggBMNhOPM+NlgZroQDAxmb8xkOp7+6D+efI8o1H33yV4iX7kcndIrf8/v47C1opIRFoF7MJ3IUJwQRwSf4PkPSUdd7dg5iC/bx4Lrrl/vRWmcKAjM9gVV6/YYykIaGOiSz8o8G8/c8AdgJFmGT/v3fJRARDxsxYgCsepogMB/wLSjrtVnbQr5Q18r8VRXTDyAIkV69kbYOlFxsHkb789iCftSqVhWGUlHpaFcCAg2KdmqMSxuZmdLwSMPjweTUzz80bKBlE9OYPIYfnzzhAJTbTLlud7C0L1vXDNOJQh+9VeDS2jDkIwPjbp9W+Fqaxj9NEKLyBQufoULhvlReArjoY/iDOnDoLHlaRBYDtffsD745kOHJcMerTjR3avdJwQGC+3aV2zo5NWd3d2p0sxMkWPDtlleJWDlQCpfZMYCIAsqIppg+PGPdabBpz9RwmoHqwSieERX8TE2RTCb4YgA31+gMDwXntPoYsvZFdYPWAF+Kogaup98fCL44hdO4baTorR25DGDA0dnpouQJ54IDL5YV0mes3MzN937xuFx0otCwd6GhykhW9eS+Iqh7liXTvAtnX5/gtfwocMzgmv5EEw/T4YtY7HhGBTrc5s2BV9By8PvTZJBvkhufs0mvI0OVV3OjCPB1gDPlB4ZxUxHZwbbOlLBNddu4E3NQUdnykyzxPDa3qUsAalyRMhqi1adX5VORhTdJnESG3Ye/DKF39JKOCitLTzFXeHd0dElkxB8QXOlRCHPSQk84gcMikI540ND2fvcZ0/JSnX65SAZ4OIYO06CydiMSkl6HtwShpmZn/iJDd8iLo128/g9SJIiUPNDv8LULd+QqFQ205IM61blVNvRMJw0lp/ylFiwTSSHk2h3YpaIN3gwQ7M4x/w07AK+QQ2BLnv7HVuCL33hQHDDjevdscgI6wFOpeSEW+Wnv7+DO4bFXPuK9R2PPXo0N3sBtFKseB7TvNyMCmT9dPnVxTbEdLkoEFATJ2zEiggJPHO5oPzgV0qQP9DAz3DSQwbEVXF7xBKG1eGd3cEULyiGPJSoDAW70FQUE9Pa6Dcy/eT1yU+MmhZLkwocjqGwIkdaN5KYTeNMMfjliu9mCtSIQmGwxlUHjoUGWtsmy/isYtBDuDxIDOMgveL6dpKbSie04Jdaj57d4cPmyzN4dWHxYWSBKxXjta/fGnzlSweCa69bh2lj09sDrvIGu6jZsKHPCwt5jWf2yGG035VWOUqwQnyseD0yeYUk2Usmq0TFjMpkjG+LUDgKhmBwDml54AtUpriAAZtCIIrhc4EbAmlEkrdFmm4fx1tsVdhCsRypQPz6v2owI35sQsX1QXjzI4yrKWjymMToQhePdGIYjcQHvpmOIDc1+XkbIhaW/JQ79epHotrAqlbGhjFcH6KKW9JuaT238vLxlUZtaekwOcEWqYi81R7nICN3UKkeOIgNY6tw+XPVbDt5OtPZldXWV2BZrDkBTQTmkFeQg335Awd4Z9PyMtu290NAm0lVBUdd2uJEXsmSPSgFkL76INc1GAFzuCS2gs3CMO0bu07GTWUijUxakBc87L5xpQnLUA1f1je/Zig4i929/MhLpdW4yImKR3xG5xtCOiBiP/2OrS/6cAoYWwPloV0zJkx5aPdOx0jqZ7jDsW71wxsxPi4DfL+40Up94+jR4JYIVczDzN96+xaMqQ5LH3bzlsoh9THURG+XvVomMXCFALnB8MgRKFRTwrt0mdq6jQpVPz4KeaXdMEJtfi1hAv3xY2VMDBi+psXhdPkcumFTUI4ObPbDGT1QrCKu38ljpordt57eLITdfzejW4dvT9zG0YkJYJwxIi0TZ4Bvf+0wVlCEwTce4pwCx1YmEVRh3nrS2YXWC4pIReZeVZMGpgddwWnOKUZNBqsV+u0Fypod2v6jFBpOvx8ubgh7HMZWTpVPaKySKp7jQ1pcWTl6/HiAWzai3T0ixc0tt23CdOZxTF/mg8tfNixvkThO27/8SsAojxEeqpa0NmwCaGhRMjzD1uKRhxEAmytgzo5PBNnOLLazd2KmjYddgYuVphAvS6iM+EOMs85OzKArh7YC/NnC3PNDa2GLl8c7yBR7ZycG6mafQvnggZkwkwUzpoc88fLmJIT7niVAhuFhwhl3EO6DI2KYTn+BKjFpaKtb/Wr7cGYg4icSjMJou1bPwl2YR8tVIqlt24KvkbiRYUt13Q24jR1/zz5zSprpRjTt8PNfAioqEEknIOKKAiShVJTvPgmhhTIVoQlskQYG+4OeLoyfKfRCY0RJWw3SSADCBge68OEVlzsB1t/Pbp4hIwaViJ9TrDJx5k9I5RsVZIv2XL4o0VDWODvIsZYsWxI/JjYQR6lU/A75+QZnNVRuo2BL4QfCTb/C4m4fVcKsgii+hovfhinMt7UVY1pm8U3quCkYH6XazTK94mWr5S3yxOOjbaWqLqJlB6EO0BiBUMEiVEMkWH6oAPteMlPcaTRVPT1cGgQ8O26S1i2BTrgCh/LBySty3naJmXSocI+6RDmAyJaMExYca1H5ZXodMPKSs0bg0LWAVLpCufyxKCe0pMDh7caiEGxiYdhqqVKosIOhgXlKQ2zFE0L7I7xsmIb7dlK4kCItqc2bg0cvuSR4YGgoeAFxIdm1DTO6a/dQsHFTH/rAR9pKVbuolk8Iat/0mCjqNAAkvEH/9ZuY/sUwyIgi2iCiCwnx5V+o6aaRmT4oEm2ChCXwuzFmWrvWzUVppEKjP8QtQsBFaaBAOMtRgviNijAqN5VNbZypLy3UO9+5+aPKQ+0MmHVLYpEGVRobKOmCW2wqG8LjRsIsneI7HPBWngyjUdv48Eta4jmA9Jjxg5lOKNe38aGX9zqtw3eqDfj21A98o/aWgGkfHu7GTYMZmax4NfYKJaTTY7/ynaxkCsFKM9I1Q32xwp1xTpV1vEUhZ2Ong2DDhhAXYaN+V2PVA4ZMc+jBHTiIWc79JTlshWyE3PEAV7rxkBtn+AYGrTKaCH1MA8EvTtSSD77YQyfazg+3ZnEfLERiNtYRnVxR9swDbfeFmWHGZJD4btDYZFTZikfFoCBrqyT4degYrrjkoX51qxIlxcvVE5xCDw8dCm4kAZUGA8k5FOo004GnA28L99ohDgepN9y4AdPqB4Lb79h6wSoVp31vumnjslMos2aSNVHbGCFHldNBbTAOS0C/MRzbvPkH+e3I+BmCi/cCCvyOnWFw6W5sU5hMBY8/VsDaPTKDsBhUcdOpsr5lC7WkvqF83fzqoeBfvzkGRFEUyA+AaEqpOPwTwzTDKXGVi88lcWULxfnFSnqiWIRrmOXq/FHM5nzKT3mqTd7qFk4jI8FBjENHMEMq5/ChkDv51IuGszK33r41eBDfqm597RbTTahHsELDuFFuuRkKZSPjKrja4ZOWOzBZp8rEAJ81WweG9XSHUAJuy8bkxROFYBQrzkXYwVtaD8C7ekJ8qA3l/lo/ggR3+WVX9odZlOtXHuAkF5hIhlSVmGAwtJmEK8iEqX+fwKfylsdbn1TacvitC9/29EfGVsT1H6+18mmJo3QRfEvLF1USXGb9tm8PHtu3L7geSsVxXtOGyvS1rx4Kbrl1s5ZB07TLHZFd70aHdZ6PPIzh5d5QqfiGN4Yy6TwKtHYETg+R1ahbkcjyanT30zh0fOJsORgbK2FpVhETEqlg3YZM8MLzRdyT7H+TUk4RW9jt3NkTfPlLJ73ejSaTdiXmnp6+4BdHhz/7rggL4+GkBGfi40rAUE2zwaz8KlxtxY34raJUqKpdOr7y6clD+fAtlcZU+uMYR9lPe9VMkiCs2Ftv2xx84+tHGldyEoNlDmP+ltvTYpFpHdclIxLFWIWCyiNuBXjU0mr1hkFffyrYfWlHeQQTEewmFnAAQkWPPYKKUzVFptKHh8xhJDJNLuWMVgqFjUbFTpWXg92XpZ8J70veX0dFQrTOMKk0YiMhqmiaBWdbhdGxlaGq5N3xsLwcnQRUt0o+vrZaYiMvIZTqSXz4xab35g0L4NW3bAwee/R4owJtnmkbc8lLgILjJF61ywGqk3NylLNc7qWMXQYNFSrkCnQ1P3TvxmDN6g55YXH63H2bYjqAdtnl/cGNNw5+SvHjNsdQXLvcg0e7e8wDTdxOggmOKlecxnYVSecb5ZsESwxDRlI4gHMvvlFN4SyJS3zCem4qFT8AP/pI8kbFerTtsPNbAr4gOLdz1E5bH9ZEs7WCTIrpwTiKq/PRy0k0xHvu2UKwfUcaO8Gx4Agyc+ttI5jk4xKnYvDZzx4LZmcwc9edCl73+jWYFOmhYr0vkRmAGfTJJzHYX1MDQbtliVmBwBIef5SV0MSULcLHCyON8pFWkby1UBjGlgqHk5zCGX3TOPnoZSi0CC+NNG7zrcKNio89egLKtTYe3PYvwxIwgmMTxsaDAG1E1F8j3f0DIVZVlLHNx4hHXz+XLJVwxjnFyhjKBBfDzmLbPBlPYvZrZrrPjZ1kNTq+NfEMiu/7/k1YiI1Ne+zy4YGulAYHw+PKK25zwgAz/k6YmQp5PGGXlFk/6f1uIP00JvXW7eFqmIYLbwD1dkP1a7jhUJ0e4XP8eK7n0588tuWRh4/MHDo4nh87PVPErskC1luV8eGtLFOdysGzWRDXXrcWh3FUrWX0sKwTZcwCP99PdcIuXIhWvtrMKctfjA8kIO43WO63qwsCfaoyiunEwtdxKJSaPD7aHj+WR6vDGTz+BcEll/QGL+yBbCBSGS8RCBJx45vU4UN5p2yQ7W8oryQ7g71Hp4DkG/qikKiA+7h0K67Sie21XooveJ6yKZ0frt1OgXFGiyfAYoV15p8/duwKTBfbkgnD0RNThdFgCstKVnWsWdPDD93svlYqQrlam0q1fn38DoQoEivx+mXSiqlCR1No8sfDSS4kQ/mlMKjNvEldWjj9zRp+AB4dLQbbtpvlRlwLOG3PhGCZjp5A1wYwUSVKEyJGYwR87CE6lcOMIMdPCNUEEAV+HtvMNYGQyX9XLy0UQq5bT2p1tBVReuZZHtAkuhXR2g7H0hHsYD4PL5w4YibO5ju/9IXRy2Zmyx3IRBl37J5Np1Pl48dn/Y1Q4b4Xx/JHj0yEl162Js09T0o/X5uKt5wNhYKbTy8kw0qzysTsUZTF8JuTSAx9CpSQ6M8UFObIEX7kxfcdrDTn7B4Z0fAQICoDX84njhdEWbh70ARjHGHxiJtBayZdO7hDftiVlJhlRhNnS8G6dWnye5y4tUwG45IpbEHnRL2yZtIl+UxEQktDXooTz2YjOGmTjKOjon3+M6OXnjyVk29PVCYS4Cw0aV6wr6VUxLYXZcLBI29a+O6Tx3M4OCPcuWt1FqsmOPZrmxVSAqxgK0hOmZpJ+p7nCzhGrIA1f2bAbVZH8CSkMpahTQWvuVVuVSxDhkJsl5JJB0bAFkiN3Ykh8fd0Z4Ln90zg0EvTk/HxCmjGoCefHR72VVC5VGy0UGEOJ8iwhbINoOatsg6PQo7w+KNcInDiqhJ6dMR1eAz3wginkS3O/+vvj1yLi7K4M0UMcVWpCPCVyWBUfnGIYfnp747mueV54+aBzOo1PSm+cdpmmZcAK1u1SmVd/QlJR68leOirc9Ia8YUqx40JHlocSjLM1HQea/5yGBJ0hL2YoMBlfGgcbLiNAzIoLZIQSBqwl4lnn0NnZDkf8IzCIQ6EHz+ae0hw6/zoejguYhrEQ7YkFpvuWkaVJiGctPpocNyvcLUlvs9+5uTlUCb/zE+nTJzV44VruVwZq/lDvnVQoGE5ixZLTgIFB2ipwLmr9cC+M4UD+8fDkZGe1PoN/WkuS2qb5VMCUuFIjsi2FVyB8YdARYgleRozeN94CGeYMpyCygYDbunEwZ6dQbcOf709GRwVMIcWbA5T5ilZ/JpFl46HWoqBJbdwwPZXvw8OZnHeX0HO2yMf3aXLRg1Kdk0sOVVeVaiTCFmFR5Lp2ZwFpCQqPOK3iqdhvg0SMQozHqOoCquy7/q+Nc9+65vjW557dnIT3jQ254gcmDxuDOeh5XECrOyxtHHjmwOKAy8eNMlhGV1lTHmi+2vOjOF25umps8HhwxOFVdgbgzPQcUkBSrVtzlsJaOFTiK0uGOnSFLHWFUlh1mYL8/Wv57DN3chEBQ0CAM/pM7PB8FCXdPmoDBKOSHiNDafJ163L4pqbOcGVSKAlImRO0tCKgRGPcsZdzTZWw8kmq+ESOHltY279Kc2GFVTttnFwp9FV0m+iUn/cZqjfpRM/YXy87p4Pp5tz/Klrrxs8+sM/uvGxru5UHgUY4c23BQ2usJHuLd8aXMhIP7p5pc6usIQPcMXennQB5woU+/ozRZzuWeRZAtPoApwcxei1bc5rCagwUarEjSplPTqjNe4AFce//isERCQWBB4enWNjM8HqYXNYFtm5TpZoLsfgGHhjzmrNiFmSROXUb0uQSZkWp819T9No5RiOfwsnLg61LJZzldQkuyR5q1eHByUNkWRaBTcpEzzFoVJYdhFbW41YVMSJ4CkfD09xBI8XUP/g3Rueuekmc+Un9qekhoezM5dd3nt6ZG3nNDZ+KT/h7NeH8KyEGi/8fIPxaZvzXwIi8F5dxOqlqjqZYt5rOz1h34eOlhMQaJmgTEPYE0fFlO4Kw9EyCRptBEzjxFcaXG8UrN+YNcoCOMdKsjOXCkY/ng0bekShqHDwCpwvc+zWfVKY1PnRdo0ojFFnzzTJkjTA1SaemiQcDaOtNILnKVszdEJ/yc7e8R27eiewJCT7mU8e33Xq1GQvx0l+JLytEDcVFg8fmuXyKWv8KqooHwpH41bEtr2EJSACgR8Kqev3VMdfVUesze88wlWu+BdFYUXiD/7TY9NomahMgOlrnxGQCx9rdBcuvf0D6WDy2dlgZF1GptorAkU6Q8TL2QYH8E0Kf4wr25ENst3pmkuONB5NAv2PWKCfFE1SJc5oUpVeabSr6PwaEWzlRZDvFj/y4XcHXTjLht24H7p3wwtYRzWG1qsEJcrd+MrB0Ve+atWp06dzXYegTH4CyZCG46uhoQ4Zc9EvFUlH25zXErAyq7JbT7kkncTnWeZOaoRBGbBpzMrxPWrelO5VC3wXBznAn/NXnYNVLz7Sbt7ciZXp3UF3jzkI07ZCIidneaY5BIYw2rNzuckrrwy5qqiucS0Urod5HFvNb/GwVahpy4NEOoWh2+JqOL10+/ufFCa46CpqWARu6eJ8iEOFFTjyFOLW99FX3RScQnmknn5yYuj5PZODnOkjIstUHMSGY/36zlwmHYRHjsx2rN/Qmd+2raeA46fSyKPXkgll+2epSkCkICGyWnCLKrdsyA0bpqqlCzeDFmQVLgPgW1IkBMhOowyhz9ZfUc5FsGvWGNHnmGzbtk6M38vB88/z5kPSloP+PggP/rjinAbD9B8XR4Mfp1DoSs3gLZCHonTYMZI/seCSXIMfY/XTTzTCnELEwhWXtrZycDoauhmmfBWfg0S6wyuu7J/AM4n0ahxUVnZZWd7c5yUzklREwIjDp7hmJMhrGF8KnI5HoSoP4a08aAOnynBRZaXnaRAMnia3QuLoq4MckovCOVyQc0SCIh6HUuUwiWfENCTSRMRtDfXggl55awq58Gn8g/J1LQSxNeYIZZN5IM3pU/wYSRfSg21I5O8+g1CJwEvGToJiKpxInOtlNIM4avns2cp6rYmJIjZpOtEXfpiwKF9xRU/4PC5Uy7NPA1rTQuHeqWznzCtvzP4L2TcykkxFgrA+BjfToNl1bps29dP2hVCEN4FO8C0tgsUQRqM20+5aPgvXMNqaRh+H9DRUHlUghqObZ2AMZMHDkIfjR3wCaROfcRPPe4QncWg8uHPzrWbgYGXicH4fP0If48WwCC29bhCs/I0tqH4aa+Bp3ObDivKAqAktuy8+zHRn/DDS0S/0MvQEjk1mhVZ51LY1vSRWOsuGQcaQcRMG9ROcPs23KAhsCzSGcRPP1nBGEo248CeVix/S6Uvv6mtky4XASMOTY/H5xZFbhwAue5npwJCerVYqlUUrNXdTHLmWX4VVwoeGwq/AoTHR9t3KQ2G+X4pHWw9Ll4SnMLUdDwophRsALWrFoV/dcVvpk2zF9cOUF8NkHGsD6dfHx0908zsIjalk447/skJqGRO5F6q4atsgeiMgBUSAHh/iiyT5MM0yYSSkX2HGzWKni8blSYLqRGTQ3a9NmrIRuJsOMmyizKI+xyfJMS03vBrh4Ef74SF09UAvCiM2qNQ2McsvXq7BK19ljuuW7yyW+ZkzHB9ZT8ziS23X7q7v6Isgn899+aab+p6IodX0RhSKWEjEEVh+dun2HxV8B0Mdko/QWKVwYUpLZUsIc3RWGYHueJFHUrjEY/kS38Vl+ROmxsdVPC1KDSOuwpSuro3vXgjHgwiTTARcg7NQ8ofh+njMIjwIT47Ko/CSI3EqQcRGCP0GZkTUKJNiMUxe+LYrFYmgjsdmIZLsSkx1CJsIKnFHLZiR+exMPghR/tr6VIZNpnVSJeZBNhhDuyoyYyPjz2PtJxfQJhksIMiNjKSu7+xI4VSjcPrW2/rvSMKrBatSqMnJ4B+ArJMHSWXiw3w346C/nvHxfVx102bdJOKhQH08xqN+pWEBKq2GqU18GudPwDUY5tfh+UB1s3IrmsDojTFw9cH2uNDJRys9klMfT91K4LGr5azES+GrpCeGL5yVvXTo1OPZhpcCYhzqeElRFbOyqQqowygWlMUZ5NTyPI5H7u3DRbpiPMZw0sdWh++6q67uxRaOHM7zy2Dtp43YHgHBl8XqkeSjxbj1Ay/2TXjzl+fywS+u39DjH1Nu461vVUZmFm/LlnBmbKx8CIW61YKYVnlirQyDCafxxzcOn3Dw8f2CSzgd1qg7jsdgCSMPeWsaAh/Pp5UJCy8+pfdxnBv8pHekcVjbhZuoav+yi6o3NRAL8VakiXWonBgI43vFrYA4LuFWBoRIw9UWbpWfCC8HjjMxAT6UkUixshwYrHE6Hq05hDd+xAYv4aksktOeDFUaz+7FNnZOBM1MzJmZPUmsJhxJhyb1DaSCnbu6MAGRphxg9UxZFIdbN3jjhic/WIKkSlmJhMqElTqvGRgIuQwveOMb+79cCW3eVdVCkRQJ+igsKpuUixVSBvnl5LsZlmQUJ24TV2FxRVC4b9OtD2n9yhA8L40Mp1F6H1fhGkY/w1s2XMYSMX4ssSDndQ6P0ofBLY0LYXzq8PQ4WGRlFLeJGc2i8Qmeed0Ro3arRgYNTVVSNRmk9N0VTsnQSri4qAjcxk6TkSu/NPWElYPt2zuD19zSF7ziul7ZAEhlolm/vgPHMKelpaJfu3xjY3lMmUcVinumsGnzPijTQ8RdiElUKCxFOouMHI0xZg78QlC/s61QO7+lF5qYwAsM4dq19KNSesIULx7up9vhx+LQOlYeaguvGK4f5rv9eCNu0DvjOR0s4iACH01RJLDicTJNvAa4pJI0uMiTCDTQ2HYWTHqcAtFgRCaaJX7yYexi013TKDltPo7SeWqSthTQjzP2yLIHt65rRIPDKdzt1IcFz1mu5Yy0QGS+dm0HZudKFYWy+Tl+zK5UtylgTwNHfP8JJuR+14IWZPmCGWGEjYcfAUC+68DWLh1xmDfS0Walik03DN1VD/KlMMUR29L69ITTOHzikL4OrqEwv8qLtp83H65uUtCtft9WN3FqGjszacITKJBm25+yLBJwGEIwcV1q1M3ABCN8HTIRKMrKnG59GEYjoi6FCJcgyviJHgZJ5IonwfhRfoRXm6TQCGUSQjWbpiA9OCdieprrUo2w7diZLb/8GlxGbVujJCZYGB2MYxvG6VNYIgHDbiGzeeSIrjaHcJuZ9/8AZXp3Eo/5wHyhi9BDggsQmC9ZIIsnqYgEbhWmihcyEKep4uMpW1WYF3ckbZ5H+ccVXlGUp5EohVZsHy6iVQlq7OJKdzGaCo+Elef67X4sHg6dCaQxjAQv2xjXnJEDn3gkCvOy5VAoXAyHsZbxVP06ijiqNnOO3DmqeCwY0IMDLLkCnPORGzdlgq3bsv6YOpE/T0M4OKRaRQAAQABJREFUeZKHqxhFovIxy1NTZiWaHTP9h/7+8PcTGcwTWKUEPh9E9gASYlSc6alMj7P49CGJFqfC1NYwDaefhvEKzL7lFd+3iefT+WF0a9p9HNLQxGHqp61uxVO/2oQ3ZZj2JONkVTmq7SETR8D80fCI+HrI1ik0jjAerkwMQ50Mr36n2fg8PatwUh4O4gB0aPIkf/C4F4bDcnSL6uCNg7whowOzfZdeZg6hbBRBGtveRo/PScvEeiphEMXrcbrxQRhnp3P1+utXrVpcZWKaaohEJLl/Cp9pHA1Yi8+31a2E9MtjWyDCGRcfxY2HK5y4NNrNE7dAzI/QwakiEcer4mNpHRyC4NyxsDjcBjdvkYEImkqf2j4LQfIBJMLTdOyKTNt/yIJ+GhOJ8SlMo/AjqoQZuuRfxXKUcDg3SRQhmXxBULYuPLDy+hvqd/P8SLCTOzhxYk6UkArFSQl2KHr6MgWMmdZBmbT35ZMt2N1QodC/PIMMfc7GxDLUh02oK1PrdmF+ynw8jw+diq98aPtKV2sG0Kf1cRTu23E3/TQat/FV5EPTQnhDMZG3dYyZwoTa56Z4Pld1x/AYuRoWs+PpmPqEmhVdfKNhloNWgKIR7OJzDo0u2fbRyN5GIV0/UvjhyRzmDeUL6uabB+Vy6WaZsDWawSJY7EwIJrCPiko5OVn+9nceG/859LxONMunVbyGCkWG0OYvoE54YH+82Pyxi8YtOLYO6a6iIaLWsSWqhefDlY/aljRiaZhvq5uIvlsJCUuC18JXuojtZIyc6EngijyLiQhhrZgNqvk1MwcW4hPQ7WK2bNn8ajtl33iQSGKpElhGTVuMxQ3ZSAWApELtpjnNH5GXALRkkOFerBhHi4TL2wpFnEcy86EPHf4xtHR7W+LTInLTqcTxs78H3sTnw/JUWrrVT5tGcYyvEq5woWF3MEGxSCN8GG4ZJNkCI73lEcdxfCw/CWd3LxanjWJ+lowB/QjIRlMSZ0mpRlit4Dg60imJNXBL7BTIHEiD/WEyvsDZ3SEXfLJrhJtdAEP3BkveuvDw9FSOG3hhWa1xX1XcJqkCZsw0TI9LfLOZEMql/2GL1Ic9Tzga4Zuf+Pix35mdLU50ZXKXFaaL56x1Yi5VKZrKMc4l+10gcjylxSm2J6D0axh5qvD6MIHzp4ZRHkIT4+2TKF4cRn+9MMVXHImnBo3iNraVGzFVAi2VH9SYkcGwiQInrniGkpgPyZiiCl/CzNXfA+tnC4X8zRhcb8FHycHjx4Puj//z/8pAcVLo0oS9vUGq4w+D9IsvPt15diLow7hhGOs0d8N+DWh/BBX/h+D9aQjefpQxLtsMSpxG5sOxhp8FSQt/fCC8y9VwEgPmMDaf/svXHhh7FzbzXMMxVCHIvqqYTrOndc6MibpJ9liWdBp7pv4KFfB27UWA1Na9sx23hBaIYT5+3E0/H25l4Z4mNUl4EmbjoFtxatH4OD4uY/H9St+6rZySuBFWyU/dGPkWwo5r7DLF9cjl8GuFQvFvJifT/7RtW8jj3poy4MHYysF9AT/g8JnCQ/oX8NBwzaYzWI2dPXYsWNXZWbwplUq/BmX/GpTK7q7OYB2RuEdIFpRqHpLy6LidH0cXzmjBC+NpLCG6Gz2qPe//o/2/mekor4WMbEeR4jis0i0zM/n3n8vUtaRQTAgS+q2zZ8sdSODbKMw2cb6trZLf+jHcPaBVfJIr3LISy6dVuOLFaRkeh6lfbeXBbosPo1sfh9OKw1P6aCosE8TXtGFLhNZnEjz/bHom+L+x6vlI08QLRESl8fPIKB5upItsppuYKPPakpehpG5Ffl6P9L0a/qx2HyEH59roq6oqHpnBw9kqSNefz84Gvwv5dNvUy2HqW9hzeyumXXegXFnztwTBoXN6kHUL1R3NC7YlvxGQf4OHCsRuIJVAbPjFjYLWjYcaLnCGIyxt8QjTh3hME8P48Y4KT7+Gx23iaBwMI67Qe3RKr7iKo7ZPRxhNzQo0wZVfHjsl68SU0gaJNwZL4squnNCXg/tzheBX1q4Nj1W4L1/X/feX03feGaxCPb0WdXAnUnoj7K1oJXi+IxeayrPYOWB3jnc94QaaY4j7Mxgr3oex4/4PfrCc7Ti6L70fEQ4Pb5d2NDX5bN902PWX2WzXm3P5mYmujv6prr79W4eGusMdO15W5ikqPEjl+uuD4IYb5IWy4OTGq7wlhriH5y40sT+MjKnCiAKoHwWscLUpvKJIVtmcAgHulMXSUwE0XOiAw/SqW9YBAod+hddySzhwqfzEofFx1S8BrfxwV2eSkYLlTw3VtK3RMcw+vXX9+uwXk3isVNjRo+UR3OO1E+nfhecmlPnLUfbXQBkGYFc+CCOQ/rgBvhi1MfabA94XMb77JAIexN1PTyEsQvnHf7T3aeyT2oVjhefCVCmHu51m0XrN4oPweDpdngZ8Fi+vPFnjUoA5dAZyCMeRD2EB7+5Utiv7v9111+pDJub5/1IB5m16e8NPYavHDDL3c2CiGWSadf0dedviodMZwXG+isPhQuEo/GrU1YhOwxU/Tq9+32a6Vcl8eEN3ojAolaZAbQvvxNd+bEX4HG7Ve+uGDSl2sS44s2FDyHzx+Saev4lnkOO1o0eDLFoa3v7CepZzPXBQENq1oIywIm6spJsCr3IVZxPxY9CNU13LuGuwnMsEIZZIBDxEYpaH46E/yPcXxuQ4BT1V5mHMOchXDn2bfBoPugip/ORsb4ThPD0LUijGiQ+/D6CPfRwJ/I/0s3Bo0Q2jbmfbcBNqwrWl8GnqhUsY+VilUzql8e04bw1z6VHAfGx295wBR/e5iGANsqnj9Da6QX9w5Ejwn3fvTlVODHEMLh4HlITjNV3StigZh7JswMFIkyx3DOl4pgtVMcRp3GHWvJrRphVT0CjWFAOlr12itkHLwv6wxqWhrSVvXm/meBSYpn0aAv4uPFRQK0LOJjrFi3ANU8VjmG8Ux+H5gdatOH6QD/NpVbTl/IiYMiv9vMogokzkpDmk26ZGXos8picIfx+XbmdwFcrv7N6Nt2fbLHoJYHyA2/jQTrkXOsa2okhYJcGmCcolN0nQhp8JoFppQgrTpeWjUEwUdzpCaO5FqzHqtRxWtNx4RfwM14zAVhyBeUKvcEWlP0n4FU/oLbLi1grzcUkS91s2yRbS7/r+LgKfA5SLkw045vfnVw2FaSjSf0Dd1jjFIDmONrTFEmDDAw2i4sBF/RJZge6wMaLuMIyfYkw4IJz3Iy5jyvJL+CKYJAGdN1umGcuU3olUPggmOqFQix8zIpmxCM7vKZyDeUwE5iktg9g+0Cg+bR8mgbEf4rRsUCGc2nZ08q6zsbFFQhlg4Bv+6p/8SZDGRs2POMS245yWgDQ6Ug+m9ZGOH7QKkUqLhBuY0bGjgCCcL3Res4H+IBVuMRO24DFUUmLwLeAD+Fb1aQjf+5ihGA79STBKqcIhl+JWWJymItGGRuliURl+8lYy/BQvbsfpEv0yRe7FzKqggkks8BTzpftWj6R/N5G4DTznJcAxE9scfnOSaQjWDZywpJVC1w9rZqFjrvapfKJikLdZfvxesFnUFspPDbqAz0GxfgAN79cBl9aKSpLQ+jB7+pCFy27MzTAaKpumO46rfsET7EX64fS4KI/HmTqKtBSgaL+Ibl3YVqZFKux5sGHFU3EwjsLnFCgJNAnqQjAapsqJGWypoHCm6ycKKDOMQXEmvSiTJCqY88hCcySYsPh9TIf+G+RxgpljzxZuFXy1ycy5bTj9+mh4HEfhtJs1jgcIfP6J9LIGLPatSb4kh+EcluL82vBwKjsykv5gInEbuIQlYJRIKpfjJDzsmTABdCNUenxUOmmkIINmgQe3dpTDYrrMpVkLNuekyxdPFd4YXA5yD1ZXXIdM/qkZLkZaGZNxZjL6/Yms4kIvuDYOdStO3Ba0mIJaUuHLToHyULiz4x9tqUjoNnBp0I+hRfqEQ2w7znsJFIuFs5gI4swCFYWXwbNeMR/OOXGcYQ9/hhMVmDpnN5ChQDQTEzgPrrOzd1EWzZ7zFsovaUxYPIrvVrdCabhAkbNe/sSFKoNPEofRjzeKFJa4LTIVI8nozI4f7vP0eTh6jpV8ZeLHWPQhngeTa1avTvW3lckV1fJxhMFhjojYKnG2AXUVonfBAZWBsR8o97LLGX3SNWTiBR16Nj09uPIUSksfSvVxjK9uxVKUdwJ2GoXgKzaFnA+Nb6vbhFR+CVd6xVFbsMz7yPGicvGJ4BCRH6t47YmsrYOfU984wOovsG1lZPWa1GVQpCeJ1zbLsATC1B5UoNSpFSe0Qhw7ofcHuF0vCQiUTYDAlltXiBaU7713cT5rqCCelxLC0qVvQ7HuxHrA2/GS+CpeJjT6QaBK4BHG94w8dNsHlhjFV5t5UzdtVSK6FS6E/OGRvfhqjpvqEEEq2ItewFtxlFp6aHX4cxs3mtNEHXLbsfxKoFh6luLBlgn9ctQv6pHVDJmiyKD6qV5QJqyLEHCJYyook1xyvmjfCJdkDNWo9EdGQk5Y/ArxTp0qX4lFkD+NIrgXXn/mBcXAEqppNEztOKIPV7fYLGAsHDsAhf793HTwt+vXpxZlgBpPQNt/7koAHbmHuSIiLaebU3GwcgLrjDCKwrta5igIC9NUoBK+GPK1jG9RskYpKmcLSuSyUCg/B/gY+hT8v8EHmxkxGR3cgyb6bfBvgLuP4ycWBfxUBv/RFoh2UstL3AxLFzy48HK8VCr9f4VC6jNYzfxAW4lQIivYlDKpl9DkZNGRY93CGHFgn4+KxGbKTEYYkcFXQ+DgHHSEYWPXoi0HW3YKJWVhf9Ad5OwgVxvwEYMW7NVQilfhuRaKthHKRUVbBTf34eDkhABrIeWWwhzsccBP4TkC94sI+/rJk8EnL7kkPCPM2j8XTAmUSsUX09iXwW3FJW4QwsuW03nunUvFQpOET1C4RBYtGN7L6A9K/69YLL6wWAXBiNumXQIXRAm8/48O4vKoQh5aksMeKOx3CudwMM0cbbRCM5g3n8N2jTnulcKleXPo/+Xgz3WmS+9/8z2bH1+MQkjqGi0G3zaPdgkseQmUSvm90iiZ7p40Fpw6Z3OEdgsNE1spzlOg5WIThe9RaKdS2My/Z7ES21aoxSrJNp/zXgJQEB48A2Xh0iJZxEelEiUijIpFG0LPyXP8yXi6481v3rho50y0Feq8i0E7AYtVAunOzO9hMoKTetSjsAQXWySu5WNDxAaJcbGlkvVHnFIvBw8RtlimrVCLVZJtPue9BN797i0z0B4zA0zVkRYJDRKmz6k7ZjICrRQ8XCSLjmCmo7vnY4uZ8LZCLWZptnmd9xIoBoVfkLGS/bgrX3bRTHHOnDfbIIH89iTjKvQK8z/wA6v2Lmai2wq1mKXZ5nXeS+C3fmv3/5CWCUdJ4Htjb6EYDuaL4epcLlzPZ242WD87F6zNFcIB3HD4F4udYOlTLjbTNr92CSxlCXzgAy+ty+dS70dX7g6cZITr2Th/FwyaD1FcU46BVSooYnkEnqCI6YkiPlXhUvkQB2GWpjFDcaacTn9m3amTn7r3visXtNGwrVBLWfPtuBa5BMrh+9974IuYBsfpsDhyjEuIsOETyoRvUWmc7l7G9Qno62EyD/fwcmkEbKySgYIVC+E38X1qFpMSBSheHipY4E0K+Db1V7/0S+u/NN+Etrt88y25Nt15L4H3ve/FERyEcwemyDkRIZqD0RFn9qhHZwAY5UyE+OCBonEuYrxcSD3MVszgwQUis1itVCgXw7ctJGNthVpI6bVpz2sJ/MZv7DoBVfgp6AqX0OHSUBiZEkdHTpYXlWexEPYlaM5zuHbhqXIxeBLjpn24wFrkXhQJRNRGqBuWrYXjuAH318hmvkbSMF/iNl27BJZLCbz39166LNWRvhsK9la0WBuwRyOHMRMXvfL02RwEPUcY2qgcxlB5bOPNo4eHLmLq0XSY+lyqI/vdd7xjeHyh+Wkr1EJLsE3fLgFbAlDkvvHxYB2Ueg2eyzHLeBXsK/DsRCu5HQrcxX6mb+J+PyzJDV4RQz92S5yF/RwCeODs07CfQVz7YI9+6lPB6GJtngS/tmmXwJKWQEzclzTudmTtEliRJYBLZ16BRuFNaFxuQQZ24NmCCyP72dhg8zkbDJ5kcV4NL6LkzT88D5c3C+GSS141th/PU0jnF3Gqw+d4f+J5TWQ78nYJNCiBdgPVoIDawRdvCdj94pehBH4WL/U3wx7CIxfwsDGC4e+K0yGMrviZQBpSpJ+fsZ8E7L+hIfvkqlXBYUzhoElrm3YJnP8SWHHKdf6LrJ2CC7UE0CDtQt7eicbnDRiBXM182sNH6FRdoe27GXZBGI66eNcqbgI8izJ4EI3YP+E6nb/+/9l7E3Dbjqs8sM483Hl88yjpWYMlPQ1gS21jyW4bGxI3oUFgpmAmN82Qjvkc0gMgktDfB0m7wxASyBfSsSEOcgfTmIYOTSMDtmzLsmVJlixZw9N7T++9+6Y7T2fu/19Va586+55z77n3nDu+XffuU1Wr1lpVtXbVWruGXRsGa5vHg3tCvFElNiAB7WgbII1IIgnsbglgzagPa0bfi9HDz0Ah34TaZHFxv194ZBQ2ShoP4+1ugYRKT4PFkRamLechoz9H/J8/+aR5+uGHoxFWSFRRdJMkEBmoTRJsxHZnSgCfLDuFkn0QBuknoHz7MULCrqRgRMRC69ZWNUKEaT/xYT6c4T3vaKxyOYMj4M2XYaz+N/ifHh+Pze/5ikcV3DYJaMfbtgJEGUcS2GwJLC7WjhSL5peQz/dAyfKz1Fx30bbvGyQWxTdC4bCm+z7DN5zjOhY3YECuUzDyv4ZR1r9yh6nfcLKIKrx5EtBOunk5RJwjCWyDBDB9l52bk6k7HpDfg4tTdw3GCKMoLK+0NEgstRqocD9RPsTZiW7Lpx65YxCG6hJk+gtu3SraaLETW8YuK1O44+2y4kfFjSTQKIH5+dppKMpfx3U/jI+8hOswVhibkIHSvtDMV1pV/IrTmHkU43EccmFH4NPYbv8z+Djh5yKxRBLYqASijrZRyUV0O0oCc3O1R6AQfwVGaT8KxtGSGhUtp8alzdM4MQH4/mjIDyu+oDkmPsyBIq+VBLjJAg8KPH3gtzCq+kUMV7t2dHyrPCP43pKAdNK9VaWoNjeSBLDp4e9DCf4T1JnfuOSHY9XIqDHRNq5x+4mA+saIAA7acFhF2Qqu6ZG/igRwX2S9CutUj+OF4f8Oa1XfWAU9SookEEiAHS9ykQR2nQSmpmo8J+xf4BpF4f0Rk7bpsFGRuI6cWGHQKo76AuaPc4TTtUq3qdFv2xJI48hDjHRfwhTgDwwOxp5qmzBCvCEloB3whqx8VOndJwGsMd0NBfc7KPltuDhiUuOhbVnjrJyGJQ3GSUZXzjAxnc4fcTHu89F4GEZ45DqQAF8IxohqAqPfD+OD9J/ogFVEuocloB1vD1cxqtpekAB25WWwK++3oNC+EwZGd+Rp+6WvF6vbDC4wb2OE4oXpGNfNEM1wCItcXQK+rOrQNkPurMAJ3JePwFD9fptkEdoNIgHtyDdIdaNq7kYJXL9eey+2Mf86lNgYjBO3L6tR0fZLX0dCrKKfrjhce/JHUApXXNLRhfkQ5uMyHrkuS8BN/T2P0fGPwVB9ocvsI3a7VALa8XZp8aNi72UJXLxYy+fz3P1lPoR66su12mZpSDRMPxz2YRSTfGvNTe/5uJLWhJ5wujAfC41+O5FAy1GXG1G9gIeJD8JQPdlJJhHt7peAdtTdX5OoBntKAlhr2o+n6f+MSt2Cy1doajDUZ701rL4PkzAUHtP8jRGM0umISdIR93kwPRwnbCudX/etzHdb88riVMTlZfMHaAM/hXepOv7w3bZWJsp8wxLQzrlhBhFhJIFuSwBbx78Du7z4gidPF+fLtmok1Ij4WTaDabrSSbzJ6Elpw75Pr+Ht8rVs25X/tuQL48SHie/HiGoaOzZ/E2uQN6QctkX4OyjT6KbvoJtxoxeFSgini3MTxG9BFnx44uiBju1UH6YY9i9N17bs47VadyINnc/XQhrzURxNi/xtkABf+IWbxGjqH2La72PbUIQoy22SgHbmbco+yjaSgJUAjFMSu/R+DrF/62QSHjmpAVKRheOEE6ZGTeP0w454emmaH2d4rzpfPruijjBMfHdqGNN+/wHf7Prs1au1A7ui4FEhO5ZAZKA6FmHEoBsSwCfIfwHrRB/B6AmTO+J8I8GwrsWEDYnGFV/jjs0Kz8fTRB+mYU3ba/6urR+n/eD+K+z4ewPTfr+Ih5pIf+211hmqz65trKF6RNFdLAE8FX8Uxf8ALn26V8XD9skrHAcoGAFpG1bcIC20MSKAMwAXxm8FE+Rt+FGDvA1ZrzvLLS8rt6XjUx/XcI/fixMpvrzuEkcEu0IC2vF3RWGjQu4tCdg1p9ovoVbfh0uNkxocVlbDmkYYncJtbJVftzFiXTSrsNvKpLbruJWFapHXlpcVxombKEZhqJ7CaOq30Jb4na/I7TEJbHnD2mPyi6rTgQQwcnofyH8Pl2+A2Cb1wYlhvRAMDJPi0KdrisMRVMhA+Xg+HeEsg58v0yO3CyTAT3zghBGeRvF3o/P9dsENW0cRtUOugyRCjSTQuQSmp2v3gsu/wcXNEOrU4ITjalh8X3F8v510NYat8vL5ReFdIAEYJ46m9mMTxZfQrv4QoylMAEZuL0gg3En3Qp2iOuxwCUxO1gZwdNFf4In3CIqqBkMflsJGxo9rmDVsFiYP6KdgJETF1QyPMLpmvsIsRvS7qyTALem4/xd4ZmN0EsWuunVNC6tKoWliBIwksBkSgBL5V+B7GIpEt5JrO1Tj4PsM+xeLpHE/7NMQ7hsnxVccSXc/zWB++mphNa7E8cOr0ezUtN1efpErt6TDOB3CA9AXMZr63Z0q7Khc7UlAFUN72BFWJIEOJYB1p58Bi7fBOKkBIUcqRzUUYZ/pvmO6j6NhH8fnTfhaytfn2cBnjYiftx9eg2xHJu/28jcIFSeRGHzS48fxpeVX0eZ4XFbkdqEE9lSj3IXyv6GKjBcs34RdVx9HpY/i4icz6NgG9UFJ26MPIw7T/TSG/ThxAhiMn26OaInj44fC5OU733j68N0c3ot1ano/MMVrMGKvYVT1aG+v+V/RMHga/g3hMNcd/8xnPpPu6+uLHz16ND45ORlLJBLSJyqVSm14eLh27ty56pUrVyrve9/7SpCNvx68I2SkHXhHFCYqxN6VAE8mh4L4RdTwx6Aslr21IW2D9JtdFEoYTgWrRsun5/qDGqcwHeN0DfguHoYJYvSz+RKgAeHFETWvzXJcm0K7ex6fnH8PPjl/cbPy2Q6+NESvvPJKKh4fyVar19vaIFKtVmvxeFzbvRSbMAYIn5mJF++77+TSL//yL5cfffTRbTNcDQXcDuFGee59CaADxXBSxA+iph+FEpLzAEIGiu1Q26KG1aeAVhthBXgh40S6IK1JuFk6YWs5dmLyjdw6JaDGCIbCTE4ac+1qCX7RzMxUzPx8ydx0Mm/uvDtrksnYphgrbkfH2lQRRuqfYDv6r6yz+DsK/fHHa8mjR6d6arXJ4P0v9LMans7wWZm6qWecBdc0rYTiKH4rPKU1Zrhw883DC8DTmQ9ltal+1NE2VbwRc0oAawBvhfeYGiUaEsS17WlYjRBJdHTEMNP9NKVTmMTBM+74k4ZO+dJXo6IwQQjhKCzyO5CAVYd2NMQNC/isu5mfM+bCGyVz+fIiPqFRwbl69aGS4jNLPsC/9YEBc+hwalMMlFbLfW7+UxjR/xgULkzl7nDsN3/xF8/kT57M5xcXY7GeHlvuBXgSdIEF+BLHj4TV12oyMYQb8CCOEDsUJGjaAuDZSqWaz59aOHw4xlmQ+o1U3l32pXN3mWfELpJAIIHl5drNeOv//wRgFBfXAqATAoOjBkPboR/XMHn5xsjHZZrgOaPH6SI/PRzWeEDHAJzC1ZBZaPS7qgTEuEByFazqYFRiyjBGS0vyHSeMiBAHnDgcuVy8OAdDVZCbvxrTdCZh3vmuAZPN6i1ZDbvjtFm0x/cPDcX+umNOm8zgzJladnb21X5m40/N+dNyOm3n+36xlE5p/DTlq2nE1bDihWGTk4nZhx8+YU9IVKQu+1vSCrpc5ojdLpEA3nd6G77n8y9hPHj6NNq76Ce2OW13NDwaVrj6rKWGfd+Ha5hP3MShQlRjpmlK68c17PsMr8fdMMaMRgbylYtHDC3A+PDgVsI4XUcnxsoGBUYDxREU4eVyFQZq1hSWy9IAHFpTjzzHxtLmWx7qC3g3RewCkGXDlB9Hef+pv998P56ctm2tpVV1nnrqqVQqNTiUTCakXWOUyXbX4GBLYEywEMU5BOd8PE3XNMUL4zDd56Ppiq/0Cl9aWoolk+nKzMwbUw8//PCmbD4JKqSZR34kgW5IAO+g3Ifu8jFcg+AnHb+JgWL7UyOlbZF+OByOs4iESadFl+WoTHGYpkaKMB/uxxWuPuk221G5bGV+66oP1RsvGhYZEUHl0BgxrGlrMSQe8RcXrQFjfGmpbC7BQHFqj/G1XcycujVn7rorJ6OwtfE7w+Bn5tE2nweXD/T2xp7rjFv3qJ95ZqKnUFjq6x7HzeK0iFHd0Oz99x/EXe+ua6u5dDfLiNtelwDWnD4Ao/FrUEZVXO7JLzAibHPa7jTs+xRP2MD4+ExXfAmHDJSP2yxMGuUv9PzZwU6fmLUuHReVRkKfw7lGNIsPqtOgcKebTsu1Z0hWFoV0XPdwX8SV6b2Z6YKZmJhDuL0qsGzpTMw88OAARlMJMZgrc+o+xO30+9X+/tg/7j739XF86qlXB+LxVE94mm19XLYOm9N/y8uxqQcfPIJJ3u659lpM9/KLOO1hCXCefHTUfBRPo9/uqhmMbLzRkxoHbXuMa9j3fTzC/TSyFxiNk0RWHmlEsM+DcbpmvGxKd3+3fbREY+EOUoUBqmE0VDVXrpTN5PWK6e3LwiCpeLD4nTUmn68brk5Ewek9d9q4GMLr1xbM1NRS2waKeXO0dfBQxtx7X6+sR6lB7aRc7dByNAUj/RJk9519fbEX2qHpNs6ZM2eyly4VR6rVnD6cdCULTtVxei6VWigsLk4sPPTQQ4W//MvX+nt60r06bacZEbdcrlQxtVh4443Z+e/+7tvLTz89MTI1VU5nMq3vxuxs4fq3fdstGEN3x2EGNnKRBDqXANab7oQy/BgM0Ti44bncjphomMgdHV58huE0rL7CNO77DPvxMK7yVhym0zEeNhLNeAnyJvz45QmXQ7NrBdf0tn0aIzqOgK5d45pPwcxMlbBZoYJ91Zhhjbl5UOBBIZmh4XiwxkNarsW0VjuWdzu/nB7UtSfyLZUqGE2tvfYU5s33SS9eKJihoYR506153uMtcRxRoh2/CYbqWcwEfARrU7+BpyzUamsctn8n/va/fH2olEqYnKt1fUiiM2h4kvBczhCeN414FieXY5uYq8bjY/OFwteW/LUi5IU1pHisUFjmhgiTy+VR91J5ZmZu/vOf/9SS//7TY489ljh06F7g1nAnsijbossvL2HNH6O+YfC93K31vMhAeTc6Cq5fAhw1jYyYXwDl34eCo2ES40ROiGPhVnx9VPfVjIbVJ0kzp0+RTfGguPDeh8H7H2KQwjiMK0x9zaNrxkEZruKH81bUVnBNb/CppCnPCuxNYRkjooWquYoR0YULReyQK3GBOzAyvkKPY+pOxUB4Lt+4jZswTm916siHRg66LnAcCRUKNFABqO0AjdSLX18yo9g0MTaWDOrWNoMNIrL8WEfDoQvmo3Nz5kcw+nxvPh+7sEF26yL78z9/pSeRSCfT8Vqt4D4urZ2nPiHQuHGuIBMFy/JrR0nxWrFYKPb1XZl78MEH63arSUmwgaW2vFxdvnjx1MyHPhRj323hvhtriWdwEkU1Fo8vG+Zpy2XDmNSVOLbwJz75yRdoHTGO7txFBqpzGd6wHPChuB+Gwvx5KCVMEAWGKVBFUEp4MoNuspAADlwN+3447MfrfdTSShrypU/jFE7Xe6I8wvEwXNN3jE+Z8eJUGZSkeeP8spmaLCGsIxKmQ8ChmoTj4QrFsA6UyzUaKBonGr5OHY0TR3D0WQ76S0sl+Hb0tlH+X35qTraep9PxLTNSLKsbCb4ZxT+L0dQ/w+noj260Du3QcUTzZ3/2OpQ7Rr3Fte5knSOMUSxvkpVqdmw+mXxmwR8l1bFWhtB+cIcMViDbc4UCpwjXLldvbxrjtshAtSfVCKvrEsAT5VugiH4dxofbx7m9lM/MvooT3Unj5DJXn1E/7JIDT9N8n2F2pACmCpBU6C4Klyh/nPPhCiMfv5wK3w5fR30y4uBTu77Uyg0LNEqEscDcnn3p4qKMkFhQjiw26rjulE43Dpc4vdcNx/tCpa6OIzqWvX7rNGV9/iJGik9/ZQGbJvoa+Lfg4reVFijtg1kntPUEzpD8JRw8+y7U74dxCsWr7XNYHyZWfpLFYnu7SWAsCmNjqdkHHrgJL82KsVlfZuvExiYINLy1DVQq1a0WhanndZYxQr+BJXD9eu12NL1fhSK9A2LgsxS1Dx01ZlOt6QyIKg0fR2nUF0YenzBc0/Xp3OfFNMY1nwDXBRRX/XD6pselWyN3vszKURFkGFvEbjcaJTq/23ObNo0THVXV8jJHITbe6S9HT2HHjQHdcE6ZB3VhnGX367befDj6oiyuXa2YM68VzYmT6bWM1KbcY94zuLdhtPkKRlMfxmjqf19vXdrB58gplXIS40we5yZauqXMxEQh/8lPysHLtoQtcTtPSCa5VpXBFF8TXlpW+IVqewa2CZcVoMhArRBJBAhLYHa29gBgvwpdcRg+jRKfk6kIeKlRoM+mK6Mn+FRMiiNRgtyl8WY+YWGndPSprMUH/3BXEbgj9sMEMR6GOdTueVQtVMy8qNR4zE8RRqgKianRcepHMvXDBDDOaTJ1jC8u2vWlMK7irMfPhwwUlU1ThbMepg6Xoyc3LSYQGif/WKNWLCkrOtYPaygm35PC5oi0OXCAfsxkcKqErpH5IzRLtbW/vIcw6B+FkfoZhH8U5Xu8WyVA9c1jxUSptgSzRMPE1u2bHc8ISJ7ZPPtan1l+qf9TnzhTq6ZTZbw8O/vKKzfPP/pod186fuGFz8RuP3EwlkWORT7QsHwsD52WddaGa5Wi14IFY8M/kYHasOj2NiHnw7Fd+O+hE/48rmF0BBolPu+zH9HRp2pRI8G4pEHh8MHXe689oAGKOJ+Hwnxf0xWmceYnYZRHYYqjfhjuxwN6RYbfDOYlNw9SmfKiwqQh0pdTS06hMC3smsHCODROVILqCgWcXYeTGLrhmH8219jlOXpqp1zt5M+y+7yWsf4UdjoiwvZlbNZImMHBpBkZTpuR0aQZwCvdNEQ0WGq0lD4cV/h2+G7UewLb8v8KD2+/29dn/gfo7VU3I7RVTkzTFX//5cVELp2vlJrUmDOzFKnO0Kp48Y4Aguih5VQ6nRq55ZZzo5/4xCVsKK9hTWpq9pFH7vDNXFAU9vFPfOIbI9h43oNNIDNXrlxf+NCH7leuAV4QwC6/EjZJyENCs3Jo+UxBtxsGpBsNNLbWjXKJ6PaMBNDhRtEAf2lmxrwHyobKm2slNE40RKp2wz7rLzDgNktjOp2m2Vj9l3BNC/uKJXB0W00nXI0LYT68gcZLWw1HaRp8KlyqCl5LS1Wcvl3Dtu2ETtMJLg4d5VO1OOJv1JGWSl5VE+Pcos2jgjrhy/KQZx679/jIrY6w7q0W1KcrlT9HfnSZLIzQSMbs25cyw9jensvHsA5msVgGrS8hvnG2GDv3ly8jY/T5Ezip/4cxovo5TPv9VqelTadvXlhaeqW/XM5kUilfMuvjXK0W2V/7Fxf7Bv7gD87WKpVyGXZs5oUXPj73qPf5jGy2Bzv+qkmsKw8PDIyPEDeViheWlyenf+iH7uY5sYHj9CNOmrcGKoDWAyV+USq2tHzmzO1dM1D11lrPJwrdYBLAk1QCnz94N55e/xH0135UH2pDHNuHXmqgtM3oyEl9wQO97txTOsX34z5M+TJDH940jC4rcOazCr7y8nkojP4Kp1NdMi2Hd4cW5vguUclcuVo0y0u0z6KM8KSfx1N/LlCqfOLHuzJdcbQd+pKr5nfl8oKZnl7ugoGqSdmHhhrfoWHZdfpso5WgGqVh5eYOGmo8aJt+HNCDkYVJuEfgjavajZZqa+locCGDl/Fw975ON1E89tj53NTU8kGeut7oFMD3YBn2fcVUuMbpKx3DpOGDwNzs/v19s9Pne/oq+cXBSiWNu+jzw37xcjFWS5criURuemjo6OLExKvjuL8ZTNs6/VDnWwZuOp2sTE+XLv7sz3bvRV3twFLo6OfGksD8fO0udKqfhWJ8EDWX2Ren+BuMDtLUGIR9xaPg+HAexxOwtKkmfAQHP0qjbc+PN4ORTnBWMU4BDgNwWk4NC9DBRdmjfHK6whv4DMS1a0UzN1OW94o4ncZ1kJiWSinh46VGc+BgPz4ljk+0ahdFH+VnDzTuoa87SB7cvUdlz/JxF9ylS7NmCSMRf+SzbsYgIO9Dhwcwiqq/T0RjwrIzr/U4meICTR6biXn6RBoy4MWDKZjPKrKg1DQ3P7ye7HcKbtPy01DhIedPYKh+aHg41vYW7nClHntscmBx8fpoubzeuxPm1DquvJPJVe6YIyduKzymcQP6wkL24oc/HB111FriUcqaEnCfv/gJNMl3oenz+ZafwKA6pg5U5aHqmfFmYcF3mRFHLtJ7BkpxlGeAp/iO3ufvQLY8LiJ0KK/yoUL1eSlNA8wt/Ceg7PkiIjYrVGPnzhYwIiphis6OiNgtwastR9xMNmGOHh0MFDBpRUG39Q3T1bMhLxomjqA4zcU4y8lTwEulzqb4pOwwqvsP9MkWc8Z5sew84qiZ4zoDy8CLsiRuH0Zb3ZwSbJbvXoBRZnC4m+Zf4H7+04MHYxua8vqd37mYN4WFA7W0a83Ctv6TxEimnLC5+eE6xvpCzXg0g4W5ZjLxkjluJj64CZ/esKIM5xjF95QEMFK6E0rvg7jejqaehnKihlaDpEYliDPNXb7xUFgrn0pP8NFlwnSUZxgW5kMcumZwnhZBOBWmpiuuhQFexEwYFEJsdq4Wu3hhOXbp4oIoYhkRCTVJNu4Gh3JmFFN8VO50VBucxmquPixOu79UM9xoQQPFMEdwC/NFHPczKzeqXT7N8DgSGxzKouw9Dby4duae+IWMo6ksRkWEcXqp1YaFZnl4MEqnC9L2OG5/cEN1ojFH2yhgRPVzmEr91xxmrLcqWC+Kj4x8736cLtGH++ha3nq5bA4+T62ozS/N/PcfuZ1HG21K2fZaQ9qcO7HLuGKuLjU9be5A5/gxFP2bcXF/jXYOGgoxFqrsYbi4407bAtMY9i9EVxgY4eHwmE4j4vMhvY/TjB8bteYnPMjHuwgLDB8NAcoqBhUL1Amcmp3Ae0UxTjnpi63E4YjjMk7P5mceqOy74chn3/4+OcdO+VEB0UB1y/Fjf7y0zFOTi5h+5KcMNl4JqjRu9d5/oBcbFLLCm8aHa0/92DWHzXRiYJnnzlJ/3ZLq9vOhocfoeA4y/hDk/p82osx/4zdexqaJ5AGchZcJptp0yahVFddKX4tO6UN+Gb08Wc0uX7s2denRR5vvEGzFer3wjbf89eYU4W+qBPD9pSF0gB/A9W4omoO4KgiHDYAag2C0RIUPPMLp2B54heMKD/ukEaNEPoyAVxhH4EwKXUQP50OYlk3OQ1teNEmcNxov4vAvTDvRCIqSJSId8msceSDO92/On59Bhpq1xe3kF58TMMeODzYYCx7E2WqKbL15QX7ymQpO89Hhy9r4RMW8W3+ysLV+KRsuJPIQuUG8RzQ2zt1zSRijhEzRUVYWZy1OXU1nG2znRrSL19XCbSUzN6KaxUPIT2J96j9uJO9HH30+PTLSN2oKlf5KG2tH4TxWW0sK44bjpEWbn7569fg1vGflWmoYq7vxdhpOd3OMuHVFAo8/XkvecYd5M56GfxAM78LFZ3kdJel9DQwS0tQYiE+j5BkVxQOa4Pn0hDGul/LRuBgUZ+gUFqYhXGF+XjJ1B6UZKyyb5PyCSWNElKAhcvhrelS4HHXo94dIMINdb1evYq6PGrlLji+P7t/f32AcOXqi0umGo2HiKJCOxeb607lz0xYQ+mWd6XjkUToTx9RdBi+1ps3wCI8xwsIiyrRNxsgWLPpdVQLcnIJpv3k883wYbejfoZ1qv12Vzk/Eg0jsN3/5lb5CT2oklaqmC4V4PJHQluFjbjxcwSNuBnMWSzhSaXg4c+VDHzrId71c69s43/VQdql7rSfLCHejEsDhrMdA+w48IL8f/kEYBb5oQi3Mi+EG5Y84na+lJQzltQJmUQN4OJ1xvdhANRyMdtDZ+PCudEE6+aqdgBJOYDouSWO0vGTSJcSZ3oljl6Ry1zxYiCWMoGwRO+Fcp2UeuSzfIarDOJXIq1uOmxKYD/OgzxPAuXbEMKf4cth9NzCQwDRdGtN1KYTxhIH8mc7Ld81gfnoXw8zZk0oXOe9hVpySxn3uxf37Xaw5/ibeofrnmPr7p+hMTV+obSYK4FL2PLuBl3nssVri1Vef609X8r2xfCaDz5ykEjAwNFp8daKV8apgkwX3+NAYVRL4lkYsW8zW4oVKujQ/P39s9ue7fCIFy7oeFzWu9Uhri3FxOOUYlM1/g2zfgeswwtyzI0NrGCcxRoirmpQ48HhP9b7SJ1xxJA004rsRlBoZpQe65Q1f8AiAa+DBuOMjiShbAz1GNRmcNZdFZ0xB+eLjAUGZBL9bP1TseKk4MB6cGuPIo4p1l245Gr0j2L2XxQunCIrjRgLubIMMOnbkya/QOsUlGxR6eqqGmxjyPRwV2SyIp/l3nOnWM6DkuiCtrS/4ZufoHnS4m/ZPMfr9UE9P7FK38qThmpr6crxQGJD+OzmZlHswPFyWlpzJzFSHhl6rPvLII9w4teNc1GB20C25erXGl/O+CQ3176BYJ6D8tNHwPqlBYFg2CiBdjYLA0NDxxCQVEnwJecaGHQG8BQOKjtTEIxNO99X504BZgyLpQFF+9IMLCjXBzQowRmkYiezCvMmCj9BQeXMxfrOdHjGk+SwtYufbRTdXpsBOfHTjNLZo8/0nvgdFRyPBHW8brR+NKg0bp+J4v7hzjtOFDO9iA9SJlFvR3nBGjQ8jmBF4GX3rR7FO9betBHOjwKMpvm280zhe5AiU1fvQIB+E8ThAo4ELS5FSKI6UAmMAWBB2RsBiWRy+wV/7kz++fOqVVwqjGM6vUqsmaQ6kKS5/aMs6Gy8YAIl39NigOYYr7HiqAKfeujXKCPPXOEcdvltscv6bn77eMCbZYEBSst6jtKx3u2tPaox4ukIPriTWH6iE+LBAY+QbJD+see0An7de29pWF2ej+W5nmTuSEafj4G7B5pu/wbFjBbSJ3wPs58fGYl186uqoiFtKHBmoLRL388/X0ocOmcNQTG+HgflWKLkep1x5fD07Ik6yqhshxAnzL5ZU31niE7imCZyxeCKGL9hirg3XVrnz56bM1NSSuf32cYwo6icsMH92NtaRU1XtKvT1lJsKnUbQd4uLIYCfuIEw88jhgFWuA6kBYV1opNThfkqcRscfERFPaRRXfdJsgeuGovZqugUl7k4Wu7HMDTV3uiGDdvaT6D8/CWP1dSD8WH9/7IkGxD0eiQzUJt1grFvEsSvrASioh5HFm9DQBuBTe1JpcK7IVx7sUOELoAbndzoNq09ijL5qQbyBchMjXMCanyuYp770hrkNRmp4uH5OHbOlgubuNG7H5rbsbjqOTnwDgIVhfG9JZ0U7z4m8Oa3Hk7fpGOel60+sD0dEnOrboSOiLW8PnUvdihq/u7XsXRKBZcP25kZVt+GB53NYly4D9h8wtf6/jI/HJrqa2Q5kFhmoLt0UGIfea9fMKUy1/bfQ2UdxwnEaPjuZfpKcg/dgBLRGtqQLLscnoNW4wyGrzXmNm5zbcCgPFHfNPP+1CVmrOXlypGGEQRbcCq6jKSrzbjj3lCmsWAb7efGNc6YyYD0oenw0DkcbxeUU7hMnEqYfjxccHTEfW9/GfLZoRNSY6d6Nse3vdmcbUnu1aAvXzRbgPHHzoxhV/ShGVS+C/UewfvlneFDcmjF5e/XpGlZkoDYoyosXa6NoGO+EYroLOu0ENgngNN+Gz1LwYBLdeODnwkEHO6BeVNcaVp/4Ena4jNMJLfjS6DFdHaKE+SBN2jqf+U9cmjNTk0vmttvGTG9fRkYcLAGLxhEPd9xxgwFHIZ048gsbqGWcHMGt2e2IgXaIxiiGM4UGBpJmfD8/BZHEB/KSKB+EC/40OsQLu2YwD6ctZePhR8G9KYH1dMb14EqbdG3/VjzsfZrrvTBWPKD2UXxA8em9JM7IQLV5N7HDrg9P0O9Ag3gbSEagwDJQYHxqoV7mvBIbmTa0pmHgh9NXi4Nd4ILREyHIT+kY1fGIDyN82xzf4XnmmUvmllOj+AZQryh6vzC6pZprU2soe5+sIRye3itj12yxuHJ6T/lzDYkvtQ4OpnCqdxovtyZgJLGFG1N0lCbxFJeGqQO3Y+5DB3XYiaSbZfg3i++WyJBtlRd0wvsx1fx+vFPFab+PuCOVursguyU1aswkMlCN8ghiuNH8iuwduPnfAuBNMEwVp7iogGgUqA3VOCAojmmtFJTAQ8bFkYmnHUXp1fdxNMw0vQhjmPQ7xlHZv/j1qzKauhmGikNJ33F7OKcsNrK9mqxIqwaFcX7YjwaKhiuPL7X292N6bixtxsdTYoyIg8HVCik1g/nl3ENhbV+7tUqNDah7tdgsvt0rYRuc2BfcqGo/dNXH8QLwx6HD/iMeqj/c2xu73AaLHYmyJ25ONySL6Z4k1knux4Lkw1BmPMsuC59bvikjuWCgguk4Bw/iigM/gPk4oBVZA8Z0XnQBrgsTRjyBh/P240SEC3hh7Sv2p5++cvKVl5fW2GZuCbfyN5VKYAPFGIxGNjAqfv7rfWcKcpBTv9khufkCnwqv9fTUYjxCJpNZfXrOz3eV8G5X5qtULUraRglsebviVDp02kXUmaOqT2C6h2XYNU6U5q4pbZcLyqOD8LTxABTeN8Eg+asiK4yEM04rDAeKRBid0qzAcbSC44xMYFgAFHyPXvEUziE8ByBB3OFqfvS5/mX+9E+u3PTyy0sjq78HRfbb4w4dGjAnbxpaMeXH0nBLNqf8aHx8p6MkvueFr7PWYJBgjGTDgmAiXSnU98mjcPclsOVKtvtVuPE4Qs+x33HZ9f+A/w87+ZjiVkrvhpriO3Omlh0aMm+HEnwAQh52gpbNDAiz49EI0FHZcW1JfI0zwTkfThDjSqtrRITRid/EwARpDsfH17DihOMKpy8OhfdxFLyj/PPnp83s3DI2UIxj/afxnSlO2XEDBab8agMDppLJmiqMFkdFeLdLXmCWk8xRIamnZ5h2VB1vgMJsZzvrxDh2QrvWbd1M3mvl3VY6jBId37n8INaqPojpvyfQ5358ZCT2QlsMtglpzxso7G4ZgTJ7NwzEXbhJXBLnNJO/sSEwLEzCxQ6onVB80GkcSeIUj5Ewvo+rmxsaYCEaYdjkR/h6eYfzIYnCUD0Xo79DHTcqzM0WzJeefMPceed47djxXAXGqNyDfRQosq1C/aFAa6Ey1Dh9wXUAhnk/9rLz29tW13M78w7X1b/v4bS14p3QbifvtfJeVzp0n75X9SCm1p/He1WvYZ3q+/P52BfWxWiLkPekgcLTwc24EQ/haeEE5MgDVvWz5uxsnC5jY/UNE+MNF3AkHQaiAc+jVR4+HdiII0ycG1oz3ArPh0vY5cEhecDHcrMsXVjT1PdQdnaQ8wxf/epEbLnYa97znrGqV0+pP0rfWCfG7EOFrGFBPuL4oMGAystCV/9lB23mWsGb4a4XxvK20vJalzV4uhqvgeUlSzW7U9d15b1afVZL84q+7uBq945pq6WvO7M9ROBeAD6JWYrPw1Bdwojqp7FN/Y92UhX3jIFaWKgdhIDfBeGeQkegUdHuqcbJ72ga9n2G9dJ71JAOvuF0xVNfpwUZF1wqX0enOEGa4ngJmp/iiO/RM531Yv38siic+DveUWEM4RPkw0Ojya982UgbRB1NqYgv4V6ekx15jHfLWSVVw3tOPWYIJ12EefMkCG7U2AzHvHVbvfJn/svLFbwzNovdiGwgmtK5b+tqzOhYD7bUYwdJyG1FXan4tE70efwU69ruO2qhIreMsq7sBePjvZgaXnkyMTfNDOKYyEOH7Vbslox2Z4Kr/YYK30DLHbVwB9A2/vP8fO0NbD76WRiqT22Ic5eJdrWBwvTdKBrpuyGTN6FT8KOnFDyfmPRF1nDX940F0zRdfZKzc0ncPdkrnvqCQjQG4BS+wvdGBhazTuPHfTrNW6e1wuUlXcOIDnEpB8rM2ktYme9En0rq+PEh+XyFX76lxZK5hJd87cuzfkrnYY5iR0Z7xSjinjS4brw03MDQi3DLO7b7ciQcKGwmc5rzyhUkwFGBd8tRYfMjhmPjPaKwRYF7zLkJhUp7MxzryiOtmCflrW56eslcu7oo9exuXWtyBNXBQ/0rzoBkPqwrZpS7Kl+t0w7xO2k5TWm5Kxb37zA2XP0RRlQvw3D9wOho7MntrO+uM1DcDj45ab4J86ZvgzCxn0uMEhfSqXp0ZOHLlDfDv5jm3yANr4bDhu7jKX8f5hsTTVc65a15+3GF+bgBvQsofkN+XloYf8fGeagsFagaCiqTSZw8MXkdr8NvguO6l1ViySBPZkMlylHTZihs1kk/A+IbCcKvXl2QL/5uQlXleKaD2CnJbf1+vqwrFTb6TNddq7oyo8v4ZP38fGFTjEQGH5A8eLAPdeKXMuvV0rpyVyhmVLrlmIP2vW7x3Co+bZdd+2SxKALFieqxL2K55C/w8PHIdu362zUG6uzZ2hB2eH07zrg7gY6mz8H6siwbT9CA0Gk0riMRvzEEeD6Nj0A4blbAw8NrBfMbgeCE6JW90jPOsO/8uI9HHD/Np2GYedMwS6siYKc5KhCe2nDq1Bg+S57zDEUNoyYosbli15UY88zgA4MHDvTJga++TKjE+IIw/W47VdgcOTGsjiPDCxfmDEeKPlzTO/HJO5/nl3b7UCcvUzClUZLRxCbVFYeWyhSmXydOW3JKj9OYPryTOiot69qH9+l4QknY+XXl/e+iU6GSq4a7yL5rrJqVb83yUlZWXj55TF78xTnJ70lmzIXp6dqPYEPTJ/EUTqQtczvcQNViGC29GQ3vIbZLSIXts4pGT6HrRWHpTfD9cDpHOOymCldc7boCJ++QcdGRUZhO4yvyV3pXTqY35OHKoHRBvg6u+bNzM82nVRr1/frUpcDUHeT6+tLmzW/ebxI4GRyyEccv3166CCVW2BwlxnMA9+9nk6k7dkK+2LtZ603MiYYpvAbDEy44fVncpLqOjmK9aWjlUfGbvd7EunJaCO1UHP0lnIfI+8ovGivcpnb+y86/D/e0v79+xqNy3cy6ah7wXU09SGdB3yJ0xslSr7t8nHK31fLtDtlwvQAnFXAIUDE9kO8fYnDwP+LIt2/Dt6ku2ew2/3dHGig0xAQOQLwXQ8tvgQiSTqnpFF5YKnpTxHdKXWFhXI0zXS+FqUHguwKBIg0SGwPKX3moESOWpvkUvPtqaHx4M1xJ9+qhtD6uHya+tjKf97aH2fj5JdqbbhqGbG2R6VklNiMyDlekG4UegcIOf/aDfDv5Cu5a5WIbpcLmWozvFua5tjYrICcCP7mjMPlxg8AANkOo4VeGNMJU2pvhaOi53hSu6y/e9YUAAEAASURBVMxMwVx1a2tNe0EHheHIcGycxim9oq6buY7YQZHbId2M5t9OvpChqgwWQcP06axx4sc61RULwIuZ02hTZ3DAwU9iE8W/17TN9HeUgXr88VrynnvMO9H470SlKTmOJtRJHJ1SfE1v4ZNGRyIyygDdagZCT2ogHTuA5iFx/GhcfcI1rMZJ40qjvsLpq2NYy9OMXmmIH6ZTmMLDPtO31VGBUXneeusYnnjrh8UStpnrTTGuN8EgZjG1xzKoY75UYpu13sRRBI1TOE+uN01PLzfcQC1Tpz43Q3C9iZ+j9/qIyH0z68rRIXcl+nVlXa5cnofRstvBOq1bmJ5ralxH5Le5wnXVsxzDNLskzlaq/XdLimwNE7PSbP0iWOVK8yTdhx3H9SPFgvwz2Yz5PRip78DRcB84eDC2OYvHTho7wkBhxJREo/+vUfnbPcn5UqQ0mylyVw0rbchT8IgLXhpWHPoKU19hiuPDJc3xbIYnNF6egsN8AVPjI8YRCeRLp/xbxdkBlVbxfX+1MNN2hKNCOfWmUXxLyVtvQgu/dn3BTF1fwuvsWv3uFLeGh5gsDojdt69f1rp85bmZ600sPddg+LkD33Eq6uLFObO4wLW1LtcVcuzpwSG4WIOhkVIFwvxZV5y3JkbKL0+3wuH1Jlatgqm8CxdmTAGH9W5GXfswnTeOTTVh3v56U7fqtw18uts4WlSA/aHeJxqzpMqk8bENiWmMORwEJYQfobeIpoCHFDzsvR/t7fFr12rfiZ1+F8hhM9y2Gih05Pj0tHk75jZPo7EnIATdHu7XlTJyEhOwH6cyV4Ue4DjjFPAAb01T2mZxSfMMG/uE4isvjfu+n8Yw0+ia+T6dpPtl03KH8mX9wnR+nAqJOGxOwpOZb4djI+7pTcl6E40U6iOOSuziRafEum2ckGcvpn32Y6RGMWlHpL8V600cPfmOX/XlGgzf6QorVR9vI2Eavv4Bu0FA60k+DHM6jyOnzXLN1pt4gjzryvvb9bqiOY/v68O3ulauN/Hcyc2s62bJcBP44s4HemYFe7aLejtZiUplQaj9bVSSAgUC21wMH+oWzSLIZIq1KbtD8puxW/J5bKB41+Bg7MvCqss/22agMEQ8jUb/VlhhmSmHHHzjFHfKWpUzq63Kd6Wkmdi+MSEfvYSvo6VCVbjmxXQ6hWvY9zWsozbG1fl0CqOvddB8wr7iKpzxVrwURx+FlHZLfU4dcBcZ15v4QhodGzWV2MVg0VyL2r2ijYzkZWdgvSOyU9nPy3Mdxod3K1ca3mbrTYuLRflgo+TZ5apSllyDaaawqaxpjLeyrrNYb9J3ubolV+XD9SYap97edEOdWD/WdbPW1jT/XeSvaGWUEY1K3SmK+vUUYlmon8YwUqgUhQ3UCgI0UoIc+JYYXX0A2f0l3kn9kf7+7r/cu+UGCm8q78dT57eiYoPo6CpJf7Qi0qKOoyJwTiVIPxzWOFFpJNSoCa4zPoqjvmMb8BJaBUqkbvCED2C+L6jKG9MNtcnr5fyzz84eg6IW/ZzJJEo9PckivtK6ODKaWcQ7BTzShx2OfKSMSg94UC6FhfIL0h0t89fySNiTFeNb5tgXUGZz7NigOYYXcLVvEDaJ6bzJydD8V5dKRiV2AO/BZPE+jOaprDnNxfWmMFzTO/H55NhsvYkvo05Ps67+reokpzptEu/6HMAaTPiAXcqYCpsjim7XlbxZV335tl4arjfN4Quu3X81gHmkcIjwwYMDWG+qj4YJpz5gXTfrvjKP3ej0vqtv66BtkOqVF+PqM6bbHwDHv9LWn3AJFDIgunGDWCuLjxTQWQTqHeryZLL2B5OTte/C+1J/Juld+tkyAwWrnsRU3nuw8+ckGxsca0iHWsslEfcTHo2sMGA+DTpTMx7hUVUzHMLo1LexxjKtRhfQLiyW0+fOLR6S5w5bHtxbPHvUWNlaLBGHAJKxajaXLJw4kb9y/ER+Op+PlwGjHPQ4poAfAyHXrBxaxxDq1kWpSPh+08hoPmjobPDX8eLtFF++pabroiNvGH8xTmGFzXUJLpozS+10Xcxato9zg4DvOHK8hs0Qs7NYjFrRjHzMjYTxJrpbb+IGAb9O7EO63uTDN5JLMxq+aExDrLePPr9azNHw8hLf5Wo0IM14rA+G6Uu838Qjmpq9y7WZ93V95dwZ2Lznre87VUpYXVilZE2T1yeBamMM2Hsqhoo3XB6mxa83hKD6dR40UqVSLIfpvj/GCRTv7euL/VWA1mGgnkuHjFYjx/DvVlTibagzp/MoPWptXsxfLqQ1xIFPeAALpQdw0iMtwAWdplHeGlZf8wvipHU0hNGRX5DOuLt8mOD6eFevFnv/5q+vn8bLiRky8B1ueAhgETB3H+/rSy6dOtV7+cjx3ExPLsFNypoffT9PHy5hL3++kBn79J9cOfryi8sDiRRaDNmgBeO1Mb8oXQuzc3AK5vTpfSaXbzw/p4yXJ/iy5mY4ypbrW2ElxrxooEKi71oR0Eb8EX3At1SqYg0mtLc8SO0swLqm0/jmCO92yG11XXm/ub5md4GxC3fXcdqBDxzN3EbryileTn2OjK6mzJvluPNglD+vlY5Av4Fo3PctFduT5WHTSGVD+A3SHDexUj5jYtL5eVmI/4vbuIyR91swknrWh280vHpuG+Xq6M6fr+XwlPcwoidwWVnYNFW84kM2LAcviTvjFMDC6Q5X8L00wfcMFO+H8iRfumb5CtzRSdij0zKor/Q+b6aZhflK5oknJm+7fLk4hpvUoJ1bGSjSOYcsjXnonaMvp1Kx6vJSJXX4cG4BD+eaL/0gb4QF7tWdypN9PMBHuIYR69C1q+aAy2NTvOadZlOyiphGEmhbAuxQR4+ho7BH7DJnjZGqS/W1Es3imqaVreMQIjEEZMODxKEYGcefqEggyNISEel0Ok8iykt9Abb8cfK+An30Frwr9XpLxDYTVHG3id4+GuYjj+JojO+DsI/i8hW2SpG+KnoyVrifiaYLrsPxw0onMAglSIOgNKz8NK5+AHd0jKs8iKNOw4Hv8ZapSNLnexLlgYHkPKf1fMIVxkkTm/hPf2X6cK1i4k9+cfroxz92/vR/+fPLN589u9gP/nxPq6XT8kPO8lE/9QGXJybEN81vWagoIZLAdktAFW7n5egeJ5SlsT9CObrROUenvGhI6uqwWcf3i6Pp9C3cqj5WGrwkmTzJkRH+IsK4qioYJOViA0FM8MmpXh4ba/XLfLBOOI4H5E9ev17DanBnrutrUFTQmLt+GLMet1DwnrPSsTXVsCZrXNeegrgiwFeYgtR4Me7T8elAccO+0oZxhIf81O+u0gZpCBDWzMWSKVMdHEouolC4RS0cqDH8lZM8kxgpEctnODNdzr30jfnR/Qezs6++vDA2jfjnPzt19PNmKtbTmyidvCk/ddvt/VM8CBMNQcrnjFODLFzuMbW2LUoTgSMJ7GkJlLn9vVEHraivPviFfYsY9M4gsIJBM4AzMByhSBA47KA0CvUOrxGfNXWHWg2fseC6NB/f8nAmR5gHqQyQlUXxmQmewAOoowqImdBA2BAJyFoE+DI3plfvx4u8vwuU722B1ha4qwYK5zT1YdfPw1CaB5E7m4ZU2RkMFqhBBA4ewJyyDeMxPcBhIpwfD4f9uOIqjL6GNS3wvfIonuIG8SZ1EeNQxTLEQF92KZOZL+A04DTsFG9qowOEGyWKxWoKOxnjmM5rOG+5VsXZg9cKPUPDmUWssQg9rQzyxPFAldTzX5sbf+7Z2X19/ani6XsGrhw9mpVtY85YMS+/vCvzbyxNFIskcMNKgH0qcOgp2lkae61CA8x1BCytZCOZMc6Y+n4BArYeUPEsH0ccIPoBi6H4yAFc/JzqasGnIkelCfIg0CGpLzgaCTFoHYVxMumU+R7sP/gEtp//X60xV0/pmoFaXKwdwujgPTAy5KnGiRXzL5YmHPdhDOuDv3751k9vRsshssL9kZHyIT0dceh0tCFxj1Z5KJ7gCsXKH8H1DCqflOIDQ8nlXD5RKBRK2CjBlhh6GpLHKDnZu4QXOZOLi9VsD/CVPU5YqM3NV7KVWiGezSZKxeVKMpCGQ6LhWpgvpz/7N9eP4ITwyt2n+6/ddHPPHPN3KFp+eb9OeUd+JIEbXQLsGKK8PX0s6peCUZggIa69iGnrdNYegYHwUMZgInH+eLAVGQVWw+Vqp3QshTAQejtqsnFRNeBDnKB+SLLl4CgO2HVSWw6JK5BZ+WHG1bWCa7ql1BopNg19CY/fmEn77aWl2ldzudjZOkX7IVVq7VM0wcS7TXfTOGG3DRfqtayCCcFomZXSj2vYn6IjfQD3wgE9eeJi2XkpLtMZ1rjy0bifpriB75UzTKc4vmHzeTJdptx6emLl3p7Ekr8OJYlNflLpeDmVjFXm5ioNnz2lASoVa4lSuQJpojIr5AcIqojC1EqlWvypL82MP/PV2WFC4bSOWr4mOUegSAI3mATYY1yPsPMS9foLWHtL2K+jtRVyz59uCclXgxpWX9kxQ4Wpzz4chCWdU4VaNJtWj3EUpKmEBinKAgCpuxdv5M+yBFSMrMuRUlmTsCGMYUoqbQ5ituh/glA2ZGs2RKQ1YKY4EeIhjCS+CbA4rKVvaFh2rbmG1aCosicrvwzE8+NMV1r1CQucG8UIX9wI4tAxrnx8Os1X8EKjJyF0dEpDX3jDFxpF0tGTy1PSYKTj73ho5Bvf872Hnrjllp4L8YTMgFs613qVnj5GQOVsNl6CkcpV8IIvQILL7ec4X45hS0vkFo4GbWQ0VWR5FhbKPC5K3Zq0ihj5kQT2ogSkA+CHRinoFwQ26xnNYG0KRZQKrQDyQZhR57QzEqCXpoV9phPf0gQsHB2hYQ6Cw9GRsmIgqKgDckhFFyBpmSy48Xe1tEZMjfkUmoXAXKSCURSK9CMzM+ZdSrMef8NTfDBOSaw3fTNuxi3IUKf0mLeWkzeKYf9iOl0YpnFJC9EpPn11xKdT38YafymnZkaKWL4hVaqGMijQ+U3rEiqnNMyJiULfE5+bujWN9aW3PjD0jXQiXn3u+bnDk9cLAzQinMYjT2QmZcc6VAVD8NI8jBR2Ai5jVEVZigP/NV0Mr46MjGQLTz45PfrKS/MDd9zRN333vQMzIKw/Wq3JJUKIJLA3JaBdSP2mtWSPXBWhKZU3MpEuDR4+Ew0zTTNweMJO0+lrOhNsnJ3XL5TFBgwBLm9z1GSzA0yMEGAylQeEgJT4lpKcrQvHFU5/tTSbStbqiO3HCZfsFOjYYVaNn0z6ZdiMv4SS1FRls6q/IQOFjGKwiN+CjI/j0pdL/bWgVWuKSmg6fTUWzQoq6S5BwiFaJjXwQlyNkvpBuqPV/ALeCvd4KV+lZZxO4m70tCIN7SZ28GBmPpOJlWZmyn1PfHbyVnyXL851plO39l1AQ4pdvVron5os4rwDtip7s/CCYlnWlhYq2UwmXsrm4qUVd76evYT0Z7AvVTh3drHntVcW+jFtWP3Gywv9s1ijesdDw1dXNk6livxIAjeQBLSnqmqkrzCKwQ+3IRboC6uZld8KGkWg7zP3w0okpgbdXX3CqSCtibJY9QLTCNHhpC/LWsqg1IDVUR0CvC65ltUFfxZHssZPQxEYsYA3473MH0TsY7jads0ktioxjRMy+lbcJH0BlIYgrPR1g4OKUXCIx8sZhADmFH4QR7qG6dORTr/ZpDxpEJkuuI6n4Dl8xQtg5OsZl4B3q/y8fANeLk+tQwB35aBNiL3++tLwFz9/nadnMN3WGB7eccDHEGO1VBqjpmosXilXgzIQjenz2CRBnN6+BD8R5jtEGyE0iMeO5+YmLhXy2BkYvIaPexQfG8ssnb53pDg3GxsD3oYdacGbZdswj71GiFHvis/I77U67vb6oB+aQ4fRQRq7TEfVsryUofaHcJxZKEyzIy5hPo3CiOOHHTWeXdn3rKlSmEXlzl7oCfP6mYLJ5eJmbCxlevvi2AAAs6ZZkG0XnF+TxlLWa8NstHZO3mFUlFM+S/M43o19N5Rn20ev+PmvWR0qPoycHsao6RiQORUlxkGVtmMgMBSUvHlJ3PlsMBqXdI9WcD06n9ZP0zwJo/PzU9706QIefr6hPP0yKb3SkYdvbAMDt1o50UhiX3hi8sRrry4cTKTiwZSdFsiVi1F1Whc2sNjiUiWNbesxGil5UrJYwAnQArq+/mRxfq6cDhqmlTt2z1TNvvHe+C2nBlMbPYkHdcS3jsrmxRcnxWf8Rnf8tMSJE/3m8GEMgttwlBmOvzIvvTQl5/XxySZyrSXAY6zuv3+fKNvWWGunUMxioHzUDYpeyBruG/SvqOC1GPp6mmG6Og1DdWh9FBSwridaTDeVx++pLS5UzauvLJsij9rCsWLJVNykcF7j/gMpnO6flMN27UNlPT/mHnKSVQgmUS2b+s1wWJWGCTtF9n0SIpcE5uqwRj8D3fvtOAbpc035NQG2PcUH45SAcTrtGScWg079IIx7SZheCl8x6ggZCt8QKK3yDvvkSSd4ofx847SCDnkKDWmb0AVpId6al/gt6AIcpJu3vX34zN339F988oszJy5PLA9pW3N8idvUgbaGnYAFfBY9PTtTzuGsvgI+TNdg5HzCudkyzrIOnNZXAGjyzd7GCpCjwNZJgG1CGhwDkWspga4b8A2KW26TzMKjqMHTn9+LlbHqePVZNQ9PaoqnToHWaagiFctC7a/CmMiwLQdC0oDIBJRAxaYqU8ZDKKmwmxeHMy/h69U5c+58wZw9W8CXlmNmdCQlBmuVkZXNFDyaOSZKGdRXgI8MmODgR3zlqLj0cfEhGcfeDeCw5YdhS57AfSb6mq5NAyWnQ9wG43Q3OAZrTgj7xdHMXJEkqmHFUxz6zWAK99PE4OCmKC/l4cf9sM9D4B4t4207R0d8ncJU46c8fH4aljwpfdyUxPHjuetvfWDwLIbkma9+ZebI9evFPu7QwzBdb5DSKU/6sVwuWcLpFNiGXs5gpx92+yUaXuoljk8QhSMJRBIISUA0ZgjWRpQGwC4RExlMVu1pmqg+aSTs5c64dnc1VhbLQi2qz4EsgrgUiHzhHBCHAYhhSmA0hTVrjJiy5uqVZXwvLCWfLCkWePJ8wVzAlcfXpo8ezeCkfznExvJZ41dLq2UQPwy0xdYiBX5Q1VAePCEfA4S/g4/U/j6SXg8lN422ZaDwVvBx7GW/Dw8SZcjKnwYjU62Db0gUzjRJ95W9wnzfpSsvn17D9OloLNRQ8IErCDPNXYLnxQW+yuipFR35NLgm9VBa9QWfeY2MJJfPnlkc+dTnp2/m5r2R0fT8PfcNnh0eShVefWVh5PXXF3HOcqPz+GPIbqo432+Jxq1aq6R684lSy6Ug5h65SAKRBOoSWEefsCM3p3HJQR7wmzEgTDU1ETW8AhcAjx9R4Sy1j8upPQtnnjRffmo9UcjxQ8NkzNQU9lFBIVMf4IHXxBM1TO1lzOXLy2ZoKG0yaa5HgRP+Fxcq5usvLMq06aHDaXPgQP1DkMxL81dfc2rqg4ADSugpcRJmyMUF6IcFYH94BBLWot6yuCg7v1/3kloG1zRQOKpiBJaP28lZfnUsghQDipiOYaaHjYWmBfgEwOmIRHgwLtCVvgOLt4KHl6j0CmI5wjCmtYIpnL5eii9xjB5p/dVpPTXu+0ofQ0OKYZpvAoKJv/DC3MHr14p9vIjMjRBYP1o6ciQ3w1ESTkHvq5QqybABYkPANF8R7zilZ7HW1NubxG1u6piv59jQQyAvNQpGEogkgM4uXcTvJ+it1GQ+KIjQaslCEEXnsIjIYCORhfq/JKFDr1TeIKFhpJIXW8LpO4tk829kaamBX1iumuvX7IQK15lIY/VGDevOGTMxsYyNExnoGPAlD+aJ8nGa7ezZZXPhjYI5eVPWDA/zq57CNii9ZAmGgRFy6ZIJw7j8MgZhIbS8VvslX5TrnTCuj6Pu4VmhFaSrGigwyU9NmQdxOGkWjPlpRSpmVc5aNvV9OGF6+UVXGAuidL6vYU0XfOQbwNsYBQW4zMPRqkEkX343iCPBBCx6Dgt3GVw51C+NG8j9+imEKRehBR4d616FYCvuqkImJV6MExe+jOyAx48Pahkk37vu7r+EKbviU09OntT3oLhjD+tHuReen8sxzEw4V+zyY9Q5C+HXeQuFKtYBS1kaKaxLUa6RiyQQSWADEmDnDrRzQO+6rfbeBrVNJO2dQosfRbQ+jYA1F+Ssag9QdFWeO0aIYLiwchPO/KGTbu34KnubIr98SD57dslUsVnHZg+f6sPh8iPlIxxJYbpvP9akiF+vJyMxw2mYF7++iI9hJvCx0ZzB+5cyCiMm2UjJgwChcAQ6LxCdy1MS/LAAmv9w9Af9+q3Yz/BrwJhqjlWHtjRQYBLDi7j3QgmPIlxBofwiSNgpYoYl7nAUT+FqJJirwDwFLjCPN8XQYOiUJ2gID3iSMOQ03wCstA5AI1LFIt2+S5fMewGr73wLKGwA9V3hwKulIz7SScWrSgMIueEz72Z2cNBM4JPcy7ecyk9nsubVLzwxdYxrU65swpOjKT9ez6gxV7wjVQHf2jzec8rnEiW+9yS4jffGgazRq/OKQtslAbQ7fAU4iekNbM1svKXbVaQdmy+/HLyZrrlhYrcNd3AfxjTG1WmawjS9zoNdUlIB0s9aWIjFYTNweqOesyTZdM3J90lz8ULB4CsHlhYZ0PgFmgfIpGa+vb0pjLI43ZcFrjOXSJQvHznVgHM/zdNfnTe33dYDo4b1BDxqi60jAzLiRadxBIPHYk0ThPZ/OIqDOw2d2At/4wbq2rXafjA5BiaWJdnWi7yieBCeVsmrjlRN6cI0ii+MHW+FqR/QspOHDJumhX2lVV/pOJpJ9PaaK5gHPYt1tVuaGSIya+bWwkW65hfHiCyJK7u8bIZh5A+Pj5sXcPz8XKWSv+n0vbn83GyxPD29XFtcKFYWF0tVbhNN4NPpIbcCgPRYAt+O7++PF7D9O4VmF0tn5Cu8IdIoulMkwHbDrdOnTg3ulCLdcOWQZwLRStql4DfEKRJfbTGuuArXOH3C6BTGEM0PlYCFCYZDVaUfSq0/rNTZgEywLXv5tfmzDvgcjzmPXXqVMjghLuMh+KqbyIZlIEWC+hKBEnSLfHcHbKWEgqQlsd+i+tqz8+b223vM6GjK8nI8iSrVkQAj3XGcbYJ+PA1u59fi2HQExS/hYhRwD4SQROX16V6LKb4zFnzc4UOJ+C6zhjDSiK8wnWojTC6XHsQdD/Fcmg9iWLejM+zThcNMp1O4hFGfxOioefrCBcMXWAf15grmJvxw2nBiwty5b595/uBB88KFC7E7+vozeVzSyFBHvB9Qw8uwlerk5FL5+tWFCj6ZzoceSfeKxHqIIw2m+UrzC5UkPjeewgnqDXO5SA5wlSbyt08CfLjii4roU5FbQwJs9/ieXKB010BfM5l9RZwEqLqdC+JEIFwRFSHsW1qL7dMoT8LqYyTNV1MDbkraPD+kEqHRkRffv3vttWV+dkfWlsQ6EVeGNMiFBghhyQ/hOCwU34vC2jWm8mB4oLAta+WvJSOtMV97ft6cPt1nBgatSVAsKQlRFaB+YxHXHUNx7gDRp9cibGqgMC11Egw4tWcnLRuL5xsZ8veL3Cq8Gp5fRtLr5cODUZAH1LzUZ1IQxk2VsDOkARnqFMPIcBF1fObaNfM2JLSlNthxlpcxLMomw4Yj4N0qwDyvXDG3HTpknoNxPHv5srmVMPLkxbUn8I0fPNiXxiX8FxaK1StXFksz04u1cglvSHMboFc/0mEOuVIqVuJ4UTfV25fE7G7kdqoEaKQiA7X23WG77paT6Tzhh59AM5C7RsI+kQkT30U0buloAupjJcVnGsOkBj7+JYYfNVSSRlYNARdf4VletiwwNmg7ExMlgyPSMBrCYrjdEcFsAkMOKEZMAiEUC+II459rVZWynVq2siVv1kF/EaAD+JVXl8x997kX0Imgzg8rrE2fZacMuO19uVA1WEeXB/L52cp3fOpT1xbAZq5Wjl+rxauXC4Xime/7voPXfNYrDBQe3XtwlNGdQKJx0uOFSMNi+kWVuDMEClecZmlhI6MjL/JGNRp4s1KE8SJdkO7l15CXR0++fhpZhMsTHx42ZzEFtx9Pa28iwloOPPEUnMQ2zgU5+ufo0b6gcaxFy3TUIYGR1K3795uXsDY1jbyHWnVGwvP5dPz48XQmHh/EttJq7fLEfOXqlYUyn6RYFnHAS6UTVWwxrdFIwWDxTD+XGHmRBCIJ2BEG+wQVszoNh/uK4gk8SLTqhDRqnlRZWRSmEEf6pUWzYWEHABMani8tBUvDpJV6wPLV9KWlqrl0CVN7WGyhIdI1LVghEJM3MVE2soWz4zjoBiwbLOEkmAK0ZyqDFy+DQZTN1NaGlDa/udkSXvgt1af6LLt1/3JG6PLlgrl6uYTTU5A/jBKLKUocPywnlPRbAHyL5A5YPJ40/X158yd/PAuDWn4Fdfu3Z84u/eYKA4W1GQ69OKpQRc8Csga2Fow1hi3EGROX5uP6+MpHeVOkLLe6IF0BzjhptBlfn0b5El9xNd3nITBMuz2LLfTj2FkypIlr+fv399Bg4L2Ca9j9ksYLcBzxoEm4xrEaPdelrl83R7AONgkD1Q/cNUdvqD+evOOxg4f6k7xee3WyODOFfaae1LijD5+ELy8tVhPYSIEdhtIbVitKlBZJ4AaQADulqgFW1w8z7qdruBGHMU0hRTNnKayBoC4QAiXy2ImdQnxxMWauXK6aN94wUOA0D0SGIy6CXDPihIlAGSc8hiWBON5fqnKDBCdLOH6gs3jCA3iih0BLDUA+OGxCriQ3QBA7YCrEwkWPmynhBZbrV4tmbBxTgv7OA4u64pejI/LDlxhgkIqyu5AvEEs9fWyUi+qKuNwijxkh0aHE41mCKe52R0F5PBtGRDUcVPpsuVz+mw9/+MhSg4Ganq4NQWEfRsbkJ2IJ+1CYhIedwgIfmTNMPnQ6LWhjlrfAHYC4erGCGqavTo1PszTiKFzDwYitGT8IC59cN4UDB8xnMeX2Fmw5HyehvYEMNXdM506j2+8YxVx5yTz15ATeU0qbU7cOi6FqTmWhpMUDwBCO/LiG3XgFGMb8avjN0jgVOF2rVVOwSkPD2cTU5FK1VMYrebix+Z5keWGhlMrFZOMEcotcJIEbWQJUCdoNfFXSTCaarvjEsabDpnhhALhIbNVUnVdDXNmJWuIac8y89PWquTzBjQtQPk4zEk2MGspJhS3ogdFBNF4vj7CM4SPbuOxsHpX6Mqb2uASNVFVeggh+mOZjOTklSOUvnIIRV73cEkIiyefwUq+UI5SsUaYR7xJOqHj11UUZIYliljwtlhSDmQHGKUaug3F6O5lMYDcrT72ImUzWCoCGlMc28Uu35WLl8Vgy/V2PPDI0qfk1GCg84d8Cpc3tf7oxgnhB1s44MR4YHpce4DDuDAKCIhMflzDFpa9XGM6475SGMKVRX2E+fmCcGoA2EtBxu3cmYxaOHDGfgVCh800VBjqLPfrH8LbzIaTncfHz7eJE8I4hRzb5fMrc/80HzMxMwTzxtxdMb3/avPnOUTFgPq4jUR7cvj8CA1XiOwHrdeTLeejRsZ7E4SN9ycNHBrHtdLly/uwURsZV0wsjhYXUBO63PmKtN4sIP5LAHpEAtSQdO7BoTPlxYR9OJOdcZ0esHrJJQVw6dxCr0ymIWhfUNEJYLjFPf6Vm5jBS4s46Dm0IJ6psEVdqAISKtPi3rGyYERuH7wL0qAfi8RwMRgWHxtJQ2dEDp/KEBryojKHXvfVP8FTNoEylDHZtiwalAUxWDjCJ6b/nvzaHOsHYQQayOxDpDItIwJrEDOMsURjFmmzQwIYuqRuzoTES53AZTibSGFWV/nUiNfozjzzSeNJ5YKC4cw+Ck1EEaFaU0YNpmhoijTczRHJLvFGXxFFhpaHfcPlpnkH0cUASOB/ul0fhASIChNGt8GGYKtjVdw+P4KBwIYdFGJAF7Ly6BAM2g3ARcE7HJWDA+jAKGoVx6QNMeA0MZMzbHzoMQ1Ewn/vbN8Rw3f7mUbt7xt0Pydn9IJ9h8J5GXe2DmJ+4RhhPQxgppeP7D/RiB59FHhzMJoaGDiQuTyxULl6YreLcvsryUiWOz2RwDTFyO0QC0b3YjhuhHUB8F7Eef10XRi+1QwsLq5fT6lEoYCqmoC8j7DjVMb0QEufnauarMEx42IVxcCMm0Fh+NjdSkI2ysmM0xB1AfE10yH5UucXjCZPN5LDWU4ShwkYK4tIhYA0UthJDyZEfjz8KdvtZLIePkiEdSwXW2JBc8HFo3utL5jlsRedITMsmpKFpQD60c82LM0xcrxfDxdFbIDeXoeRogUl8Ex4nEPxxLZb8xx8IGSdiBwYKCnMYdQi/rIEiilPfRVFOa2QI14tpiufDFK5pjNP58XBY6QO4y0/pNF3j9NX504mKp3ya+hBs4vBh85Vz50waxoMv0nLklIcxGuOWVzq9MTRgCPMZpAo/rkaKN6cfW8ff8fBRc+3qovnSFy/hROGEufOuccBTHNEFjjTg3aO0QUIbAYxwq3j5Du2NTzx1ApZr3/6exOhYLnH29enS9dIi16J0ermOGIW2XAK8Txg1R27LJaDdnRn7WtKHUxHJWQ8NCkkiJBFUGdYgZP+lGkGaxOSHOoIPjc88g00NF+RBNxi5UF3K0yhZ4Frh3MgpsGBqDaXY+PGyJi2NDBlZVjQcMeibNKYPOXLBNJ1O5UExcETFtSjun8LqgCsA6MlbGPAHU0j4ZMeRI1nRKxzlXcN61JNPzsi6keAJTxIRW2okPmMFfFKGrifP0ZI9aZ3MhXOQlc3QviyM8sDglAvFAh6jP/qDPzCCseZKJwYKgovhhNkx1JHH/OipEeStFwutYfrNnMADmTXDWAlTnkxRoxfGIlxGXsRxF3EayuHyVZji+Tz9NKUXPNKifjRSX4aRysB47KfC950fR5jlaeqINzKaNw+98ygWQhfNk1+4iC3kCXPb7aOA25tPQrQh/zMZTXk1A95518A0NlqM+sZJ8Zg353JP3jSc6h/IVpcWsWIZuR0hAXZ4tLPIrSEBtuFmbXsNshbJ4eZfvwEM2VSqU6tMxBcUhJyCdxTu1tXh4Qw53TV53ZgvP1U1JZzazftNJ/k4no6XTWCuALgki4sIyxBoNpeoZsjOzZGIWIIpdPYHUzx4aMWGKqwdwFhwuk9KbUc9NY5kQCdmRecAyYP1xPN2FetVd93di4dprHGh7M8+O2e+8dKizYYovDHMUvIWgGTL96v4blYuhxEaLGCZoyzBI4nLmz5zoaIFE5V4MpYyxfLSF/PLiaeFWZMfHUHlUaj9AQ8rIvKk832GVelLWDAacZSGSt/dJuHhv2BLeAO9lL0OC4+CXDYNZSFsBR/Hl2nhchMWxqfSCMqBcA3vKj2Jo5BOYxrvKO/JRh1px8bz5l3vPmampwrmueeuYp61ak7ePGiOHeuX+70R3jCeWch11d1/zHtkBLd0LN/Fzr6R0kY0aFPywcJvfIMfLCw4pRHJpZUEeOrGffeNQ0lq922F2S5c+djOTAVJ1WB/qXOhAAQFEChrUapMV7IgGwdQXEskqexvLzxbM2dfRwAaxq7NMAfHX0LuB8iYpUcEhgzvJ9FwcFRDGKvMB8wkjIwc+QSDw5JyfBeIQ4wM8mA5cElxPP5UzlxHYj3EIc7RVv31FAcnXyAw/3w+bt7y1kEzvs8+M7/04qL52nPzKIfkDiyrJK2BZJ1svlzzJl9ueGB22H4nWWq6RPBjc3J1cbQseBE701Dvzz3yU+Nunkop6r4YKEw/4D13E/70gxMBitV85x65EEeVPuN0gcwgaxrYVumKp76lBr3LT3kHcBdQ/MDnPVAk0NJJ3IMzHuAIRpM4R8Zcj8LOvmcuXjQpbAU/oPfZ0azbI/3AINaovuUwFkqL5oUXruPJZBJH3wybozBU63UoE+9Ve862l/ZwI6xIAntQAuz0VmFaZSsGCRCrDKzyttbIhZkCApkbhwJxxFYyliiQEpOhY2tPfrEam8Vak24aUGSmY7u0rA1VyiWYpJjJ5zJYL0oBN4nRTv05k0aEJXTW0hokwKimqlBMC1hf4k48GvA0Lrz/iDSmWxwWrYr0o8dwSvlQTr6wi68giPHhBw25625iooAddRU5Kok76QZxmjm+V2cGcXoEshB37WoJU5QzlAL0PnkzBysvG2OJsE0cOxFpBDktSLTwWoLiqq+mzvKjIU6YUqV8IV6L/b+SSYsfHUENQ5jYjS5rK0Rl+eh8Y0GYjoIYVhzBkx9rKDTNp2WyuiAdAOXhwxRPfJRL0xj38VfEnWHzDaLS+nQKY1sgbgMfGjgaVuzs40jqLqxBHcd9UHqHvn6PhqoX29Hf+sABgw0MOE2Yhuo6PkvdZ069aUS2XhJnLYcOsaGpwbX4RumRBPaeBFQt0qfysL6qEYHJVB5CjOiwSXq76/JNez6n0gxmRgzWaKqxwrLoDGcrcGLCEj/FXsLUfhr9Gqei4gVUDjGsoidDjpi8UgBUz4YFIStbJugorNXEsLbjjkaDxuKoZXZmGVu2EyaHncQcQZCK53keOpTGAbHYjmwf1MXwcDR66HBWLvJTp/pGjRNfsD17dlHWnGQES1xXTrJzUTFcOI3NZGCcWBYm0JayDOqYj/IPCJEocPFxL6q1M+cnDvy10jTzcdZeLY6tkEMgVP4sB13Yt9BGuOJomvph46TTgisMAgmQt/JROgv24EQjEI6+Xj6tJOqPxzMAuQBptRwECV9n3AJ+EG4CI6nnsd4zi+tuR9uxx4bDzRN33zMuN/f1MzPmr/7yrDlwsEcMFd8TCG5sx7lFDCIJ3MgSoEqrKxFKggpSOpgoCJveaJiYTkw40Qw2aIEWgAdYc+2KMU99CS+dYuRBntxBV4ClyuNU6BwurDZDaUOpQnPLdBs6teQtGl/L5GCgt8bL5kllz5y0GK7QFgjLxu3q3DlcKJRlhMZ1J55EPr4Pu9wGYJwCQi173V9Nt1A3zczYk9KtgbPlU34sNUdVPICWOgwnhnqFtGX3Co3y2nTWW/JlpcTSxUyxUixji9n/8+ijPA6jteMICgflmAErPJEL2aihkLAjVyPD6AoFD3rCGvA1jrQwnDwIowv7hPm8/HSfTwOtMzCS7vLTdKVRn3Dec40HdfVhRIFc8FVccwHn9l3hu0sYTR3CLr9x4onAhdPGfkjPp5SbsCbFixsqPv+58zgENmPedNswFivTwVPQxnKIqCIJ3NgSsB3cjVsQod6mzgw0jgaI6DuJ+4j1MPo+jh2qma98GcqBNI42i/dRMthFRycGiXBkZhUl6BVZCmDTiCtO2TteUkiEbdTlA0QZQzg4a5XB5itlcPBQyrzpVpw0QYD8uKR1eNRJPAlC3oWSF4S1QI4pokWso2fwtd4qLRgNMP4sluJqZehrQZiGsEMRw22qM+Vi8eNrFS/5yismjiN/ehwiWcjFpwSn9JmkcA2rL3DcNHsfCIXz6Bj1af044c0MBcFhJ7gA+r4aTIWRxg/7Rs5P83EYlssZJ+LRBTg0UpBFZWDAXMV1HXWTl2ApH3xbahDXCE+HwIgeHx6UbfvSato1YIrHDRUP7Ttm16mex3mJuJ+34bSKgYHIUNlbEv1GElifBER1oifLg7zqR+nZ+GHHo7VZ4QC3KsGlaBwPlOjZF87VzLPPQS1DP3NkgcMRDGbx4HMXHR86lSGVOKbjMG1WxAv5Fbwsy1MhJBk/NmdbBrveBRjKJLOMQbGY7oqjigJxaxSYwLIZWUOicerUsexDQ0l8cRd1YcZOcPIsjygOpsY0IpQh6iVJ+KHPc2ntEElLYHcQ2iKzDrwTQILA+D4ZN3wg+Ff/4B/cdE4pWvnJm282MUzxZb17xex0VEE6xtVJmov4YYI0HvaVVu6NRpwf4DqjpvEGw+XhMqg49Om0rBJ3hkbTLEa9DqvhCC/yc0T0NaxpNRikYRz6ym+ZsEEWcJVwFfEe2RROSV/Cg9Sya/tsb/w2VBpXFrvv8lg/ymG+l2t9TR3p7DrVQdn59TJ2fuEoIzwZjeAdp2hHXlOh7XAg7ylHynxHjgvKXj/b4SXfnuJxuopPnt1wZEMFSicsJcwfJvh5OJjFlN/6j8Wj8r48gRdv8T7b6XtwPwe4LmQNEg0R7zMv30n+IKdC5s7vBby8O4lDfM6fw6YH7FuLuV16tFqSC36oyO1qC5R6UGiGwVkqI6pewhYPu9tGm6lWvyTthVOpGHRNL84IXILewQycskW+VRhalkF2HfrsWC7Uf4VjWRvkoREaKVru0q+soGkC4BQf5ZBxaczOdxrX0YqmES5poFUcpoXDYTrFEfoQLdPEAU7RhHkxTei8NN84aRrx1DWDaZr4nmFsgHsRvU0Exfv6zHUc9vqZq1fNSRj2ozA4KjuPpLMgG3wau3R4bBJ37px5bda89OKkTP2NY6QV7gid5RZRb7YEaJiOHXOfMdjszCL+KyWgmkSUJiIaDzBXAIIUDbBPjo/HcNUNEWG86JSD+qKO8cNRFsNUIn19MRyHZszx4zxlgWfy8XDWqrlwoYIXufFyK0dZxCYTuUjJICMchdBZw8WXXcmDa9Yc9XTDsS4DA0nzd9+/H8sNk+b1M4tYY0NOrCOLAsVsdY+WBWAMn7gDkSdUyEhJhoBujCcFZpqlZTSZyqCehX958MiJryO6psNTfi2P9ZXvcZjkEUeBhDXDuBhWQxPENc0zJoLnaAM8l844nfqSD9LED9MQ0eMb8CLYXcFuQtAG6R6N8CUfuCAdYaH38VzezeqnPDTPwGe5cdWwHjWI7zydwuhoU7UP8pKbfBYbKt54Y87cfGrI8FR1OttgJLjih09unHbYqGO++HKveRHGkT7jN7rjrqUTJ/rNYey+bNdRbhhZd3Qv2s1rt+OxPaNfdewo8yNHqUdEOzbh1wreBHWjIJQhGEi4sGggl3VQAgQ4WmF8ZrqKT15UcWwaXoBdxI5AnP5NmeihsWAjTHt64ubmW3iGHQ5ZRZs8eJBqrnvO9v2q+cNPXJCTx2VXn7APSo1yAMAonQv7IA8sKIlECtOklWcGcpW/90M/fvyMANf4oenVHNUniciBPgqqNSdML1H6SNO40DhlzzCdKn0b83h6aUE+ikTf4yv5EORdgXHyYAjWy8yIc8qfUeHh8Q5GXz7Mo9M8HUg8rZNM30HpLBw7Zr6Cd5N6+a0nTOHpWp5P03FYjdCxEwPm+E0DOIJkCU84F9AB+2WbescZRAw2VQJoX5jew9Njdx50N7Ws282cbR1ruqs+eK2vjKoCqN7oNK6+hW701+eiCjTwgwC4u+zF2JAIcaHlDy6OtOj6B+Jysc3wooNeFXkoLdfClN8ijNh5rItx9OXal+YqtBv9YV78FMa99w+YJz43hSLaAlrmHCHZ8luohlloQDCKIr4bTLkixLFWFivee3roH52+v/dMu+WiAeCmE3wJxMrLEWr+TkQC1bD6DrUhjRGmB4pcUu2PTyc4iutwFMaoj+uSxWsFVyOquGrYGPf5arr6Wk7Fa+X7PKQMaowhO56IvnTihPkKjRXWoVq+Fa2ZduJzcXZkJGcefNshzIGn5My/8+dmpTG3Ek4n+UW0kQT2hgT8LtxZjVbrZ6o4qXUEDwDJWX6QrwCdr+EmxaGBoGHiaPKlF3FaOY5P4mwIjRZ1ANN55XKczuE7WdyYIIxW4dokIw+kBtEDmbvv7jfve9+YGBt+B4/b2WXakuUjoiuHncqEUWLZkKI4LCON5113j5jv/K79f333fT3/n89/rbCMoMCkiMJliewULyvpV1TjPozoATxE5+MpToCPvIJ0VfSSWIcrzQrf0Qrcy5M3x8clOzrC6CTNx/Hz1XTBrNO4aMBX8yBc+Hr14GgsDuNUOH7cPMeNEHh36hBOMuaZfloG5dcVH/nhTfCseQte/J2bK+FI/ys4WimHF/Xan3rqSkEiJpEEdrwEoCW72A11ZBB0bAaYBVwAc1k6sO5vqKdb9DV/OTWMDVjmypWKOXa8ftK4T8j0KRio0bHwc7qPtSLcIBS+pHvhPE6iQB7Qa7ADOAAWn2nHrJCchPNd33UYGzvKss2cBmcSn59/7dV57DrmN4MwXhIZWGVHI0XryReHT987YO65t58bhGbA999gRAAT175LvvCCqeGQVH4bfoBKD45ZiZx9hS4p9kfSvTQvydKG0pSf75NG46uFNY1+M0ce6sJhP6449BWuvp+md1hHYD4Ow3I546ZpChc+uC88Tqs6NmbOY0H1DazvDcFYHcSNXvfHCf2CtQrznvX0pMy9OL+MhuqZr16R9an9BzZltrFVMSJ4JIEdLAHtql0qolodj12g7ZmVlx7krPAA4BGvEuTa1MBgHMajgvUou5YJHdPgevviMFAVnC6BF1oHYSxC6T4ydLOcLoG11BiNEi9ucOBRSDPTJew2zcvmDaHRsgo/e+YeX9CltR0aSpmbbrI65vr1ojl3bkGmBHnY7IFDOTM+lhZDx7KwDtBTn+/vj/2RX5Z2wsnbbzcVzPlOQ4EeBoE1UY3Gg3xY1OAKG6CQwia+OlX4jEt1PdpgDUjTnK9i0fyUVqfjBO7ylDTHM8BjwDnN36dlkl+WAMfRaP4uauuteXj5Bnw8uoYy4+bE8O7UTCJRXrx0abl34lJlLN+T7+nrS/EzHYHzwwFwnQGUSwzV6XvG8aRTwmGP17DjKIfF/B6ZKlgnuwg9kkAkAU8CvlJg1w3iDAAA/WANU0Oigymy+gCvx3GEFMd7VnMz2DI8vnLXU09PTDYyzEzjPabh+rl6fh48j4+fZueIyBaRv+pwLh/O4+OhsS++NI8NFzkYG47WgCNDI4snFIARLGtMAgYtjNXg0CDOGYxjpyJeE+DuLDjBQxAzStz28lMCXOcPvhgUq2CL4zTmN2NgRM7C3TMkVOAB3OO/Fkz4hGjDNAGOl59m0QpX0+kH9A7o07RKU8Po0zvyoJ7KR3n46RJWgyVMgMV7VixUErMz5ezERLHnjfNLA/PzZZw8jjvMOystmPwXMJtcd3jvI57NJWp3vLlv8trVQu7yRKknyQMh0/F4JpOM5XtSsVw2FcN5XOGy1Jl4ITYK0Jg78MFEUtBwdeL4XsoA3uHJZjAb3FYJOslt59PyxOZsNtrtsPPv1CaUEO3fKmePt/Rt6f+NRooo7C8d9hnml8nEZBR15UrVDAzFMV3WOEriCIVGan4BU3LQLklsyCEdHc6oxY5AHonkABYsKskF4dk0vg5x8mQPphOXMSIz5sABfq23TucFrUoTBvX0xcWqTAsOj/AgXMsdyx40io9+9KPmdQtZ36+IDwZqHMbpO0CqItURh2+cmLZiBx0UoOKI7xS38mlIY9GQLjCPTnAV7peB+bmLOELr6Bj182OYTmDOZzzMW7fQa/2YrjSCqzQ+XOukZWaDYDqGxb1nXlsYnpou5dFoqsPDqaXBgXRhdq6UOXdueQhfl0xhe2b9DtomLMTuh9v80QCTMawnJUZHexL4EiV3CAYNzEdeb7jTbebrzS/Cby0Bv3O3xopSKAH0t44dedht5utjxay1w5IH71sYRgQOLKRnNySuL68wNvPTuqvP/KnsZ2aq5uvPF/G5Hh4Gq+quzuHihTLepyqb225Lyy5A0tFg8IVbOltMV2ikBTC//MSy/3Le3vmzC+Ygput4pJJ8ABEVt6QksmW17ZpQxwgFZ3nHxpJ4kItxWvL/xlFxPwCFi/Hd+p08CmKKbzGbNZeQ2RFc8nVjl6NyZO6uBOJr3PcVl77CAxjKTVgzp8aCaT6O8pDaO3pNV9+nUZjvM+xfxGcjWAGTBPuj9ILq4FJGDJPjL704N/7yy/P7SsVaEm9VxzCc1buDD5aVeqrVBXyygzcpVsVIppTNxMo44j4N2pVjczAn42KxUrsysVC+fGmhjCP7Yxg9xcb39SXwKfc4jtdHHugQHY6EXD0ib5skgNscuV0gAauAXUER4X2zStgqEu3swWOnAtZZNz7k8qDZ5aWauYqREWZOTAHn4DEvPa3BNhmsEyDAaTMcnoQvIFTNzTBSI6P1UTzTe3vjOIW8ZhaXqqavnx8txKkV161xYtFYTPm1AY1pgsQ1nSgJ5Hf8RK+ZuLSMzQ4Vs29fxs3GuAkhGivHi54tK34BxGY/rIeLobqG1yv+Z+i4DRknFkpq+du/bRZ/+qfNBJgdA8zfZcF8bd7EtmE/bqH2V5S4B1Ba9ZmkYd/34Rr2HxGIq3D1ld6m2F+FqS9Q3LyAHiMgDYfpGFc6xREfDSl2/txS/1efmT2CRcRe3LjAVPjGSRm6EROmS2vxylI5vrxkcGI87ZCyVcyVZaFxYmqxWK29cX6mfP4cPjKDFcxsLhUbGe2J92PtKt+DkxqBFRmsQI5RIJJAWxKoK9K6UhMY+xMDcOyAPp7T7LZjIrH+OCroFtkF1/KoAqCDcNZdxZw9V5YXcXkyOZla9WBzZgePQc006AwWEEh4MMY35ZYxOonjpJkspvbs1w9SmErL5WOy3RwHXMsnM5iX1sdWwJVfi85Era2wx48MDS2YwRFsdrh6uYBpwiLWl1I0S8KK28jFVKFMhCEKWmHCEMpZxQc6qx8/fDj1jAA2+CNFJO3167XDGJp9G/LTs+KYJuKDz7AaoADmFH4QB63SEEancdIqTKfZJO7gwh/4Aa8QrfBx+Smu8tS40mo+Avf5K72DNeC5vOHZMtAwvf760tBTX5o6WShUU8iM9wCkDS6I4uuSCZxKFMNJwJwGBSI+xYUc8FVKfOlYLJQjxGDZyqmBkUjKyqsBTlYKkE6EnziY4ogTnLTeExscyib49U2+6S3pigw/muLzhBEFbygJsA82m+JjZxJl6klDO5jqZk2SDi8/jkgRFaFNn2VZmK+Z558vyVSdVRDUCcqc+sKWyip92+k1zGz45de5+aJ8zj2Xx4aGXMpk8Q4UDVQ+n8C0XgJfRKjAkFTMPffkMOIy2Jn3/7f3LbCWXeV5e59z7vvembkz43l4PH4NxDGmMaHUxGBAhFQQ1KYxKqaRItTQIhQpaquqKlKbNFZFRSBt0qSKSqVEbdM0KOaRiD4CSY15BNoCpsYGg43Hzng8D8/D87hz3+fR7/vX+tb5zz773Ll35s7MGXuve/f5//W/1tpr77X+vR57bb7eyhDOmvkwHxKIRg6pAo1ZsTYkiMfGjsN03NliGe9fjuJDid3PAUWxaI3GmRR+8D+Bb2EtLC1/4u67J35RyV0KTP1E7IRwAp87Pw0jN+JIvQTgzIcCcR2kCZeMILNKB2Bx1yCLT10GxssO8VhI4otm8YJN0qx4HCStLzg9z5NsyjOZS0utkdGRWnNxsT2KXYtpf2CAk2hh7pJBtiSLODrnuB/pIFvNNhx0x5w0tqzHfBPF4bPiHYr8mQNjPB62TJN0DgsAZh2MDSzhW8lHjpzvHD16vm2fLcaj2LbZidrWLaPoZXHrfwwNFnOiHFWwKoFXaAn4Smx1yRGsJiKuamNxlJPiVmSU7yEMLkg6CfZ4vvNYC+8NYSdwq79QRiNO58Omzfoe0R5jss28sZeyQKeE7y9twcdOt87ipSimj0BZLojA9AB6Ta3s6BEjYjFEjp042ljNh29DYY8+DvPJ+ekBNpjAb2h7ojUAeacIg3zbems8D85pbcHDcNdOzAxUU4gknh3s3/rII53G29+ed8cak+D6kOSg7rorX5mf7xzCS1i7oar5klh0OMfCU3/sjVgqkSdZ0oiXHurFkA89OgQFr0+6+J5O2b68kBYP4+OndDGHOwfZlJ4g9RnMmdxxx/TpO++cPoUyqZ84sTz9+GPn9+EFtekgsp5fJWOCMNN3AAAzyUlEQVS9mQ62KOmg80PF+ACgYkb+JQoYULt9DdUNwRWBvP64+Dn339IKG9yseRtd6qPzc/kRkLlfHHgdvLSbv+au7VydWYWqBF7RJcCKlJpTFwl1DcyIGBAfMJK7SCJcpDgh9+LxdvbE42ibUYFtKA8q1uDRLpwDnVMwFyEiHPVoYijm7Pll9ELqGFbjN55Y46HMIbugEPNDPXIDnaw6lqOfObOKVX9wUDi4/dGpE1jFhzaBuiYLOYYunkomUgNXfH776cZ94/ja7jw+VDiRjdjTetBhmnzIlhOkJgNUcHTqWN/ARu7yHRSN4kOQ3z17NrsT6Cye1pVrOQTmxQ7vZCINwEKSQcxw5xSiSJIjwjSKTop6Vja4rhoO09Jw8hR8WkWa4gZjfkWTjTL9JKN8Q9fyt2vX2Pxff+cNz0Agn5trjT753bldhw8vbMd8UYMLIrrycCLx2o2P1ZpT041VLBG33s+FueYousvpoUCJ9UDo2snj1IOZLpdvAKc72sg6lXiD49uTkuYu6KOjuG1QN0SrYFUCr8QSUC3RuaeKlWoLOKHSSUSwnCruAEhH8OzBVnbwGbTLiNDphMAGLVZhB0nhWqtlPGTOL+C7PNjCbAd2ibF2hD+xhaTdUP9Bwz+dAmu+zFtmQeNLu7fcChEQpqbq2dRtdbzE28I0TtO+jsCpbpPFLyGPYgGYw0Fm+a0n2qet6emR7NyZZrZ9R2qHQh6jHYuoIYQ8rJ9897vzntdqLKkN/PQ0lvBESydOdJ7A9hr3wQaLRc6JJlPxOFxl46GX83o9TiaeRyz6kJaza3o6V+cQeb1lvwxSr1RGtsiOh4nyJwbSlR+STE5p+3RnZuqrb7x329F737Lt2PJip3HkyNL06VMrkzt2ji5NT9ab5843x/AuwRRuivGzZ1fHMRqH9RSpWsTkImAqvJg48KJbCxs0ts/PtRp4bwFJFkIfIfAHkAvKVbQqgVdeCVjd4A/qFwNQYlYZWcFY7/orWhBMv0DWG7jE+umnWvhURdz9nynxsF4GrehhEijSp/PiMN15OCY6gO3RMZnrUWYpGnMNUjgVIjAQ8t61STHMmUcpE6KgzVFx2O88lqsfOoSVefwWFdimTyUEc1cpgUAxRvzZunUEO0YsoHc2YnNcoSRNMUhQF+OS9XoD82ULp5DnT0XVSwY9DopWsEXP49hD7g5kfK+zms600BvhCYqnxl1xz2OXT3RC4UxCuGCRNohOOQXJEJbhG5Jz50Q976QZ5+U0593GPcj3n269dWIOxzw7OKdPr+JF3cWpUydXJzGHNRoqADoycFIqA7x418b7Tk289b1yww1jy3hyqj97cGF6YbHVWFxqcxDQ7hsmdtEAuw1sTIEek3puUQVPSd379qJmKoGqBF5uJWANAX9QY9lzidAeFVXBDMYGOrUcl1gQ3GX88PPt7AVsS2TDXviCruWB9s3DEEbjgG2McpybCz2mbduxXYT5FQhHWWqzr2PDeLFRSlmNdowHk5YEaUD4Fd9FLF/ny7vFgNEfe2n3R+6YwPBfjpV2LbwrtcqVw9CT0zJrMBVyYDZAInXXrvHs6NEFfEUBH1AlAYdlF0mxrWNAQ8em56G/9sbJPwmUS//tc1BojdsXLnS+hHmLn0OZWEMczfNsdZAkXFA0g1FXNMkQKgyikS+noEbdZOM1ko1S/YKMOUZH8zrCfX4sbabPIzoUFrtkCRk8FG5pYY+qlTfft+M4nBU/FY/3Adoj58+tjmHjxM70dAPbSjUbTz+1sOXkyZVxrBKcOXRocQYnGy9tMF7+i7OIAfnC8F3WwVvfy3jHqn7yxPIIaQy8SegMaRMr/dZhN+hVv1UJvCxLINZeqzz88TUi8lJtZgGkWrah0rCpiCV++uIwNlTF4jluTRRMARLBwVpuSaJdOHcO75+guzWroTyuooppq8Fns0AHlJRj9kiJlgwzNf4Ehr1PtbjQsnejktMAn5u/njy5ik7IiO1OwbnpLVuwAhAH2ypuAsuFEC/BYXFbJDOZMm1JWY+PvS9MV9jqwdDegAdhJl/DypDVdusLP3HP5C8Fjcv77XNQNDeF3S7wtdivodH7SWQc2ba8Mr8KxOVESBPP6BISPTb0IktPOqTTEfJgEF0OQrREdzLkMYgXYvE3piseoQ4vJ5rB6MziXWFipPugeI+eE7Dz4yMEbwC8r4De0hi2eQxpj4+Prr7xJ0bPcAiPix4W0WvCC75jcDQN7BbcWEJvamW5XcPW9nW968TVQLwpeNx+YHIJe2WtYIPGEexUUd+9Z3z17tdtWcR8E/jwingI4s3G48KFbOzUqWwCC28sdWWceXP57UXJcWcvwTV1ei0MjPFm3vSgDHrDSqeM5+Uivk6xEs2KNKwlwMa+5zbQPc2LTVzMzTkBq3NnsVnrORx8ybUvAd78yBR7TXPnlrOpmTEsNgiZZF6pkQIrsXmpYMV6UewC4nkznAZ+bcgwnkQwg/oPCyDxkxh0Rj4wDTofHjNwSMW6yAdcthl84Xd6GqsFEc5hi6TjL3JpuyUd5s9wbhj9yc7gvagJbBJIPQtIbhQvYzVXlx/Jzy2/L8+nejMQxTYKSh0Un74RnoCTugMGb8Jh68Bcg6/yJPQ40xetlM6yL+hIjicUm1KaSUF8Eop4mS3RvGwyFhHPk7yXkXP0zlQ6ZfLSlYzFY3mJ52GH3WueDnaNaGJsl+Uru7LBsmCwPNCWK7t8375x7nOvhweTw4+VH24+DPllOe6f1f37k4zsFtPhzepty5aX9zTSea2KfMoMDKwQfLudUAaCcDDlaaxM/cEnGbgmVirbrz2IonQtTSUhSCXhgoMMgZ6ykpAoTF2GlFiIXuovL1YIyhQgGzA9eifD4pNQzISE+jNVpJhmJCppXkeeD8mhjEBIeSDROERKQlQu4VyElBRlPRGiIuMWfN5IkELg9sdFv0TIXtNLp0JrHZwLMxCfBGNeMJafLS5hkcEs9rhL1yPmmPkDGspXZ9HVJ9PG8E0gGKSUqdG5oCV/1asn8fmLJhZJLMR5qO7J8HpxKI+LMTCH3uegupJdbCs2kOVS9fOwefj5ZTQqSA0tDAfw7LtQSBd+wnIxPj6B13IW/uvK6uovvf3dO853rVweVuqgaBKVYAnLzr8I7/k34Vln0UCqPFgmPBiKNKOjDMUvwqAVfskTn5QUj/opTl7BpvR6oNeTM4201NgzoRi8fZKUhuiKG8/pRLSbX+qK7/JAkmwkm1FW8aiWbCU7kWH6ReckpWiLUW/PXxMnmlClYQTcXz6PSSgikhUk+WL2izYsjnLBE1puq4hitYtyfFoMaBrOKLcQqaq0PkulCgOJRU2L86wYPCRDwoImFH4s35C3AiHfECeguNf1uBO9GMqLZAnQCViQ8QjjE3f3BCgUdUy+qNflsrp2G0zJmVL3lGJDZASzrPRjMkzLVHv1g5Xi73pkujqU9meZ4kDSaUdxbznlMCElQt1kLhnjpeFmrPxMu5aT+4wxT+exbJybvM7OcnUeMmQZDdChPSekS54yBkE6Kd0Cxgdz1+4RbPKK5d/YYmFpEc+6kFvBfkPk22WDDB8OuYpv+058dh2tIUd31hOoPzPTyF5zVwM7YKygV4UnXxjm6zLckomJ4Le9uDT/a29+8/Qvg4fo5gU13KUWMcl2FCfzJTDDV6mcFPLFci07JCVeipfoJF60xfOlns+Xx2WzCGmHNAvROSkqKL50Sfd4WVw0DwfhtJUuzoA8UJehLC+B082TZDz9Yjj5Xo+44j04bjze6+IV7XrZMp5ogum8RSiDtZIpMVzvGMpM9NIoaw01kV6WjKwJ7aRieqZuBKgIUlt4lBtksJvvIJHsSYGEi9iQ6FrQspPsAGH9t1ZHRA+J6xhklXxmznJsQnROrHb2B3bIeuB3z5N6CDJvDNkQDCKX+ivTRX1ZFyQ/5sadRVdLciYzyGhXfBAmM4P4PXQOx9MJsPRCkiGHHJ4/e3Yeuz7wcxbcZhwixgrmDcWP3dJ2bVXEkU+eVIAFKh/2Mnshdzs+r3HgwITFeVtwZMbyghdrFWibL9riSwvZ7l3YrqjLksiakI4Pw4cv7r1x9G1wBP9gBC9X0UFhvwE+cB5vLzfvve++Ge65t0HLayZrTN/4l0rjI1NPYfLsz8BUObGNSHikJ13waJN8C2ioLR51RBafUPLerlb9mZxLT/qE3obXTXSnR1qiRyMpXfJ8/lyPhaLSFaQeg+KCvMnMppxTIX2vI1xQNjzkjWQ7Tri8eT5xBY+TJjmP99w8sGlxl0fKkqbz87qyV0yHMgyD6IEbf9mD6i5vRUXu0VISXiUIUK5HtudMvHw5PthylJe9kFy5kUg1Ef5QJ+pZ/mRD2uuwJdEipGrvOfsEgVthuAwoI2bIZ0R4t8J20wo2+cvLJ2tsvBizZjYwg3XiFpdNwiiQIG1tLMgCtWS5zIKS56lbDyIqWlF4BdD7aJ6/fjymsAEFJWyaqLxor+exSm98nIsS4uuIUYbvIkncThyypqZUAYWG8+WXUINjwrZq2VvftgXvSjWyY8eWrfemXHLbM5Zk8fMax44jH/je07bZenfeSEoDIPPHeS2Mov0B1iXcPDubf+Utb5r4Hbyn+y/37J3FjjbNf/rFR6b3vfUdW78xwMRlkwcO8XnLs7PZdzEfxU/C/zRuYHUOVX5eVDRCzeOQ30OPCmW0QbKiD9KJJvuA5cNRvb4jW/5MNjqXteSoV7QrWtHmoHjRvuJJHjeHhpzFK0szyQMRX9DziMtOojONFOnli65WSG2H6IJOfX0oh0D4hBeqo8xT1+PBVk8int3DGJyuNQA+58R9XKoXsWds/kBXwys9JSc7tH0RWxIdBLvqEUsEIso8tRMj4kpcdMEgGYbwRCNUv4lXQnTaZQgUc1ZgpXI0saJs0Cj8KjMFcn/Un5G4SEFJh/KWEJMGzvxQgCHlJiGBvsYvNdcvvYYhz2JPaRRrCzDNhIAyRXxxcTVroUGZmcKck63Jjjw7CWlDlrlxueIcD+sIvwM1jb32bsAQ3k4MzdFZzM+3s0cefgkvAmNvPOxo/vzhRXNGXCTFMmFvh6a4/ZkC6XjtBTuSj67bOdEOHNNBzK3dv317/oRs4Um+/a3/0PnI6Vuzj7/znVv4JfYrGtbloJApLpr41vx8toqxy7+FHKk4WbT+YGbt4ruG3uIFuaIOL5JoLEQ+BlhwdPEFyTfcyyjdSAtGevNIHQZBpR2o3V+l42GXG7A+Xkzf2yzKMM4gGGKFuOxEpmRV7tJXOYkvuofCJZOG9lBGawXPJa6DebjkwM8GcAluGAMvJhFOz6iexdSK8TVykER9aXmcusV4ib2UD8rG0GObNBEEJbgBmNIxY8qYSzQlMshoUac3M8FSoPGah8adcXAUByTFQjTXM2CTmBLqI4hBuCbTC3qcSkqadMP5E0Pkdb2XGBuDl5S3tZIwx4ChNYw2Ya4JkqiVTcwBLcFBYUPn4JxiYYY6B2diPSacEf75TdPR0Q5kG3hRF0OBtgEsN4DunStiOniRH70gvjC7mN1994wNtWGTgGzyZvYf0OPhEB8E+V4TA9Pjir6zWCDx2r+CvLAQ1wh0gpBZgGP6wLZt+R+Vib7hQzmnfHhc8bAuB8Vc0EkBPHbmTGcrCu6tJJGOQGgHCsPTEi/SPS/pUAhBvBALv55GnOkXaRqaI109NtFoxehEYpB+gshbsZEXTzqEohEK93w5JPE89DqiF23KlvFZXryRXHl6vrfny0R00nhORR5t+PQZZ5CecCOW/MhemY0S8cEkDvNhib1VpJA8nyJhVt0TpcAUGRQPsdJfilDd7lKLRDFvQ2dA1ho2e1heJ5rsKVnRLgHaOZsxKKfMlxnSSYhXjOuEe3IuYYOSsNNRIam8TQIcy4NT6zFnmo55eajyg+sQunIwF/IWEPFJY2Bc2b4C2brsk6tjagefO0crGQaYzs8tYi88LMNGRWbTmfKMOBPDd+KyvXtGsr37RmzxhN3+OlnwWf/LFjJQbu/e0ewH35+3HtUYPrtxAkvB90cHReP6nhTMsA3JTsThPe56Trtlgc4QvCaOX5uZyX+lTOZa0NbtoJQ5jEN+GV/gPYkn/PeCpnKXU2A80aRToPXJoBCNBptsWMUfZFP2ab6IKy5IGQbGRRNuEBeEL9npEyBBOM4lleiRLzs+r57u8026Qk+6IgKKLpLs+7hkPK+MRh3SeRuKT1oKOF+zEcs80YEY3RMcTTzZLYhtPEon1a2A0bxSkbliXHQHTYQ/yJk1YOT5Sigb68h5NGPttNlz6RgqW0X6BuN2u5stZMryhYjF+TMo80zEhFxq3XjQlG6gs+23FgqAHDaU3OEg2QGK+yFaDTpm3KHdxEqJXfZFMGozDwqWH0R4P4pHRDKkdRkUJAEHg3DBQL2cX1m+ZBswkE9P41tF+C7TMrYu4iICzrnaNUCGWe04J7XvppHs1ttGbDED2rsUeB3WE1gm23eMYAOAJt5zbAFvZC/CQdl1BA/7ftrDn9lmHMfRYyvZTryca+VbSMfKGJ04pP2rMzPZR9F4aQpnPdm54jJsZDcc4GGfxMKJ30OhLOME4+xfun04RIdiCQf4xBkEQ6wbF11QfOmITlg8JEt6oeh7ZCVHKHtGQ/58Gci5SF6yPl1vw/g6R5638GhA+rInKLqgbBb1JS++h4N43qbkB1VlyuqQvWKcdOkXbUtnw1ATvn1XbZ2WLJM+p2W4z63HXRoie0hHZ3H+iOF0SmmePwDHvdG1a3erCBaJWkzQx4mTJnoxHtTCc0eQkzQ53YZPzimaohDR5NUZMVL8sTz4jHjmhnHlukzReMoPIiwnC4OUxBcsM3qVaSxnfjBwCi+6XpjDS6yToyhOngCdBF6wv30ku++tU9kBfA2Xjss7p41mlfNNIzjOYOPW2W2j2SLmpRbmufw7XE+mqqLj8B6HAG/YCc/pAnc5h/wK8vFxOKZRtOkfGTbnxOz6xtll/+Lojh35C1u3Zv8WF+YYThRTahZ4y9hb1TFOQJrSETQ58qBruHdqnh71k7yPS7dAYxqUZ5AeaX30qC85XjDJE/q8UsYH2ZeOeKJ7O2U45UUXLhsGC3np4SEiXUKFIq44oc7FZJ1txnU/E5fOWjh5mxLsCbMnZ4PNMmP+SJKhDQhR1crEHIzYieInqXjjxnS6Pg1HXi9qNzkK3UKC3qgSJE05Ik14UO3+Brnusx85sWtsOpKERPS2qaJ5h2RiSEfJS030AZwesTUiRbPMNYPR+RMFrEjCKRmfP76jZ8SisSQ5HIg5KHxAcOvWGpwP3ofCYzvXRczO1rI33TeZ3XxLeQ/mIrlXkfWIjWCl3nbMQ714Ap/kwMq8DlZUvIiv3vKhj9sV8XM7TJx5OH4cvStcc77LxIAt0thmPYcs/m3MmY1hnunDw+iYdMLrbB4k3gtxYgtbtmT/Hif8TXDMFh0NDuKqE1LSLSYoehGKL1jkF+M298R0C4xinBebNKMjz8IlJ+jNiOZhwqMNPg35IULxvZ114c5e0UYx7u2Rp8PTiffpKQ0nOEhX+n02nO5locgLK8tFA2V6pkukoSuq+DpssUQkFtvuLoF2ypoEKSiddUKrANSVzXQSyriHwr1xJSwDjPPGDTBREQ006kqnm2yyaKwuP9EHI0pisMQaHJ2RUiT0OBt1i5ekMoi+RnLXgtWTc57Prl38wi36Thg0uwVO6e4fHzdHQd4lBBVXUqWdBl/4xWKKUyfQU8McFB9NTgC3egI+F0lgQ3GLv3hsCVvXNbDC0Jrnr2Pxwz1wTLejx/SZZHSIkctyUDwvel+c7Kcxn/BJNNS8DH2F6s5fPEEzEZ2LpzkVs0ee+IbjYnia2Yk0wwvypJnTJIIgWxYZ4NwkMwhy+GTQbae8CRbTLNJTnHlx50a6D5LzdOHFvIie9JFf0YqQMqTpkE7RpuibBlmp1gpi9zz4J6LTXEdOmZbZof5aNmhLfJfEetHkmKQgW+kkEgESyrinUVF04uIFepcTMDZaxOj/unMewJlecopBt8csSSkEWykaEJ9wgdUfpbAUBCVVjJPec+2l7AU9LkPDBXtyiLpr30raccMo9swcw3Dexl+KXc/pjcD5bMMnL06dXLYtjbZib71TGMZj+nROYZFEyNqFCzUM/zU/e/DgsSk4pjdv3ZqzM3HdhMt2UDpTLJ74ztJS9q9QPt/DjTeCgyXEQ45BF1NppoaYXdMY7Eu40BVFOrKlOMWNhotisjE90QUlLyi6YHHln9kkE4E1Vnqi98CYzyTjzlk02pFOEe+JU5fOicQYhEtf0PNJU8siviDliFtwzkkkwSQDgrdFvudJflOhDfMVUkFZWDDAH+WKVMkOoptm+DE7kCM0NV1R2TOiV4j2i3QnMghVGrypQ35pRAkRCqcFj1OuLMEyGp4wYJ9OSFqSsvTNLCiUIaPHOTFd8gjLwkBGmXApTWclS4BGEt2USKSAiMR5vEwCh9juuWc6uw1zTnxwuBKBZvkhwpHRGpzUSja9ZSTj7uWnTocNfzrY4QEbvT782GPn3vDMM2cPHju+9F/e8IYbF65EXq60TTmCTUlnz558Ho7qP6NyPISLw9UgWkBB+/5WTM6JjNgwF29TyXu60Vj/qOeC4oJimTwiPfSo30NzMkWdolzPbae8r5En5qVok7QUvK7HIVBMWzqeLtviEXpaeu8pCki3R6bAi9EEpJMIm4m4B5TYsOIElCJLWzklZFxXQDKDMgO51GnxMtKTHc+7BNycEvXMLhMdZIQMJlomoMwEqJ5QcEZ0TNDCDxu9kF7BjtSt1xSLiMmkpCRQzNsgelGuPC7zPin5RVg2dvqJwnZNIl5u9bqjXl4hbvB0eQ9MYMn41DT2H8LQ3k58S2p1pdZ57uDC5594bO7+s+eWjxw7vvj1r33tDLxkhs+gdg5vMImhEQ8zZ5ucHXQlv84Xe/HS2t9BA34PGiAuY+QtqdsyQTXw5MXGWXIeMocWdzKk2cQgbDB4eeIKwvv4SjvapLx32NIjvairvJLHxkOygkYnyx1lNPHNSQ+wI5tFKHuCyZYIHjrbJMtWj4iPOJky2YLo5UeRv17HwyqvlH31F21AkjLTJyaCtyvaAFtrkcMlhzGzIaOC0ow9GUTt/AwGJ4NGhp/CPoN6wlc7LyB+ATLnIHkO+BxeaD6Xt7ML7ay5kucNDp7zHZUmZBqcfMfE92itnaPtaY+BNo2NcPBdsWwacjPgTrJhQt6msKx8C+gzgNuwcist5YKtGEJ+FOvSRelCnqrUPM4yoJ4VBcUtfyFudDGKyqJ3k9goRouXb2WjqfbLF/NwxfPFHhQXPjx7cP750yeXPtxsjXzy2/9v7mlspXCiVq+NdlqdZt7J72pn7Qto5F/qz/L1QbkiDoqnjhacm378/sJC52FMzP0inNRO3KzsVeliCpo4f9YIlPXyFDUanQwqoOcJF5RZixdkvXOhHG8s76Q8Tj5tpPTk4MiIwfjABUUvg5afEoboskHoq7ZUPF865HmcDUdPXMoOyo5IPn4xXelcPtQZqmr7lD0+ICUT4Q/0cY1jTyPEe1SizEVLpUepG+HFD8a5Nxr3FgwPSctwNyhrOplTcDovYP7nB7g/nsI3ur4N3iGsnjr9W7+VnX/wQbidIQjf+15nFAucpnfsyCbw3bDJsbFsG2rnqzGesT+v127EuezDuewD3I3s4g0fc3jjo3iFh+fMd9hwflYUBt05sYjtjgViuHiK6BqLfulQFi/VwublpDcHl5uvZI23G64Ntx1imf8Q8T8G/ARW3z336x879JuNRv0fnT7bOphjbyP8H+jU89uBd2qdvI7nl7fgxeFn5pojm/b5i5Sxq4RcMQel/GNFyxHgv3zyZOf1qKQ/jwKeFM838KDzoq51yJkkGepHPZkkj4GORTjjhkNWDkfzPZIhTLwo73nEFQdqwcc9Lj6h6B4SV9zOaY3zkC2v4/FiGuKx4nlejHbTFSFCyuv8C6yrFE0l4tJbR/OR1IhIHhDXOgRBmZWM4uuAnBjl57w5FLmy0llAKX4bDcBX0Gg8ijmHp156KTv86lfn11UjcNdd9gBZfLK+6AT6Qw916u99bzZ57ly2s9bK9rbr2V4M2d2EveduRzfvdjjtGzFecit6a9u576J9NwhlbE6MZc9QvCaByt/i1SnGu5Kbgw3OyebY37AV3rdcCo6HmiXgX8ADwkPYYu4vsB/e833Gap1vtlrNs1kr//F2vf0kyvUANrJ4Pcu32Wnxm95wUPkX9u5dveJ75vXlbZMIV9xBKZ833JB/G0+Wj+HGfgcK/n4UPD/b6If+eLMUD6qTxiAYYuFXtDI96XieaB4GS+FX9sRXXFBOUjpFB1nUU1ww2QHB4+QzkDaIXuRLtqwSi0edYvA8pUUoO55W1L0icdwLISgHSkU5UbwAe9heV2dD+R6hkrizyYvJFxjZmOJdElbqZ9utztdajfyhhTPZYzffnJ3HF0eH6k17l/2rgj7wgO00MIfEeDy3VqKo73zoGcdXnbeiFzCDd0t3N/PsTvQAXoWivgPHbbj2u3BMAOdQ5RgbZwZeAz648d4g/nIKvMfYCw3vLGW8z/ig8BWc/2fQm/3q3r2fOjM+/sBF77NOp/XNdqt2AjMod2MI9xnc7O+CnR9DuQPUxqcmZ29fWDhz7Bd+4TZ+0fu6DMXqe1VOgjcu5qfeiXJ8Dy5KA9C2G0LizI8/eIMzTkjnYHHcsBY3UqQRj4d0GGdg3FYHMhJ12RYlGyB7XYp5G+IZhJ5BVh5no8yW1yvl01a0Q1mGUrnA6paDiysN6TKuptoWR8T8kl9Mw9PEkz3FKbOZQXlLNnnt4Qwuml6fAAmwRs006U7rDH3CgVz81RAdekVnwHsEN8efYs/or87szJ7GxZW1oloVv4IlgLahgUZ6FknsgiPjMONu3CO70aBzuPEmHuTh2D0+nk2Bbw4M9D54BbNZapp5YS9bBx3RAtbOIW9PQeFp0B8DfBLwaax4fgabHfT1un/jNw5vz9rNf4Gb+FUwt4qeaRuNF7aJAKznLWyX1EIr0W5ktSZaj+byaoZeUqdZb9TOdtq1WzEnid192p3xifwbcFqTI3ltYXyyjqFBVLJ6rV3Pa2g98W3c0OZin1pIkYa+Aj7Xhv/6qU4++rn77589W3qSV5l41XpQ/rxQ+flM9Ke4Gf+MPSrgD+BQXtS8EOrwPZfEd40vRC2Ix4jHAxc03jx0CrhpvFP08qV6MuDsSo6QjZmPC6eaxxm3MCDvtOOdVJTuA7Tp7RJXHoyH8yvyZcTLkSY505PQFYJKK5nHyHkfLTEjYgL8Yc5jSCchhHRvydPB0nJ2pLeMsvkB7r3Pttv5Z7EbCipvjQsWqjAEJYC2AQu1s5Px+N7FssSHXciw3zV++nQ2BacwDmc2gWs8iTpGR7YLPZU9qPfbcWwBnQcXlGxBfBr4OGUhxzuGW4JrVxygFtiTWYAMh9y4mGUe8CzgacAzOI4BPwJ4CPAEIHcCX8R9tYBz2fB9VV+pTzfrrZ+Gnf24n1dgs4UJJTgmeJh2p9mpY6FMG1/xIMxrTfRMATtN7P03DmdzpFarr9ZAh/5u8Ft1LKbBThOvR8PXhA/CLc8Pt2MBBZwcmkE4PwwQwvnB9cE9wWreOjnSWPkLnPMr10GF6472hE8GmX0MEY6q8y5cDPaopkEb1KnX3JFMELJZ0uHjwgkZrPniVbHI2gsrZM9kTduy22sj0gnKnIpskN9jhwQFnK94gmQJJ/S45wnv46McUbRW4ZQvyXpI3AfaKTTrnr35OK6FTbIPtIwcpX4McpYyJ7rOnAYSM1jjZwc4jIJ5IvaOvtpqtf5kdbX+0J49tet2PD6cWfXrSwA3OtsKDmHxGIpG1edvo3hrtDUKl7SLyzR5S6PXxLsdmD1xolbDpWBiCRWHxHiwEEiOYkD5T19kTQEbg047Rw/Ktl/C125qUO/ASVE/tLZoKXJ4QoR6rdkO3+4w5rX9Ua/l2uYCqeMN588DfH5pqXM7nkD+Hq7OqxC3ZoelDVwHUGuAFRc0epQTbjDqexpxBukKimbMyPe0ooOUnm8eRfOwxx7yY46DzhK4ty85D71t0YNWyL+nGR02cZ/12fZ2vL5w2vG47G42tHy0mujCDrKMXKSMCIFwLKugJTpivD1yOCN+wgNGD+Ep8Y/ydv7JF17InoyLAQalVNGrEhiqEsBwNzYvqm1D7ZhHLa5hyyROaNAL81Nq5pjgeTgwh6hVCY7QgYT+ILl8WEbd5wCRDRuYCJgdjPtxP1lUjKCFJsK+BQI9JMHeFj0926ZWvVXsRV6zMhoaB6USGB/PnwX+z1F843Nz2c+jxH8KceaT5eeDa6KM7OPCCYVbn5ZxXATRE88bjjriGYw6FCuL98gWbClKGR2Wl6JN2Y4KRZtJt8BnlDxr71FenG8zPMqJ76FjmazvaXnepuMc0mPPqSzoJAziDAi7ZxY1SEfVxHJnrKjDTdHpfB97u3wOxE9s3177yyhVgaoErssSqNcb4+3WKieD4CpiDYCjYp2GU8LKcfac4I9wdpijwBgdftmrAsDXniAGOnXBM23EQ+VGDEgNI6LsPLFrBRk6NTwqxvaCRmEGTW96Xw6UaxqGzkGpNFC87LL/Lg8M/70ajdr74etfhzjHV1X2HhIvHihvo/nNXCGW9IkzSI/X0ts0pn7Y4xEe5YpxsmWrCJ1qDyobgmXOwtMkp7T6IG/QkjLqSRQR5c/TvW1Pv2wceQq7LJdYsprEysEQc2CAP6DbsyJR4HgyfAJPlf8Rn9b+TOnSW9qoQlUC12kJtJYXttTw9UM8w8EXxTqKCsLxBrghjvvZsB3dDDs+Vj3MSZnTgsdCrwsTrvRYcGhs/TB5BVug1tmLIgXG4afYRnAjdE7PwmwbFN/MDEcBDq2D8sWD4b8fIv4rpHGuCgX7HpTofkQ5ocpmLDZrwHpDke4bbl0NyQh6C6RJx3Ay7bIHqUQL0Q3lJaoYUNqEbKp9nAKkMb9FOnkKdvMq4qDslemKJ+jUNgflsNvAHpPOVqkDksQaM8Ie0nKnBfXvoxL9HuaS/hBbaZ3YnFxVVqoSGM4SaNca5kNQ5c25WJWApzFnhBaAfsWG70JtRlPEKhMihBy1w0wT/RMC9ECEIUDUQ8xDYfiQDDoys4+qBu8UKJSFPpZgLF2Vz7mv5wpcFw7Kn4jmqtDfHTt7NrsXvaoPgL8HBxdc2AVxECgKvbfnYzT+IHj5QAm0xHPOyPjFeFSiHQYPPZ541Gd+oh2lryZacqILkq4gu4oTkuZtiCYoHQ+FF2UYv6yAOmLzQYTF0JNR8C3TINZRUziFBIf2rWaz9e+azfrDO3fWjhT1q3hVAi/nEsBoHlbZcT6DlQMYvYsFYJyTQjUhlZ0i/LIvBKdCvxU+pmuDdpBH3bMDPg2ynKPiagvMzlISPKzXsydejhuya4aprhxL0CGD1z7YXRuScN05KJUbrgGXcH6JBwq5geXqb4Ozeh8uzO0oZYyj2vJJXmsFqODihMacNM9LMkB4cdhbsUcPQoSik/N2gkS/vWSH+jgYtzRdPpQHSy/yRRME2YLi3q54hOIz37SX0vNCXi7SqcdjkHwUuwiANrs7ZU6JmshTCnRG8UXFZVSxb7da7d9vNPJPzW7JTyehCqlK4BVYAqgnC2Esj47FxujgaEJvJzRfqZ6bA6KnwuQTPRIWUsDBYIgPq/S4IA81zvpQVr/hy+CjSABkjwkOjgmAwppvpuEUwa81R0bqeHtrOMJ166B88aG4OdT3cDwyrAT8kcXF7F1wWHyzeisO8n1Qc2kXDwxC7yQom2TUA+NVJQPBQ+JlcdENSjf2nsyI+yk6B9mTiOKCpJvdCOkY5ICLOoqXwaK9MplSGh0RKo45pIFOKWpyDokvLfL9EIwg4Nth7U+32/UvYw4Jm6NWoSqBqgRSCaw051qjOd5lMs8BH0KngrrO+SZ2guis0Fah7nHSyNaK05GZC4MMt5eCgDmvMI9FJwe+NQ9Mhc0cJPgwab0peis0bBRgWnkbn4Gv9b1ATM1rEV4WDqpYcFgJ+DRoPH776NHO5ORkdi/wn0NDegBXYSLKyynwgisQ93HRCUX30MsTl80+PWvL2RUPweuRojhhMYhWhEU5xSXHOHEd4l8WpDOyT0rTSsnZmjPCWcIRY6igcxQV7X9B53fxwPDYrl35hctKvFKuSuBlXgKYI+LLuSdRtfCSMV6fxflaX4gwdH1YAnBA6ADBq9hiCVvFRy8WFkZgjBCLIuBrotPBpC79GuJ0VlxmXuN7UxgNRCpIAL4OYy5QYFPRzlbOzR0fmnr6snRQvIIKN96Ys7uaeleHD3cmpqay+zHEdB/od+Oq8G3y4qSgPVSA7xt7mRQs45U5A94V5pgAseFwn82iHR/3uNwBodlTRpB/5tfzlQ/pi0cV0YpQ5nohNOPcUC+dMVio12PvaBlvuWfZN3Hn/zmQT6N39ES/QkWpSqAqgbVKAE91i9gX41Atr+/FoB3rFKsZfQdAGLZDXUdoocJjaMLYnIfC0B5dEGSio6E01qWj8UH7ADvmsOin6Lioae0GTcWAZ0psQpGtvP/9dw/Ny+wvewelwhfcvz9fBP6H8ch++MPO2E03ZXuxHco74Tz+Buh7cU0xhYiNP4IzsXskXHXeJOkAmoKnE2fogXJM0U6Q6JWRvHRlsywuWrjJgnOS0/J68f7uzQuUKUMedSQDtBuKq+/MY8cc4gW/FVh4Enf6H+Oh7HPYb+yZXbtqQ/PU1T2LCqtK4Poqgc7E8jx2J/ohfM+97PbYoyfqK9sPztuiuuLlXbz+xIlcOBobxgMVVZM4XhhFC0NHE+o1WzD4J3qtDvY9thef6LZABAWdJjDRBuCXD7m2BVL7OFMZlhCbnGHJzvDkY26u81rcFD+J46+ih3wbnjb2IncNXEX2tngvMLCBZxmqHItxtuukccjL2ngnLx2vL9xDqvs4cQaj8SnIIvbYlPLRI2PS3TyaXoFmUa4JYm+JFYEHv0GDYYWTSONxDOt9cWSk9T+2bRt53J7BooEKVCVQlcCmlkD+6x977h/WG2O/2W6tYONXm30KG8ZmeRPvM2FfPnSf6sAx9462iav+Wug+rRKia7SK/ffoi1qNWs4991Yx8Ic9+TLKt7CgAnvvQQ9bocMJtvC9Mqx+5sI9OLFavozvS33yZ37mhi9v6hldhrFXXA9qvWU1M5N/F7I8Ujh9urMFjmYv5rQOYML/jWjE34LG+xYImBOKgnIAuOYh0DkJL0DJCpItXDrFeDJRcE6iez3RBMmzvOLGt2ctMrCbNz8ueRT36P9FT/KLzWbtm8vL5w/t37+1+L0gilehKoGqBK5cCXDk7vFWc4WvzcCv0EGFKs05JDQqYbjOOkEY5eGkEuuy9bbQdoCOrc5BxuJyHOgphdE8DN5Zh4tyYJPM7hneNEQ3Ci4LVDyMrmKBxLNX7tQ2brlyUBsos7g9Ple4PIXjfxZVv/WtzsiBA9ldeKrBN1myOwEPQGYnLr7toAycG+FykQbLXb0w3BfmLAh5o8ix8a7koaA4ZYSz08+BZ95tNfZ6kCaH/fitGS7D57Abd14+D/pROMonAP/3zEz2DRgZqq68TrKCVQlUJZA9hzrLz3PcibE3fro9OCbUcj0Jo75b4HwSULQatmrcHI25NLYR5oyiIKSF0TFRmQ0QMC624FceOMx39md/dsdh8oYlKM/Dkp9XTD7gjSaw1+AUvnnDTwRMwaGM4SYZgxPhh9u4FxZvNi4spTOj8+JSeYNwRFggl60CLkF+GTbm8QXOhV27svNQ4hxbFaoSqErgui2BTv7xj/7lJ0fGxt/XWl1ahlfCFhBhKA7dIW71hm4PhulsmA9blnOYD5/YII8HHlebHObDWAmH9fhNqRYW6fGzHGF4j5/YoK5tLYEvSpg+h/jaD73nPTf992EqtqoHdY2uRnQkdCanrlEWqmSrEqhKYChLgH2mg59bXVn6KTierVj7i96NjdVZh4mDLHBSHDmJiyRCPwNCiPO5Fqso0F8KvSvbHRaL/OIKQCzgw7gfR/+oix1c0CcDBt3W6Ejt/wxbcajHOGz5qvJTlUBVAlUJvGJLYH7p+YcwYP8o/AeH8S3Ay8D7wNFwyI84nQ4P7B4BHP2sMKxna8vpw+iEgu+iP7N/GqJjC54OIOiM1lv5w48++tTQfU+rclDh2le/VQlUJVCVwNCUwIMPvp3Ddf+63W6fgw+KzgfZg0NhT4k9IE5dW4eJZM5c033hF/0odqNs/TBkuesEdjSHQzO94LLYe4IVuC84tqz2EpYAfoVpgjxUoXJQQ3U5qsxUJVCVQFUCoQT+yYdv+XM4kD+wvg97QnQx9ClEENgTAs44/+GcYn8pdKbYwQLD9ouAhwOf+/Axzh5UdFbofo3C6f23Bx648XnaHLZQOahhuyJVfqoSqEqgKoFYAth56J+hF/QIejyj8E5or9njQbDeDyB7UpyeQs8qDu3xxVwM3dEZQdb4lDE5o+EnxLN8FJ/R/U473/MFszmEP5WDGsKLUmWpKoGqBKoSYAl8+MM/OldvND6AQbyvw/GMwdHAu5iDoZOC/yEBixzQJeJOfKDxvagwnscuFQ4MFdpMU5zAgpzxuS79ubze/u0HHsBKviEN7B9WoSqBqgSqEqhKYIhK4GMfOzlTa82/FjNIr8PCux+D03kVehNvQhYnYl/JHBRH9sxP8QcHARySuTHo0DFh3I/fmMJyCLyegmXnXKZOh3SquZo9gj7ZCbzM+8xqu/Ms3nl57u//4/1D9XI+zqcKVQlUJVCVQFUC16oEPvKRp/aN1BsfzGv1vwvXciPyQQdC58IdYW2bI3SN8C4T4nk2CVczDScTJpLYG3IdKrwbFdakR8dlTqpmG06gV0VnlmNPvs5zsHusk2PtXht7SaDzBceFnhfencLLUOhZYWF7ewnvZz6a1RoPHz9+w8EHH7RV6Ve9iCoHddWLvEqwKoGqBKoSyLKPfvTQLF6o/WqjPnZXs7WMFXQcwOPwG4bc4JjoJ/AeFHpAXAxutPBSLjcvzzpTmHmagQPiH/dA4vBeckLEaQtODdNXdEzYxqiTv4AX+0/gM1AreBeK44F8cZd7+SENrBe0OHtgOb89yoV+XHVRx0u9K/V649986EM7f3C1r1v1ou7VLvEqvaoEqhKoSgAlsLx889z46HP/qZU3f7VWq0+3W030nHJ+YsNmk7D7A6ToeUgwR8QBO/tsO1zOHDwMtjGzpRFjcCJjWBgxgt4QX71twlUtQ32u1aqdhfISPrsL221uNEvfAxDmnZCQdVK4kt2cHV624ptXpCNJbI6O5Nv595ebZ7BX59UPlrmrn2yVYlUCVQlUJVCVgErg4w8+t6czkb8J/ZZ3oFfzNoy4vQYOAt6jhj012/i8Db4aznXi7EmFng63fwjbFMWeUOhxcVgQshqygwx8DHpecFAcwsPwIVyQDRtyuI/DeuwqwanBLBb9tTtn4KC+X+/kjzbGR57+4Ad3vEDWtQqVg7pWJV+lW5VAVQJVCaxRAu9970P1e+65Y7xe3479ORtbVleXfrSe125BH2gfnNdu7M+3A75mKzzLOOjYhLrToEfDogd8jiNbRS9oCY7qPBzZPHpIZ+CbzmL47iSGDY9hv76j6LW90Gg0Ts7Oz648ef5Lq8P4ou7/Bzcxokt/AnXjAAAAAElFTkSuQmCC';exports.noCourse = noCourse;

var gradeTree = [
{
  "parent": 0,
  "name": "高中",
  "id": 1,
  "sort": 1,
  "child": [
  {
    "parent": 1,
    "name": "高一",
    "id": 4,
    "sort": 1 },

  {
    "parent": 1,
    "name": "高二",
    "id": 5,
    "sort": 2 },

  {
    "parent": 1,
    "name": "高三",
    "id": 6,
    "sort": 3 }] },



{
  "parent": 0,
  "name": "初中",
  "id": 2,
  "sort": 2,
  "child": [
  {
    "parent": 2,
    "name": "初一",
    "id": 7,
    "sort": 1 },

  {
    "parent": 2,
    "name": "初二",
    "id": 8,
    "sort": 2 },

  {
    "parent": 2,
    "name": "初三",
    "id": 9,
    "sort": 3 }] },



{
  "parent": 0,
  "name": "小学",
  "id": 3,
  "sort": 3,
  "child": [
  {
    "parent": 3,
    "name": "一年级",
    "id": 10,
    "sort": 1 },

  {
    "parent": 3,
    "name": "二年级",
    "id": 11,
    "sort": 2 },

  {
    "parent": 3,
    "name": "三年级",
    "id": 12,
    "sort": 3 },

  {
    "parent": 3,
    "name": "四年级",
    "id": 13,
    "sort": 4 },

  {
    "parent": 3,
    "name": "五年级",
    "id": 14,
    "sort": 5 },

  {
    "parent": 3,
    "name": "六年级",
    "id": 15,
    "sort": 6 }] }];exports.gradeTree = gradeTree;

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-26420200313001","_inBundle":false,"_integrity":"sha512-7dPuazTiDmUyRcw+WW+UlWGKH0eeCUB+p0P4pJVKEHjpdXnXgvDQCSdJk764NH99TfsUycnuxecP5oHckVa88g==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-26420200313001.tgz","_shasum":"a006e329e033cd412accfa635f8933dbb822a9c3","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"b1fdbafab5dd4673cff64188a5203d0c947e4f50","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-26420200313001"};

/***/ }),

/***/ 66:
/*!******************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/static/icon/9.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAytJREFUaAXtWktoE1EUPTP1g6VVU6TWLKSk3dQK1hpcKAiCLtxoFFwLKrjrruKySyG7uhKrO7c2oAtBFN0JrVapn0WNn4X1g1W0lZoqHe/JZMqYDnTmTqLzJBeSmbx5n3PuvW/eezfXQoBcHHdWP3uEnDzKOQ6yck3LpyWg6t8ompNBpi0L43ItbOtD4UzW+lk9sFVdMHDZOYpF5KW8q/pZQn4XYWNw+JQ16sezRGTIcewvIzjvAIP+Ckm9F+D51GmcG7KsRWJc5QE1iQQxU+GCmXKWX2WLVNzpGguMExvH6GYWJ/bTCTwXAkmdEyvptti7Ez125e1kKgmS7CIHW274mjVdcnZlnTCaCDnQIlzsTJc0ifyrFbuWymshkf9ClhZELZv164BsN3CwD2heG76X2Xng5gQwNgWUlu2cwvfj1YxFpLMdOLEfaGv1ugt/bRUFHN8D7MoAI7eA76XwbYNqql3Llj3B4d06En4gmQ7Xov4yzb2ayBqx5SaFJYJAtm9wS9NtQGZzUI2Vy9RE5HzAjVtNxOvniFj45AGASooqaiJRBwpT3xY0/DQpUCmahIGkqyMrtNrMiSKio++2ahCJo716tG1YpB5ajdNnwyJxtFePtg2L1EOrcfpsWCSO9urRtmGRWmpVs9utHl+x86/uAphfAD7PAovewWJ5lcASBp4ZSp96F/g4UmEsItTk2xngym3g07dI49a8cmwiL0SbJNG9RYKwcv7WyMv38a0Si4j/uLuvF9jRqaEBPH7tEil7Jv1NIWoiPM1xTnSk3FGv3pM41cPKHy4RgBD8jMwvRmU2NkufMmmizjUOpyZS+gW8+gBs3+oGDB4UgR8y6TWSkqBtf8ZVyuQbYEERsFMToUVG7wMEQZfSupWf+MevwPUx3bFdTYQAOMkv3AD29gCH+sW8TX5Y4e/pTncmgbtPAIZSNWINXHLEQ42PyM9xizKt0UDC2kzblYyChOGKBoccaJFCtGaJrF2wmdsh0OTlaawUycEuJ6hIboexNAQ7OdC1UM4ckNwO08jIZiDvJdeUiZAAE1T4wBQyxErMHl75/acYn+bkp2Ni4tlvvQnFYuad8XEAAAAASUVORK5CYII="

/***/ }),

/***/ 67:
/*!*******************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/static/icon/10.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 68:
/*!*******************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/static/icon/11.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAB09JREFUaAXVWmlMVFcU/t4IKDDsi+yIrCKL6CgqFLdWkdYGrLWapv6oUfu7rUnbX/7pFvurP9rYxbRpqyZGS1CrtmpBExW0LoAFVECURdllEdnm9ZwLjw7DDLw3QDucZHgz99537vnucs53LleCBbl+4IDjrdb72ZDlbEA2QEYQNdNbaPpfFHVBQj0gXYck5S7yjso17NnTb96xZF7w/afv58hG7CcAkeZ19vFbqpR02Lvzwy9+NbVnBIgs79Md/KTrMxnyXtMG9vpdgrT/7Y/0H0jSPiPbOEsxNMzJ8PlMATFsc9qtS/0ueRcu/8G/xYwMLSf5uAJqJj0lnbSZl5kkNnbzvTL73RMTDatUucg3eoFOeCe73dgTgeB6OZIx6IZcrJoX7LgNhQmdiBN2bKM602QDzYgIdura22srwuBAtk1pxJ7l4ABv/yD4h4QjYWkG9B5e1IWM6rJiVP19C80Nj9DV0T7VQ6JnIFMic1xcEZ20FNGJBnj5BZjplBCxIFl8+nufo+7BPZTduIz66ntm7Wz/OSVA2EjD6iy4e/kISzrbW9BY9xDtzU/Q+/wZdDodXN294BsQDL+gcMyLTRSfytIbKPrzFJ51PrUdwfCbkwQiEYBMJK9cJ9Q9eVSNkqIC1N4vx+DggEXj3Dx9EJO8FAuWpCEyYTF8g0KRn/sLmh/XWmyvtlD67uP3ZLWNzdstW/sKEpevhtE4iOv5p1FyNV808fDxg3/wPHj6+MNpjjNkoxHdtC/Y2Ma6GvT39YLbpG/cgoCwSDzr6sCZI9+irbHBvAvVv20GEpO8DC+8vBWDAwPIzzuEB+XFCJkfh4TUDASERmCWg6NFI3ijV965gTtFF2nZ9WBtzg6ExyxEW9NjnPr5K/T2PLP43kSFs15dt3LfRI3M6/Ue3li3eQccHB1x+cwx1FSUIC3rdaSu2yT2iU43wkXNX4XT7DkCaET8InS2taD4ygUagFj4zA0W4Guryse8o6aAAqJ2SaRRn+3sggcEoJpmInPbbsSQx9IiendPrKXBiEpYgkunjoqZjUtJhafvXC1qRtpqBuLs6obIhYvFZi4tLMCqTdsxl5aSLcLeLG3ja3B188D90r/EjEQnGWxRBc1A2GiejYaaSgEgLDrepo6VlyRK91ZsyEHDw0pyGkaERS8U+pV6tU9NQHgdx5PbZGEvxC5Uq3TQvnhUSVmDibh5eiMoPApdT9uEp8ve+S5S0l+iFF29eapbcrTe+OY7CAwfSuUj4pLA61yrNNZWoyDv8JggOD8+hZaYu1DHehdnbBBOQK1+1UCSKF7MppigCMcH7SKT670pXGzxcMxRdLAHNHfZ4bEJSvWET9VA3L39JlQ2XgOOD4XnTqC2qkI0u1d8TSyl8d5xcHQar3pUnWqKwtFZrQz096O7sx1PW5vQ+qQerRSxmyiim7LePiKP1eW3kZi62rpaWT3pUA3Eem9DNWxkxc2rgoZ0EIDuzg6KDf3jvlZXdXd8INLIadW4erhSNRCJfL41Ya509vA3aG9ptNbEYnlHWzMG+vuIIVheQjJxOLVi3TozDTzK1oTpuFYQrKuPuBYvMWvS8LDKWtWYctVA2MuYdmr6/XlP9xjFagqMvAeG9wHHJc4gjYNDs8Cci4moWlG9tJidnj50gLK8JDzv7kY9ZXmZ23dhjose/pQs2SIS74HhfcAgii6cJMqyRbDhC8d/EnRfrV7VQFgh59v8UaS08CIMa7IEVWEO1tPdqVRZfbp7+6KjtVnUu+jdxUDwHish3sYHn36BoYL+cM6iRVQvLUtKSymn4LjA+XpcyvKRJkzVOXf3oNjD35kUBkfECOofSImUIqGRcZQGS5QKHBeDIOg8pcPl5P20iqYZMVfO6WwBJVWcm3C6W112W2x6Hk2O0pnbd8ORgDg6OQneVH7zCjgQsrgSDYk3pOPK2VzU3C0VmeSK9dmChz0mAqlVbM4QTTviUWcjPCi1PXfsxxEexWQwkMigA4HiFFfJy5k9L8nIFIyXwTM9WZPzFu21MOT98CU621tN1av6PiVAlJ6YG9H/LUTCpZRZevLeYOG9wScv6VlbKUMMwu9HD4IPMGyRSS0t8w5rKkpHFXFKzAcQHGO6nv47ygzA2VWPRWkvUmRfJVKC3375Gi1EZ2yVKQViaoRvQAjWv7GTDB7yZhdPHBFxyJtGPiQiFoHzokTMYIfBH61eyrQv/j5tQOYvTBEguBMGs2HbLmF4X28PEckGXKODOT606Onu4iaTlmkD0lT/cJRxRedPkqsuF8vIlBWMajSJH5OKI+P1y4fWRedPEAMxopCeJYX54uxqOkCwHTwjPLdTeiLPivkEnqP1UMQeKpnGv1068pa2u4pptEyTasJAS4tuFMx4ka7TjEi5Mx+HlKvjux00K9rJjd2gp39PEwYdX1Dhux12Y5dGQ9h2xiDcr7g5QHc7NOr435vzfRTlcs1IHBEXVGYQGOVSjTKaY85bZvw1JwUZP2fixbN/ANYpzwYhvcN9AAAAAElFTkSuQmCC"

/***/ }),

/***/ 69:
/*!*******************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/static/icon/12.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAABM9JREFUaAXtWm9MU1cU/73XAqVUQAgKtF3IOty/aHCyEiWLWTJ0GbqxjW2Jfh4msO2bZtsn+LiYoOgHo4nJXOY+uGUz0eGMNTF+UIQJjmQbUOnkT0FYlX/l3yh9u+dKG0ofa99r6V6JN3l9751z7jnnd89599z3egXItNM1O1JwD1WQUCVAKJUkqZCJmWREE0HyCoIwJEH6FQIuogQXD525u7DSsLCScMZuf1fyLx5ldNtKnkbuewVRd7imtfWn5f7oAjdSfb1YOOP9Cn7/CUbLCdA1eM6BJH2032LOuPRxzfWGGzck8jEI5AkI6bAGHZd3SUL53ftO42X30DUS4Km1lE4/yvfQNpWl2XuUZgJ/sNvxJ3NXq89EpJHsxSt4UeSzU/KCIJA2wiDSFBsJsub5DINIdULzjkZwkDCIS8Uugqi22YRBZC7+XxU7nqNjIiDroq0bIPpYwiGIIqy7diHL+kwsaoJ9Jwb6MXDrFiS/P0iL9iImIFlWK948djxaW1HJXah+H+N9fVHJLheKCciMx4P7V6+yiFiX61R9PTEwANKppgmnS3fw1aOaznqDgaeBqI9pPIKm/T4fKF19c3NBWrQXqj149o0KlH32KdjKIL6NLWPvnDgJl4MvaqPWrQ6IIOCFqipsKKAXx/g30u267mCDFP0oqZp+s4uKULB9e/wRLGkk3WRDSVMFxFZRAV1qqhI7imRJN9lQ0hQDeWJkjxIbqmRtFXsUDZZiIFQAlYZdDRKyQbaibYqB2GvrZHVTNfYvhH2l4bL+xUXQIdc4fZWH+tXaWrkusjTFQDq/Oy+ryDvyEM5frsjyHra3Y7SzU5bncjhWLYK/X/heto8cUTEQZ3Mz+m7eDNFF0eg4exZ3mprwyNkTwpsbG0NL03G0nToVVuimhofQcqwRnee/DelDNyMMeM/Pl8PoqxFUVXZ9WhqKKyv5FLwwM8uKlwPutlZuw7BxI7ZU7kOOzYbp0VE4rzRj/MEDzssvKcHWAwewIb8Anu5u3Dv3NSYHBznvub178fzb7yDVZMJwRwd+++YcZh8/5rxoflQBkVNs2bkTVnbcbmwMY287eBC++X/wxw/hqVJ+5Ahc1xzM+fawfkoIuv2FhfVKOgRkaU3EvskiJT0dRbt347UvvoSlrAwpRiPG/nLBNzsLQ1YWXqquhr3uE5jtdsxPTfEI0KRgys9n9Dq8/MGHMJeWYtLt5hGkNCW9Sqo6+aQ6IrnFW/B6QwP0zPFMszmAj5/nJycxPTICQ3Y2jHl5Ibzpv0cxPz6BjM2bkZaZGcKjNKMFIz1Tgy0tIbxIN+rWWkyrzpCGnOJiWf3k4EonA4IZeZtAh1zLtFg4WW9Il2P/J03xrBXUtsrcH+THdBH9YjFgRj2QgAaNnJ8C0Ugggm48jUhwKDRyoToiE/39eNQTuq6KBybv8DA8XV2KVakuiGTJmJuLTVu3QdSxfyfiMR2zWdfT3YWpoaHEAlFsbQ07UGp511B/olR7RfozPlHW1soOYRD5joK1spAgvYSBrcXZtohkbwyDSHs7GI7eJMbSSxjYGwywHjYM8C0cl9zuLtrbwT5IlydVZETh6KHWtpPkc7Cy17y173MwRtIAYb5yn5cc5qm13Plk3eYUBoRAJePGs38Bb9OZyct70QYAAAAASUVORK5CYII="

/***/ }),

/***/ 7:
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/pages.json?{"type":"style"} ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/index": { "navigationBarTitleText": "" }, "pages/live-detail/live-detail": { "navigationBarTextStyle": "white", "transparentTitle": "always" }, "pages/study/study": { "navigationBarTitleText": "学习" }, "pages/my/my": { "navigationBarTitleText": "我的" }, "pages/course-detail/course-detail": { "transparentTitle": "auto", "navigationBarTitleText": "课程详情" }, "pages/total-course/total-course": { "navigationBarTitleText": "全部课程" }, "pages/my-info/my-info": { "navigationBarTitleText": "个人资料" }, "pages/system-set/system-set": { "navigationBarTitleText": "系统设置" }, "pages/my/study-money": { "navigationBarTitleText": "我的学币" }, "pages/recharge/recharge": { "navigationBarTitleText": "充值" }, "pages/cash-out/cash-out": { "navigationBarTitleText": "提现" }, "pages/cart/cart": { "navigationBarTitleText": "购物车" }, "pages/choose-grade/choose-grade": { "navigationBarTitleText": "设置年级" }, "pages/my/service": { "navigationBarTitleText": "我的客服" }, "pages/bind-mobile/bind-mobile": { "navigationBarTitleText": "绑定手机" }, "pages/login/login": {}, "pages/wechat-login/wechat-login": {}, "pages/order/order": { "navigationBarTitleText": "订单列表" }, "pages/my/my-collect": { "navigationBarTitleText": "我的收藏" }, "pages/my/invitation-qrcode": { "navigationBarTitleText": "我的二维码" }, "pages/order-detail/order-detail": { "navigationBarTitleText": "订单详情" }, "pages/activity/activity": { "navigationBarTitleText": "活动" }, "pages/search/search": { "navigationBarTitleText": "搜索" }, "pages/teacher-detail/teacher-detail": { "transparentTitle": "always" }, "pages/my-info/edit-nickname/edit-nickname": { "navigationBarTitleText": "修改昵称" }, "pages/operate-guide/operate-guide": { "navigationBarTitleText": "操作指南" }, "pages/video-detail/video-detail": { "transparentTitle": "always" }, "pages/register/register": {} }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "", "navigationBarBackgroundColor": "#FFFFFF", "backgroundColor": "#FFFFFF" } };exports.default = _default;

/***/ }),

/***/ 70:
/*!*******************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/static/icon/13.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 8:
/*!***************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/新建文件夹 (4)/pages.json?{"type":"stat"} ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__98001D4" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map