"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
        var _this = this;
        // buttons: string[] = ['name', 'sdasds', 'asdsa', 'fggf', 'wewe'];
        this.expression = '';
        this.input = '';
        this.btnClicked = function (event) {
            var text = event.object.text;
            if (!isNaN(text)) {
                _this.input += text;
            }
            else {
                _this.input = '';
            }
            _this.expression += (text == "x") ? "*" : text;
            if (_this.input == "4268") {
                alert("Welcome Humayun! This is a secret message...");
            }
        };
        this.Evalute = function () {
            // result = evaluate(this.text).toString();
            try {
                result = eval(this.expression);
            }
            catch (Exception) {
                result = 'Error';
            }
            this.input = result;
            this.expression = '';
        };
        this.Clear = function () {
            _this.expression = '';
            _this.input = '';
            result = '';
        };
        this.CE = function () {
            _this.input = _this.input.toString().substring(0, _this.input.length - 1);
            _this.expression = _this.expression.toString().substring(0, _this.expression.length - 1);
        };
        this.Square = function () {
            var val = this.input;
            this.input = Math.pow(val, 2);
            this.expression = this.expression.toString().substring(0, this.expression.lastIndexOf(val));
            this.expression += Math.pow(val, 2);
        };
        this.Cube = function () {
            var val = this.input;
            this.input = Math.pow(val, 3);
            this.expression = this.expression.toString().substring(0, this.expression.lastIndexOf(val));
            this.expression += Math.pow(val, 3);
        };
        this.Root = function () {
            var val = this.input;
            this.input = Math.sqrt(val);
            this.expression = this.expression.toString().substring(0, this.expression.lastIndexOf(val));
            this.expression += Math.sqrt(val);
        };
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "Home",
            moduleId: module.id,
            templateUrl: "./home.component.html",
            styleUrls: ['./home.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
var result;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQVFsRDtJQThESTtRQUFBLGlCQUVDO1FBL0RELG1FQUFtRTtRQUNuRSxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFWCxlQUFVLEdBQUcsVUFBQyxLQUFLO1lBQ2YsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDZCxLQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQzthQUN0QjtpQkFDSTtnQkFDRCxLQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQzthQUNuQjtZQUNELEtBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzlDLElBQUksS0FBSSxDQUFDLEtBQUssSUFBSSxNQUFNLEVBQUU7Z0JBQ3RCLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO2FBQ3pEO1FBQ0wsQ0FBQyxDQUFBO1FBRUQsWUFBTyxHQUFHO1lBQ04sMkNBQTJDO1lBQzNDLElBQUk7Z0JBQ0EsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDbEM7WUFBQyxPQUFPLFNBQVMsRUFBRTtnQkFDaEIsTUFBTSxHQUFHLE9BQU8sQ0FBQzthQUNwQjtZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXpCLENBQUMsQ0FBQztRQUVGLFVBQUssR0FBRztZQUNKLEtBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFBO1FBRUQsT0FBRSxHQUFHO1lBQ0QsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkUsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDMUYsQ0FBQyxDQUFBO1FBRUQsV0FBTSxHQUFHO1lBQ0wsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDNUYsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUE7UUFDRCxTQUFJLEdBQUc7WUFDSCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM1RixJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQTtRQUNELFNBQUksR0FBRztZQUNILElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDNUYsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQTtJQUtELENBQUM7SUFFRCxnQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQXBFUSxhQUFhO1FBTnpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUN0QyxDQUFDOztPQUNXLGFBQWEsQ0FxRXpCO0lBQUQsb0JBQUM7Q0FBQSxBQXJFRCxJQXFFQztBQXJFWSxzQ0FBYTtBQXNFMUIsSUFBSSxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkhvbWVcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWycuL2hvbWUuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIC8vIGJ1dHRvbnM6IHN0cmluZ1tdID0gWyduYW1lJywgJ3NkYXNkcycsICdhc2RzYScsICdmZ2dmJywgJ3dld2UnXTtcbiAgICBleHByZXNzaW9uID0gJyc7XG4gICAgaW5wdXQgPSAnJztcblxuICAgIGJ0bkNsaWNrZWQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgbGV0IHRleHQgPSBldmVudC5vYmplY3QudGV4dDtcbiAgICAgICAgaWYgKCFpc05hTih0ZXh0KSkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dCArPSB0ZXh0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbnB1dCA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXhwcmVzc2lvbiArPSAodGV4dCA9PSBcInhcIikgPyBcIipcIiA6IHRleHQ7XG4gICAgICAgIGlmICh0aGlzLmlucHV0ID09IFwiNDI2OFwiKSB7XG4gICAgICAgICAgICBhbGVydChcIldlbGNvbWUgSHVtYXl1biEgVGhpcyBpcyBhIHNlY3JldCBtZXNzYWdlLi4uXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgRXZhbHV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcmVzdWx0ID0gZXZhbHVhdGUodGhpcy50ZXh0KS50b1N0cmluZygpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gZXZhbCh0aGlzLmV4cHJlc3Npb24pO1xuICAgICAgICB9IGNhdGNoIChFeGNlcHRpb24pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9ICdFcnJvcic7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbnB1dCA9IHJlc3VsdDtcbiAgICAgICAgdGhpcy5leHByZXNzaW9uID0gJyc7XG5cbiAgICB9O1xuXG4gICAgQ2xlYXIgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuZXhwcmVzc2lvbiA9ICcnO1xuICAgICAgICB0aGlzLmlucHV0ID0gJyc7XG4gICAgICAgIHJlc3VsdCA9ICcnO1xuICAgIH1cblxuICAgIENFID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmlucHV0ID0gdGhpcy5pbnB1dC50b1N0cmluZygpLnN1YnN0cmluZygwLCB0aGlzLmlucHV0Lmxlbmd0aCAtIDEpO1xuICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSB0aGlzLmV4cHJlc3Npb24udG9TdHJpbmcoKS5zdWJzdHJpbmcoMCwgdGhpcy5leHByZXNzaW9uLmxlbmd0aCAtIDEpO1xuICAgIH1cblxuICAgIFNxdWFyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMuaW5wdXQ7XG4gICAgICAgIHRoaXMuaW5wdXQgPSBNYXRoLnBvdyh2YWwsIDIpO1xuICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSB0aGlzLmV4cHJlc3Npb24udG9TdHJpbmcoKS5zdWJzdHJpbmcoMCwgdGhpcy5leHByZXNzaW9uLmxhc3RJbmRleE9mKHZhbCkpO1xuICAgICAgICB0aGlzLmV4cHJlc3Npb24gKz0gTWF0aC5wb3codmFsLCAyKTtcbiAgICB9XG4gICAgQ3ViZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMuaW5wdXQ7XG4gICAgICAgIHRoaXMuaW5wdXQgPSBNYXRoLnBvdyh2YWwsIDMpO1xuICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSB0aGlzLmV4cHJlc3Npb24udG9TdHJpbmcoKS5zdWJzdHJpbmcoMCwgdGhpcy5leHByZXNzaW9uLmxhc3RJbmRleE9mKHZhbCkpO1xuICAgICAgICB0aGlzLmV4cHJlc3Npb24gKz0gTWF0aC5wb3codmFsLCAzKTtcbiAgICB9XG4gICAgUm9vdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMuaW5wdXQ7XG4gICAgICAgIHRoaXMuaW5wdXQgPSBNYXRoLnNxcnQodmFsKTtcbiAgICAgICAgdGhpcy5leHByZXNzaW9uID0gdGhpcy5leHByZXNzaW9uLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDAsIHRoaXMuZXhwcmVzc2lvbi5sYXN0SW5kZXhPZih2YWwpKTtcbiAgICAgICAgdGhpcy5leHByZXNzaW9uICs9IE1hdGguc3FydCh2YWwpO1xuICAgIH1cblxuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgIH1cbn1cbmxldCByZXN1bHQ7Il19