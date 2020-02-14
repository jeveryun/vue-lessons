<template>
    <div>
        <div>冲啊，手榴弹来了，{{$store.state.count}}</div>
        <p>{{$store.getters.score}}</p>
        <button @click="add">+1</button>
        <button @click="addAsync">+2</button>
    </div>
</template>

<script>
    export default {
        name: "index",
        methods: {
            add(){
                this.$store.commit("increment")
            },
            addAsync(){
                this.$store.dispatch('incrementAsync')
            }
        }
    }
</script>

<style scoped>

</style>
