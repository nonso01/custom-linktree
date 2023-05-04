export const [log, w, d] = [console.log, window, document]

/*@ types @*/
export type _element = string | Element | null

export interface _events {
  [key: string]: any
}

export interface _inputDom {
    [key: string]: any
}

export const NULL = void 0


export let incrementRandomInt = 0


export function dq(x: string = "html"): HTMLElement | null {
  return d.querySelector(x)
}

export function dqA(x: string = "img"): NodeList | null {
 return d.querySelectorAll(x)
}

export function dce(x: string = 'div'): HTMLElement {
  return d.createElement(x)
}

export function len(o: object[] | string[]): number {
  return o.length
}

export function on(element: _element, ev: _events): boolean {
  let node = typeof element === "string" ? dqA(element) : element
  
  if(node instanceof NodeList) {
   node.forEach(n => {
     for(let method in ev) {
       n.addEventListener(method, ev[method].bind(n))
     }
   })
  }
  else {
    for(let method in ev) node!.addEventListener(method, ev[method].bind(node))
  }
  return element && event ? true : false
}

export function dom(input: _inputDom, root: HTMLElement | null) {
  let p, c
 
 for(const [key, value] of Object.entries(input)) {
   if(key !== "parent") continue
    
    p = dce(value.nodeName)
    value.textNode ? (p.textContent = value.textNode) : NULL
    
    if(value.attributes) {
      for(const [attrKey, attrName] of Object.entries(value.attributes)) {
        p[attrKey] = attrName
      }
    }
    
    if(value.parent) {
      dom(value, p) 
      // my own recursion
    }
  }
    root!.append(p)
}
