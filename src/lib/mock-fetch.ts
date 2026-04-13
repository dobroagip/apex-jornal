const _fetch = window.fetch.bind(window);
export default _fetch;
export const Headers = window.Headers;
export const Request = window.Request;
export const Response = window.Response;
export const FormData = window.FormData;

// Also export as named fetch for some libraries
export { _fetch as fetch };
