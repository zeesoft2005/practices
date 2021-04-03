/*
This component is developed with Module Pattern
*/
var DataTable = (function ($, tpl) {
    var _render = function () { 

            var rowHtml =  $(this.rowTmpl).html();
            this.tableRowTpl = tpl.compile(rowHtml);
            if (this.style) {
                el.style = this.style;
            }
    };
    var _init = function (options) {
            if (options) {
                this.id = options.id;
                this.cls = options.cls || 'dynamicTable';                
                this.style = options.css;
                this.url = options.url;
                this.autoSync = !!options.autoSync;
                this.reloadTimeout = options.reloadTimeout || 30 * 1000;//every 30s
                this.rowTmpl = options.rowTemplateSelector;                
                this.tableBody = $(options.targetSelector);
                this.loader = $(options.loaderSelector);
                
            }           
        _render.call(this);
        this.tableBody.parent().show();
        if (this.autoSync) {
            _refreshTimer.call(this);
        }
            return this;
    };
    var _loadData = function (url) {
        var me = this;
       $.ajax({
          type: "GET",
           url: url || me.url,
           beforeSend: function (xhr) {
               me.loader.show();
           },
          success: function (response) 
          {
              me.tableBody.html('');
            var data = response.data;
            $.each(data, function(index, item){        
                me.tableBody.append(me.tableRowTpl(item));        
            });       
            
          },
          error: function(){            
              alert('Problem laoding data; please try again later...');            
           },
           complete: function (xhr, status) {               
               me.loader.hide();
           }
        });
    };
    var _filter = function (value) {
        var me = this;
        var val = value.toLowerCase();
        me.tableBody.find('tr').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(val) > -1)
        });
    };
    var _stopTimer = function () {
        var me = this;
        if (me.interval) {
            clearInterval(me.interval);
        }
    };
    var _refreshTimer = function () {
        var me = this;
        me.interval = setInterval(function(){
            console.log('UPDTAE JOB: Sending unsaved records; refreshing table rows...')
            _loadData.call(me);  
        }, me.reloadTimeout);
    };
    
    //public data: methods and properties
    var PUBLIC_METHODS = {
        Load: _loadData,
        SearchText: _filter,
        StartUpdating: _refreshTimer,
        StopUpdating: _stopTimer
    };
    //constructor function used to instantiate objects
    function DataTable(options) {
  
        if (options) {           
                _init.call(this, options);            
        } 
        else {
           throw 'The component cannot be created without mandatory options';
       }
    }
    DataTable.prototype = PUBLIC_METHODS;//expose methods for caller

    return DataTable; //return the constructor
}($, Handlebars));//inject dependencies
