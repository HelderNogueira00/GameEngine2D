 <div id="initElement">
   <div class="initContainer" id="loginContainer" class="login">
      <h5>Welcome To Squared2D</h5>
      <p>Please authenticate yourself</p>
   
        <form action="">
           <input id="usernameInput" type="text" max-length="25" placeholder="Username">
           <input id="passwordInput" type="password" max-length="25" placeholder="Password">        
           <button class="primary-btn" type="" id="login">Login</button>
         </form>
         <a id="forgotPassword">Forgot Password?</a>
         <a id="backCreateAccount">Create New Account</a>
   </div>  

    <div class="initContainer" id="createAccountContainer" class="login">
      <h5>Welcome To Squared2D</h5>
      <p>Please setup your new account</p>
   
        <form action="">
            <input id="nameInput" type="text" max-length="25" placeholder="Name" required>
           <input id="usernameInput" type="text" max-length="25" placeholder="Username" required>
           <input id="emailInput" type="email" max-length="55" placeholder="Email" required>
           <input id="passwordInput" type="password" max-length="60" placeholder="Password" required>
            <input id="CPasswordInput" type="password" max-length="60" placeholder="Password" required>        
           <button class="primary-btn" type="" id="createAccount">Create Account</button>
         </form>
         <a id="backLogin">Login Instead</a>
   </div>  

    <div class="initContainer" id="forgotPasswordContainer" class="login">
      <h5>Squared2D Account Recovery</h5>
      <p>Please type your email address related to your account</p>
   
        <form action="">
           <input id="usernameInput" type="text" max-length="25" placeholder="Username">
           <input id="emailInput" type="email" max-length="60" placeholder="Email">        
           <button class="primary-btn" type="" id="recovery">Generate Recovery Link</button>
         </form>
         <a id="backLogin">Login Instead?</a>
         <a id="backCreateAccount">Create New Account</a>
   </div>  

   <div id="projectsListContainer">
      <div class="top">
         <div class="title">
            <h4>Projects</h4>
         </div>
         <div class="actions">
            <button class="primary-btn" id="logout">Logout</button>
            <button class="primary-btn" id="create">Create New Project</button>
         </div>
      </div>
      <div class="body">

      </div>
   </div>

   <div id="newProjectContainer" class="projects">
      <div class="top">
         <div class="title">
            <h4>Create a New Project</h4>
         </div>
         <div class="actions">
            <button type="" class="primary-btn" id="list">List Projects</button>
         </div>
      </div>
      <form action="">
         <div class="row">
            <p>Project Name: </p>
            <input type="text" id="nameInput" placeholder="New Project Name"/>
         </div>
         <div class="row">
            <p>Project Description: </p>
            <textarea type="text" id="descInput" placeholder="Project Description"></textarea>
         </div>
         <button type="" class="primary-btn" id="create">Create</button>
      </form>
   </div>
</div>