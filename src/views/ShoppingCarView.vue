<template>
    <div>
        <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-swipe-cell v-for="i in shoppingcarlist" :key="i.id" class="wrapp" :name="i.id" :before-close="beforeClose">
            <van-checkbox v-model="i.checked" checked-color="rgb(114, 50, 221)" class="btn"></van-checkbox>
            <van-card  :price="i.goodsprice / 100*i.buynum" :desc="i.colorname + ',' + i.sizename"
                :title="i.goodsname" class="goods-card" :thumb="i.img">
                <template #footer>
                    <van-stepper v-model="i.buynum" disable-input :name="i.id" @change="changebuynum"/>
                </template>
            </van-card>
            <template #right>
                <van-button square text="删除" type="danger" class="delete-button" />
            </template>

        </van-swipe-cell>
        <van-submit-bar :price="totalprice" :button-text="buynumAll" @submit="onSubmit" button-color="rgb(114, 50, 221)">
            <van-checkbox v-model="checkedAll">全选</van-checkbox>
        </van-submit-bar>
    </div>
</template>

<script>
import { changenav } from "../mixins/changenav"
import { mapState, mapMutations } from "vuex"
import { shoppingcardelete } from "../model/shoppingcarmodel"
import {shoppingCarUpdate} from "../model/shoppingcarmodel"
export default {
    mixins: [changenav],
    data() {
        return {
        }
    },
    mounted() {
    },
    computed: {
        ...mapState("shoppingcar", ["shoppingcarlist"]),
        checkedAll: {
            get() {
                return this.shoppingcarlist.length ? this.shoppingcarlist.every(item => item.checked) : false
            },
            set(val) {
                this.shoppingcarlist.forEach(item => (item.checked = val));
            }
        },
        totalprice() {
            let info = this.shoppingcarlist.filter(i => i.checked)
            return info.length ? info.map(item => item.goodsprice * item.buynum).reduce((a, b) => a + b) : 0
        },
        buynumAll() {
            let info = this.shoppingcarlist.filter(i => i.checked)
            return info.length ? '结算(' + info.map(item => item.buynum).reduce((a, b) => a + b) + ')' : '结算'
        }
    },
    methods: {
        ...mapMutations("shoppingcar", ["setChecklist", 'shoppingcardeleteone']),
        onClickLeft() {
            this.$router.back(-1)
        },
        onSubmit() {
            let info = this.shoppingcarlist.filter(i => i.checked)
            if (info.length) {
                this.setChecklist(info)
                this.$router.push("/pay")
            } else {
                this.$toast.fail("请至少添加一条")
            }
        },
        beforeClose({ name, position, instance }) {
            switch (position) {
                case 'left':
                case 'cell':
                case 'outside':
                    instance.close();
                    break;
                case 'right':
                    this.$dialog.confirm({
                        message: '确定删除吗？',
                    }).then(async () => {
                        await shoppingcardelete(name)
                        this.shoppingcardeleteone(name)
                        instance.close();
                    });
                    break;
            }
        },
        changebuynum(value,detail){
            shoppingCarUpdate(detail.name,{
                buynum:value
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.delete-button {
    height: 100%;
}

::v-deep .van-swipe-cell__wrapper {
    display: flex;

    .van-checkbox {
        flex-shrink: 0;
    }

    .goods-card {
        flex-grow: 1;
    }
}

.btn {
    background-color: #fafafa;
    padding-left: 10px;
}

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
</style>