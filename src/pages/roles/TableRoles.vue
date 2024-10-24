<template>
    <div>
        <div class="card mb-2">
            <div class="tools">
                <div class="tools__item">
                    <button type="button" class="tools__item__button tools__primary btn-sm"
                        :disabled="rolesIdSelected.length === 1 ? false : true" @click="onEditClick">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-settings">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                                d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                            <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                        </svg>
                    </button>
                </div>
                <div class="tools__item">
                    <button type="button" class="tools__item__button tools__danger btn-sm"
                        :disabled="rolesIdSelected.length > 0 ? false : true" @click="onDeleteClick">
                        <span v-if="!loadingDelete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4 7l16 0" />
                                <path d="M10 11l0 6" />
                                <path d="M14 11l0 6" />
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                        </span>
                        <span v-else>
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
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="table-responsive">
                <table class="table table-hover table-stripded">
                    <thead>
                        <tr>
                            <th style="width: 30px;"></th>
                            <th style="width: 30px;">#</th>
                            <th>Role</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody v-if="!loadingTable">
                        <tr v-for="(role, index) in roles" :key="role.key" :class="classListShowed(role.id)">
                            <td>
                                <input type="checkbox" class="form-check-input" v-model="rolesIdSelected"
                                    :value="role.id" :key="role.key">
                            </td>
                            <td>{{ (index + 1) }}</td>
                            <td @click="onClickShow(role.id)" class="cursor__click">{{ role.name }}</td>
                            <td></td>
                        </tr>
                    </tbody>
                    <tbody v-else-if="loadingTable">
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
                                Memuat ...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>

import { onMounted, ref, defineEmits, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { loadListRole, deleteRole } from '../../hooks/api_role';
import Swal from 'sweetalert2/dist/sweetalert2';

const loadingTable = ref(false);
const loadingDelete = ref(false);
const store = useStore();
const router = useRouter();
const emit = defineEmits(['onEdit', 'onClickShow']);
const rolesIdSelected = ref([]);
const roleIdClickShow = ref('');
const roles = ref([]);


onMounted(async () => {
    await loadListRoleFromServer();
})

watch(() => store.getters['roles/getRoles'], (newValue) => {
    roles.value = newValue
});

watch(() => store.getters['roles/getRoleIdSelected'], (newValue) => {
    rolesIdSelected.value = newValue
});

watch(() => store.getters['roles/getRoleIdClickShow'], (newValue) => {
    roleIdClickShow.value = newValue;
    store.dispatch('roles/setRoleMenuIdClickShow', '');
});


function classListShowed(id) {
    if (roleIdClickShow.value === id) {
        return "table-selected";
    }
    return "";
}


async function onEditClick() {
    store.dispatch('roles/setRoleIdSelected', rolesIdSelected.value);
    const roleId = rolesIdSelected.value[0] || 0;
    emit('onEdit', roleId);
}

async function onDeleteClick() {
    if (!confirm('Yakin hapus?')) {
        return;
    }

    loadingDelete.value = true;
    try {
        const token = store.getters.getToken;
        if (rolesIdSelected.value.length > 0) {
            for await (const id of rolesIdSelected.value) {
                const result = await deleteRole(token, id);
                if (result.success !== true) {
                    throw new Error(result.message)
                }
                store.dispatch('roles/deleteRole', id);
            }
            // Reset selected role
            store.dispatch('roles/resetRoleIdSelected');
        }
        Swal.fire({
            icon: "success",
            text: "Hapus data berhasil.",
        });
        loadingDelete.value = false;
    } catch (error) {
        Swal.fire({
            icon: "error",
            text: error.message,
        });
        loadingDelete.value = false;
    }
}

function onClickShow(roleId) {
    emit('onClickShow', roleId);
}

async function loadListRoleFromServer() {
    try {
        loadingTable.value = true;
        const token = store.getters.getToken;
        const result = await loadListRole(token);

        if (result.success === true) {
            store.dispatch('roles/resetRoles');
            result.data.forEach(role => {
                store.dispatch('roles/addRole', role);
            });
        }
        loadingTable.value = false;
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

</script>