<template>
  <div>
    <h1>CONTACT PAGE</h1>
    <p @click="onClick">
      Count: {{ count }}
    </p>
  </div>
</template>
<script>
  import fooStore from '@/store/modules/foo';
  import TitleMixin from '@/mixins/title';

  export default {
    mixins: [TitleMixin],
    title: 'Foo',
    destroyed() {
      this.$store.unregisterModule('foo');
    },
    asyncData({ store }) {
      store.registerModule('foo', fooStore);
      return store.dispatch('foo/inc');
    },
    methods: {
      onClick() {
        this.$store.dispatch('foo/inc');
      }
    },
    computed: {
      count() {
        return this.$store.state.foo.count;
      }
    }
  }
</script>
<style lang="scss" scoped>
  h1 {
    color: #FFF;
    background: brown;
  }
</style>
