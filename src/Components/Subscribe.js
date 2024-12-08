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
    const [subscribeResult, setSubscribeResult] = useState('');

    function subscribe() {
        if (email) {
            mutation.mutate(email, {
                onSuccess: () => setSubscribeResult('✓'),
                onError: () => setSubscribeResult('✕')
            });
        }
    }

    return (
        <div>
            <input id="email" type="email" onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />

            <button id="subscribe" role="none" onClick={subscribe} disabled={!email}>Subscribe</button>
            <span>{subscribeResult}</span>
        </div>
    );
}