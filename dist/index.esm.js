import React, { useState, useRef, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
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
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

/**
 * Get the anchor element where the modal should be attached to.
 * @param selector - The CSS selector of the anchor element, or the anchor element itself.
 */
var getAnchorEl = function getAnchorEl(selector) {
  var type = _typeof(selector);
  if (type === 'string') {
    return document.querySelector(selector);
  } else if (type === 'function') {
    return selector();
  } else {
    return selector;
  }
};

var CUSTOM_ELEMENT_CLASS = "j-byted-guide__custom-anchor";

/**
 * Get the anchor element where the modal should be attached to.
 * @param selector - The CSS selector of the anchor element, or the anchor element itself.
 */
var getCusAnchorEl = function getCusAnchorEl(targetPos) {
  var preCusAnchor = document.querySelector(CUSTOM_ELEMENT_CLASS);
  preCusAnchor && document.body.removeChild(preCusAnchor);
  var cusAnchor = document.createElement('div');
  cusAnchor.className = CUSTOM_ELEMENT_CLASS;
  Object.entries(targetPos).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    cusAnchor.style[key] = value + 'px';
  });
  document.body.appendChild(cusAnchor);
  return cusAnchor;
};

/**
 * Get the window object using this function rather then simply use `window` because
 * there are cases where the window object we are seeking to reference is not in
 * the same window scope as the code we are running. (https://stackoverflow.com/a/37638629)
 */
var getWindow = function getWindow(node) {
  // if node is not the window object
  if (node.toString() !== '[object Window]') {
    // get the top-level document object of the node, or null if node is a document.
    var ownerDocument = node.ownerDocument;
    // get the window object associated with the document, or null if none is available.
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
};
var getDocument = function getDocument(node) {
  return (isElement(node) ? node.ownerDocument : node.document) || window.document;
};
/* Get the Element that is the root element of the document which contains the node
 * (for example, the <html> element for HTML documents).
 */
var getDocumentElement = function getDocumentElement(node) {
  return getDocument(node).documentElement;
};
/* Get node's style info */
var getComputedStyle = function getComputedStyle(node) {
  return getWindow(node).getComputedStyle(node);
};
/* Get node's node name */
var getNodeName = function getNodeName(node) {
  return node ? (node.nodeName || '').toLowerCase() : '';
};
var getParentNode = function getParentNode(node) {
  if (!node || getNodeName(node) === 'html') {
    return node;
  }
  return (
    // If node is rooted at a custom element, meaning the node is part of a shadow DOM
    node.assignedSlot ||
    // step into the shadow DOM of the parent of a slotted node
    node.parentNode ||
    // DOM Element detected
    node.host ||
    // ShadowRoot detected
    getDocumentElement(node) // fallback
  );
};
/* Check if node is an Element or a customized Element */
var isElement = function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
};
/* Check if node is an HTMLElement or a customized HTMLElement */
var isHTMLElement = function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
};
// Check if node is an HTMLElement or a customized HTMLElement
var isTableElement = function isTableElement(node) {
  return ['table', 'td', 'th'].indexOf(getNodeName(node)) >= 0;
};

/** Get the containing block for fixed positioned element as they don't have offsetParent */
var getContainingBlock = function getContainingBlock(node, callback) {
  callback === null || callback === void 0 ? void 0 : callback(node);
  var currentNode = getParentNode(node);
  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    callback === null || callback === void 0 ? void 0 : callback(currentNode);
    var css = getComputedStyle(currentNode);
    /**
     * If the position property is absolute or fixed,
     * the containing block may also be formed by the
     * edge of the padding box of the nearest ancestor
     * element that has the following:
     */
    if (css.transform !== 'none' || css.perspective !== 'none' || css.willChange && css.willChange !== 'auto') {
      return currentNode;
    }
    currentNode = getParentNode(currentNode);
  }
  return currentNode;
};
var getTrueOffsetParent = function getTrueOffsetParent(node) {
  if (!isHTMLElement(node) || getComputedStyle(node).position === 'fixed') {
    return null;
  }
  /**
   *  If there is no positioned ancestor element, the nearest ancestor td, th,
   *  table will be returned, or the body if there are no ancestor table elements either.
   */
  return node.offsetParent;
};
/**
 * Gets the closest ancestor positioned element.
 * Handles some edge cases, such as table ancestors and cross browser bugs.
 */
