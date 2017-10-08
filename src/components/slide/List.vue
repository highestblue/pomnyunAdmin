<template>
  <div id="slide-list-wrapper">
    <section id="control-menu" class="row justify-content-center">
      <div id="search-bar" class="col-md-10">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search..." v-model="keyword" @keyup="searchByKeyword">
          <i class="fa fa-search"></i>
        </div>
      </div>

      <div class="col-md-2">
        <router-link to="/slide/create" tag="button" class="btn btn-default">Create</router-link>
      </div>
    </section>

    <section id="list">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Status</th>
            <th>Name</th>
            <th>Target URL</th>
            <th>Button Text</th>
            <th>Created</th>
            <th>Modified</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="record in sortedRecords" :key="record['.key']">
            <td><a :href="record.imageURL" target="_blank"><img :src="record.imageURL" width="30" height="30"></a></td>
            <td>
              <span style="cursor: pointer" v-if="record.isEnabled === true" @click="disableRecord(record['.key'])"><i class="fa fa-calendar-check-o text-success"></i></span>
              <span v-else style="cursor: pointer" @click="enableRecord(record['.key'])"><i class="fa fa-calendar-times-o text-danger"></i></span>
            </td>
            <td>{{ record.name }}</td>
            <td>{{ record.targetURL }}</td>
            <td>{{ record.buttonText }}</td>
            <td>{{ record.created | date }}</td>
            <td>{{ record.modified | date }}</td>
            <td class="control-action">
              <button type="button" class="btn btn-sm btn-outline-info" @click="editRecord(record)">Edit</button>
              <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteRecord(record['.key'])">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <div class="modal-bg" v-if="deleteModalVisible"></div>

    <section class="modal-window" v-if="deleteModalVisible">
      <h5>Are you sure you want to delete this?</h5>

      <div class="control-action">
        <button type="button" class="btn btn-secondary" @click="confirmDelete">Yes</button>
        <button type="button" class="btn btn-secondary" @click="deleteModalVisible = false">No</button>
      </div>
    </section>
  </div>
</template>

<script>
  import orderBy from 'lodash'
  import { db } from '../../db'
  import filters from '../../filters'

  export default {
    data () {
      return {
        filteredRecords: [],
        filteredRecordsCount: 0,
        keyword: '',
        deleteModalVisible: false,
        selectedKey: ''
      }
    },
    firebase: {
      slideArr: db.ref('slide')
    },
    computed: {
      sortedRecords() {
        return _.orderBy(this.filteredRecords, 'created', 'desc')
      }
    },
    methods: {
      editRecord (record) {
        this.$router.push({ name: 'slideEdit', params: {key: record['.key'], record: record }})
      },
      disableRecord (key) {
        this.$firebaseRefs.slideArr.child(key).child('isEnabled').set(false)
      },
      enableRecord (key) {
        this.$firebaseRefs.slideArr.child(key).child('isEnabled').set(true)
      },
      deleteRecord (key) {
        this.deleteModalVisible = true
        this.selectedKey = key
      },
      confirmDelete () {
        let key = this.selectedKey
        this.$firebaseRefs.slideArr.child(key).remove()
        this.deleteModalVisible = false
      },
      searchByKeyword () {
        let vm = this
        let keyword = vm.keyword.toLowerCase()
        vm.filteredRecords = _.filter(vm.slideArr, (obj) => {
          let name = obj.name.toLowerCase()
          if (name.includes(keyword)) {
            return obj
          }
        })
      }
    },
    created () {
      this.filteredRecords = this.slideArr
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../scss/variables.scss';
  @import '../../scss/global.scss';

  #list {
    table {
      thead {
        tr th {
          &:first-child {
            width: 50px;
          }
          &:nth-child(2) {
            width: 70px;
          }
          &:nth-child(3) {
            width: 20%;
          }
          &:last-child {
            width: 125px;
          }
        }
      }
      tbody {
        tr td {
          &:nth-child(2) {
            text-align: center;
            span {
              font-size: 1.5rem;
            }
          }

          &:nth-child(3) {
            text-transform: capitalize;
          }

        }
      }
    }
  }
</style>
