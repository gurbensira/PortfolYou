import React from 'react'
import ProjectCard from '../../projectCards/components/ProjectCard'

function SandBox() {
    return (
        <div className='min-h-screen w-full flex flex-col'>
            <h2>sandbox</h2>
            <div className='min-h-screen w-full flex flex-col justify-center items-center'>
                <ProjectCard />
            </div>
        </div>
    )
}

export default SandBox