<template>
    <form class="modal-content" @submit.prevent="submit">
        <div class="modal-header">
            <h5 class="modal-title">Detail Role</h5>
            <button type="button" id="close-modal" class="btn-close" data-bs-dismiss="modal"
                aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-floating mb-3">
                        <input type="text" :class="!!errorNameRole ? 'form-control is-invalid' : 'form-control'"
                            id="name" v-model.trim="name" autocomplete="off">
                        <label for="name">Nama Role</label>
                        <div v-if="!!errorNameRole" class="invalid-feedback">{{ errorNameRole }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" :disabled="loadingSubmitForm">
                Batal
            </button>

            <button v-if="!loadingSubmitForm" type="submit" class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                    <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M14 4l0 4l-6 0l0 -4" />
                </svg>
                Simpan
            </button>
            <button v-else type="button" class="disabled btn btn-primary">
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
                Simpan
            </button>
        </div>
    </form>
</template>


<script setup>
import { ref, defineModel, defineEmits, watch } from 'vue'
import Swal from 'sweetalert2/dist/sweetalert2';
import { postRole, getRole, updateRole } from '../../../hooks/api_role';
import { useStore } from 'vuex'


const store = useStore();
const emit = defineEmits(['onSubmit']);
const loadingSubmitForm = ref(false);

const name = defineModel('name');
const errorNameRole = ref('');

/**
 * Watch kondisi form jika tambah atau edit;
 */
watch(() => store.getters['roles/getRoleIdForCRUD'], async (newValue) => {
    console.log('watch roleId : ', newValue);
    await loadRole(newValue);
});

async function submit() {
    try {
        if ((name.value || '') === '') {
            errorNameRole.value = 'Nama role harus diisi.';
            throw new Error('');
        }

        const newRole = {
            name: name.value,
        }

        const token = store.getters.getToken;
        const roleId = store.getters['roles/getRoleIdForCRUD'];

        let result = '';
        if (roleId !== '' && roleId !== 0) {
            result = await updateRole(token, roleId, newRole);
        } else {
            result = await postRole(token, newRole);
        }

        // ERROR FROM API
        if ((result.success || false) === false) {
            if (result.message_type === 'array') {
                if ((result.message.name || '') !== '') {
                    errorNameRole.value = result.message.name[0];
                }
                throw new Error(result.message.name[0]);
            }
            throw new Error(result.message);
        }

        // SIMPAN KE STORES
        if (roleId !== '' && roleId !== 0) {
            store.dispatch('roles/editRole', result.data.role);
        } else {
            if ((result.success || false) === true) {
                store.dispatch('roles/addRoleInFirst', result.data.role);
            }
        }

        emit('onSubmit', result.data.role);
        Swal.fire({
            icon: "success",
            text: "Berhasil disimpan",
        });
    } catch (error) {
        store.dispatch('roles/setRoleIdForCRUD', '');
        if (error.message !== '') {
            Swal.fire({
                icon: "error",
                text: error.message,
            });
        }
    }
}

async function loadRole(roleId) {
    try {
        if (roleId === 0 || roleId === '') {
            name.value = '';
            return;
        }

        const token = store.getters.getToken;
        const result = await getRole(token, roleId);
        if (result.success === true) {
            name.value = result.data.role.name;
        }
    } catch (error) {
        store.dispatch('roles/setRoleIdForCRUD', '');
        Swal.fire({
            icon: "error",
            text: error.message,
        });
    }
}
</script>