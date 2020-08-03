"use weex:vue";
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!****************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/项目/常春藤/main.js?{"page":"pages%2Fmy%2Fmy-collect"} ***!
  \****************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dcloudio_uni_stat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dcloudio/uni-stat */ 1);
/* harmony import */ var _dcloudio_uni_stat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_dcloudio_uni_stat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uni_app_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uni-app-style */ 5);
/* harmony import */ var uni_app_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uni_app_style__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _pages_my_my_collect_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/my/my-collect.nvue?mpType=page */ 8);

        
        
        
        _pages_my_my_collect_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__["default"].mpType = 'page'
        _pages_my_my_collect_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__["default"].route = 'pages/my/my-collect'
        _pages_my_my_collect_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__["default"].el = '#root'
        new Vue(_pages_my_my_collect_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__["default"])
        

/***/ }),
/* 1 */
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _package = __webpack_require__(/*! ../package.json */ 2);function _createSuper(Derived) {return function () {var Super = _getPrototypeOf(Derived),result;if (_isNativeReflectConstruct()) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

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

  return platformList["app-plus"];
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

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 3).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 4).default || __webpack_require__(/*! uni-stat-config */ 4);

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



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);var _super = _createSuper(Stat);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _super.call(this);
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

/***/ }),
/* 2 */
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-26920200424005","_inBundle":false,"_integrity":"sha512-FT8Z/C5xSmIxooqhV1v69jTkxATPz+FsRQIFOrbdlWekjGkrE73jfrdNMWm7gL5u41ALPJTVArxN1Re9by1bjQ==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-26920200424005.tgz","_shasum":"47f4375095eda3089cf4678b4b96fc656a7ab623","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"94494d54ed23e2dcf9ab8e3245b48b770b4e98a9","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-26920200424005"};

/***/ }),
/* 3 */
/*!*************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/项目/常春藤/pages.json?{"type":"style"} ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"pages":{},"globalStyle":{}});

/***/ }),
/* 4 */
/*!************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/项目/常春藤/pages.json?{"type":"stat"} ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"appid":"__UNI__98001D4"});

/***/ }),
/* 5 */
/*!*************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/项目/常春藤/main.js?{"type":"appStyle"} ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Vue.prototype.__$appStyle__ = {}
Vue.prototype.__merge_style && Vue.prototype.__merge_style(__webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css */ 6).default,Vue.prototype.__$appStyle__)


/***/ }),
/* 6 */
/*!*************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/项目/常春藤/App.vue?vue&type=style&index=0&lang=css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!./node_modules/postcss-loader/src??ref--8-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=css */ 7);
/* harmony import */ var _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 7 */
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!./node_modules/postcss-loader/src??ref--8-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/项目/常春藤/App.vue?vue&type=style&index=0&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {}

/***/ }),
/* 8 */
/*!**********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/项目/常春藤/pages/my/my-collect.nvue?mpType=page ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _my_collect_nvue_vue_type_template_id_58a06e6e_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./my-collect.nvue?vue&type=template&id=58a06e6e&mpType=page */ 9);
/* harmony import */ var _my_collect_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./my-collect.nvue?vue&type=script&lang=js&mpType=page */ 11);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _my_collect_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _my_collect_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 23);

var renderjs


function injectStyles (context) {
  
  if(!this.options.style){
          this.options.style = {}
      }
      if(Vue.prototype.__merge_style && Vue.prototype.__$appStyle__){
        Vue.prototype.__merge_style(Vue.prototype.__$appStyle__, this.options.style)
      }
      if(Vue.prototype.__merge_style){
                Vue.prototype.__merge_style(__webpack_require__(/*! ./my-collect.nvue?vue&type=style&index=0&lang=css&mpType=page */ 21).default, this.options.style)
            }else{
                Object.assign(this.options.style,__webpack_require__(/*! ./my-collect.nvue?vue&type=style&index=0&lang=css&mpType=page */ 21).default)
            }

}

/* normalize component */

var component = Object(_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _my_collect_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__["default"],
  _my_collect_nvue_vue_type_template_id_58a06e6e_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"],
  _my_collect_nvue_vue_type_template_id_58a06e6e_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  "38366257",
  false,
  _my_collect_nvue_vue_type_template_id_58a06e6e_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

injectStyles.call(component)
component.options.__file = "C:/Users/Administrator/Desktop/项目/常春藤/pages/my/my-collect.nvue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 9 */
/*!****************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/项目/常春藤/pages/my/my-collect.nvue?vue&type=template&id=58a06e6e&mpType=page ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_my_collect_nvue_vue_type_template_id_58a06e6e_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./my-collect.nvue?vue&type=template&id=58a06e6e&mpType=page */ 10);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_my_collect_nvue_vue_type_template_id_58a06e6e_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_my_collect_nvue_vue_type_template_id_58a06e6e_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_my_collect_nvue_vue_type_template_id_58a06e6e_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_my_collect_nvue_vue_type_template_id_58a06e6e_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 10 */
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/项目/常春藤/pages/my/my-collect.nvue?vue&type=template&id=58a06e6e&mpType=page ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "scroll-view",
    {
      staticStyle: { flexDirection: "column" },
      attrs: { scrollY: true, enableBackToTop: true, bubble: "true" }
    },
    [
      _c(
        "view",
        [
          _c("view", { staticClass: ["tab-bar"] }, [
            _c(
              "view",
              {
                staticClass: ["tab-bar-item"],
                on: {
                  click: function($event) {
                    _vm.selectTab = 0
                  }
                }
              },
              [
                _c(
                  "u-text",
                  {
                    class: [
                      "tab-bar-item-text",
                      _vm.selectTab === 0 ? "select-tab-bar-item-text" : ""
                    ]
                  },
                  [_vm._v(_vm._s(_vm.handleExist ? "直播课" : "辅导课"))]
                ),
                _c("view", {
                  class: [
                    "tab-bottom-border",
                    _vm.selectTab === 0 ? "select-tab-bar" : ""
                  ]
                })
              ]
            ),
            _c(
              "view",
              {
                staticClass: ["tab-bar-item"],
                on: {
                  click: function($event) {
                    _vm.selectTab = 1
                  }
                }
              },
              [
                _c(
                  "u-text",
                  {
                    class: [
                      "tab-bar-item-text",
                      _vm.selectTab === 1 ? "select-tab-bar-item-text" : ""
                    ]
                  },
                  [_vm._v("专题课")]
                ),
                _c("view", {
                  class: [
                    "tab-bottom-border",
                    _vm.selectTab === 1 ? "select-tab-bar" : ""
                  ]
                })
              ]
            )
          ]),
          _c(
            "swiper",
            {
              staticClass: ["swiper"],
              style: { height: _vm.swiperHeight },
              attrs: { current: _vm.selectTab },
              on: { change: _vm.tabChange }
            },
            _vm._l(_vm.list, function(item, index) {
              return _c("swiper-item", { key: index }, [
                _c("list", [
                  _c(
                    "cell",
                    { appendAsTree: true, attrs: { append: "tree" } },
                    [
                      _c(
                        "view",
                        { staticClass: ["course-list"] },
                        [
                          _vm._l(item.items, function(typeItem) {
                            return _c(
                              "view",
                              {
                                staticClass: ["course-item"],
                                on: {
                                  click: function($event) {
                                    _vm.handleOpenCourseDetail(
                                      typeItem.course.courseId
                                    )
                                  }
                                }
                              },
                              [
                                _c(
                                  "view",
                                  { staticClass: ["course-name"] },
                                  [
                                    _c("u-image", {
                                      staticClass: ["course-name-bg"],
                                      attrs: {
                                        src:
                                          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAA8CAYAAACgsw7vAAAAAXNSR0IArs4c6QAAA8pJREFUeAHtnT1M20AYhu9zfgRUZWFC/UlgQerEglS6MtMRtVMrsUGUCkoCVRFCiBYCFFQU2FqJqRVjmZlZmZBYINBWdGFBBdpA+HqhCrJMnPicIT77zeKf+w697/Ny57PiJJSZ2WeBV6AIkBDfjEA5hllBROcRIV4h+OD9M0wPvWnLIfgABU8kduPtsYWiZQQfoOCZjMG+PsoXLYcD5DvQVknQl/RobLMEASO+RMLHW7mKP4k0iNdmixjxZhp+3SdjYmgodmS2hxFvpuHDfXn7th1vf5i1WkPwViI+OpahM4XEgFzQFay2ELyViJ+OSXxKpeJb5Swh+HJUfHGOjpvuhMfsrCB4OzKanzcMMZpI3D+2s4Hg7chofF7es2+NpGOfK1nA7VwlOhq2yQVdQRg8UFzYVZKPEV+JjpZtnE2n27arSceIr0ZIq3Y6ami6O+FEMka8E0qa1BjEw8lky4kTuRjxTihpUCOv6ZupsfhXp1Ix4p2S8nZdnikyqCIRI16Flkdr5WhfSI/e21WRhxGvQsuLtUS5cDQ0rSoNwasS81i9ISg5PPzgXFUWglcl5qF6+QzdRmostuFGEoJ3Q80DfeR1/TzCIulWCoJ3S67+/a4fk3YrA8G7JVfHfubHpN3KQPBuyWneD8FrGCCz6MjtHYzUIh3B10Kvvn3Hl2b2424lIHi35Orcj5kbL0gsu5WB4N2S80A/OeX3ZjKHT91IQfBuqHmpD199XFz83qgqCcGrEvNaPXP8Ml8YV5WF4FWJebBeXu9HMpmfHSrSELwKLe/WRokvVlTkIXgVWh6ulaO+Z25u/7lTiQjeKSkN6rhAH5aXj5udSEXwTihpU8Otf85OppzIRfBOKGlVQwk55XdWk4zgqxHSrF1e60OiQKtyK78Iw/6F4O3ZaNvCgrvnZw/6KxlA8JXoaNwmPzg3m83+aLGzgODtyGh/nlvOTi9n7WwgeDsyfjjPon9+PtddzgqCL0fFJ+eKCzwuiNX1dbngs7wQvAWI3w5l+J25vcOE1ReCtxLx4zFfTS0t5VrN1hC8mYZP9+UKvzn/Vyya7SF4Mw0/7zM/y2QOekoWEXyJRAC2xFcrcqEXLVpF8AEIvGTR/Fg24TdpSliCsf3/mTt+hBEfjLxvXMrbu+vHssOnv3+9lKu+4rs5TTetpp3p908qvstjKsWuRgSMqXfda6EIdclvQ9zRSDek1kjgeqqfnHy8E4pGuuRvU63V+PfQXRMCt6bxibdbL8xTP6Z6TZJUlHlrcYepX5GgpuW3gi/6wNSvaZoKsv8B52XZjSl7aJYAAAAASUVORK5CYII="
                                      }
                                    }),
                                    _c(
                                      "u-text",
                                      { staticClass: ["course-name-text"] },
                                      [
                                        _vm._v(
                                          _vm._s(typeItem.course.courseName)
                                        )
                                      ]
                                    )
                                  ],
                                  1
                                ),
                                _c("view", { staticClass: ["price"] }, [
                                  _c(
                                    "u-text",
                                    { staticClass: ["price-text"] },
                                    [
                                      _vm._v(
                                        "¥" + _vm._s(typeItem.course.price)
                                      )
                                    ]
                                  )
                                ]),
                                _c(
                                  "u-text",
                                  { staticClass: ["course-title"] },
                                  [_vm._v(_vm._s(typeItem.course.name))]
                                ),
                                _c("u-text", { staticClass: ["course-time"] }, [
                                  _vm._v(_vm._s(typeItem.course.classTime))
                                ]),
                                _c(
                                  "view",
                                  { staticClass: ["course-level"] },
                                  [
                                    _c(
                                      "u-text",
                                      { staticClass: ["course-level-title"] },
                                      [_vm._v("难度")]
                                    ),
                                    _vm._l(typeItem.course.level, function(
                                      star
                                    ) {
                                      return _c("u-image", {
                                        staticClass: ["course-level-star"],
                                        attrs: {
                                          src:
                                            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAlFJREFUSA2dVU1LVUEYfuZeTdPyA+5O4kpUcMFbGiFEi36AVgvtmrRIilaS6xaB4V/QTdFeCP0BBS2Cyo8igoI+NlJguFDMrEVp9+2ZOdfDnDtHZ+4dGM7M+z7P887HO+8Bamgyhz55jP4aKMiEgmUeI8QukrHAQOOhPBUClAdoQQ5viC0YvGAVv3FG3cCGjx+2gxxKsbhWVOhCK276xCOoB8UzP8xjWaJoMQEVfMUf9Knr2EzYqyb+HWQw5IhrEYU8mjBWpedMD7wDrv5QZfW9DlMbBCsocxclbKX6aYwDyH1KHedVNqObowLJRX7PEXNxP3LFvkzsa44/8PuJnBWmwJqa4AGyKZnFMTTiHsdn2fMMmdN29vqa4CfZqwz2ngKTDRSfomGsPrUUlkIbrW3U1Cnd7L/kFI1gk6Cc4SVNcTvvgknhwI/UvpthBuhMGGSQV+FcL/It/mGA2p/NEXGgn/5lBnnipfoAgpf4i0tm4cTGd2Dqyhau0jbHLj6dVL/gKRd6RY3i+57fSUc+riPImhTr3gMFftd5LEWufM3GxzuwjO0cd1jz0OFRnofDcwNkcarOAE1MlqicW0tyAwhOW/7ahlmX6wYA0gtbSChdv6paIgAvOEt/TxUmmgrzA3jEPs0c2696FkwFtgQSAbBj6kje8uuE/WWEyzivhnCbfQK7/PELZlICddHXafOTARpNJXxWAWxT4CEJkXDJpK5xqWv4ooZxJw4E/IgceI6G5B/OfQf6B9+JCyR800+9EuzAD4/lBKvnSS7vhbqFbRv8HzgBjfYGEr3GAAAAAElFTkSuQmCC",
                                          mode: "aspectFill"
                                        }
                                      })
                                    })
                                  ],
                                  2
                                ),
                                _c("view", { staticClass: ["teacher"] }, [
                                  _c(
                                    "view",
                                    { staticClass: ["teacher-left"] },
                                    [
                                      _c("u-image", {
                                        staticClass: ["teacher-avatar"],
                                        attrs: {
                                          src:
                                            _vm.baseURL +
                                            typeItem.course.avatar,
                                          mode: "aspectFill"
                                        }
                                      }),
                                      _c(
                                        "u-text",
                                        { staticClass: ["teacher-name"] },
                                        [
                                          _vm._v(
                                            _vm._s(typeItem.course.teacherName)
                                          )
                                        ]
                                      )
                                    ],
                                    1
                                  ),
                                  _c(
                                    "u-text",
                                    { staticClass: ["course-collection"] },
                                    [
                                      _vm._v(
                                        "共" +
                                          _vm._s(typeItem.course.childNum) +
                                          "讲"
                                      )
                                    ]
                                  )
                                ])
                              ]
                            )
                          }),
                          !item.items.length
                            ? _c(
                                "view",
                                { staticClass: ["no-course"] },
                                [
                                  _c("u-image", {
                                    staticClass: ["no-default-img"],
                                    attrs: { src: _vm.noCourse }
                                  }),
                                  _c(
                                    "u-text",
                                    { staticClass: ["no-default-text"] },
                                    [_vm._v("您还没有收藏课程哦～")]
                                  )
                                ],
                                1
                              )
                            : _vm._e()
                        ],
                        2
                      ),
                      !_vm.hasFlag && item.items.length
                        ? _c("view", { staticClass: ["tip-no-more"] }, [
                            _c(
                              "u-text",
                              { staticClass: ["tip-no-more-text"] },
                              [_vm._v("已经到底啦~")]
                            )
                          ])
                        : _vm._e()
                    ]
                  ),
                  _vm.hasFlag
                    ? _c(
                        "loading",
                        {
                          staticClass: ["bottom-loading"],
                          attrs: { display: _vm.loadingFlag },
                          on: {
                            loading: function($event) {
                              _vm.collectList()
                            }
                          }
                        },
                        [
                          _c(
                            "u-text",
                            { staticClass: ["bottom-loading-text"] },
                            [_vm._v("正在加载")]
                          ),
                          _c("loading-indicator", {
                            staticClass: ["indicator"]
                          })
                        ]
                      )
                    : _vm._e()
                ])
              ])
            }),
            1
          )
        ],
        1
      )
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 11 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/项目/常春藤/pages/my/my-collect.nvue?vue&type=script&lang=js&mpType=page ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_360_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_my_collect_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib??ref--4-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./my-collect.nvue?vue&type=script&lang=js&mpType=page */ 12);
/* harmony import */ var _D_360_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_my_collect_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_360_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_my_collect_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_360_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_my_collect_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_360_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_my_collect_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_360_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_my_collect_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 12 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/项目/常春藤/pages/my/my-collect.nvue?vue&type=script&lang=js&mpType=page ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 13));

































































