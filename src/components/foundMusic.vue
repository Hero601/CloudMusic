<template>
  <div>发现音乐</div>
</template>
<script>
export default {
  data() {
    return {
      data: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const data = await this.$http.get('/homepage/block/page')
      console.log(data)
    }
  }
}
</script>
<style lang="css"></style>
