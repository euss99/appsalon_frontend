// Este helper nos permitirá cambiar la fecha de string a Date para mongoDB lo pueda entender.
import { parse, formatISO, parseISO, format } from "date-fns";
import es from "date-fns/locale/es";

export function convertToISO(stringDate) {
  const newDate = parse(stringDate, "dd/MM/yyyy", new Date());
  /*
    parse() es una función de date-fns que nos permite convertir una fecha de string a Date
    stringDate es la fecha que viene del formulario
    "dd/MM/yyyy" es el formato en el que viene la fecha
    new Date() es la fecha actual
  */

  return formatISO(newDate); // formatISO() es una función de date-fns que nos permite convertir una fecha de Date a formato ISO
}

export function convertToString(dateISO) {
  const newDate = parseISO(dateISO); // parseISO() es una función de date-fns que nos permite convertir una fecha de ISO a Date
  const formattedDate = format(newDate, "PPPP", { locale: es }); // format() es una función de date-fns que nos permite convertir una fecha de Date a string
  // "PPPP" es el formato en el que queremos que se muestre la fecha (ej: "Monday, 12 de July de 2021")

  return formattedDate;
}
