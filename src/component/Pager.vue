<template>
    <div v-show="totalPages > 1" class="comp-pager">
        <ul class="pagination">
            <li class="item" v-on:click="selectPage(currentPageNo - 1)" v-if="currentPageNo>1">
                <a href="javascript:;" class="item-link" aria-label="Previous">
                    <span aria-hidden="true"><span class="icon-left"></span>&lt;</span>
                </a>
            </li>
            <li class="item" v-for="page in pages" :class="{ 'active': page.number == currentPageNo, 'disabled': page.disabled }" v-on:click="selectPage(page.number)">
                <a href="javascript:;" class="item-link" v-text="page.text"></a>
            </li>
            <li class="item" v-on:click="selectPage(currentPageNo + 1)" v-if="currentPageNo !== pageNum">
                <a href="javascript:;" class="item-link" aria-label="Next">
                    <span aria-hidden="true"><span class="icon-right"></span>&gt;</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script type="text/babel">

//    import {PAGE_SIZE} from '../common/constants';
    const PAGE_SIZE = 10;
//    const PAGE_SIZE = 2;

    export default {
        data() {
            return {
                goPageNum: ''
            };
        },
        props: {
            pageNo: {
                type: Number,
                default: 0
            },
            // 一页显示多少条
            pageSize: {
                twoWay: true,
                type: Number,
                validator: function (value) {
                    return value > 0
                },
                default: PAGE_SIZE
            },

            // 总页数
            pageNum: {
                type: Number,
                default: 0
            },
            // 总数目
            count: {
                type: Number,
                default: 0
            },
            displayNum: {
                type: Number,
                default: 4
            },
            edgeNum: {
                type: Number,
                default: 1
            },
            onPageChange: {
                type: Function,
                default() {}
            }
        },
        replace: true,
        inherit: false,
        watch: {
            goPageNum(newVal, oldVal) {
                let numberReg = /^\d$/;
                newVal = $.trim(newVal);
                if (newVal !== '') {
                    if (numberReg.test(newVal) !== true) {
                        this.goPageNum = oldVal;
                    } else {
                        if (+newVal > this.pageNum) {
                            this.goPageNum = this.pageNum;
                        }else if(+newVal < 1){
                            this.goPageNum = 1;
                        }
                    }
                }
            }
        },
        computed: {
            currentPageNo() {
                return this.pageNo;
            },
            noPrevious() {
                return this.currentPageNo === 1;
            },
            noNext() {
                return this.currentPageNo === this.totalPages;
            },
            pages() {
                return getPages(this.currentPageNo, this.totalPages, this.edgeNum, this.displayNum);
            },
            totalPages() {
                // 优先使用传递过来的pageNum
                if (this.pageNum !== 0) {
                    return this.pageNum;
                }
                // 如果传递过来的是count, 那么需要计算出对应的totalPages
                return getTotalPages(this.pageSize, this.count);
            },
            startIndex() {
                return Math.min(this.count, (this.currentPageNo - 1) * this.pageSize + 1);
            },
            endIndex() {
                return Math.min(this.count, this.currentPageNo * this.pageSize);
            }
        },
        methods: {
            selectPage(num) {
                if (this.currentPageNo != num && num > 0 && num <= this.totalPages) {
                    this.currentPageNo = num;
                    this.onPageChange(num);
                }
            }
        }
    };

    function getTotalPages(pageSize, count) {
        var totalPages = pageSize < 1 ? 1 : Math.ceil(count / pageSize);
        return Math.max(totalPages || 0, 1);
    }

    // Create page object used in template
    function makePage(number, text, isActive) {
        return {
            number: number,
            text: text,
            disabled: number === -1
        };
    }

    /**
     * Calculate start and end point of pagination links depending on
     * currentPage and num_display_entries.
     * @return {Array}
     */
    function getInterval(currentPage, pageCount, num_display_entries) {
        //var num_display_entries = 6;
        var ne_half = Math.ceil(num_display_entries / 2);
        var np = pageCount;
        var upper_limit = np - num_display_entries;
        var start = currentPage > ne_half ? Math.max(Math.min(currentPage - ne_half, upper_limit), 0) : 0;
        var end = currentPage > ne_half ? Math.min(currentPage + ne_half, np) : Math.min(num_display_entries, np);
        return [start, end];
    }

    function getPages(currentPage, totalPages, num_edge_entries, num_display_entries) {
        var ret = [];
        //var num_edge_entries = 2;
        var skip_text = '...';
        var np = totalPages;
        var interval = getInterval(currentPage - 1, totalPages, num_display_entries);

        // Generate starting points
        if (interval[0] > 0 && num_edge_entries > 0) {
            var end = Math.min(num_edge_entries, interval[0]);
            for (var i = 0; i < end; i++) {
                var page = makePage(i + 1, i + 1);
                ret.push(page);
            }
            if (num_edge_entries < interval[0]) {
                var page = makePage(-1, skip_text);
                ret.push(page);
            }
        }
        // Generate interval links
        for (var i = interval[0]; i < interval[1]; i++) {
            var page = makePage(i + 1, i + 1);
            ret.push(page);
        }
        // Generate ending points
        if (interval[1] < np && num_edge_entries > 0) {
            if (np - num_edge_entries > interval[1]) {
                var page = makePage(-1, skip_text);
                ret.push(page);
            }
            var begin = Math.max(np - num_edge_entries, interval[1]);
            for (var i = begin; i < np; i++) {
                var page = makePage(i + 1, i + 1);
                ret.push(page);
            }
        }

        return ret;
    }

</script>

<style lang="sass" rel="stylesheet/scss">
    .comp-pager {
        margin-top: 20px;
        height: 22px;
        text-align: right;
        .pagination {
            display: inline-block;
            overflow: hidden;
            >li.item {
                position: relative;
                float: left;
                margin-left: 7px;
                padding: 8px;
                line-height: 12px;
                border: 1px solid #d2d2d2;
                background: transparent;
                >a.item-link {
                    color: #000;
                    transition: color 0s;
                    font-size: 12px;
                    &:hover {
                        text-decoration: none;
                        color: #333;
                    }
                }
                &.active {
                    z-index: 1;
                    pointer-events: none;
                    background: #e6e6e6;
                    >a.item-link {
                        color: #333;
                        &:hover {
                            cursor: not-allowed;
                        }
                    }
                }
                &:hover{
                    cursor: pointer;
                    background: #efefef;
                    >a.item-link{
                        color: #333;
                    }
                }
                &.disabled {
                    margin-left: 0;
                    border: none;
                    &+li{
                        margin-left: 0;
                    }
                    &:hover{
                        background: transparent;
                        cursor: default;
                        >a.item-link{
                            cursor: default;
                        }
                    }
                }
            }
        }
    }

</style>