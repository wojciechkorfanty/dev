---
layout:    default
title:     Studies
subtitle:  studies
---

<h1>Studies</h1>
 
<div class="datatable">
  <table id="studies" class="display responsive" style="width:100%">
    <thead>
      <tr>
        <th>Datum</th>
        <th>URL</th>
      </tr>
    </thead>
    <tbody>
    {% for studie in site.studies reversed %}
      <tr>
        <td>{{ studie.date | date: "%Y-%m-%d" }}</td>
        <td>{{ studie.credit }}</td>
      </tr>
    {% endfor %}
    </tbody>
  </table>
</div>
