import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import { generatePalette } from './colorHelper';
import { Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page.js';

class App extends Component {


	constructor(props){
		super(props);

		const savedPalettes = JSON.parse(localStorage.getItem('palettes'));

		this.state={
			palettes: savedPalettes || seedColors
		}
		this.savePalette = this.savePalette.bind(this);
		this.deletePalette = this.deletePalette.bind(this);
	}

	deletePalette(id){
		this.setState(st=>(
			{palettes: st.palettes.filter(p => p.id!==id)}
		),this.syncLocalStorage)
	}
	findPalette(id){
		return this.state.palettes.find(palette=>{
			return palette.id === id
		})
	}

	savePalette(newPalette){
		console.log(newPalette);

		this.setState({palettes:[...this.state.palettes,newPalette]},
			this.syncLocalStorage);
	}

	syncLocalStorage(){
		localStorage.setItem('palettes',JSON.stringify(this.state.palettes))
	}

	render() {
		return (
			<Route render={({location})=> (
				<TransitionGroup >
					<CSSTransition key={location.key} 
					classNames='page' timeout={500}>

				<Switch location={location}>
				<Route exact path="/palette/new" render={(routeProps)=> 
					(<Page>
					<NewPaletteForm {...routeProps} 
					palettes={this.state.palettes} 
					savePalette={this.savePalette}/>
					</Page>) 
				}/>

				<Route exact path="/palette/:id" render={(routeProps)=>
				 (<Page>
					<Palette 
					palette={
						generatePalette(this.findPalette(routeProps.match.params.id))
						} />
				 </Page>)
				} />

				<Route exact path="/palette/:paletteId/:colorId" 
				render={(routeProps)=>
				(<Page>
				<SingleColorPalette 
				color={routeProps.match.params.colorId} 
				palette={
					generatePalette(this.findPalette(routeProps.match.params.paletteId))
					}
				/>
				</Page>)
				} />

				<Route exact path="/" render={(routeProps) => 
				(<Page>
				<PaletteList {...routeProps} 
				palettes={this.state.palettes} 
				deletePalette={this.deletePalette}/>
				</Page>)
				} />

				<Route render={routeProps => (
                    <Page>
                      <PaletteList
                        palettes={this.state.palettes}
                        deletePalette={this.deletePalette}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
				</Switch>
				</CSSTransition>
			</TransitionGroup>
			)} />
		)
	}
}

export default App;