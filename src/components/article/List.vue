<template>
  <div id="article-list-wrapper">

    <section id="control-menu" class="row justify-content-center">
      <div id="search-bar" class="col-md-10">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search..." v-model="keyword" @keyup="searchByKeyword">
          <i class="fa fa-search"></i>
        </div>
      </div>

      <div class="col-md-2">
        <router-link to="/article/create" tag="button" class="btn btn-default">Create</router-link>
      </div>
    </section>

    <section id="list">
      <table class="table table-responsive">
        <thead>
          <tr>
            <th class="fit-width"></th>
            <th>Title</th>
            <th>Publisher</th>
            <th>Created</th>
            <th>Modified</th>
            <th>Last Edited By</th>
            <th>Action</th>
          </tr>
        </thead>

        <draggable v-model="filteredRecords" :element="'tbody'" @start="drag=true" @end="drag=false" @sort="changeOrder">
          <tr v-for="record in filteredRecords" :key="record['.key']">
            <td class="fit-wdith"><i class="fa fa-arrows"></i></td>
            <td style="max-width: 200px;" data-toggle="tooltip" title="record.title">{{ record.title }}</td>
            <td>{{ record.publisher }}</td>
            <td>{{ record.created | date }}</td>
            <td>{{ record.modified | date }}</td>
            <td>{{ record.lastEditedBy }}</td>
            <td class="control-action">
              <button type="button" class="btn btn-sm btn-outline-info" @click="editRecord(record)">Edit</button>
              <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteRecord(record['.key'])">Delete</button>
            </td>
          </tr>
        </draggable>
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
  import draggable from 'vuedraggable'
  import { db } from '../../db'

  export default {
    components: {
      draggable,
    },
    data() {
      return {
        filteredRecords: [],
        filteredRecordsCount: 0,
        keyword: '',
        deleteModalVisible: false,
        selectedKey: ''
      }
    },
    firebase: {
      articleArr: db.ref('article').orderByChild('order')
    },
    methods: {
      changeOrder(e) {
        const source = this.articleArr[e.oldIndex]['.key']
        const target = this.articleArr[e.newIndex]['.key']

        this.$firebaseRefs.articleArr.child(source).child('order').set(e.newIndex)
        this.$firebaseRefs.articleArr.child(target).child('order').set(e.oldIndex)
      },
      editRecord(record) {
        this.$router.push({ name: 'articleEdit', params: {key: record['.key'], record: record }})
      },
      deleteRecord(key) {
        this.deleteModalVisible = true
        this.selectedKey = key
      },
      confirmDelete() {
        let key = this.selectedKey
        this.$firebaseRefs.articleArr.child(key).remove()
        this.deleteModalVisible = false
      },
      searchByKeyword () {
        let vm = this
        let keyword = vm.keyword.toLowerCase()
        vm.filteredRecords = _.filter(vm.articleArr, (obj) => {
          let title = obj.title.toLowerCase()
          if (title.includes(keyword)) {
            return obj
          }
        })
      }
    },
    created() {
      this.filteredRecords = this.articleArr
    }
  }

</script>

<style lang="scss" scoped>
  @import '../../scss/variables.scss';
  @import '../../scss/global.scss';

  #list {
    table {
      tbody {
        tr td {
          &:nth-child(2) {
            text-transform: capitalize;
          }
          &:nth-child(3) {
            text-transform: capitalize;
          }
        }
      }
    }
  }
</style>
