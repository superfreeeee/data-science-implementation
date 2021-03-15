<template>
  <div style="height: 100%; width: 100%">
    <div style="position: fixed; right: 40pt;bottom: 30pt; z-index: 99999;">
      <Button size="middle" @click="addEles">添加</Button>
      <Button size="middle" @click="delEles">删除</Button>
    </div>
    <CJS ref="ref_CJS"></CJS>
  </div>
</template>

<script>
import CJS from './components/cjs'

export default {
  name: 'Test',
  components: { CJS },
  watch: {},
  mounted () {
    this.addEles()
  },
  methods: {
    addEles () {
      this.$refs.ref_CJS.addEles([
        { group: 'nodes', data: { id: 'n0', name: 'n0' }, position: { x: 200, y: 50 } },
        { group: 'nodes', data: { id: 'n1', name: 'n1' }, position: { x: 500, y: 50 } },
        { group: 'nodes', data: { id: 'n2', name: 'n2' }, display: 'hide', position: { x: 200, y: 150 } },
        { group: 'nodes', data: { id: 'n3', name: 'n3' }, position: { x: 500, y: 150 } },
        { group: 'nodes', data: { id: 'n4', name: 'n4' }, position: { x: 100, y: 100 } },
        { group: 'nodes', data: { id: 'n5', name: 'n5' }, position: { x: 400, y: 100 } },
        { group: 'nodes', data: { id: 'n6', name: 'n6' }, display: 'hide', position: { x: 300, y: 100 } },
        { group: 'nodes', data: { id: 'n7', name: 'n7' }, position: { x: 300, y: 200 } },
        { group: 'edges', data: { id: 'e0', name: '属于', source: 'n0', target: 'n1' } },
        { group: 'edges', data: { id: 'e1', name: '属于', source: 'n1', target: 'n6' } },
        { group: 'edges', data: { id: 'e2', name: '属于', source: 'n4', target: 'n0' } },
        { group: 'edges', data: { id: 'e3', name: '属于', source: 'n3', target: 'n4' } },
        { group: 'edges', data: { id: 'e4', name: '属于', source: 'n2', target: 'n7' } },
        { group: 'edges', data: { id: 'e5', name: '属于', source: 'n5', target: 'n3' } },
        { group: 'edges', data: { id: 'e6', name: '属于', source: 'n3', target: 'n2' } },
        { group: 'edges', data: { id: 'e7', name: '属于', source: 'n6', target: 'n1' } },
        { group: 'edges', data: { id: 'e8', name: '属于', source: 'n7', target: 'n2' } }
      ])
    },
    delEles () {
      this.$refs.ref_CJS.delEles()
    }
  }
}
</script>

<style scoped>
</style>
