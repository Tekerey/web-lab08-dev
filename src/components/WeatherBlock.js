import React from 'react';
import './Weather.css';
import WeatherDay from './WeatherDay';

class WeatherBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoaded: false, data: null, error: null};
    }

    componentDidMount() {
        fetch('https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/924938/')
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                this.setState({
                    isLoaded: true,
                    data: result
                });
            },
            (error) => { 
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        const {error, data, isLoaded} = this.state;

        if (error) {
            return <div className='ErrorMessage'>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className='Loader'>Loading...</div>
        } else {
            return (
                <div className='WeatherBlock'>
                    <h1>WeatherBlock</h1>
                    <div className='WeatherBlock-header'>
                        <h2>{data.title}, {data.parent.title}</h2>
                        <div className='WeatherBlock-times'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Time</td>
                                        <td>{data.time}</td>
                                    </tr>
                                    <tr>
                                        <td>Sunrise</td>
                                        <td>{data.sun_rise}</td>
                                    </tr>
                                    <tr>
                                        <td>Sunset</td>
                                        <td>{data.sun_set}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='WeatherBlock-body'>
                        {data.consolidated_weather.map(day => {
                            return <WeatherDay key={day.id} day={day} />;
                        })}
                    </div>
                </div>
            );
        }
    }
}

export default WeatherBlock;