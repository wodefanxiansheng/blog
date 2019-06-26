<template>
    <div class="top pointer" @click="returnTop" v-if="topShow">
        
    </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
                topShow:false,
            }
        },
        mounted(){
            let _this = this;
            window.addEventListener('scroll',_this.handleScroll,true);
        },
        methods:{
            handleScroll(){
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if(scrollTop >= 500){
                    this.topShow = true;
                }else{
                    this.topShow = false;
                }
            },
            returnTop:function () {
                 document.documentElement.scrollTop = document.body.scrollTop = 0;
            }
        }
    }
</script>
<style lang="less" scoped>
    .top{
        width: 40px;
        height: 36px;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0,0,0,.2);
        position: fixed;
        background:url("../img/images/iconsprite_btbar.png") no-repeat;
        background-color: rgba(0,0,0,.6);
        background-position: 50% -18%;
        right: 30px;
        bottom: 60px;
        z-index: 99999999999999999999;
        -webkit-transition: opacity .4s ease-in-out;
        -moz-transition: opacity .4s ease-in-out;
        -o-transition: opacity .4s ease-in-out;
        opacity: 1;
    }
</style>