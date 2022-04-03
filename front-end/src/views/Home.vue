<template>
<div class="home">
  <div class="head">
    <router-link class="button" to="/recipe">Add a Recipe!</router-link>
  </div>
  <section class="image-gallery">
    <div class="image" v-for="item in items" :key="item.id">
      <img :src="item.path" />
      <h2>Dish : {{item.title}}</h2>
      <p>About: {{item.desc}}</p>
      <p>Instructions:</p>
      <p> {{item.instr}}</p>
    </div>
  </section>
</div>
</template>

<script>
import axios from 'axios';
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
     items: [],
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.head {
  text-align: center;
  margin-bottom: 8px;
}

.image {
  padding: 15px;
  margin: 0 0 1.5em;
  background-color: #F5F4DB;
  border-radius: 8px;
  display: inline-block;
  max-width: 100%;
}

.image h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
  margin: 4px;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
