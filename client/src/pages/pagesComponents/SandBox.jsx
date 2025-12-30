import React from 'react'
import ProjectCard from '../../projectCards/components/ProjectCard'

const exampleCard = {
    _id: "507f1f77bcf86cd799439011", // MongoDB ObjectId
    title: "Full Stack Project",
    subtitle: "React & Node.js Project",
    description: "full-stack project in MERN stack. scalable web application with modern authentication and clean architecture patterns.",
    email: "gur.developer@example.com",
    web: "https://www.gurportfolio.com",
    image: "https://res.cloudinary.com/demo/image/upload/v1234567890/sample.jpg",
    likes: [
        "507f191e810c19729de860ea",
        "507f191e810c19729de860eb",
        "507f191e810c19729de860ec"
    ],
    createdAt: "2024-12-10T10:30:00.000Z",
    user_id: "507f191e810c19729de860ea"
};

const exampleUser = {
    _id: "507f1f77bcf86cd799439011", // MongoDB ObjectId
    title: "Full Stack Project",
    subtitle: "React & Node.js Project",
    description: "full-stack project in MERN stack. scalable web application with modern authentication and clean architecture patterns.",
    email: "gur.developer@example.com",
    web: "https://www.gurportfolio.com",
    image: "https://res.cloudinary.com/demo/image/upload/v1234567890/sample.jpg",
    likes: [
        "507f191e810c19729de860ea",
        "507f191e810c19729de860eb",
        "507f191e810c19729de860ec"
    ],
    createdAt: "2024-12-10T10:30:00.000Z",
    user_id: "507f191e810c19729de860ea"
};

function SandBox() {
    return (
        <div className='min-h-screen w-full flex flex-col'>
            <h2>sandbox</h2>
            <div className='min-h-screen w-full flex flex-col justify-center items-center'>
                <ProjectCard card={exampleCard} />
            </div>
        </div>
    )
}

export default SandBox