<template>
  <div id="header-wrapper">
    <div class="container">
      <div class="row justify-content-between align-items-center">
        <ul class="row justify-conten-left align-items-center">
          <router-link to="/dashboard" tag="li" class="nav-item"><img src="../../../static/jungto-ci.png" width="30" height="30"></router-link>
          <router-link to="/dharma" activeClass="active" tag="li" class="nav-item"><a class="nav-link">q&a</a></router-link>
          <router-link to="/event" activeClass="active" tag="li" class="nav-item"><a class="nav-link">event</a></router-link>
          <router-link to="/blog" activeClass="active" tag="li" class="nav-item"><a class="nav-link">blog</a></router-link>
          <router-link to="/files" activeClass="active" tag="li" class="nav-item"><a class="nav-link">files</a></router-link>
        </ul>
      
        <ul class="row justify-content-right align-items-center">
          <router-link to="/login" tag="li" class="nav-item" v-if="!isLoggedin"><a class="nav-link">Login</a></router-link>
          <span v-if="isLoggedin" class="mr-1">{{ user }}</span>
          <li class="nav-item" v-if="isLoggedin" @click="logout" style="cursor: pointer"><a class="nav-link">Logout</a></li>
        </ul>  
      </div>
    </div>
  </div>
</template>

<script>
  import {auth} from '../../db'

  export default {
    data () {
      return {
        isLoggedin: false,
        user: null
      }
    },
    methods: {
      logout () {
        let vm = this
        auth.signOut().then(function(res) {
          vm.$router.push('login')
        }, function(error) {
          console.log(error)
        })
      }
    },
    created () {
      let vm = this
      auth.onAuthStateChanged(function(user) {
        if (user) {
          vm.isLoggedin = true
          vm.user = auth.currentUser.email
        } else {
          vm.isLoggedin = false
          vm.user = null
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../scss/variables.scss';
  @import '../../scss/global.scss';

  #header-wrapper {
    background-color: $color4;
  }

  .container {
    ul {
      height: 50px;
      li {
        &:first-child {
          cursor: pointer;
        }
        &:not(:last-child) {
          margin-right: 15px;
        }
        a {
          @extend .flex-default;
          height: 30px;
          color: $base-white;
          font-weight: bold;
          text-transform: uppercase;
          padding: 0 20px;
          
          &:hover, &:focus, &:active {
            color: $color1;
          }
        }
        
        &.active {
          a {
            color: $color1;
          }
        }
      }
    }
  }
</style>