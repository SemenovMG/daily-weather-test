# Description

NestJS Application that takes location (latitude and longitude) and date, and returns the weather description for that location for a given date. The date must be within the next 7 days.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

# API Call

## Parameters

lat - latitude  
lon - longitude  
date - date format "DD.MM.YYYY"

## Example of API call

http://localhost:5000/weather/daily/description?lat=55.19&lon=30.20&date=12.07.2022

## Example of API response

```json
{  
  "description":"light rain"  
}
```