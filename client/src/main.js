import "./assets/main.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import Button from "primevue/button";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import FloatLabel from "primevue/floatlabel";
import DatePicker from "primevue/datepicker";
import { definePreset } from "@primeuix/themes";
import semantic from "./theming/semantic.js";
import components from "./theming/components.js";
import Textarea from "primevue/textarea";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import ToastService from "primevue/toastservice";
import Chip from "primevue/chip";
import Chart from 'primevue/chart';
import Carousel from 'primevue/carousel';
import Tag from "primevue/tag";
import FileUpload from 'primevue/fileupload';
import Image from 'primevue/image';


const app = createApp(App);

const MyPreset = definePreset(Aura, {
    semantic,
    components,
});

app.use(ToastService);
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: false,
        },
    },
});

app.component("Button", Button);
app.component("InputGroup", InputGroup);
app.component("InputGroupAddon", InputGroupAddon);
app.component("InputText", InputText);
app.component("FloatLabel", FloatLabel);
app.component("DatePicker", DatePicker);
app.component("Textarea", Textarea);
app.component("Dialog", Dialog);
app.component("Divider", Divider);
app.component("InputNumber", InputNumber);
app.component("Chip", Chip);
app.component("Chart", Chart);
app.component("Carousel", Carousel);
app.component("Tag", Tag);
app.component("Image", Image);

app.use(router);

app.mount("#app");
