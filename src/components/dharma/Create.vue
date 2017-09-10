<template>
  <div id="dharma-create-wrapper">
    <form @submit.prevent="submit">

      <div class="form-group row">
        <label for="language" class="col-md-1 col-form-label">Language</label>
        <div class="col-md-11">
          <select class="form-control" v-model="selectedLanguage">
            <option v-for="record in languages" :value="record">{{ record | uppercase }}</option>
          </select>
        </div>
      </div>

      <div class="form-group row">
        <label for="title" class="col-md-1 col-form-label">{{ selectedLanguage | uppercase }} Title</label>
        <div class="col-md-11">
          <input type="text" class="form-control" v-model="input.title[selectedLanguage]" required>
        </div>
      </div>

      <div class="form-group row">
        <label for="video" class="col-md-1 col-form-label">{{ selectedLanguage | uppercase }} Video</label>
        <div class="col-md-11">
          <input type="url" class="form-control" v-model="input.video[selectedLanguage]">
        </div>
      </div>

      <div class="form-group row">
        <label for="category" class="col-md-1 col-form-label">Category</label>
        <div class="col-md-11">
          <select class="form-control" v-model="input.category" required>
            <option v-for="record in categories" :value="record">{{ record | capitalize }}</option>
          </select>
        </div>
      </div>
      
      <div class="form-group row">  
        <label for="content" class="col-md-1 col-form-label">{{ selectedLanguage | uppercase }} Content</label>
        <div class="col-md-11">
          <textarea rows="10" class="form-control" v-model="content[selectedLanguage]" required></textarea>
        </div>  
      </div>

      <div class="form-group row">
        <label for="preview" class="col-md-1 col-form-label">{{ selectedLanguage | uppercase }} Preview</label>
        <div class="col-md-11">
          <div class="form-control"><div class="preview" v-html="compiledMarkdown"></div></div>
        </div>
      </div>

      <div class="control-actions row">
        <div class="col-md-1"></div>
        <div class="col-md-11">
          <button type="submit" class="btn btn-primary">Submit</button>
          <router-link to="/dharma" tag="button" class="btn btn-secondary">Cancel</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import {auth} from '../../db'
  import {db} from '../../db'
  import Marked from 'marked'
  import categoryObj from '../../categories'
  
  export default {
    data () {
      return {
        categories: categoryObj.dharma,
        languages: categoryObj.lang,
        selectedLanguage: 'en',
        input: {
          title: { en: '', fr: '', de: '', es: '', pt: '' },
          video: { en: '', fr: '', de: '', es: '', pt: '' },
          category: ''
        },
        content: { 
          en: '#### Markdown Editor \n To learn markdown commands: [Go Here](https://github.com/adam-p/markdown-here/wiki/Markdown-Here-Cheatsheet)', 
          fr: '', 
          de: '', 
          es: '', 
          pt: '' 
        }
      }
    },
    firebase: {
      dharmaArr: db.ref('dharma')
    },
    computed: {
      compiledMarkdown () {
        return Marked(this.content[this.selectedLanguage], { sanitize: true })
      }
    },
    methods: {
      submit () {
        let data = JSON.parse(JSON.stringify(this.input)) // removes getters and setters attached by vuejs
        data.created = moment().unix() // get current unix timestamp
        data.lastEditedBy = auth.currentUser.email
        data.content = {}
        data.content.en = Marked(this.content.en, { sanitize: true })
        
        _.each(data.title, (value, key, list) => {
          if (key !== 'en') data.title[key] = data.title[key] != '' ? data.title[key] : data.title.en
        })

        _.each(data.video, (value, key, list) => {
          if (key !== 'en') data.video[key] = data.video[key] != '' ? data.video[key] : data.video.en
        })

        _.each(this.content, (value, key, list) => {
          if (key !== 'en') data.content[key] = this.content[key] != '' ? Marked(this.content[key], { sanitize: true }) : data.content.en
        })
        console.log(data)
        this.$firebaseRefs.dharmaArr.push(data)
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  label {
    font-weight: bold;
  }
  textarea {
    width: 100%;
  }
</style>