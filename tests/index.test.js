import { expect, test } from "vitest"
import bodyMock from "./bodyMock"
import functions, { data } from "../index"

const { document } = new Window()

document.body.innerHTML = bodyMock

const coordinate = "A3"
const coordinate2 = "B1"
const coordinates = ["B1", "B2", "B3", "B4", "B5"]

//generateCoordNums
test("coordinate numbers are generated", () => {
  const coordNumsEl = document.getElementById("coord-nums")
  functions.generateCoordNums(coordNumsEl)
  expect(coordNumsEl.childNodes).toHaveLength(11)
  expect(coordNumsEl.childNodes[1].innerHTML).toBe("1")
  expect(coordNumsEl.childNodes[10].innerHTML).toBe("10")
})

//confirmHit
test("ship is in the location of chosen coordinate", () => {
  const ships = JSON.parse(JSON.stringify(data.ships))
  ships[0].location.push(coordinate)
  expect(functions.confirmHit(coordinate, ships)).toBeTruthy()
})

//confirmHit
test("ship is not in the location of chosen coordinate", () => {
  const ships = JSON.parse(JSON.stringify(data.ships))
  expect(functions.confirmHit(coordinate, ships)).toBeFalsy()
})

//alreadyShotFunction
test("ship has been already shot", () => {
  const alreadyShot = JSON.parse(JSON.stringify(data.alreadyShot))
  alreadyShot.push(coordinate)
  expect(functions.alreadyShotFunction(coordinate, alreadyShot)).toBeTruthy()
})

//alreadyShotFunction
test("ship has been already shot", () => {
  const alreadyShot = JSON.parse(JSON.stringify(data.alreadyShot))
  expect(functions.alreadyShotFunction(coordinate, alreadyShot)).toBeFalsy()
})

//locations
test("ship to have n coordinates equal to length of ship n", () => {
  const ships = JSON.parse(JSON.stringify(data.ships))
  const letters = JSON.parse(JSON.stringify(data.letters))
  const alreadyTaken = JSON.parse(JSON.stringify(data.alreadyTaken))
  const ship = ships[0]
  functions.locations(ship, letters, alreadyTaken)
  expect(ship.size).toBe(ship.location.length)
})

//checkCollisions
test("check for collisions is true", () => {
  const ships = JSON.parse(JSON.stringify(data.ships))
  const alreadyTaken = JSON.parse(JSON.stringify(data.alreadyTaken))
  const ship = ships[0]
  ship.location.push(...coordinates)
  alreadyTaken.push(coordinate2)
  expect(functions.checkCollision(ship, alreadyTaken)).toBeTruthy()
})

//checkCollisions
test("check for collisions is false", () => {
  const ships = JSON.parse(JSON.stringify(data.ships))
  const alreadyTaken = JSON.parse(JSON.stringify(data.alreadyTaken))
  const ship = ships[0]
  ship.location.push(...coordinates)
  alreadyTaken.push(coordinate)
  expect(functions.checkCollision(ship, alreadyTaken)).toBeFalsy()
})

//sunk
test("ship has sunk", () => {
  const ships = JSON.parse(JSON.stringify(data.ships))
  const activeShipsEl = document.querySelectorAll(".ship-item")
  const alreadyShot = JSON.parse(JSON.stringify(data.alreadyShot))
  const alreadySunk = JSON.parse(JSON.stringify(data.alreadySunk))
  const logMessageEl = document.getElementById("log-message")
  const ship = ships[0]

  ship.location.push(...coordinates)
  alreadyShot.push(...coordinates)
  functions.sunk(ships, activeShipsEl, alreadyShot, alreadySunk, logMessageEl)
  expect(alreadySunk).toContain(ship.name)
})
