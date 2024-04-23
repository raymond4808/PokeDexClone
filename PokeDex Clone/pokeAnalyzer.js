
const pokeLoadCount =100;
var pokeDex= {};

window.onload = async function(){

    for (let i =1; i <= pokeLoadCount; i++){
        await loadPokeApi(i); //test with ID1

        let pokemon = document.createElement("div");
        pokemon.id=i;
        pokemon.innerText=i.toString()+". "+ pokeDex[i]["name"].charAt(0).toUpperCase()+pokeDex[i]["name"].slice(1);
        
        pokemon.classList.add("pokeListBox");
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

        document.getElementById("pokeName").innerHTML= name;
        document.getElementById("pokeImg").src = pokeImg;
        

        res = await fetch(pokemon["species"]["url"])
        let pokeDesc= await res.json();

        pokeDesc = pokeDesc["flavor_text_entries"][8]["flavor_text"]
        document.getElementById("pokeDesc").innerHTML = pokeDesc;

        pokeDex[input] = {"name": name, "img":pokeImg, "desc":pokeDesc}
    }

    catch (error) {
        console.error('Error fetching data:', error);
    }


    
    
    
}