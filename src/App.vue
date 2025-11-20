<template>
  <UnderConstruction />
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
    <!-- 顶部导航 -->
    <header class="sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur transition-colors duration-300">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 rounded bg-sky-600 dark:bg-sky-500 shadow-lg shadow-sky-500/20 dark:shadow-sky-500/40" />
          <div>
            <p class="text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-100">山东东方高校联合会</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">Shandong Touhou College Students Union</p>
          </div>
        </div>

        <nav class="hidden gap-6 text-sm text-slate-600 dark:text-slate-300 md:flex items-center">
          <button class="hover:text-sky-600 dark:hover:text-white transition-colors" @click="scrollTo('hero')">主页</button>
          <button class="hover:text-sky-600 dark:hover:text-white transition-colors" @click="scrollTo('event')">活动</button>
          <button class="hover:text-sky-600 dark:hover:text-white transition-colors" @click="scrollTo('college')">高校一览</button>
          <button class="hover:text-sky-600 dark:hover:text-white transition-colors" @click="scrollTo('joinus')">加入我们</button>
          
          <!-- Season Effect Toggle -->
          <button 
            class="ml-2 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
            @click="toggleSeasonEffect"
            :title="isSeasonEffectActive ? '关闭季节特效' : '开启季节特效'"
          >
            <span v-if="isSeasonEffectActive">
               <span v-if="currentSeason === 'spring'">🌸</span>
               <span v-else-if="currentSeason === 'summer'">🍃</span>
               <span v-else-if="currentSeason === 'autumn'">🍂</span>
               <span v-else>❄️</span>
            </span>
            <span v-else class="opacity-50 grayscale">🚫</span>
          </button>
        </nav>
      </div>
    </header>

    <SeasonalEffects :active="isSeasonEffectActive" ref="seasonalEffectsRef" />

    <!-- 页面主体 -->
    <main class="mx-auto max-w-7xl px-4 pb-16 pt-10 space-y-20">
      <!-- Hero 区块 -->
      <section 
        id="hero" 
        ref="heroRef"
        class="relative isolate grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center overflow-hidden rounded-3xl p-6 md:p-10 -mx-4 md:mx-0"
        @mousemove="handleHeroMouseMove"
      >
        <!-- Dynamic Background -->
        <div class="absolute inset-0 -z-10 pointer-events-none overflow-hidden rounded-3xl">
            <!-- Primary Glow -->
            <div 
                class="absolute w-[500px] h-[500px] rounded-full bg-sky-400/20 dark:bg-sky-500/20 blur-[80px] transition-transform duration-100 ease-out will-change-transform"
                :style="{ transform: `translate(${mouseX - 250}px, ${mouseY - 250}px)` }"
            ></div>
             <!-- Secondary Glow (Delayed/Offset) -->
             <div 
                class="absolute w-[300px] h-[300px] rounded-full bg-fuchsia-400/20 dark:bg-fuchsia-500/20 blur-[60px] transition-transform duration-300 ease-out will-change-transform"
                :style="{ transform: `translate(${mouseX * 0.8 - 150}px, ${mouseY * 0.8 - 150}px)` }"
            ></div>
        </div>

        <div class="relative z-10">
          <p class="inline-flex items-center gap-1 rounded-full border border-sky-200 dark:border-sky-500/40 bg-sky-50 dark:bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-700 dark:text-sky-300">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            山高联，复活！
          </p>
          <h1 class="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-slate-50 md:text-4xl">
            梦入 <span class="text-sky-600 dark:text-sky-400">幻想</span><br>
            齐聚 <span class="text-sky-600 dark:text-sky-400">齐鲁</span>
          </h1>
          <p class="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            山东东方高校联合会由山东省内多所高校的东方众联合成立，致力于促进各高校间的交流与连接，共同推动东方project在山东高校内的发展与传播。

          </p>

          <div class="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <a
              href="#event"
              class="rounded bg-sky-600 dark:bg-sky-500 px-4 py-2 font-medium text-white dark:text-slate-950 shadow shadow-sky-500/20 dark:shadow-sky-500/40 transition hover:bg-sky-700 dark:hover:bg-sky-400"
            >
              查看当前活动
            </a>
            <a
              href="#joinus"
              class="rounded border border-slate-300 dark:border-slate-700 px-4 py-2 font-medium text-slate-700 dark:text-slate-100 transition hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50"
            >
              加入我们
            </a>
          </div>

          <div class="mt-6 flex flex-wrap gap-4 text-[11px] text-slate-500 dark:text-slate-400">
            <div class="flex items-center gap-1.5">
              <span class="h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-sky-400" />
              校际交流
            </div>
            <div class="flex items-center gap-1.5">
              <span class="h-1.5 w-1.5 rounded-full bg-fuchsia-500 dark:bg-fuchsia-400" />
              线下聚会
            </div>
            <div class="flex items-center gap-1.5">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              同人创作
            </div>
          </div>
        </div>

        <!-- 右侧卡片：技术栈简介 -->
        <aside class="relative z-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 shadow-xl shadow-slate-200/50 dark:shadow-sky-900/40 transition-colors duration-300">
          <h2 class="text-sm font-semibold text-slate-900 dark:text-slate-100">近期活动预告</h2>
          <p class="mt-1 text-[11px] text-slate-500 dark:text-slate-400">精彩活动不容错过，欢迎大家积极参与。</p>
          <dl class="mt-4 space-y-3 text-xs">
            <div class="flex justify-between">
              <dt class="text-slate-700 dark:text-slate-300">例会交流</dt>
              <dd class="text-slate-500 dark:text-slate-400">定期举办线下/线上例会</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-slate-700 dark:text-slate-300">同人展参展</dt>
              <dd class="text-slate-500 dark:text-slate-400">组织参加各地同人展会</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-slate-700 dark:text-slate-300">线上联机</dt>
              <dd class="text-slate-500 dark:text-slate-400">非想天则/STG/其他游戏</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-slate-700 dark:text-slate-300">合刊制作</dt>
              <dd class="text-slate-500 dark:text-slate-400">联合制作社团刊物与周边</dd>
            </div>
          </dl>
        </aside>
      </section>

      <!-- 高校社群 -->
      <UniversityCommunity id="college" />

      <!-- 关于项目 -->
      <section id="about" class="space-y-4">
        <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-50">关于我们</h2>
        <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          山东东方高校联合会（SDTCSA）是一个致力于连接山东省内各高校东方Project爱好者的非营利性学生组织。
          我们旨在搭建一个开放、友好的交流平台，促进各高校社团之间的资源共享与合作。
        </p>
        <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          无论你是刚入坑的新人，还是资深的东方众，在这里都能找到志同道合的伙伴。
          我们定期举办各类线上线下活动，共同探索幻想乡的无限可能。
        </p>
      </section>

      <!-- 功能亮点 -->
      <section id="features" class="space-y-5">
        <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-50">社团活动与特色</h2>
        <div class="grid gap-4 md:grid-cols-3">
          <article class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 text-xs shadow-sm dark:shadow-none transition-colors duration-300">
            <h3 class="font-semibold text-slate-900 dark:text-slate-100">校际联动</h3>
            <p class="mt-2 text-slate-600 dark:text-slate-300">
              打破校园围墙，组织跨校联谊、互访交流，让不同学校的东方众紧密联系在一起。
            </p>
          </article>
          <article class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 text-xs shadow-sm dark:shadow-none transition-colors duration-300">
            <h3 class="font-semibold text-slate-900 dark:text-slate-100">创作扶持</h3>
            <p class="mt-2 text-slate-600 dark:text-slate-300">
              鼓励并支持社员进行同人创作，包括绘画、小说、音乐、游戏制作等，提供展示平台与技术指导。
            </p>
          </article>
          <article class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 text-xs shadow-sm dark:shadow-none transition-colors duration-300">
            <h3 class="font-semibold text-slate-900 dark:text-slate-100">资源共享</h3>
            <p class="mt-2 text-slate-600 dark:text-slate-300">
              共享活动经验、展会信息、制作教程等资源，帮助各高校社团更好地发展与建设。
            </p>
          </article>
        </div>
      </section>

      <!-- 页面结构展示 / 导航说明 -->
      <section id="joinus" class="space-y-4">
        <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-50">加入我们</h2>
        <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li>· 官方QQ群：请点击上方“高校社群”中对应学校的校徽获取群号。</li>
          <li>· 联合会招新：每年秋季学期开学初进行，敬请关注官方动态。</li>
          <li>· 合作联系：如有商务合作或活动联办意向，请联系我们的负责人。</li>
        </ul>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          欢迎每一位热爱东方Project的同学加入我们的大家庭！
        </p>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/90 transition-colors duration-300">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-[11px] text-slate-500 md:flex-row">
        <p>© {{ new Date().getFullYear() }} SDTCSA Web Template. 保留部分设计思路，欢迎二次创作。</p>
        <p class="text-slate-500">基于 Vue 3 · TypeScript · TailwindCSS · Vite 构建</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import UniversityCommunity from './components/UniversityCommunity.vue';
import SeasonalEffects from './components/SeasonalEffects.vue';
import UnderConstruction from './components/UnderConstruction.vue';

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Season Effect Logic
const isSeasonEffectActive = ref(true);
const seasonalEffectsRef = ref<InstanceType<typeof SeasonalEffects> | null>(null);

const currentSeason = computed(() => {
    return seasonalEffectsRef.value?.currentSeason || 'spring';
});

const toggleSeasonEffect = () => {
  isSeasonEffectActive.value = !isSeasonEffectActive.value;
};

// Hero background effect
const heroRef = ref<HTMLElement | null>(null);
const mouseX = ref(0);
const mouseY = ref(0);

const handleHeroMouseMove = (e: MouseEvent) => {
  if (!heroRef.value) return;
  const rect = heroRef.value.getBoundingClientRect();
  mouseX.value = e.clientX - rect.left;
  mouseY.value = e.clientY - rect.top;
};

onMounted(() => {
  // Initialize glow at the center
  if (heroRef.value) {
    const rect = heroRef.value.getBoundingClientRect();
    mouseX.value = rect.width / 2;
    mouseY.value = rect.height / 2;
  }
});
</script>

<style scoped>
</style>
