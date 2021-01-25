
function selectList(tabNum) {

	if (typeof tabNum === 'undefined') { tabNum = 0; }
	
	if (tabNum == 0) {
		$('#var-list-sites option').prop('selected', true);
		$('#var-list-sites').focus();		
	} else if (tabNum == 1) {	
		$('#var-list-apps option').prop('selected', true);
		$('#var-list-apps').focus();		
	} else if (tabNum == 2) {	
		$('#var-list-excepts option').prop('selected', true);
		$('#var-list-excepts').focus();	
	}
}

function deselectList(tabNum) {

	if (typeof tabNum === 'undefined') { tabNum = 0; }
	
	if (tabNum == 0) {
		$('#var-list-sites option').prop('selected', false);
		$('#var-list-sites').focus();		
	} else if (tabNum == 1) {	
		$('#var-list-apps option').prop('selected', false);
		$('#var-list-apps').focus();		
	} else if (tabNum == 2) {	
		$('#var-list-excepts option').prop('selected', false);
		$('#var-list-excepts').focus();		
	}
}

function clearList(tabNum) {

	if (locked) {
	
		$dialogDeleteContent = $("#list_delete_error_container");
		$dialogDeleteContent.dialog({
			modal: true,
			position: { my: "center", at: "center", of: $(".page-content-wrapper") },
			width: "30%",
			draggable: false,
			title: "Oh Noes!",
			open: function () {	
			},
			close: function() {
			   $dialogDeleteContent.dialog("destroy");
			   $dialogDeleteContent.hide();
			},
			buttons: {
				"OK" : function() {
					$dialogDeleteContent.dialog("close");
				}
			}
		}).show();
	
	} else {
		
		if (typeof tabNum === 'undefined') { tabNum = 0; }
		
		if (tabNum == 0) {
			$('#var-list-sites').empty();
			$('#var-list-sites').focus();		
		} else if (tabNum == 1) {	
			$('#var-list-apps').empty();
			$('#var-list-apps').focus();		
		} else if (tabNum == 2) {	
			$('#var-list-excepts').empty();
			$('#var-list-excepts').focus();		
		}
	}

}