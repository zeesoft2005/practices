var DomUtils = (function () {
    var _DomUtils = {};

    _DomUtils.createNode = function (tagName, css, id, innerContent, parentNode, tooltip) {
            var el = document.createElement(tagName || 'div');
            if (css) {
                el.className = css;
            }
            if (id) {
                el.setAttribute('id', id);
            }
            if (tooltip) {
                el.setAttribute('title', tooltip);
            }
            if (innerContent) {
                el.innerHTML = innerContent;
            }
            if (parentNode) {
                parentNode.appendChild(el);
        }
    
            return el;
    };

    _DomUtils.addStylesInPage = function (styleText) {
        //help link: https://www.geeksforgeeks.org/how-to-create-a-style-tag-using-javascript/
        var styleParentNode = document.getElementsByTagName('head')[0];
        var styleElement = DomUtils.createNode('style', null, null, this.style, styleParentNode);
        styleElement.type = 'text/css';
        styleElement.textContent = styleText;
    };
    _DomUtils.addClass = function (element, className) { 
        if (element) {
            if (className) {
                element.classList.add(className);
            }
        }
    };
    _DomUtils.removeClass = function (element, className, removeElement) { 
        if (element) {
            if (className) {
                element.classList.remove(className);
            }
        }
    };
    _DomUtils.fadeOut = function (element, removeElement, fadeOutTimeout, fadeOutClassName) {
            var me = this;
                setTimeout(function () { 
                    DomUtils.addClass(element, fadeOutClassName || 'fadeOut');
                    element.addEventListener("transitionend", function () {
                        if (removeElement) {
                            element.remove();
                        }
                    }, false);
                    
                }, fadeOutTimeout || 5 * 1000);
            
    };
    _DomUtils.raiseEventOn = function (element, event) { 
        element.dispatchEvent(new Event(event));
    };
    return _DomUtils;    
}());

