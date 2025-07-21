import type { IWeatherCondition } from "@/api/type"

function SayHello() {
const data : IWeatherCondition = {
    id: 800,
    main: "Clear",
    description: "clear sky",
    icon: "01d"
  }
  return (
    <div>
      {data.id ? (
        <div>
          <h1>Hello, World!</h1>
          <div>
            <h2>Weather: {data.main}</h2>
            <p>Description: {data.description}</p>
            <p>Weather ID: {data.id}</p>
            <p>Icon: {data.icon}</p>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}

export default SayHello
