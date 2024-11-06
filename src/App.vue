<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';

// 使用 ref 定義響應式變數
const newMessage = ref('');
const messages = ref([]);
const isTyping = ref(false);
const chatContainer = ref(null);

const statusClass = computed(() => {
  return {
    'w-3 h-3 rounded-full': true,
    'bg-green-400': !isTyping.value,
    'bg-yellow-400': isTyping.value
  }
});

const formatTime = (timestamp) => {
  return new Intl.DateTimeFormat('zh-TW', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp);  
}

const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
}

const simulateAIResponse = async () => {
  const aiResponses = [
    '我了解你的問題，讓我想想...',
    '這是個很好的問題！',
    '根據我的分析...',
    '我可以協助你解決這個問題'
  ]

  const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
}

const sendMessage = async () => {
}

onMounted(() => {});
</script>

<template>
  <div class="container mx-auto max-w-4xl h-screen p-4">
    <div class="bg-white rounded-lg shadow-lg h-full flex flex-col">
      <!-- 標題列 -->
      <div class="bg-indigo-600 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div :class="statusClass"></div>
          <h1 class="text-xl font-bold">Chat AI 助理</h1>
        </div>
        <div class="text-sm">總共 ?? 則訊息</div>
      </div>

      <!-- 對話區域 -->
      <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
        <div class="flex items-start space-x-3">
          
          <!-- AI 的訊息 -->
            <div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
              AI
            </div>
            <div class="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <p class="text-gray-800">AI 的訊息...</p>
              <span class="text-xs text-gray-500">{{ formatTime(1730877957016) }}</span>
            </div>
          </div>


          <!-- 使用者的訊息 -->
          <div class="flex items-start space-x-3 justify-end">
            <div class="bg-indigo-600 text-white rounded-lg p-3 max-w-[80%]">
              <p>使用者的訊息...</p>
              <span class="text-xs text-gray-300">{{ formatTime(1730877957016) }}</span>
            </div>
            <div class="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
              你
            </div>
          </div>
      </div>

      <!-- 輸入區域 -->
      <div class="border-t p-4">
        <div class="flex space-x-4">
          <input 
            type="text"
            class="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="輸入訊息...">
          <button 
            class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50">
            送出
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
