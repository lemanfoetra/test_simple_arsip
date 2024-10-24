<template>
    <div class="card mb-2">
        <div class="tools">
            <div class="tools__item">
                <button type="button" class="tools__item__button tools__danger btn-sm" :disabled="true">
                    <span v-if="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
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
                <button type="button" class="tools__item__button tools__primary btn-sm" :disabled="true">
                    <span v-if="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-plus">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 5l0 14" />
                            <path d="M5 12l14 0" />
                        </svg>
                    </span>
                    <span v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-plus">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 5l0 14" />
                            <path d="M5 12l14 0" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="table-responsive">
            <table class="table table-hover table-stripded" style="white-space: nowrap">
                <thead>
                    <tr>
                        <th style="width: 30px;"></th>
                        <th style="width: 30px;">#</th>
                        <th>Menu</th>
                        <th>Api</th>
                        <th>Method</th>
                    </tr>
                </thead>
                <tbody v-if="loadingTable">
                    <tr>
                        <td class="text-center" colspan="10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"
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
                            Memuat data...
                        </td>
                    </tr>
                </tbody>
                <tbody v-else-if="!loadingTable && (roleMenuIdActive === '' || roleMenuIdActive === 0)">
                    <tr>
                        <td class="text-center" colspan="10">
                            Pilih menu untuk menampilkan list api.
                        </td>
                    </tr>
                </tbody>
                <tbody v-else-if="!loadingTable && roleMenuApis.length === 0">
                    <tr>
                        <td class="text-center" colspan="20">Tidak ada data.</td>
                    </tr>
                </tbody>
                <tbody v-else-if="!loadingTable && roleMenuApis.length > 0">
                    <tr v-for="(api, index) in roleMenuApis" :key="api.key">
                        <td style="width: 30px;">
                            <div v-if="loadingSetAccess[api.id]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
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
                            </div>
                            <div v-else-if="!loadingSetAccess[api.id]">
                                <label class="form-check-single form-switch">
                                    <input @change="setAccess(api.id)" v-model="idModuleSetAccess" type="checkbox"
                                        class="form-check-input" :value="api.id">
                                </label>
                            </div>
                        </td>
                        <td>{{ (index + 1) }}</td>
                        <td>{{ api.menu }}</td>
                        <td>{{ api.name }}</td>
                        <td>{{ api.method }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script setup>
import { ref, watch } from 'vue'
import Swal from 'sweetalert2/dist/sweetalert2';
import { useStore } from 'vuex'
import { getRoleMenuApis, postAccessRoleMenuApi } from '../../hooks/api_role';

const store = useStore();
const loadingTable = ref(false);
const loadingSetAccess = ref([]);
const roleMenuApis = ref([]);
const roleMenuIdActive = ref('');
const idModuleSetAccess = ref([]);

/**
 * Load list role menu api
 */
watch(() => store.getters['roles/getRoleMenuIdClickShow'], async (newValue) => {
    roleMenuIdActive.value = newValue;
    console.log('[api] show role menu : ', newValue);
    if (newValue === 0 || newValue === '') {
        store.dispatch('roles/resetRoleMenuApis');
    } else {
        await loadRoleApis(newValue);
    }
});

/**
 * get list role menu api dari store
 */
watch(() => store.getters['roles/getRoleApis'], (newValue) => {
    roleMenuApis.value = newValue;

    // Set default api yang aktif
    idModuleSetAccess.value = [];
    roleMenuApis.value.forEach(data => {
        if (data.access === 'Y') {
            idModuleSetAccess.value.push(data.id);
        }
    });
});


async function loadRoleApis(menuId) {
    try {
        loadingTable.value = true;
        const token = store.getters.getToken;
        const roleId = store.getters['roles/getRoleIdClickShow'];
        const result = await getRoleMenuApis(token, roleId, menuId);

        if (result.success === true) {
            store.dispatch('roles/resetRoleMenuApis');
            result.data.apis.forEach(api => {
                const newApi = {
                    id: api.id,
                    id_menus: api.id_menus,
                    name: api.name,
                    method: api.method,
                    key: api.key,
                    url: api.url,
                    menu: api.menu,
                    link: api.link,
                    access: api.access,
                }
                store.dispatch('roles/addRoleMenuApi', newApi);
            });
        }
        loadingTable.value = false;
    } catch (error) {
        Swal.fire({
            icon: "error",
            text: error.message,
        });
    }
}


async function setAccess(id) {
    loadingSetAccess.value[id] = true;
    try {
        let isChecked = false;
        idModuleSetAccess.value.forEach(data => {
            if (data === id) {
                isChecked = true;
            }
        });

        const token = store.getters.getToken;
        const roleId = store.getters['roles/getRoleIdClickShow'];
        const menuId = store.getters['roles/getRoleMenuIdClickShow'];

        const post = {
            id_api_module: id,
            access: isChecked ? 'Y' : 'N'
        };
        await postAccessRoleMenuApi(token, roleId, menuId, post)
    } catch (error) {
        Swal.fire({
            icon: "error",
            text: error.message,
        });
    }
    loadingSetAccess.value[id] = false;
}

</script>