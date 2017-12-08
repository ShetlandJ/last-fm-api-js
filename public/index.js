var app = function(){

  var lastFM = new LastFm();
  var topArtistsUrl = lastFM.setCategoryType('gettopartists');
  var topTracksUrl = lastFM.setCategoryType('gettoptracks');
  var weeklyTracksUrl = lastFM.setCategoryType('getweeklytrackchart');

  var userInfo = lastFM.setCategoryType('getinfo');


  // makeRequest(topArtistsUrl, artistRequestComplete);
  // makeRequest(topTracksUrl, trackRequestComplete);
  // makeRequest(weeklyTracksUrl, weeklyTracksComplete);
  makeRequest(userInfo, userInformationComplete)

}

// var makeRequest = function(url, callback){
//   var request = new XMLHttpRequest();
//   request.open("GET", url);
//   request.addEventListener("load", callback);
//   request.send();
// }

var trackRequestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var myData = JSON.parse(jsonString);
  populateTrackList(myData.toptracks.track);
}

var artistRequestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var myData = JSON.parse(jsonString);
  populateArtistList(myData.topartists.artist);
}

var populateArtistList = function(myLastFmData){
  var main = document.getElementById('main-content');
  var ul = document.getElementById('artist-list');

  myLastFmData.forEach(function(artist){
    var li = document.createElement('li');
    li.innerText = artist.name + " (" + artist.playcount + ")";
    ul.appendChild(li);
  })
}

var populateTrackList = function(myLastFmData){
  var main = document.getElementById('track-content');
  var ul = document.getElementById('track-list');

  myLastFmData.forEach(function(track){
    var li = document.createElement('li');
    li.innerText = track.name + " (" + track.playcount + ")";
    ul.appendChild(li);
  })
}

var userInformationComplete = function(myLastFmData){
  var tracks = document.getElementById('total-tracks-played');
  var ul = document.getElementById('track-list');

  myLastFmData.forEach(function(track){
    var li = document.createElement('li');
    li.innerText = track.name + " (" + track.playcount + ")";
    ul.appendChild(li);
  })
}

window.addEventListener('load', app)
