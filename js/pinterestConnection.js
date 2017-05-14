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

$(document).ready( function () {
	var keys = Object.keys(boardsObj) //gets the keys for boardObj -> array
	var randomBoard = Math.floor(Math.random() * keys.length) //finds the index for a random key
	get_image(boardsObj[keys[randomBoard]]) // example: boardsObj[keys[2]] keys[2] = other
})



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
			var pic = $("body").append("<img src=" + imgUrl + " id='image'>")
			setTimeout(function(){
				pic.fadeOut(5000);
			}, 5000);			
		}
	})
}