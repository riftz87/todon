<template>
    <div class="flex items-center p-5 shadow">
        <Icon :icon="icon" class="text-3xl px-3" />
        <h1 class="text-3xl font-bold px-3">{{ title }}</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: 'Todon',
            icon: 'home'
        }
    }
}
</script>