<template>
    <div>
        <van-grid :column-num="5">
            <van-grid-item v-for="i in list" :key="i.id" :text="i.name"   > 
                
                <template v-slot:default>
                    <van-image :src="i.img" />
                    <p class="gridp"> {{ i.name }}</p>
                </template>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
import {gridQuery} from "../../model/homemodel.js"
export default {
    data(){
        return{
            list:[]
        }
    },
   async mounted(){
    let res=await gridQuery()
    this.list=res.data
    }
}
</script>

<style lang="scss" scoped>
.van-image{
    width: 0.48rem;
    height: 0.48rem;
    display: block;
    margin: 0 auto 0.08rem;
}
.gridp{
    width: 100%;
    font-size: 0.22rem;
    text-align: center;
    height: 0.24rem;
    line-height: 0.24rem;
    color: #666;
    // width: 1.2rem;
    padding: 0rem 0.12rem;
    // overflow: hidden;
    // white-space: nowrap;
    // text-overflow: ellipsis;
}
</style>