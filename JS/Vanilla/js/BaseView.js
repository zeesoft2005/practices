/*
A Generic class to create an HTML View 
Required: template 
Usages:
        var view1 = new Core.BaseView({ template:'<h2>H2 Template on body,  <#=name#>!</h2>', name:'zee'});
        var view2 = new Core.BaseView({ targetSelector: '#subscriber', template:'<h2>H2 Template in a target elem,  <#=name#></h2>!', name:'zee'});
        var view3 = new Core.BaseView({ model:{template:'<h2>H2 model template in body,  <#=name#>!</h2>', name:'zee'}});
        var view4 = new Core.BaseView({ model:{containerElemType:'span', template:'<h2>H2 model template in SPAN tag,  <#=name#>!</h2>', name:'zee'}});
        var view5 = new Core.BaseView({ rawContent:'<h2>H2, I\'m static raw html!</h2>'});
*/

NS.create('Core.BaseView', Core.Class.extend({
    init: function (options) {
     
        if (!options) {
            throw 'missing options';
        }
        this.id = options.id || 'view_'+ Core.Utils.GetRandomInt(1,1000);
        this.template = options.template;
        this.parseTemplate = options.parseTemplate || this._parseTemplate;

        this.rawContent = options.rawContent;
        this.context = options.context || document;
        this.afterRender = options.afterRender;
        this.beforeRender = options.beforeRender;
        this.containerSelector = options.containerSelector;
        this.targetSelector = options.targetSelector;
      
        this.styles = options.styles;
        this.classNames = options.classes;
        this.wrap = options.wrap;
        this.renderOninit = options.renderOninit === undefined ? true: options.renderOninit;
        this.elements = options.elements ? options.elements : [];
        this.model = options.model;

        if (this.renderOninit) {
            this.render(this.model ? this.model : options);
        }
    },
    _parseTemplate: function (template, model) {
        return Core.DomUtils.parseTemplate(template, model);
        
    },
    /* @param {any} model
    summary: renders the view, takes decisions and completes multiple tasks. */

    render: function (model) {
        if (this.beforeRender) {
            this.beforeRender();
        }
        var container = document.createElement('div');
        var target = this.targetSelector ? this.context.querySelector(this.targetSelector) : this.context.body,
            wrapper = model && model.containerElemType ? this.context.createElement(model.containerElemType) : this.context.createElement('div');
        //if model contains a template use it with model = model
        //ELSE IF options contain a template then use it with model = options.model
        //ELSE IF options.rawContent given, write it out
        //ELSE the simple view will have no inner HTML
      
         wrapper.innerHTML = model && model.template ?
                this.parseTemplate(model.template, model) :
                (this.template && this.model ? this.parseTemplate(this.template, this.model) :
                    this.rawContent ? this.rawContent : '');
           
        
        var containerId = model && model.containerId ? model.containerId : this.id;
        wrapper.setAttribute('id', containerId);
        this.elements['containerSelector'] = '#' + containerId;
        if (this.wrap) {
            container.setAttribute('id', containerId);
            container.innerHTML = wrapper.innerHTML;
            target.appendChild(container);
        } else {
            target.appendChild(wrapper);
        }
        if (this.afterRender) {
            this.afterRender();
        }
        if (this.styles) {
            this.addStyle(this.styles);
        }
        if (this.classNames) {
            if (this.classNames.length > 0) {
                for (var i = 0; i < this.classNames.length; i++) {
                    this.addClass(this.classNames[i]);
                }
            }
        }
    },
    getContainerSelector: function () {
        return this.elements['containerSelector'];
    },
    getContainer: function () {
        var wrapper = this.context.querySelector(this.getContainerSelector());
        if (this.wrap) {
            return wrapper;
        } else if (this.targetSelector){
            wrapper = this.context.querySelector(this.targetSelector);           
        }
         return wrapper;
    },
    unrender: function (remove) {
        var wrapperContainer = this.context.getElementById(this.id);
        // if (wrapperContainer) {
        //     ApexChat.hideElement(wrapperContainer);
        // }
        //remove altogether if asked
        //if (remove === true) {
            try { this.context.body.removeChild(wrapperContainer); }
            catch (e) { }
        //}
    },
    addStyle: function (css) {
        var cssArr = Array.isArray(css) ? css : [css]; // css could be a single obj or list of css obj's
        for (var i = 0; i < cssArr.length; i++) {
            //ApexChat.addStyleText(cssArr[i]);
            ApexChat.addStyleTextInIframe(cssArr[i], undefined, undefined, this.context);
        }
    },
    //apply a css class on the wrapper div or actual container of the View
    addClass: function (className) {
        //var wrapper = this.getContainer();
        var templateContainer = this.context.querySelector('#'+this.id);
        if (templateContainer) {
            Core.DomUtils.addClass(templateContainer, className);
        }
    },
    removeClass: function (className) {
        var templateContainer = this.context.querySelector('#' + this.id);
        if (templateContainer) {
            Core.DomUtils.removeClass(templateContainer, className);
        }
    },
    //removes all classes and sets only this class if supplied
    resetClass: function (className) {
        var wrapper = this.getContainer();
        wrapper.className = '';//clear previous classes
        if (className) {
            this.addClass(className);
        }
    },
    parse: function (simpleView) {
        this.options = simpleView.options;
        this.id = simpleView.id;
        this.template = simpleView.template;
        this.rawContent = simpleView.rawContent;
        this.context = simpleView.context;
        this.styles = simpleView.styles;
        this.wrap = simpleView.wrap;
        this.renderOninit = simpleView.renderOninit;
        this.elements = simpleView.elements;
        this.model = simpleView.model;
    }
}));