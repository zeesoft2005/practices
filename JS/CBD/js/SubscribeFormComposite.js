var SubscribeForm = {
    init: function (options) {
        if (!options) {
            throw 'missing required config for the subscribe component';
        }
        this.formContainer = options.containerSelector? document.querySelector(options.containerSelector) : document.body;
        this.tooltip = options.components.tooltip;
        this.submitButton = options.components.button;        
        this.notifier = options.components.message;
        this.input = options.components.input;
        this.formContainer.setAttribute('class', 'formContainer');       
        //set click handler        
        this.submitButton.onClick(this.onSubmit.bind(this));
    },  
    showTooltip: function (text) {
   
        this.tooltip.showElement(text);
    },
    hideTooltip: function () {
        this.tooltip.hideElement();
    },
    hideNotification: function () {
        this.notifier.hideElement(null, true);
    },
    showNotification: function (msg) {     
        DomUtils.removeClass(this.notifier.el, 'fadeOut');//this is to re-show a msg which was faded out before
        this.notifier.showElement(msg);
        this.hideNotification();
    },
    onSubmit: function (e) {
        var inputIsValid = this.input.validate();
        if (!inputIsValid) {
            this.showTooltip();
            this.input.toggleInputStyle();
        } else {
            if (this.input.input.el.value.indexOf('>') > 0) {
                this.showError();
            } else
            this.showSuccess();
        }

    },
    showSuccess: function () {
        var me = this;
        this.hideTooltip();
        this.submitButton.setContent('Processing...');
        setTimeout(function () {
            me.showNotification();
            me.input.clearInput();
            me.input.toggleInputStyle(true);
            me.submitButton.setContent();

        }, 3 * 1000);
    },
    showError: function () {
         var me = this;
        this.hideTooltip();
        this.submitButton.setContent('Processing...');
        setTimeout(function () {
           me.showNotification('<p style="color:red;"> Sorry! Problem processing your request; try later.</p>');
            me.input.toggleInputStyle(true);
            me.submitButton.setContent();

        }, 1 * 1000);
    },
    destroy: function () {
        //remove a state from session storage or cookie
        //remove event listers attached to elements
        //remove elements from DOM
    }
};
