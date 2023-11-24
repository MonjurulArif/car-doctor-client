// import React from 'react';
import { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";

import calender from "../../../assets/icons/calender.svg";
import call from "../../../assets/icons/call.svg";
import location from "../../../assets/icons/location.svg";

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        //from local
        // fetch("services.json")
        // fetch("http://localhost:5000/services")
        // fetch("https://car-doctor-server-phi-one.vercel.app/services")
        fetch("https://car-doctor-server-phi-one.vercel.app/services")
            .then((res) => res.json())
            .then((data) => {
                setServices(data);
            });
    }, []);

    return (
        <div className="mt-4">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-orange-600">Service</h3>
                <h2 className="text-5xl">Our Service Area</h2>
                <p>
                    The majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don not look even slightly believable.{" "}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <ServiceCard key={service._id} service={service}></ServiceCard>
                ))}
            </div>
            <div className=" flex justify-center mt-16 mb-32">
                <button className="text-xl text-[#FF3811] border-2 rounded-md border-[#FF3811] p-3">More Services</button>
            </div>

            <div className="flex flex-col lg:flex-row mb-16 bg-black h-auto lg:h-[180px] rounded-lg items-center justify-between px-8">
                <div className=" flex flex-row p-4 ">
                    <div className="p-4 ">
                        <img src={calender} className="max-w-sm rounded-lg shadow-2xl " />
                    </div>
                    <div>
                        <p className="py-2">We are open monday-friday</p>
                        <h1 className="text-xl font-bold">7:00 am - 9:00 pm</h1>
                    </div>
                </div>
                <div className=" flex flex-row p-4 ">
                    <div className="p-4 ">
                        <img src={call} className="max-w-sm rounded-lg shadow-2xl " />
                    </div>
                    <div>
                        <p className="py-2">Have a question?</p>
                        <h1 className="text-xl font-bold">+2546 251 2658</h1>
                    </div>
                </div>
                <div className=" flex flex-row p-4 ">
                    <div className="p-4 ">
                        <img src={location} className="max-w-sm rounded-lg shadow-2xl " />
                    </div>
                    <div>
                        <p className="py-2">Need a repair? our address</p>
                        <h1 className="text-xl font-bold">Liza Street, New York</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
