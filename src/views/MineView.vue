<template>
    <div>
        <User v-if="isShow" @changeShow="changeShow"></User>
        <van-tabs v-model="active" v-else>
            <van-tab title="登录">
                <LoginView></LoginView>
            </van-tab>
            <van-tab title="注册">
                <RegisterVire @changeTabr="changeTabr"></RegisterVire>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { userinfo } from "../mixins/userinfo"
import LoginView from "../components/user/LoginView.vue"
import RegisterVire from "../components/user/RegisterView.vue"
import User from "../components/user/UserInfo.vue"
export default {
    mixins: [userinfo],
    components: {
        LoginView,
        RegisterVire,
        User
    },
    data() {
        return {
            active: 0,
            isShow: false,
        };
    },
    mounted() {
        this.$nextTick(() => {
            // 在DOM元素渲染完毕后执行操作
            if (this.userid) {
                this.isShow = true;
            }
        });
    },
    methods: {
        changeTabr(payload) {
            this.active = payload
        },
        changeShow(payload){
            this.isShow=payload
        }
    }

}
</script>

<style lang="scss" scoped></style>