export class ServerUnavaible extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServerUnavaible";
  }
}