var getOffsetParent = function getOffsetParent(node, callback) {
  var window = getWindow(node);
  callback === null || callback === void 0 ? void 0 : callback(node);
  var offsetParent = getTrueOffsetParent(node);
  /* A Table element cannot be used as an offset parent,
   * as a <div> cannot appear as a child of <table>.
   */
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    callback === null || callback === void 0 ? void 0 : callback(offsetParent);
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  return offsetParent || getContainingBlock(node, callback) || window;
};
var getOffsetTop = function getOffsetTop(node) {
  var offsetTop = 0;
  getOffsetParent(node, function (node) {
    offsetTop += node.offsetTop;
  });
  return offsetTop;
};

var getScrollContainer = function getScrollContainer(node, callback) {
  var currentNode = getParentNode(node);
  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode);
    var overflowY = css.overflowY;
    var isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';
    callback === null || callback === void 0 ? void 0 : callback(currentNode);
    if (isScrollable && currentNode.scrollHeight > currentNode.clientHeight) {
      return currentNode;
    }
    currentNode = currentNode.parentNode;
  }
  return getDocumentElement(node);
};
// export const getOffsetTopRelativeToScrollContainer = (
//   node: Element | HTMLElement,
// ): Element => {
// };

var MARGIN = 12;

/**
 * 根据选择器所选元素、modal 的长宽、用户定义的 placement 和 offset，获取 modal 的位置
 * Calculate the modal's position based on its anchor element, user-defined placement and offset
 * @param {HTMLElement} modalEl
 * @param {Element} anchorEl
 * @param {Element} parentEl
 * @param {string} placement
 * @param {object} customOffset
 */
var getModalStyle = function getModalStyle(modalEl, anchorEl, parentEl, scrollContainer) {
  var placement = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'bottom';
  var customOffset = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
    x: 0,
    y: 0
  };
  var modalPos = modalEl.getBoundingClientRect();
  var anchorPos = anchorEl.getBoundingClientRect();
  var parentPos = parentEl.getBoundingClientRect();
  var scrollTop = scrollContainer.scrollTop;
  var isParentBody = getNodeName(parentEl) === 'body';
  var isAnchorFixed = getComputedStyle(anchorEl).position === 'fixed';
  var anchorOffsetTop = getOffsetTop(anchorEl);
  var scrollY = isAnchorFixed ? anchorPos.top : isParentBody ? anchorPos.top + scrollTop : anchorOffsetTop;
  /* The distance between the top of the offsetParent and the top of the anchor.
   *
   * We don't simply use anchorEl.offsetTop but the below code instead due to the following reason:
   * for the cases with no mask, the anchorEl's should be positioned relative to the body rather than
   * its real offsetParent.
   */
  var top = scrollY;
  var bottom = anchorPos.height + scrollY;
  var left = anchorPos.left - parentPos.left;
  var width = anchorPos.width,
    height = anchorPos.height;
  var transform = {
    top: {
      // modal放到内容的上面
      top: top - modalPos.height - MARGIN,
      left: left + width / 2 - modalPos.width / 2
    },
    bottom: {
      // modal放到内容的下面
      top: bottom + MARGIN,
      left: left + width / 2 - modalPos.width / 2
    },
    left: {
      // modal放到内容的左边
      top: top + height / 2 - modalPos.height / 2,
      left: left - modalPos.width - MARGIN
    },
    right: {
      // modal放到内容的右边
      top: top + height / 2 - modalPos.height / 2,
      left: left + width + MARGIN
    },
    'top-right': {
      // modal的bottom-border紧贴内容的top-border，right-borders水平对齐
      top: top - modalPos.height - MARGIN,
      left: left + width - modalPos.width
    },
    'top-left': {
      // modal的bottom-border紧贴内容的top-border，left-borders水平对齐
      top: top - modalPos.height - MARGIN,
      left: left
    },
    'bottom-right': {
      // modal的top-border紧贴内容的bottom-border，right-borders水平对齐
      top: bottom + MARGIN,
      left: left + width - modalPos.width
    },
    'bottom-left': {
      // modal的top-border紧贴内容的bottom-border，left-borders水平对齐
      top: bottom + MARGIN,
      left: left
    },
    'right-top': {
      // modal的left-border紧贴内容的right-border，top-borders水平对齐
      top: top,
      left: left + width + MARGIN
    },
    'left-top': {
      // modal的right-border紧贴内容的left-border，top-borders水平对齐
      top: top,
      left: left - modalPos.width - MARGIN
    },
    'right-bottom': {
      // modal的left-border紧贴内容的right-border，bottom-borders水平对齐
      top: bottom - modalPos.height,
      left: left + width + MARGIN
    },
    'left-bottom': {
      // modal的right-border紧贴内容的left-border，bottom-borders水平对齐
      top: bottom - modalPos.height,
      left: left - modalPos.width - MARGIN
    }
  };
  var offset = {
    x: customOffset.x || 0,
    y: customOffset.y || 0
  };
  var position = transform[placement];
  return {
    position: isAnchorFixed ? 'fixed' : 'absolute',
    top: position.top + offset.y,
    left: position.left + offset.x
  };
};

