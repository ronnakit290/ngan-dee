// Public assets live at the site's base path (e.g. /ngan-dee/ on GitHub Pages).
export const asset = (path) => `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`
