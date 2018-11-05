import { FilmInterface } from "../interfaces/film.interface";

declare var db: any; // declaring db as a global variable (TS specific)

// ALL DATABASE CALL MUST BE IMPLEMENTED AS A STATIC FUNCTION OF QUERYBUILDER

export class QueryBuilder {
  // As example, see QueryResult.vue / created() hook of component
  static getBestFilms(quantity: number): Promise<FilmInterface[]> {
    const bestFilms = db
      .collection("films")
      .orderBy("vote_count", "desc")
      .where("vote_count", ">", 100)
      .orderBy("vote_average", "desc")
      .limit(quantity);

    return bestFilms
      .get()
      .then((querySnapshot: any) => {
        const films: FilmInterface[] = [];

        querySnapshot.forEach(function(doc: any) {
          films.push(doc.data());
        });
        return films;
      })
      .catch((err: any) => {
        return [];
      });
  }

  static getFilm(name: string): Promise<FilmInterface[]> {
    const film = db.collection("films").where("title", "==", name);

    return film
      .get()
      .then((querySnapshot: any) => {
        const films: FilmInterface[] = [];

        querySnapshot.forEach(function(doc: any) {
          films.push(doc.data());
        });
        return films;
      })
      .catch((err: any) => {
        return [];
      });
  }
}
