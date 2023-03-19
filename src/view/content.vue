<template>
  <div class="main_app">
    <h2 class="text-center">Test Chrome Assistant</h2>
    <div>
      <span>Context:</span>
      <textarea class="txtarea" v-model="contextText"></textarea>
    </div>
    <div>
      <span>Result:</span>
      <textarea class="txtarea" v-model="newResult"></textarea>
    </div>
    <div class="">
        <div class="" role="group" aria-label="Basic example">
          <button type="button" class="rounded-button" @click="jokeqry">Joke</button>
          <button type="button" class="rounded-button" @click="positiveqry">Positive</button>
          <button type="button" class="rounded-button" @click="dislikeqry">Dislike</button>
        </div>
    </div>
    <div v-if="loading" class="overlay">
      <div class="loader"></div>
      <div class="message">Loading...</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'contentView',
  data () {
    return {
      msg: '',
      msg2: '',
      result: '',
      selectedText: '',
      loading: false,
      systemProfile: 'You are a very kind and helpful assistant.'
    }
  },
  computed: {
    newResult() {
      return this.result
    },
    contextText() {
      return this.selectedText
    }
  },
  methods: {
    jokeqry() {
      this.loading = true
      axios.post('http://localhost:8080/v1/', {
          "model" : "gpt-3.5-turbo-0301",
          "messages" : [
            {
              "role" : "system", 
              "content" : this.systemProfile
            },
            {
              "role" : "user", 
              "content" : 'Create a joke as a reply based on this post: "' + this.contextText + '"'
            }
          ]
        })
        .then((res) => {
          this.result = res.data.choices[0].message.content
          this.loading = false
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
          "messages" : [
            {
              "role" : "system", 
              "content" : this.systemProfile
            },
            {
              "role" : "user", 
              "content" : 'Write me a positive response to this: "' + this.contextText + '". Maximum of 3 sentences.'
            }
          ]
        })
        .then((res) => {
          this.result = res.data.choices[0].message.content
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {

        })
    },
    dislikeqry() {
      
      //this.msg2 = document.querySelector('span.break-words > span > span[dir="ltr"]').innerText

      axios.post('http://localhost:8080/v1/', {
          "model" : "gpt-3.5-turbo-0301",
          "messages" : [
            {
              "role" : "system", 
              "content" : this.systemProfile
            },
            {
              "role" : "user", 
              "content" : 'Write me a counter response to this: "' + this.contextText + '". Maximum of 3 sentences.'
            }
          ]
        })
        .then((res) => {
          this.result = res.data.choices[0].message.content
          //console.log(this.result)

          //let a = document.querySelector('.ql-editor')
          //a.firstChild.innerHTML = this.result.trim()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {

        })
    },
    getContext(){
      this.selectedText = window.getSelection().toString();
    }
  },
  mounted () {
    document.addEventListener('mouseup', () => {
      this.getContext();
    });
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
  border:#000 1px solid;
  border-radius: 10px;
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

.txtarea {
  width: 100%;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

.message {
  margin-top: 10px;
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
