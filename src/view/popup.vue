<template>
  <div class="main_app">
    <h2 class="text-center">Test Chrome Assistant</h2>
        <div id="chathistory">
          {{ result }}
        </div>
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search for..." id="prompttext" v-model="msg">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button" @click="qryChat">Go!</button>
            </span>
        </div>
        <div class="input-group">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button" @click="jokeqry">Tell me a joke!</button>
            </span>
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
  methods: {
    qryChat() {
      axios.post('https://chatgpt-api.shn.hk/v1/', {
          "model" : "gpt-3.5-turbo",
          "messages" : [{"role" : "user", "content" : this.msg}]
        })
        .then((res) => {
          console.log(res)
          this.result = res.data.choices[0].message.content
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {

        })
    },
    jokeqry() {
      axios.post('https://chatgpt-api.shn.hk/v1/', {
          "model" : "gpt-3.5-turbo-0301",
          "messages" : [{"role" : "user", "content" : 'Tell me a joke!'}]
        })
        .then((res) => {
          console.log(res)
          this.result = res.data.choices[0].message.content

          document.getElementById('APjFqb').innerHTML = this.result
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {

        })
    }
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
