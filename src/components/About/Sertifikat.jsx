import React from 'react'

function Sertifikat() {
  return (
    <>
      <section className='py-4 px-4 bg-gradient-to-br from-background to-muted'>
        <div className="max-w-6xl mx-auto flex flex-col">
          <h1 className="text-4xl font-bold py-10">Certificates and Diplomas</h1>

          {/* Yuqoridagi 3 ta rasm */}
          <div className="grid grid-cols-3 gap-8">
            <img className="h-[450px] object-cover rounded-2xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZfMRMydJsTLbAlr2hfTaXyLBBGpIHHQ5DJg&s" alt="" />
            <img className="h-[450px] object-cover rounded-2xl" src="https://www.shutterstock.com/shutterstock/photos/1914122674/display_1500/stock-vector-certificate-template-awards-diploma-background-vector-modern-design-simple-elegant-and-luxurious-1914122674.jpg" alt="" />
            <img className="h-[450px] object-cover rounded-2xl" src="https://www.class-templates.com/images/CCO_PUB_102-Certificate_of_Completion-Formal_Big.jpg" alt="" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Sertifikat