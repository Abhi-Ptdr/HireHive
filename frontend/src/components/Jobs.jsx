import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux';
import Footer from './shared/Footer';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

function Jobs() {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if(searchedQuery){
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) || 
                job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.jobType.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchedQuery.toLowerCase());
            })
            setFilterJobs(filteredJobs);
        }else {
            setFilterJobs(allJobs);
        }
    },[allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <div className="flex gap-5">
                    <div className="w-20%">
                        <FilterCard/>
                    </div>
                    {
                        filterJobs?.length <= 0 ? <span>Job not found</span> :
                            <div className="flex overflow-y-auto pb-5">
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs?.map((job, index) => (
                                            <motion.div key={job._id} 
                                                initial={{opacity: 0, startOffset:index}}
                                                animate={{opacity: 1}}
                                                exit={{opacity: 0}}
                                                transition={{duration:1}}
                                            >
                                                <Job job={job}/>
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                    }
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Jobs
