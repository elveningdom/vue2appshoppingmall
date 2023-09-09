import { addressQuery } from "../model/addressmodel"
export const address = {
    namespaced: true,
    state: {
        addresslist: [],
        chooseId:0,
    },
    getters: {
        defaultChooseId(state){ 
              let id=1
            if(state.addresslist.length){
             
                let info=state.addresslist.filter(item=>item.isDefault)
                if(info.length){
                   id= info[0]["id"]
                }else{
                    id=state.addresslist[0]["id"]
                }
                if(state.chooseId){
                    id=state.chooseId
                }
                return id
            }
        }
    },
    mutations: {
        changelist(state, payload) {
            console.log(payload)
            console.log(Array.isArray(payload))
            let info=Array.isArray(payload)? payload.map(item=>{
                item.addresstotal=item.province+item.city+item.county+item.addressDetail
                return item
            }):[payload].map(item=>{
                item.addresstotal=item.province+item.city+item.county+item.addressDetail
                return item
            })
            Array.isArray(payload)?state.addresslist=info:state.addresslist.push(...info)
            console.log(state.addresslist)
        },
        setChooseId(state, payload){
            state.chooseId=payload
        },
        deteleaddress(state){
            state.addresslist=[],
            state.chooseId=0
        }
    },
    actions: {
        async addressAllQuery({ commit }, payload) {
            let res = await addressQuery(payload)
            console.log(res)
            console.log(payload)
            commit("changelist",res.data)
            
        }
    },
}