export function toSlug(text: string) {
    return text
        .toLowerCase()               // Convert to lowercase
        .trim()                      // Remove spaces from start & end
        .replace(/\s+/g, '-')        // Replace spaces with hyphens
        .replace(/[^\w-]+/g, '')     // Remove non-word characters
        .replace(/--+/g, '-');       // Remove multiple hyphens
}