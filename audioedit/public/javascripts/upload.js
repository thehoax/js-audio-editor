$(document).ready(function() {
	uploadStatus('Please select a file, any file.');
	
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
					uploadStatus('Oh no! Something went wrong.');
					return;
				}
				var fileUrl = response.path;
				uploadStatus('File successfully uploaded to: ' + fileUrl);
				}
			});
		return false;
		
		});
		
	function uploadStatus(message) {
			$('#uploadStatus').text(message);
		}
})