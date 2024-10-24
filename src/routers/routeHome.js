import LoadingComponent from '@/components/LoadingComponent.vue';
import LoadingError from '@/components/LoadingError.vue';
import HeaderNav from '../components/layout/HeaderNav.vue';

import { defineAsyncComponent } from 'vue';

const IndexHomePage = defineAsyncComponent(
    {
        loader: () => import('../pages/home/IndexHomePage.vue'),
        loadingComponent: LoadingComponent,
        errorComponent: LoadingError,
    }
)

export default {
    path: '/home',
    component: HeaderNav,
    meta: {
        requiredAuth: true,
        requiredRole: false,
    },
    children: [
        {
            path: '',
            component: IndexHomePage,
        },
    ],
};