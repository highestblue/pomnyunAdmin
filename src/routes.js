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
  { path: '/dharma', component: DharmaList, meta: { requiresAuth: true }  },
  { path: '/dharma/create', component: DharmaCreate, meta: { requiresAuth: true }  },
  { path: '/dharma/edit/:key', name: 'dharmaEdit', component: DharmaEdit, meta: { requiresAuth: true }  },
  { path: '/blog', component: BlogList, meta: { requiresAuth: true }  },
  { path: '/blog/create', component: BlogCreate, meta: { requiresAuth: true }  },
  { path: '/blog/edit/:key', name: 'blogEdit', component: BlogEdit, meta: { requiresAuth: true }  },
  { path: '/event', component: EventList, meta: { requiresAuth: true }  },
  { path: '/event/create', component: EventCreate, meta: { requiresAuth: true }  },
  { path: '/event/edit/:key', name: 'eventEdit', component: EventEdit, meta: { requiresAuth: true }  },
  { path: '/files', component: Files, meta: { requiresAuth: true }  },
  { path: '*', redirect: '/dashboard' }
]
