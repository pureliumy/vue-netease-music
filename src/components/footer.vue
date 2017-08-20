<template>
  <div class="footer">
    footer
  </div>
</template>

<script>
  export default {
    name: 'footer',
    data () {
      return {
        msg: 'footer'
      }
    }
  }
</script>

<style>
  .footer {
    width: 100%;
    height: 50px;
    background: #f5f5f7;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    box-shadow: 0 0 0 1px #e1e1e2;
  }
</style>
