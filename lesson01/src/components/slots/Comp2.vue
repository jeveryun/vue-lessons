<template>
    <div>
        <h3>
            <slot></slot>
        </h3>
        <slot name="content"></slot>
    </div>
</template>

<script>
    export default {
        name: "Comp2"
    }
</script>

<style scoped>

</style>
