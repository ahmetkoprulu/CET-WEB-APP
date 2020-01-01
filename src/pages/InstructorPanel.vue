<template>
	<div>
		<Sidenav />
		<div class="instructor-container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import Sidenav from "../components/Sidenav.vue";

export default {
	name: "instructor",
	title: "Instructor",
	components: {
		Sidenav
	}
};
</script>

<style>
.instructor-container {
	margin-left: 50px;
}
</style>
