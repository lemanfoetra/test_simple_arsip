<template>
    <form class="modal-content" @submit.prevent="submit">
        <div class="modal-header">
            <h5 class="modal-title">Menu</h5>
            <button type="button" id="close-modal" class="btn-close" data-bs-dismiss="modal"
                aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-floating mb-3">
                        <select id="roleMenu" :class="!!errorRoleMenu ? 'form-control is-invalid' : 'form-control'"
                            v-model.trim="roleMenu">
                            <option value="">Pilih Menu</option>
                            <option v-for="menu  in  menus " :value="menu.id" :key="menu.id">
                                {{ menu.menu }}
                            </option>
                        </select>
                        <label for="roleMenu">Menu</label>
                        <div v-if="!!errorRoleMenu" class="invalid-feedback">{{ errorRoleMenu }}</div>
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
import { ref, watch, defineModel, defineEmits } from 'vue'
import { useStore } from 'vuex'
import Swal from 'sweetalert2/dist/sweetalert2';
import { getAllMenus, postRoleMenu } from '../../../hooks/api_role';


const store = useStore();
const menus = ref([]);

const roleMenu = defineModel('roleMenu');
const emit = defineEmits(['onSubmit']);
const errorRoleMenu = ref('');
const loadingSubmitForm = ref(false);

watch(() => store.getters['roles/getRoleMenuIdForCRUD'], async (newValue) => {
    console.log('watch roleMenuId : ', newValue);
    await getListMenus();
});


async function getListMenus() {
    const token = store.getters.getToken;
    const result = await getAllMenus(token);
    if (result.success === true) {
        menus.value = result.data.menus
    }
}


async function submit() {
    try {
        loadingSubmitForm.value = true;

        if ((roleMenu.value || '') === '') {
            errorRoleMenu.value = 'Menu harus diisi.';
            throw new Error('');
        }

        const dataPost = {
            id_menus: roleMenu.value
        }
        const token = store.getters.getToken;
        const roleId = store.getters['roles/getRoleIdClickShow'];
        const result = await postRoleMenu(token, roleId, dataPost);
        if (result.success !== true) {
            throw new Error('Gagal menyimpan, mohon coba kembali');
        }

        // Simpan ke stores
        const menu = result.data.menu;
        const newMenu = {
            id: menu.id,
            id_menus: menu.id_menus,
            id_roles: menu.id_roles,
            menu: menu.menu,
            link: menu.link,
            accessFunctions: menu.access_function,
        }
        store.dispatch('roles/addRoleMenus', newMenu);
        loadingSubmitForm.value = false;
        emit('onSubmit', menu);

    } catch (error) {
        loadingSubmitForm.value = false;
        store.dispatch('roles/setRoleMenuIdForCRUD', '');
        if (error.message !== '') {
            Swal.fire({
                icon: "error",
                text: error.message,
            });
        }
    }
}
</script>