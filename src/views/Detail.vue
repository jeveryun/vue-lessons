<template>
    <div>{{id}}</div>
</template>

<script>
    export default {
        name: "list",
        props: {
            id: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>

</style>
