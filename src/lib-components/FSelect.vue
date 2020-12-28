<template>
  <div class="mt-1 relative" v-click-outside="closeSelect">
    <div ref="trigger"
         aria-haspopup="listbox"
         aria-expanded="true"
         @click="openSelect"
         class="w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default sm:text-sm">
      <input ref="searchInput"
             :value="showOptions ? searchTerm : selectedValueLabel"
             @input="searchTerm = $event.target.value"
             class="w-full pl-3 focus:ring-transparent appearance-none focus:outline-none block border-none"
             v-if="searchable" />
      <span class="cursor-pointer flex items-center" v-else>
        <span class="h-5 ml-3 block truncate">
          {{ selectedValueLabel }}
        </span>
      </span>

      <span class="ml-3 z-10 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
             aria-hidden="true">
          <path fill-rule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd" />
        </svg>
      </span>
    </div>
    <transition
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0">
      <div class="z-10 mt-1 w-full rounded-md bg-white shadow-lg transition ease-in duration-100" ref="popup"
           v-show="showOptions">
        <ul tabindex="-1" role="listbox"
            class="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <li v-for="(option, i) in filteredOptions" :key="i"
              @click="selectOption(option)"
              role="option"
              class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-primary-700 hover:text-white"
              :class="getActiveClass(option)">
            <div class="flex items-center">
              <span class="ml-3 block font-normal truncate">
                {{ getOptionLabel(option) }}
              </span>
            </div>
            <span class="absolute inset-y-0 right-0 flex items-center pr-4">
          </span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-use-before-define */

import { defineComponent, ref, onUnmounted, PropType, computed, Ref, nextTick } from 'vue'
import clickOutside from '@/directives/clickOutside.ts'
import { createPopper, Instance } from '@popperjs/core'

type PopperInstance = Instance

type ObjectOption = {
  label: string;
  value: string | number;
}

type TriggerRef = Ref<HTMLDivElement | null>
type PopupRef = Ref<HTMLDivElement | null>
type SearchInputRef = Ref<HTMLInputElement | null>

type SelectOption = ObjectOption | string | number
type Options = Array<SelectOption>

export default defineComponent({
  name: 'FSelect',
  directives: { clickOutside },
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: [Object, String, Number] as PropType<SelectOption>,
      default: ''
    },
    options: {
      type: Array as PropType<Options>,
      default: () => {
        return []
      }
    },
    searchable: Boolean as PropType<boolean>,
    selectedOption: [Object, String, Number] as PropType<SelectOption>
  },
  setup (props, { emit }) {
    // Refs
    const showOptions = ref<boolean>(false)
    const trigger = ref<TriggerRef['value']>(null)
    const popup = ref<PopupRef['value']>(null)
    const searchInput = ref<SearchInputRef['value']>(null)
    let popper: PopperInstance | null = null
    const searchTerm = ref<string>('')

    // Helper const
    const pointer = ref(0)
    const optionsAreObjects = props.options.every((option: SelectOption) => isObjectOption(option))
    const selectedOptionIsObject = isObjectOption(props.modelValue)
    const optionValuesAreTheSameType = (optionsAreObjects && selectedOptionIsObject) || (!optionsAreObjects && !selectedOptionIsObject)

    // Computed values
    const selectedValueLabel = computed(() => getSelectedOptionLabel(props.modelValue))
    const filteredOptions = computed(() => {
      if (searchTerm.value) {
        if (optionsAreObjects) {
          return props.options.filter(option => isObjectOption(option) && option.label.toUpperCase().includes(searchTerm.value.toUpperCase()))
        }
        return props.options.filter(option => isNumberOption(option) ? option.toString().includes(searchTerm.value) : !isObjectOption(option) && option.toUpperCase().includes(searchTerm.value.toUpperCase()))
      }
      return props.options
    })

    // Utils
    function isObjectOption (option: SelectOption): option is ObjectOption {
      return {}.hasOwnProperty.call(option as ObjectOption, 'value')
    }

    function isNumberOption (option: SelectOption): option is number {
      return typeof option === 'number'
    }

    // Gets label for options
    function getOptionLabel (option: SelectOption): string | number {
      if (typeof option === 'object') {
        return option.label
      }
      return option
    }

    function setPointer (index: number) {
      pointer.value = index
    }

    // Gets class attrs for active option
    function getActiveClass (option: SelectOption) {
      const isActiveOption = isObjectOption(option) && isObjectOption(props.modelValue) ? option.value === props.modelValue.value : option === props.modelValue
      return isActiveOption ? 'bg-primary-600 text-white font-semibold' : 'text-gray-900'
    }

    // Gets label to display on select. Depending on provided modelValue type
    function getSelectedOptionLabel (option: SelectOption): string | number {
      let label
      if (optionsAreObjects && !selectedOptionIsObject) {
        const item = props.options.find((item: SelectOption) => isObjectOption(item) && item.value === option)
        if (item) {
          label = (item as ObjectOption).label
        }
      } else if (!optionsAreObjects && optionValuesAreTheSameType) {
        label = (option as string | number)
      } else if (optionsAreObjects && optionValuesAreTheSameType) {
        label = (option as ObjectOption).label
      }
      return label || ''
    }

    // Selects option and emits back to `v-model`
    function selectOption (option: SelectOption): void {
      if (optionValuesAreTheSameType) {
        emit('update:modelValue', option)
      } else if (optionsAreObjects && !selectedOptionIsObject) {
        const val = props.options.find(item => (item as ObjectOption).value === (option as ObjectOption).value)
        if (val) {
          emit('update:modelValue', (val as ObjectOption).value)
        }
      }
      closeSelect()
    }

    function openSelect (): void {
      showOptions.value = true
      usePopper()
      if (props.searchable) {
        nextTick(() => {
          searchInput.value && searchInput.value.focus()
        })
      }
    }

    function usePopper (): void {
      if (popper) {
        popper.update()
      } else if (!popper && trigger.value && popup.value) {
        popper = createPopper(trigger.value, popup.value, {
          placement: 'bottom',
          modifiers: [
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['top', 'bottom']
              }
            }
          ]
        })
      }
    }

    function closeSelect (): void {
      showOptions.value = false
      searchTerm.value = ''
    }

    onUnmounted(() => {
      if (popper) {
        popper.destroy()
      }
    })

    return {
      showOptions,
      trigger,
      popup,
      selectedValueLabel,
      searchTerm,
      filteredOptions,
      pointer,
      setPointer,
      getActiveClass,
      openSelect,
      closeSelect,
      getOptionLabel,
      selectOption
    }
  }
})
</script>
