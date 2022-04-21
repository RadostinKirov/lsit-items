async function getAllPosts() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            methode: 'GET'
        });
        let data = await response.json();
        //       console.log('data -> ', data);
        return data;
    } catch (err) {
        throw err;
    }
}

async function getPostById(id) {
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'GET'
        });
        let data = await response.json();
      
        return data;
    } catch (err) {
      
        throw err;
    }
}

async function delPostById(id) {
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE'
        });
        let data = await response.json();
              console.log('data -> ', data);
        return data;
    } catch (err) {
        throw err;
    }
}

export {
    getAllPosts,
    getPostById,
    delPostById
}