var max_fields      = 10;
var wrapper         = $(".input_fields_wrap");
var add_button      = $(".add_field_button");
var remove_button   = $(".remove_field_button");

$(add_button).click(function(e){
	e.preventDefault();
	var total_fields = wrapper[0].childNodes.length;
	if(total_fields < max_fields){
		$(wrapper).append('<input type="text" name="answer[]" class="field-long" />');
	}
});
$(remove_button).click(function(e){
	e.preventDefault();
	var total_fields = wrapper[0].childNodes.length;
	if(total_fields>1){
		wrapper[0].childNodes[total_fields-1].remove();
	}
});



var members = $("#members");
var permanent = $(".permanent");
var lock = $("#lock:checked");
var temp = $(".temp");
const my = '<div class="temp row g-margin-b-50--xs">'
                            + '<div class="col-sm-6 g-margin-b-30--xs g-margin-b-0--md">'
                                +'<input type="text" class="form-control s-form-v3__input" placeholder="* Member 1">'
                            +'</div>'
                            +'<div class="col-sm-6">'
                              +'  <input type="text" class="form-control s-form-v3__input" placeholder="* Phone 1">'
                            +'</div>'
                        +'</div>';

function stringvalue(i){
	return '<div class="temp row g-margin-b-50--xs">'
                            + '<div class="col-sm-6 g-margin-b-30--xs g-margin-b-0--md">'
                                +'<input type="text" class="form-control s-form-v3__input" placeholder="* Member '+i+'">'
                            +'</div>'
                            +'<div class="col-sm-6">'
                              +'  <input type="text" class="form-control s-form-v3__input" placeholder="* Phone '+i+'">'
                            +'</div>'
                        +'</div>';
}

// alert(members.val());
$(document).ready(function(){
	members.on("change", function(e){

		e.preventDefault();
		$(".temp").remove();
		// permanent.append("<div class='temp'></div>");
		for(var i=1; i<= members.val(); i++){
			permanent.append(stringvalue(i));
		}

	});
});
	// lock.toggle();
