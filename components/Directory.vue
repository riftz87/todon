<template>
    <div class="w-full md:w-1/3 p-5">
        <div class="flex justify-between py-3">
            <Button label="New" icon="pi pi-plus" />
            <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText type="text" placeholder="Search" />
            </span>
        </div>
        <ul>
            <li><DirectoryItem /></li>
            <li><DirectoryItem /></li>
            <li><DirectoryItem /></li>
        </ul>
    </div>
</template>