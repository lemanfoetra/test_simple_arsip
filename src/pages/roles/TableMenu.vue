<template>
    <div>
        <div class="card mb-2">
            <div class="tools">
                <div class="tools__item">
                    <button type="button" @click="onDeleteClick" class="tools__item__button tools__danger btn-sm"
                        :disabled="idMenuSelected.length > 0 ? false : true">
                        <span v-if="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4 7l16 0" />
                                <path d="M10 11l0 6" />
                                <path d="M14 11l0 6" />
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                        </span>
                        <span v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"
                                class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 6l0 -3" />
                                <path d="M16.25 7.75l2.15 -2.15" />
                                <path d="M18 12l3 0" />
                                <path d="M16.25 16.25l2.15 2.15" />
                                <path d="M12 18l0 3" />
                                <path d="M7.75 16.25l-2.15 2.15" />
                                <path d="M6 12l-3 0" />
                                <path d="M7.75 7.75l-2.15 -2.15" />
                            </svg>
                        </span>
                    </button>
                </div>

                <div class="tools__item__right">
                    <button @click="addRoleMenu" type="button" class="tools__item__button tools__primary btn-sm"
                        :disabled="roleMenuIdActive !== '' ? false : true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-plus">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 5l0 14" />
                            <path d="M5 12l14 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="table-responsive">
                <table class="table table-hover table-stripded">
                    <thead>
                        <tr>
                            <th style="width: 30px;"></th>
                            <th>Menu</th>
                            <th>CREATE</th>
                            <th>UPDATE</th>
                            <th>DELETE</th>
                            <th>PRINT</th>
                        </tr>
                    </thead>
                    <tbody v-if="loadingTable">
                        <tr>
                            <td class="text-center" colspan="10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 6l0 -3" />
                                    <path d="M16.25 7.75l2.15 -2.15" />
                                    <path d="M18 12l3 0" />
                                    <path d="M16.25 16.25l2.15 2.15" />
                                    <path d="M12 18l0 3" />
                                    <path d="M7.75 16.25l-2.15 2.15" />
                                    <path d="M6 12l-3 0" />
                                    <path d="M7.75 7.75l-2.15 -2.15" />
                                </svg>
                                Memuat data...
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else-if="!loadingTable && roleMenus.length === 0">
                        <tr>
                            <td colspan="10" class="text-center">Belum ada data.</td>
                        </tr>
                    </tbody>
                    <tbody v-else-if="!loadingTable && roleMenus.length > 0">
                        <template v-for="(menu) in roleMenus" :key="menu.key">
                            <tr :class="classMenuShowed(menu.id_menus)">
                                <td>
                                    <input type="checkbox" class="form-check-input" v-model="idMenuSelected"
                                        :value="menu.id" :key="menu.key">
                                </td>
                                <td @click="onClickToShow(menu.id_menus)" class="cursor__click">
                                    {{ menu.menu }}
                                </td>
                                <td>
                                    <div v-if="(loadingSetAccess[menu.id_menus + '_C'] || false)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 6l0 -3" />
                                            <path d="M16.25 7.75l2.15 -2.15" />
                                            <path d="M18 12l3 0" />
                                            <path d="M16.25 16.25l2.15 2.15" />
                                            <path d="M12 18l0 3" />
                                            <path d="M7.75 16.25l-2.15 2.15" />
                                            <path d="M6 12l-3 0" />
                                            <path d="M7.75 7.75l-2.15 -2.15" />
                                        </svg>
                                    </div>
                                    <div v-else>
                                        <label class="form-check form-check-single form-switch">
                                            <input type="checkbox" v-model="roleMenusAccessFunc"
                                                @change="setAccessFunction(menu.id_roles, menu.id_menus, menu.id_menus + '_C')"
                                                class="form-check-input" :value="menu.id_menus + '_C'">
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <div v-if="(loadingSetAccess[menu.id_menus + '_U'] || false)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 6l0 -3" />
                                            <path d="M16.25 7.75l2.15 -2.15" />
                                            <path d="M18 12l3 0" />
                                            <path d="M16.25 16.25l2.15 2.15" />
                                            <path d="M12 18l0 3" />
                                            <path d="M7.75 16.25l-2.15 2.15" />
                                            <path d="M6 12l-3 0" />
                                            <path d="M7.75 7.75l-2.15 -2.15" />
                                        </svg>
                                    </div>
                                    <div v-else>
                                        <label class="form-check form-check-single form-switch">
                                            <input type="checkbox" v-model="roleMenusAccessFunc"
                                                @change="setAccessFunction(menu.id_roles, menu.id_menus, menu.id_menus + '_U')"
                                                class="form-check-input" :value="menu.id_menus + '_U'">
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <div v-if="(loadingSetAccess[menu.id_menus + '_D'] || false)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 6l0 -3" />
                                            <path d="M16.25 7.75l2.15 -2.15" />
                                            <path d="M18 12l3 0" />
                                            <path d="M16.25 16.25l2.15 2.15" />
                                            <path d="M12 18l0 3" />
                                            <path d="M7.75 16.25l-2.15 2.15" />
                                            <path d="M6 12l-3 0" />
                                            <path d="M7.75 7.75l-2.15 -2.15" />
                                        </svg>
                                    </div>
                                    <div v-else>
                                        <label class="form-check form-check-single form-switch">
                                            <input type="checkbox" v-model="roleMenusAccessFunc"
                                                @change="setAccessFunction(menu.id_roles, menu.id_menus, menu.id_menus + '_D')"
                                                class="form-check-input" :value="menu.id_menus + '_D'">
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <div v-if="(loadingSetAccess[menu.id_menus + '_P'] || false)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 6l0 -3" />
                                            <path d="M16.25 7.75l2.15 -2.15" />
                                            <path d="M18 12l3 0" />
                                            <path d="M16.25 16.25l2.15 2.15" />
                                            <path d="M12 18l0 3" />
                                            <path d="M7.75 16.25l-2.15 2.15" />
                                            <path d="M6 12l-3 0" />
                                            <path d="M7.75 7.75l-2.15 -2.15" />
                                        </svg>
                                    </div>
                                    <div v-else>
                                        <label class="form-check form-check-single form-switch">
                                            <input type="checkbox" v-model="roleMenusAccessFunc"
                                                @change="setAccessFunction(menu.id_roles, menu.id_menus, menu.id_menus + '_P')"
                                                class="form-check-input" :value="menu.id_menus + '_P'">
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <!-- menu level 2-->
                            <template v-for="(menuLev2) in menu.childs" :key="menuLev2.id">
                                <tr :class="classMenuShowed(menuLev2.id_menus)">
                                    <td>
                                        <input type="checkbox" class="form-check-input" v-model="idMenuSelected"
                                            :value="menuLev2.id">
                                    </td>
                                    <td @click="onClickToShow(menuLev2.id_menus)" class="cursor__click">
                                        - {{ menuLev2.menu }}
                                    </td>
                                    <td>
                                        <div v-if="(loadingSetAccess[menuLev2.id_menus + '_C'] || false)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M12 6l0 -3" />
                                                <path d="M16.25 7.75l2.15 -2.15" />
                                                <path d="M18 12l3 0" />
                                                <path d="M16.25 16.25l2.15 2.15" />
                                                <path d="M12 18l0 3" />
                                                <path d="M7.75 16.25l-2.15 2.15" />
                                                <path d="M6 12l-3 0" />
                                                <path d="M7.75 7.75l-2.15 -2.15" />
                                            </svg>
                                        </div>
                                        <div v-else>
                                            <label class="form-check form-check-single form-switch">
                                                <input type="checkbox" v-model="roleMenusAccessFunc"
                                                    @change="setAccessFunction(menuLev2.id_roles, menuLev2.id_menus, menuLev2.id_menus + '_C')"
                                                    class="form-check-input" :value="menuLev2.id_menus + '_C'">
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                        <div v-if="(loadingSetAccess[menuLev2.id_menus + '_U'] || false)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M12 6l0 -3" />
                                                <path d="M16.25 7.75l2.15 -2.15" />
                                                <path d="M18 12l3 0" />
                                                <path d="M16.25 16.25l2.15 2.15" />
                                                <path d="M12 18l0 3" />
                                                <path d="M7.75 16.25l-2.15 2.15" />
                                                <path d="M6 12l-3 0" />
                                                <path d="M7.75 7.75l-2.15 -2.15" />
                                            </svg>
                                        </div>
                                        <div v-else>
                                            <label class="form-check form-check-single form-switch">
                                                <input type="checkbox" v-model="roleMenusAccessFunc"
                                                    @change="setAccessFunction(menuLev2.id_roles, menuLev2.id_menus, menuLev2.id_menus + '_U')"
                                                    class="form-check-input" :value="menuLev2.id_menus + '_U'">
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                        <div v-if="(loadingSetAccess[menuLev2.id_menus + '_D'] || false)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M12 6l0 -3" />
                                                <path d="M16.25 7.75l2.15 -2.15" />
                                                <path d="M18 12l3 0" />
                                                <path d="M16.25 16.25l2.15 2.15" />
                                                <path d="M12 18l0 3" />
                                                <path d="M7.75 16.25l-2.15 2.15" />
                                                <path d="M6 12l-3 0" />
                                                <path d="M7.75 7.75l-2.15 -2.15" />
                                            </svg>
                                        </div>
                                        <div v-else>
                                            <label class="form-check form-check-single form-switch">
                                                <input type="checkbox" v-model="roleMenusAccessFunc"
                                                    @change="setAccessFunction(menuLev2.id_roles, menuLev2.id_menus, menuLev2.id_menus + '_D')"
                                                    class="form-check-input" :value="menuLev2.id_menus + '_D'">
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                        <div v-if="(loadingSetAccess[menuLev2.id_menus + '_P'] || false)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M12 6l0 -3" />
                                                <path d="M16.25 7.75l2.15 -2.15" />
                                                <path d="M18 12l3 0" />
                                                <path d="M16.25 16.25l2.15 2.15" />
                                                <path d="M12 18l0 3" />
                                                <path d="M7.75 16.25l-2.15 2.15" />
                                                <path d="M6 12l-3 0" />
                                                <path d="M7.75 7.75l-2.15 -2.15" />
                                            </svg>
                                        </div>
                                        <div v-else>
                                            <label class="form-check form-check-single form-switch">
                                                <input type="checkbox" v-model="roleMenusAccessFunc"
                                                    @change="setAccessFunction(menuLev2.id_roles, menuLev2.id_menus, menuLev2.id_menus + '_P')"
                                                    class="form-check-input" :value="menuLev2.id_menus + '_P'">
                                            </label>
                                        </div>
                                    </td>
                                </tr>

                                <!-- menu level 3-->
                                <template v-for="(menuLev3) in menuLev2.childs" :key="menuLev3.id">
                                    <tr :class="classMenuShowed(menuLev3.id_menus)">
                                        <td>
                                            <input type="checkbox" class="form-check-input" v-model="idMenuSelected"
                                                :value="menuLev3.id">
                                        </td>
                                        <td @click="onClickToShow(menuLev3.id_menus)" class="cursor__click">
                                            -- {{ menuLev3.menu }}
                                        </td>
                                        <td>
                                            <div v-if="(loadingSetAccess[menuLev3.id_menus + '_C'] || false)">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M12 6l0 -3" />
                                                    <path d="M16.25 7.75l2.15 -2.15" />
                                                    <path d="M18 12l3 0" />
                                                    <path d="M16.25 16.25l2.15 2.15" />
                                                    <path d="M12 18l0 3" />
                                                    <path d="M7.75 16.25l-2.15 2.15" />
                                                    <path d="M6 12l-3 0" />
                                                    <path d="M7.75 7.75l-2.15 -2.15" />
                                                </svg>
                                            </div>
                                            <div v-else>
                                                <label class="form-check form-check-single form-switch">
                                                    <input type="checkbox" v-model="roleMenusAccessFunc"
                                                        @change="setAccessFunction(menuLev3.id_roles, menuLev3.id_menus, menuLev3.id_menus + '_C')"
                                                        class="form-check-input" :value="menuLev3.id_menus + '_C'">
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <div v-if="(loadingSetAccess[menuLev3.id_menus + '_U'] || false)">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M12 6l0 -3" />
                                                    <path d="M16.25 7.75l2.15 -2.15" />
                                                    <path d="M18 12l3 0" />
                                                    <path d="M16.25 16.25l2.15 2.15" />
                                                    <path d="M12 18l0 3" />
                                                    <path d="M7.75 16.25l-2.15 2.15" />
                                                    <path d="M6 12l-3 0" />
                                                    <path d="M7.75 7.75l-2.15 -2.15" />
                                                </svg>
                                            </div>
                                            <div v-else>
                                                <label class="form-check form-check-single form-switch">
                                                    <input type="checkbox" v-model="roleMenusAccessFunc"
                                                        @change="setAccessFunction(menuLev3.id_roles, menuLev3.id_menus, menuLev3.id_menus + '_U')"
                                                        class="form-check-input" :value="menuLev3.id_menus + '_U'">
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <div v-if="(loadingSetAccess[menuLev3.id_menus + '_D'] || false)">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M12 6l0 -3" />
                                                    <path d="M16.25 7.75l2.15 -2.15" />
                                                    <path d="M18 12l3 0" />
                                                    <path d="M16.25 16.25l2.15 2.15" />
                                                    <path d="M12 18l0 3" />
                                                    <path d="M7.75 16.25l-2.15 2.15" />
                                                    <path d="M6 12l-3 0" />
                                                    <path d="M7.75 7.75l-2.15 -2.15" />
                                                </svg>
                                            </div>
                                            <div v-else>
                                                <label class="form-check form-check-single form-switch">
                                                    <input type="checkbox" v-model="roleMenusAccessFunc"
                                                        @change="setAccessFunction(menuLev3.id_roles, menuLev3.id_menus, menuLev3.id_menus + '_D')"
                                                        class="form-check-input" :value="menuLev3.id_menus + '_D'">
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <div v-if="(loadingSetAccess[menuLev3.id_menus + '_P'] || false)">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M12 6l0 -3" />
                                                    <path d="M16.25 7.75l2.15 -2.15" />
                                                    <path d="M18 12l3 0" />
                                                    <path d="M16.25 16.25l2.15 2.15" />
                                                    <path d="M12 18l0 3" />
                                                    <path d="M7.75 16.25l-2.15 2.15" />
                                                    <path d="M6 12l-3 0" />
                                                    <path d="M7.75 7.75l-2.15 -2.15" />
                                                </svg>
                                            </div>
                                            <div v-else>
                                                <label class="form-check form-check-single form-switch">
                                                    <input type="checkbox" v-model="roleMenusAccessFunc"
                                                        @change="setAccessFunction(menuLev3.id_roles, menuLev3.id_menus, menuLev3.id_menus + '_P')"
                                                        class="form-check-input" :value="menuLev3.id_menus + '_P'">
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                </template>

                            </template>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue'
