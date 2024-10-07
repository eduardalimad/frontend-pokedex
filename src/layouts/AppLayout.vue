<template>
    <div class="app-layout">
        <NavbarDefault />
        <main>
            <slot />
        </main>
    </div>
</template>

<script lang="ts" setup>
import NavbarDefault from '@/components/NavbarDefault.vue';

</script>

<style scoped lang="scss">


</style>
