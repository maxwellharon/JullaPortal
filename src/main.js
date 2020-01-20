import Vue from 'vue'
import App from './App'
import VueSweetalert2 from 'vue-sweetalert2';



// BootstrapVue add
import BootstrapVue from 'bootstrap-vue'
// Router & Store add
import router from './router'
import filters from './filters'
import store from './store'
// Multi Language Add
import en from './locales/en.json'
import es from './locales/es.json'
import VueI18n from 'vue-i18n'
import { defaultLocale, localeOptions, firebaseConfig } from './constants/config'
// Notification Component Add
import Notifications from './components/Common/Notification'
// Breadcrumb Component Add
import Breadcrumb from './components/Common/Breadcrumb'
// RefreshButton Component Add
import RefreshButton from './components/Common/RefreshButton'
// Colxx Component Add
import Colxx from './components/Common/Colxx'
// Perfect Scrollbar Add
import vuePerfectScrollbar from 'vue-perfect-scrollbar'
import contentmenu from 'v-contextmenu'
import VueLineClamp from 'vue-line-clamp'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import VueScrollTo from 'vue-scrollto'
import firebase from 'firebase/app'
import 'firebase/auth'
import DateFilter from './filters' // Import date
// import 'moment' from 'moment'

// import Vuelidate from 'vuelidate'
// Vue.use(Vuelidate);
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSpinner)
Vue.component('icons', FontAwesomeIcon)


Vue.use(BootstrapVue);
Vue.use(VueI18n);
Vue.use(VueSweetalert2);
const messages = { en: en, es: es };
const locale = (localStorage.getItem('currentLanguage') && localeOptions.filter(x => x.id === localStorage.getItem('currentLanguage')).length > 0) ? localStorage.getItem('currentLanguage') : defaultLocale;
const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: 'en',
  messages
});

Vue.use(Notifications);
Vue.component('piaf-breadcrumb', Breadcrumb);
Vue.component('b-refresh-button', RefreshButton);
Vue.component('b-colxx', Colxx);
Vue.component('vue-perfect-scrollbar', vuePerfectScrollbar);
Vue.use(require('vue-shortkey'));
Vue.use(contentmenu);
Vue.use(VueLineClamp, {
  importCss: true
})
Vue.use(VCalendar, {
  firstDayOfWeek: 2, // ...other defaults,
  formats: {
    title: 'MMM YY',
    weekdays: 'WW',
    navMonths: 'MMMM',
    input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    dayPopover: 'L'
  },
  datePickerShowDayPopover: false,
  popoverExpanded: true,
  popoverDirection: 'bottom'
});
Vue.use(VueScrollTo);

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

export default new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Date.prototype.addMins = function(mins) {
    var dat = new Date(this.valueOf()); // make a new date coz we can't change the original
    dat.setMinutes(dat.getMinutes() + mins*1); // force mins to be integer instead of string
    return dat;
};

Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf()); // make a new date coz we can't change the original
    dat.setDate(dat.getDate() + days*1); // force days to be integer instead of string
    return dat;
};

Date.prototype.addHours = function(hours) {
    var dat = new Date(this.valueOf()); // make a new date coz we can't change the original
    dat.setHours(dat.getHours() + hours*1); // force hours to be integer instead of string
    return dat;
};

Date.prototype.addMonths = function(months) {
    var dat = new Date(this.valueOf()); // make a new date coz we can't change the original
    dat.setMonth(dat.getMonth() + months*1); // force months to be integer instead of string
    return dat;
};

Date.prototype.daysFromNow = function() {
    var dat = this;
    var now = new Date();
    var timeDiff = dat.getTime() - now.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

// https://date-fns.org/v1.9.0/docs/format
// https://momentjs.com/docs/#/displaying/format/
const dateSuffixes = ["th","st","nd","rd"];
const dateMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dateDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

Date.prototype.format = function (format) {
    const hours = this.getHours(),
          date = this.getDate();

    if (!format) format = "MM/DD/YYYY";
    // year
    if (format.indexOf("YYYY") > -1) format = format.replace("YYYY", this.getFullYear().toString());
    else if (format.indexOf("YY") > -1) format = format.replace("YY", this.getFullYear().toString().substr(2, 2));
    // hours (24hr)
    if (format.indexOf("HH") > -1) format = format.replace("HH", ('0'+hours).slice(-2));
    if (format.indexOf("H") > -1) format = format.replace("H", hours.toString());
    // hours (12hr)
    if (format.indexOf("hh") > -1) format = format.replace("hh", ('0'+(hours%12||12)).slice(-2));
    if (format.indexOf("h") > -1) format = format.replace("h", hours%12||12);
    // minute
    if (format.indexOf("mm") > -1) format = format.replace("mm", ('0'+this.getMinutes()).slice(-2));
    if (format.indexOf("m") > -1) format = format.replace("m", this.getMinutes());
    // seconds
    if (format.indexOf("ss") > -1) format = format.replace("ss", ('0'+this.getSeconds()).slice(-2));
    if (format.indexOf("s") > -1) format = format.replace("s", this.getSeconds());
    // milliseconds
    if (format.indexOf("SSS") > -1) format = format.replace("SSS", ('00'+this.getMilliseconds()).slice(-3));
    // date`
    if (format.indexOf("DD") > -1) format = format.replace("DD", ('0'+date.toString()).slice(-2));
    if (format.indexOf("D") > -1) format = format.replace("D", date.toString());
    // th / st / nd / rd so need to do AFTER 's' and 'h' above
    if (format.indexOf("o") > -1) format = format.replace("o", dateSuffixes[(date-20)%10]||dateSuffixes[date]||dateSuffixes[0]);
    // am/pm - do BEFORE day or month name substitutions which introduce 'a'
    if (format.indexOf("a") > -1) format = format.replace("a", hours>11?"pm":"am");
    if (format.indexOf("A") > -1) format = format.replace("A", hours>11?"PM":"AM");
    // month name - do AFTER a -> am/pm
    if (format.indexOf("MMMM") > -1) format = format.replace("MMMM", dateMonths[this.getMonth()]);
    if (format.indexOf("MMM") > -1) format = format.replace("MMM", dateMonths[this.getMonth()].substr(0,3));
    // month number
    if (format.indexOf("MM") > -1) format = format.replace("MM", ('0'+(this.getMonth()+1)).slice(-2));
    // day of the week (name) - do AFTER a -> am/pm
    if (format.indexOf("dddd") > -1) format = format.replace("dddd", dateDays[this.getDay()]);
    if (format.indexOf("ddd") > -1) format = format.replace("ddd", dateDays[this.getDay()].substr(0,3));
    return format;
};
