<template>
	<div class="about-us">
		<header class="mui-bar mui-bar-nav">
			<button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @tap="back">
				<span class="mui-icon mui-icon-left-nav"></span>
			</button>
			<h1 class="mui-title">关于法园君</h1>
		</header>
		<div class="mui-content">
			<p>
				&nbsp;&nbsp;&nbsp;&nbsp; 法律创造价值，法律改变生活，感谢您的选择，助力法园君成为更多高校大学生的掌上法宝。 <br>法园君App由华南农业大学生团队创办，经过实地调研，系统分析调研数据，以考察高校大学生法律意识的普遍性以及对法律的需求程度。 <br>&nbsp;&nbsp; &nbsp;&nbsp; 法园君App开发致力于解决在校大学生的法律问题，对接高校法律需求与大学生资源，创造一个低成本、高效率、多途径的法律援助环境。<br> &nbsp;&nbsp; &nbsp;&nbsp; 法园君团队云集各界精英，高校教授、资深律师、技术顾问、优秀学生群体，尽可能从专业上保证答疑的有效性，从技术上保证App运用的舒适度，从理念上保证公益法律服务的务实性。 <br> &nbsp;&nbsp; &nbsp;&nbsp; 如您有任何法律方面的问题，无论是具体法条的查询，还是真实案例的求助，都可以选择法园君App，我们将提供最及时的解答和最优的帮助，为您服务。
			</p>
		</div>
	</div>
</template>

<script>
	export default{
		beforeRouteEnter(to,from,next){
			document.body.style.background = "white";
			next();
		},
		beforeRouteLeave(to,from,next){
			document.body.style.background = "#efeff4";
			next();
		},
		methods:{
			back(){
			this.$router.replace("/");
			}
		}
	}
</script>

<style>
	.about-us .mui-content p {
		padding: 15px 10px;
		line-height: 0.9rem;
	}
	.about-us .mui-content{
		background: white;
	}
</style>