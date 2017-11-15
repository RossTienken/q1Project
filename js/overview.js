const $id = localStorage.getItem('id');

$(document).ready(function () {
  var $container = $('.container');
  var $changeTeam = $('#changeTeam');
  var $quickSum = $('#quickSum');
  var $statsSum = $('#statsSum');
  var $periodSum = $('#periodSum');
  var $quickPer = $('#quickPer');
  var $totals = $('#totals');

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
   "url": `https://api.mysportsfeeds.com/v1.1/pull/nhl/2017-2018-regular/game_boxscore.json?gameid=${$id}&teamstats=gF,F/O%20%25,F/O%20W,Ht,PIM,Sh&playerstats=none`,
   "method": "GET",
   headers: {
     "Authorization": "Basic " + btoa('RossTienken' + ":" + 'q1Project')
   },
 }
 $.ajax(game).done(function (response) {
   //add team abbreviations to scoreboard
   let $abrHome = response.gameboxscore.game.homeTeam.Abbreviation;
   $quickPer.append(`<h1 class='abrHome'>${$abrHome}</h1>`);
   let hLow = $abrHome.toLowerCase();
   let $abrAway = response.gameboxscore.game.awayTeam.Abbreviation;
   $quickPer.append(`<h1 class='abrAway'>${$abrAway}</h1>`);
   let aLow = $abrAway.toLowerCase();
   $('.logoHome').css('background-image',`url(img/logos/${hLow}.png)`);
   $('.logoAway').css('background-image',`url(img/logos/${aLow}.png)`);

   //add final scores to scoreboard and change font colors
   let priHome = localStorage.getItem(`${hLow}Pri`);
   let secHome = localStorage.getItem(`${hLow}Sec`);
   let priAway = localStorage.getItem(`${aLow}Pri`);
   let secAway = localStorage.getItem(`${aLow}Sec`);


   //adding scores by team per period
   let sum = response.gameboxscore.periodSummary.period
   for(let num = 0; num < 3; num++){
     $quickPer.append(`<h1 class='home${num+1}'>${sum[num].homeScore}</h1>`);
     $quickPer.append(`<h1 class='away${num+1}'>${sum[num].awayScore}</h1>`);
   }
   let periods = response.gameboxscore.periodSummary.period;
   let $home = response.gameboxscore.homeTeam.homeTeamStats;
   let $away = response.gameboxscore.awayTeam.awayTeamStats;
   for(let homeStat in $home){
     $statsSum.append(`<h1 class='home' id='${homeStat}'>${$home[homeStat]['#text']}</h1>`)
   }
   for(let awayStat in $away){
     $statsSum.append(`<h1 class='away' id='${awayStat}'>${$away[awayStat]['#text']}</h1>`)
   }

    let $finalH = response.gameboxscore.homeTeam.homeTeamStats.GoalsFor["#text"];
    let $finalA = response.gameboxscore.awayTeam.awayTeamStats.GoalsFor["#text"];


    if (periods.length === 5){
      let homeSoTotal = response.gameboxscore.periodSummary.period[4].homeScore
      let awaySoTotal = response.gameboxscore.periodSummary.period[4].awayScore

      homeSoTotal > awaySoTotal? $finalH++: $finalA++;
    }
    $totals.append(`<h1 class='finalH'>${$finalH}</h1>`);
    $totals.append(`<h1 class='finalA'>${$finalA}</h1>`);

    //home colors
    $(".teamH").css({ 'color': priHome, '-webkit-text-stroke': `0.5px ${secHome}`});
    $(".finalH").css({ 'color': priHome, '-webkit-text-stroke': `2px ${secHome}`});

    //away colors
    $(".teamA").css({ 'color': priAway, '-webkit-text-stroke': `0.5px ${secAway}`});
    $(".finalA").css({ 'color': priAway, '-webkit-text-stroke': `2px ${secAway}`});


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
       $goalTeam.addClass('goalTeam');
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
     for(let f = length; f <= (-1); f++) {
       let shootSum = response.gameboxscore.periodSummary.period[4].shootoutAttempts.shootoutAttempt;
       let homeCount = 0;
       let awayCount = 0;
       let $finalScore = response.gameboxscore.periodSummary.period[4];
       let $total = $('<h2>');
       $total.addClass('soTotal');
       $total.text('Total');
       $gSum.append(`<h1 class='soHome'>${$abrHome}</h1>`);
       $gSum.append(`<h1 class='soAway'>${$abrAway}</h1>`);
       for(let ele = 0; ele < shootSum.length; ele++){
         let $goalTeam = $('<h2>');
         let $shot = $('<div>');
         $shot.addClass('shot');

         let $soGoalH = $('<h1>');
         $soGoalH.addClass('soGoalH');
         let $soGoalA = $('<h1>');
         $soGoalA.addClass('soGoalA');

         let shooter = shootSum[ele].shooter;
         $shot.append(`<h2>Shot attempt by ${shooter.FirstName} ${shooter.LastName} ${shootSum[ele].outcome}</h2>`)

console.log(response)
         $goalTeam.addClass('goalTeam');
         $goalTeam.text(`${shootSum[ele].teamAbbreviation}`)
         if(ele%2 === 0){
           $goalTeam.css({ 'background-color': 'rgba(41, 41, 41, 0.32)'});
           $shot.css({ 'background-color': 'rgba(41, 41, 41, 0.32)'});
           $soGoalH.css({ 'background-color': 'rgba(41, 41, 41, 0.32)'});
           $soGoalA.css({ 'background-color': 'rgba(41, 41, 41, 0.32)'});

           if (shootSum[0].teamAbbreviation === $abrHome) {
             if(shootSum[ele].outcome === 'Scored'){
               $soGoalH.text('1');
               $soGoalA.text('0');
               homeCount++;
             }else {
               $soGoalH.text('0');
               $soGoalA.text('0');
             }
           }else {
             if(shootSum[ele].outcome === 'Scored'){
               $soGoalH.text('0');
               $soGoalA.text('1');
               awayCount++;
             }else {
               $soGoalH.text('0');
               $soGoalA.text('0');
             }
           }
         }else {
           if (shootSum[0].teamAbbreviation === $abrHome) {
             if(shootSum[ele].outcome === 'Scored'){
               $soGoalH.text('0');
               $soGoalA.text('1');
               awayCount++;
             }else {
               $soGoalH.text('0');
               $soGoalA.text('0');
             }
           }else {
             if(shootSum[ele].outcome === 'Scored'){
               $soGoalH.text('1');
               $soGoalA.text('0');
               homeCount++;
             }else {
               $soGoalH.text('0');
               $soGoalA.text('0');
             }
           }
         }

         $gSum.append($goalTeam)
         $gSum.append($shot)
         $gSum.append($soGoalH)
         $gSum.append($soGoalA)
         $gSum.append($total)
         $perSum.append($gSum)
       }
       $gSum.append(`<h2 class='homeTotal'>${homeCount}</h2>`)
       $gSum.append(`<h2 class='awayTotal'>${awayCount}</h2>`)
     }
     $periodSum.append($perSum)
   }
 })
})
