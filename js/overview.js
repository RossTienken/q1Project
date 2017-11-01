const $id = localStorage.getItem('id');

$(document).ready(function () {
  var $container = $('.container');
  var $changeTeam = $('#changeTeam');

  let $h1 = $('<h1>');
  $h1.text(`${$id}`);
  $container.append($h1);

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
   "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/game_boxscore.json?gameid=${$id}&teamstats=none&playerstats=none`,
   "method": "GET",
   headers: {
     "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
   },
 }
 $.ajax(game).done(function (response) {
   let periods = response.gameboxscore.periodSummary.period;
   let $hA = $('<h1>');
   for(let i = 0; i < periods.length - 1; i++) {
     console.log(periods[i].scoring.goalScored)
     let goals = periods[i].scoring.goalScored;
     for(let j of goals){
       $hA.html(`Goal Scorer: ${j.goalScorer.FirstName} ${j.goalScorer.LastName} Time: ${j.time} `)
     }
     $container.append($hA)
   }
 })
})
