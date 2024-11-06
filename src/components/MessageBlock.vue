<script setup>
const props = defineProps({
  isUser: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Object,
    required: true
  }
});

const formatTime = (timestamp) => {
  return new Intl.DateTimeFormat('zh-TW', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp);
}
</script>

<template>
  <!-- AI 的訊息 -->
  <template v-if="!isUser">
    <div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
      AI
    </div>
    <div class="bg-gray-100 rounded-lg p-3 max-w-[80%]">
      <p class="text-gray-800">{{ content }}</p>
      <span class="text-xs text-gray-500">{{ formatTime(timestamp) }}</span>
    </div>
  </template>

  <!-- 使用者的訊息 -->
  <template v-else>
    <div class="bg-indigo-600 text-white rounded-lg p-3 max-w-[80%]">
      <p>{{ content }}</p>
      <span class="text-xs text-gray-300">{{ formatTime(timestamp) }}</span>
    </div>
    <div class="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
      你
    </div>
  </template>
</template>
