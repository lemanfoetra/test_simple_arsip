import { defineAsyncComponent } from 'vue';

import HeaderNav from '../components/layout/HeaderNav.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import LoadingError from '@/components/LoadingError.vue';

const IndexRolesPage = defineAsyncComponent(
    {
        loader: () => import("../pages/roles/IndexRolesPage.vue"),
        loadingComponent: LoadingComponent,
        errorComponent: LoadingError,
    })

export default {
    path: '/roles',
    component: HeaderNav,
    meta: {
        requiredAuth: true,
        requiredRole: true,
    },
    children: [
        {
            path: '',
            component: IndexRolesPage,
        },
    ],
};