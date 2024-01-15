import apiClient from "./api-client";

interface Entity {
  _id: string;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // Get all items
  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  // Create item
  create<T>(item: T) {
    return apiClient.post(this.endpoint, item);
  }

  // Update item
  update<T extends Entity>(item: T) {
    return apiClient.put(this.endpoint + "/" + item._id, item);
  }

  // Delete item
  delete(_id: string) {
    return apiClient.delete(this.endpoint + "/" + _id);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);
export default create;
