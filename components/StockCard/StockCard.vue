<template>
    <div class="stock_card">
        <p class="stock_sort">{{cradData.label}}</p>
        <div class="stock_name">
            <div class="div">
                <span class='name'>{{cradData.quotesDataJson.name}}</span>
                <span class='code'> ({{cradData.quotesDataJson.code}})</span>
            </div>
            <div class="div" :class="{'green':cradData.quotesDataJson.changepercent<0,'red':cradData.quotesDataJson.changepercent>0}">{{cradData.quotesDataJson.trade}}</div>
            <div class="div" :class="{'green':cradData.quotesDataJson.changepercent<0,'red':cradData.quotesDataJson.changepercent>0}">{{cradData.quotesDataJson.changepercent}}%</div>
        </div>
        <div class="attribute clearfix">
            <div class="title">
                概念:
            </div>
            <div class="content">{{cradData.notion}}</div>
        </div>
        <div class="attribute clearfix">
            <div class="title">
                连板可能性:
            </div>
            <div class="content star_box">
                <star :starNum="~~cradData.importance"/>
            </div>
        </div>
        <div class="logic" style=" -webkit-box-orient: vertical;">
                <span class='title'>{{cradData.detailList[0].title}}:</span>
                <span class='content'> {{cradData.detailList[0].content}}</span>
        </div>
    </div>
</template>

<script>
import Star from '~/components/Star'
export default {
    name: 'StockCard',
    components:{
        Star
    },
    props:{
        cradData:Object
    },
    data: function() {
        return {}
    },
    methods: {}
}
</script>

<style src="./StockCard.less" lang="less" scoped></style>
