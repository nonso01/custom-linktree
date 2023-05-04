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
export function on(element, events) {
    return element && event ? true : false;
}
