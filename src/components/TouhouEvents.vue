<template>
  <section id="event" class="scroll-mt-20">
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-50">山东省内东方活动</h2>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
          探索山东各地的东方Project相关展会、聚会与活动（统计截止：10月28日）
        </p>
      </div>
    </div>

    <!-- Event Grid -->
    <div class="columns-1 gap-6 sm:columns-2 space-y-6">
      <div 
        v-for="event in visibleEvents" 
        :key="event.id"
        class="group relative cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl dark:shadow-slate-800/50 break-inside-avoid"
        @click="openEvent(event)"
      >
        <!-- Image Container -->
        <div class="w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
          <img 
            :src="resolveImage(event.image)" 
            :alt="event.title"
            class="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <!-- Overlay Gradient -->
          <div class="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-900/60 to-transparent opacity-90 transition-opacity group-hover:opacity-80"></div>
        </div>

        <!-- Content -->
        <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div class="mb-1 flex items-center gap-2 text-xs font-medium text-slate-200">
            <span 
              class="rounded-full px-2 py-0.5 backdrop-blur-sm border"
              :class="getStatusClass(event.status)"
            >
              {{ event.status }}
            </span>
            <span>{{ event.date }}</span>
          </div>
          <h3 class="text-lg font-bold leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{{ event.title }}</h3>
          <p class="mt-1 text-xs text-slate-200 line-clamp-1">{{ event.location }}</p>
        </div>
      </div>
    </div>

    <!-- Toggle Button -->
    <div class="mt-8 flex justify-center">
      <button 
        @click="isExpanded = !isExpanded"
        class="group flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 px-6 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 transition-all hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow-md"
      >
        <span>{{ isExpanded ? '收起活动' : '查看更多活动' }}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          class="transition-transform duration-300"
          :class="isExpanded ? 'rotate-180' : ''"
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
    </div>

    <!-- Event Detail Modal -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="selectedEvent" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeEvent"></div>

        <!-- Modal Content -->
        <div class="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-slate-900/5 dark:ring-slate-100/10">
          <!-- Close Button -->
          <button 
            @click="closeEvent"
            class="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-2 text-white backdrop-blur-md transition hover:bg-black/40"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>

          <!-- Modal Image -->
          <div class="relative aspect-video w-full bg-slate-100 dark:bg-slate-800">
            <img :src="resolveImage(selectedEvent.image)" :alt="selectedEvent.title" class="h-full w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6 text-white">
              <h3 class="text-2xl font-bold">{{ selectedEvent.title }}</h3>
              <div class="mt-2 flex flex-wrap gap-4 text-sm text-slate-200">
                <div class="flex items-center gap-1.5">
                  <span>📅</span> {{ selectedEvent.date }}
                </div>
                <div class="flex items-center gap-1.5">
                  <span>📍</span> {{ selectedEvent.location }}
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Body -->
          <div class="p-6 text-slate-600 dark:text-slate-300">
            <div class="prose prose-sm dark:prose-invert max-w-none">
              <p class="whitespace-pre-line">{{ selectedEvent.description }}</p>
            </div>
            
            <div class="mt-6 flex justify-end gap-3">
              <button 
                v-if="selectedEvent.link"
                @click="openLink(selectedEvent.link)"
                class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400"
              >
                了解详情
              </button>
              <button 
                @click="closeEvent"
                class="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { resolveImage } from '@/utils/image';

interface TouhouEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  status: '筹备中' | '售票中' | '进行中' | '已结束' | '待定';
  image: string;
  description: string;
  link?: string;
}

const isExpanded = ref(false);

