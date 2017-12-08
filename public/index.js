var app = function(){

  var lastFM = new LastFm();
  var topArtistsUrl = lastFM.setCategoryType('gettopartists');

  makeTopArtistRequest(topArtistsUrl, requestComplete);
}

var makeTopArtistRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var myTopArtists = JSON.parse(jsonString);
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
