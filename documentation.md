---
title:  "IPDK Documentation"
layout: documentation
---

<h2>Table of contents</h2>
<div>
{% for item in site.data.toc.toc_documentation %}
<a href="{{ site.baseurl }}{{ item.url }}"><h3>{{ item.title }}</h3></a>
 {% if item.subfolderitems[0] %}
        <ul>
          {% for entry in item.subfolderitems %}
              <li><a href="{{ site.baseurl }}{{ entry.url }}">{{ entry.page }}</a>
                {% if entry.subsubfolderitems[0] %}
                  <ul>
                  {% for subentry in entry.subsubfolderitems %}
                      <li><a href="{{ site.baseurl }}{{ subentry.url }}">{{ subentry.page }}</a></li>
                  {% endfor %}
                  </ul>
                {% endif %}
              </li>
          {% endfor %}
        </ul>
 {% endif %}
{% endfor %}
</div>