<template>
    <div class="comp-popover">
        <span ref="trigger" class="popover-trigger">
            <slot></slot>
        </span>
            <div ref="popover" v-show="show" class="popover-body"
                 :style="{'width': width === 'auto'? 'auto' : width + 'px'}">
                <h3 class="title" v-if="title">
                    <slot name="title">{{title}}</slot>
                </h3>
                <div class="content">
                    <slot name="content">{{content}}</slot>
                </div>
            </div>
            <div class="arrow" v-show="show" :class="placement" ref="arrow"></div>
    </div>
</template>

<script type="text/babel">


    /**
     * @example
     <popover placement="bottom" title="市价" content="这里是tip的内容哦" trigger="hover">
     <button class="ui-btn ui-btn--default">1</button>
     </popover>
     */

    const OFFSET_LEFT = 20;

    export default {
        props: {
            relative: {
                type: Boolean,
                default: false
            },
            trigger: {
                type: String,
                default: 'click'
            },
            title: {
                type: String
            },
            content: {
                type: String
            },
            placement: {
                type: String,
                default: 'bottom'
            },
            width: {}
        },
        data() {
            return {
                position: {
                    top: -99999,
                    left: -99999
                },
                show: false
            }
        },
        mounted() {
            let events = {
                contextmenu: 'contextmenu',
                hover: 'mouseleave mouseenter',
                focus: 'blur focus'
            };
            let elem = this.$refs.trigger;
            $(elem).on(events[this.trigger] || 'click', (e) => {
                this.toggle(e);
            });
        },
        methods: {

            _setPositionAbsolute() {
                const popover = this.$refs.popover;
                const trigger = this.$refs.trigger.children[0];
                const arrow = this.$refs.arrow;

                let arrowLeft;
                let arrowTop;

                let $trigger = $(trigger);
                let $arrow = $(arrow);
                let $popover = $(popover);
                switch (this.placement) {
                    case 'top' :
                        this.position.left = $trigger.offset().left - $popover.width() / 2 + $trigger.width() / 2;
                        this.position.top = $trigger.offset().top - $popover.height() - arrow.offsetHeight;

                        arrowLeft = $trigger.offset().left + $trigger.width() / 2 - arrow.offsetWidth / 2;
                        arrowTop = $trigger.offset().top - arrow.offsetHeight;
                        break;
                    case 'bottom':
                        this.position.left = $trigger.offset().left + $trigger.width() / 2 - OFFSET_LEFT;
                        this.position.top = $trigger.offset().top + $trigger.height() + arrow.offsetHeight;

                        arrowLeft = $trigger.offset().left + $trigger.width() / 2 - arrow.offsetWidth / 2;
                        arrowTop = $trigger.offset().top + $trigger.height();

                        break;
                    case 'leftbottom':
                        this.position.left = $trigger.offset().left + $trigger.width() / 2 + OFFSET_LEFT - $popover.width();
                        this.position.top = $trigger.offset().top + $trigger.height() + arrow.offsetHeight;

                        arrowLeft = $trigger.offset().left + $trigger.width() / 2 - arrow.offsetWidth / 2;
                        arrowTop = $trigger.offset().top + $trigger.height();
                        break;
                    default:
                        console.warn('Wrong placement prop')
                }

                $popover.css({
                    top: this.position.top + 'px',
                    left: this.position.left + 'px'
                });

                $arrow.css({
                    top: arrowTop + 'px',
                    left: arrowLeft + 'px'
                });
            },

            _setPositionRelative() {
                const popover = this.$refs.popover;
                const trigger = this.$refs.trigger.children[0];
                const arrow = this.$refs.arrow;

                let arrowLeft;
                let arrowTop;

                switch (this.placement) {
                    case 'top' :
                        this.position.left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2;
                        this.position.top = trigger.offsetTop - popover.offsetHeight - arrow.offsetHeight;

                        arrowLeft = trigger.offsetLeft + trigger.offsetWidth / 2 - arrow.offsetWidth / 2;
                        arrowTop = trigger.offsetTop - arrow.offsetHeight;
                        break;
                    case 'bottom':

                        this.position.left = trigger.offsetLeft + trigger.offsetWidth / 2 - OFFSET_LEFT;
                        this.position.top = trigger.offsetTop + trigger.offsetHeight + arrow.offsetHeight;

                        arrowLeft = trigger.offsetLeft + trigger.offsetWidth / 2 - arrow.offsetWidth / 2;
                        arrowTop = trigger.offsetTop + trigger.offsetHeight;

                        break;
                    case 'leftbottom':

                        this.position.left = trigger.offsetLeft + trigger.offsetWidth / 2 + OFFSET_LEFT - popover.offsetWidth;
                        this.position.top = trigger.offsetTop + trigger.offsetHeight + arrow.offsetHeight;

                        arrowLeft = trigger.offsetLeft + trigger.offsetWidth / 2 - arrow.offsetWidth / 2;
                        arrowTop = trigger.offsetTop + trigger.offsetHeight;

                        break;
                    default:
                        console.warn('Wrong placement prop')
                }

                popover.style.top = this.position.top + 'px';
                popover.style.left = this.position.left + 'px';

                arrow.style.top = arrowTop + 'px';
                arrow.style.left = arrowLeft + 'px';

            },

            toggle(e) {
                if (e && this.trigger === 'contextmenu') {
                    e.preventDefault();
                }
                if (!(this.show = !this.show)) {
                    return;
                }
                setTimeout(() => {
                    if (this.relative === true) {
                        this._setPositionRelative();
                    } else {
                        this._setPositionAbsolute();
                    }
                }, 0);
            }
        },
        beforeDestroy() {
            $(this.$refs.trigger).off();
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss">
    .comp-popover {
        $color-border: #e6e6e6;
        $zIndex_popover: 10;

        @mixin ellipsis {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            word-break: break-all;
        }

        @mixin shadow {
            box-shadow: 1px 1px 5px rgba(125, 125, 125, 0.04);
        }

        %commonArrow {
            position: absolute;
            display: block;
            width: 0;
            height: 0;
            border-color: transparent;
            border-style: solid;
            border-width: 6px;
        }

        .arrow {
            @extend %commonArrow;
            z-index: $zIndex_popover;
            &:after {
                @extend %commonArrow;
                content: " ";
            }
            &.top {
                bottom: -7px;
                left: 50%;
                transform: translate(-50%, 0);
                border-bottom-width: 0;
                border-top-color: #999;
                border-top-color: rgba(0, 0, 0, .25);
                &:after {
                    bottom: 1px;
                    border-width: 7px;
                    margin-left: -7px;
                    border-bottom-width: 0;
                    border-top-color: #fff;
                }
            }
            &.bottom, &.leftbottom {
                top: -7px;
                left: -9999em;
                border-top-width: 0;
                border-bottom-color: #999;
                border-bottom-color: rgba(0, 0, 0, .25);
                &:after {
                    top: 1px;
                    border-width: 7px;
                    margin-left: -7px;
                    border-top-width: 0;
                    border-bottom-color: #fff;
                }
            }
        }

        .popover-trigger {
            /*display: inline-block;*/
            /*vertical-align: top;*/
            .icon, .icon-info {
                margin-right: 2px;
            }
            .text {
                vertical-align: middle;
            }
        }
        .popover-body {
            position: absolute;
            top: -9999em;
            left: -9999em;
            z-index: $zIndex_popover;
            width: 320px;
            border: 1px solid rgba(0, 0, 0, .2);
            border-radius: 4px;
            @include shadow;
            background-color: #fff;
            font-size: 12px;

            > .title {
                height: 32px;
                line-height: 32px;;
                padding-left: 16px;
                color: #666;
                border-bottom: 1px $color-border solid;
                @include ellipsis;
                font-size: 12px;
                border-radius: 4px 4px 0 0;
                text-align: left;
            }
            > .content {
                padding: 4px 16px;
                line-height: 2;
                word-break: break-all;
                border-radius: 4px;
                color: #999;
            }
        }
    }
</style>