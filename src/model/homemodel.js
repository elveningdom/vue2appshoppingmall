import axios from "./axios";

export const bannerlistQuery=()=>{
    return axios({
        method:"get",
        url:"/bannerlist"
    })
}

export const gridQuery=()=>{
    return axios({
        method:"get",
        url:"/grid"
    })
}

export const goodsinfoQuery=(params)=>{
    return axios({
        method:"get",
        url:"/goodsinfo",
        params
    })
}