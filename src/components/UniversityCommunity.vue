<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { resolveImage } from '@/utils/image';
import ShandongMap from './ShandongMap.vue';

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
  coordinate: [number, number]; // [Longitude, Latitude]
}

const universities: University[] = [
  {
    id: 1,
    name: '山东大学',
    logo: '/logos/sdu.webp',
    contact: { qqGroup: '186295950', description: '★山东大学♪幻想浮世伊行★' },
    coordinate: [117.056, 36.676]
  },
  {
    id: 2,
    name: '山东大学（威海）',
    logo: '/logos/sduwh.webp',
    contact: { qqGroup: '908978336', description: '崴车万同好会' },
    coordinate: [122.058, 37.528]
  },
  {
    id: 3,
    name: '山东理工大学',
    logo: '/logos/sdut.webp',
    contact: { qqGroup: '982212088' },
    coordinate: [118.001, 36.815]
  },
  {
    id: 4,
    name: '山东中医药大学',
    logo: '/logos/sdutcm.webp',
    contact: { qqGroup: '917763620' },
    coordinate: [116.808, 36.560]
  },
  {
    id: 5,
    name: '山东建筑大学',
    logo: '/logos/sdjzu.webp',
    contact: { qqGroup: '579042420', description: '济南山童联合协会' },
    coordinate: [117.183, 36.683]
  },
  {
    id: 6,
    name: '山东体育学院',
    logo: '/logos/sdpei.webp',
    contact: { qqGroup: '871721412' },
    coordinate: [117.123, 36.653]
  },
  {
    id: 7,
    name: '山东交通学院',
    logo: '/logos/sdjtu.webp',
    contact: { qqGroup: '937924293' },
    coordinate: [116.833, 36.578]
  },
  {
    id: 8,
    name: '山东青年政治学院',
    logo: '/logos/sdyu.webp',
    contact: { qqGroup: '659598919' },
    coordinate: [117.198, 36.673]
  },
  {
    id: 9,
    name: '山东师范大学',
    logo: '/logos/sdnu.webp',
    contact: { qqGroup: '743070412' },
    coordinate: [117.038, 36.653]
  },
  {
    id: 10,
    name: '齐鲁工业大学',
    logo: '/logos/qlu.webp',
    contact: { qqGroup: '1021423802' },
    coordinate: [116.818, 36.562]
  },
  {
    id: 11,
    name: '中国石油大学（华东）',
    logo: '/logos/UPC.webp',
    contact: { qqGroup: '631941461' },
    coordinate: [120.173, 35.945]
  },
  {
    id: 12,
    name: '山东石油化工学院',
    logo: '/logos/sdipct.webp',
    contact: { qqGroup: '644182264' },
    coordinate: [118.583, 37.453]
  },
  {
    id: 13,
    name: '济南大学',
    logo: '/logos/ujn.webp',
    contact: { qqGroup: '856370052' },
    coordinate: [116.963, 36.618]
  },
  {
    id: 14,
    name: '枣庄学院',
    logo: '/logos/uzz.webp',
    contact: { qqGroup: '852282759' },
    coordinate: [117.568, 34.888]
  },
  {
    id: 15,
    name: '东营科技职业学院',
    logo: '/logos/dykj.webp',
    contact: { qqGroup: '644182264' },
    coordinate: [118.410, 37.050]
  },
  {
    id: 16,
    name: '聊城大学',
    logo: '/logos/lcu.webp',
    contact: { qqGroup: '514756242' },
    coordinate: [116.003, 36.443]
  },
  {
    id: 17,
    name: '烟台大学',
    logo: '/logos/ytu.webp',
    contact: { qqGroup: '1007450236' },
    coordinate: [121.453, 37.473]
  },
  {
    id: 18,
    name: '齐鲁理工学院',
    logo: '/logos/qiot.webp',
    contact: { qqGroup: '1011030824' },
    coordinate: [117.188, 36.688]
  },
  {
    id: 19,
    name: '枣庄职业学院',
    logo: '/logos/zvc.webp',
    contact: { qqGroup: '1020621071' },
    coordinate: [117.533, 34.833]
  },
  {
    id: 20,
    name: '青岛农业大学',
    logo: '/logos/qau.webp',
    contact: { qqGroup: '815491041' },
    coordinate: [120.393, 36.318]
  },
  {
    id: 21,
    name: '添加你的学校',
    logo: '/logos/more.webp',
    contact: { qqGroup: '977015593', description: '请加入山高联群聊私信管理员添加' },
    coordinate: [122.5, 35.5]
  },
];

