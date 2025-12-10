import React from 'react'

function ProjectCard({ card }) {
    return (
        <div className='w-[85%] sm:w-[250px] md:w-[280px] lg:w-[300px] h-[350px] border border-black rounded-lg overflow-hidden '>
            <div className="h-[45%] overflow-hidden">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
            </div>

            <div className="px-2 py-2">
                <h2 className='font-semibold'>{card.title}</h2>
                <p className='text-sm text-gray-600 mt-2'>{card.description}</p>
                <div className='flex'>
                    <p className=' font-semibold mr-2'>link:</p>
                    <a
                        href={card.web}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                    >
                        {card.web}
                    </a>
                </div>
            </div>

        </div>
    )
}

export default ProjectCard

