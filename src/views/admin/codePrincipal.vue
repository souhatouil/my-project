<template>
  <div>
    <header>
      <nav>
        <ul>
          <li @click="activeSection = 'courses'" :class="{ active: activeSection === 'courses' }"> les Cours</li>
          <li @click="activeSection = 'users_comments'" :class="{ active: activeSection === 'users_comments' }"> Utilisateurs & Commentaires</li>
          <li @click="activeSection = 'stats_reports'" :class="{ active: activeSection === 'stats_reports' }">Statistiques & Rapports</li>
        </ul>
      </nav>
    </header>

    <CourseManagement v-if="activeSection === 'courses'" />
    <UserManagement v-if="activeSection === 'users_comments'" />
    <StatsReports v-if="activeSection === 'stats_reports'" />
  </div>
</template>

<script>
import CourseManagement from '@/views/admin/CourseManagement.vue';
import UserManagement from '@/views/admin/UserManagement.vue';
import StatsReports from '@/views/admin/StatsReports.vue';

export default {
  data() {
    return {
      activeSection: 'courses',
    };
  },
  components: {
    CourseManagement,
    UserManagement,
    StatsReports
  }
};
</script>

<style scoped>
header nav ul {
  display: flex;
  justify-content: space-around;
}

header nav ul li {
  padding: 10px;
  cursor: pointer;
}

header nav ul li.active {
  font-weight: bold;
  color: blue;
}
</style>
