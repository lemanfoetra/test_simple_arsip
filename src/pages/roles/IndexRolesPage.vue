<template>
    <div>
        <div class="page-wrapper">
            <!-- Page header -->
            <div class="page-header d-print-none">
                <div class="container-xl">
                    <div class="row g-2 align-items-center">
                        <div class="col">
                            <h2 class="page-title">
                                Master Role
                            </h2>
                        </div>

                        <div class="col-auto ms-auto d-print-none">
                            <div class="btn-list">
                                <button type="button" class="btn btn-primary d-none d-sm-inline-block"
                                    @click="onAddRole">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="icon">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 5l0 14" />
                                        <path d="M5 12l14 0" />
                                    </svg>
                                    Add Role
                                </button>
                                <button type="button" class="btn btn-primary d-sm-none btn-icon " @click="onAddRole">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="icon">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 5l0 14" />
                                        <path d="M5 12l14 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body">
            <div class="container-xl">
                <div class="row">
                    <div class="col-md-12 mb-3">
                        <table-roles @on-edit="onEditRole" @on-click-show="onRoleClickToShow"></table-roles>
                    </div>

                    <div class="col-md-6 mb-3">
                        <table-menu @on-add="onRoleMenuAdd" @on-click-show="onRoleMenuClickShow"></table-menu>
                    </div>
                    <div class="col-md-6 mb-3">
                        <table-api></table-api>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal modal-blur fade" id="modal-role" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <button id="open-modal-role" data-bs-toggle="modal" data-bs-target="#modal-role" style="display: none"></button>
            <button id="close-modal-role" data-bs-dismiss="modal" aria-label="Close" style="display: none"></button>
            <form-role @on-submit="onSubmitRole"></form-role>
        </div>
    </div>


    <div class="modal modal-blur fade" id="modal-role-menu" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <button id="open-modal-role-menu" data-bs-toggle="modal" data-bs-target="#modal-role-menu" style="display: none"></button>
            <button id="close-modal-role-menu" data-bs-dismiss="modal" aria-label="Close" style="display: none"></button>
            <form-role-menu @on-submit="onRoleMenuSubmit"></form-role-menu>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

import { useStore } from 'vuex';

import TableRoles from './TableRoles.vue'
import TableMenu from './TableMenu.vue';
import TableApi from './TableAPI.vue';
import FormRole from './components/FormRole.vue';
import FormRoleMenu from './components/FormRoleMenu.vue'

const store = useStore();

onMounted(() => {
    store.dispatch('roles/setRoleIdClickShow', '');
    store.dispatch('roles/setRoleMenuIdClickShow', '');
})


function onAddRole() {
    store.dispatch('roles/setRoleIdForCRUD', 0);
    document.getElementById('open-modal-role').click();
}

function onEditRole(roleId) {
    store.dispatch('roles/setRoleIdForCRUD', roleId);
    document.getElementById('open-modal-role').click();
}

function onSubmitRole() {
    store.dispatch('roles/setRoleIdForCRUD', '');
    store.dispatch('roles/resetRoleIdSelected');
    document.getElementById('close-modal-role').click();
}

function onRoleClickToShow(roleId) {
    store.dispatch('roles/setRoleIdClickShow', roleId);
}

function onRoleMenuAdd() {
    store.dispatch('roles/setRoleMenuIdForCRUD', 0);
    document.getElementById('open-modal-role-menu').click();
}

function onRoleMenuSubmit() {
    store.dispatch('roles/setRoleMenuIdForCRUD', '');
    document.getElementById('close-modal-role-menu').click();
}

function onRoleMenuClickShow(menuId) {
    store.dispatch('roles/setRoleMenuIdClickShow', menuId);
}

</script>
