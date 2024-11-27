import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1_eNC3fGoMgC5uFaS34appSaN1p4cEcY",
    authDomain: "firestore-tut-fcf02.firebaseapp.com",
    projectId: "firestore-tut-fcf02",
    storageBucket: "firestore-tut-fcf02.firebasestorage.app",
    messagingSenderId: "878076198238",
    appId: "1:878076198238:web:a50d5a41e74b0a7189e3cf",
    measurementId: "G-365KJ1VHQ4",
};

// Initialize Firebase and Firestore
// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get DOM elements
const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// Create element and render cafe
function renderCafe(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';
 
    cross.addEventListener('click', async (e) => {
        e.stopPropagation(); // Prevent bubbling
        const id = li.getAttribute('data-id');
        try {
            await deleteDoc(doc(db, 'cafes', id));
            console.log("Document successfully deleted!");
            cafeList.removeChild(li); // Remove the item from the DOM
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    });


    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);
}

// Get data from Firestore
const getCafes = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'cafes'));
        querySnapshot.forEach(doc => {
            renderCafe(doc);
        });
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
};
getCafes();

// Save data to Firestore
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        await addDoc(collection(db, 'cafes'), {
            name: form.name.value,
            city: form.city.value
        });
        console.log("Document successfully written!");
        form.name.value = '';
        form.city.value = '';
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});

// delete data from firestore
