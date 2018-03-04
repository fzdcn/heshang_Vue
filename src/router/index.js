import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const NotFound = () => import('../pages/app/NotFound')

const Login = () => import('../pages/login/Index')
const Register = () => import('../pages/login/Register')

const Home = () => import('../pages/app/Home')

const Course = () => import('../pages/course/Index')
const CourseDetail = () => import('../pages/course/Detail')

const Teacher = () => import('../pages/teacher/Index')
const TeacherDetail = () => import('../pages/teacher/Detail')

const UserCenterIndex = () => import('../pages/user-center/Index')
const Cash = () => import('../pages/user-center/Cash')
const MyCourse = () => import('../pages/user-center/MyCourse')
const Share = () => import('../pages/user-center/QrDetail')
const RecordScore = () => import('../pages/user-center/RecordScore')

const routes = [
  {path: '*', component: NotFound},

  {path: '/', redirect: {name: 'home'}},

  {path: '/login', name: 'login', component: Login, meta: {auth: false}},
  {path: '/register', name: 'register', component: Register, meta: {auth: false}},

  {path: '/home', name: 'home', component: Home, meta: {auth: false, keepAlive: true}},

  {path: '/course', name: 'course', component: Course, meta: {auth: false, keepAlive: true}},
  {path: '/course-detail/:id', name: 'course-detail', component: CourseDetail, meta: {auth: false}},

  {path: '/teacher', name: 'teacher', component: Teacher, meta: {auth: false, keepAlive: true}},
  {path: '/teacher-detail/:id', name: 'teacher-detail', component: TeacherDetail, meta: {auth: false}},

  {path: '/user-center', name: 'user-center', component: UserCenterIndex},
  {path: '/my-course', name: 'my-course', component: MyCourse},
  {path: '/cash', name: 'cash', component: Cash},
  {path: '/share/:username', name: 'share', component: Share, meta: {auth: false, keepAlive: true}},
  {path: '/recordScore', name: 'score', component: RecordScore},
]

let router = new Router({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

// 用户是否登录过滤
router.beforeEach(({meta, name, fullPath}, from, next) => {
  store.dispatch('pageLoadingUpdate', true)
  let {auth = true} = meta
  if (auth) {
    let isLogin = Boolean(store.getters.user)
    if (!isLogin && name !== 'login') {
      store.dispatch('rememberLoginRedirect', fullPath)
      return next({name: 'login'})
    }
  }
  next()
})

router.afterEach(() => {
  store.dispatch('pageLoadingUpdate', false)
})

export default router
