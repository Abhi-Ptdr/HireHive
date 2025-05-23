import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import Footer from './shared/Footer'

// const skills = ["HTML", "CSS", "JavaScript", "React", "Node.js"]
const isResume = true;

function Profile() {
    useGetAppliedJobs();

    const [open, setOpen] = useState(false);
    const {user} = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto bg-white border boredr-gray-200 my-10 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="w-15 h-15 ">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right border-none cursor-pointer" variant="outline"><Pen/></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail/>
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact/>
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='font-bold text-lg my-2'>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} className='text-red-700 font-bold' variant='ghost'>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <Label htmlFor="resume" className="text-md font-bold mt-5">Resume</Label>
                        {
                            isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span> NA </span>
                        }
                    </div>
                </div>
            </div>
            <div className='max-w-6xl mx-auto bg-while rounded-2xl'>
                <h1 className='font-bold text-lg my-4'>Applied Jobs</h1>
                {/* Applications table */}
                <AppliedJobTable/>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
            <div className='mt-10'>
                <Footer/>
            </div>
        </div>
    )
}

export default Profile
