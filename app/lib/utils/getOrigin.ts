export const getOrigin = ()=> {
    if (typeof window === "undefined") return null; // SSR guard
    return window.location.origin
};