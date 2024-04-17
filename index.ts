// Skapa en interface för en person
interface Person {
    firstName: string;
    lastName: string;
    epost: string;
    alias: string;
}

// Skapa en array för att lagra personobjekt
const persons: Person[] = [];

// Här hämtar vi referenser till HTML-elementen vi behöver
const firstNameInput = document.getElementById('interface-container__form__input-first-name') as HTMLInputElement;
const lastNameInput = document.getElementById('interface-container__form__input-last-name') as HTMLInputElement;
const emailInput = document.getElementById('interface-container__form__input-email') as HTMLInputElement;
const aliasInput = document.getElementById('interface-container__form__input-alias') as HTMLInputElement;
const submitButton = document.getElementById('interface-container__form__submit-button') as HTMLButtonElement;
const listContainer = document.querySelector('.interface-container__list') as HTMLUListElement;
const mainElement = document.querySelector('main') as HTMLElement;


// Skapa en <select> för att välja sorteringsalternativ
const sortSelect = document.createElement('select');
sortSelect.innerHTML = `
    <option value="firstName">Sortera efter förnamn</option>
    <option value="lastName">Sortera efter efternamn</option>
    <option value="alias">Sortera efter alias</option>
`;

// Sätter in <select> med dess <option>'s innan listContainer
mainElement.insertBefore(sortSelect, listContainer);

// Funktion för att hantera formulärinsändningar
function handleSubmit(event: Event) {
    event.preventDefault(); // Förhindra att formuläret skickas automatiskt

    // Skapa ett personobjekt baserat på formulärinmatningarna
    const newPerson: Person = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        epost: emailInput.value,
        alias: aliasInput.value,
    };

    // Lägg till personobjektet i arrayen
    persons.push(newPerson);

    // Rensa formuläret
    firstNameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    aliasInput.value = '';

    // Uppdatera listan
    renderList();
}

// Funktion för att hantera sortering av listan
function handleSort() {
    const sortBy = sortSelect.value as keyof Person;
    persons.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    renderList();
}

// Funktion för att rendera listan
function renderList() {
    // Rensa den befintliga listan
    listContainer.innerHTML = '';

    // Skapa och lägg till nya listelement för varje person i arrayen
    persons.forEach(person => {
        const listItem = document.createElement('li');

        // Skapa en flexbox-container för varje listelement
        const flexContainer = document.createElement('div');

        // Skapa och lägg till element för varje del av personen
        const firstNameElement = document.createElement('div');
        firstNameElement.textContent = person.firstName;
        flexContainer.appendChild(firstNameElement);

        const lastNameElement = document.createElement('div');
        lastNameElement.textContent = person.lastName;
        flexContainer.appendChild(lastNameElement);

        const emailElement = document.createElement('div');
        emailElement.textContent = person.epost;
        flexContainer.appendChild(emailElement);

        const aliasElement = document.createElement('div');
        aliasElement.textContent = person.alias;
        flexContainer.appendChild(aliasElement);

        // Lägg till flexbox-container i listelementet
        listItem.appendChild(flexContainer);

        // Lägg till listelementet i listan
        listContainer.appendChild(listItem);
    });
}

// Lyssna på klickhändelsen för submit-knappen
submitButton.addEventListener('click', handleSubmit);

// Lyssna på ändringar i sorteringsalternativet
sortSelect.addEventListener('change', handleSort);
