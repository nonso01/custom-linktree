import { w, dom, on, dq } from "./util.js";
const body = dq("body");
const root = dq("#root");
let incrementRandomInt = 0, incrementProgress = 0;
w.onload = () => {
    const progressAnimation = dom({
        loading: {
            nodeName: "progress",
            attributes: {
                min: 0,
                max: 100,
                value: 0,
            }
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
                }
            });
        }
    });
};
