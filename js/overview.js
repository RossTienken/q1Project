const $id = localStorage.getItem('id');

$(document).ready(function () {
  var $container = $('.container');
  var $changeTeam = $('#changeTeam');
  var $quickSum = $('#quickSum');
  var $statsSum = $('#statsSum');
  var $periodSum = $('#periodSum');

  $('.teamSrc').click(function() {
    if($changeTeam.val() === ""){
      localStorage.setItem('team', $src);
    }else {
      localStorage.setItem('team', $changeTeam.val());
    }
    window.location = "team.html";
 });

 var game = {
   "async": true,
   "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/game_boxscore.json?gameid=${$id}&teamstats=F/O%20%25,F/O%20W,Ht,PIM,Sh&playerstats=none`,
   "method": "GET",
   headers: {
     "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
   },
 }
 $.ajax(game).done(function (response) {
   let periods = response.gameboxscore.periodSummary.period;
   console.log(response);
   let $home = response.gameboxscore.homeTeam.homeTeamStats;
   let $away = response.gameboxscore.awayTeam.awayTeamStats;
   for(let homeStat in $home){
     $statsSum.append(`<h1 class='home' id='${homeStat}'>${$home[homeStat]['#text']}</h1>`)
   }
   for(let awayStat in $away){
     $statsSum.append(`<h1 class='away' id='${awayStat}'>${$away[awayStat]['#text']}</h1>`)
   }

   for(let i = 0; i < periods.length; i++) {
     let $perSum = $('<div>');
     $perSum.addClass('summary');
     let $perNum = $('<h1>');
     $perNum.addClass(`per${i+1}`);
     let length;
     if(i < 4){
       i < 3? $perNum.text(`Period: ${i+1}`): $perNum.text('OT:');
     }else if (i === 4) {
      $perNum.text('SO:');
     }
     $perSum.append($perNum);

     $gSum = $('<div>');
     $gSum.addClass(`p${i+1}`);

     let $time = $('<h1>');
     $time.addClass('time');
     $time.text('Time');

     let $team = $('<h1>');
     $team.addClass('team');
     $team.text('Team');

     let $scoredBy = $('<h1>');
     $scoredBy.addClass('scoredBy');
     $scoredBy.text('Goal Summary');

     $gSum.append($time);
     $gSum.append($team);
     $gSum.append($scoredBy);

     let goals = periods[i].scoring;
     if (goals !== null){
        length = goals.goalScored.length;
      }else {
        length = 0;
      }
      if(i === 4){
        length = (-1)
      }
     for(let j = 0; j < length; j++){
       let $goalTime = $('<h2>');
       $goalTime.addClass('goalTime');
       let $goalTeam = $('<h2>');
       $goalTeam.addClass('goalTeam')
       let $sumG = $('<div>');
       $sumG.addClass('goalSum');

       $goalTime.text(`${goals.goalScored[j].time}`);
       $goalTeam.text(`${goals.goalScored[j].teamAbbreviation}`)
       $sumG.append(`<h2>Goal Scored By: ${goals.goalScored[j].goalScorer.FirstName} ${goals.goalScored[j].goalScorer.LastName}</h2>`);

       if(goals.goalScored[j].assist1Player !== undefined) {
         if(goals.goalScored[j].assist2Player !== undefined){
           $sumG.append(`<h3>Assists:  ${goals.goalScored[j].assist1Player.FirstName} ${goals.goalScored[j].assist1Player.LastName}, ${goals.goalScored[j].assist2Player.FirstName} ${goals.goalScored[j].assist2Player.LastName}</h3>`)
         }else {
          $sumG.append(`<h3>Assist:  ${goals.goalScored[j].assist1Player.FirstName} ${goals.goalScored[j].assist1Player.LastName}</h3>`)
         }
       }

       $gSum.append($goalTime)
       $gSum.append($goalTeam)
       $gSum.append($sumG)
       $perSum.append($gSum)
     }
     for(let k = length; k === 0; k++){
       let $hB = $('<h4>');
       $hB.text('no goals scored');
       $gSum.append($hB);
       $perSum.append($gSum)
     }
     $periodSum.append($perSum)
   }
 })
})
