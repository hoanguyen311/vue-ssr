<template>
  <h1>{{ name }}</h1>
</template>
<style lang="scss" scoped>
  h1 {
    color: #FFF;
    background: brown;
  }
</style>
<script>
import TitleMixin from '@/mixins/title';
import ItemsStore from '@/store/modules/item';

export default {
  mixins: [TitleMixin],
  title() {
    return this.name;
  },

  asyncData({ store, route }) {
    store.registerModule('items', ItemsStore, { preservedState: true });
    return store.dispatch('items/fetch', route.params.id);
  },

  destroyed() {
    this.$store.unregisterModule('items');
  },

  computed: {
    item() {
      return this.$store.state.items[this.$route.params.id]
    },
    name() {
      return this.item ? this.item.name : '';
    }
  }
}
</script>
