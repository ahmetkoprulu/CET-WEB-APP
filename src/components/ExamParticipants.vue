<template>
	<div>
		<div class="exam-questions-header">
			<span class="mt-auto">
				<b class="h3">Total:</b>
				<span class="h3">{{participantsCount}}</span>
			</span>
			<span>
				<b-button fixed-width v-b-modal.addParticipantModal pill variant="primary" class="mr-2">
					<i class="fas fa-user-plus"></i> Add Participant
				</b-button>
				<b-button fixed-width v-b-modal.addParticipantModal pill variant="primary">
					<i class="fas fa-users"></i> Bulk Registration
				</b-button>
			</span>
		</div>
		<b-input-group class="mt-2 mb-2">
			<template v-slot:prepend>
				<b-input-group-text>
					<i class="fas fa-search"></i>
				</b-input-group-text>
			</template>
			<b-form-input v-model="searchKey" :placeholder="'Search Participant'"></b-form-input>
		</b-input-group>
		<b-list-group>
			<b-list-group-item
				href="#"
				v-for="(participant, index) in filteredList"
				:key="participant.studentID"
				class="flex-column align-items-start"
			>
				<div class="d-flex w-100 justify-content-between">
					<div class="participant">
						<h5>{{index+1}}.{{participant.studentName}}</h5>
						<span>
							<b>Student ID:</b>
							<span class="mr-2">{{participant.studentID}}</span>
							<b>Email:</b>
							<span>{{participant.studentEmail}}</span>
						</span>
					</div>
					<div class="participant-actions">
						<b-button class="mr-2" variant="dark" @click="resetAttendance(participant.studentID)">
							<i class="fas fa-sync"></i>
						</b-button>
						<b-button
							class="mr-2"
							variant="dark"
							@click="sendResetPasswordEmail(participant.studentEmail)"
						>
							<i class="fas fa-unlock-alt"></i>
						</b-button>
						<b-button variant="danger" @click="deleteParticipant(index, participant.studentID)">
							<i class="fas fa-trash"></i>
						</b-button>
					</div>
				</div>
			</b-list-group-item>
		</b-list-group>
		<AddParticipantModal />
	</div>
</template>
<script>
import axios from "axios";
import AddParticipantModal from "../components/modals/AddParticipantModal";
export default {
	data() {
		return {
			participants: [],
			searchKey: ""
		};
	},
	computed: {
		filteredList() {
			return this.participants.filter(
				p =>
					p.studentName
						.toLowerCase()
						.includes(this.searchKey.toLowerCase()) ||
					p.studentID.includes(this.searchKey.toLowerCase())
			);
		},
		participantsCount() {
			return this.participants.length;
		}
	},
	methods: {
		/* eslint-disable no-console */
		deleteParticipant(index, studentID) {
			axios
				.post(
					`https://localhost:5001/api/v1/students/${studentID}/remove/${this.$route.params.examId}`
				)
				.then(() => this.participants.splice(index, 1))
				.catch(err => console.log(err));
		},
		sendResetPasswordEmail(email) {
			axios
				.get(
					`https://localhost:5001/api/v1/students/resetpassword/${email}`,
					this.participatesToAdd
				)
				.catch(err => console.log(err));
		},
		resetAttendance(studentID) {
			axios
				.post(
					`https://localhost:5001/api/v1/students/${studentID}/remove/${this.$route.params.examId}`
				)
				.then(
					axios.post(
						`https://localhost:5001/api/v1/students/${studentID}/register/${this.$route.params.examId}`
					)
				)
				.catch(err => console.log(err));
		}
	},
	async created() {
		/* eslint-disable no-console */
		this.participants = await axios
			.get(
				`https://localhost:5001/api/v1/exams/${this.$route.params.examId}/participants`,
				{
					headers: {
						Authorization: `Bearer ${this.$store.state.user.currentUser.token}`
					}
				}
			)
			.then(response => {
				return response.data;
			})
			.catch(err => console.log(err));
	},
	components: {
		AddParticipantModal
	}
};
</script>
<style scoped>
.exam-questions-header {
	display: flex;
	justify-content: space-between;
}

.participant {
}

.participant-actions {
	display: none;
	height: 100%;
	margin-top: auto;
	margin-bottom: auto;
}

.d-flex:hover > .participant-actions {
	display: block;
}
</style>