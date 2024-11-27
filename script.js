import { initializeApp } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.23.0/firebase-app.min.js";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.23.0/firebase-storage.min.js";

const firebaseConfig = {
    apiKey: "AIzaSyBzOZ4y5O37SSJvfZnveWNhTxZX10wA_6g",
    authDomain: "img-k-dev-xyz.firebaseapp.com",
    projectId: "img-k-dev-xyz",
    storageBucket: "img-k-dev-xyz.firebasestorage.app",
    messagingSenderId: "408263816893",
    appId: "1:408263816893:web:695c555cc71bce4f5a29d4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const gallery = document.getElementById('gallery');

uploadButton.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) return alert("Please select a file!");

    const storageRef = ref(storage, `images/${file.name}`);
    try {
        await uploadBytes(storageRef, file);
        alert("File uploaded successfully!");
        displayImages();
    } catch (error) {
        console.error("Upload failed", error);
        alert("Failed to upload file.");
    }
});

async function displayImages() {
    gallery.innerHTML = "";

    const listRef = ref(storage, 'images/');
    try {
        const result = await listAll(listRef);
        result.items.forEach(async (item) => {
            const url = await getDownloadURL(item);
            const img = document.createElement('img');
            img.src = url;
            gallery.appendChild(img);
        });
    } catch (error) {
        console.error("Error loading images", error);
    }
}

// DisplayImages
displayImages();
