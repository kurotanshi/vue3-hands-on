<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import MessageBlock from './components/MessageBlock.vue';
import { callOpenAI } from '/src/ai';

// 使用 ref 定義響應式變數
const newMessage = ref('');
const messages = ref([]);
const isTyping = ref(false);
const chatContainer = ref(null);

// 使用 computed 計算屬性
const formattedMessagesCount = computed(() => {
  return `總共 ${messages.value.length} 則訊息`
});

const statusClass = computed(() => {
  return {
    'w-3 h-3 rounded-full': true,
    'bg-green-400': !isTyping.value,
    'bg-yellow-400': isTyping.value
  }
});

const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
}

const simulateAIResponse = async () => {
  isTyping.value = true

  // 模擬 AI 思考時間
  await new Promise(resolve => setTimeout(resolve, 1500));  

  const aiResponses = [
    '我了解你的問題，讓我想想...',
    '這是個很好的問題！',
    '根據我的分析...',
    '我可以協助你解決這個問題'
  ]

  const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

  messages.value.push({
    id: Date.now(),
    content: randomResponse,
    isUser: false,
    timestamp: new Date()
  });

  isTyping.value = false;
  scrollToBottom();
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || isTyping.value) return;

  // 新增使用者訊息
  messages.value.push({
    id: Date.now(),
    content: newMessage.value,
    isUser: true,
    timestamp: new Date()
  });

  // 觸發 AI 回應  
  // await simulateAIResponse();

  const aiResponse = await callOpenAI(newMessage.value);
  messages.value.push({
    id: Date.now(),
    content: aiResponse,
    isUser: false,
    timestamp: new Date()
  });
  
  newMessage.value = '';
  scrollToBottom();
}

// 生命週期鉤子
onMounted(() => {
  // 初始化歡迎訊息
  messages.value.push({
    id: Date.now(),
    content: '你好！我是 AI 助理，很高興為你服務！',
    isUser: false,
    timestamp: new Date()
  });

  scrollToBottom();
});
</script>


<!-- App.vue -->
<template>
  <div class="container mx-auto max-w-4xl h-screen p-4">
    <div class="bg-white rounded-lg shadow-lg h-full flex flex-col">
      <!-- 標題列 -->
      <div class="bg-indigo-600 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div :class="statusClass"></div>
          <h1 class="text-xl font-bold">Chat AI 助理</h1>
        </div>
        <div class="text-sm">
          {{ formattedMessagesCount }}
        </div>
      </div>

      <!-- 對話區域 -->
      <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
        <div v-for="message in messages" :key="message.id" class="flex items-start space-x-3"
          :class="{ 'justify-end': message.isUser }">

          <MessageBlock :isUser="message.isUser" :content="message.content" :timestamp="message.timestamp" />
        </div>
      </div>

      <!-- 輸入區域 -->
      <div class="border-t p-4">
        <div class="flex space-x-4">
          <input v-model="newMessage" @keyup.enter="sendMessage" type="text" :disabled="isTyping"
            class="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            :placeholder="isTyping ? '傳送中...' : '輸入訊息...'">

          <button @click="sendMessage" :disabled="isTyping"
            class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50">
            {{ isTyping ? '傳送中...' : '送出' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>