<template>
    <div>
        <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-image width="100%" height="7.5rem" :src="list.image" />
        <div :style="{ padding: '0.24rem' }">
            <p :style="{ fontFamily: 'PingFangSC-Medium', fontSize: '.44rem', color: '#ff3637' }">￥{{ list.priceStr }}</p>
            <p class="markers-text">{{ list.subtitle?.split("|")[0] }}</p>
            <h1>{{ list.mainTitle }}</h1>
            <h3>
                {{ list.subtitle?.split("|")[1] }}
            </h3>
        </div>
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" />
            <van-goods-action-icon icon="icon iconfont icon-03" text="购物车" :badge="totalNum" @click="gotoshoppingcar"/>
            <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" @click="addShoppingcar" />
            <van-goods-action-button color="#7232dd" type="danger" text="立即购买" />
        </van-goods-action>
        <van-sku v-model="show" :sku="sku" :goods="goods" :goods-id="list.id" :hide-stock="sku.hide_stock"
            @buy-clicked="onBuyClicked" @add-cart="onAddCartClicked" />
    </div>
</template>

<script>
import { goodsinfoQuery } from "../model/homemodel"
import { changenav } from "../mixins/changenav"
import { userinfo } from "../mixins/userinfo.js"
import { goodsDetailQuery, addShoppingCar, shoppingcarQuery, shoppingCarUpdate } from "../model/shoppingcarmodel"
// import { mapState } from "vuex"
import { mapGetters } from "vuex"
export default {
    mixins: [changenav, userinfo],
    data() {
        return {
            list: {},
            show: false,
            sku: {
                tree: [
                ],
                list: [
                ],
                price: '', // 默认价格（单位元）
                stock_num: 227, // 商品总库存
                collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                none_sku: false, // 是否无规格商品
                hide_stock: false // 是否隐藏剩余库存
            },
            goods: {
                picture: ''
            },
            // num:"",
        }
    },
    async mounted() {
        let res = await goodsinfoQuery({ id: this.$route.params.id })
        this.list = res.data[0]
        this.sku.price = res.data[0].priceStr
        this.goods.picture = res.data[0].image
        // this.num=this.shoppingcarlist.length
        // this.num=this.$store.state.shoppingcar.shoppingcarlist.length
        // console.log(this.shoppingcarlist)
        // console.log(this.$store.state.shoppingcar.shoppingcarlist)
    },
    computed:{
           ...mapGetters("shoppingcar",["totalNum"])
    },
    methods: {
        // ...mapState("shoppingcar",["shoppingcarlist"]),
        gotoshoppingcar(){
            this.$router.push("/shoppingcar")
        },
        onClickLeft() {
            this.$router.back(-1)
        },
        async addShoppingcar() {
            if (!this.userid) {
                window.localStorage.setItem("backUrl", this.$route.path)
                this.$router.push("/mine")
            } else {
                this.show = true
                let { data } = await goodsDetailQuery({
                    goodsid: this.$route.params.id
                })
                let colorinfo = Array.from(new Set(data.filter(item => item.colorid).map(item => item.colorid)))
                let coloritem = colorinfo.map(item => {
                    let oneitem = data.filter(i => item == i.colorid)[0]
                    return {
                        id: oneitem.colorid, // skuValueId：规格值 id
                        name: oneitem.colorname, // skuValueName：规格值名称
                        imgUrl: oneitem.img, // 规格类目图片，只有第一个规格类目可以定义图片
                        previewImgUrl: oneitem.img.replace("100*100", "200*200"), // 用于预览显示的规格类目图片
                    }
                })
                this.coloritem = coloritem
                this.sku.tree = []
                console.log(this.sku.tree)
                this.sku.tree.push({
                    k: '颜色', // skuKeyName：规格类目名称
                    k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                    v: coloritem
                })
                let sizeinfo = Array.from(new Set(data.filter(item => item.sizeid).map(item => item.sizeid)))
                let sizeitem = sizeinfo.map(item => {
                    let oneitem = data.filter(i => item == i.sizeid)[0]
                    return {
                        id: oneitem.sizeid, // skuValueId：规格值 id
                        name: oneitem.sizename, // skuValueName：规格值名称
                    }
                })
                this.sizeitem = sizeitem
                this.sku.tree.push({
                    k: '尺寸', // skuKeyName：规格类目名称
                    k_s: 's2', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                    v: sizeitem
                })
                this.sku.list = []
                this.sku.list.push(...data.map(item => {
                    return {
                        id: item.id, // skuId
                        s1: item.colorid, // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: item.sizeid, // 规格类目 k_s 为 s2 的对应规格值 id
                        price: item.price * 100, // 价格（单位分）
                        stock_num: item.num // 当前 sku 组合对应的库存
                    }
                }))
            }

        },
        onBuyClicked() { },
        async onAddCartClicked(options) {
            console.log(options)
            //userid,goodsid,goodsdetailid,goodsname,goodsprice,img,buynum,colorname,sizename,
            let userid = this.userid
            let goodsid = this.list.id
            let goodsdetailid = options.selectedSkuComb.id
            let goodsname = this.list.mainTitle
            let goodsprice = options.selectedSkuComb.price
            let img = this.list.image
            let buynum = options.selectedNum
            let colorname = this.coloritem.filter(item => item.id == options.selectedSkuComb.s1)[0].name
            let sizename = this.sizeitem.filter(item => item.id == options.selectedSkuComb.s2)[0].name
            let res = await shoppingcarQuery({ goodsdetailid })
            if (res.data.length) {
                await shoppingCarUpdate(res.data[0]["id"], { buynum: options.selectedNum + res.data[0]["buynum"] })
            } else {
                await addShoppingCar({
                    userid, goodsid, goodsdetailid, goodsname, goodsprice, img, buynum, colorname, sizename
                })
            }
            this.$dialog.confirm({
                title: '加入成功',
                message: '是否去购物车',
            })
                .then(() => {
                    this.$router.push("/shoppingcar")
                })
                .catch(() => {
                    this.show=false
                });
        },
    }
}
</script>

<style lang="scss" scoped>
.markers-text {
    max-width: 4.78rem;
    line-height: .54rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: .26rem;
    color: #bf9e6b;
}

h1 {
    font-family: PingFangSC-Medium;
    margin-top: 0.24rem;
    line-height: .48rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: .34rem;
    color: #4a4a4a;
}

h3 {
    font-size: .24rem;
    margin-top: 0.06rem;
    line-height: .36rem;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>