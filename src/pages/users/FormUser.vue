<template>
    <form class="modal-content" @submit.prevent="submit">
        <div v-if="!loadingForm">
            <div class="modal-header">
                <h5 class="modal-title">Detail User</h5>
                <button type="button" id="close-modal" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div v-if="(idUserShow !== 0)" class="col-md-12 alert alert-danger" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-info-circle">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                            <path d="M12 9h.01" />
                            <path d="M11 12h1v4h1" />
                        </svg>
                        Kosongkan password jika tidak ingin merubah password.
                    </div>
                    <div class="col-md-6">
                        <div class="form-floating mb-3">
                            <input type="text" :class="!!errorName ? 'form-control is-invalid' : 'form-control'"
                                id="name" v-model.trim="name" autocomplete="off">
                            <label for="name">Name</label>
                            <div v-if="!!errorName" class="invalid-feedback">{{ errorName }}</div>
                        </div>
                        <div class="form-floating mb-3">
                            <select id="role" :class="!!errorRole ? 'form-control is-invalid' : 'form-control'"
                                v-model.trim="role">
                                <option value="">Select Role</option>
                                <option v-for=" role  in  roles " :value="role.id" :key="role.id">
                                    {{ role.name }}
                                </option>
                            </select>
                            <label for="role">Role</label>
                            <div v-if="!!errorRole" class="invalid-feedback">{{ errorRole }}</div>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="email" :class="!!errorEmail ? 'form-control is-invalid' : 'form-control'"
                                id="email" v-model.trim="email" autocomplete="off">
                            <label for="email">Email</label>
                            <div v-if="!!errorEmail" class="invalid-feedback">{{ errorEmail }}</div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-floating mb-3">
                            <input type="password" :class="!!errorPassword ? 'form-control is-invalid' : 'form-control'"
                                id="password" v-model.trim="password" autocomplete="off">
                            <label for="password">Password</label>
                            <div v-if="!!errorPassword" class="invalid-feedback">{{ errorPassword }}</div>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password"
                                :class="!!errorPasswordConfirm ? 'form-control is-invalid' : 'form-control'"
                                id="password_confirm" v-model.trim="password_confirm" autocomplete="off">
                            <label for="password_confirm">Confirm Password</label>
                            <div v-if="!!errorPasswordConfirm" class="invalid-feedback">
                                {{ errorPasswordConfirm }}
                            </div>
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
        </div>
        <div v-else>
            <div style="padding: 20px; text-align: center;">
                Memuat data ...
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref, defineModel, defineEmits, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { loadListRoles, insertUser, updateUser, getUser } from '../../hooks/api_users';
import Swal from 'sweetalert2/dist/sweetalert2';

const store = useStore();
const emit = defineEmits(['submit']);

const roles = ref([]);
const loadingForm = ref(false);
const loadingSubmitForm = ref(false);
const messageError = ref('');

const idUserShow = ref('');
const name = defineModel('name');
const role = defineModel('role');
const email = defineModel('email');
const password = defineModel('password');
const password_confirm = defineModel('password_confirm');

const errorName = ref('');
const errorRole = ref('');
const errorEmail = ref('');
const errorPassword = ref('');
const errorPasswordConfirm = ref('');

onMounted(() => {
    store.dispatch('users/setIdUserShow', '');
})

watch(() => name.value, () => {
    errorName.value = '';
});
watch(() => role.value, () => {
    errorRole.value = '';
});
watch(() => email.value, () => {
    errorEmail.value = '';
});
watch(() => password.value, () => {
    errorPassword.value = '';
});
watch(() => password_confirm.value, () => {
    errorPasswordConfirm.value = '';
});

/**
 * Watch kondisi form jika tambah atau edit;
 */
watch(() => store.getters['users/getIdUserShow'], async (newValue) => {
    console.log('watch user : ', newValue);
    idUserShow.value = newValue;
    messageError.value = '';
    loadingForm.value = true;

    await loadRoles();
    await loadSavedUser(newValue);
    loadingForm.value = false;
});


