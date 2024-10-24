import mutations from './mutations';
import getters from './getters';
import actions from './actions';
import { createStore } from "vuex"

import usersModule from './modules/users/users';
import rolesModule from './modules/roles/roles';
import masterApi from './modules/masterApi';
import masterMenu from './modules/masterMenu';

const store = createStore({
    modules: {
        users: usersModule,
        roles: rolesModule,
        apis: masterApi,
        menus: masterMenu,
    },
    state() {
        return {
            token: '',
            user_id: '',
            user_role: '',
            user_name: '',
            user_email: '',

            indexMenus: [],
        }
    },
    mutations: mutations,
    getters: getters,
    actions: actions,
});
export default store;