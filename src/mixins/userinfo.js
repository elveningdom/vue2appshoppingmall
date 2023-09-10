export const userinfo={
    data(){
        return{
            userid:""
        }
    },
    created(){
    let userid=JSON.parse(window.localStorage.getItem("userinfo"))?.id
    this.userid=userid
    console.log(this.userid)
    }
}