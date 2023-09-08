<template>
    <div>
        <van-contact-card type="add"  icon="location-o" @click="onAdd" />
        <div>
            <div><span>默认</span><span>{{this.addresslist.province}}{{this.addresslist.city  }}{{ this.addresslist.county }}</span></div>
            <div>{{ this.addresslist.addresstotal }}</div>
            <div><span>{{ this.addresslist.name }}</span><span>{{ this.addresslist.tel }}</span></div>
        </div>

        <van-card v-for="i in shoppingcarlist.filter(item=>item.checked)" :key="i.id"
            :num="i.buynum" 
            :price="i.goodsprice/100" 
            :desc="i.colorname+',' +i.sizename" 
            :title="i.goodsname" 
            :thumb="i.img" />
    </div>
</template>

<script>
import { changenav } from "../mixins/changenav"
import { mapState } from "vuex";
export default {
    mixins: [changenav],
    computed:{
        ...mapState("shoppingcar",["shoppingcarlist"]),
        ...mapState("address",["addresslist"]),
        // addressitem(){

        // }
    },
    data() {
    return {
    };
  },
  created(){
     console.log(this.addresslist)
  },
    mounted(){
       
        document.querySelector(".van-cell__value").innerHTML="添加收货地址"
    },
    methods:{
        onAdd(){
            
        }
    }
}
</script>

<style lang="scss" scoped>
.van-card__title{
    font-family: PingFangSC-Regular;
    font-size: .28rem;
    color: #333;
    padding-top: 13px;
}
.van-card__desc{
    font-size: .24rem;
    margin-top: 0.06rem;
    line-height: .36rem;
    color: #999;
}
.van-card__price{
    color: #ff3637;
}
</style>