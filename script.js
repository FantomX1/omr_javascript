jQuery(document).ready(function($) {
	canvas = document.getElementById('canvas_element');
	isStreaming=false;
	context=canvas.getContext('2d');
	width = 600,
	height = 420
	navigator.getUserMedia = (	navigator.getUserMedia || 
								navigator.webkitGetUserMedia || 
								navigator.mozGetUserMedia || 
								navigator.msGetUserMedia);
		 if (navigator.getUserMedia) {
				navigator.getUserMedia(
					 {
							video:true,
							audio:false
					 },        
					 function(stream) {
							var video = document.getElementById('video_element');
							var url = window.URL || window.webkitURL;
							video.src = url ? url.createObjectURL(stream) : stream;
							video.play();


					 },
					 function(error) { /* do something */ }
				);
		 }
		 else {
				alert('Sorry, the browser you are using doesn\'t support getUserMedia');
			}
			video=document.getElementById('video_element');
			video.addEventListener('canplay', function(e) {
				canvas=document.getElementById("canvas_element");
			if (!isStreaming) {
					// videoWidth isn't always set correctly in all browsers
					canvas.setAttribute('width', width);
					canvas.setAttribute('height', height);
					// Reverse the canvas image
					isStreaming = true;
			}
	}, false);
	video.addEventListener('play', function() {
	 setInterval(function() {
			if (video.paused || video.ended) return;
			context.fillRect(0, 0, width, height);
			context.drawImage(video, 0, 0, width, height);
			img=context.getImageData(0, 0, canvas.width, canvas.height);
			slider=document.getElementById("slider_element");
			threshold=slider.value;
			document.getElementById('threshold').innerHTML=threshold;
			for(x=0;x<img.height;x++){
				for(y=0;y<img.width;y++){
					var i = (y * 4) * img.width + x * 4;
					var avg = (img.data[i] + img.data[i + 1] + img.data[i + 2]) / 3;
					if(avg>threshold){
						// avg=255;
					}else{
						// avg=0;
					}
					// img.data[i] = avg; 
					// img.data[i + 1] =avg; 
					// img.data[i + 2] =avg;
				}
			}
			context.putImageData(img, 0, 0, 0, 0, img.width, img.height);
	 }, 33);
}, false);
});