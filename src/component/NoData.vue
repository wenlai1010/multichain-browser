<template>
    <div class="comp-no-data">
        <div class="icon-box">
            <i class="icon-record"></i>
        </div>
        <div class="text-box">
            <slot>{{ $t('noData' )}}</slot>
        </div>
    </div>
</template>

<script type="text/babel">
//    import { i18n, i18nMixin } from '../js/base/i18n';

    export default {
        data() {
            return {

            };
        },
//        mixins: [i18nMixin],
        props: {

        },
        methods: {

        }
    }
</script>

<style lang="sass" rel="stylesheet/scss">
    .comp-no-data {
        padding: 30px 0;
        text-align: center;
        color: #cccccc;
        .icon-box, .text-box {
            display: inline-block;
            vertical-align: middle;
        }
        .icon-box {
            .icon-record {
                font-size: 32px;
            }
        }
        .text-box {
            margin-left: 4px;
            text-align: left;
            >.row {
                &:first-child {
                    font-size: 14px;
                }
                &:nth-child(2) {
                    font-size: 12px;
                }
            }
        }
    }
</style>