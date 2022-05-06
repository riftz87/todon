<template>
    <div class="w-full md:w-2/3 p-5 flex flex-col">
        <div class="p-5">
            <Label text="Title" class="text-2xl" />
            <InputText type="text" class="w-full p-inputtext-lg" />
        </div>
        <div class="flex-grow overflow-hidden p-5 flex flex-col">
            <Label text="TODO List" class="text-2xl" />
            <div class="py-3">
                <Button label="Add" icon="pi pi-plus" @click="handleAddTodoItem" />
            </div>
            <div class="flex-grow">
                <ul>
                    <li v-for="(item, index) in items" :key="index">
                        <TodoItem :item="item" @remove="handleRemoveTodoItem(index)" />
                    </li>
                </ul>
            </div>
        </div>
        <div class="text-right p-5">
            <Button label="Discard" icon="pi pi-trash" class="p-button-text p-button-danger" />
            <Button label="Save" icon="pi pi-save" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: []
        };
    },
    methods: {
        handleAddTodoItem() {
            const e = this;
            const { items } = e;
            const nItems = [...items];
            nItems.push({text: '', checked: false, edit: true});
            e.items = nItems;
        },
        handleRemoveTodoItem(index) {
            const e = this;
            e.items.splice(index, 1);
        }
    }
}
</script>