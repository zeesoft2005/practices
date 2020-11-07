var TS;
(function (TS   ) {
    var Basics;
    (function (Basics       )       {
        //==== type system =====//
        //declare a variable of type 'any' implicitley
        var a   ;
        a = 1;
        a = 's';
        bb=1;
        
        //declare a variable of type 'any' explicitley
        var b;
        b = true;
        b = 'zee';
        //declare a variable of type: number, bool, string, 
        var n, bool, str, int;
        //bool = 'true';//not ok
        bool = false; //ok
        //declare & assign a variable value
        var val = 'hello';
        var st;
        //st = 12;//wrong
        st = 99; //correct
        st = 'A'; // correct
        var Ali = {
            fname: 'fname',
            lname: 'lname'
        };
        //Ali.fname = 'zee';//ok
        Ali['addidtional_prop'] = 'extra';
        Ali.Age = 23; // allowed any type of prop
        // array types
        var names; //declare a string array
        var arr = []; //create a numeric array
        arr[0] = 2;
        var numArr = [23, 233];
        console.log(numArr);
        //tuple
        var aTuple;
        aTuple = ['A', 123];
        var data;
        data = [12, 'zee'];
        data.push(1, 'zee', false);
        console.log(data);
        //enum
        var Posts;
        (function (Posts) {
            Posts[Posts["Director"] = 0] = "Director";
            Posts[Posts["Manager"] = 1] = "Manager";
            Posts[Posts["Supervisor"] = 2] = "Supervisor";
        })(Posts || (Posts = {}));
        var myPost;
        myPost = Posts.Supervisor;
        console.log(myPost); //prints index not string
        console.log(Posts[myPost]); //prints 'Supervisor'
    })(Basics = TS.Basics || (TS.Basics = {}));
})(TS || (TS = {}));
