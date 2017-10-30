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
  var skatePts = {
    "async": true,
    "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=Pts&sort=stats.Pts.D`,
    "method": "GET",
    headers: {
      "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
    },
  }
  var skateGoal = {
    "async": true,
    "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=G&sort=stats.G.D`,
    "method": "GET",
    headers: {
      "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
    },
  }
  var skateAssist = {
    "async": true,
    "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=A&sort=stats.A.D`,
    "method": "GET",
    headers: {
      "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
    },
  }
  var skatePim = {
    "async": true,
    "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=Pim&sort=stats.Pim.D`,
    "method": "GET",
    headers: {
      "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
    },
  }
  var goalWin = {
    "async": true,
    "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=W&sort=stats.W.D`,
    "method": "GET",
    headers: {
      "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
    },
  }
  var goalGAA = {
    "async": true,
    "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=GAA&sort=stats.GAA.D`,
    "method": "GET",
    headers: {
      "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
    },
  }
  var goalSv = {
    "async": true,
    "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=Sv%25&sort=stats.Sv%25.D`,
    "method": "GET",
    headers: {
      "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
    },
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

  $.ajax(skatePts).done(function (response) {
    let player = response.cumulativeplayerstats.playerstatsentry["0"];
    let $points = $('#points');

    $points.append(`<h4>${player.player.FirstName} ${player.player.LastName}</h4> <h5>${player.stats.stats.Points['#text']}</h5>`)

  });

  $.ajax(skateGoal).done(function (response) {
    let $goals = $('#goals');
    let player = response.cumulativeplayerstats.playerstatsentry["0"];

    $goals.append(`<h4>${player.player.FirstName} ${player.player.LastName}</h4><h5>${player.stats.stats.Goals['#text']}</h5>`)
  });

  $.ajax(skateAssist).done(function (response) {
    let $assists = $('#assists');
    let player = response.cumulativeplayerstats.playerstatsentry["0"];

    $assists.append(`<h4>${player.player.FirstName} ${player.player.LastName}</h4><h5>${player.stats.stats.Assists['#text']}</h5>`)
  });

  $.ajax(skatePim).done(function (response) {
    let $pim = $('#pim');
    let player = response.cumulativeplayerstats.playerstatsentry["0"];

    $pim.append(`<h4>${player.player.FirstName} ${player.player.LastName}</h4><h5>${player.stats.stats.PenaltyMinutes['#text']}</h5>`);
  });


  $.ajax(goalWin).done(function (response) {
    let $wins = $('#wins');
    let player = response.cumulativeplayerstats.playerstatsentry["0"];

    $wins.append(`<h4>${player.player.FirstName} ${player.player.LastName}</h4><h5>${player.stats.stats.Wins['#text']}</h5>`)
  });

  $.ajax(goalGAA).done(function (response) {
    let $gAA = $('#gAA');
    let player = response.cumulativeplayerstats.playerstatsentry["0"];

    $gAA.append(`<h4>${player.player.FirstName} ${player.player.LastName}</h4><h5>${player.stats.stats.GoalsAgainstAverage['#text']}</h5>`)
  });

  $.ajax(goalSv).done(function (response) {
    let $saveP = $('#saveP');
    let player = response.cumulativeplayerstats.playerstatsentry["0"];

    $saveP.append(`<h4>${player.player.FirstName} ${player.player.LastName}</h4><h5>${player.stats.stats.SavePercentage['#text']}%</h5>`)
  });

})
