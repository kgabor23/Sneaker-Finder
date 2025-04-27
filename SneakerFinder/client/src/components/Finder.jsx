import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/filter.css';

function App() {
    const toggleFilters = () => {
        let container = document.getElementById('filterContainer');
        let filterIcon = document.querySelector('.filter-toggle');
        let colorDropdown = document.getElementById('colorDropdown');

        if (container.style.left === '0px') {
            container.style.left = '-100%';
            colorDropdown.style.display = 'none';
            filterIcon.style.display = 'block';
        } else {
            container.style.left = '0px';
            filterIcon.style.display = 'none';
        }
    }

    const toggleDropdown = (id) => {
        let dropdown = document.getElementById(id);
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }

    const toggleColor = (img, color) => {
        let originalSrc = `images/icons/${color}.png`;
        let checkedSrc = `images/icons/${color}Checked.png`;

        if (img.src.includes(`${color}Checked.png`)) {
            img.src = originalSrc;
        } else {
            img.src = checkedSrc;
        }
    }

    const updateSilhouetteFilter = () => {
        let nikeCheckbox = document.querySelector('input[value="NIKE"]');
        let adidasCheckbox = document.querySelector('input[value="ADIDAS"]');
        let silhouetteSection = document.getElementById('silhouetteSection');

        if (nikeCheckbox.checked || adidasCheckbox.checked) {
            silhouetteSection.style.display = 'block';
        } else {
            silhouetteSection.style.display = 'none';
        }

        let silhouetteDropdown = document.getElementById('silhouetteDropdown');
        let checkboxes = silhouetteDropdown.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(checkbox => {
            checkbox.disabled = false;
            checkbox.checked = false;
        });

        if (nikeCheckbox.checked && adidasCheckbox.checked) {
            checkboxes.forEach(checkbox => {
                checkbox.disabled = false;
            });
        } else {
            if (nikeCheckbox.checked) {
                updateSilhouetteCheckboxes('NIKE', checkboxes);
            } else if (adidasCheckbox.checked) {
                updateSilhouetteCheckboxes('ADIDAS', checkboxes);
            }
        }
    }

    const updateSilhouetteCheckboxes = (brand, checkboxes) => {
        const brandSilhouettes = {
            'NIKE': ['AIR FORCE SUPREME', 'AIR JORDAN 1'],
            'ADIDAS': ['YEEZY 350', 'YEEZY 500', 'YEEZY 700']
        }[brand];

        checkboxes.forEach(checkbox => {
            if (brandSilhouettes.includes(checkbox.value)) {
                checkbox.disabled = false;
            } else {
                checkbox.disabled = true;
            }
        });
    }

    const searchFunction = () => {
        let searchInput = document.getElementById('searchInput').value;
        alert('Searching for: ' + searchInput);
    }

    const selectShoe = (shoeName) => {
        localStorage.setItem("selectedShoe", shoeName);
    }

    return (
        <div className="App" style={{
            backgroundImage: 'url(images/backgrounds/mainbg.jpg)'
        }}>
            <div className="header">
                <div className="search-bar">
                    <input type="text" id="searchInput" placeholder="Search for shoes..."/>
                    <img src="images/icons/search.png" alt="Search" onClick={searchFunction}/>
                </div>
                <Link to="/" className="homepage-btn">
                    Go to Homepage
                </Link>
            </div>
            <img src="images/icons/filter.png" alt="Filter" className="filter-toggle" onClick={toggleFilters}/>
            <div className="filter-container" id="filterContainer">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div className="filters-header">Filters</div>
                    <img src="images/icons/close.png" alt="Close" onClick={toggleFilters}
                         style={{cursor: 'pointer', width: '20px', height: '20px'}}/>
                </div>
                <div className="filter-section">
                    <div className="filter-icon-wrapper">
                        <img src="images/icons/brand.png" alt="Brand" onClick={() => toggleDropdown('brandDropdown')}/>
                        <span>Brand</span>
                    </div>
                    <div className="dropdown" id="brandDropdown">
                        <label><input type="checkbox" value="NIKE" onClick={updateSilhouetteFilter}/> NIKE</label>
                        <label><input type="checkbox" value="ADIDAS" onClick={updateSilhouetteFilter}/> ADIDAS</label>
                    </div>
                </div>
                <div className="filter-section" id="silhouetteSection" style={{display: 'none'}}>
                    <div className="filter-icon-wrapper">
                        <img src="images/icons/sneaker.png" alt="Silhouette"
                             onClick={() => toggleDropdown('silhouetteDropdown')}/>
                        <span>Silhouette</span>
                    </div>
                    <div className="dropdown" id="silhouetteDropdown">
                        <label><input type="checkbox" value="YEEZY 350"/> YEEZY 350</label>
                        <label><input type="checkbox" value="YEEZY 500"/> YEEZY 500</label>
                        <label><input type="checkbox" value="YEEZY 700"/> YEEZY 700</label>
                        <label><input type="checkbox" value="AIR FORCE SUPREME"/> AIR FORCE SUPREME</label>
                        <label><input type="checkbox" value="AIR JORDAN 1"/> AIR JORDAN 1</label>
                    </div>
                </div>
                <div className="filter-section">
                    <div className="filter-icon-wrapper">
                        <img src="images/icons/cut.png" alt="Cut" onClick={() => toggleDropdown('cutDropdown')}/>
                        <span>Cut</span>
                    </div>
                    <div className="dropdown" id="cutDropdown">
                        <label><input type="checkbox" value="HIGH"/> HIGH</label>
                        <label><input type="checkbox" value="LOW"/> LOW</label>
                    </div>
                </div>
                <div className="filter-section">
                    <div className="filter-icon-wrapper">
                        <img src="images/icons/color.png" alt="Color" onClick={() => toggleDropdown('colorDropdown')}/>
                        <span>Color</span>
                    </div>
                    <div className="dropdown color-options" id="colorDropdown">
                        <table>
                            <tr>
                                <td className="color-option-wrapper">
                                    <img src="images/icons/black.png" alt="Black"
                                         onClick={(e) => toggleColor(e.target, 'black')}/>
                                </td>
                                <td className="color-option-wrapper">
                                    <img src="images/icons/brown.png" alt="Brown"
                                         onClick={(e) => toggleColor(e.target, 'brown')}/>
                                </td>
                                <td className="color-option-wrapper">
                                    <img src="images/icons/grey.png" alt="Grey"
                                         onClick={(e) => toggleColor(e.target, 'grey')}/>
                                </td>
                                <td className="color-option-wrapper">
                                    <img src="images/icons/white.png" alt="White"
                                         onClick={(e) => toggleColor(e.target, 'white')}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="color-option-wrapper">
                                    <img src="images/icons/pink.png" alt="Pink"
                                         onClick={(e) => toggleColor(e.target, 'pink')}/>
                                </td>
                                <td className="color-option-wrapper">
                                    <img src="images/icons/red.png" alt="Red"
                                         onClick={(e) => toggleColor(e.target, 'red')}/>
                                </td>
                                <td className="color-option-wrapper">
                                    <img src="images/icons/orange.png" alt="Orange"
                                         onClick={(e) => toggleColor(e.target, 'orange')}/>
                                </td>
                                <td className="color-option-wrapper">
                                    <img src="images/icons/yellow.png" alt="Yellow"
                                         onClick={(e) => toggleColor(e.target, 'yellow')}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="color-option-wrapper">
                                    <img src="images/icons/green.png" alt="Green"
                                         onClick={(e) => toggleColor(e.target, 'green')}/>
                                </td>
                                <td className="color-option-wrapper">
                                    <img src="images/icons/cyan.png" alt="Cyan"
                                         onClick={(e) => toggleColor(e.target, 'cyan')}/>
                                </td>
                                <td className="color-option-wrapper">
                                    <img src="images/icons/blue.png" alt="Blue"
                                         onClick={(e) => toggleColor(e.target, 'blue')}/>
                                </td>
                                <td className="color-option-wrapper">
                                    <img src="images/icons/purple.png" alt="Purple"
                                         onClick={(e) => toggleColor(e.target, 'purple')}/>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

            <div className="shoe-table">
                <div className="shoe-card">
                    <img src="images/sneakers/zebra.webp" alt="zebra"/>
                    <p>YEEZY 350 v2 ZEBRA</p>
                    <Link to={`/sneaker/YEEZY 350 v2 ZEBRA`}>
                        <button>View Details</button>
                    </Link>
                </div>
                <div className="shoe-card">
                    <img src="images/sneakers/oreo.webp" alt="oreo"/>
                    <p>YEEZY 350 v2 OREO</p>
                    <Link to={`/sneaker/YEEZY 350 v2 OREO`}>
                        <button>View Details</button>
                    </Link>
                </div>
                <div className="shoe-card">
                    <img src="images/sneakers/dazzling.webp" alt="dazzling"/>
                    <p>YEEZY 350 v2 DAZZLING BLUE</p>
                    <Link to={`/sneaker/YEEZY 350 v2 DAZZLING BLUE`}>
                        <button>View Details</button>
                    </Link>
                </div>
                <div className="shoe-card">
                    <img src="images/sneakers/utility.webp" alt="utility"/>
                    <p>YEEZY 500 UTILITY BLACK</p>
                    <Link to={`/sneaker/YEEZY 500 UTILITY BLACK`}>
                        <button>View Details</button>
                    </Link>
                </div>
                <div className="shoe-card">
                    <img src="images/sneakers/tephra.webp" alt="tephra"/>
                    <p>YEEZY 700 v2 TEPHRA</p>
                    <Link to={`/sneaker/YEEZY 700 v2 TEPHRA`}>
                        <button>View Details</button>
                    </Link>
                </div>
                <div className="shoe-card">
                    <img src="images/sneakers/supremeW.webp" alt="supremew"/>
                    <p>AIR FORCE 1 SUPREME WHITE</p>
                    <Link to={`/sneaker/AIR FORCE 1 SUPREME WHITE`}>
                        <button>View Details</button>
                    </Link>
                </div>
                <div className="shoe-card">
                    <img src="images/sneakers/supremeB.webp" alt="supremeB"/>
                    <p>AIR FORCE 1 SUPREME BLACK</p>
                    <Link to={`/sneaker/AIR FORCE 1 SUPREME BLACK`}>
                        <button>View Details</button>
                    </Link>
                </div>
                <div className="shoe-card">
                    <img src="images/sneakers/bubble.webp" alt="bubble"/>
                    <p>AIR JORDAN 1 BUBBLEGUM</p>
                    <Link to={`/sneaker/AIR JORDAN 1 BUBBLEGUM`}>
                        <button>View Details</button>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default App;