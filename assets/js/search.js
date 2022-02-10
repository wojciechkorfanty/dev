(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

//    <article id="{{ post.id }}-article">
//      <div>
//        <p>{{ post.title | strip_html }}</p>
//        {% assign date_format = site.date_format | default: "%B %-d, %Y" %}
//        {% if post.status != "default" %}
//        <p>&emsp;<mark>{{ post.status }}</mark>&emsp;<time datetime="{{ post.date }}">{{ post.date | date: date_format }}</time></p>
//        {% else %}
//        <p>&emsp;<time datetime="{{ post.date }}">{{ post.date | date: date_format }}</time></p>
//        {% endif %}
//      </div>
//        <h2 class="subtitle"><a href="{{ post.credit }}" target="_blank"><div data-icon="ei-external-link" data-size="s"></div> {{ post.de.subtitle }}</a></h2>
//      <p>Autoren: {{ post.authors }}</p>
//      <blockquote cite="{{ post.credit }}">
//        <p class="content">„{{post.de.description | replace: '"', "'"}}“</p>
//      </blockquote>
//      {% if post.de.tags and post.de.tags.size > 0 %}
//      <p>Schlüsselworte: {{ post.de.tags | join: ", " }}</p>
//      {% endif %}
//      <aside class="group"><a href="/studies_de_{{ post.group | downcase }}.html#{{ post.id }}"><div data-icon="ei-chevron-right" data-size="s"></div><p>{{ site.data.groups[post.group]['de_name'] }}</p></a></aside>
//    </article>


    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        appendString += '<article><div><p>' + item.journal + '</p><p>&emsp;<time datetime="' + item.date +'">' + item.date + '</time></p></div>';
        appendString += '<h2 class="subtitle"><a href="' + item.url + '" target="_blank"><div data-icon="ei-external-link" data-size="s"></div> ' + item.title + '</a></h2>';
        appendString += '<p>Autoren: ' + item.author + '</p>';
        appendString += '<blockquote cite="' + item.url + '"><p class="content">„' + item.content.substring(0, 250) + '...“</p></blockquote>';
        appendString += '<p>Schlüsselworte: ' + item.category + '</p>';
        appendString += '</article>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>No results found</li>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('date');
      this.field('title', { boost: 10 });
      this.field('author');
      this.field('journal');
      this.field('category');
      this.field('content');

      // Add data to lunr
      for (var key in window.store) {
        this.add({
          'id': key,
          'date': window.store[key].date,
          'title': window.store[key].title,
          'author': window.store[key].author,
          'journal': window.store[key].journal,
          'category': window.store[key].category,
          'content': window.store[key].content
        });
      }
    });

    var results = idx.search(searchTerm); // Get lunr to perform a search
    displaySearchResults(results, window.store); // We'll write this in the next section
  }
})();

