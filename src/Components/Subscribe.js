import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function Subscribe() {
    const mutation = useMutation({
        mutationFn: newEmail => {
            return fetch(process.env.REACT_APP_API,
                {
                    method: 'POST',
                    body: newEmail
                }
            )
        }
    })

    const [email, setEmail] = useState('');

    function subscribe() {
        mutation.mutate(email);
    }

    return (
        <div>
            <input id="email" type="email" onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />

            <button id="subscribe" role="none" onClick={subscribe}>Subscribe</button>
        </div>
    );
}