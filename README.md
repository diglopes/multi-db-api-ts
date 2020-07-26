# Multi Database API Typescript

<p align="center">
    <img src="https://media.giphy.com/media/UOvFfXGINpmN2/giphy.gif"/>
</p>
<p align="center">An application with multiple databases that you can make CRUD operations to save, read, update, and delete your Digimons and battle with it!</p>

## Goal

The main purpose of building this app is to improve my Typescript knowledge, and use Node.js best practices on building APIs.

## Techs Used

- MongoDB
- Postgres
- Redis
- Node.js

## Roadmap

- [X] Configure commit linter to conventional commit convention
- [ ] Configure code linter to Standardjs
- [ ] Configure Typescript to production and development
- [ ] Configure environment with Docker and Docker-compose
  - [ ] Production
  - [ ] Development
- [ ] Connection with Postgres and MongoDB using strategy pattern
- [ ] API Resources
  - [ ] Digimons
    - [ ] **GET** /digimons
    - [ ] **GET** /digimons/{id}
    - [ ] **POST** /digimons
    - [ ] **PUT** /digimons/{id}
    - [ ] **DELETE** /digimons/{id}
  - [ ] Battles
    - [ ] **GET** /battles
    - [ ] **GET** /battles/{id}
    - [ ] **POST** /battles
- [ ] Swagger documentation
- [ ] 100% test coverage

## Data models

Digimon
```json
{
    "id": "STRING",
    "name": "STRING",
    "health": "NUMBER",
    "isTired": "BOOLEAN",
    "lossStreak": "NUMBER",
    "isDeleted": "BOOLEAN", 
    "abilities": [
        {
            "name": "STRING",
            "minDamage": "NUMBER",
            "maxDamage": "NUMBER",
            "loadTime": "NUMBER"
        }
    ],
    "createdAt": "STRING",
    "updatedAt": "STRING"
}
```

Battle
```json
{
    "id": "STRING",
    "winner": {
        "id": "DIGIMON_ID",
        "healthLeft": "NUMBER",
        "abilitiesUsed": [
            {
                "name": "STRING",
                "damage": "NUMBER"
            }
        ]
    },
    "loser": {
        "id": "DIGIMON_ID",
        "abilitiesUsed": [
            {
                "name": "STRING",
                "damage": "NUMBER"
            }
        ]
    },
    "createdAt": "STRING"
}
```

## Bussiness rules

### Databases usage

- Digimons should be saved on MongoDB
- Battles should be saved on Postgres

### Digimon battles

- The battle is based on turns, and on each turn the ability is choosed randomly
- The Digimon which has the lowest abilities `loadTime` go first until its health goes
- When a Digimon loses a battle it gets tired for (1 * `lossStreak`) minutes and can't battle at this time around
- Digimon has to be recovered after tired time has passed
- When a Digimon win a battle its `lossStreak` property should go back to zero
- A battle shouldn't happen if one of the Digimons is tired
- A battle is formed by two Digimons only

### Regeneration JOB

- Watch for Digimons that need get the `isTired` property returned to zero after rest time