<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto">
      <div class="py-2 align-middle inline-block min-w-full">
        <div class="overflow-hidden border-b border-gray-200 sm:rounded-t-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <slot name="heading" />
              </tr>
            </thead>
            <tbody>
              <slot />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FTable'
}
</script>
