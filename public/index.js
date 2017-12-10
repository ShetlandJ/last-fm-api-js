var app = function(){

  var lastFM = new LastFm();
  var topArtistsUrl = lastFM.setCategoryType('gettopartists');
  var topTracksUrl = lastFM.setCategoryType('gettoptracks&limit=25');
  var recentlyPlayedTracks = lastFM.setCategoryType('getRecentTracks&limit=10');
  var topAlbumsUrl = lastFM.setCategoryType('gettopalbums');
  var userInfo = lastFM.setCategoryType('getinfo');

  makeRequest(topArtistsUrl, artistRequestComplete);
  makeRequest(topTracksUrl, trackRequestComplete);
  makeRequest(userInfo, userRequestComplete);
  makeRequest(recentlyPlayedTracks, recentTrackRequestComplete);
  makeRequest(topAlbumsUrl, albumsRequestComplete);

}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}


var albumsRequestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var myData = JSON.parse(jsonString);
  // changeTrackByDate(myData.toptracks.track);
  populateAlbumList(myData.topalbums.album);
}

var trackRequestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var myData = JSON.parse(jsonString);
  changeTrackByDate(myData.toptracks.track);
  populateTrackList(myData.toptracks.track);
}

var recentTrackRequestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var myData = JSON.parse(jsonString);
  populateRecentTrackList(myData.recenttracks.track);
}

var artistRequestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var myData = JSON.parse(jsonString);
  changeArtistByDate(myData.topartists.artist);
  populateArtistList(myData.topartists.artist);
}

var userRequestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var myData = JSON.parse(jsonString);
  populateUserInformation(myData.user);
}

var changeArtistByDate = function(artistList) {
  var lastFM = new LastFm();

  var topArtistsUrl = lastFM.setCategoryType('gettopartists&limit=25');
  var topArtistsUrlWeek = lastFM.setCategoryType('gettopartists&period=7day&limit=25');
  var topArtistsUrl1Month = lastFM.setCategoryType('gettopartists&period=1month&limit=25');
  var topArtistsUrl12Month = lastFM.setCategoryType('gettopartists&period=12month&limit=25');

  var select = document.getElementById('duration-selector');
  select.addEventListener('change', function(){
    switch(select.selectedIndex){
      case 0:
      makeRequest(topArtistsUrl, artistRequestComplete);
      break;
      case 1:
      makeRequest(topArtistsUrlWeek, artistRequestComplete);
      break;
      case 2:
      makeRequest(topArtistsUrl1Month, artistRequestComplete);
      break;
      case 3:
      makeRequest(topArtistsUrl12Month, artistRequestComplete);
      break;
    }
  });
}

var changeTrackByDate = function(trackList) {
  var lastFM = new LastFm();

  var topTracksUrl = lastFM.setCategoryType('gettoptracks');
  var topTracksUrlWeek = lastFM.setCategoryType('gettoptracks&period=7day&limit=25');
  var topTracksUrl1Month = lastFM.setCategoryType('gettoptracks&period=1month&limit=25');
  var topTracksUrl12Month = lastFM.setCategoryType('gettoptracks&period=12month&limit=25');

  var select = document.getElementById('ttduration-selector');
  var ul = document.getElementById('top-tracks-list');
  removeChildNodes(ul);
  select.addEventListener('change', function(){
    switch(select.selectedIndex){
      case 0:
      makeRequest(topTracksUrl, trackRequestComplete);
      break;
      case 1:
      makeRequest(topTracksUrlWeek, trackRequestComplete);
      break;
      case 2:
      makeRequest(topTracksUrl1Month, trackRequestComplete);
      break;
      case 3:
      makeRequest(topTracksUrl12Month, trackRequestComplete);
      break;
    }
  });
}

