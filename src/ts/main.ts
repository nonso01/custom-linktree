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
  addClass,
  toggleClass,
  hasClass,
  rmClass,
  setCssProp,
  rmCssProp,
  socialNetworks 
} from "./util.js"

// Why am i not just making use of plain html ?
// well probably because i find it boring and less fun, and it doesn't make me work. :)

declare global {
  interface Navigator {
    getBattery: () => Promise<any>;
  }
}

const html = dq("html")
const body = dq("body")
const root = dq("#root")

function toggleOverflow(c: boolean) {
  c === true ? html!.style.overflow = "hidden" : html!.style.overflow = "scroll"
}

function link(url: string) {
  const anchor = <HTMLAnchorElement>dce("a")
  anchor.href = url
  anchor.target = "_blank"
  anchor.click()
}

let incrementRandomInt = 0,
    incrementProgress = 0

const minRotation = 0.8,
      ONE_SEC = 1000,
      ONE_HUNDRED = 100

const linkTreeVersion = "Version 1.5.0"

const hide_fixed = "hide-fixed-content"

const nav = navigator

let re = /\s+|\(|\)|\;/
const platform = nav.platform.split(" ").join(", "),
      userAgent = nav.userAgent.split(re).filter((s: string, n: number) => s !== "")
log(userAgent)

const themes = Object.freeze({
  dark: {
    "--m-main-bg-color": "#292930",
    "--m-secondary-bg": "#2E2E2E",
    "--m-secondary-bg-dim": "rgb(46,46,46,.6)",
    "--m-default-color": "silver",
    "--m-progress-color": "#81F56D", // this one special
  },
  white: {
    "--m-main-bg-color": "#e9e9e9",
    "--m-secondary-bg": "#74b6f2",
    "--m-secondary-bg-dim": "#fdfdfd99",
    "--m-default-color": "#292930",
    "--m-progress-color": "#424242", // this one special

  }
})

// const getUserDefaultThemes = w.matchMedia("(max-width: 400px)")


