<template>
    <form class="modal-content" @submit.prevent="submit">
        <div v-if="!loadingForm">
            <div class="modal-header">
                <h5 class="modal-title">Detail Api</h5>
                <button type="button" id="close-modal" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-floating mb-3">
                            <input type="text" :class="!!errorName ? 'form-control is-invalid' : 'form-control'"
                                id="name" v-model.trim="name" autocomplete="off">
                            <label for="name">Nama Api</label>
                            <div v-if="!!errorName" class="invalid-feedback">{{ errorName }}</div>
                        </div>
                        <div class="form-floating mb-3">
                            <select id="idMenu" :class="!!errorIdMenu ? 'form-control is-invalid' : 'form-control'"
                                v-model.trim="idMenu">
                                <option value="">Pilih</option>
                                <option v-for="menu  in  listMenu" :value="menu.id" :key="menu.id">
                                    {{ menu.menu }}
                                </option>
                            </select>
                            <label for="idMenu">Menu</label>
                            <div v-if="!!errorIdMenu" class="invalid-feedback">{{ errorIdMenu }}</div>
                        </div>
                        <div class="form-floating mb-3">
                            <select id="method" :class="!!errorMethod ? 'form-control is-invalid' : 'form-control'"
                                v-model.trim="method">
                                <option value="">Pilih</option>
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                                <option value="DELETE">DELETE</option>
                            </select>
                            <label for="method">Method</label>
                            <div v-if="!!errorMethod" class="invalid-feedback">{{ errorMethod }}</div>
                        </div>

                        <div class="form-floating mb-3">
                            <input type="text" :class="!!errorKeyMenu ? 'form-control is-invalid' : 'form-control'"
                                id="keyApi" v-model.trim="keyApi" autocomplete="off">
                            <label for="keyApi">Key</label>
                            <div v-if="!!errorKeyMenu" class="invalid-feedback">{{ errorKeyMenu }}</div>
                        </div>

                        <div class="form-floating mb-3">
                            <input type="text" :class="!!errorUrl ? 'form-control is-invalid' : 'form-control'" id="url"
                                v-model.trim="url" autocomplete="off">
                            <label for="url">Url</label>
                            <div v-if="!!errorUrl" class="invalid-feedback">{{ errorUrl }}</div>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" :class="!!errorDescription ? 'form-control is-invalid' : 'form-control'"
                                id="description" v-model.trim="description" autocomplete="off">
                            <label for="description">Deskripsi</label>
                            <div v-if="!!errorDescription" class="invalid-feedback">{{ errorDescription }}</div>
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
import { ref, computed, defineModel, defineEmits, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { postApi, putApi, showApi } from '../../hooks/api_master_api'

import Swal from 'sweetalert2/dist/sweetalert2';

const store = useStore();
const emit = defineEmits(['submit']);

const loadingForm = ref(false);
const loadingSubmitForm = ref(false);
const messageError = ref('');

const idApiShow = ref('');
const name = defineModel('name');
const idMenu = defineModel('idMenu');
const method = defineModel('method');
const keyApi = defineModel('keyApi');
const url = defineModel('url');
const description = defineModel('description');

const errorName = ref('');
const errorIdMenu = ref('');
const errorMethod = ref('');
const errorKeyMenu = ref('');
const errorUrl = ref('');
const errorDescription = ref('');

onMounted(async () => {
    store.dispatch('apis/setIdApiShow', '');
})

watch(() => name.value, () => {
    errorName.value = '';
});
watch(() => idMenu.value, () => {
    errorIdMenu.value = '';
});
watch(() => method.value, () => {
    errorMethod.value = '';
});
watch(() => keyApi.value, () => {
    errorKeyMenu.value = '';
});
watch(() => url.value, () => {
    errorUrl.value = '';
});
watch(() => description.value, () => {
    errorDescription.value = '';
});

/**
 * Watch kondisi form jika tambah atau edit;
 */
watch(() => store.getters['apis/getIdApiShow'], async (newValue) => {
    console.log('watch api : ', newValue);
    idApiShow.value = newValue;
    messageError.value = '';
    loadingForm.value = true;

    await getSavedApi(newValue);
    loadingForm.value = false;
});

const listMenu = computed(function () {
    return store.getters['apis/getListMenu'];
})

async function getSavedApi(apiId) {
    if (apiId === 0 || apiId === '') {
        name.value = "";
        idMenu.value = "";
        method.value = "";
        keyApi.value = "";
        url.value = "";
        description.value = "";
        return;
    }
    try {
        const token = store.getters.getToken;
        const result = await showApi(token, apiId);

        if (result.success !== true) {
            throw new Error(result.message);
        }

        if (result.success === true) {
            name.value = result.data.api.name || '';
            idMenu.value = result.data.api.id_menus || '';
            method.value = result.data.api.method || '';
            keyApi.value = result.data.api.key || '';
            url.value = result.data.api.url || '';
            description.value = result.data.api.description || '';
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
        if ((method.value || '') === '') {
            errorMethod.value = 'Metode harus diisi.';
            throw new Error('');
        }
        if ((keyApi.value || '') === '') {
            errorKeyMenu.value = 'Key harus diisi.';
            throw new Error('');
        }
        if ((url.value || '') === '') {
            errorUrl.value = 'Url harus diisi.';
            throw new Error('');
        }
        if ((description.value || '') === '') {
            errorDescription.value = 'Deskripsi harus diisi.';
            throw new Error('');
        }

        const newApi = {
            id_menus: idMenu.value,
            name: name.value,
            method: method.value,
            key: keyApi.value,
            url: url.value,
            description: description.value
        };

        // SIMPAN KE SERVER
        const token = store.getters.getToken;
        let result = null;
        if (idApiShow.value !== 0) {
            result = await putApi(token, idApiShow.value, newApi);
        } else {
            result = await postApi(token, newApi);
        }

        // ERROR FROM API
        if ((result.success || false) === false) {
            if (result.message_type === 'array') {
                if ((result.message.name || '') !== '') {
                    errorName.value = result.message.name[0];
                }
                if ((result.message.method || '') !== '') {
                    errorMethod.value = result.message.method[0];
                }
                if ((result.message.url || '') !== '') {
                    errorUrl.value = result.message.url[0];
                }
                if ((result.message.description || '') !== '') {
                    errorDescription.value = result.message.description[0];
                }
                if ((result.message.key || '') !== '') {
                    errorKeyMenu.value = result.message.key[0];
                }
                throw new Error('Gagal disimpan, mohon periksa kembali data yang Anda masukan.');
            } else {
                throw new Error(result.message);
            }
        }

        // SIMPAN KE STORE
        if ((result.success || false) === true) {
            const response = result.data.api;
            const responseApi = {
                id: response.id,
                name: response.name,
                menu: response.menu,
                method: response.method,
                keyApi: response.key,
                url: response.url,
                updatedAt: response.updated_at,
            }
            store.dispatch('apis/addApiInFirst', responseApi);
        }

        messageError.value = '';
        loadingSubmitForm.value = false;
        emit('submit', newApi);

        Swal.fire({
            icon: "success",
            text: "Data berhasil disimpan.",
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