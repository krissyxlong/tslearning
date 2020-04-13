// const debug = { hello: 'world' };
// // const blob = new Blob([JSON.stringify(debug, null, 2)],
// //     { type: 'application/json' });
// // const url = URL.createObjectURL(blob);
// // console.log('url', url);
//
// var aLink = document.createElement('a');
// var blob = new Blob([JSON.stringify(debug, null, 2)], {
//     type: 'text/plain'
// });
// aLink.download = '111';
// const url = URL.createObjectURL(blob);
// aLink.href = url;
// console.log('url', url);
// aLink.click();
// URL.revokeObjectURL(blob);

const download = (url) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none'; // 防止影响页面
    iframe.style.height = 0; // 防止影响页面
    iframe.src = url;
    document.body.appendChild(iframe);
    setTimeout(()=>{
        iframe.remove();
    }, 5 * 60 * 1000);
}

const url = '';

[1, 2, 3, 4].forEach(item => {
    download(url);
})

const u = 'http://ww2.sinaimg.cn/large/4b4d632fgw1f1hhza4495j20ku0rsjxs.jpg';
// const u = 'icon.jpg';
const u = 'http://pic.c-ctrip.com/VacationH5Pic/mice/wechat/ewm01.png';

const dFile = (filePath) => {
    fetch(u, {
        mode: 'no-cors'
    }).then(res => res.blob()).then(blob => {
        const a = document.createElement('a');
        document.body.appendChild(a)
        a.style.display = 'none'
        // 使用获取到的blob对象创建的url
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        // 指定下载的文件名
        a.download = '111111111';
        a.click();
        document.body.removeChild(a)
        // 移除blob对象的url
        window.URL.revokeObjectURL(url);
    });
}

function ddd() {
    console.log(22222)
    // 创建隐藏的可下载链接  
    // let  blob = 'http://pic.c-ctrip.com/VacationH5Pic/mice/wechat/ewm01.png';
    // var a = document.createElement('a');
    // a.style.display = 'none';
    // a.href = blob;       
    // a.download = 'QRcode.jpg';
    // document.body.appendChild(a);
    // a.click();
    // //移除元素
    // document.body.removeChild(a);
    //canvans下载
    let src = 'http://pic.c-ctrip.com/VacationH5Pic/mice/wechat/ewm01.png';
    var canvas = document.createElement('canvas');
    var img = document.createElement('img');
    img.onload = function (e) {
        canvas.width = img.width;
        canvas.height = img.height;
        var context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, img.width, img.height);
        // window.navigator.msSaveBlob(canvas.msToBlob(),'image.jpg');
        // saveAs(imageDataUrl, '附件');
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
        canvas.toBlob((blob) => {
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'aaa';
            link.click();
        }, "image/jpeg");
        // context.toBlob(function(blob) {
        // console.log('blob :', blob);


        // let link = document.createElement('a');
        // link.href = window.URL.createObjectURL(blob);
        // link.download = 'aaa';
        // }, "image/jpeg");
    }
    img.setAttribute("crossOrigin", 'Anonymous');
    img.src = src;
}

document.getElementById('download').onclick = () => {
    const url = 'icon.png';
    dFile(url);
    console.log(2222222);
}

const downImage = (url) => {
    const image = new Image();
    image.setAttribute("crossOrigin",'Anonymous');
    image.src = url + '?' + new Date().getTime();
    image.onload = function() {
        const imageDataUrl = image2base64(image);
        const imageBlobData = dataUrl2Blob(imageDataUrl);
        const downloadImageDom = document.getElementById('download-image');
        downloadImageDom.addEventListener('click', () => {
            saveAs(imageBlobData, 'test-download.png');
        });
    }
}
