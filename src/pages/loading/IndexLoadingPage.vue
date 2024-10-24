<template>
    <div>
        <div class="container container-slim py-4">
            <div class="text-center">
                <div class="mb-3">
                    <a href="#" class="navbar-brand navbar-brand-autodark"></a>
                </div>
                <div class="text-secondary mb-3">Preparing application</div>
                <div class="progress progress-sm">
                    <div class="progress-bar progress-bar-indeterminate"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { loadBaseMenus } from '../../hooks/api_base'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore();
const router = useRouter();

onMounted(async () => {
    await loadMenus();
    setTimeout(() => {
        router.push('/home');
    }, 1000);
})


async function loadMenus() {
    try {
        const token = store.getters.getToken;
        const result = await loadBaseMenus(token);

        if (result.success !== true) {
            throw new Error(result.message);
        }

        // SET MENU
        const menus = result.data;
        if (menus.length > 0) {
            // Reset menu in store
            store.dispatch('resetMenu');

            // Rest menu in local storage
            localStorage.setItem('menus', []);

            const menuForLocalStorage = [];
            menus.forEach(menu => {
                // add menu to store
                store.dispatch('addMenu', menu);
                // add menu to local storage
                menuForLocalStorage.push(menu);
            });

            // add menu in local storate
            localStorage.setItem('menus', JSON.stringify(menuForLocalStorage));
        }
    } catch (error) {
        if (error.message === 'sesi telah login berakhir') {
            store.dispatch('logout');
            router.push('/login');
        }
    }
}


</script>

<style scoped>
.memuat {
    text-align: center;
}
</style>