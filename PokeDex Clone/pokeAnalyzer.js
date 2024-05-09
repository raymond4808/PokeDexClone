// How to commit push to GitHub for newbs via terminal
// git init
// git add .
// git commit -m "Commit message"
// git push

/*To Add: Poke number on top right of display, weakness and strength types, fancy the design, add AI reccomendation */
const searchInput= document.getElementById("search");
searchInput.addEventListener("input", filterSearch);

const pokeLoadCount = 151; //loading number for gen 1 pokemon
var pokeDex= {};
window.onload = loadDisplay();

async function loadDisplay(){ //onload loops through max pokeLoadCount to populate and load pokemon to display at the bottom
    for (let i =1; i <= pokeLoadCount; i++){
        //waits for pokiInfo to load before creating HTML elements
        await loadPokeApi(i); //test with ID1

        let pokemon = document.createElement("div");
        pokemon.id=i;
        pokemon.innerText=i.toString()+". "+ pokeDex[i]["name"].charAt(0).toUpperCase()+pokeDex[i]["name"].slice(1);
        
        pokemon.classList.add("pokeListBox");
        pokemon.addEventListener("click", updatePokeFunction); //work in progress (below) adds event listener to detect clicks to update the upper half with relative poke info
        document.getElementById("displayList").append(pokemon);

        let img = document.createElement("img");
        img.src= pokeDex[i]["img"];
        img.classList.add("pokeListThumbnail");
        pokemon.appendChild(img);
        
        //<div id="1" class="pokeListName"> <img class="pokeListThumbnail" src="API URL"> </div>
    }
    //console.log(pokeDex); //troubleshooting purposes
}



async function loadPokeApi(input){ //async function that loads pokeInfo pulled from pokeAPI to populate pokeDex object array to be used later
    let url = "https://pokeapi.co/api/v2/pokemon/" + input.toString()
    try{
        let res = await fetch(url)
        if (!res.ok){
            throw new Error('Network response was not ok.');
        }

        let pokemon = await res.json();
        let name= pokemon["name"]
        let pokeImg=pokemon["sprites"]["front_default"]
        let pokeType=pokemon["types"] 

        //document.getElementById("pokeName").innerHTML= name; //example troubleshooting comment

        res = await fetch(pokemon["species"]["url"])
        let pokeDesc= await res.json();

        pokeDex[input] = {"name": name, "img":pokeImg, "desc":pokeDesc, "types":pokeType}
    }

    catch (error) {
        console.error('Error fetching data:', error);
    } 
}

function updatePokeFunction (){ //update poke function clears existing info and updates the page with the onclicked loaded pokemon displayed in lower half
    document.getElementById("pokeImg").classList.add("pokeImgUpdated");
    document.getElementById("pokeImg").src = pokeDex[this.id]["img"];

    document.getElementById("pokeName").innerHTML= pokeDex[this.id]["name"].charAt(0).toUpperCase()+pokeDex[this.id]["name"].slice(1);
    
    document.getElementById("pokeDesc").innerHTML= pokeDex[this.id]["desc"]["flavor_text_entries"][9]["flavor_text"].replace('\f','\n'); //.replace removes the random arrows in some pokemon descriptions
    document.getElementById("pokeDesc").classList.add("pokeDesc");

    let typesDiv = document.getElementById("pokeType");
    typesDiv.innerHTML="";

    let updatedTypes= pokeDex[this.id]["types"];
    for (let i = 0; i < updatedTypes.length; i++){
        let newTypeDiv= document.createElement("span");
        newTypeDiv.classList.add("type-holder"); //adds class so we can CSS adjust to each class later
        newTypeDiv.classList.add(updatedTypes[i]["type"]["name"]);//adds class so we can CSS adjust to each class later
    
        newTypeDiv.innerText= updatedTypes[i]["type"]["name"].toUpperCase();
        typesDiv.appendChild(newTypeDiv);
    }

    //Work in progress: weakness and strengths w/ color
}

async function loadDisplayInput(input){ //onload loops through max pokeLoadCount to populate and load pokemon to display at the bottom and filters out based on input
    document.getElementById("displayList").innerHTML="";
    for (let i =1; i <= pokeLoadCount; i++){
        //waits for pokiInfo to load before creating HTML elements
        await loadPokeApi(i);

        if (pokeDex[i]["name"].match(input.toLowerCase())){
            let pokemon = document.createElement("div");
            pokemon.id=i;
            pokemon.innerText=i.toString()+". "+ pokeDex[i]["name"].charAt(0).toUpperCase()+pokeDex[i]["name"].slice(1);
            
            pokemon.classList.add("pokeListBox");
            pokemon.addEventListener("click", updatePokeFunction); //work in progress (below) adds event listener to detect clicks to update the upper half with relative poke info
            document.getElementById("displayList").append(pokemon);
    
            let img = document.createElement("img");
            img.src= pokeDex[i]["img"];
            img.classList.add("pokeListThumbnail");
            pokemon.appendChild(img);
            
            //<div id="1" class="pokeListName"> <img class="pokeListThumbnail" src="API URL"> </div>
            
        }      
    }
}


async function filterSearch(){//has blank clearing search bar issue (resolved) but search time delayed
    input= document.getElementById("search").value;
    console.log(input);//trouble shooting
    console.log(input.length);//trouble shooting

    if (input ==="" || input.length === 1){
        document.getElementById("displayList").innerHTML="";
        setTimeout(function(){loadDisplay()}, 500)
        
    }
    
    else{
        setTimeout(function(){loadDisplayInput(input)}, 1500);//adds delay timer so previous input function can all load before updating input search
    }
}