var getMaskStyle = function getMaskStyle(anchorEl) {
  var scrollContainer = getDocumentElement(anchorEl);
  // prevent scrolling
  scrollContainer.style.overflow = 'hidden';
  var scrollWidth = scrollContainer.scrollWidth,
    scrollHeight = scrollContainer.scrollHeight,
    scrollTop = scrollContainer.scrollTop;
  var anchorPos = anchorEl.getBoundingClientRect();
  var height = anchorPos.height,
    width = anchorPos.width,
    left = anchorPos.left;
  var top = anchorPos.top + scrollTop;
  return {
    width: scrollWidth,
    height: scrollHeight,
    borderTopWidth: Math.max(top, 0),
    borderBottomWidth: Math.max(scrollHeight - height - top, 0),
    borderRightWidth: Math.max(scrollWidth - width - left, 0),
    borderLeftWidth: Math.max(left, 0)
  };
};

var getReversePosition = function getReversePosition(position) {
  var map = {
    bottom: 'top',
    top: 'bottom',
    left: 'right',
    right: 'left'
  };
  return map[position];
};

var getArrowStyle = function getArrowStyle(modalEl) {
  var placement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'bottom';
  var mask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var margin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 12;
  var modalPos = modalEl.getBoundingClientRect();
  var diagonalWidth = 10;
  var _placement$split = placement.split('-'),
    _placement$split2 = _slicedToArray(_placement$split, 2),
    firstPlacement = _placement$split2[0],
    lastPlacement = _placement$split2[1];
  var boxShadowmMap = {
    top: '1px 1px 1px 0px #ccc',
    right: '-1px 1px 1px 0px #ccc',
    bottom: '-1px -1px 1px 0px #ccc',
    left: '1px -1px 1px 0px #ccc'
  };
  var extraStyle = _defineProperty({
    boxShadow: mask ? 'none' : boxShadowmMap[firstPlacement]
  }, getReversePosition(firstPlacement), -diagonalWidth / 2);
  if (!lastPlacement) {
    var style = {};
    if (['bottom', 'top'].includes(firstPlacement)) {
      style['right'] = (modalPos.width - diagonalWidth) / 2;
    }
    if (['left', 'right'].includes(firstPlacement)) {
      style['top'] = (modalPos.height - diagonalWidth) / 2;
    }
    return _objectSpread2(_objectSpread2({}, style), extraStyle);
  } else {
    return _objectSpread2(_defineProperty({}, lastPlacement, margin * 2), extraStyle);
  }
};

var getHotSpotStyle = function getHotSpotStyle() {
  var placement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'bottom';
  var arrowStyle = arguments.length > 1 ? arguments[1] : undefined;
  var _placement$split = placement.split('-'),
    _placement$split2 = _slicedToArray(_placement$split, 2),
    firstPlacement = _placement$split2[0],
    lastPlacement = _placement$split2[1];
  var reversePlacement = getReversePosition(firstPlacement);
  var diagonalWidth = 24;
  if (['top', 'bottom'].includes(firstPlacement)) {
    var _ref2;
    if (!lastPlacement || lastPlacement === 'right') {
      var _ref;
      return _ref = {}, _defineProperty(_ref, reversePlacement, arrowStyle[reversePlacement] - diagonalWidth), _defineProperty(_ref, "right", arrowStyle.right - 3), _ref;
    }
    return _ref2 = {}, _defineProperty(_ref2, reversePlacement, arrowStyle[reversePlacement] - diagonalWidth), _defineProperty(_ref2, "left", arrowStyle.left - 3), _ref2;
  }
  if (['right', 'left'].includes(firstPlacement)) {
    if (!lastPlacement || lastPlacement === 'top') {
      return _defineProperty({
        top: arrowStyle.top - 3
      }, reversePlacement, arrowStyle[reversePlacement] - diagonalWidth);
    }
    return _defineProperty({
      bottom: arrowStyle.bottom - 3
    }, reversePlacement, arrowStyle[reversePlacement] - diagonalWidth);
  }
  return arrowStyle;
};

