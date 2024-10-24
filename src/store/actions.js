import { removeToken } from '../hooks/cookie_token'
import { removeCookie } from '@/hooks/helper';

export default {
    setToken(context, token) {
        context.commit('setToken', token);
    },
    setUserId(context, userId) {
        context.commit('setUserId', userId);
    },
    setUserRole(context, role) {
        context.commit('setUserRole', role);
    },
    setUserName(context, name) {
        context.commit('setUserName', name);
    },
    setUserEmail(context, email) {
        context.commit('setUserEmail', email);
    },

    resetMenu(context) {
        context.commit('resetMenu');
    },
    addMenu(context, menu) {
        menu.key = Math.floor(Math.random() * 100000);
        context.commit('addMenu', menu);
    },

    logout(context) {
        removeToken();
        removeCookie('menu');
        localStorage.clear();
        sessionStorage.clear();
        context.commit('logout');
    }
}