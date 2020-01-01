<template>
	<div class="instructor-exams-container">
		<div class="spinner-border m-5" role="status" v-if="loading">
			<span class="sr-only">Loading...</span>
		</div>
		<div class v-if="!loading">
			<div class="instructor-exams-header">
				<h2 style="margin-bottom:auto">Exam Details</h2>
				<div>
					<span
						class="spinner-border spinner-border-sm mr-3"
						role="status"
						aria-hidden="true"
						v-if="buttonLoading"
					></span>
					<button class="btn btn-info mr-2" @click="deleteExam" type="button" :disabled="buttonLoading">
						<i class="fas fa-chart-line"></i> Show Results
					</button>
					<button
						class="btn btn-success mr-2"
						@click="updateExam"
						type="button"
						:disabled="buttonLoading"
					>
						<i class="fas fa-save"></i>
						Save Exam
					</button>
					<button class="btn btn-danger" @click="deleteExam" type="button" :disabled="buttonLoading">
						<i class="fas fa-trash"></i> Delete Exam
					</button>
				</div>
			</div>
			<hr />
			<ValidationObserver ref="updateExamForm">
				<ValidationProvider rules="required" v-slot="{ valid, errors }" name="Title">
					<b-form-group label="Title" label-for="title">
						<b-form-input
							id="title"
							v-model="examModel.examTitle"
							:state="errors[0] ? false : (valid ? true : null)"
							trim
						></b-form-input>
						<b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
					</b-form-group>
				</ValidationProvider>
				<ValidationProvider rules="required" v-slot="{ valid, errors }" name="Date">
					<b-form-group label="Date" label-for="date">
						<b-form-input
							id="date"
							v-model="examModel.examDate"
							:type="'datetime-local'"
							:state="errors[0] ? false : (valid ? true : null)"
							trim
						></b-form-input>
						<b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
					</b-form-group>
				</ValidationProvider>
				<ValidationProvider rules="required" v-slot="{ valid, errors }" name="Duration">
					<b-form-group label="Duration (in minutes)" label-for="duration">
						<b-form-input
							id="duration"
							v-model="examModel.examDuration"
							:type="'number'"
							:state="errors[0] ? false : (valid ? true : null)"
							trim
						></b-form-input>
						<b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
					</b-form-group>
				</ValidationProvider>
			</ValidationObserver>
			<div>
				<b-card no-body>
					<b-tabs pills card>
						<b-tab title="Questions" active>
							<b-card-text>
								<ExamQuestions :questions="examModel.questions"></ExamQuestions>
							</b-card-text>
						</b-tab>
						<b-tab title="Participants">
							<b-card-text>
								<ExamParticipants></ExamParticipants>
							</b-card-text>
						</b-tab>
					</b-tabs>
				</b-card>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";
import ExamQuestions from "../components/ExamQuestions";
import ExamParticipants from "../components/ExamParticipants";
export default {
	data() {
		return {
			examModel: {},
			loading: true,
			buttonLoading: false
		};
	},
	async created() {
		/* eslint-disable no-console */
		this.examModel = await axios
			.get(
				`https://localhost:5001/api/v1/exams/${this.$route.params.examId}/questions`,
				{
					headers: {
						Authorization: `Bearer ${this.$store.state.user.currentUser.token}`
					}
				}
			)
			.then(response => response.data)
			.catch(err => console.log(err));

		this.loading = false;
	},
	methods: {
		async updateExam() {
			/* eslint-disable no-console */
			console.log(this.examDate);
			const isValidate = await this.$refs.updateExamForm.validate();
			console.log(isValidate);
			if (!isValidate) return;
			console.log(this.examModel);
			this.buttonLoading = true;
			axios
				.post(
					`https://localhost:5001/api/v1/exams/${this.$route.params.examId}/update`,
					{
						examTitle: this.examModel.examTitle,
						examDate: this.examModel.examDate,
						examDuration: this.examModel.examDuration,
						instructorEmail: this.examModel.instructorEmail
					},
					{
						headers: {
							Authorization: `Bearer ${this.$store.state.user.currentUser.token}`
						}
					}
				)
				.then(() => this.$router.push({ name: "InstructorExams" }))
				.catch(err => console.log(err));
			this.buttonLoading = false;
		},
		deleteExam() {
			this.buttonLoading = true;
			axios
				.get(
					`https://localhost:5001/api/v1/exams/${this.$route.params.examId}/delete`,
					{
						headers: {
							Authorization: `Bearer ${this.$store.state.user.currentUser.token}`
						}
					}
				)
				.then(() => this.$router.push({ name: "InstructorExams" }))
				.catch(err => console.log(err));
			this.buttonLoading = false;
		}
	},
	components: {
		ExamQuestions,
		ExamParticipants
	}
};
</script>
<style scoped>
.instructor-exams-container {
	padding: 30px;
	width: 100%;
	height: 100%;
}
.instructor-exams-header {
	display: flex;
	justify-content: space-between;
}
</style>