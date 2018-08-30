<template>
    <div class="bonus-detail fixed-bg" :class="{'hide': !showDetail}">
        <div class="content-bg" @click="hideDetail"></div>
        <div class="content-wrap">
            <div class="content">
                <div class="content-detail" v-html="$t('bonusDetail')"></div>
                <i class="close-btn" @click="hideDetail"></i>
            </div>
            <div class="content-env"></div>
        </div>
    </div>
</template>
<style  lang="sass" rel="stylesheet/scss">
    
  .bonus-detail {
        padding-top: 20%;
        transition: opacity .4s;
        &.hide {
        opacity: 0;
        z-index: -1;
        }
        .content-bg {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0);
        }

        .content-wrap {
            margin: 0 .3rem;
            position: absolute;
        }
        .content-env {
        height: 2.2rem;
        background: #da402d url(./img/tcbg.png) no-repeat top center;
        border-radius: 0 0 .2rem .2rem;
        background-size: contain;
        &:before {
            content: '';
            position: absolute;
            top: 2rem;
            bottom: 2.2rem;
            left: 0;
            right: 0;
            background: #be3827;
        }
        &:after {
            content: '';
            position: absolute;
            top: 1.5rem;
            left: 0;
            width: 100%;
            height: 1rem;
            background: #be3827;
            border-radius: 50%;
        }
        }
        .content {
        margin: 0 .3rem;
        background: #ffe4cc;
        text-align: left;
        font-size: .22rem;
        margin-top: .32rem;
        padding: .32rem .32rem 0;
        position: relative;
        z-index: 1;
        color: #000;

        &-detail {
            height: 5.4rem;
            overflow-y: scroll;
        }
        
        &:after {
            content: '';
            position: absolute;
            top: -.32rem;
            left: 0;
            width: 0;
            height: 0;
            border: .16rem solid #f3ccaa;
            border-top-color: transparent;
            border-left-color: transparent;
        }

        &:before {
            content: '';
            position: absolute;
            top: -.32rem;
            left: .32rem;
            right: 0;
            margin: auto;
            height: 0;
            border-top: .32rem solid #ffe4cc;
        }

        dt {
            color: #da402d;
            margin-top: .32rem;
            span { color: #000 }
        }

        .close-btn {
            position: absolute;
            top: 0;
            right: .5rem ;
            &:before, &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: .32rem;
            height: .02rem;
            background: #da412e;
            transform: rotate(45deg)
            }
            &:after {
            transform: rotate(-45deg)
            }
        }

        }
        
    }


    @media screen and (max-width: 320px) {
        .bonus-detail .content {
            font-size: 12px;
        }
    }

</style>
<script>
    export default{
        data(){
            return{}
        },
        props: ['showDetail'],
        methods: {
            hideDetail(){
                this.$emit('hideDetail');
            }
        }
    }
</script>
