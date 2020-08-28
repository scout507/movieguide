
function getMovieID()
{
    activateSection("sresult");
    deactivateSection("actor");
    document.getElementById("hcon").style.height = "1085px";
    var search = document.getElementById("input").value
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)          
            var res = JSON.parse(this.responseText);
            if(res.total_results != "0"){
                activateSection("infoholder");
                deactivateSection("error");
                getMovieDetails(res.results[0].title);
                getPictures(res.results[0].id);
                getSimilar(res.results[0].id, false);
                getCast(res.results[0].id);
                getwikiPageID(res.results[0].title);
                getNYT(res.results[0].title);
            }   
            else{
                deactivateSection("infoholder");
                activateSection("error");
                document.getElementById("errortxt").innerHTML = "Sorry, no results found for '" + search + "'."; 
            }                  
    }
    xmlHttp.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=25353f15b0bb88873d05bbb97c16a4b4&language=en-US&query=" + search + "&include_adult=false");
    xmlHttp.send();
}

function getMovieDetails(name){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var res = JSON.parse(this.responseText);
            var display = "" + res.Title + " (" + res.Year + ")";
            var info = "" + res.Genre + " | " + res.Runtime + " | imdb: " + res.imdbRating + "/10";
            document.getElementById("sinfo").innerHTML = info;
            document.getElementById("result").innerHTML = display;
            var dirarr = res.Director.split(",");
            document.getElementById("director").innerHTML = dirarr[0];

    }
    xmlHttp.open("GET", "https://www.omdbapi.com/?apikey=9991cf93&t=" + name);
    xmlHttp.send();
}

function getPictures(id){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var res = JSON.parse(this.responseText);
            document.getElementById("trailer").src = "https://image.tmdb.org/t/p/original" + res.poster_path;
            var background = "https://image.tmdb.org/t/p/original" + res.backdrop_path;
            document.getElementById("plot").innerHTML = res.overview;
            document.getElementById("sresult").style.backgroundImage = "url('" + background +  "')";
    }
    xmlHttp.open("GET", "https://api.themoviedb.org/3/movie/" + id + "?api_key=25353f15b0bb88873d05bbb97c16a4b4&language=en-US");
    xmlHttp.send();
}



function getSimilar(id, type){
    // type 0 = movie, type 1 = actor, type 2 = director.
    activateSection("portfolio");
    fixAnim();
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var res = JSON.parse(this.responseText);
            if(res.total_results == "0") deactivateSection("portfolio");
            document.getElementById("movimg1").src = "https://image.tmdb.org/t/p/original" + res.results[0].poster_path;
            document.getElementById("movname1").innerHTML = res.results[0].title;
            document.getElementById("rdesc-1").innerHTML = res.results[0].overview;
            document.getElementById("movimg2").src = "https://image.tmdb.org/t/p/original" + res.results[1].poster_path;
            document.getElementById("movname2").innerHTML = res.results[1].title;
            document.getElementById("rdesc-2").innerHTML = res.results[1].overview;
            document.getElementById("movimg3").src = "https://image.tmdb.org/t/p/original" + res.results[2].poster_path;
            document.getElementById("movname3").innerHTML = res.results[2].title;
            document.getElementById("rdesc-3").innerHTML = res.results[2].overview;
            document.getElementById("movimg4").src = "https://image.tmdb.org/t/p/original" + res.results[3].poster_path;
            document.getElementById("movname4").innerHTML = res.results[3].title;
            document.getElementById("rdesc-4").innerHTML = res.results[3].overview;
            document.getElementById("movimg5").src = "https://image.tmdb.org/t/p/original" + res.results[4].poster_path;
            document.getElementById("movname5").innerHTML = res.results[4].title;
            document.getElementById("rdesc-5").innerHTML = res.results[4].overview;
            document.getElementById("movimg6").src = "https://image.tmdb.org/t/p/original" + res.results[5].poster_path;
            document.getElementById("movname6").innerHTML = res.results[5].title;
            document.getElementById("rdesc-6").innerHTML = res.results[5].overview;
    }
    if(type == 0) xmlHttp.open("GET", "https://api.themoviedb.org/3/movie/" + id + "/similar?api_key=25353f15b0bb88873d05bbb97c16a4b4&language=en-US&page=1");
    else if(type == 1) xmlHttp.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=25353f15b0bb88873d05bbb97c16a4b4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_cast=" + id);
    else xmlHttp.open("GET", " https://api.themoviedb.org/3/discover/movie?api_key=25353f15b0bb88873d05bbb97c16a4b4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_crew=" + id);
    xmlHttp.send();
}

