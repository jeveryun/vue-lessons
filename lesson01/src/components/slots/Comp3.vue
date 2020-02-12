<template>
    <div>
        <h3>
            作用域插槽
        </h3>
        <!--    通过绑定指定的作用域  -->
        <slot :foo="foo" :text="'123'"></slot>
    </div>
</template>

<script>
    export default {
        name: "Comp3",
        data() {
            return {
                foo: 'bar',
                text: 'test'
            }
        }
    }
</script>

<style scoped>

</style>
