import Image from 'next/image';
import styles from './page.module.css'

function format(date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'];
  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const Today = days[date.getDay()]
  const Month = months[date.getMonth()]
  const Numdate = date.getDate()
  const Year = date.getFullYear()

  return `${Today}, ${Month} ${Numdate}, ${Year}`;
}

export default async function Home() {

  const res = await fetch('https://api.openweathermap.org/data/2.5/weather?q=toronto&units=metric&appid=a1e186a8588b478124305174d32d7503', {
    method: 'GET',
    header: {
     'Cache-Control': 'no-store', // Prevents caching of the response
    }
  });



  const data = await res.json();
  console.log(data['main']['temp']);
  console.log(data['weather'][0]['icon']);
  const d = new Date() 
  return (
    < div className = { styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Today</h1>
        <p className={styles.date}>
          {format(d)}
        </p>
        <div className={styles.imageContainer}>
          <Image
            src= {`/${data.weather[0].icon}.png`}
            alt= "Image not Available"
            width={350}
            height={350}
            className={styles.image}
          />
          <div>
          <p className={styles.Temp}> 
              {Math.round(data['main']['temp'])}°
          </p>
          <h1 className={styles.iconname}>
            {data['weather'][0]['main']}
          </h1>
          <p className={styles.date}>
            {data['weather'][0]['description']} with humidty of {data['main']['humidity']}%
          </p>
          </div>
        </div>
      </div>
    </div >
  );
}




// https://api.openweathermap.org/data/2.5/weather?lat=43.746279200054445&lon=-79.56834139156214&appid=a1e186a8588b478124305174d32d7503