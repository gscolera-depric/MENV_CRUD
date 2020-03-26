import Vue from 'vue';
import { 
  TablePlugin, 
  LayoutPlugin, 
  IconsPlugin, 
  ButtonPlugin, 
  BSpinner, 
  ModalPlugin,
  FormPlugin, 
  FormInputPlugin,
  FormGroupPlugin,
  FormCheckboxPlugin,
  VBHoverPlugin,
  ButtonGroupPlugin
} from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'mutationobserver-shim'
import '@babel/polyfill'

Vue.component('b-spinner', BSpinner);

Vue.use(TablePlugin);
Vue.use(LayoutPlugin);
Vue.use(IconsPlugin);
Vue.use(ButtonPlugin);
Vue.use(ModalPlugin);
Vue.use(FormPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormGroupPlugin);
Vue.use(FormCheckboxPlugin);
Vue.use(VBHoverPlugin);
Vue.use(ButtonGroupPlugin);