import Swal from 'sweetalert2/dist/sweetalert2';
import { getRoleMenus, deleteRoleMenu, setRoleMenuAccess } from '../../hooks/api_role';
import { useStore } from 'vuex'


const store = useStore();
const emit = defineEmits(['onAdd', 'onDelete', 'onClickShow']);
const loadingTable = ref(false);
const loadingDelete = ref(false);
const loadingSetAccess = ref([]);
const roleMenus = ref([]);
const roleMenusAccessFunc = ref([]);
const idMenuSelected = ref([]);
const roleMenuIdActive = ref('');
const idMenuShowed = ref('');

watch(() => store.getters['roles/getRoleIdClickShow'], async (newValue) => {
    roleMenuIdActive.value = newValue;
    console.log('[menus] show role : ', newValue);
    if (newValue === 0 || newValue === '') {
        store.dispatch('roles/resetRoleMenus');
    } else {
        await loadRoleMenus(newValue);
    }
});

watch(() => store.getters['roles/getRoleMenus'], (newValue) => {
    roleMenus.value = newValue;
    idMenuShowed.value = '';
});


async function loadRoleMenus(roleId) {
    try {
        loadingTable.value = true;
        const token = store.getters.getToken;
        const result = await getRoleMenus(token, roleId);

        if (result.success === true) {

            store.dispatch('roles/resetRoleMenus');
            roleMenusAccessFunc.value = [];

            result.data.menus.forEach(menu => {
                const newMenu = {
                    id: menu.id,
                    id_menus: menu.id_menus,
                    id_roles: menu.id_roles,
                    menu: menu.menu,
                    link: menu.link,
                    accessFunctions: menu.access_function,
                    childs: menu.childs,
                }
                store.dispatch('roles/addRoleMenus', newMenu);

                menu.access_function.forEach(access => {
                    const newAccess = `${menu.id_menus}_${access}`;
                    roleMenusAccessFunc.value.push(newAccess)
                });

                // LEVEL 2
                if (menu.childs.length > 0) {
                    menu.childs.forEach(level2 => {
                        level2.access_function.forEach(access2 => {
                            const newAccess2 = `${level2.id_menus}_${access2}`;
                            roleMenusAccessFunc.value.push(newAccess2)
                        });

                        // LEVEL 3
                        if (level2.childs.length > 0) {
                            level2.childs.forEach(level3 => {
                                level3.access_function.forEach(access3 => {
                                    const newAccess3 = `${level3.id_menus}_${access3}`;
                                    roleMenusAccessFunc.value.push(newAccess3)
                                });
                            })
                        }
                    })
                }
            });
        }
        loadingTable.value = false;
    } catch (error) {
        Swal.fire({
            icon: "error",
            text: error.message,
        });
    }
}