const progressAnimation = dom({
  loading: {
    node: "progress", // use this el
    attr: {
      min: 0,
      max: ONE_HUNDRED,
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
    addClass(<HTMLElement>this, "loaded")
    
const endLoad = on("progress.loaded", {
      animationend() {
        addClass(<HTMLElement>this, "hide")
        rmClass(root, "hide")
        
        // what about hiding root and display it after the loading is complete ?
      }
    })
  }
})

const anOverlay = dom({
  overlay: {
    node: "div",
    attr: {
      className: "overlay hide",
    }
  }
}, body)

const overlayEl = dq(".overlay");

const headerSection = dom({
  header: {
    node: "div",
    attr: {
      className: "header fx center"
    },
    innerDom: `
    <div class="nav fx center even shadow-1x">
    
    <div class="nonso-image">
    <img src="/assets/nonso01.jpg" alt="Nonso Martin">
    </div>
    
    <div class="nonso-brand">
    <img src="/assets/logos/logo-martin.svg" alt="nonso logo">
    </div>
    
    <div class="menu-icon">
    <img src="/assets/icons/menu.svg" alt="menu icon lucide">
    </div>
    </div>`
  },
}, root)

const viewMyImage = dom({
  content: {
    node: "div",
    attr: {
      className: "view-image fx column btw center hide shadow-1x fixed"
    },
    cancelIconCover: {
      node: "div",
      attr: {
        className: "cancel-icon self end"
      },
      cancelIcon: {
        node: "img",
        attr: {
          src: "/assets/icons/x.svg",
          alt: "cancel icon"
        }
      }
    },
     description: {
      node: "p",
      attr: {
        className: "describe-me"
      },
      text: `Hey!, what prevents you from creating stuffs even if they might not have any potential use case 🤫. When i started this awesome journey i had no clear GOAL in mind. but after giving it 2 years and with \"Sir Shimul\" who was always present to wake me up anytime i felt like pausing, i finally saw the endless list of what one could achieve. \"GIVE IT TIME.\"`
    },

  }
}, root)

const myImageAdviceEl = dq(".view-image")

const viewMyImageOnClick = on(".nonso-image img", {
  click(e: PointerEvent) {
    e.stopImmediatePropagation()
    toggleClass(overlayEl, "hide")
    
    hasClass(overlayEl, "hide") ? toggleOverflow(false) : toggleOverflow(true)
    
    // rmClass(myImageAdviceEl, hide_fixed)
    
    toggleClass(myImageAdviceEl, "hide")
    
  }
})

const cancelMyImageOnClick = on(".cancel-icon", {
  click(e: PointerEvent) {
    e.stopImmediatePropagation()
    toggleClass(overlayEl, "hide")
    
    addClass(myImageAdviceEl, hide_fixed)
    
    hasClass(overlayEl, "hide") ? toggleOverflow(false) : toggleOverflow(true)

    if(hasClass(myImageAdviceEl, hide_fixed)) {
      
     const hide = on(myImageAdviceEl, {
      animationend() {
         
      if(hasClass(<HTMLElement>this, hide_fixed)) {
          rmClass(<HTMLElement>this, hide_fixed)
          addClass(<HTMLElement>this, "hide")
        }
        }
      })
      
    }
  }
})

const redirectToMyPortfolio = on(".nonso-brand", {
  click(e: Event) {
  alert("my portfolio is still a work in progress..")
  
  link("https://nonso01-test.netlify.app")
  }
})

const menuList = dom({
  menuCover: {
    node: "div",
    attr: {
      className: "menu-list hide shadow-1x"
    },
    innerDom: `
    <div data-menu=cancel></div>
    <div data-menu=settings></div>
    <div data-menu=moon></div>
    <div data-menu=sun></div>
    <div data-menu=battery></div>
    `,
  }
}, dq(".header"))

const menuListEl = dq(".menu-list")

const menuListVariables = [
  "--menu-list-y",
  "--menu-list-x",
  "--menu-list-rotate"
  ]

const storeMenuListVariables = new Map()

const showMenuListOnClick = on(".menu-icon", {
  click(e: PointerEvent) {
    e.stopImmediatePropagation()
    toggleClass(menuListEl, "hide")
    toggleClass(overlayEl, "hide")
    
    hasClass(overlayEl, "hide") ? toggleOverflow(false) : toggleOverflow(true)

    const { clientX, clientY } = e
    
  storeMenuListVariables
    .set("--menu-list-y", `${clientY}px`)
    .set("--menu-list-x", `${clientX}px`)
    
    storeMenuListVariables.forEach((v: any, k: any) => setCssProp(menuListEl, k, v))
  }
})

const rotateMenuList = on(".menu-list", {
  // pointerover(e: PointerEvent) {
  //   e.stopImmediatePropagation()
  //   const { clientX, clientY } = e
    
  //   const rotation = Math.round(clientX * .7)
    
  //   storeMenuListVariables.set("--menu-list-rotate", `${-rotation}deg`)
    
  //   storeMenuListVariables.forEach((v: any, k: any) => menuListEl!.style.setProperty(k, v))

  // },
  touchmove(e: TouchEvent) {
    e.stopImmediatePropagation()
    const { clientX, clientY } = e.touches[0]
    
    const rotation = Math.round(clientX * minRotation)
    
    storeMenuListVariables.set("--menu-list-rotate", `${-rotation}deg`)
    
    storeMenuListVariables.forEach((v: any, k: any) => setCssProp(menuListEl, k, v))
  }
})

// will be based on promises that's BatteryManager Object
const yourBatteryInformations = dom({
  batteryCover: {
    node: "div",
    attr: {
      className: "battery-cover fixed hide shadow-1x fx column btw"
    },
  }
}, root)

const batteryEl = dq(".battery-cover")


if (nav.getBattery) {
  const updateBatteryInfo = nav.getBattery().then(async (battery: any) => {
const level = Math.round(battery.level * ONE_HUNDRED),
      low = level <= 15 ? "low" : "stable",
      { charging } = battery
// TODO

  function updateBattery(prop?: any) {
    return `
  <div class="fx btw center">
   <h3>Battery usage</h3>
  <div class="cancel-icon">
  <img src="assets/icons/x.svg" alt="cancel icon">
  </div>
  </div>
  
  <div class="user-battery-screen fx center column self center"> 
   <h4 class="${prop?.low }">
   ${prop?.level}%
   </h4>
  </div>
  
  <div class="user-info self center">
  <ul>
  
  <li>Charging: 
  <span>${prop?.charging}</span>
  </li>
  
  <li>Os: 
  <span>${platform}</span>
  </li>
  
  <li>Platform: 
  <span>${userAgent[2] ?? "..."}</span>
  </li>
  
  <li>Version:
  <span>${userAgent[3] ?? "..."}</span>
  </li>
  
  <li>Manufacturer:
  <span>${userAgent[4] ?? "..."}</span>
  </li>
  
  <li>Build:
  <span>${userAgent[5] ?? "..."}</span>
   </li>
   
  </ul>
  </div>
  
  `}
  
  
  batteryEl!.innerHTML = updateBattery({level, low, charging})
  setCssProp(batteryEl, "--battery-level", `${level}%`)
  
  battery.onlevelchange = (e: any) => {
   const level = Math.round(e.target.level * ONE_HUNDRED),
         low = level <= 15 ? "low" : "stable",
        { charging } = battery

    batteryEl!.innerHTML = updateBattery({ level, low, charging})
    setCssProp(batteryEl, "--battery-level", `${level}%`)

  }
  
  battery.onchargingchange = (e: any) => {
    const level = Math.round(battery.level * ONE_HUNDRED),
      low = level <= 15 ? "low" : "stable",
      { charging } = battery
    // log(e)
    batteryEl!.innerHTML = updateBattery({level, low, charging})
  }
  
const cancelBatteryInfoOnClick = on(".battery-cover .cancel-icon", {
   click(e: Event) {
    e.stopPropagation()
    // toggleClass(batteryEl, "hide")
    toggleClass(overlayEl, "hide")
    
    addClass(batteryEl, hide_fixed)
    
    hasClass(overlayEl, "hide") ? toggleOverflow(false) : toggleOverflow(true)
    
  if(hasClass(batteryEl, hide_fixed)) {
      
    const hide = on(batteryEl, {
      animationend() {
         
      if(hasClass(<HTMLElement>this, hide_fixed)) {
          rmClass(<HTMLElement>this, hide_fixed)
          addClass(<HTMLElement>this, "hide")
          }
        }
      })
    }

  }
})

}).catch((err: any) => log(err))

} else {
  batteryEl!.innerHTML = `
  <div class="fx btw center">
   <h3>Battery usage</h3>
  <div class="cancel-icon">
  <img src="assets/icons/x.svg" alt="cancel icon">
  </div>
  </div>
  <span> NOT SUPPORTED </span>
  `
}



const someOperationsDoneByMenuItems = on(".menu-list div", {
  click(e: PointerEvent) {
    switch(this.dataset.menu) {
      case "cancel": 
        toggleClass(menuListEl, "hide")
        toggleClass(overlayEl, "hide")
        
        hasClass(overlayEl, "hide") ? toggleOverflow(false) : toggleOverflow(true)
        
      storeMenuListVariables.clear()
        for(const k of menuListVariables) rmCssProp(menuListEl, k)
        break
        
      case "moon": 
       for(const [k, v] of Object.entries(themes.dark)) setCssProp(html, k, v)
        break
        
      case "sun": 
       for(const [k, v] of Object.entries(themes.white)) setCssProp(html, k, v)
        break
        
      case "battery": 
        toggleClass(batteryEl, "hide")
        toggleClass(menuListEl, "hide")
        // for consistency 
        storeMenuListVariables.clear()
        for(const k of menuListVariables) rmCssProp(menuListEl, k)
        break
        default:
        log(this.dataset)
        break
    }
  }
})


const appVersion = dom({
  briefIntroCover: {
    node: "div",
    attr: {
      className: "app-version fx center"
    },
    innerDom: `<span class="bold">${linkTreeVersion}<span>`
  }
}, root)

const aFunAndShortSummaryAboutMe = dom({
  summary: {
    node: "div",
    attr: {
      className: "short-summary shadow-1x rotating-line"
    },
    innerDom: `
    <div class="summary-image"></div>
    
    <div class="summary-text"> 
    <p>
    konnichiwa , watashiwa のんそ です [my name is Nonso], i don't know about you but I just love Nihon, anyways that's for another day. Hope you know what the image represents ? , lol if you don't then that's how some of us get initiated and later get into trouble!, what trouble ? am taking about the one involving hacking NASA using SVG, don't try it at home FBI might visit you. 
    </p>
    </div>
    `
  }
}, root)

const dummySpace_1x = dom({
  space: {
    node: "div",
    attr: {
      className: "dummy-space"
    }
  }
}, root)

const letsConnect = dom({
  cover: {
    node: "h1",
    text: "let's connect! 🤝🏽",
    attr: {
      className: "txt cn"
    }
  }
}, root)

const dummySpace_2x = dom({
  space: {
    node: "div",
    attr: {
      className: "dummy-space"
    }
  }
}, root)

const networkCover = dom({
  cover: {
    node: "div",
    attr: {
      className: "network-cover"
    }
  }
}, root)
const connectWithMeThrough = socialNetworks.forEach((value: any, i: number) => {
  dom({
    links: {
      node: "div",
      attr: {
        className: `${value?.id} network fx center shadow-1x`
      },
      innerDom: `
      <div class="link fx center" data-link="${value?.url}">
      
      <img src="${value?.img}" alt="${value?.id} icon" data-link="${value?.url}">
      
      </div>
      `
    }
  }, dq(".network-cover"))
})

const redirectToSocialNetworks = on(".network .link", {
  click(e: Event) {
    e.preventDefault()
     link(this.dataset.link)
  }
})

const addTheHoverClassOnLinksRandomly = setInterval(function (n: number) {
  const links = [...dqA(".link")![Symbol.iterator]()]
  const randomaInt = Math.floor(Math.random() * len(links))
  
  // links[randomaInt]
  toggleClass(<HTMLElement>links[randomaInt], "hover")
  
}, ONE_SEC)

const dummySpace_3x = dom({
  space: {
    node: "div",
    attr: {
      className: "dummy-space fx center column"
    },
    text: "todo!"
  }
}, root)


// for minor consistency
const fixIssuesThatAreLeft = on(w, {
  focus() {
  setCssProp(overlayEl, "--overlay-h", getComputed(html).height)
  
  setCssProp(overlayEl, "--overlay-w", getComputed(html).width)

  },
  resize(e: Event) {
    // orientation failed to accomplish some effects
  e.preventDefault()

  setCssProp(overlayEl, "--overlay-h", getComputed(html).height)
  
  setCssProp(overlayEl, "--overlay-w", getComputed(html).width)

  addClass(menuListEl, "hide")
  
  hasClass(menuListEl, "hide") && !hasClass(overlayEl, "hide") && hasClass(myImageAdviceEl, "hide") && hasClass(batteryEl, "hide") ? addClass(overlayEl, "hide") : void 0
  
  hasClass(overlayEl, "hide") ? toggleOverflow(false) : toggleOverflow(true)

  },
  scroll() {
  },
})