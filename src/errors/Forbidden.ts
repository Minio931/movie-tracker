export class Forbidden extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Forbidden";
  }
}
