function createSubList(node){
  menu = `<li class="nav-item">`;
  if (Array.isArray(node[2])){
    menu += `<a class="nav-link text-dark text-wrap collapsed" data-toggle="collapse" data-target="#{{ ` + node[0] + ` }}" href="` + node[1] + `" aria-expanded="false">`;
  } else {
    menu += `<a class="nav-link text-dark text-wrap" href="` + node[1] + `" aria-expanded="false">`;
  }
  menu += `<i class="fa fa-table"></i>`;
  menu += node[0];
  menu += `</a>`;

  if (Array.isArray(node[2])){
    menu += `<div class="collapse" aria-expanded="false" id="{{ ` + node[0] + ` }}">`;
    menu += `<ul class="no-bullets">`;
    node[2].forEach(n => {
      menu += createSubList(n);
    });
    menu += `</ul>`;
    menu += `</div>`;
  }

  menu += `</li>`;

  return menu;
}

function drawSidebar()
{
  var sidebar = $("#nav-tree-contents");

  sidebar.append(`
  <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navTableOfContents' aria-controls='navTableOfContents' aria-expanded='false' aria-label='Toggle Table of Contents'>
    <span class='navbar-toggler-icon'></span>
  </button>`);

  var menu = "";

  menu += `<div class="collapse navbar-collapse" id="navTableOfContents">
    <div class="navbar-nav flex-column">
      <ul class="no-bullets">`;

  // Skipping first element by starting at index 1 on purpose
  for (var i = 1; i < NAVTREE[0][2].length; i++) {
    menu += createSubList(NAVTREE[0][2][i]);
  }

  menu += `</ul></div></div>`;

  sidebar.append(menu);
}

function initNavTree(toroot,relpath)
{
  const scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    document.body.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
    script.async = true;
    script.src = 'navtreedata.js';
  });

  scriptPromise.then(() => {
    drawSidebar();
  })

  return;
}

function initResizable()
{
}