const events = ref<TouhouEvent[]>([
  // 已宣发/定档
  {
    id: 1,
    title: '山东东方高校联合例会01-齐鲁幻聚',
    date: '2025年12月20日',
    location: '济南',
    status: '售票中',
    image: '/posters/qlhj.webp',
    description: '山东东方高校联合会12月例会。\n\n群聊：977015593',
    link: 'https://touhou.market/main/events/320'
  },
  {
    id: 2,
    title: '济南绊月花田岁华逐宴',
    date: '1月27-28日',
    location: '济南',
    status: '筹备中',
    image: '/posters/byht.webp',
    description: '济南绊月花田岁华逐宴。\n\n群聊：981769085',
    link: 'https://qm.qq.com/q/981769085'
  },
  {
    id: 3,
    title: '泰安THP',
    date: '2月',
    location: '泰安',
    status: '筹备中',
    image: '/posters/tathp.webp',
    description: '泰安东方Project Only聚会。\n\n群聊：1057613342',
    link: 'https://qm.qq.com/q/1057613342'
  },
  {
    id: 4,
    title: '东方霜林宴in聊城东昌府',
    date: '2月10-11日',
    location: '聊城东昌府',
    status: '筹备中',
    image: '/posters/dfsly.webp',
    description: '东方霜林宴in聊城东昌府。\n\n联系群：184537740',
    link: 'https://qm.qq.com/q/184537740'
  },
  {
    id: 5,
    title: '济宁THP',
    date: '2月22日',
    location: '济宁',
    status: '筹备中',
    image: 'https://via.placeholder.com/600x848/f472b6/ffffff?text=Poster+Coming+Soon',
    description: '济宁东方Project Only聚会。\n\n联系群：907803271',
    link: 'https://qm.qq.com/q/907803271'
  },
  {
    id: 6,
    title: '枣庄THP',
    date: '暑假',
    location: '枣庄',
    status: '筹备中',
    image: 'https://via.placeholder.com/600x848/f472b6/ffffff?text=Poster+Coming+Soon',
    description: '枣庄东方Project Only聚会。\n\n联系群：1064395892',
    link: 'https://qm.qq.com/q/1064395892'
  },
  // 未宣发定档
  {
    id: 7,
    title: '琴岛THO',
    date: '待定',
    location: '青岛',
    status: '待定',
    image: 'https://via.placeholder.com/600x338/94a3b8/ffffff?text=Qingdao+THO',
    description: '琴岛东方Project Only展会（筹备中）。\n\n联系群：574073900',
    link: 'https://qm.qq.com/q/574073900'
  },
  {
    id: 8,
    title: '山东THO',
    date: '待定',
    location: '山东',
    status: '待定',
    image: 'https://via.placeholder.com/600x338/94a3b8/ffffff?text=Shandong+THO',
    description: '山东东方Project Only展会（筹备中）。\n\n联系群：856223214',
    link: 'https://qm.qq.com/q/856223214'
  },
  {
    id: 9,
    title: '烟台THO',
    date: '待定',
    location: '烟台',
    status: '待定',
    image: 'https://via.placeholder.com/600x338/94a3b8/ffffff?text=Yantai+THO',
    description: '烟台东方Project Only展会（筹备中）。\n\n联系群：526544033',
    link: 'https://qm.qq.com/q/526544033'
  },
  {
    id: 10,
    title: '威海THP',
    date: '待定',
    location: '威海',
    status: '待定',
    image: 'https://via.placeholder.com/600x338/94a3b8/ffffff?text=Weihai+THP',
    description: '威海东方Project Only聚会（筹备中）。\n\n联系群：915438943',
    link: 'https://qm.qq.com/q/915438943'
  },
  {
    id: 11,
    title: '临沂THP',
    date: '待定',
    location: '临沂',
    status: '待定',
    image: 'https://via.placeholder.com/600x338/94a3b8/ffffff?text=Linyi+THP',
    description: '临沂东方Project Only聚会（筹备中）。\n\n联系群：720728319',
    link: 'https://qm.qq.com/q/720728319'
  },
  {
    id: 12,
    title: '日照THP',
    date: '待定',
    location: '日照',
    status: '待定',
    image: 'https://via.placeholder.com/600x338/94a3b8/ffffff?text=Rizhao+THP',
    description: '日照东方Project Only聚会（筹备中）。\n\n联系群：926445614',
    link: 'https://qm.qq.com/q/926445614'
  },
  {
    id: 13,
    title: '淄博THP',
    date: '待定',
    location: '淄博',
    status: '待定',
    image: 'https://via.placeholder.com/600x338/94a3b8/ffffff?text=Zibo+THP',
    description: '淄博东方Project Only聚会（筹备中）。\n\n联系群：1145635997',
    link: 'https://qm.qq.com/q/1145635997'
  }
]);

const visibleEvents = computed(() => {
  if (isExpanded.value) {
    return events.value;
  }
  // Show first 6 events by default (assuming they are sorted by date)
  return events.value.slice(0, 6);
});

const selectedEvent = ref<TouhouEvent | null>(null);

const openEvent = (event: TouhouEvent) => {
  selectedEvent.value = event;
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
};

const closeEvent = () => {
  selectedEvent.value = null;
  document.body.style.overflow = '';
};

const getStatusClass = (status: string) => {
  switch (status) {
    case '售票中':
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    case '进行中':
      return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
    case '筹备中':
      return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    case '已结束':
      return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    default: // 待定
      return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  }
};

const openLink = (url: string) => {
  window.open(url, '_blank');
};
</script>
