fetch('https://pokeapi.co/api/v2/pokemon/1')
.then(showPokemon)

async function showPokemon(response) {
    const data = await response.json();
    

    // create card elements

    const pokemonCard = document.createElement("div");
    const pokemonTitle = document.createElement("div");
    const pokemonType = document.createElement("div");
    const pokemonAbility = document.createElement("div");
    const pokemonName = document.createElement("p");
    const pokemonId = document.createElement("p");
    const pokemonImg = document.createElement("img");

    // add pokemonCard styles

    pokemonCard.style.display = "block"
    pokemonCard.style.width = "300px"
    pokemonCard.style.backgroundColor = "deepskyblue"
    pokemonCard.style.color = "white"
    pokemonCard.style.fontFamily = "sans-serif"
    pokemonCard.style.borderRadius = "10px"
    pokemonCard.style.margin = "1em"
    pokemonCard.style.padding = "1em"

    // add pokemonTitle styles

    pokemonTitle.style.display = "flex"
    pokemonTitle.style.backgroundColor = "orange"
    pokemonTitle.style.justifyContent = 'space-between'
    pokemonTitle.style.borderRadius = "10px"   
    pokemonTitle.style.padding = "0em 1em 0em 1em"

    // add pokemonImg styles

    pokemonImg.style.width = "-webkit-fill-available"
    pokemonImg.style.padding = "10px"
    pokemonImg.style.margin = "10px 0px 0px 0px"
    pokemonImg.style.borderRadius = "10px"
    pokemonImg.style.backgroundColor = "green"

    // add pokemonType styles



    // add pokemon name, id and image

    pokemonName.innerText = data["name"].toUpperCase();
    pokemonId.innerText = `#${data["id"]}`;
    pokemonImg.src = data["sprites"]["other"]["dream_world"]["front_default"];

    // add pokemon type

    


    // add abilities

    const abilityList = data["abilities"]
  
    abilityList.forEach(async ability => {
      const abilityParagraph = document.createElement("p")
      const abilityName = ability["ability"]["name"]
      const abilityEffects = await fetch(ability["ability"]["url"]).then(response => response.json())
      const abilityEffect = abilityEffects["effect_entries"]
      
      // abilityEffect.find(englishVersion => {if (englishVersion["language"]["name"] === "en") return englishVersion["short_effect"]})
      // console.log(abilityEffect)
      // abilityEffect.find(englishVersion => {if (englishVersion["language"]["name"] === "en") console.log(englishVersion["short_effect"])})
      // console.log(abilityEffect)

      // abilityParagraph.innerText = abilityName.charAt(0).toUpperCase() + abilityName.slice(1)
      // abilityParagraph.innerText = abilityEffect

      abilityParagraph.style.backgroundColor = "orange"
      abilityParagraph.style.borderRadius = "5px"
      abilityParagraph.style.padding = "10px"
      pokemonAbility.appendChild(abilityParagraph)
    })

    // append elements

    pokemonTitle.appendChild(pokemonName)
    pokemonTitle.appendChild(pokemonId)
    pokemonCard.appendChild(pokemonTitle)
    pokemonCard.appendChild(pokemonImg)
    pokemonCard.appendChild(pokemonType)
    pokemonCard.appendChild(pokemonAbility)
    document.body.appendChild(pokemonCard)
  }

// create search function

const searchPokemon = document.createElement("input")
const searchButton = document.createElement("button")

searchPokemon.setAttribute("type", "text")
searchPokemon.placeholder = " Type Pokemon or ID here"
searchButton.innerHTML = " Search Pokemon"

document.body.appendChild(searchPokemon)
document.body.appendChild(searchButton)

searchButton.addEventListener("click", () => {
  const id = searchPokemon.value

    fetch('https://pokeapi.co/api/v2/pokemon/'+id)
    .then(response => showPokemon(response))
    .catch(response => console.log(response))
})

