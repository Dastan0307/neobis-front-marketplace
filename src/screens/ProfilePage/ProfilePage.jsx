import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InputMask from 'react-input-mask';
import Logout from "../../screens/Auth/Logout/Logout";
import { 
    profileIcon, 
    heartIcon,
    productIcon,
    exitIcon,
    backIcon,
    phoneIcon
} from '../../assets';
import { checkAuth, addNumberUser } from '../../store/slices/auth/authSlice';
import Timer from "./Timer";
import AddProfile from "./AddProfile";
import EditProfile from "./EditProfile";
import { EditPhoneNumber } from "./EditPhoneNumber";
import './profile.scss';

const ProfilePage = (props) => {
    const [phone_number, setPhoneNumber] = useState('');
    const [open, setOpen] = useState(false);
    const [addProfile, setAddProfile] = useState(false);
    const [changePhoneNumber, setChangePhoneNumber] = useState(false);
    const [logout, setLogout] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [editPhoneNumber, setEditPhoneNumber] = useState(false);
    const [photos, setPhotos] = useState('');
    const [files, setFiles] = useState([]);

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

    const addProfileClose = () => {
        setAddProfile(false);
    };
    const addProfileOpen = () => {
        setAddProfile(true);
    };

    const editProfileClose = () => {
        setEditProfile(false);
    };
    const editProfileOpen = () => {
        setEditProfile(true);
    };

    const editPhoneNumberclose = () => {
        setEditPhoneNumber(false);
    };
    const editPhoneNumberOpen = () => {
        setEditPhoneNumber(true);
    };

    function handleNumber() {
        dispatch(addNumberUser(phone_number));
    };
  
    function checkPhoneNumber() {
        handleNumber()
        changePhoneNumberOpen()
        handleClose()
    };

    useEffect(() => {
        if(localStorage.getItem('token')) {
            dispatch(checkAuth());
        };
      }, [dispatch]);




  return (
    <div className="container" >
        <div className="profile__menu_list">
            <div className="profile__user_name" >
                {
                    userImg ? 
                    <img src={userImg} alt="Error :(" style={{width: '60px',height: '60px',  borderRadius: '100px'}} /> :
                    <img src={profileIcon} alt="Error :(" style={{width: '60px'}} /> 
                }
                <p>{username ? username : ''}<br /><span>{email ? email : ''}</span></p>
            </div>
            <div className="profile__menu_btns">
                <button 
                    onClick={() => navigate('/profile_liked')}>
                    <p>
                        <img src={heartIcon} alt="Error :(" style={{width: '30'}} />
                        Понравившиеся
                    </p> 
                    <ArrowForwardIosIcon />
                </button>
                <button 
                    onClick={() => navigate('/my-products')}>
                    <p>
                        <img src={productIcon} alt="Error :(" style={{width: '30'}} />
                        Мои товары
                    </p>
                    <ArrowForwardIosIcon />
                </button>
                <button 
                    onClick={logoutCardOpen}>
                    <p>
                        <img src={exitIcon} alt="Error :(" style={{width: '30'}} />
                        Выйти
                    </p> 
                    <ArrowForwardIosIcon />
                </button>
            </div>
        </div>
        <div className="profile__user">
            <div className="back__btn">
                <button 
                    onClick={() => navigate('/')} >
                    <img src={backIcon} alt="Error :(" />
                    Назад
                </button>
                <p>Профиль</p>
            </div>
            <div className="profile__img">
                <input 
                    onChange={handleChange} 
                    ref={inpRef} 
                    type="file" 
                    style={{display: 'none'}} 
                />
                {
                    userImg ? 
                    <>
                        <img src={userImg} alt="Error:(" style={{width: '80px',height: '80px',  borderRadius: '100px'}} />
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
                {
                    name != null | undefined || 
                    last_name != null | undefined || 
                    birth_date!= null | undefined ?
                    <button className="profile__btn_update" onClick={editProfileOpen}>Изменить профиль</button> :
                    <button className="profile__btn_update" onClick={addProfileOpen}>Добавить профиль</button> 
                }
            <div className="profile__contact_user">
               {
                user_number ?
                    <button 
                        className="profile__contact_btn" 
                        onClick={editPhoneNumberOpen}>
                        Изменить номер
                        <strong 
                            style={{ color: 'rgba(73, 73, 73, 1)', fontSize: '20px' }}>
                            {user_number}
                        </strong> 
                    </button>
                    :
                    <button 
                        className="profile__contact_btn" 
                        onClick={handleOpen}>Добавить номер
                            <span>0(000) 000 000</span>
                    </button>
               } 
                <hr />
                <p>{email ? email : ''}</p>
                {/* add profile  */}
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={addProfile}
                >
                    <ClearIcon className="profile__update_icon" onClick={addProfileClose} />
                    <AddProfile addProfileClose={addProfileClose} />
                </Backdrop> 
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={editProfile}
                >
                    <ClearIcon className="profile__update_icon" onClick={editProfileClose} />
                    <EditProfile editProfileClose={editProfileClose} />
                </Backdrop> 
                
                {/* add phone number  */}
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <ClearIcon className="profile__clear_icon" onClick={handleClose} />
                    <div className="profile__edit_number">
                        <h3 className="profile__title">Добавить номер телефона</h3>
                        <img src={phoneIcon} alt="Error :(" style={{width:'80px', marginBottom: '40px'}} />
                        <h4>Введите номер телефона</h4>
                        <p className="profile__contact_p">Мы отправим вам СМС с кодом подтверждения</p>
                        <InputMask
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                            mask="0(999) 999-999" 
                            placeholder="0 (999) 999-999"
                        />
                        {
                            phone_number.length > 0 ? 
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
                    <Timer phone_number={phone_number} changePhoneNumberClose={changePhoneNumberClose} />
                </Backdrop> 
                {/* Edit phone number  */}
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={editPhoneNumber}
                >
                    <ClearIcon className="profile__icon_edit" onClick={editPhoneNumberclose} />
                    <EditPhoneNumber editPhoneNumberclose={editPhoneNumberclose} />
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
