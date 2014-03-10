gruntfile
=========


## Grunt Setup

##### Less to Css compilation
--------------------------
<p>Grunt will automatically process all of the less into css.  The proper css file is referenced in the index.html.</p>

##### Open
--------------
<p>This task has to be registered between the connect task and the watch task</p>

##### Proxies
-------------
<p>This was one of the more confusing parts of setting up this template.  if you look in the connect object you will see that
  there are 2 servers running.</p>

  <ol>
    <li>**staticserver** - port **8001**</li>
    <li>**server** - port **9000**</li>
  </ol>

<p>The **server** server has all of the proxies attached to it.  All requests hit the **server** server and are immediately proxied.
    If no route is found for the request in the predefined proxies, then the request is sent to the **staticserver**.  This will then route
    the request as would normally be expected.</p>

##### Templating
----------------

<p>Handlebars is our template of choice.  The templates are to be place in the templates/ directory and are to be referenced with a hbs!
  preceeding the file path and name.  </p>

##### Watch
------------
<p>We are watching all of the different types of files</P>

  <ol>
    <li>Gruntfile.js</li>
    <li>javscript</li>
    <li>css</li>
    <li>less</li>
    <li>html</li>
    <li>test files</li>
  </ol>

<p>Any of the files that are changed will cause the page to be refreshed.  If a less file is changed, then it will be processed into css and
 then the page will be refreshed.  When any of the js files are changed, the file will be linted and then the page will be refreshed.</p>