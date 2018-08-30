import VueI18n from 'vue-i18n';
import messages from './i18nMsg.js';
 

let i18n =  new VueI18n({
    locale: 'en',
    messages, // set locale messages
}),
  
    i18nMixin = {
       
        mounted() {
            this.$i18n.locale = this.locale;
            this.changeMenu(this.locale);
        },

        computed: {
            locale() {
                return this.$route.query.lang ? this.$route.query.lang : 'en'
            }
        },

        watch: {
            locale (val) {
                this.$i18n.locale = val;
                this.changeMenu(val);
            }
        },
        
        methods: {
            changeMenu(lang) {
                let langData = this.$i18n.messages;
                $('.home-nav').text(langData[lang].home);
                $('.home-nav').attr('data-href', './index.html#/?lang='+lang);
                $('.contract-nav').text(langData[lang].contractTitle);
                $('.contract-nav').attr('data-href', './contract.html#/?lang='+lang);
                $('.forum-nav').text(langData[lang].forum);
                $('.corp-mail').text(langData[lang].corpMail);
                $('.site-lang').text(langData[lang].lang);
                document.title = langData[lang].siteTitle;
            },

            routeLang(route){
                route.query = route.query ? route.query : {};
                this.$route.query.lang && Object.assign(route.query, { lang: this.$route.query.lang });
                return route;
            }
        }
    }

export { i18n, i18nMixin };