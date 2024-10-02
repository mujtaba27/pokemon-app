# Pokémon App

This is a Pokémon app built using **Angular 18**, **Angular Material 3**. The app fetches data from the Pokémon API and allows users to browse, search, and mark Pokémon as favorites. Additionally, it includes authentication and authorization features with route guards and subscription logic.

##Hosting

This app is hosted on github pages under following link
## https://mujtaba27.github.io/pokemon-app


##UserName/Password

There are two kind of user subscribed and unsubscribed
username/password => test1@test.com/pass1 -> with subscription(this user can view filter pokemon list)
username/password => test2@test.com/pass2 -> without subscription(this user can subscribe first to view/filter pokemon list)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Authentication Details](#authentication-details)
- [State Management](#state-management)
- [Future Enhancements](#future-enhancements)

## Features

- **Authentication & Authorization**: 
  - Login, Sign Up, Forget Password, and Reset Password functionality.
  - Route Guards to restrict access to certain features based on user role or subscription status.

- **Pokémon Listing**: 
  - Displays a paginated list of Pokémon with a search functionality.
  - Users can click on a Pokémon to view its detailed stats and abilities.

- **Favorite Pokémon**: 
  - Users can mark Pokémon as favorites and filter the list by their favorites.

- **Responsive Design**: 
  - The app is fully responsive, designed using Angular Material 3 components, ensuring compatibility across devices.



## Technologies Used

- **Angular 18.0.2** - The core framework used for building the app.
- **Angular Material 3** - For responsive UI components and styling.
- **RxJS** - For handling asynchronous operations.
- **TypeScript** - The primary language used for the project.
- **SCSS** - Styling preprocessor for modular and scalable CSS.

## Project Structure

```bash
pokemon-app/
├── src/
│   ├── app/
│   │   ├── auth/                    # Authentication module (Login, Sign Up, Forgot/Reset Password)
│   │   ├── pokemon/                 # Pokémon module (Home, Detail View, etc.)
│   │   ├── info/                    # Info Module (Info component for User to Subscribe)
│   │   ├── app-routing.module.ts    # App-wide routing configuration
│   │   ├── app.component.ts         # Root app component
│   │   ├── app.module.ts            # Root app module
│   ├── assets/                      # Assets like images, icons, etc.
│   ├── styles.scss                  # Global styles
│
├── README.md                        # Project documentation
├── angular.json                     # Angular project configuration
├── package.json                     # Dependencies and scripts

