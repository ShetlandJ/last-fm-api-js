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
  var topFour = topFive.splice(1, 5);


  console.log(topFive[0].image[0]['#text'])

  var artist1 = document.getElementById('artist1');
  var artist2 = document.getElementById('artist2');
  var artist3 = document.getElementById('artist3');
  var artist4 = document.getElementById('artist4');
  var artist5 = document.getElementById('artist5');

  artist1.style.backgroundImage = "url(" +topFive[0].image[3]['#text'] + ")";
  artist2.style.backgroundImage = "url(" +topFour[0].image[2]['#text'] + ")";
  artist3.style.backgroundImage = "url(" +topFour[1].image[2]['#text'] + ")";
  artist4.style.backgroundImage = "url(" +topFour[2].image[2]['#text'] + ")";
  artist5.style.backgroundImage = "url(" +topFour[3].image[2]['#text'] + ")";


  // fopFour.forEach(function(artist, index){


    // var artistPhoto = document.createElement('img');
    // var artistText = document.createElement('div');
    // artistText.id = "artist-text";
    // var artistName = document.createElement('p');
    // var artistPlays = document.createElement('p');
    //
    // for (var picture of artist.image) {
    //   artistPhoto.src = picture['#text'];
    // }
    // artistName.innerText = artist.name;
    // artistPlays.innerText = artist.playcount
    //
    // artistText.appendChild(artistName);
    // artistText.appendChild(artistPlays);
    // artistBlock.appendChild(artistPhoto);
    // artistBlock.appendChild(artistText);
  // })
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