/**
 * Load roles untuk selectbox
 */
async function loadRoles() {
    errorRole.value = '';

    if (roles.value.length > 0) {
        return;
    }

    try {
        const token = store.getters.getToken;
        const result = await loadListRoles(token);

        if (result.success !== true) {
            throw new Error(result.message);
        }
        roles.value = result.data;
    } catch (error) {
        errorRole.value = error.message;
        messageError.value = error.message;
        loadingForm.value = false;

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

async function loadSavedUser(idUser) {
    if (idUser === 0 || idUser === '') {
        name.value = "";
        role.value = "";
        email.value = "";
        password.value = "";
        password_confirm.value = "";
        return;
    }
    try {
        const token = store.getters.getToken;
        const result = await getUser(token, idUser);

        if (result.success !== true) {
            throw new Error(result.message);
        }

        if (result.success === true) {
            name.value = result.data.user.name || '';
            role.value = result.data.user.id_role || '';
            email.value = result.data.user.email || '';

            store.dispatch('users/setUserShow', result.data.user);
        }
    } catch (error) {
        messageError.value = error.message;
        loadingForm.value = false;

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

async function submit() {
    loadingSubmitForm.value = true;

    try {
        if ((name.value || '') === '') {
            errorName.value = 'Nama harus diisi.';
            throw new Error('');
        }

        if ((role.value || '') === '') {
            errorRole.value = 'Role harus diisi.';
            throw new Error('');
        }

        if ((email.value || '') === '') {
            errorEmail.value = 'Email harus diisi.';
            throw new Error('');
        }

        if ((password.value || '') === '' && (idUserShow.value || '') === '') {
            errorPassword.value = 'Password harus diisi.';
            throw new Error('');
        }

        if ((password_confirm.value || '') === '' && (idUserShow.value || '') === '') {
            errorPasswordConfirm.value = 'Password Konfirmasi harus diisi.';
            throw new Error('');
        }

        if ((idUserShow.value || '') === '' && password.value.length < 8) {
            errorPassword.value = 'Password minimal 8 karakter.';
            throw new Error('');
        }
        if ((idUserShow.value || '') === '' && password.value !== password_confirm.value) {
            errorPasswordConfirm.value = 'Password Konfirmasi harus sama dengan password';
            throw new Error('');
        }

        const user = {
            name: name.value,
            id_role: role.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirm.value,
        };

        // SIMPAN KE SERVER
        const token = store.getters.getToken;
        let result = null;
        if (idUserShow.value !== 0) {
            result = await updateUser(token, idUserShow.value, user);
        } else {
            result = await insertUser(token, user);
        }

        // SIMPAN KE STORE
        if ((result.success || false) === true) {
            store.dispatch('users/addUserInFirst', result.data.user);
        }

        // ERROR FROM API
        if ((result.success || false) === false) {
            if (result.message_type === 'array') {
                if ((result.message.name || '') !== '') {
                    errorName.value = result.message.name[0];
                }
                if ((result.message.id_role || '') !== '') {
                    errorRole.value = result.message.id_role[0];
                }
                if ((result.message.email || '') !== '') {
                    errorEmail.value = result.message.email[0];
                }
                if ((result.message.password || '') !== '') {
                    errorPassword.value = result.message.password[0];
                }
                throw new Error('Gagal disimpan, mohon periksa kembali data yang Anda masukan.');
            } else {
                throw new Error(result.message);
            }
        }

        messageError.value = '';
        loadingSubmitForm.value = false;
        emit('submit', user);

        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,

            icon: 'success',
            title: 'Success',
            text: 'Pengguna berhasil disimpan',
        });

    } catch (error) {
        messageError.value = error.message;
        loadingSubmitForm.value = false;

        if (messageError.value !== '') {
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
}
</script>

<style scoped>
.modal-footer {
    justify-content: center !important;
}
</style>