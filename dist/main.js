import * as _u from "./util.js";
const DP = new Image();
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
                        className: "intro__detail fx col j-spe"
                    },
                    heading: {
                        nodeName: "h1",
                        textNode: "Martin のんそです",
                        attributes: {
                            className: "title mix md"
                        }
                    },
                    paragraph: {
                        nodeName: "p",
                        textNode: "こんにちわ 👋, am a Web developer and a great fan of the Japanese cultures and traditions.",
                        attributes: {
                            className: "text dark txt-cn"
                        }
                    }
                },
            },
            social_media: {
                nodeName: "div",
                attributes: {
                    className: "social"
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
}).catch(error => console.warn(error));