var LANGUAGES = {
  NEXT_STEP: {
    zh: '下一步',
    en: 'Next step',
    ja: '次のステップ'
  },
  I_KNOW: {
    zh: '我知道了',
    en: 'I know',
    ja: '知ってる'
  },
  STEP_NUMBER: {
    zh: function zh(idx, length) {
      return "\u7B2C".concat(idx, "\u6B65\uFF0C \u5171").concat(length, "\u6B65");
    },
    en: function en(idx, length) {
      return "Step ".concat(idx, " of ").concat(length);
    },
    ja: function ja(idx, length) {
      return "Step ".concat(idx, " of ").concat(length);
    }
  },
  PREV_STEP: {
    zh: '上一步',
    en: 'Previous step',
    ja: '前へ'
  },
  SKIP_STEP: {
    zh: '跳过',
    en: 'Skip',
    ja: 'スキップ'
  }
};
function i18n() {
  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'zh';
  return function (key) {
    var _LANGUAGES$key;
    return (_LANGUAGES$key = LANGUAGES[key]) === null || _LANGUAGES$key === void 0 ? void 0 : _LANGUAGES$key[lang];
  };
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".guide-mask {\n  position: absolute;\n  left: 0;\n  top: 0;\n  border-color: rgba(0, 0, 0, 0.6);\n  border-style: solid;\n  z-index: 1001;\n  box-sizing: border-box;\n}\n.guide-mask::after {\n  content: '';\n  display: block;\n  position: absolute;\n  top: -1px;\n  left: -1px;\n  width: 100%;\n  height: 100%;\n  border-radius: 4px;\n  border: 1px solid #fff;\n  box-shadow: 0 0 0 1px #fff;\n  background: transparent;\n}\n";
styleInject(css_248z);

var Mask = function Mask(_ref) {
  var className = _ref.className,
    anchorEl = _ref.anchorEl,
    realWindow = _ref.realWindow;
  var _useState = useState({}),
    _useState2 = _slicedToArray(_useState, 2),
    style = _useState2[0],
    setStyle = _useState2[1];
  var timerRef = useRef(0);
  var calculateStyle = function calculateStyle() {
    var style = getMaskStyle(anchorEl);
    setStyle(style);
  };
  var handleResize = function handleResize() {
    if (timerRef.current) realWindow.cancelAnimationFrame(timerRef.current);
    timerRef.current = realWindow.requestAnimationFrame(function () {
      calculateStyle();
    });
  };
  useEffect(function () {
    calculateStyle();
  }, [anchorEl]);
  useEffect(function () {
    realWindow.addEventListener('resize', handleResize);
    return function () {
      realWindow.removeEventListener('resize', handleResize);
    };
  }, [realWindow, anchorEl]);
  if (!anchorEl) return null;
  return /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", {
    className: "guide-mask ".concat(className),
    style: style
  }), getDocument(anchorEl).body);
};

var CloseSmall = function CloseSmall(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? '16' : _ref$size,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? '#666' : _ref$fill,
    _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? function () {} : _ref$onClick,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    className: className
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
    fillOpacity: "0.01",
    fill: "#FFFFFF",
    x: "0",
    y: "0",
    width: "48",
    height: "48",
    strokeWidth: "4",
    stroke: "none",
    fillRule: "evenodd"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14,14 L34,34",
    stroke: fill,
    strokeWidth: "4",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
    fillRule: "evenodd"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14,34 L34,14",
    stroke: fill,
    strokeWidth: "4",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
    fillRule: "evenodd"
  })))));
};

var css_248z$1 = ".guide-modal {\n  position: absolute;\n  width: 340px;\n  z-index: 1100;\n  background: #fff;\n  box-shadow: 0px 0px 4px 0px #999;\n  border-radius: 4px;\n  padding: 16px;\n  box-shadow: 0px 2px 6px 0px #999999;\n}\n.guide-modal * {\n  font-family: PingFangSC-Regular, PingFang SC;\n  text-align: left;\n}\n.guide-modal-title {\n  display: block;\n  font-size: 14px;\n  font-weight: 600;\n  height: 22px;\n  line-height: 22px;\n  margin-bottom: 8px;\n}\n.guide-modal-content {\n  color: #666666;\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 20px;\n  margin-bottom: 16px;\n}\n.guide-modal-close-icon {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  cursor: pointer;\n}\n.guide-modal-arrow {\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  background: #fff;\n  transform: rotate(45deg);\n}\n.guide-modal-hotspot {\n  position: absolute;\n  width: 16px;\n  height: 16px;\n  -webkit-border-radius: 50%;\n  border-radius: 50%;\n  background-color: #4e83fd;\n  animation: pulse 1s infinite;\n}\n.guide-modal-footer {\n  width: 100%;\n  max-height: 26px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.guide-modal-footer * {\n  font-size: 12px;\n  font-weight: 400;\n}\n.guide-modal-footer-text {\n  color: #999999;\n}\n.guide-modal-footer-btn-group {\n  display: flex;\n  justify-self: flex-end;\n}\n.guide-modal-footer-btn {\n  padding: 3px 16px;\n  line-height: 20px;\n  border-radius: 4px;\n  color: #ffffff;\n  background: #2f88ff;\n  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.08);\n  border: none;\n  outline: none;\n  cursor: pointer;\n  word-break: keep-all;\n}\n.guide-modal-footer-btn:hover {\n  background-color: #40a9ff;\n}\n.guide-modal-footer-btn:focus {\n  outline: none;\n  box-shadow: 0px 0px 4px #338aff;\n  transition: 0.3s;\n}\n.guide-modal-footer-prev-btn {\n  margin-right: 10px;\n}\n.guide-modal-footer-skip-btn {\n  margin-right: 10px;\n}\n.guide-modal-title:focus {\n  background: yellow;\n  box-shadow: 0px 0px 4px #338aff;\n  border: dotted 1px #ccc;\n}\n@keyframes pulse {\n  from {\n    box-shadow: 0 0 0 0 #4e83fd;\n  }\n  to {\n    box-shadow: 0 0 0 8px transparent;\n  }\n}\n";
styleInject(css_248z$1);

