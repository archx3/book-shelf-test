<h1 align=center><b> SUGAR</b></h1>

####Node Rest API Boiler plate based Express


## Set Up 

### Get the code 
```
$ git clone https://github.com/<url>.git
$ cd sugar-cube

# npm install
```

### Run the app 
#### Run without building with webpack

```
$ npm start
```

### Run linters

```
$ npm test
```

### Run integration tests

```
$ npm run test-integration
```

### Privacy 
Sugar **DOES-NOT** collect any information from any source for any purpose

## License

MIT. Copyright (c) [George Koomson](<githuburl>).

```ejs
<% 'Scriptlet' tag, for control-flow, no output
 <%_ 'Whitespace Slurping' Scriptlet tag, strips all whitespace before it
 <%= Outputs the value into the template (escaped)
 <%- Outputs the unescaped value into the template
 <%# Comment tag, no execution, no output
 <%% Outputs a literal '<%'
 %%> Outputs a literal '%>'
 %> Plain ending tag
 -%> Trim-mode ('newline slurp') tag, trims following newline
 _%> 'Whitespace Slurping' ending tag, removes all whitespace after it

```

```ejs
<ul>
  <% users.forEach(function(user){ %>
    <%- include('user/show', {user: user}) %>
  <% }); %>
</ul>
```
 
