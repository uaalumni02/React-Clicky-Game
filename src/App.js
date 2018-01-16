import React, { Component } from 'react';
import './App.css';
import cars from './cars.json'
import Wrapper from './components/Wrapper'
import Navpills from './components/Navpills'
import Title from './components/Title'
import CarCard from './components/CarCard'

class App extends Component {
    state = {
        message: "To start click a image!",
        topScore: 0,
        curScore: 0,
        cars: cars,
        unselectedcars: cars
    }

    componentDidMount() {
    }

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectCar = car => {
        const findCar = this.state.unselectedcars.find(item => item.car === car);

        if(findCar === undefined) {
            this.setState({ 
                message: "Incorrect Guess!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                cars: cars,
                unselectedcars: cars
            });
        }
        else {
            const newcars = this.state.unselectedcars.filter(item => item.car !== car);
            
            this.setState({ 
                message: "Correct Guess!",
                curScore: this.state.curScore + 1,
                cars: cars,
                unselectedcars: newcars
            });
        }

        this.shuffleArray(cars);
    };

    render() {
        return (
            <Wrapper>
                <Navpills
                    message={this.state.message}
                    curScore={this.state.curScore}
                    topScore={this.state.topScore}
                />
                <Title />
                {
                    this.state.cars.map(cars => (
                        <CarCard
                            car={cars.car}
                            image={cars.image}
                            selectCar={this.selectCar} 
                            curScore={this.state.curScore}
                        />
                    ))
                }
            </Wrapper>
        );
    }
}

export default App;

