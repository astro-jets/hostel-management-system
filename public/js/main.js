  const signUpForm = document.querySelector('#signUpForm')
  const logInForm = document.querySelector('#logInForm')

  
  if(signUpForm)
  {
    
    const emailErr = document.querySelector('#emailErr')
    const nameErr = document.querySelector('#nameErr')
    const passErr = document.querySelector('#passErr')
    
    // Reset Errors
    passErr.textContent =  '';
    emailErr.textContent = '';
    nameErr.textContent =  '';

    signUpForm.addEventListener('submit', async (e)=>{
      e.preventDefault()
      const username = signUpForm.username.value;
      const email = signUpForm.email.value;
      const password = signUpForm.password.value;
      
      try {
        const res = await fetch('auth/signUp',{
          method:'POST',
          body:JSON.stringify({username,email,password}),
          headers:{'Content-Type':'application/json'}
        });
        
        const data = await res.json()
        if(data.errors)
        {
          emailErr.textContent = data.email
          nameErr.textContent = data.username
          passErr.textContent = data.password
        }

        if(data.user)
        {
          location.assign('/hostels')
        }
      } catch (error) {
        
      }
    })
  }

  if (logInForm) {
    
    const emailErr = document.querySelector('#signInemailErr')
    const passErr = document.querySelector('#signInpassErr')

    // Reset Errors
    emailErr.textContent =''
    passErr.textContent =''

    logInForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = logInForm.email.value;
    const password = logInForm.password.value;

    try {
        const res = await fetch('auth/logIn', {
        method: 'POST',
        body: JSON.stringify({email, password }),
        headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()
        if(data.user){location.assign('/')}
        
        if(data.errors)
        {
          emailErr.textContent = data.errors.email
          passErr.textContent = data.errors.password
        }
    } catch (error) {

    }
    })
}