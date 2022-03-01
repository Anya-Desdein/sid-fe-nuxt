<template>
  <div class="last-updated">
    Ostatnia aktualizacja: {{ lastUpdated | formatDate }}
  </div>
</template>

<style lang="scss" scoped>
.last-updated {
  padding-right: 0.45em;
}
</style>

<script>
export default {
  computed: {
    lastUpdated() {
      return this.$store.state.appStore.lastUpdated;
    },
  },
  filters: {
    formatDate(date) {
      if(!date) return "n/a";
      return new Intl.DateTimeFormat('pl-PL', {
        hour:'2-digit',
        minute:'2-digit',
        day: 'numeric',
        month: '2-digit',
        year: '2-digit'
      }).format(date).replace(/, /, ' ');
    }
  }
}
</script>