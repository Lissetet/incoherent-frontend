const baseURL = "http://localhost:5050/api";

export const api = (path, method = "GET", body = null, credentials = null) => {
  const url = baseURL + path;
  const options = {
    method,
    headers: {},
  };

  if (body) {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json; charset=utf-8";
  }

  if (credentials) {
    const encodedCredentials = btoa(
      `${credentials.username}:${credentials.password}`
    );
    options.headers["Authorization"] = `Basic ${encodedCredentials}`;
  }

  return fetch(url, options);
};
