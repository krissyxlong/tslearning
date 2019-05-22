function showNode (oNode) {
    var nLeft = 0, nTop = 0;
    for (var oItNode = oNode; oItNode; nLeft += oItNode.offsetLeft, nTop += oItNode.offsetTop, oItNode = oItNode.offsetParent);
    window.scrollTo(nLeft, nTop);
}

function showBookmark (sBookmark, bUseHash) {
    if (arguments.length === 1 || bUseHash) { window.location.hash = sBookmark; return; }
    var oBookmark = document.querySelector(sBookmark);
    if (oBookmark) { showNode(oBookmark); }
}

window.addEventListener('load', () => {
    console.log('load');
});
window.addEventListener('hashchange', () => {
    console.log('hashchange');
});
