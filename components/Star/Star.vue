<template>
    <div class="star">
       <i v-for="i in 5" :class="{'star_red':i<=starNum}" class="star_item"></i>
    </div>
</template>

<script>
export default {
    name: 'Star',
    props:{
        starNum:Number
    },
    data: function() {
        return {}
    },
    methods: {}
}
</script>

<style src="./Star.less" lang="less" scoped></style>
