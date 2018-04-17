<template>
	<div class="pop" id="pop">
		<div class="popup-wrapper">
			<div class="content">
				<span>更新了3条数据</span>
			</div>
		</div>
		
	</div>
</template>

<script>
</script>

<style>
	.pop
	{
	position: fixed;
		top: 44px;
		background: grey;
		width: 100%;
		height: 1rem;
		opacity: 0;
	transition: opacity 10s z-index 2s;
	-moz-transition: opacity 2s z-index 2s;	/* Firefox 4 */
	-webkit-transition: opacity 2s z-index 2s;	/* Safari 和 Chrome */
	-o-transition: opacity 2s z-index 2s;	/* Opera */
	}
	.o{
		opacity: 1;
	}
</style>