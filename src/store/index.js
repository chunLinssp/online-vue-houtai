import Vuex from 'vuex'
import Vue from 'vue'
import {getToken,setToken,removeToken} from '@/request/token'
import {login, getUserInfo, logout, register} from '@/api/login'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        id:'',
        account:'',
        name:'',
        avatar:'',
        token:getToken()
    },
    mutations:{
        SET_TOKEN:(state,token) =>{
            state.token = token;
        },
        SET_ACCOUNT:(state,account) =>{
            state.account = account;
        },
        SET_NAME:(state,name) =>{
            state.name = name;
        },
        SET_AVATAR:(state,avatar) =>{
            state.avatar = avatar;
        },
        SET_ID:(state,id) =>{
            state.id = id;
        }
    },
    actions:{
        login({commit},user,token) {
            return new Promise((resolve,reject) => {
                login(user.account,user.password,user.verificationCode,user.token).then(res =>{
                    commit('SET_TOKEN',res.data['Oauth-Token']);
                    commit('SET_ACCOUNT',res.data['account']);
                    commit('SET_NAME',res.data['name']);
                    commit('SET_AVATAR',res.data['avatar']);
                    commit('SET_ID',res.data['id']);
                    setToken(res.data['Oauth-Token']);
                    resolve();
                }).catch(error =>{
                    reject(error);
                })
            })
        }
    }
})




