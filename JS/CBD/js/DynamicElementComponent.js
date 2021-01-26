
/*
This class is meant for creating custom html components with basic functionality such as:
show/hide, setContent/setIcon and listen for click/mouseover/mouseout events
*/
var DynamicElement = (function () {
    //private data: variables and methods
    var custom_id_prefix = 'c_';
    function getRandomInt(min, max) {
        var min = Math.ceil(min);
        var max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    };
    var _render = function () { 
        if (this.isRendered) {
            return;
        }
        this.parent.appendChild(this.el);
        if (this.css) {
            this.el.style = this.css;
        }
        if (this.styles) {
            DomUtils.addStylesInPage(this.styles);
        }
       // debugger
        _setIcon.call(this, this.icon);   
        this.isRendered = true;
    };
    var _init = function (options) {
            if (options) {
                this.id = options.id || custom_id_prefix + getRandomInt(1,1000);
                this.tooltipText = options.tooltipText;
                this.icon = options.icon;
                this.cls = options.cls;
                this.content = options.content;
                this.css = options.css;
                this.styles = options.styles;
                this.tag = options.tagName;
                this.showOnCreation = options.showOnCreation === undefined? true : options.showOnCreation;
                this.parent = document.querySelector(options.targetSelector) || document.body;
        }
        this.isRendered = false;
        this.el = DomUtils.createNode(this.tag, this.cls, this.id, this.content, null, this.tooltipText);

        if (this.showOnCreation) {
            _render.call(this);
        }
            return this;
    };
    var _setContent = function (content) {
        this.el.innerHTML = content || this.content;   
        //this.content = content;//conrext magic: this is the object itself
    };
    var _onClick = function (cb) {
            this.el.addEventListener('click', cb);
    };
    var _onMouseOver = function (cb) {
            this.el.addEventListener('mouseover', cb);
    };
    var _onMouseOut = function (cb) {
            this.el.addEventListener('mouseout', cb);
    };
    var _setIcon = function (iconUrl) {
        if (!iconUrl) {
            return;
        }
        var icon = iconUrl;        
        var iconImg = DomUtils.createNode('img');
        iconImg.setAttribute('src', icon);
        if (this.iconPos) {
            iconImg.style.float = this.iconPos;
        }
        this.el.appendChild(iconImg);        
    };
    var _show = function (content, showClassName) {
        var content = content || this.content; 
        if (!this.isRendered) {
            _render.call(this);
       }
        this.el.innerHTML = content;        
        if (showClassName) {
            DomUtils.addClass(this.el, showClassName);
        } else {
            this.el.style.display = 'block';
        }
        
    };
    var _hide = function (hideClassName, fadeOut) {    

        if (hideClassName) {
            DomUtils.addClass(this.el, hideClassName);
        }
        else if (fadeOut) {
            DomUtils.fadeOut(this.el);
        }
        else {
            this.el.style.display = 'none';
        }
      
    };
    var _removeElement = function () { 
        this.parent.removeChild(this.el);
        this.isRendered = false;
    };
    
    //methods which we will expose publically to the caller
    var PUBLIC_METHODS = {
        //setters
        setContent: _setContent,
        setIcon: _setIcon,
        //events
        onClick: _onClick,
        onMouseOver: _onMouseOver,
        onMouseOut: _onMouseOut,
        //show/hide component
        showElement: _show,
        hideElement: _hide    
    };
    //constructor function used to instantiate objects
    function DynamicElement(options) {
  
        if (options) {           
                _init.call(this, options);            
        }
        else if (!(options.text || options.icon)) {
            throw 'Element must have some content or icon';
        }
        else {
           throw 'Element cannot be created without any options';
       }
    }
    DynamicElement.prototype = PUBLIC_METHODS;//expose methods for caller

    return DynamicElement; //return the constructor
}());

//HERE'S HOW WE CAN INHERIT FROM A PARENT COMPONENT AND CREATE A CHILD COMPONENT
var ChildElement = (function (parent) {

    function Child(options) {
        parent.call(this, options); 
        Utils.Extend(this, options);
    }
 
    Utils.Inherit(parent, Child);
    
    //add extended functionality
    Child.prototype.custom = function(params) {
        console.log('custom func:' + this.name);        
    };
  
    
    return Child;

}(DynamicElement));