NS.create('Core.DomUtils', (function () {
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
        var styleElement = _DomUtils.createNode('style', null, null, this.style, styleParentNode);
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
    //removes all classes and optionally sets only the specified css
    _DomUtils.removeClass = function (element, className) {
        
        element.className = '';//clear previous classes
        if (className) {
            _DomUtils.addClass(element, className);
        }
    };
    _DomUtils.fadeOut = function (element, removeElement, fadeOutTimeout, fadeOutClassName) {
            var me = this;
                setTimeout(function () { 
                    _DomUtils.addClass(element, fadeOutClassName || 'fadeOut');
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
    var _tmplCache = {};
     _DomUtils.parseTemplate = function (str, data) {
        /// <summary>
        /// Client side template parser that uses &lt;#= #&gt; and &lt;# code #&gt; expressions.
        /// and # # code blocks for template expansion.
        /// NOTE: chokes on single quotes in the document in some situations
        ///       use &amp;rsquo; for literals in text and avoid any single quote
        ///       attribute delimiters.
        /// </summary>
        /// <param name="str" type="string">The text of the template to expand</param>
        /// <param name="data" type="var">
        /// Any data that is to be merged. Pass an object and
        /// that object's properties are visible as variables.
        /// </param>
        /// <returns type="string" />
        var err = "";
        try {
            var func = _tmplCache[str];
            if (!func) {
                var strFunc =
                    "var p=[],print=function(){p.push.apply(p,arguments);};" +
                    "with(obj){p.push('" +
                    str.replace(/[\r\t\n]/g, " ")
                        .replace(/'(?=[^#]*#>)/g, "\t")
                        .split("'").join("\\'")
                        .split("\t").join("'")
                        .replace(/<#=(.+?)#>/g, "',$1,'")
                        .split("<#").join("');")
                        .split("#>").join("p.push('")
                    + "');}return p.join('');";

                //alert(strFunc);
                func = new Function("obj", strFunc);
                _tmplCache[str] = func;
            }
            return func(data);
        } catch (e) { err = e.message; }
        return "< # ERROR: " + (err.htmlEncode ? err.htmlEncode() : err) + " # >";
    };
    return _DomUtils;    
}()));

