import * as __u from "./util.js"


fetch("./data.json")
.then(res => res.json())
.then(json => __u.log(json))
.catch(error => __u.log(error))

__u.log("started")
