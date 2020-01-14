import Vue from 'vue';
import {Doughnut,Line,mixins} from 'vue-chartjs';
const {reactiveProp} = mixins;



Vue.component('doughnut',{
    extends: Doughnut,
    mixins:[mixins,reactiveProp],
    props: ['options','chartData','width','height'],
    mounted() {
        this.renderChart(this.chartData,this.options,{maintainAspectRatio:false})
    },
})

Vue.component('access',{
    extends: Line,
    mixins:[mixins,reactiveProp],
    props: ['options','chartData','width','height'],
    mounted() {
        this.renderChart(this.chartData,this.options,{maintainAspectRatio:false})
    },
})