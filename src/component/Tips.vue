<template>
    <transition name="tips-fade">
        <div class="alert" v-show="showFlag" :style="tipsStyle">
            {{content}}
        </div>
    </transition>
</template>
<style  lang="sass" rel="stylesheet/scss">
    .alert {
        $line-height: 18px;
        position: fixed;
        left: 50%;
        bottom: 45%;
        line-height: $line-height;
        z-index: 9999999;
        font-size: 12px;
        background-color: rgba(0,0,0,.8);
        border-radius: 9px;
        color: #ffffff;
        text-align: center;
        padding: 10px;
        white-space: nowrap;
        transform: translate3d(-50%,15%,0);
    }
    .tips-fade-enter,.tips-fade-leave-active{
        opacity: 0;
        bottom: 25%;
    }
    .tips-fade-enter-active,.tips-fade-leave-active{
        transition: all .25s linear;
    }
</style>
<script>
    export default{
        data(){
            return{}
        },
        props: ['showFlag','content','showTime','tipsStyle'],
        watch:{
            showFlag(){
                if(this.showFlag){
                    this.hide();
                }
            }
        },
        methods: {
            hide(){
                let time = this.showTime || 2000; // 停留时间
                clearTimeout(timer);
                let timer = setTimeout(() => {
                    this.$emit('hidetips');
                },time);
            }
        }
    }
</script>
