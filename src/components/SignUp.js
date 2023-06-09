import react from 'react';
import { useState } from 'react';
import axios, { Axios } from 'axios';
import '../style/SignUp.css';
import { useNavigate } from 'react-router-dom';

function Signup() {

    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [emailAddressError, setEmailAddressError] = useState("");
    const [password, setPassword] = useState("");
    const [passWordError, setPasswordError] = useState("");
    const [confirmPassWord, setConfirmPassword] = useState("");
    const [confirmPasswordError, SetconfirmPasswordError] = useState("");
    const [phnNumber, setPhnNumber] = useState("");
    const [phnNumberError, setPhnNumbeError] = useState("");
    const [address, setAddress] = useState("");
    const [securityQuestionOne, setSecurityQuestionOne] = useState("");
    const [securityQuestionOneError, setSecurityQuestionOneError] = useState("");
    const [registerError, setRegisterError] = useState("");

    const naviagte = useNavigate();





    /* This function gets Called when an input is entered for the firstName filed*/
    const handleFirstName = (e) => {

        let fName = e.target.value;
        let fNameRegex = /^[a-zA-Z ]+$/;
        let error = "";

        if (!fName.trim()) {
            error = "First Name cannot be empty";
            setFirstNameError(error)
        }
        else if (!fNameRegex.test(fName)) {
            error = "First Name should only  have alphabets";
            setFirstNameError(error)
        }
        else {
            setFirstName(fName);
            setFirstNameError("");
        }

    };


    /* This function gets Called when an input is entered for the LastName field*/
    const handleLastName = (e) => {

        let lName = e.target.value;
        let lNameRegex = /^[a-zA-Z ]+$/;
        let error = "";

        if (!lName.trim()) {
            error = "Last Name cannot be empty";
            setLastNameError(error);
        }
        else if (!lNameRegex.test(lName)) {
            error = "Last Name should only  have alphabets";
            setLastNameError(error);
        }
        else {
            setLastName(lName);
            setLastNameError("");
        }

    }


    /* This method gets called when an input is entered for the Email field */
    const handleEmail = (e) => {

        let email = e.target.value;
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let error = "";

        if (!email.trim()) {
            error = "Email Address cannot be empty";
            setEmailAddressError(error);
        } else if (!emailRegex.test(email)) {
            error = "Email Address doesn't match criteria, ex: xyz@outlook.com";
            setEmailAddressError(error);
        } else {
            setEmailAddress(email);
            setEmailAddressError("");
        }

    }


    /*This method gets called when an input is entered for the password field*/
    const handlePassWord = (e) => {

        let passwordVal = e.target.value;
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let error = "";

        if (!passwordVal.trim()) {
            error = "Password cannot be empty";
        }
        else if (!passwordRegex.test(passwordVal)) {
            error = "Password doesn't match the criteria, \n" +
                "at least eight characters,\n" +
                "at least one number,\n" +
                "at least one lowercase letter,\n" +
                "at least one uppercase letter, \n" +
                "at least one special character ";
            setPasswordError(error);
        }
        else {
            setPassword(passwordVal);
            setPasswordError("");
        }

    }


    /*This method gets called when an input  is entered for the confirmPassword field*/
    const handleConfirmPassword = (e) => {

        let confirmPass = e.target.value;
        let error = "";
        if (!confirmPass.trim()) {
            error = "confirm password cannot be empty";
            SetconfirmPasswordError(error);
        }
        else if (password !== confirmPass) {
            error = "Password  does not match";
            SetconfirmPasswordError(error);
        }
        else {
            setConfirmPassword(confirmPass);
            SetconfirmPasswordError("");
        }
    }


    /*This method gets executed when an input is entered for the phone Number field*/
    const handlePhoneNumber = (e) => {

        let phNum = e.target.value;
        let phNumRegex = /^[0-9]{10}$/;
        let error = "";

        if (!phNumRegex.test(phNum)) {
            error = "Phone number should only contain 10 digits";
            setPhnNumbeError(error);
        }
        else {
            setPhnNumber(phNum);
            setPhnNumbeError("");
        }

    }


    /* This method gets exceduted when an input is entered for the adress field*/
    const handleAdress = (e) => {

        let add = e.target.value;
        if (!add.trim()) {
            setEmailAddressError("The address is empty!")
        }
        else {
            setAddress(add);
            setEmailAddressError("")
        }
    }

    const handleQ1 = (e) => {

        setRegisterError("");
        let sq = e.target.value;
        let sqRegex = /^[a-zA-Z ]+$/;
        let error = "";
        if (!sq.trim()) {
            error = "Security Question Answer cannot be empty";
            setSecurityQuestionOneError(error);

        } else if (!sqRegex.test(sq)) {
            error = "Security Question Answer should only have alphabets";
            setSecurityQuestionOneError(error);

        } else {
            setSecurityQuestionOneError("");
            setSecurityQuestionOne(sq);
        }

    }



    /*This method gets executed when the submit button gets clicked */
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            firstName,
            lastName,
            emailAddress,
            password,
            phnNumber,
            address
        });




        axios.post("http://127.0.0.1:8000/verifyUser", { emailAddress: emailAddress }).then(res => {

            try {
                if (res.status === 200) {

                    axios.post("http://127.0.0.1:8000/userRegisteration", {
                        firstName: firstName,
                        lastName: lastName,
                        emailAddress: emailAddress,
                        password: password,
                        phnNumber: phnNumber,
                        address: address,
                        securityQuestionOne: securityQuestionOne

                    }).then(res => {
                        if (res.status === 201) {
                            setRegisterError("Registration SuccessFull")
                            naviagte('/chooseMenu');
                        }
                    })

                    setFirstName("");
                    setLastName("");
                    setEmailAddress("");
                    setPassword("");
                    setPhnNumber("");
                    setAddress("");
                    setFirstNameError("");
                    setLastNameError("");
                    setEmailAddressError("");
                    setPasswordError("");
                    setPhnNumbeError("");

                }
            }
            catch (error) {
                console.log(error);
            }

        })

    }


    return (

        <>
            <h1>SignUp</h1>
            <br></br>
            {registerError}
            <form> <label>First Name</label>
                <input type='firstName' onChange={handleFirstName} />
                {firstNameError}
                <br></br>
                <label>Last Name</label>
                <input type='lastName' onChange={handleLastName} />
                {lastNameError}
                <br></br>
                <label>E mail</label>
                <input type='email' onChange={handleEmail} />
                {emailAddressError}
                <br></br>
                <label>Password</label>
                <input type='password' onChange={handlePassWord} />
                {passWordError}
                <br></br>
                <label>Confirm Password</label>
                <input type='confirmPassword' onChange={handleConfirmPassword} />
                {confirmPasswordError}
                <br></br>
                <label>Phone Number</label>
                <input type='phoneNumber' onChange={handlePhoneNumber} />
                {phnNumberError}
                <br></br>
                <label>Address</label>
                <input type='address' onChange={handleAdress} />
                <br></br>
                <label>Security Question - Whats your Favourite city</label>
                <input type='text' onChange={handleQ1} />
                {securityQuestionOneError}
                <br></br>

                <button onClick={handleSubmit}>Submit</button>
            </form>
        </>


    )

};


export default Signup;