import axios from "./axios";

export const addaddress = (data) => {
    return axios({
        method: "post",
        url: "/address",
        data
    })
}
export const addressUpdate=(id,data)=>{
return axios({
    method:"patch",
    url:"/address/"+id,
    data
})
}

export const addressQuery=(params)=>{
    return axios({
        method:"get",
        url:"/address",
        params
    })
    }