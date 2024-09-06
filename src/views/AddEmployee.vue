<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Add Employee</h3>
      </d-col>
    </d-row>

    <!-- Content -->
    <d-row>
      <d-col lg="12">
        <d-card class="card-small mb-4">
          <d-card-header class="border-bottom">
            <h6 class="m-0">Add Employee</h6>
          </d-card-header>
          <d-list-group flush>
            <d-list-group-item class="p-3">
              <d-row>
                <d-col>
                  <d-form @submit.prevent="addEmployee">
                    <d-form-row>
                      <!-- Username -->
                      <d-col md="6" class="form-group">
                        <label for="username">Username</label>
                        <d-form-input type="text" id="username" placeholder="Username" v-model="username" />
                      </d-col>

                      <!-- Email -->
                      <d-col md="6" class="form-group">
                        <label for="email">Email address</label>
                        <d-form-input type="email" id="email" placeholder="Email" v-model="email" />
                      </d-col>
                    </d-form-row>

                    <d-form-row>
                      <!-- First Name -->
                      <d-col md="6" class="form-group">
                        <label for="firstName">First Name</label>
                        <d-form-input type="text" id="firstName" placeholder="First Name" v-model="firstName" />
                      </d-col>

                      <!-- Last Name -->
                      <d-col md="6" class="form-group">
                        <label for="lastName">Last Name</label>
                        <d-form-input type="text" id="lastName" placeholder="Last Name" v-model="lastName" />
                      </d-col>
                    </d-form-row>

                    <!-- Address -->
                    <div class="form-group">
                      <label for="adresse">Address</label>
                      <d-form-input type="text" id="adresse" placeholder="Home Address" v-model="adresse" />
                    </div>

                    <d-form-row>
                      <!-- Job Position -->
                      <d-col md="6" class="form-group">
                        <label for="poste">Job Position</label>
                        <d-form-input type="text" id="poste" placeholder="Job Position" v-model="poste" />
                      </d-col>

                      <!-- Password -->
                      <d-col md="6" class="form-group">
                        <label for="password">Password</label>
                        <d-form-input type="password" id="password" placeholder="Password" v-model="password" />
                      </d-col>
                    </d-form-row>

                    <d-form-row>
                      <!-- Date of Birth -->
                      <d-col md="6" class="form-group">
                        <label for="datenaissance">Date of Birth</label>
                        <d-form-input type="date" id="datenaissance" placeholder="Date of Birth" v-model="datenaissance" />
                      </d-col>

                      <!-- Start Date -->
                      <d-col md="6" class="form-group">
                        <label for="daterec">Start Date</label>
                        <d-form-input type="date" id="daterec" placeholder="Start Date" v-model="daterec" />
                      </d-col>
                    </d-form-row>

                    <!-- Active Status -->
                    <div class="form-group">
                      <label for="status" class="d-checkbox-label">Active</label>
                      <d-checkbox id="status" v-model="status"></d-checkbox>
                    </div>

                    <!-- Submit Button -->
                    <d-button type="submit" class="btn-accent">Add Employee</d-button>
                  </d-form>

                  <!-- Import Employees -->
                  <d-form @submit.prevent="importEmployees">
                    <div class="form-group">
                      <label for="employeeFile">Import Employees (Excel .xlsx)</label>
                      <input type="file" id="employeeFile" @change="handleFileUpload" />
                    </div>
                    <d-button type="submit" class="btn-accent">Import Employees</d-button>
                  </d-form>
                </d-col>
              </d-row>
            </d-list-group-item>
          </d-list-group>
        </d-card>
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      adresse: '',
      poste: '',
      password: '',
      datenaissance: '',
      daterec: '',
      status: false,
      file: null,
    };
  },
  methods: {
    addEmployee() {
      const employeeData = {
        username: this.username,
        email: this.email,
        nom: `${this.firstName}` ,
        prenom:`${this.lastName}`,
        adresse: this.adresse,
        poste: this.poste,
        password: this.password,
        datenaissance: this.datenaissance,
        daterec: this.daterec,
        status: this.status,
      };

      fetch('https://localhost:7186/api/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add employee');
          }
          console.log('Employee added successfully');
          // Optionally, reset the form or perform additional actions
        })
        .catch(error => {
          console.error('Error adding employee:', error.message);
        });
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    importEmployees() {
      if (!this.file) {
        alert('Please select a file to upload');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);

      fetch('https://localhost:7186/api/employee/import', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to import employees');
          }
          console.log('Employees imported successfully');
          // Optionally, reset the form or perform additional actions
        })
        .catch(error => {
          console.error('Error importing employees:', error.message);
        });
    },
  },
};
</script>

<style>
/* Add your custom styles here */
.d-checkbox-label {
  margin-right: 8px;
}
</style>
