<template>
    <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#f7b200" height="208px">
            <van-swipe-item v-for="i in list" :key="i.id">
                <van-image width="100%" height="100%" :src="i.img" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import { bannerlistQuery } from "../../model/homemodel.js";
export default {
    data() {
        return {
            list: []
        }
    },
    async mounted() {
        let res = await bannerlistQuery()
        this.list = res.data
    }
}
</script>

<style lang="scss" scoped>
</style>