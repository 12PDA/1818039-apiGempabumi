const ApiKey = "";
const baseUrl = "https://data.bmkg.go.id/DataMKG/TEWS/";
const siteUrl = "https://peta-maritim.bmkg.go.id/public_api/pelabuhan/";
const gempaTerkini = `${baseUrl}gempaterkini.json`;
const gempaDirasa = `${baseUrl}gempadirasakan.json`;

const title = document.querySelector(".card-title");

const contents = document.querySelector("#content-list");

function getListTerkini() {
    title.innerHTML = "<p align='center'>Gempabumi Terkini (M > 5.0)</p>"
    fetch(gempaTerkini)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.Infogempa.gempa);
            let terkini = "";
            resJson.Infogempa.gempa.forEach(kini => {
                terkini += `         
                    <tbody>
                        <tr>
                            <td>${kini.Tanggal}</td>
                            <td>${kini.Jam}</td>
                            <td>${kini.Magnitude}</td>
                            <td>${kini.Kedalaman}</td>
                            <td>${kini.Wilayah}</td>
                        </tr>
                    </tbody>
                `
            });
            contents.innerHTML = 
            '<table> <thead> <tr> <th>Tanggal</th><th>Jam</th><th>Magnitudo</th><th>Kedalaman</th><th>Wilayah</th></tr></thead>' + terkini + '</table>'
        })
}

function getListDirasakan() {
    title.innerHTML = "<p align='center'>Gempabumi yang Dirasakan</p>"
    fetch(gempaDirasa)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.Infogempa.gempa);
            let dirasa = "";
            resJson.Infogempa.gempa.forEach(rasa => {
                dirasa += `         
                    <tbody>
                        <tr>
                            <td>${rasa.Tanggal}</td>
                            <td>${rasa.Jam}</td>
                            <td>${rasa.Magnitude}</td>
                            <td>${rasa.Kedalaman}</td>
                            <td>${rasa.Wilayah}</td>
                            <td>${rasa.Lintang}</td>
                            <td>${rasa.Dirasakan}</td>
                        </tr>
                    </tbody>
                `
            });

            contents.innerHTML = 
            '<table> <thead> <tr> <th>Tanggal</th><th>Jam</th><th>Magnitudo</th><th>Kedalaman</th><th>Wilayah</th><th>Lintang</th><th>Dirasakan</th></tr></thead>' + dirasa + '</table>'
        })
}


function loadPage(halaman) {
    switch (halaman) {
        case "terkini":
            getListTerkini();
            break;
        case "dirasakan":
            getListDirasakan();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    
    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })

    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "terkini";
    loadPage(page);

});