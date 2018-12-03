# ESIR-DLC

_Front initialized with Vue CLI._

Presets used :
TypeScript, ESlint, Unit tests (Mocha), CSS preprocessor (SASS)

## Get started

```
git clone https://github.com/aGautrain/ESIR-DLC
cd ESIR-DLC/front
npm install
npm run serve
```

And [open your browser](http://localhost:8080/) !

Working with Atom :

- add _language-vue_ package for enabling single-file component highlighting
- add _prettier-atom_ package for auto format of files

## Using Jenkins

We use a git webhook to notify jenkins of every commit and run a build.

## Understand app structure

Application includes several Vue components. Each of these features :

- template (HTML)
- logic (JavaScript)
- styles (CSS)

A main component (App) is responsible for handling interactions between others subcomponents.

### Complete interaction example

SearchBar component is able to (emit EVENTS)[https://fr.vuejs.org/v2/guide/components-custom-events.html]
such as _filter request by name_.

```JavaScript
// SearchBar.vue -> methods
this.$emit("filter-name-request", this.filter);
```

App component listens on this particular event and triggers a call to fetchFilms method when received.

```HTML
<!-- App.vue -> template -->
<SearchBar v-on:filter-name-request="fetchFilms" />
```

```JavaScript
// App.vue -> methods
fetchFilms: function(query: string): void {
  QueryBuilder.getFilm(query).then((films: FilmInterface[]) => {
    this.films = films;
  });
}
```

This method uses the QueryBuilder class to perform a database query, and then update films.
At the end, QueryResult component (basic component for displaying film thumbnails) receives these films.

```HTML
<!-- App.vue -> template -->
<QueryResult v-bind:results="films" />
```

And is able to properly display them with a v-for loop.

```HTML
<!-- QueryResult.vue -> template -->
<div class="container">
  <div class="row">
    <FilmThumbnail v-for="film in results" v-bind="film" v-bind:key="film.id" class="col-2" />
  </div>
</div>
```

Through this example we can observe how components emit events which are handled by a main component (App), executing logic and dispatching results to right subcomponents.

This way, App component acts as a central point of our application allowing us to reduce overall complexity.
