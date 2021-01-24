//child component
function LI(text) {
    var li = document.createElement('LI');
    li.innerText = text;
    return li;//just return as it does not know of its parent
}
//parent component: append to body when created
function UL(id) {
    var ul = document.createElement('UL');
    ul.id = id;
    this.el = ul;
    document.body.appendChild(ul);
}

//use can call these methods to add/remove list items
var public_methods = {
    addItem: function (text) {
        this.el.appendChild(new LI(text))
    },
    removeItem: function (text) {
        this.el.childNodes.forEach(function(element) {
            if (element.innerText == text) {
                element.remove();
            }
        });
    }
};

UL.prototype = public_methods;
