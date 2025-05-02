import React from 'react'

const TableStorage = ({tableName, color, borderColor, onClick}) => {
  return (
    <>
        <div onClick={()=>onClick()} className='w-[99vw] flex justify-center pt-4 pb-4'>
            <div className={`${color}  text-white hover:border-3 cursor-pointer hover:${borderColor} w-[50vw] h-[20vh] rounded-xl flex  justify-center items-center text-semibold`} >
                {tableName}
            </div>
        </div>
    </>
  )
}

export default TableStorage