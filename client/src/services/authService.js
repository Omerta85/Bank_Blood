export const handleLogin = (e, email, password, role) => {
    e.preventDefault()
    try{
        if(!role || !email || !password){
            return alert(" Please Pride All Fields")
        }
        console.log("login", e, email, password, role);
    } catch (error) {
        console.log(error)
    }
};

export const handleRegister = (  e,
                                 name,
                                 role,
                                 email,
                                 password,
                                 organizationName,
                                 hospitalName,
                                 website,
                                 address,
                                 phone) => {
    e.preventDefault()
    try{
        console.log("register =>",
            name,
            role,
            email,
            password,
            organizationName,
            hospitalName,
            website,
            address,
            phone);
    } catch (error) {
        console.log(error)
    }
};