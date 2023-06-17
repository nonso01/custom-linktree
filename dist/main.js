import { log, dom, on, dq } from "./util.js";
const body = dq("body");
const root = dq("#root");
let incrementRandomInt = 0, incrementProgress = 0;
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
        this.classList.add("loaded");
        const endLoad = on("progress.loaded", {
            animationend() {
                this.classList.add("hide");
                root.classList.remove("hide");
            }
        });
    }
});
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
}, root);
const viewMyImageOnClick = on(".nonso-image img", {
    click(e) {
        e.stopImmediatePropagation();
        log(this.src);
    }
});
