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
        <div>
            <Toast position="center" group="bc">
                <template #message="slotProps">
                    <div class="flex flex-col w-full">
                        <div class="flex">
                            <div class="p-5">
                                <i :class="slotProps.message.mode == 'probe' ? 'pi pi-exclamation-triangle' : 'pi pi-check-circle'" style="font-size: 3rem"></i>
                            </div>
                            <div class="flex-grow flex flex-col justify-center px-3 py-5">
                                <h4>{{ slotProps.message.summary }}</h4>
                                <p>{{ slotProps.message.detail }}</p>
                            </div>
                        </div>
                        <div v-if="slotProps.message.mode == 'probe'" class="text-right pt-5">
                            <Button class="p-button-success" label="Yes" @click="onConfirmDiscard"></Button>
                            <Button class="p-button-secondary" label="No" @click="onRejectDiscard"></Button>
                        </div>
                        <div v-else class="text-right pt-5">
                            <Button class="p-button-success" label="OK" @click="onConfirm(slotProps)"></Button>
                        </div>
                    </div>
                </template>
            </Toast>
        </div>
    </div>
</template>

<script>
import clonedeep from 'lodash/cloneDeep';

export default {
    data() {
        return {
            success: false,
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
            e.$toast.add({mode: 'probe', severity: 'warn', summary: 'Are you sure you want to discard this list?', detail: 'Proceed to confirm', group: 'bc', styleClass: '!border-none', contentStyleClass: '!border-none'});
        },
        onConfirmDiscard() {
            const e = this;
            const { item } = e;
            e.$emit('discard', item);
        },
        onRejectDiscard() {
            const e = this;
            e.$toast.removeGroup('bc');
        },
        onConfirm(props) {
            const e = this;
            e.$toast.removeGroup('bc');
        },
        handleSave() {
            const e = this;
            const { item } = e;
            e.$emit('save', item);
            e.$toast.add({mode: 'prompt', severity: 'success', summary: 'TODO list has been saved.', detail: '', group: 'bc', styleClass: '!border-none', contentStyleClass: '!border-none'});
        }
    }
}
</script>