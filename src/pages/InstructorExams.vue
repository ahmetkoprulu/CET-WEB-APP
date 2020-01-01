<template>
	<div class="instructor-exams-container">
		<div class="spinner-border m-5" role="status" v-if="loading">
			<span class="sr-only">Loading...</span>
		</div>
		<div v-if="!loading">
			<div class="instructor-exams-header">
				<h2 style="margin-bottom:auto">Exams</h2>
				<b-button v-b-modal.addExamModal variant="primary">
					<i class="fas fa-plus"></i> Create New Exam
				</b-button>
			</div>
			<hr />
			<b-list-group>
				<b-list-group-item
					href="#"
					v-for="(exam, index) in exams"
					:key="exam.examID"
					class="flex-column align-items-start"
				>
					<div class="d-flex w-100 justify-content-between" @click="examOnClick(exam.examID)">
						<div>
							<h5>{{index+1}}.{{exam.examTitle}}</h5>
							<span>
								<b>Date:</b>
								<span class="mr-2">{{exam.examDate}}</span>
								<b>Duration:</b>
								<span class="mr-2">{{exam.examDuration}}</span>
								<b>Security Key:</b>
								<span>{{exam.examSecurityKey}}</span>
							</span>
						</div>
					</div>
				</b-list-group-item>
			</b-list-group>
		</div>

		<AddExamModal></AddExamModal>
	</div>
</template>

<script>
import axios from "axios";
import AddExamModal from "../components/modals/AddExamModel";
export default {
	data() {
		return {
			loading: true,
			errored: false,
			exams: []
		};
	},
	methods: {
		examOnClick(examId) {
			this.$router.push({
				name: "InstrutorExamDetail",
				params: { examId: examId }
			});
		}
	},
	mounted() {
		axios
			.get(
				`https://localhost:5001/api/v1/exams/${this.$store.state.user.currentUser.email}/all`,
				{
					headers: {
						Authorization: `Bearer ${this.$store.state.user.currentUser.token}`
					}
				}
			) /* eslint-disable no-console */
			.then(response => {
				console.log(response.data);
				this.exams = response.data;
				this.loading = false;
			});
	},
	components: {
		AddExamModal
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

.exam :hover {
}
</style>