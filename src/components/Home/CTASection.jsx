import Button from '@mui/material/Button'
import logo from '../../assets/imgs/logo-1.png'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const CTASection = () => {
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
        </div>
      </div>
    </section>
  )
}

export default CTASection
