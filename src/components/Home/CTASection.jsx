import Button from '@mui/material/Button'
import logo from '../../assets/imgs/logo-1.png'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useState } from 'react';

const CTASection = () => {

  const [open, setOpen] = useState(false);

  return (
    <section className="py-20 bg-[#054a86]">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 gap-y-3.5">
        <img src={logo} alt="" className="object-cover h-[70px] inline-block" />
        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          We provide knowledge in various fields and help everyone grow and develop.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          <Button
            variant="contained"
            startIcon={<PlayCircleIcon />}
            onClick={() => setOpen(true)}
            sx={{
              paddingX: 4,
              paddingY: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: 3,
              backgroundColor: '#ffffff',
              color: '#054a86',
              '&:hover': {
                backgroundColor: '#e2e8f0',
              },
            }}
          >
            Intro video
          </Button>
          {open && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-lg w-[80%] max-w-[600px] relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-black"
                  onClick={() => setOpen(false)}
                >
                  ✖️
                </button>

                <div className="aspect-video">
                  <iframe
                    width="560" height="315"
                    src="https://www.youtube.com/embed/S9bCLPwzSC0?si=ZoogQxyvn08XFVve"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen>
                  </iframe>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}

export default CTASection
