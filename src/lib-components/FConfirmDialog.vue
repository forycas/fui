<template>
  <FModal ref="FModal">
    <div class="sm:flex sm:items-start">
      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
        <!-- Heroicon name: exclamation -->
        <svg class="h-6 w-6 text-red-600"
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3 v-if="heading" class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
          {{ heading }}
        </h3>
        <div v-if="$slots.default" class="mt-2">
          <p class="text-sm leading-5 text-gray-500">
            <slot />
          </p>
        </div>
      </div>
    </div>
    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <div class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <button @click="$emit('confirm', item)"
                  ref="ConfirmButton"
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
            {{ confirmButtonText }}
          </button>
        </div>
        <div class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <FButton @click="$refs.FModal.close()">Atšaukti</FButton>
        </div>
    </div>
  </FModal>
</template>

<script>
import FButton from './FButton.vue'
import FModal from './FModal.vue'

export default {
  name: 'FConfirmDialog',
  components: { FModal, FButton },
  props: {
    icon: {
      type: String,
      default: 'warning'
    }
  },
  emits: ['confirm'],
  data () {
    return {
      item: null,
      heading: '',
      confirmButtonText: ''
    }
  },
  methods: {
    open ({ item, heading, confirmButtonText }) {
      this.item = item
      this.heading = heading
      this.confirmButtonText = confirmButtonText

      this.$refs.FModal.open()

      this.$nextTick(() => {
        this.$refs.ConfirmButton.focus()
      })
    },
    close () {
      this.$refs.FModal.close()
    }
  }
}
</script>
