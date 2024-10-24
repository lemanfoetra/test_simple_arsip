<template>
    <div>
        <div class="page-wrapper">
            <!-- Page header -->
            <div class="page-header d-print-none">
                <div class="container-xl">
                    <div class="row g-2 align-items-center">
                        <div class="col">
                            <h2 class="page-title">
                                Master Api
                            </h2>
                        </div>

                        <div class="col-auto ms-auto d-print-none">
                            <div class="btn-list">
                                <button type="button" @click="onAddClicked"
                                    class="btn btn-primary d-none d-sm-inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="icon">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 5l0 14" />
                                        <path d="M5 12l14 0" />
                                    </svg>
                                    Add Api
                                </button>
                                <button type="button" @click="onAddClicked" class="btn btn-primary d-sm-none btn-icon ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="icon">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 5l0 14" />
                                        <path d="M5 12l14 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body">
            <div class="container-xl">
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <div class="card card-tool">
                            <div class="tools">
                                <div class="tools__item">
                                    <select @change="loadFirstOrOnEvent" class="filter__item__input" v-model="showItem"
                                        style="width: 70px;">
                                        <option value="1">1</option>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>
                                <div class="tools__item">
                                    <select v-model="searchByMenu" @change="loadFirstOrOnEvent"
                                        class="filter__item__input">
                                        <option v-if="loadingListMenu" value="">Memuat...</option>
                                        <option v-else value="">Pilih Menu</option>
                                        <option v-for="menu in listMenu" :value="menu.id" :key="menu.key">
                                            {{ menu.menu }}
                                        </option>
                                    </select>
                                </div>
                                <div class="tools__item">
                                    <button @click="deleteApis" type="button"
                                        class="tools__item__button tools__danger btn-sm"
                                        :disabled="checkedApis.length === 0">
                                        <span v-if="!loadingDelete">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                class="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M4 7l16 0" />
                                                <path d="M10 11l0 6" />
                                                <path d="M14 11l0 6" />
                                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                            </svg>
                                        </span>
                                        <span v-else>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
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
                                    </button>
                                </div>
                                <div class="tools__item__right">
                                    <input class="filter__item__input" v-model="searchItem"
                                        placeholder="Masukan kata kunci ....">
                                    <button @click="loadFirstOrOnEvent" ype="button"
                                        class="tools__item__button tools__primary">Cari</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="card">
                            <div class="table-responsive">
                                <table class="table table-hover table-striped"
                                    style="margin-bottom: 0; white-space: nowrap;">
                                    <thead>
                                        <tr>
                                            <th style="width: 30px"></th>
                                            <th style="width: 30px"></th>
                                            <th>Menu</th>
                                            <th>Name</th>
                                            <th>Method</th>
                                            <th>Key</th>
                                            <th>Url</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="loadingTable">
                                        <tr>
                                            <td class="text-center" colspan="30">
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
                                                Memuat ...
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-if="!loadingTable">
                                        <tr v-if="listApi.length === 0">
                                            <td colspan="20">Belum ada data</td>
                                        </tr>
                                        <tr v-for="(api, index) in listApi" :key="api.key">
                                            <td>
                                                <input type="checkbox" class="form-check-input" v-model="checkedApis"
                                                    :value="api.id" :key="api.key">
                                            </td>
                                            <td>{{ (index + 1) }}</td>
                                            <td class="cursor__click" @click="onEditClicked(api.id)">{{ (api.menu ||
                                    '-') }}</td>
                                            <td class="cursor__click" @click="onEditClicked(api.id)"><b>{{ api.name
                                                    }}</b></td>
                                            <td>{{ api.method }}</td>
                                            <td>{{ api.keyApi }}</td>
                                            <td>{{ api.url }}</td>
                                        </tr>
                                        <tr v-if="totalInServer > totalInShowFromServer">
                                            <td class="text-center" colspan="100">
                                                <button @click="loadMore" type="button"
                                                    class="btn btn-outline-primary btn-pill btn-sm"
                                                    :disabled="loadingLoadMore">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="icon icon-tabler icons-tabler-outline icon-tabler-rotate-clockwise">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                                                    </svg>
                                                    Load more
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal modal-blur fade" id="modal-api" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <button id="open-modal" data-bs-toggle="modal" data-bs-target="#modal-api" style="display: none"></button>
            <button id="close-modal" data-bs-dismiss="modal" aria-label="Close" style="display: none"></button>
            <form-api @submit="onSubmited"></form-api>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { getListApi, deleteApi, menus } from '../../hooks/api_master_api';


import Swal from 'sweetalert2/dist/sweetalert2';

import FormApi from './FormApi.vue'

