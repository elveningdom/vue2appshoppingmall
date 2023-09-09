<template>
    <div>
        <van-address-edit :area-list="areaList" show-postal show-delete show-set-default show-search-result
            :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"
            @delete="onDelete" />
    </div>
</template>

<script>
import { areaList } from '@vant/area-data';
import { mapMutations } from 'vuex';
import { changenav } from "../mixins/changenav"
import { userinfo } from "../mixins/userinfo"
import { addaddress, addressQuery,addressUpdate } from "../model/addressmodel"
export default { 
    mixins: [changenav, userinfo],
    data() {
        return {
            areaList,
            searchResult: [],
        };
    },
    methods: {
        ...mapMutations("address",["setChooseId"]),
        ...mapMutations("address",["changelist"]),
        async onSave(content) {
            console.log({ ...content, userid: this.userid })
            if (content.isDefault) {
                let res = await addressQuery({
                    userid: this.userid,
                    isDefault: true
                }) 
                 console.log(res)
                 console.log(res.data.length)
                if(res.data.length){
                    let info=res.data[0]
                    let res2=await addressUpdate(info.id,{
                        isDefault:false
                    })
                    console.log(res2)
                }
            }
          let res2=  await addaddress({
                ...content,
                userid: this.userid
            })
            this.setChooseId(res2.data.id)
            this.changelist(res2.data)
            this.$router.push("/address")
          
        },
        onDelete() {
            // Toast('delete');
        },

    },
}
</script>

<style lang="scss" scoped></style>