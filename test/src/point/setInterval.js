// console.log('start:', new Date().getMilliseconds());
// setTimeout(() => {
//     console.log('end:', new Date().getMilliseconds());
// }, 0);

(function() {
    var timeouts = [];
    var messageName = "zero-timeout-message";

    function setZeroTimeout(fn) {
        timeouts.push(fn);
        window.postMessage(messageName, "*");
    }

    function handleMessage(event) {
        if (event.source == window && event.data == messageName) {
            event.stopPropagation();
            if (timeouts.length > 0) {
                var fn = timeouts.shift();
                fn();
            }
        }
    }

    window.addEventListener("message", handleMessage, true);

    // Add the one thing we want added to the window object.
    window.setZeroTimeout = setZeroTimeout;
})();

console.log('2start:', new Date().getMilliseconds());
setZeroTimeout(() => {
    console.log('2end:', new Date().getMilliseconds());
});
