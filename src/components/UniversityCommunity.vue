<script setup lang="ts">
import { ref } from 'vue';
import { resolveImage } from '@/utils/image';

interface ContactInfo {
  qqGroup?: string;
  qrCode?: string;
  description?: string;
}

interface University {
  id: number;
  name: string;
  logo: string;
  contact: ContactInfo;
}

const universities: University[] = [
  {
    id: 1,
    name: '山东大学',
    logo: '/logos/sdu.png',
    contact: { qqGroup: '186295950', description: '★山东大学♪幻想浮世伊行★蓬莱清辉学海浮幻想，灵山风起浩然行世伊★' }
  },
  {
    id: 2,
    name: '山东大学（威海）',
    logo: '/logos/sduwh.webp',
    contact: { qqGroup: '908978336', description: '崴车万同好会' }
  },
  {
    id: 3,
    name: '山东理工大学',
    logo: '/logos/sdut.webp',
    contact: { qqGroup: '982212088' }
  },
  {
    id: 4,
    name: '山东中医药大学',
    logo: '/logos/sdutcm.webp',
    contact: { qqGroup: '917763620' }
  },
  {
    id: 5,
    name: '山东建筑大学',
    logo: '/logos/sdjzu.webp',
    contact: { qqGroup: '579042420', description: '济南山童联合协会' }
  },
  {
    id: 6,
    name: '山东体育学院',
    logo: '/logos/sdpei.webp',
    contact: { qqGroup: '871721412' }
  },
  {
    id: 7,
    name: '山东交通学院',
    logo: '/logos/sdjtu.webp',
    contact: { qqGroup: '937924293' }
  },
  {
    id: 8,
    name: '山东青年政治学院',
    logo: '/logos/sdyu.webp',
    contact: { qqGroup: '659598919' }
  },
  {
    id: 9,
    name: '山东师范大学',
    logo: '/logos/sdnu.webp',
    contact: { qqGroup: '743070412' }
  },
   {
    id: 10,
    name: '山东管理学院',
    logo: '/logos/smu.webp',
    contact: { qqGroup: '1070267383' ,description:'山东管理学院东方同好会'}
  },
  {
    id: 11,
    name: '齐鲁工业大学',
    logo: '/logos/qlu.webp',
    contact: { qqGroup: '1021423802' }
  },
  {
    id: 12,
    name: '中国石油大学（华东）',
    logo: '/logos/UPC.webp',
    contact: { qqGroup: '631941461' }
  },
  {
    id: 13,
    name: '神秘占位符',
    logo: '/logos/derakuma.webp',
    contact: { qqGroup: 'xxxx' ,description:'xxxxx'}
  },
  {
    id: 14,
    name: '山东石油化工学院',
    logo: '/logos/sdipct.webp',
    contact: { qqGroup: '644182264' }
  },
  {
    id: 15,
    name: '济南大学',
    logo: '/logos/ujn.webp',
    contact: { qqGroup: '856370052' }
  },
  {
    id: 16,
    name: '枣庄学院',
    logo: '/logos/uzz.webp',
    contact: { qqGroup: '852282759' }
  },
  {
    id: 17,
    name: '东营科技职业学院',
    logo: '/logos/dykj.webp',
    contact: { qqGroup: '644182264' }
  },
  {
    id: 18,
    name: '聊城大学',
    logo: '/logos/lcu.webp',
    contact: { qqGroup: '514756242' }
  },
  {
    id: 19,
    name: '烟台大学',
    logo: '/logos/ytu.webp',
    contact: { qqGroup: '1007450236' }
  },
   {
    id: 20,
    name: '鲁东大学',
    logo: '/logos/ldu.webp',
    contact: { qqGroup: '1071013231' }
  },
  {
    id: 21,
    name: '齐鲁理工学院',
    logo: '/logos/qiot.webp',
    contact: { qqGroup: '1011030824' }
  },
  {
    id: 22,
    name: '枣庄职业学院',
    logo: '/logos/zvc.webp',
    contact: { qqGroup: '1020621071' }
  },
  {
    id: 23,
    name: '青岛农业大学',
    logo: '/logos/qau.webp',
    contact: { qqGroup: '815491041' }
  },
  {
    id: 24,
    name: '添加你的学校',
    logo: '/logos/more.webp',
    contact: { qqGroup: '977015593', description: '请加入山高联群聊私信管理员添加' }
  },

];

