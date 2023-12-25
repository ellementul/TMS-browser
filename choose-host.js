/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["App"] = factory();
	else
		root["App"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./choose-host.js":
/*!************************!*\
  !*** ./choose-host.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   promptToken: () => (/* binding */ promptToken)\n/* harmony export */ });\nasync function promptToken(url, runHost) {\n  const hostToken = url.searchParams.get('token');\n  if (hostToken) return hostToken;\n  AddStyles();\n  const promptEl = createPromptModalWindow();\n  url = url.origin + url.pathname;\n  const newHostToken = await getToken(url, promptEl, runHost);\n  promptEl.remove();\n  const hostAddressEl = createAddressModalWindow();\n  await showToken(url, newHostToken, hostAddressEl);\n  hostAddressEl.remove();\n  return newHostToken;\n}\nfunction AddStyles() {\n  const style = document.createElement('style');\n  style.textContent = `\n        .modal {\n            display: flex;\n            flex-direction: column;\n            justify-content: center;\n            gap: 0.4rem;\n            width: 450px;\n            padding: 1.3rem;\n            min-height: 250px;\n            position: absolute;\n            top: 20%;\n            background-color: white;\n            border: 1px solid #ddd;\n            border-radius: 15px;\n        }\n    \n        .modal .flex {\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n        }\n    \n        .modal input {\n            padding: 0.7rem 1rem;\n            border: 1px solid #ddd;\n            border-radius: 5px;\n            font-size: 0.9em;\n        }\n    \n        .modal p {\n            font-size: 0.9rem;\n            color: #777;\n            margin: 0.4rem 0 0.2rem;\n        }\n    \n        button {\n            cursor: pointer;\n            border: none;\n            font-weight: 600;\n        }\n    \n        .btn {\n            display: inline-block;\n            padding: 0.8rem 1.4rem;\n            font-weight: 700;\n            background-color: black;\n            color: white;\n            border-radius: 5px;\n            text-align: center;\n            font-size: 1em;\n        }\n    \n        .overlay {\n            position: fixed;\n            top: 0;\n            bottom: 0;\n            left: 0;\n            right: 0;\n            width: 100%;\n            height: 100%;\n            background: rgba(0, 0, 0, 0.5);\n            backdrop-filter: blur(3px);\n            z-index: 1;\n        }\n    \n        .modal {\n            z-index: 2;\n        }\n    \n        .hidden {\n            display: none;\n        }\n    `;\n  document.head.appendChild(style);\n}\nasync function getToken(url, promptEl, runHost) {\n  const inputPromise = getTokenFromInput(promptEl);\n  const hostPromise = getTokenFromHost(url, promptEl, runHost);\n  return Promise.any([inputPromise, hostPromise]);\n}\nfunction getTokenFromInput(prompt) {\n  return new Promise(resolve => {\n    const checkToken = () => {\n      const token = prompt.tokenInput.value.trim();\n      if (token) {\n        prompt.connectButton.removeEventListener('click', checkToken);\n        resolve(token);\n      }\n    };\n    prompt.connectButton.addEventListener('click', checkToken);\n  });\n}\nfunction getTokenFromHost(url, prompt, runHost) {\n  return new Promise(resolve => {\n    const create = async () => {\n      prompt.createButton.removeEventListener('click', create);\n      const accessSpacesIds = await runHost(url);\n      resolve(accessSpacesIds.client);\n    };\n    prompt.createButton.addEventListener('click', create);\n  });\n}\nasync function showToken(url, hostToken, hostAddressEl) {\n  // const fullUrl = new URL(url)\n  const fullUrl = new URL(\"https://ellementul.github.io/TMS-browser/\");\n  fullUrl.searchParams.set('token', hostToken);\n  hostAddressEl.tokenInput.value = hostToken;\n  hostAddressEl.url.src = fullUrl.href;\n  hostAddressEl.url.textContent = fullUrl.href;\n  return new Promise(resolve => {\n    const close = async () => {\n      if (token) {\n        hostAddressEl.closeButton.removeEventListener('click', close);\n        resolve();\n      }\n    };\n    hostAddressEl.closeButton.addEventListener('click', close);\n  });\n}\nfunction createPromptModalWindow() {\n  const prompt = document.createElement(\"section\");\n  prompt.setAttribute(\"id\", \"prompt\");\n  prompt.classList.add(\"modal\");\n  document.body.append(prompt);\n  const tokenInput = document.createElement(\"input\");\n  tokenInput.setAttribute(\"id\", \"token\");\n  tokenInput.setAttribute(\"placeholder\", \"Введите токен сервера\");\n  prompt.tokenInput = tokenInput;\n  prompt.append(tokenInput);\n  const connectBth = document.createElement(\"button\");\n  connectBth.textContent = \"Подключится к серверу\";\n  connectBth.classList.add(\"btn\");\n  connectBth.classList.add(\"btn-connect\");\n  prompt.connectButton = connectBth;\n  prompt.append(connectBth);\n  const createBth = document.createElement(\"button\");\n  createBth.textContent = \"Создать сервер\";\n  createBth.classList.add(\"btn\");\n  createBth.classList.add(\"btn-create\");\n  prompt.createButton = createBth;\n  prompt.append(createBth);\n  return prompt;\n}\nfunction createAddressModalWindow() {\n  const address = document.createElement(\"section\");\n  address.setAttribute(\"id\", \"address\");\n  address.classList.add(\"modal\");\n  document.body.append(address);\n  const url = document.createElement(\"a\");\n  url.setAttribute(\"id\", \"hostUrl\");\n  const p = document.createElement(\"p\");\n  p.append(url);\n  address.url = url;\n  address.append(p);\n  const tokenInput = document.createElement(\"input\");\n  tokenInput.setAttribute(\"id\", \"token\");\n  address.tokenInput = tokenInput;\n  address.append(tokenInput);\n  const closeBth = document.createElement(\"button\");\n  closeBth.textContent = \"OK\";\n  closeBth.classList.add(\"btn\");\n  closeBth.classList.add(\"btn-close\");\n  address.closeButton = closeBth;\n  address.append(closeBth);\n  return address;\n}\n\n//# sourceURL=webpack://App/./choose-host.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./choose-host.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});