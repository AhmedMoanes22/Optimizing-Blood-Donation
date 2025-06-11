<template>
  <button
    :class="['blob-btn', { 'blob-btn--inverted': inverted }]"
    @click="$emit('click')"
    :style="{ padding: padding }" 
  ><!-- تطبيق padding ديناميكي -->
    <span class="blob-btn__inner">
      <span class="blob-btn__blobs">
        <span class="blob-btn__blob"></span>
        <span class="blob-btn__blob"></span>
        <span class="blob-btn__blob"></span>
        <span class="blob-btn__blob"></span>
      </span>
    </span>
    <slot>Button</slot>
  </button>
</template>

<script setup>
defineProps({
  inverted: {
    type: Boolean,
    default: false,
  },
  padding: {
    type: String,
    default: '20px 46px', // القيمة الافتراضية للـ padding
  },
});

defineEmits(['click']);
</script>

<style scoped>
.blob-btn {
  z-index: 1;
  position: relative;
  margin: 0 10px;
  text-align: center;
  text-transform: uppercase;
  color: black;
  font-size: 16px;
  font-weight: bold;
  background-color: transparent;
  outline: none;
  border: none;
  transition: color 0.5s, border 0.5s;
  cursor: pointer;
}

.blob-btn:before {
  content: "";
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid black;
  transition: border 0.5s;
}

.blob-btn:after {
  content: "";
  z-index: -2;
  position: absolute;
  left: 3px;
  top: 3px;
  width: 100%;
  height: 100%;
  transition: all 0.3s 0.2s;
}

.blob-btn:hover {
  color: #FFFFFF;
  border-radius: 30px;
}

.blob-btn:hover:before {
  border: 2px solid black !important; /* تأكد من أن border يبقى أسود */
}

.blob-btn:hover:after {
  transition: all 0.3s;
  left: 0;
  top: 0;
  border-radius: 30px;
}

.blob-btn__inner {
  z-index: -1;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #ffffff;
}

.blob-btn__blobs {
  position: relative;
  display: block;
  height: 100%;
  filter: url('#goo');
}

.blob-btn__blob {
  position: absolute;
  top: 2px;
  width: 25%;
  height: 100%;
  background: black;
  border-radius: 100%;
  transform: translate3d(0, 150%, 0) scale(1.7);
  transition: transform 0.45s;
}

.blob-btn__blob:nth-child(1) {
  left: 0%;
  transition-delay: 0s;
}

.blob-btn__blob:nth-child(2) {
  left: 30%;
  transition-delay: 0.08s;
}

.blob-btn__blob:nth-child(3) {
  left: 60%;
  transition-delay: 0.16s;
}

.blob-btn__blob:nth-child(4) {
  left: 90%;
  transition-delay: 0.24s;
}

.blob-btn:hover .blob-btn__blob {
  transform: translateZ(0) scale(1.7);
}

/* Inverted styles */
.blob-btn--inverted {
  color: white;
}

.blob-btn--inverted:before {
  border-color: white;
}

.blob-btn--inverted .blob-btn__inner {
  background: black;
}

.blob-btn--inverted .blob-btn__blob {
  background: white;
}

.blob-btn--inverted:hover {
  color: black;
}

.blob-btn--inverted:hover:before {
  border: 2px solid black !important; /* تأكد من أن border يبقى أسود */
}

/* إخفاء الزر أثناء الطباعة */

</style>