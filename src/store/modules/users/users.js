import './actions';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    namespaced: true,
    state() {
        return {
            idUserShow: '',
            users: [],
            userShow: null,
        }
    },
    actions: actions,
    getters: getters,
    mutations: mutations,
}