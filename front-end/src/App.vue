<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img src="/chefhatbb_ccexpress.png">
      </div>
    </router-link>
    <div class="title">
      <h1>Creative Project 4 - Recipe Website</h1>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footerfix"></div>
  <div class="footer">
    <a class="button" href="https://github.com/chance-robinson/cp4-chance-robinson">Github</a>
  </div>
</div>
</template>

<style>

.button {
  transition-duration: 0.4s;
  border-radius: 8px;
  margin: 10px;
  padding: 6px;
  font-size: 20px;
  color: #000;
}

.button:hover {
  background-color: #89af4c; /* Green */
  color: white;
}

.footerfix {
  height: 9rem;
}

.footer {
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: 1%;
  text-align: center;
  background-color: rgb(125, 241, 241);
}


html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: float;
  text-align: center;
  padding: 50px 50px 80px 50px;
  background-color: #92C24C;
  color: #000;
}

.header img {
  position: absolute;
  left: 0px;
  top: 0px;
  max-height: 250px;
  max-width: 250px;
}

.header h1 {
  position: absolute;
  top: 40px;
  left: 35%
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #FEF9DC;
  font-size: 12px;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
