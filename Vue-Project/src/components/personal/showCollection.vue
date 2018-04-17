<template>
	<div class="show-Collection">
		<header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @tap="back"></a>
			<h1 class="mui-title">我的收藏</h1>
		</header>
		<div class="mui-content" id="collections">
			<p v-if="collections.length === 0" class="tips" ref="tips">暂时未有收藏</p>
			<ul v-else="">
				<li v-for="(collect,index) in collections" class="" @tap="getDetail(index)">
					<a href="javascript:void(0);" ref="collectDetail">
						<div class="mui-card">
							<div class="mui-card-header collect-title" >
								<p class="content" ref="collectContent"></p>
							</div>
							<span><i class="iconfont icon-moreif"></i></span>
							<div class="mui-card-footer" id="description">
								<span> 
									<img :src="collect.portrait" style="border-radius: 50%;"/>
									<span>由 {{ collect.username }} 创建</span>
								</span>
								<span>{{ collect.description }}</span>

							</div>
						</div>
					</a>
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			collections(){
				var index = 0;
				this.$nextTick(() => {
					var contents = this.$refs.collectContent;
					for(let p in contents) {
						contents[p].innerHTML = this.$store.state.collections[index++].content;
					}
					index = 0;
				})
				return this.$store.state.collections;
			}
		},

		
		methods: {
			getUserInfo() {
	//				this.$router.push("userDetail")
			},
			getDetail(index) {
				
				this.$router.push({
					name: 'collectDetail',
					params: {
						index: index
					}
				})
			},
			back(){
				this.$router.replace('/');
			}
		},
		watch: {
			collections(newVal) {
				
			}
		},
		mounted() {
		}
	}
</script>

<style>
	.show-Collection{
		width:100%;
	}
	#collections ul {
		margin: 0;
		padding: 0;
	}
	
	.tips {
		margin-top: 1rem;
		text-align: center;
		/*opacity: 0;*/
	}
	
	li {
		list-style: none;
	}
	
	
	.mui-card-footer img {
		width: 25px;
		height: 25px;
		vertical-align: bottom;
	}
	
	.content {
		font-size: 17px;
		font-weight:500;
		color: #000000;
	}
	
	.mui-card {
		margin: 0.3rem 0;
	}
	.show-Collection a:active{
		background: grey;
	}
	.more>i {
		font-weight: bolder;
		font-size: 0.7rem;
	}
	
	.content {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		/*-webkit-line-clamp: 4;*/
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	
	#description {
		margin-top: -20px;
	}
	
	.show-Collection .mui-card>span {
		position: absolute;
		right: 10px;
		top: 10px;
		font-weight: 700;
		color: grey !important;
	}
	.collect-title{
		padding: 10px 40px 10px 15px;
	}
	html{
		overflow: auto;
	}
</style>