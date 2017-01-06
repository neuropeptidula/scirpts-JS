$(document).ready(function() {
	obliczObiekt(A06);
	obliczObiekt(A49);
	obliczObiekt(A111);
    obliczObiekt(B06);

    obliczZYSK();

});

function obliczObiekt(apartament) {
	apartament.mnoznik = obliczMnoznik();
    apartament.cena_brutto = obliczBrutto(apartament.cena_m2, apartament.powierzchnia_lokalu);
    apartament.cena_netto = obliczNetto(apartament.cena_brutto);
    apartament.roczny_czynsz = obliczCzynsz(apartament.cena_netto, apartament.mnoznik);
    apartament.miesieczny_czynsz = obliczCzynszMiesieczny(apartament.roczny_czynsz);
}


var A06 = {
    type: "A06",
    liczba_pokoi: 1,
    powierzchnia_lokalu: 29.58,
    cena_m2: 13509.38,
    cena_brutto: "",
    roczny_czynsz: "",
    miesieczny_czynsz: "",
    cena_netto: "",
    mnoznik: "",
    img: "/wp-content/uploads/2016/11/A06.jpg"
}


var A49 = {
    type: "A49",
    liczba_pokoi: 2,
    powierzchnia_lokalu: 47.79,
    cena_m2: 13569.82,
    cena_brutto: "",
    roczny_czynsz: "",
    miesieczny_czynsz: "",
    cena_netto: "",
    mnoznik: "",
    img: "/wp-content/uploads/2016/11/A49.jpg"
}

var A111 = {
    type: "A111",
    liczba_pokoi: 2,
    powierzchnia_lokalu: 50.97,
    cena_m2: 9637.71,
    cena_brutto: "",
    roczny_czynsz: "",
    miesieczny_czynsz: "",
    cena_netto: "",
    mnoznik: "",
    img: "/wp-content/uploads/2016/11/A111.jpg"
}

var B06 = {
    type: "B06",
    liczba_pokoi: 2,
    powierzchnia_lokalu: 41.59,
    cena_m2: 10383.10,
    cena_brutto: "",
    roczny_czynsz: "",
    miesieczny_czynsz: "",
    cena_netto: "",
    img: "/wp-content/uploads/2016/11/B06.jpg"
}



function obliczBrutto(cenaM2, powierzchniaLokalu) {
    return cenaM2 * powierzchniaLokalu;
}

var stopaZwrotu;

function obliczMnoznik() {
    if ($('#pobyt-wlascicielski').prop("checked") == true) {
        mnoznik = 0.07;
        stopaZwrotu = 7;
    } else {
        mnoznik = 0.08;
        stopaZwrotu = 8;
    };
    return mnoznik;
}

$('#pobyt-wlascicielski').change(function() {
	obliczObiekt(A06);
	obliczObiekt(A49);
	obliczObiekt(A111);
    obliczObiekt(B06);

    //obliczZYSK();
});


function obliczNetto(cenaBrutto) {
    return cenaBrutto / (1 + 0.23);
}

function obliczCzynsz(cenaNetto, mnoznik) {
    obliczMnoznik();
    return cenaNetto * mnoznik;
}

function obliczCzynszMiesieczny(rocznyCzynsz) {
    return rocznyCzynsz * 1 / 12;
}

function spacePrice(numberToString) {
    var num = numberToString.toString();

    var splitIndex = (num.length + 2) % 3 + 1;
    num = num.substr(0, splitIndex) + num.substr(splitIndex).replace(/\d\d\d/g, ' $&');

    return num;
}

function fillTextboxes(object) {

    $("#liczba-pokoi").text(object.liczba_pokoi);
    $("#powierzchnia-lokalu").html(object.powierzchnia_lokalu);
    $("#cena-netto").text(spacePrice(Math.round(object.cena_netto).toFixed(2)));
    $("#cena-brutto").text(spacePrice(Math.round(object.cena_brutto).toFixed(2)));
    $("#roczny-czynsz").text(spacePrice(Math.round(object.roczny_czynsz).toFixed(2)));
    $("#co-miesiac").text(Math.round(object.miesieczny_czynsz).toFixed(2));
    $("#result-plan-img").html("<img src='" + object.img + "' alt='plan " + object.type + "' />").fadeIn('slow');
    $("#stopa-zwrotu").text(stopaZwrotu);

}

$("#sprawdz-zysk").click(function(event) {
    event.preventDefault();
    obliczZYSK();
    setTimeout(counter_click, 100);
});

function obliczZYSK() {
    if ($("#rodzaj-apartamentu").val() != null) {
        $("#kalkulator-zysku-validation").hide('slow');
        fillTextboxes(window[$("#rodzaj-apartamentu").val()]);
    } else {
        $("#kalkulator-zysku-validation").show('slow');
    }

}


function counter_click() {
    $('.count-click').each(function() {
        console.log("przed: " + $(this).text());
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
                if ($(this).hasClass('counter-procent')) {
                    $(this).text(Math.ceil(now));
                } else {
                    $(this).text(now.toFixed(2));
                }
                $(this).removeClass('count');
            }
        });

    });

}
