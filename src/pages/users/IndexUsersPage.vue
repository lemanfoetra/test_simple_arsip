<template>
    <div>
        <div class="page-wrapper">
            <!-- Page header -->
            <div class="page-header d-print-none">
                <div class="container-xl">
                    <div class="row g-2 align-items-center">
                        <div class="col">
                            <h2 class="page-title">
                                Management Users
                            </h2>
                        </div>

                        <div class="col-auto ms-auto d-print-none">
                            <div class="btn-list">
                                <button @click="onAddClicked" type="button"
                                    class="btn btn-primary d-none d-sm-inline-block" data-bs-toggle="modal"
                                    data-bs-target="#modal-user">
                                    <icon-add></icon-add>
                                    Add User
                                </button>
                                <button @click="onAddClicked" type="button" class="btn btn-primary d-sm-none btn-icon"
                                    data-bs-toggle="modal" data-bs-target="#modal-user" aria-label="Create new report">
                                    <icon-add></icon-add>
                                </button>
                                <button id="btn-" type="button" style="display: none;" data-bs-toggle="modal"
                                    data-bs-target="#modal-user"></button>
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
                            <div class="filter">
                                <div class="filter__item">
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
                                <div class="filter__item">
                                    <button @click="deleteMultipleUser" type="button"
                                        class="action-button-delete btn-sm" :disabled="checkedUser.length === 0">
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
                                <div class="filter__item_right">
                                    <input @change="loadFirstOrOnEvent" class="filter__item__input" v-model="searchItem"
                                        placeholder="Masukan kata kunci ....">
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
                                        <th style="width: 30px"></th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody v-if="loadingTable">
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
                                <tbody v-if="!loadingTable">
                                    <tr v-if="users.length === 0">
                                        <td colspan="20">Belum ada data</td>
                                    </tr>
                                    <tr v-for="(user, index) in users" :key="user.key">
                                        <td>
                                            <input type="checkbox" class="form-check-input" v-model="checkedUser"
                                                :value="user.id" :key="user.key">
                                        </td>
                                        <td class="cursor__click">{{ (index + 1) }}</td>
                                        <td class="cursor__click" @click="onEditClicked(user.id)">{{ user.name }}</td>
                                        <td class="cursor__click" @click="onEditClicked(user.id)">{{ user.email }}</td>
                                        <td class="cursor__click" @click="onEditClicked(user.id)">{{ user.role }}</td>
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

    <div class="modal modal-blur fade" id="modal-user" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <button id="open-modal" data-bs-toggle="modal" data-bs-target="#modal-user" style="display: none"></button>
            <button id="close-modal" data-bs-dismiss="modal" aria-label="Close" style="display: none"></button>

            <form-user @submit="onSubmited"></form-user>
        </div>
    </div>
</template>

<script setup>
import { ref, defineAsyncComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import { getListUser, deleteUser } from '../../hooks/api_users';
import Swal from 'sweetalert2/dist/sweetalert2';

const IconAdd = defineAsyncComponent(() => import('../../components/IconAdd.vue'))
const FormUser = defineAsyncComponent(() => import('./FormUser.vue'))

const store = useStore();
const router = useRouter();

/**
 * default = ''
 * add =  0
 * edit = [id user]
 */
const checkedUser = ref([]);

/**
 * Data table property
 */
const loadingTable = ref(false);
const loadingDelete = ref(false);
const loadingLoadMore = ref(false);
const showItem = ref(5);
const searchItem = ref('');
const totalInServer = ref(0);
const totalInShowFromServer = ref(0);

onMounted(async () => {
    await loadFirstOrOnEvent();
})

const users = computed(function () {
    const datas = store.getters['users/getUsers'];
    return datas;
});

/**
 * Data table function
 */
async function loadFirstOrOnEvent() {
    loadingTable.value = true;
    await loadData();
    loadingTable.value = false;
}

/**
 * Data table function
 */
async function loadMore() {
    loadingLoadMore.value = true;
    const token = store.getters.getToken;
    const limit = showItem.value;
    const search = searchItem.value;
    const offset = totalInShowFromServer.value;
    const result = await getListUser(token, limit, offset, search);

    if (result.success === true) {
        result.data.forEach(user => {
            store.dispatch('users/addUser', user);
            totalInShowFromServer.value++;
        });

        totalInServer.value = result.total;
    }
    loadingLoadMore.value = false;
}

/**
 * Data table function
 */
async function loadData() {
    try {
        const token = store.getters.getToken;
        const limit = showItem.value;
        const search = searchItem.value;
        const result = await getListUser(token, limit, 0, search);


        if (result.success === true) {
            store.dispatch('users/resetUser');
            totalInShowFromServer.value = 0;
            result.data.forEach(user => {
                store.dispatch('users/addUser', user);
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


function onAddClicked() {
    store.dispatch('users/setIdUserShow', 0);
}

function onEditClicked(id) {
    store.dispatch('users/setIdUserShow', id);
    document.getElementById('open-modal').click();
}

async function onSubmited() {
    store.dispatch('users/setIdUserShow', "");
    document.getElementById('close-modal').click();
    await loadFirstOrOnEvent();
}

async function deleteMultipleUser() {
    if (!confirm('Anda yakin hapus?')) {
        return;
    }
    loadingDelete.value = true;
    try {
        const token = store.getters.getToken;
        const UserId = checkedUser.value;

        if (UserId.length > 0) {
            for await (const id of UserId) {
                const result = await deleteUser(token, id);
                if (result.success !== true) {
                    throw new Error(result.message)
                }
                store.dispatch('users/deleteUser', id);
            }

            // Reset selected User
            checkedUser.value = [];
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
            text: 'Hapus pengguna berhasil.',
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

        if (error.message === 'sesi telah login berakhir') {
            store.dispatch('logout');
            router.push('/login');
        }
    }
}

</script>


<style scoped>
.card-tool {
    padding: 10px;
}

.check-tool {
    border: 1px solid #0054a6;
}

.action-button-delete {
    border: 1px solid rgb(220, 78, 65);
    background-color: transparent;
    color: rgb(220, 78, 65);
    padding: 5px 8px 5px 8px;
    border-radius: 3px;
}

.action-button-delete:hover {
    background-color: antiquewhite;
}

.action-button-delete:disabled {
    border: 1px solid rgb(204, 203, 203);
    background-color: transparent;
    color: rgb(243, 166, 159);
}

.filter__item {
    float: left;
    margin-right: 5px;
}

.filter__item_right {
    float: right;
    margin-left: 5px;
}

.filter__item__input {
    border: 1px solid rgb(203, 204, 212);
    padding: 5px 8px 5px 8px;
}
</style>