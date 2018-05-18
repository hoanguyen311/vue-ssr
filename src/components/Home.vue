<template>
  <div>
    <h1>HOME PAGE</h1>
  </div>
</template>
<style lang="scss" scoped>
  h1 {
    color: #FFF;
    background: brown;
  }
</style>
<script>
import TitleMixin from '@/mixins/title';

export default {
  name: 'Home',
  mixins: [TitleMixin],
  title: 'Home Page'
}
</script>
