// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBRZzE1XvBofB0h4iz7cUpV-lMCIybYp1I",
//   authDomain: "showflix-c95b5.firebaseapp.com",
//   projectId: "showflix-c95b5",
//   storageBucket: "showflix-c95b5.appspot.com",
//   messagingSenderId: "254262661362",
//   appId: "1:254262661362:web:94aadb960d967ebfc5c06b",
//   measurementId: "G-6WQG8T90FK",
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import ClientApi from "./ClientApi";

class FirebaseService {
  private url: string;
  private clientApi: ClientApi;
  constructor(url: string) {
    this.url = url;
    this.clientApi = new ClientApi(this.url);
  }
  getFavourites(): Promise<any> {
    try {
      return this.clientApi.get("favourites.json");
    } catch (error) {
      throw error;
    }
  }

  addFavourite(data: object): Promise<any> {
    try {
      return this.clientApi.post("favourites.json", data);
    } catch (error) {
      throw error;
    }
  }

  async removeFavourite(id: string): Promise<any> {
    try {
      const favouritesData = await this.getFavourites();
      const keyToDelete = Object.keys(favouritesData).find((key) => favouritesData[key].id === id);
      return this.clientApi.delete(`favourites/${keyToDelete}.json`, {});
    } catch (error) {
      throw error;
    }
  }
}

export default new FirebaseService("https://showflix-c95b5-default-rtdb.firebaseio.com/");
