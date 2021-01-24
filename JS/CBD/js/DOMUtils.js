var DomUtils = {};

DomUtils.createNode = function (tagName, css, id, innerContent, parentNode, tooltip) {
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
//utility function for a Child class to extend a Parent class
DomUtils.extend = function(Parent, Child){
Child.prototype = Object.create(Parent.prototype);
Object.defineProperty(Child.prototype, 'constructor', {value: Child,enumerable: false, writable: true });
};
DomUtils.addStylesInPage = function (styleText) {
    //help link: https://www.geeksforgeeks.org/how-to-create-a-style-tag-using-javascript/
    var styleParentNode = document.getElementsByTagName('head')[0];
    var styleElement = DomUtils.createNode('style', null, null, this.style, styleParentNode);
    styleElement.type = 'text/css';
    styleElement.textContent = styleText;
};
DomUtils.addClass = function (element, className) { 
    if (element) {
        if (className) {
            element.classList.add(className);
        }
    }
};
DomUtils.removeClass = function (element, className, removeElement) { 
    if (element) {
        if (className) {
            element.classList.remove(className);
        }
    }
};
 DomUtils.fadeOut = function (element, removeElement, fadeOutTimeout, fadeOutClassName) {
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
DomUtils.raiseEventOn = function (element, event) { 
    element.dispatchEvent(new Event(event));
};