const selectedUniversity = ref<University | null>(null);
const isModalOpen = ref(false);

const openModal = (uni: University) => {
  selectedUniversity.value = uni;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// Physics/Hover effect logic
const handleMouseMove = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  
  // Calculate rotation
  const rotateX = -y / 6; 
  const rotateY = x / 6;
  
  // Calculate shine position
  const shineX = 50 + (x / rect.width) * 100;
  const shineY = 50 + (y / rect.height) * 100;

  // Apply CSS variables for 3D effect
  target.style.setProperty('--rotate-x', `${rotateX}deg`);
  target.style.setProperty('--rotate-y', `${rotateY}deg`);
  target.style.setProperty('--shine-x', `${shineX}%`);
  target.style.setProperty('--shine-y', `${shineY}%`);
};

const handleMouseLeave = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement;
  target.style.setProperty('--rotate-x', '0deg');
  target.style.setProperty('--rotate-y', '0deg');
  target.style.setProperty('--shine-x', '50%');
  target.style.setProperty('--shine-y', '50%');
};

const handleClick = (e: MouseEvent, uni: University) => {
  // Find the logo container to spin
  const card = e.currentTarget as HTMLElement;
  const logo = card.querySelector('.uni-logo') as HTMLElement;
  
  if (logo) {
    logo.classList.add('animate-spin-once');
    
    // Remove class after animation to allow re-triggering
    setTimeout(() => {
      logo.classList.remove('animate-spin-once');
      openModal(uni);
    }, 600);
  } else {
    openModal(uni);
  }
};
</script>

