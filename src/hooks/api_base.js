const baseUrl = process.env.VUE_APP_API_URL;


export async function loadBaseMenus(token) {
    const url = baseUrl + 'base/menus';

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
 * Refresh token
 * @param {string} token 
 * @returns 
 */
export async function refreshToken(token) {
    const url = baseUrl + 'refresh_token';

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
 * Api get menu accesss
 * @param {string} token 
 * @returns 
 */
export async function menuAccess(token) {
    const url = baseUrl + 'base/menu_access';

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