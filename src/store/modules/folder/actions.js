export default {
    activeNameFolder(context, name) {
        context.commit('activeNameFolder', name);
    },
    changeFolderList(context, value) {
        context.commit('changeFolderList', value);
    },
}