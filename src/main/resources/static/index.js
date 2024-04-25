function KjopBillett(){

    let feilAntall = $("#tom-antall");
    let feilFornavn = $("#tom-fornavn");
    let feilEtternavn = $("#tom-etternavn");
    let feilTelefonnr = $("#tom-telefonnr");
    let feilEpost = $("#tom-epost");

    const billett ={
        film : $("#film").val(),
        antall : $("#antall").val(),
        fornavn : $("#fornavn").val(),
        etternavn : $("#etternavn").val(),
        telefonnr : $("#telefonnr").val(),
        epost : $("#epost").val()
    };

    if (billett.antall === "") { feilAntall.html( "Må skrive noe i antall") }
    else {feilAntall.html("")}
    if (billett.fornavn === "") { feilFornavn.html("Må skrive noe i fornavn") }
    else {feilFornavn.html("")}
    if (billett.etternavn === "") { feilEtternavn.html("Må skrive noe i etternavn") }
    else {feilEtternavn.html("")}
    if (billett.telefonnr === "") { feilTelefonnr.html("Må skrive telefonnummer") }
    else {feilTelefonnr.html("")}
    if (billett.epost === "") { feilEpost.html("Må skrive noe i epost") }
    else {feilEpost.html("")}

    if (billett.fornavn !== "" && billett.etternavn !== "" && billett.telefonnr !== "" && billett.epost !== ""){

        $.post("/lagre",billett, function (){
            hentAlle();
        })

        $("#film").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
    }
}

function hentAlle(){
    $.get("/hentAlle", function (data){
        formaterData(data);
    })
}

function formaterData(billetter){
    let ut = "<table class='table table-striped'><tr>"+
        "<th>Film</th>"+
        "<th>Antall</th>"+
        "<th>Fornavn</th>"+
        "<th>Etternavn</th>"+
        "<th>Telefonnr</th>"+
        "<th>Epost</th>"+
        "</tr>";
    for(let billett of billetter){
        ut += "<tr>";
        ut += "<td>"+billett.film+"</td><td>"+billett.antall+"</td><td>"+billett.fornavn+"</td><td>"+
            billett.etternavn+"</td><td>"+billett.telefonnr+"</td><td>"+billett.epost+"</td>";
        ut += "</tr>";
    }
    ut += "</table>";
    $("#output").html(ut);
}

function SlettAlle(){
    const slett = confirm("Ønsker du å slette bilettene?");
    if (slett){
        $.get("/slettAlle", function (){
            hentAlle();
        })
    }
}