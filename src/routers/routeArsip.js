import LoadingComponent from '@/components/LoadingComponent.vue';
import LoadingError from '@/components/LoadingError.vue';
import HeaderNav from '../components/layout/HeaderNav.vue';

import { defineAsyncComponent } from 'vue';

const IndexArsipPage = defineAsyncComponent(
    {
        loader: () => import('../pages/arsip/IndexArsipPage.vue'),
        loadingComponent: LoadingComponent,
        errorComponent: LoadingError,
    }
)

export default {
    path: '/arsip',
    component: HeaderNav,
    meta: {
        requiredAuth: true,
        requiredRole: false,
    },
    children: [
        {
            path: '',
            component: IndexArsipPage,
        },
    ],
};