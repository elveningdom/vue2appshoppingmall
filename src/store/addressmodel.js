import { addressQuery } from "../model/addressmodel"
// import {userinfo} from "../mixins/userinfo"
export const address = {
    // mixins:[userinfo],
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
            state.addresslist = payload.map(item=>{
                item.addresstotal=item.province+item.city+item.county+item.addressDetail
                return item
            })
        },
        setChooseId(state, payload){
            state.chooseId=payload
        },
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