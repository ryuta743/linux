<template>
    <div id="wrap">
        <p>うんち</p>
        <table border="2">
            <tbody>
                <th v-for="(item,index) in contactdata" :key="index">
                    <td>
                        <button @click="$router.push(`/admin2/${item.contact_id}`)">
                            <div id="contact_id">{{item.contact_id}}</div>
                            <div id="user_name">{{item.user_name}}</div>
                        </button>
                    </td>
                </th>
            </tbody>
        </table>
    </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';

export default {
    mounted(){
        this.get_contactdataReq()
    },
    data() {
        return {
            contact_text: '',
        };
    },
    methods:{
        async get_contactdataReq(){
            try{
                await this.get_contactdata()
            }catch(e){
                console.log('エラー発生')
                console.log(e)
            }
        },
        ...mapActions('admin',['get_contactdata']),
    },
    computed:{
        ...mapGetters('admin',['contactdata']),
        ...mapGetters(['loginuserdata'])
    }
};
</script>

<style>
    #wrap{
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
</style>