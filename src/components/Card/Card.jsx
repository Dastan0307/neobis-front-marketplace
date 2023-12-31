import React, { useState } from "react";
import { Typography } from 'antd';
import Backdrop from '@mui/material/Backdrop';
import { HeartOutlined } from '@ant-design/icons';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ToastContainer } from "react-toastify";
import hugeIcon from '../../assets/img/more-vertical.svg';
import editIcon from '../../assets/img/Frame 851212066.svg'
import deleteIcon from '../../assets/img/Frame 8512120661.svg'
import EditCard from "../../screens/UpdateCard/EditCard";
import DeleteCard from "../../screens/UpdateCard/DeleteCard";
import AboutCard from "../../screens/UpdateCard/AboutCard";
import './card.scss';

const { Paragraph } = Typography;

const ProductCard = ({ handleClickOpen, product }) => {
  const [open, setOpen] = useState(false);
  const [openAboutCard, setOpenAboutCard] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(99);
  const [id, setId] = useState(null);

  const handleCloseAboutCard = () => {
    setOpenAboutCard(false);
  };

  const handleOpenAboutCard = () => {
    setOpenAboutCard(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
  };

  const handleOpen = () => {
    setOpenEdit(true);
  };

  const openCardEdit = () => {
    setOpen(false)
    handleOpen()
  }

  const openDeleteCard = () => {
    setOpenDelete(true);
  };

  const closeDeleteCard = () => {
    setOpenDelete(false)
  }

  const openCardDelete = (id) => {
    setOpen(false)
    openDeleteCard()
    setId(id)
  };

  function handleDisLike() {
    setLike(false)
    setLikeCount(likeCount-1)
  };
  function handleLike() {
    setLike(true)
    setLikeCount(likeCount+1)
  };
  function setOpenMenu(id) {
    setOpen(true)
  };

  return (
        <div className="card" >
          <ToastContainer />
            <img
            className="card__img"
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            onClick={handleClickOpen}
            />
            <p className="card__description" onClick={() => handleOpenAboutCard()} >{product?.title}</p>
            <p className="card__description_price" >{product?.price} $</p>
            <div className="card__fuctional">
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '5px'}}>
                  {
                    like ? 
                    <FavoriteIcon style={{width: '20px', cursor: 'pointer', color: 'red', marginRight: '5px'}} onClick={() => handleDisLike()}/> : 
                    <HeartOutlined style={{width: '24px', cursor: 'pointer' }} onClick={() => handleLike()}/>
                  }
                  <Paragraph className="card__price">{ likeCount }</Paragraph>
                  </div>
                <img 
                  src={hugeIcon} 
                  alt="error" 
                  width={24} 
                  style={{cursor: 'pointer'}} 
                  onClick={() => setOpenMenu(product.id)} />
            </div>
            {
              open ? 
              <div className="card__btns">
                <button  
                  onClick={() => openCardEdit()}>
                  <img src={editIcon} alt="Error :(" />
                  Изменить
                </button>
                <hr />
                <button 
                  onClick={() => openCardDelete(product.id)}>
                    <img src={deleteIcon} alt="Error :(" />
                    Удалить
                </button>
              </div>
            :
              ''
            }
            {/* edit card  */}
              <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={openEdit}
              >
                  <EditCard handleClose={handleClose} />
              </Backdrop>
              {/* delete card  */}
              <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={openDelete}
              >
                  <DeleteCard closeDeleteCard={closeDeleteCard} id={id} />
              </Backdrop>
              {/* inforation about card  */}
              <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={openAboutCard}
              >
                  <AboutCard handleCloseAboutCard={handleCloseAboutCard} />
              </Backdrop>
        </div>
  )
};

export default ProductCard;
