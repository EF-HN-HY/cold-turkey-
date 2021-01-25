/* Copyright 2016 (c) Felix Logic
/*$(document).ready(function() {*/

var id = 10;
function drawSchedule() {

	var $dialogContent;
	var $calendar = $('#calendar');
	var schedulerId = scheduler.length;
		
	$calendar.weekCalendar({
		useShortDayNames: true,
		displayOddEven: false,
		showHeader: false,
		timeslotsPerHour : 4,
		timeslotHeight : 10,
		allowCalEventOverlap : true,
		overlapEventsSeparate: true,
		firstDayOfWeek : 0,
		businessHours :{start: 9, end: 17, limitDisplay: false },
		daysToShow : 7,
		/*title: function(daysToShow) {
			return daysToShow == 1 ? '%date%' : '%start% - %end%';
		},*/
		height : function($calendar) {
		   /*return 490;*/
		   return $(window).height() - 235;
		},
		eventRender : function(calEvent, $event) {
		   /*if (calEvent.end.getTime() < new Date().getTime()) {
				$event.css("backgroundColor", "#111111");
				$event.find(".wc-time").css({
				   "backgroundColor" : "#111111",
				   "border" : "1px solid #888888"
				});
		   }*/
		},
		draggable : function(calEvent, $event) {
		
			if (settings[2] != "null") {
				return false;
			} else {
				return true;
			}
		
			/*return calEvent.readOnly != true;
			return false;*/
		},
		resizable : function(calEvent, $event) {
			/*return calEvent.readOnly != true;*/
			return false;
		},
		eventNew : function(calEvent, $event) {
		
			$dialogContent = $("#event_edit_container");
			resetForm($dialogContent);
			
			schedulerId = scheduler.length;
			
			var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
			var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
			var titleField = $dialogContent.find("select[name='title']");
			var pomodoroField = $dialogContent.find("select[name='pomodoro']").val(calEvent.pomodoro);

			$dialogContent.dialog({
				modal: true,
				draggable: false,
				title: "创建一个新的时间区间",
				open: function(event, ui) { 
					$('.ui-widget-overlay').bind('click', function(){ 
						$dialogContent.dialog('close'); 
					}); 
				},
				close: function() {
				   $dialogContent.dialog("destroy");
				   $dialogContent.hide();
				   $('#calendar').weekCalendar("removeUnsavedEvents");
				},
				buttons: {
					"Save" : {
						text: "保存",
						click: function() {
						
							calEvent.id = id;
							id++;
							calEvent.schedulerId = schedulerId;
							calEvent.start = new Date(startField.val());
							calEvent.end = new Date(endField.val());
							calEvent.title = titleField.val();
							calEvent.pomodoro =  pomodoroField.val();

							var formattedStart = calEvent.start.getDay().toString() + "@" + calEvent.start.getHours().toString() + "@" + calEvent.start.getMinutes().toString();
							var formattedEnd;
							if (calEvent.end.getDay() == 0 && calEvent.end.getHours() == 0 && calEvent.end.getMinutes() == 0) {  /* anti-loop back for blocks ending midnight Sat */
								formattedEnd = "7@0@0";
							} else {
								formattedEnd = calEvent.end.getDay().toString() + "@" +  calEvent.end.getHours().toString() + "@" + calEvent.end.getMinutes().toString();
							}
							scheduler.push([schedulerId.toString(), formattedStart, formattedEnd, titleField.val(), pomodoroField.val()]);
							updateAdvanced();
							compileSaveConfig(2);
							
							$calendar.weekCalendar("removeUnsavedEvents");
							$calendar.weekCalendar("updateEvent", calEvent);
							$dialogContent.dialog("close");
							
						}
					},
					"Cancel" :{
						text: "取消",
						click: function() {
							$dialogContent.dialog("close");
						}
					}
				}
		   }).show();

		   /*dialogContent.find(".date_holder").text($calendar.weekCalendar("formatDate", calEvent.start));*/
		   setupStartAndEndTimeFields(startField, endField, calEvent, $calendar.weekCalendar("getTimeslotTimes", calEvent.start));

		},
		eventDrop : function(calEvent, $event) {
		
			var formattedStart = calEvent.start.getDay().toString() + "@" + calEvent.start.getHours().toString() + "@" + calEvent.start.getMinutes().toString();
			var formattedEnd;
			if (calEvent.end.getDay() == 0 && calEvent.end.getHours() == 0 && calEvent.end.getMinutes() == 0) {  /* anti-loop back for blocks ending midnight Sat */
				formattedEnd = "7@0@0";
			} else {
				formattedEnd = calEvent.end.getDay().toString() + "@" +  calEvent.end.getHours().toString() + "@" + calEvent.end.getMinutes().toString();
			}
			var replaceIndex = 0; 
			
			$.each(scheduler, function(i, val) {
				if (scheduler[i][0] === calEvent.schedulerId.toString()) {
					replaceIndex = i;
				}
			});
			scheduler.splice(replaceIndex, 1, [calEvent.schedulerId.toString(), formattedStart, formattedEnd, calEvent.title, calEvent.pomodoro]);
			compileSaveConfig(2);
		
		},
		eventResize : function(calEvent, $event) {
		},
		eventClick : function(calEvent, $event) {

			if (calEvent.readOnly) {
				return;
			}
					
			var $dialogContent = $("#event_edit_container");
			var $dialogFullContent = $("#schedule_delete_error_container");
			resetForm($dialogContent);
			var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
			var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
			var titleField = $dialogContent.find("select[name='title']").val(calEvent.title);
			var pomodoroField = $dialogContent.find("select[name='pomodoro']").val(calEvent.pomodoro);
			
			$dialogContent.dialog({
				modal: true,
				draggable: false,
				title: "编辑 - " + calEvent.title,
				close: function() {
				   $dialogContent.dialog("destroy");
				   $dialogContent.hide();
				   $('#calendar').weekCalendar("removeUnsavedEvents");
				},
				buttons: {
					"Save" : {
						text: "保存",
						click: function() {
						
							if (settings[2] != "null") {
							
								$dialogFullContent.dialog({
									modal: true,
									position: { my: "center", at: "center", of: $(".page-content-wrapper") },
									width: "40%",
									draggable: false,
									title: "Oops!",
									open: function () {			
									},
									close: function() {
									   $dialogFullContent.dialog("destroy");
									},
									buttons: {
										"OK" : function() {
											$dialogFullContent.dialog("close");
											$dialogContent.dialog("close");
										}
									}
								}).show();
							
							} else {
							
								calEvent.start = new Date(startField.val());
								calEvent.end = new Date(endField.val());
								calEvent.title = titleField.val(); 
								calEvent.pomodoro = pomodoroField.val();

								var formattedStart = calEvent.start.getDay().toString() + "@" + calEvent.start.getHours().toString() + "@" + calEvent.start.getMinutes().toString();
								var formattedEnd;
								if (calEvent.end.getDay() == 0 && calEvent.end.getHours() == 0 && calEvent.end.getMinutes() == 0) {  /* anti-loop back for blocks ending midnight Sat */
									formattedEnd = "7@0@0";
								} else {
									formattedEnd = calEvent.end.getDay().toString() + "@" +  calEvent.end.getHours().toString() + "@" + calEvent.end.getMinutes().toString();
								}
								var replaceIndex = 0; 
								
								$.each(scheduler, function(i, val) {
									if (scheduler[i][0] === calEvent.schedulerId.toString()) {
										replaceIndex = i;
									}
								});
								scheduler.splice(replaceIndex, 1, [calEvent.schedulerId.toString(), formattedStart, formattedEnd, calEvent.title, calEvent.pomodoro]);
								compileSaveConfig(2);

								$calendar.weekCalendar("updateEvent", calEvent);
								$dialogContent.dialog("close");
							
							}
		   
						}
					},
					"Delete" : {
						id: "schedule-edit-delete",
						text: "删除",
						click: function() {

							if (settings[2] != "null") {
							
								$dialogFullContent.dialog({
									modal: true,
									position: { my: "center", at: "center", of: $(".page-content-wrapper") },
									width: "40%",
									draggable: false,
									title: "Oops!",
									close: function() {
									   $dialogFullContent.dialog("destroy");
									},
									buttons: {
										"OK" : function() {
											$dialogFullContent.dialog("close");
											$dialogContent.dialog("close");
										}
									}
								}).show();
								
							} else {
							
								var replaceIndex = 0;
								$.each(scheduler, function(i, val) {
									if (scheduler[i][0] === calEvent.schedulerId.toString()) {
										replaceIndex = i;
									}
								});
								scheduler.splice(replaceIndex, 1);   /* Delete an entry */
								$.each(scheduler, function(i, val) { /* Re-index items after deletion of an entry */
									if (parseInt(scheduler[i][0]) > replaceIndex) {
										scheduler[i][0] = (parseInt(scheduler[i][0]) - 1).toString();
									}
								});
								$calendar.weekCalendar("removeEvent", calEvent.id, replaceIndex);
								
								compileSaveConfig(2);
								$dialogContent.dialog("close");
							}						
							
						}
					},
					"Cancel" : {
						text: "取消",
						click: function() {
							$dialogContent.dialog("close");
						}

					}
				}
			}).show();

			/*$dialogContent.find(".date_holder").text($calendar.weekCalendar("formatDate", calEvent.start));*/
			setupStartAndEndTimeFields(startField, endField, calEvent, $calendar.weekCalendar("getTimeslotTimes", calEvent.start));

		},
		eventMouseover : function(calEvent, $event) {
		},
		eventMouseout : function(calEvent, $event) {
		},
		noEvents : function() {
		}
		,data : function(start, end, callback) {
		   callback(getEventData());
		}
   });

   function resetForm($dialogContent) {
		$dialogContent.find("input").val("");
		$dialogContent.find("textarea").val("");
   }

   function getEventData() {
	 /*	var year = new Date().getFullYear();
		var month = new Date().getMonth();
		var day = new Date().getDate();
	 */
	 /*
	 * Set events that need to be rendered beforehand
	 */
		/*return {
		   events : [
            {
               "id":1,
               "start": new Date(year, month, day, 12),
               "end": new Date(year, month, day, 13, 30),
               "title":"Lunch with Mike"
            }
         ]
		};*/
		
		return {
		   events : schedule
		};
		
   }
   

   /*
    * Sets up the start and end time fields in the calendar event
    * form for editing based on the calendar event being edited
    */
	function setupStartAndEndTimeFields($startTimeField, $endTimeField, calEvent, timeslotTimes) {

		$startTimeField.empty();
		$endTimeField.empty();
		
		for (var i = 0; i < timeslotTimes.length; i++) {
			var startTime = timeslotTimes[i].start;
			var endTime = timeslotTimes[i].end;

			/*if (startTime.getTime() === calEvent.start.getTime()) {
				startSelected = "selected=\"selected\"";
			}
			var endSelected = "";
			if (endTime.getTime() === calEvent.end.getTime()) {
				endSelected = "selected=\"selected\"";
			}
			Below changes time comparison from epoch seconds to hour+minute because seconds don't align with saved data
			*/
			var startSelected = "";
			if (startTime.getHours() == calEvent.start.getHours() && startTime.getMinutes() == calEvent.start.getMinutes()) {
				startSelected = "selected=\"selected\"";
			}
			var endSelected = "";
			if (endTime.getHours() == calEvent.end.getHours() && endTime.getMinutes() == calEvent.end.getMinutes()) {
				endSelected = "selected=\"selected\"";
			}
			$startTimeField.append("<option value=\"" + startTime + "\" " + startSelected + ">" + timeslotTimes[i].startFormatted + "</option>");
			$endTimeField.append("<option value=\"" + endTime + "\" " + endSelected + ">" + timeslotTimes[i].endFormatted + "</option>");

			$timestampsOfOptions.start[timeslotTimes[i].startFormatted] = startTime.getTime();
			$timestampsOfOptions.end[timeslotTimes[i].endFormatted] = endTime.getTime();

		}
		$endTimeOptions = $endTimeField.find("option");
		$startTimeField.trigger("change");
	}
	
   var $endTimeField = $("select[name='end']");
   var $endTimeOptions = $endTimeField.find("option");
   var $timestampsOfOptions = {start:[],end:[]};

	
   //reduces the end time options to be only after the start time options.
   $("select[name='start']").change(function() {
   
		var startTime = $timestampsOfOptions.start[$(this).find(":selected").text()];
		var currentEndTime = $endTimeField.find("option:selected").val();
		
		
		$endTimeField.html(
				$endTimeOptions.filter(function() {
				   return startTime < $timestampsOfOptions.end[$(this).text()];
				})
		);

		var endTimeSelected = false;
		$endTimeField.find("option").each(function() {
		   if ($(this).val() === currentEndTime) {
				$(this).attr("selected", "selected");
				endTimeSelected = true;
				return false;
		   }
		});
/*
		if (!endTimeSelected) {
		   //automatically select an end date 2 slots away.
		   $endTimeField.find("option:eq(1)").attr("selected", "selected");
		}
*/
   });

}
/*});*/
