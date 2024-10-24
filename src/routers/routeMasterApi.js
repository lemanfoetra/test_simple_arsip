
import { defineAsyncComponent } from 'vue';

import HeaderNav from '../components/layout/HeaderNav.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import LoadingError from '@/components/LoadingError.vue';

const IndexMasterApi = defineAsyncComponent(
    {
        loader: () => import("../pages/masterApi/IndexMasterApi.vue"),
        loadingComponent: LoadingComponent,
        errorComponent: LoadingError,
    })

export default {
    path: '/master_api',
    component: HeaderNav,
    meta: {
        requiredAuth: true,
        requiredRole: true,
    },
    children: [
        {
            path: '',
            component: IndexMasterApi,
        },
    ],
};