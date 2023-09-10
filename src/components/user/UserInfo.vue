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
                this.deleteshoppingcarlist()
                this.deteleaddress()
                // window.sessionStorage.removeItem("vuex")
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>