<template>
  <section class="py-16 bg-white dark:bg-slate-900/50 rounded-3xl my-10 border border-slate-100 dark:border-transparent shadow-sm dark:shadow-none transition-colors duration-300">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-sky-700 dark:text-sky-400 inline-block">
        高校社群
      </h2>
      <p class="mt-4 text-slate-500 dark:text-slate-400">目前已提供校徽和群号的社群，若想加入请单击获取详细联系方式</p>
    </div>
    
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 px-6 max-w-7xl mx-auto">
      <div 
        v-for="uni in universities" 
        :key="uni.id"
        class="group relative flex flex-col items-center justify-center gap-4 cursor-pointer perspective-container"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
        @click="(e) => handleClick(e, uni)"
        style="--rotate-x: 0deg; --rotate-y: 0deg; --shine-x: 50%; --shine-y: 50%;"
      >
        <!-- 3D Card Wrapper -->
        <div class="card-3d-wrapper transition-transform duration-100 ease-out will-change-transform relative z-10">
            <!-- Logo Container -->
            <div class="uni-logo relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-white dark:bg-slate-800 transform-style-3d">
               <!-- Thickness/Depth layers -->
               <div class="absolute inset-0 rounded-full bg-slate-300 dark:bg-slate-900 translate-z-[-4px]"></div>
               <div class="absolute inset-0 rounded-full bg-slate-200 dark:bg-slate-800 translate-z-[-2px]"></div>
               
               <!-- Main Content Layer -->
               <div class="absolute inset-0 rounded-full overflow-hidden border-4 border-slate-200 dark:border-slate-700 group-hover:border-sky-500 dark:group-hover:border-sky-400 transition-colors bg-white dark:bg-slate-800 shadow-inner">
                             <img 
            :src="resolveImage(uni.logo)" 
            :alt="uni.name" 
            class="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
          />
               </div>

               <!-- Dynamic Shine effect -->
               <div class="absolute inset-0 rounded-full pointer-events-none z-20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style="background: radial-gradient(circle at var(--shine-x) var(--shine-y), rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%);">
               </div>
               
               <!-- Glossy reflection (Static) -->
               <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 to-transparent opacity-50 pointer-events-none z-30"></div>
            </div>
        </div>
        
        <!-- Shadow/Platform effect -->
        <div class="absolute bottom-6 w-20 h-4 bg-black/20 dark:bg-black/50 blur-md rounded-[100%] group-hover:scale-75 transition-transform duration-300 -z-0 translate-y-6 group-hover:translate-y-8"></div>

        <h3 class="text-slate-700 dark:text-slate-300 font-medium group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors text-center z-10 mt-2 transform translate-z-10">{{ uni.name }}</h3>
      </div>
    </div>

    <!-- Modal -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/20 dark:bg-black/70 backdrop-blur-sm" @click="closeModal"></div>
        
        <!-- Modal Content -->
        <div class="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl shadow-slate-200/50 dark:shadow-sky-500/10 overflow-hidden transition-colors duration-300">
          <!-- Decorative background -->
          <div class="absolute top-0 left-0 w-full h-24 bg-sky-50 dark:bg-sky-900/20"></div>
          
          <div class="relative z-10">
            <div class="flex justify-between items-start mb-6">
              <div class="flex items-center gap-4">
                 <div class="w-16 h-16 rounded-full border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden bg-white dark:bg-slate-800">
                    <img :src="selectedUniversity ? resolveImage(selectedUniversity.logo) : ''" class="w-full h-full object-cover" />
                 </div>
                 <div>
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white">{{ selectedUniversity?.name }}</h3>
                    <p class="text-xs text-sky-600 dark:text-sky-400 font-medium tracking-wider uppercase">Community</p>
                 </div>
              </div>
              <button @click="closeModal" class="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/50 rounded-full p-1 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="space-y-5 text-slate-600 dark:text-slate-300">
              <div v-if="selectedUniversity?.contact.description" class="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700/50">
                 <p class="text-sm leading-relaxed">{{ selectedUniversity.contact.description }}</p>
              </div>
              
              <div class="space-y-3">
                <div class="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 transition border border-slate-200 dark:border-slate-700">
                  <div class="p-2 bg-sky-100 dark:bg-sky-500/10 rounded-lg text-sky-600 dark:text-sky-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-slate-500">QQ群号</p>
                    <p class="font-mono font-semibold text-slate-900 dark:text-white select-all">{{ selectedUniversity?.contact.qqGroup || '暂无' }}</p>
                  </div>
                </div>
                
                 <!-- QR Code placeholder -->
                 <div v-if="selectedUniversity?.contact.qrCode" class="mt-2 text-center p-4 bg-white border border-slate-200 dark:border-transparent rounded-lg">
                    <img :src="selectedUniversity.contact.qrCode" class="w-40 h-40 mx-auto" />
                    <p class="text-xs text-slate-500 mt-2">扫码加入我们</p>
                 </div>
              </div>
            </div>
            
            <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
               <button @click="closeModal" class="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-medium transition">
                 关闭
               </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.perspective-container {
  perspective: 1000px;
}

.card-3d-wrapper {
  transform-style: preserve-3d;
  transform: rotateX(var(--rotate-x)) rotateY(var(--rotate-y)) scale3d(1.05, 1.05, 1.05);
}

.transform-style-3d {
  transform-style: preserve-3d;
}

.translate-z-\[-4px\] { transform: translateZ(-4px); }
.translate-z-\[-2px\] { transform: translateZ(-2px); }
.translate-z-10 { transform: translateZ(10px); }

.uni-logo {
  box-shadow: 
    0 10px 20px -5px rgba(0,0,0,0.2),
    0 0 0 1px rgba(0,0,0,0.05);
}

.group:hover .uni-logo {
  box-shadow: 
    0 20px 30px -10px rgba(0,0,0,0.3),
    0 0 0 1px rgba(56, 189, 248, 0.3);
}

.animate-spin-once {
  animation: spin-once 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes spin-once {
  0% { transform: rotateX(var(--rotate-x)) rotateY(var(--rotate-y)) rotate(0deg); }
  100% { transform: rotateX(var(--rotate-x)) rotateY(var(--rotate-y)) rotate(360deg); }
}
</style>
