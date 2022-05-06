<template>
    <div class="w-full md:w-2/3 p-5 flex flex-col overflow-hidden">
        <div class="p-5">
            <Label text="Title" class="text-2xl" />
            <InputText type="text" v-model="item.title" class="w-full p-inputtext-lg" />
        </div>
        <div class="flex-grow overflow-hidden p-3 flex flex-col">
            <div class="p-2">
                <Label text="TODO List" class="text-2xl" />
                <div class="mt-2">
                    <Button label="Add" icon="pi pi-plus" @click="handleAddTodoItem" />
                </div>
            </div>
            <div class="flex-grow overflow-auto p-2">
                <ul>
                    <li v-for="(item, index) in item.items" :key="index" class="py-1">
                        <TodoItem :item="item" @remove="handleRemoveTodoItem(index)" />
                    </li>
                </ul>
            </div>
        </div>
        <div class="text-right p-5">
            <Button label="Discard" icon="pi pi-trash" class="p-button-text p-button-danger" @click="handleDiscard" />
            <Button label="Save" icon="pi pi-save" @click="handleSave" />
        </div>
    </div>
</template>

<script>
import clonedeep from 'lodash/cloneDeep';

export default {
    data() {
        return {
            item: {
                key: Math.random().toString(36).substring(2, 7),
                title: null,
                items: [],
                stamp: new Date()
            }
        };
    },
    watch: {
        '$store.getters.activeTodo'(nValue, oValue) {
            const e = this;
            const { $store } = e;
            const { activeTodo } = $store.getters;
            if (activeTodo) {
                e.item = clonedeep(activeTodo);
            }
        }
    },
    mounted() {
        const e = this;
        const { $store } = e;
        const { activeTodo } = $store.getters;
        if (activeTodo) {
            e.item = clonedeep(activeTodo);
        }
    },
    methods: {
        handleAddTodoItem() {
            const e = this;
            const { item } = e;
            item.items.push({text: '', checked: false, edit: true});
        },
        handleRemoveTodoItem(index) {
            const e = this;
            e.item.items.splice(index, 1);
        },
        handleDiscard() {
            const e = this;
            const { item } = e;
            e.$emit('discard', item);
        },
        handleSave() {
            const e = this;
            const { item } = e;
            e.$emit('save', item);
        }
    }
}
</script>