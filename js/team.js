const $src = localStorage.getItem('team');


$(document).ready(function () {
  const primary = localStorage.getItem(`${$src}Pri`);
  const secondary = localStorage.getItem(`${$src}Sec`);

  // setting styles for custom team page
  $('body').css('background-image',`url(img/logos/${$src}.png)`);

  $("#recentG").css({ 'color': primary, '-webkit-text-stroke': `2px ${secondary}`});

  $("#teamLead").css({ 'color': primary, '-webkit-text-stroke': `2px ${secondary}`});

  //start of adding content to page

  var $body = $('body');
  var $container = $('.container');
  var $gameC = $('#gameC');
  var $changeTeam = $('#changeTeam');

  $('.teamSrc').click(function() {
    if($changeTeam.val() === ""){
      localStorage.setItem('team', $src);
    }else {
      localStorage.setItem('team', $changeTeam.val());
    }
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
    "async": false,
    "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=Pts&sort=stats.Pts.D`,
    "method": "GET",
    headers: {
      "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
    },
  }
  var skateGoal = {
    "async": false,
    "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=G&sort=stats.G.D`,
    "method": "GET",
    headers: {
      "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
    },
  }
  var skateAssist = {
    "async": false,
    "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=A&sort=stats.A.D`,
    "method": "GET",
    headers: {
      "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
    },
  }
  var skatePim = {
    "async": false,
    "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=Pim&sort=stats.Pim.D`,
    "method": "GET",
    headers: {
      "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
    },
  }
  var goalWin = {
    "async": false,
    "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=W&sort=stats.W.D`,
    "method": "GET",
    headers: {
      "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
    },
  }
  var goalGAA = {
    "async": false,
    "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=GAA&sort=stats.GAA.D`,
    "method": "GET",
    headers: {
      "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
    },
  }
  var goalSv = {
    "async": false,
    "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/cumulative_player_stats.json?team=${$src}&playerstats=Sv%25&sort=stats.Sv%25.D`,
    "method": "GET",
    headers: {
      "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
    },
  }

  $.ajax(games).done(function (response) {
    let newGames = response.teamgamelogs.gamelogs;
    console.log(newGames)
    for(let i = newGames.length - 1; i >= 0; i--){
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

        //set goals variables
        let goalsFor = newGames[i].stats.GoalsFor['#text'];
        let goalsAgainst = newGames[i].stats.GoalsAgainst['#text'];
        let upper = $src.toUpperCase();

        //set home and away team names & change for New York teams
        let homeTeam = newGames[i].game.homeTeam.City;
        let awayTeam = newGames[i].game.awayTeam.City;
        homeTeam == 'New York'? homeTeam = 'NY '+ newGames[i].game.homeTeam.Name: homeTeam;
        awayTeam == 'New York'? awayTeam = 'NY '+ newGames[i].game.awayTeam.Name: awayTeam;

        
        if (newGames[i].game.homeTeam.Abbreviation == upper) {
          if(newGames[i].stats.GoalsFor['#text'] === newGames[i].stats.GoalsAgainst['#text']){
            if (newGames[i].stats.OvertimeWins["#text"] === 1){
              goalsFor++;
            }else {
              goalsAgainst++;
            }
            $home.text(`${homeTeam}: ${goalsFor}`);
            $away.text(`${awayTeam}: ${goalsAgainst}`);
          }
          else{
            $home.text(`${homeTeam}: ${goalsFor}`);
            $away.text(`${awayTeam}: ${goalsAgainst}`);
          }
        }else {
          if(newGames[i].stats.GoalsFor['#text'] === newGames[i].stats.GoalsAgainst['#text']) {
            if (newGames[i].stats.OvertimeWins["#text"] == 1){
              goalsFor++;
            }else {
              goalsAgainst++;
            }
            $home.text(`${homeTeam}: ${goalsAgainst}`);
            $away.text(`${awayTeam}: ${goalsFor}`);
          }else {
            $home.text(`${homeTeam}: ${goalsAgainst}`);
            $away.text(`${awayTeam}: ${goalsFor}`);
          }
        }

        $box.append($date);
        $box.append($hr);
        $box.append($home);
        $box.append($away);
      }
      $gameC.append($box);
    }
      $(".date").css({ 'color': primary, '-webkit-text-stroke': `1.3px ${secondary}`});
  });

  $.ajax(skatePts).done(function (response) {
    let player = response.cumulativeplayerstats.playerstatsentry[0];
    let $points = $('#points');

    $points.append(`<h4>${player.player.FirstName} ${player.player.LastName}</h4> <h5>${player.stats.stats.Points['#text']}</h5>`)

  });

  $.ajax(skateGoal).done(function (response) {
    let $goals = $('#goals');
    let player = response.cumulativeplayerstats.playerstatsentry[0];

    $goals.append(`<h4>${player.player.FirstName} ${player.player.LastName}</h4><h5>${player.stats.stats.Goals['#text']}</h5>`)
  });

  $.ajax(skateAssist).done(function (response) {
    let $assists = $('#assists');
    let player = response.cumulativeplayerstats.playerstatsentry[0];

    $assists.append(`<h4>${player.player.FirstName} ${player.player.LastName}</h4><h5>${player.stats.stats.Assists['#text']}</h5>`)
  });

  $.ajax(skatePim).done(function (response) {
    let $pim = $('#pim');
    let player = response.cumulativeplayerstats.playerstatsentry[0];

    $pim.append(`<h4>${player.player.FirstName} ${player.player.LastName}</h4><h5>${player.stats.stats.PenaltyMinutes['#text']}</h5>`);
  });


  $.ajax(goalWin).done(function (response) {
    let $wins = $('#wins');
    let player = response.cumulativeplayerstats.playerstatsentry[0];
    let $hasWon = player.stats.stats
    if($hasWon === null){
      $wins.append(`<h4>This team has no wins yet</h4>`)
    }else{
      $wins.append(`<h4>${player.player.FirstName} ${player.player.LastName}</h4><h5>${player.stats.stats.Wins['#text']}</h5>`)
    }
  });

  $.ajax(goalGAA).done(function (response) {
    let $gAA = $('#gAA');
    let player = response.cumulativeplayerstats.playerstatsentry[0];

    $gAA.append(`<h4>${player.player.FirstName} ${player.player.LastName}</h4><h5>${player.stats.stats.GoalsAgainstAverage['#text']}</h5>`)
  });

  $.ajax(goalSv).done(function (response) {
    let $saveP = $('#saveP');
    let player = response.cumulativeplayerstats.playerstatsentry[0];

    $saveP.append(`<h4>${player.player.FirstName} ${player.player.LastName}</h4><h5>${player.stats.stats.SavePercentage['#text']}%</h5>`)
  });

})
