<template>
  <div class="bg-white px-4 py-3 flex items-center justify-between border-gray-200 sm:px-6">
    <div class="flex-1 flex justify-between sm:hidden">
      <a href="#"
         class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
        &lt;
      </a>
      <a href="#"
         class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
        &gt;
      </a>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p v-if="total" class="text-sm leading-5 text-gray-700">
          Rodoma nuo
          <span class="font-medium">{{ (current - 1) * perPage + 1 }}</span>
          iki
          <span class="font-medium">{{ maxItems }}</span>
          iš
          <span class="font-medium">{{ total }}</span>
        </p>

        <p v-else class="text-sm leading-5 text-gray-700">Nėra įrašų</p>
      </div>

      <div v-if="total">
        <nav class="relative z-0 inline-flex shadow-sm">
          <a href="#"
             @click.prevent="current !== 1 ? $emit('input', current - 1) : null"
             class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
             :class="{'bg-gray-200': current === 1}"
             aria-label="Previous">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
            </svg>
          </a>
          <template v-for="(page, $index) in pages" :key="$index">
            <a
              v-if="page !== '...'"
              @click.prevent="$emit('input', page)"
              href="#"
              class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150"
              :class="{'bg-teal-600 text-white': page === current, 'bg-white text-gray-700 hover:bg-gray-200 active:text-gray-700 active:bg-gray-100 ': page !== current}"
            >
              {{ page }}
            </a>
            <span v-else class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
              ...
            </span>
          </template>
          <a
             href="#"
             @click.prevent="current !== pages[pages.length - 1] ? $emit('input', current + 1) : null"
             class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
             :class="{'bg-gray-200': current === pages[pages.length - 1]}"
             aria-label="Next">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd" />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FPagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    maxItems () {
      return this.current * this.perPage < this.total ? this.current * this.perPage : this.total
    },
    pages () {
      const totalPages = Math.ceil(this.total / this.perPage)
      const allPages = [...new Array(totalPages)].map((_, i) => i + 1)

      if (allPages.length < 8) {
        return allPages
      }

      const firstPages = [1, 2]
      const middlePages = [this.current - 1, this.current, this.current + 1]
      const lastPages = [allPages.length - 1, allPages.length]

      return [
        ...firstPages,
        ...middlePages,
        ...lastPages
      ].reduce((list, page, index) => {
        if (page <= 0 || page <= list[list.length - 1] || page >= totalPages + 1) {
          return list
        }

        if (index && (list[list.length - 1] !== page - 1)) {
          list.push('...')
        }

        list.push(page)

        return list
      }, [])
    }
  }
}
</script>
