<template>
  <div id="slide-create-wrapper">
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

        <label for="imageURL" class="col-md-1 col-form-label">Image URL</label>
        <div class="col-md-5">
          <input type="text" class="form-control" v-model="input.imageURL" required>
        </div>
      </div>

      <div class="form-group row">
        <label for="buttonText" class="col-md-1 col-form-label">Button Text</label>
        <div class="col-md-11">
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
          name: '',
          targetURL: '',
          imageURL: '',
          buttonText: ''
        }
      }
    },
    firebase: {
      slideArr: db.ref('slide')
    },
    methods: {
      submit () {
        let data = JSON.parse(JSON.stringify(this.input)) // removes getters and setters attached by vuejs
        data.isEnabled = true
        data.created = moment().unix() // get current unix timestamp
        data.lastEditedBy = auth.currentUser.email

        this.$firebaseRefs.slideArr.push(data)
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
  }
  textarea {
    width: 100%;
  }
</style>