const store = useStore();
const router = useRouter();

/**
 * Data table property
 */
const loadingTable = ref(false);
const loadingDelete = ref(false);
const loadingLoadMore = ref(false);
const loadingListMenu = ref(false);
const showItem = ref(10);
const searchItem = ref('');
const searchByMenu = ref('');
const totalInServer = ref(0);
const totalInShowFromServer = ref(0);

const checkedApis = ref([]);

onMounted(async () => {
    await loadFirstOrOnEvent();
})

const listApi = computed(function () {
    const datas = store.getters['apis/getApis'];
    return datas;
});

const listMenu = computed(function () {
    return store.getters['apis/getListMenu'];
})

/**
 * Data table function
 */
async function loadFirstOrOnEvent() {
    loadingTable.value = true;
    await loadData();
    await loadListMenu();
    loadingTable.value = false;
}

/**
 * Data table function
 */
async function loadMore() {
    try {
        loadingLoadMore.value = true;
        const token = store.getters.getToken;
        const limit = showItem.value;
        const search = searchItem.value;
        const offset = totalInShowFromServer.value;
        const id_menus = searchByMenu.value;
        const result = await getListApi(token, limit, offset, search, id_menus);

        if (result.success === true) {
            result.data.forEach(api => {
                const newApi = {
                    id: api.id,
                    name: api.name,
                    menu: api.menu,
                    method: api.method,
                    keyApi: api.key,
                    url: api.url,
                    updatedAt: api.updated_at,
                }
                store.dispatch('apis/addApi', newApi);
                totalInShowFromServer.value++;
            });

            totalInServer.value = result.total;
        }
        loadingLoadMore.value = false;
    } catch (error) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,

            icon: 'warning',
            title: 'Warning',
            text: error.message,
        });
    }
}

/**
 * Data table function
 */
async function loadData() {
    try {
        const token = store.getters.getToken;
        const limit = showItem.value;
        const search = searchItem.value;
        const id_menus = searchByMenu.value;
        const result = await getListApi(token, limit, 0, search, id_menus);

        if (result.success === true) {
            store.dispatch('apis/resetApis');
            totalInShowFromServer.value = 0;
            result.data.forEach(api => {
                const newApi = {
                    id: api.id,
                    name: api.name,
                    menu: api.menu,
                    method: api.method,
                    keyApi: api.key,
                    url: api.url,
                    updatedAt: api.updated_at,
                }
                store.dispatch('apis/addApi', newApi);
                totalInShowFromServer.value++;
            });

            totalInServer.value = result.total;
        }
    } catch (error) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,

            icon: 'warning',
            title: 'Warning',
            text: error.message,
        });

        if (error.message === 'sesi telah login berakhir') {
            store.dispatch('logout');
            router.push('/login');
        }
    }
}


async function loadListMenu() {
    loadingListMenu.value = true;
    try {
        const token = store.getters.getToken;
        const result = await menus(token);
        if (result.success === true) {
            store.dispatch('apis/resetListMenu');
            result.data.forEach(menu => {
                const newMenu = {
                    id: menu.id,
                    IdParrent: menu.id_parrent,
                    menu: menu.menu,
                    link: menu.link,
                }
                store.dispatch('apis/addListMenu', newMenu);
            });
        }

        loadingListMenu.value = false;
    } catch (error) {
        loadingListMenu.value = false;
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,

            icon: 'warning',
            title: 'Warning',
            text: error.message,
        });
    }
}


function onAddClicked() {
    store.dispatch('apis/setIdApiShow', 0);
    document.getElementById('open-modal').click();
}

function onEditClicked(id) {
    store.dispatch('apis/setIdApiShow', id);
    document.getElementById('open-modal').click();
}

async function onSubmited() {
    store.dispatch('apis/setIdApiShow', "");
    document.getElementById('close-modal').click();
    await loadFirstOrOnEvent();
}

async function deleteApis() {
    if (!confirm('Anda yakin hapus?')) {
        return;
    }
    loadingDelete.value = true;
    try {
        const token = store.getters.getToken;
        const listIdApi = checkedApis.value;

        if (listIdApi.length > 0) {
            for await (const id of listIdApi) {
                const result = await deleteApi(token, id);
                if (result.success !== true) {
                    throw new Error(result.message)
                }
                store.dispatch('apis/deleteApi', id);
            }

            // Reset selected Api
            checkedApis.value = [];
        }

        loadingDelete.value = false;
        Swal.fire({
            icon: "success",
            text: "Hapus data berhasil.",
        });

    } catch (error) {
        loadingDelete.value = false;
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,

            icon: 'warning',
            title: 'Warning',
            text: error.message,
        });
    }
}

</script>