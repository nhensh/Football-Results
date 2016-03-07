$( document ).ready(function() {

	$.ajax({
	  headers: { 'X-Auth-Token': 'f2d164c333f849adaa0ca502c8b35547' },
	  url: 'http://api.football-data.org/v1/fixtures/',
	  dataType: 'json',
	  type: 'GET',
	}).done(function(response) {
	  // do something with the response, e.g. isolate the id of a linked resource        
	  var regex = /.*?(\d+)$/; // the ? makes the first part non-greedy
	  $.each(response.fixtures, function (index, all) {
	  	$('#Nextfixtures').append('<tr><td>'+ all.homeTeamName +'</td><td>'+ all.awayTeamName +'</td><td>'+ all.date +'</tr>');
	  });
	});

	$.ajax({
	  headers: { 'X-Auth-Token': 'f2d164c333f849adaa0ca502c8b35547' },
	  url: 'http://api.football-data.org/v1/soccerseasons/',
	  dataType: 'json',
	  type: 'GET',
	}).done(function(response) {
	  // do something with the response, e.g. isolate the id of a linked resource        
	  var regex = /.*?(\d+)$/; // the ? makes the first part non-greedy
	  var valuesSelect = $('#competitions');
	  $.each(response, function (index, value) {
	  	valuesSelect.append('<option value=' + value.id + '>' + value.caption + '</option>');
	  });
	});
	$("#competitions").change(function () { 
		var compId = $(this).val();
		$("#team").find('option').remove();
		$("#table").find('td').remove();
		$('#table-heading').text($(this).find(':selected').text());
		$.ajax({
		  headers: { 'X-Auth-Token': 'f2d164c333f849adaa0ca502c8b35547' },
		  url: 'http://api.football-data.org/v1/soccerseasons/'+compId+'/teams',
		  dataType: 'json',
		  type: 'GET',
		}).done(function(response) {
		  // do something with the response, e.g. isolate the id of a linked resource        
		  var regex = /.*?(\d+)$/; // the ? makes the first part non-greedy
		  var valuesSelect = $('#team');
		  $('#crest').attr("src", response.crestUrl).attr("alt", response.name);
		  $.each(response.teams, function (index, value) {
		  	valuesSelect.append('<option value=' + value._links.self.href + '>' + value.name + '</option>');
		  });
		  
		});
		$.ajax({
		  headers: { 'X-Auth-Token': 'f2d164c333f849adaa0ca502c8b35547' },
		  url: 'http://api.football-data.org/v1/soccerseasons/'+compId+'/leagueTable',
		  dataType: 'json',
		  type: 'GET',
		}).done(function(response) {
		  // do something with the response, e.g. isolate the id of a linked resource        
		  var regex = /.*?(\d+)$/; // the ? makes the first part non-greedy
		  console.log(response.standing);
		  $.each(response.standing, function (index, all) {
		  	$('#table').append('<tr><td>'+ all.position +'</td><td>'+ all.teamName +'</td><td>'+ all.wins +'</td><td>'+ all.draws +'</td><td>'+ all.losses +'</td><td>'+ all.points +'</td></tr>');
		  });
		});
	});
	$("#team").change(function () { 
		var teamCode = $(this).val();
		$('#fixtures').find('td').remove();
		$('#team-heading').text($(this).find(':selected').text());
		$.ajax({
		  headers: { 'X-Auth-Token': 'f2d164c333f849adaa0ca502c8b35547' },
		  url: teamCode,
		  dataType: 'json',
		  type: 'GET',
		}).done(function(response) {
			$('#crest').attr("src", response.crestUrl).attr("alt", response.name);
			var fixtures = response._links.fixtures.href;
			console.log(fixtures);
			$.ajax({
			  headers: { 'X-Auth-Token': 'f2d164c333f849adaa0ca502c8b35547' },
			  url: fixtures,
			  dataType: 'json',
			  type: 'GET',
			}).done(function(value) {
				console.log(value);
				$.each(value.fixtures, function (index, game) {
					$('#fixtures').append('<tr><td>'+ game.homeTeamName +'</td><td>'+ game.awayTeamName +'</td><td>'+ game.date +'</tr>');
				});
			});
		});
	});
});