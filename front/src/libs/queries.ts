import { FilmInterface } from "../interfaces/film.interface";
import { QueryResultInterface } from "../interfaces/query-result.interface";

declare var db: any; // declaring db as a global variable (TS specific)

// ALL DATABASE CALL MUST BE IMPLEMENTED AS A STATIC FUNCTION OF QUERYBUILDER

export class QueryBuilder {
  static lastQuery: QueryResultInterface;

  // As example, see QueryResult.vue / created() hook of component
  static getBestFilms(
    quantity: number,
    skipped: number = 0
  ): Promise<FilmInterface[]> {
    const bestFilms: any = db
      .collection("films")
      .orderBy("vote_count", "desc")
      .where("vote_count", ">", 100)
      .orderBy("vote_average", "desc")
      .limit(quantity);

    QueryBuilder.lastQuery = {
      sourceQuery: bestFilms
    };

    return bestFilms
      .get()
      .then((querySnapshot: any) => {
        const films: FilmInterface[] = [];

        querySnapshot.forEach(function(doc: any) {
          films.push(doc.data());
        });

        QueryBuilder.lastQuery.lastDoc =
          querySnapshot.docs[querySnapshot.docs.length - 1];

        return films;
      })
      .catch((err: any) => {
        QueryBuilder.lastQuery.success = false;
        return [];
      });
  }

  static getAllFilms(): Promise<FilmInterface[]> {
    const film = db.collection("films");

    QueryBuilder.lastQuery = {
      sourceQuery: film
    };

    return film
      .get()
      .then((querySnapshot: any) => {
        const films: FilmInterface[] = [];

        querySnapshot.forEach(function(doc: any) {
          films.push(doc.data());
        });

        QueryBuilder.lastQuery.lastDoc =
          querySnapshot.docs[querySnapshot.docs.length - 1];

        return films;
      })
      .catch((err: any) => {
        QueryBuilder.lastQuery.success = false;
        return [];
      });
  }

  static getFilm(name: string): Promise<FilmInterface[]> {
    const film = db.collection("films").where("title", "==", name);

    QueryBuilder.lastQuery = {
      sourceQuery: film
    };

    return film
      .get()
      .then((querySnapshot: any) => {
        const films: FilmInterface[] = [];

        querySnapshot.forEach(function(doc: any) {
          films.push(doc.data());
        });

        QueryBuilder.lastQuery.lastDoc =
          querySnapshot.docs[querySnapshot.docs.length - 1];

        return films;
      })
      .catch((err: any) => {
        QueryBuilder.lastQuery.success = false;
        return [];
      });
  }

  static getNextResults(): Promise<FilmInterface[]> {
    if (QueryBuilder.lastQuery && QueryBuilder.lastQuery.lastDoc) {
      const query = QueryBuilder.lastQuery.sourceQuery.startAfter(
        QueryBuilder.lastQuery.lastDoc
      );

      return query
        .get()
        .then((querySnapshot: any) => {
          const films: FilmInterface[] = [];

          querySnapshot.forEach(function(doc: any) {
            films.push(doc.data());
          });

          QueryBuilder.lastQuery.lastDoc =
            querySnapshot.docs[querySnapshot.docs.length - 1];

          return films;
        })
        .catch((err: any) => {
          QueryBuilder.lastQuery.success = false;
          return [];
        });
    } else {
      return new Promise<FilmInterface[]>((resolve, reject) => {
        resolve([]);
      });
    }
  }
}
