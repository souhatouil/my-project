import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue';
import DetailsCourseHome from "@/views/DetailsCourseHome.vue";
import CourseDetail from "@/views/CourseDetail.vue";
import SignUpView from "../views/SignUpView.vue";
import LoginView from "../views/LoginView.vue";
import StudentView from '@/views/StudentView.vue';
import StudentProfile from "@/views/StudentProfile.vue";
import TeacherView from '@/views/TeacherView.vue'; 
// import AdminViewCopy from '@/views/admin/codePrincipal.vue';  // Supprimez la ligne dupliquée ci-dessous
import UserManagement from "@/views/admin/UserManagement.vue";
import CourseManagement from "@/views/admin/CourseManagement.vue";
import FormationManagement from "@/views/admin/FormationManagement.vue";
import CommentManagement from "@/views/admin/CommentManagement.vue";
import StatsReports from "@/views/admin/StatsReports.vue";
import RoleSelectionView from '@/views/RoleSelectionView.vue';
import AdminDashboard from '@/views/admin/AdminDashboard.vue';
import manageCategories from "@/views/admin/manageCategories.vue";

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: "/home",
    name: "HomeView",
    component: HomeView  // Route pour Home.vue
  },
  {
    path: "/detail",
    name: "DetailHome",
    component: DetailsCourseHome  // Route pour Home.vue
  },

  {
    path: "/course",
    name: "CourseDetail",
    component: CourseDetail,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUpView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  { path: '/role', name: 'RoleSelection', component: RoleSelectionView },
  {
    path: '/student',
    name: 'Student', 
    component: StudentView
  },
  {
    path: "/student/profile",
    name: "StudentProfile",
    component: StudentProfile, // Lien vers la vue de profil
  },

  { path: '/teacher', 
    name: 'Teacher', 
    component: TeacherView
  },
  //{ 
  //   path: '/admin', 
  //   name: 'Admin', 
  //   component: AdminViewCopy
  // },
  {path: '/admin', name:"admin", component: AdminDashboard},
  { path: "/admin/users", component: UserManagement },
  { path: "/admin/courses", component: CourseManagement },
  { path: "/admin/formations", component: FormationManagement },
  { path: "/admin/comments", component: CommentManagement },
  { path: "/admin/stats", component: StatsReports },
  {path: '/admin/categories', name: 'manageCategories', component: manageCategories},
  // {
  //   path: "/admin",
  //   component: AdminDashboard,
  //   children: [
  //     { path: "users", component: UserManagement },
  //     { path: "courses", component: CourseManagement },
  //     { path: "formations", component: FormationManagement },
  //     { path: "comments", component: CommentManagement },
  //     { path: "stats", component: StatsReports },
  //   ],
  // },
  {
    path: "/manage-users",
    name: "ManageUsers",
    component: () => import("../views/ManageUsersView.vue"),
  },
];

import { auth } from '@/firebase';
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if (to.meta.requiresAuth && !user) {
    next("/login");
  } else {
    next();
  }
});

export default router;
