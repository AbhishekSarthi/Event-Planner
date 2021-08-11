import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Read = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get('/api');
            console.log(data[0].events);
            setEvents(data[0].events);
        };
        getData();
    }, []);

    return (
        <div>
            <h3>EVENTS</h3>
            {events.map((singleEvent) => {
                return (
                    <div className="box" key={Math.random(1000)}>
                        <h4>title : {singleEvent.title}</h4>
                        <h4>Body : {singleEvent.body} </h4>
                        <h4>author : {singleEvent.author}</h4>
                    </div>
                );
            })}
        </div>
    );
};

export default Read;