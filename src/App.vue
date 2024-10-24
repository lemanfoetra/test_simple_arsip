<template>
	<div v-if="loadingLoadMenu">
		<div class="page page-center">
			<div class="container container-slim py-4">
				<div class="text-center">
					<div class="mb-3">
						<a href="#" class="navbar-brand navbar-brand-autodark"></a>
					</div>
					<div class="text-secondary mb-3">Preparing application</div>
					<div class="progress progress-sm">
						<div class="progress-bar progress-bar-indeterminate"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div v-else>
		<router-view></router-view>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
import { setToken } from './hooks/cookie_token'
import { loadBaseMenus, refreshToken } from './hooks/api_base'
// import { setCookie } from './hooks/helper';
import Swal from 'sweetalert2/dist/sweetalert2';


const store = useStore();
const router = useRouter();

const loadingLoadMenu = ref(false);

onMounted(async () => {
	const token = store.getters.getToken;
	if ((token ?? '') !== '') {
		loadingLoadMenu.value = true;
		await bundleLoad(token);
		loadingLoadMenu.value = false;
	}
})


async function bundleLoad() {
	try {
		await createNewToken();
		// await loadMenuAccess();
		await loadMenus();
	} catch (error) {
		Swal.fire({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,

			icon: 'warning',
			title: 'Warning',
			text: error.message,
		});

		if (error.message === 'sesi telah login berakhir') {
			store.dispatch('logout');
			router.push('/login');
		}
	}
}


async function createNewToken() {

	const token = store.getters.getToken;
	const result = await refreshToken(token);

	// SAVE
	store.dispatch('setToken', result.access_token);
	store.dispatch('setUserId', result.user.id);
	store.dispatch('setUserRole', result.user.id_role);
	store.dispatch('setUserName', result.user.name);
	store.dispatch('setUserEmail', result.user.email);

	setToken(result.access_token);
	localStorage.setItem('user_id', result.user.id);
	localStorage.setItem('user_role', result.user.id_role);
	localStorage.setItem('user_name', result.user.name);
	localStorage.setItem('user_email', result.user.email);
}


async function loadMenus() {

	const token = store.getters.getToken;
	const result = await loadBaseMenus(token);

	if (result.success !== true) {
		throw new Error(result.message);
	}

	// SET MENU
	const menus = result.data;
	if (menus.length > 0) {
		// Reset menu in store
		store.dispatch('resetMenu');

		// Rest menu in local storage
		localStorage.setItem('menus', []);

		const menuForLocalStorage = [];
		menus.forEach(menu => {
			// add menu to store
			store.dispatch('addMenu', menu);
			// add menu to local storage
			menuForLocalStorage.push(menu);
		});

		// add menu in local storate
		localStorage.setItem('menus', JSON.stringify(menuForLocalStorage));
	}
}


// async function loadMenuAccess() {
// 	const token = store.getters.getToken;
// 	const result = await menuAccess(token);
// 	if (result.success !== true) {
// 		throw new Error(result.message);
// 	}
// 	const data = JSON.stringify(result.data);
// 	setCookie('menu', data);
// }


</script>

<style>
.tools {
	padding: 10px;
}

.tools__item {
	float: left;
	margin-right: 5px;
}

.tools__item__right {
	float: right;
	margin-left: 5px;
}

.tools__item__button {
	background-color: transparent;
	padding: 5px 8px 5px 8px;
	border-radius: 3px;
}

.tools__item__button:hover {
	background-color: antiquewhite;
}

.tools__item__button:disabled {
	border: 1px solid rgb(204, 203, 203);
	background-color: transparent;
	color: rgb(190, 189, 188);
}

.filter__item__input {
	padding: 5px;
	border: 1px solid rgb(204, 203, 203);
}

.tools__danger {
	border: 1px solid rgb(220, 78, 65);
	color: rgb(220, 78, 65);
}

.tools__primary {
	border: 1px solid rgb(44, 141, 219);
	color: rgb(44, 141, 219);
}

.cursor__click {
	cursor: pointer;
}

.table-selected {
	background-color: #f2f5f3;
	font-weight: 600;
}

.form-switch {
	padding-left: 0px !important;
}
</style>