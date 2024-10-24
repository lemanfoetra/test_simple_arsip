import { defineAsyncComponent } from 'vue';

import HeaderNav from '../components/layout/HeaderNav.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import LoadingError from '@/components/LoadingError.vue';

const IndexMasterMenu = defineAsyncComponent(
    {
        loader: () => import("../pages/masterMenu/IndexMasterMenu.vue"),
        loadingComponent: LoadingComponent,
        errorComponent: LoadingError,
    })

export default {
    path: '/master_menu',
    component: HeaderNav,
    meta: {
        requiredAuth: true,
        requiredRole: true,
    },
    children: [
        {
            path: '',
            component: IndexMasterMenu,
        },
    ],
};