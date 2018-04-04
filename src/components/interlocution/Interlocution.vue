<template>
    <section class="interlocution mainSection">
        <transition name="scale-fade">
            <Tips :content="tips.data" v-show="show.tips" @closeTips="closeTips" @click.native="closeBattle"></Tips>
        </transition>
    </section>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../style/style";
</style>
<script>
    import Tips from '../tips/Tips';

    export default {
        name: 'Interlocution',
        data() {
            return {

            }
        },
        prop: [
            'question'
        ],
        components: {
            Tips
        },
    };
</script>