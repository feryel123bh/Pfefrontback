import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || sessionStorage.getItem('token') || '',
    role: '', // Store the user's role
    user: {}, // Store user details
    campaigns: [], // Store campaigns data
    notifications: [],
    forms: [],
    respondForm: [],
    createdFormId : '',
    activeField: {},
    activeTabForFields: 'elements',
    themingVars: {
      primaryColor: '#409EFF',
      // Add other theming variables here
    }
   // Store notifications
  },
  mutations: {
    setForms(state, forms) {
      state.forms = forms;
    },
    setActiveField(state, field) {
      state.activeField = field;
    },
    setActiveTabForFields(state, tab) {
      state.activeTabForFields = tab;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setRole(state, role) {
      state.role = role;
    },
    setUser(state, user) {
      state.user = user;
      state.role = user.role; // Assuming user object contains a role property
    },
    addCampaign(state, campaign) {
      state.campaigns.push(campaign);
    },
    addNotification(state, notification) {
      state.notifications.push(notification);
    },
    setCreatedFormId(state,formId) {
      state.createdFormId = formId;
    },
    setRespondForm(state,form)
    {
      state.respondForm = form;
    }
  },
  actions: {
    updateForms({ commit }, forms) {
      commit('setForms', forms);
    },
    updateActiveField({ commit }, field) {
      commit('setActiveField', field);
    },
    updateActiveTabForFields({ commit }, tab) {
      commit('setActiveTabForFields', tab);
    },
    async fetchUserRole({ commit }) {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) return;

        const response = await fetch('https://localhost:7186/api/Auth/details', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        commit('setRole', data.role);
      } catch (error) {
        console.error('Failed to fetch user role:', error);
      }
    }
  },
  getters: {
    isAdmin: state => state.role === 'Rh',
    isManager: state => state.role === 'Manager',
    isEmployee: state => state.role === 'EmployeSimple',
    allCampaigns: state => state.campaigns,
    allNotifications: state => state.notifications,
  }
});
