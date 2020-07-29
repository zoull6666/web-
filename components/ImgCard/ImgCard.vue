<template>
    <div  class="img_card" :style='{"background-image": `url(${cardData.img || eventDriveUrl})`}'>
    <!--<div class="img_card">-->
        <!--<img :src="cardData.img"/>-->
        <p>{{cardData.title}}</p>
        <div class='star_box'>
            <span>重要性:</span>
            <div class='star'>
                <star :starNum='cardData.starNum'/>
            </div>
        </div>
        <div class="mask"></div>
    </div>
</template>

<script>
import Star from '~/components/Star'
export default {
    components:{
        Star
    },
    props:{
        cardData:Object
    },
    name: 'ImgCard',
    data: function() {
        return {
            eventDriveUrl: '../../static/img/eventDrive.png',
            todayHotspotUrl: '../../static/img/todayHotspot.png',
            priceDriveUrl: '../../static/img/priceDrive.png',
            industryChangeUrl: '../../static/img/industryChange.png',
            trendKingUrl: '../../static/img/trendKing.png'
        }
    },
    created(){
    },
    methods: {}
}
</script>

<style src="./ImgCard.less" lang="less" scoped></style>
