<template>
    <div>
        <van-sticky>
            <van-search shape="round" placeholder="请输入搜索关键词" />
            <van-tabs v-model="active" title-active-color="#7f4395" color="#7f4395">
                <van-tab title="热门">
                    <SwiperView></SwiperView>
                </van-tab>
                <van-tab title="标签 2">内容 2</van-tab>
                <van-tab title="标签 3">内容 3</van-tab>
                <van-tab title="标签 4">内容 4</van-tab>
            </van-tabs>
        </van-sticky>
        <div data-v-bf7bb9e2="" class="home-characteristic">
            <ul data-v-bf7bb9e2="">
                <li data-v-bf7bb9e2="">大牌品质</li>
                <li data-v-bf7bb9e2="">/</li>
                <li data-v-bf7bb9e2="">工厂价格</li>
                <li data-v-bf7bb9e2="">/</li>
                <li data-v-bf7bb9e2="">分期支付</li>
                <li data-v-bf7bb9e2="">/</li>
                <li data-v-bf7bb9e2="">顺丰包邮</li>
                <li data-v-bf7bb9e2="">/</li>
                <li data-v-bf7bb9e2="">无忧退款</li>
            </ul>
        </div>
        <GridView></GridView>
        <div class="blockline" style="width: 100%; height: 10px; background: rgb(244, 244, 244);"></div>
        <ListView ></ListView>
    </div>
</template>

<script>
import SwiperView from "../components/home/SwiperView.vue";
import GridView from "../components/home/GridView.vue"
import ListView from "@/components/home/ListView.vue";
export default {
    data() {
        return {
            active: 0,
        };
    },
    components: {
        SwiperView,
        GridView,
        ListView
    },
}
</script>

<style lang="scss" scoped>
.home-characteristic {
    height:57.6px;
    width: 100%;
    font-size: 14px;
    color: #9687a4;
    background: #fff;
    line-height: 30.6px;

    ul {
        width: 100%;
        display: flex;
        justify-content: space-around;

        li:nth-of-type(2n) {
            color: #ccc;
        }
    }
}
</style>