export const [log, w, d] = [console.log, window, document]

/*@ types @*/
export type ELEMENT = string | Element | Window | null

export interface EVENTOBJ {
  [key: string]: any
}

export interface _inputDom {
    [key: string]: any
}

// end of types and interface

export const NULL = void 0


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

export function on(element: ELEMENT, ev: EVENTOBJ): boolean {
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
  /**
   * const DOM = {
     div: {
       node: "div",
       attr: {
         className: "",
         id: ""
       },
       text: "",
       child_div: {
         node: ""
         etc....
       }
     }
   }
*/
  let p, r = /\w{4,}\d?/
 
 for(const [key, value] of Object.entries(input)) {
   if(!r.test(key)) continue
    
    if(value.node) p = dce(value.node)
    
    if(value.text) p.textContent = value.text
    
    if(value.attr) {
      for(const [attrKey, attrName] of Object.entries(value.attr)) {
        p[attrKey] = attrName
      }
    }
    
    if(typeof p === "undefined") continue 
    // skip undefined behaviors
    
      dom(value, p) 
      
    root!.append(p)
  }
}

export function getComputed(el: Element | HTMLElement): CSSStyleDeclaration {
  return w.getComputedStyle(el, null)
}


export const data: {network: object} = { 
  "network": {
    "github": {
    "url": "https://github.com/nonso01",
    "img": "/assets/logos/github-mark.svg",
    "id": "0"
  },
  "LinkedIn": {
    "url": "https://www.linkedin.com/in/nonso-martin-80b221238",
    "img": "/assets/logos/linkedIn.png",
    "id": "1"
  },
  "twitter": {
    "url": "https://twitter.com/NonsoMartin06",
    "img": "/assets/logos/twitter.png",
    "id": "2"
  },
  "portfolio": {
   "url": "https://nonso01-test.netlify.app",
  "img": "/assets/logos/logo-martin.svg",
  "id": "3"
  }
 }
}
