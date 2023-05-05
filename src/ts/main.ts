import * as _u from "./util.js"

const DP = new Image()

const MAIN = new Promise((resolve, reject) => {
  
const ALL_DOM_NODES: object = {
  root_parent: {
      nodeName: "div",
      attributes: {
        className: "fx col j-spe",
        id: "root"
      },
    intro_parent: {
      nodeName: "div",
      attributes: {
        className: "intro fx  j-spe"
      },
      profile: {
        nodeName: "div",
        attributes: {
          className: "dp",
        },
        myImg: {
          nodeName: "img",
          attributes: {
            src: "/assets/nonso01.jpg",
            alt: "nonso01"
          }
        }
      },
      intro_content: {
        nodeName: "div",
        textNode: "Hello World"
      }
    },
  },
}

  _u.dom(ALL_DOM_NODES, _u.dq("body"))
  
_u.on(".dp", {
  touchstart() {
    this.classList.add("move")
  },
  touchmove(e: TouchEvent) {
    const {clientX, clientY} = e.touches[0]
    this.style.cssText = `--x: ${clientX}px; --y:${clientY}px;`
  },
  touchend() {
    this.classList.remove("move")
    for(const pos of ["--x", "--y"]) this.style.removeProperty(pos)
  }
})
 
  
}).catch(error => console.warn(error))

// {
//   let i = 0
//   _u.on("html", {
//     click() {
//       i++
//       i > 6 ? (i = 1 ): _u.NULL
//       _u.log(i)
//       this.style = `--bg-image: url(/assets/img${i}.jpg);`
//     }
//   })
// }
