<template>
    <div class="list">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell>
                    <van-grid :column-num="2">
                        <van-grid-item v-for="item in list" :key="item.id" :to="'/detail/'+item.id">
                            <template v-slot:default>
                                <van-image :src="item.image" />
                                <div class="tagclass">
                                    <p>￥{{ item.priceStr }}</p>

                                    <div>
                                        <span
                                            :style="{ color: item.labels[0].textColor, backgroundColor: item.labels[0].color }">{{
                                                item.labels[0].content }}</span>
                                        <span
                                            :style="{ color: item.labels[1].textColor, backgroundColor: item.labels[1].color, border: 'solid 0.015rem' + (item.labels[1].roundColor) }">{{
                                                item.labels[1].content }}</span>
                                    </div>
                                    <p
                                        :style="{ color: '#bf9e6b', marginBottom: '0.08rem', fontSize: '0.24rem', lineHeight: 'initial' }">
                                        {{ item.subtitle.split("|")[0] }}</p>
                                    <p class="gridp"
                                        :style="{ marginBottom: '0.08rem', color: '#4a4a4a', lineHeight: ' 0.28rem', fontSize: '0.24rem' }">
                                        {{ item.mainTitle }}</p>
                                    <p>{{ item.thirdContent }}</p>
                                </div>
                            </template>
                        </van-grid-item>
                    </van-grid>
                </van-cell>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { goodsinfoQuery } from "../../model/homemodel"
export default {
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            page: 1,
            refreshing: false,
        };
    },
    mounted() {
        this.search()
    },
    methods: {
        onRefresh(){
            this.list=[],
            this.page=1,
            this.finished=false,
            this.search()
        },
        async search() {
            let res = await goodsinfoQuery({ _page: this.page, _limit: 4 })
            this.list.push(...res.data)
            let res1 = await goodsinfoQuery({})
            // 加载状态结束
            this.loading = false;
            this.refreshing=false
            // 数据全部加载完成
            if (this.list.length >= res1.data.length) {
                this.finished = true;
            }
        },
        onLoad() {
            this.page++
            this.search()


        }
    }
}
</script>

<style lang="scss" scoped>
.tagclass {
    width: 100%;

    p:first-child {
        color: #f7a701;
    }

    p {
        margin: 0;
    }

    p:last-child {
        line-height: 1;
        color: #bbbbbb;
        font-size: 0.2rem;
        padding-top: 0.06rem;
    }

    div {
        font-size: 0.08rem;

        span {
            display: inline-block;
            margin-right: 0.08rem;
            margin-bottom: 0.12rem;
            line-height: 0.4rem;
            font-family: PingFangSC, helvetica, 'Heiti SC';
            border-radius: 2px;
        }
    }
}

.list {
    margin-bottom: 50px;
}
</style>