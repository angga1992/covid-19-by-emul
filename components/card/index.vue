<template>
  <div 
    class="flex flex-col"
    :style="{
      ...borderStyle,
      ...shadowStyle,
      'margin': `${margin}`,
      'padding': `${padding}`,
      'background': `${background}`
      }"
    @click="ev => $emit('click', ev)"
  >
    <slot name="top">
    </slot>

    <slot name="default" >
    </slot>

    <slot name="bottom">
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    rounded: {
      type: String,
      default: '5px'
    },
    border: {
      type: Boolean,
      default: false
    },
    borderWidth: {
      type: [String, Number],
      default: 1
    },
    borderColor: {
      type: String,
      default: '#e2e8f0',
      description: 'Value bisa berupa Hex, RGB, atau RGBA'
    },
    margin: {
      type: String,
      default: '8px'
    },
    padding: {
      type: String,
      default: '0'
    },
    shadow: {
      type: Boolean,
      default: false
    },
    shadowColor: {
      type: String,
      default: '#bbbbbb'
    },
    shadowWidth: {
      type: String,
      default: '0 3px 3px'
    },
    background: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    borderStyle: function() {
      if(this.border) {
        return {
          borderWidth: `${this.borderWidth}px`,
          borderRadius: `${this.rounded}`,
          borderColor: `${this.borderColor}`
        }
      } else {
        return {
          borderRadius: `${this.rounded}`,
        }
      }
    },
    shadowStyle: function() {
      if(this.shadow) {
        return {
          'box-shadow': `${this.shadowWidth} ${this.shadowColor}`
        }
      } else {
        return {}
      }
    }
  }
}
</script>