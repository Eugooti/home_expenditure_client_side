
const now = () => (new Date()).getTime();

export const getFromLocalStorage = (key) => {
    let entry = window.localStorage.getItem(key);
    if (!entry || entry === "undefined") {
        return null;
    }
    let entry_data = JSON.parse(entry);
    let expiry = entry_data.now + entry_data.ttl;

    if (entry_data.ttl && expiry < now()) {

        return null;
    }
    return entry_data.value;
}
// export const getUserLocalStorage = (key) => {
//     let entry = window.localStorage.getItem(key);
//     if (!entry || entry === undefined || entry === "undefined") {
//         return null;
//     }
//     let entry_data = JSON.parse(entry);
//     let expiry = entry_data.now + entry_data.ttl;
//
//     if (entry_data.ttl && expiry < now()) {
//         window.localStorage.removeItem(key);
//         window.location.href='/'
//
//         return null;
//     }
//     return entry_data.value;
// }
//will keep item for 1 hours when ttl is not provided
export const setLocalStorage = (key, value, ttl) => {

    window.localStorage.setItem(key, JSON.stringify({
        ttl: ttl || 60 * 60 * 1000,
        now: now(),
        value: value
    }));
}
export const removeItem = (key) => {
    window.localStorage.removeItem(key);
}

// export const setTrackingData = (data) => {
//
//     let utm_source = getFromLocalStorage('utm_source')
//
//     let utm_campaign = getFromLocalStorage('utm_campaign')
//
//     if (utm_source !== null) {
//         data.utm_source = utm_source
//     }
//
//     if (utm_campaign !== null) {
//         data.utm_campaign = utm_campaign
//     }
//
//     return data
// }

export const clearTrackingData = () => {
    setLocalStorage('utm_source', null)
    setLocalStorage('utm_campaign', null)
}