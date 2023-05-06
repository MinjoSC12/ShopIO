import React, {useEffect} from 'react';
import "./SearchPage.scss";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { STATUS } from '../../utils/status';
import Loader from '../../components/Loader/Loader';
import ProductList from '../../components/ProductList/ProductList';
import { fetchAsyncSearchProduct, getSearchProducts, setSearchTerm, getSearchProductsStatus, clearSearch } from '../../store/searchSlice';
import SocialBar from "../../components/socialBar/socialBar"

const SearchPage = () => {
  const dispatch = useDispatch();
  const {searchTerm } = useParams();
  const searchProducts = useSelector(getSearchProducts);
  const searchProductsStatus = useSelector(getSearchProductsStatus);
  console.log(searchTerm)
  useEffect(() => {
    dispatch(clearSearch());
    dispatch(fetchAsyncSearchProduct(searchTerm));
  }, [searchTerm]);

  if(searchTerm === "" || searchProducts.length === 0){
    return (
      <div className='container' style = {{
        minHeight: "82vh"
      }}>
        <div className='fw-5 text-danger py-5'>
          <h3>No se encontro el producto</h3>
        </div>
      </div>
    )
  } 
  

  return (
    <main>
      <div className='search-content bg-whitesmoke'style = {{
        minHeight: "82vh"
      }}>
        <div className='container'>
          <div className='py-5'>
            <div className='title-md'>
              <h3>Search results:</h3>
              {searchTerm}
            </div>
            <br />
            {
              searchProductsStatus === STATUS.LOADING ? <Loader /> : <ProductList products = {searchProducts} />
            }
          </div>
        </div>
      </div>
      <SocialBar />
    </main>
  )
}

export default SearchPage;