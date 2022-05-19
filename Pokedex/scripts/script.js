async function makeRequest(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("something went wrong..", error);
  }
}

async function showPokemon(data) {
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
    pokemonCard.style.height = "600px"
    pokemonCard.style.backgroundColor = "goldenrod"
    pokemonCard.style.color = "white"
    pokemonCard.style.fontFamily = "sans-serif"
    pokemonCard.style.borderRadius = "10px"
    pokemonCard.style.margin = "1em"
    pokemonCard.style.padding = "1em"

    // add pokemonTitle styles

    pokemonTitle.style.display = "flex"
    pokemonTitle.style.backgroundColor = "chocolate"
    pokemonTitle.style.justifyContent = 'space-between'
    pokemonTitle.style.borderRadius = "10px"   
    pokemonTitle.style.padding = "0em 1em 0em 1em"

    // add pokemonImg styles

    pokemonImg.style.width = "-webkit-fill-available"
    pokemonImg.style.height = "300px"    
    pokemonImg.style.width = "280px"    
    pokemonImg.style.padding = "10px"
    pokemonImg.style.margin = "10px 0px 10px 0px"
    pokemonImg.style.borderRadius = "10px"
    pokemonImg.style.backgroundColor = "navajowhite"

    // add pokemonType styles

    pokemonType.style.display = "flex"
    pokemonType.style.justifyContent = "space-around"
    pokemonType.style.backgroundColor = "chocolate"
    pokemonType.style.borderRadius = "10px 10px 0px 0px"
    pokemonType.style.margin = "0px 0px 5px 0px"

    // add pokemonAbility styles

    pokemonAbility.style.backgroundColor = "chocolate"
    pokemonAbility.style.borderRadius = "0px 0px 10px 10px"
    pokemonAbility.style.height = "160px"
    pokemonAbility.style.margin = "0px"
    pokemonAbility.style.padding = "10px"


    // add pokemon name, id and image

    pokemonName.innerText = data["name"].toUpperCase();
    pokemonId.innerText = `#${data["id"]}`;
    pokemonImg.src = data["sprites"]["other"]["dream_world"]["front_default"];

    // add pokemon type

    data["types"].forEach(types => {
      const typeParagraph = document.createElement("p")
      const type = types["type"]["name"]
      typeParagraph.innerText = type.charAt(0).toUpperCase() + type.slice(1)
      typeParagraph.style.margin = "0px"
      pokemonType.appendChild(typeParagraph)
    })    

    // add abilities
  
    data["abilities"].forEach(async ability => {
      const abilityParagraph = document.createElement("p")
      const abilitiesName = ability["ability"]["name"]
      const abilitiesEffect = await makeRequest(ability["ability"]["url"])
      const abilityEffect = abilitiesEffect["effect_entries"].find(englishVersion => (englishVersion["language"]["name"] === "en"))
      const abilityName = abilitiesName.charAt(0).toUpperCase() + abilitiesName.slice(1)
      
      abilityParagraph.innerText = ` - ${abilityName}: ${abilityEffect.short_effect}`
      abilityParagraph.style.fontSize = "0.9em"
      abilityParagraph.style.margin = "10px"
      abilityParagraph.style.margin = "0px"
      pokemonAbility.appendChild(abilityParagraph)
    })

    // append elements

    pokemonTitle.appendChild(pokemonName)
    pokemonTitle.appendChild(pokemonId)
    pokemonCard.appendChild(pokemonTitle)
    pokemonCard.appendChild(pokemonImg)
    pokemonCard.appendChild(pokemonType)
    pokemonCard.appendChild(pokemonAbility)
    cardContainer.appendChild(pokemonCard)
  }

// search feature elements

const pokemonLogo = document.createElement("img")
const searchPokemon = document.createElement("input")
const searchButton = document.createElement("button")
const cardContainer = document.createElement("div")
const searchContainer = document.createElement("div")

cardContainer.style.display = "flex"
cardContainer.style.flexWrap = "wrap"
cardContainer.style.flexDirection = "row"
cardContainer.style.justifyContent = "center"
searchContainer.style.display = "flex"
searchContainer.style.justifyContent = "center"
searchContainer.style.alignItems = "center"
searchContainer.style.margin ="20px 0px 0px"

// logo styles

pokemonLogo.src = ("https://fontmeme.com/permalink/220518/535a1bcb708fc9b91c548cb522c4a64d.png")
pokemonLogo.style.display = "block"
pokemonLogo.style.margin ="50px auto 0px auto"

// setup search box

searchPokemon.setAttribute("type", "text")
searchPokemon.placeholder = " Type Pokemon or ID here"
searchPokemon.style.borderRadius = "4px"
searchPokemon.style.height = "35px"
searchPokemon.style.width = "300px"
searchPokemon.style.margin = "10px"
searchPokemon.style.fontSize = "1em"

// setup search button

searchButton.innerHTML = " Search Pokemon"
searchButton.style.borderRadius = "4px"
searchButton.style.height = "40px"
searchButton.style.width = "200px"
searchButton.style.margin = "10px"
searchButton.style.fontSize = "1em"

// append elements

document.body.appendChild(pokemonLogo)
searchContainer.appendChild(searchPokemon)
searchContainer.appendChild(searchButton)
document.body.appendChild(searchContainer)
document.body.appendChild(cardContainer)

// search function

searchButton.addEventListener("click", async () => {
  const id = searchPokemon.value
  const pokemon = await makeRequest("https://pokeapi.co/api/v2/pokemon/" + id);
  showPokemon(pokemon);
})


