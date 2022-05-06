import Vue from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ToggleButton from 'primevue/togglebutton';
import Skeleton from 'primevue/skeleton';
import Message from 'primevue/message';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

Vue.use(ToastService);
Vue.component('Button', Button);
Vue.component('InputText', InputText);
Vue.component('ToggleButton', ToggleButton);
Vue.component('Skeleton', Skeleton);
Vue.component('Message', Message);
Vue.component('Toast', Toast);