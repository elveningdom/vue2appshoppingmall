<template>
    <div>
        <van-form @submit="onSubmit">
            <van-field v-model="username" name="username" label="用户名" placeholder="用户名" :rules="[
                { required: true, message: '请填写用户名' },
                { pattern: /^[a-z0-9]{5,12}$/i, message: '5-12个字符或数字' }
            ]" />
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" :rules="[
                { required: true, message: '请填写密码' },
                { pattern: /^[a-z0-9]{6,10}$/i, message: '密码6-10个字符或数字' },
            ]" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { userQuery } from "../../model/usermodel.js"
import {userinfo} from "../../mixins/userinfo"
import { mapActions } from "vuex";
export default {
    mixins:[userinfo],
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        ...mapActions("shoppingcar",["shoppingcarAllQuery"]),
        ...mapActions("address",["addressAllQuery"]),
        async onSubmit(values) {
            let res = await userQuery({
                username: values.username,
                userpwd: values.password
            })
            if (res.data.length) {
                let info = res.data[0]
                window.localStorage.setItem("userinfo", JSON.stringify(info))
                let backUrl = localStorage.getItem("backUrl")
                console.log(this.userid)
                this.shoppingcarAllQuery({ userid: res.data[0]['id'] })
                 this.addressAllQuery({ userid: res.data[0]['id'] })
                if (backUrl) {
                    this.$router.push(backUrl)
                } else {
                    this.$router.push("/")
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped></style>