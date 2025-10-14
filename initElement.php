 <div id="initElement">
   <div id="loginContainer" class="login">
      <p>Login</p>
   
        <form action="">
           <input id="usernameInput" type="text" max-length="25" placeholder="Username">
           <input id="passwordInput" type="password" max-length="25" placeholder="Password">        
           <button type="" id="login">Login</button>
        </form>
   </div>  

   <div id="projectsListContainer">
      <h4>Projects List: </h4>
      <button id="logout">Logout</button>
      <button id="create">Create New Project</button>
   </div>

   <div id="newProjectContainer" class="projects">
      <form action="">
         <p>Project Name: </p>
         <input type="text" id="nameInput" placeholder="New Project Name"/>
         <textarea type="text" id="descInput" placeholder="Project Description"></textarea>
         <button type="" id="create">Create</button>
      </form>
      <button type="" id="list">List Projects</button>
   </div>
</div>