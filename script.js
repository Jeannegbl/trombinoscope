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
        div.classList.add("fiche");
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
            biographie.innerHTML = "Pas de bio";
        } else {
            biographie.innerHTML += results.bio;
        }
        image = document.getElementById('eleve_'+student).appendChild(img);
        image.classList.add("image");
        nom = document.getElementById('eleve_'+student).appendChild(a);
        nom.classList.add("nom");
        bio = document.getElementById('eleve_'+student).appendChild(biographie);
        bio.classList.add("bio");
        abonnee = document.getElementById('eleve_'+student).appendChild(follower);
        abonnee.classList.add("abonnee");
        return results
    }
    
    function nombre_dossier(results){
        let repository = document.createElement("p");
        repository.innerHTML += results.public_repos;
    
        dossier = document.getElementById('eleve_'+student).appendChild(repository);
        dossier.classList.add("dossier");
    }
    
    function follower_api(results){
        for(i=0; i<results.length; i++){
            let a = document.createElement("a");
            let url_github = document.createTextNode("");
            a.appendChild(url_github);
            a.innerHTML += results[i].login;
            a.href += results[i].html_url;
            abonnee = document.getElementById('eleve_'+student).appendChild(a);
            abonnee.classList.add("liste-abonnee");
        }
    }
    
    function repos_api(results){
        if(results.length >= 3){
            for(i=0; i<3; i++){
                let a = document.createElement("a");
                let url_github = document.createTextNode("");
                a.appendChild(url_github);
                a.innerHTML += results[i].name;
                a.href += results[i].html_url;
                dossier = document.getElementById('eleve_'+student).appendChild(a);
                dossier.classList.add("liste-projet");
            }
            let div = document.createElement("div");
            separation = document.getElementById('eleve_'+student).appendChild(div);
            separation.classList.add("separation");
        }else{
            for(i=0; i<results.length; i++){
                let a = document.createElement("a");
                let url_github = document.createTextNode("");
                a.appendChild(url_github);
                a.innerHTML += results[i].name;
                a.href += results[i].html_url;
                dossier = document.getElementById('eleve_'+student).appendChild(a);
                dossier.classList.add("liste-projet");
            }
            let div = document.createElement("div");
            separation = document.getElementById('eleve_'+student).appendChild(div);
            separation.classList.add("separation");
        }
    }
});