export default {
    resetApis(context) {
        context.commit('resetApis');
    },
    addApiInFirst(context, api) {
        api.key = Math.floor(Math.random() * 100000);
        context.commit('addApiInFirst', api);
    },
    addApi(context, api) {
        api.key = Math.floor(Math.random() * 100000);
        context.commit('addApi', api);
    },
    deleteApi(context, apiId) {
        context.commit('deleteApi', apiId);
    },
    setApiShow(context, api) {
        api.key = Math.floor(Math.random() * 100000);
        context.commit('setApiShow', api);
    },
    setIdApiShow(context, idApiShow) {
        context.commit('setIdApiShow', idApiShow);
    },
    resetListMenu(context) {
        context.commit('resetListMenu');
    },
    addListMenu(context, menu) {
        menu.key = Math.floor(Math.random() * 100000);
        context.commit('addListMenu', menu);
    },
}