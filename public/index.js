var app = function(){

  var url = "http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=jastewart&api_key=fe2d0262edc8b4506e805c71e47d35b6&format=json"
  makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var myTopArtists = JSON.parse(jsonString);
  // console.log(myTopArtists.topartists)
  populateArtistList(myTopArtists.topartists.artist);
}

var populateArtistList = function(myTopArtists){
  var main = document.getElementById('main-content');
  var ul = document.getElementById('artist-list');

  myTopArtists.forEach(function(artist){
    var li = document.createElement('li');
    li.innerText = artist.name
    ul.appendChild(li);
  })
}

window.addEventListener('load', app)
