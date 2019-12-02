(function($) {
    $(".tab-content input").on("change", function() {
        if($(this).val() == "") {
            $(".wizard-footer").find("input[name=next]").prop("disabled", true);
        }
    });

    $("input[type=radio]").click(function() {
        if($(this).prop("checked")) {
            $(this).next("label").css({"color" : "#000"});
        }
    });

})(jQuery);