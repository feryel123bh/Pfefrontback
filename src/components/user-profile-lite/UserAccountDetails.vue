<template>
  <d-card class="card-small mb-4">
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
    </d-card-header>
    <d-list-group flush>
      <d-list-group-item class="p-3">
        <d-row>
          <d-col>
            <d-form @submit.prevent="updateAccount">
              <d-form-row>
                <d-col md="6" class="form-group">
                  <label for="feFirstName">First Name</label>
                  <d-form-input type="text" v-model="formData.firstName" placeholder="First Name" />
                </d-col>
                <d-col md="6" class="form-group">
                  <label for="feLastName">Last Name</label>
                  <d-form-input type="text" v-model="formData.lastName" placeholder="Last Name" />
                </d-col>
              </d-form-row>

              <d-form-row>
                <d-col md="6" class="form-group">
                  <label for="feEmail">Email</label>
                  <d-form-input type="email" v-model="formData.email" placeholder="Email Address" />
                </d-col>
                <d-col md="6" class="form-group">
                  <label for="fePassword">Password</label>
                  <d-form-input type="password" v-model="formData.password" placeholder="Password" />
                </d-col>
              </d-form-row>

              <div class="form-group">
                <label for="feInputAddress">Address</label>
                <d-form-input type="text" v-model="formData.address" placeholder="1234 Main St" />
              </div>

              <d-form-row>
                <d-col md="6" class="form-group">
                  <label for="feInputCity">City</label>
                  <d-form-input type="text" v-model="formData.city" />
                </d-col>
                <d-col md="4" class="form-group">
                  <label for="feInputState">State</label>
                  <d-select v-model="formData.state">
                    <option value="" disabled>Select State</option>
                    <option>...</option>
                  </d-select>
                </d-col>
                <d-col md="2" class="form-group">
                  <label for="inputZip">Zip</label>
                  <d-form-input type="text" v-model="formData.zip" />
                </d-col>
              </d-form-row>

              <d-form-row>
                <d-col md="12" class="form-group">
                  <label for="feDescription">Description</label>
                  <d-textarea v-model="formData.description" rows="5"></d-textarea>
                </d-col>
              </d-form-row>

              <d-button type="submit" class="btn-accent">Update Account</d-button>
            </d-form>
          </d-col>
        </d-row>
      </d-list-group-item>
    </d-list-group>
  </d-card>
</template>

<script>
export default {
  name: 'UserAccountDetails',
  props: {
    title: {
      type: String,
      default: 'Account Details',
    },
    userDetails: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        firstName: this.userDetails.firstName || '',
        lastName: this.userDetails.lastName || '',
        email: this.userDetails.email || '',
        password: '',
        address: this.userDetails.address || '',
        city: this.userDetails.city || '',
        state: this.userDetails.state || '',
        zip: this.userDetails.zip || '',
        description: this.userDetails.description || '',
      },
    };
  },
  methods: {
    updateAccount() {
      // Handle form submission logic here, such as dispatching a Vuex action
      console.log('Account updated with data:', this.formData);
    },
  },
};
</script>
