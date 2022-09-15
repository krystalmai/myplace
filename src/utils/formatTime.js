import { format, getTime, formatDistanceToNow } from "date-fns";

export function formatDate(date) {
  return format(new Date(date), "dd MMMM yyyy");
}

export function formatDateTime(date) {
  return format(new Date(date), "dd MMM yyyy HH:mm");
}

export function formatTimestamp(date) {
  return getTime(new Date(date));
}

export function formatDateTimeSuffix(date) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

export function formatToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
