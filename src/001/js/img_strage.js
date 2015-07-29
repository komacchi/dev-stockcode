jQuery.noConflict();

jQuery(document).ready(function ($) {

	$('.edit-check .pro-checkbox').on('change', function(){
		var $this = $(this);
		$this.each(function(){
			if ($this.attr('checked')) {
				$this.closest('.is-edit').addClass('is-edit-checked');
			}else{
				$this.closest('.is-edit').removeClass('is-edit-checked');
			}
		});
	}).change();

	$('.gallery').colorbox({
		rel: 'gallery',
		transition: 'fade',
		width: '95%',
		height: '95%',
		current: '{current}/{total}',
		close:'<p class="box-close-btn"><a href="#">キャンセル（閉じる）</a></p>',
		cbox_open: function() {
			$('#cboxContent').removeClass('gallaryOff');
			$('#cboxOverlay').addClass('gallaryOverlay');
		}
	});

	$('.c1').colorbox({cbox_open: function() {$('#cboxOverlay').removeClass('gallaryOverlay');$('#cboxContent').addClass('gallaryOff').removeClass('gallaryOn');}, inline:true, href:'#box-c1', width: 794, escKey: false});
	$('.c2').colorbox({cbox_open: function() {$('#cboxOverlay').removeClass('gallaryOverlay');$('#cboxContent').addClass('gallaryOff').removeClass('gallaryOn');}, inline:true, href:'#box-c2', width: 420, escKey: false});
	$('.c3').colorbox({cbox_open: function() {$('#cboxOverlay').removeClass('gallaryOverlay');$('#cboxContent').addClass('gallaryOff').removeClass('gallaryOn');}, inline:true, href:'#box-c3', width: 794, escKey: false});
	$('.c4').colorbox({cbox_open: function() {$('#cboxOverlay').removeClass('gallaryOverlay');$('#cboxContent').addClass('gallaryOff').removeClass('gallaryOn');}, inline:true, href:'#box-c4', width: 794, escKey: false});
	$('.c5').colorbox({cbox_open: function() {$('#cboxOverlay').removeClass('gallaryOverlay');$('#cboxContent').addClass('gallaryOff').removeClass('gallaryOn');}, inline:true, href:'#box-c5', width: 420, escKey: false});
	$('.c6').colorbox({cbox_open: function() {$('#cboxOverlay').removeClass('gallaryOverlay');$('#cboxContent').addClass('gallaryOff').removeClass('gallaryOn');}, inline:true, href:'#box-c6', width: 794, escKey: false});
	$('.c7').colorbox({cbox_open: function() {$('#cboxOverlay').removeClass('gallaryOverlay');$('#cboxContent').addClass('gallaryOff').removeClass('gallaryOn');}, inline:true, href:'#box-c7', width: 794, escKey: false});
	$('.c8').colorbox({cbox_open: function() {$('#cboxOverlay').removeClass('gallaryOverlay');$('#cboxContent').addClass('gallaryOff').removeClass('gallaryOn');}, inline:true, href:'#box-c8', width: 794, escKey: false});
	$('.c9').colorbox({cbox_open: function() {$('#cboxOverlay').removeClass('gallaryOverlay');$('#cboxContent').addClass('gallaryOff').removeClass('gallaryOn');}, inline:true, href:'#box-c9', width: 794, escKey: false});
	$('.c10').colorbox({cbox_open: function() {$('#cboxOverlay').removeClass('gallaryOverlay');$('#cboxContent').addClass('gallaryOff').removeClass('gallaryOn');}, inline:true, href:'#box-c10', width: 500, escKey: false});
	$('.c11').colorbox({cbox_open: function() {$('#cboxOverlay').removeClass('gallaryOverlay');$('#cboxContent').addClass('gallaryOff').removeClass('gallaryOn');}, inline:true, href:'#box-c11', width: 500, escKey: false});
	$('.c12').colorbox({cbox_open: function() {$('#cboxOverlay').removeClass('gallaryOverlay');$('#cboxContent').addClass('gallaryOff').removeClass('gallaryOn');}, inline:true, href:'#box-c12', width: 794, escKey: false});

	// loading
	$(document).on('click', '.c-loading', function () {
		jQuery.colorbox({
			href: 'sizechange_loading.html',
			iframe: true,
			overlayClose: false,
			escKey: false,
			width: '500px',
			height: '300px',
			onComplete: function () {
				setTimeout(function () {
					jQuery.colorbox({
						href: 'sizechange_loading_end.html',
						iframe: true,
						overlayClose: false,
						escKey: false,
						width: '500px',
						height: '300px',
						onComplete: function () {
							setTimeout(function () {
								$.colorbox.close();
							}, 2000);
						}
					});
				}, 3000);
			}
		});
		return false;
	});

	/* menu genre select */
	$('.parent a').click(function () {
		var cntName = $(this).attr('href').split('#')[1];
		$('.children dd, .g-children dd').hide();
		$('#' + cntName).show();
		$('.parent a').removeClass('current');
		$(this).addClass('current');
		$.colorbox.resize();
		return false;
	});

	$('.children a').click(function () {
		var cntName = $(this).attr('href').split('#')[1];
		$('.g-children dd').hide();
		$('#' + cntName).show();
		$('.children a').removeClass('current');
		$(this).addClass('current');
		$.colorbox.resize();
		return false;
	});

	$('.g-children a').click(function () {
		$('.g-children a').removeClass('current');
		$(this).addClass('current');
		return false;
	});

	$('.is-tag-list a:not(.pro-btn-s)').click(function () {
		var $list = $(this).closest('li');
		$list.remove();
		$('.pro-step-list .current').removeClass('current');
		return false;
	});

	$('.img-add-tag-list').each(function(){
		var chk = $('.pro-checkbox:checked',$(this));
		var n = chk.length;
		var sbmitBtn = $(this).closest('div').find('input.pro-btn');
		if(n !== 0){
			sbmitBtn.removeAttr('disabled').removeClass('btn-disabled');
		}else{
			sbmitBtn.attr('disabled','disabled').addClass('btn-disabled');
		}
	});

	$('.img-add-tag-list .pro-checkbox').on('click', function(){
		var parent = $(this).closest('.img-add-tag-list');
		var chk =  $('.pro-checkbox:checked',parent);
		var n = chk.length;
		var sbmitBtn = parent.closest('div').find('input.pro-btn');
		if(n !== 0){
			sbmitBtn.removeAttr('disabled').removeClass('btn-disabled');
		}else{
			sbmitBtn.attr('disabled','disabled').addClass('btn-disabled');
		}
	});


/*=================================================
* Drag & Drop 追加
* 2015/07/24 author: komatsu-sa
*/

// event

// drag & drop
var $obj = $(".upload-ddhandler");

$obj.on('dragenter', function (e){
				e.stopPropagation();
				e.preventDefault();
				$(this).addClass('pro-bgc1');
				$(this).removeClass('upload-ddhandler_bgcolor');
});

$obj.on('dragover', function (e){
					e.stopPropagation();
					e.preventDefault();
});

$obj.on('drop', function (e){
					$(this).removeClass('pro-bgc1');
					$(this).addClass('upload-ddhandler_bgcolor');
					e.preventDefault();
});

$(document).on('dragenter', function (e){
				e.stopPropagation();
				e.preventDefault();
});

$(document).on('dragover', function (e){
		e.stopPropagation();
		e.preventDefault();
		$obj.addClass('upload-ddhandler_bgcolor');
		$obj.removeClass('pro-bgc1');
});

$(document).on('drop', function (e){
				e.stopPropagation();
				e.preventDefault();
});

// 注意文表記
noticeLegacyIE();



// function

function noticeLegacyIE(){
	// IE7,8でアクセスした場合、トグルを表示させない。注意文表記
	var ua = window.navigator.userAgent.toLowerCase();
	var ver = window.navigator.appVersion.toLowerCase();

	if(ua.indexOf('msie') !== -1){
		if(ver.indexOf('msie 8.') !== -1){
				$('#js-upload').hide();
				$('.js-upload-disabled').show();
		}else if(ver.indexOf('msie 7.') !== -1){
				$('#js-upload').hide();
				$('.js-upload-disabled').show();
		}
	}
}


$(function(){
		// param
		var param = {};

		Dropzone.autoDiscover = false;
		Dropzone.options.myAwesomeDropzone = {
				url: 'fileup.php',
				paramName : 'file',         // input fileの名前
				parallelUploads: 1,            // 1度に何ファイルずつアップロードするか
				acceptedFiles: 'image/*',   // 画像だけアップロードしたい場合
				maxFiles: 20,                      // 1度にアップロード出来るファイルの数
				maxFilesize: 1,                // 1つのファイルの最大サイズ(1=1M)
				dictFileTooBig: 'ファイルの容量が10MBを超えているため、アップロードできません。ファイルの容量を10MB未満にし、再度アップロードを行ってください。',
				dictInvalidFileType: 'アップロードできるファイルはjpg、gif、pngのみです。',
				dictMaxFilesExceeded: '画像枚数が100枚を超えているため、アップロードできません。画像枚数を100枚以内にし、再度アップロードを行ってください。',
				clickable: false,
				createImageThumbnails: false,
				previewsContainer: '.preview-container',
				previewTemplate:[
				'<div class="dz-preview dz-file-preview">',
					'<div class="dz-error-message"><span data-dz-errormessage></span></div>',
				'</div>'
			].join('')
		};

		var myDropzone = new Dropzone('#my-awesome-dropzone');
		// 送信前に実行する関数
		myDropzone.on('sending', function(file,xhr,formData) {
			if(this.files.length < 10){//アップロード可能ファイル数以下の場合は表示
			$('.uploading').show();
				formData.append('hoge', param);

				console.log('*****done*****');
				console.log('this');
				console.log(this);
				console.log('file');
				console.log(file);
				console.log(file.status);
				console.log('xhr');
				console.log(xhr);
				console.log('formData');
				console.log(formData);


				console.log('this.files.length ： ファイル数');
				console.log(this.files.length);
				console.log('file size ： 各ファイルサイズ');
				console.log(file.size);
				var $totalcount = $('.totalcount').text(this.files.length);
			}
			
		});

		//成功時 アップロード済カウント数を上げる
		myDropzone.on('success', function(file) {
			console.log(file.status);
			var $count = $('.successcount').text();
			if(file.xhr.status === 200){
				$('.progress-box-item').show();
				$count++;
				console.log($count,'successcount');
				$('.successcount').text($count);
			}
		});
		
		myDropzone.on('maxfilesexceeded', function(file){
			 this.removeFile(file);
				myDropzone.removeFile(file);
		});
		
		// Dropzoneでのエラー: ファイル種類,ファイルサイズ,ファイル数
		myDropzone.on('error', function(file,message) {
			this.removeFile(file);
			if(!file.accepted){
				$('.progress-box-item').hide();
		  $('.succes-upload').hide();
				$('.error-message-accepted').show().text(message);
			}
		});

  //totalアップロードを取る
		var pup;
		myDropzone.on('totaluploadprogress', function(totalUploadProgress, totalBytes, totalBytesSent) {
				clearTimeout(pup);
				console.log(totalUploadProgress, totalBytes, totalBytesSent);
				var total = Math.round(100 * totalBytesSent / totalBytes);
				console.log(total,'=total');
				
				// $('.progress-box-item').show();
				var $s = $('.js-progress-value');
				$count = parseInt($s.css('width').replace(/px/,''));
				console.log($count,'$count');
					pup = setTimeout(countUp,500);
				
				function countUp(){
						for (var i = 0; i <= 100; i+=10) { //var total 100 まで
							$count = i;
							$s.css('width',$count + '%');
						}
							console.log($count,'in roop $count');
						if(total === 100){
							$('.succes-upload').show();
							$('.uploading').hide();
							clearTimeout(pup);
						} else{
							countUp();
						}
				}
		});


	 // クエリ終了時
		myDropzone.on("queuecomplete", function() {
			// $('.succes-upload').show();
			$('.upload-ddhandler').removeClass('pro-bgc1');
			console.log('query stop');
		});

	});

});
