import * as _u from "./util.js";
const DP = new Image();
const MAIN = new Promise((resolve, reject) => {
    const ALL_DOM_NODES = {
        parent: {
            nodeName: "div",
            attributes: {
                className: "dp"
            },
            parent: {
                nodeName: "img",
                attributes: {
                    src: "",
                    alt: "my profile pic"
                }
            }
        }
    };
    _u.dom(ALL_DOM_NODES, _u.dq("#root"));
}).catch(error => console.warn(error));
{
    let i = 0;
    _u.on("html", {
        click() {
            i++;
            i > 5 ? (i = 1) : _u.NULL;
            _u.log(i);
            this.style = `--bg-image: url(/assets/img${i}.jpg);`;
        }
    });
}
