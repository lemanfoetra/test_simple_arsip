import { defineAsyncComponent } from 'vue';

import HeaderNav from '../components/layout/HeaderNav.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import LoadingError from '@/components/LoadingError.vue';

const IndexUsersPage = defineAsyncComponent(
    {
        loader: () => import("../pages/users/IndexUsersPage.vue"),
        loadingComponent: LoadingComponent,
        errorComponent: LoadingError,
    })

export default {
    path: '/users',
    component: HeaderNav,
    meta: {
        requiredAuth: true,
        requiredRole: true,
    },
    children: [
        {
            path: '',
            component: IndexUsersPage,
        },
    ],
};