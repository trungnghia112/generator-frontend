## <%= appName %>
<% if (appDescription !== ""){ %>
<%= appDescription %>
<% } %>

<% if (appAuthor !== ""){ %>
This project was created by <%= appAuthor %> - <% if (appEmail !== ""){ %><%= appEmail %><% } %>
<% } %>

## Version
<%= appVersion %>

## License
<%= appLicense %>