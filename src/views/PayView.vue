<template>
    <div>
        <van-contact-card type="add" icon="location-o" @click="onAdd" v-if="!addresslist.length" />
        <div class="total" v-else @click="gotoaddress">
            <div>
                <div>
                    <span class="default">默认</span>
                    <span class="pcc">{{ addressitem.province }}{{ addressitem.city }}{{ addressitem.county }}</span>
                </div>
                <div class="detail">{{ addressitem.addresstotal }}</div>
                <div class="bottom">
                    <span>{{ addressitem.name }}</span>
                    <span>{{ addressitem.tel }}</span>
                </div>
            </div>
            <van-icon name="arrow" />
        </div>

        <van-card v-for="i in checklist" 
            :key="i.id" 
            :num="i.buynum"
            :price="i.goodsprice / 100" 
            :desc="i.colorname + ',' + i.sizename" 
            :title="i.goodsname" 
            :thumb="i.img" />
    </div>
</template>

<script>
import { changenav } from "../mixins/changenav"
import { mapState, mapGetters } from "vuex";
export default {
    mixins: [changenav],
    computed: {
        ...mapState("shoppingcar", ["shoppingcarlist"]),
        ...mapState("shoppingcar", ["checklist"]),
        ...mapState("address", ["addresslist"]),
        ...mapGetters("address", ["defaultChooseId"]),
        addressitem() {
            console.log(this.defaultChooseId)
            console.log(this.addresslist.filter(item => item.id == this.defaultChooseId))
            return this.addresslist.filter(item => item.id == this.defaultChooseId)[0]
        },
    },
    mounted() {
        console.log(this.shoppingcarlist.filter(item => {
            console.log(item)
          return  item.checked
        }),"1111")
        console.log(this.shoppingcarlist)
       let dom= document.querySelector(".van-cell__value")
      if(dom!==null) dom.innerHTML = "添加收货地址"

    },
    methods: {
        onAdd() {
            this.$router.push("/addressedit")
        },
        gotoaddress(){
            this.$router.push("/address")
        }
    }
}
</script>

<style lang="scss" scoped>
.van-card__title {
    font-family: PingFangSC-Regular;
    font-size: .28rem;
    color: #333;
    padding-top: 13px;
}

.van-card__desc {
    font-size: .24rem;
    margin-top: 0.06rem;
    line-height: .36rem;
    color: #999;
}

.van-card__price {
    color: #ff3637;
}

.total {
    position: relative;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-icon-arrow{
        font-size: .34rem;
        color: #999;
    }
    div {
        margin-bottom: 5px;
    }

    .detail {
        font-size: .44rem;
        color: #333;
    }

    .bottom {
        font-size: .44rem;
        color: #333;

        span {
            margin-right: 10px;
        }
    }
}

.total::before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 0.05333rem;
    background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
    background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
    background-size: 2.13333rem;
    content: '';
}

.default {
    font-size: .24rem;
    background-color: #d281e7;
    display: inline-block;
    color: #fff;
    width: 35px;
    text-align: center;
    border-radius: 2px;
    margin-right: 20px;
}

.pcc {
    color: #999;
    font-size: .24rem;
    line-height: .36rem;
}</style>