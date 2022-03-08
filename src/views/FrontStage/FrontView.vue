<template>
  <!-- 頂部導覽 -->
  <FrontNavbar></FrontNavbar>
  <router-view></router-view>
  <!-- ProductsView -->
</template>

<script>
import FrontNavbar from '@/components/Navbar/FrontNavbar.vue';

export default {
  name: 'FrontView.vue',
  components: { FrontNavbar },
  data() {
    return {};
  },
};
</script>
