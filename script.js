const apiKey = 'YOUR_TMDB_API_KEY';  // Replace with your actual TMDB API key
const baseUrl = 'https://api.themoviedb.org/3/search/movie?api_key=';

document.getElementById('searchBtn').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value.trim();
  if (query !== '') {
    fetch(`${baseUrl}${apiKey}&query=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => displayResults(data.results))
      .catch(error => console.error('Error fetching data:', error));
  }
});

function displayResults(movies) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (!movies || movies.length === 0) {
    resultsContainer.innerHTML = '<p>No results found.</p>';
    return;
  }

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';

    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Rating: ${movie.vote_average}</p>
      <p>Release: ${movie.release_date}</p>
    `;

    resultsContainer.appendChild(movieCard);
  });
}
