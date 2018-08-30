import Vue from 'vue';
import ajax from '../util/ajax';


const app = new Vue({
    el: '#app',
    data: {
        address: '',
        addrTxt: []
    },
    methods: {
        grab() {
            let reg = /ACT([A-Za-z0-9]{32,33})/g;
            let addrArr = this.address.match(reg);
            addrArr.forEach((addr) => {
                this.setIframe(addr);
            });
        },

        setIframe(address){
            var iframe = document.createElement('iframe'); 
            iframe.src = 'https://www.achain.one/bonus/apply/' +address; 
            document.body.appendChild(iframe);
        }
    }
});