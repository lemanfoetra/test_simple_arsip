const baseUrl = process.env.VUE_APP_API_URL;

export async function apiListFolder(token, parrent) {
    const url = baseUrl + 'arsip/folder/' + parrent;

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


export async function apiInsertFolder(token, data) {
    const url = baseUrl + 'arsip/folder';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
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
 * Update User
 * @param {string} token 
 * @param {string} user 
 * @returns 
 */
export async function updateUser(token, idUser, user) {
    const url = baseUrl + 'user_management/' + idUser;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(user)
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
 * 
 * @param {string} token 
 * @returns 
 */
export async function getListUser(token, limit = 1, offset = 0, search = '') {
    const url = baseUrl + `user_management?limit=${limit}&offset=${offset}&search=${search}`;

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
 * @param {number} UserId 
 * @returns 
 */
export async function deleteUser(token, UserId) {
    const url = baseUrl + 'user_management/' + UserId;

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


export async function getUser(token, UserId) {
    const url = baseUrl + 'user_management/' + UserId;

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