import React from 'react';
import './Weather.css';
import WeatherDay from './WeatherDay';
import moment from 'moment';

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
            return (
                <div className='loader-container'>
                    <div className='loader'></div>
                </div>
            );
        } else {
            let i = 0;
            return (
                <div className='WeatherBlock'>
                    <div className='WeatherBlock-header'>
                        <div>
                            <span className='WeatherBlock-city'>{data.title}</span>, {data.parent.title}
                        </div>
                        <div className='WeatherBlock-times'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='bold'>Time</td>
                                        <td>{moment(data.time).format('h:mm a')}</td>
                                    </tr>
                                    <tr>
                                        <td className='bold'>Sunrise</td>
                                        <td>{moment(data.sun_rise).format('h:mm a')}</td>
                                    </tr>
                                    <tr>
                                        <td className='bold'>Sunset</td>
                                        <td>{moment(data.sun_set).format('h:mm a')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='WeatherBlock-body'>
                        {data.consolidated_weather.map(day => {
                            return <WeatherDay key={i} id={i++} day={day} />;
                        })}
                    </div>
                </div>
            );
        }
    }
}

export default WeatherBlock;