function classMenuShowed(menuId) {
    if (idMenuShowed.value === menuId) {
        return "table-selected";
    }
    return "";
}


function addRoleMenu() {
    emit('onAdd');
}


function onClickToShow(menuId) {
    idMenuShowed.value = menuId;
    emit('onClickShow', menuId)
}


async function onDeleteClick() {
    if (!confirm('Yakin hapus?')) {
        return;
    }

    loadingDelete.value = true;
    try {
        const token = store.getters.getToken;
        const roleId = store.getters['roles/getRoleIdClickShow'];

        if (idMenuSelected.value.length > 0) {
            for await (const id of idMenuSelected.value) {
                const result = await deleteRoleMenu(token, roleId, id);
                if (result.success !== true) {
                    throw new Error(result.message)
                }
                store.dispatch('roles/deleteRoleMenu', id);
            }
            idMenuSelected.value = [];
        }
        Swal.fire({
            icon: "success",
            text: "Hapus data berhasil.",
        });
        loadingDelete.value = false;
    } catch (error) {
        Swal.fire({
            icon: "error",
            text: error.message,
        });
        loadingDelete.value = false;
    }
}

async function setAccessFunction(roleId, menuId, key) {
    loadingSetAccess.value[key] = true;
    const access_code = key.split('_')[1];
    let access_status = 'N';
    roleMenusAccessFunc.value.forEach(status => {
        if (status === key) {
            access_status = 'Y';
        }
    });

    try {
        const token = store.getters.getToken;
        const post = {
            access_status: access_status,
            access_code: access_code,
        };
        const result = await setRoleMenuAccess(token, roleId, menuId, post);
        if (result.success !== true) {
            throw new Error(result.message);
        }
        loadingSetAccess.value[key] = false;
    } catch (error) {
        Swal.fire({
            icon: "error",
            text: error.message,
        });
        loadingSetAccess.value[key] = false;
    }
}
</script>

<style scoped>
.form-switch {
    padding-left: 0px !important;
}
</style>