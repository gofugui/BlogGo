<template>
  <a-button type="primary" @click="info">Display normal message</a-button>
</template>
<script>
  export default {
    props: {
      message: {
        default: 'message',
        required: true,
        type: String,
      },
    },
    methods: {
      info() {
        this.$message.info(this.message);
      },
    },
  };
</script>