const vm=new Vue({
	el:"#app",
	data:{
		getdom:"",//选中的dom元素
		switchBorder:false,
		yuan1:"",//上面的圆
		yuan2:"",//右边的圆
		yuan3:"",//下面的圆
		yuan4:"",//左边的圆
		yuan5:"",//右下角的圆
		div:"",//边框的div
	},
	methods:{
		test:function(){
			
		},
		
		//右下角放大
		fangDa:function(get){
			this.getdom.style.width = parseInt(get.left) - parseInt(this.div.style.left) + 6 + 'px'
			this.getdom.style.height =  parseInt(get.top) - parseInt(this.div.style.top) + 6 + 'px'
			this.weiZhi(this.getdom)
		},
		//右边拉长
		right:function(get){
			this.getdom.style.width = parseInt(this.getdom.style.width) + parseInt(get.left) - parseInt(this.div.style.width) + 6 + 'px'
			this.weiZhi(this.getdom)
		},
		//上边拉长
		top:function(get){
			this.getdom.style.top = parseInt(get.top) + 'px'
			this.getdom.style.height = parseInt(this.div.style.height) - parseInt(get.top) + parseInt(this.div.style.top)+ 'px'
			this.weiZhi(this.getdom)
		},
		//左边拉长
		left:function(get){
			this.getdom.style.left = parseInt(get.left) + 'px'
			this.getdom.style.width = parseInt(this.div.style.width) - parseInt(get.left) + parseInt(this.div.style.left)+ 'px'
			this.weiZhi(this.getdom)
		},
		//下边拉长
		bottom:function(get){
			this.getdom.style.height = parseInt(get.top) - parseInt(this.div.style.top) + 6 + 'px'
			this.weiZhi(this.getdom)
		},
		//定位边框的圆
		weiZhi:function(get){
			var div = document.querySelector(".div3")
			var yuan1 = document.querySelector(".yuan1")
			var yuan2 = document.querySelector(".yuan2")
			var yuan3 = document.querySelector(".yuan3")
			var yuan4 = document.querySelector(".yuan4")
			var yuan5 = document.querySelector(".yuan5")
			//先将选中的图片属性赋予给边框
			div.style.width = get.style.width
			div.style.height = get.style.height
			div.style.top = get.style.top
			div.style.left = get.style.left
			//将边框的圆给定位了
			yuan1.style.top = parseInt(div.style.top) - 6 + 'px'
			yuan1.style.left = parseInt(div.style.left) + parseInt(div.style.width) / 2 - 6 + 'px'
			
			yuan2.style.top = parseInt(div.style.top) + parseInt(div.style.height) / 2 - 6 + 'px'
			yuan2.style.left = parseInt(div.style.left) + parseInt(div.style.width) - 6 + 'px'
			
			yuan3.style.top = parseInt(div.style.top) + parseInt(div.style.height) - 6 + 'px'
			yuan3.style.left = parseInt(div.style.left) + parseInt(div.style.width) / 2 - 6 + 'px'
			
			yuan4.style.top = parseInt(div.style.top) +parseInt(div.style.height) / 2 - 6 + 'px'
			yuan4.style.left = parseInt(div.style.left) - 6 + 'px'
			
			yuan5.style.top = parseInt(div.style.top) + parseInt(div.style.height) - 6 + 'px'
			yuan5.style.left = parseInt(div.style.left) + parseInt(div.style.width) - 6 + 'px'
			
			this.yuan1=yuan1
			this.yuan2=yuan2
			this.yuan3=yuan3
			this.yuan4=yuan4
			this.yuan5=yuan5
			this.div=div
		}
	},
	directives: {
		drag(el, bindings) {
		  el.onmousedown = function(e) {
			var that=this
			this.switchBorder=true
			var border = document.querySelector(".div3")
			var disx = e.pageX - el.offsetLeft
			var disy = e.pageY - el.offsetTop
			this.getdom = el
			vm.weiZhi(this.getdom);
			document.onmousemove = function (e) {
				vm.weiZhi(that.getdom)
				var left = parseInt(el.style.left),
				top = parseInt(el.style.top),
				width = parseInt(window.getComputedStyle(el).width),
				height = parseInt(window.getComputedStyle(el).height);
				
				if(left >= 0 && left <= 401 - width){
						el.style.left = e.pageX - disx + 'px'
						border.style.left = el.style.left
						
				}
				
				if(parseInt(el.style.left) >= 402 - width){
							el.style.left = 401 - width + 'px'
							border.style.left = el.style.left
						}
						if(parseInt(el.style.left) < 0 ){
							el.style.left = 0 + 'px'
							border.style.left = el.style.left
						}
				
				if(top >= 0 && top <= 601 - height){
					el.style.top = e.pageY - disy + 'px'
					border.style.top = el.style.top
					
				}
				
				if(parseInt(el.style.top) >= 602 - height){
						el.style.top = 601 - height + 'px'
						border.style.top = el.style.top
					}
					if(parseInt(el.style.top) < 0){
						el.style.top = 0 + 'px'
						border.style.top = el.style.top
					}
			}
			document.onmouseup = function() {
			  document.onmousemove = document.onmouseup = null
			  vm.switchBorder = true
			  vm.getdom = el
			}
		  }
		},
		
		drag2(el, bindings) {
		  el.onmousedown = function(e) {
			var disx = e.pageX - el.offsetLeft
			var disy = e.pageY - el.offsetTop
			document.onmousemove = function (e) {
			  el.style.left = e.pageX - disx + 'px'
			  el.style.top = e.pageY - disy + 'px'
			  if(el.className.slice(5) == "yuan1"){
				  vm.top(el.style)
			  }else if(el.className.slice(5) == "yuan2"){
				  vm.right(el.style)
			  }else if(el.className.slice(5) == "yuan3"){
				  vm.bottom(el.style)
			  }else if(el.className.slice(5) == "yuan4"){
				  vm.left(el.style)
			  }else if(el.className.slice(5) == "yuan5"){
				  vm.fangDa(el.style)
			  }
			}
			document.onmouseup = function() {
			  document.onmousemove = document.onmouseup = null
			}
		  }
		}
	 },
})