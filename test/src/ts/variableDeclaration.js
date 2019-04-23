/* var */
function f1(shouldInitialize) {
    if (shouldInitialize) {
        var x = 10;
    }
    return x;
}
f1(true); // returns '10'
f1(false); // returns 'undefined'
function f2(input) {
    var a = 100;
    if (input) {
        // Still okay to reference 'a'
        var b = a + 1;
        return b;
    }
    // Error: 'b' doesn't exist here
    return a;
}
