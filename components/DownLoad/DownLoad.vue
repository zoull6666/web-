<template>
    <div v-if='isShow' @click.stop='outHide' class="down_load">
        <div class='code_box'>
            <div class='text_box'>
                <p>大牛市</p>
                <div>股票高手   交易牛人</div>
            </div>
            <div class="code">
                <div class='qr_code'></div>
                <div class='footer_pad'></div>
            </div>
            <div class='app_text'>
                【扫码下载APP，了解更多】
            </div>
            <i @click='hide' class='close'></i>
        </div>
    </div>

</template>

<script>
export default {
    name: 'DownLoad',
    props:{
        clickOut:{ //是否可以点击蒙层关闭
            default: false
        }
    },
    data: function() {
        return {
            isShow: false
        }
    },
    created(){
    },
    methods: {
        open(){
            this.isShow = true
            this.$emit('open',true)
        },
        hide(){
            this.isShow = false
            this.$emit('close',false)
        },
        outHide(){
            if(this.clickOut){
                this.hide()
            }
        }
    }
}
</script>

<style src="./DownLoad.less" lang="less" scoped></style>
