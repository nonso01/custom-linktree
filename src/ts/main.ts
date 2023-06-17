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

const body = dq("body")
const root = dq("#root")

let incrementRandomInt = 0,
    incrementProgress = 0


w.onload = () => {
  
const progressAnimation = dom({
  loading: {
    nodeName: "progress", // use this el
    attributes: {
      min: 0,
      max: 100,
      value: 0,
    }
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
      }
    })
  }
})

}
