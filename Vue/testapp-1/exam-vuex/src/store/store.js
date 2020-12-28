import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
//todo: use https://github.com/lmiller1990/vuex-async-actions, https://medium.com/@lachlanmiller_52885/reducing-vuex-boilerplate-for-ajax-calls-1cd4a74cef26
Vue.use(VueAxios, axios)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    examId:0,
    session: {},
    questions: [],
    questionCounter: 1,
    totalCount: 0,
    apiCallStatus:''
  },
  mutations: {
    increment(state) {
      state.questionCounter++;
    },
    decrement(state) {
      state.questionCounter--;
    }, 
    init(state, payload) {
      console.log(JSON.stringify(payload.data[0]));
      state.session = payload.data[0];
    },
    populate(state, payload) {
      state.questions = payload.data; 
      state.totalCount = state.questions.length;
    }
  },
  getters: {
       mockQ(){
      return  [
                {
                  "QuestionID": 1,
                  "QuestionTypeID": 1,
                  "QuestionText":"Which are the parts of a CPU? (MCQ)",
                  "Options": [
                      { "ID": 1, "Title":"Q1.Options 1", "OptionsTypeID": 1},
                      { "ID": 2, "Title":"Q1.Options 2", "OptionsTypeID": 1}
                    ],
                  "TimeAllotted" : 5,
                  "Score": 2
                },
                {
                  "QuestionID": 2,
                  "QuestionText": "Select all valid options: ATA",
                  "QuestionTypeID": 2,
                  "Options": [
                      { "ID": 1, "Title":"Q2.Options 1", "OptionsTypeID": 2},
                      { "ID": 2, "Title":"Q2.Options 2", "OptionsTypeID": 2}
                    ],
                  "TimeAllotted" : 2,
                  "Score": 3
                },
                {
                      "QuestionID": 3,
                      "QuestionText": "This Question requires free-input answer",
                      "QuestionTypeID": 3,
                      "Options": [    { "ID": 3, "Title":"Q3. Please type...", "OptionsTypeID": 3}],            
                      "TimeAllotted" : 5,
                      "Score": 5
                }
              ];
    },
    getQByID: (state) => (ID) => {
      //console.log('finding in :'+state.questions.length+ ' items')
      const found = state.questions.filter((item) => {
        if (item.QuestionID == ID) {
          //console.log('found')
          return item;
        }
        return null;
      });
      if(found.length == 1)
        return found[0];
      return null;
    }
  },
  actions: {  
 
    loadQs({ commit, state }){      
      var api = 'http://localhost:3000/questions?ExamID='+ state.session.ID;        
      return  Vue.axios.get(api).then((response) => {
        commit('populate', response)
      }).catch((reason) => {
        state.apiCallStatus = reason;
        //in dev mode
        //var mockData = getters.mockQ;
        //fall back to mock, in dev mode only!
        //commit('populate', mockData);

      });
    },
    loadExam({ commit, state }, payload){      
      var api = 'http://localhost:3000/ExamSession?ID=' + payload.ExamID;   
      console.log(api + ' called for exam query...');
      return  Vue.axios.get(api).then((response) => {
        commit('init', response)
      }).catch((reason) => {
        state.apiCallStatus = reason;
        //in dev mode
        //var mockData = getters.mockQ;
        //fall back to mock, in dev mode only!
        //commit('populate', mockData);

      });
    }
  },
  modules: {
  }
})
