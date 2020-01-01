<template>
  <b-modal id="addExamModal" ref="addExamModal" size="lg" hide-backdrop content-class="shadow" title="Create New Exam">
    <ValidationObserver ref="addExamForm">
			<ValidationProvider rules="required" v-slot="{ valid, errors }" name="Title">
					<b-form-group label="Title" label-for="title">
						<b-form-input id="title" v-model="examModel.examTitle" :state="errors[0] ? false : (valid ? true : null)" trim></b-form-input>
						<b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
					</b-form-group>
				</ValidationProvider>
        <ValidationProvider rules="required" v-slot="{ valid, errors }" name="Date">
					<b-form-group label="Date" label-for="date">
						<b-form-input id="date" v-model="examModel.examDate" :type="'datetime-local'" :state="errors[0] ? false : (valid ? true : null)" trim></b-form-input>
						<b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
					</b-form-group>
				</ValidationProvider>
        <ValidationProvider rules="required" v-slot="{ valid, errors }" name="Duration">
					<b-form-group label="Duration (in minutes)" label-for="duration">
						<b-form-input id="duration" v-model="examModel.examDuration" :type="'number'" :state="errors[0] ? false : (valid ? true : null)" trim></b-form-input>
						<b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
					</b-form-group>
				</ValidationProvider>
			</ValidationObserver>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button variant="success" class="ml-2 float-right" @click="addExam">Create</b-button>
          <b-button variant="secondary" class="float-right" @click="closeModal">Close</b-button>
        </div>
      </template>
  </b-modal>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return {
      examModel: {
        examId: undefined,
        examTitle: '',
        examDate: '2019-10-12T12:00',
        examDuration: 60,
        instructorEmail: this.$store.state.user.currentUser.email
      }
    }
  },
  methods: {
    async addExam(bvModalEvt) {
      bvModalEvt.preventDefault();
			let validationResult = await this.$refs.addExamForm.validate();

			if (!validationResult) {
				return;
      }
      /* eslint-disable no-console */
      console.log(this.examModel)
      axios.post(`https://localhost:5001/api/v1/exams/`, this.examModel, {headers: {
        Authorization: `Bearer ${this.$store.state.user.currentUser.token}`,
      }}).then(response => this.$router.push({name: 'InstrutorExamDetail', params: {examId: response.data}}))
      .catch(err => console.log(err))

      this.examModal = {examId: undefined, examTitle: '', examDate: '2019-10-12T12:00', examDuration: 60, }      
      this.$nextTick(() => {
        this.$refs.addExamModal.hide()
      })
    },
    closeModal() {
      this.$nextTick(() => {
        this.$refs.addExamModal.hide()
      })
    }
  }
}
</script>
<style scoped>

</style>