/**
 * Set token auth yang disimpan di cookie
 * @param {string} token 
 * @param {number} expiryDays 
 */
export function setToken(token, expiryDays = 7) {
    const d = new Date();
    d.setTime(d.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();

    // Mengatur cookie dengan Secure dan SameSite flags Secure; SameSite=Strict
    document.cookie = `token=${encodeURIComponent(token)}; ${expires}; path=/; SameSite=Strict;`;
}

/**
 * Get token yang disimpan di cookie
 * @returns string
 */
export function getToken() {
    const name = "token=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

/**
 * Hapus doken yang disimpan di cookie
 */
export function removeToken() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict;";
}