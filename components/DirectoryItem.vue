<template>
    <div class="flex items-center my-1 bg-blue-50 hover:bg-blue-100 cursor-pointer p-5 rounded-lg" @click="handleClick">
		<Icon icon="clipboard-list" class="text-3xl text-blue-500" />
        <div class="px-5 text-xl">
            <div>{{ item.title }}</div>
            <div class="text-xs opacity-75">{{ item.stamp }}</div>
        </div>
	</div>
</template>

<script>
export default {
    props: ['item'],
    methods: {
        handleClick() {
            const e = this;
            const { $store, item } = e;
            const sitem = {...item};
            $store.dispatch('setActiveTodo', sitem).then(() => {
                e.$emit('item-click', sitem);
            });
        }
    }
}
</script>