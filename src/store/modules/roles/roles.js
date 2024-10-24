import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    namespaced: true,
    state() {
        return {
            roles: [],

            roleIdSelected: [],

            // Untuk crud. 0 = add, [berisi id] = edit
            roleIdForCRUD: '',

            // Jika role dipilih maka list roles dan list api akan me reload karena me (watch) var ini
            roleIdClickShow: '',

            /**
             * Pengelolaan List Menu
             */
            menus: [],
            roleMenus: [],
            roleMenuIdForCRUD: '',  // ID role menu pada list role menu untuk CRUD
            roleMenuIdClickShow: '',

            /**
             * Pengelolaan List Api
             */
            apis: [],
            roleMenuApis: [],
        }
    },
    actions: actions,
    getters: getters,
    mutations: mutations,
}