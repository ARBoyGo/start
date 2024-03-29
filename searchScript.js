const searchInput = document.querySelector('.search_input');

searchInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    redirectToSearch();
  }
});

function redirectToSearch() {
  const query = searchInput.value;

  if (query.trim() !== '') {
    const searchURL = `https://search.demoniak.ch/search?q=${encodeURIComponent(query)}`;
    window.location.href = searchURL;
  }
}