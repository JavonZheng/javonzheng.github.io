window.$=HTMLElement.prototype.$=function(selector){
	var elems=(this==window?document:this).querySelectorAll(selector);
	if(!elems){
		return null;
	}else if(elems.length==1){
		return elems[0];
	}else{
		return elems;
	}
}
window.onload=function(){
	/*顶部弹出菜单*/
	var lis=$(".app_jd,service");
	for(var i=0,len=lis.length;i<len;i++){//?ul?[id$='_items']
		lis[i].addEventListener("mouseover",function(){

			//找到当前li下的直接子元素a，为其class属性拼接"hover"
			this.$("."+this.className+">a").style.className="hover";

			this.$("[id$='_items']").style.display="block";
		},false);
		lis[i].addEventListener("mouseout",function(){

			//找到当前li下的直接子元素a，删除其className结尾的空格"hover"
			this.$("."+this.className+">a").style.className="";

			this.$("[id$='_items']").style.display="none";
		},false);
		
	}

	/*全部商品分类*/
	$("#category").onmouseover=$("#category").onmouseout=function(){
		$("#cate_box").style.display=="block"?"":"block";
	};
	var lis=$("#cate_box>li");
	for(var i=0;i<lis.length;i++){
		lis[i].addEventListener("monseover",function(){
			this.$("h3").style.className="hover";
			this.$(".sub_cate_box").style.display="block";
		},false);
		lis[i].addEventListener("monseout",function(){
			this.$("."+this.className+">h3").style.className="";
			this.$(".sub_cate_box").style.display="";
		},false)
	}
	
	/*商品详情中的标签页*/
	var ul=$("#product_detail>.main_tabs");
	ul.onclick=function(){
		var e=window.event||arguments[0];
		var target=e.srcElement||e.target;
		if(target.nodeName=="A"){
			$("#product_detail>.main_tabs>.current").className="";
			target.parentNode.className="current";
			var contents=$("product_detail>.main_tabs~[id^='product_']");
			if(target.dataset.i!=-1){
				for(var i=0;i<contents.length;i++){
					contents[i].style.display=i!=target.dataset.i?"none":"block";
				}
			}else{
				
			}
		}
	}
	picture.init();
	console.log(picture);

}
//封装放大图功能的对象
var picture={
	LIWIDTH:62,//每个小图片li的固定宽度
	LEFT:20,
	ul:null,//包含小图片li的ul，是移动的主题
	aback:null,//右移按钮-->右移一个li
	afor:null,//左移按钮-->左移一个li
	moved:0,//记录ul左移的次数，每左移一次加1，右移1次减1
	liCount:0,//记录li的总数

	maskH:0,
	maskW:0,
	maskTop:0,//maskTop可用的最大top值
	maskLeft:0,//maskTop可用的最大Left值

	//如果liCount-5==moved,就禁用afor
	init:function(){
		var self=this;
		self.ul=$("#icon_list");
		self.liCount=self.ul.$("li").length;
		self.aback=$("#preview>h1>a")[0];
		self.afor=$("#preview>h1>a")[1];

		self.aback.onclick=self.afor.onclick=function(){
			/*this=a;
			self=picture;*/
			if(this.className.indexOf("_disabled")==-1){
				self.moved+=this.className=="forward"?1:-1;
				self.ul.style.left=-self.moved*self.LIWIDTH+self.LEFT+"px";
				if(self.moved==0){
					self.aback.className+="_disabled";
				}else if(self.liCount-self.moved==5){
					self.afor.className+="_disabled";
				}else{
					self.aback.className="backward";
					self.afor.className="forward";
				}
			}
		}

		self.ul.addEventListener("mouseover",function(){
			var e=window.event||arguments[0];
			var target=e.srcElement||e.target;
			if(target.nodeName=="IMG"){
				var src=target.src;
				var i=src.lastIndexOf(".");/*??*/
				$("#mimg").src=src.slice(0,i)+"-m"+src.slice(i);/*??*/
			}
		},false)

		$("#superMask").onmouseover=$("#superMask").onmouseout=function(){
			if($("mask").style.display=="block"){
				$("mask").style.display="none";
				$("largeDiv").style.display="none";
			}else{
				$("mask").style.display="block";
				$("largeDiv").style.display="block";
				var src=$("mImg").src;
				var i=src.lastIndexOf(".");
				$("#largeDiv").style.backgroundImage="url("+src.slice(0,i-2)+"-l"+src.slice(i)+")";
			}
		}

		$("#superMask").addEventListener("onmousemove",function(){
			var style=getComputedStyle($("#mask"));/*????????????????????????????????????????????????????????????*/
			self.maskH=parseFloat(style.height);
			self.maskW=parseFloat(style.width);

		},false)
	}
}