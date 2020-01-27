import Vue from 'vue';
import {Bar,mixins} from 'vue-chartjs';
const {reactiveProp} = mixins;

Vue.component('bargraph',{
    extends: Bar,
    mixins:[mixins,reactiveProp],
    props: ['options','chartData','width','height'],
    mounted() {
        this.renderChart(this.chartData,this.options)
    },
})