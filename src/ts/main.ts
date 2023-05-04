import * as _u from "./util.js"


fetch("./data.json")
.then(res => res.json())
.then(json => _u.log(json))
.catch(error => _u.log(error))
