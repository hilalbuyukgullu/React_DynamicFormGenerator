import axios from "axios";

const service = axios.create({
  baseURL: "https://www.jsonbulut.com/json",
  timeout: 15000,
})

export function formService() {
  const prm =  {
    ref: "afc1df0bda83d9d5d7e1875e5d9f2f6d",
    formId:"20"
  } 
  return service.get("/forms.php",{params:prm})
}

//52