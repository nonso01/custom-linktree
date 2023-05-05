import * as _u from "./util.js";
const DP = new Image();
const MAIN = new Promise((resolve, reject) => {
    const ALL_DOM_NODES = {
        parent0: {
            nodeName: "div",
            attributes: {
                className: "fx col j-spe",
                id: "root"
            },
            parent: {
                nodeName: "div",
                attributes: {
                    className: "intro"
                },
                parent: {
                    nodeName: "img",
                    attributes: {
                        className: "dp",
                        src: "",
                        alt: "my profile pic"
                    }
                }
            }
        },
    };
    _u.dom(ALL_DOM_NODES, _u.dq("body"));
}).catch(error => console.warn(error));
{
    let i = 0;
    _u.on("html", {
        click() {
            i++;
            i > 6 ? (i = 1) : _u.NULL;
            _u.log(i);
            this.style = `--bg-image: url(/assets/img${i}.jpg);`;
        }
    });
}