var _static = __webpack_require__(/*! @/static.js */ 15);
var _index = _interopRequireDefault(__webpack_require__(/*! @/api/index.js */ 16));
var _request = _interopRequireDefault(__webpack_require__(/*! @/libs/request.js */ 17));
var _config = __webpack_require__(/*! @/config */ 19);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =
{
  data: function data() {
    return {
      handleExist: false,
      baseURL: _config.baseURL,
      noCourse: _static.noCourse, // 默认图
      selectTab: 0, // 当前选中的tabbar
      swiperHeight: '543wx', // swiper 高度
      pageNum: 0, // 当前页数
      pageSize: 10, // 每页数量
      hasFlag: true, // 是否还有更多
      loadingFlag: 'hide', // 加载动画
      list: [
      {
        items: [] },

      {
        items: [] }]

      // 直播课
    };
  },
  methods: {
    // 前往课程详情页
    handleOpenCourseDetail: function handleOpenCourseDetail(courseId) {
      uni.navigateTo({ url: '/pages/course-detail/course-detail?courseId=' + courseId });
    },
    // 顶部tab 发生改变时触发
    tabChange: function tabChange(_ref) {var current = _ref.detail.current;
      this.selectTab = current; // tab-bar选中
    },
    // 获取我收藏的课程
    collectList: function collectList() {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var res, course_type_list;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (
                _this.hasFlag) {_context.next = 2;break;}return _context.abrupt("return");case 2: // 说明已经没有更多啦
                _this.pageNum = ++_this.pageNum;
                _this.loadingFlag = 'show';_context.next = 6;return (
                  (0, _request.default)(_index.default.collectList, { pageNum: _this.pageNum, pageSize: _this.pageSize }));case 6:res = _context.sent;
                _this.loadingFlag = 'hide';
                course_type_list = uni.getStorageSync('course_type_list');
                res.rows.forEach(function (item) {
                  course_type_list.forEach(function (courseItem) {
                    if (item.course.courseTypeId === courseItem.id) item.course.courseName = courseItem.name;
                  });
                  if (item.course.type === 1) _this.list[0].items.push(item);else
                  _this.list[1].items.push(item);
                });

                _this.hasFlag = _this.pageNum * _this.pageSize < res.total;case 11:case "end":return _context.stop();}}}, _callee);}))();
    } },

  onLoad: function onLoad() {
    if (uni.getStorageSync('end_time')) this.handleExist = Date.now() > Date.parse(uni.getStorageSync('end_time')) ? true : false;
    this.swiperHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(90) + 'wx';
    this.collectList();
  } };exports.default = _default;

/***/ }),
/* 13 */
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 14);

/***/ }),
/* 14 */
/*!****************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/regenerator-runtime/runtime.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

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
  exports.wrap = wrap;

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
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ?
    ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" :
    false;
  };

  exports.mark = function (genFun) {
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
  exports.awrap = function (arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
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
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
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
      callInvokeWithMethodAndArg) :
      callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
    wrap(innerFn, outerFn, self, tryLocsList),
    PromiseImpl);


    return exports.isGeneratorFunction(outerFn) ?
    iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
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
          state = context.done ?
          GenStateCompleted :
          GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done };


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
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
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

    if (!info) {
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
  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
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

  exports.keys = function (object) {
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
        var i = -1,next = function next() {
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
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset(skipTempReset) {
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

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
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

        return !!caught;
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

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
        hasOwn.call(entry, "finallyLoc") &&
        this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (
      type === "break" ||
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

    complete: function complete(record, afterLoc) {
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

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function _catch(tryLoc) {
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

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc };


      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    } };


  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
// If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
 true ? module.exports : undefined);


try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

/***/ }),
/* 15 */
/*!*******************************************************!*\
  !*** C:/Users/Administrator/Desktop/项目/常春藤/static.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.gradeTree = exports.noCourse = void 0;var noCourse = 'data:image/png;base64,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';exports.noCourse = noCourse;

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
/* 16 */
/*!**********************************************************!*\
  !*** C:/Users/Administrator/Desktop/项目/常春藤/api/index.js ***!
  \**********************************************************/
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
/* 17 */
/*!*************************************************************!*\
  !*** C:/Users/Administrator/Desktop/项目/常春藤/libs/request.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__f__) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _config = __webpack_require__(/*! @/config */ 19);
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
        __f__("log", err, " at libs\\request.js:55");
        // uni.showToast({
        // 	icon: 'none',
        // 	title: err
        // })
      } });

  });
};exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 18)["default"]))

/***/ }),
/* 18 */
/*!*********************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.log = log;exports.default = formatLog;function typof(v) {
  var s = Object.prototype.toString.call(v);
  return s.substring(8, s.length - 1);
}

function isDebugMode() {
  /* eslint-disable no-undef */
  return typeof __channelId__ === 'string' && __channelId__;
}

function log(type) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  console[type].apply(console, args);
}

function formatLog() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var type = args.shift();
  if (isDebugMode()) {
    args.push(args.pop().replace('at ', 'uni-app:///'));
    return console[type].apply(console, args);
  }

  var msgs = args.map(function (v) {
    var type = Object.prototype.toString.call(v).toLowerCase();

    if (type === '[object object]' || type === '[object array]') {
      try {
        v = '---BEGIN:JSON---' + JSON.stringify(v) + '---END:JSON---';
      } catch (e) {
        v = '[object object]';
      }
    } else {
      if (v === null) {
        v = '---NULL---';
      } else if (v === undefined) {
        v = '---UNDEFINED---';
      } else {
        var vType = typof(v).toUpperCase();

        if (vType === 'NUMBER' || vType === 'BOOLEAN') {
          v = '---BEGIN:' + vType + '---' + v + '---END:' + vType + '---';
        } else {
          v = String(v);
        }
      }
    }

    return v;
  });
  var msg = '';

  if (msgs.length > 1) {
    var lastMsg = msgs.pop();
    msg = msgs.join('---COMMA---');

    if (lastMsg.indexOf(' at ') === 0) {
      msg += lastMsg;
    } else {
      msg += '---COMMA---' + lastMsg;
    }
  } else {
    msg = msgs[0];
  }

  console[type](msg);
}

/***/ }),
/* 19 */
/*!*************************************************************!*\
  !*** C:/Users/Administrator/Desktop/项目/常春藤/config/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.numberToChinese = exports.SectionToChinese = exports.wsBaseUrl = exports.baseURL = exports.JMessage = void 0;






var _wechatJmessage = _interopRequireDefault(__webpack_require__(/*! @/libs/wechat-jmessage.js */ 20));



