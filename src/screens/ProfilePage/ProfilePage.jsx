import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import profileIcon from '../../assets/img/Frame 851212073.svg';
import heartIcon from '../../assets/img/Frame 851212065.svg';
import productIcon from '../../assets/img/Frame 8512120651.svg';
import exitIcon from '../../assets/img/Frame 8512120652.svg';
import backIcon from '../../assets/img/Frame 851211999.svg';
import phoneIcon from '../../assets/img/Frame 860.svg';
import Logout from "../../screens/Auth/Logout/Logout";
import { checkAuth, addNumberUser } from '../../store/slices/auth/authSlice';
import './profile.scss';
import Timer from "./Timer";
import UpdateProfile from "./UpdateProfile";

const ProfilePage = (props) => {
    const [phone_number, setPhoneNumber] = useState('');
    const [open, setOpen] = useState(false);
    const [updateProfile, setUpdateProfile] = useState(false);
    const [changePhoneNumber, setChangePhoneNumber] = useState(false);
    const [logout, setLogout] = useState(false);
    const [photos, setPhotos] = useState('');
    const [files, setFiles] = useState([])

    const dispatch = useDispatch();
    const inpRef = useRef();
    const formData = new FormData();

    const handleChange = () => {
      const selectedPhoto = inpRef.current.files[0];
      if (selectedPhoto) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPhotos(e.target.result);
        };
        reader.readAsDataURL(selectedPhoto);
          setFiles(inpRef.current.files)
          formData.append(`files`, files);
        }};

    localStorage.setItem('user_photo', photos);
    const userImg = localStorage.getItem('user_photo');

    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const user_number = localStorage.getItem('phone_number');
    const name = localStorage.getItem('name');
    const last_name = localStorage.getItem('last_name');
    const birth_date = localStorage.getItem('birth_date');

    const navigate = useNavigate();

    const changePhoneNumberClose = () => {
        setChangePhoneNumber(false);
    };
    const changePhoneNumberOpen = () => {
        setChangePhoneNumber(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const logoutCardClose = () => {
        setLogout(false);
    };
    const logoutCardOpen = () => {
        setLogout(true);
    };

    const updateProfileClose = () => {
        setUpdateProfile(false);
    };
    const updateProfileOpen = () => {
        setUpdateProfile(true);
    };

    useEffect(() => {
        if(localStorage.getItem('token')) {
            checkAuth();
        };
      }, []);


    function handleNumber() {
        dispatch(addNumberUser({ phone_number }))
    }
  
    function checkPhoneNumber() {
        changePhoneNumberOpen()
        handleClose()
        handleNumber()
    };


  return (
    <div className="container" >
        <div className="profile__menu_list">
            <div className="profile__user_name" >
                <img src={profileIcon} alt="Error :(" style={{width: '60px'}} />
                <p>{username ? username : ''}<br /><span>{email ? email : ''}</span></p>
            </div>
            <div className="profile__menu_btns">
                <button onClick={() => navigate('/profile_liked')}><p><img src={heartIcon} alt="Error :(" style={{width: '30'}} />Понравившиеся</p> <ArrowForwardIosIcon /></button>
                <button><p><img src={productIcon} alt="Error :(" style={{width: '30'}} />Мои товары</p> <ArrowForwardIosIcon /></button>
                <button onClick={logoutCardOpen}><p><img src={exitIcon} alt="Error :(" style={{width: '30'}} />Выйти</p> <ArrowForwardIosIcon /></button>
            </div>
        </div>
        <div className="profile__user">
            <div className="back__btn">
                <button onClick={() => navigate('/')} ><img src={backIcon} alt="Error :(" />Назад</button>
                <p>Профиль</p>
            </div>
            <div className="profile__img">
                <input onChange={handleChange} ref={inpRef} type="file" style={{display: 'none'}} />
                {
                    userImg ? 
                    <>
                        <img src={userImg} alt="Error:(" style={{width: '80px', borderRadius: '100px'}} />
                        <button onClick={()=>{inpRef.current.click()}}>Изменить фото</button> 
                    </>
                    :
                    <>
                        <img src={profileIcon} alt="Error:(" style={{width: '80px'}} />
                        <button onClick={()=>{inpRef.current.click()}}>Выбрать фотографию</button>
                    </>
                }
            </div>
            <div className="profile__user_name">
                {name ? <p className="profile__active_text">{ name }</p> : <p>Имя</p>}
                <hr />
                {last_name ? <p className="profile__active_text">{ last_name }</p> : <p>Фамилия</p>}
                <hr />
                <p className="profile__active_text">{username ? username : ''}</p>
                <hr />
                {birth_date ? <p className="profile__active_text">{ birth_date }</p> : <p>Дата рождения</p>}
            </div>
                <button className="profile__btn_update" onClick={updateProfileOpen} >Изменить профиль</button>
            <div className="profile__contact_user">
                <button className="profile__contact_btn" onClick={handleOpen}>Добавить номер<span>0(000) 000 000</span></button>
                <hr />
                <p>{email ? email : ''}</p>
                {/* update profile  */}
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={updateProfile}
                >
                    <ClearIcon className="profile__update_icon" onClick={updateProfileClose} />
                    <UpdateProfile />
                </Backdrop> 
                
                {/* add number  */}
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <ClearIcon className="profile__clear_icon" onClick={handleClose} />
                    <div className="profile__edit_number">
                        <h3 className="profile__title">Изменить номер телефона</h3>
                        <img src={phoneIcon} alt="Error :(" style={{width:'80px', marginBottom: '40px'}} />
                        <h4>Введите номер телефона</h4>
                        <p className="profile__contact_p">Мы отправим вам СМС с кодом подтверждения</p>
                        <input type="text" placeholder="0(000) 000 000" onChange={(e) => setPhoneNumber(e.target.value)} />
                        {
                            user_number  ? 
                                <strong style={{ color: 'red' }}>{user_number}</strong> : 
                                <strong>0(000) 000 000</strong>
                        }
                        {
                            phone_number.length === 10 ? 
                            <button onClick={checkPhoneNumber} style={{background: 'rgba(84, 88, 234, 1)'}} 
                            >Далее</button> : 
                            <button style={{background: 'rgba(247, 247, 248, 1)'}}>Далее</button>
                        }
                    </div>
                </Backdrop>
                {/* Message for confirmation */}

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={changePhoneNumber}
                >
                    <ClearIcon className="profile__icon_checkNumber" onClick={changePhoneNumberClose} />
                    <Timer phone_number={phone_number} />
                </Backdrop> 
                {/* exit  */}

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={logout}
                >
                 <Logout logoutCardClose={logoutCardClose} />
                </Backdrop> 
            </div>
        </div>
    </div>
  )
};

export default ProfilePage;
