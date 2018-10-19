// import React from 'react';

const fetchteamdata = (routeAddress, searchBody) => {
  return fetch(routeAddress, { // miksi return?
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(searchBody) 
  })
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    return data;
  })
  .catch(err => console.log('fetchteamdata', err));
};

export default fetchteamdata;

