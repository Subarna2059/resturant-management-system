import React from 'react'

export const AddStockModal = () => {
    const [data, setData] = useState()
    const categories = ["cold drink", "hard drink", "beer", "wine"]
  return (
    <>
    <div className='bg-black z-10 opacity-50 w-[100vw] h-[100vh] fixed top-0 left-0'>
    </div>
        <div className=' fixed z-30  top-0 left-0  w-[100vw] h-[100vh] flex justify-center items-center'>
            <div className='xl:w-[30vw] bg-white xl:h-[40vh]'>
                <div className='w-[100%] h-[100%] flex flex-col items-center'>
                    <div>
                        Add Stock
                    </div>
                    <div>
                        <div>
                            <label htmlFor="">Title</label>
                            <input type="text" className='border-1 block' name='title'/>
                        </div>
                        <div>
                            <label htmlFor="">quantity</label>
                            <input type="number" min={0} className='border-1 block' name='quatity'/>
                        </div>
                        <div>
                            <label htmlFor="">Category</label>
                            <select>
                                {
                                    categories.map((items, index) => {
                                        return (
                                    <       option key={index} value="">{items}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className='w-[100%]  flex justify-end'>
                    <button onClick={() => handleOnSubmit()} className='mr-4 px-6 py-2 cursor-pointer rounded-md bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold shadow-md hover:shadow-lg transition duration-300 ease-in-out'>Sumbit</button>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}
