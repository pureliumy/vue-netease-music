<template>
  <div class="album-detail">
    {{this.id}}
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    id: function () {
      return this.$route.params.albumId
    }
  }
}
</script>
