---
layout: default
---

{% assign taglist = site.data.tags_de | sort  %}

<ul>
{% for tag in taglist %}
  <li><a href="#{{tag[0]}}">{{tag[0]}}</a></li>
{% endfor %}
</ul>

{% for tag in taglist %}
<h3 id="{{tag[0]}}">{{tag[0]}}</h3>
<ul>
  {% for url in tag[1] %}
    {% assign name = url[1] %}
    {% assign link = url[0] %}
  <li><a href="{{link}}">{{name}}</a></li>
  {% endfor %}
</ul>
{% endfor %}

