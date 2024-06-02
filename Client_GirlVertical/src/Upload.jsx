import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const Adatbevitel = () => {
  const dropAreaRef = useRef(null);
  const fileElemRef = useRef(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [formData, setFormData] = useState({
    nev: '',
    kor: '',
    lakhely: '',
    instagram: '',
    leiras: '',
    singli: '',
    hajszin: '',
    images: []
  });

  const { nev, kor, lakhely, instagram, leiras, singli, hajszin, images } = formData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const uploadedImageLinks = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = () => {
        const uploadedImage = reader.result;
        uploadedImageLinks.push(uploadedImage);
        setUploadedImages([...uploadedImages, uploadedImage]);
        setFormData({ ...formData, images: uploadedImageLinks });
      };

      reader.readAsDataURL(file);
    }
  };

  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Sikeres kérés:', data);
        } else {
            console.error('Hiba történt a kérés során:', response.statusText);
        }
    } catch (error) {
        console.error('Hiba történt a kérés során:', error);
    }
};

  useEffect(() => {
    const dropArea = dropAreaRef.current;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
      dropArea.addEventListener(eventName, preventDefaults, false);
    });

    dropArea.addEventListener('drop', handleDrop, false);

    return () => {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
        dropArea.removeEventListener(eventName, preventDefaults, false);
      });
      dropArea.removeEventListener('drop', handleDrop, false);
    };
  }, [dropAreaRef, uploadedImages]);

  return (
    <div className="adatbevitel">
      <input type="text" id="nev" value={nev} placeholder="Név" onChange={handleInputChange} />
      <input type="text" id="kor" value={kor} placeholder="Kor" onChange={handleInputChange} />
      <input type="text" id="lakhely" value={lakhely} placeholder="Lakhely (Város)" onChange={handleInputChange} />
      <input type="text" id="instagram" value={instagram} placeholder="Instagram Név" onChange={handleInputChange} />
      <input type="text" id="leiras" value={leiras} placeholder="Leírás" onChange={handleInputChange} />
      <input type="text" id="singli" value={singli} placeholder="Singli" onChange={handleInputChange} />
      <input type="text" id="hajszin" value={hajszin} placeholder="Hajszín" onChange={handleInputChange} />

      <div id="drop-area" ref={dropAreaRef}>
        Drop your files here or click to upload.
      </div>

      <input type="file" id="fileElem" ref={fileElemRef} multiple style={{ display: 'none' }} />

      <div id="uploaded-images">
        {uploadedImages.map((link, index) => (
          <img key={index} src={link} alt={`Uploaded #${index}`} style={{ maxWidth: '100px', margin: '10px' }} />
        ))}
      </div>

      <input type="submit" id="submit" onClick={handleSubmit} />
    </div>
  );
};

export default Adatbevitel;
