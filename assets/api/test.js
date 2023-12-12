import axios from "axios";
import Api from "./index.js";

const api = new Api();

await api.auth.login({
    email: "test@gmail.com",
    password: "test12345"
}).then(res => {
    console.log(res)
}).catch((err => {
    console.log(err)
}));
// await axios({
//     method: "post",
//     url: "http://localhost:3001/login",
//     data: {
//         email: "sdkasdlkl@gmail.com"
//     }
// })