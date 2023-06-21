import { log, w, dom, on, dq, dce, getComputed, addClass, toggleClass, hasClass, rmClass, socialNetworks } from "./util.js";
const html = dq("html");
const body = dq("body");
const root = dq("#root");
function toggleOverflow(c) {
    c === true ? html.style.overflow = "hidden" : html.style.overflow = "scroll";
}
let incrementRandomInt = 0, incrementProgress = 0;
const minRotation = 0.8;
const themes = Object.freeze({
    dark: {
        "--m-main-bg-color": "#292930",
        "--m-secondary-bg": "#2E2E2E",
        "--m-secondary-bg-dim": "rgb(46,46,46,.6)",
        "--m-default-color": "silver",
        "--m-progress-color": "#81F56D",
    },
    white: {
        "--m-main-bg-color": "#e9e9e9",
        "--m-secondary-bg": "#74b6f2",
        "--m-secondary-bg-dim": "#fdfdfd99",
        "--m-default-color": "#292930",
        "--m-progress-color": "#424242",
    }
});
const nav = navigator;
const progressAnimation = dom({
    loading: {
        node: "progress",
        attr: {
            min: 0,
            max: 100,
            value: 0,
        },
    }
}, body);
const onProgressAnimation = on("progress", {
    animationiteration(e) {
        incrementProgress++;
        incrementProgress >= 100 ? (incrementProgress = 100) : void 0;
        this.value = incrementProgress;
    },
    animationend(e) {
        addClass(this, "loaded");
        const endLoad = on("progress.loaded", {
            animationend() {
                addClass(this, "hide");
                rmClass(root, "hide");
            }
        });
    }
});
const anOverlay = dom({
    overlay: {
        node: "div",
        attr: {
            className: "overlay hide",
        }
    }
}, body);
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
}, root);
const viewMyImage = dom({
    content: {
        node: "div",
        attr: {
            className: "view-image fx column btw center hide shadow-1x"
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
}, root);
const myImageAdviceEl = dq(".view-image");
const viewMyImageOnClick = on(".nonso-image img", {
    click(e) {
        e.stopImmediatePropagation();
        toggleClass(overlayEl, "hide");
        hasClass(overlayEl, "hide") ? toggleOverflow(false) : toggleOverflow(true);
        rmClass(myImageAdviceEl, "hide-image");
        toggleClass(myImageAdviceEl, "hide");
    }
});
const cancelMyImageOnClick = on(".cancel-icon", {
    click(e) {
        e.stopImmediatePropagation();
        toggleClass(overlayEl, "hide");
        addClass(myImageAdviceEl, "hide-image");
        hasClass(overlayEl, "hide") ? toggleOverflow(false) : toggleOverflow(true);
        if (hasClass(myImageAdviceEl, "hide-image")) {
            on(".hide-image", {
                animationend() {
                    hasClass(this, "hide-image") && addClass(this, "hide");
                }
            });
        }
    }
});
const menuList = dom({
    menuCover: {
        node: "div",
        attr: {
            className: "menu-list hide shadow-1x"
        },
        innerDom: `
    <div data-menu=cancel></div>
    <div data-menu=palette></div>
    <div data-menu=moon></div>
    <div data-menu=sun></div>
    <div data-menu=battery></div>
    `,
    }
}, dq(".header"));
const menuListEl = dq(".menu-list");
const menuListVariables = [
    "--menu-list-y",
    "--menu-list-x",
    "--menu-list-rotate"
];
const storeMenuListVariables = new Map();
const showMenuListOnClick = on(".menu-icon", {
    click(e) {
        e.stopImmediatePropagation();
        toggleClass(menuListEl, "hide");
        toggleClass(overlayEl, "hide");
        hasClass(overlayEl, "hide") ? toggleOverflow(false) : toggleOverflow(true);
        const { clientX, clientY } = e;
        storeMenuListVariables
            .set("--menu-list-y", `${clientY}px`)
            .set("--menu-list-x", `${clientX}px`);
        storeMenuListVariables.forEach((v, k) => menuListEl.style.setProperty(k, v));
    }
});
const rotateMenuList = on(".menu-list", {
    touchmove(e) {
        e.stopImmediatePropagation();
        const { clientX, clientY } = e.touches[0];
        const rotation = Math.round(clientX * minRotation);
        storeMenuListVariables.set("--menu-list-rotate", `${-rotation}deg`);
        storeMenuListVariables.forEach((v, k) => menuListEl.style.setProperty(k, v));
    }
});
const someOperationsDoneByMenuItems = on(".menu-list div", {
    click(e) {
        switch (this.dataset.menu) {
            case "cancel":
                toggleClass(menuListEl, "hide");
                toggleClass(overlayEl, "hide");
                hasClass(overlayEl, "hide") ? toggleOverflow(false) : toggleOverflow(true);
                storeMenuListVariables.clear();
                for (const v of menuListVariables)
                    menuListEl.style.removeProperty(v);
                break;
            case "moon":
                for (const [k, v] of Object.entries(themes.dark))
                    html.style.setProperty(k, v);
                break;
            case "sun":
                for (const [k, v] of Object.entries(themes.white))
                    html.style.setProperty(k, v);
                break;
            default:
                log(this.dataset);
                break;
        }
    }
});
const appVersion = dom({
    briefIntroCover: {
        node: "div",
        attr: {
            className: "app-version fx center"
        },
        innerDom: `<span class="bold">Version  1.5.0<span>`
    }
}, root);
const aFunAndShortSummaryAboutMe = dom({
    summary: {
        node: "div",
        attr: {
            className: "short-summary shadow-1x"
        },
        innerDom: `
    <div class="summary-image">
    <picture>
        <source srcset="/assets/gifs/html_code.webp" type="image/webp">
        <img src="" alt="html_code_gif">
    </picture>
    </div>
    
    <div class="summary-text"> 
    <p>
    Hello :D , i go by the name のんそ さん [ Nonso ] yeah i do love japanese and as well the Japanese cultures, but that's for another day. Hope you know what the image represents ? , lol if you don't then that's how some of us get initiated and later get into trouble!, what trouble ? am taking about the one involving hacking NASA using CSS, don't try it at home FBI might visit you. 
    </p>
    </div>
    `
    }
}, root);
const dummySpace_1x = dom({
    space: {
        node: "div",
        attr: {
            className: "dummy-space"
        }
    }
}, root);
const letsConnect = dom({
    cover: {
        node: "h1",
        text: "let's connect! 🤝🏽",
        attr: {
            className: "txt cn"
        }
    }
}, root);
const dummySpace_2x = dom({
    space: {
        node: "div",
        attr: {
            className: "dummy-space"
        }
    }
}, root);
const networkCover = dom({
    cover: {
        node: "div",
        attr: {
            className: "network-cover shadow-1x"
        }
    }
}, root);
const connectWithMeThrough = socialNetworks.forEach((value, i) => {
    dom({
        links: {
            node: "div",
            attr: {
                className: `${value?.id} network fx center`
            },
            innerDom: `
      <div class="link fx center" data-link="${value?.url}">
      
      <img src="${value?.img}" alt="${value?.id} icon" data-link="${value?.url}">
      
      </div>
      `
        }
    }, dq(".network-cover"));
});
const redirectToSocialNetwork = on(".network .link", {
    click(e) {
        e.preventDefault();
        const anchor = dce("a");
        anchor.href = this.dataset.link;
        anchor.target = "_blank";
        anchor.click();
    }
});
const fixIssuesThatAreLeft = on(w, {
    load() {
        overlayEl.style.setProperty("--overlay-h", `${getComputed(html).height}`);
        overlayEl.style.setProperty("--overlay-w", `${getComputed(html).width}`);
    },
    resize(e) {
        e.preventDefault();
        overlayEl.style.setProperty("--overlay-h", `${getComputed(html).height}`);
        overlayEl.style.setProperty("--overlay-w", `${getComputed(html).width}`);
        addClass(menuListEl, "hide");
        hasClass(menuListEl, "hide") && !hasClass(overlayEl, "hide") && hasClass(myImageAdviceEl, "hide") ? addClass(overlayEl, "hide") : void 0;
        hasClass(overlayEl, "hide") ? toggleOverflow(false) : toggleOverflow(true);
    },
    scroll() {
    },
});
