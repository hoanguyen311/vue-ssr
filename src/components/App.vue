<template>
  <div class="app" id="app">
    APP
  </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/');
    }
  }
}
</script>
