/*
This component is developed with Module Pattern
*/
NS.create('Core.Components.ModalForm', (function ($, tpl /** Handlebars */) {
    var _render = function () { 

            var modalHtml =  this.modal.html();
            this.modalTpl = tpl.compile(modalHtml);
            if (this.style) {
                el.style = this.style;
            }
    };
    var _init = function (options) {
        var me = this;
        if (options) {
            this.id = options.id;
            this.cls = options.cls || 'modalForm';
            this.style = options.css;
            this.iconSelector = options.iconSelector;
            this.titleSelector = options.titleSelector;
            this.formSelector = options.formSelector;
            this.OnSubmit = options.OnSubmit;
            //this.url = options.url;
            //this.reloadTimeout = options.reloadTimeout || 30 * 1000;//every 30s
            this.modal = $(options.modalSelector);
            //this.tableBody = $(options.targetSelector);
            //this.loader = $(options.loaderSelector);
            $(document).on("submit", options.formSelector, function(evt) {
                evt.preventDefault();
                me.OnSubmit(_formValues.call(me));
            });
        }
            _render.call(this);
            return this;
        };
        var _formValues = function () {//Q1
            var data = {};
            var form = document.querySelector(this.formSelector);
            for ( var i = 0; i < form.elements.length; i++ ) {
                var field = form.elements[i];
                var fieldName = field.getAttribute('data-field');
                if (fieldName) {
                    var value = field.value;
                    data[fieldName] = value;
                }
            }
            return data;
        };
        var _loadModal = function (options) {
        var me = this;

            debugger
        var icon = me.iconSelector,
            title = me.titleSelector,
            caption = options.title,
            model = options.model,
            iconCss = options.iconCss;
            
            this.modal.html(this.modalTpl(model));
            me.modal.modal('show');
            $(icon).removeClass();//clear old css
            $(icon).addClass(iconCss);
            $(title).html(caption);        
        };  
    
    //public data: methods and properties
    var PUBLIC_METHODS = {
        Open: _loadModal
    };
    //constructor function used to instantiate objects
    function Modal(options) {
  
        if (options) {           
                _init.call(this, options);            
        } 
        else {
           throw 'The component cannot be created without mandatory options';
       }
    }
    Modal.prototype = PUBLIC_METHODS;//expose methods for caller

    return Modal; //return the constructor
}($, Handlebars)));//inject dependencies
