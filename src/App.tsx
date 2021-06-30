import React, { useState } from 'react';
import { useQuery } from 'react-query';

// @material-ui
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

// styles
import { Wrapper } from './App.styles';

// Types
interface CartItemType {
  id: number;
  catergory: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType> => await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const { data, isLoading, error } = useQuery<CartItemType>('products', getProducts);

  console.log(data);

  return (
    <div>
      <h1>11</h1>
    </div>
  );
};

export default App;
