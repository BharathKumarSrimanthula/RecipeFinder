# Recipe Finder Application

## Overview

The **Recipe Finder** is a React-based application that allows users to search for meals based on a search term. It fetches recipe data from TheMealDB API and displays the results in a clean, responsive UI. The application incorporates debounced search functionality to optimize user experience during typing.

## Features

- Search for recipes by name using a text input field.
- Display meals with images and names in a grid layout.
- Loading and error states to provide feedback to users.
- Debounced search to reduce unnecessary API calls while typing.
- Responsive design to adapt to different screen sizes.

## Technologies Used

- **React**: For building the user interface.
- **useState** and **useEffect**: For managing state and handling side effects.
- **Custom Debounce Hook**: To implement debounced search functionality.
- **TheMealDB API**: For fetching recipe data.

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BharathKumarSrimanthula/RecipeFinder

2. Install the dependencies:

   npm install

3. Start the development server:

   npm start
