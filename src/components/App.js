import React, { useRef, useState } from "react";
import '../styles/App.css';

const App = () => {
  const data = useRef({
    name: useRef(null),
    email: useRef(null),
    gender: useRef(null),
    phoneNo: useRef(null),
    password: useRef(null)
  })

  const [error, setError] = useState({
    err: ""
  })

  const [value, setValue] = useState("")

  function validateForm(name, email, gender, phoneNo, password){
    let valid = true
    if(!name || !email || !phoneNo || !password){
      setError({
        err: "All fields are mandatory"
      })
      valid = false
    }
    else if(!email.includes("@")){
      setError({
        err: "Email must contain @"
      })
      valid = false
    }
    else if(gender === "Select Gender"){
      setError({
        err: "Please identify as male, female or others"
      })
      valid = false
    }
    else if(isNaN(Number(phoneNo))){
      setError({
        err: "Phone Number must contain only numbers"
      })
      valid = false
    }
    else if(password.length < 6){
      setError({
        err: "Password must contain atleast 6 letters"
      })
      valid = false
    }else{
      return valid
    }
  }
  
  function handleSubmit(e){
    e.preventDefault()
    let {name, email, gender, phoneNo, password} = data.current
    if(validateForm(name.current.value, email.current.value, gender.current.value, phoneNo.current.value, password.current.value)){
      setError({
        err: ""
      })
      let userNm = email.current.value.slice(0, email.current.value.indexOf("@"))
      setValue(userNm)
      name.current.value = ""
      email.current.value = ""
      phoneNo.current.value = ""
      password.current.value = ""
      gender.current.value = "Select Gender"
    }
  }

  return (
    <div id="main">
      {value === "" ? <h2>Sign Up Form</h2> : <h2>Hello {value}</h2>}
      <form onSubmit={handleSubmit}>
        <input ref={data.current.name} type="text" placeholder="Enter name" data-testid='name' />
        <br />
        <br />
        <input ref={data.current.email} type="text" placeholder="Enter email" data-testid='email' />
        <br />
        <br />
        <select ref={data.current.gender} data-testid='gender'>
          <option>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Others</option>
        </select>
        <br />
        <br />
        <input ref={data.current.phoneNo} type="text" placeholder="Enter phone number" data-testid='phoneNumber' />
        <br />
        <br />
        <input ref={data.current.password} type="password" placeholder="Enter password" data-testid='password' />
        <br />
        <br />
        <button type="submit" data-testid='submit'>Submit</button>
      </form>
      <br />
      {error.err && <span style={{color: "red"}}>{error.err}</span>}
    </div>
  )
}

export default App;
