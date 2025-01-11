import React from 'react'

const ResultsTitle = ({title, titleResult}: {title: string, titleResult:string}) => {
  return (
    <div>
        <p className='uppercase  text-centerfont-bold text-darkGray'>{title}</p>
        <h3  className='uppercase text-center font-bold text-2xl text-veryDarkGray '> {titleResult} </h3>
    </div>
   
  )
}

export default ResultsTitle