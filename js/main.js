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

//--------- Set Team Primary and Secondary Colors ---------//

  // ana
  localStorage.setItem('anaPri', '#b69a5a');
  localStorage.setItem('anaSec', '#fa5500');
  //

  // ari
  localStorage.setItem('ariPri', '#8B2637');
  localStorage.setItem('ariSec', '#e2d6b5');
  //

  // bos
  localStorage.setItem('bosPri', '#fcb60b');
  localStorage.setItem('bosSec', '#090909');
  //

  // buf
  localStorage.setItem('bufPri', '#002154');
  localStorage.setItem('bufSec', '#fcb60b');
  //

  // car
  localStorage.setItem('carPri', '#cf0821');
  localStorage.setItem('carSec', '#090909');
  //

  // cgy
  localStorage.setItem('cgyPri', '#cf0821');
  localStorage.setItem('cgySec', '#f3bd52');
  //

  // chi
  localStorage.setItem('chiPri', '#cf0a2c');
  localStorage.setItem('chiSec', '#000000');
  //

  // cbj
  localStorage.setItem('cbjPri', '#002655');
  localStorage.setItem('cbjSec', '#ce1126');
  //

  // col
  localStorage.setItem('colPri', '#6f213b');
  localStorage.setItem('colSec', '#1e6194');
  //

  // dal
  localStorage.setItem('dalPri', '#006848');
  localStorage.setItem('dalSec', '#111111');
  //

  // det
  localStorage.setItem('detPri', '#cf0821');
  localStorage.setItem('detSec', '#ffffff');
  //

  // edm
  localStorage.setItem('edmPri', '#ff4b00');
  localStorage.setItem('edmSec', '#001840');
  //

  // floc8223f
  localStorage.setItem('floPri', '#c8223f');
  localStorage.setItem('floSec', '#d69c05');
  //

  // lak
  localStorage.setItem('lakPri', '#aeafab');
  localStorage.setItem('lakSec', '#090909');
  //

  // min
  localStorage.setItem('minPri', '#00482d');
  localStorage.setItem('minSec', '#b01820');
  //

  // mtl
  localStorage.setItem('mtlPri', '#af1f2e');
  localStorage.setItem('mtlSec', '#192268');
  //

  // nsh
  localStorage.setItem('nshPri', '#ffb915');
  localStorage.setItem('nshSec', '#001841');
  //

  // njd
  localStorage.setItem('njdPri', '#cf0821');
  localStorage.setItem('njdSec', '#000000');
  //

  // nyi
  localStorage.setItem('nyiPri', '#00529c');
  localStorage.setItem('nyiSec', '#f47e2d');
  //

  // nyr
  localStorage.setItem('nyrPri', '#0038a7');
  localStorage.setItem('nyrSec', '#ce1126');
  //

  // ott
  localStorage.setItem('ottPri', '#cf0821');
  localStorage.setItem('ottSec', '#000000');
  //

  // phi
  localStorage.setItem('phiPri', 'f84800');
  localStorage.setItem('phiSec', '#000000');
  //

  // pit
  localStorage.setItem('pitPri', '#fcb514');
  localStorage.setItem('pitSec', '#000000');
  //

  // sjs
  localStorage.setItem('sjsPri', '#006d76');
  localStorage.setItem('sjsSec', '#000000');
  //

  // stl
  localStorage.setItem('stlPri', '#002f87');
  localStorage.setItem('stlSec', '#fcb514');
  //

  // tbl
  localStorage.setItem('tblPri', '#002468');
  localStorage.setItem('tblSec', '#ffffff');
  //

  // tor
  localStorage.setItem('torPri', '#00205b');
  localStorage.setItem('torSec', '#ffffff');
  //

  // van
  localStorage.setItem('vanPri', '#001a5b');
  localStorage.setItem('vanSec', '#00a060');
  //

  // vgk
  localStorage.setItem('vgkPri', '#b4965a');
  localStorage.setItem('vgkSec', '#333f43');
  //


  // wsh
  localStorage.setItem('wshPri', '#d00228');
  localStorage.setItem('wshSec', '#001840');
  //

  // wpj
  localStorage.setItem('wpjPri', '#001840');
  localStorage.setItem('wpjSec', '#006EC8');
  //

})
