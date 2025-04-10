import moment from "moment/moment";
import "moment/locale/es";

export const formatDate = (date) => {
  
  return moment(date, "YYYY-MM-DDTHH:mm:ss.SSSZ").locale("es").fromNow();
};
