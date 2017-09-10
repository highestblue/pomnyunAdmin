<template>
  <div id="files-list-wrapper">

    <section id="control-menu" class="row justify-content-center">
      <div id="search-bar" class="col-md-10">
        <div class="input-group">
          <div class="input-group-btn">
            <button type="button" class="btn" @click="dropdownVisible = !dropdownVisible">
              <span>{{ selectedCategory }}</span>
              <i class="fa fa-chevron-down"></i>
            </button>
            <ul class="my-dropdown-menu" v-show="dropdownVisible">
              <li @click="searchByCategory('all')">ALL</li>
              <li v-for="record in categories" @click="searchByCategory(record)">{{ record }}</li>
            </ul>
          </div>
          <input type="text" class="form-control" placeholder="Search..." v-model="keyword" @keyup="searchByKeyword">
          <i class="fa fa-search"></i>
        </div>
      </div>

      <div class="col-md-2">
        <button class="btn btn-default" @click="uploadModalVisible = true">Upload</button>
      </div>
    </section>

    <section id="list">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Category</th>
            <th>Dimension</th>
            <th>Uploaded</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="record in chunkedRecords">
            <td><a :href="record.url" target="_blank"><img :src="record.url" width="30" height="30"></a></td>
            <td>{{ record.name }}</td>
            <td>{{ record.category }}</td>
            <td>{{ record.width }} x {{ record.height }}</td>
            <td>{{ record.uploaded | date }}</td>
            <td><button type="button" class="btn btn-sm btn-outline-danger" @click="deleteRecord(record['.key'])">Delete</button></td>
          </tr>
        </tbody>
      </table>

      <ul class="pagination pagination-sm" v-if="paginationVisible">
        <li class="page-item page-link" v-for="n in pages" @click="paginate(n)" :class="{active: currentPage == n}">{{ n }}</li>
      </ul>      
    </section>

    <div class="modal-bg" v-if="deleteModalVisible || uploadModalVisible"></div>

    <section class="modal-window" v-if="deleteModalVisible">
      <h5>Are you sure you want to delete this?</h5>
      
      <div class="control-action">
        <button type="button" class="btn btn-secondary" @click="confirmDelete">Yes</button>
        <button type="button" class="btn btn-secondary" @click="deleteModalVisible = false">No</button>
      </div>
    </section>

    <section class="modal-window" v-if="uploadModalVisible">
      
      <form @submit.prevent="submit">
        <div class="form-group row">
          <label for="file" class="col-md-2 col-form-label">File</label>
          <div class="col-md-10">
            <input type="file" class="form-control" @change="updateFile" required>
          </div>
        </div>

        <div class="form-group row">
          <label for="name" class="col-md-2 col-form-label">Name</label>
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="input.name" required>
          </div>
        </div>

        <div class="form-group row">
          <label for="category" class="col-md-2 col-form-label">Category</label>
          <div class="col-md-10">
            <select class="form-control" v-model="input.category" required>
              <option v-for="record in categories" :value="record">{{ record | uppercase }}</option>
            </select>
          </div>
        </div>

        <div class="control-actions">
          <button type="submit" class="btn btn-secondary">Upload</button>
          <button type="button" class="btn btn-secondary" @click="uploadModalVisible = false">Cancel</button>
        </div>
      </form>
    </section>

  </div>
</template>

<script>
  import { db, storage } from '../db'
  import categoryObj from '../categories'
  import filters from '../filters'

  export default {
    data () {
      return {
        categories: categoryObj.file,
        filteredRecords: [],
        filteredRecordsCount: 0,
        step: 20, // inital value must match with end
        pages: 1,
        currentPage: 1,
        start: 0,
        end: 20, // inital value must match with step
        keyword: '',
        selectedCategory: 'all',
        dropdownVisible: false,
        paginationVisible: true,
        deleteModalVisible: false,
        uploadModalVisible: false,
        selectedKey: '',
        input: {
          name: '',
          category: '',
          url: ''
        }
      }
    },
    firebase: {
      fileArr: db.ref('file').orderByChild('uploaded')
    },
    computed: {
      chunkedRecords () {
        let vm = this
        vm.filteredRecordsCount = vm.filteredRecords.length
        if (vm.filteredRecordsCount > vm.step) {
          vm.paginationVisible = true
          vm.pages = Math.ceil(vm.filteredRecordsCount / vm.step)
        } else if (vm.filteredRecordsCount < vm.step) {
          vm.paginationVisible = false
        }
        let ph1Data = vm.filteredRecords.slice(0)
        let ph2Data = ph1Data.reverse().slice(vm.start, vm.end)
        return ph2Data
      }
    },
    methods: {
      submit () {
        let vm = this
        let filereader = new FileReader()
        let file = event.target[0].files[0]
        filereader.readAsDataURL(file)
        filereader.onload = function (e) {
          let image = new Image()
          image.src = e.target.result
          image.onload = function () {
            const width = this.width;
            const height = this.height;
            let dir = vm.input.category + '/'
            let fileRef = storage.child(dir + vm.input.url.name)
            fileRef.put(vm.input.url).then((snapshot) => {
              vm.input.url = snapshot.a.downloadURLs[0];
            }).then(() => {
              let data = JSON.parse(JSON.stringify(vm.input)) // removes getters and setters attached by vuejs
              data.width = width
              data.height = height
              data.uploaded = moment().unix() // get current unix timestamp
              console.log(data)
              vm.$firebaseRefs.fileArr.push(data)
              vm.input.name = ''
              vm.input.category = ''
              vm.uploadModalVisible = false
            })
          }
        }
      },
      updateFile (event) {
        this.input.url = event.target.files[0]
      },
      deleteRecord (key) {
        this.deleteModalVisible = true
        this.selectedKey = key
      },
      confirmDelete () {
        let key = this.selectedKey
        this.$firebaseRefs.fileArr.child(key).remove()
        this.deleteModalVisible = false
      },
      paginate (page) {
        let vm = this
        vm.start = vm.step * (page-1)
        vm.end = vm.step * page
        vm.currentPage = page
      },
      searchByCategory (category) {
        let vm = this
        vm.selectedCategory = category
        vm.dropdownVisible = false
        vm.keyword = ''
        vm.start = 0
        vm.end = vm.step
        vm.currentPage = 1

        if (category === 'all') {
          vm.filteredRecords = vm.fileArr
        } else {
          vm.filteredRecords = _.filter(vm.fileArr, (obj) => {
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
          vm.filteredRecords = _.filter(vm.fileArr, (obj) => {
            let title = obj.name.toLowerCase()
            if (title.includes(keyword)) {
              return obj
            }
          })
        } else {
          vm.filteredRecords = _.filter(vm.fileArr, (obj) => {
            let title = obj.name.toLowerCase()
            if (title.includes(keyword) && obj.category === vm.selectedCategory) {
              return obj
            }
          })
        }
      }
    },
    created () {
      this.filteredRecords = this.fileArr
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/variables.scss';
  @import '../scss/global.scss';

  #list {
    table {
      tbody {
        tr td {
          &:nth-child(3) {
            text-transform: uppercase;
          }
        }
      }
    }
  }
</style>
