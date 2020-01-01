<template>
	<div class>
		<div class="mb-2 exam-questions-header">
			<span class="mt-auto">
				<b class="h3">Total:</b>
				<span class="h3">{{questionsCount}}</span>
			</span>
			<span>
				<b-button
					fixed-width
					v-b-modal.addQuestionModal
					pill
					variant="primary"
					class="mr-2"
					@click="createNewQuestion"
				>
					<i class="fas fa-plus"></i> Add Question
				</b-button>
			</span>
		</div>
		<b-list-group flush>
			<b-list-group-item
				href="#"
				v-for="(question, index) in questions"
				v-bind:key="question.questionID"
				@click="questionOnClick(question)"
				v-b-modal.addQuestionModal
				class="list-group-item flex-column align-items-start"
			>
				<div class="d-flex w-100 justify-content-between">
					<span>
						<pre style="padding: 0px" class="mb-1 d-flex">
							{{`\n${index+1}. ${question.questionText.split("*[SEAS-SLASH-N]*").join("\n")}`}}
						</pre>
						<p v-if="question.questionType === 'short_answer'">
							<b>Answer:</b>
							{{question.questionExtra.answer}}
						</p>
						<p v-if="question.questionType === 'programming'">
							<b>Inputs:</b>
							{{question.questionExtra.inputs}}
							<b>Outputs:</b>
							{{question.questionExtra.outputs}}
						</p>
						<b-badge variant="info" class="mr-2 mt-2">{{question.questionType}}</b-badge>
						<b-badge variant="info">{{question.questionExtra.value}} pts</b-badge>
					</span>
					<div class="question-actions">
						<b-button variant="danger" size="sm" @click="deleteQuestion(index, question.questionID)">
							<i class="fas fa-trash"></i>
						</b-button>
					</div>
				</div>
			</b-list-group-item>
		</b-list-group>
		<AddQuestionModal :questionModel="selectedQuestion" :questions="questions" />
	</div>
</template>
<script>
import AddQuestionModal from "./modals/AddQuestionModel";
import axios from 'axios'

export default {
	data() {
		return {
			selectedQuestion: {},
			questionModel: {
				questionText: null,
				questionType: null,
				examID: this.$route.params.examId,
				questionExtra: {
					inputs: null,
					outputs: null,
					answer: null,
					value: null
				}
			}
		};
	},
	methods: {
		/* eslint-disable no-console */
		createNewQuestion() {
			this.selectedQuestion = this.questionModel;
		},
		questionOnClick(question) {
			this.selectedQuestion = question;
		},
		deleteQuestion(index, questionID) {
			axios
				.post(
					`https://localhost:5001/api/v1/questions/${questionID}/delete`,
					{
						headers: {
							Authorization: `Bearer ${this.$store.state.user.currentUser.token}`
						}
					}
				)
				.then(() => this.questions.splice(index, 1))
				.catch(err => console.log(err));
		}
	},
	mounted() {
		console.log(JSON.parse('{"input":[["1"]]}'));
		console.log(JSON.stringify({ input: [["1"]] }));
		console.log(
			this.$props.questions.map(
				q => (q.questionExtra = JSON.parse(q.questionExtra))
			)
		);
	},
	computed: {
		questionsCount() {
			return this.questions.length;
		},
		createQuestionString(question) {
			return question.split("*[SEAS-SLASH-N]*").join("\n");
		}
	},
	props: {
		questions: Array
	},
	components: {
		AddQuestionModal
	}
};
</script>
<style scoped>
.exam-questions-header {
	display: flex;
	justify-content: space-between;
}

pre {
	overflow-x: auto;
	white-space: pre-wrap;
	white-space: -moz-pre-wrap !important;
	white-space: -pre-wrap;
	white-space: -o-pre-wrap;
	word-wrap: break-word;
}

.question-actions {
	display: none;
	height: 100%;
	margin-top: auto;
	margin-bottom: auto;
}

.d-flex:hover > .question-actions {
	display: block;
}
</style>