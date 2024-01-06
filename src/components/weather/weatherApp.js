import { useState, useEffect } from "react";
import Loading from "./loading";
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo";

import styles from "./weatherApp.module.css"; 
// importamos los estilos 'styles' de module.css

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);// cuando manejamos estado que es nulo, puede existir o no la información
// clima, va ser el objeto respuesta que vamos obtener al hacer la solicitud HTTP

/*
useEffect hace referencia a un hook de efectos colaterales;
es decir, tenemos la posibilidad de:

 1° ejecutar código cuando carga nuestra aplicación
 2° cada vez que existe un render() 'renderización' de todo el estado de nuestra aplicación 
 3° cuando el componente se destruye,       estas 3 cosas las podemos usar con useEffect. */
  useEffect(() => {
    loadInfo();// callback                  useEffect(() => {}, [])
  }, []);// arreglo de dependencias 
// si dejamos el arreglo vacío [] useEffect solo se ejecutará una vez cuando se crea nuestro componente

// useEffect es una función que recibe un callback (otra función)

  useEffect(() => {
    document.title = "Weather | " + weather?.location?.name ?? "";
    // weather?. esto significa que es opcional y si es nulo nos retorna un string vacío (no se pone nada)
  }, [weather]);
/* 
si el arreglo no está vacío, el useEffect se ejecutará siempre que haya un
renderizado; en este caso, cada vez que cambie el valor de clima, voy actualizar
el titulo de la página web respecto al nombre de la ciudad que introducimos. */

  async function loadInfo(city = "london") {// 'london' es un parámetro por defecto
    console.log(
      `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
    );
    // hacemos una solicitud a esta API:   https://www.weatherapi.com/

    try {
      const request = await fetch(
        `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
      );
      const json = await request.json();
      console.log(json);// podemos acceder a las propiedades de nuestra respuesta en formato json

      setTimeout(() => {
        setWeather({ ...json });
      }, 2000);
    } catch (e) {
      console.error(e);
    }// esto sirve para simular que la página se está cargando con un retardo de 2000 mls = 2 segundos
  }

  function handleOnChangeCity(city) {
    setWeather(null);
// cuando cambie de ciudad vamos a regresar el valor a null para borrar la información

    loadInfo(city);
// si no especificamos nada en loadInfo, va tomar como referencia:  ciudad = 'london'
  }

  return (
    <div className={styles.weatherContainer}>
      <WeatherForm onChangeCity={handleOnChangeCity} />
      {weather ? <WeatherMainInfo weather={weather} /> : <Loading />}  {/* en lo que se carga la información vamos a mostrar este componente: Loading */} 
      {/* mandamos llamar al prop: weather de WeatherMainInfo como una 
          función para que reciba el estado: clima de dicha ciudad */}
    </div>
  );
}
