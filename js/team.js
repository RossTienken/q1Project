const $src = localStorage.getItem('team');


$(document).ready(function () {
  const primary = localStorage.getItem(`${$src}Pri`);
  const secondary = localStorage.getItem(`${$src}Sec`);

  // setting styles for custom team page
  $('#body').css('background-image',`url(img/logos/${$src}.png)`);

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
    for(let i = newGames.length - 1; i >= 0; i--){
      let $box = $('<div>');
      $box.addClass('game');
      $box.attr('id', i);
      let $date = $("<span>");
      $date.addClass('date');
      let $gameID = $('<a>');
      $gameID.attr("href", "overview.html")
      $gameID.addClass('overview');
      let $hrA = $('<hr>');
      let $hrB = $('<hr>');
      $hrB.addClass('hrB')
      let $home = $('<p>');
      let $away = $('<p>');
      for (let j in newGames[i]){
        let dateStr = newGames[i].game.date;
        let $month;
        if(dateStr.slice(5, 7) == 1){
          $month = 'January';
        }
        if(dateStr.slice(5, 7) == 2){
          $month = 'February';
        }
        if(dateStr.slice(5, 7) == 3){
          $month = 'March';
        }
        if(dateStr.slice(5, 7) == 4){
          $month = 'April';
        }
        if(dateStr.slice(5, 7) == 5){
          $month = 'July';
        }
        if(dateStr.slice(5, 7) == 9){
          $month = 'September';
        }
        if(dateStr.slice(5, 7) == 10){
          $month = 'October';
        }
        if(dateStr.slice(5, 7) == 11){
          $month = 'November';
        }
        if(dateStr.slice(5, 7) == 12){
          $month = 'December';
        }
        $date.text(`${$month} ${dateStr.slice(dateStr.length-2)}`);
        $gameID.text(`Overview`)
        $gameID.val(newGames[i].game.id);

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
        $box.append($hrA);
        $box.append($home);
        $box.append($away);
        $box.append($hrB);
        $box.append($gameID);
      }
      $gameID.click(function(event){
        localStorage.setItem('id', $(this).val());
      })
      $gameC.append($box);
    }
      $(".date").css({ 'color': primary, '-webkit-text-stroke': `1.3px ${secondary}`});
      $('a').css({ 'color': primary, '-webkit-text-stroke': `.77px ${secondary}`});
  });



  $.ajax(skatePts).done(function (response) {
    let player = response.cumulativeplayerstats.playerstatsentry[0];
    $('#points').append(ptsFunc(player));
  });

  $.ajax(skateGoal).done(function (response) {
    let player = response.cumulativeplayerstats.playerstatsentry[0];
    $('#goals').append(goalFunc(player));
  });

  $.ajax(skateAssist).done(function (response) {
    let player = response.cumulativeplayerstats.playerstatsentry[0];
    $('#assists').append(assistFunc(player))
  });

  $.ajax(skatePim).done(function (response) {
    let player = response.cumulativeplayerstats.playerstatsentry[0]
     $('#pim').append(pimFunc(player));
  });

  $.ajax(goalWin).done(function (response) {
    let player = response.cumulativeplayerstats.playerstatsentry[0];
    $('#wins').append(winFunc(player));
  });

  $.ajax(goalGAA).done(function (response) {
    let player = response.cumulativeplayerstats.playerstatsentry[0];
    $('#gAA').append(gaaFunc(player))
  });

  $.ajax(goalSv).done(function (response) {
    let player = response.cumulativeplayerstats.playerstatsentry[0];
    $('#saveP').append(savePercent(player))
  });
})

// put functions outside of document ready for testing
function ptsFunc(player){
  return (`<h4>${player.player.FirstName} ${player.player.LastName}</h4><h5>${player.stats.stats.Points['#text']}</h5>`)
}
function goalFunc(player){
  return (`<h4>${player.player.FirstName} ${player.player.LastName}</h4><h5>${player.stats.stats.Goals['#text']}</h5>`)
}
function assistFunc(player){
  return (`<h4>${player.player.FirstName} ${player.player.LastName}</h4><h5>${player.stats.stats.Assists['#text']}</h5>`)
}
function pimFunc(player){
  return (`<h4>${player.player.FirstName} ${player.player.LastName}</h4><h5>${player.stats.stats.PenaltyMinutes['#text']}</h5>`)
}
function winFunc(player) {
  let $hasWon = player.stats.stats
  if($hasWon === null){
    return (`<h4>This team has no wins yet</h4>`)
  }else{
    return (`<h4>${player.player.FirstName} ${player.player.LastName}</h4><h5>${player.stats.stats.Wins['#text']}</h5>`)
  }
}
function gaaFunc(player) {
  return (`<h4>${player.player.FirstName} ${player.player.LastName}</h4><h5>${player.stats.stats.GoalsAgainstAverage['#text']}</h5>`)
}

function savePercent (player) {
  return (`<h4>${player.player.FirstName} ${player.player.LastName}</h4><h5>${player.stats.stats.SavePercentage['#text']}%</h5>`)
}
