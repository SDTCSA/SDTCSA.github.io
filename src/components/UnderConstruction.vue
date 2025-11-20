<template>
  <div class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
    <div class="relative flex flex-col items-center p-8 text-center">
      <!-- Animated Icon -->
      <div class="mb-8 relative">
        <div class="absolute inset-0 bg-sky-500/20 dark:bg-sky-400/20 rounded-full blur-xl animate-pulse"></div>
        <div class="relative text-6xl md:text-8xl animate-bounce">
          🚧
        </div>
        <!-- Touhou flavor: Yin-Yang Orb spinning -->
        <div class="absolute -bottom-4 -right-4 w-12 h-12 md:w-16 md:h-16 animate-spin-slow opacity-80">
            <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-lg">
                <circle cx="50" cy="50" r="48" fill="white" stroke="currentColor" stroke-width="4" class="text-red-600 dark:text-red-500"/>
                <path d="M50,2 A48,48 0 0,1 50,98 A24,24 0 0,1 50,50 A24,24 0 0,0 50,2 Z" fill="currentColor" class="text-red-600 dark:text-red-500"/>
                <circle cx="50" cy="26" r="6" fill="white"/>
                <circle cx="50" cy="74" r="6" fill="currentColor" class="text-red-600 dark:text-red-500"/>
            </svg>
        </div>
      </div>

      <h1 class="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
        <span class="text-sky-600 dark:text-sky-400">少女</span>祈祷中...
      </h1>
      <p class="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-md">
        网站正在进行幻想乡化改造，请稍后再来探索。
      </p>
      
      <div class="flex gap-2 items-center text-sm text-slate-400 dark:text-slate-500 font-mono">
        <span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
        <span>Building Resources...</span>
      </div>
    </div>
    
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 1s;"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No logic needed for static overlay
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 3s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-pulse-slow {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
