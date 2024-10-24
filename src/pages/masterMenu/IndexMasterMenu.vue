<template>
    <div>
        <div class="page-wrapper">
            <!-- Page header -->
            <div class="page-header d-print-none">
                <div class="container-xl">
                    <div class="row g-2 align-items-center">
                        <div class="col">
                            <h2 class="page-title">
                                Master Menu
                            </h2>
                        </div>

                        <div class="col-auto ms-auto d-print-none">
                            <div class="btn-list">
                                <button @click="onAddClicked" type="button"
                                    class="btn btn-primary d-none d-sm-inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="icon">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 5l0 14" />
                                        <path d="M5 12l14 0" />
                                    </svg>
                                    Tambah Menu
                                </button>
                                <button @click="onAddClicked" type="button" class="btn btn-primary d-sm-none btn-icon ">
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
                                    <button @click="deleteMenus" type="button"
                                        class="tools__item__button tools__danger btn-sm"
                                        :disabled="checkedMenus.length === 0">
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
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="card">
                            <table class="table table-hover table-striped"
                                style="margin-bottom: 0; white-space: nowrap;">
                                <thead>
                                    <tr>
                                        <th style="width: 30px"></th>
                                        <th>Menu</th>
                                        <th>Link</th>
                                        <th>Urutan</th>
                                    </tr>
                                </thead>
                                <tbody v-if="loadingMenu">
                                    <tr>
                                        <td class="text-center" colspan="30">
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
                                            Memuat ...
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else-if="!loadingMenu && menus.length > 0">
                                    <template v-for="(menu) in menus" :key="menu.id">
                                        <tr>
                                            <td>
                                                <input type="checkbox" class="form-check-input" v-model="checkedMenus"
                                                    :value="menu.id">
                                            </td>
                                            <td class="cursor__click" @click="onEditClicked(menu.id)"><b>{{ menu.menu
                                                    }}</b></td>
                                            <td>{{ menu.link }}</td>
                                            <td>{{ menu.urutan }}</td>
                                        </tr>
                                        <template v-if="menu.childs.length > 0">
                                            <template v-for="child1 in menu.childs" :key="child1.id">
                                                <tr>
                                                    <td>
                                                        <input type="checkbox" class="form-check-input"
                                                            v-model="checkedMenus" :value="child1.id">
                                                    </td>
                                                    <td class="cursor__click" @click="onEditClicked(child1.id)"> --
                                                        <b>{{ child1.menu }}</b>
                                                    </td>
                                                    <td>{{ child1.link }}</td>
                                                    <td>{{ child1.urutan }}</td>
                                                </tr>

                                                <template v-if="child1.childs.length > 0">
                                                    <template v-for="child2 in child1.childs" :key="child2.id">
                                                        <tr>
                                                            <td>
                                                                <input type="checkbox" class="form-check-input"
                                                                    v-model="checkedMenus" :value="child2.id">
                                                            </td>
                                                            <td class="cursor__click" @click="onEditClicked(child2.id)">
                                                                -- -- <b>
                                                                    {{ child2.menu }}
                                                                </b>
                                                            </td>
                                                            <td>{{ child2.link }}</td>
                                                            <td>{{ child2.urutan }}</td>
                                                        </tr>
                                                    </template>
                                                </template>

                                            </template>
                                        </template>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal modal-blur fade" id="modal-menu" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">

            <button id="open-modal" data-bs-toggle="modal" data-bs-target="#modal-menu" style="display: none"></button>
            <button id="close-modal" data-bs-dismiss="modal" aria-label="Close" style="display: none"></button>
            <form-menu @submit="onSubmited"></form-menu>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex"
import { useRouter } from 'vue-router';
import { apiGetListAllMenu, apiGetMenus, apiDeleteMenu } from '../../hooks/api_master_menu';

import Swal from 'sweetalert2/dist/sweetalert2';
import FormMenu from "./FormMenu.vue"

const router = useRouter();
const store = useStore();
const loadingMenu = ref(false);
const loadingDelete = ref(false);
const checkedMenus = ref([]);

const menus = computed(function () {
    return store.getters['menus/getListMenu'];
});


onMounted(async () => {
    await getListAllMenu();
    await getListMenuForForm();
});


async function getListAllMenu() {
    loadingMenu.value = true;
    try {
        const token = store.getters.getToken;
        const result = await apiGetListAllMenu(token);

        if (result.success !== true) {
            throw new Error(result.message);
        }

        store.dispatch('menus/resetListMenus');
        result.data.menus.forEach(menu => {
            const newMenu = {
                id: menu.id,
                id_parrent: menu.id_parrent,
                menu: menu.menu,
                link: menu.link,
                urutan: menu.urutan,
                childs: menu.childs,
            }
            store.dispatch('menus/addMenu', newMenu);
        });
        loadingMenu.value = false;
    } catch (error) {
        loadingMenu.value = false;
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

async function getListMenuForForm() {
    try {
        const token = store.getters.getToken;
        const result = await apiGetMenus(token);
        if (result.success !== true) {
            throw new Error(result.message);
        }
        store.dispatch('menus/resetMenusForForm');
        result.data.forEach(menu => {
            const newMenu = {
                id: menu.id,
                menu: menu.menu,
            }
            store.dispatch('menus/addMenusForForm', newMenu);
        });
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

function onAddClicked() {
    store.dispatch('menus/setIdMenuShow', 0);
    document.getElementById('open-modal').click();
}

function onEditClicked(id) {
    store.dispatch('menus/setIdMenuShow', id);
    document.getElementById('open-modal').click();
}

async function onSubmited() {
    store.dispatch('menus/setIdMenuShow', "");
    document.getElementById('close-modal').click();
    await getListAllMenu();
}

async function deleteMenus() {
    if (!confirm('Anda yakin hapus?')) {
        return;
    }
    loadingDelete.value = true;
    try {
        const token = store.getters.getToken;
        const listIdMenu = checkedMenus.value;

        if (listIdMenu.length > 0) {
            for await (const id of listIdMenu) {
                const result = await apiDeleteMenu(token, id);
                if (result.success !== true) {
                    throw new Error(result.message)
                }
            }
            // Reset selected Api
            checkedMenus.value = [];
        }

        loadingDelete.value = false;
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,

            icon: 'success',
            title: 'Success',
            text: 'Hapus menu berhasil.',
        });
        await getListAllMenu();

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