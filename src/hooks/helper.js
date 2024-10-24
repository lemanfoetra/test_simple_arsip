
export function setCookie(name, value, expiryDays = 7) {
    const d = new Date();
    d.setTime(d.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();

    // Mengatur cookie dengan Secure dan SameSite flags
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/; Secure; SameSite=Strict`;
}


export function getCookie(cookieName) {
    const name = `${cookieName}=`;
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

export function removeCookie(cookieName) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict`;
}