var populateArtistList = function(artistList){

  var artistBlock = document.getElementById('artist-block');

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


var populateAlbumList = function(albumList){
console.log(albumList);
  var albumBlock = document.getElementById('album-block');

  var topFive = albumList.splice(0, 5);
  var topFour = topFive.splice(1, 5);

  var album1 = document.getElementById('album1');
  var album1name = document.getElementById('top-album-square-name');
  var album1playcount = document.getElementById('top-album-square-playcount');

  var album2 = document.getElementById('album2');
  var album3 = document.getElementById('album3');
  var album4 = document.getElementById('album4');
  var album4 = document.getElementById('album4');

  var smallAlbumsBoxName = document.getElementsByClassName('small-album-square-name');
  var smallAlbumsBoxPlaycount = document.getElementsByClassName('small-album-square-playcount');

  album1name.innerText = topFive[0].name;
  album1playcount.innerText = topFive[0].playcount + " plays";

  album2name.innerText = topFour[0].name;
  album2playcount.innerText = topFour[0].playcount + " plays";

  album3name.innerText = topFour[1].name;
  album3playcount.innerText = topFour[1].playcount + " plays";

  album4name.innerText = topFour[2].name;
  album4playcount.innerText = topFour[2].playcount + " plays";

  album5name.innerText = topFour[3].name;
  album5playcount.innerText = topFour[3].playcount + " plays";

  var albumOneImage = document.getElementById('top-album-image').src = topFive[0].image[3]['#text'];
  var artistTwoImage = document.getElementById('album-two-image').src = topFour[0].image[2]['#text'];
  var artistThreeImage = document.getElementById('album-three-image').src = topFour[1].image[2]['#text'];
  var artistFourImage = document.getElementById('album-four-image').src = topFour[2].image[2]['#text'];
  var artistFiveImage = document.getElementById('album-five-image').src = topFour[3].image[2]['#text'];
}




var populateRecentTrackList = function(recentTracks){
  var ul = document.getElementById('recent-track-list');
  recentTracks.forEach(function(track){
    var container = document.createElement('div');
    container.className = "recent-track-item";
    container.style.flexDirection = "row";

    var img = document.createElement('img')
    img.src = track.image[0]['#text']

    var li = document.createElement('li');
    li.innerText = track.artist['#text'] + " - " + track.name;

    container.appendChild(img);
    container.appendChild(li);

    if (track['@attr']) {
      // time_since_played.innerText = "";
      var now_playing = document.createElement('img');
      var now_playing_text = document.createElement('li');

      now_playing_text.id = "now-playing-text";
      now_playing_text.fontcolor = "#D3D3D3";

      now_playing.id = "now-playing";
      now_playing.style.position = "absolute";
      now_playing.style.left = "500px";

      now_playing_text.style.position = "absolute";
      now_playing_text.style.left = "515px";

      now_playing.src = "/images/now_playing.gif"
      now_playing.style.height = "15px";
      now_playing.style.width = "10px";

      now_playing_text.innerText = " now playing";

      container.style.backgroundColor = "#FFFBCD"
      container.appendChild(now_playing);
      container.appendChild(now_playing_text);
    } else {

      var time_since = document.createElement('li');
      time_since.id = "now-playing-text";
      time_since.fontcolor = "#D3D3D3";
      time_since.style.position = "absolute";
      time_since.style.left = "500px";

      var time_since_played = new Date(track.date.uts);

      date = new Date();
      var difference = date.getTime() - (track.date.uts * 1000);

      var minutesDifference = Math.floor(difference/1000/60);
      if (minutesDifference < 60) {
        time_since.innerText = minutesDifference + ` minute${minutesDifference > 1 ? "s":""}`
      } else if (minutesDifference > 59 && minutesDifference < 1440) {
        var hour = Math.round(minutesDifference/60);
        time_since.innerText = (Math.round(minutesDifference/60)) + ` hour${hour > 1 ? "s":""}`
      } else {
        time_since.innerText =  (date.getDay()+1) + " " + (this.getMonth(date.getMonth()+1))
      }

      container.appendChild(time_since);

    }
    ul.appendChild(container);
  })
}

var populateTrackList = function(topTracks){
  var ul = document.getElementById('top-tracks-list');
  topTracks.forEach(function(track){

    var container = document.createElement('div');
    container.className = "top-track-item";
    container.style.flexDirection = "row";

    var img = document.createElement('img')
    img.src = track.image[0]['#text']

    var ttli = document.createElement('li');
    ttli.id = "tt-playcount";
    ttli.innerText = track.playcount;
    ttli.style.position = "absolute";
    ttli.style.left = "500px";

    container.appendChild(ttli);

    var li = document.createElement('li');
    li.innerText = track.artist.name + " - " + track.name;

    container.appendChild(img);
    container.appendChild(li);
    ul.appendChild(container);
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

  realName.innerText = user.realname + " 🎶 scrobbling since: " + month + ", " + date.getFullYear();
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

var removeChildNodes = function(node){
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

window.addEventListener('load', app)
