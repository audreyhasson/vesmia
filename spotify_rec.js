// https://github.com/jdstregz/spotify-recommendations/blob/master/client/src/SpotifyRecommender.js
// needs axios?

// import SearchResults from './components/SearchResults';
// either use above or pass args into getReccomendations

const SpotifyRecommender = ({auth}) => {
    const {token} = auth;


    // pass in things in async()? or use separate search results?
    const getRecommendations = async () => {
        const url = 'https://api.spotify.com/v1/recommendations';

        // target_acousticness (0-1), target_danceability (0-1), 
        // target_energy(0-1), target_instrumentalness (0-1)
        // target valence(0-1);
        // replace what is in {} below w var names above (idk our categories)

    
        console.log(`${url}?${selectedArtistsString}&${minString}&${maxString}`)
    
        const {data} = await axios.get(`${url}?${selectedArtistsString}&${minString}&${maxString}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setResults(data)
    };
}