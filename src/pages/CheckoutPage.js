import React from 'react'

const CheckoutPage = () => {
  return (
    <>
    <div className='container md:w-[800px] sm:w-[400px] mx-auto py-[200px]'>
      <h4 className='text-center md:text-[40px] text-[26px] mb-[50px] '>Check Out Form</h4>
      <form className='flex justify-center items-center md:text-[30px] text-[23px] flex-col mb-[30px] '>
          <div className='mb-[30px] flex md:flex-row flex-col gap-[40px]'>
          <input type='text' placeholder='First Name' className='border-solid border-2 border-[#64748B] md:w-[380px] md:p-[5px] px-[10px]  rounded-2xl '/>
          <input type='text' placeholder='Last Name'  className='border-solid border-2 border-[#64748B] md:w-[380px] md:p-[5px] px-[10px]  rounded-2xl '/>
          </div>
          <input type='email' placeholder='E-mail'  className='border-solid border-2 border-[#64748B] md:w-[800px] md:p-[5px] px-[10px]  rounded-2xl  mb-[30px]' />
          <input type='text' placeholder='Address'  className='border-solid border-2 border-[#64748B] md:w-[800px] md:p-[5px] px-[10px] rounded-2xl  mb-[30px]'/>
          <button className=" p-[10px] px-[30px] bg-[#1D4ED8] text-[#fff] rounded">Submit</button> 
      </form>
    </div> 
  </>
  )
}

export default CheckoutPage