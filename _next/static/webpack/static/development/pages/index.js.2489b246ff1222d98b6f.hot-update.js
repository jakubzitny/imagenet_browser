webpackHotUpdate("static/development/pages/index.js",{

/***/ "./utils/fetch-utils.js":
/*!******************************!*\
  !*** ./utils/fetch-utils.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FetchUtils; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");




var BACKEND_URL = 'http://104.198.35.148:5984';
var DB_NAME = 'testing3';

var FetchUtils =
/*#__PURE__*/
function () {
  function FetchUtils() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, FetchUtils);
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(FetchUtils, null, [{
    key: "queryParamToSelector",
    value: function queryParamToSelector(queryParam) {
      if (!queryParam) {
        return {};
      }

      return {
        'name': {
          '$regex': ".*".concat(queryParam, ".*")
        }
      };
    }
  }, {
    key: "fetch",
    value: function (_fetch) {
      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(function _callee(queryParam) {
      var url, fieldsToFetch, response, data;
      return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              url = "".concat(BACKEND_URL, "/").concat(DB_NAME, "/_find");
              fieldsToFetch = ['name', 'size'];
              _context.next = 4;
              return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(fetch(url, {
                method: "post",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1___default()({
                  selector: FetchUtils.queryParamToSelector(queryParam),
                  fields: fieldsToFetch
                })
              }));

            case 4:
              response = _context.sent;
              _context.next = 7;
              return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(response.json());

            case 7:
              data = _context.sent;
              return _context.abrupt("return", data.docs);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      });
    })
  }]);

  return FetchUtils;
}();



/***/ })

})
//# sourceMappingURL=index.js.2489b246ff1222d98b6f.hot-update.js.map