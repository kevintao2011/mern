function login(email,password){
    console.log("loggin in ")
    const req = new Request ({
            method:"localhost:/3001/auth",
            body:{
                email: email,
                password: password
            }
        }
    )
    
    
    // fetch('https://example.com/', { headers });
}

export default login