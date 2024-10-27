
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    namespaced: true,
    state() {
        return {
            activeNameFolder: '',
        }
    },
    actions: actions,
    getters: getters,
    mutations: mutations,
}