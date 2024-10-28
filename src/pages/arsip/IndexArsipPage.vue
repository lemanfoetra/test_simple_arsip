<template>
    <div>
        <div class="page-wrapper">
            <!-- Page header -->
            <div class="page-header d-print-none">
                <div class="container-xl">
                    <div class="row g-2 align-items-center">
                        <div class="col">
                            <h2 class="page-title">
                                Arsip File
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body">
            <div class="container-xl">
                <div class="row">
                    <div class="col-md-3">
                        <div class="structur">
                            <div class="structur-list">
                                <div class="structur-box">
                                    <div class="structur__title">
                                        <div class="structur__title-text">
                                            <router-link class="nav-link" :to="'/arsip/files/0'">
                                                Arsip File
                                                <span v-if="loadingFolder" class="loading-file">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M12 6l0 -3" />
                                                        <path d="M16.25 7.75l2.15 -2.15" />
                                                        <path d="M18 12l3 0" />
                                                        <path d="M16.25 16.25l2.15 2.15" />
                                                        <path d="M12 18l0 3" />
                                                        <path d="M7.75 16.25l-2.15 2.15" />
                                                        <path d="M6 12l-3 0" />
                                                        <path d="M7.75 7.75l-2.15 -2.15" />
                                                    </svg>
                                                </span>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <folder-list v-for="folder in folders" :key="folder.id" :id="folder.id"
                                        :level="folder.level" :title="folder.name_display"
                                        :active-folder="activeFolderId"></folder-list>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-9">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>

import { watch, onMounted, ref, defineProps } from 'vue';
import { useStore } from 'vuex';
import { apiListFolder } from '../../hooks/api_folder';
import FolderList from './component/FolderList.vue';


const store = useStore();
const folders = ref([]);
const props = defineProps(['folderId']);
const loadingFolder = ref(false);
const activeFolderId = ref(null);

watch(() => props.folderId, (newValue) => {
    activeFolderId.value = Number(newValue);
    setNameFolderActive();
});

// LOAD KETIA ADA PERUBAHAN LIST FOLDER
watch(() => store.getters['folder/changeFolderList'], async () => {
    await loadListFolder(0);
});

onMounted(async () => {
    await loadListFolder(0);
    setNameFolderActive();
})


async function loadListFolder(parrent) {
    loadingFolder.value = true;
    try {
        const token = store.getters.getToken;
        const result = await apiListFolder(token, parrent);

        if (result.success !== true) {
            throw new Error(result.message);
        }
        folders.value = [];
        result.data.forEach(data => {
            folders.value.push(
                {
                    'id': data.id,
                    "id_arsips": data.id_arsips,
                    "level": data.level,
                    'name_display': data.name_display,
                    'tipe': data.tipe,
                }
            );
        });
        loadingFolder.value = false;
    } catch (error) {
        loadingFolder.value = false;
        alert(error.message);
    }
}

function setNameFolderActive() {
    let nameFolderActive = 'Arsip File';
    if (Number(props.folderId) > 0) {
        const index = folders.value.findIndex(ex => ex.id === Number(props.folderId));
        const result = folders.value[index];
        nameFolderActive = result.name_display;
    }
    store.dispatch('folder/activeNameFolder', nameFolderActive);
}

</script>

<style scoped>
.loading-file {
    margin-left: 10px
}
</style>