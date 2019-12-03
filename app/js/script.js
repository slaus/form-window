(function ($) {

    var colorNormal = "#000", //цвет нормального маркера пункта
        colorActive = "#00bcd4", //цвет активного маркера пункта
        colorDisabled = "#aaa", //цвет отключенного маркера пункта
        doorPrice = 200, //базовая цена дверей
        basePrice = 20, //базовая цена окон
        hurricanePrice = 3.4, //добавка к цене на ураганное стекло
        temperedPrice = 5, //добавка к цене на закаленное стекло

        totalPrice, //общая цена
        averageAreaRatio, //коэффициент средней площади окон и дверей
        priceRatio, //коэффициент цены
        sqFeet = $("#sq_ft"), //общая площадь окон и дверей
        windowsQty = $("#windows_qty"), //количество окон
        entranceDoors = $("#entrance_doors"), //количество дверей
        patioDoors = $("#patio_doors"), //количество задних дверей
        currency, //выбор валюты
        energy, //энергоэффективность окон и дверей
        color, //цвет окон и дверей
        glazing, //остекленение окон и дверей
        soundproof, //звукоизоляция окон и дверей
        hurricane, //ураганное стекло
        tempered; //закаленное стекло

    //коэффициент цены
    function ratio() {
        //коэффициент средней площади окон и дверей
        averageAreaRatio = parseInt(+sqFeet.val() / (+windowsQty.val() + +entranceDoors.val() + +patioDoors.val()));

        //погрешность
        if (averageAreaRatio >= 6 && averageAreaRatio < 13) {
            priceRatio = 1.02;
        } else if (averageAreaRatio >= 13 && averageAreaRatio < 30 && averageAreaRatio != 20) {
            priceRatio = 1.01;
        } else if (averageAreaRatio >= 31) {
            priceRatio = 1.005;
        } else if (averageAreaRatio == 20) {
            priceRatio = 1;
        }
        return priceRatio;
    }

    ratio();

    //общая цена
    function total() {
        currency = $(".form-control.currency:checked"),
            energy = $(".form-control.energy:checked"),
            color = $(".form-control.color:checked"),
            glazing = $(".form-control.glazing:checked"),
            soundproof = $(".form-control.soundproof:checked"),
            hurricane = $("#other-1"),
            tempered = $("#other-2");

        totalPrice = (priceRatio * +sqFeet.val() * basePrice + doorPrice * (+windowsQty.val() + +entranceDoors.val() + +patioDoors.val())) * +color.val() + +sqFeet.val() * (+energy.val() + +glazing.val() + +soundproof.val() + (+hurricane.val() / 100 * hurricanePrice + +tempered.val() / 100 * temperedPrice));
        $("#total").text(parseInt(+currency.val() * 0.92 * totalPrice, 10) + " - " + (parseInt(+currency.val() * 1.12 * totalPrice, 10)) + " " + currency.next("label").text());
    }

    total();

    //изменение параметров
    $("#sq_ft, #windows_qty, #entrance_doors, #patio_doors, .form-control.currency, .form-control.color, .form-control.energy, .form-control.glazing, .form-control.soundproof, .form-control.other").on("change input keyup keydown keypress", function () {
        total();
    });

    //активный маркер пункта
    $(".form-control.radio").each(function () {
        $(this).next("label").css({"color": colorNormal});
        $(this)[0].disabled == true ? $(this).next("label").css({"color": colorDisabled}) : $(this);
        $(this)[0].checked == true ? $(this).next("label").css({"color": colorActive}) : $(this);
    });

    //цвет заполненного окна параметров
    $(".tab-content input").on("change", function () {
        $(".form-control.radio").each(function () {
            $(this).next("label").css({"color": colorNormal});
            $(this)[0].disabled == true ? $(this).next("label").css({"color": colorDisabled}) : $(this);
            $(this)[0].checked == true ? $(this).next("label").css({"color": colorActive}) : $(this);
        });
        if ($(this).val() == "") {
            $(".wizard-footer").find("input[name=next]").prop("disabled", true);
        }
    });

    //цвет отключенного маркера пункта
    $("input[type=radio]").click(function () {
        $(this).prop("checked") ? $(this).next("label").css({"color": colorActive}) : $(this).next("label").css({"color": colorNormal});
    });

})(jQuery);