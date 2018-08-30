<template>
    <div class="flyCont" style="height: 380px;">
        <span class="fly" :style="{width:fly.w+'px', height:fly.w+'px', top: fly.posTop+'px', left:fly.posLeft+'px'}" v-for="fly in fireFlys"></span>
    </div>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                fireFlys:[],
                maxWidth: 1300, // 萤火虫可能出现的最右边位置
                maxHeight: 300 // 萤火虫可能出现的最下方位置
            };
        },
        props: {

        },
        created(){
            this.init();
        },
        mounted(){
        },
        methods: {
            init(){
                let fireFlyCount = 10;
                var flyArr = [];
                for(let i=0;i<fireFlyCount;i++){
                    flyArr.push(this.fetchFirefly());
                }
                this.fireFlys = flyArr;
                var that = this;
                flyArr.forEach(function(fly,index){
                    var directionx = Math.random()<0.5?1:-1;
                    var directiony = Math.random()<0.5?1:-1;
                    setInterval(function(){
                        fly.posLeft = parseInt(fly.posLeft)+directionx;
                        fly.posTop = parseInt(fly.posTop)+directiony;
                        if(parseInt(fly.posLeft)<0 || parseInt(fly.posLeft)>that.maxWidth){
                            directionx = -1*directionx;
                        }
                        if(parseInt(fly.posTop)<0 || parseInt(fly.posTop)>that.maxHeight){
                            directiony = -1*directiony;
                        }
                        this.fireFlys = flyArr;
                    },200)
                })
            },
            fetchFirefly(){
                var fly={};
                fly.posLeft = parseInt(Math.random()*this.maxWidth);
                fly.posTop = parseInt(Math.random()*this.maxHeight);
                fly.w = parseInt(Math.random()*6+2);
                return fly;
            }
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss">
    .flyCont{
        pointer-events: none;
        position: absolute;
        top: 0;
        width: 100%;
    }
    .fly{
        position: absolute;
        border: 1px solid #fff;
        border-radius: 50%;
        box-shadow: 0 0 8px rgba(255,255,255,.7);
        background-color: rgba(255,255,255,0.8);
    }
</style>