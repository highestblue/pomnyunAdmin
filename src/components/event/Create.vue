<template>
  <div id="event-create-wrapper">
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
        <div class="col-md-8">
          <input type="text" class="form-control" v-model="input.title[selectedLanguage]" required>
        </div>

        <div class="col-md-3">
          <button type="button" class="btn btn-success w-100" @click="fileListModalVisible = true"><strong>FILES</strong></button>
        </div>
      </div>

      <div class="form-group row">
        <label for="startdate" class="col-md-1 col-form-label">Start Date</label>
        <div class="col-md-3">
          <input type="datetime-local" class="form-control" v-model="input.startDate" required>
        </div>

        <label for="enddate" class="col-md-1 col-form-label">End Date</label>
        <div class="col-md-3">
          <input type="datetime-local" class="form-control" v-model="input.endDate" required>
        </div>

        <label for="timezone" class="col-md-1 col-form-label">Timezone</label>
        <div class="col-md-3">
          <input type="text" class="form-control" v-model="input.timezone" required>
        </div>
      </div>

      <div class="form-group row">
        <label for="venue" class="col-md-1 col-form-label">Venue</label>
        <div class="col-md-5">
          <input type="text" class="form-control" v-model="input.venue" required>
        </div>

        <label for="address" class="col-md-1 col-form-label">Address</label>
        <div class="col-md-5">
          <input type="text" class="form-control" v-model="input.address">
        </div>
      </div>

      <div class="form-group row">
        <label for="link" class="col-md-1 col-form-label">RSVP Link</label>
        <div class="col-md-5">
          <input type="text" class="form-control" v-model="input.link">
        </div>

        <label for="thumbnail" class="col-md-1 col-form-label">Thumbnail</label>
        <div class="col-md-5">
          <input type="text" class="form-control" v-model="input.thumbnail" required>
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
          <div class="form-control" v-html="compiledMarkdown"></div>
        </div>
      </div>

      <div class="control-actions row">
        <div class="col-md-1"></div>
        <div class="col-md-11">
          <button type="submit" class="btn btn-primary">Submit</button>
          <router-link to="/event" tag="button" class="btn btn-secondary">Cancel</router-link>
        </div>
      </div>
    </form>

    <div class="modal-bg" v-if="fileListModalVisible"></div>
    
    <div class="modal-window-lg" v-if="fileListModalVisible">
      <app-files-list></app-files-list>
    </div>
  </div>
</template>

<script>
  import {auth} from '../../db'
  import {bus} from '../../bus'
  import { db, storage } from '../../db'
  import categoryObj from '../../categories'
  import Marked from 'marked'
  import FileList from '../shared/FileList'

  export default {
    components: {
      'app-files-list': FileList
    },
    data () {
      return {
        fileListModalVisible: false,
        languages: categoryObj.lang,
        selectedLanguage: 'en',
        tbFile: {
          width: 0,
          height: 0
        },
        input: {
          title: { en: '', fr: '', de: '', es: '', pt: '' },
          startDate: '',
          endDate: '',
          timezone: '',
          venue: '',
          address: '',
          link: '',
          thumbnail: ''
        },
        content: { 
          en: '', 
          fr: '', 
          de: '', 
          es: '', 
          pt: '' 
        }
      }
    },
    firebase: {
      eventArr: db.ref('event')
    },
    computed: {
      compiledMarkdown () {
        return Marked(this.content[this.selectedLanguage], { sanitize: true })
      }
    },
    methods: {
      submit () {
        let data = JSON.parse(JSON.stringify(this.input)) // removes getters and setters attached by vuejs
        data.tbwidth = this.tbFile.width
        data.tbheight = this.tbFile.height
        data.isEnabled = true
        data.startDate = moment(data.startDate).unix()
        data.endDate = moment(data.endDate).unix()
        data.created = moment().unix() // get current unix timestamp
        data.lastEditedBy = auth.currentUser.email
        data.content = {}
        data.content.en = Marked(this.content.en, { sanitize: true })
        
        _.each(data.title, (value, key, list) => {
          if (key !== 'en') data.title[key] = data.title[key] != '' ? data.title[key] : data.title.en
        })

        _.each(this.content, (value, key, list) => {
          if (key !== 'en') data.content[key] = this.content[key] != '' ? Marked(this.content[key], { sanitize: true }) : data.content.en
        })

        this.$firebaseRefs.eventArr.push(data)
        this.$router.go(-1)
      }
    },
    created () {
      bus.$on('fileListModalVisible', (value) => {
        this.fileListModalVisible = value
      })
      bus.$on('tbSelected', (value) => {
        this.input.thumbnail = value.url
        this.tbFile.width = value.width
        this.tbFile.height= value.height
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../scss/global.scss';
  
  label {
    font-weight: bold;
  }
  textarea {
    width: 100%;
  }
</style>