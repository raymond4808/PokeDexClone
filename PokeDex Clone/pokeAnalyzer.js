// How to commit push to GitHub for newbs via terminal
// git init
// git add .
// git commit -m "Commit message"
// git push

const pokeLoadCount = 20; //temp loading number
var pokeDex= {};

window.onload = async function(){

    for (let i =1; i <= pokeLoadCount; i++){
        await loadPokeApi(i); //test with ID1

        let pokemon = document.createElement("div");
        pokemon.id=i;
        pokemon.innerText=i.toString()+". "+ pokeDex[i]["name"].charAt(0).toUpperCase()+pokeDex[i]["name"].slice(1);
        
        pokemon.classList.add("pokeListBox");
        pokemon.addEventListener("click", updatePokeFunction); //work in progress (below)
        document.getElementById("displayList").append(pokemon);

        let img = document.createElement("img");
        img.src= pokeDex[i]["img"];
        img.classList.add("pokeListThumbnail");
        pokemon.appendChild(img);
        //<div id="1" class="pokeListName"> <img class="pokeListThumbnail" src="API URL"> </div>

    }
    console.log(pokeDex); 
}

async function loadPokeApi(input){
    let url = "https://pokeapi.co/api/v2/pokemon/" + input.toString()
    try{
        let res = await fetch(url)
        if (!res.ok){
            throw new Error('Network response was not ok.');
        }

        let pokemon = await res.json();
        let name= pokemon["name"]
        let pokeImg=pokemon["sprites"]["front_default"]

        //document.getElementById("pokeName").innerHTML= name;
        //document.getElementById("pokeImg").src = pokeImg;
        

        res = await fetch(pokemon["species"]["url"])
        let pokeDesc= await res.json();

        //pokeDesc = pokeDesc["flavor_text_entries"][8]["flavor_text"]
        //document.getElementById("pokeDesc").innerHTML = pokeDesc;

        pokeDex[input] = {"name": name, "img":pokeImg, "desc":pokeDesc}
    }

    catch (error) {
        console.error('Error fetching data:', error);
    } 
}

function updatePokeFunction (){
    document.getElementById("pokeImg").src = pokeDex[this.id]["img"];
    document.getElementById("pokeName").innerHTML= pokeDex[this.id]["name"].charAt(0).toUpperCase()+pokeDex[this.id]["name"].slice(1);
    document.getElementById("pokeDesc").innerHTML= pokeDex[this.id]["desc"]["flavor_text_entries"][8]["flavor_text"]
    //add more needs type, weakness and strengths w/ color, background color update on click
}