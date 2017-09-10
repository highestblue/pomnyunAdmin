<template>
  <div id="app">
    <app-header></app-header>
    
    <main>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>

    <app-footer></app-footer>
  </div>
</template>

<script>
  import Header from './components/shared/Header'
  import Footer from './components/shared/Footer'

  export default {
    name: 'app',
    components: {
      'app-header': Header,
      'app-footer': Footer
    }
  }
</script>

<style lang="scss">
  @import './scss/variables.scss';
  @import './scss/global.scss';

  html {font-size: 16px;}

  body {
    background-color: $color2;
    color: $color1;
    font-family: 'Source Sans Pro', sans-serif;
    line-height: 1.45;
    min-width: 320px;
  }

  main {
    background-color: $base-white;
    padding: 30px 0;
    min-height: 700px;
  }

  section {
    padding-bottom: 35px;
  }

  p {margin-bottom: 1.3rem;}

  h1, h2, h3, h4, h5, h6 {
    margin: 1.414rem 0 0.5rem;
    font-family: $accent-font;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    line-height: 1.2;
  }

  h1 {
    margin-top: 0;
    font-size: $fsize1;
  }

  h2 {font-size: $fsize2;}

  h3 {font-size: $fsize3;}

  h4 {font-size: $fsize4;}

  h5 {font-size: $fsize5;}

  h6 {font-size: $fsize6;}

  small {font-size: $fsize7;}

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: $color2;

    &:hover, &:focus {
      color: $color4;
      text-decoration: none;
    }
  }

  hr {
    border-color: $color3;
    border-style: dashed;
  }

  select {
    text-transform: capitalize;
    option {
      text-transform: capitalize;
    }
  }

  table {
    table-layout: fixed;
    thead {
      tr th {
        font-weight: bold;
      }
    }
    tbody {
      tr td {
        @extend .text-ellipsis;
        color: $color2;
        &.control-action {
          @extend .flex-default;
          button {
            @extend .flex-default;
            text-transform: uppercase;
            font-size: $fsize6;
            &:first-child {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
</style>
