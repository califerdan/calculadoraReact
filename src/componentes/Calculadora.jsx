import { useState } from "react";
import { botones } from "./configBoton.js";
import "../componentes/Calculadora.css";

export function Calculadora() {
  const [display, setDisplay] = useState(0);
  const [limpiar, setLimpiar] = useState(true);

  function obtenerResultado() {
    if (eval(display) == "Infinity") {
      setDisplay("Math Error");
      setLimpiar(true);
      return;
    }
    if (eval(display) > 1000000 || eval(display) < 0.000001) {
      setDisplay(eval(display).toExponential(2));
      setLimpiar(true);
      return;
    }
    let resultado = Math.abs(eval(display).toFixed(5) - eval(display)) * 100000;
    if (resultado > 0) {
      setDisplay(eval(display).toFixed(5));
    } else {
      setDisplay(eval(display));
    }
    setLimpiar(false);
  }

  function realizarFuncion(item) {
    if (item.accion === "BORRAR") {
      setDisplay(0);
      setLimpiar(true);
      return;
    }
    if (item.accion === "ANADIR") {
      if (limpiar) {
        setDisplay(item.valor);
        setLimpiar(false);
      } else {
        setDisplay(display + item.valor);
      }
      return;
    }
    if (item.accion === "CALCULAR") {
      try {
        obtenerResultado();
      } catch (e) {
        setDisplay("Syntax Error");
        setLimpiar(true);
      }
    }
  }

  return (
    <>
      <div className="calculadora">
        <div className="display">{display}</div>
        <div className="teclado">
          {botones.map((item, index) => {
            return (
              <button
                key={index}
                className={item.class}
                onClick={() => realizarFuncion(item)}
              >
                {item.valor}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
