var d = "";
var its = [];
function it(title, fn) { 
    its.push(function() {
        if(fn.length) return unsupported("async/callback testing")();

        beforeEachs.forEach(run);
        try{ fn(); log(title, null); } 
        catch(err){ log(title, err.message); } 
        afterEachs.forEach(run);
    });
}
function describe(title, fn) { 
    d = title;
    fn();
    befores.forEach(run)
    its.forEach(run)
    afters.forEach(run)
    its = [];
    befores = [];
    afters = [];
}
function log(title, err) { 
    var status = err? `❌. ${err}`: "✔️";
    console.log(d && `${d}: ` + `${title}: ${status}`);
}
function run(fn){ fn(); }
function unsupported(title) {
    return function(){
        console.error("This operation is unsupported: " + title)
    }
}

var befores = [];
function before(fn){
    befores.push(fn);
}
var afters = [];
function after(fn){
    afters.push(fn);
}
var beforeEachs = [];
function beforeEach(fn){
    beforeEachs.push(fn);
}
var afterEachs = [];
function afterEach(fn){
    afterEachs.push(fn);
}

global.describe = describe;
global.it = it;
global.before = before;
global.after = after;
//global.beforeEach = unsupported("beforeEach");
//global.afterEach =  unsupported("afterEach");
global.beforeEach = beforeEach;
global.afterEach =  afterEach;
