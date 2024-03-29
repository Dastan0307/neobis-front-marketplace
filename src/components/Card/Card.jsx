import React, { useState } from "react";
import { Typography } from 'antd';
import Backdrop from '@mui/material/Backdrop';
import { HeartOutlined } from '@ant-design/icons';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { hugeIcon, editIcon, deleteIcon} from '../../assets'
import EditCard from "../../screens/UpdateCard/EditCard";
import DeleteCard from "../../screens/UpdateCard/DeleteCard";
import './card.scss';

const { Paragraph } = Typography;

const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(99);
  const [id, setId] = useState(1);

  function handleClose() {
    setOpenEdit(false);
  }

  const handleOpen = () => {
    setOpenEdit(true)
  };

  const openCardEdit = (id) => {
    setOpen(false)
    handleOpen()
    setId(id)
  };

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
  function setOpenMenu() {
    setOpen(true)
  };


  return (
        <div className="card" >
            <img
            className="card__img"
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <p className="card__description" >{product?.title}</p>
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
                  onClick={() => setOpenMenu()} 
                />
            </div>
            {
              open ? 
              <div className="card__btns">
                <button  
                  onClick={() => openCardEdit(product.id)}
                >
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
                  <EditCard handleClose={handleClose} id={id} />
              </Backdrop>
              {/* delete card  */}
              <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={openDelete}
              >
                  <DeleteCard closeDeleteCard={closeDeleteCard} id={id} />
              </Backdrop>
        </div>
  )
};

export default ProductCard;