var _api = _interopRequireDefault(__webpack_require__(/*! @/api */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];var chnUnitChar = ["", "十", "百", "千"];

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
/* 20 */
/*!*********************************************************************!*\
  !*** C:/Users/Administrator/Desktop/项目/常春藤/libs/wechat-jmessage.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__f__) {!function (t, e) { true ? module.exports = e() : undefined;}(this, function () {return function (t) {function e(o) {if (n[o]) return n[o].exports;var i = n[o] = { exports: {}, id: o, loaded: !1 };return t[o].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports;}var n = {};return e.m = t, e.c = n, e.p = "", e(0);}([function (t, e, n) {t.exports = n(18);}, function (t, e, n) {(function (o) {function i() {return "undefined" != typeof document && "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;}function s() {var t = arguments,n = this.useColors;if (t[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + t[0] + (n ? "%c " : " ") + "+" + e.humanize(this.diff), !n) return t;var o = "color: " + this.color;t = [t[0], o, "color: inherit"].concat(Array.prototype.slice.call(t, 1));var i = 0,s = 0;return t[0].replace(/%[a-z%]/g, function (t) {"%%" !== t && (i++, "%c" === t && (s = i));}), t.splice(s, 0, o), t;}function r() {return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);}function a(t) {try {null == t ? e.storage.removeItem("debug") : e.storage.debug = t;} catch (t) {}}function c() {try {return e.storage.debug;} catch (t) {}if ("undefined" != typeof o && "env" in o) return o.env.DEBUG;}function p() {try {return window.localStorage;} catch (t) {}}e = t.exports = n(34), e.log = r, e.formatArgs = s, e.save = a, e.load = c, e.useColors = i, e.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : p(), e.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], e.formatters.j = function (t) {try {return JSON.stringify(t);} catch (t) {return "[UnexpectedJSONParseError]: " + t.message;}}, e.enable(c());}).call(e, n(38));}, function (t, e, n) {t.exports = n(25);}, function (t, e, n) {function o(t) {if (t) return i(t);}function i(t) {for (var e in o.prototype) {t[e] = o.prototype[e];}return t;}t.exports = o, o.prototype.on = o.prototype.addEventListener = function (t, e) {return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this;}, o.prototype.once = function (t, e) {function n() {this.off(t, n), e.apply(this, arguments);}return n.fn = e, this.on(t, n), this;}, o.prototype.off = o.prototype.removeListener = o.prototype.removeAllListeners = o.prototype.removeEventListener = function (t, e) {if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;var n = this._callbacks["$" + t];if (!n) return this;if (1 == arguments.length) return delete this._callbacks["$" + t], this;for (var o, i = 0; i < n.length; i++) {if (o = n[i], o === e || o.fn === e) {n.splice(i, 1);break;}}return this;}, o.prototype.emit = function (t) {this._callbacks = this._callbacks || {};var e = [].slice.call(arguments, 1),n = this._callbacks["$" + t];if (n) {n = n.slice(0);for (var o = 0, i = n.length; o < i; ++o) {n[o].apply(this, e);}}return this;}, o.prototype.listeners = function (t) {return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];}, o.prototype.hasListeners = function (t) {return !!this.listeners(t).length;};}, function (t, e) {var n = { SDK_VERSION: "2.6.0", WSS_ADDRESS: "wss://ws.im.jiguang.cn", UPLOAD_FILE: "https://sdk.im.jiguang.cn/resource", ALLOW_MSG_TYPE: ["text", "image", "file", "location", "custom"], LOGIN_OUT_EVENT: [1, 2], FROM_PLATFORM: "x", ACK_TIMEOUT: 5e3, RESP_TIMEOUT: 3e4, RETRY_TIMES: 5, SYNC_INTERVAL: 15e4, RECEIPT_REPORT_INTERVAL: 2e3, RECEIPT_REPORT_MAX_SIZE: 50, EVENT_KEY: "eve-k-", CONVERSATION_KEY: "conversations-", SYNC_TYPE_OPEN: 1, SYNC_TYPE_CLOSE: 0, FRIEND_INVITE: 1, FRIEND_INVITED: 2, PLAT_CHANNEL: "w", EVENTS: { ACK: "ack", INIT: "c_init", LOGIN: "login", REGISTER: "register", GET_USER_INFO: "get_across_user_info", GET_ACROSS_USER_INFO: "get_across_user_info", S_SINGLE_TEXT: "s_across_single_text", S_SINGLE_TEXT_: "s_single_text", MSG_SYNC: "msg_sync", MSG_RECV: "msg_recv", MSG_RECV_V2: "msg_recv_v2", SEND_GROUP_MSG: "send_group_msg", CREATE_GROUP: "create_group", GET_GROUPS_LIST: "get_groups_list", GET_GROUP_INFO: "get_group_info", ADD_GROUP_MEMBER: "add_group_member", ADD_ACROSS_GROUP_MEMBER: "add_across_group_member", DEL_GROUP_MEMBER: "del_group_member", DEL_ACROSS_GROUP_MEMBER: "del_across_group_member", GET_GROUP_MEMBERS: "get_group_members", UPDATE_GROUP_INFO: "update_group_info", EXIT_GROUP: "exit_group", EVENT_NOTIFICATION: "event_notification", GET_CONVERSATIONS: "get_conversations", GET_UPLOAD_TOKEN: "get_upload_token", NO_DISTURB: "no_disturb", ADD_MSG_NO_DISTURB_SINGLE: "add_msg_no_disturb_single", DELETE_MSG_NO_DISTURB_SINGLE: "delete_msg_no_disturb_single", ADD_MSG_NO_DISTURB_GROUP: "add_msg_no_disturb_group", DELETE_MSG_NO_DISTURB_GROUP: "delete_msg_no_disturb_group", ADD_MSG_NO_DISTURB_GLOBAL: "add_msg_no_disturb_global", DELETE_MSG_NO_DISTURB_GLOBAL: "delete_msg_no_disturb_global", DISCONNECT: "disconnect", GET_BLACK_LIST: "get_black_list", ADD_BLACK_LIST: "add_black_list", DEL_BLACK_LIST: "del_black_list", UPDATE_SELF_INFO: "update_user_inf", UPDATE_SELF_PWD: "update_user_pwd", ADD_MSG_SHIELD_GROUP: "add_msg_shield_group", DEL_MSG_SHIELD_GROUP: "del_msg_shield_group", ADD_FRIEND: "add_friend", DEL_FRIEND: "del_friend", UPDATE_FRIEND_MEMO: "update_friend_memo", GET_FRIEND_LIST: "get_friend_list", SYNC_CHECK: "sync_check", SYNC_CONVERSATION: "sync_conversation", SYNC_CONVERSATION_ACK: "sync_conversation_ack", MSG_RETRACT: "msg_retract", GET_RESOURCE: "get_resource", LIST_SHIELD_GROUP: "list_shield_group", SYNC_EVENT_CHECK: "sync_event_check", SYNC_EVENT: "sync_event", SYNC_EVENT_ACK: "sync_event_ack", RECEIPT_REPORT: "receipt_report", SYNC_RECEIPT_ACK: "sync_receipt_ack", SYNC_RECEIPT: "sync_receipt", RECEIPT_CHANGE: "receipt_change", UNREAD_GROUP_COUNT: "unread_group_count", UNREAD_SINGLE_COUNT: "unread_single_count", MSG_UNREAD_LIST: "msg_unread_list", TRANS_MSG_SINGLE: "trans_msg_single", TRANS_MSG_GROUP: "trans_msg_group", TRANS_MSG_PLATFORM: "trans_msg_platform", TRANS_MSG_REC: "trans_msg_rec", ADMIN_ADD_GROUP_MEMBER: "admin_add_group_member", APPLY_JOIN_GROUP: "apply_join_group", ROOM_LIST: "room_list", ROOM_LIST_SELF: "room_list_self", JOIN_ROOM: "join_room", EXIT_ROOM: "exit_room", ROOM_INFO: "room_info", SEND_ROOM_MSG: "send_room_msg", ROOM_MSG_SYNC: "room_msg_sync", GROUP_MEM_SILENCE: "group_mem_silence", ROOM_MSG_SYNC_HIS: "room_msg_sync_his", DISSOLVE_GROUP: "dissolve_group", ADD_GROUP_KEEPER: "add_group_keeper", DEL_GROUP_KEEPER: "del_group_keeper", CHANGE_GROUP_ADMIN: "change_group_admin", PUBLIC_GROUP_LIST: "public_group_list" } };t.exports = n;}, function (t, e, n) {function o() {}function i(t) {var n = "",o = !1;return n += t.type, e.BINARY_EVENT != t.type && e.BINARY_ACK != t.type || (n += t.attachments, n += "-"), t.nsp && "/" != t.nsp && (o = !0, n += t.nsp), null != t.id && (o && (n += ",", o = !1), n += t.id), null != t.data && (o && (n += ","), n += JSON.stringify(t.data)), h("encoded %j as %s", t, n), n;}function s(t, e) {function n(t) {var n = f.deconstructPacket(t),o = i(n.packet),s = n.buffers;s.unshift(o), e(s);}f.removeBlobs(t, n);}function r() {this.reconstructor = null;}function a(t) {var n = {},o = 0;if (n.type = Number(t.charAt(0)), null == e.types[n.type]) return u();if (e.BINARY_EVENT == n.type || e.BINARY_ACK == n.type) {for (var i = ""; "-" != t.charAt(++o) && (i += t.charAt(o), o != t.length);) {;}if (i != Number(i) || "-" != t.charAt(o)) throw new Error("Illegal attachments");n.attachments = Number(i);}if ("/" == t.charAt(o + 1)) for (n.nsp = ""; ++o;) {var s = t.charAt(o);if ("," == s) break;if (n.nsp += s, o == t.length) break;} else n.nsp = "/";var r = t.charAt(o + 1);if ("" !== r && Number(r) == r) {for (n.id = ""; ++o;) {var s = t.charAt(o);if (null == s || Number(s) != s) {--o;break;}if (n.id += t.charAt(o), o == t.length) break;}n.id = Number(n.id);}return t.charAt(++o) && (n = c(n, t.substr(o))), h("decoded %s as %j", t, n), n;}function c(t, e) {try {t.data = JSON.parse(e);} catch (t) {return u();}return t;}function p(t) {this.reconPack = t, this.buffers = [];}function u(t) {return { type: e.ERROR, data: "parser error" };}var h = n(1)("socket.io-parser"),_ = n(40),f = n(39),d = n(16);e.protocol = 4, e.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"], e.CONNECT = 0, e.DISCONNECT = 1, e.EVENT = 2, e.ACK = 3, e.ERROR = 4, e.BINARY_EVENT = 5, e.BINARY_ACK = 6, e.Encoder = o, e.Decoder = r, o.prototype.encode = function (t, n) {if (h("encoding packet %j", t), e.BINARY_EVENT == t.type || e.BINARY_ACK == t.type) s(t, n);else {var o = i(t);n([o]);}}, _(r.prototype), r.prototype.add = function (t) {var n;if ("string" == typeof t) n = a(t), e.BINARY_EVENT == n.type || e.BINARY_ACK == n.type ? (this.reconstructor = new p(n), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", n)) : this.emit("decoded", n);else {if (!d(t) && !t.base64) throw new Error("Unknown type: " + t);if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");n = this.reconstructor.takeBinaryData(t), n && (this.reconstructor = null, this.emit("decoded", n));}}, r.prototype.destroy = function () {this.reconstructor && this.reconstructor.finishedReconstruction();}, p.prototype.takeBinaryData = function (t) {if (this.buffers.push(t), this.buffers.length == this.reconPack.attachments) {var e = f.reconstructPacket(this.reconPack, this.buffers);return this.finishedReconstruction(), e;}return null;}, p.prototype.finishedReconstruction = function () {this.reconPack = null, this.buffers = [];};}, function (t, e, n) {function o(t, e) {return this instanceof o ? (t && "object" == typeof t && (e = t, t = void 0), e = e || {}, e.path = e.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = e, this.reconnection(e.reconnection !== !1), this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0), this.reconnectionDelay(e.reconnectionDelay || 2e3), this.reconnectionDelayMax(e.reconnectionDelayMax || 2e3), this.randomizationFactor(e.randomizationFactor || .5), this.backoff = new _({ min: this.reconnectionDelay(), max: this.reconnectionDelayMax(), jitter: this.randomizationFactor() }), this.timeout(null == e.timeout ? 3e3 : e.timeout), this.readyState = "closed", this.uri = t, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [], this.encoder = new a.Encoder(), this.decoder = new a.Decoder(), this.autoConnect = e.autoConnect !== !1, void (this.autoConnect && this.open())) : new o(t, e);}var i = n(27),s = n(8),r = n(3),a = n(5),c = n(7),p = n(11),u = n(1)("socket.io-client:manager"),h = n(12),_ = n(32),f = Object.prototype.hasOwnProperty;t.exports = o, o.prototype.emitAll = function () {this.emit.apply(this, arguments);for (var t in this.nsps) {f.call(this.nsps, t) && this.nsps[t].emit.apply(this.nsps[t], arguments);}}, o.prototype.updateSocketIds = function () {for (var t in this.nsps) {f.call(this.nsps, t) && (this.nsps[t].id = this.engine.id);}}, r(o.prototype), o.prototype.reconnection = function (t) {return arguments.length ? (this._reconnection = !!t, this) : this._reconnection;}, o.prototype.reconnectionAttempts = function (t) {return arguments.length ? (this._reconnectionAttempts = t, this) : this._reconnectionAttempts;}, o.prototype.reconnectionDelay = function (t) {return arguments.length ? (this._reconnectionDelay = t, this.backoff && this.backoff.setMin(t), this) : this._reconnectionDelay;}, o.prototype.randomizationFactor = function (t) {return arguments.length ? (this._randomizationFactor = t, this.backoff && this.backoff.setJitter(t), this) : this._randomizationFactor;}, o.prototype.reconnectionDelayMax = function (t) {return arguments.length ? (this._reconnectionDelayMax = t, this.backoff && this.backoff.setMax(t), this) : this._reconnectionDelayMax;}, o.prototype.timeout = function (t) {return arguments.length ? (this._timeout = t, this) : this._timeout;}, o.prototype.maybeReconnectOnOpen = function () {!this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();}, o.prototype.open = o.prototype.connect = function (t, e) {if (u("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;u("opening %s", this.uri), this.engine = i(this.uri, this.opts);var n = this.engine,o = this;this.readyState = "opening", this.skipReconnect = !1;var s = c(n, "open", function () {o.onopen(), t && t();}),r = c(n, "error", function (e) {if (u("connect_error"), o.cleanup(), o.readyState = "closed", o.emitAll("connect_error", e), t) {var n = new Error("Connection error");n.data = e, t(n);} else o.maybeReconnectOnOpen();});if (!1 !== this._timeout) {var a = this._timeout;u("connect attempt will timeout after %d", a);var p = setTimeout(function () {u("connect attempt timed out after %d", a), s.destroy(), n.close(), n.emit("error", "timeout"), o.emitAll("connect_timeout", a);}, a);this.subs.push({ destroy: function destroy() {clearTimeout(p);} });}return this.subs.push(s), this.subs.push(r), this;}, o.prototype.onopen = function () {u("open"), this.cleanup(), this.readyState = "open", this.emit("open");var t = this.engine;this.subs.push(c(t, "data", p(this, "ondata"))), this.subs.push(c(t, "ping", p(this, "onping"))), this.subs.push(c(t, "pong", p(this, "onpong"))), this.subs.push(c(t, "error", p(this, "onerror"))), this.subs.push(c(t, "close", p(this, "onclose"))), this.subs.push(c(this.decoder, "decoded", p(this, "ondecoded")));}, o.prototype.onping = function () {this.lastPing = new Date(), this.emitAll("ping");}, o.prototype.onpong = function () {this.emitAll("pong", new Date() - this.lastPing);}, o.prototype.ondata = function (t) {this.decoder.add(t);}, o.prototype.ondecoded = function (t) {this.emit("packet", t);}, o.prototype.onerror = function (t) {u("error", t), this.emitAll("error", t);}, o.prototype.socket = function (t, e) {function n() {~h(i.connecting, o) || i.connecting.push(o);}var o = this.nsps[t];if (!o) {o = new s(this, t, e), this.nsps[t] = o;var i = this;o.on("connecting", n), o.on("connect", function () {o.id = i.engine.id;}), this.autoConnect && n();}return o;}, o.prototype.destroy = function (t) {var e = h(this.connecting, t);~e && this.connecting.splice(e, 1), this.connecting.length || this.close();}, o.prototype.packet = function (t) {u("writing packet %j", t);var e = this;t.query && 0 === t.type && (t.nsp += "?" + t.query), e.encoding ? e.packetBuffer.push(t) : (e.encoding = !0, this.encoder.encode(t, function (n) {for (var o = 0; o < n.length; o++) {e.engine.write(n[o], t.options);}e.encoding = !1, e.processPacketQueue();}));}, o.prototype.processPacketQueue = function () {if (this.packetBuffer.length > 0 && !this.encoding) {var t = this.packetBuffer.shift();this.packet(t);}}, o.prototype.cleanup = function () {u("cleanup");for (var t = this.subs.length, e = 0; e < t; e++) {var n = this.subs.shift();n.destroy();}this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy();}, o.prototype.close = o.prototype.disconnect = function () {u("disconnect"), this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState && this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close();}, o.prototype.onclose = function (t) {u("onclose"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", t), this._reconnection && !this.skipReconnect && this.reconnect();}, o.prototype.reconnect = function () {if (this.reconnecting || this.skipReconnect) return this;var t = this;if (this.backoff.attempts >= this._reconnectionAttempts) u("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1;else {var e = this.backoff.duration();u("will wait %dms before reconnect attempt", e), this.reconnecting = !0;var n = setTimeout(function () {t.skipReconnect || (u("attempting reconnect"), t.emitAll("reconnect_attempt", t.backoff.attempts), t.emitAll("reconnecting", t.backoff.attempts), t.skipReconnect || t.open(function (e) {e ? (u("reconnect attempt error"), t.reconnecting = !1, t.reconnect(), t.emitAll("reconnect_error", e.data)) : (u("reconnect success"), t.onreconnect());}));}, e);this.subs.push({ destroy: function destroy() {clearTimeout(n);} });}}, o.prototype.onreconnect = function () {var t = this.backoff.attempts;this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", t);};}, function (t, e) {function n(t, e, n) {return t.on(e, n), { destroy: function destroy() {t.removeListener(e, n);} };}t.exports = n;}, function (t, e, n) {function o(t, e, n) {this.io = t, this.nsp = e, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0, n && n.query && (this.query = n.query), this.io.autoConnect && this.open();}var i = n(5),s = n(3),r = n(41),a = n(7),c = n(11),p = n(1)("socket.io-client:socket"),u = n(35);t.exports = e = o;var h = { connect: 1, connect_error: 1, connect_timeout: 1, connecting: 1, disconnect: 1, error: 1, reconnect: 1, reconnect_attempt: 1, reconnect_failed: 1, reconnect_error: 1, reconnecting: 1, ping: 1, pong: 1 },_ = s.prototype.emit;s(o.prototype), o.prototype.subEvents = function () {if (!this.subs) {var t = this.io;this.subs = [a(t, "open", c(this, "onopen")), a(t, "packet", c(this, "onpacket")), a(t, "close", c(this, "onclose"))];}}, o.prototype.open = o.prototype.connect = function () {return this.connected ? this : (this.subEvents(), this.io.open(), "open" === this.io.readyState && this.onopen(), this.emit("connecting"), this);}, o.prototype.send = function () {var t = r(arguments);return t.unshift("message"), this.emit.apply(this, t), this;}, o.prototype.emit = function (t) {if (h.hasOwnProperty(t)) return _.apply(this, arguments), this;var e = r(arguments),n = i.EVENT,o = { type: n, data: e };return o.options = {}, o.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof e[e.length - 1] && (p("emitting packet with ack id %d", this.ids), this.acks[this.ids] = e.pop(), o.id = this.ids++), this.connected ? this.packet(o) : this.sendBuffer.push(o), delete this.flags, this;}, o.prototype.packet = function (t) {t.nsp = this.nsp, this.io.packet(t);}, o.prototype.onopen = function () {p("transport is open - connecting"), "/" !== this.nsp && (this.query ? this.packet({ type: i.CONNECT, query: this.query }) : this.packet({ type: i.CONNECT }));}, o.prototype.onclose = function (t) {p("close (%s)", t), this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", t);}, o.prototype.onpacket = function (t) {if (t.nsp === this.nsp) switch (t.type) {case i.CONNECT:this.onconnect();break;case i.EVENT:this.onevent(t);break;case i.BINARY_EVENT:this.onevent(t);break;case i.ACK:this.onack(t);break;case i.BINARY_ACK:this.onack(t);break;case i.DISCONNECT:this.ondisconnect();break;case i.ERROR:this.emit("error", t.data);}}, o.prototype.onevent = function (t) {var e = t.data || [];p("emitting event %j", e), null != t.id && (p("attaching ack callback to event"), e.push(this.ack(t.id))), this.connected ? _.apply(this, e) : this.receiveBuffer.push(e);}, o.prototype.ack = function (t) {var e = this,n = !1;return function () {if (!n) {n = !0;var o = r(arguments);p("sending ack %j", o);var s = u(o) ? i.BINARY_ACK : i.ACK;e.packet({ type: s, id: t, data: o });}};}, o.prototype.onack = function (t) {var e = this.acks[t.id];"function" == typeof e ? (p("calling ack %s with %j", t.id, t.data), e.apply(this, t.data), delete this.acks[t.id]) : p("bad ack %s", t.id);}, o.prototype.onconnect = function () {this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered();}, o.prototype.emitBuffered = function () {var t;for (t = 0; t < this.receiveBuffer.length; t++) {_.apply(this, this.receiveBuffer[t]);}for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++) {this.packet(this.sendBuffer[t]);}this.sendBuffer = [];}, o.prototype.ondisconnect = function () {p("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect");}, o.prototype.destroy = function () {if (this.subs) {for (var t = 0; t < this.subs.length; t++) {this.subs[t].destroy();}this.subs = null;}this.io.destroy(this);}, o.prototype.close = o.prototype.disconnect = function () {return this.connected && (p("performing disconnect (%s)", this.nsp), this.packet({ type: i.DISCONNECT })), this.destroy(), this.connected && this.onclose("io client disconnect"), this;}, o.prototype.compress = function (t) {return this.flags = this.flags || {}, this.flags.compress = t, this;};}, function (t, e, n) {function o(t) {this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, this.query = t.query, this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, this.readyState = "", this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this.forceNode = t.forceNode, this.extraHeaders = t.extraHeaders, this.localAddress = t.localAddress;}var i = n(2),s = n(3);t.exports = o, s(o.prototype), o.prototype.onError = function (t, e) {var n = new Error(t);return n.type = "TransportError", n.description = e, this.emit("error", n), this;}, o.prototype.open = function () {return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this;}, o.prototype.close = function () {return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this;}, o.prototype.send = function (t) {if ("open" !== this.readyState) throw new Error("Transport not open");this.write(t);}, o.prototype.onOpen = function () {this.readyState = "open", this.writable = !0, this.emit("open");}, o.prototype.onData = function (t) {var e = i.decodePacket(t, this.socket.binaryType);this.onPacket(e);}, o.prototype.onPacket = function (t) {this.emit("packet", t);}, o.prototype.onClose = function () {this.readyState = "closed", this.emit("close");};}, function (t, e, n) {function o(t) {var e = t && t.forceBase64;e && (this.supportsBinary = !1), this.perMessageDeflate = t.perMessageDeflate, i.call(this, t);}var i = n(9),s = n(2),r = n(14),a = n(33),c = n(42),p = n(1)("engine.io-client:websocket");t.exports = o, a(o, i), o.prototype.name = "wx", o.prototype.supportsBinary = !0, o.prototype.doOpen = function () {if (this.check()) {var t = this.uri(),e = { agent: this.agent, perMessageDeflate: this.perMessageDeflate };e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (e.headers = this.extraHeaders), this.localAddress && (e.localAddress = this.localAddress), this.isOk = !1, this.ws = wx, this.ws.connectSocket({ url: t }), void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners();}}, o.prototype.addEventListeners = function () {var t = this;this.ws.onSocketOpen(function () {t.onOpen(), t.isOk = !0;}), this.ws.onSocketClose(function () {t.onClose(), t.isOk = !1;}), this.ws.onSocketMessage(function (e) {t.onData(e.data);}), this.ws.onSocketError(function (e) {t.onError("websocket error", e);});}, o.prototype.write = function (t) {function e() {n.emit("flush"), setTimeout(function () {n.writable = !0, n.emit("drain");}, 0);}var n = this;this.writable = !1;for (var o = t.length, i = 0, r = o; i < r; i++) {!function (t) {s.encodePacket(t, n.supportsBinary, function (t) {try {n.ws.sendSocketMessage({ data: t });} catch (t) {p("websocket closed before onclose event");}--o || e();});}(t[i]);}}, o.prototype.onClose = function () {i.prototype.onClose.call(this);}, o.prototype.doClose = function () {"undefined" != typeof this.ws && this.ws.closeSocket();}, o.prototype.uri = function () {var t = this.query || {},e = this.secure ? "wss" : "ws",n = "";this.port && ("wss" === e && 443 !== Number(this.port) || "ws" === e && 80 !== Number(this.port)) && (n = ":" + this.port), this.timestampRequests && (t[this.timestampParam] = c()), this.supportsBinary || (t.b64 = 1), t = r.encode(t), t.length && (t = "?" + t);var o = this.hostname.indexOf(":") !== -1;return e + "://" + (o ? "[" + this.hostname + "]" : this.hostname) + n + this.path + t;}, o.prototype.check = function () {return !this.isOk;};}, function (t, e) {var n = [].slice;t.exports = function (t, e) {if ("string" == typeof e && (e = t[e]), "function" != typeof e) throw new Error("bind() requires a function");var o = n.call(arguments, 2);return function () {return e.apply(t, o.concat(n.call(arguments)));};};}, function (t, e) {var n = [].indexOf;t.exports = function (t, e) {if (n) return t.indexOf(e);for (var o = 0; o < t.length; ++o) {if (t[o] === e) return o;}return -1;};}, function (t, e) {t.exports = Array.isArray || function (t) {return "[object Array]" == Object.prototype.toString.call(t);};}, function (t, e) {e.encode = function (t) {var e = "";for (var n in t) {t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));}return e;}, e.decode = function (t) {for (var e = {}, n = t.split("&"), o = 0, i = n.length; o < i; o++) {var s = n[o].split("=");e[decodeURIComponent(s[0])] = decodeURIComponent(s[1]);}return e;};}, function (t, e) {var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,o = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];t.exports = function (t) {var e = t,i = t.indexOf("["),s = t.indexOf("]");i != -1 && s != -1 && (t = t.substring(0, i) + t.substring(i, s).replace(/:/g, ";") + t.substring(s, t.length));for (var r = n.exec(t || ""), a = {}, c = 14; c--;) {a[o[c]] = r[c] || "";}return i != -1 && s != -1 && (a.source = e, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"), a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), a.ipv6uri = !0), a;};}, function (t, e) {(function (e) {function n(t) {return e.Buffer && e.Buffer.isBuffer(t) || e.ArrayBuffer && t instanceof ArrayBuffer;}t.exports = n;}).call(e, function () {return this;}());}, function (t, e, n) {"use strict";var o = n(3),i = n(28),s = n(4),r = function r(t) {this.init(t);};r.prototype.init = function (t) {this.opts = t, this.dataCache = {}, this.memStore = {}, this.sync_key = 0, this.sync_type = 0, void 0 != this.client && this.client.close(), this.client = i(this.opts.address, { transports: ["websocket", "polling"] });var e = this,n = o.prototype.emit,s = this.client.onevent;this.client.onevent = function (t) {var o = t.data || [];s.call(e.client, t), n.apply(e.client, ["*"].concat(o));}, this.client.on("*", function (t, n) {e.onReceive(t, n);});}, r.prototype.onReceive = function (t, e) {if (this.opts.debug && __f__("log", "---<- event:%s, data:%s", t, JSON.stringify(e), " at libs\\wechat-jmessage.js:1"), t !== s.EVENTS.EVENT_NOTIFICATION && t !== s.EVENTS.MSG_SYNC && t !== s.EVENTS.SYNC_CONVERSATION && t !== s.EVENTS.SYNC_EVENT && t !== s.EVENTS.SYNC_RECEIPT && t !== s.EVENTS.RECEIPT_CHANGE && t !== s.ROOM_MSG_SYNC && t !== s.ROOM_MSG_SYNC_HIS) {var n = this.dataCache[e.rid];delete e.rid, n && (0 === e.code && t === s.EVENTS.GET_GROUP_MEMBERS ? e.member_list.forEach(function (t) {n.userInfoGet && n.userInfoGet(t.uid, t.mtime), delete t.uid, delete t.mtime;}) : 0 === e.code && t === s.EVENTS.GET_CONVERSATIONS ? e.conversations.forEach(function (t) {3 === t.type && (n.userInfoGet && n.userInfoGet(t.key, t.utime), delete t.utime);}) : 0 === e.code && t === s.EVENTS.GET_FRIEND_LIST ? e.friend_list.forEach(function (t) {n.userInfoGet && n.userInfoGet(t.uid, 1e3 * t.mtime), delete t.uid;}) : 0 === e.code && t === s.EVENTS.GET_BLACK_LIST && e.black_list.forEach(function (t) {delete t.uid;}), t === s.EVENTS.ACK ? (n.ack && n.ack({ rid: e.rid, data: n.data }), n.cleanAckTimeout()) : (n.cleanRespTimeout(), delete this.dataCache[n.rid], e.code && 0 !== e.code ? n.fail && n.fail(e) : t != s.EVENTS.S_SINGLE_TEXT_ && t != s.EVENTS.SEND_GROUP_MSG && t != s.EVENTS.SEND_ROOM_MSG ? n.hook ? n.hook(e, n.success) : n.success && n.success(e) : (n.data.msg_id = e.msg_id, t === s.EVENTS.S_SINGLE_TEXT_ && (e.target_username = n.data.content.target_id, e.appkey = n.data.appkey), n.success && n.success(e, n.data), n.innerCall && n.innerCall(e.msg_id))));}}, r.prototype.generateRid = function () {for (var t = Math.floor(Math.random() * -2147483646 + 2147483647); this.dataCache[t];) {t = Math.floor(Math.random() * -2147483646 + 2147483647);}return t;}, r.prototype.send = function (t, e) {this.opts.debug && __f__("log", "--->- event:%s, data:%s", t, JSON.stringify(e), " at libs\\wechat-jmessage.js:1"), this.client.emit(t, e);}, t.exports = r;}, function (t, e, n) {"use strict";var o = n(19);t.exports = o;}, function (t, e, n) {"use strict";var o = n(31),i = n(17),s = n(4),r = n(21),a = n(23),c = n(22),p = n(20)(),u = n(24),h = function h(t) {var e = t ? t : {};this.opts = { address: e.address ? e.address : s.WSS_ADDRESS, debug: !!e.debug }, this.channel = new i(this.opts), this.syncTask = 0, this.msgReceipTask = 0;};h.prototype.init = function (t) {var e = this;return e.autoDiscon = !0, t.flag !== s.SYNC_TYPE_OPEN && t.flag !== s.SYNC_TYPE_CLOSE || (e.channel.sync_type = t.flag), t.fromPlatForm = s.FROM_PLATFORM, new r(this.channel).setEvent(s.EVENTS.INIT).setData(t).send().addHook(function (n, o) {e.current_appkey = t.appkey, o && o(n);});}, h.prototype.loginOut = function () {if (this.current_user) {this.autoDiscon = !1, this.channel.client.close();var t = this.channel.dataCache;for (var e in t) {t[e].cleanAckTimeout(), t[e].cleanRespTimeout();}this.current_user = null, this.current_appkey = null, this.channel.init(this.channel.opts);}}, h.prototype.login = function (t) {this.__checkInit(), t.is_md5 || (t.password = p(t.password)), t.version = s.SDK_VERSION;var e = this,n = new r(this.channel).setEvent(s.EVENTS.LOGIN).setData(t).addHook(function (n, o) {e.current_user = t.username, u.StorageUtils.removeItems(e.current_user), e.channel.sync_key = 0, e.channel.sync_event_key = 0, e.channel.msg_receipt_key = 0, e.channel.ses_key = s.SESSION_KEY + e.current_appkey + "-" + e.current_user, e.channel.conversations_key = s.CONVERSATION_KEY + e.current_appkey + "-" + e.current_user, e.channel.event_key = s.EVENT_KEY + e.current_appkey + "-" + e.current_user, e._syncCheckTask(), e._receiptReportTask(), e._initConversation(), e.lastMsgs = {}, e.channel.client.removeListener(s.EVENTS.LOGIN), e._addEventListen(), e.firstLogin = !1, o && o(n);});return setTimeout(function () {n.send();}, 500), n;}, h.prototype._initConversation = function () {var t = this,e = u.StorageUtils.getItem(t.channel.conversations_key);null !== e && "" !== e || (e = JSON.stringify({}), u.StorageUtils.addItem(t.channel.conversations_key, e)), t.conversations = JSON.parse(e);}, h.prototype._receiptReportTask = function () {var t = this;t.report = [], t.msgReceipTask = setInterval(function () {t._receiptReport();}, s.RECEIPT_REPORT_INTERVAL);}, h.prototype._syncCheckTask = function () {var t = this,e = u.StorageUtils.getItem(t.channel.event_key);null != e && (t.channel.sync_event_key = e), t._syncCheck({ sync_key: t.channel.sync_key, sync_type: t.channel.sync_type, sync_event_key: t.channel.sync_event_key, msg_receipt_key: t.channel.msg_receipt_key }).onSuccess(function (e) {e && 0 === e.code && (t.channel.sync_key = e.sync_key, t.channel.sync_type = e.sync_type, t.channel.sync_event_key = e.sync_event_key, t.channel.msg_receipt_key = e.msg_receipt_key, u.StorageUtils.addItem(t.channel.event_key, e.sync_event_key));}), t.syncTask = setInterval(function () {t._syncCheck({ sync_key: t.channel.sync_key, sync_type: t.channel.sync_type, sync_event_key: t.channel.sync_event_key, msg_receipt_key: t.channel.msg_receipt_key }).onSuccess(function (e) {e && 0 === e.code && (t.channel.sync_key = e.sync_key, t.channel.sync_type = e.sync_type, t.channel.sync_event_key = e.sync_event_key, t.channel.msg_receipt_key = e.msg_receipt_key, u.StorageUtils.addItem(t.channel.event_key, e.sync_event_key));});}, s.SYNC_INTERVAL);}, h.prototype._syncCheck = function (t) {return new r(this.channel).setEvent(s.EVENTS.SYNC_CHECK).setData(t).send();}, h.prototype.register = function (t) {return this.__checkInit(), t.is_md5 || (t.password = p(t.password)), new r(this.channel).setEvent(s.EVENTS.REGISTER).setData(t).send();}, h.prototype.getUserInfo = function (t) {return this.__checkLogin(), u.StringUtils.isBlack(t.appkey) && (t.appkey = this.current_appkey), new r(this.channel).setEvent(s.EVENTS.GET_ACROSS_USER_INFO).setData(t).send();}, h.prototype.updateSelfInfo = function (t) {return this.__checkLogin(), u.StringUtils.isBlack(t.avatar) || delete t.avatar, new r(this.channel).setEvent(s.EVENTS.UPDATE_SELF_INFO).setData(t).send();}, h.prototype.updateSelfAvatar = function (t) {this.__checkLogin();var e = new r(this.channel).setEvent(s.EVENTS.UPDATE_SELF_INFO),n = this;return this.__uploadFile({ appkey: n.current_appkey, username: n.current_user, file: t.avatar, type: "image" }, function (t, n) {return t ? t.is_timeout ? e.timeout && e.timeout(t.data) : e.fail && e.fail(t.data) : void e.setData({ avatar: n.media_id }).send();}), e;}, h.prototype.updateSelfPwd = function (t) {return this.__checkLogin(), t.is_md5 || (t.old_pwd = p(t.old_pwd), t.new_pwd = p(t.new_pwd)), new r(this.channel).setEvent(s.EVENTS.UPDATE_SELF_PWD).setData(t).send();}, h.prototype.getConversation = function () {var t = this;return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.GET_CONVERSATIONS).setData({}).send().onUserInfoGet(function (e, n) {t[e] = n;}).addHook(function (e, n) {e.conversations.forEach(function (e) {var n;3 === e.type ? (t[e.key] = e.utime, delete e.utime, n = e.appkey + e.username) : (n = e.key, e.gid = e.key), t.conversations[n] ? (t.conversations[n].extras ? e.extras = t.conversations[n].extras : e.extras = {}, e.unread_msg_count = t.conversations[n].unread_msg_count) : (e.extras = {}, e.unread_msg_count = 0, t.conversations[n] = {}, t.conversations[n].extras = {}, t.conversations[n].unread_msg_count = 0, t.conversations[n].msg_time = []);}), u.StorageUtils.addItem(t.channel.conversations_key, JSON.stringify(t.conversations)), n && n(e);});}, h.prototype.resetUnreadCount = function (t) {this.__checkLogin();var e,n = this;t.gid ? e = String(t.gid) : (t.appkey || (t.appkey = n.current_appkey), e = t.appkey + t.username), n.conversations[e] = void 0 === n.conversations[e] ? {} : n.conversations[e], t.gid ? n._updateGroupUnreadCount({ gid: t.gid }) : n._updateSingleUnreadCount({ appkey: t.appkey, username: t.username }), n.conversations[e].unread_msg_count = 0, n.conversations[e].msg_time = [];var o = new Date().getTime();n.lastMsgs[e] && (o = n.lastMsgs[e].last_msg_time), n.conversations[e].recent_time = o, n.current_conversation = e, u.StorageUtils.addItem(n.channel.conversations_key, JSON.stringify(n.conversations));
    }, h.prototype.getUnreadMsgCnt = function (t) {this.__checkLogin();var e,n = this;return t.gid ? e = String(t.gid) : (t.appkey || (t.appkey = n.current_appkey), e = t.appkey + t.username), n.conversations[e] || (n.conversations[e] = {}), n.conversations[e] = void 0 === n.conversations[e] ? {} : n.conversations[e], n.conversations[e].unread_msg_count ? n.conversations[e].unread_msg_count : 0;}, h.prototype.msgRetract = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.MSG_RETRACT).setData(t).send();}, h.prototype.sendSingleMsg = function (t) {return this.__checkLogin(), this.__sendMsg({ type: "single", target_id: t.target_username, target_name: t.target_nickname, content: t.content, extras: t.extras, msg_body: t.msg_body, appkey: t.appkey, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt });}, h.prototype.sendGroupMsg = function (t) {return this.__checkLogin(), this.__sendMsg({ type: "group", target_id: t.target_gid, target_name: t.target_gname, content: t.content, extras: t.extras, msg_body: t.msg_body, at_list: t.at_list, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt });}, h.prototype.sendSinglePic = function (t) {return this.__checkLogin(), this.__sendPic({ type: "single", target_id: t.target_username, target_name: t.target_nickname, file: t.image, msg_body: t.msg_body, extras: t.extras, appkey: t.appkey, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt });}, h.prototype.sendGroupPic = function (t) {return this.__checkLogin(), this.__sendPic({ type: "group", target_id: t.target_gid, target_name: t.target_gname, file: t.image, msg_body: t.msg_body, extras: t.extras, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt });}, h.prototype.sendSingleFile = function (t) {return this.__sendVideoOrFile({ type: "single", target_id: t.target_username, target_name: t.target_nickname, file: t.file, msg_body: t.msg_body, extras: t.extras, appkey: t.appkey, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt }, "file");}, h.prototype.sendGroupFile = function (t) {return this.__sendVideoOrFile({ type: "group", target_id: t.target_gid, target_name: t.target_gname, file: t.file, msg_body: t.msg_body, extras: t.extras, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt }, "file");}, h.prototype.sendSingleVedio = function (t) {return this.__sendVideoOrFile({ type: "single", target_id: t.target_username, target_name: t.target_nickname, file: t.file, msg_body: t.msg_body, extras: t.extras, appkey: t.appkey, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt }, "video");}, h.prototype.sendGroupVedio = function (t) {return this.__sendVideoOrFile({ type: "group", target_id: t.target_gid, target_name: t.target_gname, file: t.file, msg_body: t.msg_body, extras: t.extras, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt }, "video");}, h.prototype.sendSingleLocation = function (t) {return this.__checkLogin(), this.__sendLocation({ type: "single", target_id: t.target_username, target_name: t.target_nickname, latitude: t.latitude, longitude: t.longitude, scale: t.scale, label: t.label, msg_body: t.msg_body, extras: t.extras, appkey: t.appkey, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt });}, h.prototype.sendGroupLocation = function (t) {return this.__checkLogin(), this.__sendLocation({ type: "group", target_id: t.target_gid, target_name: t.target_gname, latitude: t.latitude, longitude: t.longitude, scale: t.scale, label: t.label, msg_body: t.msg_body, extras: t.extras, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt });}, h.prototype.sendSingleCustom = function (t) {return this.__checkLogin(), this.__sendCustom({ type: "single", target_id: t.target_username, target_name: t.target_nickname, custom: t.custom, extras: t.extras, msg_body: t.msg_body, appkey: t.appkey, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt });}, h.prototype.sendGroupCustom = function (t) {return this.__checkLogin(), this.__sendCustom({ type: "group", target_id: t.target_gid, target_name: t.target_gname, custom: t.custom, msg_body: t.msg_body, extras: t.extras, no_offline: t.no_offline, no_notification: t.no_notification, custom_notification: t.custom_notification, need_receipt: t.need_receipt });}, h.prototype.createGroup = function (t) {this.__checkLogin();var e = this,n = new r(this.channel).setEvent(s.EVENTS.CREATE_GROUP);return t.avatar ? this.__uploadFile({ appkey: e.current_appkey, username: e.current_user, file: t.avatar, type: "image" }, function (e, o) {return e ? e.is_timeout ? n.timeout && n.timeout(e.data) : n.fail && n.fail(e.data) : (delete t.avatar, t.media_id = o.media_id, void n.setData(t).send());}) : n.setData(t).send(), n;}, h.prototype.exitGroup = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.EXIT_GROUP).setData(t).send();}, h.prototype.getGroups = function () {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.GET_GROUPS_LIST).setData({}).send().addHook(function (t, e) {t.group_list.forEach(function (t) {t.group_type = t.flag, delete t.flag;}), e && e(t);});}, h.prototype.getGroupInfo = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.GET_GROUP_INFO).setData(t).send().addHook(function (t, e) {t.group_info.group_type = t.group_info.flag, delete t.group_info.flag, e && e(t);});}, h.prototype.updateGroupInfo = function (t) {this.__checkLogin();var e = this,n = new r(this.channel).setEvent(s.EVENTS.UPDATE_GROUP_INFO);return t.avatar ? this.__uploadFile({ appkey: e.current_appkey, username: e.current_user, file: t.avatar, type: "image" }, function (e, o) {return e ? e.is_timeout ? n.timeout && n.timeout(e.data) : n.fail && n.fail(e.data) : (delete t.avatar, t.media_id = o.media_id, void n.setData(t).send());}) : n.setData(t).send(), n;}, h.prototype.getGroupMembers = function (t) {var e = this;return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.GET_GROUP_MEMBERS).setData(t).send().onUserInfoGet(function (t, n) {e[t] = n;});}, h.prototype.addGroupMembers = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.ADD_ACROSS_GROUP_MEMBER).setData(t).send();}, h.prototype.delGroupMembers = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.DEL_ACROSS_GROUP_MEMBER).setData(t).send();}, h.prototype.getNoDisturb = function () {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.NO_DISTURB).setData({ version: 0 }).send().addHook(function (t, e) {t.no_disturb.groups.forEach(function (t) {t.group_type = t.flag, delete t.flag;}), e && e(t);});}, h.prototype.addSingleNoDisturb = function (t) {return this.__checkLogin(), t.version = 0, new r(this.channel).setEvent(s.EVENTS.ADD_MSG_NO_DISTURB_SINGLE).setData(t).send();}, h.prototype.delSingleNoDisturb = function (t) {return this.__checkLogin(), t.version = 0, new r(this.channel).setEvent(s.EVENTS.DELETE_MSG_NO_DISTURB_SINGLE).setData(t).send();}, h.prototype.addGroupNoDisturb = function (t) {return this.__checkLogin(), t.version = 0, new r(this.channel).setEvent(s.EVENTS.ADD_MSG_NO_DISTURB_GROUP).setData(t).send();}, h.prototype.delGroupNoDisturb = function (t) {return this.__checkLogin(), t.version = 0, new r(this.channel).setEvent(s.EVENTS.DELETE_MSG_NO_DISTURB_GROUP).setData(t).send();}, h.prototype.addGlobalNoDisturb = function () {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.ADD_MSG_NO_DISTURB_GLOBAL).setData({ version: 0 }).send();}, h.prototype.delGlobalNoDisturb = function () {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.DELETE_MSG_NO_DISTURB_GLOBAL).setData({ version: 0 }).send();}, h.prototype.getBlacks = function () {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.GET_BLACK_LIST).setData({ version: 0 }).send();}, h.prototype.addSingleBlacks = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.ADD_BLACK_LIST).setData(t).send();}, h.prototype.delSingleBlacks = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.DEL_BLACK_LIST).setData(t).send();}, h.prototype.getFriendList = function () {var t = this;return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.GET_FRIEND_LIST).setData({}).send().onUserInfoGet(function (e, n) {t[e] = n;});}, h.prototype.addFriend = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.ADD_FRIEND).setData(t).send();}, h.prototype.acceptFriend = function (t) {return this.__checkLogin(), t.why = "yes", t.from_type = s.FRIEND_INVITED, new r(this.channel).setEvent(s.EVENTS.ADD_FRIEND).setData(t).send();}, h.prototype.declineFriend = function (t) {return this.__checkLogin(), t.why && "" != t.why.trim() || (t.why = "no"), t.from_type = s.FRIEND_INVITED, new r(this.channel).setEvent(s.EVENTS.ADD_FRIEND).setData(t).send();}, h.prototype.delFriend = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.DEL_FRIEND).setData(t).send();}, h.prototype.updateFriendMemo = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.UPDATE_FRIEND_MEMO).setData(t).send();}, h.prototype.addGroupShield = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.ADD_MSG_SHIELD_GROUP).setData(t).send();}, h.prototype.delGroupShield = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.DEL_MSG_SHIELD_GROUP).setData(t).send();}, h.prototype.groupShieldList = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.LIST_SHIELD_GROUP).setData(t).send().addHook(function (t, e) {t.groups.forEach(function (t) {t.group_type = t.flag, delete t.flag;}), e && e(t);});}, h.prototype.getResource = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.GET_RESOURCE).setData(t).send();}, h.prototype._updateGroupUnreadCount = function (t) {this.__checkLogin(), t.type = 4, new r(this.channel).setEvent(s.EVENTS.UNREAD_GROUP_COUNT).setData(t).send();}, h.prototype._updateSingleUnreadCount = function (t) {this.__checkLogin(), t.type = 3, new r(this.channel).setEvent(s.EVENTS.UNREAD_SINGLE_COUNT).setData(t).send();}, h.prototype.msgUnreadList = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.MSG_UNREAD_LIST).setData(t).send();}, h.prototype.addGroupReceiptReport = function (t) {this.__checkLogin();var e = this;if (!(t.msg_ids instanceof Array) || 0 === t.msg_ids.length) return void __f__("error", "msg_ids is not Array type or msg_ids size=0", " at libs\\wechat-jmessage.js:2");t.key = t.gid, t.type = 4;var n = new a(t);return e.report.push(n), setTimeout(function () {e._checkReportSize() >= s.RECEIPT_REPORT_MAX_SIZE && e._receiptReport();}, 50), n;}, h.prototype.addSingleReceiptReport = function (t) {this.__checkLogin();var e = this;if (!(t.msg_ids instanceof Array) || 0 === t.msg_ids.length) return void __f__("error", "msg_ids is not Array type or msg_ids size=0", " at libs\\wechat-jmessage.js:2");t.appkey || (t.appkey = e.current_appkey), t.type = 3, t.key = t.appkey + t.username;var n = new a(t);return e.report.push(n), setTimeout(function () {e._checkReportSize() >= s.RECEIPT_REPORT_MAX_SIZE && e._receiptReport();}, 50), n;}, h.prototype._checkReportSize = function () {var t = this,e = 0;return t.report.forEach(function (t) {e += t.args.msg_ids.length;}), e;}, h.prototype.transSingleMsg = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.TRANS_MSG_SINGLE).setData(t).send();}, h.prototype.transGroupMsg = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.TRANS_MSG_GROUP).setData(t).send();}, h.prototype.transPlatMsg = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.TRANS_MSG_PLATFORM).setData(t).send();}, h.prototype.updateConversation = function (t) {this.__checkLogin();var e = this;t.appkey || (t.appkey = e.current_appkey);var n;t.gid ? n = t.gid : t.username && (n = t.appkey + t.username), n && t.extras && (e.conversations[n] || (e.conversations[n] = {}), e.conversations[n].extras = t.extras), u.StorageUtils.addItem(e.channel.conversations_key, JSON.stringify(e.conversations));}, h.prototype.addGroupMemberResp = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.ADMIN_ADD_GROUP_MEMBER).setData(t).send();}, h.prototype.joinGroup = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.APPLY_JOIN_GROUP).setData(t).send();}, h.prototype.getAppkeyChatrooms = function (t) {return this.__checkLogin(), !t && (t = {}), new r(this.channel).setEvent(s.EVENTS.ROOM_LIST).setData(t).send().addHook(function (t, e) {t.result.rooms.forEach(function (t) {u.Cache.rooms[t.id] = t;}), e && e(t);});}, h.prototype.getSelfChatrooms = function () {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.ROOM_LIST_SELF).setData({}).send().addHook(function (t, e) {t.chat_rooms.forEach(function (t) {u.Cache.rooms[t.id] = t;}), e && e(t);});}, h.prototype.getChatroomInfo = function (t) {this.__checkLogin();var e = new r(this.channel);return u.Cache.rooms[t.id] ? setTimeout(function () {var n = {};n.code = 0, n.message = "success", n.info = u.Cache.rooms[t.id], e.cleanRespTimeout(), e.success && e.success(n);}, 100) : e.setEvent(s.EVENTS.ROOM_INFO).setData(t).send().addHook(function (t, e) {u.Cache.rooms[t.info.id] = t.info, e && e(t);}), e;}, h.prototype.enterChatroom = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.JOIN_ROOM).setData(t).send();}, h.prototype.exitChatroom = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.EXIT_ROOM).setData(t).send();}, h.prototype.sendChatroomMsg = function (t) {return this.__checkLogin(), t.target_rname || (t.target_rname = void 0 === u.Cache.rooms[t.target_rid] ? "" : u.Cache.rooms[t.target_rid].name), this.__sendMsg({ type: "chatroom", target_id: t.target_rid, target_name: t.target_rname, content: t.content, extras: t.extras, msg_body: t.msg_body });}, h.prototype.sendChatroomPic = function (t) {return this.__checkLogin(), t.target_rname || (t.target_rname = void 0 === u.Cache.rooms[t.target_rid] ? "" : u.Cache.rooms[t.target_rid].name), this.__sendPic({ type: "chatroom", target_id: t.target_rid, target_name: t.target_rname, file: t.image, extras: t.extras, msg_body: t.msg_body });}, h.prototype.sendChatroomFile = function (t) {return this.__checkLogin(), t.target_rname || (t.target_rname = void 0 === u.Cache.rooms[t.target_rid] ? "" : u.Cache.rooms[t.target_rid].name), this.__sendVideoOrFile({ type: "chatroom", target_id: t.target_rid, target_name: t.target_rname, file: t.file, extras: t.extras, msg_body: t.msg_body }, "file");}, h.prototype.sendChatroomVideo = function (t) {return this.__checkLogin(), t.target_rname || (t.target_rname = void 0 === u.Cache.rooms[t.target_rid] ? "" : u.Cache.rooms[t.target_rid].name), this.__sendVideoOrFile({ type: "chatroom", target_id: t.target_rid, target_name: t.target_rname, file: t.file, msg_body: t.msg_body, extras: t.extras }, "video");}, h.prototype.sendChatroomCustom = function (t) {return this.__checkLogin(), t.target_rname || (t.target_rname = void 0 === u.Cache.rooms[t.target_rid] ? "" : u.Cache.rooms[t.target_rid].name), this.__sendCustom({ type: "chatroom", target_id: t.target_rid, target_name: t.target_rname, custom: t.custom, extras: t.extras, msg_body: t.msg_body });}, h.prototype.sendChatroomLocation = function (t) {return this.__checkLogin(), t.target_rname || (t.target_rname = void 0 === u.Cache.rooms[t.target_rid] ? "" : u.Cache.rooms[t.target_rid].name), this.__sendLocation({ type: "chatroom", target_id: t.target_rid, target_name: t.target_rname, latitude: t.latitude, longitude: t.longitude, scale: t.scale, label: t.label, extras: t.extras, msg_body: t.msg_body });}, h.prototype.addGroupMemSilence = function (t) {return this.__checkLogin(), t.keep_silence = !0, new r(this.channel).setEvent(s.EVENTS.GROUP_MEM_SILENCE).setData(t).send();}, h.prototype.delGroupMemSilence = function (t) {return this.__checkLogin(), t.keep_silence = !1, new r(this.channel).setEvent(s.EVENTS.GROUP_MEM_SILENCE).setData(t).send();}, h.prototype.dissolveGroup = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.DISSOLVE_GROUP).setData(t).send();}, h.prototype.addGroupKeeper = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.ADD_GROUP_KEEPER).setData(t).send();}, h.prototype.delGroupKeeper = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.DEL_GROUP_KEEPER).setData(t).send();}, h.prototype.changeGroupAdmin = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.CHANGE_GROUP_ADMIN).setData(t).send();}, h.prototype.getAppkeyPublicGroups = function (t) {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.PUBLIC_GROUP_LIST).setData(t).send().addHook(function (t, e) {t.result.groups.forEach(function (t) {t.group_type = t.flag, delete t.flag;}), e && e(t);});}, h.prototype.isInit = function () {return !!this.current_appkey;}, h.prototype.isLogin = function () {return !!this.current_user;}, h.prototype.isConnect = function () {return !!this.channel.client.connected;}, h.prototype._addEventListen = function () {var t = this;t.channel.client.on(s.EVENTS.MSG_SYNC, function (e) {t._onMsgReceive(e);}), t.channel.client.on(s.EVENTS.EVENT_NOTIFICATION, function (e) {t._onEventNotification(e);}), t.channel.client.on(s.EVENTS.SYNC_CONVERSATION, function (e) {t._onSyncConversation(e);}), t.channel.client.on(s.EVENTS.SYNC_EVENT, function (e) {t._onSyncEvent(e);}), t.channel.client.on(s.EVENTS.SYNC_RECEIPT, function (e) {t._onSyncMsgReceipt(e);}), t.channel.client.on(s.EVENTS.RECEIPT_CHANGE, function (e) {t._onMsgReceiptChange(e);}), t.channel.client.on(s.EVENTS.TRANS_MSG_REC, function (e) {t._onTransMsgRec(e);}), t.channel.client.on(s.EVENTS.ROOM_MSG_SYNC, function (e) {t._onRoomMsg(e);}), t.channel.client.on(s.EVENTS.ROOM_MSG_SYNC_HIS, function (e) {t._onSyncRoomMsg(e);}), t.channel.client.on("disconnect", function () {t._onDisconnect();});}, h.prototype.onRoomMsg = function (t) {this._onRoomMsgFn = t;}, h.prototype._onRoomMsg = function (t) {this._onRoomMsgFn && this._onRoomMsgFn(t);}, h.prototype._onSyncRoomMsg = function (t) {var e = this;t.messages.forEach(function (n) {u.Cache.rooms[n.room_id] || e.getChatroomInfo({ id: t.room_id }), n.msgs && n.msgs.forEach(function (t) {e._onRoomMsgFn && e._onRoomMsgFn(t);});});}, h.prototype.onMsgReceive = function (t) {this._onMsgReceiveFn = t;}, h.prototype._onMsgReceive = function (t) {var e = [],n = this;Array.prototype.push.apply(e, t.messages.map(function (t) {return { msg_id: t.msg_id, msg_type: t.msg_type, from_uid: t.from_uid, from_gid: t.from_gid };})), t.messages.forEach(function (t) {if (t.content.sui_mtime && n[t.from_uid] && t.content.sui_mtime > new Date(n[t.from_uid]).getTime() / 1e3) {n[t.from_uid] = 1e3 * t.content.sui_mtime;var e = {};e.from_username = t.content.from_id, e.from_appkey = t.content.from_appkey, e.mtime = t.content.sui_mtime, delete t.content.sui_mtime, n._updateInfoEventFun && n._updateInfoEventFun(e);}var o;3 === t.msg_type ? (t.key = t.from_uid, t.from_username = t.content.from_id, t.from_appkey = t.content.from_appkey, o = t.from_appkey + t.from_username) : (t.key = t.from_gid, o = String(t.from_gid)), 0 === t.msg_level ? t.msg_level = "normal" : 1 === t.msg_level && (t.msg_level = "across");var i = !1;if (t.from_appkey === n.current_appkey && t.from_username === n.current_user) {i = !0;var a = void 0 === t.content.target_appkey || "" === t.content.target_appkey ? t.content.from_appkey : t.content.target_appkey;o = a + t.content.target_id;}n.lastMsgs[o] = { last_msg_time: t.ctime_ms }, n.conversations[o] || (n.conversations[o] = {}, n.conversations[o].extras = {}, n.conversations[o].unread_msg_count = 0, n.conversations[o].msg_time = []), n.current_conversation === o || i ? (n.conversations[o].recent_time = t.ctime_ms, n.conversations[o].unread_msg_count = 0, n.conversations[o].msg_time = []) : (n.conversations[o].unread_msg_count = n.conversations[o].unread_msg_count + 1, n.conversations[o].msg_time.push(t.ctime_ms)), new r(n.channel).setEvent(s.EVENTS.MSG_RECV_V2).setData({ msg_id: t.msg_id, msg_type: t.msg_type, from_uid: t.from_uid, from_gid: t.from_gid }).send();}), u.StorageUtils.addItem(n.channel.conversations_key, JSON.stringify(n.conversations)), this._onMsgReceiveFn && this._onMsgReceiveFn(t);}, h.prototype.onEventNotification = function (t) {this._onEventNotificationFn = t;}, h.prototype._onEventNotification = function (t) {var e = this;if (200 === t.event_type) return void (3 === t.description.type ? e._dealMutlReadEvent(t.description.type, t.ctime_ms, t.description.appkey, t.description.username) : e._dealMutlReadEvent(t.description.type, t.ctime_ms, t.description.gid));var n = e.__eventDateFilter(t);if (56 === t.event_type && 10 == t.extra ? (n.by_self = !1, delete n.extra) : 56 === t.event_type && 59 == t.extra && (n.by_self = !0, delete n.extra), 1 === t.event_type) {var o = { event_id: t.event_id, event_type: t.event_type, from_uid: t.from_uid, gid: t.gid };new r(e.channel).setEvent(s.EVENTS.EVENT_NOTIFICATION).setData(o).send();}e._onEventNotificationFn && e._onEventNotificationFn(n), s.LOGIN_OUT_EVENT.indexOf(t.event_type) != -1 && e.loginOut();}, h.prototype.onSyncConversation = function (t) {this._onSyncConversationFn = t;}, h.prototype._onSyncConversation = function (t) {var e = this;e.channel.sync_key = t.sync_key, t.messages && (t.messages.forEach(function (t) {var n,o = 0;n = 3 === t.msg_type ? t.from_appkey + t.from_username : String(t.from_gid);var i = t.msgs[t.msgs.length - 1].ctime_ms;if (e.current_conversation === n) e.conversations[n] = void 0 === e.conversations[n] ? {} : e.conversations[n], e.conversations[n].unread_msg_count = o, e.conversations[n].recent_time = i, e.conversations[n].msg_time = [];else if (e.conversations[n] && e.conversations[n].recent_time) {var r = e.conversations[n].recent_time;t.msgs.forEach(function (t) {t.ctime_ms <= r || t.content.from_appkey === e.current_appkey && t.content.from_id === e.current_user ? (o = 0, e.conversations[n].msg_time = []) : (o++, e.conversations[n].msg_time.push(t.ctime_ms));}), e.channel.sync_type === s.SYNC_TYPE_OPEN ? e.conversations[n].unread_msg_count = o : e.conversations[n].unread_msg_count += o;} else o = t.unsync_count, e.conversations[n] = void 0 === e.conversations[n] ? {} : e.conversations[n], e.conversations[n].unread_msg_count = o, t.msgs.length - 1 - o < 0 ? e.conversations[n].recent_time = -1 : e.conversations[n].recent_time = t.msgs[t.msgs.length - 1 - o].ctime_ms, e.conversations[n].msg_time = [];e.lastMsgs[n] = { last_msg_time: i }, delete t.unsync_count, t.unread_msg_count = o;}), u.StorageUtils.addItem(e.channel.conversations_key, JSON.stringify(e.conversations)), e._onSyncConversationFn && t.messages.length > 0 && e._onSyncConversationFn(t.messages));var n = { sync_key: e.channel.sync_key };new r(e.channel).setEvent(s.EVENTS.SYNC_CONVERSATION_ACK).setData(n).send();}, h.prototype.onSyncEvent = function (t) {this._onSyncEventFn = t;}, h.prototype._onSyncEvent = function (t) {var e = this;e.channel.sync_event_key = t.sync_key, u.StorageUtils.addItem(e.channel.event_key, t.sync_key);var n = { sync_key: e.channel.sync_event_key };new r(e.channel).setEvent(s.EVENTS.SYNC_EVENT_ACK).setData(n).send(), setTimeout(function () {if (e._onSyncEventFn && t.events && t.events.length > 0) {var n = [];t.events.forEach(function (o) {if (200 === o.event_type) 3 === o.description.type ? e._dealMutlReadEvent(o.description.type, o.ctime_ms, o.description.appkey, o.description.username) : e._dealMutlReadEvent(o.description.type, o.ctime_ms, o.description.gid);else {var i = e.__eventDateFilter(o);56 === t.event_type && 10 == t.extra ? (delete i.extra, i.by_self = !1) : 56 === t.event_type && 59 == t.extra && (delete i.extra, i.by_self = !0), n.push(i);}}), e._onSyncEventFn(n);}}, 1700);}, h.prototype.onSyncMsgReceipt = function (t) {this._onSyncMsgReceiptFn = t;}, h.prototype._onSyncMsgReceipt = function (t) {var e = this;if (e.channel.msg_receipt_key = t.sync_key, e._onSyncMsgReceiptFn && t.receipts && t.receipts.length > 0) {var n = {},o = [];t.receipts.forEach(function (t) {var e = t.gid;if (3 === t.type && (e = t.appkey + t.username), n[e]) {var i = Number(n[e]);Array.prototype.push.apply(o[i].receipt_msgs, t.receipt_msgs);} else t.receipt_msgs.length > 0 && (n[e] = String(o.length), o.push(t));}), setTimeout(function () {e._onSyncMsgReceiptFn && o.length > 0 && e._onSyncMsgReceiptFn(o);}, 1500);}var i = { sync_key: e.channel.msg_receipt_key };new r(e.channel).setEvent(s.EVENTS.SYNC_RECEIPT_ACK).setData(i).send();}, h.prototype.onMsgReceiptChange = function (t) {this._onMsgReceiptChangeFn = t;}, h.prototype._onMsgReceiptChange = function (t) {this._onMsgReceiptChangeFn && this._onMsgReceiptChangeFn(t);}, h.prototype.onUserInfUpdate = function (t) {this._updateInfoEventFun = t;}, h.prototype.onMutiUnreadMsgUpdate = function (t) {this._conversationUpdateFun = t;}, h.prototype.onTransMsgRec = function (t) {this._onTransMsgRecFn = t;}, h.prototype._onTransMsgRec = function (t) {this._onTransMsgRecFn && this._onTransMsgRecFn(t);}, h.prototype.onDisconnect = function (t) {this._onDisconnectFn = t;}, h.prototype._onDisconnect = function () {var t = this;clearTimeout(t.syncTask), clearTimeout(t.msgReceipTask), t.autoDiscon && (t.current_appkey = null, t.current_user = null, t._onDisconnectFn && t._onDisconnectFn()), this.channel.init(this.channel.opts);}, h.prototype._dealMutlReadEvent = function (t, e, n, o) {var i,s = this,r = {};if (r.type = t, 3 === t ? (i = n + o, r.username = o, r.appkey = n) : (i = String(n), r.gid = n), s.conversations[i] = void 0 === s.conversations[i] ? { msg_time: [], unread_msg_count: 0 } : s.conversations[i], s.conversations[i].recent_time = e, s.current_conversation === i) s.conversations[i].unread_msg_count = 0, s.conversations[i].msg_time = [];else {var a = s.conversations[i].unread_msg_count,c = s.conversations[i].msg_time,p = [],h = 0;c.forEach(function (t) {t > e && (h++, p.push(t));}), s.conversations[i].msg_time = p, h < a && (s.conversations[i].unread_msg_count = h, r.unreadCount = h, u.StorageUtils.addItem(s.channel.conversations_key, JSON.stringify(s.conversations)), s._conversationUpdateFun && s._conversationUpdateFun(r));}}, h.prototype._receiptReport = function () {var t = this;if (t.report.length > 0) {var e = {},n = [];t.report.forEach(function (t) {if (e[t.args.key]) {var o = Number(e[t.args.key]);Array.prototype.push.apply(n[o].result.msg_ids, t.args.msg_ids), n[o].msg_reports.push(t);} else e[t.args.key] = String(n.length), n.push({ result: t.args, msg_reports: [t] });}), t.report = [];for (var o = 0; o < n.length; o++) {n[o].result.msg_ids = u.ArrayUtils.delRepeatItem(n[o].result.msg_ids), delete n[o].result.key, t._msgReceipt(n[o]);}}}, h.prototype._msgReceipt = function (t) {new r(this.channel).setEvent(s.EVENTS.RECEIPT_REPORT).setData({ sessions: [t.result] }).send().onSuccess(function (e) {t.msg_reports.forEach(function (t) {t.success && t.success(e, t.args.msg_ids);});}).onFail(function (e) {t.msg_reports.forEach(function (t) {t.fail && t.fail(e, t.args.msg_ids);});}).onAck(function (e) {t.msg_reports.forEach(function (t) {t.ack && t.ack(e, t.args.msg_ids);});}).onTimeout(function (e) {t.msg_reports.forEach(function (t) {t.timeout && t.timeout(e, t.args.msg_ids);});});}, h.prototype.__eventDateFilter = function (t) {var e = {};return e.event_id = t.event_id, e.event_type = t.event_type, e.from_username = t.from_username, e.gid = t.gid, e.to_usernames = t.to_usernames, e.ctime = t.ctime, e.extra = t.extra, e.return_code = t.return_code, e.from_appkey = t.from_appkey, e.msg_ids = t.msg_ids, e.from_gid = t.from_gid, e.msgid_list = t.msgid_list, e.to_groups = t.to_groups, e.new_owner = t.new_owner, e.group_name = t.group_name, e.ctime_ms = t.ctime_ms, e.media_id = t.media_id, e.from_nickname = t.from_nickname, e.from_eventid = t.from_eventid, 100 === t.event_type && 7 === t.extra ? e.description = JSON.parse(t.description) : e.description = t.description, 55 === t.event_type && 0 === t.from_gid ? e.type = 0 : 55 === t.event_type && 0 != t.from_gid && (e.type = 1), e;}, h.prototype.__checkConnect = function () {if (!this.channel.client.connected) throw new Error("wss socket not connect");}, h.prototype.__checkInit = function () {if (!this.current_appkey) throw new Error("必须执行init操作后能执行此动作");}, h.prototype.__checkLogin = function () {if (!this.current_user) throw new Error("必须执行login操作后能执行此动作");}, h.prototype.__getUploadToken = function () {return this.__checkLogin(), new r(this.channel).setEvent(s.EVENTS.GET_UPLOAD_TOKEN).setData({}).send();}, h.prototype.__uploadFile0 = function (t, e) {wx.uploadFile({ url: s.UPLOAD_FILE + "?type=" + t.type, filePath: t.file, name: "file", header: { "X-App-Key": t.appkey, Authorization: "Basic " + o.btoa(t.username + ":" + t.token), "jm-channel": s.PLAT_CHANNEL }, success: function success(t) {if (200 == t.statusCode) e(null, JSON.parse(t.data));else try {var n = JSON.parse(t.data);e(898061 === n.error.code ? { code: 880210, message: "file size exceed limit" } : n);} catch (t) {e({ code: 880210, message: "file size exceed the limit" });}}, fail: function fail(t) {__f__("error", JSON.parse(t), " at libs\\wechat-jmessage.js:2");} });}, h.prototype.__uploadFile = function (t, e) {var n = this;n.__getUploadToken().onSuccess(function (o) {n.__uploadFile0({ type: t.type, file: t.file, appkey: t.appkey, username: t.username, token: o.uptoken }, e);}).onFail(function (t) {e({ data: t });}).onTimeout(function (t) {e({ is_timeout: !0, data: t });});}, h.prototype.__sendMsg = function (t) {return this.__checkLogin(), new r(this.channel).setEvent("single" === t.type ? s.EVENTS.S_SINGLE_TEXT : "group" === t.type ? s.EVENTS.SEND_GROUP_MSG : s.EVENTS.SEND_ROOM_MSG).setData(new c(this.current_user, this.current_appkey).setType(t.type).setAppkey(t.appkey).setNeedReceipt(t.need_receipt).setTarget(t.target_id, t.target_name).setText(t.content ? t.content : t.msg_body.text, t.content ? t.extras : t.msg_body.extras).setAtList(t.at_list).setNoOffline(t.no_offline === !0).setNoNotification(t.no_notification === !0).setCustomNotification(t.custom_notification).build()).send();}, h.prototype.__sendPic = function (t) {this.__checkLogin();var e = new r(this.channel).setEvent("single" === t.type ? s.EVENTS.S_SINGLE_TEXT : "group" === t.type ? s.EVENTS.SEND_GROUP_MSG : s.EVENTS.SEND_ROOM_MSG),n = this,o = new c(n.current_user, n.current_appkey).setType(t.type).setAppkey(t.appkey).setNeedReceipt(t.need_receipt).setTarget(t.target_id, t.target_name).setNoOffline(t.no_offline === !0).setNoNotification(t.no_notification === !0).setCustomNotification(t.custom_notification);return t.file ? this.__uploadFile({ appkey: n.current_appkey, username: n.current_user, file: t.file, type: "image" }, function (n, i) {return n ? n.is_timeout ? e.timeout && e.timeout(n.data) : e.fail && e.fail(n.data) : void e.setData(o.setImage(i, t.extras).build()).send();}) : e.setData(o.setImage(t.msg_body, t.msg_body.extras).build()).send(), e;}, h.prototype.__sendVideoOrFile = function (t, e) {this.__checkLogin();var n = new r(this.channel).setEvent("single" === t.type ? s.EVENTS.S_SINGLE_TEXT : "group" === t.type ? s.EVENTS.SEND_GROUP_MSG : s.EVENTS.SEND_ROOM_MSG),o = this,i = new c(o.current_user, o.current_appkey).setType(t.type).setAppkey(t.appkey).setNeedReceipt(t.need_receipt).setTarget(t.target_id, t.target_name).setNoOffline(t.no_offline === !0).setNoNotification(t.no_notification === !0).setCustomNotification(t.custom_notification);return t.file ? this.__uploadFile({ appkey: o.current_appkey, username: o.current_user, file: t.file, type: "file" }, function (o, s) {return o ? o.is_timeout ? n.timeout && n.timeout(o.data) : n.fail && n.fail(o.data) : ("video" === e && (!t.extras && (t.extras = {}), t.extras.video = s.media_id.slice(s.media_id.lastIndexOf(".") + 1)), void n.setData(i.setFile(s, t.extras).build()).send());}) : n.setData(i.setFile(t.msg_body, t.msg_body.extras).build()).send(), n;}, h.prototype.__sendVoice = function (t) {this.__checkLogin();var e = new r(this.channel).setEvent("single" === t.type ? s.EVENTS.S_SINGLE_TEXT : s.EVENTS.SEND_GROUP_MSG),n = this,o = new c(n.current_user, n.current_appkey).setType(t.type).setAppkey(t.appkey).setNeedReceipt(t.need_receipt).setTarget(t.target_id, t.target_name).setNoOffline(t.no_offline === !0).setNoNotification(t.no_notification === !0).setCustomNotification(t.custom_notification);return t.file ? this.__uploadFile({ appkey: n.current_appkey, username: n.current_user, file: t.file, type: "voice" }, function (n, i) {return n ? n.is_timeout ? e.timeout && e.timeout(n.data) : e.fail && e.fail(n.data) : void e.setData(o.setVoice(i, t.extras).build()).send();}) : e.setData(o.setVoice(t.msg_body, t.msg_body.extras).build()).send(), e;}, h.prototype.__sendLocation = function (t) {return this.__checkLogin(), new r(this.channel).setEvent("single" === t.type ? s.EVENTS.S_SINGLE_TEXT : "group" === t.type ? s.EVENTS.SEND_GROUP_MSG : s.EVENTS.SEND_ROOM_MSG).setData(new c(this.current_user, this.current_appkey).setType(t.type).setAppkey(t.appkey).setNeedReceipt(t.need_receipt).setTarget(t.target_id, t.target_name).setLocation(t.latitude ? t : t.msg_body, t.latitude ? t.extras : t.msg_body.extras).setNoOffline(t.no_offline === !0).setNoNotification(t.no_notification === !0).setCustomNotification(t.custom_notification).build()).send();}, h.prototype.__sendCustom = function (t) {return this.__checkLogin(), new r(this.channel).setEvent("single" === t.type ? s.EVENTS.S_SINGLE_TEXT : "group" === t.type ? s.EVENTS.SEND_GROUP_MSG : s.EVENTS.SEND_ROOM_MSG).setData(new c(this.current_user, this.current_appkey).setType(t.type).setAppkey(t.appkey).setNeedReceipt(t.need_receipt).setTarget(t.target_id, t.target_name).setCustom(t.custom ? t.custom : t.msg_body, t.custom ? t.extras : t.msg_body.extras).setCustom(t.custom).setNoOffline(t.no_offline === !0).setNoNotification(t.no_notification === !0).setCustomNotification(t.custom_notification).build()).send();
    }, t.exports = h;}, function (t, e) {"use strict";t.exports = function () {function t(t, e) {var n = (65535 & t) + (65535 & e),o = (t >> 16) + (e >> 16) + (n >> 16);return o << 16 | 65535 & n;}function e(t, e) {return t << e | t >>> 32 - e;}function n(n, o, i, s, r, a) {return t(e(t(t(o, n), t(s, a)), r), i);}function o(t, e, o, i, s, r, a) {return n(e & o | ~e & i, t, e, s, r, a);}function i(t, e, o, i, s, r, a) {return n(e & i | o & ~i, t, e, s, r, a);}function s(t, e, o, i, s, r, a) {return n(e ^ o ^ i, t, e, s, r, a);}function r(t, e, o, i, s, r, a) {return n(o ^ (e | ~i), t, e, s, r, a);}function a(e, n) {e[n >> 5] |= 128 << n % 32, e[(n + 64 >>> 9 << 4) + 14] = n;var a,c,p,u,h,_ = 1732584193,f = -271733879,d = -1732584194,l = 271733878;for (a = 0; a < e.length; a += 16) {c = _, p = f, u = d, h = l, _ = o(_, f, d, l, e[a], 7, -680876936), l = o(l, _, f, d, e[a + 1], 12, -389564586), d = o(d, l, _, f, e[a + 2], 17, 606105819), f = o(f, d, l, _, e[a + 3], 22, -1044525330), _ = o(_, f, d, l, e[a + 4], 7, -176418897), l = o(l, _, f, d, e[a + 5], 12, 1200080426), d = o(d, l, _, f, e[a + 6], 17, -1473231341), f = o(f, d, l, _, e[a + 7], 22, -45705983), _ = o(_, f, d, l, e[a + 8], 7, 1770035416), l = o(l, _, f, d, e[a + 9], 12, -1958414417), d = o(d, l, _, f, e[a + 10], 17, -42063), f = o(f, d, l, _, e[a + 11], 22, -1990404162), _ = o(_, f, d, l, e[a + 12], 7, 1804603682), l = o(l, _, f, d, e[a + 13], 12, -40341101), d = o(d, l, _, f, e[a + 14], 17, -1502002290), f = o(f, d, l, _, e[a + 15], 22, 1236535329), _ = i(_, f, d, l, e[a + 1], 5, -165796510), l = i(l, _, f, d, e[a + 6], 9, -1069501632), d = i(d, l, _, f, e[a + 11], 14, 643717713), f = i(f, d, l, _, e[a], 20, -373897302), _ = i(_, f, d, l, e[a + 5], 5, -701558691), l = i(l, _, f, d, e[a + 10], 9, 38016083), d = i(d, l, _, f, e[a + 15], 14, -660478335), f = i(f, d, l, _, e[a + 4], 20, -405537848), _ = i(_, f, d, l, e[a + 9], 5, 568446438), l = i(l, _, f, d, e[a + 14], 9, -1019803690), d = i(d, l, _, f, e[a + 3], 14, -187363961), f = i(f, d, l, _, e[a + 8], 20, 1163531501), _ = i(_, f, d, l, e[a + 13], 5, -1444681467), l = i(l, _, f, d, e[a + 2], 9, -51403784), d = i(d, l, _, f, e[a + 7], 14, 1735328473), f = i(f, d, l, _, e[a + 12], 20, -1926607734), _ = s(_, f, d, l, e[a + 5], 4, -378558), l = s(l, _, f, d, e[a + 8], 11, -2022574463), d = s(d, l, _, f, e[a + 11], 16, 1839030562), f = s(f, d, l, _, e[a + 14], 23, -35309556), _ = s(_, f, d, l, e[a + 1], 4, -1530992060), l = s(l, _, f, d, e[a + 4], 11, 1272893353), d = s(d, l, _, f, e[a + 7], 16, -155497632), f = s(f, d, l, _, e[a + 10], 23, -1094730640), _ = s(_, f, d, l, e[a + 13], 4, 681279174), l = s(l, _, f, d, e[a], 11, -358537222), d = s(d, l, _, f, e[a + 3], 16, -722521979), f = s(f, d, l, _, e[a + 6], 23, 76029189), _ = s(_, f, d, l, e[a + 9], 4, -640364487), l = s(l, _, f, d, e[a + 12], 11, -421815835), d = s(d, l, _, f, e[a + 15], 16, 530742520), f = s(f, d, l, _, e[a + 2], 23, -995338651), _ = r(_, f, d, l, e[a], 6, -198630844), l = r(l, _, f, d, e[a + 7], 10, 1126891415), d = r(d, l, _, f, e[a + 14], 15, -1416354905), f = r(f, d, l, _, e[a + 5], 21, -57434055), _ = r(_, f, d, l, e[a + 12], 6, 1700485571), l = r(l, _, f, d, e[a + 3], 10, -1894986606), d = r(d, l, _, f, e[a + 10], 15, -1051523), f = r(f, d, l, _, e[a + 1], 21, -2054922799), _ = r(_, f, d, l, e[a + 8], 6, 1873313359), l = r(l, _, f, d, e[a + 15], 10, -30611744), d = r(d, l, _, f, e[a + 6], 15, -1560198380), f = r(f, d, l, _, e[a + 13], 21, 1309151649), _ = r(_, f, d, l, e[a + 4], 6, -145523070), l = r(l, _, f, d, e[a + 11], 10, -1120210379), d = r(d, l, _, f, e[a + 2], 15, 718787259), f = r(f, d, l, _, e[a + 9], 21, -343485551), _ = t(_, c), f = t(f, p), d = t(d, u), l = t(l, h);}return [_, f, d, l];}function c(t) {var e,n = "";for (e = 0; e < 32 * t.length; e += 8) {n += String.fromCharCode(t[e >> 5] >>> e % 32 & 255);}return n;}function p(t) {var e,n = [];for (n[(t.length >> 2) - 1] = void 0, e = 0; e < n.length; e += 1) {n[e] = 0;}for (e = 0; e < 8 * t.length; e += 8) {n[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32;}return n;}function u(t) {return c(a(p(t), 8 * t.length));}function h(t, e) {var n,o,i = p(t),s = [],r = [];for (s[15] = r[15] = void 0, i.length > 16 && (i = a(i, 8 * t.length)), n = 0; n < 16; n += 1) {s[n] = 909522486 ^ i[n], r[n] = 1549556828 ^ i[n];}return o = a(s.concat(p(e)), 512 + 8 * e.length), c(a(r.concat(o), 640));}function _(t) {var e,n,o = "0123456789abcdef",i = "";for (n = 0; n < t.length; n += 1) {e = t.charCodeAt(n), i += o.charAt(e >>> 4 & 15) + o.charAt(15 & e);}return i;}function f(t) {return unescape(encodeURIComponent(t));}function d(t) {return u(f(t));}function l(t) {return _(d(t));}function g(t, e) {return h(f(t), f(e));}function m(t, e) {return _(g(t, e));}function y(t, e, n) {return e ? n ? g(e, t) : m(e, t) : n ? d(t) : l(t);}return y;};}, function (t, e, n) {"use strict";var o = n(4),i = function i(t) {this.channel = t, this.rid = this.channel.generateRid(), this.times = 1;};i.prototype.setEvent = function (t) {return this.event = t, this;}, i.prototype.setData = function (t) {return this.data = t, this;}, i.prototype.onSuccess = function (t) {return "function" == typeof t && (this.success = t), this;}, i.prototype.onFail = function (t) {return "function" == typeof t && (this.fail = t), this;}, i.prototype.onTimeout = function (t) {if ("function" == typeof t) {this.timeout = t;var e = this;this.respTimeoutTaskId = setTimeout(function () {e.respTimeoutTask();}, o.RESP_TIMEOUT);}return this;}, i.prototype.onAck = function (t) {return "function" == typeof t && (this.ack = t), this;}, i.prototype.onInnerCall = function (t) {return "function" == typeof t && (this.innerCall = t), this;}, i.prototype.onUserInfoGet = function (t) {return "function" == typeof t && (this.userInfoGet = t), this;}, i.prototype.addHook = function (t) {return "function" == typeof t && (this.hook = t), this;}, i.prototype.ackTimeoutTask = function () {if (this.times < o.RETRY_TIMES) {this.channel.send(this.event, this._data), this.times++;var t = this;this.ackTimeoutTaskId = setTimeout(function () {t.ackTimeoutTask();}, o.ACK_TIMEOUT);} else this.timeout && this.timeout({ rid: this.rid, data: this.data, response_timeout: !1 }), delete this.channel.dataCache[this.rid];return this;}, i.prototype.respTimeoutTask = function () {if (this.times < o.RETRY_TIMES) {this.channel.send(this.event, this._data), this.times++;var t = this;this.respTimeoutTaskId = setTimeout(function () {t.respTimeoutTask();}, o.RESP_TIMEOUT);} else this.timeout && this.timeout({ rid: this.rid, data: this.data, response_timeout: !0 }), delete this.channel.dataCache[this.rid];return this;}, i.prototype.cleanAckTimeout = function () {return this.ackTimeoutTaskId && clearTimeout(this.ackTimeoutTaskId), this;}, i.prototype.cleanRespTimeout = function () {return this.respTimeoutTaskId && clearTimeout(this.respTimeoutTaskId), this;}, i.prototype.send = function () {if (!this.event || !this.data) return void __f__("error", "发send fail，event and data can not empty", " at libs\\wechat-jmessage.js:3");var t = this;return this.ackTimeoutTaskId = setTimeout(function () {t.ackTimeoutTask();}, o.ACK_TIMEOUT), this._data = JSON.parse(JSON.stringify(this.data)), this._data.rid = this.rid, this.channel.send(this.event, this._data), this.channel.dataCache[this.rid] = this, this;}, t.exports = i;}, function (t, e) {"use strict";var n = function n(t, e) {this.current_user = t, this.current_appkey = e, this.version = 1, this.from_platform = "web";};n.prototype.setNeedReceipt = function (t) {return this.need_receipt = t, this;}, n.prototype.setNoOffline = function (t) {return this.no_offline = t, this;}, n.prototype.setNoNotification = function (t) {return this.no_notification = t, this;}, n.prototype.setType = function (t) {return this.type = t, this;}, n.prototype.setAtList = function (t) {return this.at_list = t, this;}, n.prototype.setAppkey = function (t) {return t && (this.appkey = t), this;}, n.prototype.setTarget = function (t, e) {return this.target_id = t.toString(), this.target_name = e, this;}, n.prototype.setFromName = function (t) {return this.from_name = t, this;}, n.prototype.setText = function (t, e) {return this.msg_type = "text", this.msg_body = { text: t }, e && (this.msg_body.extras = e), this;}, n.prototype.setImage = function (t, e) {return this.msg_type = "image", this.msg_body = { media_id: t.media_id, media_crc32: t.media_crc32, width: t.width, height: t.height, format: t.format, fsize: t.fsize }, e && (this.msg_body.extras = e), this;}, n.prototype.setFile = function (t, e) {return this.msg_type = "file", this.msg_body = { media_id: t.media_id, media_crc32: t.media_crc32, hash: t.hash, fsize: t.fsize, fname: t.fname }, e && (this.msg_body.extras = e), this;}, n.prototype.setVoice = function (t, e) {return this.msg_type = "voice", this.msg_body = { media_id: t.media_id, media_crc32: t.media_crc32, hash: t.hash, fsize: t.fsize, duration: t.duration, format: t.format }, e && (this.msg_body.extras = e), this;}, n.prototype.setCustomNotification = function (t) {return t && (this.custom_notification = t), this;}, n.prototype.setLocation = function (t, e) {return this.msg_type = "location", this.msg_body = { latitude: t.latitude, longitude: t.longitude, scale: t.scale, label: t.label }, e && (this.msg_body.extras = e), this;}, n.prototype.setCustom = function (t) {return this.msg_type = "custom", this.msg_body = t, this;}, n.prototype.build = function () {var t = this.current_user;if ("single" != this.type && "group" != this.type && "across_single" != this.type && "chatroom" != this.type) return __f__("log", "type must be single or group or chatroom", " at libs\\wechat-jmessage.js:3");if (!this.target_id) return __f__("error", "target_id must not null", " at libs\\wechat-jmessage.js:3");if ("text" == this.msg_type) {if (!this.msg_body.text && this.at_list && "single" != this.type) this.msg_body.text = " ";else if (!this.msg_body.text && !this.at_list) return __f__("error", "未设置文本消息内容", " at libs\\wechat-jmessage.js:3");} else if ("custom" == this.msg_type) {if (!this.msg_body) return __f__("error", "custom对象不能为空", " at libs\\wechat-jmessage.js:3");} else if ("image" == this.msg_type) {if (!this.msg_body.media_id) return __f__("error", "未设置image消息media_id字段", " at libs\\wechat-jmessage.js:3");if (!this.msg_body.media_crc32) return __f__("error", "未设置image消息media_crc32字段", " at libs\\wechat-jmessage.js:3");if (!this.msg_body.width) return __f__("error", "未设置image消息width字段", " at libs\\wechat-jmessage.js:3");if (!this.msg_body.height) return __f__("error", "未设置image消息height字段", " at libs\\wechat-jmessage.js:3");} else if ("file" == this.msg_type) {if (!this.msg_body.media_id) return __f__("error", "未设置file消息media_id字段", " at libs\\wechat-jmessage.js:3");if (!this.msg_body.media_crc32) return __f__("error", "未设置file消息media_crc32字段", " at libs\\wechat-jmessage.js:3");if (!this.msg_body.fsize) return __f__("error", "未设置file消息fsize字段", " at libs\\wechat-jmessage.js:3");if (!this.msg_body.fname) return __f__("error", "未设置file消息fname字段", " at libs\\wechat-jmessage.js:3");} else if ("location" == this.msg_type) {if (!this.msg_body.latitude) return __f__("error", "未设置location消息latitude字段", " at libs\\wechat-jmessage.js:3");if (!this.msg_body.longitude) return __f__("error", "未设置location消息longitude字段", " at libs\\wechat-jmessage.js:3");if (!this.msg_body.scale) return __f__("error", "未设置location消息scale字段", " at libs\\wechat-jmessage.js:3");if (!this.msg_body.label) return __f__("error", "未设置location消息label字段", " at libs\\wechat-jmessage.js:3");} else {if ("voice" != this.msg_type) return __f__("error", "请设置合法的msg_type", " at libs\\wechat-jmessage.js:3");if (!this.msg_body.media_id) return __f__("error", "未设置voice消息media_id字段", " at libs\\wechat-jmessage.js:3");if (!this.msg_body.media_crc32) return __f__("error", "未设置voice消息media_crc32字段", " at libs\\wechat-jmessage.js:3");}var e = { version: this.version, target_type: this.type, from_platform: this.from_platform, target_id: this.target_id, target_name: this.target_name, from_id: t, from_name: this.from_name, create_time: new Date().getTime(), msg_type: this.msg_type, msg_body: this.msg_body };this.appkey && (e.target_appkey = this.appkey, e.from_appkey = this.current_appkey);var n = { content: e };if (n.no_offline = this.no_offline, n.no_notification = this.no_notification, n.custom_notification = this.custom_notification, n.target_name = e.target_name, n.need_receipt = this.need_receipt, "single" == e.target_type) n.target_name = e.target_id;else if (n.target_gid = e.target_id, this.at_list && this.at_list instanceof Array) n.users = this.at_list;else if (this.at_list && !(this.at_list instanceof Array)) return __f__("error", "参数值不合法，at_list必须为数组类型", " at libs\\wechat-jmessage.js:3");return this.appkey ? n.appkey = this.appkey : n.appkey = this.current_appkey, n;}, t.exports = n;}, function (t, e) {"use strict";var n = function n(t) {this.args = t;};n.prototype.onSuccess = function (t) {return "function" == typeof t && (this.success = t), this;}, n.prototype.onFail = function (t) {return "function" == typeof t && (this.fail = t), this;}, n.prototype.onTimeout = function (t) {return "function" == typeof t && (this.timeout = t), this;}, n.prototype.onAck = function (t) {return "function" == typeof t && (this.ack = t), this;}, t.exports = n;}, function (t, e) {"use strict";var n = {};n.isBlack = function (t) {return !(t && "string" == typeof t && t.length > 0);};var o = {};o.addItem = function (t, e) {wx.setStorage({ key: t.toString(), data: e });}, o.removeItems = function (t) {wx.getStorageInfo({ success: function success(e) {var n = e.keys,o = [];n.forEach(function (e) {try {var n = wx.getStorageSync(e);n === t && o.push(e);} catch (t) {}}), o.forEach(function (t) {wx.removeStorage({ key: t, success: function success(t) {} });});} });}, o.getItem = function (t) {return wx.getStorageSync(t);};var i = {};i.delRepeatItem = function (t) {var e = [];return t.forEach(function (t) {e.indexOf(t) === -1 && null != t && e.push(t);}), e;};var s = {};s.rooms = {}, t.exports = { StringUtils: n, StorageUtils: o, ArrayUtils: i, Cache: s };}, function (t, e, n) {var o = n(26);e.protocol = 3;var i = e.packets = { open: 0, close: 1, ping: 2, pong: 3, message: 4, upgrade: 5, noop: 6 },s = o(i),r = { type: "error", data: "parser error" };e.encodePacket = function (t, e, n, o) {"function" == typeof n && (o = n, n = null);var s = i[t.type];return void 0 !== t.data && (s += String(t.data)), o("" + s);}, e.decodePacket = function (t, e, n) {if (void 0 === t) return r;if ("string" == typeof t) {var o = t.charAt(0);return Number(o) == o && s[o] ? t.length > 1 ? { type: s[o], data: t.substring(1) } : { type: s[o] } : r;}};}, function (t, e) {t.exports = Object.keys || function (t) {var e = [],n = Object.prototype.hasOwnProperty;for (var o in t) {n.call(t, o) && e.push(o);}return e;};}, function (t, e, n) {t.exports = n(30), t.exports.parser = n(2);}, function (t, e, n) {function o(t, e) {"object" == typeof t && (e = t, t = void 0), e = e || {};var n,o = s(t),r = o.source,u = o.id,h = o.path,_ = p[u] && h in p[u].nsps,f = e.forceNew || e["force new connection"] || !1 === e.multiplex || _;return f ? (c("ignoring socket cache for %s", r), n = a(r, e)) : (p[u] || (c("new io instance for %s", r), p[u] = a(r, e)), n = p[u]), o.query && !e.query ? e.query = o.query : e && "object" == typeof e.query && (e.query = i(e.query)), n.socket(o.path, e);}function i(t) {var e = [];for (var n in t) {t.hasOwnProperty(n) && e.push(encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));}return e.join("&");}var s = n(29),r = n(5),a = n(6),c = n(1)("socket.io-client");t.exports = e = o;var p = e.managers = {};e.protocol = r.protocol, e.connect = o, e.Manager = n(6), e.Socket = n(8);}, function (t, e, n) {function o(t, e) {var n = t;null == t && (t = e.protocol + "//" + e.host), "string" == typeof t && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? e.protocol + t : e.host + t), /^(https?|wss?):\/\//.test(t) || (s("protocol-less url %s", t), t = "undefined" != typeof e ? e.protocol + "//" + t : "https://" + t), s("parse %s", t), n = i(t)), n.port || (/^(http|ws)$/.test(n.protocol) ? n.port = "80" : /^(http|ws)s$/.test(n.protocol) && (n.port = "443")), n.path = n.path || "/";var o = n.host.indexOf(":") !== -1,r = o ? "[" + n.host + "]" : n.host;return n.id = n.protocol + "://" + r + ":" + n.port, n.href = n.protocol + "://" + r + (e && e.port === n.port ? "" : ":" + n.port), n;}var i = n(15),s = n(1)("socket.io-client:url");t.exports = o;}, function (t, e, n) {function o(t, e) {return this instanceof o ? (e = e || {}, t && "object" == typeof t && (e = t, t = null), t ? (t = u(t), e.hostname = t.host, e.secure = "https" === t.protocol || "wss" === t.protocol, e.port = t.port, t.query && (e.query = t.query)) : e.host && (e.hostname = u(e.host).host), this.secure = !0, this.port = "443", this.agent = e.agent || !1, this.hostname = e.hostname, this.port = e.port, this.query = e.query || {}, "string" == typeof this.query && (this.query = _.decode(this.query)), this.upgrade = !1 !== e.upgrade, this.path = (e.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!e.forceJSONP, this.jsonp = !1 !== e.jsonp, this.forceBase64 = !!e.forceBase64, this.enablesXDR = !!e.enablesXDR, this.timestampParam = e.timestampParam || "t", this.timestampRequests = e.timestampRequests, this.transports = e.transports || ["polling", "websocket"], this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.policyPort = e.policyPort || 843, this.rememberUpgrade = e.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = e.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== e.perMessageDeflate && (e.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = e.pfx || null, this.key = e.key || null, this.passphrase = e.passphrase || null, this.cert = e.cert || null, this.ca = e.ca || null, this.ciphers = e.ciphers || null, this.rejectUnauthorized = void 0 === e.rejectUnauthorized ? null : e.rejectUnauthorized, this.forceNode = !!e.forceNode, this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, this.pingTimeoutTimer = null, void this.open()) : new o(t, e);}function i(t) {var e = {};for (var n in t) {t.hasOwnProperty(n) && (e[n] = t[n]);}return e;}var s = n(10),r = n(3),a = n(1)("engine.io-client:socket"),c = n(12),p = n(2),u = n(15),h = n(37),_ = n(14);t.exports = o, o.priorWebsocketSuccess = !1, r(o.prototype), o.protocol = p.protocol, o.Socket = o, o.Transport = n(9), o.transports = n(10), o.parser = n(2), o.prototype.createTransport = function (t) {a('creating transport "%s"', t);var e = i(this.query);e.EIO = p.protocol, e.transport = t, this.id && (e.sid = this.id);var n = new s({ agent: this.agent, hostname: this.hostname, port: this.port, secure: this.secure, path: this.path, query: e, forceJSONP: this.forceJSONP, jsonp: this.jsonp, forceBase64: this.forceBase64, enablesXDR: this.enablesXDR, timestampRequests: this.timestampRequests, timestampParam: this.timestampParam, policyPort: this.policyPort, socket: this, pfx: this.pfx, key: this.key, passphrase: this.passphrase, cert: this.cert, ca: this.ca, ciphers: this.ciphers, rejectUnauthorized: this.rejectUnauthorized, perMessageDeflate: this.perMessageDeflate, extraHeaders: this.extraHeaders, forceNode: this.forceNode, localAddress: this.localAddress });return n;}, o.prototype.open = function () {var t = "websocket";this.readyState = "opening";try {t = this.createTransport(t);} catch (t) {return this.transports.shift(), void this.open();}t.open(), this.setTransport(t);}, o.prototype.setTransport = function (t) {a("setting transport %s", t.name);var e = this;this.transport && (a("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = t, t.on("drain", function () {e.onDrain();}).on("packet", function (t) {e.onPacket(t);}).on("error", function (t) {e.onError(t);}).on("close", function () {e.onClose("transport close");});}, o.prototype.probe = function (t) {function e() {if (_.onlyBinaryUpgrades) {var e = !this.supportsBinary && _.transport.supportsBinary;h = h || e;}h || (a('probe transport "%s" opened', t), u.send([{ type: "ping", data: "probe" }]), u.once("packet", function (e) {if (!h) if ("pong" === e.type && "probe" === e.data) {if (a('probe transport "%s" pong', t), _.upgrading = !0, _.emit("upgrading", u), !u) return;o.priorWebsocketSuccess = "websocket" === u.name, a('pausing current transport "%s"', _.transport.name), _.transport.pause(function () {h || "closed" !== _.readyState && (a("changing transport and sending upgrade packet"), p(), _.setTransport(u), u.send([{ type: "upgrade" }]), _.emit("upgrade", u), u = null, _.upgrading = !1, _.flush());});} else {a('probe transport "%s" failed', t);var n = new Error("probe error");n.transport = u.name, _.emit("upgradeError", n);}}));}function n() {h || (h = !0, p(), u.close(), u = null);}function i(e) {var o = new Error("probe error: " + e);o.transport = u.name, n(), a('probe transport "%s" failed because of error: %s', t, e), _.emit("upgradeError", o);}function s() {i("transport closed");}function r() {i("socket closed");}function c(t) {u && t.name !== u.name && (a('"%s" works - aborting "%s"', t.name, u.name), n());}function p() {u.removeListener("open", e), u.removeListener("error", i), u.removeListener("close", s), _.removeListener("close", r), _.removeListener("upgrading", c);}a('probing transport "%s"', t);var u = this.createTransport(t, { probe: 1 }),h = !1,_ = this;o.priorWebsocketSuccess = !1, u.once("open", e), u.once("error", i), u.once("close", s), this.once("close", r), this.once("upgrading", c), u.open();}, o.prototype.onOpen = function () {if (this.readyState = "open", o.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {a("starting upgrade probes");for (var t = 0, e = this.upgrades.length; t < e; t++) {this.probe(this.upgrades[t]);}}}, o.prototype.onPacket = function (t) {if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (a('socket receive: type "%s", data "%s"', t.type, t.data), this.emit("packet", t), this.emit("heartbeat"), t.type) {case "open":this.onHandshake(h(t.data));break;case "pong":this.setPing(), this.emit("pong");break;case "error":var e = new Error("server error");e.code = t.data, this.onError(e);break;case "message":this.emit("data", t.data), this.emit("message", t.data);} else a('packet received with socket readyState "%s"', this.readyState);}, o.prototype.onHandshake = function (t) {this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat));}, o.prototype.onHeartbeat = function (t) {clearTimeout(this.pingTimeoutTimer);var e = this;e.pingTimeoutTimer = setTimeout(function () {"closed" !== e.readyState && e.onClose("ping timeout");}, t || e.pingInterval + e.pingTimeout);}, o.prototype.setPing = function () {var t = this;clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(function () {a("writing ping packet - expecting pong within %sms", t.pingTimeout), t.ping(), t.onHeartbeat(t.pingTimeout);}, t.pingInterval);}, o.prototype.ping = function () {var t = this;this.sendPacket("ping", function () {t.emit("ping");});}, o.prototype.onDrain = function () {this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush();}, o.prototype.flush = function () {"closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (a("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"));}, o.prototype.write = o.prototype.send = function (t, e, n) {return this.sendPacket("message", t, e, n), this;}, o.prototype.sendPacket = function (t, e, n, o) {if ("function" == typeof e && (o = e, e = void 0), "function" == typeof n && (o = n, n = null), "closing" !== this.readyState && "closed" !== this.readyState) {n = n || {}, n.compress = !1 !== n.compress;var i = { type: t, data: e, options: n };this.emit("packetCreate", i), this.writeBuffer.push(i), o && this.once("flush", o), this.flush();}}, o.prototype.close = function () {function t() {o.onClose("forced close"), a("socket closing - telling transport to close"), o.transport.close();}function e() {o.removeListener("upgrade", e), o.removeListener("upgradeError", e), t();}function n() {o.once("upgrade", e), o.once("upgradeError", e);}if ("opening" === this.readyState || "open" === this.readyState) {this.readyState = "closing";var o = this;this.writeBuffer.length ? this.once("drain", function () {this.upgrading ? n() : t();}) : this.upgrading ? n() : t();}return this;}, o.prototype.onError = function (t) {a("socket error %j", t), o.priorWebsocketSuccess = !1, this.emit("error", t), this.onClose("transport error", t);}, o.prototype.onClose = function (t, e) {if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {a('socket close with reason: "%s"', t);var n = this;clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", t, e), n.writeBuffer = [], n.prevBufferLen = 0;}}, o.prototype.filterUpgrades = function (t) {for (var e = [], n = 0, o = t.length; n < o; n++) {~c(this.transports, t[n]) && e.push(t[n]);}return e;};}, function (t, e, n) {!function () {function t(t) {this.message = t;}var n = e,o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";t.prototype = new Error(), t.prototype.name = "InvalidCharacterError", n.btoa || (n.btoa = function (e) {for (var n, i, s = String(e), r = 0, a = o, c = ""; s.charAt(0 | r) || (a = "=", r % 1); c += a.charAt(63 & n >> 8 - r % 1 * 8)) {if (i = s.charCodeAt(r += .75), i > 255) throw new t("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");n = n << 8 | i;}return c;}), n.atob || (n.atob = function (e) {var n = String(e).replace(/=+$/, "");if (n.length % 4 == 1) throw new t("'atob' failed: The string to be decoded is not correctly encoded.");for (var i, s, r = 0, a = 0, c = ""; s = n.charAt(a++); ~s && (i = r % 4 ? 64 * i + s : s, r++ % 4) ? c += String.fromCharCode(255 & i >> (-2 * r & 6)) : 0) {s = o.indexOf(s);}return c;});}();}, function (t, e) {function n(t) {t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0;}t.exports = n, n.prototype.duration = function () {var t = this.ms * Math.pow(this.factor, this.attempts++);if (this.jitter) {var e = Math.random(),n = Math.floor(e * this.jitter * t);t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n;}return 0 | Math.min(t, this.max);}, n.prototype.reset = function () {this.attempts = 0;}, n.prototype.setMin = function (t) {this.ms = t;}, n.prototype.setMax = function (t) {this.max = t;}, n.prototype.setJitter = function (t) {this.jitter = t;};}, function (t, e) {t.exports = function (t, e) {var n = function n() {};n.prototype = e.prototype, t.prototype = new n(), t.prototype.constructor = t;};}, function (t, e, n) {function o() {return e.colors[u++ % e.colors.length];}function i(t) {function n() {}function i() {var t = i,n = +new Date(),s = n - (p || n);t.diff = s, t.prev = p, t.curr = n, p = n, null == t.useColors && (t.useColors = e.useColors()), null == t.color && t.useColors && (t.color = o());for (var r = new Array(arguments.length), a = 0; a < r.length; a++) {r[a] = arguments[a];}r[0] = e.coerce(r[0]), "string" != typeof r[0] && (r = ["%o"].concat(r));var c = 0;r[0] = r[0].replace(/%([a-z%])/g, function (n, o) {if ("%%" === n) return n;c++;var i = e.formatters[o];if ("function" == typeof i) {var s = r[c];n = i.call(t, s), r.splice(c, 1), c--;}return n;}), r = e.formatArgs.apply(t, r);var u = i.log || e.log || console.log.bind(console);u.apply(t, r);}n.enabled = !1, i.enabled = !0;var s = e.enabled(t) ? i : n;return s.namespace = t, s;}function s(t) {e.save(t);for (var n = (t || "").split(/[\s,]+/), o = n.length, i = 0; i < o; i++) {n[i] && (t = n[i].replace(/[\\^$+?.()|[\]{}]/g, "\\$&").replace(/\*/g, ".*?"), "-" === t[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t + "$")));}}function r() {e.enable("");}function a(t) {var n, o;for (n = 0, o = e.skips.length; n < o; n++) {if (e.skips[n].test(t)) return !1;}for (n = 0, o = e.names.length; n < o; n++) {if (e.names[n].test(t)) return !0;}return !1;}function c(t) {return t instanceof Error ? t.stack || t.message : t;}e = t.exports = i.debug = i, e.coerce = c, e.disable = r, e.enable = s, e.enabled = a, e.humanize = n(36), e.names = [], e.skips = [], e.formatters = {};var p,u = 0;}, function (t, e, n) {(function (e) {function o(t) {function n(t) {if (!t) return !1;if (e.Buffer && e.Buffer.isBuffer && e.Buffer.isBuffer(t) || e.ArrayBuffer && t instanceof ArrayBuffer || e.Blob && t instanceof Blob || e.File && t instanceof File) return !0;if (i(t)) {for (var o = 0; o < t.length; o++) {if (n(t[o])) return !0;}} else if (t && "object" == typeof t) {t.toJSON && "function" == typeof t.toJSON && (t = t.toJSON());for (var s in t) {if (Object.prototype.hasOwnProperty.call(t, s) && n(t[s])) return !0;}}return !1;}return n(t);}var i = n(13);t.exports = o;}).call(e, function () {return this;}());}, function (t, e) {function n(t) {if (t = String(t), !(t.length > 1e4)) {var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);if (e) {var n = parseFloat(e[1]),o = (e[2] || "ms").toLowerCase();switch (o) {case "years":case "year":case "yrs":case "yr":case "y":return n * u;case "days":case "day":case "d":return n * p;case "hours":case "hour":case "hrs":case "hr":case "h":return n * c;case "minutes":case "minute":case "mins":case "min":case "m":return n * a;case "seconds":case "second":case "secs":case "sec":case "s":return n * r;case "milliseconds":case "millisecond":case "msecs":case "msec":case "ms":return n;default:return;}}}}function o(t) {return t >= p ? Math.round(t / p) + "d" : t >= c ? Math.round(t / c) + "h" : t >= a ? Math.round(t / a) + "m" : t >= r ? Math.round(t / r) + "s" : t + "ms";}function i(t) {return s(t, p, "day") || s(t, c, "hour") || s(t, a, "minute") || s(t, r, "second") || t + " ms";}function s(t, e, n) {if (!(t < e)) return t < 1.5 * e ? Math.floor(t / e) + " " + n : Math.ceil(t / e) + " " + n + "s";}var r = 1e3,a = 60 * r,c = 60 * a,p = 24 * c,u = 365.25 * p;t.exports = function (t, e) {e = e || {};var s = typeof t;if ("string" === s && t.length > 0) return n(t);if ("number" === s && isNaN(t) === !1) return e.long ? i(t) : o(t);throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t));};}, function (t, e) {var n = /^\s+/,o = /\s+$/;t.exports = function (t) {return "string" == typeof t && t ? (t = t.replace(n, "").replace(o, ""), JSON.parse(t)) : null;};}, function (t, e) {function n() {throw new Error("setTimeout has not been defined");}function o() {throw new Error("clearTimeout has not been defined");}function i(t) {if (u === setTimeout) return setTimeout(t, 0);if ((u === n || !u) && setTimeout) return u = setTimeout, setTimeout(t, 0);try {return u(t, 0);} catch (e) {try {return u.call(null, t, 0);} catch (e) {return u.call(this, t, 0);}}}function s(t) {if (h === clearTimeout) return clearTimeout(t);if ((h === o || !h) && clearTimeout) return h = clearTimeout, clearTimeout(t);try {return h(t);} catch (e) {try {return h.call(null, t);} catch (e) {return h.call(this, t);}}}function r() {l && f && (l = !1, f.length ? d = f.concat(d) : g = -1, d.length && a());}function a() {if (!l) {var t = i(r);l = !0;for (var e = d.length; e;) {for (f = d, d = []; ++g < e;) {f && f[g].run();}g = -1, e = d.length;}f = null, l = !1, s(t);}}function c(t, e) {this.fun = t, this.array = e;}function p() {}var u,h,_ = t.exports = {};!function () {try {u = "function" == typeof setTimeout ? setTimeout : n;} catch (t) {u = n;}try {h = "function" == typeof clearTimeout ? clearTimeout : o;} catch (t) {h = o;}}();var f,d = [],l = !1,g = -1;_.nextTick = function (t) {var e = new Array(arguments.length - 1);if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) {e[n - 1] = arguments[n];}d.push(new c(t, e)), 1 !== d.length || l || i(a);}, c.prototype.run = function () {this.fun.apply(null, this.array);}, _.title = "browser", _.browser = !0, _.env = {}, _.argv = [], _.version = "", _.versions = {}, _.on = p, _.addListener = p, _.once = p, _.off = p, _.removeListener = p, _.removeAllListeners = p, _.emit = p, _.binding = function (t) {throw new Error("process.binding is not supported");}, _.cwd = function () {return "/";}, _.chdir = function (t) {throw new Error("process.chdir is not supported");}, _.umask = function () {return 0;};}, function (t, e, n) {(function (t) {var o = n(13),i = n(16);e.deconstructPacket = function (t) {function e(t) {if (!t) return t;if (i(t)) {var s = { _placeholder: !0, num: n.length };return n.push(t), s;}if (o(t)) {for (var r = new Array(t.length), a = 0; a < t.length; a++) {r[a] = e(t[a]);}return r;}if ("object" == typeof t && !(t instanceof Date)) {var r = {};for (var c in t) {r[c] = e(t[c]);}return r;}return t;}var n = [],s = t.data,r = t;return r.data = e(s), r.attachments = n.length, { packet: r, buffers: n };}, e.reconstructPacket = function (t, e) {function n(t) {if (t && t._placeholder) {var i = e[t.num];return i;}if (o(t)) {for (var s = 0; s < t.length; s++) {t[s] = n(t[s]);}return t;}if (t && "object" == typeof t) {for (var r in t) {t[r] = n(t[r]);}return t;}return t;}return t.data = n(t.data), t.attachments = void 0, t;}, e.removeBlobs = function (e, n) {function s(e, c, p) {if (!e) return e;if (t.Blob && e instanceof Blob || t.File && e instanceof File) {r++;var u = new FileReader();u.onload = function () {p ? p[c] = this.result : a = this.result, --r || n(a);}, u.readAsArrayBuffer(e);} else if (o(e)) for (var h = 0; h < e.length; h++) {s(e[h], h, e);} else if (e && "object" == typeof e && !i(e)) for (var _ in e) {s(e[_], _, e);}}var r = 0,a = e;s(a), r || n(a);};}).call(e, function () {return this;}());}, function (t, e) {function n(t) {if (t) return o(t);}function o(t) {for (var e in n.prototype) {t[e] = n.prototype[e];}return t;}t.exports = n, n.prototype.on = n.prototype.addEventListener = function (t, e) {return this._callbacks = this._callbacks || {}, (this._callbacks[t] = this._callbacks[t] || []).push(e), this;}, n.prototype.once = function (t, e) {function n() {o.off(t, n), e.apply(this, arguments);}var o = this;return this._callbacks = this._callbacks || {}, n.fn = e, this.on(t, n), this;}, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function (t, e) {if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;var n = this._callbacks[t];if (!n) return this;if (1 == arguments.length) return delete this._callbacks[t], this;for (var o, i = 0; i < n.length; i++) {if (o = n[i], o === e || o.fn === e) {n.splice(i, 1);break;}}return this;}, n.prototype.emit = function (t) {this._callbacks = this._callbacks || {};var e = [].slice.call(arguments, 1),n = this._callbacks[t];if (n) {n = n.slice(0);for (var o = 0, i = n.length; o < i; ++o) {n[o].apply(this, e);}}return this;}, n.prototype.listeners = function (t) {return this._callbacks = this._callbacks || {}, this._callbacks[t] || [];}, n.prototype.hasListeners = function (t) {return !!this.listeners(t).length;};}, function (t, e) {function n(t, e) {var n = [];e = e || 0;for (var o = e || 0; o < t.length; o++) {n[o - e] = t[o];}return n;}t.exports = n;}, function (t, e) {"use strict";function n(t) {var e = "";do {e = r[t % a] + e, t = Math.floor(t / a);} while (t > 0);return e;}function o(t) {var e = 0;for (u = 0; u < t.length; u++) {e = e * a + c[t.charAt(u)];}return e;}function i() {var t = n(+new Date());return t !== s ? (p = 0, s = t) : t + "." + n(p++);}for (var s, r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), a = 64, c = {}, p = 0, u = 0; u < a; u++) {c[r[u]] = u;}i.encode = n, i.decode = o, t.exports = i;}]);});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 18)["default"]))

