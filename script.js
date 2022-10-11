function loadStudents(){
    fetch("etudiants.json", {
        headers: new Headers({"Authorization": "Bearer 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"})
        })
        .then(data => data.json())
        .then(results => students_api(results.students))
}
loadStudents()

async function students_api(students){
    let response = await fetch('etudiants.json');
    await response.json();
    for(student of students){
        fetch("https://api.github.com/users/"+student+"", {
        headers: new Headers({"Authorization": "Bearer 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"})
        })
            .then(data => data.json())
            .then(results => git_api(results))

        fetch("https://api.github.com/users/"+student+"/followers", {
        headers: new Headers({"Authorization": "Bearer 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"})
        })
            .then(data => data.json())
            .then(results => follower_api(results))
         
        fetch("https://api.github.com/users/"+student+"", {
        headers: new Headers({"Authorization": "Bearer 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"})
        })
            .then(data => data.json())
            .then(results => nombre_dossier(results))    
        
        fetch("https://api.github.com/users/"+student+"/repos", {
        headers: new Headers({"Authorization": "Bearer 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"})
        })
            .then(data => data.json())
            .then(results => repos_api(results))
    }
}

function git_api(results){
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
    image = document.getElementById("eleve").appendChild(img);
    image.classList.add("image");
    nom = document.getElementById("eleve").appendChild(a);
    nom.classList.add("nom");
    bio = document.getElementById("eleve").appendChild(biographie);
    bio.classList.add("bio");
    abonnee = document.getElementById("eleve").appendChild(follower);
    abonnee.classList.add("abonnee");
}

function nombre_dossier(results){
    let repository = document.createElement("p");
    repository.innerHTML += results.public_repos;

    dossier = document.getElementById("eleve").appendChild(repository);
    dossier.classList.add("dossier");
}

function follower_api(results){
    for(i=0; i<results.length -1; i++){
        let a = document.createElement("a");
        let url_github = document.createTextNode("");
        a.appendChild(url_github);
        a.innerHTML += results[i].login;
        a.href += results[i].html_url;
        abonnee = document.getElementById("eleve").appendChild(a);
        abonnee.classList.add("liste-abonnee");
    }
    for(i=results.length -1; i<results.length; i++){
        let a = document.createElement("a");
        let url_github = document.createTextNode("");
        a.appendChild(url_github);
        a.innerHTML += results[i].login;
        a.href += results[i].html_url;
        abonnee = document.getElementById("eleve").appendChild(a);
        abonnee.classList.add("liste-abonnee");
    }
}

function repos_api(results){
    if(results.length >= 3){
        for(i=0; i<2; i++){
            let a = document.createElement("a");
            let url_github = document.createTextNode("");
            a.appendChild(url_github);
            a.innerHTML += results[i].name;
            a.href += results[i].html_url;
            dossier = document.getElementById("eleve").appendChild(a);
            dossier.classList.add("liste-projet");
        }
        for(i=2; i<3; i++){
            let div = document.createElement("div");
            let a = document.createElement("a");
            let url_github = document.createTextNode("");
            a.appendChild(url_github);
            a.innerHTML += results[i].name;
            a.href += results[i].html_url;
            dossier = document.getElementById("eleve").appendChild(a);
            dossier.classList.add("liste-projet");
            separation = document.getElementById("eleve").appendChild(div);
            separation.classList.add("separation");
        }
    }else if(results.length == 2){
        for(i=0; i<1; i++){
            let a = document.createElement("a");
            let url_github = document.createTextNode("");
            a.appendChild(url_github);
            a.innerHTML += results[i].name;
            a.href += results[i].html_url;
            dossier = document.getElementById("eleve").appendChild(a);
            dossier.classList.add("liste-projet");
        }
        for(i=1; i<2; i++){
            let div = document.createElement("div");
            let a = document.createElement("a");
            let url_github = document.createTextNode("");
            a.appendChild(url_github);
            a.innerHTML += results[i].name;
            a.href += results[i].html_url;
            dossier = document.getElementById("eleve").appendChild(a);
            dossier.classList.add("liste-projet");
            separation = document.getElementById("eleve").appendChild(div);
            separation.classList.add("separation");
        }
    }else{
        for(i=0; i<1; i++){
            let div = document.createElement("div");
            let a = document.createElement("a");
            let url_github = document.createTextNode("");
            a.appendChild(url_github);
            a.innerHTML += results[i].name;
            a.href += results[i].html_url;
            dossier = document.getElementById("eleve").appendChild(a);
            dossier.classList.add("liste-projet");
            separation = document.getElementById("eleve").appendChild(div);
            separation.classList.add("separation");
        }
    }
    
}