<template>
    <div class="banner" :style="{'background-image':`url(${bannerData.img})`}">
        <p>aassa</p>
        <div class="text_box">
           <p>{{bannerData.text}}1111333</p>
            <span :class='{"bg":bannerData.bgcolor}'>{{bannerData.title}}2222</span>
        </div>
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
