<template>
    <HeaderView />
    <h1>Loan Application</h1>
    <form @submit.prevent="submitForm">
      <!-- Applicant Type Selection -->
      <section class="applicant-type">
        <h2>Applicant Type</h2>
        <div class="form-group-inline">
          <input
            type="checkbox"
            id="newApplicant"
            :checked="formData.isNewApplicant"
            @change="toggleApplicantType('new')"
          />
          <label for="newApplicant">New Applicant</label>
        </div>
        <div class="form-group-inline">
          <input
            type="checkbox"
            id="recurrentApplicant"
            :checked="formData.isRecurrentApplicant"
            @change="toggleApplicantType('recurrent')"
          />
          <label for="recurrentApplicant">Recurrent Applicant</label>
        </div>
        <div v-if="formData.isRecurrentApplicant" class="form-group-inline">
          <label for="clientNo">Client No.</label>
          <input
            type="text"
            id="clientNo"
            v-model="formData.clientNo"
            placeholder="Enter Client No."
          />
        </div>
      </section>
  
      <!-- I. Eligibility (Application) -->
      <section class="eligibility">
        <h2>Eligibility (Application)</h2>
        <div class="form-group-inline">
          <input type="checkbox" id="ageRequirement" v-model="formData.ageRequirement" />
          <label for="ageRequirement">Age of applicant 18 or above?</label>
        </div>
        <div class="form-group-inline">
          <input type="checkbox" id="residencyRequirement" v-model="formData.residencyRequirement" />
          <label for="residencyRequirement">Applicant is the owner of the business?</label>
        </div>
        <div class="form-group-inline">
          <input type="checkbox" id="isExercisingActivity" v-model="formData.isExercisingActivity" />
          <label for="isExercisingActivity">Applicant is currently exercising activity?</label>
        </div>
        <div class="form-group-inline">
          <input type="checkbox" id="isRelativeOrFriendOfEmployee" v-model="formData.isRelativeOrFriendOfEmployee" />
          <label for="isRelativeOrFriendOfEmployee">Applicant is a relative or friend of a bank employee?</label>
        </div>
        <div class="form-group-inline">
          <input type="checkbox" id="isMalawianCitizen" v-model="formData.isMalawianCitizen" />
          <label for="isMalawianCitizen">Applicant is a Malawian citizen domiciled in the country?</label>
        </div>
        <div class="form-group-inline">
          <input type="checkbox" id="isOperatingArea" v-model="formData.isOperatingArea" />
          <label for="isOperatingArea">Business is operating in the area?</label>
        </div>
        <div v-if="formData.isOperatingArea" class="form-group-inline">
          <input
            type="checkbox"
            id="isConsecutiveForSixMonths"
            v-model="formData.isConsecutiveForSixMonths"
          />
          <label for="isConsecutiveForSixMonths">
            Applicant is exercising activity consecutively for the past 6 months?
          </label>
        </div>
        <div v-if="formData.isConsecutiveForSixMonths" class="form-group">
          <label for="employeeName">If yes, employee name:</label>
          <input type="text" id="employeeName" v-model="formData.employeeName" placeholder="Employee Name" />
        </div>
      </section>
  
      <!-- II. Information About the Applicant -->
      <section class="applicant-info">
        <h2>Information About the Applicant</h2>
        <fieldset>
          <legend>Personal Details</legend>
          <div class="form-group">
            <label for="firstName">First Name (Applicant)</label>
            <input type="text" id="firstName" v-model="formData.firstName" />
          </div>
          <div class="form-group">
            <label for="middleName">Middle Name (Applicant)</label>
            <input type="text" id="middleName" v-model="formData.middleName" />
          </div>
          <div class="form-group">
            <label for="lastName">Surname (Applicant)</label>
            <input type="text" id="lastName" v-model="formData.lastName" />
          </div>
          <div class="form-group">
            <label for="gender">Gender</label>
            <select id="gender" v-model="formData.gender">
              <option value="" disabled>Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div class="form-group">
            <label for="dateOfBirth">Date of Birth (Applicant)</label>
            <input type="date" id="dateOfBirth" v-model="formData.dateOfBirth" />
          </div>
          <div class="form-group">
            <label for="phone">Phone (Applicant)</label>
            <input type="text" id="phone" v-model="formData.phone" />
          </div>
          <div class="form-group">
            <label for="email">Email (Applicant)</label>
            <input type="email" id="email" v-model="formData.email" />
          </div>
  
          <!-- Spouse Details -->
          <div class="form-group">
            <label for="maritalStatus">Marital Status</label>
            <select id="maritalStatus" v-model="formData.maritalStatus">
              <option value="" disabled>Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
          <div v-if="formData.maritalStatus === 'Married'" class="spouse-details">
            <div class="form-group">
              <label for="spouseFirstName">First Name (Spouse)</label>
              <input type="text" id="spouseFirstName" v-model="formData.spouseFirstName" />
            </div>
            <div class="form-group">
              <label for="spouseMiddleName">Middle Name (Spouse)</label>
              <input type="text" id="spouseMiddleName" v-model="formData.spouseMiddleName" />
            </div>
            <div class="form-group">
              <label for="spouseLastName">Surname (Spouse)</label>
              <input type="text" id="spouseLastName" v-model="formData.spouseLastName" />
            </div>
            <div class="form-group">
              <label for="spouseDateOfBirth">Date of Birth (Spouse)</label>
              <input type="date" id="spouseDateOfBirth" v-model="formData.spouseDateOfBirth" />
            </div>
            <div class="form-group">
              <label for="spousePhone">Phone (Spouse)</label>
              <input type="text" id="spousePhone" v-model="formData.spousePhone" />
            </div>
          </div>
        </fieldset>
      </section>
  
      <!-- III. Information About the Business -->
      <section class="business-info">
        <h2>Information About the Business</h2>
        <fieldset>
          <legend>Business Details</legend>
          <div class="form-group">
            <label for="businessName">Business Name</label>
            <input type="text" id="businessName" v-model="formData.businessName" />
          </div>
          <div class="form-group">
            <label for="businessLocation">Business Location</label>
            <input type="text" id="businessLocation" v-model="formData.businessLocation" />
          </div>
          <div class="form-group">
            <label for="businessActivity">Type of Activity</label>
            <input type="text" id="businessActivity" v-model="formData.businessActivity" />
          </div>
        </fieldset>
      </section>
  
      <!-- IV. Loan Request Details -->
      <section class="loan-request">
        <h2>Loan Requested</h2>
        <fieldset>
          <legend>Loan Details</legend>
          <div class="form-group">
            <label for="loanAmount">Amount</label>
            <input type="number" id="loanAmount" v-model="formData.loanAmount" />
          </div>
          <div class="form-group">
            <label for="monthlyPayment">How much can you pay per month?</label>
            <input type="number" id="monthlyPayment" v-model="formData.monthlyPayment" />
          </div>
          <div class="form-group">
            <label>Investment Objective</label>
            <div class="checkbox-group">
              <input type="checkbox" id="workingCapital" value="Working Capital" v-model="formData.objectives" />
              <label for="workingCapital">Working Capital</label>
              <input type="checkbox" id="expansion" value="Expansion" v-model="formData.objectives" />
              <label for="expansion">Expansion</label>
              <input type="checkbox" id="machinery" value="Machinery" v-model="formData.objectives" />
              <label for="machinery">Machinery</label>
              <input type="checkbox" id="other" value="Other" v-model="formData.objectives" />
              <label for="other">Other</label>
            </div>
          </div>
          <div class="form-group" v-if="formData.objectives.includes('Other')">
            <label for="otherObjective">If Other, please specify:</label>
            <input type="text" id="otherObjective" v-model="formData.otherObjective" />
          </div>
        </fieldset>
      </section>
  
      <button type="submit">Submit Application</button>
    </form>
  </template>
  
  <script>
  import HeaderView from './HeaderView.vue';
  export default {
    name: "UpdateUser",
  components: {
    HeaderView
  },
    data() {
      return {
        formData: {
          isNewApplicant: false,
          isRecurrentApplicant: false,
          clientNo: '',
          ageRequirement: false,
          residencyRequirement: false,
          isExercisingActivity: false,
          isRelativeOrFriendOfEmployee: false,
          isMalawianCitizen: false,
          isOperatingArea: false,
          isConsecutiveForSixMonths: false,
          employeeName: '',
          firstName: '',
          middleName: '',
          lastName: '',
          gender: '',
          dateOfBirth: '',
          phone: '',
          email: '',
          maritalStatus: '',
          spouseFirstName: '',
          spouseMiddleName: '',
          spouseLastName: '',
          spouseDateOfBirth: '',
          spousePhone: '',
          businessName: '',
          businessLocation: '',
          businessActivity: '',
          loanAmount: null,
          monthlyPayment: null,
          objectives: [],
          otherObjective: '',
        },
      };
    },
    methods: {
      toggleApplicantType(type) {
        if (type === 'new') {
          this.formData.isNewApplicant = true;
          this.formData.isRecurrentApplicant = false;
          this.formData.clientNo = '';
        } else if (type === 'recurrent') {
          this.formData.isNewApplicant = false;
          this.formData.isRecurrentApplicant = true;
        }
      },
      submitForm() {
        console.log(this.formData);
        alert('Form submitted successfully!');
      },
    },
  };
  </script>
  
  
  <style scoped>
  form {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  h1, h2 {
    text-align: center;
    color: #333;
  }
  
  section {
    margin-bottom: 30px;
  }
  
  fieldset {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    background-color: #fff;
  }
  
  legend {
    font-weight: bold;
    font-size: 1.1em;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }
  
  .checkbox-group {
    display: flex;
    gap: 15px;
  }
  
  button {
    padding: 12px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .applicant-type, .eligibility, .applicant-info, .business-info, .loan-request {
    background-color: #e9ecef;
    padding: 15px;
    border-radius: 8px;
  }
  
  .form-group-inline {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  </style>
  