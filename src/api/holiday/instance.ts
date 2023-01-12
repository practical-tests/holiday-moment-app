import axios from "axios";

import { env } from "../../utils";

const instanceHoliday = axios.create({
  baseURL: env.BASE_URL_API,
});

export default instanceHoliday;
