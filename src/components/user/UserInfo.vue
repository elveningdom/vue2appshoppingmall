<template>
    <div>
        <van-button plain hairline type="primary" @click="exitLogin">退出登录</van-button>
    </div>
</template>

<script>
import { mapMutations,mapState } from 'vuex';
    export default {
        computed:{
            ...mapState("shoppingcar",["shoppingcarlist"])
        },
        methods:{
            ...mapMutations("shoppingcar",["deleteshoppingcarlist"]),
            ...mapMutations("address",["deteleaddress"]),
            exitLogin(){
                window.localStorage.removeItem("userinfo"),
                window.localStorage.removeItem("backUrl")
                this.$emit("changeShow",false)
                // window.sessionStorage.removeItem("vuex")
                this.deleteshoppingcarlist()
                this.deteleaddress()
                console.log(this.shoppingcarlist)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>