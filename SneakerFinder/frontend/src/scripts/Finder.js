let selectedNikeSilhouettes = [];
let selectedAdidasSilhouettes = [];

const silhouettes = {
    'NIKE': ['AIR FORCE SUPREME', 'AIR JORDAN 1'],
    'ADIDAS': ['YEEZY 350', 'YEEZY 500', 'YEEZY 700']
};

function toggleFilters() {
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

function toggleDropdown(id) {
    let dropdown = document.getElementById(id);
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function toggleColor(img, color) {
    let originalSrc = `images/icons/${color}.png`;
    let checkedSrc = `images/icons/${color}Checked.png`;

    if (img.src.includes(`${color}Checked.png`)) {
        img.src = originalSrc;
    } else {
        img.src = checkedSrc;
    }
}

function updateSilhouetteFilter() {
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

function updateSilhouetteCheckboxes(brand, checkboxes) {
    const brandSilhouettes = silhouettes[brand];

    checkboxes.forEach(checkbox => {
        if (brandSilhouettes.includes(checkbox.value)) {
            checkbox.disabled = false;
        } else {
            checkbox.disabled = true;
        }
    });
}

function searchFunction() {
    let searchInput = document.getElementById('searchInput').value;
    alert('Searching for: ' + searchInput);
}

function selectShoe(shoeName) {
    localStorage.setItem("selectedShoe", shoeName);
}