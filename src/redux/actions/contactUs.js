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
    '/get-contact-us',
    async({lim, pages, seacrhed, sorted, sortedBy, seacrhedBy}) => {
      const results = {};
      try {
        const page = parseInt(pages) || 1;
        const limit = parseInt(lim) || 5;
        const keyword = seacrhed
        const sorting = sorted
        const sortBy = sortedBy
        const seacrhBy = seacrhedBy
        const qs = new URLSearchParams({limit, page, keyword, sorting, sortBy, seacrhBy}).toString()
        const {data} = await http().get('/contact-us?'+qs);
        // console.log(data);
        results.data = data.results;
        results.pageInfo = data.pageInfo;
        results.message = data.message;
        return results;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
);

export const deleteContactUs = createAsyncThunk(
  '/delete-contact-us',
  async ({id, cb}) => {
    // const results = {};
    try {
      const {data} = await http().delete('/contact-us/'+id);
      console.log(data);
      // results.data = data.results;
      // results.message = data.message;
      cb()
      return 0;
    } catch (e) {
      console.log(e);
      return e;
    }
  },
);

export const editContactUs = createAsyncThunk(
  '/edit-contact-us',
  async ({id, request}) => {
    console.log(id+" ini id");
    console.log(request+' ini req');
    const results = {};
    try {
      const send = qs.stringify(request)
      console.log(send+' ini send');
      const {data} = await http().patch('/contact-us/'+id, send);
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