'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import NavBar from '../Components/navbar';
import SideBar from '../Components/sidebar';
import configAPI from './../.config';


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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // It's safe to use localStorage here
      localStorage.setItem('key', 'value');
    }
  }, []);
  

  useEffect(() => {
    let isMounted = true;

    const fetchData = () => {
      axios.get(`${apiUrl}/`, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      })
      .then(response => {
        if (response.status === 500) {
          router.push('/home'); 
          return;
        }

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

          // Log the created_at and date_for_event fields for each document
          const documents = response.data.documents;
          
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 500) {
          router.push('/signin'); // Use router directly
        }
      });
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [router, apiUrl]);

  const handleLogout = async () => {
    try {
      await axios.post(`${apiUrl}/logout`, null, {
        withCredentials: true, 
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setAuthenticated(false);
      setUsername(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className={`h-screen dark:bg-[#011E2B] `}>
      <div className='fixed z-20'>

      <NavBar />
      
      </div>
      <div className=' flex overflow-hidden z-10'>

        <div className='fixed z-20'>
        <SideBar />
        </div>
        <div>

        </div>


        {loading && <p>Loading data...</p>}
        {error && <p>{error}</p>}

       

        {documents && (
          <div className='relative z-0 ml-8 w-full xl:ml-80 mt-36 mr-10 mb-2  grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-9'>
            {documents.map((document, index) => (
              <div key={index} className='relative w-96 card border border-none '>
                <figure>
                  <Image
                    src={`data:image/png;base64,${document.image_data}`}
                    alt={`Image ${index}`}
                    width={300}
                    height={300}
                    className='w-96 h-48 object-cover border-none rounded-t-md'
                  />
                </figure>
                <div className="card-body w-96 bg-slate-100 dark:bg-[#081216] border-none rounded-b-md ">
                  <h1 className='card-title font-bold'>{document.title}</h1>
                  <p className='mt-2 font-semibold w-80 break-words'>
                    {document.description}
                  </p>
                  <div className='flex flex-wrap mt-2'>
                    <div className='badge badge-outline mx-1 '>От {document.user_name}</div>
                    <div className='badge badge-outline mx-1 '>{document.date_for_event}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

     
      </div>
    </div>
  );
};

export default Main;