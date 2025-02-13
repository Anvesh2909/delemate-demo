"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@kinde";
exports.ids = ["vendor-chunks/@kinde"];
exports.modules = {

/***/ "(ssr)/./node_modules/@kinde/jwt-decoder/dist/jwt-decoder.js":
/*!*************************************************************!*\
  !*** ./node_modules/@kinde/jwt-decoder/dist/jwt-decoder.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TokenPart: () => (/* binding */ s),\n/* harmony export */   jwtDecoder: () => (/* binding */ c)\n/* harmony export */ });\nvar s = /* @__PURE__ */ ((e) => (e[e.header = 0] = \"header\", e[e.body = 1] = \"body\", e))(s || {});\nfunction c(e, t) {\n  if (!e)\n    return null;\n  const r = e.split(\".\");\n  if (r.length !== 3)\n    return null;\n  const n = r[\n    t ?? 1\n    /* body */\n  ].replace(/-/g, \"+\").replace(/_/g, \"/\"), o = decodeURIComponent(\n    atob(n).split(\"\").map((l) => \"%\" + (\"00\" + l.charCodeAt(0).toString(16)).slice(-2)).join(\"\")\n  );\n  return JSON.parse(o);\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvQGtpbmRlL2p3dC1kZWNvZGVyL2Rpc3Qvand0LWRlY29kZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnR0FBZ0c7QUFDaEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlFIiwic291cmNlcyI6WyIvVXNlcnMvdGFyYWtyYW0vRG93bmxvYWRzL2RlbGVtYXRlLXdlYnNpdGUvbm9kZV9tb2R1bGVzL0BraW5kZS9qd3QtZGVjb2Rlci9kaXN0L2p3dC1kZWNvZGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBzID0gLyogQF9fUFVSRV9fICovICgoZSkgPT4gKGVbZS5oZWFkZXIgPSAwXSA9IFwiaGVhZGVyXCIsIGVbZS5ib2R5ID0gMV0gPSBcImJvZHlcIiwgZSkpKHMgfHwge30pO1xuZnVuY3Rpb24gYyhlLCB0KSB7XG4gIGlmICghZSlcbiAgICByZXR1cm4gbnVsbDtcbiAgY29uc3QgciA9IGUuc3BsaXQoXCIuXCIpO1xuICBpZiAoci5sZW5ndGggIT09IDMpXG4gICAgcmV0dXJuIG51bGw7XG4gIGNvbnN0IG4gPSByW1xuICAgIHQgPz8gMVxuICAgIC8qIGJvZHkgKi9cbiAgXS5yZXBsYWNlKC8tL2csIFwiK1wiKS5yZXBsYWNlKC9fL2csIFwiL1wiKSwgbyA9IGRlY29kZVVSSUNvbXBvbmVudChcbiAgICBhdG9iKG4pLnNwbGl0KFwiXCIpLm1hcCgobCkgPT4gXCIlXCIgKyAoXCIwMFwiICsgbC5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpKS5qb2luKFwiXCIpXG4gICk7XG4gIHJldHVybiBKU09OLnBhcnNlKG8pO1xufVxuZXhwb3J0IHtcbiAgcyBhcyBUb2tlblBhcnQsXG4gIGMgYXMgand0RGVjb2RlclxufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/@kinde/jwt-decoder/dist/jwt-decoder.js\n");

/***/ })

};
;