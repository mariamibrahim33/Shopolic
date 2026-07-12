// Production config. In the all-in-one deployment the same server hosts both
// the API and this built app, so API calls are same-origin (empty base).
export const environment = {
  production: true,
  apiBase: '',
};
