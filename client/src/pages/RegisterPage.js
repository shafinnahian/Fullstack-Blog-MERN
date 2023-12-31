import { useState } from "react"

export default function RegisterPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //  The useState hook in React is used to add state to functional components. 
    //  When you call useState with an initial value, such as useState(''), it returns an array with two elements:
    //  The current state value & a function to update that state value.

    async function register(ev){    //https://chat.openai.com/share/5faa0115-07f7-46f1-8cc3-56e71ec279e0
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/register',{
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
        })

        if (response.status === 200){
            alert('Registration successful!');
        } else {
            alert('Registration failed. Username must be unique.')
        }
    }

    return(
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" 
                    placeholder="username" 
                    value = {username}
                    onChange={ev => setUsername(ev.target.value)}/>
            <input type="password" 
                    placeholder="password" 
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}/>
            <button>Register</button>
        </form>
    )
}
/* onChange={(ev) => setUsername(ev.target.value)}: 
                        The onChange attribute is an event handler that specifies what should happen when the input's value changes. 
                        In this case, it's a function that takes an event object ev as its argument. When the user types in the input field, this function is called.
                        ev.target.value: Within the onChange function, ev.target refers to the element that triggered the event (in this case, the <input> element), 
                        and ev.target.value retrieves the current value of the input field, which is the text the user has typed.
                        setUsername(ev.target.value): This part of the onChange function sets the username state variable to the new value entered by the user. By doing so, it updates the React component's state with the latest text input value.
                        In summary, the onChange event handler allows the component to respond to user input in the text input field. It captures the value of the input as the user types and updates the username state variable with the new value, 
                        ensuring that the input field's value is always synchronized with the component's state. This is known as a controlled input component in React, where the component's state drives the input field's value and behavior. */
            