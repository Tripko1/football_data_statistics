<template>
  <div>
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  width: 80%;
  height: calc(100% - 20px);
  margin: auto;
  padding-top: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  overflow-y: auto;
  overflow-x: auto;
  z-index: 10;
}
/* width */
::-webkit-scrollbar {
  width: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(96, 96, 96);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(96, 96, 96) rgb(169, 169, 169);
}
</style>
