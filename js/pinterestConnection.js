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

// var keys = Object.keys(boardsObj) //gets the keys for boardObj -> array
// var randomBoard = Math.floor(Math.random() * keys.length) //finds the index for a random key
// get_image(boardsObj[keys[randomBoard]]) // example: boardsObj[keys[2]] keys[2] = other

restore_options()

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
			var pic = $("<img src=" + imgUrl + " id='image' style='position: relative; top:25px'>");
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


document.getElementById("save").onclick = function () {
    saveOptions()
}

document.getElementById("setting").onclick = function () { 
	openOptions()
}

function openOptions() { 
	$("#options").show();
	$("#loader, #image").hide();
}



function saveOptions() {

  var options = document.getElementsByTagName("input")
  var favAnimals = []
  for (var option of options) {
    if (option.checked) {
			
      favAnimals.push(option.id);
			
    }
  }
  chrome.storage.sync.set({
    favAnimals: favAnimals
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
		restore_options();
	});

	// function showCheckedBoxes() {
	// 	var options = $("#options");
	// 	chrome.storage.sync.get(null, function(items){
	// 		var keys = items.favAnimals;
	// 		if(keys.includes("dog")){
	// 			this.checked.show();
	// 		}
	// 	})

	// }




// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(null, function(items) {
  	$("#options").hide()
  	$("#loader").show()

    var keys = items.favAnimals //gets the keys for boardObj -> array
	var randomBoard = Math.floor(Math.random() * keys.length) //finds the index for a random key
	get_image(boardsObj[keys[randomBoard]]) // example: boardsObj[keys[2]] keys[2] = other
  });
}