import { log, w, dom, on, dq, getComputed, addClass, toggleClass, hasClass, rmClass, } from "./util.js";
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
    },
    white: {
        "--m-main-bg-color": "#fdfdfd",
        "--m-secondary-bg": "#74b6f2",
        "--m-secondary-bg-dim": "#fdfdfd99",
        "--m-default-color": "#292930",
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
            className: "overlay hide"
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
                        src: "/assets/menu.svg",
                        alt: "menu icon lucide"
                    }
                }
            }
        },
    }
}, root);
const viewMyImage = dom({
    content: {
        node: "div",
        attr: {
            className: "view-image fx column btw center hide"
        },
        cancelIconCover: {
            node: "div",
            attr: {
                className: "cancel-icon self end"
            },
            cancelIcon: {
                node: "img",
                attr: {
                    src: "/assets/x.svg",
                    alt: "cancel icon"
                }
            }
        },
        description: {
            node: "p",
            attr: {
                className: "describe-me"
            },
            text: `Hey!, what prevents you from creating stuffs even if they might not have any potential use case 🤫. When i started this awesome journey i had no clear GOAL in mind. but after giving it 2 years and some special encouragement from \"Shimul\", i finally saw the endless list of what one could achieve. \"GIVE IT TIME.\"`
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
            className: "menu-list hide"
        },
        innerDom: `
    <div data-menu=cancel ></div>
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
        const centerX = parseFloat(getComputed(menuListEl).height) / 4;
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
const aBriefIntro = dom({
    briefIntroCover: {
        node: "div",
        attr: {
            className: "brief-intro"
        },
        innerDom: `
    <span>A newer version 1.5.0</span>`
    }
}, root);
const fixIssuesThatAreLeft = on(w, {
    orientationchange(e) {
        addClass(menuListEl, "hide");
        hasClass(menuListEl, "hide") && !hasClass(overlayEl, "hide") && hasClass(myImageAdviceEl, "hide") ? addClass(overlayEl, "hide") : void 0;
        hasClass(overlayEl, "hide") ? toggleOverflow(false) : toggleOverflow(true);
    },
    click() {
    }
});
