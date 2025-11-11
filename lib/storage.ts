// Minimal in-memory token storage to avoid adding dependencies.
// Replace with expo-secure-store in production.
let ACCESS_TOKEN: string | null = null;
let REFRESH_TOKEN: string | null = null;

export async function setAccessToken(token: string) {
    ACCESS_TOKEN = token;
}
export async function setRefreshToken(token: string) {
    REFRESH_TOKEN = token;
}
export async function getAccessToken() {
    return ACCESS_TOKEN;
}
export async function getRefreshToken() {
    return REFRESH_TOKEN;
}
export async function storeTokens(access: string, refresh: string) {
    ACCESS_TOKEN = access;
    REFRESH_TOKEN = refresh;
}
export async function clearTokens() {
    ACCESS_TOKEN = null;
    REFRESH_TOKEN = null;
}
