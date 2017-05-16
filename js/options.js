// Saves options to chrome.storage

var saveEl = document.getElementById("save")
saveEl.onclick = function () {
    save_options()
  }

function save_options() {

  var options = document.getElementsByTagName("input")
  var favAnimals = []
  for (var option of options) {
    if (option.checked) {
      favAnimals.push(option.id)
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
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(null, function(items) {
    console.log(items)
  });
}