/*
JS for poke search bar that updates the search input live and updates the display row of pokemon
*/
const searchInput = document.getElementById("search").addEventListener("input", filterSearch);
let timeoutId; //used for live update search bar

async function filterSearch(){
    input= document.getElementById("search").value.trim();
    // console.log(input);//trouble shooting
    // console.log(input.length);//trouble shooting

    clearTimeout(timeoutId); //clears the loadDisplayInput function if search input is updated

    if (input.length === 0) {
        loadDisplayInput('');
    }
    else {//adds delay timer so previous input function can all load before updating input search
        timeoutId = setTimeout(async function() {await loadDisplayInput(input);}, 1000);
    }
    
}

/*
    if (input ===""){
        document.getElementById("displayList").innerHTML="";
        setTimeout(function(){loadDisplay()}, 200)
        
    }
    
    else{
         setTimeout(function(){loadDisplayInput(input)}, 500);
    }
*/