const mapRef = ref<InstanceType<typeof ShandongMap> | null>(null);
const universityPositions = ref<Map<number, { top: string; left: string }>>(new Map());

const updatePositions = () => {
  if (!mapRef.value?.projection) return;
  
  const projection = mapRef.value.projection;
  const newPositions = new Map();
  
  universities.forEach(uni => {
    const [x, y] = projection(uni.coordinate) || [0, 0];
    // Convert to percentage relative to the SVG viewBox (800x600)
    // We use percentage to keep it responsive
    newPositions.set(uni.id, {
      left: `${(x / 800) * 100}%`,
      top: `${(y / 600) * 100}%`
    });
  });
  
  universityPositions.value = newPositions;
};

onMounted(() => {
  // Wait for map to initialize
  nextTick(() => {
    updatePositions();
  });
});

// Watch for window resize if needed, though SVG scaling handles most of it
// But if projection changes (it shouldn't), we'd need to re-run


const selectedUniversity = ref<University | null>(null);
const isModalOpen = ref(false);

const openModal = (uni: University) => {
  selectedUniversity.value = uni;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const copyToClipboard = (text: string) => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
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
  <section class="py-20 bg-white relative overflow-hidden">
    <div class="container mx-auto px-4 relative z-10">
      <h2 class="text-4xl font-bold text-center mb-16 text-gray-900">
        <span class="text-red-600">社团</span>分布
      </h2>
      
      <div class="relative w-full max-w-5xl mx-auto aspect-[1.4/1] bg-blue-50/30 rounded-3xl p-8 border border-blue-100 shadow-inner">
        <!-- Map Background -->
        <div class="absolute inset-0 flex items-center justify-center opacity-90 pointer-events-none">
          <ShandongMap ref="mapRef" class="w-full h-full text-gray-200 drop-shadow-xl" />
        </div>

        <!-- University Dots -->
        <div class="absolute inset-0">
          <div
            v-for="uni in universities"
            :key="uni.id"
            class="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
            :style="universityPositions.get(uni.id)"
            @click="openModal(uni)"
            @mousemove="handleMouseMove"
            @mouseleave="handleMouseLeave"
          >
            <!-- Dot/Marker -->
            <div class="relative w-8 h-8 md:w-12 md:h-12 transition-all duration-500 ease-out group-hover:scale-150 group-hover:z-50 perspective-container">
              <div class="w-full h-full rounded-full bg-white shadow-lg border-2 border-red-500 overflow-hidden relative card-content">
                <img 
                  :src="resolveImage(uni.logo)" 
                  :alt="uni.name"
                  class="w-full h-full object-cover"
                />
                <!-- Shine effect -->
                <div class="shine-overlay"></div>
              </div>
              
              <!-- Tooltip -->
              <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-900 text-white text-xs md:text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 shadow-xl">
                {{ uni.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeModal">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeModal"></div>
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden">
          <div class="h-32 bg-gradient-to-r from-red-500 to-orange-500 relative">
            <button @click="closeModal" class="absolute top-4 right-4 text-white/80 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="px-8 pb-8 -mt-12 relative">
            <div class="w-24 h-24 rounded-full bg-white p-1 shadow-xl mx-auto mb-4">
              <img 
                :src="resolveImage(selectedUniversity?.logo || '')" 
                :alt="selectedUniversity?.name"
                class="w-full h-full object-cover rounded-full"
              />
            </div>
            
            <h3 class="text-2xl font-bold text-center text-gray-900 mb-2">{{ selectedUniversity?.name }}</h3>
            <p v-if="selectedUniversity?.contact.description" class="text-center text-gray-500 text-sm mb-6">
              {{ selectedUniversity?.contact.description }}
            </p>
            
            <div class="space-y-4">
              <div v-if="selectedUniversity?.contact.qqGroup" class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500">QQ群号</div>
                    <div class="font-mono font-medium text-gray-900">{{ selectedUniversity?.contact.qqGroup }}</div>
                  </div>
                </div>
                <button 
                  class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                  @click="copyToClipboard(selectedUniversity?.contact.qqGroup || '')"
                >
                  复制
                </button>
              </div>
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

.card-content {
  transform-style: preserve-3d;
  transform: rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg));
  transition: transform 0.1s ease-out;
}

.shine-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at var(--shine-x, 50%) var(--shine-y, 50%),
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0) 60%
  );
  opacity: 0.5;
  pointer-events: none;
  mix-blend-mode: overlay;
  z-index: 10;
}
</style>
