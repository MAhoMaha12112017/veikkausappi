// import React from 'react';

const savematchdata = (routeAddress, searchBody) => {
  return fetch(routeAddress, { 
    method: "POST", 
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(searchBody) 
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    return data;
  })
  .catch(err => console.log('savematchdata', err));
};

export default savematchdata;

