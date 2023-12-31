# Circles Web Interface
This is the web interface (currently a registration/account setup page) for the Circles social network app.

Circles is an end-to-end encrypted social network app
that enables friends and families to securely share stories and photos while safeguarding
security and privacy.
Mobile apps for Android and iOS are under active development.
Circles is built on Matrix, and as such, it inherits many nice
properties from Matrix, including:

Federation - Anyone can run their own server, and users on different servers can communicate with each other seamlessly.
Open APIs and data formats - Circles uses standard Matrix message types, and it works
with any spec-compliant Matrix server.
Security - Circles offers the same security guarantees as Matrix, using the same
E2E encryption code as in Element and other popular Matrix clients.

- [Circles code](https://gitlab.futo.org/circles)
- [Circles Website](https://circu.li/circles.html)

Note: The current version of this project is only internally accessible by FUTO on gitlab with plans to open-source in the future as all FUTO projects are. I've received permission, however, to display this project on my profile.

# Current Features
User Registration and Authentication
- Implementation of the [swiclops](https://gitlab.futo.org/cvwright/swiclops) authentication flows
     - Username and password validation
     - token based email validation
     - [BS-Speke](https://gitlab.futo.org/cvwright/Cbsspeke/-/blob/main/Sources/Cbsspeke/bsspeke.c) (Blind-Salt adaptation of [SPEKE](https://en.wikipedia.org/wiki/SPEKE#:~:text=SPEKE%20is%20one%20of%20the,with%20a%20constant%20gq.) ) cryptographic password enrollment/verification
- Profile and Circles Setup
    - Name and display picture setup
    - Default room setup including room avatar selection
    - Creation of the [Circles Hierarchy](https://gitlab.futo.org/circles/circles-spec/-/blob/main/0000-spaces-hierarchy.md) with encrypted rooms and the given attributes

# Quickstart
## Development Quickstart

```
# open a shell/terminal and navigate to the desired folder to clone the repository
git clone https://gitlab.futo.org/varun/circles-web-interface.git

# navigate to the newly created project directory
cd circles-web-interface

# install dependencies needed to run the project in the root folder of the project
npm install

# run the development server (Note: Domain in RegistrationConstants.ts is set to U.S. production server circu.li, switch to varun.circles-dev.net for my development server - email token will be sent to postmark account)
npm run dev
```

## Build for production
```
# Follow the same steps as above (Development Quickstart) except for npm run dev
npm run build 
```

# FUTO
This project is a product of [FUTO](https://futo.org/). FUTO is an organization dedicated to developing, both through in-house engineering and investment, technologies that frustrate centralization and industry consolidation. FUTO aims to develop and fund open-source tech that gives you back privacy and control.
