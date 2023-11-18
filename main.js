 const tileContainer = document.querySelector(".tiles");//defines constant for tile container
 const colours = ["aqua", "aquamarine", "gold", "blue", "crimson", "dodgerblue", "greenyellow", "teal"];//defines constants for colors
 const coloursPicklist = [...colours, ...colours];//creates an array containing two elements beings a coppy of the array colors
 const tileCount = coloursPicklist.length;//how many tiles there are

 //game state
 let revealedCount = 0;//sets number of revealed tiles be zero
 let activeTile = null;//the tile that the user has just flipped is null while looking for the next tile
 let awaitingEndOfMove = false;//when true waiting for the player to make their move

function buildTile(colour){//funtion to make a tile 
    const element = document.createElement("div");//creates a div

    element.classList.add("tile");//class list allows you tointeract wiht a list of classes on an element. .add adds the tile element 
    element.setAttribute("data-colour", colour);//sets data-colour attribute of the element to be the colour that we pass
    element.setAttribute("data-revealed", "false");//when a tile is first created it is not revealed

    element.addEventListener("click", () =>{//event happens when tile is clicked
        const revealed = element.getAttribute("data-revealed");

        if(awaitingEndOfMove//if we are awaiting the end of a move
            || revealed === "true"// or if a tile is already flipped
            || element === activeTile){//or if you try and match a tile with itself
            return;//exit function at this line
        }

        element.style.backgroundColor = colour;//changes the colour of the tiles when clicked

        if (!activeTile){//if there is no active tile 
            activeTile = element;//active tile is current tile

            return;
        }

        const colourToMatch = activeTile.getAttribute("data-colour");//gets attribute of colour to see if they match

        if (colourToMatch === colour){
            activeTile.setAttribute("data-revealed", "true");//flags the active tile as revealed
            element.setAttribute("data-revealed", "true");//flags second tile as revealed

            awaitingEndOfMove = false;//restart, base setting
            activeTile = null;//restart, base setting
            revealedCount += 2;//adds 2 to number of revealed counters

            if(revealedCount === tileCount){//win conditions
                alert("You win! Refresh to play again");
            }

            return;
        }


        awaitingEndOfMove = true;//prevents other tiles from being clicked

        setTimeout(()=> {//waits 1 second for the tiles to be flipped
            element.style.backgroundColor = null;//flips second tile
            activeTile.style.backgroundColor = null;//flips active tile
       
            awaitingEndOfMove = false;//resets end of move
            activeTile = null;//resets active tile
        }, 1000);

    });

    return element;
}

 //build up tile
 for(let i = 0; i < tileCount; i++){//runs loop 16 times
    const randomIndex = Math.floor(Math.random() * coloursPicklist.length);//selects a random value from the array of colors picklist 0-15
    const colour = coloursPicklist[randomIndex];
    const tile = buildTile(colour);//assigns colour to a tile


    coloursPicklist.splice(randomIndex, 1);//removes a colour once chosen
    tileContainer.appendChild(tile);//appends element of tile to the body in html
 }