import "./Subscribe.css"
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function Subscribe() {
    const mutation = useMutation({
        mutationFn: newEmail => {
            const time = notificationTime.split(':');

            const date = new Date();
            date.setSeconds(0);
            date.setMinutes(Number(time[1]));
            date.setHours(Number(time[0]));
            return fetch(process.env.REACT_APP_API,
                {
                    headers: {
                        "content-type": "application/json"
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        Email: newEmail,
                        DeltaTemperature: deltaTemperature,
                        NotificationTime: [`${date.getUTCHours()}:${date.getUTCMinutes()}:00`]
                    })
                }
            )
        }
    });

    const [email, setEmail] = useState('');
    const [deltaTemperature, setDeltaTemperature] = useState(1);
    const [notificationTime, setNotificationTime] = useState('12:00');

    const [subscribeResult, setSubscribeResult] = useState('');

    function subscribe() {
        if (email) {
            mutation.mutate(email, {
                onSuccess: res => res.ok ? setSubscribeResult('✓') : setSubscribeResult('✕'),
                onError: () => setSubscribeResult('✕')
            });
        }
    }

    return (
        <div>
            <div>
                <label>Email</label>
                <input type="email" onChange={e => setEmail(e.target.value)} required />
            </div>

            <div>
                <label>Delta Temperature</label>
                <input type="number" value={deltaTemperature} onChange={e => setDeltaTemperature(e.target.value)} />
            </div>

            <div>
                <label>Notification Time</label>
                <input type="time" step="3600" value={notificationTime} onChange={e => setNotificationTime(e.target.value)} />
            </div>

            <div>
                <button role="none" onClick={subscribe} disabled={!email}>Subscribe</button>
                <span>{subscribeResult}</span>
            </div>
        </div>
    );
}