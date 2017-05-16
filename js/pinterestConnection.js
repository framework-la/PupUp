pinterestInfo = {
	boardFirst: '/v1/boards/',
	pins: '/pins/',
	token: 'AQg2uO272oUKSN329dCbfLk94kxyFL5LrPNuTyhEAg8UH6A-jAAAAAA',
	fields: 'id,url,image',
	pinterestUrl: 'https://api.pinterest.com',
}

boardsObj = {
	dog:'frameworkl/cute-dog-board',
	kitten:'frameworkl/cute-kitten-board',
	other:'frameworkl/other',
}

var keys = Object.keys(boardsObj) //gets the keys for boardObj -> array
var randomBoard = Math.floor(Math.random() * keys.length) //finds the index for a random key
get_image(boardsObj[keys[randomBoard]]) // example: boardsObj[keys[2]] keys[2] = other


function get_image(board) {

	$.ajax({
		type:"GET",
		url: pinterestInfo.pinterestUrl + pinterestInfo.boardFirst + board + pinterestInfo.pins,
		data: {access_token: pinterestInfo.token,
				fields: pinterestInfo.fields},
		success: function (data) {
			var random = Math.floor(Math.random() * data.data.length)
			var imgUrl = data.data[random].image.original.url
			//alert(imgUrl)
			var pic = $("<img src=" + imgUrl + " id='image'>");
			$("#loader").fadeOut(500, function(){
				$("#loader").show();
				$("#loader").replaceWith(pic);
				setTimeout(function(){
				pic.fadeOut(5000);
			}, 5000);
			});			
		}
	})
}

function getLocation(image_obj,div) {
	var wHeight = window.innerHeight
	var wWidth = window.innerWidth

	if (image_obj.width > wWidth) {
		div.style.maxWidth = (wWidth/2) + 'px'
		image_obj.width = wWidth/2
	}
	if (image_obj.height < wHeight) {
		topOffset = (wHeight - image_obj.height)/2
		div.style.top = topOffset + 'px'
	}

	leftOffset = (wWidth - image_obj.width)/2

	div.style.left = leftOffset + 'px'
}