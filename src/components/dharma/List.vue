<template>
  <div id="dharma-list-wrapper">

    <section id="control-menu" class="row justify-content-center align-items-top">
      <div id="search-bar" class="col-md-10">
        <div class="input-group">
          <div class="input-group-btn">
            <button type="button" class="btn" @click="dropdownVisible = !dropdownVisible">
              <span>{{ selectedCategory }}</span>
              <i class="fa fa-caret-down"></i>
            </button>
            <ul class="my-dropdown-menu" v-show="dropdownVisible">
              <li @click="searchByCategory('all')">All</li>
              <li v-for="record in categories" @click="searchByCategory(record)" :key="record['.key']">{{ record }}</li>
            </ul>
          </div>
          <input type="text" class="form-control" placeholder="Search..." v-model="keyword" @keyup="searchByKeyword">
          <i class="fa fa-search"></i>
        </div>
      </div>

      <div class="col-md-2">
        <router-link to="/dharma/create" tag="button" class="btn btn-default">Create</router-link>
      </div>
    </section>

    <section id="list">
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Video</th>
            <th>Created</th>
            <th>Modified</th>
            <th>Last Edited By</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="record in sortedRecords" :key="record['.key']">
            <td>{{ record.title.en }}</td>
            <td>{{ record.category }}</td>
            <td>{{ record.video.en | hasVideo }}</td>
            <td>{{ record.created | date }}</td>
            <td>{{ record.modified | date }}</td>
            <td>{{ record.lastEditedBy }}</td>
            <td class="control-action">
              <button type="button" class="btn btn-sm btn-outline-info" @click="editRecord(record)">Edit</button>
              <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteRecord(record['.key'])">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <div class="modal-bg" v-if="modalVisible"></div>

    <section class="modal-window" v-if="modalVisible">
      <h5>Are you sure you want to delete this?</h5>

      <div class="control-action">
        <button type="button" class="btn btn-secondary" @click="confirmDelete">Yes</button>
        <button type="button" class="btn btn-secondary" @click="modalVisible = false">No</button>
      </div>
    </section>

  </div>
</template>

<script>
  import orderBy from 'lodash'
  import {db} from '../../db'
  import categoryObj from '../../categories'
  import filters from '../../filters'

  export default {
    data () {
      return {
        categories: categoryObj.dharma,
        filteredRecords: [],
        filteredRecordsCount: 0,
        keyword: '',
        selectedCategory: 'all',
        dropdownVisible: false,
        modalVisible: false,
        selectedKey: ''
      }
    },
    firebase: {
      dharmaArr: db.ref('dharma')
    },
    computed: {
      sortedRecords() {
        return _.orderBy(this.filteredRecords, 'created', 'desc')
      }
    },
    methods: {
      editRecord (record) {
        this.$router.push({ name: 'dharmaEdit', params: {key: record['.key'], record: record }})
      },
      deleteRecord (key) {
        this.modalVisible = true
        this.selectedKey = key
      },
      confirmDelete () {
        let key = this.selectedKey
        this.$firebaseRefs.dharmaArr.child(key).remove()
        this.modalVisible = false
      },
      searchByCategory (category) {
        let vm = this
        vm.selectedCategory = category
        vm.dropdownVisible = false
        vm.keyword = ''
        if (category === 'all') {
          vm.filteredRecords = vm.dharmaArr
        } else {
          vm.filteredRecords = _.filter(vm.dharmaArr, (obj) => {
            if (obj.category === category) {
              return obj
            }
          })
        }
      },
      searchByKeyword () {
        let vm = this
        let keyword = vm.keyword.toLowerCase()
        vm.start = 0
        vm.end = vm.step
        vm.currentPage = 1

        if (vm.selectedCategory === 'all') {
          vm.filteredRecords = _.filter(vm.dharmaArr, (obj) => {
            let title = obj.title['en'].toLowerCase()
            if (title.includes(keyword)) {
              return obj
            }
          })
        } else {
          vm.filteredRecords = _.filter(vm.dharmaArr, (obj) => {
            let title = obj.title['en'].toLowerCase()
            if (title.includes(keyword) && obj.category === vm.selectedCategory) {
              return obj
            }
          })
        }
      }
    },
    created () {
      this.filteredRecords = this.dharmaArr
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../scss/variables.scss';
  @import '../../scss/global.scss';

  #list {
    table {
      thead {
        tr th:first-child {
          width: 30%;
        }
      }
      tbody {
        tr td {
          &:nth-child(2) {
            text-transform: capitalize;
          }
        }
      }
    }
  }
</style>
