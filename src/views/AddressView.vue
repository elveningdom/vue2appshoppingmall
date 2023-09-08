<template>
    <div>
        <van-nav-bar title="收货地址" left-arrow @click-left="onClickLeft" />
        <van-empty v-if="!list.length" class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
            description="您还没有创建收货地址哦">
            <van-button round type="danger" class="bottom-button">新建地址</van-button>
        </van-empty>
        <van-address-list v-else v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit"
            add-button-text="+ 添加收货地址">
            <template v-slot:tag="{ item }">
                <span>{{ item?.name }}</span>
            </template>
        </van-address-list>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { changenav } from "../mixins/changenav"
export default {
    mixins: [changenav],
    mounted() {
    },
    computed: {
        ...mapState("address", ["addresslist"]),
        list() {
            console.log(this.addresslist.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    tel: item.tel,
                    address: item.addresstotal,
                    isDefault: item.isDefault
                }
            }))
            return this.addresslist.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    tel: item.tel,
                    address: item.addresstotal,
                    isDefault: item.isDefault
                }
            })
        }
    },
    data() {
        return {
            chosenAddressId: '1',
        };
    },
    methods: {
        onAdd() {
            this.$router.push("/addressedit")
        },
        onEdit(item, index) {
            console.log(item, index)
            //   Toast('编辑地址:' + index);
        },
        onClickLeft() {
            this.$router.back(-1)
        }
    },
}
</script>

<style lang="scss" scoped>
::v-deep .van-icon-success {
    display: none;
}

.van-address-item__address {
    line-height: .36rem;
    color: #999;
    font-size: .24rem;
}

.van-tag--danger {
    background-color: #fff;
    color: #b657df;
    border: 0.02667rem solid #b657df;
}

.van-button {
    background-color: #fff;
    border: 0.02667rem solid #b657df;
}

.van-tag--round {
    border-radius: 0
}

.custom-image .van-empty__image {
    width: 90px;
    height: 90px;
}

.bottom-button {
    background-color: #784CFA;
    border: 0.02667rem solid #784CFA;
}

.van-button__text {
    color: #b657df;
}

.van-button--round {
    border-radius: 0;
}</style>