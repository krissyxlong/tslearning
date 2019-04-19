const debug = { hello: 'world' };
// const blob = new Blob([JSON.stringify(debug, null, 2)],
//     { type: 'application/json' });
// const url = URL.createObjectURL(blob);
// console.log('url', url);

var aLink = document.createElement('a');
var blob = new Blob([JSON.stringify(debug, null, 2)], {
    type: 'text/plain'
});
aLink.download = '111';
const url = URL.createObjectURL(blob);
aLink.href = url;
console.log('url', url);
aLink.click();
URL.revokeObjectURL(blob);
