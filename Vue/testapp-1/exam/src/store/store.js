import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    questionCounter: 1,
    totalCount:0
  },
  mutations: {
    increment(state) {
      state.questionCounter++;
    },
    decrement(state) {
      state.questionCounter--;
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
          "Options": [
            {
              "ID": 1,
              "Title": "Options 1",
              "OptionsTypeID": 1
            },
            {
              "ID": 2,
              "Title": "Options 2",
              "OptionsTypeID": 1
            }
          ],
          "IsQuestionAttempted": true,
          "AnswerGiven": false
        }
      ];
    },
    getQByID: (state) => (ID) => {
      console.log('finding:'+state.questions.length+ ' items')
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
   
  },
  modules: {
  }
})
