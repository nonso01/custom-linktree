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
                    src: "/assets/resize.svg",
                    alt: "cancel icon"
                }
            }
        },
        description: {
            node: "p",
            attr: {
                className: "describe-me"
            },
            text: `Hey!, what prevents you from creating stuffs even if they might not have a potential use case 🥴, below are links where you can connect with me. When i started this awesome journey i had no clear GOAL in mind. but after giving it 2 years lol, i finally saw the endless list of what one could achieve. \"GIVE IT TIME.\"`
        },
    }
}, root);
const imageContent = dq(".view-image");
const viewMyImageOnClick = on(".nonso-image img", {
    click(e) {
        e.stopImmediatePropagation();
        imageContent.classList.remove("hide-image");
        imageContent?.classList.toggle("hide");
        log(imageContent.classList);
    }
});
const cancelMyImageOnClick = on(".cancel-icon", {
    click(e) {
        e.stopImmediatePropagation();
        imageContent?.classList.add("hide-image");
        if (imageContent?.classList.contains("hide-image")) {
            on(".hide-image", {
                animationend() {
                    this.classList.contains("hide-image") && this.classList.add("hide");
                    log("end");
                }
            });
        }
    }
});
