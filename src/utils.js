define(function (require, exports, module) {

    var $ = require("$"),

        doc = document,
        stickyPrefix = ["-webkit-", "-ms-", "-o-", "-moz-", ""],

        isIE678 = !doc.addEventListener,
        isIE6 = isIE678 && !('maxHeight' in doc.body.style);

    return {
        // https://github.com/RubyLouvre/detectPositionFixed/blob/master/index.js
        checkPositionFixedSupported: function () {
            if (isIE678 && isIE6 == 6.0) return false;

            var positionfixed;

            var test = document.createElement('div'),
                control = test.cloneNode(false),
                root = document.body;

            var oldCssText = root.style.cssText;
            root.style.cssText = 'padding:0;margin:0';
            test.style.cssText = 'position:fixed;top:42px';
            root.appendChild(test);
            root.appendChild(control);

            positionfixed = test.offsetTop !== control.offsetTop;

            test.parentNode.removeChild(test);
            control.parentNode.removeChild(control);
            root.style.cssText = oldCssText;

            return positionfixed;
        },
        checkPositionStickySupported: function () {
            if (isIE678) return false;

            var container = doc.body;

            if (doc.createElement && container && container.appendChild && container.removeChild) {
                var isSupported,
                    el = doc.createElement("div"),
                    getStyle = function (st) {
                        if (window.getComputedStyle) {
                            return window.getComputedStyle(el).getPropertyValue(st);
                        } else {
                            return el.currentStyle.getAttribute(st);
                        }
                    };

                container.appendChild(el);

                for (var i = 0; i < stickyPrefix.length; i++) {
                    el.style.cssText = "position:" + stickyPrefix[i] + "sticky;visibility:hidden;";
                    if (isSupported = getStyle("position").indexOf("sticky") !== -1) break;
                }

                el.parentNode.removeChild(el);
                return isSupported;
            }

            return false;
        },
        indexOf: function (array, item) {
            if (array == null) return -1;
            var nativeIndexOf = Array.prototype;

            if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
            for (var i = 0; i < array.length; i++) if (array[i] === item) return i;
            return -1;
        },
        stickyPrefix: stickyPrefix
    }
});