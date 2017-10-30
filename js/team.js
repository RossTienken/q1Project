const $src = localStorage.getItem('team')

$(document).ready(function () {
  $('body').css('background-image',`url(img/logos/${$src}.png)`);

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
    "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/team_gamelogs.json?team=${$src}`,
    "method": "GET",
    headers: {
      "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
    },
  }
  var skateStats = {
    skatePts: {
      "async": true,
      "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=G,A,Pts,Pim&sort=stats.Pts.D`,
      "method": "GET",
      headers: {
        "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
      },
    },
    skateGoal: {
      "async": true,
      "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=G,A,Pts,Pim&sort=stats.G.D`,
      "method": "GET",
      headers: {
        "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
      },
    },
    skateAssist: {
      "async": true,
      "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=G,A,Pts,Pim&sort=stats.A.D`,
      "method": "GET",
      headers: {
        "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
      },
    },
    skatePim: {
      "async": true,
      "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=G,A,Pts,Pim&sort=stats.Pim.D`,
      "method": "GET",
      headers: {
        "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
      },
    }
  }
  var goalStats = {
    goalWin: {
      "async": true,
      "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=W,GAA,Sv%25,SO&sort=stats.W.D`,
      "method": "GET",
      headers: {
        "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
      },
    },
    goalGAA: {
      "async": true,
      "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=W,GAA,Sv%25,SO&sort=stats.GAA.D`,
      "method": "GET",
      headers: {
        "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
      },
    },
    goalSv: {
      "async": true,
      "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=W,GAA,Sv%25,SO&sort=stats.Sv%25.D`,
      "method": "GET",
      headers: {
        "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
      },
    },
    goalShut: {
      "async": true,
      "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=W,GAA,Sv%25,SO&sort=stats.SO.D`,
      "method": "GET",
      headers: {
        "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
      },
    }
  }
  $.ajax(games).done(function (response) {
    let newGames = response.teamgamelogs.gamelogs;
    for(let i = newGames.length -1; i > 0; i--){
      let $box = $('<div>');
      $box.addClass('game');
      $box.attr('id', i);
      let $date = $("<span>");
      $date.addClass('date');
      let $hr = $('<hr>');
      let $home = $('<p>');
      let $away = $('<p>');
      for (let j in newGames[i]){
        let dateStr = newGames[i].game.date;
        let $month;
        if(dateStr.slice(5, 7) == 10){
          $month = 'October';
        }
        if(dateStr.slice(5, 7) == 11){
          $month = 'November';
        }
        $date.text(`${$month} ${dateStr.slice(dateStr.length-2)}`);

        $home.text(`${newGames[i].game.homeTeam.City}: ${newGames[i].stats.GoalsFor['#text']}`);

        $away.text(`${newGames[i].game.awayTeam.City}: ${newGames[i].stats.GoalsAgainst['#text']}`);

        $box.append($date);
        $box.append($hr);
        $box.append($home);
        $box.append($away);
      }
      $gameC.append($box);
    }
  });

  $.ajax(skateStats).done(function (response) {
    console.log(response)
  });

  $.ajax(goalStats).done(function (response) {
    console.log(response)
  });
})
