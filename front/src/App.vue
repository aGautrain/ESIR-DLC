<template>
  <div id="app">
    <h1>Filmotron3000</h1>
    <SearchBar v-on:filter-name-request="fetchFilms" v-on:filter-genre-request="filterGenres" v-bind:titles="filmsTitles" />

    <!-- FEATURE #1: Homepage showing a fullscreen carousel with latest films -->
    <!--<CustomCarousel v-bind:results="filmsExposed" />-->
    <QueryResult v-bind:results="filmsExposed" v-on:thumbnail-click="selectFilm" />

    <Paginator v-if="canLoadMore && !processing" v-on:load-more="fetchNext" />

    <div v-if="processing" class="loading">
      <i class="fas fa-spinner fa-spin fa-2x"></i>
    </div>

    <FilmSheet v-if="filmSelected" id="film-sheet" v-bind="filmSelected" />

    <div v-if="filmSelected" v-on:click="unselect" id="app-overlay"></div>
    <!--<img src="https://robohash.org/filmotron3000" id="app-icon" alt="" title="" />-->
  </div>
</template>

<script lang="ts">
import Vue from "vue";

// import CustomCarousel from "./components/CustomCarousel.vue";
import FilmSheet from "./components/FilmSheet.vue";
import QueryResult from "./components/QueryResult.vue";
import SearchBar from "./components/SearchBar.vue";
import Paginator from "./components/Paginator.vue";

import { FilmInterface } from "./interfaces/film.interface";
import { QueryBuilder } from "./libs/queries";
import { GenreFinder } from "./libs/genres";

export default Vue.extend({
  name: "app",
  data: function(): {
    filmSelected: FilmInterface | null;
    films: FilmInterface[];
    filmsExposed: FilmInterface[];
    filmsTitles: Array<{ id: string; title: string }>;
    processing: boolean;
  } {
    return {
      filmSelected: null,
      films: [],
      filmsExposed: [],
      filmsTitles: [],
      processing: false
    };
  },
  computed: {
    canLoadMore: function(): boolean {
      return QueryBuilder.lastQuery !== undefined;
    }
  },
  components: {
    // CustomCarousel,
    FilmSheet,
    QueryResult,
    SearchBar,
    Paginator
  },
  methods: {
    fetchTitles: function(): Promise<string> {
      if (
        localStorage.getItem("film_titles") !== null &&
        localStorage.getItem("film_titles").length > 10
      ) {
        console.log("Fetched film titles from local storage");
        const storage_titles: string = localStorage.getItem(
          "film_titles"
        ) as string;
        // Typescript bug, not deducing it can't be a null value
        this.filmsTitles = JSON.parse(storage_titles) as Array<{
          id: string;
          title: string;
        }>;

        return new Promise((resolve, reject) => {
          resolve("cache");
        });
      } else {
        console.log(
          "Fetching film titles from server as local storage is empty"
        );
        return QueryBuilder.getAllFilms().then((films: FilmInterface[]) => {
          const items: Array<{ id: string; title: string }> = films.reduce(
            (
              accumulator: Array<{ id: string; title: string }>,
              record: FilmInterface
            ) => {
              return [
                ...accumulator,
                {
                  id: record.id,
                  title: record.title
                }
              ];
            },
            []
          );

          localStorage.setItem("film_titles", JSON.stringify(items));
          this.filmsTitles = items;

          return "server";
        });
      }
    },
    fetchFilms: function(query: string): Promise<number> {
      this.processing = true;
      if (query) {
        // TODO: Regex on query (SAFETY)
        return QueryBuilder.getFilm(query).then((films: FilmInterface[]) => {
          for (let i: number = 0; i < films.length; i++) {
            films[i].filmotron_genres = GenreFinder.getGenresFromIds(
              films[i].genre_ids
            );
          }
          this.films = films;
          // Avoiding array reference assignment
          this.filmsExposed = [];
          for (let j: number = 0; j < this.films.length; j++) {
            this.filmsExposed.push(this.films[j]);
          }
          this.processing = false;

          return this.films.length;
        });
      } else {
        return QueryBuilder.getBestFilms(18).then((films: FilmInterface[]) => {
          for (let i: number = 0; i < films.length; i++) {
            films[i].filmotron_genres = GenreFinder.getGenresFromIds(
              films[i].genre_ids
            );
          }
          this.films = films;
          // Avoiding array reference assignment
          this.filmsExposed = [];
          for (let j: number = 0; j < this.films.length; j++) {
            this.filmsExposed.push(this.films[j]);
          }
          this.processing = false;

          return this.films.length;
        });
      }
    },
    fetchNext: function(e: any): void {
      if (QueryBuilder.lastQuery) {
        this.processing = true;
        QueryBuilder.getNextResults().then((films: FilmInterface[]) => {
          for (let i: number = 0; i < films.length; i++) {
            films[i].filmotron_genres = GenreFinder.getGenresFromIds(
              films[i].genre_ids
            );
            this.films.push(films[i]);
            this.filmsExposed.push(films[i]);
          }
          this.processing = false;
        });
      }
    },
    filterGenres: function(genres: number[]): void {
      if (genres.length > 0) {
        // Showing only films matching given genre
        this.filmsExposed = this.films.filter((film: FilmInterface) => {
          let isShown: boolean = false;
          for (let genre of film.genre_ids) {
            isShown = isShown || genres.indexOf(genre) > -1;
          }
          return isShown;
        });
      } else {
        // Showing all films
        this.filmsExposed = [];
        // Avoiding array reference assignment
        for (let i: number = 0; i < this.films.length; i++) {
          this.filmsExposed.push(this.films[i]);
        }
      }
    },
    selectFilm: function(film: FilmInterface): void {
      this.filmSelected = film;
    },
    unselect: function(): void {
      this.filmSelected = null;
    }
  },
  created: function() {
    this.fetchFilms("").then(number => {
      console.log("Number of films fetched : ", number);
    });
    this.fetchTitles();
  }
});
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  #app-icon {
    position: fixed;
    transform: translateX(90deg);
    bottom: 0px;
    right: 0px;
    width: 200px;
    border-bottom: solid #2c3e50 2px;
    z-index: 15;
    pointer-events: none;
  }

  h1 {
    text-align: left;
    margin-left: 100px;
    padding: 30px 20px 0px 20px;
  }

  form {
    margin-bottom: 30px;
  }

  .loading {
    position: fixed;
    bottom: 10px;
    right: 20px;
  }

  .film-sheet-container {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    max-width: 100%;
  }

  #app-overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.7);
  }
}
</style>
