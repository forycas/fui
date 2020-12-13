<template>
  <div v-click-outside="closeDropdown" class="mt-1 relative">
    <button @click="toggleDropdown"
            type="button"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            class="relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            :class="{
              'bg-white border-gray-300': styling === 'default',
              'bg-primary-700 text-white border-primary-900': styling === 'dark'
            }"
    >
      <span class="block truncate leading-5 h-5">
        {{ label }}
      </span>
      <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg class="h-5 w-5"
             :class="{
               'text-gray-400': styling === 'default',
               'text-white': styling === 'dark'
             }"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 20 20"
             fill="currentColor"
             aria-hidden="true">
          <path fill-rule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd" />
        </svg>
      </span>
    </button>

    <transition
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <div v-if="dropdownState === DROPDOWN_STATES.OPEN"
           class="absolute z-20 mt-1 w-full rounded-md bg-white shadow-lg transition duration-200">
        <ul tabindex="-1"
            role="listbox"
            aria-labelledby="listbox-label"
            class="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <!-- Highlighted: "text-white bg-primary-600", Not Highlighted: "text-gray-900"-->
          <li v-for="(option, $index) in options"
              @click="select(option)"
              :key="option.value"
              role="option"
              class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-primary-700 hover:text-white"
              :class="{
                'text-gray-900': option.value !== modelValue,
                'bg-primary-600 text-white font-semibold': option.value === modelValue
              }">
            <span class="font-normal block truncate">
              {{ option.label }}
            </span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import clickOutside from '@/directives/clickOutside.ts'

const DROPDOWN_STATES = {
  CLOSED: 'closed',
  OPENING: 'opening',
  OPEN: 'open',
  CLOSING: 'closing'
}

export default {
  name: 'FSelect',
  props: {
    id: String,
    modelValue: {
      type: [Number, String, Object],
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    styling: {
      type: String,
      default: 'default',
      validator: value => ['default', 'dark'].includes(value)
    }
  },
  directives: {
    clickOutside
  },
  data () {
    return {
      label: this._findValue(this.modelValue),
      DROPDOWN_STATES,
      dropdownState: DROPDOWN_STATES.CLOSED
    }
  },
  methods: {
    select (option) {
      this.$emit('update:modelValue', option.value)

      this.label = option.label

      this.closeDropdown()
    },
    _findValue (value) {
      return this.options.find(option => option.value === value)?.label
    },
    toggleDropdown () {
      if ([DROPDOWN_STATES.OPENING, DROPDOWN_STATES.OPEN].includes(this.dropdownState)) {
        return this.closeDropdown()
      } else if ([DROPDOWN_STATES.CLOSING, DROPDOWN_STATES.CLOSED].includes(this.dropdownState)) {
        return this.openDropdown()
      }
    },
    openDropdown () {
      if ([DROPDOWN_STATES.OPENING, DROPDOWN_STATES.OPEN].includes(this.dropdownState)) {
        return
      }

      this.dropdownState = DROPDOWN_STATES.OPENING

      setTimeout(() => {
        this.$nextTick(() => {
          this.dropdownState = DROPDOWN_STATES.OPEN
        })
      }, 200)
    },
    closeDropdown () {
      if ([DROPDOWN_STATES.CLOSING, DROPDOWN_STATES.CLOSED].includes(this.dropdownState)) {
        return
      }

      this.dropdownState = DROPDOWN_STATES.CLOSING

      setTimeout(() => {
        this.$nextTick(() => {
          this.dropdownState = DROPDOWN_STATES.CLOSED
        })
      }, 200)
    }
  }
}
</script>
