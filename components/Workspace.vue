<template>
    <div class="flex-grow flex overflow-hidden">
        <Directory :items="items" @create="handleCreate" @item-click="handleItemClick" />
        <Form v-if="showForm" @discard="handleDiscard" @save="handleSave" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [],
            showForm: false
        }
    },
    methods: {
        handleCreate() {
            const e = this;
            const { $store } = e;
            e.showForm = false;
            $store.dispatch('setActiveTodo', null).then(() => {
                e.showForm = true;
            });
        },
        handleItemClick() {
            const e = this;
            e.showForm = true;
        },
        handleDiscard(item) {
            const e = this;
            const { $store, items } = e;
            const { activeTodo } = $store.getters;
            const nItems = [...items];

            if (activeTodo) {
                for (let i = 0; i < items.length; i++) {
                    const { key } = items[i];
                    if (key == item.key) {
                        nItems.splice(i, 1);
                        $store.dispatch('setActiveTodo', null);
                        e.showForm = false;
                        break;
                    }
                }
                e.items = nItems;
            }
        },
        handleSave(item) {
            const e = this;
            const { $store, items } = e;
            const { activeTodo } = $store.getters;
            const nItems = [...items];

            if (activeTodo) {
                for (let i = 0; i < items.length; i++) {
                    const { key } = items[i];
                    if (key == item.key) {
                        nItems[i] = item;
                        break;
                    }
                }
            }
            else {    
                nItems.push(item);
                $store.dispatch('setActiveTodo', item);
            }
            e.items = nItems;
        }
    }
}
</script>