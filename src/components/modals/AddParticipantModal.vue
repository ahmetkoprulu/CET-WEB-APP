<template>
	<b-modal
		id="addParticipantModal"
		no-fade
		hide-header
		hide-backdrop
		ref="addParticipantModal"
		size="lg"
		content-class="shadow"
		title="Add Participant"
		@ok="addParticipants"
	>
		<template v-slot:modal-header="{ Close }"></template>
		<b-tabs content-class="mt-3 mb-3" v-model="tabIndex" pills>
			<b-tab title="Single">
				<b-form inline @submit="handleSingleSubmit">
					<ValidationObserver ref="addParticipantForm">
						<ValidationProvider rules="required" v-slot="{valid, errors}" name="ID">
							<b-form-input
								id="studentID"
								class="mr-2"
								placeholder="Studen ID"
								v-model="participantModel.studentID"
								:state="errors[0] ? false : (valid ? true : null)"
								trim
							></b-form-input>
						</ValidationProvider>
						<ValidationProvider rules="required" v-slot="{valid, errors}" name="Name">
							<b-form-input
								id="studentName"
								class="mr-2"
								placeholder="Student Name"
								v-model="participantModel.studentName"
								:state="errors[0] ? false : (valid ? true : null)"
								trim
							></b-form-input>
						</ValidationProvider>
						<ValidationProvider rules="required" v-slot="{valid, errors}" name="Email">
							<b-form-input
								id="studentEmail"
								class="mr-3"
								placeholder="Student Email"
								v-model="participantModel.studentEmail"
								type="email"
								:state="errors[0] ? false : (valid ? true : null)"
								trim
							></b-form-input>
						</ValidationProvider>
						<b-button type="submit" variant="primary">Add</b-button>
					</ValidationObserver>
				</b-form>
			</b-tab>
			<b-tab title="Bulk">
				<input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
			</b-tab>
		</b-tabs>
		<b-table striped hover bordered fixed :items="participatesToAdd" :fields="fields">
			<template v-slot:cell(index)="data">{{ data.index + 1 }}</template>
			<template v-slot:cell(actions)="data">
				<b-button @click="deleteParticipant(data.index)" variant="danger">
					<i class="fas fa-trash"></i>
				</b-button>
			</template>
		</b-table>
	</b-modal>
</template>
<script>
import axios from "axios";
import readXlsxFile from "read-excel-file";

export default {
	data() {
		return {
			tabIndex: 1,
			fields: [
				{ key: "index", label: "Index" },
				{ key: "studentID", label: "ID" },
				{ key: "studentName", label: "Name" },
				{ key: "studentEmail", label: "Email" },
				{ key: "password", label: "Password" },
				{ key: "actions", label: "Actions" }
			],
			participantModel: {},
			participatesToAdd: [],
			file: null
		};
	},
	methods: {
		generatePassword() {
			var pwdChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			var pwdLen = 8;
			var randPassword = Array(pwdLen)
				.fill(pwdChars)
				.map(function(x) {
					return x[Math.floor(Math.random() * x.length)];
				})
				.join("");

			return randPassword;
		},
		handleFileUpload() {
			/* eslint-disable no-console */
			this.file = this.$refs.file.files[0];
			console.log(this.file);
			readXlsxFile(this.file).then(data => {
				data.forEach(participate => {
					this.participatesToAdd.push({
						studentID: participate[0],
						studentName: participate[1],
						studentEmail: participate[2],
						password: this.generatePassword()
					});
				});
				console.log(this.participatesToAdd);
			});
		},
		async handleSingleSubmit(event) {
			event.preventDefault();
			let validationResult = await this.$refs.addParticipantForm.validate();

			if (!validationResult) return;
			this.participatesToAdd.push({
				...this.participantModel,
				password: this.generatePassword()
			});
			this.participantModel = {};
		},
		deleteParticipant(index) {
			this.participatesToAdd.splice(index, 1);
		},
		async addParticipants() {
			/* eslint-disable no-console */
			console.log(this.participatesToAdd);
			axios
				.post(
					`https://localhost:5001/api/v1/students/bulk/${this.$route.params.examId}`,
					this.participatesToAdd,
					{
						headers: {
							Authorization: `Bearer ${this.$store.state.user.currentUser.token}`
						}
					}
				)
				.then(() => (this.participatesToAdd = []))
				.catch(err => console.log(err));
			this.$nextTick(() => {
				this.$refs.addParticipantModal.hide();
			});
		},
		closeModal() {
			this.$nextTick(() => {
				this.$refs.addParticipantModal.hide();
			});
		}
	},
	props: {
		existUsers: Array
	}
};
</script>
<style scoped>
</style>