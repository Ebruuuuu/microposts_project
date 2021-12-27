// http modülündeki http objesi app dosyasına aktarıldı.
import { http} from './http';
//ui modülündeki ui objesi app dosyasına aktarıldı.
import {ui} from './ui';

//Get posts on DOM load
document.addEventListener('DOMContentLoaded',getPosts);

//Listen for new add post and update post

document.querySelector('.post-submit').addEventListener('click',
submitPost);

//Listen for delete post

/*event delegation yöntemi kullanıldı, çünkü delete ikonunun sayısı(child elements) birden çoktur.
Bu nedenle kapsayıcı parent element olan posts div'i ele alındı.*/
document.querySelector('#posts').addEventListener('click',deletePost);

//Listen for edit state
//event delegation
document.querySelector('#posts').addEventListener('click',enableEdit);

// Listen for cancel
//event delegation
document.querySelector('.card-form').addEventListener('click', cancelEdit);


//Var olan postları aldık.
function getPosts(){
    http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data)) //response resolved(olumlu) demektir.
    .catch(err => console.log(err)); //response reject(olumsuz) demektir.
}

function submitPost(){

    const title=document.querySelector('#title').value;
    const body=document.querySelector('#body').value;
    const id=document.querySelector('#id').value; //hidden value

    //ES6 Object Literal
    const data={
      title,
      body,
      id

    }

    // Validate input
  if(title === '' || body === '') {
    ui.showAlert('Please fill in all fields', 'alert alert-danger');
  } else {
    // Check for ID
    //new id
    if(id === '') {
      // Create New Post
      http.post('http://localhost:3000/posts', data)
      .then(data => {
        ui.showAlert('Post added', 'alert alert-success');
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err));
      
    } else {
        
      // Update Post
      http.put(`http://localhost:3000/posts/${id}`, data)
     .then(data => {
        ui.showAlert('Post updated', 'alert alert-success');
        //default duruma geri dönülür.
        ui.changeFormState('add');
        getPosts();
      })
      .catch(err => console.log(err));
    }

  }

}

//Delete Post
function deletePost(e){
    //e.target=delete icon
    if(e.target.parentElement.classList.contains('delete')){
        const id=e.target.parentElement.dataset.id;
        if(confirm('Are you sure?')){
            http.delete(`http://localhost:3000/posts/${id}`)
            .then(data=>{
                ui.showAlert('Post removed','alert alert-danger');
                getPosts();
            })
            .catch(err=>console.log(err));
        }

       }
 e.preventDefault();

}

function enableEdit(e){

    if(e.target.parentElement.classList.contains('edit')){
        const id=e.target.parentElement.dataset.id;
        const title=e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body=e.target.parentElement.previousElementSibling.textContent;

        const data={
            id,
            title,
            body
        }

        ui.fillForm(data);
    }

    e.preventDefault();

}

// Cancel Edit State
function cancelEdit(e) {
    if(e.target.classList.contains('post-cancel')) {
      ui.changeFormState('add'); //default duruma geri dönülür.
    }
  
    e.preventDefault();
  }
 

