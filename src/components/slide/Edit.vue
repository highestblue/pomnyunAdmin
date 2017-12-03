<template>
  <div id="slide-edit-wrapper">
    <form @submit.prevent="submit">
      <div class="form-group row">
        <label for="name" class="col-md-1 col-form-label">Name</label>
        <div class="col-md-8">
          <input type="text" class="form-control" v-model="input.name" required>
        </div>

        <div class="col-md-3">
          <button type="button" class="btn btn-success w-100" @click="fileListModalVisible = true"><strong>FILES</strong></button>
        </div>
      </div>

      <div class="form-group row">
        <label for="targetURL" class="col-md-1 col-form-label">Target URL</label>
        <div class="col-md-5">
          <input type="text" class="form-control" v-model="input.targetURL">
        </div>

        <label for="targetWindow" class="col-md-1 col-form-label">Target Window</label>
        <div class="col-md-5">
          <label class="radio-inline"><input type="radio" name="option" value="_self" v-model="input.targetWindow">Self</label>
          <label class="radio-inline"><input type="radio" name="option" value="_blank" v-model="input.targetWindow">New</label>
        </div>
      </div>

      <div class="form-group row">
        <label for="imageURL" class="col-md-1 col-form-label">Image URL</label>
        <div class="col-md-5">
          <input type="text" class="form-control" v-model="input.imageURL" required>
        </div>

        <label for="buttonText" class="col-md-1 col-form-label">Button Text</label>
        <div class="col-md-5">
          <input type="text" class="form-control" v-model="input.buttonText">
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
  import { auth } from '../../db'
  import { bus } from '../../bus'
  import { db, storage } from '../../db'
  import FileList from '../shared/FileList'

  export default {
    components: {
      'app-files-list': FileList
    },
    data () {
      return {
        fileListModalVisible: false,
        input: {
          name: this.$route.params.record.name,
          targetURL: this.$route.params.record.targetURL,
          targetWindow: this.$route.params.record.targetWindow,
          imageURL: this.$route.params.record.imageURL,
          buttonText: this.$route.params.record.buttonText
        }
      }
    },
    firebase: {
      slideArr: db.ref('slide')
    },
    methods: {
      submit () {
        let key = this.$route.params.record['.key']
        let data = JSON.parse(JSON.stringify(this.input)) // removes getters and setters attached by vuejs
        data.isEnabled = true
        data.created = this.$route.params.record.created
        data.modified = moment().unix() // get current unix timestamp
        data.lastEditedBy = auth.currentUser.email

        this.$firebaseRefs.slideArr.child(key).set(data)
        this.$router.go(-1)
      }
    },
    created () {
      bus.$on('fileListModalVisible', (value) => {
        this.fileListModalVisible = value
      })
      bus.$on('tbSelected', (value) => {
        this.input.imageURL = value.url
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../scss/global.scss';

  label {
    font-weight: bold;

    &.radio-inline {
      margin-right: 5px;

      input {
        margin-right: 5px;
      }
    }
  }

  textarea {
    width: 100%;
  }
</style>
