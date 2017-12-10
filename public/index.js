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

}
var populateArtistList = function(artistList){

  var main = document.getElementById('main-content');
  var artistBlock = document.getElementById('artist-block');
  var headerDetails = document.getElementById('header-details');

  var topFive = artistList.splice(0, 5);
  var topFour = topFive.splice(1, 5);

  var artist1 = document.getElementById('artist1');
  var artist1name = document.getElementById('top-artist-square-name');
  var artist1playcount = document.getElementById('top-artist-square-playcount');

  var artist2 = document.getElementById('artist2');
  var artist3 = document.getElementById('artist3');
  var artist4 = document.getElementById('artist4');
  var artist5 = document.getElementById('artist5');

  var smallArtistsBoxName = document.getElementsByClassName('small-artist-square-name');
  var smallArtistsBoxPlaycount = document.getElementsByClassName('small-artist-square-playcount');

  artist1name.innerText = topFive[0].name;
  artist1playcount.innerText = topFive[0].playcount + " plays";

  artist2name.innerText = topFour[0].name;
  artist2playcount.innerText = topFour[0].playcount + " plays";

  artist3name.innerText = topFour[1].name;
  artist3playcount.innerText = topFour[1].playcount + " plays";

  artist4name.innerText = topFour[2].name;
  artist4playcount.innerText = topFour[2].playcount + " plays";

  artist5name.innerText = topFour[3].name;
  artist5playcount.innerText = topFour[3].playcount + " plays";

  var artistOneImage = document.getElementById('top-artist-image').src = topFive[0].image[3]['#text'];
  var artistTwoImage = document.getElementById('artist-two-image').src = topFour[0].image[2]['#text'];
  var artistThreeImage = document.getElementById('artist-three-image').src = topFour[1].image[2]['#text'];
  var artistFourImage = document.getElementById('artist-four-image').src = topFour[2].image[2]['#text'];
  var artistFiveImage = document.getElementById('artist-five-image').src = topFour[3].image[2]['#text'];
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

  var profilePicture = document.getElementById('profile-picture-image');
  profilePicture.src = user.image[2]['#text']

  var username = document.getElementById('username');
  var realName = document.getElementById('real-name');
  var userTracks = document.getElementById('total-tracks-played');
  var memberSince = document.getElementById('member-since');

  username.innerText = user.name;
  userTracks.innerText = "Scrobbles: " + this.formatNumber(user.playcount);

  var date = new Date(user.registered['#text'] * 1000);

  var month = this.getMonth(date.getMonth()+1)

  realName.innerText = user.realname + " 🎶 scrobbling since: " + month + ", " + date.getFullYear();;
}

var formatNumber = function(num) {
  var array = num.toString().split('');
  var index = -3;
  while (array.length + index > 0) {
    array.splice(index, 0, ',');
    index -= 4;
  }
  return array.join('');
};

var getMonth = function(monthNumber){
  switch(monthNumber) {
    case 1:
    return "January";
    break;
    case 2:
    return "February"
    break;
    case 3:
    return "March";
    break;
    case 4:
    return "April";
    break;
    case 5:
    return "May";
    break;
    case 6:
    return "June";
    break;
    case 7:
    return "July";
    break;
    case 8:
    return "August"
    break;
    case 9:
    return "September";
    break;
    case 10:
    return "October";
    break;
    case 11:
    return "November";
    break;
    case 12:
    return "December";
    break;
  }
}

window.addEventListener('load', app)
