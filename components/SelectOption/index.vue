<template>
  <div class="flex flex-row rounded border border-transparent">
    <div class="flex flex-grow flex-shrink justify-center relative h-full" style="flex: 1 1 0%;">
      <div class="flex flex-row flex-grow flex-shink-0 items-center relative min-w-0 min-h-0 h-full">
        <!-- <pre>{{selected}}</pre> -->
        <span class="relative truncate text-sm px-2" style="flex: 1 1 0%;">
          <slot name="default" v-bind:selected="selected">
            {{ selected.label }}
          </slot>
        </span>
        <div class="flex flex-col flex-shink-0 justify-center relative text-gray-400 mr-1">
          <IconArrowDown class="fill-current text-gray-600"/>
        </div>
      </div>
      <select class="absolute inset-0 w-full opacity-0" @change="change">
        <template v-for="(item, index) in items">
          <template v-if="item.children && item.children.length">
            <optgroup :key="index" :label="item.label">
              <option 
                v-for="(subItem, indexSubitem) in item.children"
                :key="indexSubitem"
                :value="subItem.value"
                :selected="selected.value === subItem.value"
                >
                <slot name="subItem" v-bind:subItem="subItem">
                  {{ subItem.label }}
                </slot>
              </option>      
            </optgroup>
          </template>

          <template v-else>
            <option 
              :key="index"
              :value="item.value"
              :selected="selected.value === item.value"
              >
              <slot name="item" v-bind:item="item">
                {{ item.label }}
              </slot>
            </option>
          </template>
        </template>
      </select>
    </div>
  </div>
</template>

<script>
import IconArrowDown from '@/assets/svg/arrow_down.svg'

export default {
  components: {
    IconArrowDown
  },
  props: {
    // value: {
    //   type: String|Number
    // },
    value: true,
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dump: null,
    }
  },
  computed: {
    selected: {
      get: function() {
        var _this = this

        if(this.items.length) {
          if(this.value !== undefined && this.value !== null) {
            var choosed = null
            var temp = this.items.map(item => {
              if(item.children && item.children.length) {
                item.children.map(subItem => {
                  if(subItem.value == _this.value) {
                    choosed = subItem
                  }
                  return subItem
                })
              }

              if(item.value == _this.value) {
                choosed = item
              }
            })
            
            this.$emit('change', choosed)
            return choosed
          } else {
            if(!this.dump) {
              this.$emit('change', this.items[0])
              return this.items[0]  
            } else {
              this.$emit('change', this.dump)
              return this.dump
            }
          }
        } else {
          return {
            label: '',
            value: ''
          }
        }
      },
      set: function(newVal) {
        this.$emit('input', newVal)
        this.$emit('change', newVal)
        if(!this.value) {
          this.dump = newVal
        }
      }
    }
  },
  methods: {
    change(event) {
      var temp = null
      for(let i=0; i<this.items.length; i++) {
        if(this.items[i].children && this.items[i].children.length) {
          for(let j=0; j<this.items[i].children.length; j++) {
            if(this.items[i].children[j].value != event.target.value) {
              continue;
            } 
            temp = this.items[i].children[j] 
          }
        } else {
          if(this.items[i].value != event.target.value) {
            continue;
          }
          temp = this.items[i]
        }
      }
      
      this.selected = temp
    }
  }
}
</script>