import axios from "axios";
import React, { useState } from "react";

function Admin() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setFilePicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFilePicked(true);
  };
  //console.log(selectedFile);

  const convertBase64 = (selectedFile) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFile);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    try {
      const base64 = await convertBase64(selectedFile);
      // Envoyer la requête POST avec Axios
      const response = await axios.post("http://localhost:2000/upload", {
        name: name,
        category: category,
        gender: gender,
        price: price,
        cover: base64,
      });

      // Traiter la réponse si nécessaire
      //console.log(response.data);
      setUrl(base64);
    } catch (error) {
      console.log("une erreur c'est produite lors de la conversion de l'image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mt-4 text-center font-sans text-xl font-bold">
        {" "}
        Espace Admin{" "}
      </h1>
      <h3 className="text-md mt-6 text-center font-medium">
        {" "}
        formulaire d'ajout de produit
      </h3>
      <div className="mt-4 text-center">
        <form action="" encType="multipart/form-data">
          <div>
            <input
              className="mt-2 rounded-xl border-2 border-pxcolor "
              type="text"
              name="name"
              placeholder="Nom"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              className="mt-2 rounded-xl border-2 border-pxcolor "
              type="text"
              name="category"
              placeholder="Catégorie"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <input
              className="mt-2 rounded-xl border-2 border-pxcolor "
              type="text"
              name="genre"
              placeholder="Genre"
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div>
            <input
              className="mt-2 rounded-xl border-2 border-pxcolor "
              type="number"
              name="price"
              placeholder="Prix"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <input
              className="w-26 h-10 gap-10 rounded-xl border-2 border-pxcolor "
              type="file"
              name="cover"
              id="cover"
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit" onClick={handleSubmit}>
              telecharger
            </button>
          </div>
        </form>
      </div>
      <div className="h-24 w-36 items-center">
        {loading ? <p>Téléchargement en cours...</p> : <img src={url} alt="" />}
      </div>
    </div>
  );
}
export default Admin;
