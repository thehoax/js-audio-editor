$(document).ready(function() {
	uploadStatus('Please select an audio file.');
	
	var timer;
	timer = setInterval(function() {
		if($('#audioUpload').val() !== ''){
			clearInterval(timer);
			$('#uploadForm').submit();
			}
		}, 500);
		
	$('#uploadForm').submit(function() {
		uploadStatus('Uploading...');
		$(this).ajaxSubmit({
			error: function(xhr) {
				uploadStatus('Error: ' + xhr.status);
				},
			success: function(response) {
				if(response.error){
					uploadStatus('Oh no! ' + response.error);
					return;
				}
				var fileUrl = response.path;
				uploadStatus('File successfully uploaded to:' + fileUrl);
				}
			});
		$('#formView').fadeOut("slow");
		setTimeout(function(){$('#audioControls').fadeIn("slow"); initPlayer()},500);
		return false;
		
		});
		
		
	function uploadStatus(message) {
		$('#uploadStatus').text(message);
		}
	

});