const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");

describe("HU1 - Login en web app", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/login"); // Tu ruta real
  });

  after(async function () {
    await driver.quit();
  });

  it("Camino Feliz - Usuario correcto", async function () {
    await driver.findElement(By.id("username")).sendKeys("admin");
    await driver.findElement(By.id("password")).sendKeys("1234");
    await driver.findElement(By.id("login-btn")).click();

    await driver.wait(until.urlContains("/dashboard"), 3000);
    const bienvenida = await driver.findElement(By.id("bienvenida")).getText();
    expect(bienvenida).to.include("Bienvenido");
  });

  it("Prueba Negativa - Usuario incorrecto", async function () {
    await driver.get("http://localhost:3000/login");
    await driver.findElement(By.id("username")).sendKeys("invalido");
    await driver.findElement(By.id("password")).sendKeys("xxxx");
    await driver.findElement(By.id("login-btn")).click();

    const error = await driver.findElement(By.id("error-msg")).getText();
    expect(error).to.include("Credenciales incorrectas");
  });

  it("Prueba de Límites - Usuario muy largo", async function () {
    await driver.get("http://localhost:3000/login");
    await driver.findElement(By.id("username")).sendKeys("a".repeat(255));
    await driver.findElement(By.id("password")).sendKeys("1234");
    await driver.findElement(By.id("login-btn")).click();

    const error = await driver.findElement(By.id("error-msg")).getText();
    expect(error).to.include("Error");
  });
});
