 <div id="initElement">
   <div class="login">
      <p>Login</p>
   
        <form action="">
           <input id="loginUsernameInput" type="text" max-length="25" placeholder="Username">
           <input id="loginPasswordInput" type="password" max-length="25" placeholder="Password">        
           <button type="" id="login">Login</button>
        </form>
   </div>  

   <div id="projectsList">
      <h4>Projects List: </h4>
      <button id="createNewProjectBtn">Create New Project</button>
      
   </div>

   <div id="createNewProject" class="projects">
      <form action="">
         <p>Project Name: </p>
         <input type="text" id="newProjectNameInput" placeholder="New Project Name"/>
         <textarea type="text" id="newProjectDescInput" placeholder="Project Description"></textarea>
         <button type="" id="createBtn">Create</button>
      </form>
      <button type="" id="listBtn">List Projects</button>
   </div>
</div>