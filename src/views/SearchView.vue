<!-- <template>
    <div>
        <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
    </div>
</template>

<script>
import {goodsinfoQuery} from "../../model/usermodel"
export default {
    data() {
        return {
            value: '',
        }
    },
    watch: {
        async value(newval) {
            let res = await goodsinfoQuery({
                mainTitle_like: newval
            })
            console.log(res)
        }
    },
}
</script>

<style lang="scss" scoped></style> -->