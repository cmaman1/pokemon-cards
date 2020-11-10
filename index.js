const pokemonWrapper = document.querySelector(".pokemons-wrapper");
const pokemon = document.querySelector(".pokemon")
const pokemonButtons = document.querySelectorAll(".pokemon")
const API_URL = "https://pokeapi.co/api/v2/pokemon"


async function getPokemonData (pokemon) {
    
    const response = await fetch(`${API_URL}/${pokemon}`)
    const responseJson = await response.json();
    
    const pokemonName = document.querySelector(".pokemon-name");
    pokemonName.innerHTML = pokemon.toUpperCase();

    const pokemonInfo = document.querySelector(".information");
    pokemonInfo.innerHTML = "";

    const image = document.querySelector(".img");
    image.setAttribute("src", responseJson.sprites.other["official-artwork"].front_default)
    console.log()

    const type = document.createElement("p");
    type.innerHTML = `Type: ${responseJson.types[0].type.name}`;
    pokemonInfo.appendChild(type);

    const height = document.createElement("p");
    height.innerHTML = `Height: ${responseJson.height}`
    pokemonInfo.appendChild(height);

    const experience = document.createElement("p");
    experience.innerHTML = `Base Experience: ${responseJson.base_experience}`;
    pokemonInfo.appendChild(experience);

    const weight = document.createElement("p");
    weight.innerHTML = `Weight: ${responseJson.weight}`;
    pokemonInfo.appendChild(weight);


    const pokemonAbilities = document.querySelector(".abilities");
    pokemonAbilities.innerHTML = "";

    responseJson.abilities.forEach( a => {
        const ability = document.createElement("p");
        ability.innerHTML = a.ability.name;
        pokemonAbilities.appendChild(ability)
    } )
}


async function getPokemonsList () {
    const response = await fetch(`${API_URL}?limit=50`);
    const responseJson = await response.json();

    responseJson.results.forEach(element => {
        const pokemon = document.createElement("button");
        pokemon.classList.add("pokemon");
        pokemon.innerHTML = element.name;
        pokemon.dataset.id  = element.name;
        pokemonWrapper.appendChild(pokemon)

        pokemon.addEventListener("click", async (event) => {
            await getPokemonData(event.target.dataset.id)
        })
    });

}

getPokemonsList();