var PREFIX = 'guide-modal';
var Modal = function Modal(_ref) {
  var anchorEl = _ref.anchorEl,
    parentEl = _ref.parentEl,
    realWindow = _ref.realWindow,
    steps = _ref.steps,
    stepIndex = _ref.stepIndex,
    mask = _ref.mask,
    arrow = _ref.arrow,
    hotspot = _ref.hotspot,
    closable = _ref.closable,
    onClose = _ref.onClose,
    onChange = _ref.onChange,
    stepText = _ref.stepText,
    nextText = _ref.nextText,
    okText = _ref.okText,
    className = _ref.className,
    TEXT = _ref.TEXT,
    prevText = _ref.prevText,
    showPreviousBtn = _ref.showPreviousBtn,
    showSkipBtn = _ref.showSkipBtn,
    skipText = _ref.skipText,
    closeEle = _ref.closeEle,
    autoScroll = _ref.autoScroll;
  var stepInfo = steps[stepIndex];
  var visible = Object.prototype.hasOwnProperty.call(stepInfo, 'visible') ? stepInfo.visible : true;
  var modalRef = useRef(null);
  var timerRef = useRef(0);
  /* The ref to the currently focused element */
  var focusedElRef = useRef(null);
  /* the index of the focused element in the NodeList `focusableEls` */
  var focusedIdxRef = useRef(0);
  var _useState = useState({}),
    _useState2 = _slicedToArray(_useState, 2),
    modalStyle = _useState2[0],
    setModalStyle = _useState2[1];
  var _useState3 = useState({}),
    _useState4 = _slicedToArray(_useState3, 2),
    arrowStyle = _useState4[0],
    setArrowStyle = _useState4[1];
  var _useState5 = useState({}),
    _useState6 = _slicedToArray(_useState5, 2),
    hotspotStyle = _useState6[0],
    setHotspotStyle = _useState6[1];
  var scrollContainer = useMemo(function () {
    return getScrollContainer(anchorEl);
  }, [anchorEl]);
  var _okText = stepIndex !== steps.length - 1 ? nextText || TEXT('NEXT_STEP') : okText || TEXT('I_KNOW');
  var _prevText = prevText || TEXT('PREV_STEP');
  var _skipText = skipText || TEXT('SKIP_STEP');
  var _stepText = stepText || TEXT('STEP_NUMBER');
  var calculateStyle = function calculateStyle() {
    var placement = stepInfo.placement,
      offset = stepInfo.offset;
    var modalEl = modalRef.current;
    if (!modalEl) return;
    var modalStyle = getModalStyle(modalEl, anchorEl, parentEl, scrollContainer, placement, offset);
    var arrowStyle = getArrowStyle(modalEl, placement, mask);
    var hotspotStyle = getHotSpotStyle(placement, arrowStyle);
    setModalStyle(modalStyle);
    setArrowStyle(arrowStyle);
    setHotspotStyle(hotspotStyle);
  };
  var handleNextChange = function handleNextChange() {
    var _stepInfo$beforeStepC;
    (_stepInfo$beforeStepC = stepInfo.beforeStepChange) === null || _stepInfo$beforeStepC === void 0 ? void 0 : _stepInfo$beforeStepC.call(stepInfo, stepInfo, stepIndex, steps);
    onChange(1);
  };
  var handlePreviousChange = function handlePreviousChange() {
    var _stepInfo$beforeStepC2;
    (_stepInfo$beforeStepC2 = stepInfo.beforeStepChange) === null || _stepInfo$beforeStepC2 === void 0 ? void 0 : _stepInfo$beforeStepC2.call(stepInfo, stepInfo, stepIndex, steps);
    onChange(-1);
  };
  var handleScroll = function handleScroll() {
    var modalEl = modalRef.current;
    var anchorPos = anchorEl.getBoundingClientRect();
    var modalPos = modalEl.getBoundingClientRect();
    var scrollPos = scrollContainer.getBoundingClientRect();
    var isScrollContainerHtml = getNodeName(scrollContainer) === 'html';
    /* scroll the scroll container to show the modal */
    var visibleHeight = scrollContainer.clientHeight;
    var scrollContainerTop = isScrollContainerHtml ? 0 : scrollPos.top;
    if (
    // Modal is below the viewport
    anchorPos.top - scrollContainerTop + anchorPos.height + modalPos.height + MARGIN >= visibleHeight ||
    // Modal is above the viewport
    anchorPos.top <= modalPos.height + MARGIN) {
      // scrolls to a particular set of coordinates inside a given element.
      scrollContainer.scrollTo({
        left: 0,
        top: scrollContainer.scrollTop + anchorPos.top - scrollContainerTop + anchorPos.height / 2 - visibleHeight / 2 + MARGIN,
        behavior: 'smooth'
      });
    }
    if (getNodeName(scrollContainer) === 'html') return;
    var documentEl = getDocumentElement(anchorEl);
    /* scroll to show the scroll container */
    if (
    // Modal is below the viewport
    scrollPos.top + scrollPos.height >= window.innerHeight ||
    // Modal is above the viewport
    scrollPos.bottom > scrollPos.height) {
      // scrolls to a particular set of coordinates inside a given element.
      documentEl.scrollTo({
        left: 0,
        top: documentEl.scrollTop + scrollPos.top + scrollPos.height / 2 - window.innerHeight / 2 + MARGIN,
        behavior: 'smooth'
      });
    }
  };
  var handleResize = function handleResize() {
    if (timerRef.current) realWindow.cancelAnimationFrame(timerRef.current);
    timerRef.current = realWindow.requestAnimationFrame(function () {
      calculateStyle();
    });
  };
  var handleKeydown = function handleKeydown(e) {
    var _modalRef$current, _e$preventDefault, _focusedElRef$current;
    var focusableEls = ((_modalRef$current = modalRef.current) === null || _modalRef$current === void 0 ? void 0 : _modalRef$current.querySelectorAll('.guide-modal-title, .guide-modal-content, .guide-modal-footer-text, .guide-modal-footer-btn')) || null;
    if (e.keyCode !== 9 || !focusableEls) return;
    e === null || e === void 0 ? void 0 : (_e$preventDefault = e.preventDefault) === null || _e$preventDefault === void 0 ? void 0 : _e$preventDefault.call(e);
    var idx = focusedIdxRef.current;
    var len = focusableEls.length;
    var ele = focusableEls[idx];
    (_focusedElRef$current = focusedElRef.current) === null || _focusedElRef$current === void 0 ? void 0 : _focusedElRef$current.blur();
    ele.focus();
    focusedElRef.current = ele;
    if (idx === len - 1 && !e.shiftKey) {
      focusedIdxRef.current = 0;
    } else if (idx === 0 && e.shiftKey) {
      focusedIdxRef.current = len - 1;
    } else if (e.shiftKey) {
      focusedIdxRef.current--;
    } else {
      focusedIdxRef.current++;
    }
  };
  useEffect(function () {
    if (stepInfo.skip) {
      onChange(1);
    } else if (visible) {
      focusedIdxRef.current = 0;
      if (autoScroll) {
        handleScroll();
      }
      handleKeydown({
        keyCode: 9
      });
      calculateStyle();
      realWindow.addEventListener('resize', handleResize);
      realWindow.addEventListener('keydown', handleKeydown);
      return function () {
        realWindow.removeEventListener('resize', handleResize);
        realWindow.removeEventListener('keydown', handleKeydown);
      };
    }
  }, [visible, stepInfo, anchorEl]);
  return visible ? /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", {
    ref: modalRef,
    className: "".concat(PREFIX, " ").concat(className),
    style: modalStyle
  }, arrow && /*#__PURE__*/React.createElement("span", {
    className: "".concat(PREFIX, "-arrow"),
    style: arrowStyle
  }), hotspot && /*#__PURE__*/React.createElement("div", {
    className: "".concat(PREFIX, "-hotspot"),
    style: hotspotStyle
  }), closeEle ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(PREFIX, "-close-icon"),
    onClick: onClose
  }, closeEle) : closable ? /*#__PURE__*/React.createElement(CloseSmall, {
    className: "".concat(PREFIX, "-close-icon"),
    onClick: onClose
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "".concat(PREFIX, "-title")
  }, stepInfo.title), /*#__PURE__*/React.createElement("div", {
    className: "".concat(PREFIX, "-content")
  }, typeof stepInfo.content === 'function' ? stepInfo.content() : stepInfo.content), /*#__PURE__*/React.createElement("div", {
    className: "".concat(PREFIX, "-footer")
  }, /*#__PURE__*/React.createElement("span", {
    className: "".concat(PREFIX, "-footer-text")
  }, _stepText(stepIndex + 1, steps.length)), /*#__PURE__*/React.createElement("div", {
    className: "".concat(PREFIX, "-footer-btn-group")
  }, showSkipBtn && stepIndex != steps.length - 1 && /*#__PURE__*/React.createElement("button", {
    className: "".concat(PREFIX, "-footer-btn ").concat(PREFIX, "-footer-skip-btn"),
    onClick: onClose
  }, String(_skipText)), showPreviousBtn && stepIndex !== 0 && /*#__PURE__*/React.createElement("button", {
    className: "".concat(PREFIX, "-footer-btn ").concat(PREFIX, "-footer-prev-btn"),
    onClick: handlePreviousChange
  }, String(_prevText)), /*#__PURE__*/React.createElement("button", {
    className: "".concat(PREFIX, "-footer-btn ").concat(PREFIX, "-footer-next-btn"),
    onClick: handleNextChange
  }, String(_okText))))), parentEl) : null;
};

