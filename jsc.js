const dodaj = document.querySelector(".dodajKnjigu");
const pozadina = document.querySelector(".overlay");
const unos = document.querySelector(".unos");
//ovde cemo cuvati knjige i izbacivati ih na stranicu
const biblioteka = [];
//funkcija KONSTRUKTOR KNJIGE   
function Knjiga(naslov,pisac){
    this.naslov = naslov;
    this.pisac = pisac;
    this.procitano = false;
}

//ovo je funkcija za brisanje
const obrisi = ()=>{
    let izbrisi = document.querySelectorAll(".delete");
    for(let i=0; i < izbrisi.length; i++){
        izbrisi[i].addEventListener("click", event=>{
        let najblizi = event.target.closest(".card");
        najblizi.remove();
        })
    }  
}

//za pojavljivanje i zatvaranje prozora za upis naziva knjige
dodaj.addEventListener("click", ()=>{
    pozadina.style.display = "block";
    unos.style.display = "block";
    const izadji = document.querySelector(".x");
    izadji.addEventListener("click", ()=>{
        pozadina.style.display = "none";
        unos.style.display = "none";
    })
})
//ovo je funkcija za prikazivanje PORUKE
const handleProcitano = function () {
    const readBtns = document.querySelectorAll(".read");
    readBtns.forEach((dugme) => {
        dugme.addEventListener("click", () => {         
            const porukica = dugme.closest(".card").querySelector(".poruka");
            let localProcitano = !procitano;
            switch (localProcitano) {
                case true:
                    porukica.textContent = 'Procitali ste';
                    console.log(procitano);
                    break;
                case false:
                    porukica.textContent = "Niste procitali";
                    console.log(procitano);
                    break;
                default:
                    console.log('ok');
                    break;
            }
            procitano = !procitano;
        });
    });
};

//za unos knjige u niz BIBLIOTEKA
const kartice = document.querySelector(".cards");
const unesi = document.querySelector(".unesiKnjigu");
    unesi.addEventListener("click", ()=>{
        const naslov = document.querySelector("#knjiga");
        const pisac = document.querySelector("#pisac");
        const porukaGreska = document.querySelector(".greska");
        if(naslov.value && pisac.value){
            pozadina.style.display = "none";
            unos.style.display = "none";
            const novaKnjiga = new Knjiga(naslov.value,pisac.value);
            biblioteka.push(novaKnjiga);
            //ovde pravimo novu karticu i unosimo na stranicu
            for(let i=0; i<biblioteka.length; i++){
                const book = biblioteka[i];
                console.log(book);
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `
                <h3>${book.pisac}</h3>
                <p class="naslov"><b>${book.naslov}</b> </p>
                <div class="dugmici">
                    <button class="delete">Izbrisi</button>
                    <button class="read">Procitano</button>
                </div>
                <p class="poruka">Niste procitali</p>
                `;
                kartice.appendChild(card);
                obrisi();
                handleProcitano();
            }
            biblioteka.pop();
            pisac.value = '';
            naslov.value = '';
            porukaGreska.style.display = "none";    
        }else{
            porukaGreska.style.display = "block";
        } 
    })