function searchFromRelated(nbr){
    activateSection("sresult");
    deactivateSection("actor");
    var id = "movname" + nbr;
    var search = document.getElementById(id).innerHTML;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var res = JSON.parse(this.responseText);
            getSimilar(res.results[0].id, 0);
            getPictures(res.results[0].id);
            getMovieDetails(search);
            getCast(res.results[0].id);
            getwikiPageID(search);
            getNYT(search);
                
    }
    xmlHttp.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=25353f15b0bb88873d05bbb97c16a4b4&language=en-US&query=" + search + "&include_adult=false");
    xmlHttp.send();
}

function getWiki(name, type){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var res = JSON.parse(this.responseText);
            if(type == 0) document.getElementById("wikiinfo").innerHTML = res.query.pages[0].extract;
            else document.getElementById("actorwiki").innerHTML = res.query.pages[0].extract;
    }
    if(type !=0) xmlHttp.open("GET", "https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&format=json&formatversion=2&indexpageids&exintro=&titles=" + name);
    else {
        xmlHttp.open("GET", "https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&pageids="+ name +"&format=json&formatversion=2&exintro");
    }
    xmlHttp.send();
}

function searchActor(actor, type){
    activateSection("actor");
    var name = document.getElementById(actor).innerHTML;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var res = JSON.parse(this.responseText);
            if(type!=3) getSimilar(res.results[0].id, type);
            getWiki(name,1);
            document.getElementById("actorimage").src = "https://image.tmdb.org/t/p/original" + res.results[0].profile_path;
            document.getElementById("actorname").innerHTML = name;
    }
    xmlHttp.open("GET", "https://api.themoviedb.org/3/search/person?api_key=25353f15b0bb88873d05bbb97c16a4b4&language=en-US&query=" + name + "&page=1&include_adult=false");
    xmlHttp.send();
}

function activateSection(id){
    var x = document.getElementById(id);
    x.style.display = "block";
}

function deactivateSection(id){
    var x = document.getElementById(id);
    x.style.display = "none";
}

function getCast(id){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var res = JSON.parse(this.responseText);
            document.getElementById("cast1").innerHTML = res.cast[0].name;
            document.getElementById("cast2").innerHTML = res.cast[1].name;
            document.getElementById("cast3").innerHTML = res.cast[2].name;
            document.getElementById("cast4").innerHTML = res.cast[3].name;
            document.getElementById("cast5").innerHTML = res.cast[4].name;
            document.getElementById("cast6").innerHTML = res.cast[5].name;

        res.crew.forEach(pep => {
            if(pep.job == "Original Music Composer"){
                document.getElementById("music").innerHTML = pep.name;
                return;
            }       
        });

    }
    xmlHttp.open("GET", "https://api.themoviedb.org/3/movie/" + id +"/credits?api_key=25353f15b0bb88873d05bbb97c16a4b4");
    xmlHttp.send();
}

function getNYT(name){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var res = JSON.parse(this.responseText);
            document.getElementById("review").innerHTML = res.results[0].summary_short;
            document.getElementById("nytlink").href = res.results[0].link.url;
    }
    xmlHttp.open("GET", "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + name + "&api-key=U2dI1CvYOVgIrIonI26ychy0j8BmN07S");
    xmlHttp.send();
}


function getwikiPageID(name){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var res = JSON.parse(this.responseText);
            var pid = res.query.search[0].pageid;
            getWiki(pid, 0);
    }
    xmlHttp.open("GET", "https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srsearch="+ name + "+incategory:English-language_films");
    xmlHttp.send();
}

function fixAnim(){
    //console.log("hallo");
    //this.window.resizeTo(screen.width-300,screen.height-500); 
}