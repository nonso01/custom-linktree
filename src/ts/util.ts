export const [log, w, d] = [console.log, window, document]

export type element = string | HTMLElement | null

export function dq(x: string = "html"): HTMLElement | null {
  return d.querySelector(x)
}

export function dqA(x: string): NodeList | null {
 return d.querySelectorAll(x)
}

export function dce(x: string = 'div'): HTMLElement {
  return d.createElement(x)
}

export function on(element: element, events: object): boolean {
  
  return element && event ? true : false
}
