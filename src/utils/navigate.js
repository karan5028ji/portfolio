/**
 * Centralized SPA router utility.
 * All navigation in the app should go through this function
 * instead of manually calling pushState + dispatchEvent everywhere.
 *
 * @param {string} path - The path to navigate to (e.g. '/', '/projects', '#about')
 */
export const navigate = (path) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('popstate'));
};
