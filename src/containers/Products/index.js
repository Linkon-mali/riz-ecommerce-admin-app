import React, {useState} from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import { generatePublicUrl } from '../../urlConfig';
import { addProduct, deleteProductById } from "../../actions";
import './style.css';


const Products = (props) => {

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState('');
  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const category = useSelector(state => state.category);
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();

  const handleShow = () => setShow(true);

  const handleClose = () => {
      // setShow(false);


  // const submitProductForm = () => {
    const form = new FormData();
    form.append('name', name);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('description', description);
    form.append('category', categoryId);

    for(let pic of productPictures){
        form.append('productPicture', pic);
    }

    dispatch(addProduct(form));

    setShow(false);
// }
}

  const createCategoryList = (categories, options = []) => {
    for(let category of categories){
        options.push({
            value: category._id,
            name: category.name,
            parentId: category.parentId,
            type: category.type
        });
        if(category.children.length > 0){
            createCategoryList(category.children, options)
        }
    }
    return options;
  }

  const handleProductPictures = (e) => {
    setProductPictures([
        ...productPictures,
        e.target.files[0]
    ]);
  }

  const renderProducts = () => {
    return(
    <Table striped bordered hover variant="dark" style={{fontSize: 14}}>
        <thead>
            <tr>
            <th>No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            </tr>
        </thead>
        <tbody>
            {
                product.products.length > 0 ?
                product.products.map(product => 
                    <tr onClick={() => showProductDetailsModal(product)} key={product._id} style={{cursor: 'pointer'}}>
                    <td>No</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.category.name}</td>
                    <td>
                    <button onClick={() => showProductDetailsModal(product)}>
                      info
                    </button>
                    <button
                      onClick={() => {
                        const payload = {
                          productId: product._id,
                        };
                        dispatch(deleteProductById(payload));
                      }}
                    >
                      del
                    </button>
                  </td>
                    </tr>
                ) : null
            }
        </tbody>
    </Table>
    )
}

const renderAddProductModal = () => {
    return (
        <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={`Add New Product`}
    >
        
        <Input
            name="Name"
            value={name}
            placeholder={`Product Name`}
            onChange={(e) => setName(e.target.value)}
        />
        <Input
            name="Quantity"
            value={quantity}
            placeholder={`Quantity`}
            onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
            name="Price"
            value={price}
            placeholder={`Price`}
            onChange={(e) => setPrice(e.target.value)}
        />
        <Input
            name="Description"
            value={description}
            placeholder={`Description`}
            onChange={(e) => setDescription(e.target.value)}
        />
        <select 
        className='form-control'
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        >
            <option>select category</option>
            {
                createCategoryList(category.categories).map(option =>
                    <option key={option.value} value={option.value}>{option.name}</option>
                )
            }
        </select>
        {
            productPictures.length > 0 ?
            productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
        }
        <hr/>
        <input type='file' name='productPictures' onChange={handleProductPictures} />
    
    </Modal>
    );
}

const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
}

const showProductDetailsModal =(product) => {
    setProductDetails(product);
    setProductDetailModal(true);
    console.log(product);
}

const renderProductDetailsModal = () => {

    if(!productDetails){
        return null;
    }

    return(
        <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={'Product details'}
        size="lg"
        >
            <Row>
                <Col md='6'>
                    <label className='key'>Name</label>
                    <p className='value'>{productDetails.name}</p>
                </Col>
                <Col md='6'>
                    <label className='key'>Price</label>
                    <p className='value'>{productDetails.price}</p>
                </Col>
                <Col md='6'>
                    <label className='key'>Quantity</label>
                    <p className='value'>{productDetails.quantity}</p>
                </Col>
                <Col md='6'>
                    <label className='key'>Category</label>
                    <p className='value'>{productDetails.category.name}</p>
                </Col>
            </Row>
            <Row>
                <Col md='12'>
                    <label className='key'>Description</label>
                    <p className='value'>{productDetails.description}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                <label className='key'>Product Pictures</label>
                <div style={{display: 'flex'}}>
                {productDetails.productPictures.map(picture => 
                        <div className='productImageContainer'>
                            <img src={generatePublicUrl(picture.img)} />
                        </div>
                    )}
                </div>
                </Col>
            </Row>
        </Modal>
    )
}

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <h3>Category</h3>
                  <div className='actionBtnContainer'>
                      <span>Actions:</span>
                      <button onClick={handleShow}>Add</button>
                  </div>
              </div>
          </Col>
        </Row>
        <Row>
            <Col md={12}>
            {
                renderProducts()
            }
            </Col>
        </Row>
      </Container>
            {
                renderAddProductModal()
            }
            {
                renderProductDetailsModal()
            }
    </Layout>
  )
}

export default Products