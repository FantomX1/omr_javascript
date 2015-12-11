canvas = document.getElementById('canvas_element');
parts=30;
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
 setInterval(inter, 33);
}, false);
function inter(){
	if (video.paused || video.ended) return;
	context.fillRect(0, 0, width, height);
	context.drawImage(video, 0, 0, width, height);
	img=context.getImageData(0, 0, canvas.width, canvas.height);
	slider=document.getElementById("slider_element");
	var counter=0;
	var sum=0;
	for(part_counter=0;part_counter<parts;part_counter++){
		for(x=(width/parts)*part_counter;x<(width/parts)*(part_counter+1);x++){
			for(y=(height/parts)*part_counter;y<height;y++){
				var i = (y * 4) * img.width + x * 4;
				var avg = (img.data[i] + img.data[i + 1] + img.data[i + 2]) / 3;
				counter=counter+1;
				sum=sum+avg;
			}
		}
		threshold=sum/counter;
		for(x=(width/parts)*part_counter;x<(width/parts)*(part_counter+1);x++){
			for(y=(height/parts)*part_counter;y<height;y++){
				var i = (y * 4) * img.width + x * 4;
				var avg = (img.data[i] + img.data[i + 1] + img.data[i + 2]) / 3;
				counter=counter+1;
				sum=sum+avg;
				if(avg>threshold){
					avg=255;
				}else{
					avg=0;
				}
				img.data[i] = avg; 
				img.data[i + 1] =avg; 
				img.data[i + 2] =avg;
			}
		}
	}

	context.putImageData(img, 0, 0, 0, 0, img.width, img.height);
}
function threshold () {
	console.log("came");
}