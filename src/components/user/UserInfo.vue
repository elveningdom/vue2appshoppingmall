<template>
    <div>
        <van-button plain hairline type="primary" @click="exitLogin">退出登录</van-button>
    </div>
</template>

<script>
    export default {
        methods:{
            exitLogin(){
                window.localStorage.removeItem("userinfo"),
                window.localStorage.removeItem("backUrl")
                this.$emit("changeShow",false)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>