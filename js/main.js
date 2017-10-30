$(document).ready(function () {
  var $body = $('body');
  var $container = $('.container');
  var $gameC = $('#gameC');
  var $standingC = $('#standingC');
  var $changeTeam = $('#changeTeam');

  $('.teamSrc').click(function() {
  localStorage.setItem('team', $changeTeam.val())
   window.location = "team.html";
 });

  var games = {
    "async": true,
    "url": "https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/scoreboard.json?fordate=20171029",
    "method": "GET",
    headers: {
      "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
    },
  }
  var standings = {
    "async": true,
    "url": "https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/conference_team_standings.json?teamstats=W,L,GF,GA,Pts",
    "method": "GET",
    headers: {
      "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
    },
  }
  $.ajax(games).done(function (response) {
    let newGames = response.scoreboard.gameScore;
    for(let i in newGames){
      let $box = $('<div>');
      $box.addClass('game');
      $box.attr('id', i);
      let $home = $('<p>');
      let $away = $('<p>');
      for (let j in newGames[i]){
        $home.text(`${newGames[i].game.homeTeam.City}: ${newGames[i].homeScore}`);
        $away.text(`${newGames[i].game.awayTeam.City}: ${newGames[i].awayScore}`);
        $box.append($home);
        $box.append($away);
      }
      $gameC.append($box);
    }
  });
  $.ajax(standings).done(function (response) {
    let newStand = response.conferenceteamstandings.conference;
    let $conE = $('#easternC');
    let $conW = $('#westernC');
    let $h2East = $('#eastC');
    let $h2West = $('#westC');
    let $olEast = $('#olEast');
    let $olWest = $('#olWest');
    let $eastPts = $('#eastPts');
    let $westPts = $('#westPts');
    $h2East.text(`${newStand[0]['@name']} Conference:`);
    $h2West.text(`${newStand[1]['@name']} Conference:`);
    for(let i = 0; i < 10; i++){
      $olEast.append(`<li>${newStand[0].teamentry[i].team.City}  ${newStand[0].teamentry[i].team.Name}</li>`);

      $eastPts.append(`<h3>${newStand[0].teamentry[i].stats.stats.Points['#text']} pts</h3>`)

      $olWest.append(`<li>${newStand[1].teamentry[i].team.City}  ${newStand[1].teamentry[i].team.Name}</li>`);

      $westPts.append(`<h3> ${newStand[1].teamentry[i].stats.stats.Points['#text']} pts</h3>`)
    }
  });
})
