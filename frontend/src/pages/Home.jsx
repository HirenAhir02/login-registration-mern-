import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import {ToastContainer} from 'react-toastify';

function Home() {

    const [loggedInuser, setLoggedInuser] = useState('');
    const [products, setProducts] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        setLoggedInuser(localStorage.getItem('loggedInuser'));
    },[])

    const handleLogout = (e) => {
        localStorage.clear();
        handleSuccess('User Loggedout')
        setTimeout(()=>{
            navigate('/login');
        },1000)
    }

    const fetchProducts = async () => {
        try {
            const url ="https://login-registration-mern-api.vercel.app/product";
            const response = await fetch(url,{
                headers:{
                    'Authorization' : localStorage.getItem('token')
                }
            });
            const result = await response.json();
            setProducts(result);
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(()=>{
        fetchProducts()
    },[])

  return (
    <div>
        <h1>Welcome {loggedInuser}</h1>
        <button onClick={handleLogout}>Logout</button>
        <div>
            {
                products && products.map((item,index) => (
                    <ul key={index}>
                        <span>{item.name} : {item.price}</span>
                    </ul>
                ))
            }
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Home