var Guide = function Guide(props) {
  var steps = props.steps,
    localKey = props.localKey,
    _props$mask = props.mask,
    mask = _props$mask === void 0 ? true : _props$mask,
    _props$arrow = props.arrow,
    arrow = _props$arrow === void 0 ? true : _props$arrow,
    _props$hotspot = props.hotspot,
    hotspot = _props$hotspot === void 0 ? false : _props$hotspot,
    _props$closable = props.closable,
    closable = _props$closable === void 0 ? true : _props$closable,
    _props$modalClassName = props.modalClassName,
    modalClassName = _props$modalClassName === void 0 ? '' : _props$modalClassName,
    _props$maskClassName = props.maskClassName,
    maskClassName = _props$maskClassName === void 0 ? '' : _props$maskClassName,
    _props$expireDate = props.expireDate,
    expireDate = _props$expireDate === void 0 ? '' : _props$expireDate,
    _props$step = props.step,
    step = _props$step === void 0 ? 0 : _props$step,
    beforeStepChange = props.beforeStepChange,
    afterStepChange = props.afterStepChange,
    onClose = props.onClose,
    stepText = props.stepText,
    prevText = props.prevText,
    skipText = props.skipText,
    nextText = props.nextText,
    okText = props.okText,
    _props$lang = props.lang,
    lang = _props$lang === void 0 ? 'zh' : _props$lang,
    _props$autoScroll = props.autoScroll,
    autoScroll = _props$autoScroll === void 0 ? true : _props$autoScroll,
    _props$showPreviousBt = props.showPreviousBtn,
    showPreviousBtn = _props$showPreviousBt === void 0 ? false : _props$showPreviousBt,
    _props$showSkipBtn = props.showSkipBtn,
    showSkipBtn = _props$showSkipBtn === void 0 ? false : _props$showSkipBtn,
    closeEle = props.closeEle;
  var _useState = useState(-1),
    _useState2 = _slicedToArray(_useState, 2),
    stepIndex = _useState2[0],
    setStepIndex = _useState2[1];
  /* store the initial overflow value of the document */
  var _useState3 = useState(''),
    _useState4 = _slicedToArray(_useState3, 2),
    initOverflowVal = _useState4[0],
    setInitOverflowVal = _useState4[1];
  /* used to trigger a calculation of anchorEl */
  var _useState5 = useState(0),
    _useState6 = _slicedToArray(_useState5, 2),
    ticker = _useState6[0],
    setTicker = _useState6[1];
  var i18nTEXT = useMemo(function () {
    return i18n(lang);
  }, [lang]);
  var visible = Object.prototype.hasOwnProperty.call(props, 'visible') ? props.visible : true;
  var anchorEl = useMemo(function () {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      var _steps$stepIndex = steps[stepIndex],
        targetPos = _steps$stepIndex.targetPos,
        selector = _steps$stepIndex.selector;
      if (selector) return getAnchorEl(selector);
      if (targetPos) {
        return getCusAnchorEl(targetPos);
      }
    }
    return null;
  }, [stepIndex, steps[stepIndex], ticker]);
  var parentEl = useMemo(function () {
    return anchorEl ? steps[stepIndex].parent === 'body' || mask ? getDocument(anchorEl).body : getOffsetParent(anchorEl) : null;
  }, [anchorEl]);
  /* To cater the cases of using iframe where the anchorEl
   * is not in the same window scope as the code running
   */
  var realWindow = useMemo(function () {
    return anchorEl ? getWindow(anchorEl) : null;
  }, [anchorEl]);
  var realDocument = useMemo(function () {
    return anchorEl ? getDocumentElement(anchorEl) : null;
  }, [anchorEl]);
  var handleChange = function handleChange(direction) {
    var nextStepIndex = Math.min(Math.max(stepIndex + direction, 0), steps.length);
    if (nextStepIndex === stepIndex) return;
    if (nextStepIndex === steps.length) handleClose();else if (stepIndex >= 0) beforeStepChange === null || beforeStepChange === void 0 ? void 0 : beforeStepChange(stepIndex, steps[stepIndex]);
    setStepIndex(nextStepIndex);
  };
  var handleClose = function handleClose() {
    /* If the mask is displayed, the document's overflow value would have been set to `hidden`.
     * It should be recovered to its initial value as saved by initOverflowVal
     */
    if (mask) {
      realDocument.style.overflow = initOverflowVal;
    }
    var cusAnchor = document.querySelector(CUSTOM_ELEMENT_CLASS);
    if (cusAnchor) {
      document.body.removeChild(cusAnchor);
    }
    setStepIndex(-1);
    onClose === null || onClose === void 0 ? void 0 : onClose();
    if (localKey) localStorage.setItem(localKey, 'true');
  };
  // skip the guide when click the escape key;
  var handleKeydown = function handleKeydown(e) {
    if (e.key === 'Escape' && (closable || stepIndex === steps.length - 1)) {
      handleClose();
    }
  };
  useEffect(function () {
    if (visible) {
      var haveShownGuide = localKey ? localStorage.getItem(localKey) : false;
      var expireDateParse = new Date(Date.parse(expireDate.replace(/-/g, '/')));
      if (!haveShownGuide && (!expireDate || new Date() <= expireDateParse)) {
        setStepIndex(step);
      }
    } else {
      setStepIndex(-1);
    }
  }, [visible, step]);
  useEffect(function () {
    if (realWindow && realDocument) {
      realWindow.addEventListener('keydown', handleKeydown);
      return function () {
        realWindow.removeEventListener('keydown', handleKeydown);
      };
    }
  }, [realWindow, realDocument]);
  useEffect(function () {
    if (stepIndex >= 0) {
      afterStepChange === null || afterStepChange === void 0 ? void 0 : afterStepChange(stepIndex, steps[stepIndex]);
    }
  }, [stepIndex]);
  useEffect(function () {
    if (mask && realDocument) {
      var curOverflow = realDocument.style.overflow;
      setInitOverflowVal(curOverflow || 'scroll');
    }
  }, [mask, realDocument]);
  useEffect(function () {
    if (stepIndex >= 0) {
      var config = {
        childList: true,
        subtree: true
      };
      var observer = new MutationObserver(function () {
        setTicker(ticker + 1);
      });
      observer.observe(document, config);
      return function () {
        observer.disconnect();
      };
    }
  }, [stepIndex, ticker]);
  return (!mask || initOverflowVal) && parentEl ? /*#__PURE__*/React.createElement(React.Fragment, null, mask && /*#__PURE__*/React.createElement(Mask, {
    className: maskClassName,
    anchorEl: anchorEl,
    realWindow: realWindow
  }), /*#__PURE__*/React.createElement(Modal, {
    anchorEl: anchorEl,
    parentEl: parentEl,
    realWindow: realWindow,
    steps: steps,
    stepIndex: stepIndex,
    mask: mask,
    arrow: arrow,
    hotspot: hotspot,
    closable: closable,
    closeEle: closeEle,
    onClose: handleClose,
    onChange: handleChange,
    stepText: stepText,
    prevText: prevText,
    nextText: nextText,
    okText: okText,
    skipText: skipText,
    className: modalClassName,
    TEXT: i18nTEXT,
    autoScroll: autoScroll,
    showPreviousBtn: showPreviousBtn,
    showSkipBtn: showSkipBtn
  })) : null;
};

var css_248z$2 = ".j-byted-guide__custom-anchor {\n  position: absolute;\n  pointer-events: none;\n  opacity: 0;\n}\n";
styleInject(css_248z$2);

export default Guide;
export { CUSTOM_ELEMENT_CLASS };
