<template>
    <div class="card">
        <form @submit.prevent="submit">
            <div class="card-header">
                <h4 class="card-title">Tambah Folder</h4>
            </div>
            <div class="card-body">
                <div v-if="loadingShow" style="padding: 20px; text-align: center">
                    Memuat ...
                </div>
                <div v-else>
                    <div class="form-floating mb-3">
                        <input type="text" :class="!!error_name ? 'form-control is-invalid' : 'form-control'" id="kata"
                            v-model.trim="name" autocomplete="off">
                        <label for="kata">Nama Folder</label>
                        <div v-if="!!error_name" class="invalid-feedback">{{ error_name }}</div>
                    </div>
                </div>
            </div>
            <div class="card-footer text-center">
                <button v-if="loadingSubmit" type="button" class="btn btn-primary mr-2" disabled>Menyimpan...</button>
                <button v-else type="submit" class="btn btn-primary" style="margin-right: 10px;">Simpan</button>
                <router-link :to="`/arsip/files/${props.folderId}`" class="btn btn-secondary">Kembali</router-link>
            </div>
        </form>
    </div>
</template>

<script setup>
import { defineModel, ref, defineProps, watch } from 'vue'
import Swal from 'sweetalert2/dist/sweetalert2';
import { apiInsertFolder } from '../../hooks/api_folder';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

const props = defineProps(['folderId']);
const name = defineModel('name');
const error_name = ref('');
const router = useRouter();
const store = useStore();

const loadingShow = ref(false);
const loadingSubmit = ref(false);

watch(() => name.value, () => {
    error_name.value = '';
});


async function submit() {
    loadingSubmit.value = true;
    try {
        if ((name.value || '') === '') {
            error_name.value = 'Field ini harus diisi.';
            throw new Error('');
        }

        const data = {
            'name': name.value,
            'id_arsips': props.folderId,
        };

        const token = store.getters.getToken;
        const result = await apiInsertFolder(token, data);

        if ((result.success || false) !== true) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,

                icon: 'warning',
                title: 'Warning',
                text: result.message || 'Mohon coba kembali',
            });
        } else {
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,

                icon: 'success',
                title: 'Berhasil',
                text: 'Berhasil disimpan',
            });
            loadingSubmit.value = false;
            router.push('/arsip/files/' + props.folderId);
        }
        loadingSubmit.value = false;
    } catch (error) {
        if (error.message !== '') {
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
        loadingSubmit.value = false;
    }
}



</script>