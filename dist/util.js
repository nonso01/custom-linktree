export const [log, w, d] = [console.log, window, document];
export function dq(x = "html") {
    return d.querySelector(x);
}
export function dqA(x) {
    return d.querySelectorAll(x);
}
export function dce(x = 'div') {
    return d.createElement(x);
}
export function on(element, ev) {
    let node = typeof element === "string" ? dqA(element) : element;
    if (node instanceof NodeList) {
        node.forEach(n => {
            for (let method in ev) {
                n.addEventListener(method, ev[method].bind(n));
            }
        });
    }
    else {
        for (let method in ev)
            node.addEventListener(method, ev[method].bind(node));
    }
    return element && event ? true : false;
}
