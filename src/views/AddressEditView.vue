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
import { addaddress, addressQuery, addressUpdate } from "../model/addressmodel"
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
        ...mapMutations("address", ["addresslistupdate", 'defaultupdate']),

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
            console.log({ ...content, userid: this.userid })
            if (this.$route.params.id !== void 0) {
                this.repeatquery(content)
                let res2 = await addressUpdate(this.$route.params.id, content)
                this.addresslistupdate({ id: this.$route.params.id, content })
                console.log(res2.data)
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
        onDelete() {
        },

    },
}
</script>

<style lang="scss" scoped></style>