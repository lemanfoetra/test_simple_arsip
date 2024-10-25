<template>
    <div class="card">
        <form @submit.prevent="submit">
            <div class="card-header">
                <h4 class="card-title">Tambah File</h4>
            </div>
            <div class="card-body">
                <div v-if="loadingShow" style="padding: 20px; text-align: center">
                    Memuat ...
                </div>
                <div v-else>
                    <div class="form-floating mb-3">
                        <input type="file" :class="!!error_file ? 'form-control is-invalid' : 'form-control'" id="file"
                            @change="onFileChange" autocomplete="off">
                        <label for="file">File</label>
                        <div v-if="!!error_file" class="invalid-feedback">{{ error_file }}</div>
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
import { ref, defineProps, watch } from 'vue'
import Swal from 'sweetalert2/dist/sweetalert2';
import { apiUploadFile } from '../../hooks/api_file';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

const router = useRouter();
const store = useStore();
const props = defineProps(['folderId']);

const file_upload = ref(null);
const error_file = ref('');
const loadingShow = ref(false);
const loadingSubmit = ref(false);

watch(() => file_upload.value, () => {
    error_file.value = '';
});


function onFileChange(event) {
    file_upload.value = event.target.files[0];
}


async function submit() {
    loadingSubmit.value = true;
    try {
        if ((file_upload.value || '') === '') {
            error_file.value = 'Field ini harus diisi.';
            throw new Error('');
        }

        let formData = new FormData();
        formData.append('file_arsip', file_upload.value);

        const token = store.getters.getToken;
        const result = await apiUploadFile(token, props.folderId, formData);

        if ((result.success || false) !== true) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,

                icon: 'warning',
                title: 'Warning',
                text: result.message.file_arsip[0] || 'Mohon coba kembali',
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