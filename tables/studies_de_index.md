---
layout:    default
title:     Studies
subtitle:  studies
---
<article> 
<div class="datatable">
  <table id="studies" class="display responsive" style="width:100%">
    <thead>
      <tr>
        <th>Datum</th>
        <th>URL</th>
        <th>Filename</th>
      </tr>
    </thead>
    <tbody>
    {% for studie in site.studies reversed %}
      <tr>
        <td>{{ studie.date | date: "%Y-%m-%d" }}</td>
        <td>{{ studie.credit }}</td>
        <td><a href="{{ studie.id }}">{{ studie.id | split: "/" | last }}.md</a></td>
      </tr>
    {% endfor %}
    </tbody>
  </table>
</div>
</article> 
