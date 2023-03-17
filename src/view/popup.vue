<template>
  <div class="main_app">
    <h2 class="text-center">Test Chrome Assistant</h2>
        <div id="chathistory">
          {{ newResult }}
        </div>
        <div class="">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-primary" @click="jokeqry">Joke</button>
              <button type="button" class="btn btn-primary" @click="positiveqry">Positive</button>
              <button type="button" class="btn btn-primary" @click="dislikeqry">Dislike</button>
            </div>
        </div>
      </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'popupView',
  data () {
    return {
      msg: '',
      msg2: '',
      result: '',
      systemProfile: 'Your temporary name is GrawlBot and you are a very helpful assistant.'
    }
  },
  computed: {
    newResult() {
      return this.result
    }
  },
  methods: {
    jokeqry() {
      axios.post('http://localhost:8080/v1/', {
          "model" : "gpt-3.5-turbo-0301",
          "messages" : [{"role" : "user", "content" : 'Tell me a joke!'}]
        })
        .then((res) => {
          this.result = res.data.choices[0].message.content
          console.log(this.result)

          document.getElementById('APjFqb').value = this.result.trim()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {

        })
    },
    positiveqry() {
      axios.post('http://localhost:8080/v1/', {
          "model" : "gpt-3.5-turbo-0301",
          "messages" : [{"role" : "user", "content" : 'Tell me a positive annecdote!'}]
        })
        .then((res) => {
          this.result = res.data.choices[0].message.content
          console.log(this.result)

          document.getElementById('APjFqb').value = this.result.trim()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {

        })
    },
    dislikeqry() {
      axios.post('http://localhost:8080/v1/', {
          "model" : "gpt-3.5-turbo-0301",
          "messages" : [{"role" : "user", "content" : 'Tell me a disagreing situation!'}]
        })
        .then((res) => {
          this.result = res.data.choices[0].message.content
          console.log(this.result)

          document.getElementById('APjFqb').value = this.result.trim()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {

        })
    },
  },
  mounted () {
    
  }
}

</script>

<style scoped>
.main_app {
  background-color: white;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 450px; 
  padding: 10px;
  z-index: 10000;
}
</style>
