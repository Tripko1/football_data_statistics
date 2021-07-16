<template>
  <div class="mask">
    <div class="spinner">
      <div class="spinner-ball spinner-ball-1"></div>
      <div class="spinner-ball spinner-ball-2"></div>
      <div class="spinner-ball spinner-ball-3"></div>
      <div class="spinner-ball spinner-ball-4"></div>
    </div>
  </div>
</template>

<style scoped>
.mask {
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 9995;
  background-color: rgba(0, 0, 0, 0.7);
}

.spinner-ball {
  height: 50px;
  width: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
}
.spinner-ball:before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background: #43a6cc;
  border-radius: 50%;
  margin-left: -50%;
  margin-top: -50%;
  left: -100%;

  animation: position 2s infinite cubic-bezier(0.25, 0, 0.75, 1),
    size 2s infinite cubic-bezier(0.25, 0, 0.75, 1);
}

.spinner-ball-1:before {
  animation-delay: 0s, -0.5s;
}
.spinner-ball-2:before {
  animation-delay: -0.5s, -1s;
}
.spinner-ball-3:before {
  animation-delay: -1s, -1.5s;
}
.spinner-ball-4:before {
  animation-delay: -1.5s, -2s;
}

.spinner {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 9999;
}
@keyframes position {
  50% {
    left: 100%;
  }
}

@keyframes size {
  50% {
    transform: scale(0.5, 0.5);
  }
}
</style>
