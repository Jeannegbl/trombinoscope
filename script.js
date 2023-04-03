$cle = "Bearer CLE-GITHUB"

$( document ).ready(function() {
    function loadStudents(){
        fetch("etudiants.json", {
            headers: new Headers({"Authorization": $cle})
            })
            .then(data => data.json())
            .then(results => students_api(results.students))
    }
    loadStudents()
    
    async function students_api(students){
        for(student of students){
            await fetch("https://api.github.com/users/"+student)
                .then(data => data.json())
                .then(results => git_api(results))
    
            await fetch("https://api.github.com/users/"+student+"/followers")
                .then(data => data.json())
                .then(results => follower_api(results))
             
            await fetch("https://api.github.com/users/"+student)
                .then(data => data.json())
                .then(results => nombre_dossier(results))    
            
            await fetch("https://api.github.com/users/"+student+"/repos")
                .then(data => data.json())
                .then(results => repos_api(results))
        }
    }
    
    function git_api(results){
        let diviser = document.createElement("div");
        diviser.setAttribute('id','eleve_'+student)
        div = document.getElementById("flex").appendChild(diviser);
        div.classList.add("carte");

        let biographie = document.createElement("p");
        let follower = document.createElement("p");
        let img = document.createElement("img");
        let a = document.createElement("a");
        let url_github = document.createTextNode("");
        a.appendChild(url_github);
        a.innerHTML += results.login;
        a.href += results.html_url;
        img.src += results.avatar_url;
        follower.innerHTML += results.followers;
    
        if(results.bio == null){
            biographie.innerHTML = "Pas de biographie";
        } else {
            biographie.innerHTML += results.bio;
        }
        nom = document.getElementById('eleve_'+student).appendChild(a);
        nom.classList.add("nom");

        let div_niveau = document.createElement("div");
        div_niveau.setAttribute('id','niveau_'+student)
        niveau = document.getElementById("eleve_"+student).appendChild(div_niveau);
        div_niveau.classList.add("niveau")
        let rond_etoile = document.createElement("p");
        rond_etoile.innerHTML += "★";
        etoile = document.getElementById('niveau_'+student).appendChild(rond_etoile);
        etoile.classList.add("rond");
        
        let div_image = document.createElement("div");
        div_image.setAttribute('id','image_'+student)
        div_img = document.getElementById("eleve_"+student).appendChild(div_image);
        div_img.classList.add("div-image");
        image = document.getElementById('image_'+student).appendChild(img);
        image.classList.add("image");


        let div_biographie = document.createElement("div");
        div_biographie.setAttribute('id','bio_'+student)
        div_bio = document.getElementById("eleve_"+student).appendChild(div_biographie);
        div_bio.classList.add("champs-bio");
        bio = document.getElementById('bio_'+student).appendChild(biographie);
        bio.classList.add("bio");

        let div_fin = document.createElement("div");
        div_fin.setAttribute('id','fin_'+student)
        div_final = document.getElementById("bio_"+student).appendChild(div_fin);
        div_final.classList.add("fin");

        abonnee = document.getElementById('fin_'+student).appendChild(follower);
        abonnee.classList.add("abonnee");

        let fleche_block = document.createElement("p");
        fleche_block.setAttribute('id','abonnee_'+student);
        fleche_block.setAttribute("onclick", `openAbonnee('${student}')`);
        fleche = document.getElementById("fin_"+student).appendChild(fleche_block);
        fleche_block.classList.add("fleche")
        fleche_block.innerHTML += "▼";

        let div_abonnee = document.createElement("div");
        div_abonnee.setAttribute('id','liste-abonnee_'+student)
        div__liste_abonnee = document.getElementById("fin_"+student).appendChild(div_abonnee);
        div__liste_abonnee.classList.add("liste-abonnee-div");
        return results
    }
    
    function nombre_dossier(results){
        let repository = document.createElement("p");
        repository.innerHTML += results.public_repos;
    
        dossier = document.getElementById('fin_'+student).appendChild(repository);
        dossier.classList.add("dossier");

        let fleche_block = document.createElement("p");
        fleche_block.setAttribute('id','dossier');
        fleche_block.setAttribute("onclick", `openDossier('${student}')`);
        fleche = document.getElementById("fin_"+student).appendChild(fleche_block);
        fleche_block.classList.add("fleche")
        fleche_block.innerHTML += "▼";

        let div_dossier = document.createElement("div");
        div_dossier.setAttribute('id','liste-dossier_'+student)
        div__liste_dossier = document.getElementById("fin_"+student).appendChild(div_dossier);
        div__liste_dossier.classList.add("liste-dossier-div");
    }
    
    function follower_api(results){
        for(i=0; i<results.length; i++){
            let a = document.createElement("a");
            let url_github = document.createTextNode("");
            a.appendChild(url_github);
            a.innerHTML += results[i].login;
            a.href += results[i].html_url;
            abonnee = document.getElementById('liste-abonnee_'+student).appendChild(a);
            abonnee.classList.add("liste-abonnee");
        }
    }
    
    function repos_api(results){
        for(i=0; i<results.length; i++){
            let a = document.createElement("a");
            let url_github = document.createTextNode("");
            a.appendChild(url_github);
            a.innerHTML += results[i].name;
            a.href += results[i].html_url;
            dossier = document.getElementById('liste-dossier_'+student).appendChild(a);
            dossier.classList.add("liste-dossier");
        }
    }
});
function openAbonnee(results) {
    let close = document.createElement("p");
    close.innerHTML = "X";
    close.classList.add("close");
    close.setAttribute("onclick", `closeAbonnee('${results}')`);
    close.setAttribute('id','close_'+results);
    document.getElementById("liste-abonnee_"+results).style.display = "flex";
    document.getElementById("liste-abonnee_"+results).appendChild(close);
}

function closeAbonnee(results) {
    console.log(results)
    document.getElementById("liste-abonnee_"+results).style.display = "none";
    bouton = document.getElementById("close_"+results);
    bouton.remove();
}

function openDossier(results) {
    let close = document.createElement("p");
    close.innerHTML = "X";
    close.classList.add("close");
    close.setAttribute("onclick", `closeDossier('${results}')`);
    close.setAttribute('id','close_'+results);
    document.getElementById("liste-dossier_"+results).appendChild(close);
    document.getElementById("liste-dossier_"+results).style.display = "flex";
}

function closeDossier(results) {
    document.getElementById("liste-dossier_"+results).style.display = "none";
    let bouton = document.getElementById("close_"+results);
    bouton.remove();
};