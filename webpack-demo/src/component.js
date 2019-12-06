export default (text = "Hello world 1") => {
    const element = document.createElement("div");

    element.innerHTML = text;

    return element;
};
