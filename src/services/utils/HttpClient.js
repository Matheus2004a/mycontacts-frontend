import ApiError from '../../errors/ApiError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(path) {
    return this.makeRequest(path, { method: 'GET' });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options.body,
    });
  }

  put(path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options.body,
    });
  }

  delete(path) {
    return this.makeRequest(path, {
      method: 'DELETE',
    });
  }

  async makeRequest(path, options) {
    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: options.body,
      headers,
    });

    let body = null;
    const contentType = response.headers.get('Content-Type');

    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) return body;

    throw new ApiError(response, body);
  }
}

export default HttpClient;
