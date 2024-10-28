<template>
    <div class="files">
        <div class="files__header">
            <div class="files__header__title">
                {{ activeFileName }}
            </div>
            <div class="files__header__action">

                <div v-if="fileSelected.length > 0" class="files__header__action-item">
                    <button @click="deleteFiles()" type="button" class="btn btn-danger btn-sm">
                        Hapus
                    </button>
                </div>

                <div class="files__header__action-item">
                    <router-link :to="`/arsip/files/${props.folderId}/create_file`" class="btn btn-primary btn-sm">
                        Tambah File
                    </router-link>
                </div>

                <div class="files__header__action-item">
                    <router-link :to="`/arsip/files/${props.folderId}/create_folder`" class="btn btn-primary btn-sm">
                        Tambah Folder
                    </router-link>
                </div>
            </div>
        </div>
        <div v-if="loadingFiles">
            <div>
                Memuat ...
            </div>
        </div>
        <div v-else-if="!loadingFiles && files.length > 0" class="files__body">
            <div class="files__body__list">
                <div v-for="file in files" :key="file.key" class="files__body__item">
                    <div class="files__body__icon">
                        <div>
                            <input type="checkbox" v-model="fileSelected" :value="file.id" class="form-check-input">
                        </div>

                        <span v-if="file.tipe === 1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"
                                class="icon icon-tabler icons-tabler-outline icon-tabler-folder">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path
                                    d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />
                            </svg>
                        </span>
                        <span v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pdf">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M10 8v8h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-2z" />
                                <path d="M3 12h2a2 2 0 1 0 0 -4h-2v8" />
                                <path d="M17 12h3" />
                                <path d="M21 8h-4v8" />
                            </svg>
                        </span>
                    </div>
                    <template v-if="file.tipe === 1">
                        <router-link class="nav-link" :to="'/arsip/files/' + file.id">
                            {{ file.name_display }}
                        </router-link>
                    </template>
                    <template v-else>
                        <a :href="file.url" target="_blank">
                            {{ file.name_display }}
                        </a>
                    </template>
                </div>
            </div>
        </div>
        <div v-else>
            <div>Tidak ada data.</div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, onMounted, watch, ref } from 'vue'
import { useStore } from 'vuex';
import { apiListFile, apiDeleteFile } from '../../hooks/api_file';

const props = defineProps(['folderId']);
const store = useStore();
const files = ref([]);
const fileSelected = ref([]);
const loadingFiles = ref(false);
const activeFileName = ref('');

watch(() => props.folderId, async (newValue) => {
    activeFileName.value = store.getters['folder/activeNameFolder'];
    await loadListFiles(newValue);
});

onMounted(async () => {
    activeFileName.value = store.getters['folder/activeNameFolder'];
    await loadListFiles(props.folderId);
})

async function loadListFiles(parrent) {
    loadingFiles.value = true;
    try {
        const token = store.getters.getToken;
        const result = await apiListFile(token, parrent);

        if (result.success !== true) {
            throw new Error(result.message);
        }

        files.value = [];
        result.data.forEach(data => {
            files.value.push({
                'id': data.id,
                'tipe': data.tipe,
                'name_display': data.name_display,
                'name_origin': data.name_origin,
                'extension': data.extension,
                'key': Math.floor(Math.random() * 100000),
                'url': data.url,
            });
        });
        loadingFiles.value = false;
    } catch (error) {
        loadingFiles.value = false;
        alert(error.message);
    }

}


async function deleteFiles() {
    try {
        if (!confirm('Yakin hapus?')) {
            return;
        }
        const token = store.getters.getToken;
        const parrent = props.folderId;
        if (fileSelected.value.length > 0) {
            for await (const id of fileSelected.value) {
                await apiDeleteFile(token, parrent, id);

                const index = files.value.findIndex(ex => ex.id === id);
                files.value.splice(index, 1);
            }
            fileSelected.value = [];

            const rand = Math.floor(Math.random() * 100000);
            store.dispatch('folder/changeFolderList', rand);
        }
    } catch (error) {
        alert(error.message)
    }
}

</script>


<style scoped>
.form-check-input {
    margin-right: 8px;
}
</style>