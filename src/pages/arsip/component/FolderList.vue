<template>
    <div :key="id" :class="`structur-box ${isActive} ml-${level}`">
        <div class="structur__title">
            <div class="structur__title-text">
                <router-link :to="'/arsip/files/' + id">
                    {{ title }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, watch, ref } from 'vue';

const isActive = ref('');

const props = defineProps({
    id: Number,
    level: Number,
    title: String,
    activeFolder: Number,
});

watch(() => props.activeFolder, (newValue) => {
    if (newValue == props.id) {
        isActive.value = "folder-active";
    } else {
        isActive.value = "";
    }
});
</script>