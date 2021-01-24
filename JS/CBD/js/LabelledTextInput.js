var LabelledTextInput = (function () {

    var _init = function (options) {
        
        if (options) {
            this.id = options.id;
            this.label = options.label,
            this.input = options.input;
            this.inputErrorStyle = options.inputErrorStyle || 'border-color:red;';
        }
    if (options.targetSelector) {//if parent info given?  create a dom node
        this.parent = document.querySelector(options.targetSelector);
    } else {//create a div and append to body
        this.parent = DomUtils.createNode(null, "inputParent", null, null, document.body);
    }
    this.label.el.setAttribute('for', 'emailInput');
    this.input.el.setAttribute('name', 'emailInput');
    this.input.el.setAttribute('type', 'text');
    this.input.el.setAttribute('placeholder', options.inputPlaceholder);
    this.parent.appendChild(this.label.el);
    this.parent.appendChild(this.input.el);

    if (options.css) {//css style text? set
        this.parent.style = options.css;
    }
    //for testing purpose, call validate()
    //this.toggleInputStyle(true);
};
    
    var _toggleInputStyle = function (isError) {
          var hasValidValue = isError || this.validate();
        if (!hasValidValue) {
            this.input.el.style = this.inputErrorStyle;
        } else {
            this.input.el.style = '';
        }
    };
    var _validate = function () {
        //debugger
        var val = this.input.el.value;
        var validationRule = val.indexOf('@') > 0;
        if (validationRule) {
            return true;
        }
        return false;
    };
    var _clearInput = function () {
    this.input.el.value = '';
    };

var PUBLIC_METHODS = {
    toggleInputStyle: _toggleInputStyle,
    validate: _validate,
    clearInput: _clearInput
};
function LabelledTextInput(options) {
    
        if (options) {           
                _init.call(this, options);            
        }
        else if (!(options.label && options.input)) {
            throw 'Component must have a label and a input';
        }
        else {
           throw 'Component cannot be created without any options';
       }
}
    
    LabelledTextInput.prototype = PUBLIC_METHODS;//expose methods for caller

    return LabelledTextInput; //return the constructor

}());