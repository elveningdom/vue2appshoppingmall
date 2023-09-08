import { mapMutations } from "vuex"

export const changenav={
    mounted(){
        this.$store.state.isShowNav=false
    },
    methods:{
        ...mapMutations(["changeShowNav"])
    },
    destroyed(){
        this.changeShowNav(true)
    }

}