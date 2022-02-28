<template>
  <!-- 頂部導覽 -->
  <FrontNavbar></FrontNavbar>
  <router-view></router-view>
  <!-- ProductsView -->
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue';

export default {
  components: { FrontNavbar },
  data() {
    return {};
  },
};
</script>
