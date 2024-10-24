<template>
    <div class="page">
        <header class="navbar navbar-expand-md navbar-light d-print-none">
            <div class="container-xl">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                    <div>
                        <span>Simple Arsip</span>
                        <div style="font-size: 12px; color: gray; margin-top: 5px;">
                            Kelola arsip tanpa ribet
                        </div>
                    </div>
                </h1>
                <div class="navbar-nav flex-row order-md-last">
                    <div class="nav-item dropdown">
                        <a href="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown"
                            aria-label="Open user menu">
                            <span class="avatar avatar-sm"
                                style="background-image: url(./static/avatars/me.png)"></span>
                            <div class="d-none d-xl-block ps-2">
                                <div>{{ user_name }}</div>
                                <div class="mt-1 small text-muted">
                                    {{ user_email }}
                                </div>
                            </div>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <button type="button" @click="logout" class="dropdown-item">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <header class="navbar-expand-md">
            <div class="collapse navbar-collapse" id="navbar-menu">
                <div class="navbar">
                    <div class="container-xl">
                        <div class="row flex-fill align-items-center">
                            <div class="col">
                                <ul class="navbar-nav">
                                    <li :class="classActive('/home')">
                                        <router-link class="nav-link" to="/home">
                                            <span class="nav-link-icon d-md-none d-lg-inline-block">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-tabler icons-tabler-outline icon-tabler-dashboard">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                                    <path d="M13.45 11.55l2.05 -2.05" />
                                                    <path d="M6.4 20a9 9 0 1 1 11.2 0z" />
                                                </svg>
                                            </span>
                                            <span class="nav-link-title">
                                                Home
                                            </span>
                                        </router-link>
                                    </li>

                                    <template v-for="menu in menus" :key="menu.key">
                                        <li v-if="menu.childs.length > 0"
                                            :class="classActiveById(menu.id) + ' dropdown'">
                                            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"
                                                data-bs-auto-close="outside" role="button" aria-expanded="false">
                                                <span v-html="menu.icon"
                                                    class="nav-link-icon d-md-none d-lg-inline-block"></span>
                                                <span class="nav-link-title">
                                                    {{ menu.menu }}
                                                </span>
                                            </a>
                                            <div class="dropdown-menu">
                                                <template v-for="level2 in menu.childs" :key="level2.id">
                                                    <div class="dropend" v-if="level2.childs.length > 0">
                                                        <a class="dropdown-item dropdown-toggle" href="#"
                                                            data-bs-toggle="dropdown" data-bs-auto-close="outside"
                                                            role="button" aria-expanded="false">
                                                            {{ level2.menu }}
                                                        </a>
                                                        <div class="dropdown-menu">
                                                            <router-link v-for="level3 in level2.childs"
                                                                :key="level3.id" class="dropdown-item"
                                                                :to="level3.link">
                                                                <span class="nav-link-title">
                                                                    {{ level3.menu }}
                                                                </span>
                                                            </router-link>
                                                        </div>
                                                    </div>
                                                    <router-link v-else class="dropdown-item" :to="level2.link">
                                                        <span class="nav-link-title">
                                                            {{ level2.menu }}
                                                        </span>
                                                    </router-link>
                                                </template>
                                            </div>
                                        </li>
                                        <li v-else :class="classActiveById(menu.id)">
                                            <router-link class="nav-link" :to="menu.link">
                                                <span v-html="menu.icon"
                                                    class="nav-link-icon d-md-none d-lg-inline-block"></span>
                                                <span class="nav-link-title">
                                                    {{ menu.menu }}
                                                </span>
                                            </router-link>
                                        </li>
                                    </template>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <router-view></router-view>
    </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        let routeOpened = ref(route.path);

        watch(
            () => route.path,
            (newPath) => {
                routeOpened.value = newPath;
            }
        )

        const user_name = computed(function () {
            const data = store.getters.getUserName;
            return data;
        });

        const user_email = computed(function () {
            const data = store.getters.getUserEmail;
            return data;
        });

        const menus = computed(function () {
            const data = store.getters.getMenus;
            return data;
        });


        function classActive(reuteName) {
            if (routeOpened.value === reuteName) {
                return "nav-item active";
            }
            return "nav-item";
        }


        function classActiveById(menuId) {
            const listMenu = menus.value;
            const path = routeOpened.value;
            let isActive = false;

            for (let index1 = 0; index1 < listMenu.length; index1++) {
                const level1 = listMenu[index1];
                if (level1.link === path && level1.id === menuId) {
                    isActive = true;
                    break;
                }

                for (let index2 = 0; index2 < level1.childs.length; index2++) {
                    const level2 = level1.childs[index2];
                    if (level2.link === path && level1.id === menuId) {
                        isActive = true;
                        break;
                    }

                    for (let index3 = 0; index3 < level2.childs.length; index3++) {
                        const level3 = level2.childs[index3];
                        if (level3.link === path && level1.id === menuId) {
                            isActive = true;
                            break;
                        }
                    }
                }
            }

            if (isActive) {
                return "nav-item active";
            }
            return "nav-item";
        }

        function logout() {
            store.dispatch('logout');
            router.push('/login');
        }

        return {
            classActiveById,
            classActive,
            logout,

            user_name,
            user_email,
            menus,
        }
    }
}
</script>