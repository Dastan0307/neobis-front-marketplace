import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from "react-router-dom";
import profileIcon from '../../assets/img/Frame 851212073.svg';
import heartIcon from '../../assets/img/Frame 851212065.svg';
import productIcon from '../../assets/img/Frame 8512120651.svg';
import exitIcon from '../../assets/img/Frame 8512120652.svg';
import backIcon from '../../assets/img/Frame 851211999.svg';
import './profile_liked.scss';
import Card from '../../components/Card/Card';


const ProfileLiked = () => {
    const navigate = useNavigate();


  return (
        <div className="container" >
            <div className="profile__menu_list">
                <div className="profile__user_name" onClick={() => navigate('/profile')}>
                    <img src={profileIcon} alt="Error :(" style={{width: '60px'}} />
                    <p>Алесястар<br /><span>sergeykrash01</span></p>
                </div>
                <div className="profile__menu_btns">
                    <button><p><img src={heartIcon} alt="Error :(" style={{width: '30'}} />Понравившиеся</p> <ArrowForwardIosIcon /></button>
                    <button><p><img src={productIcon} alt="Error :(" style={{width: '30'}} />Мои товары</p> <ArrowForwardIosIcon /></button>
                    <button><p><img src={exitIcon} alt="Error :(" style={{width: '30'}} />Выйти</p> <ArrowForwardIosIcon /></button>
                </div>
            </div>
            <div className="profile__user">
                <div className="back__btn">
                    <button><img src={backIcon} alt="Error :(" />Назад</button>
                    <p>Понравившиеся</p>
                </div>
                <div className="product__list">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
  )
};

export default ProfileLiked;
