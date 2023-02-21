<script setup lang="ts">
import Editor from './editor/Editor.vue'
import Output from './output/Output.vue'
import { Store, ReplStore, SFCOptions } from './store'
import { provide, toRef, ref } from 'vue'
import { Icon } from '@iconify/vue'


export interface Props {
  store?: Store
  autoResize?: boolean
  clearConsole?: boolean
  sfcOptions?: SFCOptions
  ssr?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  store: () => new ReplStore(),
  autoResize: true,
  clearConsole: true,
  ssr: false
})

props.sfcOptions && (props.store.options = props.sfcOptions)
props.store.init()

provide('store', props.store)
provide('autoresize', props.autoResize)
provide('clear-console', toRef(props, 'clearConsole'))

const hideCode = ref(false)
</script>

<template>
  <div class="vue-preview">
    <Output showCompileOutput :ssr="!!props.ssr" />
    <div class="vue-preview__btns">
      <Icon v-if="hideCode" icon="mdi:code-tags" @click="hideCode = false" />
      <Icon v-else icon="mdi:xml" @click="hideCode = true" />
    </div>
    <Editor :class="{ hide: hideCode }" />
  </div>
</template>

<style lang="scss" scoped>
.vue-preview {
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  overflow: hidden;
  background-color: #f8f8f8;

  &__btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
    padding: 4px;
    background-color: #fff;

    .iconify {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }

  .hide {
    display: none;
  }
}
</style>
