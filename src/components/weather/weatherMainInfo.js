import styles from "./weatherMainInfo.module.css";

export default function WeatherMainInfo({ weather }) {
  return (
    <div className={styles.mainInfo}>
      {/* generamos capas donde guardamos los datos (copias) de cada elemento */}
      <div className={styles.city}>{weather?.location?.name}</div> {/*nombre de la ciudad: Madrid */}
      <div className={styles.country}>{weather?.location?.country}</div> {/* nombre del país: España */}
      <div className={styles.row}>
        <div>
          <img src={`http:${weather?.current?.condition?.icon}`} width="128" />
          {/* cargamos la imagen (ícono) ☁️ ☀️ desde la API */}
        </div>
        <div className={styles.weatherConditions}>
          <div className={styles.condition}>
            {weather?.current?.condition.text}  {/* clima actual: Soleado ☀️ */}
          </div>
          <div className={styles.current}>{weather?.current?.temp_c}º</div>  {/* temperatura en °C = 32° */}
        </div>
      </div>
      <iframe
      // este mapa es de Google Maps y solo lo estamos embebebiendo (enlazando)
        src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15057.534307180755!2d${weather.location.lon}5!3d${weather.location.lat}5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smx!4v1651103744472!5m2!1sen!2smx`}
      //                                                                     coordenadas:     lon = longitud              lat = latitud
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
