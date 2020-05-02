import React, { Component } from 'react';

export class FetchData extends Component {
    render() {
        return (
            <div>
                <h1 id="tabelLabel">Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
            </div>
        );
    }

    //   async populateWeatherData() {
    //     const response = await fetch('weatherforecast');
    //     const data = await response.json();
    //     this.setState({ forecasts: data, loading: false });
    //   }
}
