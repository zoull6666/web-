<template>
    <div class="banner" :style="{'background-image':`url(${bannerData.img})`}">
        <p>aassa</p>
        <div class="text_box">
            <p>{{bannerData.text}}adsadaasdass</p>
            <span :class='{"bg":bannerData.bgcolor}'>{{bannerData.title}}</span>
        </div>
        <p>asdasd</p>
        <slot name='label'></slot>
    </div>
</template>

<script>
export default {
    name: 'banner',
    props:{
        bannerData:Object
    },
    data: function() {
        return {}
    },
    methods: {}
}
</script>

<style src="./Banner.less" lang="less" scoped></style>
