<template>
  <div class="multi-step-form">
    <div class="steps">
      <span :class="{ active: currentStep === 1 }">1</span>
      <span :class="{ active: currentStep === 2 }">2</span>
      <span :class="{ active: currentStep === 3 }">3</span>
    </div>

    <div class="step-content">
      <component
        :is="getCurrentStepComponent()"
        :form-data.sync="formData"
        :current-step="currentStep"
        @next-step="handleNextStep"
        @prev-step="prevStep"
        @confirm-details="handleConfirmDetails"
        @submit="handleSubmit"
      />
    </div>

    <div class="buttons">
      <button @click="prevStep" :disabled="currentStep === 1">Back</button>
      <button @click="handleNextStep(formData)" v-if="currentStep < 3">Next</button>
      <button @click="handleSubmit" v-if="currentStep === 3">Submit</button>
    </div>
  </div>
</template>

<script>
import Step1 from './Step1.vue';
import Step2 from './Step2.vue';
import Step3 from './Step3.vue';
import axios from 'axios';

export default {
  components: {
    Step1,
    Step2,
    Step3,
  },
  data() {
    return {
      currentStep: 1,
      formData: {
        titre: '',
        description: '',
        campaignType: 'Annuelle',
        startDate: '',
        managerId: '',
        reportTitle: '',
        id: null,  // assuming ID is generated/available after creation
      },
    };
  },
  methods: {
    getCurrentStepComponent() {
      switch (this.currentStep) {
        case 1:
          return Step1;
        case 2:
          return Step2;
        case 3:
          return Step3;
        default:
          return Step1;
      }
    },
    async handleNextStep(data) {
      this.formData = {...this.formData, ...data};
      if( this.currentStep == 2)
      {
        const dataToSend = {sections: this.$store.state.forms}
        const response =  await axios.post('https://localhost:7186/api/formulaire',dataToSend);
        console.log(dataToSend);
        this.$store.commit('setCreatedFormId', response?.data);
      }
      this.currentStep++;
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    handleConfirmDetails() {
      console.log('Details confirmed:', this.formData);
    },

    async createCampaign() {
      try {
        const dataToSend = { ...this.formData };
        const data = {
          campagne : {
            titre: this.formData.titre,
            description: this.formData.description,
            campaignType:this.formData.campaignType,
            startDate: this.formData.startDate,
          },
          managerId: this.formData.managerId,
          formulaireId: this.$store.state.createdFormId,
        }
        delete dataToSend.id; // Ensure 'id' is not sent if not needed

        console.log('Sending data to create campaign:', JSON.stringify(data, null, 2));
        const response = await axios.post('https://localhost:7186/api/campagne', data);
        return response.data;
      } catch (error) {
        // Log the exact error returned by the server
        console.error(error);
        throw new Error('Error creating campaign: ' + (error.response?.data || error.message));
      }
    }


    ,

    async handleSubmit() {
      try {
        // Step 1: Create the campaign
        const campaignData = await this.createCampaign();
        console.log('Campaign created:', campaignData);

        // Step 2: Create and associate the report with the created campaign
        await this.createReportForCampaign();

        alert('Campaign and report created successfully!');

        // Optionally, you can redirect or reset the form here
      } catch (error) {
        console.error('Error creating campaign:', error.message);
      }
    }


    ,

    async createReportForCampaign() {
      try {
        const reportData = {
          campaignId: this.formData.id,
          title: this.formData.reportTitle || 'Default Report Title',  // Replace with actual title if needed
          // Include any other fields required by your API for the report
        };

        const response = await axios.post('https://localhost:7186/api/reports', reportData);
        console.log('Report created:', response.data);
      } catch (error) {
        console.error('Error creating report:', error.response?.data || error.message);
        throw new Error('Error creating report');
      }
    },
  },
};
</script>

<style>
.multi-step-form {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.steps {
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin: 0 auto 20px;
}

.steps span {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
}

.steps span.active {
  background: #007bff;
  color: white;
}

.step-content {
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: lightgray;
  cursor: not-allowed;
}

button:not(:disabled):hover {
  background-color: #0056b3;
}
</style>
