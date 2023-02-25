<script setup lang="ts">
import Editor from './editor/Editor.vue'
import Output from './output/Output.vue'
import { Store, ReplStore, SFCOptions } from './store'
import { provide, toRef, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useClipboard } from '@vueuse/core'

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

const { copy, copied, isSupported } = useClipboard()

</script>

<template>
  <div class="vue-repl">
    <Output showCompileOutput :ssr="!!props.ssr" />
    <div class="vue-repl__btns">
      <template v-if="isSupported">
        <Icon v-if="copied" icon="material-symbols:content-copy" />
        <Icon v-else icon="material-symbols:content-copy-outline" @click="copy(store!.state.activeFile.code)" />
      </template>
      <Icon v-if="hideCode" icon="mdi:code-tags" @click="hideCode = false" />
      <Icon v-else icon="mdi:xml" @click="hideCode = true" />
    </div>
    <Editor :class="{ hide: hideCode }" />
  </div>
</template>

<style lang="scss" scoped>
.vue-repl {
  width: 100%;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  overflow: hidden;
  background-color: #FFFBFE;
  border-radius: 8px;
  box-shadow: inset 0 0 1px 1px hsla(0, 50%, 50%, 0.1);

  &__btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
    padding: 4px;

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
