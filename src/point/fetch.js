const myImage = document.getElementById('target');
const myRequest = new Request('icon.jpg');

fetch(myRequest)
    .then(function(response) {
        return response.blob();
    })
    .then(function(myBlob) {
        const objectURL = URL.createObjectURL(myBlob);
        myImage.src = objectURL;
    });
