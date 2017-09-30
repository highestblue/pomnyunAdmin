<template>
  <div id="login-wrapper">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h4 class="text-center">SIGN IN</h4>
        <form @submit.prevent="submit">
          <div class="form-group row">
            <label for="email" class="col-md-3 col-form-label">Email</label>
            <div class="col-md-9">
              <input type="email" class="form-control" v-model="input.email" required>
            </div>
          </div>

          <div class="form-group row">
            <label for="password" class="col-md-3 col-form-label">Password</label>
            <div class="col-md-9">
              <input type="password" class="form-control" v-model="input.password" required>
            </div>
          </div>
          <button type="submit" class="btn btn-secondary w-100">SUBMIT</button>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
  import {auth} from '../db'

  export default {
    data () {
      return {
        input: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      submit () {
        let vm = this
        auth.signInWithEmailAndPassword(vm.input.email, vm.input.password).catch(function(error) {
          console.log(error.code, error.message)
          alert(error.message);
        })
        .then(function() {
          vm.$router.push('dashboard')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/variables.scss';
  @import '../scss/global.scss';

  #login-wrapper {
    margin-top: 150px;
  }

  .col-md-4 {
    border: 3px solid $color4;
    padding: 50px;
    color: $color3;
    h4 {
      margin: 0 0 20px;
      color: $color4;
    }
    label, button {
      font-weight: bold;
    }
  }
</style>
