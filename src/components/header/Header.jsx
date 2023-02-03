import React from "react";
import styles from "./Header.css";

const Header = () => {
    return (
        <>        
        <div className="promoSpace"> Livraison gratuites tout le mois de janvier </div>
        <div className="inline">    
           <input type="text" name="searchBar" id="searchBar" placeholder="recherchez un produit "/>
           <div className="w-12 "> <img src="/logo512.png" ></img> </div>
        </div>
        
        <div className="search_results">
            <div className="search_result">données</div>
        </div>
        </>
        );

};
export default Header 