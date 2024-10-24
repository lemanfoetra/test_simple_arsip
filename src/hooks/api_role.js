const baseUrl = process.env.VUE_APP_API_URL;
/**
 * Load list role
 * @param {string} token 
 * @returns array role
 */
export async function loadListRole(token) {
    const url = baseUrl + 'role';

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
 * Save new role
 * @param {string} token 
 * @param {object} role 
 * @returns 
 */
export async function postRole(token, role) {
    const url = baseUrl + 'role';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(role)
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


export async function getRole(token, roleId) {
    const url = baseUrl + 'role/' + roleId;

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


export async function updateRole(token, roleId, role) {
    const url = baseUrl + 'role/' + roleId;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(role)
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
 * Delete Role by Id
 * @param {string} token 
 * @param {number} roleId 
 * @returns 
 */
export async function deleteRole(token, roleId) {
    const url = baseUrl + 'role/' + roleId;

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


export async function getRoleMenus(token, roleId) {
    const url = `${baseUrl}role/${roleId}/menus`;

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


export async function getAllMenus(token) {
    const url = `${baseUrl}role/menus`;

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


export async function postRoleMenu(token, roleId, menu) {
    const url = `${baseUrl}role/${roleId}/menus`;

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


export async function deleteRoleMenu(token, roleId, roleMenuId) {
    const url = `${baseUrl}role/${roleId}/menus/${roleMenuId}`;

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


export async function setRoleMenuAccess(token, roleId, menuId, post) {
    const url = `${baseUrl}role/${roleId}/menus/${menuId}/access`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(post)
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



// APIS


export async function getRoleMenuApis(token, roleId, menuId) {
    const url = `${baseUrl}role/${roleId}/menus/${menuId}/apis`;

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


export async function postAccessRoleMenuApi(token, roleId, menuId, dataPost) {
    const url = `${baseUrl}role/${roleId}/menus/${menuId}/apis`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dataPost)
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