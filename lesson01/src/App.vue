<template>
    <div id="app">
<!--        <Communicate />-->
        <Slots />
    </div>
</template>
<script>
    import Communicate from './components/communicate'
    import Slots from './components/slots'
    export default {
        name: 'app',
        components: {
            Communicate,
            Slots
        }
    }
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
