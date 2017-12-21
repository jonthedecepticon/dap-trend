$(document).ready(function() {
    var max_fields      = 20; //maximum input boxes allowed
    var wrapper         = $(".input_fields_wrap"); //Fields wrapper
    var add_button      = $(".add_field_button"); //Add button ID
    
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div><input class="col-xs-12" type="text" name="linkTwoNameFromView" placeholder="Link Display Word" ng-model="linkTwoNameFromView"/></div>'); //add input box
            $(wrapper).append('<div><input class="col-xs-12" type="text" name="linkTwoWebsiteFromView" placeholder="Link URL" ng-model="linkTwoWebsiteFromView"/></div>'); //add input box
        }
    });
});
