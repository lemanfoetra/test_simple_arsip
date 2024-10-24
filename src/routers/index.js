import { createRouter, createWebHistory } from 'vue-router'

import store from '../store/index';
import IndexLoadingPage from '../pages/loading/IndexLoadingPage.vue';
import IndexLoginPage from '../pages/login/IndexLoginPage.vue';

import routeHome from './routeHome';
import routeRoles from './routeRoles';
import routeUsers from './routeUsers';
import routeMasterApi from './routeMasterApi';
import routeMasterMenu from './routeMasterMenus';
import routeArsip from './routeArsip';

let routes = [
    {
        path: '/',
        component: IndexLoginPage,
        meta: {
            requiredAuth: false,
            requiredRole: false,
        },
    },
    {
        path: '/login',
        component: IndexLoginPage,
        meta: {
            requiredAuth: false,
            requiredRole: false,
        },
    },
    {
        path: '/loading',
        component: IndexLoadingPage,
        meta: {
            requiredAuth: true,
            requiredRole: false,
        },
    },
];

// ADD ROUTES
routes.push(routeHome);
routes.push(routeRoles);
routes.push(routeUsers);
routes.push(routeMasterApi);
routes.push(routeMasterMenu);
routes.push(routeArsip);

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// CHECK AUTH
router.beforeEach(function (to, _, next) {

    // Get parrent path
    const path = to.path.split('/')[1];

    if ((to.path === '/' || to.path === '/login') && isAuthenticated()) {
        next('/home');
    }

    // TOLAK JIKA TIDAK MEMILIKI AUTH
    if (to.meta.requiredAuth && !isAuthenticated()) {
        next('/login');
    } else if (to.meta.requiredRole && !isRequiredRole(path)) {
        next('/home');
    } else {
        next();
    }
})

/**
 * Pengecekan token
 * @returns true jika token valid
 */
function isAuthenticated() {
    const token = store.getters.getToken;
    return !!token;
}

/**
 * Pengecekan role
 * @param {string} path 
 * @returns true jika punya role
 */
function isRequiredRole(path) {
    const menus = store.getters.getMenus;
    let isHaveAccess = false;
    for (let index1 = 0; index1 < menus.length; index1++) {
        const level1 = menus[index1];
        if (level1.link === `/${path}`) {
            isHaveAccess = true;
            break;
        }

        for (let index2 = 0; index2 < (level1.childs.length ?? []); index2++) {
            const level2 = level1.childs[index2];
            if (level2.link === `/${path}`) {
                isHaveAccess = true;
                break;
            }

            for (let index3 = 0; index3 < (level2.childs.length ?? []); index3++) {
                const level3 = level2.childs[index3];
                if (level3.link === `/${path}`) {
                    isHaveAccess = true;
                    break;
                }
            }
        }
    }
    return isHaveAccess;
}

export default router;