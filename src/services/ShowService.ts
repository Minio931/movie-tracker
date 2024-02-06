import ClientApi from "./ClientApi";

class ShowService {
  private clientApi: ClientApi;
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.clientApi = new ClientApi(this.baseUrl);
  }

  public async getShows(): Promise<any> {
    try {
      const response = await this.clientApi.get("shows");
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getShowSeasons(id: number): Promise<any> {
    try {
      const response = await this.clientApi.get(`shows/${id}/seasons`);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new ShowService("http://api.tvmaze.com");
