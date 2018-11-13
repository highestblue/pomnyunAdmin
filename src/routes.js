import Dashboard from './components/Dashboard.vue'
import DharmaList from './components/dharma/List.vue'
import DharmaCreate from './components/dharma/Create.vue'
import DharmaEdit from './components/dharma/Edit.vue'
import BlogList from './components/blog/List.vue'
import BlogCreate from './components/blog/Create.vue'
import BlogEdit from './components/blog/Edit.vue'
import EventList from './components/event/List.vue'
import EventCreate from './components/event/Create.vue'
import EventEdit from './components/event/Edit.vue'
import SlideList from './components/slide/List.vue'
import SlideCreate from './components/slide/Create.vue'
import SlideEdit from './components/slide/Edit.vue'
import ArticleList from './components/article/List.vue'
import ArticleCreate from './components/article/Create.vue'
import ArticleEdit from './components/article/Edit.vue'
import VideoList from './components/video/List.vue'
import VideoCreate from './components/video/Create.vue'
import VideoEdit from './components/video/Edit.vue'
import Files from './components/Files.vue'
import Login from './components/Login.vue'
import { auth } from './db'

export const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/login', component: Login,
    beforeEnter: (to, from, next) => {
      auth.onAuthStateChanged(function(user) {
        if (user) {
          next('/')
        } else {
          next()
        }
      })
    }
  },
  { path: '/dharma', component: DharmaList, meta: { requiresAuth: true } },
  { path: '/dharma/create', component: DharmaCreate, meta: { requiresAuth: true } },
  { path: '/dharma/edit/:key', name: 'dharmaEdit', component: DharmaEdit, meta: { requiresAuth: true } },
  { path: '/blog', component: BlogList, meta: { requiresAuth: true } },
  { path: '/blog/create', component: BlogCreate, meta: { requiresAuth: true } },
  { path: '/blog/edit/:key', name: 'blogEdit', component: BlogEdit, meta: { requiresAuth: true } },
  { path: '/event', component: EventList, meta: { requiresAuth: true } },
  { path: '/event/create', component: EventCreate, meta: { requiresAuth: true } },
  { path: '/event/edit/:key', name: 'eventEdit', component: EventEdit, meta: { requiresAuth: true } },
  { path: '/slide', component: SlideList, meta: { requiresAuth: true } },
  { path: '/slide/create', component: SlideCreate, meta: { requiresAuth: true } },
  { path: '/slide/edit/:key', name: 'slideEdit', component: SlideEdit, meta: { requiresAuth: true }  },
  { path: '/article', component: ArticleList, meta: { requiresAuth: true } },
  { path: '/article/create', component: ArticleCreate, meta: { requiresAuth: true } },
  { path: '/article/edit/:key', name: 'articleEdit', component: ArticleEdit, meta: { requiresAuth: true } },
  { path: '/video', component: VideoList, meta: { requiresAuth: true } },
  { path: '/video/create', component: VideoCreate, meta: { requiresAuth: true } },
  { path: '/video/edit/:key', name: 'videoEdit', component: VideoEdit, meta: { requiresAuth: true } },
  { path: '/files', component: Files, meta: { requiresAuth: true } },
  { path: '*', redirect: '/dashboard' }
]
