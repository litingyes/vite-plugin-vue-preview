<script setup lang="ts">
import { provide, ref, toRef } from 'vue'
import { Icon } from '@iconify/vue'
import { useClipboard } from '@vueuse/core'
import Editor from './editor/Editor.vue'
import Output from './output/Output.vue'
import type { SFCOptions, Store } from './store'
import { ReplStore } from './store'

export interface Props {
  store?: Store
  clearConsole?: boolean
  sfcOptions?: SFCOptions
  ssr?: boolean
  collapse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  store: () => new ReplStore(),
  clearConsole: true,
  ssr: false,
  collapse: true,
})

// eslint-disable-next-line vue/no-mutating-props
props.sfcOptions && (props.store.options = props.sfcOptions)
props.store.init()

provide('store', props.store)
provide('clear-console', toRef(props, 'clearConsole'))

const collapse = ref(props.collapse)

const { copy, copied, isSupported, text } = useClipboard({ legacy: true })
</script>

<template>
  <div class="vue-preview">
    <Output show-compile-output :ssr="!!props.ssr" />
    <div class="vue-preview__btns">
      <button v-if="isSupported" class="vue-preview__btns-item" :title="(copied || text) ? 'copied' : 'copy'">
        <Icon v-show="copied || text" icon="material-symbols:content-copy" class="icon-copied" />
        <Icon
          v-show="!copied && !text" icon="material-symbols:content-copy-outline" class="icon-copy"
          @click="copy(store!.state.activeFile.code)"
        />
      </button>
      <button class="vue-preview__btns-item">
        <Icon v-show="collapse" icon="mdi:code-tags" @click="collapse = false" />
        <Icon v-show="!collapse" icon="mdi:xml" @click="collapse = true" />
      </button>
    </div>
    <Editor class="vue-preview__editor" :class="{ collapse }" />
  </div>
</template>

<style lang="scss" scoped>
.vue-preview {
  width: 100%;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  overflow: hidden;
  background-color: #FFFBFE;
  border-radius: 8px;
  box-shadow: inset 0 0 1px 1px hsla(0, 50%, 50%, 0.1);
  user-select: none;

  &__btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
    padding: 4px;

    &-item {
      padding: 0;
      border: none;
      cursor: pointer;
      background: transparent;
    }

    .iconify {
      width: 24px;
      height: 24px;
      color: #939094;

      &:hover {
        color: #484649;
      }
    }
  }

  &__editor {
    max-height: 10000px;
    overflow: hidden;
    transition-property: max-height;
    transition-duration: 0.3s;

    &.collapse {
      max-height: 0;
    }
  }

}
</style>
