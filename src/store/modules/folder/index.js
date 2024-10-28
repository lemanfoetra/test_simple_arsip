
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    namespaced: true,
    state() {
        return {
            activeNameFolder: '',
            changeFolderList: 0,
        }
    },
    actions: actions,
    getters: getters,
    mutations: mutations,
}