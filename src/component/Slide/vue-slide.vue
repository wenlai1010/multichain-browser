<style>

.rd-swipe {
    height: 500px;
    width:100%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    z-index: 1;
}
.rd-swipe-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    -webkit-transition-property: -webkit-transform;
    transition-property: transform;
    box-sizing: content-box;
}
.rd-swipe-item {
    width: 100%;
    flex-shrink: 0;
    height: 100%;
    background-size: cover;
    cursor: pointer;
}
.circle-box {
    width: 1184px;
    margin: 0 auto;
    position: relative;
    left: 0px;
}
.rd-swipe-pagination {
    position: absolute;
    bottom: 16px;
    width: 100%;
    display: flex;
    left:-4px;
    z-index: 1;
}
.rd-swipe-pagination-item {
    width: 10px;
    height: 10px;
    background: rgba(0, 0, 0, 0);
    z-index: 1;
    margin: 4px;
    border: 1px solid #fff;
    border-radius: 50%;
}
.rd-swipe-pagination-item.active {
    background: #fff;
}

    .rd-swipe {
        height: 500px;
        width:100%;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
        z-index: 1;
    }
    .rd-swipe-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 1;
        display: flex;
        -webkit-transition-property: -webkit-transform;
        transition-property: transform;
        box-sizing: content-box;
    }
    .rd-swipe-item {
        width: 100%;
        flex-shrink: 0;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
    }
    .rd-circle {
        width: 1184px;
        margin: 0 auto;
        position: relative;
    }
    .rd-swipe-pagination {
        position: absolute;
        bottom: 16px;
        width: 100%;
        display: flex;
        left: -4px
    }
    .rd-swipe-pagination-item {
        width: 10px;
        height: 10px;
        background: rgba(0, 0, 0, 0);
        z-index: 1;
        margin: 4px;
        border: 1px solid #fff;
        border-radius: 50%;
        cursor:pointer;
    }
    .rd-swipe-pagination-item.active {
        background: #fff;
    }


</style>
<template>
    <div class="rd-swipe" ref='swipe'>
        <div class="rd-swipe-wrapper" :style="wrapperStyle">
            <slot></slot>
        </div>
        <div class="rd-circle">
            <div class="rd-swipe-pagination" v-if="options.pagination">
                <div class="rd-swipe-pagination-item"
                     :class="{ 'active': item.active }"
                     v-for="(item, index) in pagination"
                     @click="turnTo(index)"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
    import CovTouch from './cov-touch'

    const _ = {
        on (el, type, handler) {
            el.addEventListener(type, handler, false)
        },
        off (el, type, handler) {
            el.addEventListener(type, handler, false)
        }
    }

    export default {
        props: {
            swipe: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        data () {
            return {
                $wrapper: null,
                $touch: null,
                timer: null,
                pagination: [],
                swiper: {
                    swiping: false,
                    rect: {
                        width: 0,
                        height: 0
                    },
                    count: 0,
                    index: 0,
                    options: {}
                },
                position: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                options: {
                    activeIndex: 0,
                    autoplay: 1000,
                    pagination: true
                }
            }
        },
        computed: {
            wrapperStyle () {
                if (this.swiper.swiping) {
                    return {
                        transform: `translate3d(-${this.position.x}px, ${this.position.y}px, ${this.position.z}px)`,
                        '-webkit-transform': `translate3d(-${this.position.x}px, ${this.position.y}px, ${this.position.z}px)`
                    }
                } else {
                    return {
                        transform: `translate3d(-${this.position.x}px, ${this.position.y}px, ${this.position.z}px)`,
                        '-webkit-transform': `translate3d(-${this.position.x}px, ${this.position.y}px, ${this.position.z}px)`,
                        transition: 'all .3s',
                        '-webkit-transition': 'all .3s',
                    }
                }

            }
        },
        mounted () {
            this.init();
            $(window).bind('resize', this.init);


        },
        beforeDestroy () {
            if (this.$touch) {
                this.$touch.destroy()
            }
        },
        methods: {
            init ()  {
                this.options = $.extend(this.options, this.swipe)
                this.$wrapper = this.$el.getElementsByClassName('rd-swipe-wrapper')[0]
                this.swiper.count = this.$el.getElementsByClassName('rd-swipe-item').length
                this.swiper.rect = this.$el.getBoundingClientRect()

                if (this.options.pagination) {
                    let arrs = [];
                    for (let i = 0, len = this.swiper.count; i < len; i++) {
                        arrs.push({
                            index: i,
                            active: i === 0
                        });
                    }
                    this.pagination = arrs;
                }

                this.initSwipe();
                if (this.swipe.autoplay) {
                    this.startAutoPlay(this.swipe.autoplay)
                }
            },
            initSwipe () {

               this.$refs.swipe.onmouseover = function() {
                   this.stopAutoPlay();
               }.bind(this);
               this.$refs.swipe.onmouseout = function() {
                   this.startAutoPlay();
               }.bind(this)
                if (this.$touch) {
                    this.$touch.destroy();
                }
                this.$touch = new CovTouch({el: this.$el })

                this.$touch.listen('swipe-left', null, () => {
                    this.swiper.swiping = false
                    this.next()
                })
                this.$touch.listen('swipe-right', null, () => {
                    this.swiper.swiping = false
                    this.pre()
                })
                let movediff = 0

                this.$touch.listen('swiping', null, (start, end) => {
                    this.swiper.swiping = true
                    let move = start.x - end.x
                    this.position.x += (move - movediff)
                    movediff = move
                })

                this.$touch.listen('swiped', null, (start, end) => {
                    movediff = 0
                    this.swiper.swiping = false;
                })
            },
            startAutoPlay (delay) {
                this.stopAutoPlay()
                this.timer = setInterval(this.play, delay || this.options.autoplay)
            },
            stopAutoPlay () {
                if (this.timer) {
                    window.clearInterval(this.timer)
                    window.clearTimeout(this.timer)
                    this.timer = null
                }
            },
            play () {
                if (this.swiper.index === (this.swiper.count - 1)) {
                    this.swiper.index = -1
                }
                if (this.swiper.swiping) return
                this.next()
            },
            next () {
                if (this.swiper.index < this.swiper.count - 1) {
                    this.swiper.index++
                }
                this.position.x = (this.swiper.rect.width * this.swiper.index)
                this.checkOut()
            },
            pre () {
                if (this.swiper.index > 0) {
                    this.swiper.index--
                }
                this.position.x = (this.swiper.rect.width * this.swiper.index)
                this.checkOut()
            },
            turnTo (index) {
                index = Math.floor(index);
                if (index < -1 || index > this.swiper.count) return console.error('invaild index: ', index)
                this.stopAutoPlay()
                this.swiper.index = index
                this.position.x = (this.swiper.rect.width * index)
                this.checkOut()
                this.timer = setTimeout(() => {
                    this.startAutoPlay()
                }, this.swipe.autoplay * 2);
            },
            setPaginationActive (index) {
                this.pagination.forEach(item => item.active = false)
                this.pagination[index].active = true
            },
            checkOut () {
                this.swipe.activeIndex = this.swiper.index
                if (this.options.pagination) {
                    this.setPaginationActive(this.swiper.index)
                }
                if (this.position.x > (this.swiper.rect.width * this.swiper.count)) {
                    this.position.x = (this.swiper.rect.width * this.swiper.count)
                }
                if (this.position.x < 0) {
                    this.position.x = 0
                }
            }
        }
    }
</script>