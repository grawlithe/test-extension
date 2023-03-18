<template>
  <div class="main_app">
    <h2 class="text-center">Test Chrome Assistant</h2>
        <div id="chathistory">
          {{ newResult }}
        </div>
        <div class="">
            <div class="" role="group" aria-label="Basic example">
              <button type="button" class="rounded-button" @click="jokeqry">Joke</button>
              <button type="button" class="rounded-button" @click="positiveqry">Positive</button>
              <button type="button" class="rounded-button" @click="dislikeqry">Dislike</button>
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
      systemProfile: 'You are a very kind and helpful assistant.'
    }
  },
  computed: {
    newResult() {
      return this.result
    }
  },
  methods: {
    jokeqry() {

      this.msg2 = document.querySelector('span.break-words > span > span[dir="ltr"]').innerText
      //console.log(document.querySelector('span.break-words > span > span[dir="ltr"]').innerText)

      axios.post('http://localhost:8080/v1/', {
          "model" : "gpt-3.5-turbo-0301",
          "messages" : [
            {
              "role" : "system", 
              "content" : this.systemProfile
            },
            {
              "role" : "user", 
              "content" : 'Create a joke as a reply based on this post: "' + this.msg2 + '"'
            }
          ]
        })
        .then((res) => {
          this.result = res.data.choices[0].message.content
          console.log(this.result.trim())
          let a = document.querySelector('.ql-editor > p')
          a.innerHTML = this.result.trim()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {

        })
    },
    positiveqry() {

      this.msg2 = document.querySelector('span.break-words > span > span[dir="ltr"]').innerText

      axios.post('http://localhost:8080/v1/', {
          "model" : "gpt-3.5-turbo-0301",
          "messages" : [
            {
              "role" : "system", 
              "content" : this.systemProfile
            },
            {
              "role" : "user", 
              "content" : 'Write me a positive response to this: "' + this.msg2 + '". Maximum of 3 sentences.'
            }
          ]
        })
        .then((res) => {
          this.result = res.data.choices[0].message.content

          let a = document.querySelector('.ql-editor')
          a.firstChild.innerHTML = this.result.trim()

        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {

        })
    },
    dislikeqry() {
      
      this.msg2 = document.querySelector('span.break-words > span > span[dir="ltr"]').innerText

      axios.post('http://localhost:8080/v1/', {
          "model" : "gpt-3.5-turbo-0301",
          "messages" : [
            {
              "role" : "system", 
              "content" : this.systemProfile
            },
            {
              "role" : "user", 
              "content" : 'Write me a disagreing response this: "' + this.msg2 + '". Maximum of 3 sentences.'
            }
          ]
        })
        .then((res) => {
          this.result = res.data.choices[0].message.content
          console.log(this.result)

          let a = document.querySelector('.ql-editor')
          a.firstChild.innerHTML = this.result.trim()
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
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 10000;
}
.rounded-button {
  background: transparent;
  border: 2px solid #000;
  border-radius: 20px;
  padding: 10px 20px;
  color: #000;
  margin-right: 3px;
  margin-left: 3px;
}
</style>
