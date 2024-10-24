const baseUrl = process.env.VUE_APP_API_URL;

/**
 * Login to server with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns json response
 */
export async function login(email, password) {
    const url = baseUrl + 'login';
    const dataPost = {
        email: email,
        password: password,
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(dataPost)
    });
    const result = await response.json();
    if (!response.ok) {
        if (response.status === 422) {
            throw new Error("Email dan password harus diisi.");
        }
        if (response.status === 401) {
            throw new Error("Email atau password salah");
        }
        throw new Error("Gagal terhubung ke server. Response code " + response.status);
    }
    return result;
}