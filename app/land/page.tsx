'use client';
import React , { useEffect, useState, useRef } from 'react'; // Added useRef import
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import NavBar from '../Components/navbar';
import SideBar from '../Components/sidebar';
import configAPI from './../.config';
import videoFile from '../videos/BackGLand.mp4';
import PlayerFn from '../land/Video';
import ReactPlayer from 'react-player';
import { Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import { useInView } from 'react-intersection-observer';

import image1 from '../images/register.jpg';




interface DateInputProps {
  onDateChange: (date: Date) => void;
}



const Main: React.FC = () => {
  const [name, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[] | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter(); 
  const apiUrl = configAPI.apiUrl ;

  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [ref, inView] = useInView({
    triggerOnce: true, 
  });
  const [ref1, inView1] = useInView({
    triggerOnce: true, 
  })
  const [ref2, inView2] = useInView({
    triggerOnce: true, 
  })
  const [ref3, inView3] = useInView({
    triggerOnce: true, 
  })
  const [ref4, inView4] = useInView({
    triggerOnce: true, 
  })
  const [ref5, inView5] = useInView({
    triggerOnce: true, 
  })
  const [ref6, inView6] = useInView({
    triggerOnce: true, 
  })
  const [ref7, inView7] = useInView({
    triggerOnce: true, 
  })

   
  const animationClass = inView ? 'animate-fade-in-up' : '';
  const animationClass1 = inView1 ? 'animate-fade-in-up' : '';
  const animationClass2 = inView2 ? 'animate-fade-in-up' : '';
  const animationClass3 = inView3 ? 'animate-fade-in-up' : '';
  const animationClass4 = inView4 ? 'animate-fade-in-up' : '';
  const animationClass5 = inView5 ? 'animate-fade-in-up' : '';
  const animationClass6 = inView6 ? 'animate-fade-in-up' : '';
  const animationClass7 = inView7 ? 'animate-fade-in-up' : '';

  const toRegister = () => {
    router?.push('/');
  };

  const toSignIn = () => {
    router?.push('/signin');
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/`, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        });


        if (isMounted) {
          setUsername(response.data.name);
          setDocuments(response.data.documents);
          setLoading(false);
          console.log(response.data.name)

          // Check for new storage
          const storedName = localStorage.getItem('name');

          if (storedName !== response.data.name) {
            localStorage.removeItem('name');
            const welcomeMessage = `Добре дошли "${response.data.name}" !`;
            localStorage.setItem('name', response.data.name); 
            console.log(welcomeMessage);
          }

          else if (storedName === null) {
            router?.push('/signin');
            console.log('Впишете се!');
          }
          else if (storedName === response.data.name) {
            const response = `Здравейте отново ${storedName}! `;
            console.log(response);
          }
        }
      } catch (error:any) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 500) {
          router.push('/signin'); // Use router directly
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
   
    // eslint-disable-next-line
  }, [router]);

  const handleLogout = async () => {
    try {
      await axios.post(`${apiUrl}/logout`, null, {
        withCredentials: true, 
      });

      setAuthenticated(false);
      setUsername(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (

    <div className='h-screen dark:bg-black  '>
    
    <section className='-mt-0 '>
      <div className='h-screen absolute w-screen bg-black opacity-90  z-10'></div>
      <video src={require('../videos/BackGLand.mp4')} autoPlay muted loop className='-mt-12 fixed z-0' />
    </section>
    <div className='flex absolute top-0 left-0 h-screen w-screen items-center justify-center '>
  <section className='-ml-96 z-20 '>
    <div className='flex -ml-96 items-center mt-80 justify-left h-screen'>
      <div className='text-left'>
        <h1 className='mt-16 font-extrabold text-7xl text-white  uppercase animate-fade-in-up'>
          Добре дошли в&nbsp;
          <span className=''>
            Евентиум
          </span>
        </h1>
        <h2 className='font-extrabold text-3xl mt-2 text-white uppercase animate-fade-in-up'>
          Уеб приложението за&nbsp;
          <span className=''>
            събития
          </span>
        </h2>
        <div>

          <button onClick={toRegister} className='mt-4 bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-md text-lg animate-fade-in-up'>
           Създай акаунт
          </button>

          <button onClick={toSignIn} className='mt-4 ml-4 bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-md text-lg animate-fade-in-up'>
           Влез в акаунта си
          </button>

        </div>
      </div>
      <section className='absolute top-full left-0 w-screen h-screen bg-white flex justify-start '>
        <div className='p-10 max-w-2xl text-left animate-fade-in-up'>
          <h1 ref={ref} className={`text-3xl font-bold mb-4`} style={{ visibility: inView ? 'visible' : 'hidden' }}>Търсите ли лесен начин да откривате и споделяте интересни събития?</h1>
          <h2 ref={ref} className={`text-xl font-semibold mb-6`} style={{ visibility: inView ? 'visible' : 'hidden' }}>Eventium е вашият прозорец към света на събитията!</h2>
          <p ref={ref1} className={`text-lg mb-6`} style={{ visibility: inView1 ? 'visible' : 'hidden' }}>Eventium е иновативно уеб приложение, създадено с цел да улесни общественото споделяне на събития. С Eventium можете:</p>
          
          <div ref={ref2} className={`list-disc list-inside text-left mb-6`} style={{ visibility: inView2 ? 'visible' : 'hidden' }}>
            <div className="relative bg-cover bg-no-repeat bg-fixed w-screen p-64 -ml-10" style={{ backgroundImage: `url('https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}>
              <div className="absolute inset-0 bg-black opacity-60" style={{ pointerEvents: 'none' }}></div>
              <div ref={ref3} className={`text-white ${animationClass3}`} style={{ position: 'relative', zIndex: 1, visibility: inView3 ? 'visible' : 'hidden' }}>
                Лесно да публикувате свои собствени събития и да ги предоставите за преглед на широката публика.
              </div>
            </div>
            <div ref={ref4} className={`bg-cover bg-no-repeat bg-fixed w-screen p-64 -ml-10 bg-white ${animationClass4}`} style={{visibility: inView4 ? 'visible' : 'hidden' }}>
              Да преглеждате и избирате от богато разнообразие от събития, организирани от вашата общност.
            </div>
            <div className="relative bg-cover bg-no-repeat bg-fixed w-screen p-64 -ml-10" style={{ backgroundImage: `url('https://images.pexels.com/photos/433452/pexels-photo-433452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}>
              <div className="absolute inset-0 bg-black opacity-60" style={{ pointerEvents: 'none' }}></div>
              <div ref={ref5} className={`text-white ${animationClass5}`} style={{ position: 'relative', zIndex: 1, visibility: inView5 ? 'visible' : 'hidden' }}>
                Да определяте своите предпочитания и да получавате персонализирани предложения за събития, които биха ви харесали.
              </div>
            </div>
            <div ref={ref6} className={`bg-cover bg-no-repeat bg-fixed w-screen p-64 -ml-10 bg-white ${animationClass6}`} style={{ visibility: inView6 ? 'visible' : 'hidden' }}>
              Да взаимодействате с други потребители и да споделяте информация за събития.
            </div>
            <div className="relative bg-cover bg-no-repeat bg-fixed w-screen p-64 -ml-10" style={{ backgroundImage: `url('https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}>
              <div className="absolute inset-0 bg-black opacity-60" style={{ pointerEvents: 'none' }}></div>
              <div ref={ref7} className={`text-white ${animationClass7}`} style={{ position: 'relative', zIndex: 1, visibility: inView7 ? 'visible' : 'hidden' }}>
                Да допринасяте за разнообразието и активността в общността си.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </section>
    
  </div>
  </div>

  );
};

export default Main;