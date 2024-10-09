const tuval = document.getElementById('clockCanvas');
const cizim = tuval.getContext('2d');
const yaricap = tuval.height / 2;

cizim.translate(yaricap, yaricap);

function saatCiz() {
    yuzeyCiz(cizim, yaricap);
    rakamlariCiz(cizim, yaricap);
    zamanCiz(cizim, yaricap);
}

function yuzeyCiz(cizim, yaricap) {
    let aci;
    cizim.beginPath();
    cizim.arc(0, 0, yaricap, 0, 2 * Math.PI);
    cizim.fillStyle = 'white';
    cizim.fill();

    cizim.strokeStyle = '#333';
    cizim.lineWidth = yaricap * 0.1;
    cizim.stroke();

    cizim.beginPath();
    cizim.arc(0, 0, yaricap * 0.1, 0, 2 * Math.PI);
    cizim.fillStyle = '#333';
    cizim.fill();

    // Saat çizgileri
    for (let sayi = 0; sayi < 60; sayi++) {
        aci = sayi * Math.PI / 30;
        cizim.lineWidth = sayi % 5 === 0 ? yaricap * 0.03 : yaricap * 0.01;
        cizim.beginPath();
        cizim.rotate(aci);
        cizim.moveTo(0, -yaricap * 0.9);
        cizim.lineTo(0, sayi % 5 === 0 ? -yaricap * 0.85 : -yaricap * 0.88);
        cizim.stroke();
        cizim.rotate(-aci);
    }
}

function rakamlariCiz(cizim, yaricap) {
    let aci;
    cizim.font = yaricap * 0.1 + "px arial";
    cizim.textBaseline = "middle";
    cizim.textAlign = "center";

    for(let sayi = 1; sayi <= 24; sayi++){
        aci = sayi * Math.PI / 12;
        cizim.rotate(aci);
        cizim.translate(0, -yaricap * 0.75);
        cizim.rotate(-aci);
        cizim.fillText(sayi.toString(), 0, 0);
        cizim.rotate(aci);
        cizim.translate(0, yaricap * 0.75);
        cizim.rotate(-aci);
    }
}

function zamanCiz(cizim, yaricap) {
    const simdikiZaman = new Date();
    let saat = simdikiZaman.getHours();
    let dakika = simdikiZaman.getMinutes();
    let saniye = simdikiZaman.getSeconds();

    // saat
    saat = saat % 24;
    saat = (saat * Math.PI / 12) + (dakika * Math.PI / (12 * 60)) + (saniye * Math.PI / (12 * 60 * 60));
    akrepCiz(cizim, saat, yaricap * 0.5, yaricap * 0.07);

    // dakika
    dakika = (dakika * Math.PI / 30) + (saniye * Math.PI / (30 * 60));
    akrepCiz(cizim, dakika, yaricap * 0.8, yaricap * 0.07);

    // saniye
    saniye = (saniye * Math.PI / 30);
    akrepCiz(cizim, saniye, yaricap * 0.9, yaricap * 0.02);
}

function akrepCiz(cizim, pozisyon, uzunluk, genislik) {
    cizim.beginPath();
    cizim.lineWidth = genislik;
    cizim.lineCap = "round";
    cizim.moveTo(0,0);
    cizim.rotate(pozisyon);
    cizim.lineTo(0, -uzunluk);
    cizim.stroke();
    cizim.rotate(-pozisyon);
}

setInterval(saatCiz, 1000);
