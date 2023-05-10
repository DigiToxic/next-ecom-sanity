import React from 'react'
import Link from 'next/link'

function Home() {
  return (
    <div className='home-page-container'>
      <img className='warhammer-pic1' src='photos/Warhammer-pic1.png' alt='Warhammer Figure'></img>
      <div className='home-side-pictures'>
      <img className='warhammer-pic2' src='photos/Warhammer-pic2.png' alt='Warhammer Figure'></img>
      <img className='warhammer-pic3' src='photos/Warhammer-pic3.png' alt='Warhammer Figure'></img>
      </div>
      <div className='welcome-box'>
        <h1>Bring It<br/>To Life</h1>
        <Link href="/shop">Shop Now</Link>
      </div>
    </div>
  )
}

export default Home
