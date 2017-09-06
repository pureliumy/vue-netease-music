<template>
  <div class="play-list">
    {{this.banners}}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'playlist',
  data () {
    return {
      msg: 'playlist'
    }
  },
  computed: {
    ...mapState([
      'banners'
    ])
  },
  methods: {
    ...mapActions([
      'getBanner'
    ])
  },
  mounted: function () {
    this.getBanner()
  }
}
</script>
