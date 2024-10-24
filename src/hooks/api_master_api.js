const baseUrl = process.env.VUE_APP_API_URL;

/**
 * Load all list menus
 * @param {string} token 
 * @returns array menus
 */
export async function menus(token) {
    const url = `${baseUrl}master_api/menus`;

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
 * Insert new api
 * @param {string} token 
 * @param {object} api 
 * @returns 
 */
export async function postApi(token, api) {
    const url = baseUrl + 'master_api';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(api)
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
 * update api
 * @param {string} token
 * @param {int} apiId 
 * @param {object} api 
 * @returns 
 */
export async function putApi(token, apiId, api) {
    const url = baseUrl + 'master_api/' + apiId;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(api)
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
 * get list api
 * @param {string} token 
 * @param {int} limit 
 * @param {int} offset 
 * @param {string} search 
 * @returns 
 */
export async function getListApi(token, limit = 1, offset = 0, search = '', id_menus = '') {
    const url = baseUrl + `master_api?limit=${limit}&offset=${offset}&search=${search}&id_menus=${id_menus}`;

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
 * Delete User by Id
 * @param {string} token 
 * @param {int} apiId 
 * @returns 
 */
export async function deleteApi(token, apiId) {
    const url = baseUrl + 'master_api/' + apiId;

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
 * Show api by apiId
 * @param {string} token 
 * @param {int} apiId 
 * @returns 
 */
export async function showApi(token, apiId) {
    const url = baseUrl + 'master_api/' + apiId;

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