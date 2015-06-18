(function($) {
    // IE7,8でアクセスした場合、トグルを表示させない。注意文表記
  	var ua = window.navigator.userAgent.toLowerCase(); //大文字を小文字に
  	var ver = window.navigator.appVersion.toLowerCase(); //大文字を小文字に

  	if(ua.indexOf('msie') != -1){
  		if(ver.indexOf('msie 8.') != -1){
        console.log('ie8');
  		}else if(ver.indexOf('msie 7.') != -1){
        console.log('ie7');
  		} else {
        console.log('not ie7/8');
      }
  	}

})(jQuery)
