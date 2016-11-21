$(document).ready(function() {

  A109.init();
  B303.init();
  C411.init();

  obliczZYSK();

});

var A109 = {
  init: function() {
    this.mnoznik = obliczMnoznik();
    this.cena_brutto = obliczBrutto(this.cena_m2, this.powierzchnia_lokalu);
    this.roczny_czynsz = obliczCzynsz(this.cena_brutto, this.mnoznik);
    this.miesieczny_czynsz = obliczCzynszMiesieczny(this.roczny_czynsz);
  },
  type: "A109",
  liczba_pokoi: 1,
  powierzchnia_lokalu: 29,
  cena_m2: 11000,
  cena_brutto: "",
  roczny_czynsz: "",
  miesieczny_czynsz: "",
  cena_netto: 306097.56,
  img: "http://green-mountain-resort.pl/wp-content/uploads/2016/11/kalkulator-plan-A109.jpg"
}

var B303 = {
  init: function() {
    this.mnoznik = obliczMnoznik();
    this.cena_brutto = obliczBrutto(this.cena_m2, this.powierzchnia_lokalu);
    this.roczny_czynsz = obliczCzynsz(this.cena_brutto, this.mnoznik);
    this.miesieczny_czynsz = obliczCzynszMiesieczny(this.roczny_czynsz);
  },
  type: "B303",
  liczba_pokoi: 2,
  powierzchnia_lokalu: 35,
  cena_m2: 10500,
  cena_brutto: obliczBrutto(this.cena_m2, this.powierzchnia_lokalu),
  roczny_czynsz: obliczCzynsz(this.cena_brutto),
  miesieczny_czynsz: obliczCzynszMiesieczny(this.roczny_czynsz),
  cena_netto: 259349.59,
  img: "http://green-mountain-resort.pl/wp-content/uploads/2016/11/kalkulator-plan-A109.jpg"
}

var C411 = {
  init: function() {
    this.mnoznik = obliczMnoznik();
    this.cena_brutto = obliczBrutto(this.cena_m2, this.powierzchnia_lokalu);
    this.roczny_czynsz = obliczCzynsz(this.cena_brutto, this.mnoznik);
    this.miesieczny_czynsz = obliczCzynszMiesieczny(this.roczny_czynsz);
  },
  type: "C411",
  liczba_pokoi: 3,
  powierzchnia_lokalu: 48,
  cena_m2: 9000,
  cena_brutto: obliczBrutto(this.cena_m2, this.powierzchnia_lokalu),
  roczny_czynsz: obliczCzynsz(this.cena_brutto),
  miesieczny_czynsz: obliczCzynszMiesieczny(this.roczny_czynsz),
  cena_netto: 351219.51,
  img: "http://green-mountain-resort.pl/wp-content/uploads/2016/11/kalkulator-plan-A109.jpg"

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
  A109.init();
  B303.init();
  C411.init();
});

function obliczCzynsz(cenaBrutto, mnoznik) {
  obliczMnoznik();

  return cenaBrutto * mnoznik;

}

function obliczCzynszMiesieczny(rocznyCzynsz) {
  return rocznyCzynsz * 1 / 12;
}

var num;

function spacePrice(numberToString) {
  var num = numberToString.toString();

  var splitIndex = (num.length + 2) % 3 + 1;
  num = num.substr(0, splitIndex) + num.substr(splitIndex).replace(/\d\d\d/g, ' $&');

  return num;
}

function fillTextboxes(object) {

  $("#liczba-pokoi").text(object.liczba_pokoi);
  $("#powierzchnia-lokalu").html(object.powierzchnia_lokalu);
  $("#cena-m2").text(spacePrice(object.cena_m2));
  $("#cena-netto").text(spacePrice((object.cena_netto).toFixed(2)));
  $("#cena-brutto").text(spacePrice(object.cena_brutto));
  $("#roczny-czynsz").text(spacePrice((object.roczny_czynsz).toFixed(2)));
  $("#co-miesiac").text((object.miesieczny_czynsz).toFixed(2));
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

    if ($("#rodzaj-apartamentu").val() == "A109") {

      fillTextboxes(A109);

    } else if ($("#rodzaj-apartamentu").val() == "B303") {

      fillTextboxes(B303);

    } else if ($("#rodzaj-apartamentu").val() == "C411") {
      fillTextboxes(C411);
    }

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
