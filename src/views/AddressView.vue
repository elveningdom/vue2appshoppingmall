<template>
    <div>
        <van-nav-bar title="收货地址" left-arrow @click-left="onClickLeft" />
        <van-empty v-if="!list.length" class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
            description="您还没有创建收货地址哦">
            <van-button round type="danger" class="bottom-button" @click="gotoaddressedit">新建地址</van-button>
        </van-empty>
        <van-address-list v-else v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit"
            add-button-text="+ 添加收货地址" @click-item="clickitem">
            <!-- <template v-slot:tag="scope">
                <div>
                    <span>{{ scope.name }}</span>
                    <span>{{ scope.tel }}</span>
                </div>
            </template> -->
        </van-address-list>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import { changenav } from "../mixins/changenav"
export default {
    mixins: [changenav],
    mounted() {
    },
    computed: {
        ...mapState("address", ["addresslist"]),
        ...mapGetters("address", ["defaultChooseId"]),
        list() {
            return this.addresslist.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    tel: item.tel,
                    address: item.addresstotal,
                    isDefault: item.isDefault
                }
            })
        },
        chosenAddressId: {
            get() {
                return this.defaultChooseId
            },
            set(val) {
                this.setChooseId(val)
            }
        },
    },
    data() {
        return {
            shouldPreventClickItem: false
        };
    },
    methods: {
        ...mapMutations("address", ["setChooseId"]),
        onAdd() {
            this.$router.push("/addressedit")
        },
        onEdit(item) {
            this.shouldPreventClickItem = true;

            this.$router.push("/addressedit/"+item.id)

        },
        onClickLeft() {
            this.$router.back(-1)
        },
        gotoaddressedit() {
            this.$router.push("/addressedit")
        },
        clickitem() {
            if (this.shouldPreventClickItem) {
                // 阻止执行点击逻辑
                this.shouldPreventClickItem = false;
                return;
            }
            this.$router.push("/pay")
        }
    },
}
</script>

<style lang="scss" scoped>
::v-deep .van-icon-success {
    // display: none;
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
    background-color: #dc87ed;
    border: 0.02667rem solid #dc87ed;
    color: #fff;
}

.van-button__text {
    color: #dc87ed;
}

.van-button--round {
    border-radius: 0;
}

.van-nav-bar__content {
    position: relative
}

::v-deep .van-nav-bar__content::before {
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
</style>