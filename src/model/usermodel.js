import axios from "./axios";

export const userQuery = (params) => {
    return axios({
        method: "get",
        url: "/userinfo",
        params
    })
}

export const addUser = (data) => {
    return axios({
        method: "post",
        url: "/userinfo",
        data
    })
}