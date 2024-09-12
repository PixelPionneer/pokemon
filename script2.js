document.addEventListener('DOMContentLoaded', function() {
    const pokemonInput = document.getElementById('pokemon-input');
    const searchBtn = document.getElementById('search-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    const pokemonName = document.getElementById('pokemon-name');
    const pokemonImg = document.getElementById('pokemon-img');
    const pokemonId = document.getElementById('pokemon-id');
    const pokemonTypes = document.getElementById('pokemon-types');
    const pokemonWeight = document.getElementById('pokemon-weight');
    const pokemonHeight = document.getElementById('pokemon-height');

    let currentPokemonId = 1;

    // Função para buscar Pokémon pela API
    function fetchPokemon(pokemon) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Pokémon não encontrado');
                }
            })
            .then(data => {
                currentPokemonId = data.id;
                displayPokemon(data);
            })
            .catch(error => {
                alert(error.message);
            });
    }

    // Função para exibir os dados do Pokémon
    function displayPokemon(data) {
        pokemonName.textContent = `Nome: ${data.name}`;
        pokemonImg.src = data.sprites.front_default;
        pokemonId.textContent = `ID: ${data.id}`;
        pokemonTypes.textContent = `Tipos: ${data.types.map(type => type.type.name).join(', ')}`;
        pokemonWeight.textContent = `Peso: ${data.weight / 10} kg`;
        pokemonHeight.textContent = `Altura: ${data.height / 10} m`;
    }

    // Evento de clique no botão de busca
    searchBtn.addEventListener('click', () => {
        const pokemon = pokemonInput.value.trim();
        if (pokemon) {
            fetchPokemon(pokemon);
        }
    });

    // Evento de pressionar a tecla Enter no input
    pokemonInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const pokemon = pokemonInput.value.trim();
            if (pokemon) {
                fetchPokemon(pokemon);
            }
        }
    });

    // Função para buscar o Pokémon anterior
    prevBtn.addEventListener('click', () => {
        if (currentPokemonId > 1) {
            currentPokemonId--;
            fetchPokemon(currentPokemonId);
        }
    });

    // Função para buscar o próximo Pokémon
    nextBtn.addEventListener('click', () => {
        currentPokemonId++;
        fetchPokemon(currentPokemonId);
    });

    // Carregar o primeiro Pokémon na inicialização
    fetchPokemon(currentPokemonId);
});
