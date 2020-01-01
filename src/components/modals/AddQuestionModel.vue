<template>
	<b-modal
		id="addQuestionModal"
		hide-backdrop
		ref="addQuestionModal"
		size="lg"
		title="Create New Question"
	>
		<ValidationObserver ref="addQuestionForm">
			<ValidationProvider rules="required" v-slot="{ valid, errors }" name="Text">
				<b-form-group label="Text" label-for="text">
					<b-form-textarea
						id="text"
						v-model="questionModel.questionText"
						:state="errors[0] ? false : (valid ? true : null)"
						trim
					></b-form-textarea>
					<b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
				</b-form-group>
			</ValidationProvider>
			<ValidationProvider rules="required" v-slot="{ valid, errors }" name="Score">
				<b-form-group label="Score" label-for="score">
					<b-form-input
						id="score"
						v-model="questionModel.questionExtra.value"
						:state="errors[0] ? false : (valid ? true : null)"
						trim
					></b-form-input>
					<b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
				</b-form-group>
			</ValidationProvider>
			<ValidationProvider rules="required" v-slot="{ valid, errors }" name="Type">
				<b-form-group label="Type" label-for="type">
					<b-form-select
						id="type"
						v-model="questionModel.questionType"
						:options="questionTypes"
						:state="errors[0] ? false : (valid ? true : null)"
						required
					></b-form-select>
					<b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
				</b-form-group>
			</ValidationProvider>
			<ValidationProvider
				rules="required"
				v-slot="{ valid, errors }"
				name="Answer"
				v-if="questionModel.questionType === 'short_answer'"
			>
				<b-form-group label="Answer" label-for="answer">
					<b-form-input
						id="answer"
						v-model="questionModel.questionExtra.answer"
						:state="errors[0] ? false : (valid ? true : null)"
						trim
					></b-form-input>
					<b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
				</b-form-group>
			</ValidationProvider>
			<ValidationProvider
				rules="required"
				v-slot="{ valid, errors }"
				name="Input"
				v-if="questionModel.questionType === 'programming'"
			>
				<b-form-group label="Input" label-for="input">
					<b-form-input
						id="input"
						v-model="questionModel.questionExtra.inputs"
						:state="errors[0] ? false : (valid ? true : null)"
						trim
					></b-form-input>
					<b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
				</b-form-group>
			</ValidationProvider>
			<ValidationProvider
				rules="required"
				v-slot="{ valid, errors }"
				name="Output"
				v-if="questionModel.questionType === 'programming'"
			>
				<b-form-group label="Output" label-for="output">
					<b-form-input
						id="output"
						v-model="questionModel.questionExtra.outputs"
						:state="errors[0] ? false : (valid ? true : null)"
						trim
					></b-form-input>
					<b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
				</b-form-group>
			</ValidationProvider>
		</ValidationObserver>
		<template v-slot:modal-footer>
			<div class="w-100">
				<b-button variant="success" class="ml-2 float-right" @click="addQuestion">Create</b-button>
				<b-button variant="secondary" class="float-right" @click="closeModal">Close</b-button>
			</div>
		</template>
	</b-modal>
</template>
<script>
import axios from "axios";
export default {
	data() {
		return {
			questionTypes: [
				{ value: null, text: "Please select a question type" },
				{ value: "short_answer", text: "Short Answer" },
				{ value: "programming", text: "Programming" },
				{ value: "multiple_choice", text: "Multiple Choice" }
			]
		};
	},
	methods: {
		async addQuestion(bvModalEvt) {
			bvModalEvt.preventDefault();
			let validationResult = await this.$refs.addQuestionForm.validate();

			if (!validationResult) {
				return;
			}
			/* eslint-disable no-console */
			console.log(this.questionModel);
			if (this.questionModel.questionID) {
				await axios
					.post(
						`https://localhost:5001/api/v1/questions/${this.questionModel.questionID}/update`,
						{
							...this.questionModel,
							questionExtra: JSON.stringify(
								this.questionModel.questionExtra
							)
						},
						{
							headers: {
								Authorization: `Bearer ${this.$store.state.user.currentUser.token}`
							}
						}
					)
					.then(() => {
						this.$nextTick(() => {
							this.$refs.addQuestionModal.hide();
						});
					})
					.catch(err => console.log(err));
			} else {
				await axios
					.post(
						`https://localhost:5001/api/v1/questions/`,
												{
							...this.questionModel,
							questionExtra: JSON.stringify(
								this.questionModel.questionExtra
							)
						},
						{
							headers: {
								Authorization: `Bearer ${this.$store.state.user.currentUser.token}`
							}
						}
					)
					.then(() => {
                        this.questions.push(this.questionModel)
						this.$nextTick(() => {
							this.$refs.addQuestionModal.hide();
						});
					})
					.catch(err => console.log(err));
			}
		},
		closeModal() {
			this.$refs.addQuestionModal.hide();
		}
	},
	props: {
        questionModel: Object,
        questions: Array
	}
};
</script>
<style scoped>
</style>