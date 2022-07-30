
export function* getRequest(url) {
 
 
  try {
    const res = yield fetch(url, {method: 'GET'});
    const response = yield res.json();
    return response;
  } catch (error) {
    
  }
}

