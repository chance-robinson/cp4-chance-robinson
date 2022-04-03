<template>
<div class="admin">
  <div class="head">
    <router-link class="button" to="/">Home</router-link>
    <h1 id="recipeHeader">Recipe Maker</h1>
  </div>
    <div class="heading">
      <div class="circle">+</div>
      <h2>Add a Recipe</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="title" placeholder="Dish Name">
        <p></p>
        <input v-model="desc" placeholder="Description">
        <p></p>
        <textarea v-model="instr" cols=21 rows=5 placeholder="Instructions"></textarea>
        <p></p>
        <h2>(Choose an image by clicking on 'Choose File')</h2>
        <input type="file" name="photo" @change="fileChanged">
        <p></p>
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2>{{addItem.title}}</h2>
        <p>{{addItem.desc}}</p>
        <p>{{addItem.instr}}</p>
        <img :src="addItem.path" />
      </div>
    </div>
    <div class="heading">
      <div class="circle">+/-</div>
      <h2>Edit/Delete an Item</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <input v-model="findItem.title">
        <p></p>
        <input v-model="findItem.desc">
        <p></p>
        <textarea v-model="findItem.instr" cols=21 rows=5></textarea>
        <p></p>
        <img :src="findItem.path" />
      </div>
      <div class="actions" v-if="findItem">
        <button @click="editItem(findItem)">Edit</button>
        <button @click="deleteItem(findItem)">Delete</button>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      title: "",
      file: null,
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
      desc: "",
      instr: "",
    }
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.title > b.title);
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          title: this.title,
          desc: this.desc,
          instr: this.instr,
          path: r1.data.path
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          desc: this.findItem.desc,
          instr: this.findItem.instr,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.head {
  text-align: center;
}

.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
display: flex;
margin-left: 20%;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
  margin-left: 20%;
}

.circle {
  border-radius: 30%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: rgb(181, 197, 90);
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.actions button {
    margin: 8px;
    padding: 5px;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload {
  padding: 15px;
  background-color: #F5F4DB;
  border-radius: 8px;
}
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

#recipeHeader {
    text-align: center;
}
</style>