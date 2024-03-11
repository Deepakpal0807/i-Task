import React from 'react'

function Navbar() {
  return (
    <div >
        <nav className='bg bg-violet-800 flex justify-between py-2'>
           <h3 className='hover:text-black  transition-shadow  duration-500 cursor-pointer font-bold  text-white px-4'>iTask</h3>
            <ul
            className='flex cursor-pointer text-white align-middle justify-end gap-3 w-1/3 px-4'>
                <li className=' cursor-pointer hover:font-bold transition-all duration-100'>Home</li>
            <li className=' cursor-pointer hover:font-bold transition-all duration-100'>Your Tasks</li>

            </ul>

        </nav>
      
    </div>
  )
}

export default Navbar
