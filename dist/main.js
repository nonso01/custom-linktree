import * as _u from "./util.js";
const DP = new Image();
let MIN_TILT_X = 0.1;
const MAIN = new Promise((resolve, reject) => {
    const FIRST_DOM_NODES = {
        root_parent: {
            nodeName: "div",
            attributes: {
                className: "fx col j-spe cn",
                id: "root"
            },
            intro_parent: {
                nodeName: "div",
                attributes: {
                    className: "intro fx  j-spe cn"
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
                    attributes: {
                        className: "intro__detail fx col j-spe cn"
                    },
                    heading: {
                        nodeName: "h1",
                        textNode: "Martin のんそです",
                        attributes: {
                            className: "title mix lg"
                        }
                    },
                    paragraph: {
                        nodeName: "p",
                        textNode: "こんにちわ 👋, am a Scientist, Web developer and a great fan of the Japanese cultures and traditions.",
                        attributes: {
                            className: "text dark txt-cn"
                        }
                    }
                },
            },
            social_media: {
                nodeName: "div",
                attributes: {
                    className: "social fx col j-spe cn"
                }
            }
        },
    };
    _u.dom(FIRST_DOM_NODES, _u.dq("body"));
    _u.on(".dp", {
        touchstart() {
            this.classList.add("move");
        },
        touchmove(e) {
            const { clientX, clientY } = e.touches[0];
            this.style.cssText = `--x: ${clientX}px; --y:${clientY}px;`;
        },
        touchend() {
            this.classList.remove("move");
            for (const pos of ["--x", "--y"])
                this.style.removeProperty(pos);
        }
    });
    const SOCIAL_DOM_NODES = {};
    for (const [key, value] of Object.entries(_u.data.network)) {
        SOCIAL_DOM_NODES[key] = {
            nodeName: "div",
            attributes: {
                className: "media fx j-spe cn",
                id: key,
            },
            icon: {
                nodeName: "img",
                attributes: {
                    src: `${value.img}`,
                    alt: `${key}_icon`,
                    className: "icon",
                }
            },
        };
    }
    _u.dom(SOCIAL_DOM_NODES, _u.dq(".social"));
    _u.on(".media", {
        click() {
            const key = _u.data.network;
            const link = _u.dce("a");
            link.target = "_blank";
            if (key[this.id]) {
                link.href = key[this.id].url;
                link.click();
            }
            else
                console.warn("the id doesn't match the key");
        },
        touchstart() {
            this.classList.add("move");
        },
        touchmove(e) {
            e.stopImmediatePropagation();
            const width = parseInt(_u.getComputed(this).width);
            const halfWidth = width * .5;
            const { clientX } = e.touches[0];
            let max = clientX >= width ? width : clientX;
            max *= MIN_TILT_X;
            clientX <= halfWidth ? (max = max) : (max -= max);
            this.style.cssText = `--x: ${max}%`;
            _u.log(max);
        },
        touchend() {
            this.classList.remove("move");
        },
        pointerenter() {
        }
    });
}).catch(error => console.warn(error));
