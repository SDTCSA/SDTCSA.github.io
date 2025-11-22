<script setup lang="ts">
import { computed } from 'vue';
import * as d3 from 'd3-geo';
import shandongData from '@/assets/shandong.json';

const width = 800;
const height = 600;

// Create projection
// Center and scale will be automatically adjusted by fitSize
const projection = d3.geoMercator();

// Create path generator
const pathGenerator = d3.geoPath().projection(projection);

// Fit projection to features
// We cast to any because the GeoJSON types can be strict and the imported JSON might not match exactly
projection.fitSize([width, height], shandongData as any);

const paths = computed(() => {
  return (shandongData as any).features.map((feature: any) => ({
    d: pathGenerator(feature),
    name: feature.properties.name,
    code: feature.properties.adcode || feature.properties.code // Handle different GeoJSON property names
  }));
});

defineExpose({
  projection
});
</script>

<template>
  <svg :viewBox="`0 0 ${width} ${height}`" xmlns="http://www.w3.org/2000/svg" class="shandong-map">
    <g>
      <path
        v-for="item in paths"
        :key="item.code"
        :d="item.d || ''"
        fill="#e2e8f0"
        stroke="#64748b"
        stroke-width="1"
        class="hover:fill-slate-300 transition-colors duration-300"
      >
        <title>{{ item.name }}</title>
      </path>
    </g>
  </svg>
</template>

<style scoped>
.shandong-map {
  width: 100%;
  height: auto;
  display: block;
}
</style>
