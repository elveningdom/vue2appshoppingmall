<template>
    <div>
        <van-address-edit :area-list="areaList" show-postal show-delete show-set-default show-search-result
            :save-button-text="savetext" :address-info="addressInfo" :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" />
    </div>
</template>

<script>
import { areaList } from '@vant/area-data';
import { mapMutations, mapState } from 'vuex';
import { changenav } from "../mixins/changenav"
import { userinfo } from "../mixins/userinfo"
import { addaddress, addressQuery, addressUpdate ,addressdelete} from "../model/addressmodel"
// import { addressUpdate } from "../model/addressmodel"
export default {
    mixins: [changenav, userinfo],
    data() {
        return {
            areaList,
            searchResult: [],
            savetext: "保存",
        };
    },
    computed: {
        ...mapState('address', ['addresslist']),
        addressInfo() {
            let info = {}
            if (this.$route.params.id !== void 0) {
                info = this.addresslist.filter(item => item.id == this.$route.params.id).map(item => item)[0]
            }
            return info
        }
    },
    mounted() {
        if (this.$route.params.id !== void 0) {
            this.savetext = '修改'
        }
    },
    methods: {
        ...mapMutations("address", ["setChooseId"]),
        ...mapMutations("address", ["changelist"]),
        ...mapMutations("address", ["addresslistupdate", 'defaultupdate','addressdelete']),

        async repeatquery(content) {//重复查询
            if (content.isDefault) {
                let res = await addressQuery({
                    userid: this.userid,
                    isDefault: true
                })
                if (res.data.length) {
                    let info = res.data[0]
                    await addressUpdate(info.id, {
                        isDefault: false
                    })
                    this.defaultupdate(info.id)
                }
            }
        },
        async onSave(content) {
            if (this.$route.params.id !== void 0) {
                this.repeatquery(content)
                let res2 = await addressUpdate(this.$route.params.id, content)
                this.addresslistupdate({ id: this.$route.params.id, content })
                this.setChooseId(res2.data.id)
            } else {
                this.repeatquery(content)
                let res2 = await addaddress({
                    ...content,
                    userid: this.userid
                })
                this.setChooseId(res2.data.id)
                this.changelist(res2.data)
            }
            this.$router.push("/address")
        },
       async onDelete(content) {
        await addressdelete(content.id)
        this.addressdelete(content.id)
        this.$router.push("/address")
        
        },

    },
}
</script>

<style lang="scss" scoped>

/* 使用 ::v-deep 选择器来穿透组件边界 */
::v-deep .van-switch--on  {
  background-color: #eda2ec;
}

/* 使用 ::v-deep 选择器来穿透组件边界 */
::v-deep .van-button--danger  {
  color: #eb7be9;
  background-color: #fff;
  border: 0.02667rem solid #eb7be9;
}
::v-deep .van-button--round{
     border-radius: 0;
}
::v-deep .van-button--default {
  border: 0.02667rem solid #eb7be9;
  color:#eb7be9;
}
</style>