/***/ }),
/* 21 */
/*!******************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/项目/常春藤/pages/my/my-collect.nvue?vue&type=style&index=0&lang=css&mpType=page ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_my_collect_nvue_vue_type_style_index_0_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!./node_modules/postcss-loader/src??ref--8-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./my-collect.nvue?vue&type=style&index=0&lang=css&mpType=page */ 22);
/* harmony import */ var _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_my_collect_nvue_vue_type_style_index_0_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_my_collect_nvue_vue_type_style_index_0_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_my_collect_nvue_vue_type_style_index_0_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_my_collect_nvue_vue_type_style_index_0_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_my_collect_nvue_vue_type_style_index_0_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 22 */
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!./node_modules/postcss-loader/src??ref--8-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/项目/常春藤/pages/my/my-collect.nvue?vue&type=style&index=0&lang=css&mpType=page ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "tab-bar": {
    "flexDirection": "row",
    "height": "90rpx",
    "borderBottomWidth": "1rpx",
    "borderBottomColor": "#F0f0f0"
  },
  "tab-bar-item": {
    "width": "375rpx",
    "height": "90rpx",
    "justifyContent": "center",
    "alignItems": "center",
    "position": "relative"
  },
  "tab-bar-item-text": {
    "fontSize": "14",
    "color": "#9B9B9B"
  },
  "tab-bottom-border": {
    "position": "absolute",
    "width": "0rpx",
    "height": "6rpx",
    "backgroundColor": "#8987DF",
    "bottom": "0rpx",
    "transitionProperty": "width",
    "transitionDuration": 200
  },
  "@TRANSITION": {
    "tab-bottom-border": {
      "property": "width",
      "duration": 200
    }
  },
  "select-tab-bar-item-text": {
    "fontSize": "17",
    "color": "#333333"
  },
  "select-tab-bar": {
    "width": "50rpx"
  },
  "swiper": {
    "backgroundColor": "#f7f7f7"
  },
  "course-list": {
    "paddingTop": "30rpx",
    "paddingRight": "30rpx",
    "paddingBottom": 0,
    "paddingLeft": "30rpx"
  },
  "course-item": {
    "paddingTop": "30rpx",
    "paddingRight": "30rpx",
    "paddingBottom": "30rpx",
    "paddingLeft": "30rpx",
    "backgroundColor": "#FFFFFF",
    "borderRadius": "7",
    "position": "relative",
    "marginBottom": "30rpx"
  },
  "course-name": {
    "position": "absolute",
    "top": "30rpx",
    "left": "-8rpx",
    "width": "126rpx",
    "height": "60rpx",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "course-name-bg": {
    "position": "absolute",
    "left": 0,
    "top": 0,
    "width": "126rpx",
    "height": "60rpx"
  },
  "course-name-text": {
    "fontSize": "14",
    "color": "#FFFFFF"
  },
  "detail": {
    "flexDirection": "row",
    "justifyContent": "flex-end"
  },
  "detail-text": {
    "width": "150rpx",
    "height": "60rpx",
    "backgroundColor": "#618FF0",
    "fontSize": "14",
    "color": "#FFFFFF",
    "lineHeight": "60rpx",
    "textAlign": "center",
    "borderRadius": "8rpx",
    "backgroundColor:active": "#4364a9"
  },
  "course-title": {
    "marginTop": "20rpx",
    "fontSize": "17",
    "fontWeight": "bold",
    "color": "#333333"
  },
  "course-time": {
    "fontSize": "14",
    "color": "#9B9B9B",
    "marginTop": "10rpx"
  },
  "course-level": {
    "marginTop": "16rpx",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "course-level-title": {
    "fontSize": "14",
    "color": "#9B9B9B",
    "marginRight": "20rpx"
  },
  "course-level-star": {
    "width": "24rpx",
    "height": "24rpx",
    "marginRight": "6rpx"
  },
  "teacher": {
    "marginTop": "30rpx",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "space-between"
  },
  "teacher-left": {
    "flexDirection": "row",
    "alignItems": "center"
  },
  "teacher-avatar": {
    "width": "56rpx",
    "height": "56rpx",
    "borderRadius": 50,
    "marginRight": "20rpx"
  },
  "teacher-name": {
    "fontSize": "14"
  },
  "course-collection": {
    "color": "#8987DF",
    "fontSize": "14"
  },
  "no-course": {
    "justifyContent": "center",
    "alignItems": "center",
    "marginTop": "170rpx"
  },
  "no-default-img": {
    "width": "424rpx",
    "height": "360rpx"
  },
  "no-default-text": {
    "fontSize": "14",
    "color": "#9B9B9B",
    "marginTop": "30rpx"
  },
  "bottom-loading": {
    "paddingTop": "10",
    "paddingRight": 0,
    "paddingBottom": "10",
    "paddingLeft": 0,
    "width": "750rpx",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "bottom-loading-text": {
    "color": "#9B9B9B",
    "fontSize": "14",
    "marginRight": "10rpx"
  },
  "tip-no-more": {
    "paddingTop": "10",
    "paddingRight": 0,
    "paddingBottom": "10",
    "paddingLeft": 0,
    "justifyContent": "center",
    "alignItems": "center"
  },
  "tip-no-more-text": {
    "fontSize": "14",
    "color": "#9B9B9B"
  },
  "price": {
    "textAlign": "right"
  },
  "price-text": {
    "textAlign": "right",
    "fontSize": "22",
    "color": "#D0021B"
  },
  "indicator": {
    "height": "20",
    "width": "20",
    "color": "#FF0000"
  }
}

/***/ }),
/* 23 */
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
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
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


/***/ })
/******/ ]);