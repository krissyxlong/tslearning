export default (text = HELLO) => {
    const element = document.createElement("div");
    // console.log(__("Hello world"));
    element.innerHTML = text + 'hehehe1111';
    element.className = 'pure-button';
    element.onclick = () =>
        import("./lazy")
            .then(lazy => {
                element.textContent = lazy.default;
            })
            .catch(err => {
                console.error(err);
            });
    return element;
};
