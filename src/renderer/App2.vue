<template>
    <div class="demo-split">
        <Split v-model="split1">
            <div slot="left" class="demo-split-pane">
                Left Pane
            </div>
            <div slot="right" class="demo-split-pane">
                <editor/>
            </div>
        </Split>
    </div>
</template>
<script>
import Editor from './pages/editor';
export default {
  data() {
    return {
      split1: 0.5,
    };
  },
  components: { Editor },
};
</script>
<style>
    .demo-split{
        height: 100vh;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
</style>