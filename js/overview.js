const $id = localStorage.getItem('id');

$(document).ready(function () {
  var $container = $('.container');
  var $changeTeam = $('#changeTeam');

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
   for(let i = 0; i < periods.length; i++) {
     let $box;
     let goals = periods[i].scoring;
     let length;
     $box = $('<div>');
     $box.addClass('summary');
     let $perNum = $('<h1>');
     $perNum.text(`Period: ${i+1}`)
     if (goals !== null){
        length = goals.goalScored.length;
      }else {
        length = 0;
      }
      $box.append($perNum)
     for(let j = 0; j < length; j++){
       let $hA = $('<h1>');
       let result;
       if (goals !== undefined){
         $hA.text(`Goal Scorer: ${goals.goalScored[j].goalScorer.FirstName} ${goals.goalScored[j].goalScorer.LastName} Time: ${goals.goalScored[j].time}`);
         $box.append($hA)
       }
       (result)
     }
     $container.append($box)
   }
 })
})
