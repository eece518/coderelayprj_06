
function inc(event) {
    $.ajax({
           type : "GET",
           url : "/incnum",
    }).done(function(ajax){
    	var resp = $.parseJSON(ajax);
    	$("#val").html(resp.val);
    });
	return false;
};

function dec(event) {
    $.ajax({
           type : "GET",
           url : "/decnum",
    }).done(function(ajax){
    	var resp = $.parseJSON(ajax);
    	$("#val").html(resp.val);
    });
	return false;
};

function get(event) {
	$.ajax({
		type : "GET",
		url : "/getnum",
	}).done(function(ajax) {
		var resp = $.parseJSON(ajax);
		alert(resp.val);
	});
	return false;
};

$(document).ready(function() {
	$("#inc").on("click", inc);
    $("#dec").on("click", dec);
    $("#get").on("click", get);
});

