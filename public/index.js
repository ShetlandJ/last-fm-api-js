var app = function(){

  var lastFM = new LastFm();
  var topArtistsUrl = lastFM.setCategoryType('gettopartists');
  var topTracksUrl = lastFM.setCategoryType('gettoptracks');
  var weeklyTracksUrl = lastFM.setCategoryType('getweeklytrackchart');

  var userInfo = lastFM.setCategoryType('getinfo');


  makeRequest(topArtistsUrl, artistRequestComplete);
  // makeRequest(topTracksUrl, trackRequestComplete);
  // makeRequest(weeklyTracksUrl, weeklyTracksComplete);
  makeRequest(userInfo, userRequestComplete)

}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

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

var userRequestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var myData = JSON.parse(jsonString);
  populateUserInformation(myData.user);
}

var populateArtistList = function(artistList){
  var main = document.getElementById('main-content');
  // var ul = document.getElementById('artist-list');
  var artistBlock = document.getElementById('artist-block');
  var headerDetails = document.getElementById('header-details');

  var topFive = artistList.splice(0, 5);

  topFive.forEach(function(artist, index){

    var artistPhoto = document.createElement('img');
    var artistName = document.createElement('p');
    var artistPlays = document.createElement('p');

    for (var picture of artist.image) {
      artistPhoto.src = picture['#text'];
    }
    artistName.innerText = artist.name;
    artistPlays.innerText = artist.playcount

    artistBlock.appendChild(artistPhoto);
    artistBlock.appendChild(artistName);
    artistBlock.appendChild(artistPlays);
    // var li = document.createElement('li');
    // li.innerText = artist.name + " (" + artist.playcount + ")";
    // ul.appendChild(li);

  })
}

var populateTrackList = function(myLastFmData){
  var main = document.getElementById('track-content');
  var ul = document.getElementById('track-list');

  myLastFmData.forEach(function(track){
    var li = document.createElement('li');
    li.innerText = track.name + " (" + track.playcount + ")";
    ul.appendChild(li);
    counter++;
  })
}

var populateUserInformation = function(user){

  var username = document.getElementById('username');
  var realName = document.getElementById('real-name');
  var userTracks = document.getElementById('total-tracks-played');

  username.innerText = user.name;
  realName.innerText = user.realname;
  userTracks.innerText = user.playcount;
}

window.addEventListener('load', app)
