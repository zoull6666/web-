<template>
    <div class="banner" :style="{'background-image':`url(${bannerData.img})`}">
        <div class="text_box">
<<<<<<< HEAD
            <p>{{bannerData.text}}1111</p>
            <span :class='{"bg":bannerData.bgcolor}'>{{bannerData.title}}2222</span>
=======
            <p>{{bannerData.text}}888888</p>
            <span :class='{"bg":bannerData.bgcolor}'>{{bannerData.title}}</span>
>>>>>>> test1
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
