<template>
  <div class="mt-1 relative" v-click-outside="closeSelect">
    <button @click="toggleSelect"
            type="button"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            ref="trigger"
            class="w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      <span class="flex items-center">
        <span class="ml-3 block truncate">
          {{ selectedValueLabel }}
        </span>
      </span>
      <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
             aria-hidden="true">
          <path fill-rule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd"/>
        </svg>
      </span>
    </button>
    <transition
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0">
      <div class="mt-1 w-full rounded-md bg-white shadow-lg transition ease-in duration-100" ref="popup"
           v-show="showOptions">
        <ul tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3"
            class="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <!--
            Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

            Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
          -->
          <li v-for="(option, i) in options" :key="i"
              id="listbox-item-0"
              @click="selectOption(option)"
              role="option"
              class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-primary-700 hover:text-white">
            <div class="flex items-center">
              <span class="ml-3 block font-normal truncate">
                {{ getOptionLabel(option) }}
              </span>
            </div>

            <!--
              Checkmark, only display for selected option.

              Highlighted: "text-white", Not Highlighted: "text-indigo-600"
            -->
            <span class="absolute inset-y-0 right-0 flex items-center pr-4">
            <!-- Heroicon name: check -->
          </span>
          </li>

          <!-- More options... -->
        </ul>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref, onUnmounted, PropType, computed} from 'vue'
import clickOutside from '@/directives/clickOutside.ts'
import {createPopper, Instance} from "@popperjs/core"

type PopperInstance = Instance

type ObjectOption = {
  label: string;
  value: string | number
}

type SelectOption = ObjectOption | string | number
type Options = Array<SelectOption>

export default defineComponent({
  name: "FSelect",
  directives: {clickOutside},
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
    selectedOption: [Object, String, Number] as PropType<SelectOption>
  },
  setup(props, {emit}) {
    let showOptions = ref<boolean>(false)
    let trigger = ref<HTMLElement>()
    let popup = ref<HTMLElement>()
    let popper: PopperInstance | null = null
    const optionsAreObjects = props.options.every((option: SelectOption) => typeof option === 'object')
    const selectedOptionIsObject = typeof props.modelValue === 'object'
    const optionValuesAreTheSameType = (optionsAreObjects && selectedOptionIsObject) || (!optionsAreObjects && selectedOptionIsObject)
    let selectedValueLabel = computed(() => getSelectedOptionLabel(props.modelValue))

    // Gets label for options
    function getOptionLabel(option: SelectOption): string | number {
      if (typeof option === 'object') {
        return option.label
      }
      return option
    }

    // Gets label to display on select. Depending on provided modelValue type
    function getSelectedOptionLabel(option: SelectOption): string | number {
      let label
      if (optionsAreObjects && !selectedOptionIsObject) {
        let item = props.options.find((item) => (item as ObjectOption).value === option)
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
    function selectOption(option: SelectOption): void {
      if (optionValuesAreTheSameType) {
        emit('update:modelValue', option)
      } else if (optionsAreObjects && !selectedOptionIsObject) {
        let val = props.options.find(item => (item as ObjectOption).value === (option as ObjectOption).value)
        if (val) {
          emit('update:modelValue', (val as ObjectOption).value)
        }
      }
      closeSelect()
    }

    function toggleSelect() {
      showOptions.value = !showOptions.value
      if (showOptions.value) {
        usePopper()
      }
    }

    function usePopper() {
      if (popper) {
        popper.update()
      } else if (!popper && trigger.value && popup.value) {
        popper = createPopper(trigger.value, popup.value, {
          placement: 'bottom',
          modifiers: [
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['top', 'bottom'],
              },
            },
          ],
        })
      }
    }

    function closeSelect() {
      showOptions.value = false
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
      toggleSelect,
      closeSelect,
      getOptionLabel,
      selectOption
    }
  }
})
</script>
