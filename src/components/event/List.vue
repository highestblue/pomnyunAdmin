<template>
  <div id="event-list-wrapper">

    <section id="control-menu" class="row justify-content-center">
      <div id="search-bar" class="col-md-10">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search..." v-model="keyword" @keyup="searchByKeyword">
          <i class="fa fa-search"></i>
        </div>
      </div>

      <div class="col-md-2">
        <router-link to="/event/create" tag="button" class="btn btn-default">Create</router-link>
      </div>
    </section>

    <section id="list">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Status</th>
            <th>Title</th>
            <th>Time</th>
            <th>Venue</th>
            <th>Created</th>
            <th>Modified</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="record in sortedRecords">
            <td><a :href="record.thumbnail" target="_blank"><img :src="record.thumbnail" width="30" height="30"></a></td>
            <td>
              <span style="cursor: pointer" v-if="record.isEnabled === true" @click="disableRecord(record['.key'])"><i class="fa fa-calendar-check-o text-success"></i></span>
              <span v-else><i class="fa fa-calendar-times-o text-danger"></span>
            </td>
            <td>{{ record.title.en }}</td>
            <td>{{ record.startDate | date }} - {{ record.endDate | date }} <span class="text-uppercase">{{ record.timezone }}</span></td>
            <td>{{ record.venue }}</td>
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

    <div class="modal-bg" v-if="deleteModalVisible || disableModalVisible"></div>

    <section class="modal-window" v-if="deleteModalVisible">
      <h5>Are you sure you want to delete this?</h5>
      
      <div class="control-action">
        <button type="button" class="btn btn-secondary" @click="confirmDelete">Yes</button>
        <button type="button" class="btn btn-secondary" @click="deleteModalVisible = false">No</button>
      </div>
    </section>

    <section class="modal-window" v-if="disableModalVisible">
      <h5>Are you sure you want to disable this?</h5>
      
      <div class="control-action">
        <button type="button" class="btn btn-secondary" @click="confirmDisable">Yes</button>
        <button type="button" class="btn btn-secondary" @click="disableModalVisible = false">No</button>
      </div>
    </section>

  </div>
</template>

<script>
  import {db} from '../../db'
  import filters from '../../filters'

  export default {
    data () {
      return {
        filteredRecords: [],
        filteredRecordsCount: 0,
        keyword: '',
        deleteModalVisible: false,
        disableModalVisible: false,
        selectedKey: ''
      }
    },
    firebase: {
      eventArr: db.ref('event')
    },
    computed: {
      sortedRecords() {
        return this.filteredRecords.reverse()
      }
    },
    methods: {
      editRecord (record) {
        this.$router.push({ name: 'eventEdit', params: {key: record['.key'], record: record }}) 
      },
      disableRecord (key) {
        this.disableModalVisible = true
        this.selectedKey = key
      },
      confirmDisable () {
        let key = this.selectedKey
        this.$firebaseRefs.eventArr.child(key).child('isEnabled').set(false)
        this.disableModalVisible = false
      },
      deleteRecord (key) {
        this.deleteModalVisible = true
        this.selectedKey = key
      },
      confirmDelete () {
        let key = this.selectedKey
        this.$firebaseRefs.eventArr.child(key).remove()
        this.deleteModalVisible = false
      },
      searchByKeyword () {
        let vm = this
        let keyword = vm.keyword.toLowerCase()
        vm.filteredRecords = _.filter(vm.eventArr, (obj) => {
          let title = obj.title['en'].toLowerCase()
          if (title.includes(keyword)) {
            return obj
          }
        })
      }
    },
    created () {
      this.filteredRecords = this.eventArr
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
