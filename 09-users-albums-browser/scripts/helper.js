export function wrapper(...els) {
    const div = document.createElement("div");
    els.forEach((el) => div.appendChild(el));
    return div;
}

export function createWithText(el, text) {
    const x = document.createElement(el);
    x.innerText = text;
    return x;
}
