import LoadingComponent from '@/components/LoadingComponent.vue';
import LoadingError from '@/components/LoadingError.vue';
import HeaderNav from '../components/layout/HeaderNav.vue';
import BodyArsipPage from '@/pages/arsip/BodyArsipPage.vue';
import FormAddFolder from '@/pages/arsip/FormAddFolder.vue';
import FormAddFile from '@/pages/arsip/FormAddFile.vue';

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
            props: true,
            children: [
                {
                    path: 'files/:folderId',
                    component: BodyArsipPage,
                    props: true,
                },
                {
                    path: 'files/:folderId/create_folder',
                    component: FormAddFolder,
                    props: true,
                },
                {
                    path: 'files/:folderId/create_file',
                    component: FormAddFile,
                    props: true,
                },
            ]
        },
    ],
};