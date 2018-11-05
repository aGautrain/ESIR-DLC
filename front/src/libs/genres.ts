export class GenreFinder {
  static idToGenre: { [key: number]: string } = {
    28: "Action",
    12: "Aventure",
    16: "Animation",
    35: "Comédie",
    80: "Crime",
    99: "Documentaire",
    18: "Drame",
    10751: "Familial",
    14: "Fantastique",
    36: "Histoire",
    27: "Horreur",
    10402: "Musique",
    9648: "Mystère",
    10749: "Romance",
    878: "Science-Fiction",
    10770: "Téléfilm",
    53: "Thriller",
    10752: "Guerre",
    37: "Western"
  };

  static getGenresFromIds(ids: number[]): string[] {
    let genres: string[] = [];
    for (let id of ids) {
      genres.push(GenreFinder.idToGenre[id]);
    }

    return genres;
  }
}