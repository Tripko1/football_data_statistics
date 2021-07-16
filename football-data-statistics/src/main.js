import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import BaseCard from "./components/UI/BaseCard.vue";
import TheSpinner from "./components/UI/TheSpinner.vue";

const app = createApp(App);

app.component("base-card", BaseCard);
app.component("the-spinner", TheSpinner);

app.use(router);
app.use(store);

app.mount("#app");
