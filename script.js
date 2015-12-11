canvas = document.getElementById('canvas_element');
parts=50;
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
	for(part_counter=0;part_counter<=parts;part_counter++){
		for(x=(width/parts)*part_counter;x<=(width/parts)*(part_counter+1);x++){
			for(y=0;y<height;y++){
				var i = (y * 4) * img.width + x * 4;
				var avg = (img.data[i]*0.2 + img.data[i + 1]*0.7 + img.data[i + 2]*0.1);
				counter=counter+1;
				sum=sum+avg;
			}
		}
		threshold=sum/counter;
		for(x=(width/parts)*part_counter;x<(width/parts)*(part_counter+1);x++){
			for(y=0*part_counter;y<height;y++){
				var i = (y * 4) * img.width + x * 4;
				var avg = (img.data[i]*0.2 + img.data[i + 1]*0.7 + img.data[i + 2]*0.1);
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
	img_temp=context.getImageData(0, 0, img.width, img.height);
	context_preview=$("#preview")[0].getContext("2d");
	for(x=1;x<100;x++){
		for(y=1;y<100;y++){
			var curr = (y * 4) * img_temp.width + x * 4;
			var curr_left = (y * 4) * img_temp.width + (x-1) * 4;
			var curr_top = ((y-1) * 4) * img_temp.width + x * 4;
			var curr_right = (y * 4) * img_temp.width + (x+1) * 4;
			var curr_bot = ((y+1) * 4) * img_temp.width + x * 4;

			var red = img_temp.data[i];
		            var green = img_temp.data[i + 1];
            		var blue = img_temp.data[i + 2];
			img_temp.data[i]=red;
			img_temp.data[i+1]=green;
			img_temp.data[i+2]=blue;

		}
	}
	for(var x =40; x<100;x = x+10){
		var single_col = [];
		for(y=0;y<100;y++){
			var i = (y*4)*img_temp.width + x*4;
			if(img_temp.data[i] == 255){
			single_col.push(1);
			}else{
				single_col.push(0);			}
		}
		// console.log(single_col);
		// var change-count = find_pattern(single_col);
		break;
	}
	context_preview.putImageData(img_temp,0,0);

}
function find_pattern (array) {
	var count = 0;
	for(var x = 0;x<array.length; x++){
		// console.log(array[x]);
		if(array[x]!=array[x+1]){
			count = count +1;
		}

	}
	console.log(count);
}