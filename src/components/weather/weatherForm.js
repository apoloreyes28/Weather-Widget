import { useState } from "react";

import styles from "./weatherForm.module.css";

export default function WeatherForm({ onChangeCity }) {
  const [city, setCity] = useState("");

  function handleChange(e) {
    setCity(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!city || city !== "") {// es un string "" vacío porque si el input no tiene nada, no vamos a buscar (hacer) nada
      onChangeCity(city);// mandamos llamar esta prop: onChangeCity como si fuera una función
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      {/* styles, es para decirle que está en un archivo de module.css y container es el nombre de la clase */}
      <input
        className={styles.input}
        type="text"
        value={city}
        onChange={handleChange}
      />
    </form>
  );
}
