import { parse, formatISO, parseISO, format } from "date-fns";
import es from "date-fns/locale/es";

export function convertToISO(stringDate) {
  const newDate = parse(stringDate, "dd/MM/yyyy", new Date());
  return formatISO(newDate);
}

export function convertToString(dateISO) {
  const newDate = parseISO(dateISO);
  const formattedDate = format(newDate, "PPPP", { locale: es });
  return formattedDate;
}

export function convertToDDMMYYYY(dateISO) {
  const newDate = new Date(dateISO);
  const formattedDate = format(newDate, "dd/MM/yyyy");
  return formattedDate;
}
