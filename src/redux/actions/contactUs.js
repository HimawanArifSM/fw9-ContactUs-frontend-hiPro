import {createAsyncThunk} from '@reduxjs/toolkit';
import qs from 'qs';
import http from '../../helpers/http';

export const postContactUs = createAsyncThunk(
    '/contact-us',
    async request => {
      const results = {};
      console.log(request);
      try {
        const send = qs.stringify(request);
        console.log(send);
        const {data} = await http().post('/contact-us', send);
        // console.log(data);
        results.data = data.results;
        results.message = data.message;
        return results;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
);

export const getContactUs = createAsyncThunk(
    '/contact-us',
    async request => {
      const results = {};
      try {
        const {data} = await http().get('/contact-us');
        // console.log(data);
        results.data = data.results;
        results.message = data.message;
        return results;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
);