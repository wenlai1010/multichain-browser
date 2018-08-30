<template>
    <div class="comp-asset-drop">
        <div class="header" @click="toggle($event)" :style="styleOuter">
            <div class="drop-item">
                <span class="text" >{{coinType}}</span>
                <i class="icon-allow-down" :class="{'icon-allow-down--up':show , 'icon-allow-show': !isShow}"></i>
            </div>
        </div>
        <ul class="list" v-if="show && isShow">
            <li class="list-item"
                v-for="item in coinList"
                :key="item"
                @click="changeCoin(item)">
                <img :src="'../img/@right.png'" alt="item" class="img" :class="{'list-item--active':item === coinType}">
                <span class="text">{{item}}</span>
            </li>
        </ul>
    </div>
</template>

<script type="text/babel">


    export default {
        components: {},
        data() {
            return {
                show:false
            };
        },
        props: {
            coin:{
                default:'SSC'
            },
            coinList:{
                default:[]
            },
            onSuccess:{
                default:function (val) {}
            },
            styleOuter:{

            },
            isShow:{
                default: true
            }
        },
        computed: {
            coinType: function () {
                return this.coin
            }
        },
        created(){
        },
        mounted() {
            $(document).on('click', (e) => {
                if (this.show === true) {
                    this.show = false;
                }
            });
        },

        methods: {
            changeCoin(coinType){
                this.coinType = coinType;
                this.onSuccess(coinType);
                this.show = false;
            },

            toggle($event) {
                $event.stopPropagation();
                if (this.show === true) {
                    this.show = false;
                } else {
                    this.show = true;
                }
            },
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss">
    .comp-asset-drop {
        position: relative;
        display: inline-block;
        z-index: 2;
        .header{
            width: 80px;
            background-color: #F2F3F8;
        }

        .text{
            display: inline-block;
            min-width: 48px;
            text-align: left;
            white-space:nowrap;
        }
        .drop-item{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 32px;
            line-height: 32px;
            cursor: pointer;
            border: 1px #D1D3DF solid;
            border-radius: 2px;

        }
        .list{
            position: absolute;
            top: 29px;
            left: 0px;
            width: 80px;
            background-color: #f0f0f0;
            border: 1px solid #b6b6b6;
            border-radius: 5px;
            overflow: auto;
            z-index: 111;
            box-sizing: border-box;
            &-item{
                width: 100%;
                height: 28px;
                line-height: 28px;
                cursor: pointer;
                text-align: center;
                transition: all 0.4s ease;
                &:hover {
                    background-color: #7999F7;
                    color: #fff;
                }
                >img{
                    visibility:hidden;
                    width: 16px;
                    height: 12px;
                }
                &--active{
                    visibility: visible !important;
                }
            }
        }

        .icon-allow-show{
             display: none;
        }
        .icon-allow-down{
            &--up{
                transform: rotate(180DEG);
            }
            font-size: 18px;
            transform-origin: 50% 47%;
        }
        // 滚动条样式
        ::-webkit-scrollbar {
            background-color: #fff;
        }

        ::-webkit-scrollbar-thumb {
            background-color: #fff;
            border: 1px solid #eee;
        }
    }
</style>
