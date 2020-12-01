<template>
  <teleport to="#modal-teleport">
    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="isOpen"
        class="fixed bottom-0 inset-x-0 px-4 pb-4 z-50 sm:inset-0 sm:flex sm:items-center sm:justify-center"
      >
        <transition
          enter-active-class="ease-out duration-300"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="ease-in duration-200"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div @click="close" v-show="isOpen" class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
        </transition>

        <transition
          enter-active-class="ease-out duration-300"
          enter-class="-translate-y-16"
          enter-to-class="translate-y-0"
          leave-active-class="ease-in duration-200"
          leave-class="translate-y-0"
          leave-to-class="-translate-y-8"
        >
          <div v-show="isOpen"
               class="bg-white border border-gray-300 rounded-lg px-4 pt-5 pb-4 shadow-2xl transform transition-all sm:max-w-lg sm:w-full sm:p-6">
            <slot></slot>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: 'FModal',
  data () {
    return {
      isOpen: false,
      escHandler: null
    }
  },
  methods: {
    open () {
      this.isOpen = true

      setTimeout(() => {
        this.$emit('opened')
      }, 300)
    },
    close () {
      this.isOpen = false
      setTimeout(() => {
        this.$emit('canceled')
      }, 200)
    }
  },
  created () {
    this.escHandler = (e) => {
      if (this.isOpen && e.key === 'Escape') {
        this.close()
      }
    }

    document.addEventListener('keydown', this.escHandler)
  },
  beforeUnmount () {
    document.removeEventListener('keydown', this.escHandler)
  }
}
</script>
