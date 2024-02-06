import { Forbidden } from "@/errors/Forbidden";
import { NotFound } from "@/errors/NotFound";
import { ServerError } from "@/errors/ServerError";
import { ServerUnavaible } from "@/errors/ServerUnavaible";

class ClientApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async get(endpoint: string, params: string = ""): Promise<any> {
    const url = params ? `${this.baseUrl}/${endpoint}?${params}` : `${this.baseUrl}/${endpoint}`;
    const response = await fetch(`${url}`);

    if (!response.ok) {
      this.errorHandler(response.status, response.statusText);
    }

    return response.json();
  }

  public async post(endpoint: string, data: object): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      this.errorHandler(response.status, response.statusText);
    }

    return response.json();
  }

  public async put(endpoint: string, data: object): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      this.errorHandler(response.status, response.statusText);
    }
    return response.json();
  }

  public async delete(endpoint: string, data: object): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      this.errorHandler(response.status, response.statusText);
    }
    return response.json();
  }

  private errorHandler(status: number, message: string = "") {
    if (status === 404) {
      throw new NotFound(message);
    } else if (status === 403) {
      throw new Forbidden(message);
    } else if (status === 500) {
      throw new ServerError(message);
    } else if (status === 503) {
      throw new ServerUnavaible(message);
    } else {
      throw new Error(message);
    }
  }
}

export default ClientApi;
