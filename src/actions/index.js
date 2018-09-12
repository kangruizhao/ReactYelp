import axios from 'axios';
import { SubmissionError } from 'redux-form'
export const fetchComment=(id)=> async dispatch =>{

 const res = await axios.get('https://kangruiyammy.herokuapp.com/comment/get/'+id);

 dispatch({ type: "FETCH_COMMENT", payload: res.data.obj });
};

export const DeleAComment=(id,history)=> async dispatch =>{
 const res =await axios.delete('https://kangruiyammy.herokuapp.com/comment/delete/'+id);
 history.go(0)
 dispatch({ type: null, payload: null });
};
export const postComment=(id,comment,history)=> async dispatch =>{
  if (localStorage.getItem("token")===null) {
    history.push('/signin')
  }
  else{
    const token = localStorage.getItem('token')
              ? '?token=' + localStorage.getItem('token')
              : '';
    const combine={
           restId:id,
           comment:comment
    }
    const res = await axios.post('https://kangruiyammy.herokuapp.com/comment/new'+token, combine);
    history.go(0);
    dispatch({ type:null, payload: null });
  }
}
export const fetchRest=()=> async dispatch =>{
 const res = await axios.get('restaurant/all');
 console.log(res)
 dispatch({ type: "FETCH_REST", payload: res.data.obj });
};
export function SignUp(user,history){
  if (localStorage.getItem("token")===null) {
    history.push('/signin')
  }
console.log(user)
}
export const fetchARest=(id)=> async dispatch =>{
 const res =await axios.get('https://kangruiyammy.herokuapp.com/restaurant/get/'+id);
 console.log(res)
 dispatch({ type: "FETCH_OREST", payload: res.data.obj });
};
export const DeleARest=(id,history)=> async dispatch =>{
 const res =await axios.delete('https://kangruiyammy.herokuapp.com/restaurant/delete/'+id);
 history.push('/')
 dispatch({ type: null, payload: null });
};
export const PostRest=(rest,history)=> async dispatch =>{
  const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
   const res = await axios.post('restaurant/newRestaurant'+token, rest);
   history.push('/');
    dispatch({ type:null, payload: null });
};
export const PatchRest=(id,rest)=> async dispatch =>{
   const res =await axios.patch('https://kangruiyammy.herokuapp.com/restaurant/edit/'+id, rest);
   dispatch({ type: "FETCH_OREST", payload: res.data });
};



export const SignIn =(user)=> async dispatch => {
  const res = await axios.post('/user/signin', user)
  .catch(function (error) {
    //throw { username: 'That username is taken' }
     if (error.response.status ===401) {
         console.log(error.response.data);
         throw new SubmissionError(
           {
            _error: 'username or password invalid!'
          }
        )
     }
  });
  //console.log(res.data);
  localStorage.setItem('userId', res.data.userId);
  localStorage.setItem('un', res.data.name);
  localStorage.setItem('token', res.data.token);
  dispatch({ type: "AUTH", payload: res.data.obj });
};
export const AignUp =(user,history)=> async dispatch => {
  const res = await axios.post('/user/signup', user)
  .catch(function (error) {
    //throw { username: 'That username is taken' }
     if (error.response.status ===500) {
       throw new SubmissionError({
        username: 'User already existed',
        _error: 'SignUp failed!'
      })
     }
  });
  console.log(res.data);
  localStorage.setItem('userId', res.data.userId);
  localStorage.setItem('un', res.data.name);
  localStorage.setItem('token', res.data.token);

  dispatch({ type: "AUTH", payload: res.data.obj });
};
