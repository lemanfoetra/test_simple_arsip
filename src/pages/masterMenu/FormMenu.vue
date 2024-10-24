<template>
    <form class="modal-content" @submit.prevent="submit">
        <div v-if="!loadingForm">
            <div class="modal-header">
                <h5 class="modal-title">Detail Menu</h5>
                <button type="button" id="close-modal" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-floating mb-3">
                            <input type="text" :class="!!errorMenu ? 'form-control is-invalid' : 'form-control'"
                                id="menu" v-model.trim="menu" autocomplete="off">
                            <label for="menu">Nama Menu</label>
                            <div v-if="!!errorMenu" class="invalid-feedback">{{ errorMenu }}</div>
                        </div>
                        <div class="form-floating mb-3">
                            <select id="id_parrent"
                                :class="!!errorIdParrent ? 'form-control is-invalid' : 'form-control'"
                                v-model.trim="id_parrent">
                                <option value="0">Level Atas</option>
                                <option v-for="menu in  listMenu" :value="menu.id" :key="menu.id">
                                    {{ menu.menu }}
                                </option>
                            </select>
                            <label for="id_parrent">Parrent Menu</label>
                            <div v-if="!!errorIdParrent" class="invalid-feedback">{{ errorIdParrent }}</div>
                        </div>

                        <div class="form-floating mb-3">
                            <input type="text" :class="!!errorLink ? 'form-control is-invalid' : 'form-control'"
                                id="link" v-model.trim="link" autocomplete="off">
                            <label for="link">Link</label>
                            <div v-if="!!errorLink" class="invalid-feedback">{{ errorLink }}</div>
                        </div>

                        <div class="form-floating mb-3">
                            <input type="number" min="0"
                                :class="!!errorUrutan ? 'form-control is-invalid' : 'form-control'" id="urutan"
                                v-model.trim="urutan" autocomplete="off">
                            <label for="urutan">Urutan</label>
                            <div v-if="!!errorUrutan" class="invalid-feedback">{{ errorUrutan }}</div>
                        </div>

                        <div class="form-floating mb-3">
                            <textarea :class="!!errorIcon ? 'form-control is-invalid' : 'form-control'" id="icon"
                                v-model.trim="icon" style="height: 100px;"></textarea>
                            <label for="icon">Icon</label>
                            <div v-if="!!errorIcon" class="invalid-feedback">{{ errorIcon }}</div>
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
import { apiPostMenu, apiPutMenu, apiShowMenu } from '../../hooks/api_master_menu'

import Swal from 'sweetalert2/dist/sweetalert2';

const store = useStore();
const emit = defineEmits(['submit']);

const loadingForm = ref(false);
const loadingSubmitForm = ref(false);
const messageError = ref('');

const menu = defineModel('menu');
const id_parrent = defineModel('id_parrent');
const link = defineModel('link');
const icon = defineModel('icon');
const urutan = defineModel('urutan');

const idMenuShow = ref(''); // reactive untuk tambah/edit
const errorMenu = ref('');
const errorIdParrent = ref('');
const errorLink = ref('');
const errorIcon = ref('');
const errorUrutan = ref('');

onMounted(async () => {
    store.dispatch('apis/setIdApiShow', '');
})

watch(() => menu.value, () => {
    errorMenu.value = '';
});
watch(() => id_parrent.value, () => {
    errorIdParrent.value = 0;
});
watch(() => link.value, () => {
    errorLink.value = '';
});
watch(() => icon.value, () => {
    errorIcon.value = '';
});
watch(() => urutan.value, () => {
    errorUrutan.value = '';
});

/**
 * Watch kondisi form jika tambah atau edit;
 */
watch(() => store.getters['menus/getIdMenuShow'], async (newValue) => {
    console.log('watch menu : ', newValue);
    idMenuShow.value = newValue;
    messageError.value = '';
    loadingForm.value = true;

    await getSavedMenu(newValue);
    loadingForm.value = false;
});

const listMenu = computed(function () {
    return store.getters['menus/getMenusForForm'];
})

async function getSavedMenu(menuId) {
    if (menuId === 0 || menuId === '') {
        menu.value = "";
        id_parrent.value = "";
        link.value = "";
        icon.value = "";
        urutan.value = "";
        return;
    }
    try {
        const token = store.getters.getToken;
        const result = await apiShowMenu(token, menuId);

        if (result.success !== true) {
            throw new Error(result.message);
        }

        menu.value = result.data.menu.menu || '';
        id_parrent.value = result.data.menu.id_parrent || 0;
        link.value = result.data.menu.link || '';
        icon.value = result.data.menu.icon || '';
        urutan.value = result.data.menu.urutan || '';

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
        if ((menu.value || '') === '') {
            errorMenu.value = 'Field ini harus diisi.';
            throw new Error('');
        }
        console.log('id_parrent', id_parrent.value);
        if ((id_parrent.value || 0) === '') {
            errorIdParrent.value = 'Field ini harus diisi.';
            throw new Error('');
        }
        if ((link.value || '') === '') {
            errorLink.value = 'Field ini diisi.';
            throw new Error('');
        }
        // if ((icon.value || '') === '') {
        //     errorIcon.value = 'Field ini diisi.';
        //     throw new Error('');
        // }
        if ((urutan.value || '') === '') {
            errorUrutan.value = 'Field ini harus diisi.';
            throw new Error('');
        }

        const newMenu = {
            menu: menu.value,
            id_parrent: id_parrent.value,
            link: link.value,
            icon: icon.value,
            urutan: urutan.value
        };

        // SIMPAN KE SERVER
        const token = store.getters.getToken;
        let result = null;
        if (idMenuShow.value !== 0) {
            result = await apiPutMenu(token, idMenuShow.value, newMenu);
        } else {
            result = await apiPostMenu(token, newMenu);
        }

        // ERROR FROM API
        if ((result.success || false) === false) {
            if (result.message_type === 'array') {
                if ((result.message.menu || '') !== '') {
                    errorMenu.value = result.message.menu[0];
                }
                if ((result.message.id_parrent || '') !== '') {
                    errorIdParrent.value = result.message.id_parrent[0];
                }
                if ((result.message.icon || '') !== '') {
                    errorIcon.value = result.message.icon[0];
                }
                if ((result.message.urutan || '') !== '') {
                    errorUrutan.value = result.message.urutan[0];
                }
                if ((result.message.link || '') !== '') {
                    errorLink.value = result.message.link[0];
                }
                throw new Error('Gagal disimpan, mohon periksa kembali data yang Anda masukan.');
            } else {
                throw new Error(result.message);
            }
        }

        messageError.value = '';
        loadingSubmitForm.value = false;
        emit('submit', newMenu);

        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,

            icon: 'success',
            title: 'Success',
            text: 'Menu berhasil disimpan.',
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