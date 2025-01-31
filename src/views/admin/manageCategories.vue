<template>
    <div class="manage-categories">
      <h2>Manage Categories</h2>
      <form @submit.prevent="addCategory">
        <div>
          <label for="categoryName">Category Name</label>
          <input type="text" v-model="categoryName" required />
        </div>
        <div>
          <!-- <label for="categoryImage">Category Image</label>
          <input type="file" @change="handleFileChange" required /> -->
        </div>
        <button type="submit">Add Category</button>
      </form>
    </div>
  </template>
  
  <script>
//   import {  ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { getFirestore, collection, addDoc } from 'firebase/firestore';
  
  export default {
    data() {
      return {
        categoryName: '',
        // categoryImage: null,
      };
    },
    methods: {
    //   handleFileChange(event) {
    //     this.categoryImage = event.target.files[0];
    //   },
      async addCategory() {
        // const storage = getStorage();
        const db = getFirestore();
        
        // Create a reference to store the image
        // const storageRef = ref(storage, 'categories/' + this.categoryImage.name);
        // try {
          // Upload image to Firebase Storage
        //   const snapshot = await uploadBytes(storageRef, this.categoryImage);
        //   const imageUrl = await getDownloadURL(snapshot.ref);
  
          // Add category data to Firestore
          await addDoc(collection(db, 'categories'), {
            name: this.categoryName,
            // image: imageUrl,
          });
  
          alert('Category added successfully!');
          this.categoryName = '';},
        //   this.categoryImage = null;
         catch (error) {
          console.error('Error adding category: ', error);
          alert('Failed to add category. Please try again.');
        }
      },
    
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  