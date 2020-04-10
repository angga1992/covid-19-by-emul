<template>
  <div
    v-if="value"
    class="flex fixed inset-0 items-center justify-center z-10"
  >
    <div 
      class="absolute inset-0 bg-black opacity-25"
      @click="$emit('input', persistent)"
    >
    </div>
    
    <Card
      border
      border-width="0"
      shadow
      margin="0"
      class="flex relative"
      :class="[scroll ? 'overflow-auto' : '']"
      :style="{
        ...modalStyle
      }"
    >
      <!-- 'height': `${height}`, -->
      <template #top>
        <div class="flex items-center sticky top-0">
          <slot name="top"></slot>
        </div>
      </template>

      <template #default>
        <div 
          class="flex overflow-auto"
          style="height: inherit;"
        >
          <slot name="default">
          </slot>
        </div>
      </template>

      <template #bottom>
        <div class="flex items-center sticky bottom-0">
          <slot name="bottom">
          </slot>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/card'

export default {
  components: {
    // Card: () => import('../Card')
    Card
  },
  props: {
    scroll: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '400px'
    },
    height: {
      type: String,
      default: '500px'
    },
    persistent: {
      type: Boolean,
      default: false
    },
    padding: {
      type: String,
      default: '0'
    },
    background: {
      type: String,
      default: '#fff'
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    modalStyle: function() {
      if(this.fullscreen) {
        return {
          'width': `100%`,
          'height': `-webkit-fill-available`,
          'max-height': `100%`,
          'padding': `${this.padding}`,
          'background': `${this.background}`
        }
      } else {
        return {
          'min-width': '320px',
          'width': `${this.width}`,
          'height': this.scroll ? 'unset' : `-webkit-fill-available`,
          'max-height': `${this.height}`,
          'padding': `${this.padding}`,
          'background': `${this.background}`
        }
      }
    }
  },
  watch: {
    value: {
      handler: function(newVal, oldVal) {
        if(newVal) {
          document.querySelector('body').style['overflow-y'] = 'hidden'
        } else {
          document.querySelector('body').style['overflow-y'] = 'scroll'
        }
      }
    }
  }
}
</script>