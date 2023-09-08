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
                { validator, message: '两次密码不一样' }
            ]" />
            <van-field v-model="password1" type="password" name="password1" label="密码" placeholder="确认密码" :rules="[
                { required: true, message: '请确认密码' },
                { validator, message: '两次密码不一样' }
            ]" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { addUser, userQuery } from "../../model/usermodel.js"
export default {
    data() {
        return {
            username: '',
            password: '',
            password1: "",
        };
    },
    methods: {
        validator() {
            return this.password === this.password1
        },
        async onSubmit(values) {
            let res = await userQuery({
                username: values.username
            })
            if (res.data.length) {
                this.$toast.fail('用户名已经存在');
            }else {
                await addUser({
                    username: values.username,
                    userpwd: values.password
                })
            }
            this.$emit("changeTabr",0)  
        },
    },
}
</script>

<style lang="scss" scoped></style>