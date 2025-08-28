import React from 'react'

function Galereya() {
  return (
    <>
      <section className='py-4 px-4 bg-gradient-to-br from-background to-muted'>
        <div className="max-w-6xl mx-auto flex flex-col">
          <h1 className="text-4xl font-bold py-5">Media Gallery</h1>

          {/* Yuqoridagi 3 ta rasm */}
          <div className="grid grid-cols-3 gap-4">
            <img className="w-full h-auto object-cover rounded-2xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPNy10N_EIJk3Zmo0XxnuKzcvp2ZrPS9Al0A&s/" alt="" />
            <img className="w-full h-auto object-cover rounded-2xl" src="https://st2.depositphotos.com/1594308/10487/i/950/depositphotos_104870148-stock-photo-team-working-at-office.jpg" alt="" />
            <img className="w-full h-auto object-cover rounded-2xl" src="https://media.gettyimages.com/id/2094337676/photo/diverse-team-working-together-in-modern-co-working-space.jpg?s=612x612&w=gi&k=20&c=4jL7v-AdE2-v9BZEriGcpzc4KAnf6eyu1fUwyvvvQzY=" alt="" />
          </div>

          {/* Pastdagi 2 ta rasm */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <img className="w-full h-[400px] object-cover rounded-2xl" src="https://agcdn-1d97e.kxcdn.com/wp-content/uploads/2017/02/alphagamma-teamwork-3-steps-to-build-a-strong-team-entrepreneurship.jpg" alt="" />
            <img className="w-full h-[400px] object-cover rounded-2xl" src="https://thumbs.dreamstime.com/b/team-teamwork-goals-strategy-vision-business-support-concept-50274164.jpg" alt="" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Galereya