const baseUrl = process.env.VUE_APP_API_URL;

/**
 * get list all menu
 * @param {string} token 
 * @returns 
 */
export async function apiGetListAllMenu(token) {
    const url = baseUrl + `master_menu`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const result = await response.json();
    if (!response.ok) {
        if (result.message_type === 'array') {
            return result;
        } else if (result.message == 'Unauthenticated.') {
            throw new Error("sesi telah login berakhir");
        }
        throw new Error(result.message || "Gagal terhubung ke server. Response code " + response.status);
    }
    return result;
}

/**
 * get list all menu without childs
 * @param {string} token 
 * @returns 
 */
export async function apiGetMenus(token) {
    const url = baseUrl + `master_menu/menus`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const result = await response.json();
    if (!response.ok) {
        if (result.message_type === 'array') {
            return result;
        } else if (result.message == 'Unauthenticated.') {
            throw new Error("sesi telah login berakhir");
        }
        throw new Error(result.message || "Gagal terhubung ke server. Response code " + response.status);
    }
    return result;
}

/**
 * Insert new menu
 * @param {string} token 
 * @param {object} menu 
 * @returns 
 */
export async function apiPostMenu(token, menu) {
    const url = baseUrl + 'master_menu';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(menu)
    });
    const result = await response.json();
    if (!response.ok) {
        if (result.message_type === 'array') {
            return result;
        } else if (result.message == 'Unauthenticated.') {
            throw new Error("sesi telah login berakhir");
        }
        throw new Error(result.message || "Gagal terhubung ke server. Response code " + response.status);
    }
    return result;
}

/**
 * update menu
 * @param {string} token
 * @param {int} menuId 
 * @param {object} menu 
 * @returns 
 */
export async function apiPutMenu(token, menuId, menu) {
    const url = baseUrl + 'master_menu/' + menuId;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(menu)
    });
    const result = await response.json();
    if (!response.ok) {
        if (result.message_type === 'array') {
            return result;
        } else if (result.message == 'Unauthenticated.') {
            throw new Error("sesi telah login berakhir");
        }
        throw new Error(result.message || "Gagal terhubung ke server. Response code " + response.status);
    }
    return result;
}

/**
 * Delete menu by Id
 * @param {string} token 
 * @param {int} menuId 
 * @returns 
 */
export async function apiDeleteMenu(token, menuId) {
    const url = baseUrl + 'master_menu/' + menuId;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const result = await response.json();
    if (!response.ok) {
        if (result.message_type === 'array') {
            return result;
        } else if (result.message == 'Unauthenticated.') {
            throw new Error("sesi telah login berakhir");
        }
        throw new Error(result.message || "Gagal terhubung ke server. Response code " + response.status);
    }
    return result;
}

/**
 * Show menu by menuId
 * @param {string} token 
 * @param {int} menuId 
 * @returns 
 */
export async function apiShowMenu(token, menuId) {
    const url = baseUrl + 'master_menu/' + menuId;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const result = await response.json();
    if (!response.ok) {
        if (result.message_type === 'array') {
            return result;
        } else if (result.message == 'Unauthenticated.') {
            throw new Error("sesi telah login berakhir");
        }
        throw new Error(result.message || "Gagal terhubung ke server. Response code " + response.status);
    }
    return result;
}