import axios from "./axios";

export const goodsDetailQuery=(params)=>{
    return axios({
        method:"get",
        url:"/goodsdetail",
        params
    })
}

export const addShoppingCar=(data)=>{
    return axios({
        method:"post",
        url:"/shoppingcar",
        data
    })
}

export const shoppingcarQuery=(params)=>{
    return axios({
        method:"get",
        url:"/shoppingcar",
        params
    })
}

export const shoppingCarUpdate=(id,data)=>{
    return axios({
        method:"patch",
        url:"/shoppingcar/"+id,
        data
    })
}

export const shoppingcardelete=(id)=>{
    return axios({
        method:"delete",
        url:"/shoppingcar/"+id,
    })
}