<template>
    <div class="w-full md:w-1/3 p-5">
        <div class="flex justify-between py-3">
            <Button label="New" icon="pi pi-plus" @click="$emit('create')" />
            <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText type="text" placeholder="Search" />
            </span>
        </div>
        <ul>
            <li v-for="(item, index) in items" :key="index"><DirectoryItem :item="item" @item-click="handleItemClick" /></li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['items'],
    methods: {
        handleItemClick(item) {
            const e = this;
            e.$emit('item-click', item);
        }
    }
}
</script>