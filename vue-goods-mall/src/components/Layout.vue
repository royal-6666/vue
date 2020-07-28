<template>
	<el-container>
		<el-header style="padding: 0;">
			<!-- 头部 -->
			<Navbar></Navbar>
		</el-header>
		<el-container>
			<el-aside>
				<!-- 左边菜单 -->
				<Leftmenu></Leftmenu>
			</el-aside>
			<el-main>
				<!-- 右边主体 -->
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import Leftmenu from '@/components/Leftmenu.vue'
	import Navbar from '@/components/Navbar.vue'
	export default {
		components: {
			Leftmenu,
			Navbar
		}
	}
</script>

<style>
	.main {
		display: flex;
	}
</style>
