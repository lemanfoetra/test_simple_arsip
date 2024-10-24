<template>
    <div class="page page-center">
        <div class="container container-tight py-4">
            <div class="text-center mb-4">
                <h2>Simple Arsip</h2>
                <h4>By Sulaeman</h4>
            </div>

            <div v-if="!!errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
            </div>

            <div class="card card-md">
                <div class="card-body">
                    <h2 class="h2 text-center mb-4">Must login first to access archives</h2>
                    <form @submit.prevent="submitLogin">
                        <div class="mb-3">
                            <label class="form-label">Email address</label>
                            <input type="email" class="form-control" v-model="email" autocomplete="off">
                            <div class="invalid-feedback">Invalid feedback</div>
                        </div>
                        <div class="mb-2">
                            <label class="form-label">
                                Password
                                <!-- <span class="form-label-description">
                                    <a href="#">I forgot password</a>
                                </span> -->
                            </label>
                            <div class="input-group input-group-flat">
                                <input id="password" type="password" class="form-control" v-model="password"
                                    autocomplete="off">
                                <span class="input-group-text">
                                    <a href="#" @click="showPassword" type="button" class="link-secondary"
                                        title="Show password"
                                        data-bs-toggle="tooltip"><!-- Download SVG icon from http://tabler-icons.io/i/eye -->
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" class="icon">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                            <path
                                                d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                        </svg>
                                    </a>
                                </span>
                            </div>
                        </div>
                        <div class="form-footer">
                            <button v-if="!submitLoading" type="submit" class="btn btn-primary w-100">Sign in</button>
                            <button v-else type="button" class="disabled btn btn-primary w-100">
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
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineModel } from 'vue';
import { login } from '../../hooks/api_auth'
import { setToken } from '../../hooks/cookie_token'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore();
const router = useRouter();

const email = defineModel('email');
const password = defineModel('password');

const validForm = ref(true);
const showInputPassword = ref(false);
const errorMessage = ref('');
const submitLoading = ref(false);

watch([email, password], () => {
    validForm.value = true;
    errorMessage.value = '';
});


function showPassword() {
    const passwordField = document.getElementById('password');
    showInputPassword.value = !showInputPassword.value;
    if (showInputPassword.value) {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
}

async function submitLogin() {
    submitLoading.value = true;
    try {
        const result = await login(email.value, password.value);

        // SAVE
        store.dispatch('setToken', result.access_token);
        store.dispatch('setUserId', result.user.id);
        store.dispatch('setUserRole', result.user.id_role);
        store.dispatch('setUserName', result.user.name);
        store.dispatch('setUserEmail', result.user.email);

        setToken(result.access_token);
        localStorage.setItem('user_id', result.user.id);
        localStorage.setItem('user_role', result.user.id_role);
        localStorage.setItem('user_name', result.user.name);
        localStorage.setItem('user_email', result.user.email);

        submitLoading.value = false;
        router.push('/loading');

    } catch (error) {
        errorMessage.value = error.message;
        console.log(error.message);
        submitLoading.value = false;
    }
}
</script>