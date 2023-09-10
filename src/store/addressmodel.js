import { addressQuery } from "../model/addressmodel"
export const address = {
    namespaced: true,
    state: {
        addresslist: [],
        chooseId: 0,
    },
    getters: {
        defaultChooseId(state) {
            let id = 1
            if (state.addresslist.length) {
                let info = state.addresslist.filter(item => item.isDefault)
                if (info.length) {
                    id = info[0]["id"]
                } else {
                    id = state.addresslist[0]["id"]
                }
                if (state.chooseId) {
                    id = state.chooseId
                }
                return id
            }
        }
    },
    mutations: {
        changelist(state, payload) {
            let info = Array.isArray(payload) ? payload.map(item => {
                item.addresstotal = item.province + item.city + item.county + item.addressDetail
                return item
            }) : [payload].map(item => {
                item.addresstotal = item.province + item.city + item.county + item.addressDetail
                return item
            })
            Array.isArray(payload) ? state.addresslist = info : state.addresslist.push(...info)
        },
        setChooseId(state, payload) {
            state.chooseId = payload
        },
        deteleaddress(state) {
            state.addresslist = [],
                state.chooseId = 0
        },
        addresslistupdate(state, payload) {
            state.addresslist = state.addresslist.map(item => {
                if (item.id == payload.id) {
                    item = payload.content
                    item.addresstotal = payload.content.province + payload.content.city + payload.content.county + payload.content.addressDetail
                    return item
                } else {
                    return item
                }
            })
        },
        defaultupdate(state, id) {
            state.addresslist = state.addresslist.map(item => {
                if (item.id === id) {
                    item.isDefault = false
                }
                return item
            })
        },
        addressdelete(state, id) {
            state.addresslist = state.addresslist.filter(item => item.id != id)
        },
    },
    actions: {
        async addressAllQuery({ commit }, payload) {
            let res = await addressQuery(payload)
            commit("changelist", res.data)

        }
    },
}