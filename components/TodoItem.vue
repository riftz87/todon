<template>
    <div>
        <div v-if="item.edit" class="flex items-center">
            <InputText ref="field" type="text" v-model="item.text" class="flex-grow" @keypress="handleInput" />
            <div class="px-2">
                <Button icon="pi pi-times" @click="handleCancelEdit" />
                <Button icon="pi pi-check" @click="handleConfirmEdit" />
            </div>
        </div>
        <div v-else class="flex items-center">
            <Button :icon="item.checked ? 'pi pi-check' : 'pi'" :class="['p-button-sm p-button-rounded', item.checked ? 'p-button-success' : 'p-button-outlined']" @click="item.checked = !item.checked" />
            <div class="flex-grow px-5 text-xl">{{ item.text }}</div>
            <Button icon="pi pi-trash" class="p-button-text p-button-danger" @click="handleRemove" />
            <Button icon="pi pi-pencil" class="p-button-text" @click="handleEdit" />
        </div>
    </div>
</template>

<script>
export default {
    props: ['item'],
    data() {
        const e = this;
        return {
            bText: null
        }
    },
    mounted() {
        const e = this;
        const { $refs, item } = e;
        const { field } = $refs;

        if (item.edit) {
            field.$el.focus();
        }
    },
    methods: {
        handleEdit() {
            const e = this;
            const { item } = e;
            const { text } = item;
            e.bText = text;
            e.item.edit = true;
            setTimeout(() => {
                const { $refs } = e;
                const { field } = $refs;
                field.$el.focus();
            });
        },
        handleCancelEdit() {
            const e = this;
            const { bText } = e;
            e.item.text = bText;
            e.item.edit = false;
        },
        handleConfirmEdit() {
            const e = this;
            e.item.edit = false;
        },
        handleInput(ev) {
            const e = this;
            const { key } = ev;
            if (key == 'Enter') {
                e.item.edit = false;
            }
        },
        handleRemove() {
            const e = this;
            e.$emit('remove');
        }
    }
}
</script>