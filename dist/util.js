export const [log, w, d] = [console.log, window, document];
export const NULL = void 0;
export let incrementRandomInt = 0;
export function dq(x = "html") {
    return d.querySelector(x);
}
export function dqA(x = "img") {
    return d.querySelectorAll(x);
}
export function dce(x = 'div') {
    return d.createElement(x);
}
export function len(o) {
    return o.length;
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
export function dom(input, root) {
    let p, c, r = /\w{6,}\d?/;
    for (const [key, value] of Object.entries(input)) {
        if (r.test(key) == false)
            continue;
        p = dce(value.nodeName);
        value.textNode ? (p.textContent = value.textNode) : NULL;
        if (value.attributes) {
            for (const [attrKey, attrName] of Object.entries(value.attributes)) {
                p[attrKey] = attrName;
            }
        }
        if (value.parent) {
            dom(value, p);
        }
        root.append(p);
    }
}
