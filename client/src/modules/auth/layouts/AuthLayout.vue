<script setup>
</script>

<template>
	<div class="auth-layout">
		<div class="content">
			<header>
				<h2>
					<slot name="header" />
				</h2>
			</header>
			
			<main>
				<slot name="mainContent" />
			</main>
			
			<footer>
				<slot name="footer" />
			</footer>
		</div>
	</div>
</template>

<style scoped>
.auth-layout {
	width: 100%;
	min-height: 100dvh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.content {
	max-width: 1024px;
}

header {
}

main {
	margin-top: calc(var(--spacing-xl) * 2);
}
</style>
