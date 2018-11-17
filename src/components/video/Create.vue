<template>
  <div id="video-create-wrapper">
    <form @submit.prevent="submit">
      <div class="form-group row">
        <label for="name" class="col-md-1 col-form-label">Title</label>
        <div class="col-md-5">
          <input type="text" class="form-control" v-model="input.title" required>
        </div>

        <label for="publisher" class="col-md-1 col-form-label">Video ID</label>
        <div class="col-md-5">
          <input type="text" class="form-control" v-model="input.videoID">
        </div>
      </div>

      <div class="control-actions row">
        <div class="col-md-1"></div>
        <div class="col-md-11">
          <button type="submit" class="btn btn-primary">Submit</button>
          <router-link to="/video" tag="button" class="btn btn-secondary">Cancel</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { auth } from '../../db'
  import { db, storage } from '../../db'

  export default {
    data () {
      return {
        input: {
          title: '',
          videoID: ''
        }
      }
    },
    firebase: {
      videoArr: db.ref('video')
    },
    methods: {
      submit () {
        let data = JSON.parse(JSON.stringify(this.input)) // removes getters and setters attached by vuejs
        data.order = this.videoArr.length
        data.created = moment().unix() // get current unix timestamp
        data.lastEditedBy = auth.currentUser.email

        this.$firebaseRefs.videoArr.push(data)
        this.$router.go(-1)
      }
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
