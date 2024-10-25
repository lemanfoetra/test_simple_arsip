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
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div v-for="folder in folders" :key="folder.id"
                                        :class="`structur-box ml-${folder.level}`">
                                        <div class="structur__title">
                                            <div class="structur__title-text">
                                                <router-link :to="'/arsip/files/' + folder.id">
                                                    {{ folder.name_display }}
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
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

import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { apiListFolder } from '../../hooks/api_folder';


const store = useStore();
const folders = ref([]);


onMounted(async () => {
    await loadListFolder(0);
})


async function loadListFolder(parrent) {
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

        console.log(folders.value);
    } catch (error) {
        console.log(error.message);
    }
}

</script>