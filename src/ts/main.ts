import {
  log,
  d,
  w,
  dom,
  on,
  dq,
  dqA,
  dce,
  len,
  getComputed,
  data
} from "./util.js"

// Why am i not just making use of plain html ?
// well probably because i find it boring and less fun, and it doesn't make me work. :)

const body = dq("body")
const root = dq("#root")

let incrementRandomInt = 0,
    incrementProgress = 0


  
const progressAnimation = dom({
  loading: {
    node: "progress", // use this el
    attr: {
      min: 0,
      max: 100,
      value: 0,
    },
  }
}, body)

const onProgressAnimation = on("progress", {
  animationiteration(e: AnimationEvent) {
    incrementProgress++
    
    incrementProgress >= 100 ? (incrementProgress = 100) : void 0
    
    this.value = incrementProgress
  },
  animationend(e: AnimationEvent) {
    this.classList.add("loaded")
    
const endLoad = on("progress.loaded", {
      animationend() {
        this.classList.add("hide")
        root!.classList.remove("hide")
        // what about hiding root and display it after the loading is complete ?
      }
    })
  }
})


const headerSection = dom({
  header: {
    node: "div",
    attr: {
      className: "header fx center"
    },
    navigate: {
      node: "div",
      attr: {
        className: "nav fx center even"
      },
      imageCover: {
        node: "div",
        attr: {
          className: "nonso-image"
        },
        nonsoImage: {
          node: "img",
          attr: {
            src: "/assets/nonso01.jpg",
            alt: "Nonso Martin"
          }
        }
      },
      myBrand: {
        node: "div",
        attr: {
          className: "nonso-brand"
        },
        nonsoBrand: {
          node: "img",
          attr: {
            src: "/assets/logos/logo-martin.svg",
            alt: "nonso logo"
          }
        }
      },
      menuIconCover: {
        node: "div",
        attr: {
          className: "menu-icon"
        },
        menuIcon: {
          node: "img",
          attr: {
            src: "/assets/align-right.svg",
            alt: "menu"
          }
        }
      }
    },
  }
}, root)

const viewMyImageOnClick = on(".nonso-image img", {
  click(e: PointerEvent) {
    e.stopImmediatePropagation()
    log(this.src)
  }
})