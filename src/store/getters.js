import { getToken } from '../hooks/cookie_token'

export default {
    getUserName(state) {
        let data = state.user_name;
        if (data === '') {
            data = localStorage.getItem('user_name');
        }
        return data;
    },
    getUserEmail(state) {
        let data = state.user_email;
        if (data === '') {
            data = localStorage.getItem('user_email');
        }
        return data;
    },

    getToken(state) {
        let data = state.token;
        if (data === '') {
            data = getToken();
        }
        return data;
    },

    getMenusFromState(state) {
        return state.indexMenus;
    },
    getMenus(state) {
        let menus = state.indexMenus;
        if (menus.length === 0) {
            menus = JSON.parse(localStorage.getItem('menus'));
        }
        return menus ?? [];
    }
}