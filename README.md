# Solid principals apps course

GymPass style app.

## RFs (Functional Requirements)

- [x] It must be possible to register.
- [x] It must be possible to authenticate.
- [x] It must be possible to obtain the profile of a logged-in user.
- [x] It must be possible to obtain the number of check-ins performed by the logged-in user.
- [x] It must be possible for the user to retrieve their check-in history.
- [x] It must be possible for the user to search for nearby gyms (up to 10km).
- [x] It must be possible for the user to search for gyms by name.
- [x] It must be possible for the user to check-in at a gym.
- [x] It must be possible to validate a user's check-in.
- [x] It must be possible to register a gym.

## RNs (Business Rules)

- [x] Users should not be able to register with a duplicate email.
- [x] Users cannot make 2 check-ins on the same day.
- [x] Users cannot check-in if they are not close (within 100m) to the gym.
- [x] Check-in can only be validated within 20 minutes after creation.
- [x] Check-in can only be validated by administrators.
- [x] Gyms can only be registered by administrators.

## RNFs (Non-functional Requirements)

- [x] The user's password needs to be encrypted.
- [x] Application data must be persisted in a PostgreSQL database.
- [x] All data lists must be paginated with 20 items per page.
- [x] The user must be identified by a JSON Web Token (JWT).

## Requirements

install [Docker](https://breakdance.github.io/breakdance/)

install [Node](https://nodejs.org/en) >= v18.19.0

## To Run

```sh
npm i
npm run docker:up
npm run start:dev
```
