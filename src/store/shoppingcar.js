import { shoppingcarQuery } from "../model/shoppingcarmodel"
export const shoppingcar = {
    namespaced: true,
    state: {
        shoppingcarlist: [],
        checklist:[],

    },
    getters: {
        totalNum(state){
            let num=0
            if(state.shoppingcarlist.length){
                num=state.shoppingcarlist.map(i=>i.buynum).reduce((a,b)=>a+b)
            }
            return num
        }
    },
    mutations: {
        changelist(state, payload) {
            let info = Array.isArray(payload) ? payload.map(item => {
                    item.checked=false
                    return item
            }):[payload].map(item => {
                item.checked=false
                return item
            })
            Array.isArray(payload) ?state.shoppingcarlist=info:state.shoppingcarlist.push(...info)
            // state.shoppingcarlist = payload.map(item=>{
            //     item.checked=false
            //     return item
            // })
            console.log(payload)
        },
        deleteshoppingcarlist(state){
            console.log("1111",state)
           state.shoppingcarlist=[]
        },
        setChecklist(state,payload){
            state.checklist=payload
        }
    },
    actions: {
        async shoppingcarAllQuery({ commit }, payload) {
            let res = await shoppingcarQuery(payload)
            console.log(res)
            console.log(payload)
            commit("changelist",res.data)
            
        }
    },
}