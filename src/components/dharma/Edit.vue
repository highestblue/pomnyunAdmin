<template>
  <div id="dharma-edit-wrapper">
    <form @submit.prevent="submit">

      <div class="form-group row">
        <label for="language" class="col-md-1 col-form-label">Language</label>
        <div class="col-md-11">
          <select class="form-control" v-model="selectedLanguage">
            <option v-for="record in languages" :value="record" :key="record['.key']">{{ record | uppercase }}</option>
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
            <option v-for="record in categories" :value="record" :key="record['.key']">{{ record | capitalize }}</option>
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
  import toMarkdown from 'to-markdown'
  import categoryObj from '../../categories'

  export default {
    data () {
      return {
        categories: categoryObj.dharma,
        languages: categoryObj.lang,
        selectedLanguage: 'en',
        input: {
          title: {
            en: this.$route.params.record.title.en,
            fr: this.$route.params.record.title.fr,
            de: this.$route.params.record.title.de,
            es: this.$route.params.record.title.es,
            pt: this.$route.params.record.title.pt
          },
          video: {
            en: this.$route.params.record.video.en,
            fr: this.$route.params.record.video.fr,
            de: this.$route.params.record.video.de,
            es: this.$route.params.record.video.es,
            pt: this.$route.params.record.video.pt
          },
          category: this.$route.params.record.category
        },
        content: {
          en: toMarkdown(this.$route.params.record.content.en),
          fr: toMarkdown(this.$route.params.record.content.fr),
          de: toMarkdown(this.$route.params.record.content.de),
          es: toMarkdown(this.$route.params.record.content.es),
          pt: toMarkdown(this.$route.params.record.content.pt)
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
        let key = this.$route.params.record['.key']
        let data = JSON.parse(JSON.stringify(this.input)) // removes getters and setters attached by vuejs
        data.created = this.$route.params.record.created
        data.modified = moment().unix() // get current unix timestamp
        data.lastEditedBy = auth.currentUser.email
        data.content = {}

        _.each(this.content, (value, key, list) => {
          data.content[key] = Marked(this.content[key], { sanitize: true })
        })

        this.$firebaseRefs.dharmaArr.child(key).set(data)
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
