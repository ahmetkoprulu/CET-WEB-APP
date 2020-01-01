<template>
	<sidebar-menu :menu="menu" width="200px" hidde-toggle disable-hover collapsed />
</template>

<script>
export default {
	data() {
		return {
			menu: [
				{
					header: true,
					title: "Instructor",
					// hidden: false
					hiddenOnCollapse: true
					// class: ''
					// attributes: {}
				},
				{
					href: "/",
					title: "Ali Cakmak",
					icon: "fa fa-user"
				},
				{
					header: true,
					title: "Main Navigation",
					// hidden: false
					hiddenOnCollapse: true
					// class: ''
					// attributes: {}
				},
				{
					href: "/",
					title: "Dashboard",
					icon: "fas fa-tachometer-alt"
				},
				{
					href: "/instructor/exams",
					title: "Exams",
					icon: "fas fa-book-open"
				},
				{
					href: "/instructor/live",
					title: "Live",
					icon: "fas fa-satellite-dish"
				}
			]
		};
	}
};
</script>