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
        },
        setlistbuynum(state,{id,num}){
            console.log(id,num)
            state.shoppingcarlist=state.shoppingcarlist.map(item=>{
                if(item.id==id){
                    item.buynum+=num
                }
                return item
            })
        },
        deleteshoppingcarlist(state){
           state.shoppingcarlist=[]
           state.checklist=[]
        },
        setChecklist(state,payload){
            state.checklist=payload
        },
        shoppingcardeleteone(state,id){
            state.shoppingcarlist=state.shoppingcarlist.filter(item=>item.id!==id)
        }
    },
    actions: {
        async shoppingcarAllQuery({ commit }, payload) {
            let res = await shoppingcarQuery(payload)
            commit("changelist",res.data)
            console.log(res)
            
        }
    },
}